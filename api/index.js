const express = require('express');
const axios = require('axios');
const app = express();

// LINK GIST ASLI ANDEZLUA
const GIST_URL = "https://gist.githubusercontent.com/reikudosizu-sudo/e20fc56dc5da58a3d70ce562732be963/raw/45657973d6d4e8f255d633122f8a1269034164ea/main.%20lua";

// GUNAKAN '/' SAJA DI SINI
app.get('/', async (req, res) => {
    const userAgent = req.headers['user-agent'] || "";

    if (userAgent.includes('Roblox')) {
        try {
            const response = await axios.get(GIST_URL);
            res.setHeader('Content-Type', 'text/plain');
            res.send(response.data);
        } catch (err) {
            res.status(500).send("-- Gagal mengambil script");
        }
    } else {
        // Tampilan Access Denied
        res.status(403).send(`
            <body style="background:#0b0b0d;color:white;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
                <div style="text-align:center;border:1px solid #333;padding:40px;border-radius:10px;">
                    <h1 style="color:#ff3b3b;font-size:50px;">⚠️</h1>
                    <h1>Access Denied</h1>
                    <p style="color:#888;">Protected by Andez VSS</p>
                </div>
            </body>`);
    }
});

module.exports = app;
