var app = angular.module('mapApp');

app.directive('map', [function () {

    return {
        restrict: 'A',
        scope: {
            locations: '<',
            zoomLocation: '<',
            googleMapObject: '<',
            onClusterSelected: '&'
        },
        link: function (scope, element, attrs) {

            let markers = [];

            scope.$watch('locations', () => {
                if (scope.locations) {

                    cleanMap();

                    markers = createMarkers();
                    createMarkerClusters(markers);

                }
            });

            scope.$watch('zoomLocation', () => {
                if (scope.zoomLocation && scope.googleMapObject.map) {
                    scope.googleMapObject.map.setZoom(17);
                    scope.googleMapObject.map.panTo(scope.zoomLocation.locationData);
                }
            });

            function cleanMap() {
                for (var i = 0; i < markers.length; ++i) {
                    google.maps.event.clearInstanceListeners(markers[i]);
                    markers[i].setMap(null);
                }
                google.maps.event.clearListeners(map, 'clusterclick');
            }

            function createMarkers() {
                return scope.locations.map(function (location, i) {
                    let marker = new google.maps.Marker({
                        position: location,
                        label: location.name,
                        map: scope.googleMapObject.map,
                        locationData: location,
                        icon: './icons/beer.png'
                    });

                    let infoWindow = new google.maps.InfoWindow({
                        content: location.name
                    });
                    
                    marker.addListener('click', function (eventData) {
                        infoWindow.open(scope.googleMapObject.map, marker);
                    });

                    return marker;
                });
            };

            function createMarkerClusters(markers) {

                let markerCluster = new MarkerClusterer(scope.googleMapObject.map, markers,
                    {
                        zoomOnClick: false,
                        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                    });

                google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
                    scope.onClusterSelected({ selectedLocations: cluster.getMarkers() });
                    scope.$apply()
                });
            };
        }
    };
}]);