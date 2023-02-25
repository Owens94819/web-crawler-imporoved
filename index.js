



const zlib = require('zlib');

const gzip = zlib. createGzip();

// const fs = require('fs');

// const inp = fs. createReadStream('test. txt');

// const out = fs. createWriteStream('test. txt. gz');



const express = require('express'),
compression = require('compression'),
parseURL = require ('./parseURL.js');
protocol={
"http:" : require('http'),
"https:" :require('https'),
},
    app = express(),
    fs = require('fs'),
    fetch = require('node-fetch'),
    server = app.listen(process.env.PORT || 12345, () => {
        var port = server.address().port;
        console.log(`http://localhost:${port}\n-----------`);
    });
var injection;


app.use(compression())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())


app.use("/anti-cors*", function (req,res,next){
   
 var http,
url;

//= "https://github.com/Owens94819/web-crawler-imporoved/raw/main/index.js"


try{
//console.log("\n\nconnection opened!\n\n");


//console.log(req.headers);
//console.log(req._parsedUrl.search);
//console.log(req.url)
//console.log(req.originalUrl)
//console.log(req.path)


 url ="https://url.url/"+req.originalUrl.replace(/\/?anti\-cors\/?/,"");

 url = new URL( new URL(url).pathname.substring(1));
//console.log(url)

http=protocol[url.protocol]

if(!http) return res.status(404), res.send("invalid url");

//url = "https://catfact.ninja/fact"


//console.log("\n----\n")


    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header('x-powered-by', 'nimo-org')
    res.setHeader("Access-Control-Expose-Headers", "X-Url")

 http = http.get(url, function (req){
          // console.log(req.headers);
          // application/x-gzip
            // application/gzip

             res.status(req.statusCode);
             res.setHeader('content-type', "application/gzip"||req.headers['content-type'])
          
             req.pipe(gzip).pipe(res);
           
           // res.write("12345");
          //  req.pipe(res);
        }
    )

http.on("error", (err) => {
    res.send("Error1: " + err.message);
});

http.end();
http=void 0;

} catch(err){
res.send("Error2: " + err.message);
}

});


app.use('/', async function (req, res) {
    var script = req.params.script
    var url = req.originalUrl.substring(1)
    var _url = req.url.substring(1)
    var _referer = req.headers.referer;
    var _search = req._parsedUrl.search;

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header('x-powered-by', 'nimo-org')
    res.setHeader("Access-Control-Expose-Headers", "X-Url")
    injection = `<script>${fs.readFileSync('lib/script.js')}</script>`;

    try {
        url = decodeURIComponent(url).trim()
        try {
            new URL(url)
        } catch (error) {
            try {
                url = encodeURIComponent(new URL(decodeURIComponent(new URL(_referer).pathname.substring(1)).trim()).origin) + '/' + url;
            } catch (error) {
                throw 'bad url: ' + url
            }
            // console.log('redirect');
            res.setHeader("location", "/" + url + (_search || ''))
            res.sendStatus(307)
            return
        }

        res.setHeader("X-Url", url)

        var includes_injection


        var _url = new URL(url);
        var _headers = req.headers
        _headers.host = _url.host
        if (_headers.referer) {
            _headers.origin = _url.origin
            _headers.referer = _url.href
            _headers['sec-fetch-site'] = 'same-origin'
            _headers['sec-fetch-mode'] = 'navigate' //no-cors
            if (!_headers['sec-fetch-dest']) {
                _headers['sec-fetch-dest'] = 'document'
            }
        } else {
            _headers = {}
        }

        var obj = {
            method: req.method,
            headers: _headers,
            body: ""
            // redirect: 'follow',
            // follow:20,
            // compress: true
        }

        if (typeof req.body === 'object') {
            for (const key in req.body) {
                if (obj.body) {
                    obj.body += "&" + encodeURIComponent(key) + '=' + encodeURIComponent(req.body[key])
                } else {
                    obj.body += encodeURIComponent(key) + '=' + encodeURIComponent(req.body[key])
                }
            }
        } else {
            obj.body = req.body
        }


        if (!obj.body) {
            delete obj.body
        } else {
            obj.headers["Content-Length"] = obj.body.length;
        }

        url = await fetch(url, obj);
        res.status(url.status)

        var header = url.headers
        if ((header.get('content-type') || '').search(/^text\/html;?/i) === 0) {
            includes_injection = true
        } else {
            includes_injection = false;
        }

        _url.href = url.url
        res.setHeader("X-Url", url.url)

        url = await url.text();

        if (req.headers.returned_content_type) {
            res.setHeader('content-type', req.headers.returned_content_type)
        }else{
        }
        res.setHeader('content-type', header.get('content-type'))

        if (req.headers.includes_injection || includes_injection) {
            injection = `<script>var __location=decodeURIComponent(\`${encodeURIComponent(_url)}\`)</script>` + injection;
            res.setHeader('content-length', url.length + injection.length)
            // res.setHeader('content-type', "text/html; charset=utf-8")
            res.write(injection);
        }

        res.end(url);


    } catch (error) {
        if (typeof error === 'string') {
            error = {
                message: error,
                msg: error
            }
        }
        // console.log(error);
        res.status(403);
        res.send(`
        <script>var __location='*'</script>${injection}
        <pre style="white-space: pre-wrap;">${JSON.stringify(error)}</pre>
        `)
    }
})
