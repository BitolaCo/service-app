angular.module("ministryApp").service("Calendar", ["$window", "$log", function($window, $log) {

    function Calendar(year, month) {

        var self = this;

        var now = new Date();
        this.year = now.getFullYear();
        this.month = now.getMonth();
        this.dates = [];

        this.getNumDays = function() {
            return new Date(
                this.start.getYear(),
                this.start.getMonth() + 1,
                0
            ).getDate();
        };

        this.getFirstDayOfCalendar = function(date) {

            var first = new Date(date || self.start);
            first.setDate(1 - first.getDay());

            return first;

        };

        this.next = function() {
            this.init(this.year, this.month + 2);
        };

        this.prev = function() {

            if(this.month) {
                this.init(this.year, this.month);
            } else {
                this.init(this.year - 1, 12);
            }

        };

        this.init = function(year, month) {

            if (year && month) {
                this.year = year;
                this.month = month - 1;
            }

            // Set up the new date.
            this.start = new Date(this.year, this.month, 1, 0, 0);
            this.dates = [];
            this.weeks = [[]];

            // Reset the month and year to handle the case of many
            // prev/next calls across years.
            this.year = this.start.getFullYear();
            this.month = this.start.getMonth();

            var week = 0,
                first = this.getFirstDayOfCalendar(),
                _i = first.getDate() == 1 && this.getNumDays() == 28 ? 28 : 35,
                offset = first.getTimezoneOffset() * -60000;

            for (var i = 0; i < _i; i++) {

                var add = (i * 86400000) + offset;
                var date = new Date(first.valueOf() + add);

                // Sunday? Let's start a new week.
                if(! date.getDay() && this.weeks[0].length) {
                    week++;
                    this.weeks.push([]);
                }

                this.dates.push(date);
                this.weeks[week].push(date);

            }

            return this.dates;

        };

        this.init(year, month);

    }

    return Calendar;

}]);