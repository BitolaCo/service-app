angular.module("ministryApp", ["ngMaterial", "ngRoute", "ngSanitize", "ngTouch", "ngLocale"])
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
            $mdSidenav("left").toggle();
        };
        $rootScope.closeNav = function() {
            $log.log("Close");
            $mdSidenav("left").close();
        };

        $rootScope.getData();

    }]);
