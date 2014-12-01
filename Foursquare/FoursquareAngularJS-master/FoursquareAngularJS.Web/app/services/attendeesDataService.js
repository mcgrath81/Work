'use strict';
app.factory('attendeesDataService', function ($http, placesExplorerService, toaster) {

    var serviceBase = 'api/attendees/';
    var attendeesDataFactory = {};
    var userInContext = null;
    var arrivalDateInContext = null;

    var _getUserInCtx = function () {

        return userInContext;
    };

    var _setUserInCtx = function (userInCtx) {

        userInContext = userInCtx;

    };

    var _setArrivalDTInCtx = function (dateInCtx) {
        arrivalDateInContext = dateInCtx;

    };

    var _getAttendees = function () {
        return $http.get(serviceBase).then(function (results) {
            return results;
        });
    };
    

    attendeesDataFactory.getAttendees = _getAttendees;

    return attendeesDataFactory;
});