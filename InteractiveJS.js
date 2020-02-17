var map;
var Visited = [];
var numtovisit;
var numvisited;
var geocoder;
function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 10, lng: 0},
        zoom: 3,
        disableDefaultUI: true,
        gestureHandling: 'cooperative',
        zoomControl: false,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });



    map.data.loadGeoJson('countries.geo.json');
    var countries = [];
    var JSON = 'countries.geo.json';

    numvisited = 0;
    numtovisit = 195;
    document.getElementById("tovisit").innerHTML = ("You have not entered any countries yet...");
    showMap(Visited)

}

function getNames(){
    var countries = [""];
    var index = 0;
    map.data.forEach(function(feature)
    {
         countries[index][0] = feature.getProperty('admin');
         //countries[index][1] = feature.getProperty('Continent');
         index += 1;
    });
    fillCountries(countries);
    return countries;
}

function fillCountries(countries){
    var str = '<ul>';

    countries.forEach(function(country) {
            str += '<li>' + country[country] + '</li>';
    });

    str += '</ul>';
    document.getElementById("Europe").innerHTML = str;
}

function showMap(selected){
    //map.data.loadGeoJson('countries.geo.json');
    map.data.setStyle(function(feature) {
        var color = '#515c6d';
        for (x = 0; x < selected.length; x++) {
            if (feature.getProperty('admin') === selected[x]) {
                color = '#adffc6';
            }
        }
        return /** @type {!google.maps.Data.StyleOptions} */({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
        });
    });


    }

document.getElementById("btnCountry").onclick = function() {submit()};
function submit(){
    var entry = document.getElementById("search").value;
    Visited.push(entry);
    //alert("This woked: " + entry + Visited);
    document.getElementById(entry).style.color = '#adffc6';

    //codeAddress(entry);
    numvisited += 1;
    numtovisit -= 1;

    document.getElementById("tovisit").innerHTML = (numtovisit + " countries left to visit");
    document.getElementById("visited").innerHTML = (numvisited + " countries already visited");

    showMap(Visited);
}

function codeAddress(location) {
    geocoder.geocode( { 'location' : address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            map.fitBounds(results[0].geometry.viewport);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


