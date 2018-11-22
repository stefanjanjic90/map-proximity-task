// TODO
// Use the data from the openbrewerydb API to display the breweries on the google maps.
// Find a solution for grouping nearby breweries markers together
// If the user clicks on the group then there we generate a list of all items from the selected group (use angular)
// If we select an item from the list then we zoom into brewerie marker.
// And for last if we click on the marker then we show a popup with the name of the bar.

// Map parameters
const mapObject = {
  map: null,
  googleInsance: null,
  startZoom: 8,
  startCordinates: {
    lat: 33.524521,
    lng: -86.774322
  }
};


function initMap() {
  mapObject.googleInsance = google;
  mapObject.map = new google.maps.Map(document.getElementById('map'), {
    center: mapObject.startCordinates,
    zoom: mapObject.startZoom
  });
};


angular.module('mapApp', [])
  .controller('RootAppController', ['$scope', 'OpenBreweryService', function ($scope, OpenBreweryService) {
    
    $scope.mapObject = mapObject;
    $scope.zoomLocation = mapObject.startCordinates;

    OpenBreweryService.getData().then((data) => {
      $scope.breweryLocations = data;
    });

    $scope.onClusterSelected = function(selectedLocations){
      $scope.selectedLocations = selectedLocations;
    }

    $scope.zoomToLocation = function(location){
      $scope.zoomLocation = location;
    }

  }]);
