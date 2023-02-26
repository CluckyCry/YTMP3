import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import fs from 'fs'
import ytdl from 'ytdl-core';
import { nanoid as generateId, nanoid, random } from 'nanoid';
import path from 'path';

// Middlewares:
app.use(express.static('./public'))
// Set up endpoints:
app.get('/download', (req, res) => {
    let title = req.query.title
    let type = req.query.type
    let url = req.query.url

    let downloadQuality = (type == 'mp3' && 'highestaudio') || 'highest'
    let stream = ytdl(url, {quality: downloadQuality})
    if (type == 'mp3') {
        res.setHeader('Content-Type', 'audio/mpeg')
    }
    else {
        res.setHeader('Content-Type', 'video/mp4')
    }
    res.setHeader('Content-Disposition', `attachment; filename="${title}.${type}"`)
    stream.pipe(res);
})

app.get('/getInfo', async (req, res) => {
    let type = req.query.type;
    let url = req.query.url;
    let downloadQuality = (type == 'mp3' && 'highestaudio') || 'highest'
    let info = await ytdl.getBasicInfo(url, {quality: downloadQuality})
    res.json({
        'title': info.videoDetails.title
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})



