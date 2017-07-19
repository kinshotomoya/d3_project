$(function(){

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;



// ----------出力レンジを設定！------------------------
  var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);


  var y = d3.scaleLinear()
            .range([height, 0]);



// ----svgを設定！その中にg要素を設置して、そこにグラフを書いていく！--------
  var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate("+margin.left+", "+margin.top+")");


  d3.csv("csv/sales.csv", function(error, data){
    if(error) throw error;


// ----------データのフォーマットを編集している！------------
    data.forEach(function(d){
      d.sales = +d.sales;
    });


// --------------入力ドメインを設定して出力する幅を設定している！----------------------
 // -----------salespersonだけで新しく配列を作っている！------------
    x.domain(data.map(function(d){
      return d.salesperson;
    }));

    y.domain([0, d3.max(data, function(d){
      return d.sales;
    })]);


    var bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr('x', function(d){
          return x(d.salesperson);
        })
        .attr('width', x.bandwidth())
        // .attr('y', function(d){
        //   return y(d.sales);
        // })
        .attr('y', height)
        .attr('height', 0)

    bars.transition()
          .delay(function(d, i){
            return i *100
          })
          .duration(200)
          .attr('y', function(d){
            return y(d.sales)
          })
          .attr('height', function(d){
            return (height - y(d.sales));
          })
  })

  svg.append('g')
      .attr('transform', "translate(0, "+height+")")
      .call(d3.axisBottom(x));



  svg.append('g')
      .call(d3.axisLeft(y));









































})