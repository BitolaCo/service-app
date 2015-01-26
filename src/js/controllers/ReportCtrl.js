angular.module("ministryApp").controller("ReportCtrl", ["$scope", "$routeParams", "$timeout", "$log", function($scope, $routeParams, $timeout, $log) {

    var now = new Date(),
        year = parseInt($routeParams.year || now.getFullYear()),
        month = parseInt($routeParams.month || now.getMonth() + 1),
        columns = ["h", "t", "b", "r", "s", "p"];

    $scope.date = new Date(year, month - 1);

    $scope.nextMonth = function() {
        if (month === 12) {
            $scope.go(["/report", year + 1, 1].join("/"));
        } else {
            $scope.go(["/report", year, month + 1].join("/"));
        }
    };

    $scope.prevMonth = function() {
        if (month === 1) {
            $scope.go(["/report", year - 1, 12].join("/"));
        } else {
            $scope.go(["/report", year, month - 1].join("/"));
        }
    };

    $scope.getTotals = function() {

        $scope.month = {};
        angular.forEach(columns, function(key) {
            $scope.month[key] = 0;
        });

        if ($scope.data[year] && $scope.data[year][month]) {
            angular.forEach($scope.data[year][month], function(day) {
                angular.forEach(columns, function(key) {
                    $scope.month[key] += day[key];
                });
            });
        }

    };

    $scope.getTotals();

}]);
