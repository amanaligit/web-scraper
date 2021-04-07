const Nightmare = require('nightmare')
var vo = require('vo');
const nightmare = Nightmare({ show: true });
const url = 'https://www.instagram.com/';
require('dotenv').config()

let numfollows = 0;


async function gooo() {

    await nightmare
        .goto(url)
        .wait('body')
        .wait('input')
        .type('input[name=username]', process.env.INSTA_USERNAME)
        .type('input[name=password]', process.env.INSTA_PASSWORD)
        .click('button[type=submit]')
        .wait(1000 + Math.random() * 5000)
        .evaluate(() => document.querySelector('body').innerHTML)
        .then(response => {
        }).catch(err => {
            console.log(err);
        });

    await nightmare.goto(process.env.ACCOUNT_FROM_WHICH_TO_FOLLOW)
        .wait(2000 + Math.random() * 3000)
    const href = await nightmare.evaluate(() => {
        var allButtons = document.getElementsByTagName('a');
        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].innerText.indexOf('followers') !== -1) return allButtons[i].href;
        }
    })

    await nightmare.click(`a[href=${href}]`)
        .wait(3000 + Math.random() * 6000)


    var run = function* () {
        let scrolled = true;
        while (numfollows < parseInt(process.env.FOLLOWS_TO_DO)) {
            let link = true;
            while (link) {
                link = yield nightmare.evaluate(function () {
                    const divs = Array.from(document.querySelectorAll(".XfCBB"))
                    for (let index = 0; index < divs.length; index++) {
                        const div = divs[index];
                        const followbtn = div.querySelector('button');
                        if (followbtn.innerHTML == "Follow")
                            return div.querySelector('a').href;
                    }
                    const divs2 = Array.from(document.querySelectorAll(".uu6c_"))
                    for (let index = 0; index < divs2.length; index++) {
                        const div = divs2[index];
                        const followbtn = div.querySelector('button');
                        if (followbtn.innerHTML == "Follow")
                            return div.querySelector('a').href;
                    }
                })
                if (link !== null) {
                    console.log("following", link);
                    yield nightmare.goto(link);
                    yield nightmare.evaluate(function () {
                        var allButtons = document.getElementsByTagName('button');
                        for (var i = 0; i < allButtons.length; i++) {
                            if (allButtons[i].innerText.indexOf('Follow') !== -1) allButtons[i].click();
                        }
                    })
                    numfollows++;
                    yield nightmare.wait(1234 + Math.random() * 3124)
                        .back()
                        .wait(2000 + Math.random() * 3000)
                    const href = yield nightmare.evaluate(() => {
                        var allButtons = document.getElementsByTagName('a');
                        for (var i = 0; i < allButtons.length; i++) {
                            if (allButtons[i].innerText.indexOf('followers') !== -1) return allButtons[i].href;
                        }
                    })

                    yield nightmare.click(`a[href=${href}]`)
                        .wait(3000 + Math.random() * 6000)

                }
                else {
                    break;
                }
            }
            previousHeight = currentHeight;
            var currentHeight = yield nightmare.evaluate(function () {
                let element = document.querySelector(".isgrP");
                if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                    return 0;
                }
                return element.scrollHeight;
            });
            if (currentHeight == 0)
                break;
            scrolled = currentHeight;
            yield nightmare.evaluate((h) => {
                document.querySelector(".isgrP").scrollTo(0, h)
            }, currentHeight)
                .wait(1000 + Math.random() * 4512);
        }
    };

    vo(run)(function (err) {
        console.dir(err);
        console.log("number of accounts followed: ", numfollows)
        nightmare.end();
        process.exit(1)
    });


}
gooo()
