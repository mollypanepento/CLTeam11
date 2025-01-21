import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "1ce721f84142477b9efce55e0ed4bd5f"; // Replace with your client id
const params = new URLSearchParams(window.location.search); //prevents user from being stuck in a redirect loop when they authenticate
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    console.log(profile); // Profile data logs to console
    populateUI(profile);
}

async function fetchProfile(code: string): Promise<UserProfile> { //Call Web API
    // gets the profile data 
    // Authorization header is set to Bearer ${token}, where token is the access token that we got from the https://accounts.spotify.com/api/token endpoint
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });

    return await result.json();
}

function populateUI(profile: UserProfile) { // Update UI with profile data
    document.getElementById("displayName")!.innerText = profile.display_name;
    document.getElementById("avatar")!.setAttribute("src", profile.images[0].url)
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
    document.getElementById("uri")!.innerText = profile.uri;
    document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url")!.innerText = profile.href;
    document.getElementById("url")!.setAttribute("href", profile.href);
    document.getElementById("imgUrl")!.innerText = profile.images[0].url;
}