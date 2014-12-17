angular.module("ministryApp").controller("CalendarCtrl", ["$scope", "$routeParams", "$mdBottomSheet", "$log", function($scope, $routeParams, $mdBottomSheet, $log) {

    $scope.date = new Date($routeParams.year, $routeParams.month - 1, $routeParams.day);
    $scope.increment = function(field, amt) {
        if ($scope.day[field] < 1 && amt < 0) {
            return;
        }
        $scope.day[field] += parseInt(amt);
    };

    const SINGLE_DAY = 1000*60*60*24;
    $scope.nextDay = function() {
        $scope.goToDate(new Date($scope.date.getTime() + SINGLE_DAY));
    };

    $scope.prevDay = function() {
        $scope.goToDate(new Date($scope.date.getTime() - SINGLE_DAY));
    };

    $scope.goToDate = function(d) {
        $scope.go(["/calendar", d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/"));
    };

    $scope.goToReport = function() {
        $scope.go(["/report", $routeParams.year, $routeParams.month].join("/"));
    };

    $scope.showOptions = function($event) {
        $mdBottomSheet.show({
            templateUrl: "/partials/calendar-bottom-sheet.html",
            targetEvent: $event,
            controller: "CalendarBottomSheetCtrl",
            locals: {
                nextDayStr: new Date($scope.date.getTime() + SINGLE_DAY),
                prevDayStr: new Date($scope.date.getTime() - SINGLE_DAY),
                reportStr: ["/report", $routeParams.year, $routeParams.month].join("/"),
                goToDate: function(d) {
                    $scope.go(["/calendar", d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/"));
                }
            }

        });
    };

    (function() {

        var y = $routeParams.year,
            m = $routeParams.month,
            d = $routeParams.day,
            data = $scope.data;

        if (! data[y]) data[y] = {};
        if (! data[y][m]) { data[y][m] = {}; }
        if (! data[y][m][d]) {
            data[y][m][d] = {
                p: 0,
                h: 0,
                r: 0,
                m: 0,
                s: 0,
                n: "",
                t: 0,
                b: 0
            };
        }
        $scope.day = data[y][m][d];

    }());

    $scope.$watchCollection("day", $scope.saveData);


}])