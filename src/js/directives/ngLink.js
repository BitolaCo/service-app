"use strict";

angular.module("ministryApp").directive("ngLink", ["$location", function ($location) {

    return {
        restrict: "A",
        link: function ($scope, $element, $attrs) {

            $element.on("click", function () {
                $scope.closeNav();
                $location.url($attrs.ngLink);
            });

        }
    };

}]);