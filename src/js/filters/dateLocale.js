angular.module("ministryApp").filter("dateLocale", ["$rootScope", "$locale", "$filter", "$log", function($rootScope, $locale, $filter, $log) {
    return function (d, format) {
        if($rootScope.language === "mk") {

            var months = ["Јануари", "Фебруару", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
                days = ["Недела", "Понеделник", "Вторник", "Среда", "Чеврток", "Петок", "Сабота"];
            return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();
        } else {
            return $filter("date")(d, format);
        }
    }
}]);