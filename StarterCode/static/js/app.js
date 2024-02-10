// set variable for url to samples.json
const samplesUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    // Placeholder data for initialization
    var data = [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16]
    }];

    Plotly.newPlot("bar", data);
};

// Fetch the json data and console log it
d3.json(samplesUrl).then(function(jsonData) {
    // console.log(jsonData);

    // Store the JSON data in a variable
    var samples = jsonData.samples;
    
    // extract IDs
    var ids = jsonData.names;

    // Populate dropdown menu with options
    var dropdownMenu = d3.select("#selDataset");
    ids.forEach(id => {
        dropdownMenu.append("option").attr("value", id).text(id);
    });

    // Set up event listener for dropdown menu
    d3.selectAll("#selDataset").on("change", getData);

    // Function to handle dropdown menu changes
    function getData() {
        let dropdownMenu = d3.select("#selDataset");
        let dataset = dropdownMenu.property("value");

        // Filter samples data based on the selected dataset ID
        let selectedSample = samples.find(sample => sample.id === dataset);
        
        // Extract required data for plotting
        let xValues = selectedSample.sample_values.slice(0, 10);
        let yValues = selectedSample.otu_ids.map(id => "OTU " + id).slice(0, 10);

        // create new trace
        let trace1 = {
            x: xValues,
            y: yValues,
            type: "bar",
            orientation: "h"
        };

        // reverse the y-axis to match instructions
        let layout = {
            yaxis: {
                autorange: "reversed"
            }
        };

        //Data array
        let plotData = [trace1];

        // Log plotData to the console to inspect its structure
        console.log(plotData);

        // Update the plot with the new trace
        Plotly.newPlot("bar", plotData, layout);    
    }   

    // Function to handle dropdown menu changes
    function optionChanged(value) {
        getData();
    }

});

