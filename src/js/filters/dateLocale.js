angular.module("ministryApp").filter("dateLocale", ["$rootScope", "$locale", "$filter", "$log", function($rootScope, $locale, $filter, $log) {
    return function (d, format) {
        if($rootScope.language === "mk") {

            var months = ["Јануари", "Фебруару", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
                days = ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"],
                shortDays = ["Нед", "Пон", "Втр", "Срд", "Чет", "Пет", "Саб"];

            if (format) {zxzx
                var str = format;
                str = str.replace(/MMMM/g, months[d.getMonth()]);
                str = str.replace(/yyyy/g, d.getFullYear());
                str = str.replace(/d/g, d.getDate());
                str = str.replace(/EEEE/g, days[d.getDay()]);
                str = str.replace(/EEE/g, shortDays[d.getDay()]);
                return str;
            } else {
                return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();
            }

        } else {
            return $filter("date")(d, format);
        }
    }
}]);