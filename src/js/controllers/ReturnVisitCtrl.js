"use strict";

angular.module("ministryApp").controller("ReturnVisitCtrl", ["$scope", "$window", "$mdSidenav", "$timeout", "$log", function ($scope, $window, $mdSidenav, $timeout, $log) {

    $scope.toggleRight = function () {
        $mdSidenav("right").toggle()
            .then(function () {
                $log.debug("toggle RIGHT is done");
            });
    };

    var load = function () {

        var people = $window.localStorage.getItem("user.people") || [];
        if (people && "string" === typeof people) {
            try {
                people = JSON.parse(people);
            } catch (e) {
                people = [];
            }
        }

        $scope.people = people;//people;

    };

    $scope.edit = function (index) {
        $scope.person = $scope.people[index];
        $scope.editing = true;
    };

    $scope.create = function () {
        $scope.person = {};
        $scope.editing = true;
    };

    $scope.save = function () {

        if ("undefined" === typeof $scope.person.index) {
            $scope.person.index = $scope.people.length;
            $scope.people.push(angular.copy($scope.person));
        } else {
            $scope.people[$scope.person.index] = {
                name: $scope.person.name || "No name",
                index: $scope.person.index,
                address: $scope.person.address || "",
                notes: $scope.person.notes || "",
                gender: $scope.person.gender || ""
            };
        }

        $window.localStorage.setItem("user.people", JSON.stringify($scope.people || []));

        $scope.editing = false;

    };

    $scope.init = function () {
        load();
    };

    load();

}]);