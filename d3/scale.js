$(function(){
  var width = 500;
  var height = 200;
   
  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);
   
  var gdp = [
                      {年: 2007, gdp: 524, 増減: "up"},
                      {年: 2008, gdp: 518, 増減: "down"},
                      {年: 2009, gdp: 490, 増減: "down"},
                      {年: 2010, gdp: 512, 増減: "up"},
                      {年: 2011, gdp: 510, 増減: "down"},
                      {年: 2012, gdp: 517, 増減: "up"},
                      {年: 2013, gdp: 525, 増減: "up"}
                      ];


//ここでスケール関数を作成している
//max min値を動的に取り出すことができる！

  var getList  = function(data, column){ //columnの値をあたらに配列に格納する関数！
    return data.map(function(d){
      return d[column];
    });
  };

  // console.log(d3.max([0, 10, 33, 76])); //d3.maxは引数に配列を指定して最大値を取り出している！

  var max_year = d3.max(getList(gdp, "年"))

  var min_year = d3.min(getList(gdp, "年"))


  var max_gdp = d3.max(getList(gdp, "gdp"))

  var min_gdp = d3.min(getList(gdp, "gdp"))



  var xScale = d3.scaleLinear()
                .domain([min_year, max_year]) //入力値の最大・最小
                .range([10, width-10]); //実際にブラウザに表示する最大・最小。この間で値が表示される！基本的にsvgを超えないようにする！

  var yScale = d3.scaleLinear()
                .domain([min_gdp, max_gdp])
                .range([height-10, 10]);

  var colorScale = d3.scaleLinear()
                    .domain([490, 525])
                    .range(["blue", "red"]);

  var colorCategoryScale = d3.scaleOrdinal(d3.schemeCategory10);

  svg.selectAll("circle")
      .data(gdp)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", function(d){
        return colorCategoryScale(d["増減"]);
      })
      .attr("cx", function(d){
        return xScale(d["年"]);
      })
      .attr("cy", function(d){
        return yScale(d["gdp"]);
      });
})
