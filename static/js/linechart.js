// create a var for the data
var data = "http://localhost:5000/API/BW";


// create a trace
d3.json(data).then(function(rows){
    console.log(rows);
    // function unpack(rows, key) {
    //     return rows.map(function(row) { return row[key]; });
    // }

    // or a for loop conditional to add each county/state/usa to its own array
    var Clackamas = [];
    var Clark = [];
    var Columbia = [];
    var Multnomah = [];
    var Oregon = [];
    var Skamania = [];
    var US = [];
    var Washington = [];
    var WashingtonCounty = [];
    var Yamhill = [];
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
    rows.forEach(datapoint => {
        if (datapoint.location == "Clackamas County"){
            Clackamas.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Clark County"){
            Clark.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Columbia County"){
            Columbia.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Multnomah County"){
            Multnomah.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Oregon"){
            Oregon.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Skamania County"){
            Skamania.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "United States"){
            US.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Washington  "){
            Washington.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Washington County"){
            WashingtonCounty.push(datapoint["percentage_of_babies"]);
        }
        else if (datapoint.location == "Yamhill County"){
            Yamhill.push(datapoint["percentage_of_babies"]);
        }
    })
    console.log(Clackamas);
    console.log(Clark);
    console.log(Columbia);
    console.log(Multnomah);
    console.log(Oregon);
    console.log(Skamania);
    console.log(US);
    console.log(Washington);
    console.log(WashingtonCounty);
    console.log(Yamhill);

    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'Clackamas County',
        x: years,
        y: Clackamas,
        line: {color: '#FF0000'}
    }

    var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'Clark County',
        x: years,
        y: Clark,
        line: {color: '#CC6600'}
    }

    var trace3 = {
        type: "scatter",
        mode: "lines",
        name: 'Columbia County',
        x: years,
        y: Columbia,
        line: {color: '#FFFF00'}
    }

    var trace4 = {
        type: "scatter",
        mode: "lines",
        name: 'Multnomah County',
        x: years,
        y: Multnomah,
        line: {color: '#00FF00'}
    }

    var trace5 = {
        type: "scatter",
        mode: "lines",
        name: 'Skamania County',
        x: years,
        y: Skamania,
        line: {color: '#00FFFF'}
    }

    var trace6 = {
        type: "scatter",
        mode: "lines",
        name: 'Washington County',
        x: years,
        y: WashingtonCounty,
        line: {color: '#0000FF'}
    }

    var trace7 = {
        type: "scatter",
        mode: "lines",
        name: 'Yamhill County',
        x: years,
        y: Yamhill,
        line: {color: '#0033FF'}
    }

    var trace8 = {
        type: "scatter",
        mode: "lines",
        name: 'Oregon',
        x: years,
        y: Oregon,
        line: {color: '#FF00FF'}
    }

    var trace9 = {
        type: "scatter",
        mode: "lines",
        name: 'Washington',
        x: years,
        y: Washington,
        line: {color: '#FF99CC'}
    }

    var trace10 = {
        type: "scatter",
        mode: "lines",
        name: 'United States',
        x: years,
        y: US,
        line: {color: '#000000'}
    }

    var data = [trace1,trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10];

    var layout = {
        title: 'Time Series of Low Birth Weight Data',
    };

    Plotly.newPlot('myDiv', data, layout, {responsive: true});
})


//found this on the internet
// var years = ['2014', '2015', '2016']

// Plotly.d3.csv(data, (err, rows) => {
//   var data = years.map(y => {
//     var d = rows.filter(r => r.year === y)
    
//     return {
//       type: 'bar',
//       name: y,
//       x: d.map(r => r.dealer),
//       y: d.map(r => r.sales)
//     }
//   })
  
//   Plotly.newPlot('graph', data)
//  })