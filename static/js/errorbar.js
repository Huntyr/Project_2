// Create a var for the data
// var data = "county_min-max.csv";
var data = "http://localhost:5000/API/AGG";

// Load in csv data
Plotly.d3.json(data, function(rows) {
  console.log(rows);

// Empty to collect (TRIAL 1)
var x_counties = [];
var y_mean = [];
var errorArray = [];
var errorArrayMin = [];

// Loop through and grab values
for (var i = 0; i < rows.length; i++) {
  row = rows[i];
  x_counties.push( row['location'] );
  y_mean.push( row['Mean'] );
  errorArray.push( row['ArrayPlus'] );
  errorArrayMin.push( row['ArrayMinu'] );
}
console.log(x_counties);
console.log(y_mean);
console.log(errorArray);
console.log(errorArrayMin);

// Rearrange the arrays by their index
// Correcting x_counties
// console.log(x_counties);
const index1 = [6, 4, 0, 2, 3, 8, 9, 7, 1, 5];
const correctedCounty = index1.map(i => x_counties[i]);
console.log(correctedCounty);

// Correcting y_mean
// console.log(y_mean);
const index2 = [6, 4, 0, 2, 3, 8, 9, 7, 1, 5];
const correctedMean = index2.map(i => y_mean[i]);
console.log(correctedMean);

// Correcting errorArray (max)
// console.log(errorArray);
const index3 = [6, 4, 0, 2, 3, 8, 9, 7, 1, 5];
const correctedEA = index3.map(i => errorArray[i]);
console.log(correctedEA);

// Correcting errorArrayMin (min)
// console.log(errorArrayMin);
const index4 = [6, 4, 0, 2, 3, 8, 9, 7, 1, 5];
const correctedEAM = index4.map(i => errorArrayMin[i]);
console.log(correctedEAM);

// Build chart! Create trace
var trace1 = {
  x: correctedCounty,
  y: correctedMean,
  marker: {
    color: ['rgba(222,45,38,0.8)', 'rgb(76, 178, 178)', 'rgba(76, 178, 178, 0.7)', 'rgba(76, 178, 178, 0.7)', 'rgba(76, 178, 178, 0.7)', 'rgba(76, 178, 178, 0.7)', 'rgba(76, 178, 178, 0.7)', 'rgba(28, 118, 160, 0.84)', 'rgba(28, 118, 160, 0.44)', 'rgba(28, 118, 160, 0.44)']
  },
  error_y: {
    type: 'data',
    symmetric: false,
    array: correctedEA,
    arrayminus: correctedEAM,
  },
  type: 'bar'
};

// Create data array for plot
var data = [trace1];

// Define plot layout
var layout = {
  // width: 1075,
  // height: 450,
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