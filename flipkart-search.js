const Nightmare = require('nightmare')
const cheerio = require('cheerio');
const nightmare = Nightmare({ show: true });
const url = 'https://www.flipkart.com/';

nightmare
    .goto(url)
    .wait('body')
    .click('button._2KpZ6l._2doB4z')
    .type('input._3704LK', 'nodejs books')
    .click('button.L0Z3Pu')
    .wait(5000)
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        console.log(getData(response));
    }).catch(err => {
        console.log(err);
    });

let getData = html => {
    // console.log(html);
    data = [];
    const $ = cheerio.load(html);
    $('.s1Q9rs').each((row, elem) => {
        console.log(row);
        let title = $(elem).text();
        let link = $(elem).attr('href');
        if (title) {
            data.push({
                title: title,
                link: link
            });
        }
    });
    return data;
}