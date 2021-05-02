const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    if (req.url == "/") {
        return handelHomepage(req, res);
    }

    let urls = req.url.split("/").filter((value) => {
        if (value != '') {
            return value;
        }
    })
    // console.log(urls);
    if (urls[0] == 'favicon.ico') {
        return serveStatic('/image/logo.png', res);
    }
    if (urls[0] == 'time-zones') {
        return serveStatic('/view/timezones.html', res);
    }

    if (urls.length == 2) {
        return handelWebPageTime(req, res, urls);
    }
    // console.log(urls);
    if (urls.length == 3 && urls[0] == 'api') {
        return handelAPITime(req, res, urls);
    }
    return handel404(req, res);


})

let handelHomepage = (req, res) => {
    // console.log("In home");
    return serveStatic("/view/index.html", res);
}

let handelWebPageTime = (req, res, urls) => {
    // console.log("Time of City");
    return serveStatic("/view/index.html", res);
}

let handelAPITime = (req, res, urls) => {
    // console.log("API Time of City");
    let date = getData(urls[1], urls[2]);
    if (!date) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(422);
        res.end(JSON.stringify({
            message: "invalid zone identifiers"
        }));
        return;
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify({
            message: "Current Time at " + urls[1] + "/" + urls[2],
            time: date
        }));
        return;
    }
}

let handel404 = (req, res) => {
    // console.log("Not Found");
    return serveStatic("/view/404.html", res);

}

let serveStatic = (file, res) => {
    fs.readFile(__dirname + file, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}

let getData = (country, city) => {
    // console.log(country, city);
    try {
        let localTime = new Date().toLocaleString("en-US", { timeZone: country + "/" + city });
        return localTime;
    } catch (error) {
        return false;
    }
}

const port = process.env.PORT || '3000';

server.listen(port);
console.log(`Server Started at ${port}`);
