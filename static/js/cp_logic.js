// Creating map object
var myMap = L.map("map", {
  center: [45.5051, -122.6750],
  zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Link to GeoJSON
// var APILink_borders = "./static/data/oregon-washignton-counties-geojson.json";
// var APILink_birthweights = "./data/low-birth-weight-WA_OR.csv";
var APILink_birthweights = "/API/BW";
var APILink_borders = "/API/CountyGeoJSON";

var geojson;
var currentYear = 1998;
var county_BWPY;

// Grab data with d3
d3.json(APILink_borders, function (data) {
  d3.json(APILink_birthweights, function (bw_data) {
    // console.log(`bw_data:${bw_data}`);
    // Create a new choropleth layer
    geojson = L.geoJson(data, {
      color: 'white',
      dashArray: '6',
      // Binding a pop-up to each layer
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h1>${feature.properties.NAME}</h1><h2>Low Birth Weight %:${county_BWPY}<br>Year:${currentYear}`);
      }
    }).addTo(myMap);

    colorscale = chroma.scale('RdBu').domain([8, 1]);;

    function updateMap(geojson) {
      // console.log(`update, currentaYear:${currentYear}`)
      geojson.eachLayer(function (feature) {

        bw_data.forEach(datapoint => {
          // console.log(`${datapoint.Geography},${feature.feature.properties.NAME} County`);
          // console.log(`${currentYear},${datapoint["Year"]}`);
          // console.log(`year:${datapoint.year},babies:${datapoint.percentage_of_babies}, name:${datapoint.location} `)
          if (datapoint.year == currentYear && datapoint.location == `${feature.feature.properties.NAME} County`) {
            county_BWPY = datapoint.percentage_of_babies;
            feature.setStyle({ fillColor: colorscale(county_BWPY), fillOpacity: .6 })
            feature._popup.setContent(`<h1>${feature.feature.properties.NAME}</h1><h2>${county_BWPY}% of babies born with low birth weight<br>Year:${currentYear}`);
          }
        });
      })
    }
    updateMap(geojson);
    var years = [
      '1998',
      '1999',
      '2000',
      '2001',
      '2002',
      '2003',
      '2004',
      '2005',
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015'
    ];
    document.getElementById('slider').addEventListener('input', function (e) {
      currentYear = parseInt(years[e.target.value]);
      // console.log(`current year ${currentYear}`)
      document.getElementById('year').textContent = years[e.target.value];
      updateMap(geojson);;
    });
  });
});