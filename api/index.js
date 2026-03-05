const express = require('express');
const axios = require('axios');
const app = express();

// LINK GIST ASLI ANDEZLUA
const GIST_URL = "https://gist.githubusercontent.com/reikudosizu-sudo/e20fc56dc5da58a3d70ce562732be963/raw/45657973d6d4e8f255d633122f8a1269034164ea/main.%20lua";

// Rute utama yang akan dipanggil oleh vercel.json
app.get('/', async (req, res) => {
    const userAgent = req.headers['user-agent'] || "";

    // Cek apakah pengakses adalah Roblox Executor
    if (userAgent.includes('Roblox')) {
        try {
            const response = await axios.get(GIST_URL);
            res.setHeader('Content-Type', 'text/plain');
            res.send(response.data); // Kirim isi script asli ke Roblox
        } catch (err) {
            res.status(500).send("-- Gagal mengambil script dari Gist");
        }
    } else {
        // TAMPILAN "ACCESS DENIED" ALA PANDA VSS
        res.status(403).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { background-color: #0b0b0d; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    .card { text-align: center; max-width: 400px; padding: 40px; border: 1px solid #333; border-radius: 15px; }
                    .icon { color: #ff3b3b; font-size: 80px; margin-bottom: 20px; }
                    h1 { font-size: 24px; margin: 0; }
                    p { color: #888; font-size: 14px; line-height: 1.5; margin-top: 10px; }
                    .footer { margin-top: 30px; border-top: 1px solid #333; padding-top: 15px; color: #555; font-size: 12px; }
                    .brand { color: #7b2ff7; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="icon">⚠️</div>
                    <h1>Access Denied</h1>
                    <p>This script is protected and cannot be viewed or copied from a browser.</p>
                    <p>This endpoint serves Lua scripts exclusively to authorized Roblox executors.</p>
                    <div class="footer">
                        Powered by <span class="brand">Andez VSS Custom</span>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

// WAJIB ADA agar Vercel bisa menjalankan aplikasinya
module.exports = app;
