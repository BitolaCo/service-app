"use strict";

angular.module("ministryApp").controller("ReturnVisitCtrl", ["$scope", "$window", "$mdSidenav", "$timeout", "$log", function($scope, $window, $mdSidenav, $timeout, $log) {

    $scope.toggleRight = function() {
        $mdSidenav("right").toggle()
            .then(function(){
                $log.debug("toggle RIGHT is done");
            });
    };

    var load = function() {

        var people = $window.localStorage.getItem("user.people") || [];
        if(people && "string" === typeof people) {
            try {
                people = JSON.parse(people);
            } catch(e) {
                people = {};
            }
        }
        $scope.people = people;

    };

    $scope.save = function() {
       $window.localStorage.setItem("user.people", JSON.stringify($scope.people || []));
    };

    $scope.init = function() {
        load();
    };

}]);