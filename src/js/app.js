"use strict";

Number.isNaN = Number.isNaN || function(value) {
    return typeof value === "number" && isNaN(value);
};

angular.module("ministryApp", ["ngMaterial", "ngRoute", "ngSanitize", "ngTouch", "ngLocale", "angular.translate"])
    .config(["$routeProvider", "$mdThemingProvider", function($routeProvider, $mdThemingProvider) {

        $mdThemingProvider.theme("default")
            .primaryPalette(window.localStorage.getItem("user.theme.primary") || "light-green")
            .accentPalette(window.localStorage.getItem("user.theme.accent") || "orange");

        $routeProvider
            .when("/calendar", {
                templateUrl: "views/calendar.html",
                controller: "CalendarCtrl"
            })
            .when("/date/:year/:month/:day", {
                templateUrl: "views/date.html",
                controller: "DateCtrl"
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
            .when("/settings", {
                templateUrl: "views/settings.html",
                controller: "SettingsCtrl"
            })
            .otherwise({
                redirectTo: "/calendar"
            });
    }])
    .run(["$rootScope", "$mdSidenav", "$mdDialog", "$window", "$location", "Language", function($rootScope, $mdSidenav, $mdDialog, $window, $location, Language) {

        $rootScope.language = new Language();

        $rootScope.go = function(str) {
            $rootScope.closeNav();
            $location.url(str);
        };

        $rootScope.toggleNav = function() {
            $mdSidenav("left").toggle();
        };

        $rootScope.closeNav = function() {
            $mdSidenav("left").close();
        };

    }]);
