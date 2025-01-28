const redirectUrl = 'http://localhost:3000';


export async function logoutClick() {
    //localStorage.clear();
    window.location.href = redirectUrl;
}