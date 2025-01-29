const clientId = '1ce721f84142477b9efce55e0ed4bd5f';
const redirectUrl = 'http://localhost:3000/Info';

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email';


// Data structure that manages the current active token, caching it in localStorage
export const currentToken = {
  get access_token() { return localStorage.getItem('access_token') || null; },
  get refresh_token() { return localStorage.getItem('refresh_token') || null; },
  get expires_in() { return localStorage.getItem('expires_in') || null },
  get expires() { return localStorage.getItem('expires') || null },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem('access_token', access_token);
    // Only update refresh token if one is provided
    if (refresh_token) {
      localStorage.setItem('refresh_token', refresh_token);
    }
    localStorage.setItem('expires_in', expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem('expires', expiry);
  },

  clear: function() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('expires');
    localStorage.removeItem('code_verifier');
  }
};



// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace('?', '');
  window.history.replaceState({}, document.title, updatedUrl);
}

// If we have a token, we're logged in, so fetch user data and render logged in template
if (currentToken.access_token) {
  const userData = await getUserData();
  //renderTemplate("main", "logged-in-template", userData);
  //renderTemplate("oauth", "oauth-template", currentToken);
}

// Otherwise we're not logged in, so render the login template
if (!currentToken.access_token) {
  //renderTemplate("main", "login");
}

async function redirectToSpotifyAuthorize() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);

  const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  window.localStorage.setItem('code_verifier', code_verifier);

  const authUrl = new URL(authorizationEndpoint)
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
export async function getToken(code) {
  const code_verifier = localStorage.getItem('code_verifier');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

export async function refreshToken() {
  console.log("Attempting to refresh token...");

  const refresh_token = currentToken.refresh_token;
  console.log("Stored Refresh Token:", refresh_token);

  if (!refresh_token) {
    console.error("No refresh token found. User must log in again.");
    currentToken.clear();
    throw new Error("NO_REFRESH_TOKEN");
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
    });

    const responseText = await response.text();
    console.log("Refresh token response:", responseText);

    if (!response.ok) {
      const errorData = JSON.parse(responseText);
      
      // Handle specific Spotify error cases
      if (errorData.error === 'invalid_grant') {
        console.error("Refresh token has been revoked or is invalid");
        currentToken.clear();
        throw new Error("REFRESH_TOKEN_REVOKED");
      }
      
      throw new Error(`Failed to refresh token: ${response.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log("New access token received:", data);

    currentToken.save(data);
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    
    // If it's not one of our special errors, clear tokens as well
    if (error.message !== "NO_REFRESH_TOKEN" && error.message !== "REFRESH_TOKEN_REVOKED") {
      currentToken.clear();
    }
    
    throw error;
  }
}

export async function getUserData() {
  console.log("Starting getUserData");

  let token = currentToken.access_token;
  const expiry = new Date(currentToken.expires); 
  const now = new Date();

  console.log("Current Token:", token);
  console.log("Token Expiry Time:", expiry);
  console.log("Current Time:", now);

  // Check if token is expired
  if (!token || expiry <= now) {
    console.log("Token expired. Attempting to refresh...");
    try {
      token = await refreshToken();
    } catch (error) {
      if (error.message === "REFRESH_TOKEN_REVOKED" || error.message === "NO_REFRESH_TOKEN") {
        console.error("Token refresh failed. User needs to log in again.");
        // Redirect to login page
        window.location.href = '/login';  // Adjust this path as needed
        return null;
      }
      throw new Error("Access token expired and refresh failed");
    }
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token might have just expired, try one refresh
        try {
          token = await refreshToken();
          return getUserData(); // Retry with new token
        } catch (error) {
          currentToken.clear();
          window.location.href = '/login';
          return null;
        }
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
}


// Click handlers

/*export function loginWithSpotifyClick() {
    const clientId = "your_spotify_client_id";
    const redirectUri = "http://localhost:3000/redirect"; // Spotify redirect URI
    const scopes = "user-read-private user-read-email"; // Add the required scopes
  
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
  
    // Redirect to Spotify for authentication
    window.location.href = spotifyAuthUrl;
  }*/
async function loginWithSpotifyClick() {
    console.log("Button clicked!");
    const response = await redirectToSpotifyAuthorize();
    //const data = await response.json();
    return response;
}

export { loginWithSpotifyClick };

async function logoutClick() {
  localStorage.clear();
  window.location.href = redirectUrl;
}

async function refreshTokenClick() {
  const token = await refreshToken();
  currentToken.save(token);
  //renderTemplate("oauth", "oauth-template", currentToken);
}

