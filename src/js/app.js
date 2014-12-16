angular.module('ministryApp', ['ngMaterial', "ngRoute", "ngSanitize", "ngTouch", "ngLocale"])
    .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home.html",
                controller: "HomeCtrl"
            })
            .when("/calendar/:year/:month/:day", {
                templateUrl: "views/calendar.html",
                controller: "CalendarCtrl"
            })
            .when('/return-visits', {
                templateUrl: "views/return-visits.html",
                controller: "ReturnVisitCtrl"
            })
            .when('/report', {
                templateUrl: "views/report.html",
                controller: "ReportCtrl"
            })
            .when('/records', {
                templateUrl: "views/records.html",
                controller: "RecordsCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            });
            $locationProvider.html5Mode(true);
    }])
    .run(["$rootScope", "$mdSidenav", "$window", "$location", "$log", function($rootScope, $mdSidenav, $window, $location, $log) {

        $rootScope.data = false;
        $rootScope.language = $window.localStorage.getItem("user.language") || "en";
        $rootScope.languages = [
            {code: "en", title: "English"},
            {code: "mk", title: "Macedonian"}
        ];

        $rootScope.toggleLanguage = function() {
            var changed = false;
            angular.forEach($rootScope.languages, function(lang, i) {
                if(lang.code === $rootScope.language && ! changed) {
                    $rootScope.language = ($rootScope.languages[i + 1] || $rootScope.languages[0]).code;
                    changed = true;
                }
            });

            if (changed) {
                $window.localStorage.setItem("user.language", $rootScope.language);
                $window.location.reload();
            }

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
            $mdSidenav('left').toggle();
        };
        $rootScope.closeNav = function() {
            $log.log("Close");
            $mdSidenav('left').close();
        };

        var calendar = $("#calendar").kendoCalendar({
            change: function() {
                var d = this.value();
                $rootScope.$apply(function() {
                    var url = [
                        "/calendar", d.getFullYear(), d.getMonth() + 1, d.getDate()
                    ].join("/");
                    $log.log(url);
                    $rootScope.go(url);
                });
            }
        });

        $rootScope.getData();

    }])
    .controller('CalendarCtrl', ["$scope", "$routeParams", "$log", function($scope, $routeParams, $log) {

        $scope.date = new Date($routeParams.year, $routeParams.month - 1, $routeParams.day);
        $scope.increment = function(field, amt) {
            if ($scope.day[field] < 1 && amt < 0) {
                return;
            }
            $scope.day[field] += parseInt(amt);
        };

        const SINGLE_DAY = 1000*60*60*24;
        $scope.nextDay = function() {
            $scope.goToDate(new Date($scope.date.getTime() + SINGLE_DAY));
        };

        $scope.prevDay = function() {
            $scope.goToDate(new Date($scope.date.getTime() - SINGLE_DAY));
        };

        $scope.goToDate = function(d) {
            $scope.go(["/calendar", d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/"));
        };

        (function() {

            var y = $routeParams.year,
                m = $routeParams.month,
                d = $routeParams.day,
                data = $scope.data;

            if (! data[y]) data[y] = {};
            if (! data[y][m]) { data[y][m] = {}; }
            if (! data[y][m][d]) {
                data[y][m][d] = {
                    p: 0,
                    h: 0,
                    r: 0,
                    m: 0,
                    s: 0,
                    n: "",
                    t: 0,
                    b: 0
                };
            }
            $scope.day = data[y][m][d];

        }());

        $scope.$watchCollection("day", $scope.saveData);


    }])
    .filter("translate", ["$rootScope", function($rootScope) {
        return function(text, lang) {

            lang = lang || $rootScope.language;

            var translator = {
                "mk": {
                    "Hours": "Sati",
                    "Hours (planned)": "Sati (planirano)",
                    "Tracts & brochures": "Traktati",
                    "Return visits": "Povtorni poseti",
                    "Books": "Knigi",
                    "Bible studies": "Bibliski Studii",
                    "Notes": "Beleski",
                    "Report": "Izvestai",
                    "My Planner": "Moj planir",
                    "Calendar": "Kalendar",
                    "House-to-house records": "Beleski od kuka do kuka",
                    "Coming soon!": "Naskoro"
                }
            };

            return translator[lang] && translator[lang][text] ? translator[lang][text] : text;

        }
    }])
    .filter("dateLocale", ["$rootScope", "$locale", "$filter", "$log", function($rootScope, $locale, $filter, $log) {
        return function (d, format) {
            if($rootScope.language === "mk") {

                var months = ["Januari", "Februari", "Mart", "April", "Maj", "Juni", "Juli", "Avgust", "Septemvri", "Oktomvri", "Noemvri", "Dekemvri"],
                    days = ["Nedela", "Ponedelnik", "Vtornik", "Sreda", "Cetvrtok", "Petok", "Sabota"];
                return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();
            } else {
                return $filter("date")(d, format);
            }
        }
    }])
    .controller('ReturnVisitCtrl', ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {

    }])
    .controller('ReportCtrl', ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {

    }])
    .controller('RecordsCtrl', ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {

    }])
    .controller('HomeCtrl', ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {

    }]);