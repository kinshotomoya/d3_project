// $(function(){

//    var h = 500;
//    var w = 500;

//    var svg = d3.select("body")
//                .append("svg")
//                .attr("width", w)
//                .attr("height", h)


//    var list = [30, 70, 40]

//    var dicData = [{"科目": "国語", "点数":30},
//                   {"科目": "数学", "点数":70},
//                   {"科目": "社会", "点数":60},];

//    var boxes = svg.selectAll("boxes")
//                   .data(dicData)
//                   .enter()
//                   .append("g"); //g要素をbooxesという変数に格納！

//    boxes.append("circle") //g要素の中にcircleを作成
//          .attr("cy", 100)
//          .attr("r", 10)
//          .attr("fill", "blue")
//          .attr("cx", function(d){
//             return d["点数"]*2;
//          })

//    boxes.append("text")  //g要素の中にtextを作成
//          .text(function(d){
//             return d["科目"];
//          })
//          .attr("fill", "gray")
//          .attr("y", 80)
//          .attr("x", function(d){
//             return d["点数"]*2;
//          })
//          .attr("font-size", 10);






// // -----------------------------------------------------------
// // ネストした奥行きがあるデータを使う
// // -----------------------------------------------------------

//    var nestedData = [{"科目": "国語", "点数": 30, "過去の点数":[20,50,10]},
//                      {"科目": "数学", "点数": 70, "過去の点数":[96,88,73]},
//                      {"科目": "社会", "点数": 60, "過去の点数":[76,88,66]}];


//    var boxes = svg.selectAll("g")
//                          .data(nestedData)
//                          .enter()
//                           .append("g");

//    boxes.append("circle")
//          .attr("r", "10")
//          .attr("fill", "red")
//          .attr("cy", function(d, i){
//             return (i+1)*50;
//          })
//          .attr("cx", function(d){
//             return d["点数"]*2
//          });

//    boxes.selectAll("circle")
//          .data(function(d){
//             return d["過去の点数"];
//          })
//          .enter()
//          .append("rect")
//          .attr("y",200)
//           .attr("width",10)
//           .attr("height",10)
//           .attr("fill","orange")
//           .attr("stroke","black")
//           .attr("x", function(d){ return d*2; });





// });
