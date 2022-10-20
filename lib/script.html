(function () {
    /** @ACTION url location handler */
    // onmessage = function(e){
    //     console.log(e);
    // }
    // console.log(window);
    function __parseURL(url) {
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
            loc.qeury = [loc.hash.match(/\?[^]+/, '')].toString()
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
    __parseURL.join = function (par, chd, loc) {
        if (arguments.length === 1) {
            chd = par
        }


        chd = chd.trim().replace(/\\/img, '/')
        if (__parseURL.isdomain(chd)) {
            return __parseURL(chd)
        }
        if (!(loc instanceof Object)) {
            if (typeof globals === 'object') {
                loc = globals.location
            } else {
                loc = __parseURL(par)
            }
        }
        if (chd[0] === "/") {
            chd = chd.substring(1)
            loc = loc.origin
        } else {
            loc = loc.origin + loc.parentpathname
        }
        loc = __parseURL(loc + '/' + chd)
        return loc
    }
    __parseURL.isdomain = function (url) {
        return url.search(/^https?:\/\/+[^]*[:.]+\w|^[^\\\/\#\?]+\:/) >= 0
    }

    var globals = {
        //  source_elements_queries: ['a', 'form', 'img', 'source', 'video', 'link', 'iframe'],
        source_elements_queries: [],
        source_elements: {
            __proto__: {
                proto: [
                    ["HTMLIFrameElement", ['src'],
                        ['iframe']
                    ],
                    ["HTMLFormElement", ['action'],
                        ['form']
                    ],
                    ["HTMLAnchorElement", ['href'],
                        ['a']
                    ],
                    [null, "HTMLScriptElement", ['src'],
                        ['script']
                    ],
                    [null, "HTMLVideoElement", ['src', 'placeholder'],
                        ['video']
                    ],
                    [null, "HTMLSourceElement", ['src', 'srcset'],
                        ['source']
                    ],
                    [null, "HTMLImageElement", ['src', 'srcset'],
                        ['img']
                    ],
                    [null, "HTMLLinkElement", ['href'],
                        ['link']
                    ]
                ]
            }
        },
        New_Element_Functions: {
            HTMLAnchorElement: function () {
                console.log(elm);

            },
            HTMLFormElement: function (elm) {

                console.log(elm);
            }
        },
        location: __parseURL(__location),
        __location: __location
    }
    for (var i = 0; i < globals.source_elements.proto.length; i++) {
        if (!globals.source_elements.proto[i][0]) {
            continue
        }
        globals.source_elements[globals.source_elements.proto[i][0]] = globals.source_elements.proto[i][1]
        globals.source_elements_queries.push(globals.source_elements.proto[i][2])
    }

    globals.parse_source_element = function () {
        if (arguments[0].__parsed) {
            return
        }
        arguments[0].__parsed = true;

        var url;
        for (var i = 0; i < arguments[1].length; i++) {

            if (arguments[0].hasAttribute(arguments[1][i])) {
                url = arguments[0].getAttribute(arguments[1][i]).trim() || ""
                if (url && __parseURL.isdomain(url)) {
                    // console.log(__parseURL.join(url));
                    url = __parseURL.join(url);
                    url = "/" + encodeURIComponent(url.origin) + url.__path__
                    //     // url="/"+url.__path__
                    // //    url="http://localhost:12345/"+url
                    arguments[0].setAttribute(arguments[1][i], url)
                } else {
                    url = __parseURL.join(url);
                    if (__parseURL.isdomain(decodeURIComponent(url.pathname.substring(1)))) {
                        return
                    }
                    url = "/" + encodeURIComponent(url.origin) + url.__path__
                    // //    url="http://localhost:12345/"+url
                    arguments[0].setAttribute(arguments[1][i], url)
                }
            }
        }


        // switch (arguments[0].constructor.name) {
        //     case "HTMLAnchorElement":
        //         arguments[0].addEventListener('click', globals.parse_source_element.event(arguments[0].constructor.name))
        //         break;
        //     case "HTMLFormElement":
        //         arguments[0].addEventListener("submit", globals.parse_source_element.event(arguments[0].constructor.name))
        // }
    }
    globals.parse_source_element.event = function (name) {
        return function (e) {
            // console.log(e);
            // if (!e.defaultPrevented) {
            //     e.preventDefault()
            //         globals.New_Element_Functions[name](this)
            // }
        }
    };


    ;
    (window.MutationObserver ? function (foo, elm) {
        new window.MutationObserver(function (e) {
            for (var i = 0; i < e.length; i++) {
                for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                    foo(e[i].addedNodes[_i]);
                }
            }
        }).observe(elm || document, {
            childList: true,
            // characterData: true,
            subtree: true,
        })
    } : function (foo) {
        console.error('browser not support')
        elm.addEventListener('DOMNodeInserted', function (e) {
            foo(e.target);
        })
    })(function (e) {
        var att = globals.source_elements[e.constructor.name]
        if (att) {
            globals.parse_source_element(e, att)
        }
        if (e instanceof Element || e instanceof Document) {
            e = e.querySelectorAll(globals.source_elements_queries.toString());
            for (var i = 0; i < e.length; i++) {
                att = globals.source_elements[e[i].constructor.name]
                globals.parse_source_element(e[i], att)
            }
        }
    }, document);
    // window.__parseURL=__parseURL
    // console.log(location.href);
    window.top.postMessage({
        state: '--ready--',
        data: location.href
    }, "*")
    window.addEventListener('message', function () {
        data = arguments[0].data
        if (!(data instanceof Object)) {
            return
        }

        if (data.state) {

            switch (data.state) {
                case '--reload--':
                    var url = data.data
                    url = __parseURL(url);
                    url = location.origin + "/" + encodeURIComponent(url.origin) + url.__path__
                    window.top.postMessage({
                        state: '--reload--',
                        data: url
                    }, '*')
                    break;
            }

            return
        }
        if (data.src) {
            var s = document.createElement('script')
            s.async = true
            s.src = data.src;
            document.head.appendChild(s)
            s = undefined
        }
        if (data.script) {
            eval(data.script)
        }
        if (data.link) {
            var s = document.createElement('link')
            s.rel = "styleSheet";
            s.href = data.link;
            document.head.appendChild(s)
            s = undefined
        }
        if (data.style) {
            var s = document.createElement('style')
            s.innerText = data.style;
            document.head.appendChild(s)
            s = undefined
        }
    })
})()