const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

router.get('/download', (req, res) => {
    // download path
    let downloadPATH = "/home/egg/Videos/"
    // query URL 
    var url = req.query.url;
    
    // download URL
    var stream = ytdl(url);

    // get stream inf, i.e title and then save it as title.mp4
    stream.on('info', (info) => {
        let title = info.videoDetails.title;
        let id = info.videoDetails.video_id;

        stream.pipe(fs.createWriteStream(downloadPATH + title + '.mp4'));
    });

    res.redirect('/');
});


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');