"use strict";

angular.module("ministryApp").service("Time", ["$window", function($window) {

    function Time() {

        var self = this;
        this.columns = ["h", "t", "m", "b", "r", "s", "p"];

        this.data = {};

        this.total = function(year, month) {

            var amt, total = {};

            this.columns.forEach(function(key) {
                total[key] = 0;
            });

            if (this.data[year] && this.data[year][month]) {
                angular.forEach(this.data[year][month], function(day) {
                    angular.forEach(self.columns, function(key) {
                        amt = parseFloat(day[key]);
                        total[key] += Number.isNaN(amt) ? 0 : amt;
                    });
                });
            }

            return total;
        };

        this.load = function() {
            var data = $window.localStorage.getItem("user.data") || {};
            if(data && "string" === typeof data) {
                try {
                    this.data = JSON.parse(data);
                } catch(e) {
                    this.data = {};
                }
            }
        };

        this.getDay = function(year, month, day) {

            if (! this.data[year]) {
                this.data[year] = {};
            }

            if (! this.data[year][month]) {
                this.data[year][month] = {};
            }

            if (! this.data[year][month][day]) {
                this.data[year][month][day] = {};
                this.columns.forEach(function(col) {
                    self.data[year][month][day][col] = 0;
                });
            }

            return this.data[year][month][day];

        };

        this.saveDay = function(year, month, day, data) {

            angular.forEach(data, function(val, key) {
                val = parseFloat(val);
                if (Number.isNaN(val) && key.indexOf(self.columns) > -1) {
                    data[key] = 0;
                }
            });

            this.data[year][month][day] = data;
            this.saveAll();

        };

        this.saveAll = function() {
            $window.localStorage.setItem("user.data", JSON.stringify(this.data));
        };

        this.load();

    }

    return new Time();

}]);