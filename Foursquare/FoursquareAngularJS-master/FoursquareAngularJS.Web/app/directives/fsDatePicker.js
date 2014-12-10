'use strict';
app.directive("fsDatePicker", function () {

    return {
        restrict: 'AEC',
        link: function (scope, element, attrs) {
            if (element[0].id == "exploreDate") {
                $(element).pickadate({
                    format: 'yyyy-mm-dd',
                    firstDay: 1,
                    onSet: function (context) {
                        scope.$apply(function () {
                            scope.exploreDate = element[0].value;
                        });
                    }
                });
            }
            else if (element[0].id == "getTheDate")
            {
                $(element).pickadate({
                    format: 'yyyy-mm-dd',
                    firstDay: 1,
                    container:'.modal',
                    onSet: function (context) {
                        scope.$apply(function () {
                            scope.user.arrivalDate = element[0].value;
                        });
                    }
                });
            }
        }
    };
});