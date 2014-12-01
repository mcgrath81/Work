'use strict';
app.controller('hotspotsController', function ($scope, placesDataService, placesPhotosService, eventsDataService, $filter, $modal) {

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
        createWatche();
        getPlaces();
    }

    function getPlaces() {

       var offset = ($scope.pageSize) * ($scope.currentPage - 1);

       eventsDataService.getEvents().then(function (eventsResult) {
           if (eventsResult.data) {
               $scope.places = eventsResult.data;
               $scope.totalRecordsCount = eventsResult.data.length;
                filterPlaces('');
            }
            else {
                $scope.places = [];
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
        getPlaces();

    };

    $scope.pageChanged = function (page) {

        $scope.currentPage = page;
        getPlaces();

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

    $scope.buildCategoryIcon = function (icon) {
        if (icon != null) {
            return icon.prefix + '44' + icon.suffix;
        }
        else {
            return '';
        }
    };

    $scope.buildVenueThumbnail = function (photo) {
        if (photo != null) {
            return photo.items[0].prefix + '128x128' + photo.items[0].suffix;            
        }
        else {
            return '';
        }
        
    };

    $scope.bookmarkPlace = function (venue) {

        if (!placesDataService.getUserInContext()) {

            var modalInstance = $modal.open({
                templateUrl: 'app/views/userprofile.html',
                controller: 'userContextController',
                resolve: {
                    venue: function () {
                        return venue;
                    }
                }
            });
        }
        else {
            placesDataService.savePlace(venue).then(
            function (results) {
                // Do nothing as toaster showing from service
            },
            function (results) {
                // Do nothing as toaster showing from service
            });
        }

    };
});