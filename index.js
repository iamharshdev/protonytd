const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use('/static', express.static('./static'));

var server_port=process.env.YOUR_PORT || process.env.PORT || 80;
var server_host=process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port,server_host,function(){
    console.log('Listening on port %d',server_port);
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' });
})

app.get('/download', (req, res) => {
    var url = req.query.url;
    var formatd = req.query.format;
    res.header("Content-Disposition", 'attachment; filename="Video.'+formatd);
    ytdl(url, {format:formatd }).pipe(res);
});
