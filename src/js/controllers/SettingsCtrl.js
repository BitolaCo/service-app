"use strict";

angular.module("ministryApp").controller("SettingsCtrl", ["$scope", "$window", function($scope, $window) {

        $scope.color = $window.localStorage.getItem("user.theme.primary") || "light-green";
        $scope.accent = $window.localStorage.getItem("user.theme.accent") || "orange";
        $scope.lang = $window.localStorage.getItem("user.language") || "en";

        $scope.colors = [
            "red", "pink", "purple", "deep-purple", "indigo", "blue",
            "light-blue", "cyan", "teal", "green", "light-green", "lime",
            "yellow", "amber", "orange", "deep-orange", "brown", "grey",
            "blue-grey"
        ];

        var switchTheme = function(color) {

            if ($scope.colors.indexOf(color) >= 0) {
               $window.localStorage.setItem("user.theme.primary", color);
               $window.location.reload();
            }

        };

        var switchAccent = function(color) {
            if ($scope.colors.indexOf(color) >= 0) {
                $window.localStorage.setItem("user.theme.accent", color);
                $window.location.reload();
            }
        };

        var switchLanguage = function(lang) {
            return $scope.language.use(lang).then(function() {
                $window.location.reload();
            });
        };

        $scope.$watch("color", function(val, old) {
            if(old && val && old !== val) {
                switchTheme(val);
            }
        });

        $scope.$watch("accent", function(val, old) {
            if(old && val && old !== val) {
                switchAccent(val);
            }
        });

        $scope.$watch("lang", function(val, old) {
            if(old && val && old !== val) {
                switchLanguage(val);
            }
        });

    }]);
