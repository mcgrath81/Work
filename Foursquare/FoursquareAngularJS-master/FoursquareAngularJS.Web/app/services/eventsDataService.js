'use strict';
app.factory('eventsDataService', function ($http, placesExplorerService, toaster) {

    var serviceBase = 'api/events/';
    var eventsDataFactory = {};
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

    var _getEvents = function () {
        return $http.get(serviceBase).then(function (results) {
            for (var i = 0; i < results.data.length; i++) {
                results.data[i].venueDetails = placesExplorerService.get({ action: results.data[i].venueID });
            }
            return results;
        });
    };
    

    eventsDataFactory.getEvents = _getEvents;

    return eventsDataFactory;
});