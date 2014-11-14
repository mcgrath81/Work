
'use strict';
app.controller('userContextController', function ($scope, $modalInstance, placesDataService, venue) {

    $scope.venue = venue;
    $scope.user = { userName: "", arrivalDate:"" };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.saveUser = function () {
        console.log($scope.user);
        console.log($scope.user);
        placesDataService.setUserInContext($scope.user.userName);
        placesDataService.setArrivalDTInCtx($scope.user.arrivalDate);

        placesDataService.savePlace(venue).then(
            function () {
                $scope.close();
            },
            function () {
                alert("Error occured");
            });



    };

    
});