// set constant variable for url to samples.json
const samplesUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the json data and console log it
d3.json(samplesUrl).then(function(jsonData) {
    console.log(jsonData);

    // Store the JSON data in a variable
    var samples = jsonData.samples;
    
    // extract IDs
    var ids = jsonData.names;

    // extract otu_labels
    var otuLabels = samples.otu_labels;

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
        // sliced for top 10
        let sampleValues = selectedSample.sample_values.slice(0, 10);
        let otuIds = selectedSample.otu_ids.map(id => "OTU " + id).slice(0, 10);
        // not sliced
        let sampleValuesFull = selectedSample.sample_values;
        let otuIdsFull = selectedSample.otu_ids;

        // create new trace
        let trace1 = {
            x: sampleValues,
            y: otuIds,
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
        let plotData1 = [trace1];

        // Log plotData to the console to inspect its structure
        console.log(plotData1);

        // Update the plot with the new trace
        Plotly.newPlot("bar", plotData1, layout);
        
        // Create a bubble chart that displays each sample
        // otu_ids for marker colors

        // create new trace
        let trace2 = {
            x: otuIdsFull,
            y: sampleValuesFull,
            type: "scatter",
            marker: {
                size: sampleValuesFull,
                color: otuIdsFull,
                colorscale: "Earth"
            },
            mode: "markers",
            text: otuLabels
        };

        //Data array
        let plotData2 = [trace2];

        // Update the plot with the new trace
        Plotly.newPlot("bubble", plotData2);   
    }   

    // Function to handle dropdown menu changes
    function optionChanged(value) {
        getData();
    }

});

   