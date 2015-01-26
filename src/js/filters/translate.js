angular.module("ministryApp").filter("translate", ["$rootScope", function($rootScope) {
    return function(text, lang) {

        lang = lang || $rootScope.language;

        var translator = {
            "mk": {
                "Hours": "Сати",
                "Hours (planned)": "Сати (планирани)",
                "Tracts & brochures": "Трактати",
                "Magazines": "Списанија",
                "Return visits": "Повторни постеи",
                "Books": "Книги",
                "Bible studies": "Библиски студии",
                "Notes": "Белешки",
                "Report": "Известшај",
                "My Planner": "Мој планир",
                "Calendar": "Календар",
                "House-to-house records": "Белешки од куќа до куќа",
                "Coming soon!": "Наскоро!",
                "Go to report": "Оди до известшај",
                "Monthly report": "Месечен Известшај",
                "Welcome": "Добродојдавте",
                "Menu": "Мени",
                "Click the menu button to start": "Кликнете се на менито да почнете",
                "Previous day": "Минатиот ден",
                "Next day": "Следен ден",
                "Select date": "Одберете датум",
                "Service App": "Календар за Служба",
                "Navigation": "Навигација",
                "Change language": "Language - Јазик"
            }
        };

        return translator[lang] && translator[lang][text] ? translator[lang][text] : text;

    }
}]);