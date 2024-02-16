# Belly Button Challenge

<p align='left'> <img src='images/dashboard.PNG'></p>

## Deployment
* Here is a link to the dashboard: https://szuckerbrow.github.io/belly-button-challenge/

## Background
In this assignment, I built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Objectives
Using javascript and a combination of D3, plotly, and html, make an API call to collect the data, extract specific information from the data, create an interactive dropdown menu, and create charts and a text box to display the data.

### [Javascript file](js/app.js)

# Instructions
Complete the following steps:

1. Use the D3 library to read in ```samples.json``` from the URL ```https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.```

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

   - Use ```sample_values``` as the values for the bar chart.

   - Use ```otu_ids``` as the labels for the bar chart.

   - Use ```otu_labels``` as the hovertext for the chart.

<div style="display: flex;">
    <div style="flex: 1;">
        <p align='left'> <img src='images/dropdown.PNG'></p>
    </div>
    <div style="flex: 1;">
        <p align='center'> <img src='images/hbarchart.PNG'></p>
    </div>
</div>


3. Create a bubble chart that displays each sample.

   - Use ```otu_ids``` for the x values.

   - Use ```sample_values``` for the y values.

   - Use ```sample_values``` for the marker size.

   - Use ```otu_ids``` for the marker colors.

   - Use ```otu_labels`` for the text values.

<p align='center'> <img src='images/bubblechart.PNG'></p>

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

<p align='left'> <img src='images/metadata.PNG'></p>

6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard.

7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file.

## References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)