// Variables:
const link = document.getElementById('link')
const convertBtn = document.getElementById('convert')
let type = 'mp3' // The default type is MP3.
const mp3 = document.getElementById('mp3')
const mp4 = document.getElementById('mp4')
const btnGroup = [mp3, mp4]
const downloadInfo = document.getElementById('downloadInfo')

let videoTitle;
let downloadBtn;

let a = document.createElement('a')

// Functions:
function setType(t) {
    if (!t) return
    type = t // Set the type
}

async function convert() {
    if (type && link.value.startsWith('https://www.youtube.com')) {
        // Valid link
        // Send a request:
        if (videoTitle && downloadBtn) {
            // Remove
            videoTitle.remove()
            downloadBtn.remove()
        }

        let fetchVidInfo = await fetch(`/getInfo?type=${type}&url=${link.value}`)
        let response = await fetchVidInfo.json()

        let title = response.title
        let size = response.size

        // Create a div, a button
        a.href = `/download?title=${title}&type=${type}&url=${link.value}&size=${size}`
        a.target = '_blank'

        videoTitle = document.createElement('div')
        videoTitle.classList.add('d-inline')
        videoTitle.classList.add('p-2')
        videoTitle.classList.add('text-bg-success')

        videoTitle.innerHTML = title

        downloadBtn = document.createElement('button')
        downloadBtn.classList.add('btn')
        downloadBtn.classList.add('btn-primary')
        downloadBtn.classList.add('mx-1')

        downloadBtn.innerHTML = 'Download'

        downloadInfo.appendChild(videoTitle)
        downloadInfo.appendChild(downloadBtn)

        // Whenever they click the download button, click the a tag.
        downloadBtn.addEventListener('click', async function (event) {
            event.preventDefault();
            a.click();
        })
    }
}

convertBtn.addEventListener('click', convert)
btnGroup.forEach(btn => {
    btn.addEventListener('click', () => {
        setType(btn.id)
    })
})