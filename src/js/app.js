var DateSelectCtrl = function($scope, $mdDialog) {

    var shown = false;
    var show = setInterval(function() {
        if(! shown) {
            $("#calendar").kendoCalendar({
                change: function() {
                    var d = this.value();
                    $scope.$apply(function() {
                        var url = [
                            "/calendar", d.getFullYear(), d.getMonth() + 1, d.getDate()
                        ].join("/");
                        $mdDialog.hide(url);
                    });
                }
            });
            shown = true;
        } else {
            clearInterval(show);
        }
    }, 500);

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.$on("calendar:show", function() {
        if(! this.shown) {
            self.bootstrap();
            self.shown = true;
        }
    });

};

var LanguageSelectCtrl = function($scope, $mdDialog, languages) {

    console.log("LanguageSelectCtrl", languages);

    $scope.languages = languages;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

};

angular.module("ministryApp", ["ngMaterial", "ngRoute", "ngSanitize", "ngTouch", "ngLocale"])
    .directive("autoGrow", function() {

        return function(scope, element, attr){
            var minHeight = element[0].offsetHeight,
                paddingLeft = element.css("paddingLeft"),
                paddingRight = element.css("paddingRight");

            var $shadow = angular.element("<div></div>").css({
                position: "absolute",
                top: -10000,
                left: -10000,
                width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
                fontSize: element.css("fontSize"),
                fontFamily: element.css("fontFamily"),
                lineHeight: element.css("lineHeight"),
                resize:     "none"
            });
            angular.element(document.body).append($shadow);

            var update = function() {
                var times = function(string, number) {
                    for (var i = 0, r = ""; i < number; i++) {
                        r += string;
                    }
                    return r;
                };

                var val = element.val().replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/&/g, "&amp;")
                    .replace(/\n$/, "<br/>&nbsp;")
                    .replace(/\n/g, "<br/>")
                    .replace(/\s{2,}/g, function(space) { return times("&nbsp;", space.length - 1) + " " });
                $shadow.html(val);

                element.css("height", Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */, minHeight) + "px");
            };

            element.bind("keyup keydown keypress change", update);
            update();
        }
    })
    .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/calendar/:year?/:month?/:day?", {
                templateUrl: "views/calendar.html",
                controller: "CalendarCtrl"
            })
            .when("/return-visits", {
                templateUrl: "views/return-visits.html",
                controller: "ReturnVisitCtrl"
            })
            .when("/report/:year?/:month?", {
                templateUrl: "views/report.html",
                controller: "ReportCtrl"
            })
            .when("/records", {
                templateUrl: "views/records.html",
                controller: "RecordsCtrl"
            })
            .otherwise({
                redirectTo: "/calendar"
            });
    }])
    .run(["$rootScope", "$mdSidenav", "$mdDialog", "$window", "$location", "$log", function($rootScope, $mdSidenav, $mdDialog, $window, $location, $log) {

        $rootScope.data = false;
        $rootScope.language = $window.localStorage.getItem("user.language") || "en";
        $rootScope.languages = [
            {code: "en", title: "English"},
            {code: "mk", title: "Македонски"}
        ];

        var switchLanguage = function(language) {
            var changed = false;
            angular.forEach($rootScope.languages, function(lang, i) {
                if(lang.code === language && ! changed) {
                    $rootScope.language = lang.code;
                    changed = true;
                }
            });
            if (changed) {
                $window.localStorage.setItem("user.language", $rootScope.language);
                $window.location.reload();
            }
        };

        $rootScope.showCalendar = function(ev) {

            $mdDialog.show({
                controller: DateSelectCtrl,
                targetEvent: ev,
                templateUrl: "partials/calendar.html"
            })
                .then(function(url) {
                    $rootScope.go(url);
                }, function() {
                    $rootScope.alert = 'You cancelled the dialog.';
                });
        };

        $rootScope.changeLanguage = function(ev) {

            $mdDialog.show({
                controller: LanguageSelectCtrl,
                targetEvent: ev,
                templateUrl: "partials/language.html",
                locals: { languages: $rootScope.languages }
            })
                .then(function(language) {
                    switchLanguage(language);
                }, function() {
                    $rootScope.alert = 'You cancelled the dialog.';
                });
        };

        $rootScope.getData = function() {
            var data = $window.localStorage.getItem("user.data") || {};
            if(data && "string" === typeof data) {
                try {
                    data = JSON.parse(data);
                } catch(e) {
                    data = {};
                }
            }
            $rootScope.data = data;
        };

        $rootScope.go = function(str) {
            $rootScope.closeNav();
            $location.url(str);
        };

        $rootScope.saveData = function() {
            $log.log("Saving", $rootScope.data);
            $window.localStorage.setItem("user.data", JSON.stringify($rootScope.data));
        };

        $rootScope.$watchCollection("data", $rootScope.saveData);

        $rootScope.toggleNav = function() {
            $log.log("Toggle left");
            $mdSidenav("left").toggle();
        };
        $rootScope.closeNav = function() {
            $log.log("Close");
            $mdSidenav("left").close();
        };

        $rootScope.getData();

    }]);
