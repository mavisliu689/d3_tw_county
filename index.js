//   d3.json("./TW_COUNTY.json", function(topodata) {
//       console.log(topodata)
//     var features = topojson.feature(topodata, topodata.objects["COUNTY_MOI_1060525"]).features;
// 這裡要注意的是 topodata.objects["county"] 中的 "county" 為原本 shp 的檔名


var svg = d3.select("svg");

var projection = d3.geoMercator().center([121,24]).scale(6000) // 座標變換函式;
var path = d3.geoPath().projection(projection);
var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

//新的color linear寫法
var color = d3.scaleLinear().range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

var offsetL = document.getElementById('map').offsetLeft+10;
var offsetT = document.getElementById('map').offsetTop+12;
var ct_dict = {
    5: "雲林縣",
    9: "澎湖縣",
    7: "台東縣",
    8: "花蓮縣",
    4: "南投縣",
    15: "台南市",
    14: "台中市",
    6: "屏東縣",
    10: "基隆市",
    21: "高雄市",
    2: "宜蘭縣",
    12: "台北市",
    17: "苗栗縣",
    13: "新北市",
    18: "新竹縣",
    11: "新竹市",
    20: "嘉義縣",
    19: "嘉義市",
    3: "彰化縣",
    1:"連江縣",
    16: "桃園市"
}


d3.json("./TW_COUNTY.json", function(error, topodata){
    if (error) throw error;
    var features = topojson.feature(topodata, topodata.objects.TW_COUNTY).features
    // svg.append("g")
    //     .selectAll("path")
    //     .data(features)
    //     .enter().append("path")
    //     .attr(d, path)
    for(i=features.length - 1; i >= 0; i-- ) {
        features[i].properties.name = ct_dict[i];
        features[i].properties.id = i;
        // console.log(features[i].properties.C_Name)
    }
    d3.select("svg").selectAll("path").data(features)
            .enter().append("path").attr("d",path)
            .attr("name", function(d) {return d.properties.name;})
            .attr("id", function(d) { return d.id;})
            .on('click', selected)
            .on("mousemove", showTooltip)
            .on("mouseout",  function(d,i) {
                tooltip.classed("hidden", true);
             })
            .style("stroke", "#fff")
            .style("stroke-width", "0.2");

    // var color = d3.scale.linear().domain([0,10000]).range(["#090","#f00"]);
    // d3.select("svg").selectAll("path").data(features).attr({
    //   d: path,
    //   fill: "#2d4d77"
    // });


    function showTooltip(d) {
        label = d.properties.name;
        var mouse = d3.mouse(svg.node())
          .map( function(d) { return parseInt(d); } );

        tooltip.classed("hidden", false)
          .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
          .html(label);
    }


    function selected() {
        console.log(this.getAttribute("name"))
        d3.select('.selected').classed('selected', false);
        d3.select(this).classed('selected', true);
    }
});