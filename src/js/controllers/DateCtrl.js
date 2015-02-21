"use strict";

angular.module("ministryApp").controller("DateCtrl", ["$scope", "$routeParams", "Time",
    function($scope, $routeParams, Time) {

    var now = new Date();

    if($routeParams.year && $routeParams.month && $routeParams.day) {
        $scope.date = new Date(
            $routeParams.year || now.getFullYear(),
            $routeParams.month ? $routeParams.month - 1 : now.getMonth(),
            $routeParams.day || now.getDate()
        );
    }

    var SINGLE_DAY = 1000*60*60*24;
    var Y = $scope.date.getFullYear();
    var M = $scope.date.getMonth() + 1;
    var D = $scope.date.getDay();

    var init = function() {
        $scope.day = Time.getDay(Y, M, D);
    };

    var save = function() {
        Time.saveDay(Y, M, D, $scope.day);
    };

    $scope.increment = function(field, amt) {

        var total = ($scope.day[field] || 0) + parseFloat(amt);

        $scope.day[field] = total < 0 || Number.isNaN(total) ? 0 : total;

        save();

    };


    $scope.nextDay = function() {
        $scope.goToDate(new Date($scope.date.getTime() + SINGLE_DAY));
    };

    $scope.prevDay = function() {
        $scope.goToDate(new Date($scope.date.getTime() - SINGLE_DAY));
    };

    $scope.goToDate = function(d) {
        $scope.go(["/date", d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/"));
    };

    $scope.goToReport = function() {
        $scope.go(["/report", $routeParams.year, $routeParams.month].join("/"));
    };

    init();

}]);
