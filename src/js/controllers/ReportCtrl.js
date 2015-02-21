"use strict";

angular.module("ministryApp").controller("ReportCtrl", ["$scope", "$routeParams", "Time", function($scope, $routeParams, Time) {

    var YEAR = parseInt($routeParams.year || (new Date()).getFullYear());
    var MONTH = parseInt($routeParams.month || (new Date()).getMonth() + 1);

    $scope.date = new Date(YEAR, MONTH - 1);

    $scope.nextMonth = function() {
        if (MONTH === 12) {
            $scope.go(["/report", YEAR + 1, 1].join("/"));
        } else {
            $scope.go(["/report", YEAR, MONTH + 1].join("/"));
        }
    };

    $scope.prevMonth = function() {
        if (MONTH === 1) {
            $scope.go(["/report", YEAR - 1, 12].join("/"));
        } else {
            $scope.go(["/report", YEAR, MONTH - 1].join("/"));
        }
    };

    $scope.month = Time.total(YEAR, MONTH);

}]);
