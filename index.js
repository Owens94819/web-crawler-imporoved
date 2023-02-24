const parseURL = function (url) {
    url = url || "";
    var loc = {}
    url = url.trim().replace(/\n/img, '').toLowerCase().replace(/\\/img, '/')
    loc.href = url.trim().replace(/\n/img, '').toLowerCase()
    loc.origin = [loc.href.match(/^https?\:[\/\\][\/\\]\w[^\/\\#]+\w/)].toString() || "null"

    if (loc.origin !== "null") {
        loc.__path__ = loc.href.replace(loc.origin, '')
        loc.parentpathname = loc.__path__.replace(/#[^]+|\?[^]+/, '').trim() || '/'
        loc.protocol = [loc.origin.match(/^https?\:/)].toString()
        loc.host = loc.origin.replace(/^https?\:[\\\/][\\\/]/, '')
        loc.hostname = loc.host.replace(/\:[^]*/, '')
        loc.__hash__ = [loc.__path__.match(/#[^?]+/, '')].toString().substring(1)
        loc.hash = [loc.__path__.match(/#[^]+/, '')].toString()
        loc.qeury = [loc.__path__.match(/\?[^#]+/, '')].toString()
        var pathparse = loc.parentpathname.split('/')
        loc.parentpathname = []
        for (var i = 0; i < pathparse.length; i++) {
            if (pathparse[i] === "..") {
                loc.parentpathname.pop()
                continue;
            } else if (pathparse[i] === "." || (pathparse[i] === "" && i + 1 < pathparse.length)) {
                continue;
            }
            loc.parentpathname.push(pathparse[i])
        }

        loc.pathname = '/' + loc.parentpathname.join('/')
        loc.parentpathname.pop()
        loc.parentpathname = '/' + loc.parentpathname.join('/')
        loc.href = loc.origin + loc.pathname + loc.hash;
    } else {
        loc.protocol = [loc.href.match(/^[^\\\/\#\?]+\:/)].toString()
        loc.pathname = loc.href.replace(/^[^\\\/\#\?]+\:/, '')
    }
    return loc
}
parseURL.join = function (par, chd, loc) {
    if (arguments.length === 1) {
        chd = par
    }
    chd = chd.trim().replace(/\\/img, '/')
    if (parseURL.isdomain(chd)) {
        return parseURL(chd)
    }
    if (!(loc instanceof Object)) {
        if (typeof globals === 'object') {
            loc = globals.location
        } else {
            loc = parseURL(par)
        }
    }
    if (chd[0] === "/") {
        chd = chd.substring(1)
        loc = loc.origin
    } else {
        loc = loc.origin + loc.parentpathname
    }
    loc = parseURL(loc + '/' + chd)
    return loc
}

parseURL.isdomain = function (url) {
    return url.search(/^https?:\/\/+[^]*[:.]+\w|^[^\\\/\#\?]+\:/) >= 0
}




const express = require('express'),
_http = require('http'),
_https = require('https'),
    app = express(),
    fs = require('fs'),
    fetch = require('node-fetch'),
    server = app.listen(process.env.PORT || 12345, () => {
        var port = server.address().port;
        console.log(`http://localhost:${port}\n-----------`);
    });
var injection;




app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())


app.use("/anti-cors*", function (req,res){
   
 var http = _https,
url = "https://github.com/Owens94819/web-crawler-imporoved/raw/main/index.js"


try{
console.log("\n\nconnection opened!\n\n");


//console.log(req.headers);
//console.log(req._parsedUrl.search);
//console.log(req.url)
//console.log(req.originalUrl)
//console.log(req.path)


var url ="https://url.url/"+req.originalUrl.replace(/\/anti\-cors\/?/,"/");
console.log(url);

 url = new URL(url);
console.log(url)

url = "https://catfact.ninja/fact"


console.log("\n----\n")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header('x-powered-by', 'nimo-org')
    res.setHeader("Access-Control-Expose-Headers", "X-Url")

 http =    http.get(url,
        function (resApi){
            res.writeHead(resApi.statusCode);
           // res.write("12345");
            resApi.pipe(res);
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
