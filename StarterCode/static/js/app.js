// set constant variable for url to samples.json
const samplesUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

var samplesJson;

// Initialize dashboard at startup
function init() {

    // Use d3 to select dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Use d3 to get sample names and populate dropdown menu
    d3.json(samplesUrl).then(function(jsonData) {
        samplesJson = jsonData;

        // extract ids (sample names)
        var ids = samplesJson.names;

        // add ids to dropdown menu
        ids.forEach((id) => {
            dropdownMenu.append("option").attr("value", id).text(id);
        });

    // Set up event listener for changes in dropdown menu
    d3.selectAll("#selDataset").on("change", optionChanged);
    
    // extract first id to set up initial plot
    let sampleStart = ids[0];
    // console.log(sampleStart); // verify correct id

    // send to buildCharts for initial charts
    buildCharts(sampleStart);
    metadataBox(sampleStart);            
    });
};

function buildCharts(value) {
    let sampleDataFiltered = samplesJson.samples.find(result => result.id == value);
    // console.log('Sample Data Filtered:', sampleDataFiltered);
    console.log(sampleDataFiltered);

     //extract sample_values, otu_ids, and otu_labels
     var sampleValues = sampleDataFiltered.sample_values;    
     var otuIds = sampleDataFiltered.otu_ids; 
     var otuLabels = sampleDataFiltered.otu_labels;

    let trace1 = {
        x: sampleValues.slice(0,10).reverse(),
        y: otuIds.map(id => "OTU " + id).slice(0,10).reverse(), // add "OTU" to each id
        type: "bar",
        orientation: "h"
    };

    let barData = [trace1];

    Plotly.newPlot("bar", barData);

    // Create a bubble chart that displays each sample
    // create new trace
    let trace2 = {
        x: otuIds,
        y: sampleValues,
        type: "scatter",
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: "Earth"
        },
        mode: "markers",
        text: otuLabels
    };

    //Data array
    let plotData2 = [trace2];

    // Update the plot with the new trace
    Plotly.newPlot("bubble", plotData2);
};

function metadataBox(value) {
    var metadataFiltered = samplesJson.metadata.find(result => result.id == value);
    
    // Clear previous content of the metadata panel
    d3.select("#sample-metadata").html("");

    // Use Object.entries to get key/value pairs of the metadata object
    Object.entries(metadataFiltered).forEach(([key, value]) => {
        // Log the individual key/value pairs as they are being appended to the metadata panel
        console.log(key, value);
        // Append an h5 element to the element with the ID 'sample-metadata' and set its text content to the current key-value pair
        d3.select("#sample-metadata").append("h5").text(key + ": " + value);
    });
};

function optionChanged(value) {
    console.log("buildCharts called with value:", value); // check to see how many times this function is being called
    // call the bar chart with the value from the dropdown menu
    buildCharts(value);
    metadataBox(value); 
};

// call the initialize function
init();
