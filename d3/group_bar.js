$(function(){

  var widht, height
  var chartWidth, chartHeight
  var margin
  var svg = d3.select("#graph").append("svg")
  var axisLayer = svg.append("g").classed("axisLayer", true)
  var chartLayer = svg.append("g").classed("chartLayer", true)



  var xInScale = d3.scaleBand()


  var color = d3.scaleOrdinal()
                .range(["#5DDEC9", "#EF64AD", "#7b6888", "#BA67E5", "#E0E23B", "#d0743c", "#ff8c00"])




 d3.csv("csv/group.csv", cast, main)

  function cast(d) {
        Object.keys(d).forEach(function(key){
            if (!isNaN(+d[key])) d[key] = +d[key]
        })
        return d
    }




  function main(data) {

        var nested = d3.nest()
            .rollup(function(d){
             delete d[0].contry; return d[0] //valueを新しく作るのだが、国名を削除して年だけにしている！国名を削除したグループ値を返している！
              })
            .key(function(d){ return d.contry }) //国名をkeyに！
            .entries(data) //key valueの形式でデータをまとめる！


        nested.forEach(function(d){
            d.age = Object.keys(d.value).map(function(key){
                return {key:key, value:d.value[key]}
            })
        })

     // console.log(nested[0].value)
     var newValueArray = [] //valueだけで新しく配列を作ってマックス値マイナス値を取りやすういようにしている！

     nested.map(function(d, i){
      var values = d.age.map(function(d){ //mapで配列の中身を一個一個編集できる！
        newValueArray.push(d.value)
      })
     })

      yMax = d3.max(newValueArray)
      yMin = d3.min(newValueArray)
      console.log(yMax)
      console.log(yMin)


      xScale = d3.scaleBand()
            .domain(0, 5)
            .range(0, widht);

      yScale = d3.scaleLinear()
              .domain(yMin, yMax)
              .range(height, 0);

  }












})