const fs = require('fs');
const fetch = require('axios');
const config = require('./config.json');

setInterval(async () => {
    const feed = await fetch(
        `https://www.googleapis.com/youtube/v3/search?channelId=${config.channel_id}&order=date&part=snippet&type=video&key=${config.api_key}`,
    );
    const data = feed.data.items[0].id.videoId;
    console.log('Last Video Id ' + data);
    console.log('Checking for new videos...');
    let jsonOpen = fs.readFileSync('links.json');
    console.log('Opened links.json');
    let json = JSON.parse(jsonOpen);
    console.log('Parsed links.json');
    if (jsonOpen.includes(feed.data.items[0].id.videoId)) {
        console.log('No new videos found.');
        console.log('---------------------------------');
        return;
    }
    console.log('New video found!');
    let video = feed.data.items[0];
    console.log(video);
    json.push(feed.data.items[0].id.videoId);
    let jsonLink = JSON.stringify(json);
    fs.writeFileSync('links.json', jsonLink);

    console.log('New video uploaded!');
}, 25000);
