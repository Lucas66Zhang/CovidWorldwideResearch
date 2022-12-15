
// Set up the x and y scales
var x = d3.scaleBand()
  .range([0, width])
  .padding(0.1);

var y = d3.scaleLinear()
  .range([height, 0]);

// Create the bars for the plot
var bars = svg.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.whoRegion); })
  .attr("y", function(d) { return y(d.cases); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y(d.cases); });

// Add the x and y axes
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

// Listen for changes to the year and month select elements
d3.select("#year-select").on("change", updatePlot);
d3.select("#month-select").on("change", updatePlot);

function updatePlot() {
  // Get the selected year and month
  var year = d3.select("#year-select").property("value");
  var month = d3.select("#month-select").property("value");

  // Filter the data to only include the selected year and month
  var filteredData = data.filter(function(d) {
    return d.year === year && d.month === month;
  });

  // Update the scales and axes
  x.domain(filteredData.map(function(d) { return d.whoRegion; }));
y.domain([0, d3.max(filteredData, function(d) { return d.cases; })]);
xAxis.scale(x);
yAxis.scale(y);

// Update the bars with the filtered data
bars.data(filteredData)
.transition()
.duration(500)
.attr("x", function(d) { return x(d.whoRegion); })
.attr("y", function(d) { return y(d.cases); })
.attr("width", x.bandwidth())
.attr("height", function(d) { return height - y(d.cases); });

// Update the x and y axes
svg.select(".x.axis")
.transition()
.duration(500)
.call(xAxis);

svg.select(".y.axis")
.transition()
.duration(500)
.call(yAxis);
}
