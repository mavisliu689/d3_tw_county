//   d3.json("./TW_COUNTY.json", function(topodata) {
//       console.log(topodata)
//     var features = topojson.feature(topodata, topodata.objects["COUNTY_MOI_1060525"]).features;
// 這裡要注意的是 topodata.objects["county"] 中的 "county" 為原本 shp 的檔名


var svg = d3.select("svg");

var projection = d3.geoMercator().center([121,24]).scale(6000) // 座標變換函式;
var path = d3.geoPath().projection(projection);
// var color = d3.scale.linear().domain([0,10000]).range(["#090","#f00"]);
// var color = d3.scale.linear().domain([0,10000]).range(["#090","#f00"]);
// d3.json(" https://unpkg.com/world-atlas@1/world/50m.json", function(error, topodata)

d3.json("./TW_COUNTY.json", function(error, topodata)
{
    if (error) throw error;
    var features = topojson.feature(topodata, topodata.objects.TW_COUNTY).features
    // svg.append("g")
    //     .selectAll("path")
    //     .data(features)
    //     .enter().append("path")
    //     .attr(d, path)
    // for(i=features.length - 1; i >= 0; i-- ) {
    //     // features[i].properties.density = density[features[i].properties.C_Name];
    //     console.log(features[i].properties.C_Name)
    // }
    d3.select("svg").selectAll("path").data(features)
    .enter().append("path").attr("d",path);

    // var color = d3.scale.linear().domain([0,10000]).range(["#090","#f00"]);
    d3.select("svg").selectAll("path").data(features).attr({
      d: path,
      fill: "#2d4d77"
    });
});