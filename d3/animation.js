// $(function(){
//   var width = 960;
//   var height = 700;


//   var svg = d3.select("body")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height);

//   var data = [100, 200, 300];


//   var circles = svg.selectAll("circle")
//                     .data(data)
//                     .enter()
//                     .append("circle")
//                     .attr("cx", function(d){return d;})
//                     .attr("cy", 10)
//                     .attr("r", 30)
//                     .attr("fill", "green");




//   circles.transition()
//         .delay(400)
//         .duration(function(d){
//           return d*10;
//         })
//         .ease(d3.easeBounce) //アニメーションの動きを変更している！
//         .attr("cy", function(d){
//           return d;
//         })
//         .attr("fill", "red");

// })


// -----散布図をアニメーションで表示！----



// $(function(){

//   var margin = {top: 20, right: 20, bottom: 30, left: 40},
//       width = 700 - margin.left - margin.right,
//       height = 400 - margin.top - margin.bottom;

//   var svg = d3.select("body")
//               .append("svg")
//               .attr("width", width + margin.left + margin.right)
//               .attr("height", height + margin.top + margin.bottom)
//               .append("g")
//               .attr("transform", "translate("+ margin.left +", "+ margin.top +")");

//   var gdp = [
//             {年: 2007, gdp: 524, 増減: "up"},
//             {年: 2008, gdp: 518, 増減: "down"},
//             {年: 2009, gdp: 490, 増減: "down"},
//             {年: 2010, gdp: 512, 増減: "up"},
//             {年: 2011, gdp: 510, 増減: "down"},
//             {年: 2012, gdp: 517, 増減: "up"},
//             {年: 2013, gdp: 525, 増減: "up"}
//             ];



//   var getList = function(data, column){ //年・GDPのvalueを取り出して配列にする関数！
//     return data.map(function(d){
//       return d[column];
//     });
//   };

//   var max_year = d3.max(getList(gdp, "年"));

//   var min_year = d3.min(getList(gdp, "年"));

//   var max_gdp = d3.max(getList(gdp, "gdp"));

//   var min_gdp = d3.min(getList(gdp, "gdp"));



//   var xScale = d3.scaleLinear() //xのスケールを設定！
//                 .domain([min_year, max_year])
//                 .range([0, width]);

//   var yScale = d3.scaleLinear() //yのスケールを設定！
//                 .domain([min_gdp, max_gdp])
//                 .range([height, 0]);

//   var colorCategoryScale = d3.scaleOrdinal(d3.schemeCategory10);


//   var xAxis = d3.axisBottom(xScale)
//                   .tickFormat(function(d){
//                     return d;
//                   })

//   var yAxis = d3.axisLeft(yScale) //どんなy軸にするのかを定義している
//                 .ticks(2)
//                 .tickSize(6, -width);


//   var circles =  svg.selectAll("circle")
//       .data(gdp)
//       .enter()
//       .append("circle")
//       .attr("fill", "gray") //最初の色をグレーに
//       .attr("cx", 0) //x軸はまず０から！
//       .attr("r", 1) //半径も最初みんな同じ
//       .attr("cy", function(d){ //y軸は、それぞれのgdpの値を適応！
//         return yScale(d["gdp"]);
//       });

//   circles.transition()
//           .duration(2000) //２秒かける！
//           .delay(function(d){ //年代が大きいほど遅く始まる！
//             return xScale(d["年"])
//           })
//           .ease(d3.easeCircle)
//     // ---以下、結果--------
//           .attr("r", 10)
//           .attr("cx", function(d){
//             return xScale(d["年"]);
//           })
//           .attr("fill", function(d){
//             return colorCategoryScale(d["増減"]);
//           });

//   svg.append("g") //上で定義したy軸を呼び出して,svg上にappendしている！
//       .attr("class", "y axis")
//       .call(yAxis)
//       .append("text")
//       .attr("y", -10)
//       .attr("x", 10)
//       .style("text-anchor", "end")
//       .text("GDP(兆円)");

//   svg.append("g")
//       .attr("class", "y axis")
//       .attr("transform", "translate(0, "+ height +")")
//       .call(xAxis);



// })


// ------線グラフをアニメーションで動かす！-------



$(function(){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("body")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate("+ margin.left +", "+ margin.top +")");


    var gdp = [
            {年: 2007, gdp: 524, 増減: "up"},
            {年: 2008, gdp: 518, 増減: "down"},
            {年: 2009, gdp: 490, 増減: "down"},
            {年: 2010, gdp: 512, 増減: "up"},
            {年: 2011, gdp: 510, 増減: "down"},
            {年: 2012, gdp: 517, 増減: "up"},
            {年: 2013, gdp: 525, 増減: "up"}
            ];

  var getList = function(data, column){ //年・GDPのvalueを取り出して配列にする関数！
    return data.map(function(d){
      return d[column];
    });
  };

  var max_year = d3.max(getList(gdp, "年"));

  var min_year = d3.min(getList(gdp, "年"));

  var max_gdp = d3.max(getList(gdp, "gdp"));

  var min_gdp = d3.min(getList(gdp, "gdp"));




  var xScale = d3.scaleLinear() //xのスケールを設定！
                .domain([min_year, max_year])
                .range([0, width]);

  var yScale = d3.scaleLinear() //yのスケールを設定！
                .domain([min_gdp, max_gdp])
                .range([height, 0]);


    var colorCategoryScale = d3.scaleOrdinal(d3.schemeCategory10);


    var xAxis = d3.axisBottom(xScale)
                  .tickFormat(function(d){
                    return d;
                  })
                  .ticks(5);

    var yAxis = d3.axisLeft(yScale)
                  .ticks(5)
                  .tickSize(6, -width);


 // ----- lineを設定 ----
    var line = d3.line()
                  .x(function(d){ //各データごとのxの位置
                    return xScale(d["年"]); //xスケールを設定
                  })
                  .y(function(d){
                    return yScale(d["gdp"]);
                  })
                  .curve(d3.curveMonotoneX);


// -----sircleを表示----

  svg.selectAll("circle")
      .data(gdp)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", function(d){
        return colorCategoryScale(d["増減"]);
      })
      .attr("cx", function(d){
        return xScale(d["年"]);
      })
      .attr("cy", function(d){
        return yScale(d["gdp"]);
      });

// ----lineを表示！---
  var liine = svg.append("path")
      .data([gdp]) //gdpのデータを読み込んでいる！[]で囲ってあげないといけない!!
      .attr("class", "line")
      .attr("d", line) //appendしたpathの中にd属性 上で作ったlineをattrすれば線を表示できる！
      .attr("stroke-dashoffset", function(){ //線分の開始位置をpathの長さ分左にずらしている！
        return this.getTotalLength() //これでpath要素の長さを取得！
      })
      .attr("stroke-dasharray", function(){ //線分と空きが同じ！
        return this.getTotalLength();
      });

  liine.transition()
      .duration(5000)
      .style("stroke-dashoffset", 0); //徐々にoffsetを0にして、線分を表示させている！

// ----軸を表示！-----
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", -10)
      .attr("x", 10)
      .style("text-anchor", "end")
      .text("GDP");


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, "+height+")")
      .call(xAxis);


})



