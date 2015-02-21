"use strict";

angular.module("ministryApp").controller("CalendarCtrl", ["$scope", "$location",
    function($scope, $location) {

        $scope.goToDate = function(date) {
            $location.url(["/date", date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/"));
        };

    }]);
