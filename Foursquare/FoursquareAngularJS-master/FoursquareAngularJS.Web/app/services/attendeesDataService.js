'use strict';
app.factory('attendeesDataService', function ($http, placesExplorerService, toaster) {

    var serviceBase = 'api/attendees/';
    var attendeesDataFactory = {};
    var eventInContext = null;
    var arrivalDateInContext = null;

    var _getEventInCtx = function () {

        return eventInContext;
    };

    var _setEventInCtx = function (eventInCtx) {

        eventInContext = eventInCtx;

    };

    var _setArrivalDTInCtx = function (dateInCtx) {
        arrivalDateInContext = dateInCtx;

    };

    var _getAttendees = function () {
        return $http.get(serviceBase,
            {
                params: {
                    eventId: eventInContext
                }
            }
            ).then(function (results) {
            return results;
        });
    };
    

    attendeesDataFactory.getAttendees = _getAttendees;
    attendeesDataFactory.setEventIdInCtx = _setEventInCtx;

    return attendeesDataFactory;
});