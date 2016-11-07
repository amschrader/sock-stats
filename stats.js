var SOCKS = {
  init: function() {
    this.buildYearGraph();
    this.buildYarnGraph();
  },

  buildYearGraph: function() {
    var w = 500;
    var h = 275;
    var barPadding = 1;
    var data = DATA.year;

    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return (h - 20) - d.value * 40;
      })
      .attr("width", w / data.length - barPadding)
      .attr("height", function(d) {
        return d.value * 40;
      })
      .attr("x", function(d, i) {
        return i * (w / data.length);
      })
      .attr("fill", function(d) {
        return "#26ADE4";
      });

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) {
        return d.value;
      })
      .attr("x", function(d, i) {
        return i * (w / data.length) + (w / data.length - barPadding) / 2;
      })
      .attr("y", function(d) {
        return (h - 20) - (d.value * 40) + 15;
      })
      .attr("font-size", "11px")
      .attr("fill", "white")
      .attr("text-anchor", "middle");

    svg.selectAll("label")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) {
        return d.name;
      })
      .attr("x", function(d, i) {
        return i * (w / data.length) + (w / data.length - barPadding) / 2;
      })
      .attr("y", function(d) {
        return h - 5;
      })
      .attr("font-size", "11px")
      .attr("fill", "black")
      .attr("text-anchor", "middle");
  },

  buildYarnGraph: function() {
    var w = 1000;
    var h = 500;
    var barPadding = 1;
    var data = DATA.yarn;

    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", function(d, i) {
        return i * (h / data.length) + barPadding;
      })
      .attr("width", function(d) {
        return d.value * 200;
      })
      .attr("height", function(d) {
        return h / data.length - barPadding;
      })
      .attr("x", function(d, i) {
        return 0;
      })
      .attr("fill", function(d) {
        return "#26ADE4";
      });

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) {
        return d.name;
      })
      .attr("x", function(d, i) {
        return 5;
      })
      .attr("y", function(d, i) {
        return i * (h / data.length) + 25;
      })
      .attr("font-size", "11px")
      .attr("fill", "white");

    svg.selectAll("label")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) {
        return d.value;
      })
      .attr("x", function(d, i) {
        return d.value * 200 - 15;
      })
      .attr("y", function(d, i) {
        return i * (h / data.length) + 25;
      })
      .attr("font-size", "11px")
      .attr("fill", "white");
  }
}
