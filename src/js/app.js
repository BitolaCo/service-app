Number.isNaN = Number.isNaN || function(value) {
    return typeof value === "number" && isNaN(value);
};

angular.module("ministryApp", ["ngMaterial", "ngRoute", "ngSanitize", "ngTouch", "ngLocale"])
    .config(["$routeProvider", "$locationProvider", function($routeProvider) {
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
            .when("/language", {
                templateUrl: "views/language.html",
                controller: "LanguageCtrl"
            })
            .otherwise({
                redirectTo: "/calendar"
            });
    }])
    .run(["$rootScope", "$mdSidenav", "$mdDialog", "$window", "$location", function($rootScope, $mdSidenav, $mdDialog, $window, $location) {

        $rootScope.language = $window.localStorage.getItem("user.language") || "en";

        $rootScope.languages = [
            {code: "en", title: "English"},
            {code: "mk", title: "Македонски"}
        ];

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
