'use strict';
app.directive("fsDatePicker", function () {

    return {
        restrict: 'AEC',
        link: function(scope, element, attrs) {
            $(element).pickadate();
        }
    };
});