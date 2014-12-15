angular.module('ministryApp', ['ngMaterial', "ngRoute", "ngSanitize", "ngTouch"])
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
            .otherwise({
                redirectTo: "/home"
            });
            $locationProvider.html5Mode(true);
    }])
    .run(["$rootScope", "$mdSidenav", "$window", "$location", "$log", function($rootScope, $mdSidenav, $window, $location, $log) {

        $rootScope.data = false;

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
            $location.url(str);
        };

        $rootScope.saveData = function() {
            $log.log("Saving", $rootScope.data);
            $window.localStorage.setItem("user.data", JSON.stringify($rootScope.data));
        };

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

    }])
    .controller('ReturnVisitCtrl', ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {

    }])
    .controller('ReportCtrl', ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {

    }])
    .controller('HomeCtrl', ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {

    }]);