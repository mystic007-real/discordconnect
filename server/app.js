const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const clientId = 'YOUR_CLIENT_ID';  // Replace with your client ID
const clientSecret = 'YOUR_CLIENT_SECRET';  // Replace with your client secret
const redirectUri = 'http://localhost:3000/auth/discord/callback';  // Replace with your redirect URI

app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            scope: 'identify guilds'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.send(`Hello, ${userResponse.data.username}! You are connected to Discord.`);
    } catch (error) {
        console.error(error);
        res.send('An error occurred.');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
