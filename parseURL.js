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

module.exports =parseURL;
