/*! Tej Chauhan 2017-09-05 */

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
function validateEmail(a) {
    var b = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return b.test(a)
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

function RolloverManager() {
    var a = $("*[data-rollover-color]");
    a.each(function () {
        var a = $(this);
        a.parent().hover(function () {
            a.css("color", a.data("rollover-color"))
        }, function () {
            a.css("color", a.data("original-color"))
        })
    })
}

function WorkSlideshow(a, b) {
    var c, d = this;
    this.$slider = $(b), this.$pageNumber = $(".pager span"), this.$info = $(".info"), this.$infoLinks = $(".info-links"), c = this.getConfig(a), this.$slider.flexslider(c), $WINDOW.on("debouncedresize", function () {
        d.resizeSlides()
    }), $("#toggle-info").on("click", function () {
        return $BODY.hasClass("info-showing") ? (d.$info.removeClass("scrolls"), $BODY.removeClass("info-showing"), d.$info.css("max-height", 0), $(this).text("Info")) : ($BODY.addClass("info-showing"), d.$info.attr("style", "max-height: " + d.idealHeight), $(this).text("Close Info"), setTimeout(function () {
            d.$info[0].scrollHeight > d.$info.innerHeight() && d.$info.addClass("scrolls")
        }, 550)), !1
    }), $("#go-back").on("click", function () {
        var a = document.referrer.split("/");
        return a.length >= 4 && "work" == a[3] ? (window.history.back(), !1) : void 0
    })
}

function BreakpointManager() {
    var a = this;
    this.breakpoint = null, $WINDOW.on("resize", function () {
        a.refresh()
    }), this.refresh()
}

!function (a, b) {
    function c(a, b) {
        return typeof a === b
    }

    function d() {
        var a, b, d, e, f, g, h;
        for (var k in j) if (j.hasOwnProperty(k)) {
            if (a = [], b = j[k], b.name && (a.push(b.name.toLowerCase()), b.options && b.options.aliases && b.options.aliases.length)) for (d = 0; d < b.options.aliases.length; d++) a.push(b.options.aliases[d].toLowerCase());
            for (e = c(b.fn, "function") ? b.fn() : b.fn, f = 0; f < a.length; f++) g = a[f], h = g.split("."), 1 === h.length ? l[h[0]] = e : (!l[h[0]] || l[h[0]] instanceof Boolean || (l[h[0]] = new Boolean(l[h[0]])), l[h[0]][h[1]] = e), i.push((e ? "" : "no-") + h.join("-"))
        }
    }

    function e(a) {
        var b = m.className, c = l._config.classPrefix || "";
        if (n && (b = b.baseVal), l._config.enableJSClass) {
            var d = new RegExp("(^|\\s)" + c + "no-js(\\s|$)");
            b = b.replace(d, "$1" + c + "js$2")
        }
        l._config.enableClasses && (b += " " + c + a.join(" " + c), n ? m.className.baseVal = b : m.className = b)
    }

    function f() {
        return "function" != typeof b.createElement ? b.createElement(arguments[0]) : n ? b.createElementNS.call(b, "http://www.w3.org/2000/svg", arguments[0]) : b.createElement.apply(b, arguments)
    }

    function g() {
        var a = b.body;
        return a || (a = f(n ? "svg" : "body"), a.fake = !0), a
    }

    function h(a, c, d, e) {
        var h, i, j, k, l = "modernizr", n = f("div"), o = g();
        if (parseInt(d, 10)) for (; d--;) j = f("div"), j.id = e ? e[d] : l + (d + 1), n.appendChild(j);
        return h = f("style"), h.type = "text/css", h.id = "s" + l, (o.fake ? o : n).appendChild(h), o.appendChild(n), h.styleSheet ? h.styleSheet.cssText = a : h.appendChild(b.createTextNode(a)), n.id = l, o.fake && (o.style.background = "", o.style.overflow = "hidden", k = m.style.overflow, m.style.overflow = "hidden", m.appendChild(o)), i = c(n, a), o.fake ? (o.parentNode.removeChild(o), m.style.overflow = k, m.offsetHeight) : n.parentNode.removeChild(n), !!i
    }

    var i = [], j = [], k = {
        _version: "3.5.0",
        _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
        _q: [],
        on: function (a, b) {
            var c = this;
            setTimeout(function () {
                b(c[a])
            }, 0)
        },
        addTest: function (a, b, c) {
            j.push({name: a, fn: b, options: c})
        },
        addAsyncTest: function (a) {
            j.push({name: null, fn: a})
        }
    }, l = function () {
    };
    l.prototype = k, l = new l;
    var m = b.documentElement, n = "svg" === m.nodeName.toLowerCase(),
        o = k._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    k._prefixes = o;
    var p = k.testStyles = h;
    l.addTest("touchevents", function () {
        var c;
        if ("ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch) c = !0; else {
            var d = ["@media (", o.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            p(d, function (a) {
                c = 9 === a.offsetTop
            })
        }
        return c
    }), d(), e(i), delete k.addTest, delete k.addAsyncTest;
    for (var q = 0; q < l._q.length; q++) l._q[q]();
    a.Modernizr = l
}(window, document), function (a) {
    var b = !0;
    a.flexslider = function (c, d) {
        var e = a(c);
        e.vars = a.extend({}, a.flexslider.defaults, d);
        var f, g = e.vars.namespace, h = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            i = ("ontouchstart" in window || h || window.DocumentTouch && document instanceof DocumentTouch) && e.vars.touch,
            j = "click touchend MSPointerUp keyup", k = "", l = "vertical" === e.vars.direction, m = e.vars.reverse,
            n = e.vars.itemWidth > 0, o = "fade" === e.vars.animation, p = "" !== e.vars.asNavFor, q = {};
        a.data(c, "flexslider", e), q = {
            init: function () {
                e.animating = !1, e.currentSlide = parseInt(e.vars.startAt ? e.vars.startAt : 0, 10), isNaN(e.currentSlide) && (e.currentSlide = 0), e.animatingTo = e.currentSlide, e.atEnd = 0 === e.currentSlide || e.currentSlide === e.last, e.containerSelector = e.vars.selector.substr(0, e.vars.selector.search(" ")), e.slides = a(e.vars.selector, e), e.container = a(e.containerSelector, e), e.count = e.slides.length, e.syncExists = a(e.vars.sync).length > 0, "slide" === e.vars.animation && (e.vars.animation = "swing"), e.prop = l ? "top" : "marginLeft", e.args = {}, e.manualPause = !1, e.stopped = !1, e.started = !1, e.startTimeout = null, e.transitions = !e.vars.video && !o && e.vars.useCSS && function () {
                    var a = document.createElement("div"),
                        b = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var c in b) if (void 0 !== a.style[b[c]]) return e.pfx = b[c].replace("Perspective", "").toLowerCase(), e.prop = "-" + e.pfx + "-transform", !0;
                    return !1
                }(), e.ensureAnimationEnd = "", "" !== e.vars.controlsContainer && (e.controlsContainer = a(e.vars.controlsContainer).length > 0 && a(e.vars.controlsContainer)), "" !== e.vars.manualControls && (e.manualControls = a(e.vars.manualControls).length > 0 && a(e.vars.manualControls)), "" !== e.vars.customDirectionNav && (e.customDirectionNav = 2 === a(e.vars.customDirectionNav).length && a(e.vars.customDirectionNav)), e.vars.randomize && (e.slides.sort(function () {
                    return Math.round(Math.random()) - .5
                }), e.container.empty().append(e.slides)), e.doMath(), e.setup("init"), e.vars.controlNav && q.controlNav.setup(), e.vars.directionNav && q.directionNav.setup(), e.vars.keyboard && (1 === a(e.containerSelector).length || e.vars.multipleKeyboard) && a(document).bind("keyup", function (a) {
                    var b = a.keyCode;
                    if (!e.animating && (39 === b || 37 === b)) {
                        var c = 39 === b ? e.getTarget("next") : 37 === b ? e.getTarget("prev") : !1;
                        e.flexAnimate(c, e.vars.pauseOnAction)
                    }
                }), e.vars.mousewheel && e.bind("mousewheel", function (a, b) {
                    a.preventDefault();
                    var c = e.getTarget(0 > b ? "next" : "prev");
                    e.flexAnimate(c, e.vars.pauseOnAction)
                }), e.vars.pausePlay && q.pausePlay.setup(), e.vars.slideshow && e.vars.pauseInvisible && q.pauseInvisible.init(), e.vars.slideshow && (e.vars.pauseOnHover && e.hover(function () {
                    e.manualPlay || e.manualPause || e.pause()
                }, function () {
                    e.manualPause || e.manualPlay || e.stopped || e.play()
                }), e.vars.pauseInvisible && q.pauseInvisible.isHidden() || (e.vars.initDelay > 0 ? e.startTimeout = setTimeout(e.play, e.vars.initDelay) : e.play())), p && q.asNav.setup(), i && e.vars.touch && q.touch(), (!o || o && e.vars.smoothHeight) && a(window).bind("resize orientationchange focus", q.resize), e.find("img").attr("draggable", "false"), setTimeout(function () {
                    e.vars.start(e)
                }, 200)
            }, asNav: {
                setup: function () {
                    e.asNav = !0, e.animatingTo = Math.floor(e.currentSlide / e.move), e.currentItem = e.currentSlide, e.slides.removeClass(g + "active-slide").eq(e.currentItem).addClass(g + "active-slide"), h ? (c._slider = e, e.slides.each(function () {
                        var b = this;
                        b._gesture = new MSGesture, b._gesture.target = b, b.addEventListener("MSPointerDown", function (a) {
                            a.preventDefault(), a.currentTarget._gesture && a.currentTarget._gesture.addPointer(a.pointerId)
                        }, !1), b.addEventListener("MSGestureTap", function (b) {
                            b.preventDefault();
                            var c = a(this), d = c.index();
                            a(e.vars.asNavFor).data("flexslider").animating || c.hasClass("active") || (e.direction = e.currentItem < d ? "next" : "prev", e.flexAnimate(d, e.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : e.slides.on(j, function (b) {
                        b.preventDefault();
                        var c = a(this), d = c.index(), f = c.offset().left - a(e).scrollLeft();
                        0 >= f && c.hasClass(g + "active-slide") ? e.flexAnimate(e.getTarget("prev"), !0) : a(e.vars.asNavFor).data("flexslider").animating || c.hasClass(g + "active-slide") || (e.direction = e.currentItem < d ? "next" : "prev", e.flexAnimate(d, e.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            }, controlNav: {
                setup: function () {
                    e.manualControls ? q.controlNav.setupManual() : q.controlNav.setupPaging()
                }, setupPaging: function () {
                    var b, c, d = "thumbnails" === e.vars.controlNav ? "control-thumbs" : "control-paging", f = 1;
                    if (e.controlNavScaffold = a('<ol class="' + g + "control-nav " + g + d + '"></ol>'), e.pagingCount > 1) for (var h = 0; h < e.pagingCount; h++) {
                        c = e.slides.eq(h), void 0 === c.attr("data-thumb-alt") && c.attr("data-thumb-alt", "");
                        var i = "" !== c.attr("data-thumb-alt") ? i = ' alt="' + c.attr("data-thumb-alt") + '"' : "";
                        if (b = "thumbnails" === e.vars.controlNav ? '<img src="' + c.attr("data-thumb") + '"' + i + "/>" : '<a href="#">' + f + "</a>", "thumbnails" === e.vars.controlNav && !0 === e.vars.thumbCaptions) {
                            var l = c.attr("data-thumbcaption");
                            "" !== l && void 0 !== l && (b += '<span class="' + g + 'caption">' + l + "</span>")
                        }
                        e.controlNavScaffold.append("<li>" + b + "</li>"), f++
                    }
                    e.controlsContainer ? a(e.controlsContainer).append(e.controlNavScaffold) : e.append(e.controlNavScaffold), q.controlNav.set(), q.controlNav.active(), e.controlNavScaffold.delegate("a, img", j, function (b) {
                        if (b.preventDefault(), "" === k || k === b.type) {
                            var c = a(this), d = e.controlNav.index(c);
                            c.hasClass(g + "active") || (e.direction = d > e.currentSlide ? "next" : "prev", e.flexAnimate(d, e.vars.pauseOnAction))
                        }
                        "" === k && (k = b.type), q.setToClearWatchedEvent()
                    })
                }, setupManual: function () {
                    e.controlNav = e.manualControls, q.controlNav.active(), e.controlNav.bind(j, function (b) {
                        if (b.preventDefault(), "" === k || k === b.type) {
                            var c = a(this), d = e.controlNav.index(c);
                            c.hasClass(g + "active") || (e.direction = d > e.currentSlide ? "next" : "prev", e.flexAnimate(d, e.vars.pauseOnAction))
                        }
                        "" === k && (k = b.type), q.setToClearWatchedEvent()
                    })
                }, set: function () {
                    var b = "thumbnails" === e.vars.controlNav ? "img" : "a";
                    e.controlNav = a("." + g + "control-nav li " + b, e.controlsContainer ? e.controlsContainer : e)
                }, active: function () {
                    e.controlNav.removeClass(g + "active").eq(e.animatingTo).addClass(g + "active")
                }, update: function (b, c) {
                    e.pagingCount > 1 && "add" === b ? e.controlNavScaffold.append(a('<li><a href="#">' + e.count + "</a></li>")) : 1 === e.pagingCount ? e.controlNavScaffold.find("li").remove() : e.controlNav.eq(c).closest("li").remove(), q.controlNav.set(), e.pagingCount > 1 && e.pagingCount !== e.controlNav.length ? e.update(c, b) : q.controlNav.active()
                }
            }, directionNav: {
                setup: function () {
                    var b = a('<ul class="' + g + 'direction-nav"><li class="' + g + 'nav-prev"><a class="' + g + 'prev" href="#">' + e.vars.prevText + '</a></li><li class="' + g + 'nav-next"><a class="' + g + 'next" href="#">' + e.vars.nextText + "</a></li></ul>");
                    e.customDirectionNav ? e.directionNav = e.customDirectionNav : e.controlsContainer ? (a(e.controlsContainer).append(b), e.directionNav = a("." + g + "direction-nav li a", e.controlsContainer)) : (e.append(b), e.directionNav = a("." + g + "direction-nav li a", e)), q.directionNav.update(), e.directionNav.bind(j, function (b) {
                        b.preventDefault();
                        var c;
                        ("" === k || k === b.type) && (c = e.getTarget(a(this).hasClass(g + "next") ? "next" : "prev"), e.flexAnimate(c, e.vars.pauseOnAction)), "" === k && (k = b.type), q.setToClearWatchedEvent()
                    })
                }, update: function () {
                    var a = g + "disabled";
                    1 === e.pagingCount ? e.directionNav.addClass(a).attr("tabindex", "-1") : e.vars.animationLoop ? e.directionNav.removeClass(a).removeAttr("tabindex") : 0 === e.animatingTo ? e.directionNav.removeClass(a).filter("." + g + "prev").addClass(a).attr("tabindex", "-1") : e.animatingTo === e.last ? e.directionNav.removeClass(a).filter("." + g + "next").addClass(a).attr("tabindex", "-1") : e.directionNav.removeClass(a).removeAttr("tabindex")
                }
            }, pausePlay: {
                setup: function () {
                    var b = a('<div class="' + g + 'pauseplay"><a href="#"></a></div>');
                    e.controlsContainer ? (e.controlsContainer.append(b), e.pausePlay = a("." + g + "pauseplay a", e.controlsContainer)) : (e.append(b), e.pausePlay = a("." + g + "pauseplay a", e)), q.pausePlay.update(e.vars.slideshow ? g + "pause" : g + "play"), e.pausePlay.bind(j, function (b) {
                        b.preventDefault(), ("" === k || k === b.type) && (a(this).hasClass(g + "pause") ? (e.manualPause = !0, e.manualPlay = !1, e.pause()) : (e.manualPause = !1, e.manualPlay = !0, e.play())), "" === k && (k = b.type), q.setToClearWatchedEvent()
                    })
                }, update: function (a) {
                    "play" === a ? e.pausePlay.removeClass(g + "pause").addClass(g + "play").html(e.vars.playText) : e.pausePlay.removeClass(g + "play").addClass(g + "pause").html(e.vars.pauseText)
                }
            }, touch: function () {
                function a(a) {
                    a.stopPropagation(), e.animating ? a.preventDefault() : (e.pause(), c._gesture.addPointer(a.pointerId), w = 0, j = l ? e.h : e.w, p = Number(new Date), i = n && m && e.animatingTo === e.last ? 0 : n && m ? e.limit - (e.itemW + e.vars.itemMargin) * e.move * e.animatingTo : n && e.currentSlide === e.last ? e.limit : n ? (e.itemW + e.vars.itemMargin) * e.move * e.currentSlide : m ? (e.last - e.currentSlide + e.cloneOffset) * j : (e.currentSlide + e.cloneOffset) * j)
                }

                function b(a) {
                    a.stopPropagation();
                    var b = a.target._slider;
                    if (b) {
                        var d = -a.translationX, e = -a.translationY;
                        return w += l ? e : d, k = w, t = l ? Math.abs(w) < Math.abs(-d) : Math.abs(w) < Math.abs(-e), a.detail === a.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
                            c._gesture.stop()
                        }) : void((!t || Number(new Date) - p > 500) && (a.preventDefault(), !o && b.transitions && (b.vars.animationLoop || (k = w / (0 === b.currentSlide && 0 > w || b.currentSlide === b.last && w > 0 ? Math.abs(w) / j + 2 : 1)), b.setProps(i + k, "setTouch"))))
                    }
                }

                function d(a) {
                    a.stopPropagation();
                    var b = a.target._slider;
                    if (b) {
                        if (b.animatingTo === b.currentSlide && !t && null !== k) {
                            var c = m ? -k : k, d = b.getTarget(c > 0 ? "next" : "prev");
                            b.canAdvance(d) && (Number(new Date) - p < 550 && Math.abs(c) > 50 || Math.abs(c) > j / 2) ? b.flexAnimate(d, b.vars.pauseOnAction) : o || b.flexAnimate(b.currentSlide, b.vars.pauseOnAction, !0)
                        }
                        f = null, g = null, k = null, i = null, w = 0
                    }
                }

                var f, g, i, j, k, p, q, r, s, t = !1, u = 0, v = 0, w = 0;
                h ? (c.style.msTouchAction = "none", c._gesture = new MSGesture, c._gesture.target = c, c.addEventListener("MSPointerDown", a, !1), c._slider = e, c.addEventListener("MSGestureChange", b, !1), c.addEventListener("MSGestureEnd", d, !1)) : (q = function (a) {
                    e.animating ? a.preventDefault() : (window.navigator.msPointerEnabled || 1 === a.touches.length) && (e.pause(), j = l ? e.h : e.w, p = Number(new Date), u = a.touches[0].pageX, v = a.touches[0].pageY, i = n && m && e.animatingTo === e.last ? 0 : n && m ? e.limit - (e.itemW + e.vars.itemMargin) * e.move * e.animatingTo : n && e.currentSlide === e.last ? e.limit : n ? (e.itemW + e.vars.itemMargin) * e.move * e.currentSlide : m ? (e.last - e.currentSlide + e.cloneOffset) * j : (e.currentSlide + e.cloneOffset) * j, f = l ? v : u, g = l ? u : v, c.addEventListener("touchmove", r, !1), c.addEventListener("touchend", s, !1))
                }, r = function (a) {
                    u = a.touches[0].pageX, v = a.touches[0].pageY, k = l ? f - v : f - u, t = l ? Math.abs(k) < Math.abs(u - g) : Math.abs(k) < Math.abs(v - g);
                    var b = 500;
                    (!t || Number(new Date) - p > b) && (a.preventDefault(), !o && e.transitions && (e.vars.animationLoop || (k /= 0 === e.currentSlide && 0 > k || e.currentSlide === e.last && k > 0 ? Math.abs(k) / j + 2 : 1), e.setProps(i + k, "setTouch")))
                }, s = function () {
                    if (c.removeEventListener("touchmove", r, !1), e.animatingTo === e.currentSlide && !t && null !== k) {
                        var a = m ? -k : k, b = e.getTarget(a > 0 ? "next" : "prev");
                        e.canAdvance(b) && (Number(new Date) - p < 550 && Math.abs(a) > 50 || Math.abs(a) > j / 2) ? e.flexAnimate(b, e.vars.pauseOnAction) : o || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                    }
                    c.removeEventListener("touchend", s, !1), f = null, g = null, k = null, i = null
                }, c.addEventListener("touchstart", q, !1))
            }, resize: function () {
                !e.animating && e.is(":visible") && (n || e.doMath(), o ? q.smoothHeight() : n ? (e.slides.width(e.computedW), e.update(e.pagingCount), e.setProps()) : l ? (e.viewport.height(e.h), e.setProps(e.h, "setTotal")) : (e.vars.smoothHeight && q.smoothHeight(), e.newSlides.width(e.computedW), e.setProps(e.computedW, "setTotal")))
            }, smoothHeight: function (a) {
                if (!l || o) {
                    var b = o ? e : e.viewport;
                    a ? b.animate({height: e.slides.eq(e.animatingTo).innerHeight()}, a) : b.innerHeight(e.slides.eq(e.animatingTo).innerHeight())
                }
            }, sync: function (b) {
                var c = a(e.vars.sync).data("flexslider"), d = e.animatingTo;
                switch (b) {
                    case"animate":
                        c.flexAnimate(d, e.vars.pauseOnAction, !1, !0);
                        break;
                    case"play":
                        c.playing || c.asNav || c.play();
                        break;
                    case"pause":
                        c.pause()
                }
            }, uniqueID: function (b) {
                return b.filter("[id]").add(b.find("[id]")).each(function () {
                    var b = a(this);
                    b.attr("id", b.attr("id") + "_clone")
                }), b
            }, pauseInvisible: {
                visProp: null, init: function () {
                    var a = q.pauseInvisible.getHiddenProp();
                    if (a) {
                        var b = a.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(b, function () {
                            q.pauseInvisible.isHidden() ? e.startTimeout ? clearTimeout(e.startTimeout) : e.pause() : e.started ? e.play() : e.vars.initDelay > 0 ? setTimeout(e.play, e.vars.initDelay) : e.play()
                        })
                    }
                }, isHidden: function () {
                    var a = q.pauseInvisible.getHiddenProp();
                    return a ? document[a] : !1
                }, getHiddenProp: function () {
                    var a = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var b = 0; b < a.length; b++) if (a[b] + "Hidden" in document) return a[b] + "Hidden";
                    return null
                }
            }, setToClearWatchedEvent: function () {
                clearTimeout(f), f = setTimeout(function () {
                    k = ""
                }, 3e3)
            }
        }, e.flexAnimate = function (b, c, d, f, h) {
            if (e.vars.animationLoop || b === e.currentSlide || (e.direction = b > e.currentSlide ? "next" : "prev"), p && 1 === e.pagingCount && (e.direction = e.currentItem < b ? "next" : "prev"), !e.animating && (e.canAdvance(b, h) || d) && e.is(":visible")) {
                if (p && f) {
                    var j = a(e.vars.asNavFor).data("flexslider");
                    if (e.atEnd = 0 === b || b === e.count - 1, j.flexAnimate(b, !0, !1, !0, h), e.direction = e.currentItem < b ? "next" : "prev", j.direction = e.direction, Math.ceil((b + 1) / e.visible) - 1 === e.currentSlide || 0 === b) return e.currentItem = b, e.slides.removeClass(g + "active-slide").eq(b).addClass(g + "active-slide"), !1;
                    e.currentItem = b, e.slides.removeClass(g + "active-slide").eq(b).addClass(g + "active-slide"), b = Math.floor(b / e.visible)
                }
                if (e.animating = !0, e.animatingTo = b, c && e.pause(), e.vars.before(e), e.syncExists && !h && q.sync("animate"), e.vars.controlNav && q.controlNav.active(), n || e.slides.removeClass(g + "active-slide").eq(b).addClass(g + "active-slide"), e.atEnd = 0 === b || b === e.last, e.vars.directionNav && q.directionNav.update(), b === e.last && (e.vars.end(e), e.vars.animationLoop || e.pause()), o) i ? (e.slides.eq(e.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), e.slides.eq(b).css({
                    opacity: 1,
                    zIndex: 2
                }), e.wrapup(t)) : (e.slides.eq(e.currentSlide).css({zIndex: 1}).animate({opacity: 0}, e.vars.animationSpeed, e.vars.easing), e.slides.eq(b).css({zIndex: 2}).animate({opacity: 1}, e.vars.animationSpeed, e.vars.easing, e.wrapup)); else {
                    var k, r, s, t = l ? e.slides.filter(":first").height() : e.computedW;
                    n ? (k = e.vars.itemMargin, s = (e.itemW + k) * e.move * e.animatingTo, r = s > e.limit && 1 !== e.visible ? e.limit : s) : r = 0 === e.currentSlide && b === e.count - 1 && e.vars.animationLoop && "next" !== e.direction ? m ? (e.count + e.cloneOffset) * t : 0 : e.currentSlide === e.last && 0 === b && e.vars.animationLoop && "prev" !== e.direction ? m ? 0 : (e.count + 1) * t : m ? (e.count - 1 - b + e.cloneOffset) * t : (b + e.cloneOffset) * t, e.setProps(r, "", e.vars.animationSpeed), e.transitions ? (e.vars.animationLoop && e.atEnd || (e.animating = !1, e.currentSlide = e.animatingTo), e.container.unbind("webkitTransitionEnd transitionend"), e.container.bind("webkitTransitionEnd transitionend", function () {
                        clearTimeout(e.ensureAnimationEnd), e.wrapup(t)
                    }), clearTimeout(e.ensureAnimationEnd), e.ensureAnimationEnd = setTimeout(function () {
                        e.wrapup(t)
                    }, e.vars.animationSpeed + 100)) : e.container.animate(e.args, e.vars.animationSpeed, e.vars.easing, function () {
                        e.wrapup(t)
                    })
                }
                e.vars.smoothHeight && q.smoothHeight(e.vars.animationSpeed)
            }
        }, e.wrapup = function (a) {
            o || n || (0 === e.currentSlide && e.animatingTo === e.last && e.vars.animationLoop ? e.setProps(a, "jumpEnd") : e.currentSlide === e.last && 0 === e.animatingTo && e.vars.animationLoop && e.setProps(a, "jumpStart")), e.animating = !1, e.currentSlide = e.animatingTo, e.vars.after(e)
        }, e.animateSlides = function () {
            !e.animating && b && e.flexAnimate(e.getTarget("next"))
        }, e.pause = function () {
            clearInterval(e.animatedSlides), e.animatedSlides = null, e.playing = !1, e.vars.pausePlay && q.pausePlay.update("play"), e.syncExists && q.sync("pause")
        }, e.play = function () {
            e.playing && clearInterval(e.animatedSlides), e.animatedSlides = e.animatedSlides || setInterval(e.animateSlides, e.vars.slideshowSpeed), e.started = e.playing = !0, e.vars.pausePlay && q.pausePlay.update("pause"), e.syncExists && q.sync("play")
        }, e.stop = function () {
            e.pause(), e.stopped = !0
        }, e.canAdvance = function (a, b) {
            var c = p ? e.pagingCount - 1 : e.last;
            return b ? !0 : p && e.currentItem === e.count - 1 && 0 === a && "prev" === e.direction ? !0 : p && 0 === e.currentItem && a === e.pagingCount - 1 && "next" !== e.direction ? !1 : a !== e.currentSlide || p ? e.vars.animationLoop ? !0 : e.atEnd && 0 === e.currentSlide && a === c && "next" !== e.direction ? !1 : e.atEnd && e.currentSlide === c && 0 === a && "next" === e.direction ? !1 : !0 : !1
        }, e.getTarget = function (a) {
            return e.direction = a, "next" === a ? e.currentSlide === e.last ? 0 : e.currentSlide + 1 : 0 === e.currentSlide ? e.last : e.currentSlide - 1
        }, e.setProps = function (a, b, c) {
            var d = function () {
                var c = a ? a : (e.itemW + e.vars.itemMargin) * e.move * e.animatingTo, d = function () {
                    if (n) return "setTouch" === b ? a : m && e.animatingTo === e.last ? 0 : m ? e.limit - (e.itemW + e.vars.itemMargin) * e.move * e.animatingTo : e.animatingTo === e.last ? e.limit : c;
                    switch (b) {
                        case"setTotal":
                            return m ? (e.count - 1 - e.currentSlide + e.cloneOffset) * a : (e.currentSlide + e.cloneOffset) * a;
                        case"setTouch":
                            return m ? a : a;
                        case"jumpEnd":
                            return m ? a : e.count * a;
                        case"jumpStart":
                            return m ? e.count * a : a;
                        default:
                            return a
                    }
                }();
                return -1 * d + "px"
            }();
            e.transitions && (d = l ? "translate3d(0," + d + ",0)" : "translate3d(" + d + ",0,0)", c = void 0 !== c ? c / 1e3 + "s" : "0s", e.container.css("-" + e.pfx + "-transition-duration", c), e.container.css("transition-duration", c)), e.args[e.prop] = d, (e.transitions || void 0 === c) && e.container.css(e.args), e.container.css("transform", d)
        }, e.setup = function (b) {
            if (o) e.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === b && (i ? e.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + e.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(e.currentSlide).css({opacity: 1, zIndex: 2}) : 0 == e.vars.fadeFirstSlide ? e.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(e.currentSlide).css({zIndex: 2}).css({opacity: 1}) : e.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(e.currentSlide).css({zIndex: 2}).animate({opacity: 1}, e.vars.animationSpeed, e.vars.easing)), e.vars.smoothHeight && q.smoothHeight(); else {
                var c, d;
                "init" === b && (e.viewport = a('<div class="' + g + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(e).append(e.container), e.cloneCount = 0, e.cloneOffset = 0, m && (d = a.makeArray(e.slides).reverse(), e.slides = a(d), e.container.empty().append(e.slides))), e.vars.animationLoop && !n && (e.cloneCount = 2, e.cloneOffset = 1, "init" !== b && e.container.find(".clone").remove(), e.container.append(q.uniqueID(e.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(q.uniqueID(e.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), e.newSlides = a(e.vars.selector, e), c = m ? e.count - 1 - e.currentSlide + e.cloneOffset : e.currentSlide + e.cloneOffset, l && !n ? (e.container.height(200 * (e.count + e.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                    e.newSlides.css({display: "block"}), e.doMath(), e.viewport.height(e.h), e.setProps(c * e.h, "init")
                }, "init" === b ? 100 : 0)) : (e.container.width(200 * (e.count + e.cloneCount) + "%"), e.setProps(c * e.computedW, "init"), setTimeout(function () {
                    e.doMath(), e.newSlides.css({
                        width: e.computedW,
                        marginRight: e.computedM,
                        "float": "left",
                        display: "block"
                    }), e.vars.smoothHeight && q.smoothHeight()
                }, "init" === b ? 100 : 0))
            }
            n || e.slides.removeClass(g + "active-slide").eq(e.currentSlide).addClass(g + "active-slide"), e.vars.init(e)
        }, e.doMath = function () {
            var a = e.slides.first(), b = e.vars.itemMargin, c = e.vars.minItems, d = e.vars.maxItems;
            e.w = void 0 === e.viewport ? e.width() : e.viewport.width(), e.h = a.height(), e.boxPadding = a.outerWidth() - a.width(), n ? (e.itemT = e.vars.itemWidth + b, e.itemM = b, e.minW = c ? c * e.itemT : e.w, e.maxW = d ? d * e.itemT - b : e.w, e.itemW = e.minW > e.w ? (e.w - b * (c - 1)) / c : e.maxW < e.w ? (e.w - b * (d - 1)) / d : e.vars.itemWidth > e.w ? e.w : e.vars.itemWidth, e.visible = Math.floor(e.w / e.itemW), e.move = e.vars.move > 0 && e.vars.move < e.visible ? e.vars.move : e.visible, e.pagingCount = Math.ceil((e.count - e.visible) / e.move + 1), e.last = e.pagingCount - 1, e.limit = 1 === e.pagingCount ? 0 : e.vars.itemWidth > e.w ? e.itemW * (e.count - 1) + b * (e.count - 1) : (e.itemW + b) * e.count - e.w - b) : (e.itemW = e.w, e.itemM = b, e.pagingCount = e.count, e.last = e.count - 1), e.computedW = e.itemW - e.boxPadding, e.computedM = e.itemM
        }, e.update = function (a, b) {
            e.doMath(), n || (a < e.currentSlide ? e.currentSlide += 1 : a <= e.currentSlide && 0 !== a && (e.currentSlide -= 1), e.animatingTo = e.currentSlide), e.vars.controlNav && !e.manualControls && ("add" === b && !n || e.pagingCount > e.controlNav.length ? q.controlNav.update("add") : ("remove" === b && !n || e.pagingCount < e.controlNav.length) && (n && e.currentSlide > e.last && (e.currentSlide -= 1, e.animatingTo -= 1), q.controlNav.update("remove", e.last))), e.vars.directionNav && q.directionNav.update()
        }, e.addSlide = function (b, c) {
            var d = a(b);
            e.count += 1, e.last = e.count - 1, l && m ? void 0 !== c ? e.slides.eq(e.count - c).after(d) : e.container.prepend(d) : void 0 !== c ? e.slides.eq(c).before(d) : e.container.append(d), e.update(c, "add"), e.slides = a(e.vars.selector + ":not(.clone)", e), e.setup(), e.vars.added(e)
        }, e.removeSlide = function (b) {
            var c = isNaN(b) ? e.slides.index(a(b)) : b;
            e.count -= 1, e.last = e.count - 1, isNaN(b) ? a(b, e.slides).remove() : l && m ? e.slides.eq(e.last).remove() : e.slides.eq(b).remove(), e.doMath(), e.update(c, "remove"), e.slides = a(e.vars.selector + ":not(.clone)", e), e.setup(), e.vars.removed(e)
        }, q.init()
    }, a(window).blur(function () {
        b = !1
    }).focus(function () {
        b = !0
    }), a.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {
        },
        before: function () {
        },
        after: function () {
        },
        end: function () {
        },
        added: function () {
        },
        removed: function () {
        },
        init: function () {
        }
    }, a.fn.flexslider = function (b) {
        if (void 0 === b && (b = {}), "object" == typeof b) return this.each(function () {
            var c = a(this), d = b.selector ? b.selector : ".slides > li", e = c.find(d);
            1 === e.length && b.allowOneSlide === !1 || 0 === e.length ? (e.fadeIn(400), b.start && b.start(c)) : void 0 === c.data("flexslider") && new a.flexslider(this, b)
        });
        var c = a(this).data("flexslider");
        switch (b) {
            case"play":
                c.play();
                break;
            case"pause":
                c.pause();
                break;
            case"stop":
                c.stop();
                break;
            case"next":
                c.flexAnimate(c.getTarget("next"), !0);
                break;
            case"prev":
            case"previous":
                c.flexAnimate(c.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof b && c.flexAnimate(b, !0)
        }
    }
}(jQuery), /*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
    /*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
    function (a, b) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", b) : "object" == typeof module && module.exports ? module.exports = b() : a.EvEmitter = b()
    }("undefined" != typeof window ? window : this, function () {
        function a() {
        }

        var b = a.prototype;
        return b.on = function (a, b) {
            if (a && b) {
                var c = this._events = this._events || {}, d = c[a] = c[a] || [];
                return -1 == d.indexOf(b) && d.push(b), this
            }
        }, b.once = function (a, b) {
            if (a && b) {
                this.on(a, b);
                var c = this._onceEvents = this._onceEvents || {}, d = c[a] = c[a] || {};
                return d[b] = !0, this
            }
        }, b.off = function (a, b) {
            var c = this._events && this._events[a];
            if (c && c.length) {
                var d = c.indexOf(b);
                return -1 != d && c.splice(d, 1), this
            }
        }, b.emitEvent = function (a, b) {
            var c = this._events && this._events[a];
            if (c && c.length) {
                var d = 0, e = c[d];
                b = b || [];
                for (var f = this._onceEvents && this._onceEvents[a]; e;) {
                    var g = f && f[e];
                    g && (this.off(a, e), delete f[e]), e.apply(this, b), d += g ? 0 : 1, e = c[d]
                }
                return this
            }
        }, b.allOff = b.removeAllListeners = function () {
            delete this._events, delete this._onceEvents
        }, a
    }), function (a, b) {
    fontSpy = function (a, c) {
        var d = b("html"), e = b("body"), f = a;
        if ("string" != typeof f || "" === f) throw"A valid fontName is required. fontName must be a string and must not be an empty string.";
        var g = {
                font: f, fontClass: f.toLowerCase().replace(/\s/g, ""), success: function () {
                }, failure: function () {
                }, testFont: "Courier New", testString: "QW@HhsXJ", glyphs: "", delay: 50, timeOut: 1e3, callback: b.noop
            }, h = b.extend(g, c),
            i = b("<span>" + h.testString + h.glyphs + "</span>").css("position", "absolute").css("top", "-9999px").css("left", "-9999px").css("visibility", "hidden").css("fontFamily", h.testFont).css("fontSize", "250px");
        e.append(i);
        var j = i.outerWidth();
        i.css("fontFamily", h.font + "," + h.testFont);
        var k = function () {
            d.addClass("no-" + h.fontClass), h && h.failure && h.failure(), h.callback(new Error("FontSpy timeout")), i.remove()
        }, l = function () {
            h.callback(), d.addClass(h.fontClass), h && h.success && h.success(), i.remove()
        }, m = function () {
            setTimeout(n, h.delay), h.timeOut = h.timeOut - h.delay
        }, n = function () {
            var a = i.outerWidth();
            j !== a ? l() : h.timeOut < 0 ? k() : m()
        };
        n()
    }
}(this, jQuery), /*!
 * imagesLoaded v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
    function (a, b) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (c) {
            return b(a, c)
        }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter")) : a.imagesLoaded = b(a, a.EvEmitter)
    }("undefined" != typeof window ? window : this, function (a, b) {
        function c(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }

        function d(a) {
            var b = [];
            if (Array.isArray(a)) b = a; else if ("number" == typeof a.length) for (var c = 0; c < a.length; c++) b.push(a[c]); else b.push(a);
            return b
        }

        function e(a, b, f) {
            return this instanceof e ? ("string" == typeof a && (a = document.querySelectorAll(a)), this.elements = d(a), this.options = c({}, this.options), "function" == typeof b ? f = b : c(this.options, b), f && this.on("always", f), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
                this.check()
            }.bind(this))) : new e(a, b, f)
        }

        function f(a) {
            this.img = a
        }

        function g(a, b) {
            this.url = a, this.element = b, this.img = new Image
        }

        var h = a.jQuery, i = a.console;
        e.prototype = Object.create(b.prototype), e.prototype.options = {}, e.prototype.getImages = function () {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, e.prototype.addElementImages = function (a) {
            "IMG" == a.nodeName && this.addImage(a), this.options.background === !0 && this.addElementBackgroundImages(a);
            var b = a.nodeType;
            if (b && j[b]) {
                for (var c = a.querySelectorAll("img"), d = 0; d < c.length; d++) {
                    var e = c[d];
                    this.addImage(e)
                }
                if ("string" == typeof this.options.background) {
                    var f = a.querySelectorAll(this.options.background);
                    for (d = 0; d < f.length; d++) {
                        var g = f[d];
                        this.addElementBackgroundImages(g)
                    }
                }
            }
        };
        var j = {1: !0, 9: !0, 11: !0};
        return e.prototype.addElementBackgroundImages = function (a) {
            var b = getComputedStyle(a);
            if (b) for (var c = /url\((['"])?(.*?)\1\)/gi, d = c.exec(b.backgroundImage); null !== d;) {
                var e = d && d[2];
                e && this.addBackground(e, a), d = c.exec(b.backgroundImage)
            }
        }, e.prototype.addImage = function (a) {
            var b = new f(a);
            this.images.push(b)
        }, e.prototype.addBackground = function (a, b) {
            var c = new g(a, b);
            this.images.push(c)
        }, e.prototype.check = function () {
            function a(a, c, d) {
                setTimeout(function () {
                    b.progress(a, c, d)
                })
            }

            var b = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (b) {
                b.once("progress", a), b.check()
            }) : void this.complete()
        }, e.prototype.progress = function (a, b, c) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded, this.emitEvent("progress", [this, a, b]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, a), this.progressedCount == this.images.length && this.complete(), this.options.debug && i && i.log("progress: " + c, a, b)
        }, e.prototype.complete = function () {
            var a = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(a, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var b = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[b](this)
            }
        }, f.prototype = Object.create(b.prototype), f.prototype.check = function () {
            var a = this.getIsImageComplete();
            return a ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, f.prototype.getIsImageComplete = function () {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, f.prototype.confirm = function (a, b) {
            this.isLoaded = a, this.emitEvent("progress", [this, this.img, b])
        }, f.prototype.handleEvent = function (a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, f.prototype.onload = function () {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, f.prototype.onerror = function () {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, f.prototype.unbindEvents = function () {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, g.prototype = Object.create(f.prototype), g.prototype.check = function () {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
            var a = this.getIsImageComplete();
            a && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, g.prototype.unbindEvents = function () {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, g.prototype.confirm = function (a, b) {
            this.isLoaded = a, this.emitEvent("progress", [this, this.element, b])
        }, e.makeJQueryPlugin = function (b) {
            b = b || a.jQuery, b && (h = b, h.fn.imagesLoaded = function (a, b) {
                var c = new e(this, a, b);
                return c.jqDeferred.promise(h(this))
            })
        }, e.makeJQueryPlugin(), e
    }), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (a, b, c, d, e) {
        return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
    }
});
/*! npm.im/iphone-inline-video 2.2.2 */
var enableInlineVideo = function () {
    "use strict";

    /*! npm.im/intervalometer */
    function a(a, b, c, d) {
        function e(c) {
            f = b(e, d), a(c - (g || c)), g = c
        }

        var f, g;
        return {
            start: function () {
                f || e(0)
            }, stop: function () {
                c(f), f = null, g = 0
            }
        }
    }

    function b(b) {
        return a(b, requestAnimationFrame, cancelAnimationFrame)
    }

    function c(a, b, c) {
        function d(d) {
            (!c || c(a, b)) && d.stopImmediatePropagation()
        }

        return a.addEventListener(b, d), d
    }

    function d(a, b, c, d) {
        function e() {
            return c[b]
        }

        function f(a) {
            c[b] = a
        }

        d && f(a[b]), Object.defineProperty(a, b, {get: e, set: f})
    }

    function e(a, b, c) {
        c.addEventListener(b, function () {
            return a.dispatchEvent(new Event(b))
        })
    }

    function f(a, b) {
        Promise.resolve().then(function () {
            a.dispatchEvent(new Event(b))
        })
    }

    function g(a) {
        var b = new Audio;
        return e(a, "play", b), e(a, "playing", b), e(a, "pause", b), b.crossOrigin = a.crossOrigin, b.src = a.src || a.currentSrc || "data:", b
    }

    function h(a, b, c) {
        (q || 0) + 200 < Date.now() && (a[t] = !0, q = Date.now()), c || (a.currentTime = b), w[++x % 3] = 100 * b | 0
    }

    function i(a) {
        return a.driver.currentTime >= a.video.duration
    }

    function j(a) {
        var b = this;
        b.video.readyState >= b.video.HAVE_FUTURE_DATA ? (b.hasAudio || (b.driver.currentTime = b.video.currentTime + a * b.video.playbackRate / 1e3, b.video.loop && i(b) && (b.driver.currentTime = 0)), h(b.video, b.driver.currentTime)) : b.video.networkState === b.video.NETWORK_IDLE && 0 === b.video.buffered.length && b.video.load(), b.video.ended && (delete b.video[t], b.video.pause(!0))
    }

    function k() {
        var a = this, b = a[s];
        return a.webkitDisplayingFullscreen ? void a[u]() : ("data:" !== b.driver.src && b.driver.src !== a.src && (h(a, 0, !0), b.driver.src = a.src), void(a.paused && (b.paused = !1, 0 === a.buffered.length && a.load(), b.driver.play(), b.updater.start(), b.hasAudio || (f(a, "play"), b.video.readyState >= b.video.HAVE_ENOUGH_DATA && f(a, "playing")))))
    }

    function l(a) {
        var b = this, c = b[s];
        c.driver.pause(), c.updater.stop(), b.webkitDisplayingFullscreen && b[v](), (!c.paused || a) && (c.paused = !0, c.hasAudio || f(b, "pause"), b.ended && !b.webkitDisplayingFullscreen && (b[t] = !0, f(b, "ended")))
    }

    function m(a, c) {
        var d = {};
        a[s] = d, d.paused = !0, d.hasAudio = c, d.video = a, d.updater = b(j.bind(d)), c ? d.driver = g(a) : (a.addEventListener("canplay", function () {
            a.paused || f(a, "playing")
        }), d.driver = {
            src: a.src || a.currentSrc || "data:", muted: !0, paused: !0, pause: function () {
                d.driver.paused = !0
            }, play: function () {
                d.driver.paused = !1, i(d) && h(a, 0)
            }, get ended() {
                return i(d)
            }
        }), a.addEventListener("emptied", function () {
            var b = !d.driver.src || "data:" === d.driver.src;
            d.driver.src && d.driver.src !== a.src && (h(a, 0, !0), d.driver.src = a.src, b || !c && a.autoplay ? d.driver.play() : d.updater.stop())
        }, !1), a.addEventListener("webkitbeginfullscreen", function () {
            a.paused ? c && 0 === d.driver.buffered.length && d.driver.load() : (a.pause(), a[u]())
        }), c && (a.addEventListener("webkitendfullscreen", function () {
            d.driver.currentTime = a.currentTime
        }), a.addEventListener("seeking", function () {
            w.indexOf(100 * a.currentTime | 0) < 0 && (d.driver.currentTime = a.currentTime)
        }))
    }

    function n(a) {
        var b = a[t];
        return delete a[t], !a.webkitDisplayingFullscreen && !b
    }

    function o(a) {
        var b = a[s];
        a[u] = a.play, a[v] = a.pause, a.play = k, a.pause = l, d(a, "paused", b.driver), d(a, "muted", b.driver, !0), d(a, "playbackRate", b.driver, !0), d(a, "ended", b.driver), d(a, "loop", b.driver, !0), c(a, "seeking", function (a) {
            return !a.webkitDisplayingFullscreen
        }), c(a, "seeked", function (a) {
            return !a.webkitDisplayingFullscreen
        }), c(a, "timeupdate", n), c(a, "ended", n)
    }

    function p(a, b) {
        if (void 0 === b && (b = {}), !a[s]) {
            if (!b.everywhere) {
                if (!r) return;
                if (!(b.iPad || b.ipad ? /iPhone|iPod|iPad/ : /iPhone|iPod/).test(navigator.userAgent)) return
            }
            a.pause();
            var c = a.autoplay;
            a.autoplay = !1, m(a, !a.muted), o(a), a.classList.add("IIV"), a.muted && c && (a.play(), a.addEventListener("playing", function d() {
                a.autoplay = !0, a.removeEventListener("playing", d)
            })), /iPhone|iPod|iPad/.test(navigator.platform) || console.warn("iphone-inline-video is not guaranteed to work in emulated environments")
        }
    }

    var q,
        r = "object" == typeof document && "object-fit" in document.head.style && !matchMedia("(-webkit-video-playable-inline)").matches,
        s = "bfred-it:iphone-inline-video", t = "bfred-it:iphone-inline-video:event",
        u = "bfred-it:iphone-inline-video:nativeplay", v = "bfred-it:iphone-inline-video:nativepause", w = [], x = 0;
    return p
}();
!function (a) {
    var b, c, d = a.event;
    b = d.special.debouncedresize = {
        setup: function () {
            a(this).on("resize", b.handler)
        }, teardown: function () {
            a(this).off("resize", b.handler)
        }, handler: function (a, e) {
            var f = this, g = arguments, h = function () {
                a.type = "debouncedresize", d.dispatch.apply(f, g)
            };
            c && clearTimeout(c), e ? h() : c = setTimeout(h, b.threshold)
        }, threshold: 150
    }
}(jQuery);
var $BODY, $HTML, $WINDOW, newsManager, contactManager, $BREAKPOINTMANAGER, $ = jQuery;
$(function () {
    $BODY = $("body"), $HTML = $("html"), $WINDOW = $(window), $BREAKPOINTMANAGER = new BreakpointManager, ("ontouchstart" in window || "ontouch" in window) && $HTML.addClass("touch"), $("video").each(function () {
        enableInlineVideo(this)
    }), $BODY.hasClass("single-work") ? new WorkSlideshow("work", ".slideshow") : $BODY.hasClass("home") ? ($("#splash").length ? fontSpy("tej-font", {
        glyphs: "TEJ",
        success: function () {
            $("#splash").imagesLoaded().done(function () {
                new WorkSlideshow("splash", ".splash-slideshow")
            })
        },
        failure: function () {
        }
    }) : $(".slideshow").imagesLoaded().done(function () {
        $("#loading-indicator").fadeOut(), new WorkSlideshow("home", ".slideshow"), $(".slideshow").flexslider("play"), setTimeout(function () {
            $BODY.addClass("splash-done"), $(".home-logo").addClass("animated-in")
        }, 100)
    }), new WorkSlideshow("home", ".slideshow")) : $BODY.hasClass("work") ? new RolloverManager : $BODY.hasClass("studio") && isIOS() && !function () {
        $HTML.css({"background-image": $(".background-image").css("background-image")}).addClass("studio")
    }(), $("header .hamburger, .nav-header .hamburger").on("click", function () {
        return $BODY.hasClass("nav-showing") ? $BODY.removeClass("nav-showing") : $BODY.addClass("nav-showing"), !1
    })
}), WorkSlideshow.prototype.getConfig = function (a) {
    var b, c, d = this;
    switch (a) {
        case"work":
            c = {
                animation: "slide", video: !0, easing: "easeInOutExpo", slideshow: !1, start: function () {
                    d.$slider.css("opacity", 1), d.$slideItems = d.$slider.find("li img, li video"), $(".slideshow video").each(function () {
                        this.play()
                    }), d.resizeSlides(), $(".left-arrow").on("click", function () {
                        $(".flex-prev").trigger("click")
                    }), $(".right-arrow").on("click", function () {
                        $(".flex-next").trigger("click")
                    })
                }, after: function (a) {
                    d.$pageNumber.text(a.animatingTo + 1)
                }
            };
            break;
        case"home":
            c = {
                animation: "slide",
                video: !0,
                easing: "easeInOutExpo",
                slideshow: !1,
                slideshowSpeed: 3e3,
                start: function () {
                    d.$slideItems = d.$slider.find("img, video"), d.resizeSlides()
                },
                after: function (a) {
                    d.$pageNumber.text(a.animatingTo + 1)
                }
            };
            break;
        case"splash":
            b = function () {
                $BODY.addClass("splash-done"), d.$slider.fadeOut("fast", function () {
                    d.$slider.remove(), $(".home-logo").addClass("animated-in")
                })
            }, c = {
                video: !0,
                easing: "easeInOutExpo",
                slideshow: !0,
                slideshowSpeed: 500,
                animationSpeed: 50,
                start: function () {
                    $(".skip-splash a").on("click", function () {
                        return b(), !1
                    }), d.$slider.css("opacity", 1), d.$slideItems = d.$slider.find("img, video"), d.resizeSlides(), $("#loading-indicator").fadeOut(), $(".slideshow").flexslider("play")
                },
                after: function (a) {
                    9 === a.animatingTo && setTimeout(function () {
                        b()
                    }, 300)
                }
            };
            break;
        default:
            alert("Unknown slideshow type: " + a)
    }
    return c
}, WorkSlideshow.prototype.resizeSlides = function () {
    var a, b, c, d, e, f, g, h, i, j, k = this, l = this.$slider.width(), m = this.$slider.height(), n = l / m;
    if (function () {
        var a;
        0 !== k.$info.length && (a = $WINDOW.height() - k.$infoLinks.outerHeight(!1) - k.$info.position().top, k.idealHeight = "calc(" + a + "px - 3.25rem)", $BODY.hasClass("info-showing") && k.$info.attr("style", "max-height: " + k.idealHeight))
    }(), this.$slideItems) for (a = 0; a < this.$slideItems.length; a++) {
        switch (i = this.$slideItems[a], j = $(i), i.tagName) {
            case"IMG":
                b = i.naturalWidth, c = i.naturalHeight;
                break;
            case"VIDEO":
                b = i.videoWidth, c = i.videoHeight
        }
        h = b / c, n > h ? (d = l, e = l / h, g = e - m, f = 0) : (e = m, d = m * h, g = 0, f = d - l), j.css({
            width: d,
            height: e,
            left: -1 * f / 2,
            top: -1 * g / 2
        })
    }
}, BreakpointManager.prototype.refresh = function () {
    var a = window.getComputedStyle(document.querySelector("body"), ":before").getPropertyValue("content").replace(/\"/g, "");
    this.breakpoint !== a && (this.breakpoint = a, $WINDOW.trigger("breakpointChanged"))
};
//# sourceMappingURL=all.min.map