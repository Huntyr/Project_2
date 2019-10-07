
// Create a var for the data
var data = "county_min-max.csv";

// Load in csv data
Plotly.d3.csv(data, function(rows) {
console.log(rows);

var x_counties = [];
var y_mean = [];
var errorArray = [];
var errorArrayMin = [];

// Loop through and grab values
for (var i = 0; i < rows.length; i++) {
  row = rows[i];
  x_counties.push( row['location'] );
  y_mean.push( row['mean'] );
  errorArray.push( row['ArrayPlus'] );
  errorArrayMin.push( row['ArrayMinus'] );
}

// Create trace
var trace1 = {
  x: x_counties,
  y: y_mean,
  marker: {
    color: ['rgb(55, 128, 191)', 'rgb(55, 128, 191)', 'rgb(55, 128, 191)', 'rgb(55, 128, 191)', 'rgba(222,45,38,0.8)', 'rgb(55, 128, 191)', 'rgba(222,45,38,0.8)', 'rgba(222,45,38,0.8)', 'rgb(55, 128, 191)', 'rgb(55, 128, 191)']
  },
  error_y: {
    type: 'data',
    symmetric: false,
    array: errorArray,
    arrayminus: errorArrayMin,
  },
  type: 'bar'
};

// Create data array for plot
var data = [trace1];

// Define plot layout
var layout = {
  width: 1075,
  height: 450,
  margin: {
    t: 10,
  },
  barmode: 'group',
  yaxis: {
    title: {
      text: '% with Low Birth Weight'
    }
  }
};

// Plot chart to a div tag
Plotly.newPlot("plot", data, layout, {responsive: true});
});
