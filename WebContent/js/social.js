"use strict";

function template(a, b, c) {
    return a.replace(/\{([^\}]+)\}/g, function(a, d) {
        return d in b ? c ? c(b[d]) : b[d] : a
    })
}
angular.module("ngSocial", []).directive("ngSocialButtons", ["$compile", "$q", "$parse", "$http", function() {
    return {
        restrict: "A",
        scope: {
            url: "=",
            title: "=",
            description: "=",
            image: "="
        },
        replace: !0,
        transclude: !0,
        template: '<div class="ng-social-container ng-cloak"><ul class="ng-social" ng-transclude></ul></div>',
        controller: ["$scope", "$q", "$http", function(a, b, c) {
            var d = {
                init: function(a, b, c) {
                    c.counter && (a.count = d.getCount(a.options))
                },
                link: function(b) {
                    b = b || {};
                    var c = b.urlOptions || {};
                    return c.url = a.url, c.title = a.title, c.image = a.image, c.description = a.description || "", d.makeUrl(b.clickUrl || b.popup.url, c)
                },
                clickShare: function(a, b) {
                    if (!a.shiftKey && !a.ctrlKey) {
                        a.preventDefault();
                        var c = !0;
                        if (angular.isFunction(b.click) && (c = b.click.call(this, b)), c) {
                            var e = d.link(b);
                            d.openPopup(e, b.popup)
                        }
                    }
                },
                openPopup: function(a, b) {
                    var c = Math.round(screen.width / 2 - b.width / 2),
                        d = 0;
                    screen.height > b.height && (d = Math.round(screen.height / 3 - b.height / 2));
                    var e = window.open(a, "sl_" + this.service, "left=" + c + ",top=" + d + "," + "width=" + b.width + ",height=" + b.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
                    e ? e.focus() : location.href = a
                },
                getCount: function(e) {
                    var f = b.defer(),
                        g = e.urlOptions || {};
                    g.url = a.url, g.title = a.title;
                    var h = d.makeUrl(e.counter.url, g);
                    return e.counter.get ? e.counter.get(h, f, c) : c.jsonp(h).success(function(a) {
                        e.counter.getNumber ? f.resolve(e.counter.getNumber(a)) : f.resolve(a)
                    }), f.promise
                },
                makeUrl: function(a, b) {
                    return template(a, b, encodeURIComponent)
                }
            };
            return d
        }],
        link: function(a) {
            a.$watch("title", function(a) {
                console.info(a)
            })
        }
    }
}]), angular.module("ngSocial").directive("ngSocialFacebook", function() {
    var a = {
        counter: {
            url: "http://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=JSON_CALLBACK",
            getNumber: function(a) {
                return a.data[0].total_count
            }
        },
        popup: {
            url: "http://www.facebook.com/sharer/sharer.php?u={url}",
            width: 600,
            height: 500
        }
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-facebook"), e && (b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialTwitter", function() {
    var a = {
        counter: {
            url: "http://urls.api.twitter.com/1/urls/count.json?url={url}&callback=JSON_CALLBACK",
            getNumber: function(a) {
                return a.count
            }
        },
        popup: {
            url: "http://twitter.com/intent/tweet?url={url}&text={title}",
            width: 600,
            height: 450
        },
        click: function(a) {
            return /[\.:\-–—]\s*$/.test(a.pageTitle) || (a.pageTitle += ":"), !0
        }
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-twitter"), e && (b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialGooglePlus", function() {
    var a = {
        popup: {
            url: "https://plus.google.com/share?url={url}",
            width: 700,
            height: 500
        }
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-google-plus"), e && (b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialVk", function() {
    var a = {
        counter: {
            url: "http://vkontakte.ru/share.php?act=count&url={url}&index={index}",
            get: function(b, c, d) {
                a._ || (a._ = [], window.VK || (window.VK = {}), window.VK.Share = {
                    count: function(b, c) {
                        a._[b].resolve(c)
                    }
                });
                var e = a._.length;
                a._.push(c), d.jsonp(b.replace("{index}", e))
            }
        },
        popup: {
            url: "http://vk.com/share.php?url={url}&title={title}&description={description}&image={image}",
            width: 550,
            height: 330
        }
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-vk"), e && (b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialOdnoklassniki", function() {
    var a = {
        counter: {
            url: "http://www.odnoklassniki.ru/dk?st.cmd=shareData&ref={url}&cb=JSON_CALLBACK",
            getNumber: function(a) {
                return a.count
            }
        },
        popup: {
            url: "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl={url}",
            width: 550,
            height: 360
        }
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-odnoklassniki"), e && (b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialMailru", function() {
    var a = {
        counter: {
            url: "http://connect.mail.ru/share_count?url_list={url}&callback=1&func=JSON_CALLBACK",
            getNumber: function(a) {
                for (var b in a)
                    if (a.hasOwnProperty(b)) return a[b].shares
            }
        },
        popup: {
            url: "http://connect.mail.ru/share?share_url={url}&title={title}",
            width: 550,
            height: 360
        }
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-mailru"), e && (b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialPinterest", function() {
    var a = {
        counter: {
            url: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=JSON_CALLBACK",
            getNumber: function(a) {
                return a.count
            }
        },
        popup: {
            url: "http://pinterest.com/pin/create/button/?url={url}&description={title}",
            width: 630,
            height: 270
        }
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-pinterest"), e && (b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialGithubForks", function() {
    var a = {
        counter: {
            url: "https://api.github.com/repos/{user}/{repository}?callback=JSON_CALLBACK",
            getNumber: function(a) {
                return a.data.forks_count
            }
        },
        clickUrl: "https://github.com/{user}/{repository}/"
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-github ng-social-github-forks"), e && (a.urlOptions = {
                user: d.user,
                repository: d.repository
            }, b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").directive("ngSocialGithub", function() {
    var a = {
        counter: {
            url: "https://api.github.com/repos/{user}/{repository}?callback=JSON_CALLBACK",
            getNumber: function(a) {
                return a.data.watchers_count
            }
        },
        clickUrl: "https://github.com/{user}/{repository}/"
    };
    return {
        restrict: "C",
        require: "^?ngSocialButtons",
        scope: !0,
        replace: !0,
        transclude: !0,
        template: '<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',
        controller: function() {},
        link: function(b, c, d, e) {
            c.addClass("ng-social-github"), e && (a.urlOptions = {
                user: d.user,
                repository: d.repository
            }, b.options = a, b.ctrl = e, e.init(b, c, a))
        }
    }
}), angular.module("ngSocial").run(["$templateCache", function(a) {
    a.put("/views/buttons.html", '<div class="ng-social-container ng-cloak"><ul class="ng-social" ng-transclude></ul></div>')
}]);
/*
//@ sourceMappingURL=angular-social.map
*/