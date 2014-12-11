angular.module('ministryApp', ['ngMaterial', "ngRoute", "ngSanitize", "ngTouch"])
    .run(["$rootScope", function($rootScope) {

    }])
    .controller('HomeCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleLeft = function() {
            $log.log("Toggle left");
            $mdSidenav('left').toggle();
        };
        $scope.toggleRight = function() {
            $log.log("Toggle right");
            $mdSidenav('right').toggle();
        };
        $scope.close = function() {
            $log.log("Close");
            $mdSidenav('left').close();
        };
    }]);