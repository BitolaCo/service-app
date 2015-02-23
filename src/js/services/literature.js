"use strict";

angular.module("ministryApp").service("Literature", ["$window", "$http", "$q", function($window, $http, $q) {


    return function() {

        this.loaded = false;
        this.publications = [];

        this.load = function(refresh) {

            var self = this,
                force = refresh || false,
                publications,
                deferred = $q.defer();

            // Try to load from local storage.
            if (! force) {
                publications = $window.localStorage.getItem("user.publications");
                if (publications) {
                    publications = angular.fromJson(publications);
                }
            }

            if (publications) {
                deferred.resolve(publications);
            } else {
                $http.get("literature/publications.json")
                    .success(function(data) {
                        self.save(data);
                        deferred.resolve(data);
                    });
            }

            return deferred.promise;

        };

        this.save = function(data) {

            var publications = data || this.publications;
            if (publications) {
                $window.localStorage.setItem("user.publications", angular.toJson(data || this.publications));
            }

        };

        this.load();

    };

}]);