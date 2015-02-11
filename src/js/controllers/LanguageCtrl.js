angular.module("ministryApp").controller("LanguageCtrl", ["$scope", "$window", "$log",
    function($scope, $window, $log) {

        $scope.switchLanguage = function(language) {
            var changed = false;

            $log.log("switch language", language);
            angular.forEach($scope.languages, function(lang) {
                if(lang.code === language.code && ! changed) {
                    $scope.language = lang.code;
                    changed = true;
                }
            });

            if (changed) {
                $window.localStorage.setItem("user.language", $scope.language);
                $window.location.reload();
            }
        };

    }]);
