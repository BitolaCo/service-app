var DateSelectCtrl = function($scope, $mdDialog) {

    var shown = false;
    var show = setInterval(function() {
        if(! shown) {
            $("#calendar").kendoCalendar({
                change: function() {
                    var d = this.value();
                    $scope.$apply(function() {
                        var url = [
                            "/calendar", d.getFullYear(), d.getMonth() + 1, d.getDate()
                        ].join("/");
                        $mdDialog.hide(url);
                    });
                }
            });
            shown = true;
        } else {
            clearInterval(show);
        }
    }, 500);

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.$on("calendar:show", function() {
        if(! this.shown) {
            self.bootstrap();
            self.shown = true;
        }
    });

};

angular.module("ministryApp").controller("CalendarCtrl", ["$scope", "$mdDialog", "$mdBottomSheet", "$timeout", "$routeParams", "$log", function($scope, $mdDialog, $mdBottomSheet, $timeout, $routeParams, $log) {

    var now = new Date();

    $scope.date = new Date(
        $routeParams.year || now.getFullYear(),
        $routeParams.month ? $routeParams.month - 1 : now.getMonth(),
        $routeParams.day || now.getDate()
    );

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

    $scope.showCalendar = function(ev) {

        $mdDialog.show({
            controller: DateSelectCtrl,
            targetEvent: ev,
            templateUrl: "partials/calendar.html"
        })
            .then(function(url) {
                $scope.go(url);
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };

    var showBottomSheetCtrl = function($scope, $mdBottomSheet) {
        $log.log($scope);
    };

    $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: "partials/calendar-options.html",
            controller: showBottomSheetCtrl,
            targetEvent: $event
        }).then(function(clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
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


}]);
