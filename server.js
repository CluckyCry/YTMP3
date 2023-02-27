import express from 'express';
import ytdl from 'ytdl-core';
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares:
app.use(express.static('./public'))
// Set up endpoints:
app.get('/download', (req, res) => {
    let title = req.query.title
    let type = req.query.type
    let url = req.query.url
    let size = req.query.size

    let downloadQuality = (type == 'mp3' && 'highestaudio') || 'highest'
    let filter = (type == 'mp3' && 'audioonly') || 'videoonly'
    let stream = ytdl(url, {filter: filter, quality: downloadQuality})
    if (type == 'mp3') {
        res.setHeader('Content-Type', 'audio/mpeg')
    }
    else {
        res.setHeader('Content-Type', 'video/mp4')
    }
    res.setHeader('Content-Disposition', `attachment; filename="${title}.${type}"`)
    res.setHeader('Content-Length', size)
    stream.pipe(res);
})


app.get('/getInfo', async (req, res) => {
    let type = req.query.type;
    let url = req.query.url;
    let downloadQuality = (type == 'mp3' && 'highestaudio') || 'highest'
    let filter = (type == 'mp3' && 'audioonly') || 'videoonly'
    let info = await ytdl.getInfo(url)
    let format = ytdl.chooseFormat(info.formats, {filter: filter, quality: downloadQuality})
    res.json({
        'title': info.videoDetails.title,
        'size': format.contentLength
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})



