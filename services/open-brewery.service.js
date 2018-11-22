var app = angular.module('mapApp');

app.factory('OpenBreweryService', ['$http', function ($http) {

    const api = `https://api.openbrewerydb.org/breweries`;


    function convertLatLng(data) {
        let newData = data.map(function (location, i) {
            renameProperty(location, 'latitude', 'lat');
            renameProperty(location, 'longitude', 'lng');
            location.lat = parseFloat(location.lat);
            location.lng = parseFloat(location.lng);
            return location;
        });
        return newData;
    }

    function renameProperty(object, oldName, newName) {
        if (oldName == newName) {
            return object;
        }
        if (object.hasOwnProperty(oldName)) {
            object[newName] = object[oldName];
            delete object[oldName];
        }
        return object;
    }

    return {
        getData: function () {
            return $http({ method: 'GET', url: api })
                .then((response) => {
                    let data = convertLatLng(response.data);
                    return data;
                })
                .catch((error) => {
                    console.log("A problem occured while retrieving the data from Open Bewery DB API.", error)
                });
        }
    }
}]);