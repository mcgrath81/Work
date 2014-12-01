'use strict';
app.controller('attendeesController', function ($scope, attendeesDataService, placesDataService, placesPhotosService, $filter, $modal) {

    $scope.exploreNearby = "New York";
    $scope.exploreQuery = "";
    $scope.filterValue = "";

    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;

    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    init();

    function init() {
        getAttendees();
    }

    function getAttendees() {

       var offset = ($scope.pageSize) * ($scope.currentPage - 1);

       attendeesDataService.getAttendees().then(function (attendeesResult) {
           if (attendeesResult.data) {
               $scope.attendees = attendeesResult.data;
               $scope.totalRecordsCount = attendeesResult.data.length;
                filterPlaces('');
            }
            else {
               $scope.attendees = [];
                $scope.totalRecordsCount = 0;
            }

        });
    };

    function filterPlaces(filterInput) {
        $scope.filteredPlaces = $filter("placeNameCategoryFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }

    function createWatche() {

        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }

    $scope.doSearch = function () {

        $scope.currentPage = 1;
        getAttendees();

    };

    $scope.pageChanged = function (page) {

        $scope.currentPage = page;
        getAttendees();

    };

    $scope.showVenuePhotos = function (venueId, venueName) {

        placesPhotosService.get({ venueId: venueId }, function (photosResult) {

            var modalInstance = $modal.open({
                templateUrl: 'app/views/placesphotos.html',
                controller: 'placesPhotosController',
                resolve: {
                    venueName: function () {
                        return venueName;
                    },
                    venuePhotos: function () {
                        return photosResult.response.photos.items;
                    }
                }
            });

            modalInstance.result.then(function () {
                //$scope.selected = selectedItem;
            }, function () {
                //alert('Modal dismissed at: ' + new Date());
            });

        });

    };


});