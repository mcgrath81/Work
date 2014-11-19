'use strict';
app.directive("fsDatePicker", function () {

    return {
        restrict: 'AEC',
        link: function(scope, element, attrs) {
            $(element).pickadate({
                format: 'yyyy-mm-dd',
                editable: true,
                //onStart: function () {
                //    console.log('Hello there :)');
                //},
                //onRender: function () {
                //    console.log('Whoa.. rendered anew');
                //},
                //onOpen: function () {
                //    console.log('Opened up');
                //},
                //onClose: function () {
                //    console.log('Closed now');
                //},
                //onStop: function () {
                //    console.log('See ya.');
                //},
                onSet: function (context) {
                    scope.$apply(function () {
                        scope.user.arrivalDate = element[0].value;
                    });
                }
            });
        }
    };
});