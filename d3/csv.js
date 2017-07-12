$(function(){
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
  width = 700 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


  var svg = d3.select("body")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate("+margin.left+", "+margin.top+")");



  d3.csv("timeseries.csv", function(data){

    data.reverse(); //データを旧新にした

    var max_y = d3.max(data, function(d){
      return +d["close"]  //+をつけないと2桁までの最大値になる！
    });

    var format = d3.timeFormat("%d-%b-%y");

    var new_format = d3.timeFormat("%y-%b-%d");


    var xScale = d3.scaleLinear()
                  .domain([0, data.length])
                  .range([0, width]);

    var yScale = d3.scaleLinear()
                  .domain([0, max_y])
                  .range([height, 0]);

    var xAxis = d3.axisBottom(xScale)
                  .ticks(6)
                  .tickFormat(function(i){
                    var f = format.parse(data[i]["data"]);
                    return new_format(f)
                  });

    var yAxis = d3.axisLeft(yScale)
                  .ticks(5)
                  .tickSize(6, -width);



    var circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("fill", "steelBlue")
        .attr("cx",0)
        .attr("cy", height)

    circles.transition()
            .duration(1000)
            .delay(function(d, i){
              return i*1.5;
            })
            .attr("cx", function(d, i){
              return xScale(i);
            })
            .attr("cy", function(d){
              return yScale(d["close"])
            })

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
          .attr("y", -10)
          .attr("x",10)
          .style("text-anchor", "end")
          .text("Price($)");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);




  })
})