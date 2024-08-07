document.getElementById('connect-button').onclick = function() {
    const clientId = 'YOUR_CLIENT_ID';  // Replace with your client ID
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/discord/callback');  // Replace with your redirect URI

    const oauth2Url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20guilds`;

    window.location.href = oauth2Url;
};
