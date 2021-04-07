const axios = require('axios');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

const cheerio = require('cheerio');

const url = 'http://news.ycombinator.com';

//using axios

// axios.get(url)
//     .then(response => {
//         getData(response.data);
//     })
//     .catch(err => {
//         console.log(err);
//     })


//using nightmare

nightmare
    .goto(url)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        getData(response);
    }).catch(err => {
        console.log(err);
    });


let getData = html => {
    data = [];
    const $ = cheerio.load(html);
    $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
        data.push({
            title: $(elem).text(),
            link: $(elem).find('a.storylink').attr('href')
        });
    });
    console.log(data);
}