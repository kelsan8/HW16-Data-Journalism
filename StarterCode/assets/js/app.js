// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("hairData.csv")
 .then(function(err, healthData) {
    // All the graph stuff goes here
    if(err) throw err;

    healthData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
    });

    var xLinearScale = d3.scaleLinear()
     .domain([20, d3.max(healthData, d => d.age)])
     .range([0, width]);

    var yLinearScale = d3.scaleLinear()
     .domain([0, d3.max(healthData, d => d.smokes)])
     .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(bottomAxis);

    chartGroup.append("g")
     .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
      .data(hairData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.hair_length))
      .attr("cy", d => yLinearScale(d.num_hits))
      .attr("r", "15")
      .attr("fill", "lightblue")
        // ADD THE STATE LABELS
      .attr("opacity", ".5");
 });