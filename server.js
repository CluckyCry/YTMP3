const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
//const fs = require('fs');
const ytdl = require('ytdl-core');

// Middlewares:
app.use(express.static('./public'))
// Set up endpoints:
app.get('/convert', async (req, res) => {
    let type = req.headers.type;
    let url = req.headers.url;
    let downloadQuality = (type == 'mp3' && 'highestaudio') || 'highest'
    let info = await ytdl.getBasicInfo(url, { quality: downloadQuality })
    let id = ytdl.getURLVideoID(url)
    res.setHeader('title', info.videoDetails.title)
    res.setHeader('Content-Disposition', `attachment; filename="${id}.${type}"`);
    if (type == 'mp3') {
        res.setHeader('Content-Type', 'audio/mpeg')
    }
    else {
        res.setHeader('Content-Type', 'video/mp4')
    }
    const videoStream = ytdl(url, { quality: downloadQuality });
    videoStream.pipe(res)
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})



