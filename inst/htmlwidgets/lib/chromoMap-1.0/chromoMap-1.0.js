/*  Copyright 2018 Lakshay Anand.
    All rights reserved.
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    To view GNU General Public License  see <http://www.gnu.org/licenses/>.
    
    The chromoMap.js Javascript library depends on an open source software component.
    d3.js ,  https://github.com/d3/d3
  
  d3 license
----------------------------------------------------------------------
Copyright 2010-2017 Mike Bostock
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the author nor the names of contributors may be used to
  endorse or promote products derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

-------------------------------------------------------------------------------
 */


/* Global variables */
var chromo = [{"Chromo":"1","Base":248956422,"Protein":2058,"Pseudo":1220,"Centromere":125},{"Chromo":"2","Base":242193529,"Protein":1309,"Pseudo":1023,"Centromere":93.3},{"Chromo":"3","Base":198295559,"Protein":1078,"Pseudo":763,"Centromere":91},{"Chromo":"4","Base":190214555,"Protein":752,"Pseudo":727,"Centromere":50.4},{"Chromo":"5","Base":181538259,"Protein":876,"Pseudo":721,"Centromere":48.4},{"Chromo":"6","Base":170805979,"Protein":1048,"Pseudo":801,"Centromere":61},{"Chromo":"7","Base":159345973,"Protein":989,"Pseudo":885,"Centromere":59.9},{"Chromo":"8","Base":145138636,"Protein":677,"Pseudo":613,"Centromere":45.6},{"Chromo":"9","Base":138394717,"Protein":786,"Pseudo":661,"Centromere":49},{"Chromo":"10","Base":133797422,"Protein":733,"Pseudo":568,"Centromere":40.2},{"Chromo":"11","Base":135086622,"Protein":1298,"Pseudo":821,"Centromere":53.7},{"Chromo":"12","Base":133275309,"Protein":1034,"Pseudo":617,"Centromere":35.8},{"Chromo":"13","Base":114364328,"Protein":327,"Pseudo":372,"Centromere":17.9},{"Chromo":"14","Base":107043718,"Protein":830,"Pseudo":523,"Centromere":17.6},{"Chromo":"15","Base":101991189,"Protein":613,"Pseudo":510,"Centromere":19},{"Chromo":"16","Base":90338345,"Protein":873,"Pseudo":465,"Centromere":36.6},{"Chromo":"17","Base":83257441,"Protein":1197,"Pseudo":531,"Centromere":24},{"Chromo":"18","Base":80373285,"Protein":270,"Pseudo":247,"Centromere":17.2},{"Chromo":"19","Base":58617616,"Protein":1472,"Pseudo":512,"Centromere":26.5},{"Chromo":"20","Base":64444167,"Protein":544,"Pseudo":249,"Centromere":27.5},{"Chromo":"21","Base":46709983,"Protein":234,"Pseudo":185,"Centromere":13.2},{"Chromo":"22","Base":50818468,"Protein":488,"Pseudo":324,"Centromere":14.7},{"Chromo":"X","Base":156040895,"Protein":842,"Pseudo":874,"Centromere":60.6},{"Chromo":"Y","Base":57227415,"Protein":71,"Pseudo":388,"Centromere":12.5}] ;
var mtData =[{"Chromo":"Mt","Base":16569,"Protein":13,"Pseudo":0,"Centromere":"NA"}];


function chromoMap( chData,type, align, bgCol,bgBorder,chCol,chBorder,annoColor,textCol,HeatColRange,dim) {


 /* Chromosome Alignment */
var div = document.getElementById("chromap");
if( align == "horizontal") {
renderHchMap(div);
  d3.select(".chMap").style("width",dim[0]).style("height",dim[1]);
} else if( align == "vertical"){
	renderVchMap(div);
	d3.select(".chMap").style("width",dim[0]).style("height",dim[1]);
} else { div.innerHTML = "Error: Ivalid alignment argument" ; }



/* background styling  */
document.getElementById("chMapBack").setAttribute("stroke", bgBorder);
document.getElementById("chMapBack").setAttribute("fill", bgCol);

/*  Chromomosome styling    */
var themeCol = '';
if(chCol == "white"){ themeCol = chBorder;}else{themeCol=chCol;}

var y = div.getElementsByClassName("chromo");
var i;
for (i = 0; i < y.length; i++) {
    y[i].setAttribute("fill", chCol);
    y[i].setAttribute("stroke", chBorder);
    
    y[i].setAttribute("onmouseover", "evt.target.setAttribute('fill-opacity', '0.5'); evt.target.setAttribute('stroke-opacity','0.3');");
    y[i].setAttribute("onmouseout", "evt.target.setAttribute('fill-opacity', '1');evt.target.setAttribute('stroke-opacity','1');");
}
var y3 = div.getElementsByClassName("mt");
var i;
for (i = 0; i < y3.length; i++) {
    y3[i].setAttribute("stroke", themeCol);
    
    
    y3[i].setAttribute("onmouseover", " evt.target.setAttribute('stroke-opacity','0.3');");
    y3[i].setAttribute("onmouseout", "evt.target.setAttribute('stroke-opacity','1');");
}


var y2 = div.getElementsByClassName("chLoc");
var i;
for (i = 0; i < y2.length; i++) {
    y2[i].setAttribute("visibility", "hidden");
    
    
   
}

var txt = div.getElementsByClassName("chText");

for (i = 0; i < txt.length; i++) {
    txt[i].setAttribute("fill", textCol);
    txt[i].setAttribute("font-size", 15);
    
}
/* appending data */
if(type == "annotation") {
	
	
for(var i = 0;i < chData.length;i++) {
	
	var ch_id= assignLoc(chData[i].chrom , Math.abs(chData[i].start));
	chData[i].loc = ch_id;
	
}

var chDataReduced = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { var label =''; var tot = '<font color="grey"> Count: </font> '+v.length+"  </p></div><hr><div  style='float:top;height:80%;overflow-wrap: break-word;' > <font size='1'>";for(var i=0; i< v.length;i++){ label = label + v[i].name +" ,";    }; return tot+label.slice(0,-1);})
  .entries(chData);
var chDataReducedCount = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) {  return v.length;})
  .entries(chData);

/* adding the chromosome tootltips    */
for(var i = 0;i < chDataReduced.length;i++) {
	
	var loc_range= getRange(chDataReduced[i].key);
	chDataReduced[i].range = loc_range;
	chDataReduced[i].len = chDataReducedCount[i].value;
}



var tip = d3.select("body").append("div")	
    .attr("class", "chtooltip")				
    .style("opacity", 0)
    .attr("style", "position: absolute;text-align: center;	box-sizing: border-box; padding: 3px;	font: 12px sans-serif;	background: #F5F5F5;	border: 0px;border-radius: 8px;pointer-events: none;") ;
     
      
     d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9);	tip.style("height",100+d.len*1.5).style("width",190+d.len);	
      tip.html("<div  style='float:top;height:10%;color:"+themeCol+";'><p>"+d.range+"</p></div><hr><div  style='float:top;height:10%;'><p ><b>"+d.value+"</font></div>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip.transition() .delay(500).duration(500)	.style("opacity", 0);}).style("visibility","visible").style("stroke",annoColor);
	 
      
      d3.selectAll(".chromo").data(chromo).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9);	tip.style("height",100).style("width",180);	
      tip.html("<p><b><font size='2' color='"+themeCol+"' > Chromosome "+d.Chromo+"</font><br><table ><tr><td><font size='1'> Total Bp: </font></td><td><font size='1'> "+d.Base+" </font></td></tr><tr><td><font size='1'> Protein-coding genes: </font></td><td><font size='1'>"+d.Protein+"</font></td></tr><tr><td><font size='1'> Pseudo-genes: </font></td><td><font size='1'>"+d.Pseudo+"</font></td></tr><tr><td><font size='1'> Centromere(Mbp): </font> </td><td><font size='1'>"+d.Centromere+"</font></td></tr></table></p>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip.transition() .duration(500)	.style("opacity", 0);});
    
     d3.select(".mt").data(mtData).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9);	tip.style("height",100).style("width",180);	
      tip.html("<p><b><font size='2' color='"+themeCol+"' > Chromosome "+d.Chromo+"</font><br><table ><tr><td><font size='1'> Total Bp: </font></td><td><font size='1'> "+d.Base+" </font></td></tr><tr><td><font size='1'> Protein-coding genes: </font></td><td><font size='1'>"+d.Protein+"</font></td></tr><tr><td><font size='1'> Pseudo-genes: </font></td><td><font size='1'>"+d.Pseudo+"</font></td></tr><tr><td><font size='1'> Centromere(Mbp): </font> </td><td><font size='1'>"+d.Centromere+"</font></td></tr></table></p>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip.transition() .duration(500)	.style("opacity", 0);});

}else if (type == "heatmap-single"){
	
	
	
	/* Code for the Chromosome Heatmap  */
	
	d3.select(".chrLegend").style("visibility","visible");

/* code for location maping wit each gene  */
for(var i = 0;i < chData.length;i++) {
	
	var ch_id= assignLoc(chData[i].chrom , Math.abs(chData[i].start));
	chData[i].loc = ch_id;
	
}
/*  Reducing the data */
   var chDataReduced = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.data; });})
  .entries(chData);
	
	var chDataReducedMin = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return d3.min(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedMax = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return d3.max(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedBarData = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['start']) - Math.abs(b['start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].data);};return bar;})
  .entries(chData);
  var chDataReducedBarLabel = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['start']) - Math.abs(b['start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].name);};return bar;})
  .entries(chData);
  var chDataReducedCount = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return v.length;})
  .entries(chData);
	
	/* creating final data    */
for(var i = 0;i < chDataReduced.length;i++) {
	
	var loc_range= getRange(chDataReduced[i].key);
	chDataReduced[i].range = loc_range;
	chDataReduced[i].min = chDataReducedMin[i].value;
	chDataReduced[i].max = chDataReducedMax[i].value;
	chDataReduced[i].bar = chDataReducedBarData[i].value;
	chDataReduced[i].label = chDataReducedBarLabel[i].value;
	chDataReduced[i].count = chDataReducedCount[i].value;
}

     


      var rng = d3.extent(chDataReduced, function(d){ return d.value;});
var colors = d3.scaleLinear()
    .domain([rng[0],0,rng[1]])
    .range(HeatColRange);  
    
  var chLinGradH = d3.select(".chMap").append("defs").append("linearGradient")
                     .attr("id", "linear-gradient-chromV")
                     .attr("x1", "0%")
                     .attr("y1", "0%")
                     .attr("x2", "100%")
                     .attr("y2", "0%")
                     .selectAll("stop")
    .data( colors.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(colors.range().length-1); })
    .attr("stop-color", function(d) { return d; }); 
    
    var chLinGradV = d3.select(".chMap").append("defs").append("linearGradient")
                     .attr("id", "linear-gradient-chromH")
                     .attr("x1", "0%")
                     .attr("y1", "0%")
                     .attr("x2", "0%")
                     .attr("y2", "100%")
                     .selectAll("stop")
    .data( colors.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(colors.range().length-1); })
    .attr("stop-color", function(d) { return d; });   

if(align == "horizontal"){
d3.select("#chLeg").style("fill", "url(#linear-gradient-chromH)");
} else if(align == "vertical"){
   d3.select("#chLeg").style("fill", "url(#linear-gradient-chromV)");
  }  
  if(rng[0]<0){
  d3.select("#lgtMax").text((rng[1]).toFixed(2));
  d3.select("#lgtMid").text("0");
  d3.select("#lgtMin").text((rng[0]).toFixed(2));
}else{   
	
	d3.select("#lgtMax").text((rng[1]).toFixed(2));
  d3.select("#lgtMid").text((rng[0]+rng[1]/chDataReduced.length).toFixed(2));
  d3.select("#lgtMin").text((rng[0]).toFixed(2));
	
	
	}
   d3.select(".chText").style("fill", textCol);
   
var tip = d3.select("body").append("div")	
    .attr("class", "chtooltip")				
    .style("opacity", 0)
    .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	background: #F5F5F5;box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;
     
      
     d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9).style("width",180+d.count*2+'px');		
      tip.html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors(d.value)+
      ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' > Avg.: </font> <font size='1'  ><b> "+(d.value).toFixed(2)+
      " <br><font size='1' color='grey' > Min.: </font>"+(d.min).toFixed(2)+" <br><font size='1' color='grey' > Max.: </font> "+(d.max).toFixed(2)+
      "</font><br><font size='1' color='grey' > Count: </font><font size='1'>"+d.count+"</p></font></div></div><div id ='microBar' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:"+themeCol+
      ";'><font size='2' >"+d.range+"</font></p></div>")
      .style("left", (d3.event.pageX) + "px")	
      .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*1.5;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg = d3.select('#microBar').append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-30).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors(d);});  })
      .on("mouseout", function(d) {	tip.transition() .delay(500).duration(500)	.style("opacity", 0);}).style("visibility","visible").style("stroke",function(d){ return colors(d.value);});
	  
     // d3.selectAll("line").data(chDataUnusedLocs,function(d) { if(d == d3.select(this).attr("id") ){return d3.select(this).attr("id");}}).enter().style("visibility","visible").style("stroke","white");
      d3.selectAll(".chromo").data(chromo).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9);		
      tip.html("<div  style='float:top;position:relative;width:100%;height:20%' ><p><b><font size='2' color='"+themeCol+"' > Chromosome "+d.Chromo+"</font></p></div><div  style='float:top;position:relative;width:100%;height:80%' ><br><table ><tr><td><font size='1'> Total Bp: </font></td><td><font size='1'> "+d.Base+" </font></td></tr><tr><td><font size='1'> Protein-coding genes: </font></td><td><font size='1'>"+d.Protein+"</font></td></tr><tr><td><font size='1'> Pseudo-genes: </font></td><td><font size='1'>"+d.Pseudo+"</font></td></tr><tr><td><font size='1'> Centromere(Mbp): </font> </td><td><font size='1'>"+d.Centromere+"</font></td></tr></table></div>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip.transition() .duration(500)	.style("opacity", 0);});
    
     d3.select(".mt").data(mtData).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9);		
      tip.html("<div  style='float:top;position:relative;width:100%;height:20%' ><p><b><font size='2' color='"+themeCol+"' > Chromosome "+d.Chromo+"</font></p></div><div  style='float:top;position:relative;width:100%;height:80%' ><br><table ><tr><td><font size='1'> Total Bp: </font></td><td><font size='1'> "+d.Base+" </font></td></tr><tr><td><font size='1'> Protein-coding genes: </font></td><td><font size='1'>"+d.Protein+"</font></td></tr><tr><td><font size='1'> Pseudo-genes: </font></td><td><font size='1'>"+d.Pseudo+"</font></td></tr><tr><td><font size='1'> Centromere(Mbp): </font> </td><td><font size='1'>"+d.Centromere+"</font></td></tr></table></div>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip.transition() .duration(500)	.style("opacity", 0);});
	
	
} else if(type == "heatmap-double"){
	
	console.log("i am at comparison");
	/* Code for the Comparison Heatmap  */
	
	d3.select(".chrLegend").style("visibility","visible");

/* code for location maping wit each gene  */
for(var i = 0;i < chData.length;i++) {
	
	var ch_id= assignLoc(chData[i].chrom , Math.abs(chData[i].start));
	chData[i].loc = ch_id;
	
}
/*  Reducing the data */
   var chDataReduced = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.data; });})
  .entries(chData);
	
	var chDataReducedMin = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return d3.min(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedMax = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return d3.max(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedBarData = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['start']) - Math.abs(b['start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].data);};return bar;})
  .entries(chData);
  var chDataReducedBarDataComp = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['start']) - Math.abs(b['start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].secondData);};return bar;})
  .entries(chData);
  var chDataReducedBarLabel = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['start']) - Math.abs(b['start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].name);};return bar;})
  .entries(chData);
  var chDataReducedCount = d3.nest()
  .key(function(d) { return d.loc; })
  .rollup(function(v) { return v.length;})
  .entries(chData);
	console.log(chDataReducedBarDataComp);
	/* creating final data    */
for(var i = 0;i < chDataReduced.length;i++) {
	
	var loc_range= getRange(chDataReduced[i].key);
	chDataReduced[i].range = loc_range;
	chDataReduced[i].min = chDataReducedMin[i].value;
	chDataReduced[i].max = chDataReducedMax[i].value;
	chDataReduced[i].bar = chDataReducedBarData[i].value;
	chDataReduced[i].second = chDataReducedBarDataComp[i].value;
	chDataReduced[i].label = chDataReducedBarLabel[i].value;
	chDataReduced[i].count = chDataReducedCount[i].value;
}

     


      var rng = d3.extent(chDataReduced, function(d){ return d.value;});
var colors = d3.scaleLinear()
    .domain([rng[0],0,rng[1]])
    .range(HeatColRange);  
    
  var chLinGradH = d3.select(".chMap").append("defs").append("linearGradient")
                     .attr("id", "linear-gradient-chromV")
                     .attr("x1", "0%")
                     .attr("y1", "0%")
                     .attr("x2", "100%")
                     .attr("y2", "0%")
                     .selectAll("stop")
    .data( colors.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(colors.range().length-1); })
    .attr("stop-color", function(d) { return d; }); 
    
    var chLinGradV = d3.select(".chMap").append("defs").append("linearGradient")
                     .attr("id", "linear-gradient-chromH")
                     .attr("x1", "0%")
                     .attr("y1", "0%")
                     .attr("x2", "0%")
                     .attr("y2", "100%")
                     .selectAll("stop")
    .data( colors.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(colors.range().length-1); })
    .attr("stop-color", function(d) { return d; });   

if(align == "horizontal"){
d3.select("#chLeg").style("fill", "url(#linear-gradient-chromH)");
} else if(align == "vertical"){
   d3.select("#chLeg").style("fill", "url(#linear-gradient-chromV)");
  }  
  if(rng[0]<0){
  d3.select("#lgtMax").text((rng[1]).toFixed(2));
  d3.select("#lgtMid").text("0");
  d3.select("#lgtMin").text((rng[0]).toFixed(2));
}else{   
	
	d3.select("#lgtMax").text(rng[1]);
  d3.select("#lgtMid").text(rng[0]+rng[1]/chDataReduced.length);
  d3.select("#lgtMin").text(rng[0]);
	
	
	}
   d3.select(".chText").style("fill", textCol);
   
var tip = d3.select("body").append("div")	
    .attr("class", "chtooltip")				
    .style("opacity", 0)
    .attr("style", "position: absolute;text-align: center;width: 180px;height: 170px;	 padding: 2px;	font: 12px sans-serif;	background: #F5F5F5;box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;
     
      console.log(chDataReduced);
     d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9).style("width",180+d.count*2+'px');		
      tip.html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors(d.value)+
      ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' > Avg.: </font> <font size='1'  ><b> "+(d.value).toFixed(2)+
      " <br><font size='1' color='grey' > Min.: </font>"+(d.min).toFixed(2)+" <br><font size='1' color='grey' > Max.: </font> "+(d.max).toFixed(2)+
      "</font><br><font size='1' color='grey' > Count: </font><font size='1'>"+d.count+"</p></font></div></div><div id ='microBar' style='float:top;position:relative;height:15%'></div><br><div id ='microBar2' style='float:top;position:relative;height:15%'></div><br><div  style='float:top;height:20%;position:relative;color:"+themeCol+
      ";'><font size='2' >"+d.range+"</font></p></div>")
      .style("left", (d3.event.pageX) + "px")	
      .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*1.5;var svgHeight = 40;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg = d3.select('#microBar').append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-30).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors(d);}); 
       var svgWidth2 = 175+d.count*1.5;var svgHeight2 = 40;var barPadding2 = 5;var barWidth2 = (svgWidth2 / d.second.length);var mysvg2 = d3.select('#microBar2').append("svg").attr("width",svgWidth2).attr("heigth",svgHeight2);var barChart2 = mysvg2.selectAll('rect').data(d.second).enter().append('rect').attr('height',svgHeight2-30).attr('width', barWidth2).attr('transform', function (d, i) { var translate2 = [barWidth2 * i, 0];  return 'translate('+ translate2 +')';}).style("fill",function(d){return colors(d);}); })
      .on("mouseout", function(d) {	tip.transition() .delay(500).duration(500)	.style("opacity", 0);}).style("visibility","visible").style("stroke",function(d){ return colors(d.value);});
	  
     // d3.selectAll("line").data(chDataUnusedLocs,function(d) { if(d == d3.select(this).attr("id") ){return d3.select(this).attr("id");}}).enter().style("visibility","visible").style("stroke","white");
      d3.selectAll(".chromo").data(chromo).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9);		
      tip.html("<p><b><font size='2' color='"+themeCol+"' > Chromosome "+d.Chromo+"</font><br><table ><tr><td><font size='1'> Total Bp: </font></td><td><font size='1'> "+d.Base+" </font></td></tr><tr><td><font size='1'> Protein-coding genes: </font></td><td><font size='1'>"+d.Protein+"</font></td></tr><tr><td><font size='1'> Pseudo-genes: </font></td><td><font size='1'>"+d.Pseudo+"</font></td></tr><tr><td><font size='1'> Centromere(Mbp): </font> </td><td><font size='1'>"+d.Centromere+"</font></td></tr></table></p>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip.transition() .duration(500)	.style("opacity", 0);});
    
     d3.select(".mt").data(mtData).on("mouseover", function(d) {tip.transition().duration(200)	.style("opacity", .9);		
      tip.html("<p><b><font size='2' color='"+themeCol+"' > Chromosome "+d.Chromo+"</font><br><table ><tr><td><font size='1'> Total Bp: </font></td><td><font size='1'> "+d.Base+" </font></td></tr><tr><td><font size='1'> Protein-coding genes: </font></td><td><font size='1'>"+d.Protein+"</font></td></tr><tr><td><font size='1'> Pseudo-genes: </font></td><td><font size='1'>"+d.Pseudo+"</font></td></tr><tr><td><font size='1'> Centromere(Mbp): </font> </td><td><font size='1'>"+d.Centromere+"</font></td></tr></table></p>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip.transition() .duration(500)	.style("opacity", 0);});
	
	
	
	
	
	
	
	
	
/* end of comparison        */	
}


}

function assignLoc(chr,start) {
	
	var chid='';
	 if( chr == "chr1") {

  if( start >=  1  && start <=  2049180  ){ chid = '  1_1  '; } 
 else if( start >=  2049181  && start <=  4098361  ){ chid = '  1_2  '; } 
 else if( start >=  4098362  && start <=  6147542  ){ chid = '  1_3  '; } 
 else if( start >=  6147543  && start <=  8196723  ){ chid = '  1_4  '; } 
 else if( start >=  8196724  && start <=  10245904  ){ chid = '  1_5  '; } 
 else if( start >=  10245905  && start <=  12295085  ){ chid = '  1_6  '; } 
 else if( start >=  12295086  && start <=  14344266  ){ chid = '  1_7  '; } 
 else if( start >=  14344267  && start <=  16393447  ){ chid = '  1_8  '; } 
 else if( start >=  16393448  && start <=  18442628  ){ chid = '  1_9  '; } 
 else if( start >=  18442629  && start <=  20491809  ){ chid = '  1_10  '; } 
 else if( start >=  20491810  && start <=  22540990  ){ chid = '  1_11  '; } 
 else if( start >=  22540991  && start <=  24590171  ){ chid = '  1_12  '; } 
 else if( start >=  24590172  && start <=  26639352  ){ chid = '  1_13  '; } 
 else if( start >=  26639353  && start <=  28688533  ){ chid = '  1_14  '; } 
 else if( start >=  28688534  && start <=  30737714  ){ chid = '  1_15  '; } 
 else if( start >=  30737715  && start <=  32786895  ){ chid = '  1_16  '; } 
 else if( start >=  32786896  && start <=  34836076  ){ chid = '  1_17  '; } 
 else if( start >=  34836077  && start <=  36885257  ){ chid = '  1_18  '; } 
 else if( start >=  36885258  && start <=  38934438  ){ chid = '  1_19  '; } 
 else if( start >=  38934439  && start <=  40983619  ){ chid = '  1_20  '; } 
 else if( start >=  40983620  && start <=  43032800  ){ chid = '  1_21  '; } 
 else if( start >=  43032801  && start <=  45081981  ){ chid = '  1_22  '; } 
 else if( start >=  45081982  && start <=  47131162  ){ chid = '  1_23  '; } 
 else if( start >=  47131163  && start <=  49180343  ){ chid = '  1_24  '; } 
 else if( start >=  49180344  && start <=  51229524  ){ chid = '  1_25  '; } 
 else if( start >=  51229525  && start <=  53278705  ){ chid = '  1_26  '; } 
 else if( start >=  53278706  && start <=  55327886  ){ chid = '  1_27  '; } 
 else if( start >=  55327887  && start <=  57377067  ){ chid = '  1_28  '; } 
 else if( start >=  57377068  && start <=  59426248  ){ chid = '  1_29  '; } 
 else if( start >=  59426249  && start <=  61475429  ){ chid = '  1_30  '; } 
 else if( start >=  61475430  && start <=  63524610  ){ chid = '  1_31  '; } 
 else if( start >=  63524611  && start <=  65573791  ){ chid = '  1_32  '; } 
 else if( start >=  65573792  && start <=  67622972  ){ chid = '  1_33  '; } 
 else if( start >=  67622973  && start <=  69672153  ){ chid = '  1_34  '; } 
 else if( start >=  69672154  && start <=  71721334  ){ chid = '  1_35  '; } 
 else if( start >=  71721335  && start <=  73770515  ){ chid = '  1_36  '; } 
 else if( start >=  73770516  && start <=  75819696  ){ chid = '  1_37  '; } 
 else if( start >=  75819697  && start <=  77868877  ){ chid = '  1_38  '; } 
 else if( start >=  77868878  && start <=  79918058  ){ chid = '  1_39  '; } 
 else if( start >=  79918059  && start <=  81967239  ){ chid = '  1_40  '; } 
 else if( start >=  81967240  && start <=  84016420  ){ chid = '  1_41  '; } 
 else if( start >=  84016421  && start <=  86065601  ){ chid = '  1_42  '; } 
 else if( start >=  86065602  && start <=  88114782  ){ chid = '  1_43  '; } 
 else if( start >=  88114783  && start <=  90163963  ){ chid = '  1_44  '; } 
 else if( start >=  90163964  && start <=  92213144  ){ chid = '  1_45  '; } 
 else if( start >=  92213145  && start <=  94262325  ){ chid = '  1_46  '; } 
 else if( start >=  94262326  && start <=  96311506  ){ chid = '  1_47  '; } 
 else if( start >=  96311507  && start <=  98360687  ){ chid = '  1_48  '; } 
 else if( start >=  98360688  && start <=  100409868  ){ chid = '  1_49  '; } 
 else if( start >=  100409869  && start <=  102459049  ){ chid = '  1_50  '; } 
 else if( start >=  102459050  && start <=  104508230  ){ chid = '  1_51  '; } 
 else if( start >=  104508231  && start <=  106557411  ){ chid = '  1_52  '; } 
 else if( start >=  106557412  && start <=  108606592  ){ chid = '  1_53  '; } 
 else if( start >=  108606593  && start <=  110655773  ){ chid = '  1_54  '; } 
 else if( start >=  110655774  && start <=  112704954  ){ chid = '  1_55  '; } 
 else if( start >=  112704955  && start <=  114754135  ){ chid = '  1_56  '; } 
 else if( start >=  114754136  && start <=  116803316  ){ chid = '  1_57  '; } 
 else if( start >=  116803317  && start <=  118852497  ){ chid = '  1_58  '; } 
 else if( start >=  118852498  && start <=  120901678  ){ chid = '  1_59  '; } 
 else if( start >=  120901679  && start <=  122950859  ){ chid = '  1_60  '; } 
 else if( start >=  122950860  && start <=  125000040  ){ chid = '  1_61  '; } 
 else if( start >=  125000041  && start <=  127065981  ){ chid = '  1_62  '; } 
 else if( start >=  127065982  && start <=  129131922  ){ chid = '  1_63  '; } 
 else if( start >=  129131923  && start <=  131197863  ){ chid = '  1_64  '; } 
 else if( start >=  131197864  && start <=  133263804  ){ chid = '  1_65  '; } 
 else if( start >=  133263805  && start <=  135329745  ){ chid = '  1_66  '; } 
 else if( start >=  135329746  && start <=  137395686  ){ chid = '  1_67  '; } 
 else if( start >=  137395687  && start <=  139461627  ){ chid = '  1_68  '; } 
 else if( start >=  139461628  && start <=  141527568  ){ chid = '  1_69  '; } 
 else if( start >=  141527569  && start <=  143593509  ){ chid = '  1_70  '; } 
 else if( start >=  143593510  && start <=  145659450  ){ chid = '  1_71  '; } 
 else if( start >=  145659451  && start <=  147725391  ){ chid = '  1_72  '; } 
 else if( start >=  147725392  && start <=  149791332  ){ chid = '  1_73  '; } 
 else if( start >=  149791333  && start <=  151857273  ){ chid = '  1_74  '; } 
 else if( start >=  151857274  && start <=  153923214  ){ chid = '  1_75  '; } 
 else if( start >=  153923215  && start <=  155989155  ){ chid = '  1_76  '; } 
 else if( start >=  155989156  && start <=  158055096  ){ chid = '  1_77  '; } 
 else if( start >=  158055097  && start <=  160121037  ){ chid = '  1_78  '; } 
 else if( start >=  160121038  && start <=  162186978  ){ chid = '  1_79  '; } 
 else if( start >=  162186979  && start <=  164252919  ){ chid = '  1_80  '; } 
 else if( start >=  164252920  && start <=  166318860  ){ chid = '  1_81  '; } 
 else if( start >=  166318861  && start <=  168384801  ){ chid = '  1_82  '; } 
 else if( start >=  168384802  && start <=  170450742  ){ chid = '  1_83  '; } 
 else if( start >=  170450743  && start <=  172516683  ){ chid = '  1_84  '; } 
 else if( start >=  172516684  && start <=  174582624  ){ chid = '  1_85  '; } 
 else if( start >=  174582625  && start <=  176648565  ){ chid = '  1_86  '; } 
 else if( start >=  176648566  && start <=  178714506  ){ chid = '  1_87  '; } 
 else if( start >=  178714507  && start <=  180780447  ){ chid = '  1_88  '; } 
 else if( start >=  180780448  && start <=  182846388  ){ chid = '  1_89  '; } 
 else if( start >=  182846389  && start <=  184912329  ){ chid = '  1_90  '; } 
 else if( start >=  184912330  && start <=  186978270  ){ chid = '  1_91  '; } 
 else if( start >=  186978271  && start <=  189044211  ){ chid = '  1_92  '; } 
 else if( start >=  189044212  && start <=  191110152  ){ chid = '  1_93  '; } 
 else if( start >=  191110153  && start <=  193176093  ){ chid = '  1_94  '; } 
 else if( start >=  193176094  && start <=  195242034  ){ chid = '  1_95  '; } 
 else if( start >=  195242035  && start <=  197307975  ){ chid = '  1_96  '; } 
 else if( start >=  197307976  && start <=  199373916  ){ chid = '  1_97  '; } 
 else if( start >=  199373917  && start <=  201439857  ){ chid = '  1_98  '; } 
 else if( start >=  201439858  && start <=  203505798  ){ chid = '  1_99  '; } 
 else if( start >=  203505799  && start <=  205571739  ){ chid = '  1_100  '; } 
 else if( start >=  205571740  && start <=  207637680  ){ chid = '  1_101  '; } 
 else if( start >=  207637681  && start <=  209703621  ){ chid = '  1_102  '; } 
 else if( start >=  209703622  && start <=  211769562  ){ chid = '  1_103  '; } 
 else if( start >=  211769563  && start <=  213835503  ){ chid = '  1_104  '; } 
 else if( start >=  213835504  && start <=  215901444  ){ chid = '  1_105  '; } 
 else if( start >=  215901445  && start <=  217967385  ){ chid = '  1_106  '; } 
 else if( start >=  217967386  && start <=  220033326  ){ chid = '  1_107  '; } 
 else if( start >=  220033327  && start <=  222099267  ){ chid = '  1_108  '; } 
 else if( start >=  222099268  && start <=  224165208  ){ chid = '  1_109  '; } 
 else if( start >=  224165209  && start <=  226231149  ){ chid = '  1_110  '; } 
 else if( start >=  226231150  && start <=  228297090  ){ chid = '  1_111  '; } 
 else if( start >=  228297091  && start <=  230363031  ){ chid = '  1_112  '; } 
 else if( start >=  230363032  && start <=  232428972  ){ chid = '  1_113  '; } 
 else if( start >=  232428973  && start <=  234494913  ){ chid = '  1_114  '; } 
 else if( start >=  234494914  && start <=  236560854  ){ chid = '  1_115  '; } 
 else if( start >=  236560855  && start <=  238626795  ){ chid = '  1_116  '; } 
 else if( start >=  238626796  && start <=  240692736  ){ chid = '  1_117  '; } 
 else if( start >=  240692737  && start <=  242758677  ){ chid = '  1_118  '; } 
 else if( start >=  242758678  && start <=  244824618  ){ chid = '  1_119  '; } 
 else if( start >=  244824619  && start <=  246890559  ){ chid = '  1_120  '; } 
 else if( start >=  246890560  && start <=  248956422  ){ chid = '  1_121  '; } 
} else if( chr == "chr2") {
  if( start >=  1  && start <=  2073333  ){ chid = '  2_1  '; } 
 else if( start >=  2073334  && start <=  4146667  ){ chid = '  2_2  '; } 
 else if( start >=  4146668  && start <=  6220001  ){ chid = '  2_3  '; } 
 else if( start >=  6220002  && start <=  8293335  ){ chid = '  2_4  '; } 
 else if( start >=  8293336  && start <=  10366669  ){ chid = '  2_5  '; } 
 else if( start >=  10366670  && start <=  12440003  ){ chid = '  2_6  '; } 
 else if( start >=  12440004  && start <=  14513337  ){ chid = '  2_7  '; } 
 else if( start >=  14513338  && start <=  16586671  ){ chid = '  2_8  '; } 
 else if( start >=  16586672  && start <=  18660005  ){ chid = '  2_9  '; } 
 else if( start >=  18660006  && start <=  20733339  ){ chid = '  2_10  '; } 
 else if( start >=  20733340  && start <=  22806673  ){ chid = '  2_11  '; } 
 else if( start >=  22806674  && start <=  24880007  ){ chid = '  2_12  '; } 
 else if( start >=  24880008  && start <=  26953341  ){ chid = '  2_13  '; } 
 else if( start >=  26953342  && start <=  29026675  ){ chid = '  2_14  '; } 
 else if( start >=  29026676  && start <=  31100009  ){ chid = '  2_15  '; } 
 else if( start >=  31100010  && start <=  33173343  ){ chid = '  2_16  '; } 
 else if( start >=  33173344  && start <=  35246677  ){ chid = '  2_17  '; } 
 else if( start >=  35246678  && start <=  37320011  ){ chid = '  2_18  '; } 
 else if( start >=  37320012  && start <=  39393345  ){ chid = '  2_19  '; } 
 else if( start >=  39393346  && start <=  41466679  ){ chid = '  2_20  '; } 
 else if( start >=  41466680  && start <=  43540013  ){ chid = '  2_21  '; } 
 else if( start >=  43540014  && start <=  45613347  ){ chid = '  2_22  '; } 
 else if( start >=  45613348  && start <=  47686681  ){ chid = '  2_23  '; } 
 else if( start >=  47686682  && start <=  49760015  ){ chid = '  2_24  '; } 
 else if( start >=  49760016  && start <=  51833349  ){ chid = '  2_25  '; } 
 else if( start >=  51833350  && start <=  53906683  ){ chid = '  2_26  '; } 
 else if( start >=  53906684  && start <=  55980017  ){ chid = '  2_27  '; } 
 else if( start >=  55980018  && start <=  58053351  ){ chid = '  2_28  '; } 
 else if( start >=  58053352  && start <=  60126685  ){ chid = '  2_29  '; } 
 else if( start >=  60126686  && start <=  62200019  ){ chid = '  2_30  '; } 
 else if( start >=  62200020  && start <=  64273353  ){ chid = '  2_31  '; } 
 else if( start >=  64273354  && start <=  66346687  ){ chid = '  2_32  '; } 
 else if( start >=  66346688  && start <=  68420021  ){ chid = '  2_33  '; } 
 else if( start >=  68420022  && start <=  70493355  ){ chid = '  2_34  '; } 
 else if( start >=  70493356  && start <=  72566689  ){ chid = '  2_35  '; } 
 else if( start >=  72566690  && start <=  74640023  ){ chid = '  2_36  '; } 
 else if( start >=  74640024  && start <=  76713357  ){ chid = '  2_37  '; } 
 else if( start >=  76713358  && start <=  78786691  ){ chid = '  2_38  '; } 
 else if( start >=  78786692  && start <=  80860025  ){ chid = '  2_39  '; } 
 else if( start >=  80860026  && start <=  82933359  ){ chid = '  2_40  '; } 
 else if( start >=  82933360  && start <=  85006693  ){ chid = '  2_41  '; } 
 else if( start >=  85006694  && start <=  87080027  ){ chid = '  2_42  '; } 
 else if( start >=  87080028  && start <=  89153361  ){ chid = '  2_43  '; } 
 else if( start >=  89153362  && start <=  91226695  ){ chid = '  2_44  '; } 
 else if( start >=  91226696  && start <=  93300029  ){ chid = '  2_45  '; } 
 else if( start >=  93300030  && start <=  95312105  ){ chid = '  2_46  '; } 
 else if( start >=  95312106  && start <=  97324181  ){ chid = '  2_47  '; } 
 else if( start >=  97324182  && start <=  99336257  ){ chid = '  2_48  '; } 
 else if( start >=  99336258  && start <=  101348333  ){ chid = '  2_49  '; } 
 else if( start >=  101348334  && start <=  103360409  ){ chid = '  2_50  '; } 
 else if( start >=  103360410  && start <=  105372485  ){ chid = '  2_51  '; } 
 else if( start >=  105372486  && start <=  107384561  ){ chid = '  2_52  '; } 
 else if( start >=  107384562  && start <=  109396637  ){ chid = '  2_53  '; } 
 else if( start >=  109396638  && start <=  111408713  ){ chid = '  2_54  '; } 
 else if( start >=  111408714  && start <=  113420789  ){ chid = '  2_55  '; } 
 else if( start >=  113420790  && start <=  115432865  ){ chid = '  2_56  '; } 
 else if( start >=  115432866  && start <=  117444941  ){ chid = '  2_57  '; } 
 else if( start >=  117444942  && start <=  119457017  ){ chid = '  2_58  '; } 
 else if( start >=  119457018  && start <=  121469093  ){ chid = '  2_59  '; } 
 else if( start >=  121469094  && start <=  123481169  ){ chid = '  2_60  '; } 
 else if( start >=  123481170  && start <=  125493245  ){ chid = '  2_61  '; } 
 else if( start >=  125493246  && start <=  127505321  ){ chid = '  2_62  '; } 
 else if( start >=  127505322  && start <=  129517397  ){ chid = '  2_63  '; } 
 else if( start >=  129517398  && start <=  131529473  ){ chid = '  2_64  '; } 
 else if( start >=  131529474  && start <=  133541549  ){ chid = '  2_65  '; } 
 else if( start >=  133541550  && start <=  135553625  ){ chid = '  2_66  '; } 
 else if( start >=  135553626  && start <=  137565701  ){ chid = '  2_67  '; } 
 else if( start >=  137565702  && start <=  139577777  ){ chid = '  2_68  '; } 
 else if( start >=  139577778  && start <=  141589853  ){ chid = '  2_69  '; } 
 else if( start >=  141589854  && start <=  143601929  ){ chid = '  2_70  '; } 
 else if( start >=  143601930  && start <=  145614005  ){ chid = '  2_71  '; } 
 else if( start >=  145614006  && start <=  147626081  ){ chid = '  2_72  '; } 
 else if( start >=  147626082  && start <=  149638157  ){ chid = '  2_73  '; } 
 else if( start >=  149638158  && start <=  151650233  ){ chid = '  2_74  '; } 
 else if( start >=  151650234  && start <=  153662309  ){ chid = '  2_75  '; } 
 else if( start >=  153662310  && start <=  155674385  ){ chid = '  2_76  '; } 
 else if( start >=  155674386  && start <=  157686461  ){ chid = '  2_77  '; } 
 else if( start >=  157686462  && start <=  159698537  ){ chid = '  2_78  '; } 
 else if( start >=  159698538  && start <=  161710613  ){ chid = '  2_79  '; } 
 else if( start >=  161710614  && start <=  163722689  ){ chid = '  2_80  '; } 
 else if( start >=  163722690  && start <=  165734765  ){ chid = '  2_81  '; } 
 else if( start >=  165734766  && start <=  167746841  ){ chid = '  2_82  '; } 
 else if( start >=  167746842  && start <=  169758917  ){ chid = '  2_83  '; } 
 else if( start >=  169758918  && start <=  171770993  ){ chid = '  2_84  '; } 
 else if( start >=  171770994  && start <=  173783069  ){ chid = '  2_85  '; } 
 else if( start >=  173783070  && start <=  175795145  ){ chid = '  2_86  '; } 
 else if( start >=  175795146  && start <=  177807221  ){ chid = '  2_87  '; } 
 else if( start >=  177807222  && start <=  179819297  ){ chid = '  2_88  '; } 
 else if( start >=  179819298  && start <=  181831373  ){ chid = '  2_89  '; } 
 else if( start >=  181831374  && start <=  183843449  ){ chid = '  2_90  '; } 
 else if( start >=  183843450  && start <=  185855525  ){ chid = '  2_91  '; } 
 else if( start >=  185855526  && start <=  187867601  ){ chid = '  2_92  '; } 
 else if( start >=  187867602  && start <=  189879677  ){ chid = '  2_93  '; } 
 else if( start >=  189879678  && start <=  191891753  ){ chid = '  2_94  '; } 
 else if( start >=  191891754  && start <=  193903829  ){ chid = '  2_95  '; } 
 else if( start >=  193903830  && start <=  195915905  ){ chid = '  2_96  '; } 
 else if( start >=  195915906  && start <=  197927981  ){ chid = '  2_97  '; } 
 else if( start >=  197927982  && start <=  199940057  ){ chid = '  2_98  '; } 
 else if( start >=  199940058  && start <=  201952133  ){ chid = '  2_99  '; } 
 else if( start >=  201952134  && start <=  203964209  ){ chid = '  2_100  '; } 
 else if( start >=  203964210  && start <=  205976285  ){ chid = '  2_101  '; } 
 else if( start >=  205976286  && start <=  207988361  ){ chid = '  2_102  '; } 
 else if( start >=  207988362  && start <=  210000437  ){ chid = '  2_103  '; } 
 else if( start >=  210000438  && start <=  212012513  ){ chid = '  2_104  '; } 
 else if( start >=  212012514  && start <=  214024589  ){ chid = '  2_105  '; } 
 else if( start >=  214024590  && start <=  216036665  ){ chid = '  2_106  '; } 
 else if( start >=  216036666  && start <=  218048741  ){ chid = '  2_107  '; } 
 else if( start >=  218048742  && start <=  220060817  ){ chid = '  2_108  '; } 
 else if( start >=  220060818  && start <=  222072893  ){ chid = '  2_109  '; } 
 else if( start >=  222072894  && start <=  224084969  ){ chid = '  2_110  '; } 
 else if( start >=  224084970  && start <=  226097045  ){ chid = '  2_111  '; } 
 else if( start >=  226097046  && start <=  228109121  ){ chid = '  2_112  '; } 
 else if( start >=  228109122  && start <=  230121197  ){ chid = '  2_113  '; } 
 else if( start >=  230121198  && start <=  232133273  ){ chid = '  2_114  '; } 
 else if( start >=  232133274  && start <=  234145349  ){ chid = '  2_115  '; } 
 else if( start >=  234145350  && start <=  236157425  ){ chid = '  2_116  '; } 
 else if( start >=  236157426  && start <=  238169501  ){ chid = '  2_117  '; } 
 else if( start >=  238169502  && start <=  240181577  ){ chid = '  2_118  '; } 
 else if( start >=  240181578  && start <=  242193529  ){ chid = '  2_119  '; } 
} else if( chr == "chr3") {
  if( start >=  1  && start <=  2394737  ){ chid = '  3_1  '; } 
 else if( start >=  2394738  && start <=  4789475  ){ chid = '  3_2  '; } 
 else if( start >=  4789476  && start <=  7184213  ){ chid = '  3_3  '; } 
 else if( start >=  7184214  && start <=  9578951  ){ chid = '  3_4  '; } 
 else if( start >=  9578952  && start <=  11973689  ){ chid = '  3_5  '; } 
 else if( start >=  11973690  && start <=  14368427  ){ chid = '  3_6  '; } 
 else if( start >=  14368428  && start <=  16763165  ){ chid = '  3_7  '; } 
 else if( start >=  16763166  && start <=  19157903  ){ chid = '  3_8  '; } 
 else if( start >=  19157904  && start <=  21552641  ){ chid = '  3_9  '; } 
 else if( start >=  21552642  && start <=  23947379  ){ chid = '  3_10  '; } 
 else if( start >=  23947380  && start <=  26342117  ){ chid = '  3_11  '; } 
 else if( start >=  26342118  && start <=  28736855  ){ chid = '  3_12  '; } 
 else if( start >=  28736856  && start <=  31131593  ){ chid = '  3_13  '; } 
 else if( start >=  31131594  && start <=  33526331  ){ chid = '  3_14  '; } 
 else if( start >=  33526332  && start <=  35921069  ){ chid = '  3_15  '; } 
 else if( start >=  35921070  && start <=  38315807  ){ chid = '  3_16  '; } 
 else if( start >=  38315808  && start <=  40710545  ){ chid = '  3_17  '; } 
 else if( start >=  40710546  && start <=  43105283  ){ chid = '  3_18  '; } 
 else if( start >=  43105284  && start <=  45500021  ){ chid = '  3_19  '; } 
 else if( start >=  45500022  && start <=  47894759  ){ chid = '  3_20  '; } 
 else if( start >=  47894760  && start <=  50289497  ){ chid = '  3_21  '; } 
 else if( start >=  50289498  && start <=  52684235  ){ chid = '  3_22  '; } 
 else if( start >=  52684236  && start <=  55078973  ){ chid = '  3_23  '; } 
 else if( start >=  55078974  && start <=  57473711  ){ chid = '  3_24  '; } 
 else if( start >=  57473712  && start <=  59868449  ){ chid = '  3_25  '; } 
 else if( start >=  59868450  && start <=  62263187  ){ chid = '  3_26  '; } 
 else if( start >=  62263188  && start <=  64657925  ){ chid = '  3_27  '; } 
 else if( start >=  64657926  && start <=  67052663  ){ chid = '  3_28  '; } 
 else if( start >=  67052664  && start <=  69447401  ){ chid = '  3_29  '; } 
 else if( start >=  69447402  && start <=  71842139  ){ chid = '  3_30  '; } 
 else if( start >=  71842140  && start <=  74236877  ){ chid = '  3_31  '; } 
 else if( start >=  74236878  && start <=  76631615  ){ chid = '  3_32  '; } 
 else if( start >=  76631616  && start <=  79026353  ){ chid = '  3_33  '; } 
 else if( start >=  79026354  && start <=  81421091  ){ chid = '  3_34  '; } 
 else if( start >=  81421092  && start <=  83815829  ){ chid = '  3_35  '; } 
 else if( start >=  83815830  && start <=  86210567  ){ chid = '  3_36  '; } 
 else if( start >=  86210568  && start <=  88605305  ){ chid = '  3_37  '; } 
 else if( start >=  88605306  && start <=  91000043  ){ chid = '  3_38  '; } 
 else if( start >=  91000044  && start <=  92986999  ){ chid = '  3_39  '; } 
 else if( start >=  92987000  && start <=  94973955  ){ chid = '  3_40  '; } 
 else if( start >=  94973956  && start <=  96960911  ){ chid = '  3_41  '; } 
 else if( start >=  96960912  && start <=  98947867  ){ chid = '  3_42  '; } 
 else if( start >=  98947868  && start <=  100934823  ){ chid = '  3_43  '; } 
 else if( start >=  100934824  && start <=  102921779  ){ chid = '  3_44  '; } 
 else if( start >=  102921780  && start <=  104908735  ){ chid = '  3_45  '; } 
 else if( start >=  104908736  && start <=  106895691  ){ chid = '  3_46  '; } 
 else if( start >=  106895692  && start <=  108882647  ){ chid = '  3_47  '; } 
 else if( start >=  108882648  && start <=  110869603  ){ chid = '  3_48  '; } 
 else if( start >=  110869604  && start <=  112856559  ){ chid = '  3_49  '; } 
 else if( start >=  112856560  && start <=  114843515  ){ chid = '  3_50  '; } 
 else if( start >=  114843516  && start <=  116830471  ){ chid = '  3_51  '; } 
 else if( start >=  116830472  && start <=  118817427  ){ chid = '  3_52  '; } 
 else if( start >=  118817428  && start <=  120804383  ){ chid = '  3_53  '; } 
 else if( start >=  120804384  && start <=  122791339  ){ chid = '  3_54  '; } 
 else if( start >=  122791340  && start <=  124778295  ){ chid = '  3_55  '; } 
 else if( start >=  124778296  && start <=  126765251  ){ chid = '  3_56  '; } 
 else if( start >=  126765252  && start <=  128752207  ){ chid = '  3_57  '; } 
 else if( start >=  128752208  && start <=  130739163  ){ chid = '  3_58  '; } 
 else if( start >=  130739164  && start <=  132726119  ){ chid = '  3_59  '; } 
 else if( start >=  132726120  && start <=  134713075  ){ chid = '  3_60  '; } 
 else if( start >=  134713076  && start <=  136700031  ){ chid = '  3_61  '; } 
 else if( start >=  136700032  && start <=  138686987  ){ chid = '  3_62  '; } 
 else if( start >=  138686988  && start <=  140673943  ){ chid = '  3_63  '; } 
 else if( start >=  140673944  && start <=  142660899  ){ chid = '  3_64  '; } 
 else if( start >=  142660900  && start <=  144647855  ){ chid = '  3_65  '; } 
 else if( start >=  144647856  && start <=  146634811  ){ chid = '  3_66  '; } 
 else if( start >=  146634812  && start <=  148621767  ){ chid = '  3_67  '; } 
 else if( start >=  148621768  && start <=  150608723  ){ chid = '  3_68  '; } 
 else if( start >=  150608724  && start <=  152595679  ){ chid = '  3_69  '; } 
 else if( start >=  152595680  && start <=  154582635  ){ chid = '  3_70  '; } 
 else if( start >=  154582636  && start <=  156569591  ){ chid = '  3_71  '; } 
 else if( start >=  156569592  && start <=  158556547  ){ chid = '  3_72  '; } 
 else if( start >=  158556548  && start <=  160543503  ){ chid = '  3_73  '; } 
 else if( start >=  160543504  && start <=  162530459  ){ chid = '  3_74  '; } 
 else if( start >=  162530460  && start <=  164517415  ){ chid = '  3_75  '; } 
 else if( start >=  164517416  && start <=  166504371  ){ chid = '  3_76  '; } 
 else if( start >=  166504372  && start <=  168491327  ){ chid = '  3_77  '; } 
 else if( start >=  168491328  && start <=  170478283  ){ chid = '  3_78  '; } 
 else if( start >=  170478284  && start <=  172465239  ){ chid = '  3_79  '; } 
 else if( start >=  172465240  && start <=  174452195  ){ chid = '  3_80  '; } 
 else if( start >=  174452196  && start <=  176439151  ){ chid = '  3_81  '; } 
 else if( start >=  176439152  && start <=  178426107  ){ chid = '  3_82  '; } 
 else if( start >=  178426108  && start <=  180413063  ){ chid = '  3_83  '; } 
 else if( start >=  180413064  && start <=  182400019  ){ chid = '  3_84  '; } 
 else if( start >=  182400020  && start <=  184386975  ){ chid = '  3_85  '; } 
 else if( start >=  184386976  && start <=  186373931  ){ chid = '  3_86  '; } 
 else if( start >=  186373932  && start <=  188360887  ){ chid = '  3_87  '; } 
 else if( start >=  188360888  && start <=  190347843  ){ chid = '  3_88  '; } 
 else if( start >=  190347844  && start <=  192334799  ){ chid = '  3_89  '; } 
 else if( start >=  192334800  && start <=  194321755  ){ chid = '  3_90  '; } 
 else if( start >=  194321756  && start <=  196308711  ){ chid = '  3_91  '; } 
 else if( start >=  196308712  && start <=  198295559  ){ chid = '  3_92  '; } 
} else if( chr == "chr4") {
  if( start >=  1  && start <=  2100000  ){ chid = '  4_1  '; } 
 else if( start >=  2100001  && start <=  4200001  ){ chid = '  4_2  '; } 
 else if( start >=  4200002  && start <=  6300002  ){ chid = '  4_3  '; } 
 else if( start >=  6300003  && start <=  8400003  ){ chid = '  4_4  '; } 
 else if( start >=  8400004  && start <=  10500004  ){ chid = '  4_5  '; } 
 else if( start >=  10500005  && start <=  12600005  ){ chid = '  4_6  '; } 
 else if( start >=  12600006  && start <=  14700006  ){ chid = '  4_7  '; } 
 else if( start >=  14700007  && start <=  16800007  ){ chid = '  4_8  '; } 
 else if( start >=  16800008  && start <=  18900008  ){ chid = '  4_9  '; } 
 else if( start >=  18900009  && start <=  21000009  ){ chid = '  4_10  '; } 
 else if( start >=  21000010  && start <=  23100010  ){ chid = '  4_11  '; } 
 else if( start >=  23100011  && start <=  25200011  ){ chid = '  4_12  '; } 
 else if( start >=  25200012  && start <=  27300012  ){ chid = '  4_13  '; } 
 else if( start >=  27300013  && start <=  29400013  ){ chid = '  4_14  '; } 
 else if( start >=  29400014  && start <=  31500014  ){ chid = '  4_15  '; } 
 else if( start >=  31500015  && start <=  33600015  ){ chid = '  4_16  '; } 
 else if( start >=  33600016  && start <=  35700016  ){ chid = '  4_17  '; } 
 else if( start >=  35700017  && start <=  37800017  ){ chid = '  4_18  '; } 
 else if( start >=  37800018  && start <=  39900018  ){ chid = '  4_19  '; } 
 else if( start >=  39900019  && start <=  42000019  ){ chid = '  4_20  '; } 
 else if( start >=  42000020  && start <=  44100020  ){ chid = '  4_21  '; } 
 else if( start >=  44100021  && start <=  46200021  ){ chid = '  4_22  '; } 
 else if( start >=  46200022  && start <=  48300022  ){ chid = '  4_23  '; } 
 else if( start >=  48300023  && start <=  50400023  ){ chid = '  4_24  '; } 
 else if( start >=  50400024  && start <=  52397375  ){ chid = '  4_25  '; } 
 else if( start >=  52397376  && start <=  54394727  ){ chid = '  4_26  '; } 
 else if( start >=  54394728  && start <=  56392079  ){ chid = '  4_27  '; } 
 else if( start >=  56392080  && start <=  58389431  ){ chid = '  4_28  '; } 
 else if( start >=  58389432  && start <=  60386783  ){ chid = '  4_29  '; } 
 else if( start >=  60386784  && start <=  62384135  ){ chid = '  4_30  '; } 
 else if( start >=  62384136  && start <=  64381487  ){ chid = '  4_31  '; } 
 else if( start >=  64381488  && start <=  66378839  ){ chid = '  4_32  '; } 
 else if( start >=  66378840  && start <=  68376191  ){ chid = '  4_33  '; } 
 else if( start >=  68376192  && start <=  70373543  ){ chid = '  4_34  '; } 
 else if( start >=  70373544  && start <=  72370895  ){ chid = '  4_35  '; } 
 else if( start >=  72370896  && start <=  74368247  ){ chid = '  4_36  '; } 
 else if( start >=  74368248  && start <=  76365599  ){ chid = '  4_37  '; } 
 else if( start >=  76365600  && start <=  78362951  ){ chid = '  4_38  '; } 
 else if( start >=  78362952  && start <=  80360303  ){ chid = '  4_39  '; } 
 else if( start >=  80360304  && start <=  82357655  ){ chid = '  4_40  '; } 
 else if( start >=  82357656  && start <=  84355007  ){ chid = '  4_41  '; } 
 else if( start >=  84355008  && start <=  86352359  ){ chid = '  4_42  '; } 
 else if( start >=  86352360  && start <=  88349711  ){ chid = '  4_43  '; } 
 else if( start >=  88349712  && start <=  90347063  ){ chid = '  4_44  '; } 
 else if( start >=  90347064  && start <=  92344415  ){ chid = '  4_45  '; } 
 else if( start >=  92344416  && start <=  94341767  ){ chid = '  4_46  '; } 
 else if( start >=  94341768  && start <=  96339119  ){ chid = '  4_47  '; } 
 else if( start >=  96339120  && start <=  98336471  ){ chid = '  4_48  '; } 
 else if( start >=  98336472  && start <=  100333823  ){ chid = '  4_49  '; } 
 else if( start >=  100333824  && start <=  102331175  ){ chid = '  4_50  '; } 
 else if( start >=  102331176  && start <=  104328527  ){ chid = '  4_51  '; } 
 else if( start >=  104328528  && start <=  106325879  ){ chid = '  4_52  '; } 
 else if( start >=  106325880  && start <=  108323231  ){ chid = '  4_53  '; } 
 else if( start >=  108323232  && start <=  110320583  ){ chid = '  4_54  '; } 
 else if( start >=  110320584  && start <=  112317935  ){ chid = '  4_55  '; } 
 else if( start >=  112317936  && start <=  114315287  ){ chid = '  4_56  '; } 
 else if( start >=  114315288  && start <=  116312639  ){ chid = '  4_57  '; } 
 else if( start >=  116312640  && start <=  118309991  ){ chid = '  4_58  '; } 
 else if( start >=  118309992  && start <=  120307343  ){ chid = '  4_59  '; } 
 else if( start >=  120307344  && start <=  122304695  ){ chid = '  4_60  '; } 
 else if( start >=  122304696  && start <=  124302047  ){ chid = '  4_61  '; } 
 else if( start >=  124302048  && start <=  126299399  ){ chid = '  4_62  '; } 
 else if( start >=  126299400  && start <=  128296751  ){ chid = '  4_63  '; } 
 else if( start >=  128296752  && start <=  130294103  ){ chid = '  4_64  '; } 
 else if( start >=  130294104  && start <=  132291455  ){ chid = '  4_65  '; } 
 else if( start >=  132291456  && start <=  134288807  ){ chid = '  4_66  '; } 
 else if( start >=  134288808  && start <=  136286159  ){ chid = '  4_67  '; } 
 else if( start >=  136286160  && start <=  138283511  ){ chid = '  4_68  '; } 
 else if( start >=  138283512  && start <=  140280863  ){ chid = '  4_69  '; } 
 else if( start >=  140280864  && start <=  142278215  ){ chid = '  4_70  '; } 
 else if( start >=  142278216  && start <=  144275567  ){ chid = '  4_71  '; } 
 else if( start >=  144275568  && start <=  146272919  ){ chid = '  4_72  '; } 
 else if( start >=  146272920  && start <=  148270271  ){ chid = '  4_73  '; } 
 else if( start >=  148270272  && start <=  150267623  ){ chid = '  4_74  '; } 
 else if( start >=  150267624  && start <=  152264975  ){ chid = '  4_75  '; } 
 else if( start >=  152264976  && start <=  154262327  ){ chid = '  4_76  '; } 
 else if( start >=  154262328  && start <=  156259679  ){ chid = '  4_77  '; } 
 else if( start >=  156259680  && start <=  158257031  ){ chid = '  4_78  '; } 
 else if( start >=  158257032  && start <=  160254383  ){ chid = '  4_79  '; } 
 else if( start >=  160254384  && start <=  162251735  ){ chid = '  4_80  '; } 
 else if( start >=  162251736  && start <=  164249087  ){ chid = '  4_81  '; } 
 else if( start >=  164249088  && start <=  166246439  ){ chid = '  4_82  '; } 
 else if( start >=  166246440  && start <=  168243791  ){ chid = '  4_83  '; } 
 else if( start >=  168243792  && start <=  170241143  ){ chid = '  4_84  '; } 
 else if( start >=  170241144  && start <=  172238495  ){ chid = '  4_85  '; } 
 else if( start >=  172238496  && start <=  174235847  ){ chid = '  4_86  '; } 
 else if( start >=  174235848  && start <=  176233199  ){ chid = '  4_87  '; } 
 else if( start >=  176233200  && start <=  178230551  ){ chid = '  4_88  '; } 
 else if( start >=  178230552  && start <=  180227903  ){ chid = '  4_89  '; } 
 else if( start >=  180227904  && start <=  182225255  ){ chid = '  4_90  '; } 
 else if( start >=  182225256  && start <=  184222607  ){ chid = '  4_91  '; } 
 else if( start >=  184222608  && start <=  186219959  ){ chid = '  4_92  '; } 
 else if( start >=  186219960  && start <=  188217311  ){ chid = '  4_93  '; } 
 else if( start >=  188217312  && start <=  190214555  ){ chid = '  4_94  '; } 
} else if( chr == "chr5") {
  if( start >=  1  && start <=  2104348  ){ chid = '  5_1  '; } 
 else if( start >=  2104349  && start <=  4208697  ){ chid = '  5_2  '; } 
 else if( start >=  4208698  && start <=  6313046  ){ chid = '  5_3  '; } 
 else if( start >=  6313047  && start <=  8417395  ){ chid = '  5_4  '; } 
 else if( start >=  8417396  && start <=  10521744  ){ chid = '  5_5  '; } 
 else if( start >=  10521745  && start <=  12626093  ){ chid = '  5_6  '; } 
 else if( start >=  12626094  && start <=  14730442  ){ chid = '  5_7  '; } 
 else if( start >=  14730443  && start <=  16834791  ){ chid = '  5_8  '; } 
 else if( start >=  16834792  && start <=  18939140  ){ chid = '  5_9  '; } 
 else if( start >=  18939141  && start <=  21043489  ){ chid = '  5_10  '; } 
 else if( start >=  21043490  && start <=  23147838  ){ chid = '  5_11  '; } 
 else if( start >=  23147839  && start <=  25252187  ){ chid = '  5_12  '; } 
 else if( start >=  25252188  && start <=  27356536  ){ chid = '  5_13  '; } 
 else if( start >=  27356537  && start <=  29460885  ){ chid = '  5_14  '; } 
 else if( start >=  29460886  && start <=  31565234  ){ chid = '  5_15  '; } 
 else if( start >=  31565235  && start <=  33669583  ){ chid = '  5_16  '; } 
 else if( start >=  33669584  && start <=  35773932  ){ chid = '  5_17  '; } 
 else if( start >=  35773933  && start <=  37878281  ){ chid = '  5_18  '; } 
 else if( start >=  37878282  && start <=  39982630  ){ chid = '  5_19  '; } 
 else if( start >=  39982631  && start <=  42086979  ){ chid = '  5_20  '; } 
 else if( start >=  42086980  && start <=  44191328  ){ chid = '  5_21  '; } 
 else if( start >=  44191329  && start <=  46295677  ){ chid = '  5_22  '; } 
 else if( start >=  46295678  && start <=  48400026  ){ chid = '  5_23  '; } 
 else if( start >=  48400027  && start <=  50387165  ){ chid = '  5_24  '; } 
 else if( start >=  50387166  && start <=  52374304  ){ chid = '  5_25  '; } 
 else if( start >=  52374305  && start <=  54361443  ){ chid = '  5_26  '; } 
 else if( start >=  54361444  && start <=  56348582  ){ chid = '  5_27  '; } 
 else if( start >=  56348583  && start <=  58335721  ){ chid = '  5_28  '; } 
 else if( start >=  58335722  && start <=  60322860  ){ chid = '  5_29  '; } 
 else if( start >=  60322861  && start <=  62309999  ){ chid = '  5_30  '; } 
 else if( start >=  62310000  && start <=  64297138  ){ chid = '  5_31  '; } 
 else if( start >=  64297139  && start <=  66284277  ){ chid = '  5_32  '; } 
 else if( start >=  66284278  && start <=  68271416  ){ chid = '  5_33  '; } 
 else if( start >=  68271417  && start <=  70258555  ){ chid = '  5_34  '; } 
 else if( start >=  70258556  && start <=  72245694  ){ chid = '  5_35  '; } 
 else if( start >=  72245695  && start <=  74232833  ){ chid = '  5_36  '; } 
 else if( start >=  74232834  && start <=  76219972  ){ chid = '  5_37  '; } 
 else if( start >=  76219973  && start <=  78207111  ){ chid = '  5_38  '; } 
 else if( start >=  78207112  && start <=  80194250  ){ chid = '  5_39  '; } 
 else if( start >=  80194251  && start <=  82181389  ){ chid = '  5_40  '; } 
 else if( start >=  82181390  && start <=  84168528  ){ chid = '  5_41  '; } 
 else if( start >=  84168529  && start <=  86155667  ){ chid = '  5_42  '; } 
 else if( start >=  86155668  && start <=  88142806  ){ chid = '  5_43  '; } 
 else if( start >=  88142807  && start <=  90129945  ){ chid = '  5_44  '; } 
 else if( start >=  90129946  && start <=  92117084  ){ chid = '  5_45  '; } 
 else if( start >=  92117085  && start <=  94104223  ){ chid = '  5_46  '; } 
 else if( start >=  94104224  && start <=  96091362  ){ chid = '  5_47  '; } 
 else if( start >=  96091363  && start <=  98078501  ){ chid = '  5_48  '; } 
 else if( start >=  98078502  && start <=  100065640  ){ chid = '  5_49  '; } 
 else if( start >=  100065641  && start <=  102052779  ){ chid = '  5_50  '; } 
 else if( start >=  102052780  && start <=  104039918  ){ chid = '  5_51  '; } 
 else if( start >=  104039919  && start <=  106027057  ){ chid = '  5_52  '; } 
 else if( start >=  106027058  && start <=  108014196  ){ chid = '  5_53  '; } 
 else if( start >=  108014197  && start <=  110001335  ){ chid = '  5_54  '; } 
 else if( start >=  110001336  && start <=  111988474  ){ chid = '  5_55  '; } 
 else if( start >=  111988475  && start <=  113975613  ){ chid = '  5_56  '; } 
 else if( start >=  113975614  && start <=  115962752  ){ chid = '  5_57  '; } 
 else if( start >=  115962753  && start <=  117949891  ){ chid = '  5_58  '; } 
 else if( start >=  117949892  && start <=  119937030  ){ chid = '  5_59  '; } 
 else if( start >=  119937031  && start <=  121924169  ){ chid = '  5_60  '; } 
 else if( start >=  121924170  && start <=  123911308  ){ chid = '  5_61  '; } 
 else if( start >=  123911309  && start <=  125898447  ){ chid = '  5_62  '; } 
 else if( start >=  125898448  && start <=  127885586  ){ chid = '  5_63  '; } 
 else if( start >=  127885587  && start <=  129872725  ){ chid = '  5_64  '; } 
 else if( start >=  129872726  && start <=  131859864  ){ chid = '  5_65  '; } 
 else if( start >=  131859865  && start <=  133847003  ){ chid = '  5_66  '; } 
 else if( start >=  133847004  && start <=  135834142  ){ chid = '  5_67  '; } 
 else if( start >=  135834143  && start <=  137821281  ){ chid = '  5_68  '; } 
 else if( start >=  137821282  && start <=  139808420  ){ chid = '  5_69  '; } 
 else if( start >=  139808421  && start <=  141795559  ){ chid = '  5_70  '; } 
 else if( start >=  141795560  && start <=  143782698  ){ chid = '  5_71  '; } 
 else if( start >=  143782699  && start <=  145769837  ){ chid = '  5_72  '; } 
 else if( start >=  145769838  && start <=  147756976  ){ chid = '  5_73  '; } 
 else if( start >=  147756977  && start <=  149744115  ){ chid = '  5_74  '; } 
 else if( start >=  149744116  && start <=  151731254  ){ chid = '  5_75  '; } 
 else if( start >=  151731255  && start <=  153718393  ){ chid = '  5_76  '; } 
 else if( start >=  153718394  && start <=  155705532  ){ chid = '  5_77  '; } 
 else if( start >=  155705533  && start <=  157692671  ){ chid = '  5_78  '; } 
 else if( start >=  157692672  && start <=  159679810  ){ chid = '  5_79  '; } 
 else if( start >=  159679811  && start <=  161666949  ){ chid = '  5_80  '; } 
 else if( start >=  161666950  && start <=  163654088  ){ chid = '  5_81  '; } 
 else if( start >=  163654089  && start <=  165641227  ){ chid = '  5_82  '; } 
 else if( start >=  165641228  && start <=  167628366  ){ chid = '  5_83  '; } 
 else if( start >=  167628367  && start <=  169615505  ){ chid = '  5_84  '; } 
 else if( start >=  169615506  && start <=  171602644  ){ chid = '  5_85  '; } 
 else if( start >=  171602645  && start <=  173589783  ){ chid = '  5_86  '; } 
 else if( start >=  173589784  && start <=  175576922  ){ chid = '  5_87  '; } 
 else if( start >=  175576923  && start <=  177564061  ){ chid = '  5_88  '; } 
 else if( start >=  177564062  && start <=  179551200  ){ chid = '  5_89  '; } 
 else if( start >=  179551201  && start <=  181538259  ){ chid = '  5_90  '; } 
} else if( chr == "chr6") {
  if( start >=  1  && start <=  2103448  ){ chid = '  6_1  '; } 
 else if( start >=  2103449  && start <=  4206897  ){ chid = '  6_2  '; } 
 else if( start >=  4206898  && start <=  6310346  ){ chid = '  6_3  '; } 
 else if( start >=  6310347  && start <=  8413795  ){ chid = '  6_4  '; } 
 else if( start >=  8413796  && start <=  10517244  ){ chid = '  6_5  '; } 
 else if( start >=  10517245  && start <=  12620693  ){ chid = '  6_6  '; } 
 else if( start >=  12620694  && start <=  14724142  ){ chid = '  6_7  '; } 
 else if( start >=  14724143  && start <=  16827591  ){ chid = '  6_8  '; } 
 else if( start >=  16827592  && start <=  18931040  ){ chid = '  6_9  '; } 
 else if( start >=  18931041  && start <=  21034489  ){ chid = '  6_10  '; } 
 else if( start >=  21034490  && start <=  23137938  ){ chid = '  6_11  '; } 
 else if( start >=  23137939  && start <=  25241387  ){ chid = '  6_12  '; } 
 else if( start >=  25241388  && start <=  27344836  ){ chid = '  6_13  '; } 
 else if( start >=  27344837  && start <=  29448285  ){ chid = '  6_14  '; } 
 else if( start >=  29448286  && start <=  31551734  ){ chid = '  6_15  '; } 
 else if( start >=  31551735  && start <=  33655183  ){ chid = '  6_16  '; } 
 else if( start >=  33655184  && start <=  35758632  ){ chid = '  6_17  '; } 
 else if( start >=  35758633  && start <=  37862081  ){ chid = '  6_18  '; } 
 else if( start >=  37862082  && start <=  39965530  ){ chid = '  6_19  '; } 
 else if( start >=  39965531  && start <=  42068979  ){ chid = '  6_20  '; } 
 else if( start >=  42068980  && start <=  44172428  ){ chid = '  6_21  '; } 
 else if( start >=  44172429  && start <=  46275877  ){ chid = '  6_22  '; } 
 else if( start >=  46275878  && start <=  48379326  ){ chid = '  6_23  '; } 
 else if( start >=  48379327  && start <=  50482775  ){ chid = '  6_24  '; } 
 else if( start >=  50482776  && start <=  52586224  ){ chid = '  6_25  '; } 
 else if( start >=  52586225  && start <=  54689673  ){ chid = '  6_26  '; } 
 else if( start >=  54689674  && start <=  56793122  ){ chid = '  6_27  '; } 
 else if( start >=  56793123  && start <=  58896571  ){ chid = '  6_28  '; } 
 else if( start >=  58896572  && start <=  61000020  ){ chid = '  6_29  '; } 
 else if( start >=  61000021  && start <=  62996493  ){ chid = '  6_30  '; } 
 else if( start >=  62996494  && start <=  64992966  ){ chid = '  6_31  '; } 
 else if( start >=  64992967  && start <=  66989439  ){ chid = '  6_32  '; } 
 else if( start >=  66989440  && start <=  68985912  ){ chid = '  6_33  '; } 
 else if( start >=  68985913  && start <=  70982385  ){ chid = '  6_34  '; } 
 else if( start >=  70982386  && start <=  72978858  ){ chid = '  6_35  '; } 
 else if( start >=  72978859  && start <=  74975331  ){ chid = '  6_36  '; } 
 else if( start >=  74975332  && start <=  76971804  ){ chid = '  6_37  '; } 
 else if( start >=  76971805  && start <=  78968277  ){ chid = '  6_38  '; } 
 else if( start >=  78968278  && start <=  80964750  ){ chid = '  6_39  '; } 
 else if( start >=  80964751  && start <=  82961223  ){ chid = '  6_40  '; } 
 else if( start >=  82961224  && start <=  84957696  ){ chid = '  6_41  '; } 
 else if( start >=  84957697  && start <=  86954169  ){ chid = '  6_42  '; } 
 else if( start >=  86954170  && start <=  88950642  ){ chid = '  6_43  '; } 
 else if( start >=  88950643  && start <=  90947115  ){ chid = '  6_44  '; } 
 else if( start >=  90947116  && start <=  92943588  ){ chid = '  6_45  '; } 
 else if( start >=  92943589  && start <=  94940061  ){ chid = '  6_46  '; } 
 else if( start >=  94940062  && start <=  96936534  ){ chid = '  6_47  '; } 
 else if( start >=  96936535  && start <=  98933007  ){ chid = '  6_48  '; } 
 else if( start >=  98933008  && start <=  100929480  ){ chid = '  6_49  '; } 
 else if( start >=  100929481  && start <=  102925953  ){ chid = '  6_50  '; } 
 else if( start >=  102925954  && start <=  104922426  ){ chid = '  6_51  '; } 
 else if( start >=  104922427  && start <=  106918899  ){ chid = '  6_52  '; } 
 else if( start >=  106918900  && start <=  108915372  ){ chid = '  6_53  '; } 
 else if( start >=  108915373  && start <=  110911845  ){ chid = '  6_54  '; } 
 else if( start >=  110911846  && start <=  112908318  ){ chid = '  6_55  '; } 
 else if( start >=  112908319  && start <=  114904791  ){ chid = '  6_56  '; } 
 else if( start >=  114904792  && start <=  116901264  ){ chid = '  6_57  '; } 
 else if( start >=  116901265  && start <=  118897737  ){ chid = '  6_58  '; } 
 else if( start >=  118897738  && start <=  120894210  ){ chid = '  6_59  '; } 
 else if( start >=  120894211  && start <=  122890683  ){ chid = '  6_60  '; } 
 else if( start >=  122890684  && start <=  124887156  ){ chid = '  6_61  '; } 
 else if( start >=  124887157  && start <=  126883629  ){ chid = '  6_62  '; } 
 else if( start >=  126883630  && start <=  128880102  ){ chid = '  6_63  '; } 
 else if( start >=  128880103  && start <=  130876575  ){ chid = '  6_64  '; } 
 else if( start >=  130876576  && start <=  132873048  ){ chid = '  6_65  '; } 
 else if( start >=  132873049  && start <=  134869521  ){ chid = '  6_66  '; } 
 else if( start >=  134869522  && start <=  136865994  ){ chid = '  6_67  '; } 
 else if( start >=  136865995  && start <=  138862467  ){ chid = '  6_68  '; } 
 else if( start >=  138862468  && start <=  140858940  ){ chid = '  6_69  '; } 
 else if( start >=  140858941  && start <=  142855413  ){ chid = '  6_70  '; } 
 else if( start >=  142855414  && start <=  144851886  ){ chid = '  6_71  '; } 
 else if( start >=  144851887  && start <=  146848359  ){ chid = '  6_72  '; } 
 else if( start >=  146848360  && start <=  148844832  ){ chid = '  6_73  '; } 
 else if( start >=  148844833  && start <=  150841305  ){ chid = '  6_74  '; } 
 else if( start >=  150841306  && start <=  152837778  ){ chid = '  6_75  '; } 
 else if( start >=  152837779  && start <=  154834251  ){ chid = '  6_76  '; } 
 else if( start >=  154834252  && start <=  156830724  ){ chid = '  6_77  '; } 
 else if( start >=  156830725  && start <=  158827197  ){ chid = '  6_78  '; } 
 else if( start >=  158827198  && start <=  160823670  ){ chid = '  6_79  '; } 
 else if( start >=  160823671  && start <=  162820143  ){ chid = '  6_80  '; } 
 else if( start >=  162820144  && start <=  164816616  ){ chid = '  6_81  '; } 
 else if( start >=  164816617  && start <=  166813089  ){ chid = '  6_82  '; } 
 else if( start >=  166813090  && start <=  168809562  ){ chid = '  6_83  '; } 
 else if( start >=  168809563  && start <=  170805979  ){ chid = '  6_84  '; } 
} else if( chr == "chr7") {
  if( start >=  1  && start <=  2065517  ){ chid = '  7_1  '; } 
 else if( start >=  2065518  && start <=  4131035  ){ chid = '  7_2  '; } 
 else if( start >=  4131036  && start <=  6196553  ){ chid = '  7_3  '; } 
 else if( start >=  6196554  && start <=  8262071  ){ chid = '  7_4  '; } 
 else if( start >=  8262072  && start <=  10327589  ){ chid = '  7_5  '; } 
 else if( start >=  10327590  && start <=  12393107  ){ chid = '  7_6  '; } 
 else if( start >=  12393108  && start <=  14458625  ){ chid = '  7_7  '; } 
 else if( start >=  14458626  && start <=  16524143  ){ chid = '  7_8  '; } 
 else if( start >=  16524144  && start <=  18589661  ){ chid = '  7_9  '; } 
 else if( start >=  18589662  && start <=  20655179  ){ chid = '  7_10  '; } 
 else if( start >=  20655180  && start <=  22720697  ){ chid = '  7_11  '; } 
 else if( start >=  22720698  && start <=  24786215  ){ chid = '  7_12  '; } 
 else if( start >=  24786216  && start <=  26851733  ){ chid = '  7_13  '; } 
 else if( start >=  26851734  && start <=  28917251  ){ chid = '  7_14  '; } 
 else if( start >=  28917252  && start <=  30982769  ){ chid = '  7_15  '; } 
 else if( start >=  30982770  && start <=  33048287  ){ chid = '  7_16  '; } 
 else if( start >=  33048288  && start <=  35113805  ){ chid = '  7_17  '; } 
 else if( start >=  35113806  && start <=  37179323  ){ chid = '  7_18  '; } 
 else if( start >=  37179324  && start <=  39244841  ){ chid = '  7_19  '; } 
 else if( start >=  39244842  && start <=  41310359  ){ chid = '  7_20  '; } 
 else if( start >=  41310360  && start <=  43375877  ){ chid = '  7_21  '; } 
 else if( start >=  43375878  && start <=  45441395  ){ chid = '  7_22  '; } 
 else if( start >=  45441396  && start <=  47506913  ){ chid = '  7_23  '; } 
 else if( start >=  47506914  && start <=  49572431  ){ chid = '  7_24  '; } 
 else if( start >=  49572432  && start <=  51637949  ){ chid = '  7_25  '; } 
 else if( start >=  51637950  && start <=  53703467  ){ chid = '  7_26  '; } 
 else if( start >=  53703468  && start <=  55768985  ){ chid = '  7_27  '; } 
 else if( start >=  55768986  && start <=  57834503  ){ chid = '  7_28  '; } 
 else if( start >=  57834504  && start <=  59900021  ){ chid = '  7_29  '; } 
 else if( start >=  59900022  && start <=  61888941  ){ chid = '  7_30  '; } 
 else if( start >=  61888942  && start <=  63877861  ){ chid = '  7_31  '; } 
 else if( start >=  63877862  && start <=  65866781  ){ chid = '  7_32  '; } 
 else if( start >=  65866782  && start <=  67855701  ){ chid = '  7_33  '; } 
 else if( start >=  67855702  && start <=  69844621  ){ chid = '  7_34  '; } 
 else if( start >=  69844622  && start <=  71833541  ){ chid = '  7_35  '; } 
 else if( start >=  71833542  && start <=  73822461  ){ chid = '  7_36  '; } 
 else if( start >=  73822462  && start <=  75811381  ){ chid = '  7_37  '; } 
 else if( start >=  75811382  && start <=  77800301  ){ chid = '  7_38  '; } 
 else if( start >=  77800302  && start <=  79789221  ){ chid = '  7_39  '; } 
 else if( start >=  79789222  && start <=  81778141  ){ chid = '  7_40  '; } 
 else if( start >=  81778142  && start <=  83767061  ){ chid = '  7_41  '; } 
 else if( start >=  83767062  && start <=  85755981  ){ chid = '  7_42  '; } 
 else if( start >=  85755982  && start <=  87744901  ){ chid = '  7_43  '; } 
 else if( start >=  87744902  && start <=  89733821  ){ chid = '  7_44  '; } 
 else if( start >=  89733822  && start <=  91722741  ){ chid = '  7_45  '; } 
 else if( start >=  91722742  && start <=  93711661  ){ chid = '  7_46  '; } 
 else if( start >=  93711662  && start <=  95700581  ){ chid = '  7_47  '; } 
 else if( start >=  95700582  && start <=  97689501  ){ chid = '  7_48  '; } 
 else if( start >=  97689502  && start <=  99678421  ){ chid = '  7_49  '; } 
 else if( start >=  99678422  && start <=  101667341  ){ chid = '  7_50  '; } 
 else if( start >=  101667342  && start <=  103656261  ){ chid = '  7_51  '; } 
 else if( start >=  103656262  && start <=  105645181  ){ chid = '  7_52  '; } 
 else if( start >=  105645182  && start <=  107634101  ){ chid = '  7_53  '; } 
 else if( start >=  107634102  && start <=  109623021  ){ chid = '  7_54  '; } 
 else if( start >=  109623022  && start <=  111611941  ){ chid = '  7_55  '; } 
 else if( start >=  111611942  && start <=  113600861  ){ chid = '  7_56  '; } 
 else if( start >=  113600862  && start <=  115589781  ){ chid = '  7_57  '; } 
 else if( start >=  115589782  && start <=  117578701  ){ chid = '  7_58  '; } 
 else if( start >=  117578702  && start <=  119567621  ){ chid = '  7_59  '; } 
 else if( start >=  119567622  && start <=  121556541  ){ chid = '  7_60  '; } 
 else if( start >=  121556542  && start <=  123545461  ){ chid = '  7_61  '; } 
 else if( start >=  123545462  && start <=  125534381  ){ chid = '  7_62  '; } 
 else if( start >=  125534382  && start <=  127523301  ){ chid = '  7_63  '; } 
 else if( start >=  127523302  && start <=  129512221  ){ chid = '  7_64  '; } 
 else if( start >=  129512222  && start <=  131501141  ){ chid = '  7_65  '; } 
 else if( start >=  131501142  && start <=  133490061  ){ chid = '  7_66  '; } 
 else if( start >=  133490062  && start <=  135478981  ){ chid = '  7_67  '; } 
 else if( start >=  135478982  && start <=  137467901  ){ chid = '  7_68  '; } 
 else if( start >=  137467902  && start <=  139456821  ){ chid = '  7_69  '; } 
 else if( start >=  139456822  && start <=  141445741  ){ chid = '  7_70  '; } 
 else if( start >=  141445742  && start <=  143434661  ){ chid = '  7_71  '; } 
 else if( start >=  143434662  && start <=  145423581  ){ chid = '  7_72  '; } 
 else if( start >=  145423582  && start <=  147412501  ){ chid = '  7_73  '; } 
 else if( start >=  147412502  && start <=  149401421  ){ chid = '  7_74  '; } 
 else if( start >=  149401422  && start <=  151390341  ){ chid = '  7_75  '; } 
 else if( start >=  151390342  && start <=  153379261  ){ chid = '  7_76  '; } 
 else if( start >=  153379262  && start <=  155368181  ){ chid = '  7_77  '; } 
 else if( start >=  155368182  && start <=  157357101  ){ chid = '  7_78  '; } 
 else if( start >=  157357102  && start <=  159345973  ){ chid = '  7_79  '; } 
} else if( chr == "chr8") {
  if( start >=  1  && start <=  2072727  ){ chid = '  8_1  '; } 
 else if( start >=  2072728  && start <=  4145455  ){ chid = '  8_2  '; } 
 else if( start >=  4145456  && start <=  6218183  ){ chid = '  8_3  '; } 
 else if( start >=  6218184  && start <=  8290911  ){ chid = '  8_4  '; } 
 else if( start >=  8290912  && start <=  10363639  ){ chid = '  8_5  '; } 
 else if( start >=  10363640  && start <=  12436367  ){ chid = '  8_6  '; } 
 else if( start >=  12436368  && start <=  14509095  ){ chid = '  8_7  '; } 
 else if( start >=  14509096  && start <=  16581823  ){ chid = '  8_8  '; } 
 else if( start >=  16581824  && start <=  18654551  ){ chid = '  8_9  '; } 
 else if( start >=  18654552  && start <=  20727279  ){ chid = '  8_10  '; } 
 else if( start >=  20727280  && start <=  22800007  ){ chid = '  8_11  '; } 
 else if( start >=  22800008  && start <=  24872735  ){ chid = '  8_12  '; } 
 else if( start >=  24872736  && start <=  26945463  ){ chid = '  8_13  '; } 
 else if( start >=  26945464  && start <=  29018191  ){ chid = '  8_14  '; } 
 else if( start >=  29018192  && start <=  31090919  ){ chid = '  8_15  '; } 
 else if( start >=  31090920  && start <=  33163647  ){ chid = '  8_16  '; } 
 else if( start >=  33163648  && start <=  35236375  ){ chid = '  8_17  '; } 
 else if( start >=  35236376  && start <=  37309103  ){ chid = '  8_18  '; } 
 else if( start >=  37309104  && start <=  39381831  ){ chid = '  8_19  '; } 
 else if( start >=  39381832  && start <=  41454559  ){ chid = '  8_20  '; } 
 else if( start >=  41454560  && start <=  43527287  ){ chid = '  8_21  '; } 
 else if( start >=  43527288  && start <=  45600015  ){ chid = '  8_22  '; } 
 else if( start >=  45600016  && start <=  47590789  ){ chid = '  8_23  '; } 
 else if( start >=  47590790  && start <=  49581563  ){ chid = '  8_24  '; } 
 else if( start >=  49581564  && start <=  51572337  ){ chid = '  8_25  '; } 
 else if( start >=  51572338  && start <=  53563111  ){ chid = '  8_26  '; } 
 else if( start >=  53563112  && start <=  55553885  ){ chid = '  8_27  '; } 
 else if( start >=  55553886  && start <=  57544659  ){ chid = '  8_28  '; } 
 else if( start >=  57544660  && start <=  59535433  ){ chid = '  8_29  '; } 
 else if( start >=  59535434  && start <=  61526207  ){ chid = '  8_30  '; } 
 else if( start >=  61526208  && start <=  63516981  ){ chid = '  8_31  '; } 
 else if( start >=  63516982  && start <=  65507755  ){ chid = '  8_32  '; } 
 else if( start >=  65507756  && start <=  67498529  ){ chid = '  8_33  '; } 
 else if( start >=  67498530  && start <=  69489303  ){ chid = '  8_34  '; } 
 else if( start >=  69489304  && start <=  71480077  ){ chid = '  8_35  '; } 
 else if( start >=  71480078  && start <=  73470851  ){ chid = '  8_36  '; } 
 else if( start >=  73470852  && start <=  75461625  ){ chid = '  8_37  '; } 
 else if( start >=  75461626  && start <=  77452399  ){ chid = '  8_38  '; } 
 else if( start >=  77452400  && start <=  79443173  ){ chid = '  8_39  '; } 
 else if( start >=  79443174  && start <=  81433947  ){ chid = '  8_40  '; } 
 else if( start >=  81433948  && start <=  83424721  ){ chid = '  8_41  '; } 
 else if( start >=  83424722  && start <=  85415495  ){ chid = '  8_42  '; } 
 else if( start >=  85415496  && start <=  87406269  ){ chid = '  8_43  '; } 
 else if( start >=  87406270  && start <=  89397043  ){ chid = '  8_44  '; } 
 else if( start >=  89397044  && start <=  91387817  ){ chid = '  8_45  '; } 
 else if( start >=  91387818  && start <=  93378591  ){ chid = '  8_46  '; } 
 else if( start >=  93378592  && start <=  95369365  ){ chid = '  8_47  '; } 
 else if( start >=  95369366  && start <=  97360139  ){ chid = '  8_48  '; } 
 else if( start >=  97360140  && start <=  99350913  ){ chid = '  8_49  '; } 
 else if( start >=  99350914  && start <=  101341687  ){ chid = '  8_50  '; } 
 else if( start >=  101341688  && start <=  103332461  ){ chid = '  8_51  '; } 
 else if( start >=  103332462  && start <=  105323235  ){ chid = '  8_52  '; } 
 else if( start >=  105323236  && start <=  107314009  ){ chid = '  8_53  '; } 
 else if( start >=  107314010  && start <=  109304783  ){ chid = '  8_54  '; } 
 else if( start >=  109304784  && start <=  111295557  ){ chid = '  8_55  '; } 
 else if( start >=  111295558  && start <=  113286331  ){ chid = '  8_56  '; } 
 else if( start >=  113286332  && start <=  115277105  ){ chid = '  8_57  '; } 
 else if( start >=  115277106  && start <=  117267879  ){ chid = '  8_58  '; } 
 else if( start >=  117267880  && start <=  119258653  ){ chid = '  8_59  '; } 
 else if( start >=  119258654  && start <=  121249427  ){ chid = '  8_60  '; } 
 else if( start >=  121249428  && start <=  123240201  ){ chid = '  8_61  '; } 
 else if( start >=  123240202  && start <=  125230975  ){ chid = '  8_62  '; } 
 else if( start >=  125230976  && start <=  127221749  ){ chid = '  8_63  '; } 
 else if( start >=  127221750  && start <=  129212523  ){ chid = '  8_64  '; } 
 else if( start >=  129212524  && start <=  131203297  ){ chid = '  8_65  '; } 
 else if( start >=  131203298  && start <=  133194071  ){ chid = '  8_66  '; } 
 else if( start >=  133194072  && start <=  135184845  ){ chid = '  8_67  '; } 
 else if( start >=  135184846  && start <=  137175619  ){ chid = '  8_68  '; } 
 else if( start >=  137175620  && start <=  139166393  ){ chid = '  8_69  '; } 
 else if( start >=  139166394  && start <=  141157167  ){ chid = '  8_70  '; } 
 else if( start >=  141157168  && start <=  143147941  ){ chid = '  8_71  '; } 
 else if( start >=  143147942  && start <=  145138636  ){ chid = '  8_72  '; } 
} else if( chr == "chr9") {
  if( start >=  1  && start <=  2130435  ){ chid = '  9_1  '; } 
 else if( start >=  2130436  && start <=  4260871  ){ chid = '  9_2  '; } 
 else if( start >=  4260872  && start <=  6391307  ){ chid = '  9_3  '; } 
 else if( start >=  6391308  && start <=  8521743  ){ chid = '  9_4  '; } 
 else if( start >=  8521744  && start <=  10652179  ){ chid = '  9_5  '; } 
 else if( start >=  10652180  && start <=  12782615  ){ chid = '  9_6  '; } 
 else if( start >=  12782616  && start <=  14913051  ){ chid = '  9_7  '; } 
 else if( start >=  14913052  && start <=  17043487  ){ chid = '  9_8  '; } 
 else if( start >=  17043488  && start <=  19173923  ){ chid = '  9_9  '; } 
 else if( start >=  19173924  && start <=  21304359  ){ chid = '  9_10  '; } 
 else if( start >=  21304360  && start <=  23434795  ){ chid = '  9_11  '; } 
 else if( start >=  23434796  && start <=  25565231  ){ chid = '  9_12  '; } 
 else if( start >=  25565232  && start <=  27695667  ){ chid = '  9_13  '; } 
 else if( start >=  27695668  && start <=  29826103  ){ chid = '  9_14  '; } 
 else if( start >=  29826104  && start <=  31956539  ){ chid = '  9_15  '; } 
 else if( start >=  31956540  && start <=  34086975  ){ chid = '  9_16  '; } 
 else if( start >=  34086976  && start <=  36217411  ){ chid = '  9_17  '; } 
 else if( start >=  36217412  && start <=  38347847  ){ chid = '  9_18  '; } 
 else if( start >=  38347848  && start <=  40478283  ){ chid = '  9_19  '; } 
 else if( start >=  40478284  && start <=  42608719  ){ chid = '  9_20  '; } 
 else if( start >=  42608720  && start <=  44739155  ){ chid = '  9_21  '; } 
 else if( start >=  44739156  && start <=  46869591  ){ chid = '  9_22  '; } 
 else if( start >=  46869592  && start <=  49000027  ){ chid = '  9_23  '; } 
 else if( start >=  49000028  && start <=  51128474  ){ chid = '  9_24  '; } 
 else if( start >=  51128475  && start <=  53256921  ){ chid = '  9_25  '; } 
 else if( start >=  53256922  && start <=  55385368  ){ chid = '  9_26  '; } 
 else if( start >=  55385369  && start <=  57513815  ){ chid = '  9_27  '; } 
 else if( start >=  57513816  && start <=  59642262  ){ chid = '  9_28  '; } 
 else if( start >=  59642263  && start <=  61770709  ){ chid = '  9_29  '; } 
 else if( start >=  61770710  && start <=  63899156  ){ chid = '  9_30  '; } 
 else if( start >=  63899157  && start <=  66027603  ){ chid = '  9_31  '; } 
 else if( start >=  66027604  && start <=  68156050  ){ chid = '  9_32  '; } 
 else if( start >=  68156051  && start <=  70284497  ){ chid = '  9_33  '; } 
 else if( start >=  70284498  && start <=  72412944  ){ chid = '  9_34  '; } 
 else if( start >=  72412945  && start <=  74541391  ){ chid = '  9_35  '; } 
 else if( start >=  74541392  && start <=  76669838  ){ chid = '  9_36  '; } 
 else if( start >=  76669839  && start <=  78798285  ){ chid = '  9_37  '; } 
 else if( start >=  78798286  && start <=  80926732  ){ chid = '  9_38  '; } 
 else if( start >=  80926733  && start <=  83055179  ){ chid = '  9_39  '; } 
 else if( start >=  83055180  && start <=  85183626  ){ chid = '  9_40  '; } 
 else if( start >=  85183627  && start <=  87312073  ){ chid = '  9_41  '; } 
 else if( start >=  87312074  && start <=  89440520  ){ chid = '  9_42  '; } 
 else if( start >=  89440521  && start <=  91568967  ){ chid = '  9_43  '; } 
 else if( start >=  91568968  && start <=  93697414  ){ chid = '  9_44  '; } 
 else if( start >=  93697415  && start <=  95825861  ){ chid = '  9_45  '; } 
 else if( start >=  95825862  && start <=  97954308  ){ chid = '  9_46  '; } 
 else if( start >=  97954309  && start <=  100082755  ){ chid = '  9_47  '; } 
 else if( start >=  100082756  && start <=  102211202  ){ chid = '  9_48  '; } 
 else if( start >=  102211203  && start <=  104339649  ){ chid = '  9_49  '; } 
 else if( start >=  104339650  && start <=  106468096  ){ chid = '  9_50  '; } 
 else if( start >=  106468097  && start <=  108596543  ){ chid = '  9_51  '; } 
 else if( start >=  108596544  && start <=  110724990  ){ chid = '  9_52  '; } 
 else if( start >=  110724991  && start <=  112853437  ){ chid = '  9_53  '; } 
 else if( start >=  112853438  && start <=  114981884  ){ chid = '  9_54  '; } 
 else if( start >=  114981885  && start <=  117110331  ){ chid = '  9_55  '; } 
 else if( start >=  117110332  && start <=  119238778  ){ chid = '  9_56  '; } 
 else if( start >=  119238779  && start <=  121367225  ){ chid = '  9_57  '; } 
 else if( start >=  121367226  && start <=  123495672  ){ chid = '  9_58  '; } 
 else if( start >=  123495673  && start <=  125624119  ){ chid = '  9_59  '; } 
 else if( start >=  125624120  && start <=  127752566  ){ chid = '  9_60  '; } 
 else if( start >=  127752567  && start <=  129881013  ){ chid = '  9_61  '; } 
 else if( start >=  129881014  && start <=  132009460  ){ chid = '  9_62  '; } 
 else if( start >=  132009461  && start <=  134137907  ){ chid = '  9_63  '; } 
 else if( start >=  134137908  && start <=  136266354  ){ chid = '  9_64  '; } 
 else if( start >=  136266355  && start <=  138394717  ){ chid = '  9_65  '; } 
} else if( chr == "chr10") {
  if( start >=  1  && start <=  2115789  ){ chid = '  10_1  '; } 
 else if( start >=  2115790  && start <=  4231579  ){ chid = '  10_2  '; } 
 else if( start >=  4231580  && start <=  6347369  ){ chid = '  10_3  '; } 
 else if( start >=  6347370  && start <=  8463159  ){ chid = '  10_4  '; } 
 else if( start >=  8463160  && start <=  10578949  ){ chid = '  10_5  '; } 
 else if( start >=  10578950  && start <=  12694739  ){ chid = '  10_6  '; } 
 else if( start >=  12694740  && start <=  14810529  ){ chid = '  10_7  '; } 
 else if( start >=  14810530  && start <=  16926319  ){ chid = '  10_8  '; } 
 else if( start >=  16926320  && start <=  19042109  ){ chid = '  10_9  '; } 
 else if( start >=  19042110  && start <=  21157899  ){ chid = '  10_10  '; } 
 else if( start >=  21157900  && start <=  23273689  ){ chid = '  10_11  '; } 
 else if( start >=  23273690  && start <=  25389479  ){ chid = '  10_12  '; } 
 else if( start >=  25389480  && start <=  27505269  ){ chid = '  10_13  '; } 
 else if( start >=  27505270  && start <=  29621059  ){ chid = '  10_14  '; } 
 else if( start >=  29621060  && start <=  31736849  ){ chid = '  10_15  '; } 
 else if( start >=  31736850  && start <=  33852639  ){ chid = '  10_16  '; } 
 else if( start >=  33852640  && start <=  35968429  ){ chid = '  10_17  '; } 
 else if( start >=  35968430  && start <=  38084219  ){ chid = '  10_18  '; } 
 else if( start >=  38084220  && start <=  40200009  ){ chid = '  10_19  '; } 
 else if( start >=  40200010  && start <=  42191445  ){ chid = '  10_20  '; } 
 else if( start >=  42191446  && start <=  44182881  ){ chid = '  10_21  '; } 
 else if( start >=  44182882  && start <=  46174317  ){ chid = '  10_22  '; } 
 else if( start >=  46174318  && start <=  48165753  ){ chid = '  10_23  '; } 
 else if( start >=  48165754  && start <=  50157189  ){ chid = '  10_24  '; } 
 else if( start >=  50157190  && start <=  52148625  ){ chid = '  10_25  '; } 
 else if( start >=  52148626  && start <=  54140061  ){ chid = '  10_26  '; } 
 else if( start >=  54140062  && start <=  56131497  ){ chid = '  10_27  '; } 
 else if( start >=  56131498  && start <=  58122933  ){ chid = '  10_28  '; } 
 else if( start >=  58122934  && start <=  60114369  ){ chid = '  10_29  '; } 
 else if( start >=  60114370  && start <=  62105805  ){ chid = '  10_30  '; } 
 else if( start >=  62105806  && start <=  64097241  ){ chid = '  10_31  '; } 
 else if( start >=  64097242  && start <=  66088677  ){ chid = '  10_32  '; } 
 else if( start >=  66088678  && start <=  68080113  ){ chid = '  10_33  '; } 
 else if( start >=  68080114  && start <=  70071549  ){ chid = '  10_34  '; } 
 else if( start >=  70071550  && start <=  72062985  ){ chid = '  10_35  '; } 
 else if( start >=  72062986  && start <=  74054421  ){ chid = '  10_36  '; } 
 else if( start >=  74054422  && start <=  76045857  ){ chid = '  10_37  '; } 
 else if( start >=  76045858  && start <=  78037293  ){ chid = '  10_38  '; } 
 else if( start >=  78037294  && start <=  80028729  ){ chid = '  10_39  '; } 
 else if( start >=  80028730  && start <=  82020165  ){ chid = '  10_40  '; } 
 else if( start >=  82020166  && start <=  84011601  ){ chid = '  10_41  '; } 
 else if( start >=  84011602  && start <=  86003037  ){ chid = '  10_42  '; } 
 else if( start >=  86003038  && start <=  87994473  ){ chid = '  10_43  '; } 
 else if( start >=  87994474  && start <=  89985909  ){ chid = '  10_44  '; } 
 else if( start >=  89985910  && start <=  91977345  ){ chid = '  10_45  '; } 
 else if( start >=  91977346  && start <=  93968781  ){ chid = '  10_46  '; } 
 else if( start >=  93968782  && start <=  95960217  ){ chid = '  10_47  '; } 
 else if( start >=  95960218  && start <=  97951653  ){ chid = '  10_48  '; } 
 else if( start >=  97951654  && start <=  99943089  ){ chid = '  10_49  '; } 
 else if( start >=  99943090  && start <=  101934525  ){ chid = '  10_50  '; } 
 else if( start >=  101934526  && start <=  103925961  ){ chid = '  10_51  '; } 
 else if( start >=  103925962  && start <=  105917397  ){ chid = '  10_52  '; } 
 else if( start >=  105917398  && start <=  107908833  ){ chid = '  10_53  '; } 
 else if( start >=  107908834  && start <=  109900269  ){ chid = '  10_54  '; } 
 else if( start >=  109900270  && start <=  111891705  ){ chid = '  10_55  '; } 
 else if( start >=  111891706  && start <=  113883141  ){ chid = '  10_56  '; } 
 else if( start >=  113883142  && start <=  115874577  ){ chid = '  10_57  '; } 
 else if( start >=  115874578  && start <=  117866013  ){ chid = '  10_58  '; } 
 else if( start >=  117866014  && start <=  119857449  ){ chid = '  10_59  '; } 
 else if( start >=  119857450  && start <=  121848885  ){ chid = '  10_60  '; } 
 else if( start >=  121848886  && start <=  123840321  ){ chid = '  10_61  '; } 
 else if( start >=  123840322  && start <=  125831757  ){ chid = '  10_62  '; } 
 else if( start >=  125831758  && start <=  127823193  ){ chid = '  10_63  '; } 
 else if( start >=  127823194  && start <=  129814629  ){ chid = '  10_64  '; } 
 else if( start >=  129814630  && start <=  131806065  ){ chid = '  10_65  '; } 
 else if( start >=  131806066  && start <=  133797422  ){ chid = '  10_66  '; } 
} else if( chr == "chr11") {
  if( start >=  1  && start <=  2065385  ){ chid = '  11_1  '; } 
 else if( start >=  2065386  && start <=  4130771  ){ chid = '  11_2  '; } 
 else if( start >=  4130772  && start <=  6196157  ){ chid = '  11_3  '; } 
 else if( start >=  6196158  && start <=  8261543  ){ chid = '  11_4  '; } 
 else if( start >=  8261544  && start <=  10326929  ){ chid = '  11_5  '; } 
 else if( start >=  10326930  && start <=  12392315  ){ chid = '  11_6  '; } 
 else if( start >=  12392316  && start <=  14457701  ){ chid = '  11_7  '; } 
 else if( start >=  14457702  && start <=  16523087  ){ chid = '  11_8  '; } 
 else if( start >=  16523088  && start <=  18588473  ){ chid = '  11_9  '; } 
 else if( start >=  18588474  && start <=  20653859  ){ chid = '  11_10  '; } 
 else if( start >=  20653860  && start <=  22719245  ){ chid = '  11_11  '; } 
 else if( start >=  22719246  && start <=  24784631  ){ chid = '  11_12  '; } 
 else if( start >=  24784632  && start <=  26850017  ){ chid = '  11_13  '; } 
 else if( start >=  26850018  && start <=  28915403  ){ chid = '  11_14  '; } 
 else if( start >=  28915404  && start <=  30980789  ){ chid = '  11_15  '; } 
 else if( start >=  30980790  && start <=  33046175  ){ chid = '  11_16  '; } 
 else if( start >=  33046176  && start <=  35111561  ){ chid = '  11_17  '; } 
 else if( start >=  35111562  && start <=  37176947  ){ chid = '  11_18  '; } 
 else if( start >=  37176948  && start <=  39242333  ){ chid = '  11_19  '; } 
 else if( start >=  39242334  && start <=  41307719  ){ chid = '  11_20  '; } 
 else if( start >=  41307720  && start <=  43373105  ){ chid = '  11_21  '; } 
 else if( start >=  43373106  && start <=  45438491  ){ chid = '  11_22  '; } 
 else if( start >=  45438492  && start <=  47503877  ){ chid = '  11_23  '; } 
 else if( start >=  47503878  && start <=  49569263  ){ chid = '  11_24  '; } 
 else if( start >=  49569264  && start <=  51634649  ){ chid = '  11_25  '; } 
 else if( start >=  51634650  && start <=  53700035  ){ chid = '  11_26  '; } 
 else if( start >=  53700036  && start <=  55734702  ){ chid = '  11_27  '; } 
 else if( start >=  55734703  && start <=  57769369  ){ chid = '  11_28  '; } 
 else if( start >=  57769370  && start <=  59804036  ){ chid = '  11_29  '; } 
 else if( start >=  59804037  && start <=  61838703  ){ chid = '  11_30  '; } 
 else if( start >=  61838704  && start <=  63873370  ){ chid = '  11_31  '; } 
 else if( start >=  63873371  && start <=  65908037  ){ chid = '  11_32  '; } 
 else if( start >=  65908038  && start <=  67942704  ){ chid = '  11_33  '; } 
 else if( start >=  67942705  && start <=  69977371  ){ chid = '  11_34  '; } 
 else if( start >=  69977372  && start <=  72012038  ){ chid = '  11_35  '; } 
 else if( start >=  72012039  && start <=  74046705  ){ chid = '  11_36  '; } 
 else if( start >=  74046706  && start <=  76081372  ){ chid = '  11_37  '; } 
 else if( start >=  76081373  && start <=  78116039  ){ chid = '  11_38  '; } 
 else if( start >=  78116040  && start <=  80150706  ){ chid = '  11_39  '; } 
 else if( start >=  80150707  && start <=  82185373  ){ chid = '  11_40  '; } 
 else if( start >=  82185374  && start <=  84220040  ){ chid = '  11_41  '; } 
 else if( start >=  84220041  && start <=  86254707  ){ chid = '  11_42  '; } 
 else if( start >=  86254708  && start <=  88289374  ){ chid = '  11_43  '; } 
 else if( start >=  88289375  && start <=  90324041  ){ chid = '  11_44  '; } 
 else if( start >=  90324042  && start <=  92358708  ){ chid = '  11_45  '; } 
 else if( start >=  92358709  && start <=  94393375  ){ chid = '  11_46  '; } 
 else if( start >=  94393376  && start <=  96428042  ){ chid = '  11_47  '; } 
 else if( start >=  96428043  && start <=  98462709  ){ chid = '  11_48  '; } 
 else if( start >=  98462710  && start <=  100497376  ){ chid = '  11_49  '; } 
 else if( start >=  100497377  && start <=  102532043  ){ chid = '  11_50  '; } 
 else if( start >=  102532044  && start <=  104566710  ){ chid = '  11_51  '; } 
 else if( start >=  104566711  && start <=  106601377  ){ chid = '  11_52  '; } 
 else if( start >=  106601378  && start <=  108636044  ){ chid = '  11_53  '; } 
 else if( start >=  108636045  && start <=  110670711  ){ chid = '  11_54  '; } 
 else if( start >=  110670712  && start <=  112705378  ){ chid = '  11_55  '; } 
 else if( start >=  112705379  && start <=  114740045  ){ chid = '  11_56  '; } 
 else if( start >=  114740046  && start <=  116774712  ){ chid = '  11_57  '; } 
 else if( start >=  116774713  && start <=  118809379  ){ chid = '  11_58  '; } 
 else if( start >=  118809380  && start <=  120844046  ){ chid = '  11_59  '; } 
 else if( start >=  120844047  && start <=  122878713  ){ chid = '  11_60  '; } 
 else if( start >=  122878714  && start <=  124913380  ){ chid = '  11_61  '; } 
 else if( start >=  124913381  && start <=  126948047  ){ chid = '  11_62  '; } 
 else if( start >=  126948048  && start <=  128982714  ){ chid = '  11_63  '; } 
 else if( start >=  128982715  && start <=  131017381  ){ chid = '  11_64  '; } 
 else if( start >=  131017382  && start <=  133052048  ){ chid = '  11_65  '; } 
 else if( start >=  133052049  && start <=  135086622  ){ chid = '  11_66  '; } 
} else if( chr == "chr12") {
  if( start >=  1  && start <=  2105882  ){ chid = '  12_1  '; } 
 else if( start >=  2105883  && start <=  4211765  ){ chid = '  12_2  '; } 
 else if( start >=  4211766  && start <=  6317648  ){ chid = '  12_3  '; } 
 else if( start >=  6317649  && start <=  8423531  ){ chid = '  12_4  '; } 
 else if( start >=  8423532  && start <=  10529414  ){ chid = '  12_5  '; } 
 else if( start >=  10529415  && start <=  12635297  ){ chid = '  12_6  '; } 
 else if( start >=  12635298  && start <=  14741180  ){ chid = '  12_7  '; } 
 else if( start >=  14741181  && start <=  16847063  ){ chid = '  12_8  '; } 
 else if( start >=  16847064  && start <=  18952946  ){ chid = '  12_9  '; } 
 else if( start >=  18952947  && start <=  21058829  ){ chid = '  12_10  '; } 
 else if( start >=  21058830  && start <=  23164712  ){ chid = '  12_11  '; } 
 else if( start >=  23164713  && start <=  25270595  ){ chid = '  12_12  '; } 
 else if( start >=  25270596  && start <=  27376478  ){ chid = '  12_13  '; } 
 else if( start >=  27376479  && start <=  29482361  ){ chid = '  12_14  '; } 
 else if( start >=  29482362  && start <=  31588244  ){ chid = '  12_15  '; } 
 else if( start >=  31588245  && start <=  33694127  ){ chid = '  12_16  '; } 
 else if( start >=  33694128  && start <=  35800010  ){ chid = '  12_17  '; } 
 else if( start >=  35800011  && start <=  37749517  ){ chid = '  12_18  '; } 
 else if( start >=  37749518  && start <=  39699024  ){ chid = '  12_19  '; } 
 else if( start >=  39699025  && start <=  41648531  ){ chid = '  12_20  '; } 
 else if( start >=  41648532  && start <=  43598038  ){ chid = '  12_21  '; } 
 else if( start >=  43598039  && start <=  45547545  ){ chid = '  12_22  '; } 
 else if( start >=  45547546  && start <=  47497052  ){ chid = '  12_23  '; } 
 else if( start >=  47497053  && start <=  49446559  ){ chid = '  12_24  '; } 
 else if( start >=  49446560  && start <=  51396066  ){ chid = '  12_25  '; } 
 else if( start >=  51396067  && start <=  53345573  ){ chid = '  12_26  '; } 
 else if( start >=  53345574  && start <=  55295080  ){ chid = '  12_27  '; } 
 else if( start >=  55295081  && start <=  57244587  ){ chid = '  12_28  '; } 
 else if( start >=  57244588  && start <=  59194094  ){ chid = '  12_29  '; } 
 else if( start >=  59194095  && start <=  61143601  ){ chid = '  12_30  '; } 
 else if( start >=  61143602  && start <=  63093108  ){ chid = '  12_31  '; } 
 else if( start >=  63093109  && start <=  65042615  ){ chid = '  12_32  '; } 
 else if( start >=  65042616  && start <=  66992122  ){ chid = '  12_33  '; } 
 else if( start >=  66992123  && start <=  68941629  ){ chid = '  12_34  '; } 
 else if( start >=  68941630  && start <=  70891136  ){ chid = '  12_35  '; } 
 else if( start >=  70891137  && start <=  72840643  ){ chid = '  12_36  '; } 
 else if( start >=  72840644  && start <=  74790150  ){ chid = '  12_37  '; } 
 else if( start >=  74790151  && start <=  76739657  ){ chid = '  12_38  '; } 
 else if( start >=  76739658  && start <=  78689164  ){ chid = '  12_39  '; } 
 else if( start >=  78689165  && start <=  80638671  ){ chid = '  12_40  '; } 
 else if( start >=  80638672  && start <=  82588178  ){ chid = '  12_41  '; } 
 else if( start >=  82588179  && start <=  84537685  ){ chid = '  12_42  '; } 
 else if( start >=  84537686  && start <=  86487192  ){ chid = '  12_43  '; } 
 else if( start >=  86487193  && start <=  88436699  ){ chid = '  12_44  '; } 
 else if( start >=  88436700  && start <=  90386206  ){ chid = '  12_45  '; } 
 else if( start >=  90386207  && start <=  92335713  ){ chid = '  12_46  '; } 
 else if( start >=  92335714  && start <=  94285220  ){ chid = '  12_47  '; } 
 else if( start >=  94285221  && start <=  96234727  ){ chid = '  12_48  '; } 
 else if( start >=  96234728  && start <=  98184234  ){ chid = '  12_49  '; } 
 else if( start >=  98184235  && start <=  100133741  ){ chid = '  12_50  '; } 
 else if( start >=  100133742  && start <=  102083248  ){ chid = '  12_51  '; } 
 else if( start >=  102083249  && start <=  104032755  ){ chid = '  12_52  '; } 
 else if( start >=  104032756  && start <=  105982262  ){ chid = '  12_53  '; } 
 else if( start >=  105982263  && start <=  107931769  ){ chid = '  12_54  '; } 
 else if( start >=  107931770  && start <=  109881276  ){ chid = '  12_55  '; } 
 else if( start >=  109881277  && start <=  111830783  ){ chid = '  12_56  '; } 
 else if( start >=  111830784  && start <=  113780290  ){ chid = '  12_57  '; } 
 else if( start >=  113780291  && start <=  115729797  ){ chid = '  12_58  '; } 
 else if( start >=  115729798  && start <=  117679304  ){ chid = '  12_59  '; } 
 else if( start >=  117679305  && start <=  119628811  ){ chid = '  12_60  '; } 
 else if( start >=  119628812  && start <=  121578318  ){ chid = '  12_61  '; } 
 else if( start >=  121578319  && start <=  123527825  ){ chid = '  12_62  '; } 
 else if( start >=  123527826  && start <=  125477332  ){ chid = '  12_63  '; } 
 else if( start >=  125477333  && start <=  127426839  ){ chid = '  12_64  '; } 
 else if( start >=  127426840  && start <=  129376346  ){ chid = '  12_65  '; } 
 else if( start >=  129376347  && start <=  131325853  ){ chid = '  12_66  '; } 
 else if( start >=  131325854  && start <=  133275309  ){ chid = '  12_67  '; } 
} else if( chr == "chr13") {
  if( start >=  1  && start <=  2557143  ){ chid = '  13_1  '; } 
 else if( start >=  2557144  && start <=  5114287  ){ chid = '  13_2  '; } 
 else if( start >=  5114288  && start <=  7671431  ){ chid = '  13_3  '; } 
 else if( start >=  7671432  && start <=  10228575  ){ chid = '  13_4  '; } 
 else if( start >=  10228576  && start <=  12785719  ){ chid = '  13_5  '; } 
 else if( start >=  12785720  && start <=  15342863  ){ chid = '  13_6  '; } 
 else if( start >=  15342864  && start <=  17900007  ){ chid = '  13_7  '; } 
 else if( start >=  17900008  && start <=  19868668  ){ chid = '  13_8  '; } 
 else if( start >=  19868669  && start <=  21837329  ){ chid = '  13_9  '; } 
 else if( start >=  21837330  && start <=  23805990  ){ chid = '  13_10  '; } 
 else if( start >=  23805991  && start <=  25774651  ){ chid = '  13_11  '; } 
 else if( start >=  25774652  && start <=  27743312  ){ chid = '  13_12  '; } 
 else if( start >=  27743313  && start <=  29711973  ){ chid = '  13_13  '; } 
 else if( start >=  29711974  && start <=  31680634  ){ chid = '  13_14  '; } 
 else if( start >=  31680635  && start <=  33649295  ){ chid = '  13_15  '; } 
 else if( start >=  33649296  && start <=  35617956  ){ chid = '  13_16  '; } 
 else if( start >=  35617957  && start <=  37586617  ){ chid = '  13_17  '; } 
 else if( start >=  37586618  && start <=  39555278  ){ chid = '  13_18  '; } 
 else if( start >=  39555279  && start <=  41523939  ){ chid = '  13_19  '; } 
 else if( start >=  41523940  && start <=  43492600  ){ chid = '  13_20  '; } 
 else if( start >=  43492601  && start <=  45461261  ){ chid = '  13_21  '; } 
 else if( start >=  45461262  && start <=  47429922  ){ chid = '  13_22  '; } 
 else if( start >=  47429923  && start <=  49398583  ){ chid = '  13_23  '; } 
 else if( start >=  49398584  && start <=  51367244  ){ chid = '  13_24  '; } 
 else if( start >=  51367245  && start <=  53335905  ){ chid = '  13_25  '; } 
 else if( start >=  53335906  && start <=  55304566  ){ chid = '  13_26  '; } 
 else if( start >=  55304567  && start <=  57273227  ){ chid = '  13_27  '; } 
 else if( start >=  57273228  && start <=  59241888  ){ chid = '  13_28  '; } 
 else if( start >=  59241889  && start <=  61210549  ){ chid = '  13_29  '; } 
 else if( start >=  61210550  && start <=  63179210  ){ chid = '  13_30  '; } 
 else if( start >=  63179211  && start <=  65147871  ){ chid = '  13_31  '; } 
 else if( start >=  65147872  && start <=  67116532  ){ chid = '  13_32  '; } 
 else if( start >=  67116533  && start <=  69085193  ){ chid = '  13_33  '; } 
 else if( start >=  69085194  && start <=  71053854  ){ chid = '  13_34  '; } 
 else if( start >=  71053855  && start <=  73022515  ){ chid = '  13_35  '; } 
 else if( start >=  73022516  && start <=  74991176  ){ chid = '  13_36  '; } 
 else if( start >=  74991177  && start <=  76959837  ){ chid = '  13_37  '; } 
 else if( start >=  76959838  && start <=  78928498  ){ chid = '  13_38  '; } 
 else if( start >=  78928499  && start <=  80897159  ){ chid = '  13_39  '; } 
 else if( start >=  80897160  && start <=  82865820  ){ chid = '  13_40  '; } 
 else if( start >=  82865821  && start <=  84834481  ){ chid = '  13_41  '; } 
 else if( start >=  84834482  && start <=  86803142  ){ chid = '  13_42  '; } 
 else if( start >=  86803143  && start <=  88771803  ){ chid = '  13_43  '; } 
 else if( start >=  88771804  && start <=  90740464  ){ chid = '  13_44  '; } 
 else if( start >=  90740465  && start <=  92709125  ){ chid = '  13_45  '; } 
 else if( start >=  92709126  && start <=  94677786  ){ chid = '  13_46  '; } 
 else if( start >=  94677787  && start <=  96646447  ){ chid = '  13_47  '; } 
 else if( start >=  96646448  && start <=  98615108  ){ chid = '  13_48  '; } 
 else if( start >=  98615109  && start <=  100583769  ){ chid = '  13_49  '; } 
 else if( start >=  100583770  && start <=  102552430  ){ chid = '  13_50  '; } 
 else if( start >=  102552431  && start <=  104521091  ){ chid = '  13_51  '; } 
 else if( start >=  104521092  && start <=  106489752  ){ chid = '  13_52  '; } 
 else if( start >=  106489753  && start <=  108458413  ){ chid = '  13_53  '; } 
 else if( start >=  108458414  && start <=  110427074  ){ chid = '  13_54  '; } 
 else if( start >=  110427075  && start <=  112395735  ){ chid = '  13_55  '; } 
 else if( start >=  112395736  && start <=  114364328  ){ chid = '  13_56  '; } 
} else if( chr == "chr14") {
  if( start >=  1  && start <=  2933333  ){ chid = '  14_1  '; } 
 else if( start >=  2933334  && start <=  5866667  ){ chid = '  14_2  '; } 
 else if( start >=  5866668  && start <=  8800001  ){ chid = '  14_3  '; } 
 else if( start >=  8800002  && start <=  11733335  ){ chid = '  14_4  '; } 
 else if( start >=  11733336  && start <=  14666669  ){ chid = '  14_5  '; } 
 else if( start >=  14666670  && start <=  17600003  ){ chid = '  14_6  '; } 
 else if( start >=  17600004  && start <=  19587642  ){ chid = '  14_7  '; } 
 else if( start >=  19587643  && start <=  21575281  ){ chid = '  14_8  '; } 
 else if( start >=  21575282  && start <=  23562920  ){ chid = '  14_9  '; } 
 else if( start >=  23562921  && start <=  25550559  ){ chid = '  14_10  '; } 
 else if( start >=  25550560  && start <=  27538198  ){ chid = '  14_11  '; } 
 else if( start >=  27538199  && start <=  29525837  ){ chid = '  14_12  '; } 
 else if( start >=  29525838  && start <=  31513476  ){ chid = '  14_13  '; } 
 else if( start >=  31513477  && start <=  33501115  ){ chid = '  14_14  '; } 
 else if( start >=  33501116  && start <=  35488754  ){ chid = '  14_15  '; } 
 else if( start >=  35488755  && start <=  37476393  ){ chid = '  14_16  '; } 
 else if( start >=  37476394  && start <=  39464032  ){ chid = '  14_17  '; } 
 else if( start >=  39464033  && start <=  41451671  ){ chid = '  14_18  '; } 
 else if( start >=  41451672  && start <=  43439310  ){ chid = '  14_19  '; } 
 else if( start >=  43439311  && start <=  45426949  ){ chid = '  14_20  '; } 
 else if( start >=  45426950  && start <=  47414588  ){ chid = '  14_21  '; } 
 else if( start >=  47414589  && start <=  49402227  ){ chid = '  14_22  '; } 
 else if( start >=  49402228  && start <=  51389866  ){ chid = '  14_23  '; } 
 else if( start >=  51389867  && start <=  53377505  ){ chid = '  14_24  '; } 
 else if( start >=  53377506  && start <=  55365144  ){ chid = '  14_25  '; } 
 else if( start >=  55365145  && start <=  57352783  ){ chid = '  14_26  '; } 
 else if( start >=  57352784  && start <=  59340422  ){ chid = '  14_27  '; } 
 else if( start >=  59340423  && start <=  61328061  ){ chid = '  14_28  '; } 
 else if( start >=  61328062  && start <=  63315700  ){ chid = '  14_29  '; } 
 else if( start >=  63315701  && start <=  65303339  ){ chid = '  14_30  '; } 
 else if( start >=  65303340  && start <=  67290978  ){ chid = '  14_31  '; } 
 else if( start >=  67290979  && start <=  69278617  ){ chid = '  14_32  '; } 
 else if( start >=  69278618  && start <=  71266256  ){ chid = '  14_33  '; } 
 else if( start >=  71266257  && start <=  73253895  ){ chid = '  14_34  '; } 
 else if( start >=  73253896  && start <=  75241534  ){ chid = '  14_35  '; } 
 else if( start >=  75241535  && start <=  77229173  ){ chid = '  14_36  '; } 
 else if( start >=  77229174  && start <=  79216812  ){ chid = '  14_37  '; } 
 else if( start >=  79216813  && start <=  81204451  ){ chid = '  14_38  '; } 
 else if( start >=  81204452  && start <=  83192090  ){ chid = '  14_39  '; } 
 else if( start >=  83192091  && start <=  85179729  ){ chid = '  14_40  '; } 
 else if( start >=  85179730  && start <=  87167368  ){ chid = '  14_41  '; } 
 else if( start >=  87167369  && start <=  89155007  ){ chid = '  14_42  '; } 
 else if( start >=  89155008  && start <=  91142646  ){ chid = '  14_43  '; } 
 else if( start >=  91142647  && start <=  93130285  ){ chid = '  14_44  '; } 
 else if( start >=  93130286  && start <=  95117924  ){ chid = '  14_45  '; } 
 else if( start >=  95117925  && start <=  97105563  ){ chid = '  14_46  '; } 
 else if( start >=  97105564  && start <=  99093202  ){ chid = '  14_47  '; } 
 else if( start >=  99093203  && start <=  101080841  ){ chid = '  14_48  '; } 
 else if( start >=  101080842  && start <=  103068480  ){ chid = '  14_49  '; } 
 else if( start >=  103068481  && start <=  105056119  ){ chid = '  14_50  '; } 
 else if( start >=  105056120  && start <=  107043718  ){ chid = '  14_51  '; } 
} else if( chr == "chr15") {
  if( start >=  1  && start <=  3166667  ){ chid = '  15_1  '; } 
 else if( start >=  3166668  && start <=  6333335  ){ chid = '  15_2  '; } 
 else if( start >=  6333336  && start <=  9500003  ){ chid = '  15_3  '; } 
 else if( start >=  9500004  && start <=  12666671  ){ chid = '  15_4  '; } 
 else if( start >=  12666672  && start <=  15833339  ){ chid = '  15_5  '; } 
 else if( start >=  15833340  && start <=  19000007  ){ chid = '  15_6  '; } 
 else if( start >=  19000008  && start <=  21024183  ){ chid = '  15_7  '; } 
 else if( start >=  21024184  && start <=  23048359  ){ chid = '  15_8  '; } 
 else if( start >=  23048360  && start <=  25072535  ){ chid = '  15_9  '; } 
 else if( start >=  25072536  && start <=  27096711  ){ chid = '  15_10  '; } 
 else if( start >=  27096712  && start <=  29120887  ){ chid = '  15_11  '; } 
 else if( start >=  29120888  && start <=  31145063  ){ chid = '  15_12  '; } 
 else if( start >=  31145064  && start <=  33169239  ){ chid = '  15_13  '; } 
 else if( start >=  33169240  && start <=  35193415  ){ chid = '  15_14  '; } 
 else if( start >=  35193416  && start <=  37217591  ){ chid = '  15_15  '; } 
 else if( start >=  37217592  && start <=  39241767  ){ chid = '  15_16  '; } 
 else if( start >=  39241768  && start <=  41265943  ){ chid = '  15_17  '; } 
 else if( start >=  41265944  && start <=  43290119  ){ chid = '  15_18  '; } 
 else if( start >=  43290120  && start <=  45314295  ){ chid = '  15_19  '; } 
 else if( start >=  45314296  && start <=  47338471  ){ chid = '  15_20  '; } 
 else if( start >=  47338472  && start <=  49362647  ){ chid = '  15_21  '; } 
 else if( start >=  49362648  && start <=  51386823  ){ chid = '  15_22  '; } 
 else if( start >=  51386824  && start <=  53410999  ){ chid = '  15_23  '; } 
 else if( start >=  53411000  && start <=  55435175  ){ chid = '  15_24  '; } 
 else if( start >=  55435176  && start <=  57459351  ){ chid = '  15_25  '; } 
 else if( start >=  57459352  && start <=  59483527  ){ chid = '  15_26  '; } 
 else if( start >=  59483528  && start <=  61507703  ){ chid = '  15_27  '; } 
 else if( start >=  61507704  && start <=  63531879  ){ chid = '  15_28  '; } 
 else if( start >=  63531880  && start <=  65556055  ){ chid = '  15_29  '; } 
 else if( start >=  65556056  && start <=  67580231  ){ chid = '  15_30  '; } 
 else if( start >=  67580232  && start <=  69604407  ){ chid = '  15_31  '; } 
 else if( start >=  69604408  && start <=  71628583  ){ chid = '  15_32  '; } 
 else if( start >=  71628584  && start <=  73652759  ){ chid = '  15_33  '; } 
 else if( start >=  73652760  && start <=  75676935  ){ chid = '  15_34  '; } 
 else if( start >=  75676936  && start <=  77701111  ){ chid = '  15_35  '; } 
 else if( start >=  77701112  && start <=  79725287  ){ chid = '  15_36  '; } 
 else if( start >=  79725288  && start <=  81749463  ){ chid = '  15_37  '; } 
 else if( start >=  81749464  && start <=  83773639  ){ chid = '  15_38  '; } 
 else if( start >=  83773640  && start <=  85797815  ){ chid = '  15_39  '; } 
 else if( start >=  85797816  && start <=  87821991  ){ chid = '  15_40  '; } 
 else if( start >=  87821992  && start <=  89846167  ){ chid = '  15_41  '; } 
 else if( start >=  89846168  && start <=  91870343  ){ chid = '  15_42  '; } 
 else if( start >=  91870344  && start <=  93894519  ){ chid = '  15_43  '; } 
 else if( start >=  93894520  && start <=  95918695  ){ chid = '  15_44  '; } 
 else if( start >=  95918696  && start <=  97942871  ){ chid = '  15_45  '; } 
 else if( start >=  97942872  && start <=  99967047  ){ chid = '  15_46  '; } 
 else if( start >=  99967048  && start <=  101991189  ){ chid = '  15_47  '; } 
} else if( chr == "chr16") {
  if( start >=  1  && start <=  2152941  ){ chid = '  16_1  '; } 
 else if( start >=  2152942  && start <=  4305883  ){ chid = '  16_2  '; } 
 else if( start >=  4305884  && start <=  6458825  ){ chid = '  16_3  '; } 
 else if( start >=  6458826  && start <=  8611767  ){ chid = '  16_4  '; } 
 else if( start >=  8611768  && start <=  10764709  ){ chid = '  16_5  '; } 
 else if( start >=  10764710  && start <=  12917651  ){ chid = '  16_6  '; } 
 else if( start >=  12917652  && start <=  15070593  ){ chid = '  16_7  '; } 
 else if( start >=  15070594  && start <=  17223535  ){ chid = '  16_8  '; } 
 else if( start >=  17223536  && start <=  19376477  ){ chid = '  16_9  '; } 
 else if( start >=  19376478  && start <=  21529419  ){ chid = '  16_10  '; } 
 else if( start >=  21529420  && start <=  23682361  ){ chid = '  16_11  '; } 
 else if( start >=  23682362  && start <=  25835303  ){ chid = '  16_12  '; } 
 else if( start >=  25835304  && start <=  27988245  ){ chid = '  16_13  '; } 
 else if( start >=  27988246  && start <=  30141187  ){ chid = '  16_14  '; } 
 else if( start >=  30141188  && start <=  32294129  ){ chid = '  16_15  '; } 
 else if( start >=  32294130  && start <=  34447071  ){ chid = '  16_16  '; } 
 else if( start >=  34447072  && start <=  36600013  ){ chid = '  16_17  '; } 
 else if( start >=  36600014  && start <=  38839112  ){ chid = '  16_18  '; } 
 else if( start >=  38839113  && start <=  41078211  ){ chid = '  16_19  '; } 
 else if( start >=  41078212  && start <=  43317310  ){ chid = '  16_20  '; } 
 else if( start >=  43317311  && start <=  45556409  ){ chid = '  16_21  '; } 
 else if( start >=  45556410  && start <=  47795508  ){ chid = '  16_22  '; } 
 else if( start >=  47795509  && start <=  50034607  ){ chid = '  16_23  '; } 
 else if( start >=  50034608  && start <=  52273706  ){ chid = '  16_24  '; } 
 else if( start >=  52273707  && start <=  54512805  ){ chid = '  16_25  '; } 
 else if( start >=  54512806  && start <=  56751904  ){ chid = '  16_26  '; } 
 else if( start >=  56751905  && start <=  58991003  ){ chid = '  16_27  '; } 
 else if( start >=  58991004  && start <=  61230102  ){ chid = '  16_28  '; } 
 else if( start >=  61230103  && start <=  63469201  ){ chid = '  16_29  '; } 
 else if( start >=  63469202  && start <=  65708300  ){ chid = '  16_30  '; } 
 else if( start >=  65708301  && start <=  67947399  ){ chid = '  16_31  '; } 
 else if( start >=  67947400  && start <=  70186498  ){ chid = '  16_32  '; } 
 else if( start >=  70186499  && start <=  72425597  ){ chid = '  16_33  '; } 
 else if( start >=  72425598  && start <=  74664696  ){ chid = '  16_34  '; } 
 else if( start >=  74664697  && start <=  76903795  ){ chid = '  16_35  '; } 
 else if( start >=  76903796  && start <=  79142894  ){ chid = '  16_36  '; } 
 else if( start >=  79142895  && start <=  81381993  ){ chid = '  16_37  '; } 
 else if( start >=  81381994  && start <=  83621092  ){ chid = '  16_38  '; } 
 else if( start >=  83621093  && start <=  85860191  ){ chid = '  16_39  '; } 
 else if( start >=  85860192  && start <=  88099290  ){ chid = '  16_40  '; } 
 else if( start >=  88099291  && start <=  90338345  ){ chid = '  16_41  '; } 
} else if( chr == "chr17") {
  if( start >=  1  && start <=  2400000  ){ chid = '  17_1  '; } 
 else if( start >=  2400001  && start <=  4800001  ){ chid = '  17_2  '; } 
 else if( start >=  4800002  && start <=  7200002  ){ chid = '  17_3  '; } 
 else if( start >=  7200003  && start <=  9600003  ){ chid = '  17_4  '; } 
 else if( start >=  9600004  && start <=  12000004  ){ chid = '  17_5  '; } 
 else if( start >=  12000005  && start <=  14400005  ){ chid = '  17_6  '; } 
 else if( start >=  14400006  && start <=  16800006  ){ chid = '  17_7  '; } 
 else if( start >=  16800007  && start <=  19200007  ){ chid = '  17_8  '; } 
 else if( start >=  19200008  && start <=  21600008  ){ chid = '  17_9  '; } 
 else if( start >=  21600009  && start <=  24000009  ){ chid = '  17_10  '; } 
 else if( start >=  24000010  && start <=  26194730  ){ chid = '  17_11  '; } 
 else if( start >=  26194731  && start <=  28389451  ){ chid = '  17_12  '; } 
 else if( start >=  28389452  && start <=  30584172  ){ chid = '  17_13  '; } 
 else if( start >=  30584173  && start <=  32778893  ){ chid = '  17_14  '; } 
 else if( start >=  32778894  && start <=  34973614  ){ chid = '  17_15  '; } 
 else if( start >=  34973615  && start <=  37168335  ){ chid = '  17_16  '; } 
 else if( start >=  37168336  && start <=  39363056  ){ chid = '  17_17  '; } 
 else if( start >=  39363057  && start <=  41557777  ){ chid = '  17_18  '; } 
 else if( start >=  41557778  && start <=  43752498  ){ chid = '  17_19  '; } 
 else if( start >=  43752499  && start <=  45947219  ){ chid = '  17_20  '; } 
 else if( start >=  45947220  && start <=  48141940  ){ chid = '  17_21  '; } 
 else if( start >=  48141941  && start <=  50336661  ){ chid = '  17_22  '; } 
 else if( start >=  50336662  && start <=  52531382  ){ chid = '  17_23  '; } 
 else if( start >=  52531383  && start <=  54726103  ){ chid = '  17_24  '; } 
 else if( start >=  54726104  && start <=  56920824  ){ chid = '  17_25  '; } 
 else if( start >=  56920825  && start <=  59115545  ){ chid = '  17_26  '; } 
 else if( start >=  59115546  && start <=  61310266  ){ chid = '  17_27  '; } 
 else if( start >=  61310267  && start <=  63504987  ){ chid = '  17_28  '; } 
 else if( start >=  63504988  && start <=  65699708  ){ chid = '  17_29  '; } 
 else if( start >=  65699709  && start <=  67894429  ){ chid = '  17_30  '; } 
 else if( start >=  67894430  && start <=  70089150  ){ chid = '  17_31  '; } 
 else if( start >=  70089151  && start <=  72283871  ){ chid = '  17_32  '; } 
 else if( start >=  72283872  && start <=  74478592  ){ chid = '  17_33  '; } 
 else if( start >=  74478593  && start <=  76673313  ){ chid = '  17_34  '; } 
 else if( start >=  76673314  && start <=  78868034  ){ chid = '  17_35  '; } 
 else if( start >=  78868035  && start <=  81062755  ){ chid = '  17_36  '; } 
 else if( start >=  81062756  && start <=  83257441  ){ chid = '  17_37  '; } 
} else if( chr == "chr18") {
  if( start >=  1  && start <=  2457143  ){ chid = '  18_1  '; } 
 else if( start >=  2457144  && start <=  4914287  ){ chid = '  18_2  '; } 
 else if( start >=  4914288  && start <=  7371431  ){ chid = '  18_3  '; } 
 else if( start >=  7371432  && start <=  9828575  ){ chid = '  18_4  '; } 
 else if( start >=  9828576  && start <=  12285719  ){ chid = '  18_5  '; } 
 else if( start >=  12285720  && start <=  14742863  ){ chid = '  18_6  '; } 
 else if( start >=  14742864  && start <=  17200007  ){ chid = '  18_7  '; } 
 else if( start >=  17200008  && start <=  19456197  ){ chid = '  18_8  '; } 
 else if( start >=  19456198  && start <=  21712387  ){ chid = '  18_9  '; } 
 else if( start >=  21712388  && start <=  23968577  ){ chid = '  18_10  '; } 
 else if( start >=  23968578  && start <=  26224767  ){ chid = '  18_11  '; } 
 else if( start >=  26224768  && start <=  28480957  ){ chid = '  18_12  '; } 
 else if( start >=  28480958  && start <=  30737147  ){ chid = '  18_13  '; } 
 else if( start >=  30737148  && start <=  32993337  ){ chid = '  18_14  '; } 
 else if( start >=  32993338  && start <=  35249527  ){ chid = '  18_15  '; } 
 else if( start >=  35249528  && start <=  37505717  ){ chid = '  18_16  '; } 
 else if( start >=  37505718  && start <=  39761907  ){ chid = '  18_17  '; } 
 else if( start >=  39761908  && start <=  42018097  ){ chid = '  18_18  '; } 
 else if( start >=  42018098  && start <=  44274287  ){ chid = '  18_19  '; } 
 else if( start >=  44274288  && start <=  46530477  ){ chid = '  18_20  '; } 
 else if( start >=  46530478  && start <=  48786667  ){ chid = '  18_21  '; } 
 else if( start >=  48786668  && start <=  51042857  ){ chid = '  18_22  '; } 
 else if( start >=  51042858  && start <=  53299047  ){ chid = '  18_23  '; } 
 else if( start >=  53299048  && start <=  55555237  ){ chid = '  18_24  '; } 
 else if( start >=  55555238  && start <=  57811427  ){ chid = '  18_25  '; } 
 else if( start >=  57811428  && start <=  60067617  ){ chid = '  18_26  '; } 
 else if( start >=  60067618  && start <=  62323807  ){ chid = '  18_27  '; } 
 else if( start >=  62323808  && start <=  64579997  ){ chid = '  18_28  '; } 
 else if( start >=  64579998  && start <=  66836187  ){ chid = '  18_29  '; } 
 else if( start >=  66836188  && start <=  69092377  ){ chid = '  18_30  '; } 
 else if( start >=  69092378  && start <=  71348567  ){ chid = '  18_31  '; } 
 else if( start >=  71348568  && start <=  73604757  ){ chid = '  18_32  '; } 
 else if( start >=  73604758  && start <=  75860947  ){ chid = '  18_33  '; } 
 else if( start >=  75860948  && start <=  78117137  ){ chid = '  18_34  '; } 
 else if( start >=  78117138  && start <=  80373285  ){ chid = '  18_35  '; } 
} else if( chr == "chr19") {
  if( start >=  1  && start <=  2038462  ){ chid = '  19_1  '; } 
 else if( start >=  2038463  && start <=  4076925  ){ chid = '  19_2  '; } 
 else if( start >=  4076926  && start <=  6115388  ){ chid = '  19_3  '; } 
 else if( start >=  6115389  && start <=  8153851  ){ chid = '  19_4  '; } 
 else if( start >=  8153852  && start <=  10192314  ){ chid = '  19_5  '; } 
 else if( start >=  10192315  && start <=  12230777  ){ chid = '  19_6  '; } 
 else if( start >=  12230778  && start <=  14269240  ){ chid = '  19_7  '; } 
 else if( start >=  14269241  && start <=  16307703  ){ chid = '  19_8  '; } 
 else if( start >=  16307704  && start <=  18346166  ){ chid = '  19_9  '; } 
 else if( start >=  18346167  && start <=  20384629  ){ chid = '  19_10  '; } 
 else if( start >=  20384630  && start <=  22423092  ){ chid = '  19_11  '; } 
 else if( start >=  22423093  && start <=  24461555  ){ chid = '  19_12  '; } 
 else if( start >=  24461556  && start <=  26500018  ){ chid = '  19_13  '; } 
 else if( start >=  26500019  && start <=  28507370  ){ chid = '  19_14  '; } 
 else if( start >=  28507371  && start <=  30514722  ){ chid = '  19_15  '; } 
 else if( start >=  30514723  && start <=  32522074  ){ chid = '  19_16  '; } 
 else if( start >=  32522075  && start <=  34529426  ){ chid = '  19_17  '; } 
 else if( start >=  34529427  && start <=  36536778  ){ chid = '  19_18  '; } 
 else if( start >=  36536779  && start <=  38544130  ){ chid = '  19_19  '; } 
 else if( start >=  38544131  && start <=  40551482  ){ chid = '  19_20  '; } 
 else if( start >=  40551483  && start <=  42558834  ){ chid = '  19_21  '; } 
 else if( start >=  42558835  && start <=  44566186  ){ chid = '  19_22  '; } 
 else if( start >=  44566187  && start <=  46573538  ){ chid = '  19_23  '; } 
 else if( start >=  46573539  && start <=  48580890  ){ chid = '  19_24  '; } 
 else if( start >=  48580891  && start <=  50588242  ){ chid = '  19_25  '; } 
 else if( start >=  50588243  && start <=  52595594  ){ chid = '  19_26  '; } 
 else if( start >=  52595595  && start <=  54602946  ){ chid = '  19_27  '; } 
 else if( start >=  54602947  && start <=  56610298  ){ chid = '  19_28  '; } 
 else if( start >=  56610299  && start <=  58617616  ){ chid = '  19_29  '; } 
} else if( chr == "chr20") {
  if( start >=  1  && start <=  2291667  ){ chid = '  20_1  '; } 
 else if( start >=  2291668  && start <=  4583335  ){ chid = '  20_2  '; } 
 else if( start >=  4583336  && start <=  6875003  ){ chid = '  20_3  '; } 
 else if( start >=  6875004  && start <=  9166671  ){ chid = '  20_4  '; } 
 else if( start >=  9166672  && start <=  11458339  ){ chid = '  20_5  '; } 
 else if( start >=  11458340  && start <=  13750007  ){ chid = '  20_6  '; } 
 else if( start >=  13750008  && start <=  16041675  ){ chid = '  20_7  '; } 
 else if( start >=  16041676  && start <=  18333343  ){ chid = '  20_8  '; } 
 else if( start >=  18333344  && start <=  20625011  ){ chid = '  20_9  '; } 
 else if( start >=  20625012  && start <=  22916679  ){ chid = '  20_10  '; } 
 else if( start >=  22916680  && start <=  25208347  ){ chid = '  20_11  '; } 
 else if( start >=  25208348  && start <=  27500015  ){ chid = '  20_12  '; } 
 else if( start >=  27500016  && start <=  29809026  ){ chid = '  20_13  '; } 
 else if( start >=  29809027  && start <=  32118037  ){ chid = '  20_14  '; } 
 else if( start >=  32118038  && start <=  34427048  ){ chid = '  20_15  '; } 
 else if( start >=  34427049  && start <=  36736059  ){ chid = '  20_16  '; } 
 else if( start >=  36736060  && start <=  39045070  ){ chid = '  20_17  '; } 
 else if( start >=  39045071  && start <=  41354081  ){ chid = '  20_18  '; } 
 else if( start >=  41354082  && start <=  43663092  ){ chid = '  20_19  '; } 
 else if( start >=  43663093  && start <=  45972103  ){ chid = '  20_20  '; } 
 else if( start >=  45972104  && start <=  48281114  ){ chid = '  20_21  '; } 
 else if( start >=  48281115  && start <=  50590125  ){ chid = '  20_22  '; } 
 else if( start >=  50590126  && start <=  52899136  ){ chid = '  20_23  '; } 
 else if( start >=  52899137  && start <=  55208147  ){ chid = '  20_24  '; } 
 else if( start >=  55208148  && start <=  57517158  ){ chid = '  20_25  '; } 
 else if( start >=  57517159  && start <=  59826169  ){ chid = '  20_26  '; } 
 else if( start >=  59826170  && start <=  62135180  ){ chid = '  20_27  '; } 
 else if( start >=  62135181  && start <=  64444167  ){ chid = '  20_28  '; } 
} else if( chr == "chr21") {
  if( start >=  1  && start <=  2640000  ){ chid = '  21_1  '; } 
 else if( start >=  2640001  && start <=  5280001  ){ chid = '  21_2  '; } 
 else if( start >=  5280002  && start <=  7920002  ){ chid = '  21_3  '; } 
 else if( start >=  7920003  && start <=  10560003  ){ chid = '  21_4  '; } 
 else if( start >=  10560004  && start <=  13200004  ){ chid = '  21_5  '; } 
 else if( start >=  13200005  && start <=  15294379  ){ chid = '  21_6  '; } 
 else if( start >=  15294380  && start <=  17388754  ){ chid = '  21_7  '; } 
 else if( start >=  17388755  && start <=  19483129  ){ chid = '  21_8  '; } 
 else if( start >=  19483130  && start <=  21577504  ){ chid = '  21_9  '; } 
 else if( start >=  21577505  && start <=  23671879  ){ chid = '  21_10  '; } 
 else if( start >=  23671880  && start <=  25766254  ){ chid = '  21_11  '; } 
 else if( start >=  25766255  && start <=  27860629  ){ chid = '  21_12  '; } 
 else if( start >=  27860630  && start <=  29955004  ){ chid = '  21_13  '; } 
 else if( start >=  29955005  && start <=  32049379  ){ chid = '  21_14  '; } 
 else if( start >=  32049380  && start <=  34143754  ){ chid = '  21_15  '; } 
 else if( start >=  34143755  && start <=  36238129  ){ chid = '  21_16  '; } 
 else if( start >=  36238130  && start <=  38332504  ){ chid = '  21_17  '; } 
 else if( start >=  38332505  && start <=  40426879  ){ chid = '  21_18  '; } 
 else if( start >=  40426880  && start <=  42521254  ){ chid = '  21_19  '; } 
 else if( start >=  42521255  && start <=  44615629  ){ chid = '  21_20  '; } 
 else if( start >=  44615630  && start <=  46709983  ){ chid = '  21_21  '; } 
} else if( chr == "chr22") {
  if( start >=  1  && start <=  2940000  ){ chid = '  22_1  '; } 
 else if( start >=  2940001  && start <=  5880001  ){ chid = '  22_2  '; } 
 else if( start >=  5880002  && start <=  8820002  ){ chid = '  22_3  '; } 
 else if( start >=  8820003  && start <=  11760003  ){ chid = '  22_4  '; } 
 else if( start >=  11760004  && start <=  14700004  ){ chid = '  22_5  '; } 
 else if( start >=  14700005  && start <=  16957409  ){ chid = '  22_6  '; } 
 else if( start >=  16957410  && start <=  19214814  ){ chid = '  22_7  '; } 
 else if( start >=  19214815  && start <=  21472219  ){ chid = '  22_8  '; } 
 else if( start >=  21472220  && start <=  23729624  ){ chid = '  22_9  '; } 
 else if( start >=  23729625  && start <=  25987029  ){ chid = '  22_10  '; } 
 else if( start >=  25987030  && start <=  28244434  ){ chid = '  22_11  '; } 
 else if( start >=  28244435  && start <=  30501839  ){ chid = '  22_12  '; } 
 else if( start >=  30501840  && start <=  32759244  ){ chid = '  22_13  '; } 
 else if( start >=  32759245  && start <=  35016649  ){ chid = '  22_14  '; } 
 else if( start >=  35016650  && start <=  37274054  ){ chid = '  22_15  '; } 
 else if( start >=  37274055  && start <=  39531459  ){ chid = '  22_16  '; } 
 else if( start >=  39531460  && start <=  41788864  ){ chid = '  22_17  '; } 
 else if( start >=  41788865  && start <=  44046269  ){ chid = '  22_18  '; } 
 else if( start >=  44046270  && start <=  46303674  ){ chid = '  22_19  '; } 
 else if( start >=  46303675  && start <=  48561079  ){ chid = '  22_20  '; } 
 else if( start >=  48561080  && start <=  50818468  ){ chid = '  22_21  '; } 
} else if( chr == "chrX") {
  if( start >=  1  && start <=  2164286  ){ chid = '  x_1  '; } 
 else if( start >=  2164287  && start <=  4328573  ){ chid = '  x_2  '; } 
 else if( start >=  4328574  && start <=  6492860  ){ chid = '  x_3  '; } 
 else if( start >=  6492861  && start <=  8657147  ){ chid = '  x_4  '; } 
 else if( start >=  8657148  && start <=  10821434  ){ chid = '  x_5  '; } 
 else if( start >=  10821435  && start <=  12985721  ){ chid = '  x_6  '; } 
 else if( start >=  12985722  && start <=  15150008  ){ chid = '  x_7  '; } 
 else if( start >=  15150009  && start <=  17314295  ){ chid = '  x_8  '; } 
 else if( start >=  17314296  && start <=  19478582  ){ chid = '  x_9  '; } 
 else if( start >=  19478583  && start <=  21642869  ){ chid = '  x_10  '; } 
 else if( start >=  21642870  && start <=  23807156  ){ chid = '  x_11  '; } 
 else if( start >=  23807157  && start <=  25971443  ){ chid = '  x_12  '; } 
 else if( start >=  25971444  && start <=  28135730  ){ chid = '  x_13  '; } 
 else if( start >=  28135731  && start <=  30300017  ){ chid = '  x_14  '; } 
 else if( start >=  30300018  && start <=  32464304  ){ chid = '  x_15  '; } 
 else if( start >=  32464305  && start <=  34628591  ){ chid = '  x_16  '; } 
 else if( start >=  34628592  && start <=  36792878  ){ chid = '  x_17  '; } 
 else if( start >=  36792879  && start <=  38957165  ){ chid = '  x_18  '; } 
 else if( start >=  38957166  && start <=  41121452  ){ chid = '  x_19  '; } 
 else if( start >=  41121453  && start <=  43285739  ){ chid = '  x_20  '; } 
 else if( start >=  43285740  && start <=  45450026  ){ chid = '  x_21  '; } 
 else if( start >=  45450027  && start <=  47614313  ){ chid = '  x_22  '; } 
 else if( start >=  47614314  && start <=  49778600  ){ chid = '  x_23  '; } 
 else if( start >=  49778601  && start <=  51942887  ){ chid = '  x_24  '; } 
 else if( start >=  51942888  && start <=  54107174  ){ chid = '  x_25  '; } 
 else if( start >=  54107175  && start <=  56271461  ){ chid = '  x_26  '; } 
 else if( start >=  56271462  && start <=  58435748  ){ chid = '  x_27  '; } 
 else if( start >=  58435749  && start <=  60600035  ){ chid = '  x_28  '; } 
 else if( start >=  60600036  && start <=  62674838  ){ chid = '  x_29  '; } 
 else if( start >=  62674839  && start <=  64749641  ){ chid = '  x_30  '; } 
 else if( start >=  64749642  && start <=  66824444  ){ chid = '  x_31  '; } 
 else if( start >=  66824445  && start <=  68899247  ){ chid = '  x_32  '; } 
 else if( start >=  68899248  && start <=  70974050  ){ chid = '  x_33  '; } 
 else if( start >=  70974051  && start <=  73048853  ){ chid = '  x_34  '; } 
 else if( start >=  73048854  && start <=  75123656  ){ chid = '  x_35  '; } 
 else if( start >=  75123657  && start <=  77198459  ){ chid = '  x_36  '; } 
 else if( start >=  77198460  && start <=  79273262  ){ chid = '  x_37  '; } 
 else if( start >=  79273263  && start <=  81348065  ){ chid = '  x_38  '; } 
 else if( start >=  81348066  && start <=  83422868  ){ chid = '  x_39  '; } 
 else if( start >=  83422869  && start <=  85497671  ){ chid = '  x_40  '; } 
 else if( start >=  85497672  && start <=  87572474  ){ chid = '  x_41  '; } 
 else if( start >=  87572475  && start <=  89647277  ){ chid = '  x_42  '; } 
 else if( start >=  89647278  && start <=  91722080  ){ chid = '  x_43  '; } 
 else if( start >=  91722081  && start <=  93796883  ){ chid = '  x_44  '; } 
 else if( start >=  93796884  && start <=  95871686  ){ chid = '  x_45  '; } 
 else if( start >=  95871687  && start <=  97946489  ){ chid = '  x_46  '; } 
 else if( start >=  97946490  && start <=  100021292  ){ chid = '  x_47  '; } 
 else if( start >=  100021293  && start <=  102096095  ){ chid = '  x_48  '; } 
 else if( start >=  102096096  && start <=  104170898  ){ chid = '  x_49  '; } 
 else if( start >=  104170899  && start <=  106245701  ){ chid = '  x_50  '; } 
 else if( start >=  106245702  && start <=  108320504  ){ chid = '  x_51  '; } 
 else if( start >=  108320505  && start <=  110395307  ){ chid = '  x_52  '; } 
 else if( start >=  110395308  && start <=  112470110  ){ chid = '  x_53  '; } 
 else if( start >=  112470111  && start <=  114544913  ){ chid = '  x_54  '; } 
 else if( start >=  114544914  && start <=  116619716  ){ chid = '  x_55  '; } 
 else if( start >=  116619717  && start <=  118694519  ){ chid = '  x_56  '; } 
 else if( start >=  118694520  && start <=  120769322  ){ chid = '  x_57  '; } 
 else if( start >=  120769323  && start <=  122844125  ){ chid = '  x_58  '; } 
 else if( start >=  122844126  && start <=  124918928  ){ chid = '  x_59  '; } 
 else if( start >=  124918929  && start <=  126993731  ){ chid = '  x_60  '; } 
 else if( start >=  126993732  && start <=  129068534  ){ chid = '  x_61  '; } 
 else if( start >=  129068535  && start <=  131143337  ){ chid = '  x_62  '; } 
 else if( start >=  131143338  && start <=  133218140  ){ chid = '  x_63  '; } 
 else if( start >=  133218141  && start <=  135292943  ){ chid = '  x_64  '; } 
 else if( start >=  135292944  && start <=  137367746  ){ chid = '  x_65  '; } 
 else if( start >=  137367747  && start <=  139442549  ){ chid = '  x_66  '; } 
 else if( start >=  139442550  && start <=  141517352  ){ chid = '  x_67  '; } 
 else if( start >=  141517353  && start <=  143592155  ){ chid = '  x_68  '; } 
 else if( start >=  143592156  && start <=  145666958  ){ chid = '  x_69  '; } 
 else if( start >=  145666959  && start <=  147741761  ){ chid = '  x_70  '; } 
 else if( start >=  147741762  && start <=  149816564  ){ chid = '  x_71  '; } 
 else if( start >=  149816565  && start <=  151891367  ){ chid = '  x_72  '; } 
 else if( start >=  151891368  && start <=  153966170  ){ chid = '  x_73  '; } 
 else if( start >=  153966171  && start <=  156040895  ){ chid = '  x_74  '; } 
} else if( chr == "chrY") {
  if( start >=  1  && start <=  2500000  ){ chid = '  y_1  '; } 
 else if( start >=  2500001  && start <=  5000001  ){ chid = '  y_2  '; } 
 else if( start >=  5000002  && start <=  7500002  ){ chid = '  y_3  '; } 
 else if( start >=  7500003  && start <=  10000003  ){ chid = '  y_4  '; } 
 else if( start >=  10000004  && start <=  12500004  ){ chid = '  y_5  '; } 
 else if( start >=  12500005  && start <=  14533069  ){ chid = '  y_6  '; } 
 else if( start >=  14533070  && start <=  16566134  ){ chid = '  y_7  '; } 
 else if( start >=  16566135  && start <=  18599199  ){ chid = '  y_8  '; } 
 else if( start >=  18599200  && start <=  20632264  ){ chid = '  y_9  '; } 
 else if( start >=  20632265  && start <=  22665329  ){ chid = '  y_10  '; } 
 else if( start >=  22665330  && start <=  24698394  ){ chid = '  y_11  '; } 
 else if( start >=  24698395  && start <=  26731459  ){ chid = '  y_12  '; } 
 else if( start >=  26731460  && start <=  28764524  ){ chid = '  y_13  '; } 
 else if( start >=  28764525  && start <=  30797589  ){ chid = '  y_14  '; } 
 else if( start >=  30797590  && start <=  32830654  ){ chid = '  y_15  '; } 
 else if( start >=  32830655  && start <=  34863719  ){ chid = '  y_16  '; } 
 else if( start >=  34863720  && start <=  36896784  ){ chid = '  y_17  '; } 
 else if( start >=  36896785  && start <=  38929849  ){ chid = '  y_18  '; } 
 else if( start >=  38929850  && start <=  40962914  ){ chid = '  y_19  '; } 
 else if( start >=  40962915  && start <=  42995979  ){ chid = '  y_20  '; } 
 else if( start >=  42995980  && start <=  45029044  ){ chid = '  y_21  '; } 
 else if( start >=  45029045  && start <=  47062109  ){ chid = '  y_22  '; } 
 else if( start >=  47062110  && start <=  49095174  ){ chid = '  y_23  '; } 
 else if( start >=  49095175  && start <=  51128239  ){ chid = '  y_24  '; } 
 else if( start >=  51128240  && start <=  53161304  ){ chid = '  y_25  '; } 
 else if( start >=  53161305  && start <=  55194369  ){ chid = '  y_26  '; } 
 else if( start >=  55194370  && start <=  57227415  ){ chid = '  y_27  '; } 
} else if( chr == "chrMT"  ) {
 if( start ==  577  ){ chid = ' MT_1 '; } 
 else if( start ==  648  ){ chid = ' MT_2 '; } 
 else if( start ==  1602  ){ chid = ' MT_3 '; } 
 else if( start ==  1671  ){ chid = ' MT_4 '; } 
 else if( start ==  3230  ){ chid = ' MT_5 '; } 
 else if( start ==  3307  ){ chid = ' MT_6 '; } 
 else if( start ==  4263  ){ chid = ' MT_7 '; } 
 else if( start ==  4329  ){ chid = ' MT_8 '; } 
 else if( start ==  4402  ){ chid = ' MT_9 '; } 
 else if( start ==  4470  ){ chid = ' MT_10 '; } 
 else if( start ==  5512  ){ chid = ' MT_11 '; } 
 else if( start ==  5587  ){ chid = ' MT_12 '; } 
 else if( start ==  5657  ){ chid = ' MT_13 '; } 
 else if( start ==  5761  ){ chid = ' MT_14 '; } 
 else if( start ==  5826  ){ chid = ' MT_15 '; } 
 else if( start ==  5904  ){ chid = ' MT_16 '; } 
 else if( start ==  7446  ){ chid = ' MT_17 '; } 
 else if( start ==  7518  ){ chid = ' MT_18 '; } 
 else if( start ==  7586  ){ chid = ' MT_19 '; } 
 else if( start ==  8295  ){ chid = ' MT_20 '; } 
 else if( start ==  8366  ){ chid = ' MT_21 '; } 
 else if( start ==  8527  ){ chid = ' MT_22 '; } 
 else if( start ==  9207  ){ chid = ' MT_23 '; } 
 else if( start ==  9991  ){ chid = ' MT_24 '; } 
 else if( start ==  10059  ){ chid = ' MT_25 '; } 
 else if( start ==  10405  ){ chid = ' MT_26 '; } 
 else if( start ==  10470  ){ chid = ' MT_27 '; } 
 else if( start ==  10760  ){ chid = ' MT_28 '; } 
 else if( start ==  12138  ){ chid = ' MT_29 '; } 
 else if( start ==  12207  ){ chid = ' MT_30 '; } 
 else if( start ==  12266  ){ chid = ' MT_31 '; } 
 else if( start ==  12337  ){ chid = ' MT_32 '; } 
 else if( start ==  14149  ){ chid = ' MT_33 '; } 
 else if( start ==  14674  ){ chid = ' MT_34 '; } 
 else if( start ==  14747  ){ chid = ' MT_35 '; } 
 else if( start ==  15888  ){ chid = ' MT_36 '; } 
 else if( start ==  15956  ){ chid = ' MT_37 '; } 	
}	
	
	return chid.trim();
	
	
	 }




 
function getRange(loc) {
  var range = '';

   if( loc === '1_1'  ){ range = '1 - 2049180 bp'; }
 else if( loc === '1_2'  ){ range = '2049181 - 4098361 bp'; }
 else if( loc === '1_3'  ){ range = '4098362 - 6147542 bp'; }
 else if( loc === '1_4'  ){ range = '6147543 - 8196723 bp'; }
 else if( loc === '1_5'  ){ range = '8196724 - 10245904 bp'; }
 else if( loc === '1_6'  ){ range = '10245905 - 12295085 bp'; }
 else if( loc === '1_7'  ){ range = '12295086 - 14344266 bp'; }
 else if( loc === '1_8'  ){ range = '14344267 - 16393447 bp'; }
 else if( loc === '1_9'  ){ range = '16393448 - 18442628 bp'; }
 else if( loc === '1_10'  ){ range = '18442629 - 20491809 bp'; }
 else if( loc === '1_11'  ){ range = '20491810 - 22540990 bp'; }
 else if( loc === '1_12'  ){ range = '22540991 - 24590171 bp'; }
 else if( loc === '1_13'  ){ range = '24590172 - 26639352 bp'; }
 else if( loc === '1_14'  ){ range = '26639353 - 28688533 bp'; }
 else if( loc === '1_15'  ){ range = '28688534 - 30737714 bp'; }
 else if( loc === '1_16'  ){ range = '30737715 - 32786895 bp'; }
 else if( loc === '1_17'  ){ range = '32786896 - 34836076 bp'; }
 else if( loc === '1_18'  ){ range = '34836077 - 36885257 bp'; }
 else if( loc === '1_19'  ){ range = '36885258 - 38934438 bp'; }
 else if( loc === '1_20'  ){ range = '38934439 - 40983619 bp'; }
 else if( loc === '1_21'  ){ range = '40983620 - 43032800 bp'; }
 else if( loc === '1_22'  ){ range = '43032801 - 45081981 bp'; }
 else if( loc === '1_23'  ){ range = '45081982 - 47131162 bp'; }
 else if( loc === '1_24'  ){ range = '47131163 - 49180343 bp'; }
 else if( loc === '1_25'  ){ range = '49180344 - 51229524 bp'; }
 else if( loc === '1_26'  ){ range = '51229525 - 53278705 bp'; }
 else if( loc === '1_27'  ){ range = '53278706 - 55327886 bp'; }
 else if( loc === '1_28'  ){ range = '55327887 - 57377067 bp'; }
 else if( loc === '1_29'  ){ range = '57377068 - 59426248 bp'; }
 else if( loc === '1_30'  ){ range = '59426249 - 61475429 bp'; }
 else if( loc === '1_31'  ){ range = '61475430 - 63524610 bp'; }
 else if( loc === '1_32'  ){ range = '63524611 - 65573791 bp'; }
 else if( loc === '1_33'  ){ range = '65573792 - 67622972 bp'; }
 else if( loc === '1_34'  ){ range = '67622973 - 69672153 bp'; }
 else if( loc === '1_35'  ){ range = '69672154 - 71721334 bp'; }
 else if( loc === '1_36'  ){ range = '71721335 - 73770515 bp'; }
 else if( loc === '1_37'  ){ range = '73770516 - 75819696 bp'; }
 else if( loc === '1_38'  ){ range = '75819697 - 77868877 bp'; }
 else if( loc === '1_39'  ){ range = '77868878 - 79918058 bp'; }
 else if( loc === '1_40'  ){ range = '79918059 - 81967239 bp'; }
 else if( loc === '1_41'  ){ range = '81967240 - 84016420 bp'; }
 else if( loc === '1_42'  ){ range = '84016421 - 86065601 bp'; }
 else if( loc === '1_43'  ){ range = '86065602 - 88114782 bp'; }
 else if( loc === '1_44'  ){ range = '88114783 - 90163963 bp'; }
 else if( loc === '1_45'  ){ range = '90163964 - 92213144 bp'; }
 else if( loc === '1_46'  ){ range = '92213145 - 94262325 bp'; }
 else if( loc === '1_47'  ){ range = '94262326 - 96311506 bp'; }
 else if( loc === '1_48'  ){ range = '96311507 - 98360687 bp'; }
 else if( loc === '1_49'  ){ range = '98360688 - 100409868 bp'; }
 else if( loc === '1_50'  ){ range = '100409869 - 102459049 bp'; }
 else if( loc === '1_51'  ){ range = '102459050 - 104508230 bp'; }
 else if( loc === '1_52'  ){ range = '104508231 - 106557411 bp'; }
 else if( loc === '1_53'  ){ range = '106557412 - 108606592 bp'; }
 else if( loc === '1_54'  ){ range = '108606593 - 110655773 bp'; }
 else if( loc === '1_55'  ){ range = '110655774 - 112704954 bp'; }
 else if( loc === '1_56'  ){ range = '112704955 - 114754135 bp'; }
 else if( loc === '1_57'  ){ range = '114754136 - 116803316 bp'; }
 else if( loc === '1_58'  ){ range = '116803317 - 118852497 bp'; }
 else if( loc === '1_59'  ){ range = '118852498 - 120901678 bp'; }
 else if( loc === '1_60'  ){ range = '120901679 - 122950859 bp'; }
 else if( loc === '1_61'  ){ range = '122950860 - 1.25e+08 bp'; }
 else if( loc === '1_62'  ){ range = '1.25e+08 - 127065981 bp'; }
 else if( loc === '1_63'  ){ range = '127065982 - 129131922 bp'; }
 else if( loc === '1_64'  ){ range = '129131923 - 131197863 bp'; }
 else if( loc === '1_65'  ){ range = '131197864 - 133263804 bp'; }
 else if( loc === '1_66'  ){ range = '133263805 - 135329745 bp'; }
 else if( loc === '1_67'  ){ range = '135329746 - 137395686 bp'; }
 else if( loc === '1_68'  ){ range = '137395687 - 139461627 bp'; }
 else if( loc === '1_69'  ){ range = '139461628 - 141527568 bp'; }
 else if( loc === '1_70'  ){ range = '141527569 - 143593509 bp'; }
 else if( loc === '1_71'  ){ range = '143593510 - 145659450 bp'; }
 else if( loc === '1_72'  ){ range = '145659451 - 147725391 bp'; }
 else if( loc === '1_73'  ){ range = '147725392 - 149791332 bp'; }
 else if( loc === '1_74'  ){ range = '149791333 - 151857273 bp'; }
 else if( loc === '1_75'  ){ range = '151857274 - 153923214 bp'; }
 else if( loc === '1_76'  ){ range = '153923215 - 155989155 bp'; }
 else if( loc === '1_77'  ){ range = '155989156 - 158055096 bp'; }
 else if( loc === '1_78'  ){ range = '158055097 - 160121037 bp'; }
 else if( loc === '1_79'  ){ range = '160121038 - 162186978 bp'; }
 else if( loc === '1_80'  ){ range = '162186979 - 164252919 bp'; }
 else if( loc === '1_81'  ){ range = '164252920 - 166318860 bp'; }
 else if( loc === '1_82'  ){ range = '166318861 - 168384801 bp'; }
 else if( loc === '1_83'  ){ range = '168384802 - 170450742 bp'; }
 else if( loc === '1_84'  ){ range = '170450743 - 172516683 bp'; }
 else if( loc === '1_85'  ){ range = '172516684 - 174582624 bp'; }
 else if( loc === '1_86'  ){ range = '174582625 - 176648565 bp'; }
 else if( loc === '1_87'  ){ range = '176648566 - 178714506 bp'; }
 else if( loc === '1_88'  ){ range = '178714507 - 180780447 bp'; }
 else if( loc === '1_89'  ){ range = '180780448 - 182846388 bp'; }
 else if( loc === '1_90'  ){ range = '182846389 - 184912329 bp'; }
 else if( loc === '1_91'  ){ range = '184912330 - 186978270 bp'; }
 else if( loc === '1_92'  ){ range = '186978271 - 189044211 bp'; }
 else if( loc === '1_93'  ){ range = '189044212 - 191110152 bp'; }
 else if( loc === '1_94'  ){ range = '191110153 - 193176093 bp'; }
 else if( loc === '1_95'  ){ range = '193176094 - 195242034 bp'; }
 else if( loc === '1_96'  ){ range = '195242035 - 197307975 bp'; }
 else if( loc === '1_97'  ){ range = '197307976 - 199373916 bp'; }
 else if( loc === '1_98'  ){ range = '199373917 - 201439857 bp'; }
 else if( loc === '1_99'  ){ range = '201439858 - 203505798 bp'; }
 else if( loc === '1_100'  ){ range = '203505799 - 205571739 bp'; }
 else if( loc === '1_101'  ){ range = '205571740 - 207637680 bp'; }
 else if( loc === '1_102'  ){ range = '207637681 - 209703621 bp'; }
 else if( loc === '1_103'  ){ range = '209703622 - 211769562 bp'; }
 else if( loc === '1_104'  ){ range = '211769563 - 213835503 bp'; }
 else if( loc === '1_105'  ){ range = '213835504 - 215901444 bp'; }
 else if( loc === '1_106'  ){ range = '215901445 - 217967385 bp'; }
 else if( loc === '1_107'  ){ range = '217967386 - 220033326 bp'; }
 else if( loc === '1_108'  ){ range = '220033327 - 222099267 bp'; }
 else if( loc === '1_109'  ){ range = '222099268 - 224165208 bp'; }
 else if( loc === '1_110'  ){ range = '224165209 - 226231149 bp'; }
 else if( loc === '1_111'  ){ range = '226231150 - 228297090 bp'; }
 else if( loc === '1_112'  ){ range = '228297091 - 230363031 bp'; }
 else if( loc === '1_113'  ){ range = '230363032 - 232428972 bp'; }
 else if( loc === '1_114'  ){ range = '232428973 - 234494913 bp'; }
 else if( loc === '1_115'  ){ range = '234494914 - 236560854 bp'; }
 else if( loc === '1_116'  ){ range = '236560855 - 238626795 bp'; }
 else if( loc === '1_117'  ){ range = '238626796 - 240692736 bp'; }
 else if( loc === '1_118'  ){ range = '240692737 - 242758677 bp'; }
 else if( loc === '1_119'  ){ range = '242758678 - 244824618 bp'; }
 else if( loc === '1_120'  ){ range = '244824619 - 246890559 bp'; }
 else if( loc === '1_121'  ){ range = '246890560 - 248956422 bp'; }
 else if( loc === '2_1'  ){ range = '1 - 2073333 bp'; }
 else if( loc === '2_2'  ){ range = '2073334 - 4146667 bp'; }
 else if( loc === '2_3'  ){ range = '4146668 - 6220001 bp'; }
 else if( loc === '2_4'  ){ range = '6220002 - 8293335 bp'; }
 else if( loc === '2_5'  ){ range = '8293336 - 10366669 bp'; }
 else if( loc === '2_6'  ){ range = '10366670 - 12440003 bp'; }
 else if( loc === '2_7'  ){ range = '12440004 - 14513337 bp'; }
 else if( loc === '2_8'  ){ range = '14513338 - 16586671 bp'; }
 else if( loc === '2_9'  ){ range = '16586672 - 18660005 bp'; }
 else if( loc === '2_10'  ){ range = '18660006 - 20733339 bp'; }
 else if( loc === '2_11'  ){ range = '20733340 - 22806673 bp'; }
 else if( loc === '2_12'  ){ range = '22806674 - 24880007 bp'; }
 else if( loc === '2_13'  ){ range = '24880008 - 26953341 bp'; }
 else if( loc === '2_14'  ){ range = '26953342 - 29026675 bp'; }
 else if( loc === '2_15'  ){ range = '29026676 - 31100009 bp'; }
 else if( loc === '2_16'  ){ range = '31100010 - 33173343 bp'; }
 else if( loc === '2_17'  ){ range = '33173344 - 35246677 bp'; }
 else if( loc === '2_18'  ){ range = '35246678 - 37320011 bp'; }
 else if( loc === '2_19'  ){ range = '37320012 - 39393345 bp'; }
 else if( loc === '2_20'  ){ range = '39393346 - 41466679 bp'; }
 else if( loc === '2_21'  ){ range = '41466680 - 43540013 bp'; }
 else if( loc === '2_22'  ){ range = '43540014 - 45613347 bp'; }
 else if( loc === '2_23'  ){ range = '45613348 - 47686681 bp'; }
 else if( loc === '2_24'  ){ range = '47686682 - 49760015 bp'; }
 else if( loc === '2_25'  ){ range = '49760016 - 51833349 bp'; }
 else if( loc === '2_26'  ){ range = '51833350 - 53906683 bp'; }
 else if( loc === '2_27'  ){ range = '53906684 - 55980017 bp'; }
 else if( loc === '2_28'  ){ range = '55980018 - 58053351 bp'; }
 else if( loc === '2_29'  ){ range = '58053352 - 60126685 bp'; }
 else if( loc === '2_30'  ){ range = '60126686 - 62200019 bp'; }
 else if( loc === '2_31'  ){ range = '62200020 - 64273353 bp'; }
 else if( loc === '2_32'  ){ range = '64273354 - 66346687 bp'; }
 else if( loc === '2_33'  ){ range = '66346688 - 68420021 bp'; }
 else if( loc === '2_34'  ){ range = '68420022 - 70493355 bp'; }
 else if( loc === '2_35'  ){ range = '70493356 - 72566689 bp'; }
 else if( loc === '2_36'  ){ range = '72566690 - 74640023 bp'; }
 else if( loc === '2_37'  ){ range = '74640024 - 76713357 bp'; }
 else if( loc === '2_38'  ){ range = '76713358 - 78786691 bp'; }
 else if( loc === '2_39'  ){ range = '78786692 - 80860025 bp'; }
 else if( loc === '2_40'  ){ range = '80860026 - 82933359 bp'; }
 else if( loc === '2_41'  ){ range = '82933360 - 85006693 bp'; }
 else if( loc === '2_42'  ){ range = '85006694 - 87080027 bp'; }
 else if( loc === '2_43'  ){ range = '87080028 - 89153361 bp'; }
 else if( loc === '2_44'  ){ range = '89153362 - 91226695 bp'; }
 else if( loc === '2_45'  ){ range = '91226696 - 93300029 bp'; }
 else if( loc === '2_46'  ){ range = '93300030 - 95312105 bp'; }
 else if( loc === '2_47'  ){ range = '95312106 - 97324181 bp'; }
 else if( loc === '2_48'  ){ range = '97324182 - 99336257 bp'; }
 else if( loc === '2_49'  ){ range = '99336258 - 101348333 bp'; }
 else if( loc === '2_50'  ){ range = '101348334 - 103360409 bp'; }
 else if( loc === '2_51'  ){ range = '103360410 - 105372485 bp'; }
 else if( loc === '2_52'  ){ range = '105372486 - 107384561 bp'; }
 else if( loc === '2_53'  ){ range = '107384562 - 109396637 bp'; }
 else if( loc === '2_54'  ){ range = '109396638 - 111408713 bp'; }
 else if( loc === '2_55'  ){ range = '111408714 - 113420789 bp'; }
 else if( loc === '2_56'  ){ range = '113420790 - 115432865 bp'; }
 else if( loc === '2_57'  ){ range = '115432866 - 117444941 bp'; }
 else if( loc === '2_58'  ){ range = '117444942 - 119457017 bp'; }
 else if( loc === '2_59'  ){ range = '119457018 - 121469093 bp'; }
 else if( loc === '2_60'  ){ range = '121469094 - 123481169 bp'; }
 else if( loc === '2_61'  ){ range = '123481170 - 125493245 bp'; }
 else if( loc === '2_62'  ){ range = '125493246 - 127505321 bp'; }
 else if( loc === '2_63'  ){ range = '127505322 - 129517397 bp'; }
 else if( loc === '2_64'  ){ range = '129517398 - 131529473 bp'; }
 else if( loc === '2_65'  ){ range = '131529474 - 133541549 bp'; }
 else if( loc === '2_66'  ){ range = '133541550 - 135553625 bp'; }
 else if( loc === '2_67'  ){ range = '135553626 - 137565701 bp'; }
 else if( loc === '2_68'  ){ range = '137565702 - 139577777 bp'; }
 else if( loc === '2_69'  ){ range = '139577778 - 141589853 bp'; }
 else if( loc === '2_70'  ){ range = '141589854 - 143601929 bp'; }
 else if( loc === '2_71'  ){ range = '143601930 - 145614005 bp'; }
 else if( loc === '2_72'  ){ range = '145614006 - 147626081 bp'; }
 else if( loc === '2_73'  ){ range = '147626082 - 149638157 bp'; }
 else if( loc === '2_74'  ){ range = '149638158 - 151650233 bp'; }
 else if( loc === '2_75'  ){ range = '151650234 - 153662309 bp'; }
 else if( loc === '2_76'  ){ range = '153662310 - 155674385 bp'; }
 else if( loc === '2_77'  ){ range = '155674386 - 157686461 bp'; }
 else if( loc === '2_78'  ){ range = '157686462 - 159698537 bp'; }
 else if( loc === '2_79'  ){ range = '159698538 - 161710613 bp'; }
 else if( loc === '2_80'  ){ range = '161710614 - 163722689 bp'; }
 else if( loc === '2_81'  ){ range = '163722690 - 165734765 bp'; }
 else if( loc === '2_82'  ){ range = '165734766 - 167746841 bp'; }
 else if( loc === '2_83'  ){ range = '167746842 - 169758917 bp'; }
 else if( loc === '2_84'  ){ range = '169758918 - 171770993 bp'; }
 else if( loc === '2_85'  ){ range = '171770994 - 173783069 bp'; }
 else if( loc === '2_86'  ){ range = '173783070 - 175795145 bp'; }
 else if( loc === '2_87'  ){ range = '175795146 - 177807221 bp'; }
 else if( loc === '2_88'  ){ range = '177807222 - 179819297 bp'; }
 else if( loc === '2_89'  ){ range = '179819298 - 181831373 bp'; }
 else if( loc === '2_90'  ){ range = '181831374 - 183843449 bp'; }
 else if( loc === '2_91'  ){ range = '183843450 - 185855525 bp'; }
 else if( loc === '2_92'  ){ range = '185855526 - 187867601 bp'; }
 else if( loc === '2_93'  ){ range = '187867602 - 189879677 bp'; }
 else if( loc === '2_94'  ){ range = '189879678 - 191891753 bp'; }
 else if( loc === '2_95'  ){ range = '191891754 - 193903829 bp'; }
 else if( loc === '2_96'  ){ range = '193903830 - 195915905 bp'; }
 else if( loc === '2_97'  ){ range = '195915906 - 197927981 bp'; }
 else if( loc === '2_98'  ){ range = '197927982 - 199940057 bp'; }
 else if( loc === '2_99'  ){ range = '199940058 - 201952133 bp'; }
 else if( loc === '2_100'  ){ range = '201952134 - 203964209 bp'; }
 else if( loc === '2_101'  ){ range = '203964210 - 205976285 bp'; }
 else if( loc === '2_102'  ){ range = '205976286 - 207988361 bp'; }
 else if( loc === '2_103'  ){ range = '207988362 - 210000437 bp'; }
 else if( loc === '2_104'  ){ range = '210000438 - 212012513 bp'; }
 else if( loc === '2_105'  ){ range = '212012514 - 214024589 bp'; }
 else if( loc === '2_106'  ){ range = '214024590 - 216036665 bp'; }
 else if( loc === '2_107'  ){ range = '216036666 - 218048741 bp'; }
 else if( loc === '2_108'  ){ range = '218048742 - 220060817 bp'; }
 else if( loc === '2_109'  ){ range = '220060818 - 222072893 bp'; }
 else if( loc === '2_110'  ){ range = '222072894 - 224084969 bp'; }
 else if( loc === '2_111'  ){ range = '224084970 - 226097045 bp'; }
 else if( loc === '2_112'  ){ range = '226097046 - 228109121 bp'; }
 else if( loc === '2_113'  ){ range = '228109122 - 230121197 bp'; }
 else if( loc === '2_114'  ){ range = '230121198 - 232133273 bp'; }
 else if( loc === '2_115'  ){ range = '232133274 - 234145349 bp'; }
 else if( loc === '2_116'  ){ range = '234145350 - 236157425 bp'; }
 else if( loc === '2_117'  ){ range = '236157426 - 238169501 bp'; }
 else if( loc === '2_118'  ){ range = '238169502 - 240181577 bp'; }
 else if( loc === '2_119'  ){ range = '240181578 - 242193529 bp'; }
 else if( loc === '3_1'  ){ range = '1 - 2394737 bp'; }
 else if( loc === '3_2'  ){ range = '2394738 - 4789475 bp'; }
 else if( loc === '3_3'  ){ range = '4789476 - 7184213 bp'; }
 else if( loc === '3_4'  ){ range = '7184214 - 9578951 bp'; }
 else if( loc === '3_5'  ){ range = '9578952 - 11973689 bp'; }
 else if( loc === '3_6'  ){ range = '11973690 - 14368427 bp'; }
 else if( loc === '3_7'  ){ range = '14368428 - 16763165 bp'; }
 else if( loc === '3_8'  ){ range = '16763166 - 19157903 bp'; }
 else if( loc === '3_9'  ){ range = '19157904 - 21552641 bp'; }
 else if( loc === '3_10'  ){ range = '21552642 - 23947379 bp'; }
 else if( loc === '3_11'  ){ range = '23947380 - 26342117 bp'; }
 else if( loc === '3_12'  ){ range = '26342118 - 28736855 bp'; }
 else if( loc === '3_13'  ){ range = '28736856 - 31131593 bp'; }
 else if( loc === '3_14'  ){ range = '31131594 - 33526331 bp'; }
 else if( loc === '3_15'  ){ range = '33526332 - 35921069 bp'; }
 else if( loc === '3_16'  ){ range = '35921070 - 38315807 bp'; }
 else if( loc === '3_17'  ){ range = '38315808 - 40710545 bp'; }
 else if( loc === '3_18'  ){ range = '40710546 - 43105283 bp'; }
 else if( loc === '3_19'  ){ range = '43105284 - 45500021 bp'; }
 else if( loc === '3_20'  ){ range = '45500022 - 47894759 bp'; }
 else if( loc === '3_21'  ){ range = '47894760 - 50289497 bp'; }
 else if( loc === '3_22'  ){ range = '50289498 - 52684235 bp'; }
 else if( loc === '3_23'  ){ range = '52684236 - 55078973 bp'; }
 else if( loc === '3_24'  ){ range = '55078974 - 57473711 bp'; }
 else if( loc === '3_25'  ){ range = '57473712 - 59868449 bp'; }
 else if( loc === '3_26'  ){ range = '59868450 - 62263187 bp'; }
 else if( loc === '3_27'  ){ range = '62263188 - 64657925 bp'; }
 else if( loc === '3_28'  ){ range = '64657926 - 67052663 bp'; }
 else if( loc === '3_29'  ){ range = '67052664 - 69447401 bp'; }
 else if( loc === '3_30'  ){ range = '69447402 - 71842139 bp'; }
 else if( loc === '3_31'  ){ range = '71842140 - 74236877 bp'; }
 else if( loc === '3_32'  ){ range = '74236878 - 76631615 bp'; }
 else if( loc === '3_33'  ){ range = '76631616 - 79026353 bp'; }
 else if( loc === '3_34'  ){ range = '79026354 - 81421091 bp'; }
 else if( loc === '3_35'  ){ range = '81421092 - 83815829 bp'; }
 else if( loc === '3_36'  ){ range = '83815830 - 86210567 bp'; }
 else if( loc === '3_37'  ){ range = '86210568 - 88605305 bp'; }
 else if( loc === '3_38'  ){ range = '88605306 - 91000043 bp'; }
 else if( loc === '3_39'  ){ range = '91000044 - 92986999 bp'; }
 else if( loc === '3_40'  ){ range = '92987000 - 94973955 bp'; }
 else if( loc === '3_41'  ){ range = '94973956 - 96960911 bp'; }
 else if( loc === '3_42'  ){ range = '96960912 - 98947867 bp'; }
 else if( loc === '3_43'  ){ range = '98947868 - 100934823 bp'; }
 else if( loc === '3_44'  ){ range = '100934824 - 102921779 bp'; }
 else if( loc === '3_45'  ){ range = '102921780 - 104908735 bp'; }
 else if( loc === '3_46'  ){ range = '104908736 - 106895691 bp'; }
 else if( loc === '3_47'  ){ range = '106895692 - 108882647 bp'; }
 else if( loc === '3_48'  ){ range = '108882648 - 110869603 bp'; }
 else if( loc === '3_49'  ){ range = '110869604 - 112856559 bp'; }
 else if( loc === '3_50'  ){ range = '112856560 - 114843515 bp'; }
 else if( loc === '3_51'  ){ range = '114843516 - 116830471 bp'; }
 else if( loc === '3_52'  ){ range = '116830472 - 118817427 bp'; }
 else if( loc === '3_53'  ){ range = '118817428 - 120804383 bp'; }
 else if( loc === '3_54'  ){ range = '120804384 - 122791339 bp'; }
 else if( loc === '3_55'  ){ range = '122791340 - 124778295 bp'; }
 else if( loc === '3_56'  ){ range = '124778296 - 126765251 bp'; }
 else if( loc === '3_57'  ){ range = '126765252 - 128752207 bp'; }
 else if( loc === '3_58'  ){ range = '128752208 - 130739163 bp'; }
 else if( loc === '3_59'  ){ range = '130739164 - 132726119 bp'; }
 else if( loc === '3_60'  ){ range = '132726120 - 134713075 bp'; }
 else if( loc === '3_61'  ){ range = '134713076 - 136700031 bp'; }
 else if( loc === '3_62'  ){ range = '136700032 - 138686987 bp'; }
 else if( loc === '3_63'  ){ range = '138686988 - 140673943 bp'; }
 else if( loc === '3_64'  ){ range = '140673944 - 142660899 bp'; }
 else if( loc === '3_65'  ){ range = '142660900 - 144647855 bp'; }
 else if( loc === '3_66'  ){ range = '144647856 - 146634811 bp'; }
 else if( loc === '3_67'  ){ range = '146634812 - 148621767 bp'; }
 else if( loc === '3_68'  ){ range = '148621768 - 150608723 bp'; }
 else if( loc === '3_69'  ){ range = '150608724 - 152595679 bp'; }
 else if( loc === '3_70'  ){ range = '152595680 - 154582635 bp'; }
 else if( loc === '3_71'  ){ range = '154582636 - 156569591 bp'; }
 else if( loc === '3_72'  ){ range = '156569592 - 158556547 bp'; }
 else if( loc === '3_73'  ){ range = '158556548 - 160543503 bp'; }
 else if( loc === '3_74'  ){ range = '160543504 - 162530459 bp'; }
 else if( loc === '3_75'  ){ range = '162530460 - 164517415 bp'; }
 else if( loc === '3_76'  ){ range = '164517416 - 166504371 bp'; }
 else if( loc === '3_77'  ){ range = '166504372 - 168491327 bp'; }
 else if( loc === '3_78'  ){ range = '168491328 - 170478283 bp'; }
 else if( loc === '3_79'  ){ range = '170478284 - 172465239 bp'; }
 else if( loc === '3_80'  ){ range = '172465240 - 174452195 bp'; }
 else if( loc === '3_81'  ){ range = '174452196 - 176439151 bp'; }
 else if( loc === '3_82'  ){ range = '176439152 - 178426107 bp'; }
 else if( loc === '3_83'  ){ range = '178426108 - 180413063 bp'; }
 else if( loc === '3_84'  ){ range = '180413064 - 182400019 bp'; }
 else if( loc === '3_85'  ){ range = '182400020 - 184386975 bp'; }
 else if( loc === '3_86'  ){ range = '184386976 - 186373931 bp'; }
 else if( loc === '3_87'  ){ range = '186373932 - 188360887 bp'; }
 else if( loc === '3_88'  ){ range = '188360888 - 190347843 bp'; }
 else if( loc === '3_89'  ){ range = '190347844 - 192334799 bp'; }
 else if( loc === '3_90'  ){ range = '192334800 - 194321755 bp'; }
 else if( loc === '3_91'  ){ range = '194321756 - 196308711 bp'; }
 else if( loc === '3_92'  ){ range = '196308712 - 198295559 bp'; }
 else if( loc === '4_1'  ){ range = '1 - 2100000 bp'; }
 else if( loc === '4_2'  ){ range = '2100001 - 4200001 bp'; }
 else if( loc === '4_3'  ){ range = '4200002 - 6300002 bp'; }
 else if( loc === '4_4'  ){ range = '6300003 - 8400003 bp'; }
 else if( loc === '4_5'  ){ range = '8400004 - 10500004 bp'; }
 else if( loc === '4_6'  ){ range = '10500005 - 12600005 bp'; }
 else if( loc === '4_7'  ){ range = '12600006 - 14700006 bp'; }
 else if( loc === '4_8'  ){ range = '14700007 - 16800007 bp'; }
 else if( loc === '4_9'  ){ range = '16800008 - 18900008 bp'; }
 else if( loc === '4_10'  ){ range = '18900009 - 21000009 bp'; }
 else if( loc === '4_11'  ){ range = '21000010 - 23100010 bp'; }
 else if( loc === '4_12'  ){ range = '23100011 - 25200011 bp'; }
 else if( loc === '4_13'  ){ range = '25200012 - 27300012 bp'; }
 else if( loc === '4_14'  ){ range = '27300013 - 29400013 bp'; }
 else if( loc === '4_15'  ){ range = '29400014 - 31500014 bp'; }
 else if( loc === '4_16'  ){ range = '31500015 - 33600015 bp'; }
 else if( loc === '4_17'  ){ range = '33600016 - 35700016 bp'; }
 else if( loc === '4_18'  ){ range = '35700017 - 37800017 bp'; }
 else if( loc === '4_19'  ){ range = '37800018 - 39900018 bp'; }
 else if( loc === '4_20'  ){ range = '39900019 - 42000019 bp'; }
 else if( loc === '4_21'  ){ range = '42000020 - 44100020 bp'; }
 else if( loc === '4_22'  ){ range = '44100021 - 46200021 bp'; }
 else if( loc === '4_23'  ){ range = '46200022 - 48300022 bp'; }
 else if( loc === '4_24'  ){ range = '48300023 - 50400023 bp'; }
 else if( loc === '4_25'  ){ range = '50400024 - 52397375 bp'; }
 else if( loc === '4_26'  ){ range = '52397376 - 54394727 bp'; }
 else if( loc === '4_27'  ){ range = '54394728 - 56392079 bp'; }
 else if( loc === '4_28'  ){ range = '56392080 - 58389431 bp'; }
 else if( loc === '4_29'  ){ range = '58389432 - 60386783 bp'; }
 else if( loc === '4_30'  ){ range = '60386784 - 62384135 bp'; }
 else if( loc === '4_31'  ){ range = '62384136 - 64381487 bp'; }
 else if( loc === '4_32'  ){ range = '64381488 - 66378839 bp'; }
 else if( loc === '4_33'  ){ range = '66378840 - 68376191 bp'; }
 else if( loc === '4_34'  ){ range = '68376192 - 70373543 bp'; }
 else if( loc === '4_35'  ){ range = '70373544 - 72370895 bp'; }
 else if( loc === '4_36'  ){ range = '72370896 - 74368247 bp'; }
 else if( loc === '4_37'  ){ range = '74368248 - 76365599 bp'; }
 else if( loc === '4_38'  ){ range = '76365600 - 78362951 bp'; }
 else if( loc === '4_39'  ){ range = '78362952 - 80360303 bp'; }
 else if( loc === '4_40'  ){ range = '80360304 - 82357655 bp'; }
 else if( loc === '4_41'  ){ range = '82357656 - 84355007 bp'; }
 else if( loc === '4_42'  ){ range = '84355008 - 86352359 bp'; }
 else if( loc === '4_43'  ){ range = '86352360 - 88349711 bp'; }
 else if( loc === '4_44'  ){ range = '88349712 - 90347063 bp'; }
 else if( loc === '4_45'  ){ range = '90347064 - 92344415 bp'; }
 else if( loc === '4_46'  ){ range = '92344416 - 94341767 bp'; }
 else if( loc === '4_47'  ){ range = '94341768 - 96339119 bp'; }
 else if( loc === '4_48'  ){ range = '96339120 - 98336471 bp'; }
 else if( loc === '4_49'  ){ range = '98336472 - 100333823 bp'; }
 else if( loc === '4_50'  ){ range = '100333824 - 102331175 bp'; }
 else if( loc === '4_51'  ){ range = '102331176 - 104328527 bp'; }
 else if( loc === '4_52'  ){ range = '104328528 - 106325879 bp'; }
 else if( loc === '4_53'  ){ range = '106325880 - 108323231 bp'; }
 else if( loc === '4_54'  ){ range = '108323232 - 110320583 bp'; }
 else if( loc === '4_55'  ){ range = '110320584 - 112317935 bp'; }
 else if( loc === '4_56'  ){ range = '112317936 - 114315287 bp'; }
 else if( loc === '4_57'  ){ range = '114315288 - 116312639 bp'; }
 else if( loc === '4_58'  ){ range = '116312640 - 118309991 bp'; }
 else if( loc === '4_59'  ){ range = '118309992 - 120307343 bp'; }
 else if( loc === '4_60'  ){ range = '120307344 - 122304695 bp'; }
 else if( loc === '4_61'  ){ range = '122304696 - 124302047 bp'; }
 else if( loc === '4_62'  ){ range = '124302048 - 126299399 bp'; }
 else if( loc === '4_63'  ){ range = '126299400 - 128296751 bp'; }
 else if( loc === '4_64'  ){ range = '128296752 - 130294103 bp'; }
 else if( loc === '4_65'  ){ range = '130294104 - 132291455 bp'; }
 else if( loc === '4_66'  ){ range = '132291456 - 134288807 bp'; }
 else if( loc === '4_67'  ){ range = '134288808 - 136286159 bp'; }
 else if( loc === '4_68'  ){ range = '136286160 - 138283511 bp'; }
 else if( loc === '4_69'  ){ range = '138283512 - 140280863 bp'; }
 else if( loc === '4_70'  ){ range = '140280864 - 142278215 bp'; }
 else if( loc === '4_71'  ){ range = '142278216 - 144275567 bp'; }
 else if( loc === '4_72'  ){ range = '144275568 - 146272919 bp'; }
 else if( loc === '4_73'  ){ range = '146272920 - 148270271 bp'; }
 else if( loc === '4_74'  ){ range = '148270272 - 150267623 bp'; }
 else if( loc === '4_75'  ){ range = '150267624 - 152264975 bp'; }
 else if( loc === '4_76'  ){ range = '152264976 - 154262327 bp'; }
 else if( loc === '4_77'  ){ range = '154262328 - 156259679 bp'; }
 else if( loc === '4_78'  ){ range = '156259680 - 158257031 bp'; }
 else if( loc === '4_79'  ){ range = '158257032 - 160254383 bp'; }
 else if( loc === '4_80'  ){ range = '160254384 - 162251735 bp'; }
 else if( loc === '4_81'  ){ range = '162251736 - 164249087 bp'; }
 else if( loc === '4_82'  ){ range = '164249088 - 166246439 bp'; }
 else if( loc === '4_83'  ){ range = '166246440 - 168243791 bp'; }
 else if( loc === '4_84'  ){ range = '168243792 - 170241143 bp'; }
 else if( loc === '4_85'  ){ range = '170241144 - 172238495 bp'; }
 else if( loc === '4_86'  ){ range = '172238496 - 174235847 bp'; }
 else if( loc === '4_87'  ){ range = '174235848 - 176233199 bp'; }
 else if( loc === '4_88'  ){ range = '176233200 - 178230551 bp'; }
 else if( loc === '4_89'  ){ range = '178230552 - 180227903 bp'; }
 else if( loc === '4_90'  ){ range = '180227904 - 182225255 bp'; }
 else if( loc === '4_91'  ){ range = '182225256 - 184222607 bp'; }
 else if( loc === '4_92'  ){ range = '184222608 - 186219959 bp'; }
 else if( loc === '4_93'  ){ range = '186219960 - 188217311 bp'; }
 else if( loc === '4_94'  ){ range = '188217312 - 190214555 bp'; }
 else if( loc === '5_1'  ){ range = '1 - 2104348 bp'; }
 else if( loc === '5_2'  ){ range = '2104349 - 4208697 bp'; }
 else if( loc === '5_3'  ){ range = '4208698 - 6313046 bp'; }
 else if( loc === '5_4'  ){ range = '6313047 - 8417395 bp'; }
 else if( loc === '5_5'  ){ range = '8417396 - 10521744 bp'; }
 else if( loc === '5_6'  ){ range = '10521745 - 12626093 bp'; }
 else if( loc === '5_7'  ){ range = '12626094 - 14730442 bp'; }
 else if( loc === '5_8'  ){ range = '14730443 - 16834791 bp'; }
 else if( loc === '5_9'  ){ range = '16834792 - 18939140 bp'; }
 else if( loc === '5_10'  ){ range = '18939141 - 21043489 bp'; }
 else if( loc === '5_11'  ){ range = '21043490 - 23147838 bp'; }
 else if( loc === '5_12'  ){ range = '23147839 - 25252187 bp'; }
 else if( loc === '5_13'  ){ range = '25252188 - 27356536 bp'; }
 else if( loc === '5_14'  ){ range = '27356537 - 29460885 bp'; }
 else if( loc === '5_15'  ){ range = '29460886 - 31565234 bp'; }
 else if( loc === '5_16'  ){ range = '31565235 - 33669583 bp'; }
 else if( loc === '5_17'  ){ range = '33669584 - 35773932 bp'; }
 else if( loc === '5_18'  ){ range = '35773933 - 37878281 bp'; }
 else if( loc === '5_19'  ){ range = '37878282 - 39982630 bp'; }
 else if( loc === '5_20'  ){ range = '39982631 - 42086979 bp'; }
 else if( loc === '5_21'  ){ range = '42086980 - 44191328 bp'; }
 else if( loc === '5_22'  ){ range = '44191329 - 46295677 bp'; }
 else if( loc === '5_23'  ){ range = '46295678 - 48400026 bp'; }
 else if( loc === '5_24'  ){ range = '48400027 - 50387165 bp'; }
 else if( loc === '5_25'  ){ range = '50387166 - 52374304 bp'; }
 else if( loc === '5_26'  ){ range = '52374305 - 54361443 bp'; }
 else if( loc === '5_27'  ){ range = '54361444 - 56348582 bp'; }
 else if( loc === '5_28'  ){ range = '56348583 - 58335721 bp'; }
 else if( loc === '5_29'  ){ range = '58335722 - 60322860 bp'; }
 else if( loc === '5_30'  ){ range = '60322861 - 62309999 bp'; }
 else if( loc === '5_31'  ){ range = '62310000 - 64297138 bp'; }
 else if( loc === '5_32'  ){ range = '64297139 - 66284277 bp'; }
 else if( loc === '5_33'  ){ range = '66284278 - 68271416 bp'; }
 else if( loc === '5_34'  ){ range = '68271417 - 70258555 bp'; }
 else if( loc === '5_35'  ){ range = '70258556 - 72245694 bp'; }
 else if( loc === '5_36'  ){ range = '72245695 - 74232833 bp'; }
 else if( loc === '5_37'  ){ range = '74232834 - 76219972 bp'; }
 else if( loc === '5_38'  ){ range = '76219973 - 78207111 bp'; }
 else if( loc === '5_39'  ){ range = '78207112 - 80194250 bp'; }
 else if( loc === '5_40'  ){ range = '80194251 - 82181389 bp'; }
 else if( loc === '5_41'  ){ range = '82181390 - 84168528 bp'; }
 else if( loc === '5_42'  ){ range = '84168529 - 86155667 bp'; }
 else if( loc === '5_43'  ){ range = '86155668 - 88142806 bp'; }
 else if( loc === '5_44'  ){ range = '88142807 - 90129945 bp'; }
 else if( loc === '5_45'  ){ range = '90129946 - 92117084 bp'; }
 else if( loc === '5_46'  ){ range = '92117085 - 94104223 bp'; }
 else if( loc === '5_47'  ){ range = '94104224 - 96091362 bp'; }
 else if( loc === '5_48'  ){ range = '96091363 - 98078501 bp'; }
 else if( loc === '5_49'  ){ range = '98078502 - 100065640 bp'; }
 else if( loc === '5_50'  ){ range = '100065641 - 102052779 bp'; }
 else if( loc === '5_51'  ){ range = '102052780 - 104039918 bp'; }
 else if( loc === '5_52'  ){ range = '104039919 - 106027057 bp'; }
 else if( loc === '5_53'  ){ range = '106027058 - 108014196 bp'; }
 else if( loc === '5_54'  ){ range = '108014197 - 110001335 bp'; }
 else if( loc === '5_55'  ){ range = '110001336 - 111988474 bp'; }
 else if( loc === '5_56'  ){ range = '111988475 - 113975613 bp'; }
 else if( loc === '5_57'  ){ range = '113975614 - 115962752 bp'; }
 else if( loc === '5_58'  ){ range = '115962753 - 117949891 bp'; }
 else if( loc === '5_59'  ){ range = '117949892 - 119937030 bp'; }
 else if( loc === '5_60'  ){ range = '119937031 - 121924169 bp'; }
 else if( loc === '5_61'  ){ range = '121924170 - 123911308 bp'; }
 else if( loc === '5_62'  ){ range = '123911309 - 125898447 bp'; }
 else if( loc === '5_63'  ){ range = '125898448 - 127885586 bp'; }
 else if( loc === '5_64'  ){ range = '127885587 - 129872725 bp'; }
 else if( loc === '5_65'  ){ range = '129872726 - 131859864 bp'; }
 else if( loc === '5_66'  ){ range = '131859865 - 133847003 bp'; }
 else if( loc === '5_67'  ){ range = '133847004 - 135834142 bp'; }
 else if( loc === '5_68'  ){ range = '135834143 - 137821281 bp'; }
 else if( loc === '5_69'  ){ range = '137821282 - 139808420 bp'; }
 else if( loc === '5_70'  ){ range = '139808421 - 141795559 bp'; }
 else if( loc === '5_71'  ){ range = '141795560 - 143782698 bp'; }
 else if( loc === '5_72'  ){ range = '143782699 - 145769837 bp'; }
 else if( loc === '5_73'  ){ range = '145769838 - 147756976 bp'; }
 else if( loc === '5_74'  ){ range = '147756977 - 149744115 bp'; }
 else if( loc === '5_75'  ){ range = '149744116 - 151731254 bp'; }
 else if( loc === '5_76'  ){ range = '151731255 - 153718393 bp'; }
 else if( loc === '5_77'  ){ range = '153718394 - 155705532 bp'; }
 else if( loc === '5_78'  ){ range = '155705533 - 157692671 bp'; }
 else if( loc === '5_79'  ){ range = '157692672 - 159679810 bp'; }
 else if( loc === '5_80'  ){ range = '159679811 - 161666949 bp'; }
 else if( loc === '5_81'  ){ range = '161666950 - 163654088 bp'; }
 else if( loc === '5_82'  ){ range = '163654089 - 165641227 bp'; }
 else if( loc === '5_83'  ){ range = '165641228 - 167628366 bp'; }
 else if( loc === '5_84'  ){ range = '167628367 - 169615505 bp'; }
 else if( loc === '5_85'  ){ range = '169615506 - 171602644 bp'; }
 else if( loc === '5_86'  ){ range = '171602645 - 173589783 bp'; }
 else if( loc === '5_87'  ){ range = '173589784 - 175576922 bp'; }
 else if( loc === '5_88'  ){ range = '175576923 - 177564061 bp'; }
 else if( loc === '5_89'  ){ range = '177564062 - 179551200 bp'; }
 else if( loc === '5_90'  ){ range = '179551201 - 181538259 bp'; }
 else if( loc === '6_1'  ){ range = '1 - 2103448 bp'; }
 else if( loc === '6_2'  ){ range = '2103449 - 4206897 bp'; }
 else if( loc === '6_3'  ){ range = '4206898 - 6310346 bp'; }
 else if( loc === '6_4'  ){ range = '6310347 - 8413795 bp'; }
 else if( loc === '6_5'  ){ range = '8413796 - 10517244 bp'; }
 else if( loc === '6_6'  ){ range = '10517245 - 12620693 bp'; }
 else if( loc === '6_7'  ){ range = '12620694 - 14724142 bp'; }
 else if( loc === '6_8'  ){ range = '14724143 - 16827591 bp'; }
 else if( loc === '6_9'  ){ range = '16827592 - 18931040 bp'; }
 else if( loc === '6_10'  ){ range = '18931041 - 21034489 bp'; }
 else if( loc === '6_11'  ){ range = '21034490 - 23137938 bp'; }
 else if( loc === '6_12'  ){ range = '23137939 - 25241387 bp'; }
 else if( loc === '6_13'  ){ range = '25241388 - 27344836 bp'; }
 else if( loc === '6_14'  ){ range = '27344837 - 29448285 bp'; }
 else if( loc === '6_15'  ){ range = '29448286 - 31551734 bp'; }
 else if( loc === '6_16'  ){ range = '31551735 - 33655183 bp'; }
 else if( loc === '6_17'  ){ range = '33655184 - 35758632 bp'; }
 else if( loc === '6_18'  ){ range = '35758633 - 37862081 bp'; }
 else if( loc === '6_19'  ){ range = '37862082 - 39965530 bp'; }
 else if( loc === '6_20'  ){ range = '39965531 - 42068979 bp'; }
 else if( loc === '6_21'  ){ range = '42068980 - 44172428 bp'; }
 else if( loc === '6_22'  ){ range = '44172429 - 46275877 bp'; }
 else if( loc === '6_23'  ){ range = '46275878 - 48379326 bp'; }
 else if( loc === '6_24'  ){ range = '48379327 - 50482775 bp'; }
 else if( loc === '6_25'  ){ range = '50482776 - 52586224 bp'; }
 else if( loc === '6_26'  ){ range = '52586225 - 54689673 bp'; }
 else if( loc === '6_27'  ){ range = '54689674 - 56793122 bp'; }
 else if( loc === '6_28'  ){ range = '56793123 - 58896571 bp'; }
 else if( loc === '6_29'  ){ range = '58896572 - 61000020 bp'; }
 else if( loc === '6_30'  ){ range = '61000021 - 62996493 bp'; }
 else if( loc === '6_31'  ){ range = '62996494 - 64992966 bp'; }
 else if( loc === '6_32'  ){ range = '64992967 - 66989439 bp'; }
 else if( loc === '6_33'  ){ range = '66989440 - 68985912 bp'; }
 else if( loc === '6_34'  ){ range = '68985913 - 70982385 bp'; }
 else if( loc === '6_35'  ){ range = '70982386 - 72978858 bp'; }
 else if( loc === '6_36'  ){ range = '72978859 - 74975331 bp'; }
 else if( loc === '6_37'  ){ range = '74975332 - 76971804 bp'; }
 else if( loc === '6_38'  ){ range = '76971805 - 78968277 bp'; }
 else if( loc === '6_39'  ){ range = '78968278 - 80964750 bp'; }
 else if( loc === '6_40'  ){ range = '80964751 - 82961223 bp'; }
 else if( loc === '6_41'  ){ range = '82961224 - 84957696 bp'; }
 else if( loc === '6_42'  ){ range = '84957697 - 86954169 bp'; }
 else if( loc === '6_43'  ){ range = '86954170 - 88950642 bp'; }
 else if( loc === '6_44'  ){ range = '88950643 - 90947115 bp'; }
 else if( loc === '6_45'  ){ range = '90947116 - 92943588 bp'; }
 else if( loc === '6_46'  ){ range = '92943589 - 94940061 bp'; }
 else if( loc === '6_47'  ){ range = '94940062 - 96936534 bp'; }
 else if( loc === '6_48'  ){ range = '96936535 - 98933007 bp'; }
 else if( loc === '6_49'  ){ range = '98933008 - 100929480 bp'; }
 else if( loc === '6_50'  ){ range = '100929481 - 102925953 bp'; }
 else if( loc === '6_51'  ){ range = '102925954 - 104922426 bp'; }
 else if( loc === '6_52'  ){ range = '104922427 - 106918899 bp'; }
 else if( loc === '6_53'  ){ range = '106918900 - 108915372 bp'; }
 else if( loc === '6_54'  ){ range = '108915373 - 110911845 bp'; }
 else if( loc === '6_55'  ){ range = '110911846 - 112908318 bp'; }
 else if( loc === '6_56'  ){ range = '112908319 - 114904791 bp'; }
 else if( loc === '6_57'  ){ range = '114904792 - 116901264 bp'; }
 else if( loc === '6_58'  ){ range = '116901265 - 118897737 bp'; }
 else if( loc === '6_59'  ){ range = '118897738 - 120894210 bp'; }
 else if( loc === '6_60'  ){ range = '120894211 - 122890683 bp'; }
 else if( loc === '6_61'  ){ range = '122890684 - 124887156 bp'; }
 else if( loc === '6_62'  ){ range = '124887157 - 126883629 bp'; }
 else if( loc === '6_63'  ){ range = '126883630 - 128880102 bp'; }
 else if( loc === '6_64'  ){ range = '128880103 - 130876575 bp'; }
 else if( loc === '6_65'  ){ range = '130876576 - 132873048 bp'; }
 else if( loc === '6_66'  ){ range = '132873049 - 134869521 bp'; }
 else if( loc === '6_67'  ){ range = '134869522 - 136865994 bp'; }
 else if( loc === '6_68'  ){ range = '136865995 - 138862467 bp'; }
 else if( loc === '6_69'  ){ range = '138862468 - 140858940 bp'; }
 else if( loc === '6_70'  ){ range = '140858941 - 142855413 bp'; }
 else if( loc === '6_71'  ){ range = '142855414 - 144851886 bp'; }
 else if( loc === '6_72'  ){ range = '144851887 - 146848359 bp'; }
 else if( loc === '6_73'  ){ range = '146848360 - 148844832 bp'; }
 else if( loc === '6_74'  ){ range = '148844833 - 150841305 bp'; }
 else if( loc === '6_75'  ){ range = '150841306 - 152837778 bp'; }
 else if( loc === '6_76'  ){ range = '152837779 - 154834251 bp'; }
 else if( loc === '6_77'  ){ range = '154834252 - 156830724 bp'; }
 else if( loc === '6_78'  ){ range = '156830725 - 158827197 bp'; }
 else if( loc === '6_79'  ){ range = '158827198 - 160823670 bp'; }
 else if( loc === '6_80'  ){ range = '160823671 - 162820143 bp'; }
 else if( loc === '6_81'  ){ range = '162820144 - 164816616 bp'; }
 else if( loc === '6_82'  ){ range = '164816617 - 166813089 bp'; }
 else if( loc === '6_83'  ){ range = '166813090 - 168809562 bp'; }
 else if( loc === '6_84'  ){ range = '168809563 - 170805979 bp'; }
 else if( loc === '7_1'  ){ range = '1 - 2065517 bp'; }
 else if( loc === '7_2'  ){ range = '2065518 - 4131035 bp'; }
 else if( loc === '7_3'  ){ range = '4131036 - 6196553 bp'; }
 else if( loc === '7_4'  ){ range = '6196554 - 8262071 bp'; }
 else if( loc === '7_5'  ){ range = '8262072 - 10327589 bp'; }
 else if( loc === '7_6'  ){ range = '10327590 - 12393107 bp'; }
 else if( loc === '7_7'  ){ range = '12393108 - 14458625 bp'; }
 else if( loc === '7_8'  ){ range = '14458626 - 16524143 bp'; }
 else if( loc === '7_9'  ){ range = '16524144 - 18589661 bp'; }
 else if( loc === '7_10'  ){ range = '18589662 - 20655179 bp'; }
 else if( loc === '7_11'  ){ range = '20655180 - 22720697 bp'; }
 else if( loc === '7_12'  ){ range = '22720698 - 24786215 bp'; }
 else if( loc === '7_13'  ){ range = '24786216 - 26851733 bp'; }
 else if( loc === '7_14'  ){ range = '26851734 - 28917251 bp'; }
 else if( loc === '7_15'  ){ range = '28917252 - 30982769 bp'; }
 else if( loc === '7_16'  ){ range = '30982770 - 33048287 bp'; }
 else if( loc === '7_17'  ){ range = '33048288 - 35113805 bp'; }
 else if( loc === '7_18'  ){ range = '35113806 - 37179323 bp'; }
 else if( loc === '7_19'  ){ range = '37179324 - 39244841 bp'; }
 else if( loc === '7_20'  ){ range = '39244842 - 41310359 bp'; }
 else if( loc === '7_21'  ){ range = '41310360 - 43375877 bp'; }
 else if( loc === '7_22'  ){ range = '43375878 - 45441395 bp'; }
 else if( loc === '7_23'  ){ range = '45441396 - 47506913 bp'; }
 else if( loc === '7_24'  ){ range = '47506914 - 49572431 bp'; }
 else if( loc === '7_25'  ){ range = '49572432 - 51637949 bp'; }
 else if( loc === '7_26'  ){ range = '51637950 - 53703467 bp'; }
 else if( loc === '7_27'  ){ range = '53703468 - 55768985 bp'; }
 else if( loc === '7_28'  ){ range = '55768986 - 57834503 bp'; }
 else if( loc === '7_29'  ){ range = '57834504 - 59900021 bp'; }
 else if( loc === '7_30'  ){ range = '59900022 - 61888941 bp'; }
 else if( loc === '7_31'  ){ range = '61888942 - 63877861 bp'; }
 else if( loc === '7_32'  ){ range = '63877862 - 65866781 bp'; }
 else if( loc === '7_33'  ){ range = '65866782 - 67855701 bp'; }
 else if( loc === '7_34'  ){ range = '67855702 - 69844621 bp'; }
 else if( loc === '7_35'  ){ range = '69844622 - 71833541 bp'; }
 else if( loc === '7_36'  ){ range = '71833542 - 73822461 bp'; }
 else if( loc === '7_37'  ){ range = '73822462 - 75811381 bp'; }
 else if( loc === '7_38'  ){ range = '75811382 - 77800301 bp'; }
 else if( loc === '7_39'  ){ range = '77800302 - 79789221 bp'; }
 else if( loc === '7_40'  ){ range = '79789222 - 81778141 bp'; }
 else if( loc === '7_41'  ){ range = '81778142 - 83767061 bp'; }
 else if( loc === '7_42'  ){ range = '83767062 - 85755981 bp'; }
 else if( loc === '7_43'  ){ range = '85755982 - 87744901 bp'; }
 else if( loc === '7_44'  ){ range = '87744902 - 89733821 bp'; }
 else if( loc === '7_45'  ){ range = '89733822 - 91722741 bp'; }
 else if( loc === '7_46'  ){ range = '91722742 - 93711661 bp'; }
 else if( loc === '7_47'  ){ range = '93711662 - 95700581 bp'; }
 else if( loc === '7_48'  ){ range = '95700582 - 97689501 bp'; }
 else if( loc === '7_49'  ){ range = '97689502 - 99678421 bp'; }
 else if( loc === '7_50'  ){ range = '99678422 - 101667341 bp'; }
 else if( loc === '7_51'  ){ range = '101667342 - 103656261 bp'; }
 else if( loc === '7_52'  ){ range = '103656262 - 105645181 bp'; }
 else if( loc === '7_53'  ){ range = '105645182 - 107634101 bp'; }
 else if( loc === '7_54'  ){ range = '107634102 - 109623021 bp'; }
 else if( loc === '7_55'  ){ range = '109623022 - 111611941 bp'; }
 else if( loc === '7_56'  ){ range = '111611942 - 113600861 bp'; }
 else if( loc === '7_57'  ){ range = '113600862 - 115589781 bp'; }
 else if( loc === '7_58'  ){ range = '115589782 - 117578701 bp'; }
 else if( loc === '7_59'  ){ range = '117578702 - 119567621 bp'; }
 else if( loc === '7_60'  ){ range = '119567622 - 121556541 bp'; }
 else if( loc === '7_61'  ){ range = '121556542 - 123545461 bp'; }
 else if( loc === '7_62'  ){ range = '123545462 - 125534381 bp'; }
 else if( loc === '7_63'  ){ range = '125534382 - 127523301 bp'; }
 else if( loc === '7_64'  ){ range = '127523302 - 129512221 bp'; }
 else if( loc === '7_65'  ){ range = '129512222 - 131501141 bp'; }
 else if( loc === '7_66'  ){ range = '131501142 - 133490061 bp'; }
 else if( loc === '7_67'  ){ range = '133490062 - 135478981 bp'; }
 else if( loc === '7_68'  ){ range = '135478982 - 137467901 bp'; }
 else if( loc === '7_69'  ){ range = '137467902 - 139456821 bp'; }
 else if( loc === '7_70'  ){ range = '139456822 - 141445741 bp'; }
 else if( loc === '7_71'  ){ range = '141445742 - 143434661 bp'; }
 else if( loc === '7_72'  ){ range = '143434662 - 145423581 bp'; }
 else if( loc === '7_73'  ){ range = '145423582 - 147412501 bp'; }
 else if( loc === '7_74'  ){ range = '147412502 - 149401421 bp'; }
 else if( loc === '7_75'  ){ range = '149401422 - 151390341 bp'; }
 else if( loc === '7_76'  ){ range = '151390342 - 153379261 bp'; }
 else if( loc === '7_77'  ){ range = '153379262 - 155368181 bp'; }
 else if( loc === '7_78'  ){ range = '155368182 - 157357101 bp'; }
 else if( loc === '7_79'  ){ range = '157357102 - 159345973 bp'; }
 else if( loc === '8_1'  ){ range = '1 - 2072727 bp'; }
 else if( loc === '8_2'  ){ range = '2072728 - 4145455 bp'; }
 else if( loc === '8_3'  ){ range = '4145456 - 6218183 bp'; }
 else if( loc === '8_4'  ){ range = '6218184 - 8290911 bp'; }
 else if( loc === '8_5'  ){ range = '8290912 - 10363639 bp'; }
 else if( loc === '8_6'  ){ range = '10363640 - 12436367 bp'; }
 else if( loc === '8_7'  ){ range = '12436368 - 14509095 bp'; }
 else if( loc === '8_8'  ){ range = '14509096 - 16581823 bp'; }
 else if( loc === '8_9'  ){ range = '16581824 - 18654551 bp'; }
 else if( loc === '8_10'  ){ range = '18654552 - 20727279 bp'; }
 else if( loc === '8_11'  ){ range = '20727280 - 22800007 bp'; }
 else if( loc === '8_12'  ){ range = '22800008 - 24872735 bp'; }
 else if( loc === '8_13'  ){ range = '24872736 - 26945463 bp'; }
 else if( loc === '8_14'  ){ range = '26945464 - 29018191 bp'; }
 else if( loc === '8_15'  ){ range = '29018192 - 31090919 bp'; }
 else if( loc === '8_16'  ){ range = '31090920 - 33163647 bp'; }
 else if( loc === '8_17'  ){ range = '33163648 - 35236375 bp'; }
 else if( loc === '8_18'  ){ range = '35236376 - 37309103 bp'; }
 else if( loc === '8_19'  ){ range = '37309104 - 39381831 bp'; }
 else if( loc === '8_20'  ){ range = '39381832 - 41454559 bp'; }
 else if( loc === '8_21'  ){ range = '41454560 - 43527287 bp'; }
 else if( loc === '8_22'  ){ range = '43527288 - 45600015 bp'; }
 else if( loc === '8_23'  ){ range = '45600016 - 47590789 bp'; }
 else if( loc === '8_24'  ){ range = '47590790 - 49581563 bp'; }
 else if( loc === '8_25'  ){ range = '49581564 - 51572337 bp'; }
 else if( loc === '8_26'  ){ range = '51572338 - 53563111 bp'; }
 else if( loc === '8_27'  ){ range = '53563112 - 55553885 bp'; }
 else if( loc === '8_28'  ){ range = '55553886 - 57544659 bp'; }
 else if( loc === '8_29'  ){ range = '57544660 - 59535433 bp'; }
 else if( loc === '8_30'  ){ range = '59535434 - 61526207 bp'; }
 else if( loc === '8_31'  ){ range = '61526208 - 63516981 bp'; }
 else if( loc === '8_32'  ){ range = '63516982 - 65507755 bp'; }
 else if( loc === '8_33'  ){ range = '65507756 - 67498529 bp'; }
 else if( loc === '8_34'  ){ range = '67498530 - 69489303 bp'; }
 else if( loc === '8_35'  ){ range = '69489304 - 71480077 bp'; }
 else if( loc === '8_36'  ){ range = '71480078 - 73470851 bp'; }
 else if( loc === '8_37'  ){ range = '73470852 - 75461625 bp'; }
 else if( loc === '8_38'  ){ range = '75461626 - 77452399 bp'; }
 else if( loc === '8_39'  ){ range = '77452400 - 79443173 bp'; }
 else if( loc === '8_40'  ){ range = '79443174 - 81433947 bp'; }
 else if( loc === '8_41'  ){ range = '81433948 - 83424721 bp'; }
 else if( loc === '8_42'  ){ range = '83424722 - 85415495 bp'; }
 else if( loc === '8_43'  ){ range = '85415496 - 87406269 bp'; }
 else if( loc === '8_44'  ){ range = '87406270 - 89397043 bp'; }
 else if( loc === '8_45'  ){ range = '89397044 - 91387817 bp'; }
 else if( loc === '8_46'  ){ range = '91387818 - 93378591 bp'; }
 else if( loc === '8_47'  ){ range = '93378592 - 95369365 bp'; }
 else if( loc === '8_48'  ){ range = '95369366 - 97360139 bp'; }
 else if( loc === '8_49'  ){ range = '97360140 - 99350913 bp'; }
 else if( loc === '8_50'  ){ range = '99350914 - 101341687 bp'; }
 else if( loc === '8_51'  ){ range = '101341688 - 103332461 bp'; }
 else if( loc === '8_52'  ){ range = '103332462 - 105323235 bp'; }
 else if( loc === '8_53'  ){ range = '105323236 - 107314009 bp'; }
 else if( loc === '8_54'  ){ range = '107314010 - 109304783 bp'; }
 else if( loc === '8_55'  ){ range = '109304784 - 111295557 bp'; }
 else if( loc === '8_56'  ){ range = '111295558 - 113286331 bp'; }
 else if( loc === '8_57'  ){ range = '113286332 - 115277105 bp'; }
 else if( loc === '8_58'  ){ range = '115277106 - 117267879 bp'; }
 else if( loc === '8_59'  ){ range = '117267880 - 119258653 bp'; }
 else if( loc === '8_60'  ){ range = '119258654 - 121249427 bp'; }
 else if( loc === '8_61'  ){ range = '121249428 - 123240201 bp'; }
 else if( loc === '8_62'  ){ range = '123240202 - 125230975 bp'; }
 else if( loc === '8_63'  ){ range = '125230976 - 127221749 bp'; }
 else if( loc === '8_64'  ){ range = '127221750 - 129212523 bp'; }
 else if( loc === '8_65'  ){ range = '129212524 - 131203297 bp'; }
 else if( loc === '8_66'  ){ range = '131203298 - 133194071 bp'; }
 else if( loc === '8_67'  ){ range = '133194072 - 135184845 bp'; }
 else if( loc === '8_68'  ){ range = '135184846 - 137175619 bp'; }
 else if( loc === '8_69'  ){ range = '137175620 - 139166393 bp'; }
 else if( loc === '8_70'  ){ range = '139166394 - 141157167 bp'; }
 else if( loc === '8_71'  ){ range = '141157168 - 143147941 bp'; }
 else if( loc === '8_72'  ){ range = '143147942 - 145138636 bp'; }
 else if( loc === '9_1'  ){ range = '1 - 2130435 bp'; }
 else if( loc === '9_2'  ){ range = '2130436 - 4260871 bp'; }
 else if( loc === '9_3'  ){ range = '4260872 - 6391307 bp'; }
 else if( loc === '9_4'  ){ range = '6391308 - 8521743 bp'; }
 else if( loc === '9_5'  ){ range = '8521744 - 10652179 bp'; }
 else if( loc === '9_6'  ){ range = '10652180 - 12782615 bp'; }
 else if( loc === '9_7'  ){ range = '12782616 - 14913051 bp'; }
 else if( loc === '9_8'  ){ range = '14913052 - 17043487 bp'; }
 else if( loc === '9_9'  ){ range = '17043488 - 19173923 bp'; }
 else if( loc === '9_10'  ){ range = '19173924 - 21304359 bp'; }
 else if( loc === '9_11'  ){ range = '21304360 - 23434795 bp'; }
 else if( loc === '9_12'  ){ range = '23434796 - 25565231 bp'; }
 else if( loc === '9_13'  ){ range = '25565232 - 27695667 bp'; }
 else if( loc === '9_14'  ){ range = '27695668 - 29826103 bp'; }
 else if( loc === '9_15'  ){ range = '29826104 - 31956539 bp'; }
 else if( loc === '9_16'  ){ range = '31956540 - 34086975 bp'; }
 else if( loc === '9_17'  ){ range = '34086976 - 36217411 bp'; }
 else if( loc === '9_18'  ){ range = '36217412 - 38347847 bp'; }
 else if( loc === '9_19'  ){ range = '38347848 - 40478283 bp'; }
 else if( loc === '9_20'  ){ range = '40478284 - 42608719 bp'; }
 else if( loc === '9_21'  ){ range = '42608720 - 44739155 bp'; }
 else if( loc === '9_22'  ){ range = '44739156 - 46869591 bp'; }
 else if( loc === '9_23'  ){ range = '46869592 - 49000027 bp'; }
 else if( loc === '9_24'  ){ range = '49000028 - 51128474 bp'; }
 else if( loc === '9_25'  ){ range = '51128475 - 53256921 bp'; }
 else if( loc === '9_26'  ){ range = '53256922 - 55385368 bp'; }
 else if( loc === '9_27'  ){ range = '55385369 - 57513815 bp'; }
 else if( loc === '9_28'  ){ range = '57513816 - 59642262 bp'; }
 else if( loc === '9_29'  ){ range = '59642263 - 61770709 bp'; }
 else if( loc === '9_30'  ){ range = '61770710 - 63899156 bp'; }
 else if( loc === '9_31'  ){ range = '63899157 - 66027603 bp'; }
 else if( loc === '9_32'  ){ range = '66027604 - 68156050 bp'; }
 else if( loc === '9_33'  ){ range = '68156051 - 70284497 bp'; }
 else if( loc === '9_34'  ){ range = '70284498 - 72412944 bp'; }
 else if( loc === '9_35'  ){ range = '72412945 - 74541391 bp'; }
 else if( loc === '9_36'  ){ range = '74541392 - 76669838 bp'; }
 else if( loc === '9_37'  ){ range = '76669839 - 78798285 bp'; }
 else if( loc === '9_38'  ){ range = '78798286 - 80926732 bp'; }
 else if( loc === '9_39'  ){ range = '80926733 - 83055179 bp'; }
 else if( loc === '9_40'  ){ range = '83055180 - 85183626 bp'; }
 else if( loc === '9_41'  ){ range = '85183627 - 87312073 bp'; }
 else if( loc === '9_42'  ){ range = '87312074 - 89440520 bp'; }
 else if( loc === '9_43'  ){ range = '89440521 - 91568967 bp'; }
 else if( loc === '9_44'  ){ range = '91568968 - 93697414 bp'; }
 else if( loc === '9_45'  ){ range = '93697415 - 95825861 bp'; }
 else if( loc === '9_46'  ){ range = '95825862 - 97954308 bp'; }
 else if( loc === '9_47'  ){ range = '97954309 - 100082755 bp'; }
 else if( loc === '9_48'  ){ range = '100082756 - 102211202 bp'; }
 else if( loc === '9_49'  ){ range = '102211203 - 104339649 bp'; }
 else if( loc === '9_50'  ){ range = '104339650 - 106468096 bp'; }
 else if( loc === '9_51'  ){ range = '106468097 - 108596543 bp'; }
 else if( loc === '9_52'  ){ range = '108596544 - 110724990 bp'; }
 else if( loc === '9_53'  ){ range = '110724991 - 112853437 bp'; }
 else if( loc === '9_54'  ){ range = '112853438 - 114981884 bp'; }
 else if( loc === '9_55'  ){ range = '114981885 - 117110331 bp'; }
 else if( loc === '9_56'  ){ range = '117110332 - 119238778 bp'; }
 else if( loc === '9_57'  ){ range = '119238779 - 121367225 bp'; }
 else if( loc === '9_58'  ){ range = '121367226 - 123495672 bp'; }
 else if( loc === '9_59'  ){ range = '123495673 - 125624119 bp'; }
 else if( loc === '9_60'  ){ range = '125624120 - 127752566 bp'; }
 else if( loc === '9_61'  ){ range = '127752567 - 129881013 bp'; }
 else if( loc === '9_62'  ){ range = '129881014 - 132009460 bp'; }
 else if( loc === '9_63'  ){ range = '132009461 - 134137907 bp'; }
 else if( loc === '9_64'  ){ range = '134137908 - 136266354 bp'; }
 else if( loc === '9_65'  ){ range = '136266355 - 138394717 bp'; }
 else if( loc === '10_1'  ){ range = '1 - 2115789 bp'; }
 else if( loc === '10_2'  ){ range = '2115790 - 4231579 bp'; }
 else if( loc === '10_3'  ){ range = '4231580 - 6347369 bp'; }
 else if( loc === '10_4'  ){ range = '6347370 - 8463159 bp'; }
 else if( loc === '10_5'  ){ range = '8463160 - 10578949 bp'; }
 else if( loc === '10_6'  ){ range = '10578950 - 12694739 bp'; }
 else if( loc === '10_7'  ){ range = '12694740 - 14810529 bp'; }
 else if( loc === '10_8'  ){ range = '14810530 - 16926319 bp'; }
 else if( loc === '10_9'  ){ range = '16926320 - 19042109 bp'; }
 else if( loc === '10_10'  ){ range = '19042110 - 21157899 bp'; }
 else if( loc === '10_11'  ){ range = '21157900 - 23273689 bp'; }
 else if( loc === '10_12'  ){ range = '23273690 - 25389479 bp'; }
 else if( loc === '10_13'  ){ range = '25389480 - 27505269 bp'; }
 else if( loc === '10_14'  ){ range = '27505270 - 29621059 bp'; }
 else if( loc === '10_15'  ){ range = '29621060 - 31736849 bp'; }
 else if( loc === '10_16'  ){ range = '31736850 - 33852639 bp'; }
 else if( loc === '10_17'  ){ range = '33852640 - 35968429 bp'; }
 else if( loc === '10_18'  ){ range = '35968430 - 38084219 bp'; }
 else if( loc === '10_19'  ){ range = '38084220 - 40200009 bp'; }
 else if( loc === '10_20'  ){ range = '40200010 - 42191445 bp'; }
 else if( loc === '10_21'  ){ range = '42191446 - 44182881 bp'; }
 else if( loc === '10_22'  ){ range = '44182882 - 46174317 bp'; }
 else if( loc === '10_23'  ){ range = '46174318 - 48165753 bp'; }
 else if( loc === '10_24'  ){ range = '48165754 - 50157189 bp'; }
 else if( loc === '10_25'  ){ range = '50157190 - 52148625 bp'; }
 else if( loc === '10_26'  ){ range = '52148626 - 54140061 bp'; }
 else if( loc === '10_27'  ){ range = '54140062 - 56131497 bp'; }
 else if( loc === '10_28'  ){ range = '56131498 - 58122933 bp'; }
 else if( loc === '10_29'  ){ range = '58122934 - 60114369 bp'; }
 else if( loc === '10_30'  ){ range = '60114370 - 62105805 bp'; }
 else if( loc === '10_31'  ){ range = '62105806 - 64097241 bp'; }
 else if( loc === '10_32'  ){ range = '64097242 - 66088677 bp'; }
 else if( loc === '10_33'  ){ range = '66088678 - 68080113 bp'; }
 else if( loc === '10_34'  ){ range = '68080114 - 70071549 bp'; }
 else if( loc === '10_35'  ){ range = '70071550 - 72062985 bp'; }
 else if( loc === '10_36'  ){ range = '72062986 - 74054421 bp'; }
 else if( loc === '10_37'  ){ range = '74054422 - 76045857 bp'; }
 else if( loc === '10_38'  ){ range = '76045858 - 78037293 bp'; }
 else if( loc === '10_39'  ){ range = '78037294 - 80028729 bp'; }
 else if( loc === '10_40'  ){ range = '80028730 - 82020165 bp'; }
 else if( loc === '10_41'  ){ range = '82020166 - 84011601 bp'; }
 else if( loc === '10_42'  ){ range = '84011602 - 86003037 bp'; }
 else if( loc === '10_43'  ){ range = '86003038 - 87994473 bp'; }
 else if( loc === '10_44'  ){ range = '87994474 - 89985909 bp'; }
 else if( loc === '10_45'  ){ range = '89985910 - 91977345 bp'; }
 else if( loc === '10_46'  ){ range = '91977346 - 93968781 bp'; }
 else if( loc === '10_47'  ){ range = '93968782 - 95960217 bp'; }
 else if( loc === '10_48'  ){ range = '95960218 - 97951653 bp'; }
 else if( loc === '10_49'  ){ range = '97951654 - 99943089 bp'; }
 else if( loc === '10_50'  ){ range = '99943090 - 101934525 bp'; }
 else if( loc === '10_51'  ){ range = '101934526 - 103925961 bp'; }
 else if( loc === '10_52'  ){ range = '103925962 - 105917397 bp'; }
 else if( loc === '10_53'  ){ range = '105917398 - 107908833 bp'; }
 else if( loc === '10_54'  ){ range = '107908834 - 109900269 bp'; }
 else if( loc === '10_55'  ){ range = '109900270 - 111891705 bp'; }
 else if( loc === '10_56'  ){ range = '111891706 - 113883141 bp'; }
 else if( loc === '10_57'  ){ range = '113883142 - 115874577 bp'; }
 else if( loc === '10_58'  ){ range = '115874578 - 117866013 bp'; }
 else if( loc === '10_59'  ){ range = '117866014 - 119857449 bp'; }
 else if( loc === '10_60'  ){ range = '119857450 - 121848885 bp'; }
 else if( loc === '10_61'  ){ range = '121848886 - 123840321 bp'; }
 else if( loc === '10_62'  ){ range = '123840322 - 125831757 bp'; }
 else if( loc === '10_63'  ){ range = '125831758 - 127823193 bp'; }
 else if( loc === '10_64'  ){ range = '127823194 - 129814629 bp'; }
 else if( loc === '10_65'  ){ range = '129814630 - 131806065 bp'; }
 else if( loc === '10_66'  ){ range = '131806066 - 133797422 bp'; }
 else if( loc === '11_1'  ){ range = '1 - 2065385 bp'; }
 else if( loc === '11_2'  ){ range = '2065386 - 4130771 bp'; }
 else if( loc === '11_3'  ){ range = '4130772 - 6196157 bp'; }
 else if( loc === '11_4'  ){ range = '6196158 - 8261543 bp'; }
 else if( loc === '11_5'  ){ range = '8261544 - 10326929 bp'; }
 else if( loc === '11_6'  ){ range = '10326930 - 12392315 bp'; }
 else if( loc === '11_7'  ){ range = '12392316 - 14457701 bp'; }
 else if( loc === '11_8'  ){ range = '14457702 - 16523087 bp'; }
 else if( loc === '11_9'  ){ range = '16523088 - 18588473 bp'; }
 else if( loc === '11_10'  ){ range = '18588474 - 20653859 bp'; }
 else if( loc === '11_11'  ){ range = '20653860 - 22719245 bp'; }
 else if( loc === '11_12'  ){ range = '22719246 - 24784631 bp'; }
 else if( loc === '11_13'  ){ range = '24784632 - 26850017 bp'; }
 else if( loc === '11_14'  ){ range = '26850018 - 28915403 bp'; }
 else if( loc === '11_15'  ){ range = '28915404 - 30980789 bp'; }
 else if( loc === '11_16'  ){ range = '30980790 - 33046175 bp'; }
 else if( loc === '11_17'  ){ range = '33046176 - 35111561 bp'; }
 else if( loc === '11_18'  ){ range = '35111562 - 37176947 bp'; }
 else if( loc === '11_19'  ){ range = '37176948 - 39242333 bp'; }
 else if( loc === '11_20'  ){ range = '39242334 - 41307719 bp'; }
 else if( loc === '11_21'  ){ range = '41307720 - 43373105 bp'; }
 else if( loc === '11_22'  ){ range = '43373106 - 45438491 bp'; }
 else if( loc === '11_23'  ){ range = '45438492 - 47503877 bp'; }
 else if( loc === '11_24'  ){ range = '47503878 - 49569263 bp'; }
 else if( loc === '11_25'  ){ range = '49569264 - 51634649 bp'; }
 else if( loc === '11_26'  ){ range = '51634650 - 53700035 bp'; }
 else if( loc === '11_27'  ){ range = '53700036 - 55734702 bp'; }
 else if( loc === '11_28'  ){ range = '55734703 - 57769369 bp'; }
 else if( loc === '11_29'  ){ range = '57769370 - 59804036 bp'; }
 else if( loc === '11_30'  ){ range = '59804037 - 61838703 bp'; }
 else if( loc === '11_31'  ){ range = '61838704 - 63873370 bp'; }
 else if( loc === '11_32'  ){ range = '63873371 - 65908037 bp'; }
 else if( loc === '11_33'  ){ range = '65908038 - 67942704 bp'; }
 else if( loc === '11_34'  ){ range = '67942705 - 69977371 bp'; }
 else if( loc === '11_35'  ){ range = '69977372 - 72012038 bp'; }
 else if( loc === '11_36'  ){ range = '72012039 - 74046705 bp'; }
 else if( loc === '11_37'  ){ range = '74046706 - 76081372 bp'; }
 else if( loc === '11_38'  ){ range = '76081373 - 78116039 bp'; }
 else if( loc === '11_39'  ){ range = '78116040 - 80150706 bp'; }
 else if( loc === '11_40'  ){ range = '80150707 - 82185373 bp'; }
 else if( loc === '11_41'  ){ range = '82185374 - 84220040 bp'; }
 else if( loc === '11_42'  ){ range = '84220041 - 86254707 bp'; }
 else if( loc === '11_43'  ){ range = '86254708 - 88289374 bp'; }
 else if( loc === '11_44'  ){ range = '88289375 - 90324041 bp'; }
 else if( loc === '11_45'  ){ range = '90324042 - 92358708 bp'; }
 else if( loc === '11_46'  ){ range = '92358709 - 94393375 bp'; }
 else if( loc === '11_47'  ){ range = '94393376 - 96428042 bp'; }
 else if( loc === '11_48'  ){ range = '96428043 - 98462709 bp'; }
 else if( loc === '11_49'  ){ range = '98462710 - 100497376 bp'; }
 else if( loc === '11_50'  ){ range = '100497377 - 102532043 bp'; }
 else if( loc === '11_51'  ){ range = '102532044 - 104566710 bp'; }
 else if( loc === '11_52'  ){ range = '104566711 - 106601377 bp'; }
 else if( loc === '11_53'  ){ range = '106601378 - 108636044 bp'; }
 else if( loc === '11_54'  ){ range = '108636045 - 110670711 bp'; }
 else if( loc === '11_55'  ){ range = '110670712 - 112705378 bp'; }
 else if( loc === '11_56'  ){ range = '112705379 - 114740045 bp'; }
 else if( loc === '11_57'  ){ range = '114740046 - 116774712 bp'; }
 else if( loc === '11_58'  ){ range = '116774713 - 118809379 bp'; }
 else if( loc === '11_59'  ){ range = '118809380 - 120844046 bp'; }
 else if( loc === '11_60'  ){ range = '120844047 - 122878713 bp'; }
 else if( loc === '11_61'  ){ range = '122878714 - 124913380 bp'; }
 else if( loc === '11_62'  ){ range = '124913381 - 126948047 bp'; }
 else if( loc === '11_63'  ){ range = '126948048 - 128982714 bp'; }
 else if( loc === '11_64'  ){ range = '128982715 - 131017381 bp'; }
 else if( loc === '11_65'  ){ range = '131017382 - 133052048 bp'; }
 else if( loc === '11_66'  ){ range = '133052049 - 135086622 bp'; }
 else if( loc === '12_1'  ){ range = '1 - 2105882 bp'; }
 else if( loc === '12_2'  ){ range = '2105883 - 4211765 bp'; }
 else if( loc === '12_3'  ){ range = '4211766 - 6317648 bp'; }
 else if( loc === '12_4'  ){ range = '6317649 - 8423531 bp'; }
 else if( loc === '12_5'  ){ range = '8423532 - 10529414 bp'; }
 else if( loc === '12_6'  ){ range = '10529415 - 12635297 bp'; }
 else if( loc === '12_7'  ){ range = '12635298 - 14741180 bp'; }
 else if( loc === '12_8'  ){ range = '14741181 - 16847063 bp'; }
 else if( loc === '12_9'  ){ range = '16847064 - 18952946 bp'; }
 else if( loc === '12_10'  ){ range = '18952947 - 21058829 bp'; }
 else if( loc === '12_11'  ){ range = '21058830 - 23164712 bp'; }
 else if( loc === '12_12'  ){ range = '23164713 - 25270595 bp'; }
 else if( loc === '12_13'  ){ range = '25270596 - 27376478 bp'; }
 else if( loc === '12_14'  ){ range = '27376479 - 29482361 bp'; }
 else if( loc === '12_15'  ){ range = '29482362 - 31588244 bp'; }
 else if( loc === '12_16'  ){ range = '31588245 - 33694127 bp'; }
 else if( loc === '12_17'  ){ range = '33694128 - 35800010 bp'; }
 else if( loc === '12_18'  ){ range = '35800011 - 37749517 bp'; }
 else if( loc === '12_19'  ){ range = '37749518 - 39699024 bp'; }
 else if( loc === '12_20'  ){ range = '39699025 - 41648531 bp'; }
 else if( loc === '12_21'  ){ range = '41648532 - 43598038 bp'; }
 else if( loc === '12_22'  ){ range = '43598039 - 45547545 bp'; }
 else if( loc === '12_23'  ){ range = '45547546 - 47497052 bp'; }
 else if( loc === '12_24'  ){ range = '47497053 - 49446559 bp'; }
 else if( loc === '12_25'  ){ range = '49446560 - 51396066 bp'; }
 else if( loc === '12_26'  ){ range = '51396067 - 53345573 bp'; }
 else if( loc === '12_27'  ){ range = '53345574 - 55295080 bp'; }
 else if( loc === '12_28'  ){ range = '55295081 - 57244587 bp'; }
 else if( loc === '12_29'  ){ range = '57244588 - 59194094 bp'; }
 else if( loc === '12_30'  ){ range = '59194095 - 61143601 bp'; }
 else if( loc === '12_31'  ){ range = '61143602 - 63093108 bp'; }
 else if( loc === '12_32'  ){ range = '63093109 - 65042615 bp'; }
 else if( loc === '12_33'  ){ range = '65042616 - 66992122 bp'; }
 else if( loc === '12_34'  ){ range = '66992123 - 68941629 bp'; }
 else if( loc === '12_35'  ){ range = '68941630 - 70891136 bp'; }
 else if( loc === '12_36'  ){ range = '70891137 - 72840643 bp'; }
 else if( loc === '12_37'  ){ range = '72840644 - 74790150 bp'; }
 else if( loc === '12_38'  ){ range = '74790151 - 76739657 bp'; }
 else if( loc === '12_39'  ){ range = '76739658 - 78689164 bp'; }
 else if( loc === '12_40'  ){ range = '78689165 - 80638671 bp'; }
 else if( loc === '12_41'  ){ range = '80638672 - 82588178 bp'; }
 else if( loc === '12_42'  ){ range = '82588179 - 84537685 bp'; }
 else if( loc === '12_43'  ){ range = '84537686 - 86487192 bp'; }
 else if( loc === '12_44'  ){ range = '86487193 - 88436699 bp'; }
 else if( loc === '12_45'  ){ range = '88436700 - 90386206 bp'; }
 else if( loc === '12_46'  ){ range = '90386207 - 92335713 bp'; }
 else if( loc === '12_47'  ){ range = '92335714 - 94285220 bp'; }
 else if( loc === '12_48'  ){ range = '94285221 - 96234727 bp'; }
 else if( loc === '12_49'  ){ range = '96234728 - 98184234 bp'; }
 else if( loc === '12_50'  ){ range = '98184235 - 100133741 bp'; }
 else if( loc === '12_51'  ){ range = '100133742 - 102083248 bp'; }
 else if( loc === '12_52'  ){ range = '102083249 - 104032755 bp'; }
 else if( loc === '12_53'  ){ range = '104032756 - 105982262 bp'; }
 else if( loc === '12_54'  ){ range = '105982263 - 107931769 bp'; }
 else if( loc === '12_55'  ){ range = '107931770 - 109881276 bp'; }
 else if( loc === '12_56'  ){ range = '109881277 - 111830783 bp'; }
 else if( loc === '12_57'  ){ range = '111830784 - 113780290 bp'; }
 else if( loc === '12_58'  ){ range = '113780291 - 115729797 bp'; }
 else if( loc === '12_59'  ){ range = '115729798 - 117679304 bp'; }
 else if( loc === '12_60'  ){ range = '117679305 - 119628811 bp'; }
 else if( loc === '12_61'  ){ range = '119628812 - 121578318 bp'; }
 else if( loc === '12_62'  ){ range = '121578319 - 123527825 bp'; }
 else if( loc === '12_63'  ){ range = '123527826 - 125477332 bp'; }
 else if( loc === '12_64'  ){ range = '125477333 - 127426839 bp'; }
 else if( loc === '12_65'  ){ range = '127426840 - 129376346 bp'; }
 else if( loc === '12_66'  ){ range = '129376347 - 131325853 bp'; }
 else if( loc === '12_67'  ){ range = '131325854 - 133275309 bp'; }
 else if( loc === '13_1'  ){ range = '1 - 2557143 bp'; }
 else if( loc === '13_2'  ){ range = '2557144 - 5114287 bp'; }
 else if( loc === '13_3'  ){ range = '5114288 - 7671431 bp'; }
 else if( loc === '13_4'  ){ range = '7671432 - 10228575 bp'; }
 else if( loc === '13_5'  ){ range = '10228576 - 12785719 bp'; }
 else if( loc === '13_6'  ){ range = '12785720 - 15342863 bp'; }
 else if( loc === '13_7'  ){ range = '15342864 - 17900007 bp'; }
 else if( loc === '13_8'  ){ range = '17900008 - 19868668 bp'; }
 else if( loc === '13_9'  ){ range = '19868669 - 21837329 bp'; }
 else if( loc === '13_10'  ){ range = '21837330 - 23805990 bp'; }
 else if( loc === '13_11'  ){ range = '23805991 - 25774651 bp'; }
 else if( loc === '13_12'  ){ range = '25774652 - 27743312 bp'; }
 else if( loc === '13_13'  ){ range = '27743313 - 29711973 bp'; }
 else if( loc === '13_14'  ){ range = '29711974 - 31680634 bp'; }
 else if( loc === '13_15'  ){ range = '31680635 - 33649295 bp'; }
 else if( loc === '13_16'  ){ range = '33649296 - 35617956 bp'; }
 else if( loc === '13_17'  ){ range = '35617957 - 37586617 bp'; }
 else if( loc === '13_18'  ){ range = '37586618 - 39555278 bp'; }
 else if( loc === '13_19'  ){ range = '39555279 - 41523939 bp'; }
 else if( loc === '13_20'  ){ range = '41523940 - 43492600 bp'; }
 else if( loc === '13_21'  ){ range = '43492601 - 45461261 bp'; }
 else if( loc === '13_22'  ){ range = '45461262 - 47429922 bp'; }
 else if( loc === '13_23'  ){ range = '47429923 - 49398583 bp'; }
 else if( loc === '13_24'  ){ range = '49398584 - 51367244 bp'; }
 else if( loc === '13_25'  ){ range = '51367245 - 53335905 bp'; }
 else if( loc === '13_26'  ){ range = '53335906 - 55304566 bp'; }
 else if( loc === '13_27'  ){ range = '55304567 - 57273227 bp'; }
 else if( loc === '13_28'  ){ range = '57273228 - 59241888 bp'; }
 else if( loc === '13_29'  ){ range = '59241889 - 61210549 bp'; }
 else if( loc === '13_30'  ){ range = '61210550 - 63179210 bp'; }
 else if( loc === '13_31'  ){ range = '63179211 - 65147871 bp'; }
 else if( loc === '13_32'  ){ range = '65147872 - 67116532 bp'; }
 else if( loc === '13_33'  ){ range = '67116533 - 69085193 bp'; }
 else if( loc === '13_34'  ){ range = '69085194 - 71053854 bp'; }
 else if( loc === '13_35'  ){ range = '71053855 - 73022515 bp'; }
 else if( loc === '13_36'  ){ range = '73022516 - 74991176 bp'; }
 else if( loc === '13_37'  ){ range = '74991177 - 76959837 bp'; }
 else if( loc === '13_38'  ){ range = '76959838 - 78928498 bp'; }
 else if( loc === '13_39'  ){ range = '78928499 - 80897159 bp'; }
 else if( loc === '13_40'  ){ range = '80897160 - 82865820 bp'; }
 else if( loc === '13_41'  ){ range = '82865821 - 84834481 bp'; }
 else if( loc === '13_42'  ){ range = '84834482 - 86803142 bp'; }
 else if( loc === '13_43'  ){ range = '86803143 - 88771803 bp'; }
 else if( loc === '13_44'  ){ range = '88771804 - 90740464 bp'; }
 else if( loc === '13_45'  ){ range = '90740465 - 92709125 bp'; }
 else if( loc === '13_46'  ){ range = '92709126 - 94677786 bp'; }
 else if( loc === '13_47'  ){ range = '94677787 - 96646447 bp'; }
 else if( loc === '13_48'  ){ range = '96646448 - 98615108 bp'; }
 else if( loc === '13_49'  ){ range = '98615109 - 100583769 bp'; }
 else if( loc === '13_50'  ){ range = '100583770 - 102552430 bp'; }
 else if( loc === '13_51'  ){ range = '102552431 - 104521091 bp'; }
 else if( loc === '13_52'  ){ range = '104521092 - 106489752 bp'; }
 else if( loc === '13_53'  ){ range = '106489753 - 108458413 bp'; }
 else if( loc === '13_54'  ){ range = '108458414 - 110427074 bp'; }
 else if( loc === '13_55'  ){ range = '110427075 - 112395735 bp'; }
 else if( loc === '13_56'  ){ range = '112395736 - 114364328 bp'; }
 else if( loc === '14_1'  ){ range = '1 - 2933333 bp'; }
 else if( loc === '14_2'  ){ range = '2933334 - 5866667 bp'; }
 else if( loc === '14_3'  ){ range = '5866668 - 8800001 bp'; }
 else if( loc === '14_4'  ){ range = '8800002 - 11733335 bp'; }
 else if( loc === '14_5'  ){ range = '11733336 - 14666669 bp'; }
 else if( loc === '14_6'  ){ range = '14666670 - 17600003 bp'; }
 else if( loc === '14_7'  ){ range = '17600004 - 19587642 bp'; }
 else if( loc === '14_8'  ){ range = '19587643 - 21575281 bp'; }
 else if( loc === '14_9'  ){ range = '21575282 - 23562920 bp'; }
 else if( loc === '14_10'  ){ range = '23562921 - 25550559 bp'; }
 else if( loc === '14_11'  ){ range = '25550560 - 27538198 bp'; }
 else if( loc === '14_12'  ){ range = '27538199 - 29525837 bp'; }
 else if( loc === '14_13'  ){ range = '29525838 - 31513476 bp'; }
 else if( loc === '14_14'  ){ range = '31513477 - 33501115 bp'; }
 else if( loc === '14_15'  ){ range = '33501116 - 35488754 bp'; }
 else if( loc === '14_16'  ){ range = '35488755 - 37476393 bp'; }
 else if( loc === '14_17'  ){ range = '37476394 - 39464032 bp'; }
 else if( loc === '14_18'  ){ range = '39464033 - 41451671 bp'; }
 else if( loc === '14_19'  ){ range = '41451672 - 43439310 bp'; }
 else if( loc === '14_20'  ){ range = '43439311 - 45426949 bp'; }
 else if( loc === '14_21'  ){ range = '45426950 - 47414588 bp'; }
 else if( loc === '14_22'  ){ range = '47414589 - 49402227 bp'; }
 else if( loc === '14_23'  ){ range = '49402228 - 51389866 bp'; }
 else if( loc === '14_24'  ){ range = '51389867 - 53377505 bp'; }
 else if( loc === '14_25'  ){ range = '53377506 - 55365144 bp'; }
 else if( loc === '14_26'  ){ range = '55365145 - 57352783 bp'; }
 else if( loc === '14_27'  ){ range = '57352784 - 59340422 bp'; }
 else if( loc === '14_28'  ){ range = '59340423 - 61328061 bp'; }
 else if( loc === '14_29'  ){ range = '61328062 - 63315700 bp'; }
 else if( loc === '14_30'  ){ range = '63315701 - 65303339 bp'; }
 else if( loc === '14_31'  ){ range = '65303340 - 67290978 bp'; }
 else if( loc === '14_32'  ){ range = '67290979 - 69278617 bp'; }
 else if( loc === '14_33'  ){ range = '69278618 - 71266256 bp'; }
 else if( loc === '14_34'  ){ range = '71266257 - 73253895 bp'; }
 else if( loc === '14_35'  ){ range = '73253896 - 75241534 bp'; }
 else if( loc === '14_36'  ){ range = '75241535 - 77229173 bp'; }
 else if( loc === '14_37'  ){ range = '77229174 - 79216812 bp'; }
 else if( loc === '14_38'  ){ range = '79216813 - 81204451 bp'; }
 else if( loc === '14_39'  ){ range = '81204452 - 83192090 bp'; }
 else if( loc === '14_40'  ){ range = '83192091 - 85179729 bp'; }
 else if( loc === '14_41'  ){ range = '85179730 - 87167368 bp'; }
 else if( loc === '14_42'  ){ range = '87167369 - 89155007 bp'; }
 else if( loc === '14_43'  ){ range = '89155008 - 91142646 bp'; }
 else if( loc === '14_44'  ){ range = '91142647 - 93130285 bp'; }
 else if( loc === '14_45'  ){ range = '93130286 - 95117924 bp'; }
 else if( loc === '14_46'  ){ range = '95117925 - 97105563 bp'; }
 else if( loc === '14_47'  ){ range = '97105564 - 99093202 bp'; }
 else if( loc === '14_48'  ){ range = '99093203 - 101080841 bp'; }
 else if( loc === '14_49'  ){ range = '101080842 - 103068480 bp'; }
 else if( loc === '14_50'  ){ range = '103068481 - 105056119 bp'; }
 else if( loc === '14_51'  ){ range = '105056120 - 107043718 bp'; }
 else if( loc === '15_1'  ){ range = '1 - 3166667 bp'; }
 else if( loc === '15_2'  ){ range = '3166668 - 6333335 bp'; }
 else if( loc === '15_3'  ){ range = '6333336 - 9500003 bp'; }
 else if( loc === '15_4'  ){ range = '9500004 - 12666671 bp'; }
 else if( loc === '15_5'  ){ range = '12666672 - 15833339 bp'; }
 else if( loc === '15_6'  ){ range = '15833340 - 19000007 bp'; }
 else if( loc === '15_7'  ){ range = '19000008 - 21024183 bp'; }
 else if( loc === '15_8'  ){ range = '21024184 - 23048359 bp'; }
 else if( loc === '15_9'  ){ range = '23048360 - 25072535 bp'; }
 else if( loc === '15_10'  ){ range = '25072536 - 27096711 bp'; }
 else if( loc === '15_11'  ){ range = '27096712 - 29120887 bp'; }
 else if( loc === '15_12'  ){ range = '29120888 - 31145063 bp'; }
 else if( loc === '15_13'  ){ range = '31145064 - 33169239 bp'; }
 else if( loc === '15_14'  ){ range = '33169240 - 35193415 bp'; }
 else if( loc === '15_15'  ){ range = '35193416 - 37217591 bp'; }
 else if( loc === '15_16'  ){ range = '37217592 - 39241767 bp'; }
 else if( loc === '15_17'  ){ range = '39241768 - 41265943 bp'; }
 else if( loc === '15_18'  ){ range = '41265944 - 43290119 bp'; }
 else if( loc === '15_19'  ){ range = '43290120 - 45314295 bp'; }
 else if( loc === '15_20'  ){ range = '45314296 - 47338471 bp'; }
 else if( loc === '15_21'  ){ range = '47338472 - 49362647 bp'; }
 else if( loc === '15_22'  ){ range = '49362648 - 51386823 bp'; }
 else if( loc === '15_23'  ){ range = '51386824 - 53410999 bp'; }
 else if( loc === '15_24'  ){ range = '53411000 - 55435175 bp'; }
 else if( loc === '15_25'  ){ range = '55435176 - 57459351 bp'; }
 else if( loc === '15_26'  ){ range = '57459352 - 59483527 bp'; }
 else if( loc === '15_27'  ){ range = '59483528 - 61507703 bp'; }
 else if( loc === '15_28'  ){ range = '61507704 - 63531879 bp'; }
 else if( loc === '15_29'  ){ range = '63531880 - 65556055 bp'; }
 else if( loc === '15_30'  ){ range = '65556056 - 67580231 bp'; }
 else if( loc === '15_31'  ){ range = '67580232 - 69604407 bp'; }
 else if( loc === '15_32'  ){ range = '69604408 - 71628583 bp'; }
 else if( loc === '15_33'  ){ range = '71628584 - 73652759 bp'; }
 else if( loc === '15_34'  ){ range = '73652760 - 75676935 bp'; }
 else if( loc === '15_35'  ){ range = '75676936 - 77701111 bp'; }
 else if( loc === '15_36'  ){ range = '77701112 - 79725287 bp'; }
 else if( loc === '15_37'  ){ range = '79725288 - 81749463 bp'; }
 else if( loc === '15_38'  ){ range = '81749464 - 83773639 bp'; }
 else if( loc === '15_39'  ){ range = '83773640 - 85797815 bp'; }
 else if( loc === '15_40'  ){ range = '85797816 - 87821991 bp'; }
 else if( loc === '15_41'  ){ range = '87821992 - 89846167 bp'; }
 else if( loc === '15_42'  ){ range = '89846168 - 91870343 bp'; }
 else if( loc === '15_43'  ){ range = '91870344 - 93894519 bp'; }
 else if( loc === '15_44'  ){ range = '93894520 - 95918695 bp'; }
 else if( loc === '15_45'  ){ range = '95918696 - 97942871 bp'; }
 else if( loc === '15_46'  ){ range = '97942872 - 99967047 bp'; }
 else if( loc === '15_47'  ){ range = '99967048 - 101991189 bp'; }
 else if( loc === '16_1'  ){ range = '1 - 2152941 bp'; }
 else if( loc === '16_2'  ){ range = '2152942 - 4305883 bp'; }
 else if( loc === '16_3'  ){ range = '4305884 - 6458825 bp'; }
 else if( loc === '16_4'  ){ range = '6458826 - 8611767 bp'; }
 else if( loc === '16_5'  ){ range = '8611768 - 10764709 bp'; }
 else if( loc === '16_6'  ){ range = '10764710 - 12917651 bp'; }
 else if( loc === '16_7'  ){ range = '12917652 - 15070593 bp'; }
 else if( loc === '16_8'  ){ range = '15070594 - 17223535 bp'; }
 else if( loc === '16_9'  ){ range = '17223536 - 19376477 bp'; }
 else if( loc === '16_10'  ){ range = '19376478 - 21529419 bp'; }
 else if( loc === '16_11'  ){ range = '21529420 - 23682361 bp'; }
 else if( loc === '16_12'  ){ range = '23682362 - 25835303 bp'; }
 else if( loc === '16_13'  ){ range = '25835304 - 27988245 bp'; }
 else if( loc === '16_14'  ){ range = '27988246 - 30141187 bp'; }
 else if( loc === '16_15'  ){ range = '30141188 - 32294129 bp'; }
 else if( loc === '16_16'  ){ range = '32294130 - 34447071 bp'; }
 else if( loc === '16_17'  ){ range = '34447072 - 36600013 bp'; }
 else if( loc === '16_18'  ){ range = '36600014 - 38839112 bp'; }
 else if( loc === '16_19'  ){ range = '38839113 - 41078211 bp'; }
 else if( loc === '16_20'  ){ range = '41078212 - 43317310 bp'; }
 else if( loc === '16_21'  ){ range = '43317311 - 45556409 bp'; }
 else if( loc === '16_22'  ){ range = '45556410 - 47795508 bp'; }
 else if( loc === '16_23'  ){ range = '47795509 - 50034607 bp'; }
 else if( loc === '16_24'  ){ range = '50034608 - 52273706 bp'; }
 else if( loc === '16_25'  ){ range = '52273707 - 54512805 bp'; }
 else if( loc === '16_26'  ){ range = '54512806 - 56751904 bp'; }
 else if( loc === '16_27'  ){ range = '56751905 - 58991003 bp'; }
 else if( loc === '16_28'  ){ range = '58991004 - 61230102 bp'; }
 else if( loc === '16_29'  ){ range = '61230103 - 63469201 bp'; }
 else if( loc === '16_30'  ){ range = '63469202 - 65708300 bp'; }
 else if( loc === '16_31'  ){ range = '65708301 - 67947399 bp'; }
 else if( loc === '16_32'  ){ range = '67947400 - 70186498 bp'; }
 else if( loc === '16_33'  ){ range = '70186499 - 72425597 bp'; }
 else if( loc === '16_34'  ){ range = '72425598 - 74664696 bp'; }
 else if( loc === '16_35'  ){ range = '74664697 - 76903795 bp'; }
 else if( loc === '16_36'  ){ range = '76903796 - 79142894 bp'; }
 else if( loc === '16_37'  ){ range = '79142895 - 81381993 bp'; }
 else if( loc === '16_38'  ){ range = '81381994 - 83621092 bp'; }
 else if( loc === '16_39'  ){ range = '83621093 - 85860191 bp'; }
 else if( loc === '16_40'  ){ range = '85860192 - 88099290 bp'; }
 else if( loc === '16_41'  ){ range = '88099291 - 90338345 bp'; }
 else if( loc === '17_1'  ){ range = '1 - 2400000 bp'; }
 else if( loc === '17_2'  ){ range = '2400001 - 4800001 bp'; }
 else if( loc === '17_3'  ){ range = '4800002 - 7200002 bp'; }
 else if( loc === '17_4'  ){ range = '7200003 - 9600003 bp'; }
 else if( loc === '17_5'  ){ range = '9600004 - 1.2e+07 bp'; }
 else if( loc === '17_6'  ){ range = '1.2e+07 - 14400005 bp'; }
 else if( loc === '17_7'  ){ range = '14400006 - 16800006 bp'; }
 else if( loc === '17_8'  ){ range = '16800007 - 19200007 bp'; }
 else if( loc === '17_9'  ){ range = '19200008 - 21600008 bp'; }
 else if( loc === '17_10'  ){ range = '21600009 - 24000009 bp'; }
 else if( loc === '17_11'  ){ range = '24000010 - 26194730 bp'; }
 else if( loc === '17_12'  ){ range = '26194731 - 28389451 bp'; }
 else if( loc === '17_13'  ){ range = '28389452 - 30584172 bp'; }
 else if( loc === '17_14'  ){ range = '30584173 - 32778893 bp'; }
 else if( loc === '17_15'  ){ range = '32778894 - 34973614 bp'; }
 else if( loc === '17_16'  ){ range = '34973615 - 37168335 bp'; }
 else if( loc === '17_17'  ){ range = '37168336 - 39363056 bp'; }
 else if( loc === '17_18'  ){ range = '39363057 - 41557777 bp'; }
 else if( loc === '17_19'  ){ range = '41557778 - 43752498 bp'; }
 else if( loc === '17_20'  ){ range = '43752499 - 45947219 bp'; }
 else if( loc === '17_21'  ){ range = '45947220 - 48141940 bp'; }
 else if( loc === '17_22'  ){ range = '48141941 - 50336661 bp'; }
 else if( loc === '17_23'  ){ range = '50336662 - 52531382 bp'; }
 else if( loc === '17_24'  ){ range = '52531383 - 54726103 bp'; }
 else if( loc === '17_25'  ){ range = '54726104 - 56920824 bp'; }
 else if( loc === '17_26'  ){ range = '56920825 - 59115545 bp'; }
 else if( loc === '17_27'  ){ range = '59115546 - 61310266 bp'; }
 else if( loc === '17_28'  ){ range = '61310267 - 63504987 bp'; }
 else if( loc === '17_29'  ){ range = '63504988 - 65699708 bp'; }
 else if( loc === '17_30'  ){ range = '65699709 - 67894429 bp'; }
 else if( loc === '17_31'  ){ range = '67894430 - 70089150 bp'; }
 else if( loc === '17_32'  ){ range = '70089151 - 72283871 bp'; }
 else if( loc === '17_33'  ){ range = '72283872 - 74478592 bp'; }
 else if( loc === '17_34'  ){ range = '74478593 - 76673313 bp'; }
 else if( loc === '17_35'  ){ range = '76673314 - 78868034 bp'; }
 else if( loc === '17_36'  ){ range = '78868035 - 81062755 bp'; }
 else if( loc === '17_37'  ){ range = '81062756 - 83257441 bp'; }
 else if( loc === '18_1'  ){ range = '1 - 2457143 bp'; }
 else if( loc === '18_2'  ){ range = '2457144 - 4914287 bp'; }
 else if( loc === '18_3'  ){ range = '4914288 - 7371431 bp'; }
 else if( loc === '18_4'  ){ range = '7371432 - 9828575 bp'; }
 else if( loc === '18_5'  ){ range = '9828576 - 12285719 bp'; }
 else if( loc === '18_6'  ){ range = '12285720 - 14742863 bp'; }
 else if( loc === '18_7'  ){ range = '14742864 - 17200007 bp'; }
 else if( loc === '18_8'  ){ range = '17200008 - 19456197 bp'; }
 else if( loc === '18_9'  ){ range = '19456198 - 21712387 bp'; }
 else if( loc === '18_10'  ){ range = '21712388 - 23968577 bp'; }
 else if( loc === '18_11'  ){ range = '23968578 - 26224767 bp'; }
 else if( loc === '18_12'  ){ range = '26224768 - 28480957 bp'; }
 else if( loc === '18_13'  ){ range = '28480958 - 30737147 bp'; }
 else if( loc === '18_14'  ){ range = '30737148 - 32993337 bp'; }
 else if( loc === '18_15'  ){ range = '32993338 - 35249527 bp'; }
 else if( loc === '18_16'  ){ range = '35249528 - 37505717 bp'; }
 else if( loc === '18_17'  ){ range = '37505718 - 39761907 bp'; }
 else if( loc === '18_18'  ){ range = '39761908 - 42018097 bp'; }
 else if( loc === '18_19'  ){ range = '42018098 - 44274287 bp'; }
 else if( loc === '18_20'  ){ range = '44274288 - 46530477 bp'; }
 else if( loc === '18_21'  ){ range = '46530478 - 48786667 bp'; }
 else if( loc === '18_22'  ){ range = '48786668 - 51042857 bp'; }
 else if( loc === '18_23'  ){ range = '51042858 - 53299047 bp'; }
 else if( loc === '18_24'  ){ range = '53299048 - 55555237 bp'; }
 else if( loc === '18_25'  ){ range = '55555238 - 57811427 bp'; }
 else if( loc === '18_26'  ){ range = '57811428 - 60067617 bp'; }
 else if( loc === '18_27'  ){ range = '60067618 - 62323807 bp'; }
 else if( loc === '18_28'  ){ range = '62323808 - 64579997 bp'; }
 else if( loc === '18_29'  ){ range = '64579998 - 66836187 bp'; }
 else if( loc === '18_30'  ){ range = '66836188 - 69092377 bp'; }
 else if( loc === '18_31'  ){ range = '69092378 - 71348567 bp'; }
 else if( loc === '18_32'  ){ range = '71348568 - 73604757 bp'; }
 else if( loc === '18_33'  ){ range = '73604758 - 75860947 bp'; }
 else if( loc === '18_34'  ){ range = '75860948 - 78117137 bp'; }
 else if( loc === '18_35'  ){ range = '78117138 - 80373285 bp'; }
 else if( loc === '19_1'  ){ range = '1 - 2038462 bp'; }
 else if( loc === '19_2'  ){ range = '2038463 - 4076925 bp'; }
 else if( loc === '19_3'  ){ range = '4076926 - 6115388 bp'; }
 else if( loc === '19_4'  ){ range = '6115389 - 8153851 bp'; }
 else if( loc === '19_5'  ){ range = '8153852 - 10192314 bp'; }
 else if( loc === '19_6'  ){ range = '10192315 - 12230777 bp'; }
 else if( loc === '19_7'  ){ range = '12230778 - 14269240 bp'; }
 else if( loc === '19_8'  ){ range = '14269241 - 16307703 bp'; }
 else if( loc === '19_9'  ){ range = '16307704 - 18346166 bp'; }
 else if( loc === '19_10'  ){ range = '18346167 - 20384629 bp'; }
 else if( loc === '19_11'  ){ range = '20384630 - 22423092 bp'; }
 else if( loc === '19_12'  ){ range = '22423093 - 24461555 bp'; }
 else if( loc === '19_13'  ){ range = '24461556 - 26500018 bp'; }
 else if( loc === '19_14'  ){ range = '26500019 - 28507370 bp'; }
 else if( loc === '19_15'  ){ range = '28507371 - 30514722 bp'; }
 else if( loc === '19_16'  ){ range = '30514723 - 32522074 bp'; }
 else if( loc === '19_17'  ){ range = '32522075 - 34529426 bp'; }
 else if( loc === '19_18'  ){ range = '34529427 - 36536778 bp'; }
 else if( loc === '19_19'  ){ range = '36536779 - 38544130 bp'; }
 else if( loc === '19_20'  ){ range = '38544131 - 40551482 bp'; }
 else if( loc === '19_21'  ){ range = '40551483 - 42558834 bp'; }
 else if( loc === '19_22'  ){ range = '42558835 - 44566186 bp'; }
 else if( loc === '19_23'  ){ range = '44566187 - 46573538 bp'; }
 else if( loc === '19_24'  ){ range = '46573539 - 48580890 bp'; }
 else if( loc === '19_25'  ){ range = '48580891 - 50588242 bp'; }
 else if( loc === '19_26'  ){ range = '50588243 - 52595594 bp'; }
 else if( loc === '19_27'  ){ range = '52595595 - 54602946 bp'; }
 else if( loc === '19_28'  ){ range = '54602947 - 56610298 bp'; }
 else if( loc === '19_29'  ){ range = '56610299 - 58617616 bp'; }
 else if( loc === '20_1'  ){ range = '1 - 2291667 bp'; }
 else if( loc === '20_2'  ){ range = '2291668 - 4583335 bp'; }
 else if( loc === '20_3'  ){ range = '4583336 - 6875003 bp'; }
 else if( loc === '20_4'  ){ range = '6875004 - 9166671 bp'; }
 else if( loc === '20_5'  ){ range = '9166672 - 11458339 bp'; }
 else if( loc === '20_6'  ){ range = '11458340 - 13750007 bp'; }
 else if( loc === '20_7'  ){ range = '13750008 - 16041675 bp'; }
 else if( loc === '20_8'  ){ range = '16041676 - 18333343 bp'; }
 else if( loc === '20_9'  ){ range = '18333344 - 20625011 bp'; }
 else if( loc === '20_10'  ){ range = '20625012 - 22916679 bp'; }
 else if( loc === '20_11'  ){ range = '22916680 - 25208347 bp'; }
 else if( loc === '20_12'  ){ range = '25208348 - 27500015 bp'; }
 else if( loc === '20_13'  ){ range = '27500016 - 29809026 bp'; }
 else if( loc === '20_14'  ){ range = '29809027 - 32118037 bp'; }
 else if( loc === '20_15'  ){ range = '32118038 - 34427048 bp'; }
 else if( loc === '20_16'  ){ range = '34427049 - 36736059 bp'; }
 else if( loc === '20_17'  ){ range = '36736060 - 39045070 bp'; }
 else if( loc === '20_18'  ){ range = '39045071 - 41354081 bp'; }
 else if( loc === '20_19'  ){ range = '41354082 - 43663092 bp'; }
 else if( loc === '20_20'  ){ range = '43663093 - 45972103 bp'; }
 else if( loc === '20_21'  ){ range = '45972104 - 48281114 bp'; }
 else if( loc === '20_22'  ){ range = '48281115 - 50590125 bp'; }
 else if( loc === '20_23'  ){ range = '50590126 - 52899136 bp'; }
 else if( loc === '20_24'  ){ range = '52899137 - 55208147 bp'; }
 else if( loc === '20_25'  ){ range = '55208148 - 57517158 bp'; }
 else if( loc === '20_26'  ){ range = '57517159 - 59826169 bp'; }
 else if( loc === '20_27'  ){ range = '59826170 - 62135180 bp'; }
 else if( loc === '20_28'  ){ range = '62135181 - 64444167 bp'; }
 else if( loc === '21_1'  ){ range = '1 - 2640000 bp'; }
 else if( loc === '21_2'  ){ range = '2640001 - 5280001 bp'; }
 else if( loc === '21_3'  ){ range = '5280002 - 7920002 bp'; }
 else if( loc === '21_4'  ){ range = '7920003 - 10560003 bp'; }
 else if( loc === '21_5'  ){ range = '10560004 - 13200004 bp'; }
 else if( loc === '21_6'  ){ range = '13200005 - 15294379 bp'; }
 else if( loc === '21_7'  ){ range = '15294380 - 17388754 bp'; }
 else if( loc === '21_8'  ){ range = '17388755 - 19483129 bp'; }
 else if( loc === '21_9'  ){ range = '19483130 - 21577504 bp'; }
 else if( loc === '21_10'  ){ range = '21577505 - 23671879 bp'; }
 else if( loc === '21_11'  ){ range = '23671880 - 25766254 bp'; }
 else if( loc === '21_12'  ){ range = '25766255 - 27860629 bp'; }
 else if( loc === '21_13'  ){ range = '27860630 - 29955004 bp'; }
 else if( loc === '21_14'  ){ range = '29955005 - 32049379 bp'; }
 else if( loc === '21_15'  ){ range = '32049380 - 34143754 bp'; }
 else if( loc === '21_16'  ){ range = '34143755 - 36238129 bp'; }
 else if( loc === '21_17'  ){ range = '36238130 - 38332504 bp'; }
 else if( loc === '21_18'  ){ range = '38332505 - 40426879 bp'; }
 else if( loc === '21_19'  ){ range = '40426880 - 42521254 bp'; }
 else if( loc === '21_20'  ){ range = '42521255 - 44615629 bp'; }
 else if( loc === '21_21'  ){ range = '44615630 - 46709983 bp'; }
 else if( loc === '22_1'  ){ range = '1 - 2940000 bp'; }
 else if( loc === '22_2'  ){ range = '2940001 - 5880001 bp'; }
 else if( loc === '22_3'  ){ range = '5880002 - 8820002 bp'; }
 else if( loc === '22_4'  ){ range = '8820003 - 11760003 bp'; }
 else if( loc === '22_5'  ){ range = '11760004 - 14700004 bp'; }
 else if( loc === '22_6'  ){ range = '14700005 - 16957409 bp'; }
 else if( loc === '22_7'  ){ range = '16957410 - 19214814 bp'; }
 else if( loc === '22_8'  ){ range = '19214815 - 21472219 bp'; }
 else if( loc === '22_9'  ){ range = '21472220 - 23729624 bp'; }
 else if( loc === '22_10'  ){ range = '23729625 - 25987029 bp'; }
 else if( loc === '22_11'  ){ range = '25987030 - 28244434 bp'; }
 else if( loc === '22_12'  ){ range = '28244435 - 30501839 bp'; }
 else if( loc === '22_13'  ){ range = '30501840 - 32759244 bp'; }
 else if( loc === '22_14'  ){ range = '32759245 - 35016649 bp'; }
 else if( loc === '22_15'  ){ range = '35016650 - 37274054 bp'; }
 else if( loc === '22_16'  ){ range = '37274055 - 39531459 bp'; }
 else if( loc === '22_17'  ){ range = '39531460 - 41788864 bp'; }
 else if( loc === '22_18'  ){ range = '41788865 - 44046269 bp'; }
 else if( loc === '22_19'  ){ range = '44046270 - 46303674 bp'; }
 else if( loc === '22_20'  ){ range = '46303675 - 48561079 bp'; }
 else if( loc === '22_21'  ){ range = '48561080 - 50818468 bp'; }
 else if( loc === 'x_1'  ){ range = '1 - 2164286 bp'; }
 else if( loc === 'x_2'  ){ range = '2164287 - 4328573 bp'; }
 else if( loc === 'x_3'  ){ range = '4328574 - 6492860 bp'; }
 else if( loc === 'x_4'  ){ range = '6492861 - 8657147 bp'; }
 else if( loc === 'x_5'  ){ range = '8657148 - 10821434 bp'; }
 else if( loc === 'x_6'  ){ range = '10821435 - 12985721 bp'; }
 else if( loc === 'x_7'  ){ range = '12985722 - 15150008 bp'; }
 else if( loc === 'x_8'  ){ range = '15150009 - 17314295 bp'; }
 else if( loc === 'x_9'  ){ range = '17314296 - 19478582 bp'; }
 else if( loc === 'x_10'  ){ range = '19478583 - 21642869 bp'; }
 else if( loc === 'x_11'  ){ range = '21642870 - 23807156 bp'; }
 else if( loc === 'x_12'  ){ range = '23807157 - 25971443 bp'; }
 else if( loc === 'x_13'  ){ range = '25971444 - 28135730 bp'; }
 else if( loc === 'x_14'  ){ range = '28135731 - 30300017 bp'; }
 else if( loc === 'x_15'  ){ range = '30300018 - 32464304 bp'; }
 else if( loc === 'x_16'  ){ range = '32464305 - 34628591 bp'; }
 else if( loc === 'x_17'  ){ range = '34628592 - 36792878 bp'; }
 else if( loc === 'x_18'  ){ range = '36792879 - 38957165 bp'; }
 else if( loc === 'x_19'  ){ range = '38957166 - 41121452 bp'; }
 else if( loc === 'x_20'  ){ range = '41121453 - 43285739 bp'; }
 else if( loc === 'x_21'  ){ range = '43285740 - 45450026 bp'; }
 else if( loc === 'x_22'  ){ range = '45450027 - 47614313 bp'; }
 else if( loc === 'x_23'  ){ range = '47614314 - 49778600 bp'; }
 else if( loc === 'x_24'  ){ range = '49778601 - 51942887 bp'; }
 else if( loc === 'x_25'  ){ range = '51942888 - 54107174 bp'; }
 else if( loc === 'x_26'  ){ range = '54107175 - 56271461 bp'; }
 else if( loc === 'x_27'  ){ range = '56271462 - 58435748 bp'; }
 else if( loc === 'x_28'  ){ range = '58435749 - 60600035 bp'; }
 else if( loc === 'x_29'  ){ range = '60600036 - 62674838 bp'; }
 else if( loc === 'x_30'  ){ range = '62674839 - 64749641 bp'; }
 else if( loc === 'x_31'  ){ range = '64749642 - 66824444 bp'; }
 else if( loc === 'x_32'  ){ range = '66824445 - 68899247 bp'; }
 else if( loc === 'x_33'  ){ range = '68899248 - 70974050 bp'; }
 else if( loc === 'x_34'  ){ range = '70974051 - 73048853 bp'; }
 else if( loc === 'x_35'  ){ range = '73048854 - 75123656 bp'; }
 else if( loc === 'x_36'  ){ range = '75123657 - 77198459 bp'; }
 else if( loc === 'x_37'  ){ range = '77198460 - 79273262 bp'; }
 else if( loc === 'x_38'  ){ range = '79273263 - 81348065 bp'; }
 else if( loc === 'x_39'  ){ range = '81348066 - 83422868 bp'; }
 else if( loc === 'x_40'  ){ range = '83422869 - 85497671 bp'; }
 else if( loc === 'x_41'  ){ range = '85497672 - 87572474 bp'; }
 else if( loc === 'x_42'  ){ range = '87572475 - 89647277 bp'; }
 else if( loc === 'x_43'  ){ range = '89647278 - 91722080 bp'; }
 else if( loc === 'x_44'  ){ range = '91722081 - 93796883 bp'; }
 else if( loc === 'x_45'  ){ range = '93796884 - 95871686 bp'; }
 else if( loc === 'x_46'  ){ range = '95871687 - 97946489 bp'; }
 else if( loc === 'x_47'  ){ range = '97946490 - 100021292 bp'; }
 else if( loc === 'x_48'  ){ range = '100021293 - 102096095 bp'; }
 else if( loc === 'x_49'  ){ range = '102096096 - 104170898 bp'; }
 else if( loc === 'x_50'  ){ range = '104170899 - 106245701 bp'; }
 else if( loc === 'x_51'  ){ range = '106245702 - 108320504 bp'; }
 else if( loc === 'x_52'  ){ range = '108320505 - 110395307 bp'; }
 else if( loc === 'x_53'  ){ range = '110395308 - 112470110 bp'; }
 else if( loc === 'x_54'  ){ range = '112470111 - 114544913 bp'; }
 else if( loc === 'x_55'  ){ range = '114544914 - 116619716 bp'; }
 else if( loc === 'x_56'  ){ range = '116619717 - 118694519 bp'; }
 else if( loc === 'x_57'  ){ range = '118694520 - 120769322 bp'; }
 else if( loc === 'x_58'  ){ range = '120769323 - 122844125 bp'; }
 else if( loc === 'x_59'  ){ range = '122844126 - 124918928 bp'; }
 else if( loc === 'x_60'  ){ range = '124918929 - 126993731 bp'; }
 else if( loc === 'x_61'  ){ range = '126993732 - 129068534 bp'; }
 else if( loc === 'x_62'  ){ range = '129068535 - 131143337 bp'; }
 else if( loc === 'x_63'  ){ range = '131143338 - 133218140 bp'; }
 else if( loc === 'x_64'  ){ range = '133218141 - 135292943 bp'; }
 else if( loc === 'x_65'  ){ range = '135292944 - 137367746 bp'; }
 else if( loc === 'x_66'  ){ range = '137367747 - 139442549 bp'; }
 else if( loc === 'x_67'  ){ range = '139442550 - 141517352 bp'; }
 else if( loc === 'x_68'  ){ range = '141517353 - 143592155 bp'; }
 else if( loc === 'x_69'  ){ range = '143592156 - 145666958 bp'; }
 else if( loc === 'x_70'  ){ range = '145666959 - 147741761 bp'; }
 else if( loc === 'x_71'  ){ range = '147741762 - 149816564 bp'; }
 else if( loc === 'x_72'  ){ range = '149816565 - 151891367 bp'; }
 else if( loc === 'x_73'  ){ range = '151891368 - 153966170 bp'; }
 else if( loc === 'x_74'  ){ range = '153966171 - 156040895 bp'; }
 else if( loc === 'y_1'  ){ range = '1 - 2500000 bp'; }
 else if( loc === 'y_2'  ){ range = '2500001 - 5000001 bp'; }
 else if( loc === 'y_3'  ){ range = '5000002 - 7500002 bp'; }
 else if( loc === 'y_4'  ){ range = '7500003 - 1e+07 bp'; }
 else if( loc === 'y_5'  ){ range = '1e+07 - 12500004 bp'; }
 else if( loc === 'y_6'  ){ range = '12500005 - 14533069 bp'; }
 else if( loc === 'y_7'  ){ range = '14533070 - 16566134 bp'; }
 else if( loc === 'y_8'  ){ range = '16566135 - 18599199 bp'; }
 else if( loc === 'y_9'  ){ range = '18599200 - 20632264 bp'; }
 else if( loc === 'y_10'  ){ range = '20632265 - 22665329 bp'; }
 else if( loc === 'y_11'  ){ range = '22665330 - 24698394 bp'; }
 else if( loc === 'y_12'  ){ range = '24698395 - 26731459 bp'; }
 else if( loc === 'y_13'  ){ range = '26731460 - 28764524 bp'; }
 else if( loc === 'y_14'  ){ range = '28764525 - 30797589 bp'; }
 else if( loc === 'y_15'  ){ range = '30797590 - 32830654 bp'; }
 else if( loc === 'y_16'  ){ range = '32830655 - 34863719 bp'; }
 else if( loc === 'y_17'  ){ range = '34863720 - 36896784 bp'; }
 else if( loc === 'y_18'  ){ range = '36896785 - 38929849 bp'; }
 else if( loc === 'y_19'  ){ range = '38929850 - 40962914 bp'; }
 else if( loc === 'y_20'  ){ range = '40962915 - 42995979 bp'; }
 else if( loc === 'y_21'  ){ range = '42995980 - 45029044 bp'; }
 else if( loc === 'y_22'  ){ range = '45029045 - 47062109 bp'; }
 else if( loc === 'y_23'  ){ range = '47062110 - 49095174 bp'; }
 else if( loc === 'y_24'  ){ range = '49095175 - 51128239 bp'; }
 else if( loc === 'y_25'  ){ range = '51128240 - 53161304 bp'; }
 else if( loc === 'y_26'  ){ range = '53161305 - 55194369 bp'; }
 else if( loc === 'y_27'  ){ range = '55194370 - 57227415 bp'; }
 else if( loc === (' MT_1 ').trim() ){ range = ' 577 bp '; } 
 else if( loc === (' MT_2 ').trim() ){ range = ' 648 bp '; } 
 else if( loc === (' MT_3 ').trim() ){ range = ' 1602 bp '; } 
 else if( loc === (' MT_4 ').trim() ){ range = ' 1671 bp '; } 
 else if( loc === (' MT_5 ').trim() ){ range = ' 3230 bp '; } 
 else if( loc === (' MT_6 ').trim() ){ range = ' 3307 bp '; } 
 else if( loc === (' MT_7 ').trim() ){ range = ' 4263 bp '; } 
 else if( loc === (' MT_8 ').trim() ){ range = ' 4329 bp '; } 
 else if( loc === (' MT_9 ').trim() ){ range = ' 4402 bp '; } 
 else if( loc === (' MT_10 ').trim() ){ range = ' 4470 bp '; } 
 else if( loc === (' MT_11 ').trim() ){ range = ' 5512 bp '; } 
 else if( loc === (' MT_12 ').trim() ){ range = ' 5587 bp '; } 
 else if( loc === (' MT_13 ').trim() ){ range = ' 5657 bp '; } 
 else if( loc === (' MT_14 ').trim() ){ range = ' 5761 bp '; } 
 else if( loc === (' MT_15 ').trim() ){ range = ' 5826 bp '; } 
 else if( loc === (' MT_16 ').trim() ){ range = ' 5904 bp '; } 
 else if( loc === (' MT_17 ').trim() ){ range = ' 7446 bp '; } 
 else if( loc === (' MT_18 ').trim() ){ range = ' 7518 bp '; } 
 else if( loc === (' MT_19 ').trim() ){ range = ' 7586 bp '; } 
 else if( loc === (' MT_20 ').trim() ){ range = ' 8295 bp '; } 
 else if( loc === (' MT_21 ').trim() ){ range = ' 8366 bp '; } 
 else if( loc === (' MT_22 ').trim() ){ range = ' 8527 bp '; } 
 else if( loc === (' MT_23 ').trim() ){ range = ' 9207 bp '; } 
 else if( loc === (' MT_24 ').trim() ){ range = ' 9991 bp '; } 
 else if( loc === (' MT_25 ').trim() ){ range = ' 10059 bp '; } 
 else if( loc === (' MT_26 ').trim() ){ range = ' 10405 bp '; } 
 else if( loc === (' MT_27 ').trim() ){ range = ' 10470 bp '; } 
 else if( loc === (' MT_28 ').trim() ){ range = ' 10760 bp '; } 
 else if( loc === (' MT_29 ').trim() ){ range = ' 12138 bp '; } 
 else if( loc === (' MT_30 ').trim() ){ range = ' 12207 bp '; } 
 else if( loc === (' MT_31 ').trim() ){ range = ' 12266 bp '; } 
 else if( loc === (' MT_32 ').trim() ){ range = ' 12337 bp '; } 
 else if( loc === (' MT_33 ').trim() ){ range = ' 14149 bp '; } 
 else if( loc === (' MT_34 ').trim() ){ range = ' 14674 bp '; } 
 else if( loc === (' MT_35 ').trim() ){ range = ' 14747 bp '; } 
 else if( loc === (' MT_36 ').trim() ){ range = ' 15888 bp '; } 
 else if( loc === (' MT_37 ').trim() ){ range = ' 15956 bp '; } 


return range;
}



function renderHchMap( div ) {
	
	div.innerHTML = '<svg id="ch_horizontal" class="chMap" width="640" height="480" viewBox="0 0 640 480" >'+
  '<rect stroke="black" id="chMapBack" height="461.999977" width="447.999999" y="10" x="49.000001"       stroke-width="2" fill="white"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2" d="m115.33333,27.66667c0,0 2.33333,-6 2.33333,-6c0,0 176.66667,0 176.66667,0c0,0 4,2.66667 4,2.33333c0,-0.33333 5.66667,-2.66667 5.66667,-2.66667c0,0 171.33333,0 171.33333,0c0,0 2.66667,6.33333 2.66667,6.33333c0,0 -2.66667,5.66667 -2.66667,5.33333c0,-0.33333 -171.33333,0.66667 -171.33333,0.66667c0,0 -5.66667,-4.33333 -5.66667,-4.66667c0,-0.33333 -4,4.33333 -4,4c0,-0.33333 -176.66667,1 -176.66667,1c0,0 -2.33333,-6.33333 -2.33333,-6.33333l0,0.00001z" id="chr1"  />'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m114.22917,46.33333c0,0 2,-6.66667 2,-7c0,-0.33333 132.33333,0.66667 132.33333,0.66667c0,0 3,2.66667 2.66667,2.33333c-0.33333,-0.33333 4.66667,-2.66667 4.66667,-3c0,-0.33333 214,0.66667 214,0.66667c0,0 3,6 3,6c0,0 -3,6 -3,6c0,0 -214.66667,0.33333 -214.66667,0.33333c0,0 -3,-4.33333 -3,-4.33333c0,0 -3.66667,4 -4,4c-0.33333,0 -132.33333,0 -132.33333,0c0,0 -1.66667,-5.66667 -1.66667,-5.66667z" id="chr2"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.33333,65c0,0 2,-7 2,-7c0,0 127.66667,0 127.33334,0c-0.33334,0 4.33333,3 4,3c-0.33334,0 4,-3 4,-3c0,0 154.66666,0.66667 154.66666,0.66667c0,0 2.33334,5.33333 2.33334,5.33333c0,0 -2,6.33333 -2,6.33333c0,0 -154.66667,0 -155,0c-0.33334,0 -2.66667,-4.33333 -2.66667,-4.33333c0,0 -5.33333,4.66667 -5.33333,4.33333c0,-0.33333 -127,0 -127,0c0,0 -2.33334,-5.33333 -2.33334,-5.33333z" id="chr3"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.33333,83c0,0 2.33333,-5.33333 2.33333,-5.66667c0,-0.33333 69.66667,0.33333 69.66667,0.33333c0,0 3,2 3,1.66667c0,-0.33333 3.66667,-1.66667 3.33333,-2c-0.33333,-0.33333 202,0.33333 202,0c0,-0.33333 2,6 2,6c0,0 -1.66667,6.33333 -1.66667,6.33333c0,0 -201.66667,-0.66667 -201.66667,-0.66667c0,0 -3.33333,-5.33333 -3.66667,-5.66667c-0.33333,-0.33333 -3.66667,5.33333 -3.66667,5.33333c0,0 -69.66667,0.33333 -69.66667,0.33333c0,0 -2,-6 -2,-6l0.00002,0.00002z" id="chr4"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.77193,101.98246c0,0 2,-6 2,-6c0,0 65.66667,0.33333 65.66667,0.33333c0,0 2.66667,3 2.66667,3c0,0 4.66667,-3.33333 4.66667,-3.33333c0,0 189.66667,0.66667 189.66667,0.66667c0,0 2,6 2,5.66667c0,-0.33333 -2,5.66667 -2,5.66667c0,0 -190,0 -190,0c0,0 -4.33333,-4.66667 -4.33333,-4.66667c0,0 -3.33333,5 -3.33333,5c0,0 -65.33333,-0.66667 -65.33333,-1c0,-0.33333 -1.66667,-5.33333 -1.66667,-5.33333l-0.00002,-0.00001z" id="chr5"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m116,121c0,0 1.66667,-6.66667 1.66667,-7c0,-0.33333 84.33333,1 84,1c-0.33333,0 3,3.33333 3,3c0,-0.33333 4.66667,-3 4.66667,-3c0,0 156.66667,0 156.33333,0.33333c-0.33333,0.33333 2.33333,5.33333 2.33333,5.33333c0,0 -2.33333,6 -2.33333,6c0,0 -156,0.66667 -156,0.66667c0,0 -4.33333,-4.33333 -4.33333,-4.33333c0,0 -4,4 -4,4c0,0 -84,0 -84,0c0,0 -1.33333,-6 -1.33333,-6l-0.00001,0z" id="chr6"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,139c0,0 2,-5.5 2,-5.5c0,0 81.25,-0.5 81.25,-0.5c0,0 3.25,3.5 3.25,3.5c0,0 4,-3.25 4,-3.25c0,0 141.25,0.25 141.25,0.25c0,0 2.75,5.5 2.75,5.5c0,0 -3,6.5 -3,6.5c0,0 -141,0 -141,0c0,0 -3.75,-4.5 -3.75,-4.5c0,0 -3.5,5 -3.5,5c0,0 -81.75,-0.5 -81.75,-0.5c0,0 -1.5,-6.5 -1.5,-6.5z" id="chr7"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.5,157.75c0,0 2,-5.75 2,-5.75c0,0 62.5,-0.25 62.5,-0.25c0,0 2.75,2.25 2.75,2.25c0,0 3.5,-2 3.5,-2c0,0 143.25,-0.5 143.25,-0.5c0,0 2.25,5.25 2.25,5.25c0,0 -2,7.25 -2,7.25c0,0 -142.75,0.25 -142.75,0.25c0,0 -4,-4.25 -4,-4.25c0,0 -3.5,3.75 -3.5,3.75c0,0 -62,0.25 -62,0.25c0,0 -2,-6.25 -2,-6.25z" id="chr8"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,176.5c0,0 2,-6.25 2,-6.25c0,0 66.25,0 66.25,0c0,0 6.25,4.25 6.25,4.25c0,0 12.5,-4.5 12.5,-4.5c0,0 115.25,0.5 115.25,0.5c0,0 2.25,5.75 2.25,5.75c0,0 -2,6 -2,6c0,0 -116,0.5 -116,0.5c0,0 -11.5,-4.5 -11.5,-4.5c0,0 -7.25,4.25 -7.25,4.25c0,0 -66,0 -66,0c0,0 -1.75,-6 -1.75,-6z" id="chr9"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,195c0,0 2,-6.25 2,-6.25c0,0 54.5,0 55,0c0.5,0 2.5,3 2.5,3c0,0 3,-3.5 3,-3.5c0,0 135,0.5 135,0.5c0,0 1.75,6.5 1.75,6.5c0,0 -2.25,5.25 -2.25,5.25c0,0 -134.75,0.75 -134.75,0.75c0,0 -3.25,-5.25 -3.25,-5.25c0,0 -2,4.75 -2,4.75c0,0 -55.5,0 -55.5,0c0,0 -1.5,-5.75 -1.5,-5.75z" id="chr10"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.25,213.5c0,0 2.5,-6.5 2.5,-6.5c0,0 73.5,0.5 73.5,0.5c0,0 2.5,3.25 2.5,3.25c0,0 5.25,-3.5 5.25,-3.5c0,0 113,0.5 113,0.5c0,0 2,5.25 2,5.25c0,0 -2,6.25 -2,6.25c0,0 -112.75,0.5 -112.75,0.5c0,0 -5,-3.75 -5,-3.75c0,0 -3.5,4 -3.5,4c0,0 -73.5,-0.25 -73.5,-0.25c0,0 -2,-6.25 -2,-6.25z" id="chr11"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.5,231.75c0,0 2,-5.25 2,-5.25c0,0 46.75,0.25 46.75,0.25c0,0 4,2.75 4,2.75c0,0 2.25,-3.25 2.25,-3.25c0,0 138.75,0.5 138.75,0.5c0,0 2.25,5 2.25,5c0,0 -2.25,5.75 -2.25,5.75c0,0 -138.5,0.25 -138.5,0.25c0,0 -3,-4 -3,-4c0,0 -3.5,4 -3.5,4c0,0 -47,0.75 -47,0.75c0,0 -1.75,-6.75 -1.75,-6.75z" id="chr12"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,251.5c0,0 1.5,-6.5 1.5,-6.5c0,0 18.75,0 18.75,0c0,0 3,3.5 3,3.5c0,0 4,-3.25 4,-3.25c0,0 139,0 139,0c0,0 1.75,5.25 1.75,5.25c0,0 -1.75,5.75 -1.75,5.75c0,0 -138,0 -138,0c0,0 -4.5,-3.5 -4.5,-3.5c0,0 -3.25,3.25 -3.25,3.25c0,0 -18.75,0.25 -18.75,0.25c0,0 -1.75,-4.75 -1.75,-4.75z" id="chr13"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.5,269.25c0,0 2,-5.75 2,-5.75c0,0 18.25,-0.25 18.25,-0.25c0,0 3,3 3,3c0,0 5,-2.75 5,-2.75c0,0 126.5,0 126.5,0c0,0 2.5,6 2.5,6c0,0 -2.5,6.25 -2.5,6.25c0,0 -126,0.25 -126,0.25c0,0 -5,-4.5 -5,-4.5c0,0 -3,4.25 -3,4.25c0,0 -18.5,0 -18.5,0c0,0 -2.25,-6.5 -2.25,-6.5z" id="chr14"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,287.75c0,0 1.75,-5.5 1.75,-5.5c0,0 18,-0.5 18,-0.5c0,0 4.25,3.75 4.25,3.75c0,0 3.5,-3.5 3.5,-3.5c0,0 117.75,0 118.25,0c0.5,0 2.5,5.5 2.5,5.5c0,0 -2.5,7.25 -2.5,7.25c0,0 -117.75,0 -117.75,0c0,0 -3.75,-4.75 -3.75,-4.75c0,0 -4,4 -4,4c0,0 -18.5,0 -18.5,0c0,0 -1.75,-6.25 -1.75,-6.25z" id="chr15"/>'+
  '<path class="chromo" fill="white" stroke="#000000" stroke-width="2"       d="m115.75,306.75c0,0 1.75,-6 1.75,-6c0,0 48.75,0 48.75,0c0,0 4.75,3 4.75,3c0,0 4.75,-3 4.75,-3c0,0 68.25,0 68.25,0c0,0 3.25,5.25 3.25,5.25c0,0 -3,7 -3,7c0,0 -68.25,0 -68.25,0c0,0 -4.5,-4.75 -4.5,-4.75c0,0 -5.25,4.5 -5.25,4.5c0,0 -48.75,-0.25 -48.75,-0.25c0,0 -1.75,-5.75 -1.75,-5.75z" id="chr16"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.25,325.75c0,0 2.5,-6.75 2.5,-6.75c0,0 28.5,0.25 28.5,0.25c0,0 2.25,4.5 2.25,4.5c0,0 2,-4.75 2,-4.75c0,0 78.75,0.25 78.75,0.25c0,0 3,6.25 3,6.25c0,0 -2.5,5.5 -2.5,5.5c0,0 -78.75,0.25 -78.75,0.25c0,0 -2,-4.5 -2,-4.5c0,0 -2.5,4.5 -2.5,4.5c0,0 -29,0.25 -29,0.25c0,0 -2.25,-5.75 -2.25,-5.75z" id="chr17"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,344c0,0 2,-6.5 2,-6.5c0,0 20,0.25 20,0.25c0,0 1.75,3.5 1.75,3.5c0,0 2.75,-3.5 2.75,-3.5c0,0 83,0.25 83,0.25c0,0 2.5,5.75 2.5,5.75c0,0 -2.5,6.5 -2.5,6.5c0,0 -83,-1 -83,-1c0,0 -3,-4 -3,-4c0,0 -2.25,4 -2.25,4c0,0 -19.25,-0.5 -19.25,-0.5c0,0 -2,-4.75 -2,-4.75z" id="chr18"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.5,362.5c0,0 2,-6 2,-6c0,0 38,-0.75 38,-0.75c0,0 2.25,4 2.25,4c0,0 3,-3.75 3,-3.75c0,0 46.5,0.5 46.5,0.5c0,0 2.75,5.75 2.75,5.75c0,0 -3,6 -3,6c0,0 -46.5,0 -46.5,0c0,0 -2.75,-4.75 -2.75,-4.75c0,0 -2,4.25 -2,4.25c0,0 -38.5,0.25 -38.5,0.25c0,0 -1.75,-5.5 -1.75,-5.5z" id="chr19"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.5,381c0,0 2.25,-5.75 2.25,-5.75c0,0 35.5,0.5 35.5,0.5c0,0 2,3.5 2,3.5c0,0 2.25,-3.75 2.25,-3.75c0,0 47.75,-0.25 47.75,-0.25c0,0 2.75,5.5 2.75,5.5c0,0 -2.75,6 -2.75,6c0,0 -47.25,0 -47.25,0c0,0 -2.5,-4 -2.5,-4c0,0 -2.25,4.25 -2.25,4.25c0,0 -35.5,-0.25 -35.5,-0.25c0,0 -2.25,-5.75 -2.25,-5.75z" id="chr20"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.25,399.25c0,0 2.25,-5.25 2.25,-5.25c0,0 12.75,0.25 12.75,0.25c0,0 3,3.25 3,3.25c0,0 2.25,-3.25 2.25,-3.25c0,0 47.5,-0.5 47.5,-0.5c0,0 1.75,5.25 1.75,5.25c0,0 -1.75,5.75 -1.75,5.75c0,0 -47.25,0.25 -47.25,0.25c0,0 -2.5,-4 -2.5,-4c0,0 -3.5,4 -3.5,4c0,0 -13,0 -13,0c0,0 -1.5,-5.75 -1.5,-5.75z" id="chr21"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,418c0,0 2,-5.5 2,-5.5c0,0 12.75,0 12.75,0c0,0 3,4 3,4c0,0 6.5,-3.75 6.5,-3.75c0,0 46.5,-0.25 46.5,-0.25c0,0 2.5,6.25 2.5,6.25c0,0 -2.5,6 -2.5,6c0,0 -47,0 -47,0c0,0 -5.25,-3.5 -5.25,-3.5c0,0 -4,4.25 -4,4.25c0,0 -13,-0.25 -13,-0.25c0,0 -1.5,-7.25 -1.5,-7.25z" id="chr22"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.75,437c0,0 2.5,-6 2.5,-6c0,0 81,0 81,0c0,0 3,2.25 3,2.25c0,0 4,-2.5 4,-2.5c0,0 136.25,0.5 136.25,0.5c0,0 2,5.5 2,5.5c0,0 -2.25,5.75 -2.25,5.75c0,0 -136,1 -136,1c0,0 -3.75,-4.25 -3.75,-4.25c0,0 -3.25,3.75 -3.25,3.75c0,0 -81.25,0.25 -81.25,0.25c0,0 -2.25,-6.25 -2.25,-6.25z" id="chrX"/>'+
  '<path class="chromo" fill="#FF0000" stroke="#000000" stroke-width="2"       d="m115.5,455c0,0 2.25,-5.25 2.25,-5.25c0,0 13,-0.25 13,-0.25c0,0 1.75,3.75 1.75,3.75c0,0 2,-3.75 2,-3.75c0,0 64,0.25 64,0.25c0,0 3,5.25 3,5.25c0,0 -2.75,7 -2.75,7c0,0 -63.5,-0.5 -63.5,-0.5c0,0 -3,-4.75 -3,-4.75c0,0 -1.5,4.5 -1.5,4.5c0,0 -13.5,-0.25 -13.5,-0.25c0,0 -1.75,-6 -1.75,-6z" id="chrY"/>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="97.25" y="32.49148" id="svg_28" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.822429895401001,0,5.46028071641922) " stroke="#000000">1</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96.5" y="50.74713" id="svg_29" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8130841255187988,0,9.719625473022461) " stroke="#000000">2</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96" y="69.16011" id="svg_30" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8317757248878479,0,11.607474982738495) " stroke="#000000">3</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="95.75" y="88.12912" id="svg_31" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8504672646522522,0,13.084114342927933) " stroke="#000000">4</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96" y="107.04124" id="svg_32" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8271986886439605,-1,19.175998926610657) " stroke="#000000">5</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="95.25" y="125.00633" id="svg_33" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7383177280426025,0,32.579442858695984) " stroke="#000000">6</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="93.5" y="142.25" id="svg_34" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7757009267807007,0,33.08411329984665) " stroke="#000000">7</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="94.5" y="162" id="svg_35" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8037382960319519,0,32.824769988656044) " stroke="#000000">8</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="95" y="180.09551" id="svg_36" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8317757248878479,0,31.584107652306557) " stroke="#000000">9</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="95.75" y="198.90556" id="svg_37" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.84112149477005,0,32.53037394583225) " stroke="#000000">10</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="95.75" y="218.09195" id="svg_38" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8130841255187988,0,40.654202699661255) " stroke="#000000">11</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96" y="235.5462" id="svg_39" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8598130941390991,0,33.96027794480324) " stroke="#000000">12</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="95.5" y="256.52439" id="svg_40" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7663551568984985,0,59.63784620165825) " stroke="#000000">13</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="88.75" y="270.5" id="svg_41" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7850467562675475,7,62.27335695922374) " stroke="#000000">14</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="84.75" y="290.5" id="svg_42" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8037382960319518,11,59.294398948550224) " stroke="#000000">15</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96" y="309.71382" id="svg_43" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7102803587913513,0,90.53738787770271) " stroke="#000000">16</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96.5" y="328.25" id="svg_44" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8130841255187988,0,62.33644413948059) " stroke="#000000">17</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96.25" y="345.01712" id="svg_45" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.6822429895401001,0,111.53271067142487) " stroke="#000000">18</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96.5" y="366.89773" id="svg_46" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.822429895401001,0,65.43458354473114) " stroke="#000000">19</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="87.75" y="381.75" id="svg_47" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7850467562675475,8.75,85.68690532445908) " stroke="#000000">20</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96.75" y="404.43976" id="svg_48" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7757009267807007,0,90.95327419042587) " stroke="#000000">21</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96.5" y="423.85882" id="svg_49" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7943925261497498,0,86.86915770173073) " stroke="#000000">22</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="96.5" y="442.62658" id="svg_50" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.7383177280426025,0,115.07477909326553) " stroke="#000000">X</text>'+
  '<text class="chText"   fill="#000000" stroke-width="0"       x="94.25" y="455.25" id="svg_51" font-size="24" font-family="serif" text-anchor="middle" xml:space="preserve" transform="matrix(1,0,0,0.8037382960319518,2.5,93.87851467728615) " stroke="#000000">Y</text>'+
  '<line class="chLoc"  stroke="#ffff00" fill="none" stroke-width="3"       x1="118.76471" y1="20.17834" x2="118.76471" y2="35.54948" id="1_1"/>'+
  '<line class="chLoc"  stroke="#ffff00" fill="none" stroke-width="3"       x1="121.76898" y1="20.14077" x2="121.76898" y2="35.56094" id="1_2"/>'+
  '<line class="chLoc"  stroke="#ffff00" fill="none" stroke-width="3"       x1="124.42326" y1="19.95522" x2="124.42326" y2="35.70873" id="1_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.33083" y1="20.03008" x2="127.33083" y2="35.74436" stroke="#ffff00" id="1_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.01018" y1="19.9561" x2="174.01018" y2="35.67038" stroke="#ffff00" id="1_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.11036" y1="19.93233" x2="171.11036" y2="35.64662" stroke="#ffff00" id="1_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.12224" y1="19.84404" x2="168.12224" y2="35.55833" stroke="#ffff00" id="1_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.26316" y1="19.86781" x2="165.26316" y2="35.5821" stroke="#ffff00" id="1_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.36332" y1="19.89159" x2="162.36332" y2="35.60587" stroke="#ffff00" id="1_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.43973" y1="19.9561" x2="159.43973" y2="35.67038" stroke="#ffff00" id="1_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.58065" y1="20.02062" x2="156.58065" y2="35.7349" stroke="#ffff00" id="1_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.68081" y1="19.97986" x2="153.68081" y2="35.69415" stroke="#ffff00" id="1_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.71647" y1="20.02062" x2="150.71647" y2="35.7349" stroke="#ffff00" id="1_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.809" y1="19.96996" x2="147.809" y2="35.68425" stroke="#ffff00" id="1_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.91228" y1="19.96996" x2="144.91228" y2="35.68425" stroke="#ffff00" id="1_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.96491" y1="19.93233" x2="141.96491" y2="35.64662" stroke="#ffff00" id="1_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="138.95614" y1="19.99374" x2="138.95614" y2="35.70802" stroke="#007f00" id="1_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.07017" y1="19.99374" x2="136.07017" y2="35.70802" stroke="#00bf00" id="1_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.24562" y1="20.099" x2="133.24562" y2="35.81329" stroke="#00ff00" id="1_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.24853" y1="19.93233" x2="130.24853" y2="35.64662" stroke="#ffff00" id="1_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="232.7776" y1="20.02062" x2="232.7776" y2="35.7349" stroke="#ffff00" id="1_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="229.81325" y1="19.99685" x2="229.81325" y2="35.71114" stroke="#ffff00" id="1_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="226.8489" y1="20.08513" x2="226.8489" y2="35.79941" stroke="#ffff00" id="1_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="223.88456" y1="20.04438" x2="223.88456" y2="35.75867" stroke="#ffff00" id="1_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.98472" y1="20.09193" x2="220.98472" y2="35.80621" stroke="#ffff00" id="1_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.99661" y1="20.04438" x2="217.99661" y2="35.75867" stroke="#ffff00" id="1_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="215.09678" y1="20.02741" x2="215.09678" y2="35.74169" stroke="#ffff00" id="1_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="212.19695" y1="20.04438" x2="212.19695" y2="35.75867" stroke="#ffff00" id="1_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="209.20883" y1="20.00364" x2="209.20883" y2="35.71793" stroke="#ffff00" id="1_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="206.30901" y1="19.93233" x2="206.30901" y2="35.64662" stroke="#ffff00" id="1_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="203.34466" y1="19.93233" x2="203.34466" y2="35.64662" stroke="#ffff00" id="1_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="200.44483" y1="19.97986" x2="200.44483" y2="35.69415" stroke="#ffff00" id="1_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="197.52123" y1="19.97986" x2="197.52123" y2="35.69415" stroke="#ffff00" id="1_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.66214" y1="19.99685" x2="194.66214" y2="35.71114" stroke="#ffff00" id="1_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.73855" y1="19.8746" x2="191.73855" y2="35.58889" stroke="#ffff00" id="1_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.7742" y1="19.9561" x2="188.7742" y2="35.67038" stroke="#ffff00" id="1_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.80985" y1="19.8033" x2="185.80985" y2="35.51759" stroke="#ffff00" id="1_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.82174" y1="19.91535" x2="182.82174" y2="35.62964" stroke="#ffff00" id="1_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.89814" y1="19.93233" x2="179.89814" y2="35.64662" stroke="#ffff00" id="1_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.9983" y1="19.86781" x2="176.9983" y2="35.5821" stroke="#ffff00" id="1_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="304.4" y1="19.49374" x2="304.4" y2="35.20802" stroke="#ffff00" id="1_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="291.46969" y1="19.59125" x2="291.46969" y2="35.30554" stroke="#ffff00" id="1_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="285.50085" y1="19.70483" x2="285.50085" y2="35.41911" stroke="#ffff00" id="1_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="282.60102" y1="19.68106" x2="282.60102" y2="35.39535" stroke="#ffff00" id="1_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="279.63668" y1="19.7218" x2="279.63668" y2="35.43609" stroke="#ffff00" id="1_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="276.6961" y1="19.78632" x2="276.6961" y2="35.50061" stroke="#ffff00" id="1_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="273.73174" y1="19.74557" x2="273.73174" y2="35.45986" stroke="#ffff00" id="1_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="270.80815" y1="19.73878" x2="270.80815" y2="35.45307" stroke="#ffff00" id="1_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="267.77929" y1="19.77954" x2="267.77929" y2="35.49382" stroke="#ffff00" id="1_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="264.81494" y1="19.81009" x2="264.81494" y2="35.52438" stroke="#ffff00" id="1_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="261.80984" y1="19.81009" x2="261.80984" y2="35.52438" stroke="#ffff00" id="1_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="258.97453" y1="19.82707" x2="258.97453" y2="35.54135" stroke="#ffff00" id="1_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="255.96944" y1="19.89159" x2="255.96944" y2="35.60587" stroke="#ffff00" id="1_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="253.13413" y1="19.8746" x2="253.13413" y2="35.58889" stroke="#ffff00" id="1_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="250.16978" y1="19.89838" x2="250.16978" y2="35.61266" stroke="#ffff00" id="1_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="247.39898" y1="19.98667" x2="247.39898" y2="35.70095" stroke="#ffff00" id="1_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="244.43463" y1="20.02741" x2="244.43463" y2="35.74169" stroke="#ffff00" id="1_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="241.49406" y1="20.06815" x2="241.49406" y2="35.78244" stroke="#ffff00" id="1_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="238.618" y1="19.99685" x2="238.618" y2="35.71114" stroke="#ffff00" id="1_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="235.67742" y1="20.08513" x2="235.67742" y2="35.79941" stroke="#ffff00" id="1_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="362.19782" y1="19.27171" x2="362.19782" y2="34.986" stroke="#ffff00" id="1_82"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="359.2795" y1="19.23542" x2="359.2795" y2="34.9497" stroke="#ffff00" id="1_81"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="356.53358" y1="19.23904" x2="356.53358" y2="34.95333" stroke="#ffff00" id="1_80"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="353.64973" y1="19.27171" x2="353.64973" y2="34.986" stroke="#ffff00" id="1_79"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="350.73321" y1="19.2699" x2="350.73321" y2="34.98418" stroke="#ffff00" id="1_78"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="348.09075" y1="19.26808" x2="348.09075" y2="34.98237" stroke="#ffff00" id="1_77"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="345.34664" y1="19.3062" x2="345.34664" y2="35.02049" stroke="#ffff00" id="1_76"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="342.43013" y1="19.37516" x2="342.43013" y2="35.08945" stroke="#ffff00" id="1_75"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="339.58257" y1="19.33887" x2="339.58257" y2="35.05315" stroke="#ffff00" id="1_74"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="336.75658" y1="19.35361" x2="336.75658" y2="35.0679" stroke="#ffff00" id="1_73"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="333.83509" y1="19.34987" x2="333.83509" y2="35.06416" stroke="#ffff00" id="1_72"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="330.8772" y1="19.37795" x2="330.8772" y2="35.09223" stroke="#ffff00" id="1_71"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="327.9193" y1="19.40601" x2="327.9193" y2="35.1203" stroke="#ffff00" id="1_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="324.96141" y1="19.44461" x2="324.96141" y2="35.15889" stroke="#ffff00" id="1_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="322.00351" y1="19.44461" x2="322.00351" y2="35.15889" stroke="#ffff00" id="1_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="319.04562" y1="19.42707" x2="319.04562" y2="35.14135" stroke="#ffff00" id="1_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="316.12632" y1="19.49374" x2="316.12632" y2="35.20802" stroke="#ffff00" id="1_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="313.23509" y1="19.49374" x2="313.23509" y2="35.20802" stroke="#ffff00" id="1_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="310.31579" y1="19.51128" x2="310.31579" y2="35.22556" stroke="#ffff00" id="1_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="307.35789" y1="19.51128" x2="307.35789" y2="35.22556" stroke="#ffff00" id="1_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="365.04536" y1="19.2699" x2="365.04536" y2="34.98418" stroke="#ffff00" id="1_83"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="418.53538" y1="19.26809" x2="418.53538" y2="34.98237" stroke="#ffff00" id="1_102"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="415.61705" y1="19.26809" x2="415.61705" y2="34.98237" stroke="#ffff00" id="1_101"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="412.77131" y1="19.30075" x2="412.77131" y2="35.01504" stroke="#ffff00" id="1_100"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="409.85298" y1="19.30257" x2="409.85298" y2="35.01685" stroke="#ffff00" id="1_99"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="406.93647" y1="19.34068" x2="406.93647" y2="35.05497" stroke="#ffff00" id="1_98"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="404.19055" y1="19.37335" x2="404.19055" y2="35.08763" stroke="#ffff00" id="1_97"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="401.41197" y1="19.36972" x2="401.41197" y2="35.08401" stroke="#ffff00" id="1_96"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="398.46097" y1="19.3679" x2="398.46097" y2="35.08218" stroke="#ffff00" id="1_95"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="395.68239" y1="19.36972" x2="395.68239" y2="35.08401" stroke="#ffff00" id="1_94"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="392.97276" y1="19.34431" x2="392.97276" y2="35.05859" stroke="#ffff00" id="1_93"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="390.1597" y1="19.3062" x2="390.1597" y2="35.02049" stroke="#ffff00" id="1_92"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="387.38111" y1="19.33887" x2="387.38111" y2="35.05315" stroke="#ffff00" id="1_91"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="384.60071" y1="19.33705" x2="384.60071" y2="35.05133" stroke="#ffff00" id="1_90"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="381.82032" y1="19.33887" x2="381.82032" y2="35.05315" stroke="#ffff00" id="1_89"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="379.0744" y1="19.37154" x2="379.0744" y2="35.08582" stroke="#ffff00" id="1_88"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="376.29581" y1="19.37154" x2="376.29581" y2="35.08582" stroke="#ffff00" id="1_87"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="373.48275" y1="19.37516" x2="373.48275" y2="35.08945" stroke="#ffff00" id="1_86"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="370.66968" y1="19.33887" x2="370.66968" y2="35.05315" stroke="#ffff00" id="1_85"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="367.92739" y1="19.3062" x2="367.92739" y2="35.02049" stroke="#ffff00" id="1_84"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="447.42469" y1="19.5022" x2="447.42469" y2="35.21649" stroke="#ffff00" id="1_112"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="444.54266" y1="19.43506" x2="444.54266" y2="35.14934" stroke="#ffff00" id="1_111"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="441.72959" y1="19.47135" x2="441.72959" y2="35.18563" stroke="#ffff00" id="1_110"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="438.81307" y1="19.44231" x2="438.81307" y2="35.15659" stroke="#ffff00" id="1_109"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="435.93104" y1="19.40783" x2="435.93104" y2="35.12211" stroke="#ffff00" id="1_108"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="433.04901" y1="19.37154" x2="433.04901" y2="35.08582" stroke="#ffff00" id="1_107"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="430.16698" y1="19.40964" x2="430.16698" y2="35.12393" stroke="#ffff00" id="1_106"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="427.28494" y1="19.33523" x2="427.28494" y2="35.04952" stroke="#ffff00" id="1_105"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="424.4374" y1="19.3062" x2="424.4374" y2="35.02049" stroke="#ffff00" id="1_104"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="421.52087" y1="19.2699" x2="421.52087" y2="34.98418" stroke="#ffff00" id="1_103"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="459.01815" y1="19.57117" x2="459.01815" y2="35.28546" stroke="#ffff00" id="1_116"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="456.13793" y1="19.60928" x2="456.13793" y2="35.32356" stroke="#ffff00" id="1_115"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="453.22322" y1="19.5748" x2="453.22322" y2="35.28908" stroke="#ffff00" id="1_114"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="450.37568" y1="19.53851" x2="450.37568" y2="35.25279" stroke="#ffff00" id="1_113"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.98026" y1="38.37641" x2="118.98026" y2="53.03806" id="2_1" stroke="#ffff00"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.95724" y1="38.35338" x2="173.95724" y2="53.01504" stroke="#ffff00" id="2_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.98685" y1="38.41588" x2="170.98685" y2="53.07754" stroke="#ffff00" id="2_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.07895" y1="38.52115" x2="168.07895" y2="53.1828" stroke="#ffff00" id="2_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.23356" y1="38.45865" x2="165.23356" y2="53.1203" stroke="#ffff00" id="2_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.38816" y1="38.45865" x2="162.38816" y2="53.1203" stroke="#ffff00" id="2_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.48027" y1="38.47838" x2="159.48027" y2="53.14004" stroke="#ffff00" id="2_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.57238" y1="38.41588" x2="156.57238" y2="53.07754" stroke="#ffff00" id="2_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.70724" y1="38.45865" x2="153.70724" y2="53.1203" stroke="#ffff00" id="2_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.79935" y1="38.43891" x2="150.79935" y2="53.10056" stroke="#ffff00" id="2_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.82895" y1="38.43891" x2="147.82895" y2="53.10056" stroke="#ffff00" id="2_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.92106" y1="38.39615" x2="144.92106" y2="53.0578" stroke="#ffff00" id="2_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.0329" y1="38.35338" x2="142.0329" y2="53.01504" stroke="#ffff00" id="2_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.06251" y1="38.39615" x2="139.06251" y2="53.0578" stroke="#ffff00" id="2_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.09211" y1="38.33365" x2="136.09211" y2="52.9953" stroke="#ffff00" id="2_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.12172" y1="38.33365" x2="133.12172" y2="52.9953" stroke="#ffff00" id="2_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.15132" y1="38.33365" x2="130.15132" y2="52.9953" stroke="#ffff00" id="2_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.18093" y1="38.29088" x2="127.18093" y2="52.95254" stroke="#ffff00" id="2_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.27303" y1="38.27115" x2="124.27303" y2="52.9328" stroke="#ffff00" id="2_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.2829" y1="38.27115" x2="121.2829" y2="52.9328" stroke="#ffff00" id="2_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.93421" y1="38.66917" x2="231.93421" y2="53.33083" stroke="#ffff00" id="2_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="229.08881" y1="38.77444" x2="229.08881" y2="53.43609" stroke="#ffff00" id="2_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="226.26316" y1="38.81391" x2="226.26316" y2="53.47556" stroke="#ffff00" id="2_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="223.35526" y1="38.75141" x2="223.35526" y2="53.41306" stroke="#ffff00" id="2_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.4671" y1="38.66588" x2="220.4671" y2="53.32754" stroke="#ffff00" id="2_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.49671" y1="38.60338" x2="217.49671" y2="53.26504" stroke="#ffff00" id="2_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.67105" y1="38.56062" x2="214.67105" y2="53.22227" stroke="#ffff00" id="2_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.82566" y1="38.47838" x2="211.82566" y2="53.14004" stroke="#ffff00" id="2_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.875" y1="38.43891" x2="208.875" y2="53.10056" stroke="#ffff00" id="svg_196"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="205.9671" y1="38.50141" x2="205.9671" y2="53.16306" stroke="#ffff00" id="2_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.99671" y1="38.45865" x2="202.99671" y2="53.1203" stroke="#ffff00" id="2_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="200.10855" y1="38.58365" x2="200.10855" y2="53.2453" stroke="#ffff00" id="2_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="197.20066" y1="38.56391" x2="197.20066" y2="53.22556" stroke="#ffff00" id="2_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.35526" y1="38.58365" x2="194.35526" y2="53.2453" stroke="#ffff00" id="2_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.4046" y1="38.45865" x2="191.4046" y2="53.1203" stroke="#ffff00" id="2_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.49671" y1="38.45865" x2="188.49671" y2="53.1203" stroke="#ffff00" id="2_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.67105" y1="38.41588" x2="185.67105" y2="53.07754" stroke="#ffff00" id="2_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.74342" y1="38.54088" x2="182.74342" y2="53.20254" stroke="#ffff00" id="2_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.89802" y1="38.37641" x2="179.89802" y2="53.03806" stroke="#ffff00" id="2_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.92763" y1="38.45865" x2="176.92763" y2="53.1203" stroke="#ffff00" id="2_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="303.52632" y1="38.52115" x2="303.52632" y2="53.1828" stroke="#ffff00" id="2_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="300.57566" y1="38.50141" x2="300.57566" y2="53.16306" stroke="#ffff00" id="2_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="297.64803" y1="38.50141" x2="297.64803" y2="53.16306" stroke="#ffff00" id="2_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="294.67764" y1="38.47838" x2="294.67764" y2="53.14004" stroke="#ffff00" id="2_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="291.76974" y1="38.45865" x2="291.76974" y2="53.1203" stroke="#ffff00" id="2_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="289.02961" y1="38.50141" x2="289.02961" y2="53.16306" stroke="#ffff00" id="2_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="286.07895" y1="38.45865" x2="286.07895" y2="53.1203" stroke="#ffff00" id="2_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="283.17106" y1="38.45865" x2="283.17106" y2="53.1203" stroke="#ffff00" id="2_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="280.2829" y1="38.45865" x2="280.2829" y2="53.1203" stroke="#ffff00" id="2_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="277.31251" y1="38.45865" x2="277.31251" y2="53.1203" stroke="#ffff00" id="2_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="274.29935" y1="38.33365" x2="274.29935" y2="52.9953" stroke="#ffff00" id="2_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="271.45395" y1="38.33365" x2="271.45395" y2="52.9953" stroke="#ffff00" id="2_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="268.54606" y1="38.33365" x2="268.54606" y2="52.9953" stroke="#ffff00" id="2_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="265.63816" y1="38.37641" x2="265.63816" y2="53.03806" stroke="#ffff00" id="2_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="263.54277" y1="38.27115" x2="263.54277" y2="52.9328" stroke="#ffff00" id="2_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="261.38488" y1="38.33365" x2="261.38488" y2="52.9953" stroke="#ffff00" id="2_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="258.62172" y1="38.37312" x2="258.62172" y2="53.03477" stroke="#ffff00" id="2_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="240.74014" y1="38.66588" x2="240.74014" y2="53.32754" stroke="#ffff00" id="2_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.75001" y1="38.62641" x2="237.75001" y2="53.28806" stroke="#ffff00" id="2_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.90461" y1="38.66917" x2="234.90461" y2="53.33083" stroke="#ffff00" id="2_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="361.54604" y1="38.47838" x2="361.54604" y2="53.14004" stroke="#ffff00" id="2_82"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="358.76314" y1="38.45865" x2="358.76314" y2="53.1203" stroke="#ffff00" id="2_81"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="355.87498" y1="38.43891" x2="355.87498" y2="53.10056" stroke="#ffff00" id="2_80"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="352.96709" y1="38.39615" x2="352.96709" y2="53.0578" stroke="#ffff00" id="2_79"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="349.95393" y1="38.47838" x2="349.95393" y2="53.14004" stroke="#ffff00" id="2_78"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="346.98354" y1="38.41588" x2="346.98354" y2="53.07754" stroke="#ffff00" id="2_77"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="344.13814" y1="38.41588" x2="344.13814" y2="53.07754" stroke="#ffff00" id="2_76"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="341.16775" y1="38.41588" x2="341.16775" y2="53.07754" stroke="#ffff00" id="2_75"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="338.32235" y1="38.45865" x2="338.32235" y2="53.1203" stroke="#ffff00" id="2_74"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="335.35196" y1="38.45865" x2="335.35196" y2="53.1203" stroke="#ffff00" id="2_73"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="332.4638" y1="38.43891" x2="332.4638" y2="53.10056" stroke="#ffff00" id="2_72"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="329.70064" y1="38.50141" x2="329.70064" y2="53.16306" stroke="#ffff00" id="2_71"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="326.81248" y1="38.50141" x2="326.81248" y2="53.16306" stroke="#ffff00" id="2_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="323.96709" y1="38.50141" x2="323.96709" y2="53.16306" stroke="#ffff00" id="2_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="321.0592" y1="38.45865" x2="321.0592" y2="53.1203" stroke="#ffff00" id="2_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="318.1513" y1="38.50141" x2="318.1513" y2="53.16306" stroke="#ffff00" id="2_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="315.32564" y1="38.46194" x2="315.32564" y2="53.12359" stroke="#ffff00" id="2_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="312.35525" y1="38.50141" x2="312.35525" y2="53.16306" stroke="#ffff00" id="2_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="309.44736" y1="38.58365" x2="309.44736" y2="53.2453" stroke="#ffff00" id="2_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="306.47696" y1="38.52115" x2="306.47696" y2="53.1828" stroke="#ffff00" id="2_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="448.5263" y1="38.58694" x2="448.5263" y2="53.24859" stroke="#ffff00" id="2_112"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="445.70064" y1="38.52444" x2="445.70064" y2="53.18609" stroke="#ffff00" id="2_111"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="442.68749" y1="38.50141" x2="442.68749" y2="53.16306" stroke="#ffff00" id="2_110"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="439.92433" y1="38.41917" x2="439.92433" y2="53.08083" stroke="#ffff00" id="2_109"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="437.09867" y1="38.54417" x2="437.09867" y2="53.20583" stroke="#ffff00" id="2_108"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="434.21051" y1="38.43891" x2="434.21051" y2="53.10056" stroke="#ffff00" id="2_107"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="431.30262" y1="38.41917" x2="431.30262" y2="53.08083" stroke="#ffff00" id="2_106"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="428.33222" y1="38.52115" x2="428.33222" y2="53.1828" stroke="#ffff00" id="2_105"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="425.42433" y1="38.50141" x2="425.42433" y2="53.16306" stroke="#ffff00" id="2_104"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="422.45393" y1="38.62641" x2="422.45393" y2="53.28806" stroke="#ffff00" id="2_103"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="419.48354" y1="38.60338" x2="419.48354" y2="53.26504" stroke="#ffff00" id="2_102"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="416.55591" y1="38.56391" x2="416.55591" y2="53.22556" stroke="#ffff00" id="2_101"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="413.66775" y1="38.54088" x2="413.66775" y2="53.20254" stroke="#ffff00" id="2_100"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="410.75985" y1="38.47838" x2="410.75985" y2="53.14004" stroke="#ffff00" id="2_99"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="407.89472" y1="38.50141" x2="407.89472" y2="53.16306" stroke="#ffff00" id="2_98"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="405.06906" y1="38.58365" x2="405.06906" y2="53.2453" stroke="#ffff00" id="2_97"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="402.18091" y1="38.52115" x2="402.18091" y2="53.1828" stroke="#ffff00" id="2_96"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="399.27301" y1="38.60338" x2="399.27301" y2="53.26504" stroke="#ffff00" id="2_95"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="396.50985" y1="38.62641" x2="396.50985" y2="53.28806" stroke="#ffff00" id="2_94"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="393.53946" y1="38.52115" x2="393.53946" y2="53.1828" stroke="#ffff00" id="2_93"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="390.6513" y1="38.48167" x2="390.6513" y2="53.14333" stroke="#ffff00" id="2_92"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="387.68091" y1="38.52115" x2="387.68091" y2="53.1828" stroke="#ffff00" id="2_91"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="384.73025" y1="38.50141" x2="384.73025" y2="53.16306" stroke="#ffff00" id="2_90"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="381.75985" y1="38.50141" x2="381.75985" y2="53.16306" stroke="#ffff00" id="2_89"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="378.89472" y1="38.56391" x2="378.89472" y2="53.22556" stroke="#ffff00" id="2_88"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="375.94406" y1="38.47838" x2="375.94406" y2="53.14004" stroke="#ffff00" id="2_87"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="373.09867" y1="38.50141" x2="373.09867" y2="53.16306" stroke="#ffff00" id="2_86"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="370.14801" y1="38.45865" x2="370.14801" y2="53.1203" stroke="#ffff00" id="2_85"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="367.25986" y1="38.52115" x2="367.25986" y2="53.1828" stroke="#ffff00" id="2_84"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="364.43419" y1="38.52115" x2="364.43419" y2="53.1828" stroke="#ffff00" id="2_83"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="454.17763" y1="38.58694" x2="454.17763" y2="53.24859" stroke="#ffff00" id="2_114"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="451.3092" y1="38.56391" x2="451.3092" y2="53.22556" stroke="#ffff00" id="2_113"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.20768" y1="56.77728" x2="174.20768" y2="71.43894" stroke="#ffff00" id="3_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.266" y1="56.82565" x2="171.266" y2="71.4873" stroke="#ffff00" id="3_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.32432" y1="56.77728" x2="168.32432" y2="71.43894" stroke="#ffff00" id="3_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.48791" y1="56.82565" x2="165.48791" y2="71.4873" stroke="#ffff00" id="3_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.54623" y1="56.76874" x2="162.54623" y2="71.4304" stroke="#ffff00" id="3_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.5505" y1="56.82849" x2="159.5505" y2="71.49014" stroke="#ffff00" id="3_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.55476" y1="56.88255" x2="156.55476" y2="71.5442" stroke="#ffff00" id="3_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.61309" y1="56.9366" x2="153.61309" y2="71.59825" stroke="#ffff00" id="3_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.67425" y1="56.93375" x2="150.67425" y2="71.5954" stroke="#ffff00" id="3_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.73258" y1="56.93375" x2="147.73258" y2="71.5954" stroke="#ffff00" id="3_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.79089" y1="56.82565" x2="144.79089" y2="71.4873" stroke="#ffff00" id="3_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.85206" y1="56.8228" x2="141.85206" y2="71.48446" stroke="#ffff00" id="3_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="138.96729" y1="56.8228" x2="138.96729" y2="71.48446" stroke="#ffff00" id="3_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.24182" y1="56.76874" x2="136.24182" y2="71.4304" stroke="#ffff00" id="3_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.3542" y1="56.76591" x2="133.3542" y2="71.42756" stroke="#ffff00" id="3_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.35846" y1="56.71469" x2="130.35846" y2="71.37635" stroke="#ffff00" id="3_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.41679" y1="56.76591" x2="127.41679" y2="71.42756" stroke="#ffff00" id="3_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.4751" y1="56.71185" x2="124.4751" y2="71.3735" stroke="#ffff00" id="3_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.53343" y1="56.76591" x2="121.53343" y2="71.42756" stroke="#ffff00" id="3_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.91607" y1="56.8228" x2="118.91607" y2="71.48446" stroke="#ffff00" id="3_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.4054" y1="56.77159" x2="231.4054" y2="71.43324" stroke="#ffff00" id="3_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.52061" y1="56.71754" x2="228.52061" y2="71.37919" stroke="#ffff00" id="3_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="225.73825" y1="56.66917" x2="225.73825" y2="71.33083" stroke="#ffff00" id="3_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="222.95874" y1="56.60943" x2="222.95874" y2="71.27108" stroke="#ffff00" id="3_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.07111" y1="56.66348" x2="220.07111" y2="71.32513" stroke="#ffff00" id="3_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.2916" y1="56.66917" x2="217.2916" y2="71.33083" stroke="#ffff00" id="3_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.29586" y1="56.77159" x2="214.29586" y2="71.43324" stroke="#ffff00" id="3_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.40824" y1="56.66917" x2="211.40824" y2="71.33083" stroke="#ffff00" id="3_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.57467" y1="56.77159" x2="208.57467" y2="71.43324" stroke="#ffff00" id="3_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="205.7411" y1="56.77728" x2="205.7411" y2="71.43894" stroke="#ffff00" id="3_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.85063" y1="56.83133" x2="202.85063" y2="71.49299" stroke="#ffff00" id="3_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="199.963" y1="56.83133" x2="199.963" y2="71.49299" stroke="#ffff00" id="3_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="197.08107" y1="56.88539" x2="197.08107" y2="71.54705" stroke="#ffff00" id="3_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.14225" y1="56.83133" x2="194.14225" y2="71.49299" stroke="#ffff00" id="3_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.25746" y1="56.93375" x2="191.25746" y2="71.5954" stroke="#ffff00" id="3_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.69701" y1="56.99066" x2="188.69701" y2="71.65231" stroke="#ffff00" id="3_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.70412" y1="56.88255" x2="185.70412" y2="71.5442" stroke="#ffff00" id="3_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.92461" y1="56.88255" x2="182.92461" y2="71.5442" stroke="#ffff00" id="3_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.98292" y1="56.88255" x2="179.98292" y2="71.5442" stroke="#ffff00" id="3_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.04125" y1="56.93375" x2="177.04125" y2="71.5954" stroke="#ffff00" id="3_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="302.38406" y1="57.09307" x2="302.38406" y2="71.75473" stroke="#ffff00" id="3_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="299.44523" y1="56.98781" x2="299.44523" y2="71.64946" stroke="#ffff00" id="3_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="296.45234" y1="57.04186" x2="296.45234" y2="71.70351" stroke="#ffff00" id="3_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="293.56472" y1="56.93375" x2="293.56472" y2="71.5954" stroke="#ffff00" id="3_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="290.62304" y1="56.88823" x2="290.62304" y2="71.54988" stroke="#ffff00" id="3_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="287.68136" y1="56.88539" x2="287.68136" y2="71.54705" stroke="#ffff00" id="3_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="284.79373" y1="56.88255" x2="284.79373" y2="71.5442" stroke="#ffff00" id="3_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="281.8549" y1="56.88255" x2="281.8549" y2="71.5442" stroke="#ffff00" id="3_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="278.91322" y1="56.72607" x2="278.91322" y2="71.38772" stroke="#ffff00" id="3_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="275.91748" y1="56.77444" x2="275.91748" y2="71.43609" stroke="#ffff00" id="3_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="273.13797" y1="56.77444" x2="273.13797" y2="71.43609" stroke="#ffff00" id="3_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="270.1963" y1="56.71469" x2="270.1963" y2="71.37635" stroke="#ffff00" id="3_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="267.30582" y1="56.81711" x2="267.30582" y2="71.47876" stroke="#ffff00" id="3_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="264.42105" y1="56.77159" x2="264.42105" y2="71.43324" stroke="#ffff00" id="3_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="261.96585" y1="56.77444" x2="261.96585" y2="71.43609" stroke="#ffff00" id="3_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="259.13229" y1="56.8228" x2="259.13229" y2="71.48446" stroke="#ffff00" id="3_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="257.22048" y1="56.77444" x2="257.22048" y2="71.43609" stroke="#ffff00" id="3_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="254.27879" y1="56.77444" x2="254.27879" y2="71.43609" stroke="#ffff00" id="3_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.25177" y1="56.93944" x2="237.25177" y2="71.6011" stroke="#ffff00" id="3_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.29302" y1="56.88539" x2="234.29302" y2="71.54705" stroke="#ffff00" id="3_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="359.96018" y1="57.14997" x2="359.96018" y2="71.81162" stroke="#ffff00" id="3_76"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="357.07256" y1="57.03901" x2="357.07256" y2="71.70067" stroke="#ffff00" id="3_75"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="354.24183" y1="57.04471" x2="354.24183" y2="71.70636" stroke="#ffff00" id="3_74"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="351.30299" y1="56.98781" x2="351.30299" y2="71.64946" stroke="#ffff00" id="3_73"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="348.41537" y1="56.99066" x2="348.41537" y2="71.65231" stroke="#ffff00" id="3_72"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="345.52206" y1="56.9366" x2="345.52206" y2="71.59825" stroke="#ffff00" id="3_71"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="342.74254" y1="56.82565" x2="342.74254" y2="71.4873" stroke="#ffff00" id="3_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="339.96302" y1="56.77444" x2="339.96302" y2="71.43609" stroke="#ffff00" id="3_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="336.96729" y1="56.82565" x2="336.96729" y2="71.4873" stroke="#ffff00" id="3_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="334.02846" y1="56.77159" x2="334.02846" y2="71.43324" stroke="#ffff00" id="3_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="331.3599" y1="56.72039" x2="331.3599" y2="71.38204" stroke="#ffff00" id="3_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="328.47227" y1="56.77728" x2="328.47227" y2="71.43894" stroke="#ffff00" id="3_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="325.58749" y1="56.83133" x2="325.58749" y2="71.49299" stroke="#ffff00" id="3_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="322.75392" y1="56.78013" x2="322.75392" y2="71.44178" stroke="#ffff00" id="3_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="319.75819" y1="56.83133" x2="319.75819" y2="71.49299" stroke="#ffff00" id="3_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="317.03272" y1="56.88539" x2="317.03272" y2="71.54705" stroke="#ffff00" id="3_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="314.15079" y1="56.98212" x2="314.15079" y2="71.64377" stroke="#ffff00" id="3_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="311.20911" y1="56.98496" x2="311.20911" y2="71.64662" stroke="#ffff00" id="3_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="308.32149" y1="56.88823" x2="308.32149" y2="71.54988" stroke="#ffff00" id="3_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="305.37981" y1="56.9366" x2="305.37981" y2="71.59825" stroke="#ffff00" id="3_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="389.07823" y1="56.98212" x2="389.07823" y2="71.64377" stroke="#ffff00" id="3_86"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="386.1394" y1="56.93091" x2="386.1394" y2="71.59257" stroke="#ffff00" id="3_85"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="383.25463" y1="56.97643" x2="383.25463" y2="71.63809" stroke="#ffff00" id="3_84"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="380.4751" y1="56.81996" x2="380.4751" y2="71.48161" stroke="#ffff00" id="3_83"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="377.53627" y1="56.9366" x2="377.53627" y2="71.59825" stroke="#ffff00" id="3_82"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="374.59744" y1="56.99066" x2="374.59744" y2="71.65231" stroke="#ffff00" id="3_81"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="371.65861" y1="57.09023" x2="371.65861" y2="71.75188" stroke="#ffff00" id="3_80"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="368.77667" y1="56.98781" x2="368.77667" y2="71.64946" stroke="#ffff00" id="3_79"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="365.83784" y1="57.03901" x2="365.83784" y2="71.70067" stroke="#ffff00" id="3_78"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="362.84495" y1="57.09592" x2="362.84495" y2="71.75757" stroke="#ffff00" id="3_77"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="394.68848" y1="57.13859" x2="394.68848" y2="71.80024" stroke="#ffff00" id="3_88"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="391.8037" y1="57.08453" x2="391.8037" y2="71.74618" stroke="#ffff00" id="3_87"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.49075" y1="75.41171" x2="173.49075" y2="90.07336" stroke="#ffff00" id="4_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.66003" y1="75.40317" x2="170.66003" y2="90.06482" stroke="#ffff00" id="4_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.98862" y1="75.40886" x2="167.98862" y2="90.07052" stroke="#ffff00" id="4_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.101" y1="75.3548" x2="165.101" y2="90.01646" stroke="#ffff00" id="4_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.27027" y1="75.3548" x2="162.27027" y2="90.01646" stroke="#ffff00" id="4_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.43669" y1="75.51128" x2="159.43669" y2="90.17293" stroke="#ffff00" id="4_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.55192" y1="75.40886" x2="156.55192" y2="90.07052" stroke="#ffff00" id="4_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.66429" y1="75.40602" x2="153.66429" y2="90.06767" stroke="#ffff00" id="4_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.72262" y1="75.46007" x2="150.72262" y2="90.12172" stroke="#ffff00" id="4_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.88904" y1="75.46291" x2="147.88904" y2="90.12457" stroke="#ffff00" id="4_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.00426" y1="75.56818" x2="145.00426" y2="90.22983" stroke="#ffff00" id="4_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.11664" y1="75.61654" x2="142.11664" y2="90.2782" stroke="#ffff00" id="4_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.17496" y1="75.66776" x2="139.17496" y2="90.32941" stroke="#ffff00" id="4_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.23613" y1="75.7275" x2="136.23613" y2="90.38915" stroke="#ffff00" id="4_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.40256" y1="75.67629" x2="133.40256" y2="90.33794" stroke="#ffff00" id="4_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.40683" y1="75.72181" x2="130.40683" y2="90.38346" stroke="#ffff00" id="4_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.46799" y1="75.72465" x2="127.46799" y2="90.38631" stroke="#ffff00" id="4_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.52631" y1="75.71896" x2="124.52631" y2="90.38061" stroke="#ffff00" id="4_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.58464" y1="75.71327" x2="121.58464" y2="90.37493" stroke="#ffff00" id="4_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.85633" y1="75.76732" x2="118.85633" y2="90.42898" stroke="#ffff00" id="4_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="240.6515" y1="75.61939" x2="240.6515" y2="90.28105" stroke="#ffff00" id="4_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.76387" y1="75.56818" x2="237.76387" y2="90.22983" stroke="#ffff00" id="4_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.76814" y1="75.45723" x2="234.76814" y2="90.11889" stroke="#ffff00" id="4_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.82646" y1="75.46007" x2="231.82646" y2="90.12172" stroke="#ffff00" id="4_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.99289" y1="75.45723" x2="228.99289" y2="90.11889" stroke="#ffff00" id="4_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="226.21337" y1="75.56818" x2="226.21337" y2="90.22983" stroke="#ffff00" id="4_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="223.38265" y1="75.56249" x2="223.38265" y2="90.22415" stroke="#ffff00" id="4_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.49502" y1="75.67059" x2="220.49502" y2="90.33225" stroke="#ffff00" id="4_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.66429" y1="75.66776" x2="217.66429" y2="90.32941" stroke="#ffff00" id="4_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.77667" y1="75.71328" x2="214.77667" y2="90.37493" stroke="#ffff00" id="4_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.78094" y1="75.71896" x2="211.78094" y2="90.38061" stroke="#ffff00" id="4_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.94737" y1="75.7275" x2="208.94737" y2="90.38916" stroke="#ffff00" id="4_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="206.00569" y1="75.82707" x2="206.00569" y2="90.48872" stroke="#ffff00" id="4_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="203.06401" y1="75.82707" x2="203.06401" y2="90.48872" stroke="#ffff00" id="4_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="200.93599" y1="75.8356" x2="200.93599" y2="90.49726" stroke="#ffff00" id="4_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="198.21053" y1="75.77586" x2="198.21053" y2="90.43751" stroke="#ffff00" id="4_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="195.32575" y1="75.67344" x2="195.32575" y2="90.3351" stroke="#ffff00" id="4_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.25605" y1="75.30645" x2="182.25605" y2="89.9681" stroke="#ffff00" id="4_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.26316" y1="75.40032" x2="179.26316" y2="90.06198" stroke="#ffff00" id="4_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.43243" y1="75.3548" x2="176.43243" y2="90.01646" stroke="#ffff00" id="4_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="298.74821" y1="75.82707" x2="298.74821" y2="90.48872" stroke="#ffff00" id="4_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="295.86059" y1="75.82422" x2="295.86059" y2="90.48587" stroke="#ffff00" id="4_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="292.92176" y1="75.72465" x2="292.92176" y2="90.3863" stroke="#ffff00" id="4_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="290.03698" y1="75.7218" x2="290.03698" y2="90.38346" stroke="#ffff00" id="4_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="287.14936" y1="75.66491" x2="287.14936" y2="90.32656" stroke="#ffff00" id="4_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="284.26742" y1="75.7218" x2="284.26742" y2="90.38346" stroke="#ffff00" id="4_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="281.32574" y1="75.76732" x2="281.32574" y2="90.42898" stroke="#ffff00" id="4_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="278.38406" y1="75.87543" x2="278.38406" y2="90.53709" stroke="#ffff00" id="4_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="275.44807" y1="75.94086" x2="275.44807" y2="90.60251" stroke="#ffff00" id="4_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="272.50639" y1="75.98923" x2="272.50639" y2="90.65088" stroke="#ffff00" id="4_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="269.61877" y1="75.82991" x2="269.61877" y2="90.49157" stroke="#ffff00" id="4_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="266.73399" y1="75.92948" x2="266.73399" y2="90.59114" stroke="#ffff00" id="4_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="263.90042" y1="75.82137" x2="263.90042" y2="90.48303" stroke="#ffff00" id="4_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="261.06685" y1="75.77585" x2="261.06685" y2="90.43751" stroke="#ffff00" id="4_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="258.17922" y1="75.7218" x2="258.17922" y2="90.38346" stroke="#ffff00" id="4_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="255.3485" y1="75.61654" x2="255.3485" y2="90.27819" stroke="#ffff00" id="4_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="252.51778" y1="75.7275" x2="252.51778" y2="90.38915" stroke="#ffff00" id="4_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="249.57894" y1="75.61939" x2="249.57894" y2="90.28104" stroke="#ffff00" id="4_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="246.6401" y1="75.67059" x2="246.6401" y2="90.33224" stroke="#ffff00" id="4_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="243.64438" y1="75.55964" x2="243.64438" y2="90.2213" stroke="#ffff00" id="4_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="356.85916" y1="76.20545" x2="356.85916" y2="90.8671" stroke="#ffff00" id="4_81"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="354.02843" y1="76.15424" x2="354.02843" y2="90.81589" stroke="#ffff00" id="4_80"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="351.14366" y1="76.20545" x2="351.14366" y2="90.8671" stroke="#ffff00" id="4_79"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="348.25603" y1="76.25665" x2="348.25603" y2="90.9183" stroke="#ffff00" id="4_78"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="345.36841" y1="76.31356" x2="345.36841" y2="90.97521" stroke="#ffff00" id="4_77"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="342.43242" y1="76.30786" x2="342.43242" y2="90.96952" stroke="#ffff00" id="4_76"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="339.54764" y1="76.30786" x2="339.54764" y2="90.96952" stroke="#ffff00" id="4_75"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="336.66001" y1="76.25097" x2="336.66001" y2="90.91262" stroke="#ffff00" id="4_74"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="333.71834" y1="76.19691" x2="333.71834" y2="90.85856" stroke="#ffff00" id="4_73"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="330.71976" y1="76.25381" x2="330.71976" y2="90.91547" stroke="#ffff00" id="4_72"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="327.78093" y1="76.26235" x2="327.78093" y2="90.924" stroke="#ffff00" id="4_71"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="324.9502" y1="76.09449" x2="324.9502" y2="90.75614" stroke="#ffff00" id="4_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="322.01136" y1="76.03759" x2="322.01136" y2="90.69925" stroke="#ffff00" id="4_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="319.12374" y1="75.92948" x2="319.12374" y2="90.59114" stroke="#ffff00" id="4_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="316.23896" y1="75.92948" x2="316.23896" y2="90.59114" stroke="#ffff00" id="4_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="313.24038" y1="75.93233" x2="313.24038" y2="90.59398" stroke="#ffff00" id="4_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="310.35276" y1="75.88397" x2="310.35276" y2="90.54562" stroke="#ffff00" id="4_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="307.41108" y1="75.88112" x2="307.41108" y2="90.54277" stroke="#ffff00" id="4_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="304.46941" y1="75.87828" x2="304.46941" y2="90.53993" stroke="#ffff00" id="4_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="301.58178" y1="75.92948" x2="301.58178" y2="90.59114" stroke="#ffff00" id="4_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="380.14226" y1="76.25097" x2="380.14226" y2="90.91262" stroke="#ffff00" id="4_89"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="377.23187" y1="76.19976" x2="377.23187" y2="90.86141" stroke="#ffff00" id="4_88"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="374.34424" y1="76.14571" x2="374.34424" y2="90.80736" stroke="#ffff00" id="4_87"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="371.40541" y1="76.04897" x2="371.40541" y2="90.71063" stroke="#ffff00" id="4_86"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="368.51779" y1="76.15993" x2="368.51779" y2="90.82158" stroke="#ffff00" id="4_85"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="365.5761" y1="76.15424" x2="365.5761" y2="90.81589" stroke="#ffff00" id="4_84"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="362.63443" y1="76.09734" x2="362.63443" y2="90.75899" stroke="#ffff00" id="4_83"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="359.80085" y1="76.09449" x2="359.80085" y2="90.75615" stroke="#ffff00" id="4_82"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.1707" y1="94.68055" x2="174.1707" y2="109.3422" stroke="#ffff00" id="5_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.33713" y1="94.73176" x2="171.33713" y2="109.39342" stroke="#ffff00" id="5_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.5064" y1="94.6265" x2="168.5064" y2="109.28815" stroke="#ffff00" id="5_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.57042" y1="94.5696" x2="165.57042" y2="109.23126" stroke="#ffff00" id="5_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.63443" y1="94.45864" x2="162.63443" y2="109.1203" stroke="#ffff00" id="5_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.8037" y1="94.46434" x2="159.8037" y2="109.12599" stroke="#ffff00" id="5_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.85918" y1="94.47002" x2="156.85918" y2="109.13168" stroke="#ffff00" id="5_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.92319" y1="94.47002" x2="153.92319" y2="109.13168" stroke="#ffff00" id="5_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.99004" y1="94.42166" x2="150.99004" y2="109.08331" stroke="#ffff00" id="5_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="148.05121" y1="94.41313" x2="148.05121" y2="109.07478" stroke="#ffff00" id="5_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.11237" y1="94.36476" x2="145.11237" y2="109.02641" stroke="#ffff00" id="5_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.16785" y1="94.31356" x2="142.16785" y2="108.97521" stroke="#ffff00" id="5_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.28308" y1="94.2595" x2="139.28308" y2="108.92115" stroke="#ffff00" id="5_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.39545" y1="94.20545" x2="136.39545" y2="108.8671" stroke="#ffff00" id="5_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.50783" y1="94.31356" x2="133.50783" y2="108.97521" stroke="#ffff00" id="5_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.51494" y1="94.21113" x2="130.51494" y2="108.87278" stroke="#ffff00" id="5_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.52205" y1="94.21682" x2="127.52205" y2="108.87848" stroke="#ffff00" id="5_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.63443" y1="94.10587" x2="124.63443" y2="108.76752" stroke="#ffff00" id="5_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.90612" y1="94.16277" x2="121.90612" y2="108.82443" stroke="#ffff00" id="5_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.18065" y1="94.21682" x2="119.18065" y2="108.87848" stroke="#ffff00" id="5_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="238.9047" y1="94.39321" x2="238.9047" y2="109.05486" stroke="#ffff00" id="5_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="235.96018" y1="94.34485" x2="235.96018" y2="109.00651" stroke="#ffff00" id="5_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="233.17782" y1="94.34201" x2="233.17782" y2="109.00366" stroke="#ffff00" id="5_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="230.18493" y1="94.36191" x2="230.18493" y2="109.02357" stroke="#ffff00" id="5_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="227.29731" y1="94.35908" x2="227.29731" y2="109.02073" stroke="#ffff00" id="5_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="224.41253" y1="94.41028" x2="224.41253" y2="109.07193" stroke="#ffff00" id="5_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="221.52206" y1="94.41028" x2="221.52206" y2="109.07193" stroke="#ffff00" id="5_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="218.58037" y1="94.46434" x2="218.58037" y2="109.12599" stroke="#ffff00" id="5_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="215.74681" y1="94.35623" x2="215.74681" y2="109.01788" stroke="#ffff00" id="5_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="212.97013" y1="94.41028" x2="212.97013" y2="109.07193" stroke="#ffff00" id="5_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.08252" y1="94.40743" x2="210.08252" y2="109.06909" stroke="#ffff00" id="5_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="207.30584" y1="94.41313" x2="207.30584" y2="109.07478" stroke="#ffff00" id="5_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="204.58037" y1="94.35908" x2="204.58037" y2="109.02073" stroke="#ffff00" id="5_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="201.69275" y1="94.41028" x2="201.69275" y2="109.07193" stroke="#ffff00" id="5_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="198.75392" y1="94.45865" x2="198.75392" y2="109.1203" stroke="#ffff00" id="5_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="195.97441" y1="94.56391" x2="195.97441" y2="109.22556" stroke="#ffff00" id="5_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="193.4111" y1="94.45865" x2="193.4111" y2="109.1203" stroke="#ffff00" id="5_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.06686" y1="94.40743" x2="191.06686" y2="109.06909" stroke="#ffff00" id="5_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.56188" y1="94.62365" x2="179.56188" y2="109.28531" stroke="#ffff00" id="5_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.06117" y1="94.68055" x2="177.06117" y2="109.3422" stroke="#ffff00" id="5_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="325.16074" y1="94.94229" x2="325.16074" y2="109.60394" stroke="#ffff00" id="5_71"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="322.27312" y1="94.95367" x2="322.27312" y2="109.61532" stroke="#ffff00" id="5_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="319.4936" y1="94.94513" x2="319.4936" y2="109.60679" stroke="#ffff00" id="5_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="316.71408" y1="94.88823" x2="316.71408" y2="109.54988" stroke="#ffff00" id="5_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="313.88336" y1="94.78581" x2="313.88336" y2="109.44747" stroke="#ffff00" id="5_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="311.101" y1="94.88823" x2="311.101" y2="109.54988" stroke="#ffff00" id="5_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="308.10811" y1="94.78013" x2="308.10811" y2="109.44178" stroke="#ffff00" id="5_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="305.22049" y1="94.78296" x2="305.22049" y2="109.44462" stroke="#ffff00" id="5_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="302.28449" y1="94.73176" x2="302.28449" y2="109.39342" stroke="#ffff00" id="5_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="299.45377" y1="94.72891" x2="299.45377" y2="109.39057" stroke="#ffff00" id="5_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="296.6202" y1="94.76874" x2="296.6202" y2="109.43039" stroke="#ffff00" id="5_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="293.78378" y1="94.72038" x2="293.78378" y2="109.38204" stroke="#ffff00" id="5_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="290.89616" y1="94.6208" x2="290.89616" y2="109.28246" stroke="#ffff00" id="5_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="288.00853" y1="94.66632" x2="288.00853" y2="109.32798" stroke="#ffff00" id="5_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="285.1266" y1="94.5696" x2="285.1266" y2="109.23126" stroke="#ffff00" id="5_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="282.24182" y1="94.45864" x2="282.24182" y2="109.1203" stroke="#ffff00" id="5_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="279.35704" y1="94.45864" x2="279.35704" y2="109.1203" stroke="#ffff00" id="5_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="276.52916" y1="94.46149" x2="276.52916" y2="109.12315" stroke="#ffff00" id="5_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="273.65007" y1="94.44727" x2="273.65007" y2="109.10892" stroke="#ffff00" id="5_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="270.82219" y1="94.4558" x2="270.82219" y2="109.11745" stroke="#ffff00" id="5_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="267.88904" y1="94.4558" x2="267.88904" y2="109.11745" stroke="#ffff00" id="5_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="264.95875" y1="94.51269" x2="264.95875" y2="109.17435" stroke="#ffff00" id="5_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="262.0256" y1="94.56106" x2="262.0256" y2="109.22271" stroke="#ffff00" id="5_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="259.08962" y1="94.45295" x2="259.08962" y2="109.1146" stroke="#ffff00" id="5_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="256.367" y1="94.35338" x2="256.367" y2="109.01504" stroke="#ffff00" id="5_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="253.43101" y1="94.3989" x2="253.43101" y2="109.06055" stroke="#ffff00" id="5_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="250.54623" y1="94.46149" x2="250.54623" y2="109.12315" stroke="#ffff00" id="5_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="247.61024" y1="94.50701" x2="247.61024" y2="109.16866" stroke="#ffff00" id="5_44_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="244.67141" y1="94.44442" x2="244.67141" y2="109.10607" stroke="#ffff00" id="5_44_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="241.78663" y1="94.40175" x2="241.78663" y2="109.0634" stroke="#ffff00" id="5_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="353.53059" y1="94.92806" x2="353.53059" y2="109.58972" stroke="#ffff00" id="5_81"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="350.64297" y1="94.87685" x2="350.64297" y2="109.53851" stroke="#ffff00" id="5_80"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="347.8094" y1="94.81711" x2="347.8094" y2="109.47876" stroke="#ffff00" id="5_79"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="344.97583" y1="94.78013" x2="344.97583" y2="109.44178" stroke="#ffff00" id="5_78"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="342.1451" y1="94.72892" x2="342.1451" y2="109.39057" stroke="#ffff00" id="5_77"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="339.26032" y1="94.67202" x2="339.26032" y2="109.33367" stroke="#ffff00" id="5_76"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="336.53771" y1="94.72607" x2="336.53771" y2="109.38772" stroke="#ffff00" id="5_75"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="333.59888" y1="94.77728" x2="333.59888" y2="109.43894" stroke="#ffff00" id="5_74"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="330.771" y1="94.77728" x2="330.771" y2="109.43894" stroke="#ffff00" id="5_73"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="327.93742" y1="94.83703" x2="327.93742" y2="109.49868" stroke="#ffff00" id="5_72"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="361.90326" y1="94.87685" x2="361.90326" y2="109.53851" stroke="#ffff00" id="5_84"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="358.98151" y1="94.88255" x2="358.98151" y2="109.5442" stroke="#ffff00" id="5_83"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="356.31294" y1="94.92237" x2="356.31294" y2="109.58403" stroke="#ffff00" id="5_82"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.35562" y1="113.46291" x2="168.35562" y2="128.12457" stroke="#ffff00" id="6_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.41821" y1="113.46291" x2="188.41821" y2="128.12457" stroke="#ffff00" id="6_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.58748" y1="113.5255" x2="185.58748" y2="128.18716" stroke="#ffff00" id="6_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.70555" y1="113.57672" x2="182.70555" y2="128.23837" stroke="#ffff00" id="6_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.87767" y1="113.5255" x2="179.87767" y2="128.18716" stroke="#ffff00" id="6_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.99858" y1="113.5255" x2="176.99858" y2="128.18716" stroke="#ffff00" id="6_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.2276" y1="113.46576" x2="174.2276" y2="128.12741" stroke="#ffff00" id="6_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.2404" y1="113.51697" x2="171.2404" y2="128.17863" stroke="#ffff00" id="6_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.41679" y1="113.40317" x2="165.41679" y2="128.06482" stroke="#ffff00" id="6_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.58321" y1="113.40602" x2="162.58321" y2="128.06767" stroke="#ffff00" id="6_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.70128" y1="113.34912" x2="159.70128" y2="128.01077" stroke="#ffff00" id="6_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.76529" y1="113.35765" x2="156.76529" y2="128.0193" stroke="#ffff00" id="6_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.98862" y1="113.14144" x2="153.98862" y2="127.80309" stroke="#ffff00" id="6_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="151.00142" y1="113.19549" x2="151.00142" y2="127.85714" stroke="#ffff00" id="6_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="148.2276" y1="113.08453" x2="148.2276" y2="127.74619" stroke="#ffff00" id="6_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.39972" y1="113.13859" x2="145.39972" y2="127.80025" stroke="#ffff00" id="6_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.46373" y1="113.09023" x2="142.46373" y2="127.75188" stroke="#ffff00" id="6_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.63585" y1="113.08738" x2="139.63585" y2="127.74903" stroke="#ffff00" id="6_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.69986" y1="113.09023" x2="136.69986" y2="127.75188" stroke="#ffff00" id="6_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.70696" y1="113.09023" x2="133.70696" y2="127.75188" stroke="#ffff00" id="6_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.8791" y1="113.09023" x2="130.8791" y2="127.75188" stroke="#ffff00" id="6_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.88621" y1="113.08738" x2="127.88621" y2="127.74903" stroke="#ffff00" id="6_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.94737" y1="113.09023" x2="124.94737" y2="127.75188" stroke="#ffff00" id="svg_567"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.95733" y1="113.08738" x2="121.95733" y2="127.74903" stroke="#ffff00" id="6_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.01564" y1="113.08453" x2="119.01564" y2="127.74619" stroke="#ffff00" id="6_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.30014" y1="113.41171" x2="191.30014" y2="128.07336" stroke="#ffff00" id="6_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="261.54196" y1="113.82991" x2="261.54196" y2="128.49157" stroke="#ffff00" id="6_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="258.65433" y1="113.82137" x2="258.65433" y2="128.48303" stroke="#ffff00" id="6_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="255.82361" y1="113.77585" x2="255.82361" y2="128.43751" stroke="#ffff00" id="6_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="252.94167" y1="113.71896" x2="252.94167" y2="128.38061" stroke="#ffff00" id="6_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="250.05689" y1="113.71896" x2="250.05689" y2="128.38061" stroke="#ffff00" id="6_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="247.33712" y1="113.7218" x2="247.33712" y2="128.38346" stroke="#ffff00" id="6_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="244.34424" y1="113.77585" x2="244.34424" y2="128.43751" stroke="#ffff00" id="6_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="241.56472" y1="113.7787" x2="241.56472" y2="128.44036" stroke="#ffff00" id="6_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="238.68279" y1="113.82137" x2="238.68279" y2="128.48303" stroke="#ffff00" id="6_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="235.80085" y1="113.82707" x2="235.80085" y2="128.48872" stroke="#ffff00" id="6_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="232.86486" y1="113.77302" x2="232.86486" y2="128.43467" stroke="#ffff00" id="6_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="229.98008" y1="113.77585" x2="229.98008" y2="128.43751" stroke="#ffff00" id="6_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="226.99004" y1="113.82707" x2="226.99004" y2="128.48872" stroke="#ffff00" id="6_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="224.10811" y1="113.76732" x2="224.10811" y2="128.42898" stroke="#ffff00" id="6_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="221.11237" y1="113.82707" x2="221.11237" y2="128.48872" stroke="#ffff00" id="6_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="218.3926" y1="113.77302" x2="218.3926" y2="128.43467" stroke="#ffff00" id="6_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="215.50782" y1="113.77585" x2="215.50782" y2="128.43751" stroke="#ffff00" id="6_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="212.79089" y1="113.82707" x2="212.79089" y2="128.48872" stroke="#ffff00" id="6_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.28734" y1="113.77302" x2="210.28734" y2="128.43467" stroke="#ffff00" id="6_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="332.59745" y1="113.7844" x2="332.59745" y2="128.44605" stroke="#ffff00" id="6_73"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="329.71836" y1="113.76733" x2="329.71836" y2="128.42898" stroke="#ffff00" id="6_72"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="327.0498" y1="113.71896" x2="327.0498" y2="128.38062" stroke="#ffff00" id="6_71"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="324.33287" y1="113.73318" x2="324.33287" y2="128.39484" stroke="#ffff00" id="6_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="321.50784" y1="113.82992" x2="321.50784" y2="128.49157" stroke="#ffff00" id="6_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="318.6259" y1="113.82992" x2="318.6259" y2="128.49157" stroke="#ffff00" id="6_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="315.79801" y1="113.87259" x2="315.79801" y2="128.53424" stroke="#ffff00" id="6_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="313.02419" y1="113.93233" x2="313.02419" y2="128.59399" stroke="#ffff00" id="6_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="310.08536" y1="113.87828" x2="310.08536" y2="128.53994" stroke="#ffff00" id="6_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="307.36274" y1="113.88112" x2="307.36274" y2="128.54278" stroke="#ffff00" id="6_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="304.58892" y1="113.83277" x2="304.58892" y2="128.49442" stroke="#ffff00" id="6_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="301.75819" y1="113.94371" x2="301.75819" y2="128.60537" stroke="#ffff00" id="6_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="298.81935" y1="113.88397" x2="298.81935" y2="128.54562" stroke="#ffff00" id="6_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="296.04553" y1="113.82422" x2="296.04553" y2="128.48588" stroke="#ffff00" id="6_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="293.2717" y1="113.72181" x2="293.2717" y2="128.38346" stroke="#ffff00" id="6_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="290.38692" y1="113.61655" x2="290.38692" y2="128.2782" stroke="#ffff00" id="6_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="287.39688" y1="113.55965" x2="287.39688" y2="128.2213" stroke="#ffff00" id="6_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="284.45805" y1="113.6137" x2="284.45805" y2="128.27535" stroke="#ffff00" id="6_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="281.57326" y1="113.6137" x2="281.57326" y2="128.27535" stroke="#ffff00" id="6_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="278.69133" y1="113.60801" x2="278.69133" y2="128.26967" stroke="#ffff00" id="6_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="275.86061" y1="113.55965" x2="275.86061" y2="128.2213" stroke="#ffff00" id="6_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="272.92178" y1="113.6137" x2="272.92178" y2="128.27535" stroke="#ffff00" id="6_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="270.19916" y1="113.72466" x2="270.19916" y2="128.38631" stroke="#ffff00" id="6_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="267.31438" y1="113.72466" x2="267.31438" y2="128.38631" stroke="#ffff00" id="6_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="264.37554" y1="113.78155" x2="264.37554" y2="128.44321" stroke="#ffff00" id="6_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="343.58465" y1="113.67913" x2="343.58465" y2="128.34078" stroke="#ffff00" id="6_77"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="340.91892" y1="113.78439" x2="340.91892" y2="128.44605" stroke="#ffff00" id="6_76"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="338.03983" y1="113.78439" x2="338.03983" y2="128.44605" stroke="#ffff00" id="6_75"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="335.32006" y1="113.7275" x2="335.32006" y2="128.38915" stroke="#ffff00" id="6_74"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="346.36416" y1="113.73033" x2="346.36416" y2="128.39199" stroke="#ffff00" id="6_78"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="187.50783" y1="132.08596" x2="187.50783" y2="146.74761" stroke="#ffff00" id="7_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="184.734" y1="132.09164" x2="184.734" y2="146.7533" stroke="#ffff00" id="7_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="181.96301" y1="132.15139" x2="181.96301" y2="146.81304" stroke="#ffff00" id="7_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.13798" y1="132.1457" x2="179.13798" y2="146.80736" stroke="#ffff00" id="7_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.36701" y1="132.19122" x2="176.36701" y2="146.85288" stroke="#ffff00" id="7_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.70128" y1="132.2026" x2="173.70128" y2="146.86425" stroke="#ffff00" id="7_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.81651" y1="132.2026" x2="170.81651" y2="146.86425" stroke="#ffff00" id="7_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.92888" y1="132.14855" x2="167.92888" y2="146.8102" stroke="#ffff00" id="7_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.09531" y1="132.1457" x2="165.09531" y2="146.80736" stroke="#ffff00" id="7_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.21338" y1="132.09164" x2="162.21338" y2="146.7533" stroke="#ffff00" id="7_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.38549" y1="132.09449" x2="159.38549" y2="146.75614" stroke="#ffff00" id="7_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.44666" y1="132.09449" x2="156.44666" y2="146.75614" stroke="#ffff00" id="7_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.50783" y1="132.04044" x2="153.50783" y2="146.70209" stroke="#ffff00" id="7_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.67425" y1="132.03759" x2="150.67425" y2="146.69925" stroke="#ffff00" id="7_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.78948" y1="132.09164" x2="147.78948" y2="146.7533" stroke="#ffff00" id="7_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.90185" y1="132.03475" x2="144.90185" y2="146.6964" stroke="#ffff00" id="7_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.01707" y1="132.08596" x2="142.01707" y2="146.74761" stroke="#ffff00" id="7_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.23756" y1="132.14855" x2="139.23756" y2="146.8102" stroke="#ffff00" id="7_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.29587" y1="132.1457" x2="136.29587" y2="146.80736" stroke="#ffff00" id="7_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.46231" y1="132.1457" x2="133.46231" y2="146.80736" stroke="#ffff00" id="7_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.6828" y1="132.14001" x2="130.6828" y2="146.80166" stroke="#ffff00" id="7_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.84922" y1="132.19691" x2="127.84922" y2="146.85856" stroke="#ffff00" id="7_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.9047" y1="132.1457" x2="124.9047" y2="146.80736" stroke="#ffff00" id="7_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.96301" y1="132.0319" x2="121.96301" y2="146.69355" stroke="#ffff00" id="7_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.07539" y1="132.14001" x2="119.07539" y2="146.80166" stroke="#ffff00" id="7_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="257.61025" y1="131.9807" x2="257.61025" y2="146.64235" stroke="#ffff00" id="7_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="254.72262" y1="131.93233" x2="254.72262" y2="146.59398" stroke="#ffff00" id="7_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="252.15932" y1="131.87259" x2="252.15932" y2="146.53424" stroke="#ffff00" id="7_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="249.49076" y1="131.92664" x2="249.49076" y2="146.58829" stroke="#ffff00" id="7_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="246.71409" y1="131.87543" x2="246.71409" y2="146.53709" stroke="#ffff00" id="7_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="244.04552" y1="131.93518" x2="244.04552" y2="146.59683" stroke="#ffff00" id="7_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="241.21764" y1="131.88112" x2="241.21764" y2="146.54277" stroke="#ffff00" id="7_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="238.43813" y1="131.93233" x2="238.43813" y2="146.59398" stroke="#ffff00" id="7_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="235.55335" y1="131.87543" x2="235.55335" y2="146.53709" stroke="#ffff00" id="7_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="232.61451" y1="131.98354" x2="232.61451" y2="146.6452" stroke="#ffff00" id="7_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="229.73258" y1="131.93233" x2="229.73258" y2="146.59398" stroke="#ffff00" id="7_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="226.85349" y1="131.83276" x2="226.85349" y2="146.49441" stroke="#ffff00" id="7_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="223.9175" y1="131.82991" x2="223.9175" y2="146.49157" stroke="#ffff00" id="7_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="221.25178" y1="131.88112" x2="221.25178" y2="146.54277" stroke="#ffff00" id="7_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="218.31579" y1="131.82707" x2="218.31579" y2="146.48872" stroke="#ffff00" id="7_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="215.43102" y1="131.93233" x2="215.43102" y2="146.59398" stroke="#ffff00" id="7_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="212.54907" y1="131.88112" x2="212.54907" y2="146.54277" stroke="#ffff00" id="7_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="209.7212" y1="131.82137" x2="209.7212" y2="146.48303" stroke="#ffff00" id="7_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="207.80939" y1="131.82422" x2="207.80939" y2="146.48587" stroke="#ffff00" id="7_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="190.12803" y1="132.08881" x2="190.12803" y2="146.75046" stroke="#ffff00" id="7_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="328.61167" y1="132.14286" x2="328.61167" y2="146.80452" stroke="#ffff00" id="7_73"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="325.67284" y1="132.14286" x2="325.67284" y2="146.80452" stroke="#ffff00" id="7_72"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="322.78522" y1="132.14001" x2="322.78522" y2="146.80167" stroke="#ffff00" id="7_71"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="320.0057" y1="132.13717" x2="320.0057" y2="146.79882" stroke="#ffff00" id="7_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="317.22618" y1="132.08596" x2="317.22618" y2="146.74762" stroke="#ffff00" id="7_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="314.55762" y1="132.14001" x2="314.55762" y2="146.80167" stroke="#ffff00" id="7_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="311.72689" y1="132.14571" x2="311.72689" y2="146.80736" stroke="#ffff00" id="7_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="308.734" y1="132.14855" x2="308.734" y2="146.81021" stroke="#ffff00" id="7_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="305.90044" y1="132.19123" x2="305.90044" y2="146.85288" stroke="#ffff00" id="7_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="303.12091" y1="132.14001" x2="303.12091" y2="146.80167" stroke="#ffff00" id="7_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="300.23614" y1="132.19123" x2="300.23614" y2="146.85288" stroke="#ffff00" id="7_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="297.40542" y1="132.24528" x2="297.40542" y2="146.90693" stroke="#ffff00" id="7_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="294.57184" y1="132.19407" x2="294.57184" y2="146.85573" stroke="#ffff00" id="7_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="291.84638" y1="132.19123" x2="291.84638" y2="146.85288" stroke="#ffff00" id="7_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="289.06686" y1="132.14286" x2="289.06686" y2="146.80452" stroke="#ffff00" id="7_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="286.18209" y1="132.19976" x2="286.18209" y2="146.86141" stroke="#ffff00" id="7_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="283.35136" y1="132.19407" x2="283.35136" y2="146.85573" stroke="#ffff00" id="7_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="280.57754" y1="132.14571" x2="280.57754" y2="146.80736" stroke="#ffff00" id="7_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="277.6956" y1="132.14571" x2="277.6956" y2="146.80736" stroke="#ffff00" id="7_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="274.86488" y1="132.19407" x2="274.86488" y2="146.85573" stroke="#ffff00" id="7_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="272.1451" y1="132.19407" x2="272.1451" y2="146.85573" stroke="#ffff00" id="7_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="269.31438" y1="132.19123" x2="269.31438" y2="146.85288" stroke="#ffff00" id="7_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="266.42959" y1="132.08881" x2="266.42959" y2="146.75047" stroke="#ffff00" id="7_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="263.43387" y1="131.97785" x2="263.43387" y2="146.63951" stroke="#ffff00" id="7_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="260.54908" y1="132.08312" x2="260.54908" y2="146.74477" stroke="#ffff00" id="7_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="331.60739" y1="132.08311" x2="331.60739" y2="146.74476" stroke="#ffff00" id="7_74"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.91749" y1="150.68055" x2="173.91749" y2="165.3422" stroke="#ffff00" id="8_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.02988" y1="150.68055" x2="171.02988" y2="165.3422" stroke="#ffff00" id="8_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.14509" y1="150.73176" x2="168.14509" y2="165.39342" stroke="#ffff00" id="8_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.1522" y1="150.73461" x2="165.1522" y2="165.39626" stroke="#ffff00" id="8_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.31864" y1="150.72892" x2="162.31864" y2="165.39057" stroke="#ffff00" id="8_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.43386" y1="150.72607" x2="159.43386" y2="165.38772" stroke="#ffff00" id="8_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.60313" y1="150.72607" x2="156.60313" y2="165.38772" stroke="#ffff00" id="8_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.66146" y1="150.83703" x2="153.66146" y2="165.49868" stroke="#ffff00" id="8_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.77383" y1="150.83133" x2="150.77383" y2="165.49299" stroke="#ffff00" id="8_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.88336" y1="150.78013" x2="147.88336" y2="165.44178" stroke="#ffff00" id="8_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.94452" y1="150.66633" x2="144.94452" y2="165.32798" stroke="#ffff00" id="8_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.00285" y1="150.66064" x2="142.00285" y2="165.3223" stroke="#ffff00" id="8_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.06401" y1="150.55822" x2="139.06401" y2="165.21987" stroke="#ffff00" id="8_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.17923" y1="150.49847" x2="136.17923" y2="165.16013" stroke="#ffff00" id="8_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.29446" y1="150.55538" x2="133.29446" y2="165.21703" stroke="#ffff00" id="8_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.51779" y1="150.55822" x2="130.51779" y2="165.21987" stroke="#ffff00" id="8_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.63016" y1="150.56106" x2="127.63016" y2="165.22272" stroke="#ffff00" id="8_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.69132" y1="150.61796" x2="124.69132" y2="165.27961" stroke="#ffff00" id="8_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.74965" y1="150.50417" x2="121.74965" y2="165.16582" stroke="#ffff00" id="8_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.75676" y1="150.56106" x2="118.75676" y2="165.22272" stroke="#ffff00" id="8_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="270.32149" y1="150.6265" x2="270.32149" y2="165.28815" stroke="#ffff00" id="8_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="267.54481" y1="150.62365" x2="267.54481" y2="165.2853" stroke="#ffff00" id="8_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="264.66003" y1="150.57244" x2="264.66003" y2="165.23409" stroke="#ffff00" id="8_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="261.77241" y1="150.51839" x2="261.77241" y2="165.18004" stroke="#ffff00" id="8_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="258.88763" y1="150.46149" x2="258.88763" y2="165.12314" stroke="#ffff00" id="8_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="256.0569" y1="150.56106" x2="256.0569" y2="165.22271" stroke="#ffff00" id="8_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="253.17212" y1="150.61796" x2="253.17212" y2="165.27961" stroke="#ffff00" id="8_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="250.23328" y1="150.56675" x2="250.23328" y2="165.22841" stroke="#ffff00" id="8_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="247.34851" y1="150.5696" x2="247.34851" y2="165.23125" stroke="#ffff00" id="8_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="244.51779" y1="150.62365" x2="244.51779" y2="165.2853" stroke="#ffff00" id="8_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="241.57895" y1="150.72607" x2="241.57895" y2="165.38772" stroke="#ffff00" id="8_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="238.80512" y1="150.66917" x2="238.80512" y2="165.33082" stroke="#ffff00" id="8_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="236.0313" y1="150.66917" x2="236.0313" y2="165.33082" stroke="#ffff00" id="8_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="233.36273" y1="150.66917" x2="233.36273" y2="165.33082" stroke="#ffff00" id="8_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="230.58891" y1="150.72038" x2="230.58891" y2="165.38204" stroke="#ffff00" id="8_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="227.75534" y1="150.8228" x2="227.75534" y2="165.48445" stroke="#ffff00" id="8_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="224.8734" y1="150.71754" x2="224.8734" y2="165.37919" stroke="#ffff00" id="8_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="221.98863" y1="150.77443" x2="221.98863" y2="165.43609" stroke="#ffff00" id="8_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="219.04979" y1="150.77159" x2="219.04979" y2="165.43324" stroke="#ffff00" id="8_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="216.11096" y1="150.77159" x2="216.11096" y2="165.43324" stroke="#ffff00" id="8_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="213.27739" y1="150.66632" x2="213.27739" y2="165.32798" stroke="#ffff00" id="8_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.38976" y1="150.77159" x2="210.38976" y2="165.43324" stroke="#ffff00" id="8_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="207.5562" y1="150.76874" x2="207.5562" y2="165.43039" stroke="#ffff00" id="8_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="204.56046" y1="150.8797" x2="204.56046" y2="165.54135" stroke="#ffff00" id="8_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="201.67568" y1="150.82565" x2="201.67568" y2="165.4873" stroke="#ffff00" id="8_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="198.73685" y1="150.71754" x2="198.73685" y2="165.37919" stroke="#ffff00" id="8_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="196.50072" y1="150.72322" x2="196.50072" y2="165.38487" stroke="#ffff00" id="8_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="193.56188" y1="150.61796" x2="193.56188" y2="165.27961" stroke="#ffff00" id="8_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="190.78521" y1="150.66632" x2="190.78521" y2="165.32798" stroke="#ffff00" id="8_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.38691" y1="150.61227" x2="188.38691" y2="165.27393" stroke="#ffff00" id="8_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="298.41822" y1="150.51269" x2="298.41822" y2="165.17435" stroke="#ffff00" id="8_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="295.53344" y1="150.56391" x2="295.53344" y2="165.22556" stroke="#ffff00" id="8_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="292.69987" y1="150.6208" x2="292.69987" y2="165.28246" stroke="#ffff00" id="8_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="289.8663" y1="150.50701" x2="289.8663" y2="165.16866" stroke="#ffff00" id="8_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="287.08963" y1="150.51269" x2="287.08963" y2="165.17435" stroke="#ffff00" id="8_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="284.20485" y1="150.50986" x2="284.20485" y2="165.17151" stroke="#ffff00" id="8_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="281.43103" y1="150.45864" x2="281.43103" y2="165.1203" stroke="#ffff00" id="8_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="278.54909" y1="150.50986" x2="278.54909" y2="165.17151" stroke="#ffff00" id="8_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="275.76957" y1="150.51269" x2="275.76957" y2="165.17435" stroke="#ffff00" id="8_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="273.15506" y1="150.56675" x2="273.15506" y2="165.22841" stroke="#ffff00" id="8_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="312.93598" y1="150.51838" x2="312.93598" y2="165.18004" stroke="#ffff00" id="8_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="310.165" y1="150.57243" x2="310.165" y2="165.23409" stroke="#ffff00" id="8_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="307.28307" y1="150.57528" x2="307.28307" y2="165.23694" stroke="#ffff00" id="8_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="304.29302" y1="150.51838" x2="304.29302" y2="165.18004" stroke="#ffff00" id="8_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="301.41109" y1="150.51269" x2="301.41109" y2="165.17434" stroke="#ffff00" id="8_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="206.75392" y1="169.04755" x2="206.75392" y2="183.70921" stroke="#ffff00" id="9_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="204.74254" y1="169.03617" x2="204.74254" y2="183.69783" stroke="#ffff00" id="9_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.88763" y1="169.09592" x2="202.88763" y2="183.75757" stroke="#ffff00" id="9_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.4367" y1="168.93091" x2="179.4367" y2="183.59257" stroke="#ffff00" id="9_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.60883" y1="168.98781" x2="176.60883" y2="183.64946" stroke="#ffff00" id="9_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.77525" y1="168.93375" x2="173.77525" y2="183.5954" stroke="#ffff00" id="9_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.83642" y1="169.03617" x2="170.83642" y2="183.69783" stroke="#ffff00" id="9_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.89759" y1="168.97927" x2="167.89759" y2="183.64092" stroke="#ffff00" id="9_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="164.95875" y1="169.03617" x2="164.95875" y2="183.69783" stroke="#ffff00" id="9_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.12802" y1="169.03617" x2="162.12802" y2="183.69783" stroke="#ffff00" id="9_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.40541" y1="169.03333" x2="159.40541" y2="183.69498" stroke="#ffff00" id="9_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.46658" y1="168.97927" x2="156.46658" y2="183.64092" stroke="#ffff00" id="9_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.5249" y1="168.98781" x2="153.5249" y2="183.64946" stroke="#ffff00" id="9_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.58606" y1="168.93375" x2="150.58606" y2="183.5954" stroke="#ffff00" id="9_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.70129" y1="168.93375" x2="147.70129" y2="183.5954" stroke="#ffff00" id="9_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.87056" y1="169.03901" x2="144.87056" y2="183.70067" stroke="#ffff00" id="9_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.93173" y1="169.09307" x2="141.93173" y2="183.75473" stroke="#ffff00" id="9_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.0441" y1="169.09022" x2="139.0441" y2="183.75188" stroke="#ffff00" id="9_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.10811" y1="169.03617" x2="136.10811" y2="183.69783" stroke="#ffff00" id="9_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.17497" y1="169.04186" x2="133.17497" y2="183.70351" stroke="#ffff00" id="9_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.29019" y1="169.03617" x2="130.29019" y2="183.69783" stroke="#ffff00" id="9_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.51351" y1="169.03901" x2="127.51351" y2="183.70067" stroke="#ffff00" id="9_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.62874" y1="169.04186" x2="124.62874" y2="183.70351" stroke="#ffff00" id="9_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.68991" y1="169.04186" x2="121.68991" y2="183.70351" stroke="#ffff00" id="9_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.96444" y1="169.03617" x2="118.96444" y2="183.69783" stroke="#ffff00" id="9_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="209.25462" y1="168.98496" x2="209.25462" y2="183.64662" stroke="#ffff00" id="9_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="277.78378" y1="168.81995" x2="277.78378" y2="183.48161" stroke="#ffff00" id="9_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="275.00711" y1="168.874" x2="275.00711" y2="183.53566" stroke="#ffff00" id="9_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="272.17638" y1="168.86832" x2="272.17638" y2="183.52997" stroke="#ffff00" id="9_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="269.2916" y1="168.92237" x2="269.2916" y2="183.58402" stroke="#ffff00" id="9_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="266.46372" y1="168.91952" x2="266.46372" y2="183.58118" stroke="#ffff00" id="9_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="263.63299" y1="168.93091" x2="263.63299" y2="183.59256" stroke="#ffff00" id="9_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="260.69132" y1="168.92806" x2="260.69132" y2="183.58972" stroke="#ffff00" id="9_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="257.80369" y1="168.93091" x2="257.80369" y2="183.59256" stroke="#ffff00" id="9_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="254.86486" y1="169.03333" x2="254.86486" y2="183.69498" stroke="#ffff00" id="9_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="251.92603" y1="168.97927" x2="251.92603" y2="183.64092" stroke="#ffff00" id="9_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="248.98719" y1="168.93375" x2="248.98719" y2="183.5954" stroke="#ffff00" id="9_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="246.04836" y1="168.93659" x2="246.04836" y2="183.59825" stroke="#ffff00" id="9_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="243.05263" y1="168.98496" x2="243.05263" y2="183.64661" stroke="#ffff00" id="9_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="240.54338" y1="169.03617" x2="240.54338" y2="183.69783" stroke="#ffff00" id="9_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.5505" y1="169.09022" x2="237.5505" y2="183.75188" stroke="#ffff00" id="9_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.55761" y1="168.98496" x2="234.55761" y2="183.64661" stroke="#ffff00" id="9_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.67283" y1="169.09875" x2="231.67283" y2="183.76041" stroke="#ffff00" id="9_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.73399" y1="169.04186" x2="228.73399" y2="183.70351" stroke="#ffff00" id="9_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="226.01422" y1="169.09022" x2="226.01422" y2="183.75188" stroke="#ffff00" id="9_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="223.18349" y1="169.09022" x2="223.18349" y2="183.75188" stroke="#ffff00" id="9_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.35277" y1="169.03901" x2="220.35277" y2="183.70066" stroke="#ffff00" id="9_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.73826" y1="169.03901" x2="217.73826" y2="183.70066" stroke="#ffff00" id="9_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.85348" y1="169.04186" x2="214.85348" y2="183.70351" stroke="#ffff00" id="9_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.92033" y1="168.98496" x2="211.92033" y2="183.64661" stroke="#ffff00" id="9_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="280.6714" y1="168.81711" x2="280.6714" y2="183.47876" stroke="#ffff00" id="9_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="305.88335" y1="168.66348" x2="305.88335" y2="183.32513" stroke="#ffff00" id="9_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="303.10668" y1="168.66064" x2="303.10668" y2="183.3223" stroke="#ffff00" id="9_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="300.48932" y1="168.71469" x2="300.48932" y2="183.37635" stroke="#ffff00" id="9_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="297.65576" y1="168.75737" x2="297.65576" y2="183.41902" stroke="#ffff00" id="9_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="294.82503" y1="168.81143" x2="294.82503" y2="183.47308" stroke="#ffff00" id="9_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="292.10241" y1="168.81426" x2="292.10241" y2="183.47592" stroke="#ffff00" id="9_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="289.16358" y1="168.76306" x2="289.16358" y2="183.42471" stroke="#ffff00" id="9_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="286.38691" y1="168.76874" x2="286.38691" y2="183.4304" stroke="#ffff00" id="9_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="283.44523" y1="168.81996" x2="283.44523" y2="183.48161" stroke="#ffff00" id="9_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="308.71407" y1="168.66633" x2="308.71407" y2="183.32798" stroke="#ffff00" id="9_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.93741" y1="187.45154" x2="159.93741" y2="202.11319" stroke="#ffff00" id="10_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.94452" y1="187.34627" x2="156.94452" y2="202.00793" stroke="#ffff00" id="10_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="154.11664" y1="187.45154" x2="154.11664" y2="202.11319" stroke="#ffff00" id="10_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="151.23186" y1="187.45154" x2="151.23186" y2="202.11319" stroke="#ffff00" id="10_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="148.29303" y1="187.45438" x2="148.29303" y2="202.11604" stroke="#ffff00" id="10_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.3542" y1="187.45154" x2="145.3542" y2="202.11319" stroke="#ffff00" id="10_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.4182" y1="187.45723" x2="142.4182" y2="202.11888" stroke="#ffff00" id="10_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.53343" y1="187.45438" x2="139.53343" y2="202.11604" stroke="#ffff00" id="10_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.64865" y1="187.35197" x2="136.64865" y2="202.01362" stroke="#ffff00" id="10_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.70981" y1="187.40317" x2="133.70981" y2="202.06482" stroke="#ffff00" id="10_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.71977" y1="187.35197" x2="130.71977" y2="202.01362" stroke="#ffff00" id="10_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.83499" y1="187.40886" x2="127.83499" y2="202.07052" stroke="#ffff00" id="10_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.94737" y1="187.34627" x2="124.94737" y2="202.00793" stroke="#ffff00" id="10_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="122.11664" y1="187.35197" x2="122.11664" y2="202.01362" stroke="#ffff00" id="10_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.22901" y1="187.34912" x2="119.22901" y2="202.01077" stroke="#ffff00" id="10_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.7653" y1="187.34912" x2="162.7653" y2="202.01078" stroke="#ffff00" id="10_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="257.12091" y1="187.19834" x2="257.12091" y2="201.85999" stroke="#ffff00" id="10_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="254.18493" y1="187.13575" x2="254.18493" y2="201.7974" stroke="#ffff00" id="10_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="251.3542" y1="187.18696" x2="251.3542" y2="201.84862" stroke="#ffff00" id="10_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="248.58037" y1="187.35481" x2="248.58037" y2="202.01646" stroke="#ffff00" id="10_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="245.91181" y1="187.19549" x2="245.91181" y2="201.85715" stroke="#ffff00" id="10_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="243.08393" y1="187.1898" x2="243.08393" y2="201.85145" stroke="#ffff00" id="10_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="240.20484" y1="187.24671" x2="240.20484" y2="201.90836" stroke="#ffff00" id="10_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.26886" y1="187.24954" x2="237.26886" y2="201.9112" stroke="#ffff00" id="10_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.44098" y1="187.24386" x2="234.44098" y2="201.90551" stroke="#ffff00" id="10_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.50498" y1="187.40317" x2="231.50498" y2="202.06483" stroke="#ffff00" id="10_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.67426" y1="187.29791" x2="228.67426" y2="201.95956" stroke="#ffff00" id="10_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="225.84638" y1="187.29506" x2="225.84638" y2="201.95672" stroke="#ffff00" id="10_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="222.91038" y1="187.35197" x2="222.91038" y2="202.01362" stroke="#ffff00" id="10_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.02561" y1="187.35481" x2="220.02561" y2="202.01646" stroke="#ffff00" id="10_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.08963" y1="187.40033" x2="217.08963" y2="202.06198" stroke="#ffff00" id="10_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.36701" y1="187.35197" x2="214.36701" y2="202.01362" stroke="#ffff00" id="10_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.42817" y1="187.35197" x2="211.42817" y2="202.01362" stroke="#ffff00" id="10_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.59744" y1="187.29791" x2="208.59744" y2="201.95956" stroke="#ffff00" id="10_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="205.76672" y1="187.35481" x2="205.76672" y2="202.01646" stroke="#ffff00" id="10_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.88194" y1="187.30076" x2="202.88194" y2="201.96241" stroke="#ffff00" id="10_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="200.00001" y1="187.40317" x2="200.00001" y2="202.06483" stroke="#ffff00" id="10_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="197.05833" y1="187.35481" x2="197.05833" y2="202.01646" stroke="#ffff00" id="10_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.12234" y1="187.40602" x2="194.12234" y2="202.06767" stroke="#ffff00" id="10_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.1835" y1="187.30076" x2="191.1835" y2="201.96241" stroke="#ffff00" id="10_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.19061" y1="187.29791" x2="188.19061" y2="201.95956" stroke="#ffff00" id="10_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.25463" y1="187.24386" x2="185.25463" y2="201.90551" stroke="#ffff00" id="10_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.36984" y1="187.29506" x2="182.36984" y2="201.95672" stroke="#ffff00" id="10_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.4367" y1="187.40317" x2="179.4367" y2="202.06483" stroke="#ffff00" id="10_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.26601" y1="187.40033" x2="165.26601" y2="202.06198" stroke="#ffff00" id="10_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="285.56189" y1="187.29506" x2="285.56189" y2="201.95672" stroke="#ffff00" id="10_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="282.78238" y1="187.30076" x2="282.78238" y2="201.96241" stroke="#ffff00" id="10_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="280.00286" y1="187.19265" x2="280.00286" y2="201.8543" stroke="#ffff00" id="10_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="277.16929" y1="187.13575" x2="277.16929" y2="201.79741" stroke="#ffff00" id="10_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="274.28166" y1="187.07885" x2="274.28166" y2="201.74051" stroke="#ffff00" id="10_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="271.39688" y1="187.12722" x2="271.39688" y2="201.78887" stroke="#ffff00" id="10_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="268.61737" y1="187.1329" x2="268.61737" y2="201.79456" stroke="#ffff00" id="10_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="265.78664" y1="187.1898" x2="265.78664" y2="201.85146" stroke="#ffff00" id="10_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="262.95023" y1="187.24671" x2="262.95023" y2="201.90836" stroke="#ffff00" id="10_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="260.00571" y1="187.13575" x2="260.00571" y2="201.79741" stroke="#ffff00" id="10_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="296.99858" y1="187.14143" x2="296.99858" y2="201.80309" stroke="#ffff00" id="10_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="294.21906" y1="187.13574" x2="294.21906" y2="201.79739" stroke="#ffff00" id="10_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="291.33143" y1="187.20401" x2="291.33143" y2="201.86567" stroke="#ffff00" id="10_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="288.3926" y1="187.36334" x2="288.3926" y2="202.02499" stroke="#ffff00" id="10_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="200.38976" y1="206.10018" x2="200.38976" y2="220.76183" stroke="#ffff00" id="11_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="180.62589" y1="206.30216" x2="180.62589" y2="220.96382" stroke="#ffff00" id="11_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.95448" y1="206.24811" x2="177.95448" y2="220.90977" stroke="#ffff00" id="11_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="175.23471" y1="206.19975" x2="175.23471" y2="220.8614" stroke="#ffff00" id="11_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="172.46373" y1="206.24811" x2="172.46373" y2="220.90977" stroke="#ffff00" id="11_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="169.74111" y1="206.24527" x2="169.74111" y2="220.90692" stroke="#ffff00" id="11_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="166.91038" y1="206.19122" x2="166.91038" y2="220.85287" stroke="#ffff00" id="11_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="164.19061" y1="206.19122" x2="164.19061" y2="220.85287" stroke="#ffff00" id="11_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="161.35705" y1="206.14285" x2="161.35705" y2="220.8045" stroke="#ffff00" id="11_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="158.58321" y1="206.1457" x2="158.58321" y2="220.80735" stroke="#ffff00" id="11_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="155.91749" y1="206.14" x2="155.91749" y2="220.80166" stroke="#ffff00" id="11_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.14367" y1="206.09164" x2="153.14367" y2="220.75329" stroke="#ffff00" id="11_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.36984" y1="206.03759" x2="150.36984" y2="220.69924" stroke="#ffff00" id="11_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.48791" y1="206.09448" x2="147.48791" y2="220.75614" stroke="#ffff00" id="11_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.60313" y1="206.04043" x2="144.60313" y2="220.70209" stroke="#ffff00" id="11_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.7212" y1="206.03759" x2="141.7212" y2="220.69924" stroke="#ffff00" id="11_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="138.83642" y1="206.03759" x2="138.83642" y2="220.69924" stroke="#ffff00" id="11_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="135.95163" y1="206.03759" x2="135.95163" y2="220.69924" stroke="#ffff00" id="11_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.0697" y1="206.03759" x2="133.0697" y2="220.69924" stroke="#ffff00" id="11_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.18493" y1="205.98069" x2="130.18493" y2="220.64234" stroke="#ffff00" id="11_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.35135" y1="206.03474" x2="127.35135" y2="220.69639" stroke="#ffff00" id="11_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.46657" y1="205.92948" x2="124.46657" y2="220.59113" stroke="#ffff00" id="11_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.47369" y1="205.93232" x2="121.47369" y2="220.59398" stroke="#ffff00" id="11_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.85633" y1="205.93232" x2="118.85633" y2="220.59398" stroke="#ffff00" id="11_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="285.68421" y1="206.25097" x2="285.68421" y2="220.91262" stroke="#ffff00" id="11_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="282.85633" y1="206.30502" x2="282.85633" y2="220.96667" stroke="#ffff00" id="11_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="279.9744" y1="206.36191" x2="279.9744" y2="221.02357" stroke="#ffff00" id="11_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="277.14367" y1="206.41597" x2="277.14367" y2="221.07763" stroke="#ffff00" id="11_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="274.367" y1="206.40175" x2="274.367" y2="221.0634" stroke="#ffff00" id="11_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="271.42816" y1="206.5127" x2="271.42816" y2="221.17435" stroke="#ffff00" id="11_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="268.48933" y1="206.52408" x2="268.48933" y2="221.18574" stroke="#ffff00" id="11_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="265.71551" y1="206.47002" x2="265.71551" y2="221.13168" stroke="#ffff00" id="11_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="262.83073" y1="206.46434" x2="262.83073" y2="221.12599" stroke="#ffff00" id="11_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="260.10526" y1="206.31071" x2="260.10526" y2="220.97236" stroke="#ffff00" id="11_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="257.27738" y1="206.36191" x2="257.27738" y2="221.02357" stroke="#ffff00" id="11_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="254.50071" y1="206.40743" x2="254.50071" y2="221.06909" stroke="#ffff00" id="11_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="251.66999" y1="206.35623" x2="251.66999" y2="221.01788" stroke="#ffff00" id="11_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="248.89332" y1="206.29933" x2="248.89332" y2="220.96099" stroke="#ffff00" id="11_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="246.06259" y1="206.35623" x2="246.06259" y2="221.01788" stroke="#ffff00" id="11_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="243.12375" y1="206.19407" x2="243.12375" y2="220.85572" stroke="#ffff00" id="11_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="240.29019" y1="206.35623" x2="240.29019" y2="221.01788" stroke="#ffff00" id="11_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.40541" y1="206.24812" x2="237.40541" y2="220.90977" stroke="#ffff00" id="11_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.57183" y1="206.19122" x2="234.57183" y2="220.85288" stroke="#ffff00" id="11_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.633" y1="206.13433" x2="231.633" y2="220.79598" stroke="#ffff00" id="11_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.69417" y1="206.13716" x2="228.69417" y2="220.79882" stroke="#ffff00" id="11_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="225.91465" y1="206.08311" x2="225.91465" y2="220.74477" stroke="#ffff00" id="11_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="223.02703" y1="206.08881" x2="223.02703" y2="220.75046" stroke="#ffff00" id="11_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.08819" y1="206.14286" x2="220.08819" y2="220.80451" stroke="#ffff00" id="11_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.0953" y1="206.09164" x2="217.0953" y2="220.7533" stroke="#ffff00" id="11_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.21053" y1="206.14286" x2="214.21053" y2="220.80451" stroke="#ffff00" id="11_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.38549" y1="206.10018" x2="211.38549" y2="220.76184" stroke="#ffff00" id="11_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.66287" y1="206.04044" x2="208.66287" y2="220.70209" stroke="#ffff00" id="11_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="205.88904" y1="206.09164" x2="205.88904" y2="220.7533" stroke="#ffff00" id="11_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="203.05833" y1="206.09449" x2="203.05833" y2="220.75614" stroke="#ffff00" id="11_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="299.98293" y1="206.2595" x2="299.98293" y2="220.92116" stroke="#ffff00" id="11_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="297.04694" y1="206.36192" x2="297.04694" y2="221.02357" stroke="#ffff00" id="11_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="294.22191" y1="206.25382" x2="294.22191" y2="220.91547" stroke="#ffff00" id="11_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="291.39688" y1="206.30787" x2="291.39688" y2="220.96952" stroke="#ffff00" id="11_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="288.569" y1="206.25382" x2="288.569" y2="220.91547" stroke="#ffff00" id="11_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.33571" y1="225.0447" x2="144.33571" y2="239.70636" stroke="#ffff00" id="12_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.55903" y1="225.08738" x2="141.55903" y2="239.74903" stroke="#ffff00" id="12_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="138.67141" y1="225.13859" x2="138.67141" y2="239.80024" stroke="#ffff00" id="12_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="135.89759" y1="225.03901" x2="135.89759" y2="239.70067" stroke="#ffff00" id="12_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="132.95875" y1="225.08738" x2="132.95875" y2="239.74903" stroke="#ffff00" id="12_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.12802" y1="225.08738" x2="130.12802" y2="239.74903" stroke="#ffff00" id="12_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.24324" y1="225.09307" x2="127.24324" y2="239.75473" stroke="#ffff00" id="12_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.41253" y1="225.14144" x2="124.41253" y2="239.80309" stroke="#ffff00" id="12_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.47369" y1="225.18696" x2="121.47369" y2="239.84861" stroke="#ffff00" id="12_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.85918" y1="225.1329" x2="118.85918" y2="239.79455" stroke="#ffff00" id="12_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="180" y1="224.35623" x2="180" y2="239.01788" stroke="#ffff00" id="12_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.76387" y1="224.39321" x2="177.76387" y2="239.05486" stroke="#ffff00" id="12_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="175.20342" y1="224.45295" x2="175.20342" y2="239.11461" stroke="#ffff00" id="12_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="172.31864" y1="224.41882" x2="172.31864" y2="239.08047" stroke="#ffff00" id="12_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="160.83073" y1="224.93375" x2="160.83073" y2="239.5954" stroke="#ffff00" id="12_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="158.16501" y1="224.98496" x2="158.16501" y2="239.64662" stroke="#ffff00" id="12_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="155.33713" y1="225.03333" x2="155.33713" y2="239.69498" stroke="#ffff00" id="12_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="152.4495" y1="225.02763" x2="152.4495" y2="239.68929" stroke="#ffff00" id="12_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="149.72688" y1="225.03618" x2="149.72688" y2="239.69783" stroke="#ffff00" id="12_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.11238" y1="225.05608" x2="147.11238" y2="239.71774" stroke="#ffff00" id="12_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="264.27312" y1="224.5696" x2="264.27312" y2="239.23126" stroke="#ffff00" id="12_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="261.39402" y1="224.56106" x2="261.39402" y2="239.22271" stroke="#ffff00" id="12_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="258.61735" y1="224.54968" x2="258.61735" y2="239.21134" stroke="#ffff00" id="12_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="255.73542" y1="224.62365" x2="255.73542" y2="239.28531" stroke="#ffff00" id="12_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="252.90185" y1="224.60658" x2="252.90185" y2="239.26823" stroke="#ffff00" id="12_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="250.12233" y1="224.6208" x2="250.12233" y2="239.28246" stroke="#ffff00" id="12_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="247.34566" y1="224.66632" x2="247.34566" y2="239.32798" stroke="#ffff00" id="12_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="244.56614" y1="224.66917" x2="244.56614" y2="239.33082" stroke="#ffff00" id="12_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="241.73542" y1="224.71754" x2="241.73542" y2="239.37919" stroke="#ffff00" id="12_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="238.85064" y1="224.66917" x2="238.85064" y2="239.33082" stroke="#ffff00" id="12_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="236.07112" y1="224.77443" x2="236.07112" y2="239.43609" stroke="#ffff00" id="12_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="233.24039" y1="224.81995" x2="233.24039" y2="239.48161" stroke="#ffff00" id="12_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="230.46088" y1="224.76306" x2="230.46088" y2="239.42471" stroke="#ffff00" id="12_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="227.89758" y1="224.82565" x2="227.89758" y2="239.4873" stroke="#ffff00" id="12_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="225.06401" y1="224.7659" x2="225.06401" y2="239.42756" stroke="#ffff00" id="12_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="222.12518" y1="224.66064" x2="222.12518" y2="239.32229" stroke="#ffff00" id="12_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="219.2404" y1="224.55821" x2="219.2404" y2="239.21987" stroke="#ffff00" id="12_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="216.30441" y1="224.46717" x2="216.30441" y2="239.12883" stroke="#ffff00" id="12_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="213.47653" y1="224.4558" x2="213.47653" y2="239.11745" stroke="#ffff00" id="12_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.6458" y1="224.55253" x2="210.6458" y2="239.21418" stroke="#ffff00" id="12_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="207.70696" y1="224.50986" x2="207.70696" y2="239.17151" stroke="#ffff00" id="12_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="204.87625" y1="224.3989" x2="204.87625" y2="239.06055" stroke="#ffff00" id="12_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.09957" y1="224.35338" x2="202.09957" y2="239.01504" stroke="#ffff00" id="12_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="199.31721" y1="224.39605" x2="199.31721" y2="239.05771" stroke="#ffff00" id="12_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="196.54339" y1="224.34769" x2="196.54339" y2="239.00934" stroke="#ffff00" id="12_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="193.65861" y1="224.28794" x2="193.65861" y2="238.9496" stroke="#ffff00" id="12_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="190.99289" y1="224.33631" x2="190.99289" y2="238.99796" stroke="#ffff00" id="12_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.32717" y1="224.34769" x2="188.32717" y2="239.00934" stroke="#ffff00" id="12_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.66146" y1="224.29079" x2="185.66146" y2="238.95244" stroke="#ffff00" id="12_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.72262" y1="224.35338" x2="182.72262" y2="239.01504" stroke="#ffff00" id="12_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="291.50497" y1="224.58383" x2="291.50497" y2="239.24549" stroke="#ffff00" id="12_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="289.04125" y1="224.51555" x2="289.04125" y2="239.1772" stroke="#ffff00" id="12_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="286.31863" y1="224.55538" x2="286.31863" y2="239.21704" stroke="#ffff00" id="12_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="283.92317" y1="224.6265" x2="283.92317" y2="239.28816" stroke="#ffff00" id="12_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="281.14936" y1="224.72323" x2="281.14936" y2="239.38488" stroke="#ffff00" id="12_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="278.37268" y1="224.72323" x2="278.37268" y2="239.38488" stroke="#ffff00" id="12_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="275.53911" y1="224.67487" x2="275.53911" y2="239.33653" stroke="#ffff00" id="12_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="272.81649" y1="224.72039" x2="272.81649" y2="239.38204" stroke="#ffff00" id="12_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="269.98861" y1="224.72323" x2="269.98861" y2="239.38488" stroke="#ffff00" id="12_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="267.15789" y1="224.67487" x2="267.15789" y2="239.33653" stroke="#ffff00" id="12_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.69986" y1="242.93091" x2="118.69986" y2="257.59257" stroke="#ffff00" id="13_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="129.92319" y1="242.88823" x2="129.92319" y2="257.54989" stroke="#ffff00" id="13_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.20057" y1="242.93944" x2="127.20057" y2="257.6011" stroke="#ffff00" id="13_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.52632" y1="242.93375" x2="124.52632" y2="257.59541" stroke="#ffff00" id="13_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.53058" y1="242.93375" x2="121.53058" y2="257.59541" stroke="#ffff00" id="13_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="134.78521" y1="242.87685" x2="134.78521" y2="257.53851" stroke="#ffff00" id="13_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="132.11096" y1="242.8228" x2="132.11096" y2="257.48446" stroke="#ffff00" id="13_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="225.59887" y1="242.71185" x2="225.59887" y2="257.3735" stroke="#ffff00" id="13_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="222.66288" y1="242.66917" x2="222.66288" y2="257.33083" stroke="#ffff00" id="13_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="219.835" y1="242.65495" x2="219.835" y2="257.3166" stroke="#ffff00" id="13_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.00142" y1="242.709" x2="217.00142" y2="257.37065" stroke="#ffff00" id="13_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.22475" y1="242.71469" x2="214.22475" y2="257.37635" stroke="#ffff00" id="13_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.33713" y1="242.70332" x2="211.33713" y2="257.36497" stroke="#ffff00" id="13_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.45235" y1="242.66633" x2="208.45235" y2="257.32798" stroke="#ffff00" id="13_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="205.61878" y1="242.6521" x2="205.61878" y2="257.31376" stroke="#ffff00" id="13_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.84211" y1="242.61228" x2="202.84211" y2="257.27393" stroke="#ffff00" id="13_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="199.95733" y1="242.66633" x2="199.95733" y2="257.32798" stroke="#ffff00" id="13_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="197.23756" y1="242.61796" x2="197.23756" y2="257.27962" stroke="#ffff00" id="13_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.51494" y1="242.66633" x2="194.51494" y2="257.32798" stroke="#ffff00" id="13_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.68421" y1="242.6521" x2="191.68421" y2="257.31376" stroke="#ffff00" id="13_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="189.01281" y1="242.66348" x2="189.01281" y2="257.32514" stroke="#ffff00" id="13_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="186.34139" y1="242.71185" x2="186.34139" y2="257.3735" stroke="#ffff00" id="13_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="183.51068" y1="242.66348" x2="183.51068" y2="257.32514" stroke="#ffff00" id="13_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="180.62589" y1="242.71469" x2="180.62589" y2="257.37635" stroke="#ffff00" id="13_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="178.06544" y1="242.66917" x2="178.06544" y2="257.33083" stroke="#ffff00" id="13_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="175.34282" y1="242.76874" x2="175.34282" y2="257.4304" stroke="#ffff00" id="13_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="172.67141" y1="242.93091" x2="172.67141" y2="257.59257" stroke="#ffff00" id="13_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="169.89474" y1="242.8797" x2="169.89474" y2="257.54136" stroke="#ffff00" id="13_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.06401" y1="242.8228" x2="167.06401" y2="257.48446" stroke="#ffff00" id="13_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="164.18208" y1="242.8797" x2="164.18208" y2="257.54136" stroke="#ffff00" id="13_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="161.30015" y1="242.98212" x2="161.30015" y2="257.64377" stroke="#ffff00" id="13_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="158.36416" y1="242.92237" x2="158.36416" y2="257.58403" stroke="#ffff00" id="13_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="155.48222" y1="242.93944" x2="155.48222" y2="257.6011" stroke="#ffff00" id="13_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="152.60028" y1="242.9366" x2="152.60028" y2="257.59825" stroke="#ffff00" id="13_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="149.93173" y1="242.99066" x2="149.93173" y2="257.65231" stroke="#ffff00" id="13_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.20911" y1="242.97927" x2="147.20911" y2="257.64092" stroke="#ffff00" id="13_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.75676" y1="242.88255" x2="144.75676" y2="257.5442" stroke="#ffff00" id="13_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="253.84637" y1="242.72322" x2="253.84637" y2="257.38488" stroke="#ffff00" id="13_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="250.95874" y1="242.82849" x2="250.95874" y2="257.49014" stroke="#ffff00" id="13_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="248.23897" y1="242.86832" x2="248.23897" y2="257.52998" stroke="#ffff00" id="13_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="245.35989" y1="242.83133" x2="245.35989" y2="257.49299" stroke="#ffff00" id="13_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="242.52916" y1="242.77159" x2="242.52916" y2="257.43325" stroke="#ffff00" id="13_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="239.64153" y1="242.82849" x2="239.64153" y2="257.49014" stroke="#ffff00" id="13_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="236.75676" y1="242.93375" x2="236.75676" y2="257.59541" stroke="#ffff00" id="13_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="233.92603" y1="242.93375" x2="233.92603" y2="257.59541" stroke="#ffff00" id="13_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.25462" y1="242.77159" x2="231.25462" y2="257.43325" stroke="#ffff00" id="13_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.31579" y1="242.77728" x2="228.31579" y2="257.43894" stroke="#ffff00" id="13_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="262.33001" y1="242.92807" x2="262.33001" y2="257.58972" stroke="#ffff00" id="13_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="259.55049" y1="242.88255" x2="259.55049" y2="257.5442" stroke="#ffff00" id="13_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="256.6714" y1="242.72039" x2="256.6714" y2="257.38204" stroke="#ffff00" id="13_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="265.28022" y1="242.81143" x2="265.28022" y2="257.47308" stroke="#ffff00" id="13_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.65292" y1="262.2026" x2="133.65292" y2="276.86426" stroke="#ffff00" id="14_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.71124" y1="262.19976" x2="130.71124" y2="276.86141" stroke="#ffff00" id="14_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.77241" y1="262.30502" x2="127.77241" y2="276.96667" stroke="#ffff00" id="14_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.94737" y1="262.30787" x2="124.94737" y2="276.96952" stroke="#ffff00" id="14_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="122.06544" y1="262.30502" x2="122.06544" y2="276.96667" stroke="#ffff00" id="14_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.34567" y1="262.24812" x2="119.34567" y2="276.90978" stroke="#ffff00" id="14_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.10527" y1="262.35623" x2="170.10527" y2="277.01789" stroke="#ffff00" id="14_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.16643" y1="262.35054" x2="167.16643" y2="277.01219" stroke="#ffff00" id="14_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="164.23045" y1="262.29649" x2="164.23045" y2="276.95814" stroke="#ffff00" id="14_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="161.34851" y1="262.35339" x2="161.34851" y2="277.01504" stroke="#ffff00" id="14_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="158.52063" y1="262.35339" x2="158.52063" y2="277.01504" stroke="#ffff00" id="14_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="155.52774" y1="262.41028" x2="155.52774" y2="277.07194" stroke="#ffff00" id="14_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="152.69986" y1="262.35339" x2="152.69986" y2="277.01504" stroke="#ffff00" id="14_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="149.97725" y1="262.35339" x2="149.97725" y2="277.01504" stroke="#ffff00" id="14_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.41964" y1="262.45865" x2="147.41964" y2="277.1203" stroke="#ffff00" id="14_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.34851" y1="262.47857" x2="145.34851" y2="277.14022" stroke="#ffff00" id="14_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="212.93884" y1="262.29934" x2="212.93884" y2="276.96099" stroke="#ffff00" id="14_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.00285" y1="262.30502" x2="210.00285" y2="276.96667" stroke="#ffff00" id="14_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="207.11523" y1="262.41313" x2="207.11523" y2="277.07478" stroke="#ffff00" id="14_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="204.2845" y1="262.36192" x2="204.2845" y2="277.02357" stroke="#ffff00" id="14_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="201.45377" y1="262.41313" x2="201.45377" y2="277.07478" stroke="#ffff00" id="14_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="198.73116" y1="262.46434" x2="198.73116" y2="277.126" stroke="#ffff00" id="14_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="195.95164" y1="262.35623" x2="195.95164" y2="277.01789" stroke="#ffff00" id="14_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="193.06971" y1="262.40744" x2="193.06971" y2="277.06909" stroke="#ffff00" id="14_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="190.40684" y1="262.29649" x2="190.40684" y2="276.95814" stroke="#ffff00" id="14_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="187.5249" y1="262.4615" x2="187.5249" y2="277.12315" stroke="#ffff00" id="14_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="184.58607" y1="262.34769" x2="184.58607" y2="277.00935" stroke="#ffff00" id="14_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="181.70129" y1="262.35339" x2="181.70129" y2="277.01504" stroke="#ffff00" id="14_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="178.76245" y1="262.4615" x2="178.76245" y2="277.12315" stroke="#ffff00" id="14_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="175.98293" y1="262.51555" x2="175.98293" y2="277.1772" stroke="#ffff00" id="14_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.04411" y1="262.4615" x2="173.04411" y2="277.12315" stroke="#ffff00" id="14_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="241.51921" y1="262.2595" x2="241.51921" y2="276.92115" stroke="#ffff00" id="14_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="238.74538" y1="262.25382" x2="238.74538" y2="276.91547" stroke="#ffff00" id="14_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="235.96871" y1="262.24812" x2="235.96871" y2="276.90978" stroke="#ffff00" id="14_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="233.13798" y1="262.19976" x2="233.13798" y2="276.86141" stroke="#ffff00" id="14_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="230.30727" y1="262.24812" x2="230.30727" y2="276.90978" stroke="#ffff00" id="14_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="227.31438" y1="262.19691" x2="227.31438" y2="276.85856" stroke="#ffff00" id="14_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="224.48365" y1="262.19976" x2="224.48365" y2="276.86141" stroke="#ffff00" id="14_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="221.65292" y1="262.25097" x2="221.65292" y2="276.91262" stroke="#ffff00" id="14_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="218.76814" y1="262.24528" x2="218.76814" y2="276.90693" stroke="#ffff00" id="14_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="215.82647" y1="262.24528" x2="215.82647" y2="276.90693" stroke="#ffff00" id="14_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="255.78379" y1="262.25382" x2="255.78379" y2="276.91547" stroke="#ffff00" id="14_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="252.95307" y1="262.30217" x2="252.95307" y2="276.96383" stroke="#ffff00" id="14_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="250.06828" y1="262.25097" x2="250.06828" y2="276.91262" stroke="#ffff00" id="14_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="247.29161" y1="262.30502" x2="247.29161" y2="276.96667" stroke="#ffff00" id="14_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="244.40684" y1="262.25097" x2="244.40684" y2="276.91262" stroke="#ffff00" id="14_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="131.03271" y1="280.73461" x2="131.03271" y2="295.39627" stroke="#ffff00" id="15_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="128.09673" y1="280.62935" x2="128.09673" y2="295.291" stroke="#ffff00" id="15_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="125.1579" y1="280.73177" x2="125.1579" y2="295.39342" stroke="#ffff00" id="15_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="122.27312" y1="280.72892" x2="122.27312" y2="295.39057" stroke="#ffff00" id="15_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.44524" y1="280.67487" x2="119.44524" y2="295.33652" stroke="#ffff00" id="15_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.85491" y1="280.62081" x2="133.85491" y2="295.28246" stroke="#ffff00" id="15_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.05833" y1="280.98212" x2="145.05833" y2="295.64377" stroke="#ffff00" id="15_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.33571" y1="280.98212" x2="228.33571" y2="295.64377" stroke="#ffff00" id="15_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="225.45092" y1="280.98496" x2="225.45092" y2="295.64662" stroke="#ffff00" id="15_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="222.56614" y1="280.98781" x2="222.56614" y2="295.64946" stroke="#ffff00" id="15_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="219.68137" y1="280.99066" x2="219.68137" y2="295.65231" stroke="#ffff00" id="15_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="216.79659" y1="280.98781" x2="216.79659" y2="295.64946" stroke="#ffff00" id="15_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="213.90896" y1="280.97927" x2="213.90896" y2="295.64092" stroke="#ffff00" id="15_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.12945" y1="280.98212" x2="211.12945" y2="295.64377" stroke="#ffff00" id="15_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.24182" y1="281.04186" x2="208.24182" y2="295.70351" stroke="#ffff00" id="15_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="205.30015" y1="280.98781" x2="205.30015" y2="295.64946" stroke="#ffff00" id="15_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.41536" y1="280.92807" x2="202.41536" y2="295.58972" stroke="#ffff00" id="15_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="199.47653" y1="280.9366" x2="199.47653" y2="295.59825" stroke="#ffff00" id="15_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="196.59176" y1="280.87685" x2="196.59176" y2="295.53851" stroke="#ffff00" id="15_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="193.65576" y1="280.87685" x2="193.65576" y2="295.53851" stroke="#ffff00" id="15_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="190.8791" y1="280.87401" x2="190.8791" y2="295.53566" stroke="#ffff00" id="15_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.15932" y1="280.93091" x2="188.15932" y2="295.59257" stroke="#ffff00" id="15_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.27454" y1="280.87685" x2="185.27454" y2="295.53851" stroke="#ffff00" id="15_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.39261" y1="280.87685" x2="182.39261" y2="295.53851" stroke="#ffff00" id="15_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.51067" y1="280.98496" x2="179.51067" y2="295.64662" stroke="#ffff00" id="15_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.62873" y1="280.98496" x2="176.62873" y2="295.64662" stroke="#ffff00" id="15_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.63585" y1="280.93375" x2="173.63585" y2="295.5954" stroke="#ffff00" id="15_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.69702" y1="280.98212" x2="170.69702" y2="295.64377" stroke="#ffff00" id="15_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.75818" y1="280.98781" x2="167.75818" y2="295.64946" stroke="#ffff00" id="15_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="164.98436" y1="280.8797" x2="164.98436" y2="295.54135" stroke="#ffff00" id="15_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.04267" y1="280.98496" x2="162.04267" y2="295.64662" stroke="#ffff00" id="15_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.1579" y1="281.09023" x2="159.1579" y2="295.75188" stroke="#ffff00" id="15_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.43528" y1="281.03901" x2="156.43528" y2="295.70067" stroke="#ffff00" id="15_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.55335" y1="281.03901" x2="153.55335" y2="295.70067" stroke="#ffff00" id="15_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.82504" y1="281.03901" x2="150.82504" y2="295.70067" stroke="#ffff00" id="15_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.94311" y1="281.03901" x2="147.94311" y2="295.70067" stroke="#ffff00" id="15_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="245.69559" y1="280.98496" x2="245.69559" y2="295.64662" stroke="#ffff00" id="15_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="242.81081" y1="280.98496" x2="242.81081" y2="295.64662" stroke="#ffff00" id="15_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="239.92603" y1="280.8797" x2="239.92603" y2="295.54135" stroke="#ffff00" id="15_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.04126" y1="280.8797" x2="237.04126" y2="295.54135" stroke="#ffff00" id="15_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.15648" y1="280.92807" x2="234.15648" y2="295.58972" stroke="#ffff00" id="15_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.21764" y1="280.98496" x2="231.21764" y2="295.64662" stroke="#ffff00" id="15_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="248.52347" y1="280.93375" x2="248.52347" y2="295.5954" stroke="#ffff00" id="15_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.06686" y1="299.31213" x2="119.06686" y2="313.97378" stroke="#ffff00" id="16_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.92746" y1="299.14997" x2="144.92746" y2="313.81162" stroke="#ffff00" id="16_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.99147" y1="299.20118" x2="141.99147" y2="313.86284" stroke="#ffff00" id="16_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.10669" y1="299.25523" x2="139.10669" y2="313.91689" stroke="#ffff00" id="16_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.16786" y1="299.25808" x2="136.16786" y2="313.91973" stroke="#ffff00" id="16_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.33713" y1="299.30928" x2="133.33713" y2="313.97094" stroke="#ffff00" id="16_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.39546" y1="299.30928" x2="130.39546" y2="313.97094" stroke="#ffff00" id="16_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.45377" y1="299.31213" x2="127.45377" y2="313.97378" stroke="#ffff00" id="16_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.67426" y1="299.25523" x2="124.67426" y2="313.91689" stroke="#ffff00" id="16_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.94879" y1="299.30928" x2="121.94879" y2="313.97094" stroke="#ffff00" id="16_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.02134" y1="299.08738" x2="159.02134" y2="313.74903" stroke="#ffff00" id="16_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.13656" y1="299.14428" x2="156.13656" y2="313.80593" stroke="#ffff00" id="16_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.35705" y1="299.19834" x2="153.35705" y2="313.85999" stroke="#ffff00" id="16_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.47511" y1="299.20971" x2="150.47511" y2="313.87137" stroke="#ffff00" id="16_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.86345" y1="299.19264" x2="147.86345" y2="313.8543" stroke="#ffff00" id="16_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="161.90044" y1="299.08738" x2="161.90044" y2="313.74903" stroke="#ffff00" id="16_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="217.46516" y1="299.46007" x2="217.46516" y2="314.12172" stroke="#ffff00" id="16_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="214.58037" y1="299.40886" x2="214.58037" y2="314.07052" stroke="#ffff00" id="16_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="211.64154" y1="299.40317" x2="211.64154" y2="314.06482" stroke="#ffff00" id="16_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.7027" y1="299.40317" x2="208.7027" y2="314.06482" stroke="#ffff00" id="16_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="205.81793" y1="299.40602" x2="205.81793" y2="314.06767" stroke="#ffff00" id="16_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.82504" y1="299.46007" x2="202.82504" y2="314.12172" stroke="#ffff00" id="16_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="199.88621" y1="299.34627" x2="199.88621" y2="314.00793" stroke="#ffff00" id="16_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="196.94737" y1="299.3548" x2="196.94737" y2="314.01646" stroke="#ffff00" id="16_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.22475" y1="299.40886" x2="194.22475" y2="314.07052" stroke="#ffff00" id="16_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.34282" y1="299.35197" x2="191.34282" y2="314.01362" stroke="#ffff00" id="16_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.45805" y1="299.40602" x2="188.45805" y2="314.06767" stroke="#ffff00" id="16_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.51921" y1="299.51128" x2="185.51921" y2="314.17293" stroke="#ffff00" id="16_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.74254" y1="299.40886" x2="182.74254" y2="314.07052" stroke="#ffff00" id="16_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.85775" y1="299.29791" x2="179.85775" y2="313.95956" stroke="#ffff00" id="16_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.08108" y1="299.3548" x2="177.08108" y2="314.01646" stroke="#ffff00" id="16_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="220.40683" y1="299.51128" x2="220.40683" y2="314.17293" stroke="#ffff00" id="16_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="232.05122" y1="299.40886" x2="232.05122" y2="314.07052" stroke="#ffff00" id="16_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="229.22049" y1="299.46576" x2="229.22049" y2="314.12741" stroke="#ffff00" id="16_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="226.28165" y1="299.51697" x2="226.28165" y2="314.17863" stroke="#ffff00" id="16_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="223.34282" y1="299.51413" x2="223.34282" y2="314.17578" stroke="#ffff00" id="16_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.65861" y1="299.35197" x2="237.65861" y2="314.01362" stroke="#ffff00" id="16_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.8791" y1="299.40886" x2="234.8791" y2="314.07052" stroke="#ffff00" id="16_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="240.33002" y1="299.35765" x2="240.33002" y2="314.0193" stroke="#ffff00" id="16_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.64011" y1="317.98355" x2="118.64011" y2="332.6452" stroke="#ffff00" id="17_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.31579" y1="317.93233" x2="144.31579" y2="332.59399" stroke="#ffff00" id="17_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.57042" y1="317.83276" x2="141.57042" y2="332.49442" stroke="#ffff00" id="17_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="138.67995" y1="317.78155" x2="138.67995" y2="332.4432" stroke="#ffff00" id="17_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="135.90327" y1="317.98923" x2="135.90327" y2="332.65088" stroke="#ffff00" id="17_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.01849" y1="318.04613" x2="133.01849" y2="332.70778" stroke="#ffff00" id="17_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.07966" y1="318.03759" x2="130.07966" y2="332.69925" stroke="#ffff00" id="17_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.24609" y1="317.98638" x2="127.24609" y2="332.64804" stroke="#ffff00" id="17_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.30441" y1="317.92948" x2="124.30441" y2="332.59114" stroke="#ffff00" id="17_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.52774" y1="317.87543" x2="121.52774" y2="332.53709" stroke="#ffff00" id="17_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="193.20911" y1="317.66776" x2="193.20911" y2="332.32941" stroke="#ffff00" id="17_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="190.37838" y1="317.55965" x2="190.37838" y2="332.2213" stroke="#ffff00" id="17_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="187.4936" y1="317.77017" x2="187.4936" y2="332.43183" stroke="#ffff00" id="17_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="184.49787" y1="317.67059" x2="184.49787" y2="332.33225" stroke="#ffff00" id="17_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="181.5562" y1="317.56249" x2="181.5562" y2="332.22415" stroke="#ffff00" id="17_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="178.67141" y1="317.51128" x2="178.67141" y2="332.17293" stroke="#ffff00" id="17_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="175.73258" y1="317.55965" x2="175.73258" y2="332.2213" stroke="#ffff00" id="17_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="172.90185" y1="317.67059" x2="172.90185" y2="332.33225" stroke="#ffff00" id="17_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="169.90896" y1="317.77302" x2="169.90896" y2="332.43467" stroke="#ffff00" id="17_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.02703" y1="317.71896" x2="167.02703" y2="332.38061" stroke="#ffff00" id="17_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="164.08819" y1="317.72181" x2="164.08819" y2="332.38346" stroke="#ffff00" id="17_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="161.14937" y1="317.67059" x2="161.14937" y2="332.33225" stroke="#ffff00" id="17_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="158.21053" y1="317.66776" x2="158.21053" y2="332.32941" stroke="#ffff00" id="17_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="155.70129" y1="317.61654" x2="155.70129" y2="332.2782" stroke="#ffff00" id="17_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="152.7084" y1="317.67059" x2="152.7084" y2="332.33225" stroke="#ffff00" id="17_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="216.35561" y1="317.61939" x2="216.35561" y2="332.28104" stroke="#ffff00" id="17_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="213.46515" y1="317.67629" x2="213.46515" y2="332.33794" stroke="#ffff00" id="17_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.63158" y1="317.67913" x2="210.63158" y2="332.34079" stroke="#ffff00" id="17_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="207.6899" y1="317.67629" x2="207.6899" y2="332.33794" stroke="#ffff00" id="17_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="204.80512" y1="317.61939" x2="204.80512" y2="332.28104" stroke="#ffff00" id="17_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="201.91749" y1="317.62224" x2="201.91749" y2="332.28389" stroke="#ffff00" id="17_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="198.97866" y1="317.61939" x2="198.97866" y2="332.28104" stroke="#ffff00" id="17_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="196.14794" y1="317.61654" x2="196.14794" y2="332.2782" stroke="#ffff00" id="17_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="222.17638" y1="317.61939" x2="222.17638" y2="332.28104" stroke="#ffff00" id="17_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="219.29445" y1="317.71611" x2="219.29445" y2="332.37777" stroke="#ffff00" id="17_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.2219" y1="336.36191" x2="130.2219" y2="351.02357" stroke="#ffff00" id="18_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.39402" y1="336.46149" x2="127.39402" y2="351.12315" stroke="#ffff00" id="18_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.56615" y1="336.41028" x2="124.56615" y2="351.07193" stroke="#ffff00" id="18_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.68421" y1="336.35338" x2="121.68421" y2="351.01504" stroke="#ffff00" id="18_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.91038" y1="336.29933" x2="118.91038" y2="350.96099" stroke="#ffff00" id="18_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="132.94452" y1="336.35623" x2="132.94452" y2="351.01788" stroke="#ffff00" id="18_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="135.76103" y1="336.36191" x2="135.76103" y2="351.02357" stroke="#ffff00" id="18_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.04267" y1="336.20829" x2="144.04267" y2="350.86995" stroke="#ffff00" id="18_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="184.30157" y1="336.46149" x2="184.30157" y2="351.12315" stroke="#ffff00" id="18_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="181.36558" y1="336.30786" x2="181.36558" y2="350.96952" stroke="#ffff00" id="18_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="178.58891" y1="336.24527" x2="178.58891" y2="350.90693" stroke="#ffff00" id="18_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="175.70128" y1="336.14001" x2="175.70128" y2="350.80166" stroke="#ffff00" id="18_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="172.8734" y1="336.14855" x2="172.8734" y2="350.8102" stroke="#ffff00" id="18_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="169.93456" y1="336.19122" x2="169.93456" y2="350.85288" stroke="#ffff00" id="18_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.16074" y1="336.09449" x2="167.16074" y2="350.75614" stroke="#ffff00" id="18_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="164.2788" y1="336.03759" x2="164.2788" y2="350.69925" stroke="#ffff00" id="18_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="161.39118" y1="336.10018" x2="161.39118" y2="350.76184" stroke="#ffff00" id="18_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="158.5064" y1="336.15423" x2="158.5064" y2="350.81589" stroke="#ffff00" id="18_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="155.62447" y1="336.20545" x2="155.62447" y2="350.8671" stroke="#ffff00" id="18_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="152.73969" y1="336.20829" x2="152.73969" y2="350.86995" stroke="#ffff00" id="18_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="149.85775" y1="336.21113" x2="149.85775" y2="350.87278" stroke="#ffff00" id="18_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="146.92177" y1="336.15423" x2="146.92177" y2="350.81589" stroke="#ffff00" id="18_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="213.34851" y1="336.50701" x2="213.34851" y2="351.16867" stroke="#ffff00" id="18_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.40968" y1="336.40175" x2="210.40968" y2="351.0634" stroke="#ffff00" id="18_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="207.41964" y1="336.50417" x2="207.41964" y2="351.16582" stroke="#ffff00" id="18_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="204.5377" y1="336.34201" x2="204.5377" y2="351.00366" stroke="#ffff00" id="18_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="201.59887" y1="336.50701" x2="201.59887" y2="351.16867" stroke="#ffff00" id="18_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="198.77099" y1="336.35054" x2="198.77099" y2="351.01219" stroke="#ffff00" id="18_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="195.83215" y1="336.4046" x2="195.83215" y2="351.06625" stroke="#ffff00" id="18_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="192.95022" y1="336.3989" x2="192.95022" y2="351.06056" stroke="#ffff00" id="18_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="190.06828" y1="336.44442" x2="190.06828" y2="351.10608" stroke="#ffff00" id="18_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="187.12945" y1="336.45295" x2="187.12945" y2="351.11461" stroke="#ffff00" id="18_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="216.28734" y1="336.56391" x2="216.28734" y2="351.22556" stroke="#ffff00" id="18_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.58037" y1="354.62935" x2="144.58037" y2="369.291" stroke="#ffff00" id="19_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.64439" y1="354.68624" x2="141.64439" y2="369.3479" stroke="#ffff00" id="19_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="138.81935" y1="354.78013" x2="138.81935" y2="369.44178" stroke="#ffff00" id="19_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="135.99147" y1="354.84556" x2="135.99147" y2="369.50721" stroke="#ffff00" id="19_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.11238" y1="354.78581" x2="133.11238" y2="369.44747" stroke="#ffff00" id="19_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.12518" y1="354.78013" x2="130.12518" y2="369.44178" stroke="#ffff00" id="19_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.13798" y1="354.78297" x2="127.13798" y2="369.44462" stroke="#ffff00" id="19_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.2532" y1="354.83703" x2="124.2532" y2="369.49868" stroke="#ffff00" id="19_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.37127" y1="354.88255" x2="121.37127" y2="369.5442" stroke="#ffff00" id="19_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.48933" y1="354.82849" x2="118.48933" y2="369.49014" stroke="#ffff00" id="19_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.51209" y1="354.62935" x2="150.51209" y2="369.291" stroke="#ffff00" id="19_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.51636" y1="354.62935" x2="147.51636" y2="369.291" stroke="#ffff00" id="19_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.15363" y1="354.98496" x2="188.15363" y2="369.64662" stroke="#ffff00" id="19_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.21479" y1="354.8797" x2="185.21479" y2="369.54135" stroke="#ffff00" id="19_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.2788" y1="354.82565" x2="182.2788" y2="369.4873" stroke="#ffff00" id="19_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.45377" y1="354.72322" x2="179.45377" y2="369.38488" stroke="#ffff00" id="19_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.51779" y1="354.8797" x2="176.51779" y2="369.54135" stroke="#ffff00" id="19_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.57895" y1="354.72607" x2="173.57895" y2="369.38772" stroke="#ffff00" id="19_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.69132" y1="354.66633" x2="170.69132" y2="369.32798" stroke="#ffff00" id="19_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="167.8037" y1="354.72607" x2="167.8037" y2="369.38772" stroke="#ffff00" id="19_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.02418" y1="354.77728" x2="165.02418" y2="369.43894" stroke="#ffff00" id="19_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.19346" y1="354.72892" x2="162.19346" y2="369.39057" stroke="#ffff00" id="19_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.99859" y1="354.98781" x2="202.99859" y2="369.64946" stroke="#ffff00" id="19_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="200.00853" y1="354.9366" x2="200.00853" y2="369.59825" stroke="#ffff00" id="19_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="197.07255" y1="354.98496" x2="197.07255" y2="369.64662" stroke="#ffff00" id="19_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.08251" y1="354.98211" x2="194.08251" y2="369.64377" stroke="#ffff00" id="19_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.09246" y1="355.03901" x2="191.09246" y2="369.70067" stroke="#ffff00" id="19_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="144.61166" y1="373.82991" x2="144.61166" y2="388.49156" stroke="#ffff00" id="20_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="141.78663" y1="373.82421" x2="141.78663" y2="388.48587" stroke="#ffff00" id="20_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="138.8478" y1="373.77016" x2="138.8478" y2="388.43182" stroke="#ffff00" id="20_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="135.85206" y1="373.73033" x2="135.85206" y2="388.39198" stroke="#ffff00" id="20_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="133.02134" y1="373.78154" x2="133.02134" y2="388.44319" stroke="#ffff00" id="20_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="130.08251" y1="373.78154" x2="130.08251" y2="388.44319" stroke="#ffff00" id="20_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.14082" y1="373.93802" x2="127.14082" y2="388.59967" stroke="#ffff00" id="20_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.36131" y1="374.04043" x2="124.36131" y2="388.70209" stroke="#ffff00" id="20_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.47653" y1="374.09448" x2="121.47653" y2="388.75614" stroke="#ffff00" id="20_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.69985" y1="374.04896" x2="118.69985" y2="388.71062" stroke="#ffff00" id="20_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="147.50213" y1="373.77869" x2="147.50213" y2="388.44035" stroke="#ffff00" id="20_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="150.45519" y1="373.67058" x2="150.45519" y2="388.33224" stroke="#ffff00" id="20_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.52205" y1="373.40885" x2="185.52205" y2="388.07051" stroke="#ffff00" id="20_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="182.58321" y1="373.4629" x2="182.58321" y2="388.12456" stroke="#ffff00" id="20_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="179.64438" y1="373.46006" x2="179.64438" y2="388.12171" stroke="#ffff00" id="20_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="176.7596" y1="373.46006" x2="176.7596" y2="388.12171" stroke="#ffff00" id="20_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="173.87482" y1="373.51127" x2="173.87482" y2="388.17292" stroke="#ffff00" id="20_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="170.93599" y1="373.5198" x2="170.93599" y2="388.18145" stroke="#ffff00" id="20_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.10526" y1="373.51127" x2="168.10526" y2="388.17292" stroke="#ffff00" id="20_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.21764" y1="373.51127" x2="165.21764" y2="388.17292" stroke="#ffff00" id="20_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.38691" y1="373.51127" x2="162.38691" y2="388.17292" stroke="#ffff00" id="20_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.77525" y1="373.61369" x2="159.77525" y2="388.27534" stroke="#ffff00" id="20_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="200" y1="373.29505" x2="200" y2="387.9567" stroke="#ffff00" id="20_27"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="197.06116" y1="373.2979" x2="197.06116" y2="387.95955" stroke="#ffff00" id="20_26"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="194.06827" y1="373.40031" x2="194.06827" y2="388.06197" stroke="#ffff00" id="20_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.1835" y1="373.39463" x2="191.1835" y2="388.05628" stroke="#ffff00" id="20_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.29872" y1="373.39748" x2="188.29872" y2="388.05913" stroke="#ffff00" id="20_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="202.90469" y1="373.23247" x2="202.90469" y2="387.89412" stroke="#ffff00" id="20_28"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="129.56188" y1="392.24811" x2="129.56188" y2="406.90976" stroke="#ffff00" id="21_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="126.72831" y1="392.34768" x2="126.72831" y2="407.00933" stroke="#ffff00" id="21_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.11095" y1="392.30501" x2="124.11095" y2="406.96666" stroke="#ffff00" id="21_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.27453" y1="392.29648" x2="121.27453" y2="406.95813" stroke="#ffff00" id="21_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.44097" y1="392.23673" x2="118.44097" y2="406.89839" stroke="#ffff00" id="21_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.9303" y1="392.03758" x2="162.9303" y2="406.69924" stroke="#ffff00" id="21_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="160.09957" y1="392.14569" x2="160.09957" y2="406.80735" stroke="#ffff00" id="21_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="157.16074" y1="392.04328" x2="157.16074" y2="406.70493" stroke="#ffff00" id="21_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="154.2219" y1="392.19121" x2="154.2219" y2="406.85287" stroke="#ffff00" id="21_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="151.28307" y1="392.19406" x2="151.28307" y2="406.85571" stroke="#ffff00" id="21_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="148.29303" y1="392.03758" x2="148.29303" y2="406.69924" stroke="#ffff00" id="21_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.3542" y1="392.14285" x2="145.3542" y2="406.8045" stroke="#ffff00" id="21_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.57468" y1="392.03758" x2="142.57468" y2="406.69924" stroke="#ffff00" id="21_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.6899" y1="391.98922" x2="139.6899" y2="406.65087" stroke="#ffff00" id="21_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.7027" y1="391.94085" x2="136.7027" y2="406.6025" stroke="#ffff00" id="21_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.3542" y1="391.87258" x2="177.3542" y2="406.53423" stroke="#ffff00" id="21_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.46942" y1="391.97784" x2="174.46942" y2="406.63949" stroke="#ffff00" id="21_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.63869" y1="391.94654" x2="171.63869" y2="406.6082" stroke="#ffff00" id="21_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.7027" y1="391.99491" x2="168.7027" y2="406.65656" stroke="#ffff00" id="21_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.86913" y1="391.93517" x2="165.86913" y2="406.59682" stroke="#ffff00" id="21_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="129.33143" y1="411.73886" x2="129.33143" y2="426.40052" stroke="#ffff00" id="22_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="126.93599" y1="411.73032" x2="126.93599" y2="426.39198" stroke="#ffff00" id="22_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.21053" y1="411.73032" x2="124.21053" y2="426.39198" stroke="#ffff00" id="22_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.21479" y1="411.67912" x2="121.21479" y2="426.34077" stroke="#ffff00" id="22_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.54054" y1="411.62506" x2="118.54054" y2="426.28671" stroke="#ffff00" id="22_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.6017" y1="411.15565" x2="165.6017" y2="425.81731" stroke="#ffff00" id="22_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.55761" y1="411.25522" x2="162.55761" y2="425.91688" stroke="#ffff00" id="22_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.62162" y1="411.24953" x2="159.62162" y2="425.91118" stroke="#ffff00" id="22_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.63158" y1="411.20401" x2="156.63158" y2="425.86566" stroke="#ffff00" id="22_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="153.75248" y1="411.20117" x2="153.75248" y2="425.86283" stroke="#ffff00" id="22_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="151.08677" y1="411.25522" x2="151.08677" y2="425.91688" stroke="#ffff00" id="22_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="148.09673" y1="411.24384" x2="148.09673" y2="425.9055" stroke="#ffff00" id="22_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.21194" y1="411.30643" x2="145.21194" y2="425.96809" stroke="#ffff00" id="22_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.27312" y1="411.30359" x2="142.27312" y2="425.96524" stroke="#ffff00" id="22_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.54765" y1="411.19832" x2="139.54765" y2="425.85998" stroke="#ffff00" id="22_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="180.17354" y1="411.14711" x2="180.17354" y2="425.80877" stroke="#ffff00" id="22_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.18349" y1="411.241" x2="177.18349" y2="425.90265" stroke="#ffff00" id="22_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.30156" y1="411.19832" x2="174.30156" y2="425.85998" stroke="#ffff00" id="22_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.47084" y1="411.14711" x2="171.47084" y2="425.80877" stroke="#ffff00" id="22_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.48079" y1="411.14711" x2="168.48079" y2="425.80877" stroke="#ffff00" id="22_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="183.05548" y1="411.09306" x2="183.05548" y2="425.75472" stroke="#ffff00" id="22_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="119.92034" y1="429.77301" x2="119.92034" y2="444.43466" stroke="#ffff00" id="x_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="160.3926" y1="429.77584" x2="160.3926" y2="444.4375" stroke="#ffff00" id="x_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="157.45946" y1="429.8299" x2="157.45946" y2="444.49156" stroke="#ffff00" id="x_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="154.58037" y1="429.9437" x2="154.58037" y2="444.60535" stroke="#ffff00" id="x_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="151.58464" y1="429.93517" x2="151.58464" y2="444.59682" stroke="#ffff00" id="x_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="148.64865" y1="429.88965" x2="148.64865" y2="444.5513" stroke="#ffff00" id="x_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.76672" y1="429.77869" x2="145.76672" y2="444.44035" stroke="#ffff00" id="x_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.88762" y1="429.88965" x2="142.88762" y2="444.5513" stroke="#ffff00" id="x_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="140.00853" y1="429.88111" x2="140.00853" y2="444.54276" stroke="#ffff00" id="x_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="137.12375" y1="429.77301" x2="137.12375" y2="444.43466" stroke="#ffff00" id="x_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="134.24467" y1="429.72464" x2="134.24467" y2="444.3863" stroke="#ffff00" id="x_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="131.30583" y1="429.72749" x2="131.30583" y2="444.38914" stroke="#ffff00" id="x_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="128.42105" y1="429.82706" x2="128.42105" y2="444.48871" stroke="#ffff00" id="x_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="125.74965" y1="429.72179" x2="125.74965" y2="444.38345" stroke="#ffff00" id="x_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="122.86202" y1="429.72179" x2="122.86202" y2="444.38345" stroke="#ffff00" id="x_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="189.43386" y1="429.62223" x2="189.43386" y2="444.28388" stroke="#ffff00" id="x_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="186.50071" y1="429.62506" x2="186.50071" y2="444.28672" stroke="#ffff00" id="x_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="183.61877" y1="429.77301" x2="183.61877" y2="444.43466" stroke="#ffff00" id="x_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="180.73399" y1="429.6649" x2="180.73399" y2="444.32655" stroke="#ffff00" id="x_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.79232" y1="429.55963" x2="177.79232" y2="444.22129" stroke="#ffff00" id="x_21"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.91038" y1="429.55679" x2="174.91038" y2="444.21844" stroke="#ffff00" id="x_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.9744" y1="429.61368" x2="171.9744" y2="444.27534" stroke="#ffff00" id="x_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="169.03556" y1="429.77301" x2="169.03556" y2="444.43466" stroke="#ffff00" id="x_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="166.26458" y1="429.7161" x2="166.26458" y2="444.37776" stroke="#ffff00" id="x_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="163.38264" y1="429.72179" x2="163.38264" y2="444.38345" stroke="#ffff00" id="x_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="277.56757" y1="429.61368" x2="277.56757" y2="444.27534" stroke="#ffff00" id="x_53"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="274.78806" y1="429.61368" x2="274.78806" y2="444.27534" stroke="#ffff00" id="x_52"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="271.95733" y1="429.67058" x2="271.95733" y2="444.33224" stroke="#ffff00" id="x_51"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="269.1266" y1="429.72179" x2="269.1266" y2="444.38345" stroke="#ffff00" id="x_50"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="266.23897" y1="429.77584" x2="266.23897" y2="444.4375" stroke="#ffff00" id="x_49"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="263.25178" y1="429.82421" x2="263.25178" y2="444.48587" stroke="#ffff00" id="x_48"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="260.42105" y1="429.77016" x2="260.42105" y2="444.43182" stroke="#ffff00" id="x_47"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="257.48221" y1="429.82136" x2="257.48221" y2="444.48302" stroke="#ffff00" id="x_46"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="254.54339" y1="429.77016" x2="254.54339" y2="444.43182" stroke="#ffff00" id="x_45"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="251.71266" y1="429.87827" x2="251.71266" y2="444.53993" stroke="#ffff00" id="x_44"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="248.77383" y1="429.71895" x2="248.77383" y2="444.3806" stroke="#ffff00" id="x_43"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="245.9431" y1="429.82706" x2="245.9431" y2="444.48871" stroke="#ffff00" id="x_42"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="242.95022" y1="429.83275" x2="242.95022" y2="444.49441" stroke="#ffff00" id="x_41"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="240.01422" y1="429.88395" x2="240.01422" y2="444.54561" stroke="#ffff00" id="x_40"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="237.07539" y1="429.8299" x2="237.07539" y2="444.49156" stroke="#ffff00" id="x_39"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="234.08535" y1="429.82706" x2="234.08535" y2="444.48871" stroke="#ffff00" id="x_38"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="231.0953" y1="429.82421" x2="231.0953" y2="444.48587" stroke="#ffff00" id="x_37"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="228.15931" y1="429.82706" x2="228.15931" y2="444.48871" stroke="#ffff00" id="x_36"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="225.33428" y1="429.82421" x2="225.33428" y2="444.48587" stroke="#ffff00" id="x_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="222.45519" y1="429.76731" x2="222.45519" y2="444.42897" stroke="#ffff00" id="x_34"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="219.5761" y1="429.82706" x2="219.5761" y2="444.48871" stroke="#ffff00" id="x_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="216.64296" y1="429.83275" x2="216.64296" y2="444.49441" stroke="#ffff00" id="x_32"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="213.75818" y1="429.77301" x2="213.75818" y2="444.43466" stroke="#ffff00" id="x_31"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="210.98436" y1="429.77301" x2="210.98436" y2="444.43466" stroke="#ffff00" id="x_30"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="208.05121" y1="429.76447" x2="208.05121" y2="444.42612" stroke="#ffff00" id="x_29"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="306.6458" y1="429.45152" x2="306.6458" y2="444.11318" stroke="#ffff00" id="x_63"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="303.76386" y1="429.55679" x2="303.76386" y2="444.21844" stroke="#ffff00" id="x_62"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="300.93598" y1="429.50842" x2="300.93598" y2="444.17008" stroke="#ffff00" id="x_61"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="297.99999" y1="429.56248" x2="297.99999" y2="444.22414" stroke="#ffff00" id="x_60"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="295.064" y1="429.50842" x2="295.064" y2="444.17008" stroke="#ffff00" id="x_59"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="292.13086" y1="429.61653" x2="292.13086" y2="444.27819" stroke="#ffff00" id="x_58"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="289.19771" y1="429.61368" x2="289.19771" y2="444.27534" stroke="#ffff00" id="x_57"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="286.31863" y1="429.50842" x2="286.31863" y2="444.17008" stroke="#ffff00" id="x_56"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="283.38264" y1="429.50842" x2="283.38264" y2="444.17008" stroke="#ffff00" id="x_55"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="280.50355" y1="429.45437" x2="280.50355" y2="444.11603" stroke="#ffff00" id="x_54"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="321.26315" y1="429.46575" x2="321.26315" y2="444.1274" stroke="#ffff00" id="x_68"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="318.33285" y1="429.5198" x2="318.33285" y2="444.18145" stroke="#ffff00" id="x_67"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="315.45376" y1="429.47428" x2="315.45376" y2="444.13593" stroke="#ffff00" id="x_66"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="312.51778" y1="429.35196" x2="312.51778" y2="444.01361" stroke="#ffff00" id="x_65"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="309.58179" y1="429.40601" x2="309.58179" y2="444.06766" stroke="#ffff00" id="x_64"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="324.15078" y1="429.51412" x2="324.15078" y2="444.17577" stroke="#ffff00" id="x_69"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="327.04693" y1="429.50842" x2="327.04693" y2="444.17008" stroke="#ffff00" id="x_70"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="129.62447" y1="447.62507" x2="129.62447" y2="462.28673" stroke="#ffff00" id="y_5"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="127.14652" y1="447.73318" x2="127.14652" y2="462.39484" stroke="#ffff00" id="y_4"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="124.51494" y1="447.78724" x2="124.51494" y2="462.4489" stroke="#ffff00" id="y_3"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="121.68422" y1="447.7275" x2="121.68422" y2="462.38915" stroke="#ffff00" id="y_2"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="118.74538" y1="447.71896" x2="118.74538" y2="462.38061" stroke="#ffff00" id="y_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="177.3542" y1="448.14286" x2="177.3542" y2="462.80451" stroke="#ffff00" id="y_20"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="174.52632" y1="448.14286" x2="174.52632" y2="462.80451" stroke="#ffff00" id="y_19"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="171.59033" y1="448.19691" x2="171.59033" y2="462.85856" stroke="#ffff00" id="y_18"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="168.60029" y1="448.08881" x2="168.60029" y2="462.75046" stroke="#ffff00" id="y_17"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="165.7212" y1="448.03475" x2="165.7212" y2="462.6964" stroke="#ffff00" id="y_16"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="162.78237" y1="447.98638" x2="162.78237" y2="462.64804" stroke="#ffff00" id="y_15"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="159.89759" y1="447.98923" x2="159.89759" y2="462.65088" stroke="#ffff00" id="y_14"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="156.95875" y1="448.04329" x2="156.95875" y2="462.70494" stroke="#ffff00" id="y_13"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="154.02276" y1="447.98638" x2="154.02276" y2="462.64804" stroke="#ffff00" id="y_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="151.19489" y1="448.0376" x2="151.19489" y2="462.69925" stroke="#ffff00" id="y_11"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="148.2532" y1="448.04613" x2="148.2532" y2="462.70778" stroke="#ffff00" id="y_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="145.26316" y1="448.10019" x2="145.26316" y2="462.76184" stroke="#ffff00" id="y_9"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="142.43243" y1="448.04044" x2="142.43243" y2="462.7021" stroke="#ffff00" id="y_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="139.5505" y1="448.04613" x2="139.5505" y2="462.70778" stroke="#ffff00" id="y_7"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="136.55477" y1="447.88397" x2="136.55477" y2="462.54562" stroke="#ffff00" id="y_6"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="191.66146" y1="448.35054" x2="191.66146" y2="463.01219" stroke="#ffff00" id="y_25"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="188.83358" y1="448.29649" x2="188.83358" y2="462.95814" stroke="#ffff00" id="y_24"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="185.89759" y1="448.24812" x2="185.89759" y2="462.90978" stroke="#ffff00" id="y_23"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="183.12091" y1="448.18838" x2="183.12091" y2="462.85003" stroke="#ffff00" id="y_22"/>'+
  '<line class="chLoc"  fill="none" stroke-width="3"       x1="180.23613" y1="448.29649" x2="180.23613" y2="462.95814" stroke="#ffff00" id="y_21"/>'+
  '<line class="chLoc"  id="1_117" fill="none" stroke-width="3"       x1="461.99999" y1="19.59113" x2="461.99999" y2="35.30542" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="1_118" fill="none" stroke-width="3"       x1="464.93102" y1="19.55665" x2="464.93102" y2="35.27094" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="1_120" fill="none" stroke-width="3"       x1="470.75861" y1="19.52216" x2="470.75861" y2="35.23645" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="1_119" fill="none" stroke-width="3"       x1="467.86206" y1="19.48768" x2="467.86206" y2="35.20197" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="1_121" fill="none" stroke-width="3"       x1="473.68964" y1="19.52216" x2="473.68964" y2="35.23645" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="1_60" fill="none" stroke-width="3"       x1="288.44826" y1="19.6601" x2="288.44826" y2="35.37439" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="2_44" fill="none" stroke-width="3"       x1="243.6875" y1="38.66917" x2="243.6875" y2="53.33083" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="2_45" fill="none" stroke-width="3"       x1="246.5625" y1="38.54417" x2="246.5625" y2="53.20583" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="2_117" fill="none" stroke-width="3"       x1="462.93749" y1="38.48168" x2="462.93749" y2="53.14333" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="2_116" fill="none" stroke-width="3"       x1="459.99999" y1="38.48168" x2="459.99999" y2="53.14333" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="2_115" fill="none" stroke-width="3"       x1="457.06249" y1="38.48168" x2="457.06249" y2="53.14333" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="2_119" fill="none" stroke-width="3"       x1="468.37499" y1="38.35668" x2="468.37499" y2="53.01833" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="2_118" fill="none" stroke-width="3"       x1="465.81249" y1="38.48168" x2="465.81249" y2="53.14333" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="3_38" fill="none" stroke-width="3"       x1="242.59458" y1="56.93945" x2="242.59458" y2="71.6011" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="3_37" fill="none" stroke-width="3"       x1="239.94593" y1="56.93945" x2="239.94593" y2="71.6011" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="3_91" fill="none" stroke-width="3"       x1="403.18919" y1="56.93944" x2="403.18919" y2="71.60109" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="3_90" fill="none" stroke-width="3"       x1="400.37838" y1="56.9935" x2="400.37838" y2="71.65515" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="3_89" fill="none" stroke-width="3"       x1="397.56757" y1="57.04755" x2="397.56757" y2="71.7092" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="3_92" fill="none" stroke-width="3"       x1="405.94595" y1="56.93944" x2="405.94595" y2="71.60109" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="4_24" fill="none" stroke-width="3"       x1="185.13514" y1="75.31782" x2="185.13514" y2="89.97947" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="4_93" fill="none" stroke-width="3"       x1="391.7838" y1="76.29079" x2="391.7838" y2="90.95244" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="4_92" fill="none" stroke-width="3"       x1="388.91893" y1="76.34485" x2="388.91893" y2="91.0065" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="4_91" fill="none" stroke-width="3"       x1="386.05407" y1="76.34485" x2="386.05407" y2="91.0065" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="4_90" fill="none" stroke-width="3"       x1="383.08109" y1="76.23674" x2="383.08109" y2="90.89839" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="4_94" fill="none" stroke-width="3"       x1="394.10812" y1="76.23674" x2="394.10812" y2="90.89839" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="5_23" fill="none" stroke-width="3"       x1="182.00001" y1="94.66917" x2="182.00001" y2="109.33082" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="5_90" fill="none" stroke-width="3"       x1="378.97299" y1="94.77728" x2="378.97299" y2="109.43893" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="5_89" fill="none" stroke-width="3"       x1="376.10812" y1="94.88539" x2="376.10812" y2="109.54704" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="5_88" fill="none" stroke-width="3"       x1="373.1892" y1="94.93944" x2="373.1892" y2="109.60109" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="5_87" fill="none" stroke-width="3"       x1="370.32434" y1="94.83134" x2="370.32434" y2="109.49299" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="5_86" fill="none" stroke-width="3"       x1="367.45947" y1="94.77728" x2="367.45947" y2="109.43893" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="5_85" fill="none" stroke-width="3"       x1="364.70271" y1="94.88539" x2="364.70271" y2="109.54704" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_29" fill="none" stroke-width="3"       x1="199.62163" y1="113.42593" x2="199.62163" y2="128.08758" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_27" fill="none" stroke-width="3"       x1="193.94596" y1="113.42593" x2="193.94596" y2="128.08758" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_28" fill="none" stroke-width="3"       x1="196.81082" y1="113.42593" x2="196.81082" y2="128.08758" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_84" fill="none" stroke-width="3"       x1="363.35136" y1="114.02053" x2="363.35136" y2="128.68218" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_83" fill="none" stroke-width="3"       x1="360.43244" y1="113.96647" x2="360.43244" y2="128.62812" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_82" fill="none" stroke-width="3"       x1="357.56758" y1="113.85836" x2="357.56758" y2="128.52001" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_81" fill="none" stroke-width="3"       x1="354.70271" y1="113.75026" x2="354.70271" y2="128.41191" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_80" fill="none" stroke-width="3"       x1="351.8919" y1="113.75026" x2="351.8919" y2="128.41191" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="6_79" fill="none" stroke-width="3"       x1="349.13515" y1="113.75026" x2="349.13515" y2="128.41191" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_28" fill="none" stroke-width="3"       x1="195.56759" y1="132.02052" x2="195.56759" y2="146.68217" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_27" fill="none" stroke-width="3"       x1="192.86488" y1="132.02052" x2="192.86488" y2="146.68217" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_29" fill="none" stroke-width="3"       x1="197.7838" y1="132.02052" x2="197.7838" y2="146.68217" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_78" fill="none" stroke-width="3"       x1="343.08109" y1="132.12863" x2="343.08109" y2="146.79028" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_77" fill="none" stroke-width="3"       x1="340.21623" y1="132.07458" x2="340.21623" y2="146.73623" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_76" fill="none" stroke-width="3"       x1="337.45947" y1="132.12863" x2="337.45947" y2="146.79028" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_75" fill="none" stroke-width="3"       x1="334.54055" y1="132.02052" x2="334.54055" y2="146.68217" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="7_79" fill="none" stroke-width="3"       x1="345.94596" y1="132.12863" x2="345.94596" y2="146.79028" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="8_21" fill="none" stroke-width="3"       x1="176.4865" y1="150.72322" x2="176.4865" y2="165.38487" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="8_22" fill="none" stroke-width="3"       x1="178.27029" y1="150.61512" x2="178.27029" y2="165.27677" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="8_72" fill="none" stroke-width="3"       x1="327.51353" y1="150.45295" x2="327.51353" y2="165.1146" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="8_71" fill="none" stroke-width="3"       x1="324.54056" y1="150.45295" x2="324.54056" y2="165.1146" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="8_70" fill="none" stroke-width="3"       x1="321.62164" y1="150.45295" x2="321.62164" y2="165.1146" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="8_69" fill="none" stroke-width="3"       x1="318.70272" y1="150.50701" x2="318.70272" y2="165.16866" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="8_68" fill="none" stroke-width="3"       x1="315.7838" y1="150.45295" x2="315.7838" y2="165.1146" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="9_23" fill="none" stroke-width="3"       x1="181.94596" y1="168.99349" x2="181.94596" y2="183.65514" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="9_63" fill="none" stroke-width="3"       x1="311.67569" y1="168.77728" x2="311.67569" y2="183.43893" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="9_64" fill="none" stroke-width="3"       x1="314.16218" y1="168.83133" x2="314.16218" y2="183.49298" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="9_65" fill="none" stroke-width="3"       x1="316.64866" y1="168.77728" x2="316.64866" y2="183.43893" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="10_19" fill="none" stroke-width="3"       x1="170.4865" y1="187.31782" x2="170.4865" y2="201.97947" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="10_18" fill="none" stroke-width="3"       x1="168.21623" y1="187.37188" x2="168.21623" y2="202.03353" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="10_66" fill="none" stroke-width="3"       x1="311.02704" y1="186.9935" x2="311.02704" y2="201.65515" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="10_65" fill="none" stroke-width="3"       x1="308.37839" y1="186.93945" x2="308.37839" y2="201.6011" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="10_64" fill="none" stroke-width="3"       x1="305.45947" y1="186.9935" x2="305.45947" y2="201.65515" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="10_63" fill="none" stroke-width="3"       x1="302.54055" y1="187.10161" x2="302.54055" y2="201.76326" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="10_62" fill="none" stroke-width="3"       x1="299.72974" y1="187.15566" x2="299.72974" y2="201.81731" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="11_24" fill="none" stroke-width="3"       x1="183.56758" y1="206.2908" x2="183.56758" y2="220.95245" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="11_26" fill="none" stroke-width="3"       x1="188.97298" y1="206.2908" x2="188.97298" y2="220.95245" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="11_25" fill="none" stroke-width="3"       x1="186.16217" y1="206.2908" x2="186.16217" y2="220.95245" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="11_65" fill="none" stroke-width="3"       x1="308.4865" y1="206.12864" x2="308.4865" y2="220.79029" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="11_64" fill="none" stroke-width="3"       x1="305.67569" y1="206.23675" x2="305.67569" y2="220.8984" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="11_63" fill="none" stroke-width="3"       x1="302.81082" y1="206.2908" x2="302.81082" y2="220.95245" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="11_66" fill="none" stroke-width="3"       x1="310.32433" y1="206.12864" x2="310.32433" y2="220.79029" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="12_17" fill="none" stroke-width="3"       x1="162.97299" y1="224.88539" x2="162.97299" y2="239.54704" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="12_66" fill="none" stroke-width="3"       x1="305.62163" y1="224.34485" x2="305.62163" y2="239.0065" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="12_65" fill="none" stroke-width="3"       x1="302.81082" y1="224.45296" x2="302.81082" y2="239.11461" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="12_64" fill="none" stroke-width="3"       x1="300.00001" y1="224.50701" x2="300.00001" y2="239.16866" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="12_63" fill="none" stroke-width="3"       x1="297.1892" y1="224.45296" x2="297.1892" y2="239.11461" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="12_62" fill="none" stroke-width="3"       x1="294.37839" y1="224.50701" x2="294.37839" y2="239.16866" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="12_67" fill="none" stroke-width="3"       x1="308.00001" y1="224.2908" x2="308.00001" y2="238.95245" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="13_54" fill="none" stroke-width="3"       x1="273.7838" y1="242.83134" x2="273.7838" y2="257.49299" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="13_56" fill="none" stroke-width="3"       x1="279.45947" y1="242.83134" x2="279.45947" y2="257.49299" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="13_55" fill="none" stroke-width="3"       x1="276.64866" y1="242.8854" x2="276.64866" y2="257.54705" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="13_53" fill="none" stroke-width="3"       x1="270.91893" y1="242.83134" x2="270.91893" y2="257.49299" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="13_52" fill="none" stroke-width="3"       x1="268.10812" y1="242.8854" x2="268.10812" y2="257.54705" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="14_51" fill="none" stroke-width="3"       x1="268.70271" y1="262.34485" x2="268.70271" y2="277.0065" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="14_50" fill="none" stroke-width="3"       x1="266.91893" y1="262.2908" x2="266.91893" y2="276.95245" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="14_49" fill="none" stroke-width="3"       x1="264.32433" y1="262.34485" x2="264.32433" y2="277.0065" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="14_48" fill="none" stroke-width="3"       x1="261.51352" y1="262.2908" x2="261.51352" y2="276.95245" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="14_47" fill="none" stroke-width="3"       x1="258.5946" y1="262.23675" x2="258.5946" y2="276.8984" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="15_44" fill="none" stroke-width="3"       x1="251.40541" y1="280.93945" x2="251.40541" y2="295.6011" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="15_45" fill="none" stroke-width="3"       x1="254.27028" y1="280.99351" x2="254.27028" y2="295.65516" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="15_46" fill="none" stroke-width="3"       x1="257.13514" y1="280.93945" x2="257.13514" y2="295.6011" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="15_47" fill="none" stroke-width="3"       x1="259.45947" y1="280.99351" x2="259.45947" y2="295.65516" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="16_17" fill="none" stroke-width="3"       x1="164.64866" y1="299.15567" x2="164.64866" y2="313.81732" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="16_41" fill="none" stroke-width="3"       x1="242.64865" y1="299.31783" x2="242.64865" y2="313.97948" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="17_37" fill="none" stroke-width="3"       x1="227.62163" y1="317.64214" x2="227.62163" y2="332.30379" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="17_36" fill="none" stroke-width="3"       x1="225.02704" y1="317.69619" x2="225.02704" y2="332.35784" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="18_34" fill="none" stroke-width="3"       x1="219.24325" y1="336.66917" x2="219.24325" y2="351.33082" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="18_35" fill="none" stroke-width="3"       x1="222.21623" y1="336.66917" x2="222.21623" y2="351.33082" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="19_13" fill="none" stroke-width="3"       x1="153.45947" y1="354.61513" x2="153.45947" y2="369.27678" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="19_29" fill="none" stroke-width="3"       x1="205.94596" y1="354.99351" x2="205.94596" y2="369.65516" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="21_21" fill="none" stroke-width="3"       x1="180.32433" y1="391.91243" x2="180.32433" y2="406.57408" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="x_27" fill="none" stroke-width="3"       x1="195.13515" y1="429.53404" x2="195.13515" y2="444.19569" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="x_26" fill="none" stroke-width="3"       x1="192.27029" y1="429.64214" x2="192.27029" y2="444.30379" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="x_28" fill="none" stroke-width="3"       x1="197.45947" y1="429.53404" x2="197.45947" y2="444.19569" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="x_74" fill="none" stroke-width="3"       x1="338.70272" y1="429.64215" x2="338.70272" y2="444.3038" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="x_73" fill="none" stroke-width="3"       x1="335.72974" y1="429.6962" x2="335.72974" y2="444.35785" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="x_72" fill="none" stroke-width="3"       x1="332.86488" y1="429.64215" x2="332.86488" y2="444.3038" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="x_71" fill="none" stroke-width="3"       x1="329.94596" y1="429.53404" x2="329.94596" y2="444.19569" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="y_26" fill="none" stroke-width="3"       x1="194.37839" y1="448.56108" x2="194.37839" y2="463.22273" stroke="#ffff00"/>'+
  '<line class="chLoc"  id="y_27" fill="none" stroke-width="3"       x1="196.81082" y1="448.50703" x2="196.81082" y2="463.16868" stroke="#ffff00"/>'+
 
 '<g class="mtdna" transform="translate(30,-20) "  >'+
 '<ellipse class="mt" fill="#000000" stroke-width="19"       fill-opacity="0" cx="321.06667" cy="365.8" id="svg_1538" rx="66.93333" ry="60.6" stroke="#000000"/>'+
  '<ellipse class="mt" fill="#000000" stroke="#000000" stroke-width="2"       fill-opacity="0" cx="193.6" cy="339.2" id="svg_1540"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="261.85714" y1="320.7619" x2="275.52381" y2="334.7619" id="MT_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="268.7619" y1="314.2381" x2="281.80952" y2="328.33333" id="MT_2" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="255.09524" y1="330.33333" x2="270.7619" y2="340.7619" id="svg_1545" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="279.33334" y1="307.28571" x2="288.66666" y2="322.66667" id="MT_3" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="311.33333" y1="296.33333" x2="312.66667" y2="315" id="MT_6"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="322.33333" y1="296.33333" x2="321.66667" y2="314.33333" id="MT_7"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="333.33333" y1="297" x2="331" y2="315" id="MT_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="345" y1="300" x2="340.33333" y2="316.66667" id="MT_9" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="356" y1="305" x2="348.66667" y2="320" id="MT_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="366.85714" y1="310.28572" x2="355.42857" y2="324.28572" id="MT_11" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="375.42857" y1="317.71429" x2="361.42857" y2="329.42857" id="MT_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="382.57143" y1="325.71429" x2="367.71429" y2="336" id="MT_13" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="371.71429" y1="342.85714" x2="388.85714" y2="334" id="MT_14" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="299.42857" y1="298.85714" x2="304.28571" y2="316.28571" id="MT_5" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="392.85714" y1="342.85714" x2="376" y2="350" id="MT_15" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="288.28571" y1="302.28571" x2="296.85714" y2="319.14286" id="MT_4"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="377.71429" y1="356.85714" x2="396" y2="354.28571" id="MT_16"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="378.85715" y1="364" x2="396.85715" y2="363.71428" id="svg_1561"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="378.57143" y1="370.57143" x2="396.57143" y2="374.57143" id="MT_17"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="377.14286" y1="378.85714" x2="394.57143" y2="383.71429" id="MT_18"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="374.57143" y1="385.71429" x2="390.57143" y2="394.57143" id="MT_19"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="370.28572" y1="393.14286" x2="384.57143" y2="404.28572" id="MT_20"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="364.57143" y1="399.71429" x2="376.85714" y2="413.14286" id="MT_21"/>'+
  '<line class="chLoc"  transform="rotate(6.740019798278809 364.1428833007807,412.28570556640625) " stroke="#ffffaa" fill="none" stroke-width="8"       fill-opacity="0" x1="356.57143" y1="405.71429" x2="371.71429" y2="418.85714" id="MT_22"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="250.28571" y1="339.42857" x2="267.42857" y2="347.71429" id="MT_37"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="351.14286" y1="409.71429" x2="360.57143" y2="426" id="MT_23"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="247.14286" y1="348.57143" x2="264.57143" y2="355.14286" id="svg_1570"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="344" y1="412.85714" x2="350.85714" y2="430.28571" id="MT_24"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="245.14286" y1="358.57143" x2="264" y2="360.57143" id="svg_1572"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="335.14286" y1="416" x2="341.71429" y2="432.57143" id="MT_25" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="245.42857" y1="368.28571" x2="263.14286" y2="367.42857" id="MT_36"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="328.57143" y1="416.85714" x2="330.57143" y2="435.14286" id="MT_26"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="246.57143" y1="378.57143" x2="264.28571" y2="375.42857" id="MT_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="319.42857" y1="417.14286" x2="319.42857" y2="435.71429" id="MT_27" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="248.85714" y1="387.42857" x2="266.57143" y2="382.57143" id="MT_34"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="309.71428" y1="416.85715" x2="306.28571" y2="434" id="svg_1579"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="254" y1="398.57142" x2="269.71429" y2="390" id="MT_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="301.42857" y1="414.28571" x2="294.57143" y2="431.14286" id="MT_28" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="260.57143" y1="408.57143" x2="274" y2="396.28572" id="MT_32" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="283.71429" y1="426.85714" x2="294" y2="410.85714" id="MT_29" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="266.85714" y1="415.71429" x2="279.42857" y2="402" id="MT_31" stroke="#ffffaa"/>'+
  '<line class="chLoc"  stroke="#ffffaa" fill="none" stroke-width="8"       fill-opacity="0" x1="274.28571" y1="420.85715" x2="285.71429" y2="407.14286" id="MT_30"/>'+
 '</g>'+
 '<g class="chrLegend" style="visibility:hidden;"> <rect stroke="#000000" id="chLeg" height="168" width="16" y="274" x="471" stroke-width="0" fill="#FF0000"  />'+
  '<text class="chText" stroke="#000000" transform="matrix(0.9166666865348816,0,0,0.692307710647583,38.58332413434982,86.76922559738159) " xml:space="preserve" text-anchor="middle"  font-size="15" id="lgtMin" y="291.44444" x="457" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#000000">1</text>'+
  '<text class="chText" stroke="#000000" transform="matrix(0.8333333134651184,0,0,0.7692307829856873,76.33334243297577,83.3076873421669) " xml:space="preserve" text-anchor="middle"  font-size="15" id="lgtMax" y="454.8" x="455.6" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#000000">2</text>'+
  '<text class="chText" stroke="#000000" transform="matrix(0.9166666865348816,0,0,0.7692307829856873,38.33332419395447,81.69230282306671) " xml:space="preserve" text-anchor="middle"  font-size="15" id="lgtMid" y="368.5" x="456.18182" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#000000">3</text></g>'+
 
'</svg>'
	
}

function renderVchMap(div) {
	
	
  div.innerHTML = '<svg id="ch_vertical" class="chMap" width="640" height="480" viewBox="0 0 640 480" >'+
  
  '<rect transform="matrix(0,1,1,0,0,0) "     x="16.99998" y="42.00001" width="448" height="461.99997" id="chMapBack" stroke-width="2" stroke="#000000" fill="#000000" fill-opacity="0"/>'+
  '<path class="chromo" id="svg_2" d="m59.66668,83.33331c0,0 -6,2.33333 -6,2.33333c0,0 0,176.66667 0,176.66667c0,0 2.66667,4 2.33333,4c-0.33333,0 -2.66667,5.66667 -2.66667,5.66667c0,0 0,171.33333 0,171.33333c0,0 6.33333,2.66667 6.33333,2.66667c0,0 5.66667,-2.66667 5.33333,-2.66667c-0.33333,0 0.66667,-171.33333 0.66667,-171.33333c0,0 -4.33333,-5.66667 -4.66667,-5.66667c-0.33333,0 4.33333,-4 4,-4c-0.33333,0 1,-176.66667 1,-176.66667c0,0 -6.33333,-2.33333 -6.33333,-2.33333l0.00001,0z" stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_3" d="m78.33334,82.22915c0,0 -6.66667,2 -7,2c-0.33333,0 0.66667,132.33333 0.66667,132.33333c0,0 2.66667,3 2.33333,2.66667c-0.33333,-0.33333 -2.66667,4.66667 -3,4.66667c-0.33333,0 0.66667,214 0.66667,214c0,0 6,3 6,3c0,0 6,-3 6,-3c0,0 0.33333,-214.66667 0.33333,-214.66667c0,0 -4.33333,-3 -4.33333,-3c0,0 4,-3.66667 4,-4c0,-0.33333 0,-132.33333 0,-132.33333c0,0 -5.66667,-1.66667 -5.66667,-1.66667z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_4" d="m97.00001,83.33331c0,0 -7,2 -7,2c0,0 0,127.66667 0,127.33334c0,-0.33334 3,4.33333 3,4c0,-0.33334 -3,4 -3,4c0,0 0.66667,154.66666 0.66667,154.66666c0,0 5.33333,2.33334 5.33333,2.33334c0,0 6.33333,-2 6.33333,-2c0,0 0,-154.66667 0,-155c0,-0.33334 -4.33333,-2.66667 -4.33333,-2.66667c0,0 4.66667,-5.33333 4.33333,-5.33333c-0.33333,0 0,-127 0,-127c0,0 -5.33333,-2.33334 -5.33333,-2.33334z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_5" d="m115.00001,83.33331c0,0 -5.33333,2.33333 -5.66667,2.33333c-0.33333,0 0.33333,69.66667 0.33333,69.66667c0,0 2,3 1.66667,3c-0.33333,0 -1.66667,3.66667 -2,3.33333c-0.33333,-0.33333 0.33333,202 0,202c-0.33333,0 6,2 6,2c0,0 6.33333,-1.66667 6.33333,-1.66667c0,0 -0.66667,-201.66667 -0.66667,-201.66667c0,0 -5.33333,-3.33333 -5.66667,-3.66667c-0.33333,-0.33333 5.33333,-3.66667 5.33333,-3.66667c0,0 0.33333,-69.66667 0.33333,-69.66667c0,0 -6,-2 -6,-2l0.00002,0.00002z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_6" d="m133.98247,83.77191c0,0 -6,2 -6,2c0,0 0.33333,65.66667 0.33333,65.66667c0,0 3,2.66667 3,2.66667c0,0 -3.33333,4.66667 -3.33333,4.66667c0,0 0.66667,189.66667 0.66667,189.66667c0,0 6,2 5.66667,2c-0.33333,0 5.66667,-2 5.66667,-2c0,0 0,-190 0,-190c0,0 -4.66667,-4.33333 -4.66667,-4.33333c0,0 5,-3.33333 5,-3.33333c0,0 -0.66667,-65.33333 -1,-65.33333c-0.33333,0 -5.33333,-1.66667 -5.33333,-1.66667l-0.00001,-0.00002z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_7" d="m153.00001,83.99998c0,0 -6.66667,1.66667 -7,1.66667c-0.33333,0 1,84.33333 1,84c0,-0.33333 3.33333,3 3,3c-0.33333,0 -3,4.66667 -3,4.66667c0,0 0,156.66667 0.33333,156.33333c0.33333,-0.33333 5.33333,2.33333 5.33333,2.33333c0,0 6,-2.33333 6,-2.33333c0,0 0.66667,-156 0.66667,-156c0,0 -4.33333,-4.33333 -4.33333,-4.33333c0,0 4,-4 4,-4c0,0 0,-84 0,-84c0,0 -6,-1.33333 -6,-1.33333l0,-0.00001z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_8" d="m171.00001,83.74998c0,0 -5.5,2 -5.5,2c0,0 -0.5,81.25 -0.5,81.25c0,0 3.5,3.25 3.5,3.25c0,0 -3.25,4 -3.25,4c0,0 0.25,141.25 0.25,141.25c0,0 5.5,2.75 5.5,2.75c0,0 6.5,-3 6.5,-3c0,0 0,-141 0,-141c0,0 -4.5,-3.75 -4.5,-3.75c0,0 5,-3.5 5,-3.5c0,0 -0.5,-81.75 -0.5,-81.75c0,0 -6.5,-1.5 -6.5,-1.5z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_9" d="m189.75001,83.49998c0,0 -5.75,2 -5.75,2c0,0 -0.25,62.5 -0.25,62.5c0,0 2.25,2.75 2.25,2.75c0,0 -2,3.5 -2,3.5c0,0 -0.5,143.25 -0.5,143.25c0,0 5.25,2.25 5.25,2.25c0,0 7.25,-2 7.25,-2c0,0 0.25,-142.75 0.25,-142.75c0,0 -4.25,-4 -4.25,-4c0,0 3.75,-3.5 3.75,-3.5c0,0 0.25,-62 0.25,-62c0,0 -6.25,-2 -6.25,-2z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_10" d="m208.50001,83.74998c0,0 -6.25,2 -6.25,2c0,0 0,66.25 0,66.25c0,0 4.25,6.25 4.25,6.25c0,0 -4.5,12.5 -4.5,12.5c0,0 0.5,115.25 0.5,115.25c0,0 5.75,2.25 5.75,2.25c0,0 6,-2 6,-2c0,0 0.5,-116 0.5,-116c0,0 -4.5,-11.5 -4.5,-11.5c0,0 4.25,-7.25 4.25,-7.25c0,0 0,-66 0,-66c0,0 -6,-1.75 -6,-1.75z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_11" d="m227.00001,83.74998c0,0 -6.25,2 -6.25,2c0,0 0,54.5 0,55c0,0.5 3,2.5 3,2.5c0,0 -3.5,3 -3.5,3c0,0 0.5,135 0.5,135c0,0 6.5,1.75 6.5,1.75c0,0 5.25,-2.25 5.25,-2.25c0,0 0.75,-134.75 0.75,-134.75c0,0 -5.25,-3.25 -5.25,-3.25c0,0 4.75,-2 4.75,-2c0,0 0,-55.5 0,-55.5c0,0 -5.75,-1.5 -5.75,-1.5z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_12" d="m245.50001,83.24998c0,0 -6.5,2.5 -6.5,2.5c0,0 0.5,73.5 0.5,73.5c0,0 3.25,2.5 3.25,2.5c0,0 -3.5,5.25 -3.5,5.25c0,0 0.5,113 0.5,113c0,0 5.25,2 5.25,2c0,0 6.25,-2 6.25,-2c0,0 0.5,-112.75 0.5,-112.75c0,0 -3.75,-5 -3.75,-5c0,0 4,-3.5 4,-3.5c0,0 -0.25,-73.5 -0.25,-73.5c0,0 -6.25,-2 -6.25,-2z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_13" d="m263.75001,83.49998c0,0 -5.25,2 -5.25,2c0,0 0.25,46.75 0.25,46.75c0,0 2.75,4 2.75,4c0,0 -3.25,2.25 -3.25,2.25c0,0 0.5,138.75 0.5,138.75c0,0 5,2.25 5,2.25c0,0 5.75,-2.25 5.75,-2.25c0,0 0.25,-138.5 0.25,-138.5c0,0 -4,-3 -4,-3c0,0 4,-3.5 4,-3.5c0,0 0.75,-47 0.75,-47c0,0 -6.75,-1.75 -6.75,-1.75z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_14" d="m283.50001,83.74998c0,0 -6.5,1.5 -6.5,1.5c0,0 0,18.75 0,18.75c0,0 3.5,3 3.5,3c0,0 -3.25,4 -3.25,4c0,0 0,139 0,139c0,0 5.25,1.75 5.25,1.75c0,0 5.75,-1.75 5.75,-1.75c0,0 0,-138 0,-138c0,0 -3.5,-4.5 -3.5,-4.5c0,0 3.25,-3.25 3.25,-3.25c0,0 0.25,-18.75 0.25,-18.75c0,0 -4.75,-1.75 -4.75,-1.75z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_15" d="m301.25001,83.49998c0,0 -5.75,2 -5.75,2c0,0 -0.25,18.25 -0.25,18.25c0,0 3,3 3,3c0,0 -2.75,5 -2.75,5c0,0 0,126.5 0,126.5c0,0 6,2.5 6,2.5c0,0 6.25,-2.5 6.25,-2.5c0,0 0.25,-126 0.25,-126c0,0 -4.5,-5 -4.5,-5c0,0 4.25,-3 4.25,-3c0,0 0,-18.5 0,-18.5c0,0 -6.5,-2.25 -6.5,-2.25z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_17" d="m319.75001,83.74998c0,0 -5.5,1.75 -5.5,1.75c0,0 -0.5,18 -0.5,18c0,0 3.75,4.25 3.75,4.25c0,0 -3.5,3.5 -3.5,3.5c0,0 0,117.75 0,118.25c0,0.5 5.5,2.5 5.5,2.5c0,0 7.25,-2.5 7.25,-2.5c0,0 0,-117.75 0,-117.75c0,0 -4.75,-3.75 -4.75,-3.75c0,0 4,-4 4,-4c0,0 0,-18.5 0,-18.5c0,0 -6.25,-1.75 -6.25,-1.75z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_18" d="m338.75001,83.74998c0,0 -6,1.75 -6,1.75c0,0 0,48.75 0,48.75c0,0 3,4.75 3,4.75c0,0 -3,4.75 -3,4.75c0,0 0,68.25 0,68.25c0,0 5.25,3.25 5.25,3.25c0,0 7,-3 7,-3c0,0 0,-68.25 0,-68.25c0,0 -4.75,-4.5 -4.75,-4.5c0,0 4.5,-5.25 4.5,-5.25c0,0 -0.25,-48.75 -0.25,-48.75c0,0 -5.75,-1.75 -5.75,-1.75z"     stroke-width="2" stroke="#000000" fill="#ffffff"/>'+
  '<path class="chromo" id="svg_19" d="m357.75001,83.24998c0,0 -6.75,2.5 -6.75,2.5c0,0 0.25,28.5 0.25,28.5c0,0 4.5,2.25 4.5,2.25c0,0 -4.75,2 -4.75,2c0,0 0.25,78.75 0.25,78.75c0,0 6.25,3 6.25,3c0,0 5.5,-2.5 5.5,-2.5c0,0 0.25,-78.75 0.25,-78.75c0,0 -4.5,-2 -4.5,-2c0,0 4.5,-2.5 4.5,-2.5c0,0 0.25,-29 0.25,-29c0,0 -5.75,-2.25 -5.75,-2.25z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_21" d="m376.00001,83.74998c0,0 -6.5,2 -6.5,2c0,0 0.25,20 0.25,20c0,0 3.5,1.75 3.5,1.75c0,0 -3.5,2.75 -3.5,2.75c0,0 0.25,83 0.25,83c0,0 5.75,2.5 5.75,2.5c0,0 6.5,-2.5 6.5,-2.5c0,0 -1,-83 -1,-83c0,0 -4,-3 -4,-3c0,0 4,-2.25 4,-2.25c0,0 -0.5,-19.25 -0.5,-19.25c0,0 -4.75,-2 -4.75,-2z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_22" d="m394.50001,83.49998c0,0 -6,2 -6,2c0,0 -0.75,38 -0.75,38c0,0 4,2.25 4,2.25c0,0 -3.75,3 -3.75,3c0,0 0.5,46.5 0.5,46.5c0,0 5.75,2.75 5.75,2.75c0,0 6,-3 6,-3c0,0 0,-46.5 0,-46.5c0,0 -4.75,-2.75 -4.75,-2.75c0,0 4.25,-2 4.25,-2c0,0 0.25,-38.5 0.25,-38.5c0,0 -5.5,-1.75 -5.5,-1.75z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_23" d="m413.00001,83.49998c0,0 -5.75,2.25 -5.75,2.25c0,0 0.5,35.5 0.5,35.5c0,0 3.5,2 3.5,2c0,0 -3.75,2.25 -3.75,2.25c0,0 -0.25,47.75 -0.25,47.75c0,0 5.5,2.75 5.5,2.75c0,0 6,-2.75 6,-2.75c0,0 0,-47.25 0,-47.25c0,0 -4,-2.5 -4,-2.5c0,0 4.25,-2.25 4.25,-2.25c0,0 -0.25,-35.5 -0.25,-35.5c0,0 -5.75,-2.25 -5.75,-2.25z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_24" d="m431.25001,83.24998c0,0 -5.25,2.25 -5.25,2.25c0,0 0.25,12.75 0.25,12.75c0,0 3.25,3 3.25,3c0,0 -3.25,2.25 -3.25,2.25c0,0 -0.5,47.5 -0.5,47.5c0,0 5.25,1.75 5.25,1.75c0,0 5.75,-1.75 5.75,-1.75c0,0 0.25,-47.25 0.25,-47.25c0,0 -4,-2.5 -4,-2.5c0,0 4,-3.5 4,-3.5c0,0 0,-13 0,-13c0,0 -5.75,-1.5 -5.75,-1.5z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_25" d="m450.00001,83.74998c0,0 -5.5,2 -5.5,2c0,0 0,12.75 0,12.75c0,0 4,3 4,3c0,0 -3.75,6.5 -3.75,6.5c0,0 -0.25,46.5 -0.25,46.5c0,0 6.25,2.5 6.25,2.5c0,0 6,-2.5 6,-2.5c0,0 0,-47 0,-47c0,0 -3.5,-5.25 -3.5,-5.25c0,0 4.25,-4 4.25,-4c0,0 -0.25,-13 -0.25,-13c0,0 -7.25,-1.5 -7.25,-1.5z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_26" d="m469.00001,83.74998c0,0 -6,2.5 -6,2.5c0,0 0,81 0,81c0,0 2.25,3 2.25,3c0,0 -2.5,4 -2.5,4c0,0 0.5,136.25 0.5,136.25c0,0 5.5,2 5.5,2c0,0 5.75,-2.25 5.75,-2.25c0,0 1,-136 1,-136c0,0 -4.25,-3.75 -4.25,-3.75c0,0 3.75,-3.25 3.75,-3.25c0,0 0.25,-81.25 0.25,-81.25c0,0 -6.25,-2.25 -6.25,-2.25z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<path class="chromo" id="svg_27" d="m487.00001,83.49998c0,0 -5.25,2.25 -5.25,2.25c0,0 -0.25,13 -0.25,13c0,0 3.75,1.75 3.75,1.75c0,0 -3.75,2 -3.75,2c0,0 0.25,64 0.25,64c0,0 5.25,3 5.25,3c0,0 7,-2.75 7,-2.75c0,0 -0.5,-63.5 -0.5,-63.5c0,0 -4.75,-3 -4.75,-3c0,0 4.5,-1.5 4.5,-1.5c0,0 -0.25,-13.5 -0.25,-13.5c0,0 -6,-1.75 -6,-1.75z"     stroke-width="2" stroke="#000000" fill="#ff0000"/>'+
  '<text class="chText"   transform="translate(0.20000000298023224,2.799999952316284) scale(1.1026827096939087,0.906879186630249) " xml:space="preserve" font-size="13.33333px" id="svg_28" y="77.60136" x="52.70266"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">1</text>'+
  '<text class="chText"   transform="translate(0.5,1) scale(1.1090017557144165,0.9017117619514465) " xml:space="preserve" font-size="13.33333px" id="svg_29" y="80.00236" x="69.45701"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">2</text>'+
  '<text class="chText"   transform="translate(0.75,2.25) scale(1.0964703559875488,0.9120174050331116) " xml:space="preserve" font-size="13.33333px" id="svg_30" y="78.06539" x="87.06551"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">3</text>'+
  '<text class="chText"   transform="translate(1.25,1.5) scale(1.084354281425476,0.9222078323364258) " xml:space="preserve" font-size="13.33333px" id="svg_31" y="77.84542" x="105.10108"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">4</text>'+
  '<text class="chText"   transform="translate(-0.5,3) scale(1.0994995832443237,0.9095046520233154) " xml:space="preserve" font-size="13.33333px" id="svg_32" y="77.16516" x="121.94743"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">5</text>'+
  '<text class="chText"   transform="matrix(1.1638000011444092,0,0,0.8592541813850402,0.30000002682209026,3.92857140302658) " xml:space="preserve" font-size="13.33333px" id="svg_33" y="80.51889" x="129.69379"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">6</text>'+
  '<text class="chText"   transform="translate(1.25,3.75) scale(1.1354103088378906,0.8807388544082642) " xml:space="preserve" font-size="13.33333px" id="svg_34" y="78.90065" x="149.44338"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">7</text>'+
  '<text class="chText"   transform="translate(0,2.5) scale(1.1154309511184692,0.8965145349502563) " xml:space="preserve" font-size="13.33333px" id="svg_35" y="78.88957" x="169.43268"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">8</text>'+
  '<text class="chText"   transform="translate(0.25,1.75) scale(1.0964703559875488,0.9120174050331116) " xml:space="preserve" font-size="13.33333px" id="svg_36" y="77.7748" x="189.16653"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">9</text>'+
  '<text class="chText"   transform="translate(1.600000023841858,3) scale(1.0903618335723877,0.9171267747879028) " xml:space="preserve" font-size="13.33333px" id="svg_37" y="76.57741" x="205.57664"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">10</text>'+
  '<text class="chText"   transform="translate(0.25,1.5) scale(1.1090017557144165,0.9017117619514465) " xml:space="preserve" font-size="13.33333px" id="svg_38" y="79.05519" x="220.60044"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">11</text>'+
  '<text class="chText"   transform="matrix(1.0784449577331543,0,0,0.9272611141204833,2.550000011920929,2.1500000953674316) " xml:space="preserve" font-size="13.33333px" id="svg_39" y="76.65665" x="241.64911"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">12</text>'+
  '<text class="chText"   transform="translate(0,1.5) scale(1.1423126459121704,0.8754171133041382) " xml:space="preserve" font-size="13.33333px" id="svg_40" y="81.35209" x="247.48882"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">13</text>'+
  '<text class="chText"   transform="translate(1.2000000476837158,2.5999999046325684) scale(1.1286317110061646,0.8860286474227905) " xml:space="preserve" font-size="13.33333px" id="svg_41" y="79.35009" x="265.1636"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">14</text>'+
  '<text class="chText"   transform="translate(0.4000000059604645,3) scale(1.1154309511184692,0.8965145349502563) " xml:space="preserve" font-size="13.33333px" id="svg_42" y="78.04671" x="285.23541"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">15</text>'+
  '<text class="chText"   transform="matrix(1.1865473985671997,0,0,0.8427813053131102,1.6000000536441803,1.9999999999999998) " xml:space="preserve" font-size="13.33333px" id="svg_43" y="83.77425" x="283.10513"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">16</text>'+
  '<text class="chText"   transform="translate(2,2) scale(1.1090017557144165,0.9017117619514465) " xml:space="preserve" font-size="13.33333px" id="svg_44" y="78.77598" x="319.11407"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">17</text>'+
  '<text class="chText"   transform="translate(1.7999999523162842,3.200000047683716) scale(1.210682988166809,0.8259800672531128) " xml:space="preserve" font-size="13.33333px" id="svg_45" y="84.26529" x="307.89789"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">18</text>'+
  '<text class="chText"   transform="translate(1.600000023841858,1.399999976158142) scale(1.1026827096939087,0.906879186630249) " xml:space="preserve" font-size="13.33333px" id="svg_46" y="79.05849" x="355.40598"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">19</text>'+
  '<text class="chText"   transform="translate(1.399999976158142,3) scale(1.1286317110061646,0.8860286474227905) " xml:space="preserve" font-size="13.33333px" id="svg_47" y="79.24628" x="364.5436"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">20</text>'+
  '<text class="chText"   transform="translate(0.800000011920929,3.799999952316284) scale(1.1354103088378906,0.8807388544082642) " xml:space="preserve" font-size="13.33333px" id="svg_48" y="78.38124" x="380.12177"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">21</text>'+
  '<text class="chText"   transform="translate(0.20000000298023224,2.5999999046325684) scale(1.1219731569290161,0.8912869691848755) " xml:space="preserve" font-size="13.33333px" id="svg_49" y="78.62025" x="400.88102"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">22</text>'+
  '<text class="chText"   transform="matrix(1.1638000011444092,0,0,0.8592541813850404,1.1428571492433548,2.6285713315010066) " xml:space="preserve" font-size="13.33333px" id="svg_50" y="81.82393" x="402.18793"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">X</text>'+
  '<text class="chText"   transform="translate(0.800000011920929,2.200000047683716) scale(1.1154309511184692,0.8965145349502563) " xml:space="preserve" font-size="13.33333px" id="svg_51" y="79.01384" x="435.35427"     stroke-width="0" stroke="#000000" fill="#000000" text-anchor="middle" font-family="serif">Y</text>'+
  '<line class="chLoc"  id="1_1" y2="86.76469" x2="67.54949" y1="86.76469" x1="52.17835"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_2" y2="89.76896" x2="67.56095" y1="89.76896" x1="52.14078"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_3" y2="92.42324" x2="67.70874" y1="92.42324" x1="51.95523"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_4" y2="95.33081" x2="67.74437" y1="95.33081" x1="52.03009"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_20" y2="142.01016" x2="67.67039" y1="142.01016" x1="51.95611"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_19" y2="139.11035" x2="67.64663" y1="139.11035" x1="51.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_18" y2="136.12222" x2="67.55834" y1="136.12222" x1="51.84405"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_17" y2="133.26314" x2="67.58211" y1="133.26314" x1="51.86782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_16" y2="130.36331" x2="67.60588" y1="130.36331" x1="51.8916"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_15" y2="127.4397" x2="67.67039" y1="127.4397" x1="51.95611"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_14" y2="124.58062" x2="67.73491" y1="124.58062" x1="52.02063"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_13" y2="121.68079" x2="67.69416" y1="121.68079" x1="51.97987"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_12" y2="118.71645" x2="67.73491" y1="118.71645" x1="52.02063"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_11" y2="115.80898" x2="67.68426" y1="115.80898" x1="51.96997"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_10" y2="112.91225" x2="67.68426" y1="112.91225" x1="51.96997"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_9" y2="109.96488" x2="67.64663" y1="109.96488" x1="51.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_8" y2="106.95612" x2="67.70803" y1="106.95612" x1="51.99375"     stroke-width="3" stroke="#007f00" fill="none"/>'+
  '<line class="chLoc"  id="1_7" y2="104.07015" x2="67.70803" y1="104.07015" x1="51.99375"     stroke-width="3" stroke="#00bf00" fill="none"/>'+
  '<line class="chLoc"  id="1_6" y2="101.2456" x2="67.8133" y1="101.2456" x1="52.09901"     stroke-width="3" stroke="#00ff00" fill="none"/>'+
  '<line class="chLoc"  id="1_5" y2="98.24851" x2="67.64663" y1="98.24851" x1="51.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_40" y2="200.77759" x2="67.73491" y1="200.77759" x1="52.02063"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_39" y2="197.81323" x2="67.71115" y1="197.81323" x1="51.99686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_38" y2="194.84889" x2="67.79942" y1="194.84889" x1="52.08514"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_37" y2="191.88455" x2="67.75868" y1="191.88455" x1="52.04439"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_36" y2="188.98471" x2="67.80622" y1="188.98471" x1="52.09194"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_35" y2="185.9966" x2="67.75868" y1="185.9966" x1="52.04439"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_34" y2="183.09677" x2="67.7417" y1="183.09677" x1="52.02742"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_33" y2="180.19693" x2="67.75868" y1="180.19693" x1="52.04439"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_32" y2="177.20882" x2="67.71794" y1="177.20882" x1="52.00365"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_31" y2="174.30899" x2="67.64663" y1="174.30899" x1="51.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_30" y2="171.34465" x2="67.64663" y1="171.34465" x1="51.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_29" y2="168.44481" x2="67.69416" y1="168.44481" x1="51.97987"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_28" y2="165.52121" x2="67.69416" y1="165.52121" x1="51.97987"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_27" y2="162.66212" x2="67.71115" y1="162.66212" x1="51.99686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_26" y2="159.73854" x2="67.5889" y1="159.73854" x1="51.87461"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_25" y2="156.77419" x2="67.67039" y1="156.77419" x1="51.95611"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_24" y2="153.80983" x2="67.5176" y1="153.80983" x1="51.80331"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_23" y2="150.82173" x2="67.62965" y1="150.82173" x1="51.91536"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_22" y2="147.89813" x2="67.64663" y1="147.89813" x1="51.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_21" y2="144.99829" x2="67.58211" y1="144.99829" x1="51.86782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_62" y2="272.39996" x2="67.20803" y1="272.39996" x1="51.49375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_61" y2="259.46967" x2="67.30555" y1="259.46967" x1="51.59126"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_59" y2="253.50084" x2="67.41912" y1="253.50084" x1="51.70484"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_58" y2="250.601" x2="67.39536" y1="250.601" x1="51.68107"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_57" y2="247.63667" x2="67.4361" y1="247.63667" x1="51.72181"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_56" y2="244.69609" x2="67.50062" y1="244.69609" x1="51.78633"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_55" y2="241.73174" x2="67.45987" y1="241.73174" x1="51.74558"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_54" y2="238.80812" x2="67.45308" y1="238.80812" x1="51.73879"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_53" y2="235.77928" x2="67.49383" y1="235.77928" x1="51.77955"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_51" y2="232.81493" x2="67.52439" y1="232.81493" x1="51.8101"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_50" y2="229.80983" x2="67.52439" y1="229.80983" x1="51.8101"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_49" y2="226.9745" x2="67.54136" y1="226.9745" x1="51.82708"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_48" y2="223.96942" x2="67.60588" y1="223.96942" x1="51.8916"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_47" y2="221.13411" x2="67.5889" y1="221.13411" x1="51.87461"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_46" y2="218.16977" x2="67.61267" y1="218.16977" x1="51.89839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_45" y2="215.39897" x2="67.70096" y1="215.39897" x1="51.98668"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_44" y2="212.43462" x2="67.7417" y1="212.43462" x1="52.02742"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_43" y2="209.49405" x2="67.78245" y1="209.49405" x1="52.06816"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_42" y2="206.61798" x2="67.71115" y1="206.61798" x1="51.99686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_41" y2="203.6774" x2="67.79942" y1="203.6774" x1="52.08514"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_82" y2="330.19778" x2="66.98601" y1="330.19778" x1="51.27172"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_81" y2="327.27948" x2="66.94971" y1="327.27948" x1="51.23543"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_80" y2="324.53354" x2="66.95334" y1="324.53354" x1="51.23905"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_79" y2="321.64969" x2="66.98601" y1="321.64969" x1="51.27172"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_78" y2="318.73318" x2="66.98419" y1="318.73318" x1="51.26991"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_77" y2="316.09073" x2="66.98238" y1="316.09073" x1="51.26809"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_76" y2="313.34662" x2="67.0205" y1="313.34662" x1="51.30621"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_75" y2="310.43008" x2="67.08946" y1="310.43008" x1="51.37517"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_74" y2="307.58255" x2="67.05316" y1="307.58255" x1="51.33888"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_73" y2="304.75656" x2="67.06791" y1="304.75656" x1="51.35362"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_72" y2="301.83505" x2="67.06417" y1="301.83505" x1="51.34988"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_71" y2="298.87717" x2="67.09224" y1="298.87717" x1="51.37796"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_70" y2="295.91928" x2="67.12031" y1="295.91928" x1="51.40602"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_69" y2="292.96136" x2="67.1589" y1="292.96136" x1="51.44462"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_68" y2="290.00348" x2="67.1589" y1="290.00348" x1="51.44462"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_67" y2="287.04559" x2="67.14136" y1="287.04559" x1="51.42708"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_66" y2="284.12628" x2="67.20803" y1="284.12628" x1="51.49375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_65" y2="281.23505" x2="67.20803" y1="281.23505" x1="51.49375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_64" y2="278.31577" x2="67.22557" y1="278.31577" x1="51.51129"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_63" y2="275.35785" x2="67.22557" y1="275.35785" x1="51.51129"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_83" y2="333.04532" x2="66.98419" y1="333.04532" x1="51.26991"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_102" y2="386.53534" x2="66.98238" y1="386.53534" x1="51.2681"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_101" y2="383.617" x2="66.98238" y1="383.617" x1="51.2681"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_100" y2="380.77127" x2="67.01505" y1="380.77127" x1="51.30076"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_99" y2="377.85294" x2="67.01686" y1="377.85294" x1="51.30258"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_98" y2="374.93643" x2="67.05498" y1="374.93643" x1="51.34069"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_97" y2="372.19052" x2="67.08764" y1="372.19052" x1="51.37336"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_96" y2="369.41193" x2="67.08402" y1="369.41193" x1="51.36973"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_95" y2="366.46094" x2="67.08219" y1="366.46094" x1="51.36791"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_94" y2="363.68237" x2="67.08402" y1="363.68237" x1="51.36973"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_93" y2="360.97272" x2="67.0586" y1="360.97272" x1="51.34432"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_92" y2="358.15967" x2="67.0205" y1="358.15967" x1="51.30621"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_91" y2="355.38107" x2="67.05316" y1="355.38107" x1="51.33888"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_90" y2="352.60068" x2="67.05134" y1="352.60068" x1="51.33706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_89" y2="349.82028" x2="67.05316" y1="349.82028" x1="51.33888"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_88" y2="347.07437" x2="67.08583" y1="347.07437" x1="51.37155"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_87" y2="344.29578" x2="67.08583" y1="344.29578" x1="51.37155"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_86" y2="341.48273" x2="67.08946" y1="341.48273" x1="51.37517"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_85" y2="338.66965" x2="67.05316" y1="338.66965" x1="51.33888"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_84" y2="335.92737" x2="67.0205" y1="335.92737" x1="51.30621"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_112" y2="415.42465" x2="67.2165" y1="415.42465" x1="51.50221"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_111" y2="412.54263" x2="67.14935" y1="412.54263" x1="51.43507"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_110" y2="409.72955" x2="67.18564" y1="409.72955" x1="51.47136"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_109" y2="406.81305" x2="67.1566" y1="406.81305" x1="51.44232"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_108" y2="403.931" x2="67.12212" y1="403.931" x1="51.40784"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_107" y2="401.04898" x2="67.08583" y1="401.04898" x1="51.37155"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_106" y2="398.16696" x2="67.12394" y1="398.16696" x1="51.40965"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_105" y2="395.28491" x2="67.04953" y1="395.28491" x1="51.33524"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_104" y2="392.43738" x2="67.0205" y1="392.43738" x1="51.30621"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_103" y2="389.52084" x2="66.98419" y1="389.52084" x1="51.26991"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_116" y2="427.01813" x2="67.28547" y1="427.01813" x1="51.57118"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_115" y2="424.13791" x2="67.32357" y1="424.13791" x1="51.60929"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_114" y2="421.22318" x2="67.28909" y1="421.22318" x1="51.57481"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="1_113" y2="418.37564" x2="67.2528" y1="418.37564" x1="51.53852"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_1" y2="86.98024" x2="85.03807" y1="86.98024" x1="70.37642"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_20" y2="141.95723" x2="85.01505" y1="141.95723" x1="70.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_19" y2="138.98683" x2="85.07755" y1="138.98683" x1="70.41589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_18" y2="136.07893" x2="85.18281" y1="136.07893" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_17" y2="133.23355" x2="85.12031" y1="133.23355" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_16" y2="130.38814" x2="85.12031" y1="130.38814" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_15" y2="127.48025" x2="85.14005" y1="127.48025" x1="70.47839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_14" y2="124.57235" x2="85.07755" y1="124.57235" x1="70.41589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_13" y2="121.70722" x2="85.12031" y1="121.70722" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_12" y2="118.79932" x2="85.10057" y1="118.79932" x1="70.43892"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_11" y2="115.82893" x2="85.10057" y1="115.82893" x1="70.43892"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_10" y2="112.92104" x2="85.05781" y1="112.92104" x1="70.39616"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_9" y2="110.03288" x2="85.01505" y1="110.03288" x1="70.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_8" y2="107.06249" x2="85.05781" y1="107.06249" x1="70.39616"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_7" y2="104.09209" x2="84.99531" y1="104.09209" x1="70.33366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_6" y2="101.1217" x2="84.99531" y1="101.1217" x1="70.33366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_5" y2="98.1513" x2="84.99531" y1="98.1513" x1="70.33366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_4" y2="95.18091" x2="84.95255" y1="95.18091" x1="70.29089"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_3" y2="92.27301" x2="84.93281" y1="92.27301" x1="70.27116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_2" y2="89.28288" x2="84.93281" y1="89.28288" x1="70.27116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_40" y2="199.93419" x2="85.33084" y1="199.93419" x1="70.66918"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_39" y2="197.08879" x2="85.4361" y1="197.08879" x1="70.77445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_38" y2="194.26314" x2="85.47557" y1="194.26314" x1="70.81392"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_37" y2="191.35524" x2="85.41307" y1="191.35524" x1="70.75142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_36" y2="188.46709" x2="85.32755" y1="188.46709" x1="70.66589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_35" y2="185.49669" x2="85.26505" y1="185.49669" x1="70.60339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_34" y2="182.67104" x2="85.22228" y1="182.67104" x1="70.56063"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_33" y2="179.82564" x2="85.14005" y1="179.82564" x1="70.47839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="svg_196" y2="176.87498" x2="85.10057" y1="176.87498" x1="70.43892"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_31" y2="173.96709" x2="85.16307" y1="173.96709" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_30" y2="170.99669" x2="85.12031" y1="170.99669" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_29" y2="168.10854" x2="85.24531" y1="168.10854" x1="70.58366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_28" y2="165.20064" x2="85.22557" y1="165.20064" x1="70.56392"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_27" y2="162.35524" x2="85.24531" y1="162.35524" x1="70.58366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_26" y2="159.40459" x2="85.12031" y1="159.40459" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_25" y2="156.49669" x2="85.12031" y1="156.49669" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_24" y2="153.67104" x2="85.07755" y1="153.67104" x1="70.41589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_23" y2="150.74341" x2="85.20255" y1="150.74341" x1="70.54089"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_22" y2="147.89801" x2="85.03807" y1="147.89801" x1="70.37642"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_21" y2="144.92761" x2="85.12031" y1="144.92761" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_62" y2="271.52628" x2="85.18281" y1="271.52628" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_61" y2="268.57562" x2="85.16307" y1="268.57562" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_60" y2="265.64801" x2="85.16307" y1="265.64801" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_59" y2="262.67761" x2="85.14005" y1="262.67761" x1="70.47839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_58" y2="259.76971" x2="85.12031" y1="259.76971" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_57" y2="257.02957" x2="85.16307" y1="257.02957" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_56" y2="254.07893" x2="85.12031" y1="254.07893" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_55" y2="251.17104" x2="85.12031" y1="251.17104" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_54" y2="248.28288" x2="85.12031" y1="248.28288" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_53" y2="245.31248" x2="85.12031" y1="245.31248" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_52" y2="242.29933" x2="84.99531" y1="242.29933" x1="70.33366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_51" y2="239.45393" x2="84.99531" y1="239.45393" x1="70.33366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_50" y2="236.54604" x2="84.99531" y1="236.54604" x1="70.33366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_49" y2="233.63814" x2="85.03807" y1="233.63814" x1="70.37642"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_48" y2="231.54274" x2="84.93281" y1="231.54274" x1="70.27116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_47" y2="229.38487" x2="84.99531" y1="229.38487" x1="70.33366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_46" y2="226.62172" x2="85.03478" y1="226.62172" x1="70.37313"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_43" y2="208.74013" x2="85.32755" y1="208.74013" x1="70.66589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_42" y2="205.75" x2="85.28807" y1="205.75" x1="70.62642"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_41" y2="202.9046" x2="85.33084" y1="202.9046" x1="70.66918"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_82" y2="329.54602" x2="85.14005" y1="329.54602" x1="70.47839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_81" y2="326.76312" x2="85.12031" y1="326.76312" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_80" y2="323.87494" x2="85.10057" y1="323.87494" x1="70.43892"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_79" y2="320.96707" x2="85.05781" y1="320.96707" x1="70.39616"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_78" y2="317.95389" x2="85.14005" y1="317.95389" x1="70.47839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_77" y2="314.98352" x2="85.07755" y1="314.98352" x1="70.41589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_76" y2="312.13812" x2="85.07755" y1="312.13812" x1="70.41589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_75" y2="309.16772" x2="85.07755" y1="309.16772" x1="70.41589"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_74" y2="306.32233" x2="85.12031" y1="306.32233" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_73" y2="303.35193" x2="85.12031" y1="303.35193" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_72" y2="300.46378" x2="85.10057" y1="300.46378" x1="70.43892"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_71" y2="297.70062" x2="85.16307" y1="297.70062" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_70" y2="294.81244" x2="85.16307" y1="294.81244" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_69" y2="291.96707" x2="85.16307" y1="291.96707" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_68" y2="289.05917" x2="85.12031" y1="289.05917" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_67" y2="286.15128" x2="85.16307" y1="286.15128" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_66" y2="283.32562" x2="85.1236" y1="283.32562" x1="70.46195"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_65" y2="280.35522" x2="85.16307" y1="280.35522" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_64" y2="277.44733" x2="85.24531" y1="277.44733" x1="70.58366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_63" y2="274.47693" x2="85.18281" y1="274.47693" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_112" y2="416.52628" x2="85.2486" y1="416.52628" x1="70.58695"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_111" y2="413.70062" x2="85.1861" y1="413.70062" x1="70.52445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_110" y2="410.68747" x2="85.16307" y1="410.68747" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_109" y2="407.92429" x2="85.08084" y1="407.92429" x1="70.41918"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_108" y2="405.09863" x2="85.20584" y1="405.09863" x1="70.54418"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_107" y2="402.21048" x2="85.10057" y1="402.21048" x1="70.43892"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_106" y2="399.30258" x2="85.08084" y1="399.30258" x1="70.41918"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_105" y2="396.33218" x2="85.18281" y1="396.33218" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_104" y2="393.42429" x2="85.16307" y1="393.42429" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_103" y2="390.45389" x2="85.28807" y1="390.45389" x1="70.62642"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_102" y2="387.48352" x2="85.26505" y1="387.48352" x1="70.60339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_101" y2="384.55588" x2="85.22557" y1="384.55588" x1="70.56392"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_100" y2="381.66772" x2="85.20255" y1="381.66772" x1="70.54089"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_99" y2="378.75983" x2="85.14005" y1="378.75983" x1="70.47839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_98" y2="375.89468" x2="85.16307" y1="375.89468" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_97" y2="373.06903" x2="85.24531" y1="373.06903" x1="70.58366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_96" y2="370.18088" x2="85.18281" y1="370.18088" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_95" y2="367.27298" x2="85.26505" y1="367.27298" x1="70.60339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_94" y2="364.50983" x2="85.28807" y1="364.50983" x1="70.62642"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_93" y2="361.53943" x2="85.18281" y1="361.53943" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_92" y2="358.65128" x2="85.14334" y1="358.65128" x1="70.48168"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_91" y2="355.68088" x2="85.18281" y1="355.68088" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_90" y2="352.73022" x2="85.16307" y1="352.73022" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_89" y2="349.75983" x2="85.16307" y1="349.75983" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_88" y2="346.89468" x2="85.22557" y1="346.89468" x1="70.56392"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_87" y2="343.94403" x2="85.14005" y1="343.94403" x1="70.47839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_86" y2="341.09863" x2="85.16307" y1="341.09863" x1="70.50142"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_85" y2="338.14798" x2="85.12031" y1="338.14798" x1="70.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_84" y2="335.25983" x2="85.18281" y1="335.25983" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_83" y2="332.43417" x2="85.18281" y1="332.43417" x1="70.52116"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_114" y2="422.17761" x2="85.2486" y1="422.17761" x1="70.58695"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="2_113" y2="419.30917" x2="85.22557" y1="419.30917" x1="70.56392"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_18" y2="142.20767" x2="103.43895" y1="142.20767" x1="88.77729"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_17" y2="139.26599" x2="103.4873" y1="139.26599" x1="88.82566"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_16" y2="136.32431" x2="103.43895" y1="136.32431" x1="88.77729"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_15" y2="133.4879" x2="103.4873" y1="133.4879" x1="88.82566"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_14" y2="130.54622" x2="103.4304" y1="130.54622" x1="88.76875"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_15" y2="127.55048" x2="103.49015" y1="127.55048" x1="88.8285"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_14" y2="124.55474" x2="103.5442" y1="124.55474" x1="88.88256"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_13" y2="121.61306" x2="103.59826" y1="121.61306" x1="88.93661"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_12" y2="118.67423" x2="103.59541" y1="118.67423" x1="88.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_11" y2="115.73255" x2="103.59541" y1="115.73255" x1="88.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_10" y2="112.79087" x2="103.4873" y1="112.79087" x1="88.82566"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_9" y2="109.85204" x2="103.48447" y1="109.85204" x1="88.82281"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_8" y2="106.96726" x2="103.48447" y1="106.96726" x1="88.82281"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_7" y2="104.2418" x2="103.4304" y1="104.2418" x1="88.76875"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_6" y2="101.35418" x2="103.42757" y1="101.35418" x1="88.76592"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_5" y2="98.35844" x2="103.37636" y1="98.35844" x1="88.7147"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_4" y2="95.41676" x2="103.42757" y1="95.41676" x1="88.76592"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_3" y2="92.47508" x2="103.3735" y1="92.47508" x1="88.71186"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_2" y2="89.53341" x2="103.42757" y1="89.53341" x1="88.76592"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_1" y2="86.91605" x2="103.48447" y1="86.91605" x1="88.82281"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_34" y2="199.40538" x2="103.43325" y1="199.40538" x1="88.7716"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_33" y2="196.5206" x2="103.3792" y1="196.5206" x1="88.71755"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_32" y2="193.73824" x2="103.33084" y1="193.73824" x1="88.66918"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_31" y2="190.95872" x2="103.27109" y1="190.95872" x1="88.60944"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_30" y2="188.07109" x2="103.32513" y1="188.07109" x1="88.66349"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_29" y2="185.29158" x2="103.33084" y1="185.29158" x1="88.66918"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_28" y2="182.29584" x2="103.43325" y1="182.29584" x1="88.7716"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_27" y2="179.40822" x2="103.33084" y1="179.40822" x1="88.66918"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_26" y2="176.57466" x2="103.43325" y1="176.57466" x1="88.7716"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_25" y2="173.74109" x2="103.43895" y1="173.74109" x1="88.77729"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_26" y2="170.85062" x2="103.493" y1="170.85062" x1="88.83134"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_27" y2="167.96298" x2="103.493" y1="167.96298" x1="88.83134"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_26" y2="165.08105" x2="103.54706" y1="165.08105" x1="88.8854"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_25" y2="162.14223" x2="103.493" y1="162.14223" x1="88.83134"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_24" y2="159.25745" x2="103.59541" y1="159.25745" x1="88.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_23" y2="156.69699" x2="103.65232" y1="156.69699" x1="88.99067"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_22" y2="153.7041" x2="103.5442" y1="153.7041" x1="88.88256"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_21" y2="150.92459" x2="103.5442" y1="150.92459" x1="88.88256"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_20" y2="147.98291" x2="103.5442" y1="147.98291" x1="88.88256"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_19" y2="145.04123" x2="103.59541" y1="145.04123" x1="88.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_56" y2="270.38403" x2="103.75474" y1="270.38403" x1="89.09308"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_55" y2="267.44519" x2="103.64947" y1="267.44519" x1="88.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_54" y2="264.4523" x2="103.70351" y1="264.4523" x1="89.04187"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_53" y2="261.5647" x2="103.59541" y1="261.5647" x1="88.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_52" y2="258.62302" x2="103.54989" y1="258.62302" x1="88.88824"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_51" y2="255.68135" x2="103.54706" y1="255.68135" x1="88.8854"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_50" y2="252.79372" x2="103.5442" y1="252.79372" x1="88.88256"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_49" y2="249.85487" x2="103.5442" y1="249.85487" x1="88.88256"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_48" y2="246.91319" x2="103.38773" y1="246.91319" x1="88.72608"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_47" y2="243.91747" x2="103.4361" y1="243.91747" x1="88.77445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_46" y2="241.13795" x2="103.4361" y1="241.13795" x1="88.77445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_45" y2="238.19627" x2="103.37636" y1="238.19627" x1="88.7147"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_44" y2="235.3058" x2="103.47877" y1="235.3058" x1="88.81712"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_43" y2="232.42104" x2="103.43325" y1="232.42104" x1="88.7716"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_42" y2="229.96584" x2="103.4361" y1="229.96584" x1="88.77445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_41" y2="227.13228" x2="103.48447" y1="227.13228" x1="88.82281"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_40" y2="225.22047" x2="103.4361" y1="225.22047" x1="88.77445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_39" y2="222.27878" x2="103.4361" y1="222.27878" x1="88.77445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_36" y2="205.25175" x2="103.6011" y1="205.25175" x1="88.93945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_35" y2="202.293" x2="103.54706" y1="202.293" x1="88.8854"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_76" y2="327.96014" x2="103.81163" y1="327.96014" x1="89.14998"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_75" y2="325.07254" x2="103.70068" y1="325.07254" x1="89.03902"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_74" y2="322.24179" x2="103.70637" y1="322.24179" x1="89.04472"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_73" y2="319.30295" x2="103.64947" y1="319.30295" x1="88.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_72" y2="316.41534" x2="103.65232" y1="316.41534" x1="88.99067"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_71" y2="313.52203" x2="103.59826" y1="313.52203" x1="88.93661"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_70" y2="310.74252" x2="103.4873" y1="310.74252" x1="88.82566"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_69" y2="307.96298" x2="103.4361" y1="307.96298" x1="88.77445"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_68" y2="304.96725" x2="103.4873" y1="304.96725" x1="88.82566"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_67" y2="302.02844" x2="103.43325" y1="302.02844" x1="88.7716"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_66" y2="299.35986" x2="103.38205" y1="299.35986" x1="88.7204"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_65" y2="296.47223" x2="103.43895" y1="296.47223" x1="88.77729"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_64" y2="293.58746" x2="103.493" y1="293.58746" x1="88.83134"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_63" y2="290.75388" x2="103.44179" y1="290.75388" x1="88.78014"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_62" y2="287.75815" x2="103.493" y1="287.75815" x1="88.83134"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_61" y2="285.03268" x2="103.54706" y1="285.03268" x1="88.8854"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_60" y2="282.15076" x2="103.64378" y1="282.15076" x1="88.98213"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_59" y2="279.20908" x2="103.64663" y1="279.20908" x1="88.98497"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_58" y2="276.32147" x2="103.54989" y1="276.32147" x1="88.88824"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_57" y2="273.37979" x2="103.59826" y1="273.37979" x1="88.93661"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_86" y2="357.07819" x2="103.64378" y1="357.07819" x1="88.98213"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_85" y2="354.13937" x2="103.59258" y1="354.13937" x1="88.93092"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_84" y2="351.25461" x2="103.6381" y1="351.25461" x1="88.97644"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_83" y2="348.47507" x2="103.48162" y1="348.47507" x1="88.81997"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_82" y2="345.53622" x2="103.59826" y1="345.53622" x1="88.93661"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_81" y2="342.59741" x2="103.65232" y1="342.59741" x1="88.99067"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_80" y2="339.65857" x2="103.75188" y1="339.65857" x1="89.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_79" y2="336.77664" x2="103.64947" y1="336.77664" x1="88.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_78" y2="333.8378" x2="103.70068" y1="333.8378" x1="89.03902"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_77" y2="330.84491" x2="103.75758" y1="330.84491" x1="89.09593"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_88" y2="362.68845" x2="103.80025" y1="362.68845" x1="89.1386"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="3_87" y2="359.80368" x2="103.74619" y1="359.80368" x1="89.08454"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_20" y2="141.49074" x2="122.07336" y1="141.49074" x1="107.41172"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_19" y2="138.66002" x2="122.06483" y1="138.66002" x1="107.40318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_18" y2="135.9886" x2="122.07053" y1="135.9886" x1="107.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_17" y2="133.10098" x2="122.01646" y1="133.10098" x1="107.3548"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_16" y2="130.27025" x2="122.01646" y1="130.27025" x1="107.3548"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_15" y2="127.43667" x2="122.17294" y1="127.43667" x1="107.51128"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_14" y2="124.5519" x2="122.07053" y1="124.5519" x1="107.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_13" y2="121.66427" x2="122.06768" y1="121.66427" x1="107.40603"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_12" y2="118.7226" x2="122.12173" y1="118.7226" x1="107.46008"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_11" y2="115.88902" x2="122.12458" y1="115.88902" x1="107.46292"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_10" y2="113.00423" x2="122.22984" y1="113.00423" x1="107.56818"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_9" y2="110.11662" x2="122.27821" y1="110.11662" x1="107.61655"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_8" y2="107.17493" x2="122.32941" y1="107.17493" x1="107.66777"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_7" y2="104.23611" x2="122.38916" y1="104.23611" x1="107.72751"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_6" y2="101.40253" x2="122.33794" y1="101.40253" x1="107.6763"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_5" y2="98.40681" x2="122.38347" y1="98.40681" x1="107.72182"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_4" y2="95.46796" x2="122.38631" y1="95.46796" x1="107.72466"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_3" y2="92.52629" x2="122.38062" y1="92.52629" x1="107.71897"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_2" y2="89.58462" x2="122.37494" y1="89.58462" x1="107.71328"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_1" y2="86.85631" x2="122.42899" y1="86.85631" x1="107.76733"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_41" y2="208.65149" x2="122.28106" y1="208.65149" x1="107.6194"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_40" y2="205.76385" x2="122.22984" y1="205.76385" x1="107.56818"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_39" y2="202.76813" x2="122.1189" y1="202.76813" x1="107.45724"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_38" y2="199.82645" x2="122.12173" y1="199.82645" x1="107.46008"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_37" y2="196.99287" x2="122.1189" y1="196.99287" x1="107.45724"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_36" y2="194.21335" x2="122.22984" y1="194.21335" x1="107.56818"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_35" y2="191.38263" x2="122.22416" y1="191.38263" x1="107.5625"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_34" y2="188.49501" x2="122.33226" y1="188.49501" x1="107.6706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_33" y2="185.66428" x2="122.32941" y1="185.66428" x1="107.66777"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_32" y2="182.77666" x2="122.37494" y1="182.77666" x1="107.71329"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_31" y2="179.78093" x2="122.38062" y1="179.78093" x1="107.71897"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_30" y2="176.94736" x2="122.38917" y1="176.94736" x1="107.72751"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_29" y2="174.00568" x2="122.48873" y1="174.00568" x1="107.82708"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_28" y2="171.064" x2="122.48873" y1="171.064" x1="107.82708"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_27" y2="168.93597" x2="122.49727" y1="168.93597" x1="107.83561"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_26" y2="166.21051" x2="122.43752" y1="166.21051" x1="107.77587"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_25" y2="163.32573" x2="122.33511" y1="163.32573" x1="107.67345"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_23" y2="150.25603" x2="121.96811" y1="150.25603" x1="107.30646"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_22" y2="147.26314" x2="122.06199" y1="147.26314" x1="107.40033"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_21" y2="144.43242" x2="122.01646" y1="144.43242" x1="107.3548"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_61" y2="266.74817" x2="122.48873" y1="266.74817" x1="107.82708"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_60" y2="263.86057" x2="122.48588" y1="263.86057" x1="107.82423"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_59" y2="260.92172" x2="122.38631" y1="260.92172" x1="107.72466"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_58" y2="258.03696" x2="122.38347" y1="258.03696" x1="107.72181"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_57" y2="255.14934" x2="122.32657" y1="255.14934" x1="107.66492"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_56" y2="252.26741" x2="122.38347" y1="252.26741" x1="107.72181"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_55" y2="249.32573" x2="122.42899" y1="249.32573" x1="107.76733"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_54" y2="246.38405" x2="122.53709" y1="246.38405" x1="107.87543"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_53" y2="243.44804" x2="122.60252" y1="243.44804" x1="107.94086"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_52" y2="240.50636" x2="122.65089" y1="240.50636" x1="107.98923"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_51" y2="237.61876" x2="122.49158" y1="237.61876" x1="107.82992"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_50" y2="234.73396" x2="122.59115" y1="234.73396" x1="107.92949"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_49" y2="231.90041" x2="122.48304" y1="231.90041" x1="107.82138"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_48" y2="229.06685" x2="122.43752" y1="229.06685" x1="107.77586"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_47" y2="226.17921" x2="122.38347" y1="226.17921" x1="107.72181"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_46" y2="223.34848" x2="122.2782" y1="223.34848" x1="107.61655"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_45" y2="220.51776" x2="122.38916" y1="220.51776" x1="107.72751"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_44" y2="217.57892" x2="122.28104" y1="217.57892" x1="107.6194"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_43" y2="214.64009" x2="122.33224" y1="214.64009" x1="107.6706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_42" y2="211.64436" x2="122.22131" y1="211.64436" x1="107.55965"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_81" y2="324.85913" x2="122.86711" y1="324.85913" x1="108.20546"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_80" y2="322.02841" x2="122.8159" y1="322.02841" x1="108.15425"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_79" y2="319.14362" x2="122.86711" y1="319.14362" x1="108.20546"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_78" y2="316.25601" x2="122.9183" y1="316.25601" x1="108.25666"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_77" y2="313.36838" x2="122.97522" y1="313.36838" x1="108.31357"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_76" y2="310.4324" x2="122.96953" y1="310.4324" x1="108.30787"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_75" y2="307.54761" x2="122.96953" y1="307.54761" x1="108.30787"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_74" y2="304.65997" x2="122.91263" y1="304.65997" x1="108.25098"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_73" y2="301.71832" x2="122.85857" y1="301.71832" x1="108.19691"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_72" y2="298.71973" x2="122.91547" y1="298.71973" x1="108.25381"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_71" y2="295.78091" x2="122.92401" y1="295.78091" x1="108.26236"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_70" y2="292.95016" x2="122.75615" y1="292.95016" x1="108.0945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_69" y2="290.01132" x2="122.69926" y1="290.01132" x1="108.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_68" y2="287.12372" x2="122.59115" y1="287.12372" x1="107.92949"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_67" y2="284.23892" x2="122.59115" y1="284.23892" x1="107.92949"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_66" y2="281.24036" x2="122.59399" y1="281.24036" x1="107.93233"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_65" y2="278.35272" x2="122.54563" y1="278.35272" x1="107.88398"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_64" y2="275.41104" x2="122.54278" y1="275.41104" x1="107.88113"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_63" y2="272.46939" x2="122.53994" y1="272.46939" x1="107.87829"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_62" y2="269.58176" x2="122.59115" y1="269.58176" x1="107.92949"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_89" y2="348.14224" x2="122.91263" y1="348.14224" x1="108.25098"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_88" y2="345.23184" x2="122.86142" y1="345.23184" x1="108.19977"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_87" y2="342.34421" x2="122.80737" y1="342.34421" x1="108.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_86" y2="339.40536" x2="122.71064" y1="339.40536" x1="108.04898"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_85" y2="336.51776" x2="122.82159" y1="336.51776" x1="108.15993"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_84" y2="333.57608" x2="122.8159" y1="333.57608" x1="108.15425"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_83" y2="330.6344" x2="122.759" y1="330.6344" x1="108.09735"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="4_82" y2="327.80081" x2="122.75616" y1="327.80081" x1="108.0945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_20" y2="142.17068" x2="141.34221" y1="142.17068" x1="126.68056"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_19" y2="139.33711" x2="141.39343" y1="139.33711" x1="126.73177"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_18" y2="136.50638" x2="141.28816" y1="136.50638" x1="126.62651"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_17" y2="133.5704" x2="141.23128" y1="133.5704" x1="126.56961"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_16" y2="130.63441" x2="141.12032" y1="130.63441" x1="126.45865"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_15" y2="127.80367" x2="141.12601" y1="127.80367" x1="126.46435"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_14" y2="124.85915" x2="141.1317" y1="124.85915" x1="126.47002"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_13" y2="121.92316" x2="141.1317" y1="121.92316" x1="126.47002"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_12" y2="118.99001" x2="141.08333" y1="118.99001" x1="126.42167"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_11" y2="116.05119" x2="141.0748" y1="116.05119" x1="126.41314"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_10" y2="113.11234" x2="141.02643" y1="113.11234" x1="126.36477"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_9" y2="110.16782" x2="140.97522" y1="110.16782" x1="126.31357"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_8" y2="107.28306" x2="140.92116" y1="107.28306" x1="126.25951"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_7" y2="104.39542" x2="140.86711" y1="104.39542" x1="126.20546"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_6" y2="101.5078" x2="140.97522" y1="101.5078" x1="126.31357"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_5" y2="98.51492" x2="140.87279" y1="98.51492" x1="126.21114"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_4" y2="95.52203" x2="140.87849" y1="95.52203" x1="126.21683"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_3" y2="92.63441" x2="140.76753" y1="92.63441" x1="126.10588"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_2" y2="89.9061" x2="140.82445" y1="89.9061" x1="126.16278"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_1" y2="87.18063" x2="140.87849" y1="87.18063" x1="126.21683"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_41" y2="206.90468" x2="141.05487" y1="206.90468" x1="126.39322"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_40" y2="203.96016" x2="141.00652" y1="203.96016" x1="126.34486"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_39" y2="201.17781" x2="141.00368" y1="201.17781" x1="126.34202"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_38" y2="198.18492" x2="141.02357" y1="198.18492" x1="126.36192"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_37" y2="195.2973" x2="141.02074" y1="195.2973" x1="126.35909"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_36" y2="192.41252" x2="141.07195" y1="192.41252" x1="126.41029"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_35" y2="189.52205" x2="141.07195" y1="189.52205" x1="126.41029"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_34" y2="186.58035" x2="141.12601" y1="186.58035" x1="126.46435"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_33" y2="183.7468" x2="141.0179" y1="183.7468" x1="126.35624"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_32" y2="180.97011" x2="141.07195" y1="180.97011" x1="126.41029"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_31" y2="178.0825" x2="141.06911" y1="178.0825" x1="126.40744"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_30" y2="175.30583" x2="141.0748" y1="175.30583" x1="126.41314"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_29" y2="172.58035" x2="141.02074" y1="172.58035" x1="126.35909"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_28" y2="169.69273" x2="141.07195" y1="169.69273" x1="126.41029"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_27" y2="166.75391" x2="141.12032" y1="166.75391" x1="126.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_26" y2="163.9744" x2="141.22557" y1="163.9744" x1="126.56392"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_25" y2="161.41109" x2="141.12032" y1="161.41109" x1="126.45866"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_24" y2="159.06685" x2="141.06911" y1="159.06685" x1="126.40744"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_22" y2="147.56186" x2="141.28532" y1="147.56186" x1="126.62366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_21" y2="145.06116" x2="141.34221" y1="145.06116" x1="126.68056"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_71" y2="293.16071" x2="141.60396" y1="293.16071" x1="126.9423"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_70" y2="290.2731" x2="141.61533" y1="290.2731" x1="126.95367"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_69" y2="287.49356" x2="141.6068" y1="287.49356" x1="126.94514"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_68" y2="284.71405" x2="141.5499" y1="284.71405" x1="126.88824"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_67" y2="281.88333" x2="141.44748" y1="281.88333" x1="126.78582"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_66" y2="279.10098" x2="141.5499" y1="279.10098" x1="126.88824"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_65" y2="276.10809" x2="141.44179" y1="276.10809" x1="126.78014"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_64" y2="273.22046" x2="141.44463" y1="273.22046" x1="126.78297"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_63" y2="270.28445" x2="141.39343" y1="270.28445" x1="126.73177"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_62" y2="267.45374" x2="141.39058" y1="267.45374" x1="126.72892"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_61" y2="264.62018" x2="141.4304" y1="264.62018" x1="126.76875"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_60" y2="261.78375" x2="141.38205" y1="261.78375" x1="126.72039"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_59" y2="258.89612" x2="141.28247" y1="258.89612" x1="126.6208"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_58" y2="256.00851" x2="141.32799" y1="256.00851" x1="126.66633"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_57" y2="253.12657" x2="141.23128" y1="253.12657" x1="126.56961"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_56" y2="250.24181" x2="141.12032" y1="250.24181" x1="126.45865"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_55" y2="247.35701" x2="141.12032" y1="247.35701" x1="126.45865"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_54" y2="244.52916" x2="141.12317" y1="244.52916" x1="126.46149"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_53" y2="241.65004" x2="141.10893" y1="241.65004" x1="126.44728"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_52" y2="238.82219" x2="141.11746" y1="238.82219" x1="126.45581"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_51" y2="235.88902" x2="141.11746" y1="235.88902" x1="126.45581"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_50" y2="232.95872" x2="141.17436" y1="232.95872" x1="126.5127"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_49" y2="230.02559" x2="141.22272" y1="230.02559" x1="126.56107"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_48" y2="227.08961" x2="141.11461" y1="227.08961" x1="126.45296"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_47" y2="224.36699" x2="141.01505" y1="224.36699" x1="126.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_46" y2="221.431" x2="141.06056" y1="221.431" x1="126.39891"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_45" y2="218.54622" x2="141.12317" y1="218.54622" x1="126.46149"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_44_2" y2="215.61023" x2="141.16867" y1="215.61023" x1="126.50702"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_44_1" y2="212.6714" x2="141.10608" y1="212.6714" x1="126.44443"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_43" y2="209.78662" x2="141.06342" y1="209.78662" x1="126.40176"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_81" y2="321.53055" x2="141.58974" y1="321.53055" x1="126.92807"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_80" y2="318.64294" x2="141.53853" y1="318.64294" x1="126.87685"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_79" y2="315.80936" x2="141.47878" y1="315.80936" x1="126.81712"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_78" y2="312.9758" x2="141.44179" y1="312.9758" x1="126.78014"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_77" y2="310.14508" x2="141.39058" y1="310.14508" x1="126.72893"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_76" y2="307.26028" x2="141.33368" y1="307.26028" x1="126.67203"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_75" y2="304.53769" x2="141.38773" y1="304.53769" x1="126.72607"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_74" y2="301.59885" x2="141.43895" y1="301.59885" x1="126.77729"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_73" y2="298.77097" x2="141.43895" y1="298.77097" x1="126.77729"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_72" y2="295.93738" x2="141.49869" y1="295.93738" x1="126.83704"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_84" y2="329.90323" x2="141.53853" y1="329.90323" x1="126.87685"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_83" y2="326.98148" x2="141.5442" y1="326.98148" x1="126.88256"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="5_82" y2="324.3129" x2="141.58405" y1="324.3129" x1="126.92238"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_18" y2="136.35561" x2="160.12459" y1="136.35561" x1="145.46292"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_25" y2="156.4182" x2="160.12459" y1="156.4182" x1="145.46292"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_24" y2="153.58746" x2="160.18718" y1="153.58746" x1="145.52551"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_23" y2="150.70554" x2="160.23839" y1="150.70554" x1="145.57674"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_22" y2="147.87766" x2="160.18718" y1="147.87766" x1="145.52551"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_21" y2="144.99857" x2="160.18718" y1="144.99857" x1="145.52551"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_20" y2="142.22758" x2="160.12743" y1="142.22758" x1="145.46577"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_19" y2="139.24039" x2="160.17865" y1="139.24039" x1="145.51698"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_17" y2="133.41678" x2="160.06483" y1="133.41678" x1="145.40318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_16" y2="130.58319" x2="160.06769" y1="130.58319" x1="145.40604"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_15" y2="127.70126" x2="160.01079" y1="127.70126" x1="145.34914"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_14" y2="124.76527" x2="160.01932" y1="124.76527" x1="145.35767"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_13" y2="121.98859" x2="159.8031" y1="121.98859" x1="145.14145"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_12" y2="119.0014" x2="159.85715" y1="119.0014" x1="145.1955"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_11" y2="116.22758" x2="159.7462" y1="116.22758" x1="145.08455"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_10" y2="113.3997" x2="159.80026" y1="113.3997" x1="145.1386"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_9" y2="110.46371" x2="159.75189" y1="110.46371" x1="145.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_8" y2="107.63583" x2="159.74904" y1="107.63583" x1="145.08739"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_7" y2="104.69984" x2="159.75189" y1="104.69984" x1="145.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_6" y2="101.70693" x2="159.75189" y1="101.70693" x1="145.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_5" y2="98.87908" x2="159.75189" y1="98.87908" x1="145.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_4" y2="95.88618" x2="159.74904" y1="95.88618" x1="145.08739"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="svg_567" y2="92.94735" x2="159.75189" y1="92.94735" x1="145.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_2" y2="89.95731" x2="159.74904" y1="89.95731" x1="145.08739"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_1" y2="87.01562" x2="159.7462" y1="87.01562" x1="145.08455"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_26" y2="159.30013" x2="160.07338" y1="159.30013" x1="145.41173"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_48" y2="229.54195" x2="160.49159" y1="229.54195" x1="145.82993"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_47" y2="226.65431" x2="160.48305" y1="226.65431" x1="145.82138"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_46" y2="223.82359" x2="160.43753" y1="223.82359" x1="145.77586"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_45" y2="220.94165" x2="160.38063" y1="220.94165" x1="145.71898"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_44" y2="218.05687" x2="160.38063" y1="218.05687" x1="145.71898"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_43" y2="215.3371" x2="160.38347" y1="215.3371" x1="145.72182"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_42" y2="212.34422" x2="160.43753" y1="212.34422" x1="145.77586"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_41" y2="209.5647" x2="160.44037" y1="209.5647" x1="145.77872"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_40" y2="206.68277" x2="160.48305" y1="206.68277" x1="145.82138"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_39" y2="203.80084" x2="160.48874" y1="203.80084" x1="145.82709"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_38" y2="200.86484" x2="160.43469" y1="200.86484" x1="145.77303"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_37" y2="197.98007" x2="160.43753" y1="197.98007" x1="145.77586"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_36" y2="194.99002" x2="160.48874" y1="194.99002" x1="145.82709"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_35" y2="192.10809" x2="160.429" y1="192.10809" x1="145.76733"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_34" y2="189.11235" x2="160.48874" y1="189.11235" x1="145.82709"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_33" y2="186.39258" x2="160.43469" y1="186.39258" x1="145.77303"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_32" y2="183.5078" x2="160.43753" y1="183.5078" x1="145.77586"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_31" y2="180.79088" x2="160.48874" y1="180.79088" x1="145.82709"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_30" y2="178.28732" x2="160.43469" y1="178.28732" x1="145.77303"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_73" y2="300.59741" x2="160.44606" y1="300.59741" x1="145.78441"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_72" y2="297.71832" x2="160.429" y1="297.71832" x1="145.76733"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_71" y2="295.04977" x2="160.38063" y1="295.04977" x1="145.71898"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_70" y2="292.33282" x2="160.39485" y1="292.33282" x1="145.73318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_69" y2="289.50781" x2="160.49159" y1="289.50781" x1="145.82993"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_68" y2="286.62585" x2="160.49159" y1="286.62585" x1="145.82993"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_67" y2="283.79797" x2="160.53426" y1="283.79797" x1="145.8726"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_66" y2="281.02417" x2="160.59401" y1="281.02417" x1="145.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_65" y2="278.08533" x2="160.53996" y1="278.08533" x1="145.8783"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_64" y2="275.3627" x2="160.5428" y1="275.3627" x1="145.88113"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_63" y2="272.5889" x2="160.49443" y1="272.5889" x1="145.83278"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_62" y2="269.75815" x2="160.60539" y1="269.75815" x1="145.94373"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_61" y2="266.81931" x2="160.54564" y1="266.81931" x1="145.88399"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_60" y2="264.0455" x2="160.4859" y1="264.0455" x1="145.82423"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_59" y2="261.27167" x2="160.38347" y1="261.27167" x1="145.72182"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_58" y2="258.3869" x2="160.27821" y1="258.3869" x1="145.61656"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_57" y2="255.39687" x2="160.22131" y1="255.39687" x1="145.55966"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_56" y2="252.45802" x2="160.27536" y1="252.45802" x1="145.61371"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_55" y2="249.57326" x2="160.27536" y1="249.57326" x1="145.61371"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_54" y2="246.69133" x2="160.26968" y1="246.69133" x1="145.60802"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_53" y2="243.86058" x2="160.22131" y1="243.86058" x1="145.55966"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_52" y2="240.92177" x2="160.27536" y1="240.92177" x1="145.61371"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_51" y2="238.19914" x2="160.38632" y1="238.19914" x1="145.72467"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_50" y2="235.31438" x2="160.38632" y1="235.31438" x1="145.72467"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_49" y2="232.37553" x2="160.44322" y1="232.37553" x1="145.78156"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_77" y2="311.58463" x2="160.34079" y1="311.58463" x1="145.67914"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_76" y2="308.91888" x2="160.44606" y1="308.91888" x1="145.78441"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_75" y2="306.03979" x2="160.44606" y1="306.03979" x1="145.78441"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_74" y2="303.32004" x2="160.38916" y1="303.32004" x1="145.72751"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="6_78" y2="314.36414" x2="160.392" y1="314.36414" x1="145.73035"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_25" y2="155.50781" x2="178.74762" y1="155.50781" x1="164.08597"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_24" y2="152.73398" x2="178.75331" y1="152.73398" x1="164.09166"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_23" y2="149.963" x2="178.81305" y1="149.963" x1="164.1514"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_22" y2="147.13797" x2="178.80737" y1="147.13797" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_21" y2="144.36699" x2="178.85289" y1="144.36699" x1="164.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_20" y2="141.70126" x2="178.86426" y1="141.70126" x1="164.20262"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_19" y2="138.8165" x2="178.86426" y1="138.8165" x1="164.20262"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_18" y2="135.92886" x2="178.81021" y1="135.92886" x1="164.14856"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_17" y2="133.09529" x2="178.80737" y1="133.09529" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_16" y2="130.21336" x2="178.75331" y1="130.21336" x1="164.09166"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_15" y2="127.38546" x2="178.75615" y1="127.38546" x1="164.0945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_14" y2="124.44663" x2="178.75615" y1="124.44663" x1="164.0945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_13" y2="121.5078" x2="178.7021" y1="121.5078" x1="164.04045"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_12" y2="118.67423" x2="178.69926" y1="118.67423" x1="164.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_11" y2="115.78945" x2="178.75331" y1="115.78945" x1="164.09166"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_10" y2="112.90183" x2="178.69641" y1="112.90183" x1="164.03476"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_9" y2="110.01705" x2="178.74762" y1="110.01705" x1="164.08597"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_8" y2="107.23754" x2="178.81021" y1="107.23754" x1="164.14856"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_7" y2="104.29585" x2="178.80737" y1="104.29585" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_6" y2="101.46229" x2="178.80737" y1="101.46229" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_5" y2="98.68278" x2="178.80168" y1="98.68278" x1="164.14003"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_4" y2="95.8492" x2="178.85858" y1="95.8492" x1="164.19693"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_3" y2="92.90468" x2="178.80737" y1="92.90468" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_2" y2="89.96299" x2="178.69356" y1="89.96299" x1="164.03192"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_1" y2="87.07537" x2="178.80168" y1="87.07537" x1="164.14003"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_48" y2="225.61024" x2="178.64236" y1="225.61024" x1="163.98071"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_47" y2="222.72261" x2="178.59399" y1="222.72261" x1="163.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_46" y2="220.1593" x2="178.53426" y1="220.1593" x1="163.8726"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_45" y2="217.49074" x2="178.5883" y1="217.49074" x1="163.92665"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_44" y2="214.71408" x2="178.53711" y1="214.71408" x1="163.87544"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_43" y2="212.0455" x2="178.59685" y1="212.0455" x1="163.9352"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_42" y2="209.21762" x2="178.54279" y1="209.21762" x1="163.88113"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_41" y2="206.43811" x2="178.59399" y1="206.43811" x1="163.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_40" y2="203.55333" x2="178.53711" y1="203.55333" x1="163.87544"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_39" y2="200.6145" x2="178.64522" y1="200.6145" x1="163.98355"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_38" y2="197.73256" x2="178.59399" y1="197.73256" x1="163.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_37" y2="194.85347" x2="178.49443" y1="194.85347" x1="163.83278"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_36" y2="191.91748" x2="178.49159" y1="191.91748" x1="163.82993"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_35" y2="189.25177" x2="178.54279" y1="189.25177" x1="163.88113"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_34" y2="186.31578" x2="178.48874" y1="186.31578" x1="163.82709"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_33" y2="183.431" x2="178.59399" y1="183.431" x1="163.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_32" y2="180.54906" x2="178.54279" y1="180.54906" x1="163.88113"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_31" y2="177.72119" x2="178.48305" y1="177.72119" x1="163.82138"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_30" y2="175.80937" x2="178.48589" y1="175.80937" x1="163.82423"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_26" y2="158.12802" x2="178.75047" y1="158.12802" x1="164.08882"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_73" y2="296.61163" x2="178.80453" y1="296.61163" x1="164.14287"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_72" y2="293.67282" x2="178.80453" y1="293.67282" x1="164.14287"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_71" y2="290.78519" x2="178.80168" y1="290.78519" x1="164.14003"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_70" y2="288.00568" x2="178.79883" y1="288.00568" x1="164.13719"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_69" y2="285.22614" x2="178.74763" y1="285.22614" x1="164.08597"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_68" y2="282.55759" x2="178.80168" y1="282.55759" x1="164.14003"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_67" y2="279.72687" x2="178.80737" y1="279.72687" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_66" y2="276.73398" x2="178.81023" y1="276.73398" x1="164.14856"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_65" y2="273.90042" x2="178.85289" y1="273.90042" x1="164.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_64" y2="271.12088" x2="178.80168" y1="271.12088" x1="164.14003"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_63" y2="268.23611" x2="178.85289" y1="268.23611" x1="164.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_62" y2="265.4054" x2="178.90695" y1="265.4054" x1="164.2453"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_61" y2="262.57181" x2="178.85574" y1="262.57181" x1="164.19409"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_60" y2="259.84634" x2="178.85289" y1="259.84634" x1="164.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_59" y2="257.06683" x2="178.80453" y1="257.06683" x1="164.14287"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_58" y2="254.18208" x2="178.86142" y1="254.18208" x1="164.19977"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_57" y2="251.35133" x2="178.85574" y1="251.35133" x1="164.19409"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_56" y2="248.57753" x2="178.80737" y1="248.57753" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_55" y2="245.69557" x2="178.80737" y1="245.69557" x1="164.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_54" y2="242.86485" x2="178.85574" y1="242.86485" x1="164.19409"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_53" y2="240.1451" x2="178.85574" y1="240.1451" x1="164.19409"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_52" y2="237.31438" x2="178.85289" y1="237.31438" x1="164.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_51" y2="234.42958" x2="178.75049" y1="234.42958" x1="164.08882"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_50" y2="231.43385" x2="178.63953" y1="231.43385" x1="163.97786"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_49" y2="228.54906" x2="178.74478" y1="228.54906" x1="164.08313"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="7_74" y2="299.60736" x2="178.74478" y1="299.60736" x1="164.08313"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_20" y2="141.91748" x2="197.34221" y1="141.91748" x1="182.68057"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_19" y2="139.02986" x2="197.34221" y1="139.02986" x1="182.68057"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_18" y2="136.14508" x2="197.39343" y1="136.14508" x1="182.73178"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_17" y2="133.15219" x2="197.39627" y1="133.15219" x1="182.73462"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_16" y2="130.31862" x2="197.39058" y1="130.31862" x1="182.72894"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_15" y2="127.43383" x2="197.38774" y1="127.43383" x1="182.72609"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_14" y2="124.60311" x2="197.38774" y1="124.60311" x1="182.72609"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_13" y2="121.66143" x2="197.49869" y1="121.66143" x1="182.83705"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_12" y2="118.77381" x2="197.49301" y1="118.77381" x1="182.83134"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_11" y2="115.88334" x2="197.44179" y1="115.88334" x1="182.78015"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_10" y2="112.9445" x2="197.32799" y1="112.9445" x1="182.66635"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_9" y2="110.00283" x2="197.32231" y1="110.00283" x1="182.66066"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_8" y2="107.06399" x2="197.21988" y1="107.06399" x1="182.55824"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_7" y2="104.17921" x2="197.16014" y1="104.17921" x1="182.49849"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_6" y2="101.29444" x2="197.21704" y1="101.29444" x1="182.55539"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_5" y2="98.51777" x2="197.21988" y1="98.51777" x1="182.55824"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_4" y2="95.63013" x2="197.22273" y1="95.63013" x1="182.56108"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_3" y2="92.6913" x2="197.27963" y1="92.6913" x1="182.61798"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_2" y2="89.74963" x2="197.16583" y1="89.74963" x1="182.50418"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_1" y2="86.75674" x2="197.22273" y1="86.75674" x1="182.56108"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_52" y2="238.32149" x2="197.28816" y1="238.32149" x1="182.62651"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_51" y2="235.54478" x2="197.28531" y1="235.54478" x1="182.62367"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_50" y2="232.66002" x2="197.2341" y1="232.66002" x1="182.57245"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_49" y2="229.77238" x2="197.18005" y1="229.77238" x1="182.5184"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_48" y2="226.88762" x2="197.12315" y1="226.88762" x1="182.4615"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_47" y2="224.05687" x2="197.22273" y1="224.05687" x1="182.56108"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_46" y2="221.1721" x2="197.27963" y1="221.1721" x1="182.61798"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_45" y2="218.23326" x2="197.22842" y1="218.23326" x1="182.56677"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_44" y2="215.3485" x2="197.23126" y1="215.3485" x1="182.56961"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_43" y2="212.51778" x2="197.28531" y1="212.51778" x1="182.62367"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_42" y2="209.57893" x2="197.38774" y1="209.57893" x1="182.72609"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_41" y2="206.8051" x2="197.33084" y1="206.8051" x1="182.66919"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_40" y2="204.03128" x2="197.33084" y1="204.03128" x1="182.66919"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_39" y2="201.36272" x2="197.33084" y1="201.36272" x1="182.66919"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_38" y2="198.5889" x2="197.38205" y1="198.5889" x1="182.7204"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_37" y2="195.75533" x2="197.48447" y1="195.75533" x1="182.82281"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_36" y2="192.87338" x2="197.37921" y1="192.87338" x1="182.71756"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_35" y2="189.98862" x2="197.43611" y1="189.98862" x1="182.77444"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_34" y2="187.04977" x2="197.43326" y1="187.04977" x1="182.77161"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_33" y2="184.11095" x2="197.43326" y1="184.11095" x1="182.77161"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_32" y2="181.27737" x2="197.32799" y1="181.27737" x1="182.66634"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_31" y2="178.38974" x2="197.43326" y1="178.38974" x1="182.77161"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_30" y2="175.55618" x2="197.4304" y1="175.55618" x1="182.76875"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_29" y2="172.56044" x2="197.54137" y1="172.56044" x1="182.87971"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_28" y2="169.67566" x2="197.48732" y1="169.67566" x1="182.82567"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_27" y2="166.73683" x2="197.37921" y1="166.73683" x1="182.71756"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_26" y2="164.5007" x2="197.38489" y1="164.5007" x1="182.72324"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_25" y2="161.56186" x2="197.27963" y1="161.56186" x1="182.61798"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_24" y2="158.7852" x2="197.32799" y1="158.7852" x1="182.66634"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_23" y2="156.3869" x2="197.27394" y1="156.3869" x1="182.61229"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_62" y2="266.41818" x2="197.17436" y1="266.41818" x1="182.51271"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_61" y2="263.53342" x2="197.22557" y1="263.53342" x1="182.56392"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_60" y2="260.69983" x2="197.28247" y1="260.69983" x1="182.62082"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_59" y2="257.86627" x2="197.16867" y1="257.86627" x1="182.50702"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_58" y2="255.08961" x2="197.17436" y1="255.08961" x1="182.51271"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_57" y2="252.20485" x2="197.17152" y1="252.20485" x1="182.50987"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_56" y2="249.43102" x2="197.12032" y1="249.43102" x1="182.45865"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_55" y2="246.54909" x2="197.17152" y1="246.54909" x1="182.50987"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_54" y2="243.76955" x2="197.17436" y1="243.76955" x1="182.51271"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_53" y2="241.15504" x2="197.22842" y1="241.15504" x1="182.56677"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_67" y2="280.93594" x2="197.18005" y1="280.93594" x1="182.5184"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_66" y2="278.16498" x2="197.2341" y1="278.16498" x1="182.57245"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_65" y2="275.28305" x2="197.23695" y1="275.28305" x1="182.5753"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_64" y2="272.293" x2="197.18005" y1="272.293" x1="182.5184"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="8_63" y2="269.41107" x2="197.17436" y1="269.41107" x1="182.51271"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_26" y2="174.75391" x2="215.70923" y1="174.75391" x1="201.04756"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_25" y2="172.74252" x2="215.69785" y1="172.74252" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_24" y2="170.88762" x2="215.75758" y1="170.88762" x1="201.09593"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_22" y2="147.43669" x2="215.59259" y1="147.43669" x1="200.93092"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_21" y2="144.60881" x2="215.64948" y1="144.60881" x1="200.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_20" y2="141.77524" x2="215.59541" y1="141.77524" x1="200.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_19" y2="138.83641" x2="215.69785" y1="138.83641" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_18" y2="135.89757" x2="215.64093" y1="135.89757" x1="200.97928"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_17" y2="132.95874" x2="215.69785" y1="132.95874" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_16" y2="130.12801" x2="215.69785" y1="130.12801" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_15" y2="127.40539" x2="215.69499" y1="127.40539" x1="201.03334"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_14" y2="124.46656" x2="215.64093" y1="124.46656" x1="200.97928"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_13" y2="121.52488" x2="215.64948" y1="121.52488" x1="200.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_12" y2="118.58604" x2="215.59541" y1="118.58604" x1="200.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_11" y2="115.70127" x2="215.59541" y1="115.70127" x1="200.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_10" y2="112.87054" x2="215.70068" y1="112.87054" x1="201.03903"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_9" y2="109.93171" x2="215.75475" y1="109.93171" x1="201.09308"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_8" y2="107.04408" x2="215.75189" y1="107.04408" x1="201.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_7" y2="104.10809" x2="215.69785" y1="104.10809" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_6" y2="101.17495" x2="215.70352" y1="101.17495" x1="201.04187"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_5" y2="98.29017" x2="215.69785" y1="98.29017" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_4" y2="95.51349" x2="215.70068" y1="95.51349" x1="201.03903"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_3" y2="92.62872" x2="215.70352" y1="92.62872" x1="201.04187"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_2" y2="89.68989" x2="215.70352" y1="89.68989" x1="201.04187"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_1" y2="86.96442" x2="215.69785" y1="86.96442" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_27" y2="177.25461" x2="215.64664" y1="177.25461" x1="200.98497"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_51" y2="245.78377" x2="215.48163" y1="245.78377" x1="200.81996"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_50" y2="243.0071" x2="215.53568" y1="243.0071" x1="200.87401"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_49" y2="240.17638" x2="215.52998" y1="240.17638" x1="200.86833"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_48" y2="237.29158" x2="215.58403" y1="237.29158" x1="200.92238"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_47" y2="234.4637" x2="215.58119" y1="234.4637" x1="200.91954"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_46" y2="231.63298" x2="215.59258" y1="231.63298" x1="200.93092"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_45" y2="228.6913" x2="215.58974" y1="228.6913" x1="200.92807"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_44" y2="225.80367" x2="215.59258" y1="225.80367" x1="200.93092"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_43" y2="222.86484" x2="215.69499" y1="222.86484" x1="201.03334"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_42" y2="219.92601" x2="215.64093" y1="219.92601" x1="200.97928"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_41" y2="216.98717" x2="215.59541" y1="216.98717" x1="200.93376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_40" y2="214.04834" x2="215.59827" y1="214.04834" x1="200.9366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_39" y2="211.05261" x2="215.64662" y1="211.05261" x1="200.98497"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_38" y2="208.54337" x2="215.69785" y1="208.54337" x1="201.03618"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_37" y2="205.55049" x2="215.75189" y1="205.55049" x1="201.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_36" y2="202.5576" x2="215.64662" y1="202.5576" x1="200.98497"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_35" y2="199.67282" x2="215.76042" y1="199.67282" x1="201.09877"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_34" y2="196.73398" x2="215.70352" y1="196.73398" x1="201.04187"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_33" y2="194.01421" x2="215.75189" y1="194.01421" x1="201.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_32" y2="191.18347" x2="215.75189" y1="191.18347" x1="201.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_31" y2="188.35275" x2="215.70067" y1="188.35275" x1="201.03903"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_30" y2="185.73825" x2="215.70067" y1="185.73825" x1="201.03903"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_29" y2="182.85347" x2="215.70352" y1="182.85347" x1="201.04187"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_28" y2="179.92032" x2="215.64662" y1="179.92032" x1="200.98497"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_52" y2="248.67137" x2="215.47878" y1="248.67137" x1="200.81712"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_61" y2="273.88333" x2="215.32515" y1="273.88333" x1="200.6635"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_60" y2="271.10666" x2="215.32231" y1="271.10666" x1="200.66066"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_59" y2="268.48929" x2="215.37636" y1="268.48929" x1="200.71471"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_58" y2="265.65573" x2="215.41904" y1="265.65573" x1="200.75739"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_57" y2="262.82501" x2="215.4731" y1="262.82501" x1="200.81145"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_56" y2="260.10239" x2="215.47594" y1="260.10239" x1="200.81427"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_55" y2="257.16354" x2="215.42473" y1="257.16354" x1="200.76308"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_54" y2="254.38689" x2="215.43042" y1="254.38689" x1="200.76875"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_53" y2="251.44521" x2="215.48163" y1="251.44521" x1="200.81998"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="9_62" y2="276.71405" x2="215.32799" y1="276.71405" x1="200.66635"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_15" y2="127.93739" x2="234.1132" y1="127.93739" x1="219.45155"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_14" y2="124.9445" x2="234.00795" y1="124.9445" x1="219.34628"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_13" y2="122.11662" x2="234.1132" y1="122.11662" x1="219.45155"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_12" y2="119.23183" x2="234.1132" y1="119.23183" x1="219.45155"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_11" y2="116.29301" x2="234.11606" y1="116.29301" x1="219.45439"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_10" y2="113.35418" x2="234.1132" y1="113.35418" x1="219.45155"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_9" y2="110.41817" x2="234.1189" y1="110.41817" x1="219.45724"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_8" y2="107.53341" x2="234.11606" y1="107.53341" x1="219.45439"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_7" y2="104.64863" x2="234.01364" y1="104.64863" x1="219.35199"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_6" y2="101.70979" x2="234.06483" y1="101.70979" x1="219.40318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_5" y2="98.71975" x2="234.01364" y1="98.71975" x1="219.35199"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_4" y2="95.83497" x2="234.07054" y1="95.83497" x1="219.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_3" y2="92.94735" x2="234.00795" y1="92.94735" x1="219.34628"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_2" y2="90.11661" x2="234.01364" y1="90.11661" x1="219.35199"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_1" y2="87.22899" x2="234.01079" y1="87.22899" x1="219.34914"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_16" y2="130.76529" x2="234.01079" y1="130.76529" x1="219.34914"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_47" y2="225.1209" x2="233.86" y1="225.1209" x1="219.19835"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_46" y2="222.18492" x2="233.79741" y1="222.18492" x1="219.13577"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_45" y2="219.35419" x2="233.84863" y1="219.35419" x1="219.18698"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_44" y2="216.58035" x2="234.01648" y1="216.58035" x1="219.35483"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_43" y2="213.91179" x2="233.85716" y1="213.91179" x1="219.19551"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_42" y2="211.08391" x2="233.85147" y1="211.08391" x1="219.18982"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_41" y2="208.20482" x2="233.90837" y1="208.20482" x1="219.24672"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_40" y2="205.26884" x2="233.91121" y1="205.26884" x1="219.24956"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_39" y2="202.44096" x2="233.90553" y1="202.44096" x1="219.24388"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_38" y2="199.50496" x2="234.06485" y1="199.50496" x1="219.40318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_37" y2="196.67424" x2="233.95958" y1="196.67424" x1="219.29793"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_36" y2="193.84636" x2="233.95674" y1="193.84636" x1="219.29507"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_35" y2="190.91037" x2="234.01364" y1="190.91037" x1="219.35199"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_34" y2="188.02559" x2="234.01648" y1="188.02559" x1="219.35483"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_33" y2="185.08961" x2="234.062" y1="185.08961" x1="219.40034"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_32" y2="182.36699" x2="234.01364" y1="182.36699" x1="219.35199"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_31" y2="179.42816" x2="234.01364" y1="179.42816" x1="219.35199"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_30" y2="176.59743" x2="233.95958" y1="176.59743" x1="219.29793"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_29" y2="173.76671" x2="234.01648" y1="173.76671" x1="219.35483"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_28" y2="170.88193" x2="233.96243" y1="170.88193" x1="219.30078"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_27" y2="168" x2="234.06485" y1="168" x1="219.40318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_26" y2="165.05832" x2="234.01648" y1="165.05832" x1="219.35483"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_25" y2="162.12233" x2="234.06769" y1="162.12233" x1="219.40604"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_24" y2="159.18349" x2="233.96243" y1="159.18349" x1="219.30078"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_23" y2="156.1906" x2="233.95958" y1="156.1906" x1="219.29793"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_22" y2="153.25461" x2="233.90553" y1="153.25461" x1="219.24388"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_21" y2="150.36983" x2="233.95674" y1="150.36983" x1="219.29507"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_20" y2="147.43669" x2="234.06485" y1="147.43669" x1="219.40318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_17" y2="133.26599" x2="234.062" y1="133.26599" x1="219.40034"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_57" y2="253.56187" x2="233.95674" y1="253.56187" x1="219.29507"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_56" y2="250.78236" x2="233.96243" y1="250.78236" x1="219.30078"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_55" y2="248.00285" x2="233.85431" y1="248.00285" x1="219.19267"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_54" y2="245.16927" x2="233.79742" y1="245.16927" x1="219.13577"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_53" y2="242.28163" x2="233.74052" y1="242.28163" x1="219.07887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_52" y2="239.39687" x2="233.78888" y1="239.39687" x1="219.12723"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_51" y2="236.61736" x2="233.79457" y1="236.61736" x1="219.13292"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_50" y2="233.78664" x2="233.85147" y1="233.78664" x1="219.18982"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_49" y2="230.95021" x2="233.90837" y1="230.95021" x1="219.24672"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_48" y2="228.00569" x2="233.79742" y1="228.00569" x1="219.13577"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_61" y2="264.99854" x2="233.8031" y1="264.99854" x1="219.14145"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_60" y2="262.21902" x2="233.79741" y1="262.21902" x1="219.13576"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_59" y2="259.33139" x2="233.86569" y1="259.33139" x1="219.20403"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="10_58" y2="256.39258" x2="234.02501" y1="256.39258" x1="219.36336"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_27" y2="168.38974" x2="252.76184" y1="168.38974" x1="238.10019"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_23" y2="148.62587" x2="252.96384" y1="148.62587" x1="238.30217"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_22" y2="145.95447" x2="252.90979" y1="145.95447" x1="238.24812"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_21" y2="143.2347" x2="252.86142" y1="143.2347" x1="238.19977"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_20" y2="140.46371" x2="252.90979" y1="140.46371" x1="238.24812"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_19" y2="137.74109" x2="252.90694" y1="137.74109" x1="238.24529"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_18" y2="134.91037" x2="252.85289" y1="134.91037" x1="238.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_17" y2="132.1906" x2="252.85289" y1="132.1906" x1="238.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_16" y2="129.35704" x2="252.80452" y1="129.35704" x1="238.14287"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_15" y2="126.58318" x2="252.80736" y1="126.58318" x1="238.14572"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_14" y2="123.91747" x2="252.80168" y1="123.91747" x1="238.14001"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_13" y2="121.14365" x2="252.75331" y1="121.14365" x1="238.09166"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_12" y2="118.36982" x2="252.69925" y1="118.36982" x1="238.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_11" y2="115.48789" x2="252.75615" y1="115.48789" x1="238.0945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_10" y2="112.60311" x2="252.7021" y1="112.60311" x1="238.04045"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_9" y2="109.72118" x2="252.69925" y1="109.72118" x1="238.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_8" y2="106.8364" x2="252.69925" y1="106.8364" x1="238.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_7" y2="103.95161" x2="252.69925" y1="103.95161" x1="238.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_6" y2="101.06968" x2="252.69925" y1="101.06968" x1="238.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_5" y2="98.18491" x2="252.64235" y1="98.18491" x1="237.9807"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_4" y2="95.35133" x2="252.69641" y1="95.35133" x1="238.03476"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_3" y2="92.46654" x2="252.59114" y1="92.46654" x1="237.92949"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_2" y2="89.47366" x2="252.59399" y1="89.47366" x1="237.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_1" y2="86.85631" x2="252.59399" y1="86.85631" x1="237.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_57" y2="253.68419" x2="252.91263" y1="253.68419" x1="238.25099"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_56" y2="250.85631" x2="252.96669" y1="250.85631" x1="238.30504"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_55" y2="247.97438" x2="253.02359" y1="247.97438" x1="238.36192"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_54" y2="245.14366" x2="253.07765" y1="245.14366" x1="238.41599"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_53" y2="242.36699" x2="253.06342" y1="242.36699" x1="238.40176"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_52" y2="239.42815" x2="253.17436" y1="239.42815" x1="238.51271"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_51" y2="236.4893" x2="253.18576" y1="236.4893" x1="238.52409"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_50" y2="233.7155" x2="253.1317" y1="233.7155" x1="238.47003"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_49" y2="230.8307" x2="253.12601" y1="230.8307" x1="238.46436"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_48" y2="228.10524" x2="252.97238" y1="228.10524" x1="238.31073"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_47" y2="225.27736" x2="253.02359" y1="225.27736" x1="238.36192"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_46" y2="222.5007" x2="253.06911" y1="222.5007" x1="238.40744"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_45" y2="219.66997" x2="253.0179" y1="219.66997" x1="238.35625"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_44" y2="216.89331" x2="252.961" y1="216.89331" x1="238.29935"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_43" y2="214.06258" x2="253.0179" y1="214.06258" x1="238.35625"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_42" y2="211.12373" x2="252.85573" y1="211.12373" x1="238.19409"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_41" y2="208.29018" x2="253.0179" y1="208.29018" x1="238.35625"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_40" y2="205.4054" x2="252.90979" y1="205.4054" x1="238.24814"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_39" y2="202.57181" x2="252.85289" y1="202.57181" x1="238.19124"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_38" y2="199.63298" x2="252.79599" y1="199.63298" x1="238.13434"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_37" y2="196.69415" x2="252.79883" y1="196.69415" x1="238.13718"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_36" y2="193.91464" x2="252.74478" y1="193.91464" x1="238.08313"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_35" y2="191.02701" x2="252.75047" y1="191.02701" x1="238.08882"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_34" y2="188.08818" x2="252.80452" y1="188.08818" x1="238.14287"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_33" y2="185.09529" x2="252.75331" y1="185.09529" x1="238.09166"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_32" y2="182.21051" x2="252.80452" y1="182.21051" x1="238.14287"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_31" y2="179.38547" x2="252.76186" y1="179.38547" x1="238.10019"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_30" y2="176.66286" x2="252.7021" y1="176.66286" x1="238.04045"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_29" y2="173.88902" x2="252.75331" y1="173.88902" x1="238.09166"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_28" y2="171.05832" x2="252.75615" y1="171.05832" x1="238.0945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_62" y2="267.98291" x2="252.92117" y1="267.98291" x1="238.25952"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_61" y2="265.04691" x2="253.02359" y1="265.04691" x1="238.36194"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_60" y2="262.22189" x2="252.91548" y1="262.22189" x1="238.25383"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_59" y2="259.39685" x2="252.96953" y1="259.39685" x1="238.30789"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="11_58" y2="256.56897" x2="252.91548" y1="256.56897" x1="238.25383"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_10" y2="112.33569" x2="271.70636" y1="112.33569" x1="257.04471"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_9" y2="109.55901" x2="271.74902" y1="109.55901" x1="257.0874"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_8" y2="106.67139" x2="271.80026" y1="106.67139" x1="257.13861"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_7" y2="103.89756" x2="271.70068" y1="103.89756" x1="257.03903"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_6" y2="100.95873" x2="271.74902" y1="100.95873" x1="257.0874"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_5" y2="98.128" x2="271.74902" y1="98.128" x1="257.0874"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_4" y2="95.24322" x2="271.75473" y1="95.24322" x1="257.09308"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_3" y2="92.41251" x2="271.8031" y1="92.41251" x1="257.14145"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_2" y2="89.47366" x2="271.84863" y1="89.47366" x1="257.18698"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_1" y2="86.85915" x2="271.79456" y1="86.85915" x1="257.1329"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_21" y2="147.99998" x2="271.01788" y1="147.99998" x1="256.35623"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_20" y2="145.76385" x2="271.05487" y1="145.76385" x1="256.39322"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_19" y2="143.2034" x2="271.11462" y1="143.2034" x1="256.45297"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_18" y2="140.31862" x2="271.08047" y1="140.31862" x1="256.41882"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_16" y2="128.83072" x2="271.5954" y1="128.83072" x1="256.93375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_15" y2="126.16499" x2="271.64664" y1="126.16499" x1="256.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_14" y2="123.3371" x2="271.69498" y1="123.3371" x1="257.03333"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_13" y2="120.44947" x2="271.6893" y1="120.44947" x1="257.02765"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_12" y2="117.72686" x2="271.69785" y1="117.72686" x1="257.03619"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_11" y2="115.11236" x2="271.71774" y1="115.11236" x1="257.05609"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_51" y2="232.27312" x2="271.23126" y1="232.27312" x1="256.56961"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_50" y2="229.394" x2="271.22272" y1="229.394" x1="256.56107"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_49" y2="226.61732" x2="271.21133" y1="226.61732" x1="256.54968"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_48" y2="223.7354" x2="271.28531" y1="223.7354" x1="256.62366"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_47" y2="220.90184" x2="271.26825" y1="220.90184" x1="256.6066"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_46" y2="218.12231" x2="271.28247" y1="218.12231" x1="256.62082"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_45" y2="215.34564" x2="271.32797" y1="215.34564" x1="256.66632"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_44" y2="212.56613" x2="271.33084" y1="212.56613" x1="256.66919"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_43" y2="209.7354" x2="271.37921" y1="209.7354" x1="256.71756"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_42" y2="206.85063" x2="271.33084" y1="206.85063" x1="256.66919"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_41" y2="204.07111" x2="271.4361" y1="204.07111" x1="256.77444"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_40" y2="201.24037" x2="271.48163" y1="201.24037" x1="256.81995"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_39" y2="198.46086" x2="271.42471" y1="198.46086" x1="256.76306"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_38" y2="195.89757" x2="271.4873" y1="195.89757" x1="256.82565"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_37" y2="193.064" x2="271.42758" y1="193.064" x1="256.7659"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_36" y2="190.12517" x2="271.3223" y1="190.12517" x1="256.66064"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_35" y2="187.24039" x2="271.21988" y1="187.24039" x1="256.55823"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_34" y2="184.3044" x2="271.12885" y1="184.3044" x1="256.46716"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_33" y2="181.47652" x2="271.11746" y1="181.47652" x1="256.45581"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_32" y2="178.64578" x2="271.2142" y1="178.64578" x1="256.55255"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_31" y2="175.70694" x2="271.17151" y1="175.70694" x1="256.50986"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_30" y2="172.87624" x2="271.06055" y1="172.87624" x1="256.3989"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_29" y2="170.09955" x2="271.01505" y1="170.09955" x1="256.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_28" y2="167.3172" x2="271.05771" y1="167.3172" x1="256.39606"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_27" y2="164.54338" x2="271.00934" y1="164.54338" x1="256.34769"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_26" y2="161.6586" x2="270.94962" y1="161.6586" x1="256.28793"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_25" y2="158.99287" x2="270.99796" y1="158.99287" x1="256.3363"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_24" y2="156.32715" x2="271.00934" y1="156.32715" x1="256.34769"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_23" y2="153.66144" x2="270.95245" y1="153.66144" x1="256.2908"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_22" y2="150.72261" x2="271.01505" y1="150.72261" x1="256.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_61" y2="259.50494" x2="271.24548" y1="259.50494" x1="256.58383"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_60" y2="257.04123" x2="271.17722" y1="257.04123" x1="256.51556"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_59" y2="254.31862" x2="271.21704" y1="254.31862" x1="256.55539"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_58" y2="251.92314" x2="271.28818" y1="251.92314" x1="256.6265"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_57" y2="249.14934" x2="271.38489" y1="249.14934" x1="256.72324"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_56" y2="246.37267" x2="271.38489" y1="246.37267" x1="256.72324"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_55" y2="243.53911" x2="271.33655" y1="243.53911" x1="256.67487"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_54" y2="240.81648" x2="271.38205" y1="240.81648" x1="256.7204"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_53" y2="237.9886" x2="271.38489" y1="237.9886" x1="256.72324"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="12_52" y2="235.15788" x2="271.33655" y1="235.15788" x1="256.67487"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_1" y2="86.69984" x2="289.59256" y1="86.69984" x1="274.93091"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_5" y2="97.92316" x2="289.5499" y1="97.92316" x1="274.88824"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_4" y2="95.20055" x2="289.6011" y1="95.20055" x1="274.93945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_3" y2="92.5263" x2="289.5954" y1="92.5263" x1="274.93375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_2" y2="89.53056" x2="289.5954" y1="89.53056" x1="274.93375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_7" y2="102.78519" x2="289.53851" y1="102.78519" x1="274.87686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_6" y2="100.11094" x2="289.48447" y1="100.11094" x1="274.82281"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_37" y2="193.59886" x2="289.3735" y1="193.59886" x1="274.71185"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_36" y2="190.66287" x2="289.33084" y1="190.66287" x1="274.66919"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_35" y2="187.83499" x2="289.31659" y1="187.83499" x1="274.65497"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_34" y2="185.0014" x2="289.37064" y1="185.0014" x1="274.70901"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_33" y2="182.22473" x2="289.37634" y1="182.22473" x1="274.71469"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_32" y2="179.33711" x2="289.36496" y1="179.33711" x1="274.70334"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_31" y2="176.45233" x2="289.32797" y1="176.45233" x1="274.66635"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_30" y2="173.61876" x2="289.31375" y1="173.61876" x1="274.6521"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_29" y2="170.8421" x2="289.27393" y1="170.8421" x1="274.61227"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_28" y2="167.95732" x2="289.32797" y1="167.95732" x1="274.66635"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_27" y2="165.23755" x2="289.27963" y1="165.23755" x1="274.61798"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_26" y2="162.51492" x2="289.32797" y1="162.51492" x1="274.66635"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_25" y2="159.68419" x2="289.31375" y1="159.68419" x1="274.6521"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_24" y2="157.0128" x2="289.32513" y1="157.0128" x1="274.66348"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_23" y2="154.34137" x2="289.3735" y1="154.34137" x1="274.71185"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_22" y2="151.51067" x2="289.32513" y1="151.51067" x1="274.66348"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_21" y2="148.62587" x2="289.37634" y1="148.62587" x1="274.71469"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_20" y2="146.06543" x2="289.33084" y1="146.06543" x1="274.66919"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_19" y2="143.3428" x2="289.43039" y1="143.3428" x1="274.76874"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_18" y2="140.6714" x2="289.59256" y1="140.6714" x1="274.93091"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_17" y2="137.89473" x2="289.54135" y1="137.89473" x1="274.8797"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_16" y2="135.064" x2="289.48447" y1="135.064" x1="274.82281"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_15" y2="132.18207" x2="289.54135" y1="132.18207" x1="274.8797"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_14" y2="129.30014" x2="289.64377" y1="129.30014" x1="274.98212"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_13" y2="126.36414" x2="289.58401" y1="126.36414" x1="274.92236"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_12" y2="123.4822" x2="289.6011" y1="123.4822" x1="274.93945"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_11" y2="120.60026" x2="289.59824" y1="120.60026" x1="274.93661"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_10" y2="117.93171" x2="289.65231" y1="117.93171" x1="274.99066"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_9" y2="115.20908" x2="289.64093" y1="115.20908" x1="274.97928"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_8" y2="112.75674" x2="289.54419" y1="112.75674" x1="274.88257"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_47" y2="221.84636" x2="289.38489" y1="221.84636" x1="274.72324"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_46" y2="218.95872" x2="289.49014" y1="218.95872" x1="274.82849"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_45" y2="216.23895" x2="289.52997" y1="216.23895" x1="274.86832"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_44" y2="213.35988" x2="289.49298" y1="213.35988" x1="274.83133"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_43" y2="210.52914" x2="289.43326" y1="210.52914" x1="274.77161"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_42" y2="207.64151" x2="289.49014" y1="207.64151" x1="274.82849"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_41" y2="204.75674" x2="289.5954" y1="204.75674" x1="274.93375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_40" y2="201.92601" x2="289.5954" y1="201.92601" x1="274.93375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_39" y2="199.25461" x2="289.43326" y1="199.25461" x1="274.77161"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_38" y2="196.31578" x2="289.43893" y1="196.31578" x1="274.77728"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_50" y2="230.33" x2="289.58972" y1="230.33" x1="274.92807"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_49" y2="227.55046" x2="289.54419" y1="227.55046" x1="274.88257"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_48" y2="224.67137" x2="289.38205" y1="224.67137" x1="274.7204"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="13_51" y2="233.2802" x2="289.47308" y1="233.2802" x1="274.81143"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_6" y2="101.6529" x2="308.86426" y1="101.6529" x1="294.20261"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_5" y2="98.71122" x2="308.86142" y1="98.71122" x1="294.19977"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_4" y2="95.77238" x2="308.96667" y1="95.77238" x1="294.30502"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_3" y2="92.94735" x2="308.96951" y1="92.94735" x1="294.30786"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_2" y2="90.06541" x2="308.96667" y1="90.06541" x1="294.30502"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_1" y2="87.34565" x2="308.90979" y1="87.34565" x1="294.24811"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_16" y2="138.10526" x2="309.01788" y1="138.10526" x1="294.35623"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_15" y2="135.16641" x2="309.01218" y1="135.16641" x1="294.35052"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_14" y2="132.23044" x2="308.95813" y1="132.23044" x1="294.29648"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_13" y2="129.3485" x2="309.01505" y1="129.3485" x1="294.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_12" y2="126.52061" x2="309.01505" y1="126.52061" x1="294.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_11" y2="123.52772" x2="309.07193" y1="123.52772" x1="294.41028"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_10" y2="120.69984" x2="309.01505" y1="120.69984" x1="294.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_9" y2="117.97723" x2="309.01505" y1="117.97723" x1="294.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_8" y2="115.41962" x2="309.1203" y1="115.41962" x1="294.45865"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_7" y2="113.34849" x2="309.14023" y1="113.34849" x1="294.47858"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_31" y2="180.93883" x2="308.961" y1="180.93883" x1="294.29935"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_30" y2="178.00284" x2="308.96667" y1="178.00284" x1="294.30502"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_29" y2="175.11522" x2="309.07477" y1="175.11522" x1="294.41312"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_28" y2="172.28448" x2="309.02356" y1="172.28448" x1="294.36191"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_27" y2="169.45375" x2="309.07477" y1="169.45375" x1="294.41312"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_26" y2="166.73114" x2="309.12601" y1="166.73114" x1="294.46432"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_25" y2="163.95163" x2="309.01788" y1="163.95163" x1="294.35623"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_24" y2="161.0697" x2="309.06909" y1="161.0697" x1="294.40744"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_23" y2="158.40683" x2="308.95813" y1="158.40683" x1="294.29648"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_22" y2="155.52489" x2="309.12314" y1="155.52489" x1="294.46149"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_21" y2="152.58606" x2="309.00934" y1="152.58606" x1="294.34769"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_20" y2="149.70128" x2="309.01505" y1="149.70128" x1="294.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_19" y2="146.76244" x2="309.12314" y1="146.76244" x1="294.46149"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_18" y2="143.98291" x2="309.17719" y1="143.98291" x1="294.51556"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_17" y2="141.0441" x2="309.12314" y1="141.0441" x1="294.46149"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_41" y2="209.5192" x2="308.92114" y1="209.5192" x1="294.25949"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_40" y2="206.74536" x2="308.91547" y1="206.74536" x1="294.25381"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_39" y2="203.96869" x2="308.90979" y1="203.96869" x1="294.24811"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_38" y2="201.13797" x2="308.86142" y1="201.13797" x1="294.19977"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_37" y2="198.30725" x2="308.90979" y1="198.30725" x1="294.24811"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_36" y2="195.31436" x2="308.85855" y1="195.31436" x1="294.1969"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_35" y2="192.48363" x2="308.86142" y1="192.48363" x1="294.19977"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_34" y2="189.65291" x2="308.91263" y1="189.65291" x1="294.25098"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_33" y2="186.76813" x2="308.90692" y1="186.76813" x1="294.24527"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_32" y2="183.82646" x2="308.90692" y1="183.82646" x1="294.24527"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_46" y2="223.78377" x2="308.91547" y1="223.78377" x1="294.25381"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_45" y2="220.95305" x2="308.96384" y1="220.95305" x1="294.30219"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_44" y2="218.06827" x2="308.91263" y1="218.06827" x1="294.25098"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_43" y2="215.2916" x2="308.96667" y1="215.2916" x1="294.30502"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="14_42" y2="212.40683" x2="308.91263" y1="212.40683" x1="294.25098"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_5" y2="99.03269" x2="327.39627" y1="99.03269" x1="312.73462"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_4" y2="96.0967" x2="327.29099" y1="96.0967" x1="312.62936"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_3" y2="93.15788" x2="327.39343" y1="93.15788" x1="312.73178"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_2" y2="90.27309" x2="327.39056" y1="90.27309" x1="312.72891"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_1" y2="87.44521" x2="327.33652" y1="87.44521" x1="312.67487"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_6" y2="101.85488" x2="327.28247" y1="101.85488" x1="312.62082"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_7" y2="113.05831" x2="327.64377" y1="113.05831" x1="312.98212"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_36" y2="196.33569" x2="327.64377" y1="196.33569" x1="312.98212"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_35" y2="193.4509" x2="327.64661" y1="193.4509" x1="312.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_34" y2="190.56613" x2="327.64948" y1="190.56613" x1="312.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_33" y2="187.68135" x2="327.65231" y1="187.68135" x1="312.99066"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_32" y2="184.79657" x2="327.64948" y1="184.79657" x1="312.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_31" y2="181.90895" x2="327.64093" y1="181.90895" x1="312.97928"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_30" y2="179.12944" x2="327.64377" y1="179.12944" x1="312.98212"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_29" y2="176.24181" x2="327.70352" y1="176.24181" x1="313.04187"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_28" y2="173.30014" x2="327.64948" y1="173.30014" x1="312.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_27" y2="170.41534" x2="327.58972" y1="170.41534" x1="312.92807"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_26" y2="167.47652" x2="327.59824" y1="167.47652" x1="312.93661"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_25" y2="164.59175" x2="327.53851" y1="164.59175" x1="312.87686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_24" y2="161.65575" x2="327.53851" y1="161.65575" x1="312.87686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_23" y2="158.87909" x2="327.53568" y1="158.87909" x1="312.87402"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_22" y2="156.1593" x2="327.59256" y1="156.1593" x1="312.93091"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_21" y2="153.27452" x2="327.53851" y1="153.27452" x1="312.87686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_20" y2="150.39259" x2="327.53851" y1="150.39259" x1="312.87686"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_19" y2="147.51065" x2="327.64661" y1="147.51065" x1="312.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_18" y2="144.62871" x2="327.64661" y1="144.62871" x1="312.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_17" y2="141.63583" x2="327.5954" y1="141.63583" x1="312.93375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_16" y2="138.69701" x2="327.64377" y1="138.69701" x1="312.98212"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_15" y2="135.75816" x2="327.64948" y1="135.75816" x1="312.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_14" y2="132.98434" x2="327.54135" y1="132.98434" x1="312.8797"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_13" y2="130.04265" x2="327.64661" y1="130.04265" x1="312.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_12" y2="127.15788" x2="327.75189" y1="127.15788" x1="313.09024"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_11" y2="124.43526" x2="327.70068" y1="124.43526" x1="313.039"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_10" y2="121.55332" x2="327.70068" y1="121.55332" x1="313.039"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_9" y2="118.82502" x2="327.70068" y1="118.82502" x1="313.039"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_8" y2="115.94309" x2="327.70068" y1="115.94309" x1="313.039"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_42" y2="213.69557" x2="327.64661" y1="213.69557" x1="312.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_41" y2="210.81079" x2="327.64661" y1="210.81079" x1="312.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_40" y2="207.92601" x2="327.54135" y1="207.92601" x1="312.8797"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_39" y2="205.04124" x2="327.54135" y1="205.04124" x1="312.8797"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_38" y2="202.15646" x2="327.58972" y1="202.15646" x1="312.92807"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_37" y2="199.21762" x2="327.64661" y1="199.21762" x1="312.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="15_43" y2="216.52345" x2="327.5954" y1="216.52345" x1="312.93375"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_1" y2="87.06683" x2="345.97379" y1="87.06683" x1="331.31213"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_10" y2="112.92744" x2="345.81161" y1="112.92744" x1="331.14996"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_9" y2="109.99145" x2="345.86285" y1="109.99145" x1="331.20117"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_8" y2="107.10667" x2="345.9169" y1="107.10667" x1="331.25522"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_7" y2="104.16784" x2="345.91974" y1="104.16784" x1="331.25809"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_6" y2="101.3371" x2="345.97095" y1="101.3371" x1="331.30927"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_5" y2="98.39544" x2="345.97095" y1="98.39544" x1="331.30927"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_4" y2="95.45375" x2="345.97379" y1="95.45375" x1="331.31213"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_3" y2="92.67424" x2="345.9169" y1="92.67424" x1="331.25522"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_2" y2="89.94877" x2="345.97095" y1="89.94877" x1="331.30927"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_15" y2="127.02132" x2="345.74902" y1="127.02132" x1="331.08737"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_14" y2="124.13654" x2="345.80594" y1="124.13654" x1="331.14429"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_13" y2="121.35703" x2="345.85999" y1="121.35703" x1="331.19833"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_12" y2="118.47509" x2="345.87137" y1="118.47509" x1="331.20972"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_11" y2="115.86343" x2="345.85431" y1="115.86343" x1="331.19263"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_16" y2="129.90042" x2="345.74902" y1="129.90042" x1="331.08737"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_32" y2="185.46515" x2="346.12173" y1="185.46515" x1="331.46008"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_31" y2="182.58035" x2="346.07053" y1="182.58035" x1="331.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_30" y2="179.64153" x2="346.06482" y1="179.64153" x1="331.40317"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_29" y2="176.70268" x2="346.06482" y1="176.70268" x1="331.40317"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_28" y2="173.81792" x2="346.06766" y1="173.81792" x1="331.40601"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_27" y2="170.82503" x2="346.12173" y1="170.82503" x1="331.46008"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_26" y2="167.8862" x2="346.00793" y1="167.8862" x1="331.34628"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_25" y2="164.94736" x2="346.01645" y1="164.94736" x1="331.3548"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_24" y2="162.22473" x2="346.07053" y1="162.22473" x1="331.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_23" y2="159.3428" x2="346.01361" y1="159.3428" x1="331.35196"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_22" y2="156.45804" x2="346.06766" y1="156.45804" x1="331.40601"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_21" y2="153.5192" x2="346.17294" y1="153.5192" x1="331.51129"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_20" y2="150.74252" x2="346.07053" y1="150.74252" x1="331.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_19" y2="147.85774" x2="345.95956" y1="147.85774" x1="331.29791"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_18" y2="145.08107" x2="346.01645" y1="145.08107" x1="331.3548"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_33" y2="188.40681" x2="346.17294" y1="188.40681" x1="331.51129"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_37" y2="200.05121" x2="346.07053" y1="200.05121" x1="331.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_36" y2="197.22047" x2="346.12741" y1="197.22047" x1="331.46576"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_35" y2="194.28163" x2="346.17862" y1="194.28163" x1="331.51697"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_34" y2="191.3428" x2="346.17578" y1="191.3428" x1="331.51413"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_39" y2="205.6586" x2="346.01361" y1="205.6586" x1="331.35196"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_38" y2="202.87909" x2="346.07053" y1="202.87909" x1="331.40887"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="16_40" y2="208.33" x2="346.01929" y1="208.33" x1="331.35764"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_1" y2="86.64008" x2="364.6452" y1="86.64008" x1="349.98355"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_10" y2="112.31577" x2="364.59399" y1="112.31577" x1="349.93234"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_9" y2="109.5704" x2="364.49442" y1="109.5704" x1="349.83276"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_8" y2="106.67992" x2="364.44321" y1="106.67992" x1="349.78156"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_7" y2="103.90325" x2="364.65088" y1="103.90325" x1="349.98923"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_6" y2="101.01847" x2="364.70779" y1="101.01847" x1="350.04614"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_5" y2="98.07964" x2="364.69925" y1="98.07964" x1="350.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_4" y2="95.24607" x2="364.64804" y1="95.24607" x1="349.98639"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_3" y2="92.30439" x2="364.59113" y1="92.30439" x1="349.92947"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_2" y2="89.52772" x2="364.53708" y1="89.52772" x1="349.87543"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_25" y2="161.20909" x2="364.32941" y1="161.20909" x1="349.66776"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_24" y2="158.37837" x2="364.22131" y1="158.37837" x1="349.55966"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_23" y2="155.49359" x2="364.43182" y1="155.49359" x1="349.77017"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_22" y2="152.49785" x2="364.33224" y1="152.49785" x1="349.67059"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_21" y2="149.55618" x2="364.22415" y1="149.55618" x1="349.5625"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_20" y2="146.6714" x2="364.17294" y1="146.6714" x1="349.51129"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_19" y2="143.73256" x2="364.22131" y1="143.73256" x1="349.55966"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_18" y2="140.90184" x2="364.33224" y1="140.90184" x1="349.67059"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_17" y2="137.90895" x2="364.43466" y1="137.90895" x1="349.77301"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_16" y2="135.02701" x2="364.38062" y1="135.02701" x1="349.71896"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_15" y2="132.08818" x2="364.38345" y1="132.08818" x1="349.7218"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_14" y2="129.14935" x2="364.33224" y1="129.14935" x1="349.67059"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_13" y2="126.2105" x2="364.32941" y1="126.2105" x1="349.66776"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_12" y2="123.70127" x2="364.2782" y1="123.70127" x1="349.61655"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_11" y2="120.70838" x2="364.33224" y1="120.70838" x1="349.67059"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_33" y2="184.35559" x2="364.28104" y1="184.35559" x1="349.61938"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_32" y2="181.46513" x2="364.33795" y1="181.46513" x1="349.6763"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_31" y2="178.63156" x2="364.34079" y1="178.63156" x1="349.67914"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_30" y2="175.68988" x2="364.33795" y1="175.68988" x1="349.6763"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_29" y2="172.8051" x2="364.28104" y1="172.8051" x1="349.61938"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_28" y2="169.91748" x2="364.28391" y1="169.91748" x1="349.62225"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_27" y2="166.97864" x2="364.28104" y1="166.97864" x1="349.61938"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_26" y2="164.14792" x2="364.2782" y1="164.14792" x1="349.61655"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_35" y2="190.17636" x2="364.28104" y1="190.17636" x1="349.61938"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="17_34" y2="187.29443" x2="364.37778" y1="187.29443" x1="349.71609"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_5" y2="98.22187" x2="383.02356" y1="98.22187" x1="368.36191"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_4" y2="95.394" x2="383.12314" y1="95.394" x1="368.46149"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_3" y2="92.56612" x2="383.07193" y1="92.56612" x1="368.41028"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_2" y2="89.68419" x2="383.01505" y1="89.68419" x1="368.35339"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_1" y2="86.91035" x2="382.961" y1="86.91035" x1="368.29932"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_6" y2="100.9445" x2="383.01788" y1="100.9445" x1="368.35623"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_7" y2="103.76101" x2="383.02356" y1="103.76101" x1="368.36191"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_8" y2="112.04264" x2="382.86996" y1="112.04264" x1="368.20828"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_22" y2="152.30156" x2="383.12314" y1="152.30156" x1="368.46149"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_21" y2="149.36557" x2="382.96951" y1="149.36557" x1="368.30786"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_20" y2="146.5889" x2="382.90692" y1="146.5889" x1="368.24527"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_19" y2="143.70126" x2="382.80167" y1="143.70126" x1="368.14001"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_18" y2="140.87338" x2="382.81021" y1="140.87338" x1="368.14856"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_17" y2="137.93454" x2="382.85287" y1="137.93454" x1="368.19122"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_16" y2="135.16072" x2="382.75613" y1="135.16072" x1="368.09448"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_15" y2="132.27878" x2="382.69925" y1="132.27878" x1="368.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_14" y2="129.39116" x2="382.76184" y1="129.39116" x1="368.10019"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_13" y2="126.50637" x2="382.81589" y1="126.50637" x1="368.15424"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_12" y2="123.62444" x2="382.8671" y1="123.62444" x1="368.20544"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_11" y2="120.73966" x2="382.86996" y1="120.73966" x1="368.20828"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_10" y2="117.85773" x2="382.87277" y1="117.85773" x1="368.21112"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_9" y2="114.92175" x2="382.81589" y1="114.92175" x1="368.15424"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_32" y2="181.3485" x2="383.16867" y1="181.3485" x1="368.50702"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_31" y2="178.40967" x2="383.06339" y1="178.40967" x1="368.40176"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_30" y2="175.41963" x2="383.16583" y1="175.41963" x1="368.50418"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_29" y2="172.53769" x2="383.00366" y1="172.53769" x1="368.34201"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_28" y2="169.59886" x2="383.16867" y1="169.59886" x1="368.50702"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_27" y2="166.77098" x2="383.01218" y1="166.77098" x1="368.35052"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_26" y2="163.83214" x2="383.06625" y1="163.83214" x1="368.4046"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_25" y2="160.95021" x2="383.06055" y1="160.95021" x1="368.3989"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_24" y2="158.06827" x2="383.10608" y1="158.06827" x1="368.44443"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_23" y2="155.12944" x2="383.11462" y1="155.12944" x1="368.45294"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="18_33" y2="184.28732" x2="383.22556" y1="184.28732" x1="368.5639"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_10" y2="112.58035" x2="401.29099" y1="112.58035" x1="386.62936"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_9" y2="109.64437" x2="401.3479" y1="109.64437" x1="386.68625"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_8" y2="106.81933" x2="401.44177" y1="106.81933" x1="386.78012"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_7" y2="103.99145" x2="401.5072" y1="103.99145" x1="386.84555"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_6" y2="101.11236" x2="401.44748" y1="101.11236" x1="386.7858"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_5" y2="98.12516" x2="401.44177" y1="98.12516" x1="386.78012"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_4" y2="95.13796" x2="401.44461" y1="95.13796" x1="386.78296"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_3" y2="92.25317" x2="401.49869" y1="92.25317" x1="386.83704"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_2" y2="89.37125" x2="401.54419" y1="89.37125" x1="386.88254"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_1" y2="86.4893" x2="401.49014" y1="86.4893" x1="386.82849"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_12" y2="118.51206" x2="401.29099" y1="118.51206" x1="386.62936"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_11" y2="115.51633" x2="401.29099" y1="115.51633" x1="386.62936"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_23" y2="156.15361" x2="401.64661" y1="156.15361" x1="386.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_22" y2="153.21477" x2="401.54135" y1="153.21477" x1="386.8797"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_21" y2="150.27878" x2="401.4873" y1="150.27878" x1="386.82565"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_20" y2="147.45375" x2="401.38489" y1="147.45375" x1="386.72321"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_19" y2="144.51778" x2="401.54135" y1="144.51778" x1="386.8797"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_18" y2="141.57893" x2="401.38773" y1="141.57893" x1="386.72607"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_17" y2="138.6913" x2="401.32797" y1="138.6913" x1="386.66632"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_16" y2="135.80368" x2="401.38773" y1="135.80368" x1="386.72607"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_15" y2="133.02417" x2="401.43893" y1="133.02417" x1="386.77728"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_14" y2="130.19345" x2="401.39056" y1="130.19345" x1="386.72891"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_28" y2="170.99858" x2="401.64948" y1="170.99858" x1="386.98782"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_27" y2="168.00851" x2="401.59824" y1="168.00851" x1="386.93661"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_26" y2="165.07254" x2="401.64661" y1="165.07254" x1="386.98495"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_25" y2="162.08249" x2="401.64377" y1="162.08249" x1="386.98212"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="19_24" y2="159.09244" x2="401.70068" y1="159.09244" x1="387.039"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_10" y2="112.61164" x2="420.49155" y1="112.61164" x1="405.8299"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_9" y2="109.78661" x2="420.48587" y1="109.78661" x1="405.82422"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_8" y2="106.84777" x2="420.43182" y1="106.84777" x1="405.77017"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_7" y2="103.85204" x2="420.39197" y1="103.85204" x1="405.73032"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_6" y2="101.02132" x2="420.44318" y1="101.02132" x1="405.78156"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_5" y2="98.08248" x2="420.44318" y1="98.08248" x1="405.78156"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_4" y2="95.1408" x2="420.59967" y1="95.1408" x1="405.93802"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_3" y2="92.36129" x2="420.70209" y1="92.36129" x1="406.04044"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_2" y2="89.47651" x2="420.75613" y1="89.47651" x1="406.09448"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_1" y2="86.69983" x2="420.71063" y1="86.69983" x1="406.04895"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_11" y2="115.50211" x2="420.44034" y1="115.50211" x1="405.77869"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_12" y2="118.45516" x2="420.33224" y1="118.45516" x1="405.67059"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_22" y2="153.52203" x2="420.0705" y1="153.52203" x1="405.40884"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_21" y2="150.58319" x2="420.12457" y1="150.58319" x1="405.46289"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_20" y2="147.64436" x2="420.1217" y1="147.64436" x1="405.46005"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_19" y2="144.75958" x2="420.1217" y1="144.75958" x1="405.46005"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_18" y2="141.8748" x2="420.17291" y1="141.8748" x1="405.51126"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_17" y2="138.93597" x2="420.18146" y1="138.93597" x1="405.51981"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_16" y2="136.10524" x2="420.17291" y1="136.10524" x1="405.51126"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_15" y2="133.21762" x2="420.17291" y1="133.21762" x1="405.51126"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_14" y2="130.3869" x2="420.17291" y1="130.3869" x1="405.51126"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_13" y2="127.77523" x2="420.27533" y1="127.77523" x1="405.61368"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_27" y2="167.99998" x2="419.9567" y1="167.99998" x1="405.29504"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_26" y2="165.06114" x2="419.95956" y1="165.06114" x1="405.29791"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_25" y2="162.06825" x2="420.06198" y1="162.06825" x1="405.4003"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_24" y2="159.18349" x2="420.05627" y1="159.18349" x1="405.39462"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_23" y2="156.29871" x2="420.05914" y1="156.29871" x1="405.39749"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="20_28" y2="170.90468" x2="419.89413" y1="170.90468" x1="405.23248"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_5" y2="97.56185" x2="438.90976" y1="97.56185" x1="424.24811"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_4" y2="94.72829" x2="439.00934" y1="94.72829" x1="424.34769"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_3" y2="92.11092" x2="438.96667" y1="92.11092" x1="424.30502"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_2" y2="89.27451" x2="438.95813" y1="89.27451" x1="424.29648"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_1" y2="86.44095" x2="438.89838" y1="86.44095" x1="424.23672"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_15" y2="130.93028" x2="438.69925" y1="130.93028" x1="424.03757"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_14" y2="128.09955" x2="438.80734" y1="128.09955" x1="424.14569"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_13" y2="125.16071" x2="438.70493" y1="125.16071" x1="424.04327"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_12" y2="122.22187" x2="438.85287" y1="122.22187" x1="424.19122"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_11" y2="119.28304" x2="438.85571" y1="119.28304" x1="424.19406"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_10" y2="116.29301" x2="438.69925" y1="116.29301" x1="424.03757"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_9" y2="113.35418" x2="438.8045" y1="113.35418" x1="424.14285"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_8" y2="110.57465" x2="438.69925" y1="110.57465" x1="424.03757"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_7" y2="107.68987" x2="438.65088" y1="107.68987" x1="423.98923"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_6" y2="104.70267" x2="438.60251" y1="104.70267" x1="423.94086"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_20" y2="145.35419" x2="438.53424" y1="145.35419" x1="423.87259"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_19" y2="142.46941" x2="438.6395" y1="142.46941" x1="423.97784"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_18" y2="139.63867" x2="438.60818" y1="139.63867" x1="423.94653"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_17" y2="136.70268" x2="438.65656" y1="136.70268" x1="423.9949"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="21_16" y2="133.86911" x2="438.59683" y1="133.86911" x1="423.93518"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_5" y2="97.33141" x2="458.40051" y1="97.33141" x1="443.73886"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_4" y2="94.93597" x2="458.39197" y1="94.93597" x1="443.73032"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_3" y2="92.21051" x2="458.39197" y1="92.21051" x1="443.73032"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_2" y2="89.21477" x2="458.34076" y1="89.21477" x1="443.67911"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_1" y2="86.54052" x2="458.28671" y1="86.54052" x1="443.62506"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_15" y2="133.60168" x2="457.81732" y1="133.60168" x1="443.15564"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_14" y2="130.5576" x2="457.91687" y1="130.5576" x1="443.25522"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_13" y2="127.62159" x2="457.91119" y1="127.62159" x1="443.24954"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_12" y2="124.63155" x2="457.86566" y1="124.63155" x1="443.20401"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_11" y2="121.75246" x2="457.86282" y1="121.75246" x1="443.20117"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_10" y2="119.08675" x2="457.91687" y1="119.08675" x1="443.25522"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_9" y2="116.0967" x2="457.90549" y1="116.0967" x1="443.24384"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_8" y2="113.21192" x2="457.96808" y1="113.21192" x1="443.30643"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_7" y2="110.27309" x2="457.96524" y1="110.27309" x1="443.30359"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_6" y2="107.54763" x2="457.85999" y1="107.54763" x1="443.19833"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_20" y2="148.17352" x2="457.80878" y1="148.17352" x1="443.14713"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_19" y2="145.18347" x2="457.90265" y1="145.18347" x1="443.241"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_18" y2="142.30154" x2="457.85999" y1="142.30154" x1="443.19833"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_17" y2="139.47083" x2="457.80878" y1="139.47083" x1="443.14713"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_16" y2="136.48077" x2="457.80878" y1="136.48077" x1="443.14713"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="22_21" y2="151.05547" x2="457.75473" y1="151.05547" x1="443.09305"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_1" y2="87.92032" x2="476.43466" y1="87.92032" x1="461.77301"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_15" y2="128.39258" x2="476.4375" y1="128.39258" x1="461.77585"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_14" y2="125.45943" x2="476.49155" y1="125.45943" x1="461.8299"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_13" y2="122.58035" x2="476.60535" y1="122.58035" x1="461.9437"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_12" y2="119.58462" x2="476.59683" y1="119.58462" x1="461.93518"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_11" y2="116.64863" x2="476.5513" y1="116.64863" x1="461.88965"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_10" y2="113.7667" x2="476.44034" y1="113.7667" x1="461.77869"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_9" y2="110.8876" x2="476.5513" y1="110.8876" x1="461.88965"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_8" y2="108.00851" x2="476.54276" y1="108.00851" x1="461.8811"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_7" y2="105.12373" x2="476.43466" y1="105.12373" x1="461.77301"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_6" y2="102.24465" x2="476.38629" y1="102.24465" x1="461.72464"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_5" y2="99.30581" x2="476.38913" y1="99.30581" x1="461.72748"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_4" y2="96.42103" x2="476.48871" y1="96.42103" x1="461.82706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_3" y2="93.74963" x2="476.38345" y1="93.74963" x1="461.7218"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_2" y2="90.862" x2="476.38345" y1="90.862" x1="461.7218"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_25" y2="157.43384" x2="476.28387" y1="157.43384" x1="461.62222"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_24" y2="154.5007" x2="476.28671" y1="154.5007" x1="461.62506"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_23" y2="151.61876" x2="476.43466" y1="151.61876" x1="461.77301"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_22" y2="148.73398" x2="476.32654" y1="148.73398" x1="461.66489"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_21" y2="145.7923" x2="476.22128" y1="145.7923" x1="461.55963"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_20" y2="142.91037" x2="476.21844" y1="142.91037" x1="461.55679"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_19" y2="139.97438" x2="476.27533" y1="139.97438" x1="461.61368"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_18" y2="137.03554" x2="476.43466" y1="137.03554" x1="461.77301"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_17" y2="134.26457" x2="476.37775" y1="134.26457" x1="461.71609"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_16" y2="131.38263" x2="476.38345" y1="131.38263" x1="461.7218"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_53" y2="245.56755" x2="476.27533" y1="245.56755" x1="461.61368"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_52" y2="242.78804" x2="476.27533" y1="242.78804" x1="461.61368"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_51" y2="239.95732" x2="476.33224" y1="239.95732" x1="461.67059"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_50" y2="237.12657" x2="476.38345" y1="237.12657" x1="461.7218"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_49" y2="234.23897" x2="476.4375" y1="234.23897" x1="461.77585"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_48" y2="231.25175" x2="476.48587" y1="231.25175" x1="461.82422"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_47" y2="228.42104" x2="476.43182" y1="228.42104" x1="461.77017"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_46" y2="225.48219" x2="476.48303" y1="225.48219" x1="461.82135"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_45" y2="222.54338" x2="476.43182" y1="222.54338" x1="461.77017"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_44" y2="219.71265" x2="476.53992" y1="219.71265" x1="461.87827"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_43" y2="216.77382" x2="476.38062" y1="216.77382" x1="461.71896"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_42" y2="213.94308" x2="476.48871" y1="213.94308" x1="461.82706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_41" y2="210.95021" x2="476.49442" y1="210.95021" x1="461.83276"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_40" y2="208.01421" x2="476.54562" y1="208.01421" x1="461.88394"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_39" y2="205.07538" x2="476.49155" y1="205.07538" x1="461.8299"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_38" y2="202.08533" x2="476.48871" y1="202.08533" x1="461.82706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_37" y2="199.09529" x2="476.48587" y1="199.09529" x1="461.82422"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_36" y2="196.1593" x2="476.48871" y1="196.1593" x1="461.82706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_35" y2="193.33426" x2="476.48587" y1="193.33426" x1="461.82422"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_34" y2="190.45517" x2="476.42896" y1="190.45517" x1="461.7673"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_33" y2="187.57608" x2="476.48871" y1="187.57608" x1="461.82706"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_32" y2="184.64294" x2="476.49442" y1="184.64294" x1="461.83276"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_31" y2="181.75816" x2="476.43466" y1="181.75816" x1="461.77301"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_30" y2="178.98434" x2="476.43466" y1="178.98434" x1="461.77301"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_29" y2="176.05119" x2="476.42612" y1="176.05119" x1="461.76447"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_63" y2="274.64578" x2="476.11319" y1="274.64578" x1="461.45151"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_62" y2="271.76382" x2="476.21844" y1="271.76382" x1="461.55679"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_61" y2="268.93594" x2="476.17007" y1="268.93594" x1="461.50842"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_60" y2="265.99997" x2="476.22415" y1="265.99997" x1="461.56247"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_59" y2="263.06396" x2="476.17007" y1="263.06396" x1="461.50842"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_58" y2="260.13083" x2="476.2782" y1="260.13083" x1="461.61652"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_57" y2="257.19769" x2="476.27533" y1="257.19769" x1="461.61368"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_56" y2="254.31862" x2="476.17007" y1="254.31862" x1="461.50842"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_55" y2="251.38261" x2="476.17007" y1="251.38261" x1="461.50842"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_54" y2="248.50352" x2="476.11603" y1="248.50352" x1="461.45438"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_68" y2="289.26312" x2="476.12741" y1="289.26312" x1="461.46576"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_67" y2="286.33282" x2="476.18146" y1="286.33282" x1="461.51981"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_66" y2="283.45374" x2="476.13593" y1="283.45374" x1="461.47427"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_65" y2="280.51776" x2="476.01361" y1="280.51776" x1="461.35196"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_64" y2="277.58176" x2="476.06766" y1="277.58176" x1="461.40601"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_69" y2="292.15076" x2="476.17578" y1="292.15076" x1="461.51413"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="x_70" y2="295.04691" x2="476.17007" y1="295.04691" x1="461.50842"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_5" y2="97.62444" x2="494.28674" y1="97.62444" x1="479.62506"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_4" y2="95.1465" x2="494.39484" y1="95.1465" x1="479.73318"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_3" y2="92.51492" x2="494.44891" y1="92.51492" x1="479.78723"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_2" y2="89.6842" x2="494.38916" y1="89.6842" x1="479.72751"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_1" y2="86.74535" x2="494.38062" y1="86.74535" x1="479.71896"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_20" y2="145.35419" x2="494.8045" y1="145.35419" x1="480.14285"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_19" y2="142.52631" x2="494.8045" y1="142.52631" x1="480.14285"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_18" y2="139.59032" x2="494.85855" y1="139.59032" x1="480.1969"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_17" y2="136.60028" x2="494.75046" y1="136.60028" x1="480.08881"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_16" y2="133.72119" x2="494.69641" y1="133.72119" x1="480.03476"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_15" y2="130.78235" x2="494.64804" y1="130.78235" x1="479.98639"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_14" y2="127.89756" x2="494.65088" y1="127.89756" x1="479.98923"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_13" y2="124.95873" x2="494.70493" y1="124.95873" x1="480.0433"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_12" y2="122.02274" x2="494.64804" y1="122.02274" x1="479.98639"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_11" y2="119.19486" x2="494.69925" y1="119.19486" x1="480.0376"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_10" y2="116.25318" x2="494.70779" y1="116.25318" x1="480.04614"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_9" y2="113.26313" x2="494.76184" y1="113.26313" x1="480.10019"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_8" y2="110.43241" x2="494.70209" y1="110.43241" x1="480.04044"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_7" y2="107.55048" x2="494.70779" y1="107.55048" x1="480.04614"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_6" y2="104.55474" x2="494.54562" y1="104.55474" x1="479.88397"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_25" y2="159.66144" x2="495.01218" y1="159.66144" x1="480.35052"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_24" y2="156.83356" x2="494.95813" y1="156.83356" x1="480.29648"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_23" y2="153.89757" x2="494.90979" y1="153.89757" x1="480.24811"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_22" y2="151.1209" x2="494.85004" y1="151.1209" x1="480.18839"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  id="y_21" y2="148.23611" x2="494.95813" y1="148.23611" x1="480.29648"     stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="429.99997" x2="67.30543" y1="429.99997" x1="51.59114"     id="1_117" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="432.931" x2="67.27095" y1="432.931" x1="51.55666"     id="1_118" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="438.75858" x2="67.23646" y1="438.75858" x1="51.52217"     id="1_120" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="435.86203" x2="67.20198" y1="435.86203" x1="51.48769"     id="1_119" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="441.68961" x2="67.23646" y1="441.68961" x1="51.52217"     id="1_121" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="256.44824" x2="67.3744" y1="256.44824" x1="51.66011"     id="1_60" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="211.68748" x2="85.33084" y1="211.68748" x1="70.66918"     id="2_44" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="214.56248" x2="85.20584" y1="214.56248" x1="70.54418"     id="2_45" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="430.93747" x2="85.14334" y1="430.93747" x1="70.48169"     id="2_117" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="427.99997" x2="85.14334" y1="427.99997" x1="70.48169"     id="2_116" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="425.06247" x2="85.14334" y1="425.06247" x1="70.48169"     id="2_115" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="436.37497" x2="85.01834" y1="436.37497" x1="70.35669"     id="2_119" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="433.81247" x2="85.14334" y1="433.81247" x1="70.48169"     id="2_118" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="210.59456" x2="103.6011" y1="210.59456" x1="88.93946"     id="3_38" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="207.94591" x2="103.6011" y1="207.94591" x1="88.93946"     id="3_37" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="371.18915" x2="103.6011" y1="371.18915" x1="88.93945"     id="3_91" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="368.37836" x2="103.65516" y1="368.37836" x1="88.99351"     id="3_90" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="365.56754" x2="103.70921" y1="365.56754" x1="89.04756"     id="3_89" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="373.94592" x2="103.6011" y1="373.94592" x1="88.93945"     id="3_92" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="153.13513" x2="121.97948" y1="153.13513" x1="107.31783"     id="4_24" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="359.78378" x2="122.95245" y1="359.78378" x1="108.29079"     id="4_93" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="356.91888" x2="123.00651" y1="356.91888" x1="108.34486"     id="4_92" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="354.05405" x2="123.00651" y1="354.05405" x1="108.34486"     id="4_91" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="351.08105" x2="122.8984" y1="351.08105" x1="108.23675"     id="4_90" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="362.10809" x2="122.8984" y1="362.10809" x1="108.23675"     id="4_94" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="150" x2="141.33083" y1="150" x1="126.66917"     id="5_23" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="346.97296" x2="141.43893" y1="346.97296" x1="126.77729"     id="5_90" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="344.10809" x2="141.54706" y1="344.10809" x1="126.8854"     id="5_89" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="341.18918" x2="141.6011" y1="341.18918" x1="126.93945"     id="5_88" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="338.32431" x2="141.493" y1="338.32431" x1="126.83134"     id="5_87" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="335.45944" x2="141.43893" y1="335.45944" x1="126.77729"     id="5_86" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="332.70267" x2="141.54706" y1="332.70267" x1="126.8854"     id="5_85" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="167.62161" x2="160.0876" y1="167.62161" x1="145.42593"     id="6_29" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="161.94594" x2="160.0876" y1="161.94594" x1="145.42593"     id="6_27" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="164.81081" x2="160.0876" y1="164.81081" x1="145.42593"     id="6_28" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="331.35132" x2="160.68219" y1="331.35132" x1="146.02054"     id="6_84" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="328.4324" x2="160.62813" y1="328.4324" x1="145.96648"     id="6_83" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="325.56754" x2="160.52002" y1="325.56754" x1="145.85837"     id="6_82" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="322.70267" x2="160.41193" y1="322.70267" x1="145.75027"     id="6_81" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="319.89188" x2="160.41193" y1="319.89188" x1="145.75027"     id="6_80" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="317.13513" x2="160.41193" y1="317.13513" x1="145.75027"     id="6_79" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="163.56758" x2="178.68219" y1="163.56758" x1="164.02054"     id="7_28" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="160.86487" x2="178.68219" y1="160.86487" x1="164.02054"     id="7_27" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="165.78378" x2="178.68219" y1="165.78378" x1="164.02054"     id="7_29" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="311.08105" x2="178.7903" y1="311.08105" x1="164.12865"     id="7_78" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="308.21619" x2="178.73625" y1="308.21619" x1="164.0746"     id="7_77" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="305.45944" x2="178.7903" y1="305.45944" x1="164.12865"     id="7_76" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="302.54053" x2="178.68219" y1="302.54053" x1="164.02054"     id="7_75" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="313.94592" x2="178.7903" y1="313.94592" x1="164.12865"     id="7_79" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="144.48648" x2="197.38489" y1="144.48648" x1="182.72324"     id="8_21" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="146.27028" x2="197.27678" y1="146.27028" x1="182.61514"     id="8_22" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="295.51349" x2="197.11461" y1="295.51349" x1="182.45297"     id="8_72" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="292.54053" x2="197.11461" y1="292.54053" x1="182.45297"     id="8_71" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="289.62161" x2="197.11461" y1="289.62161" x1="182.45297"     id="8_70" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="286.7027" x2="197.16867" y1="286.7027" x1="182.50702"     id="8_69" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="283.78378" x2="197.11461" y1="283.78378" x1="182.45297"     id="8_68" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="149.94594" x2="215.65515" y1="149.94594" x1="200.9935"     id="9_23" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="279.67566" x2="215.43895" y1="279.67566" x1="200.7773"     id="9_63" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="282.16214" x2="215.493" y1="282.16214" x1="200.83134"     id="9_64" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="284.64862" x2="215.43895" y1="284.64862" x1="200.7773"     id="9_65" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="138.48648" x2="233.97949" y1="138.48648" x1="219.31784"     id="10_19" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="136.21622" x2="234.03354" y1="136.21622" x1="219.3719"     id="10_18" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="279.02701" x2="233.65517" y1="279.02701" x1="218.99352"     id="10_66" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="276.37836" x2="233.60112" y1="276.37836" x1="218.93947"     id="10_65" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="273.45944" x2="233.65517" y1="273.45944" x1="218.99352"     id="10_64" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="270.54053" x2="233.76328" y1="270.54053" x1="219.10162"     id="10_63" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="267.72971" x2="233.81732" y1="267.72971" x1="219.15567"     id="10_62" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="151.56757" x2="252.95247" y1="151.56757" x1="238.29082"     id="11_24" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="156.97296" x2="252.95247" y1="156.97296" x1="238.29082"     id="11_26" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="154.16216" x2="252.95247" y1="154.16216" x1="238.29082"     id="11_25" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="276.48648" x2="252.7903" y1="276.48648" x1="238.12866"     id="11_65" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="273.67566" x2="252.89842" y1="273.67566" x1="238.23677"     id="11_64" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="270.81079" x2="252.95247" y1="270.81079" x1="238.29082"     id="11_63" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="278.32431" x2="252.7903" y1="278.32431" x1="238.12866"     id="11_66" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="130.97298" x2="271.54706" y1="130.97298" x1="256.88541"     id="12_17" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="273.62161" x2="271.0065" y1="273.62161" x1="256.34485"     id="12_66" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="270.81079" x2="271.11462" y1="270.81079" x1="256.45297"     id="12_65" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="267.99997" x2="271.16867" y1="267.99997" x1="256.50702"     id="12_64" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="265.18918" x2="271.11462" y1="265.18918" x1="256.45297"     id="12_63" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="262.37836" x2="271.16867" y1="262.37836" x1="256.50702"     id="12_62" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="275.99997" x2="270.95245" y1="275.99997" x1="256.2908"     id="12_67" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="241.7838" x2="289.49298" y1="241.7838" x1="274.83136"     id="13_54" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="247.45946" x2="289.49298" y1="247.45946" x1="274.83136"     id="13_56" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="244.64864" x2="289.54706" y1="244.64864" x1="274.88541"     id="13_55" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="238.9189" x2="289.49298" y1="238.9189" x1="274.83136"     id="13_53" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="236.10811" x2="289.54706" y1="236.10811" x1="274.88541"     id="13_52" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="236.70268" x2="309.0065" y1="236.70268" x1="294.34485"     id="14_51" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="234.9189" x2="308.95245" y1="234.9189" x1="294.2908"     id="14_50" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="232.32433" x2="309.0065" y1="232.32433" x1="294.34485"     id="14_49" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="229.5135" x2="308.95245" y1="229.5135" x1="294.2908"     id="14_48" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="226.59459" x2="308.89841" y1="226.59459" x1="294.23676"     id="14_47" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="219.4054" x2="327.6011" y1="219.4054" x1="312.93945"     id="15_44" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="222.27026" x2="327.65515" y1="222.27026" x1="312.9935"     id="15_45" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="225.13512" x2="327.6011" y1="225.13512" x1="312.93945"     id="15_46" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="227.45946" x2="327.65515" y1="227.45946" x1="312.9935"     id="15_47" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="132.64865" x2="345.81732" y1="132.64865" x1="331.15567"     id="16_17" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="210.64864" x2="345.97949" y1="210.64864" x1="331.31784"     id="16_41" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="195.62161" x2="364.3038" y1="195.62161" x1="349.64215"     id="17_37" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="193.02702" x2="364.35785" y1="193.02702" x1="349.6962"     id="17_36" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="187.24324" x2="383.33081" y1="187.24324" x1="368.66916"     id="18_34" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="190.21622" x2="383.33081" y1="190.21622" x1="368.66916"     id="18_35" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="121.45945" x2="401.27679" y1="121.45945" x1="386.61514"     id="19_13" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="173.94594" x2="401.65515" y1="173.94594" x1="386.9935"     id="19_29" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="148.32431" x2="438.57407" y1="148.32431" x1="423.91245"     id="21_21" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="163.13513" x2="476.19568" y1="163.13513" x1="461.53403"     id="x_27" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="160.27028" x2="476.3038" y1="160.27028" x1="461.64215"     id="x_26" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="165.45946" x2="476.19568" y1="165.45946" x1="461.53403"     id="x_28" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="306.7027" x2="476.3038" y1="306.7027" x1="461.64215"     id="x_74" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="303.72971" x2="476.35785" y1="303.72971" x1="461.6962"     id="x_73" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="300.86484" x2="476.3038" y1="300.86484" x1="461.64215"     id="x_72" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="297.94592" x2="476.19568" y1="297.94592" x1="461.53403"     id="x_71" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="162.37837" x2="495.22272" y1="162.37837" x1="480.56107"     id="y_26" stroke-width="3" stroke="#ffff00" fill="none"/>'+
  '<line class="chLoc"  y2="164.81081" x2="495.16867" y1="164.81081" x1="480.50702"     id="y_27" stroke-width="3" stroke="#ffff00" fill="none"/>'+
 '<g class="mtdna" >'+
 '<ellipse class="mt" fill="#000000" stroke-width="19"       fill-opacity="0" cx="321.06667" cy="365.8" id="svg_1538" rx="66.93333" ry="60.6" stroke="#000000"/>'+
  '<ellipse class="mt" fill="#000000" stroke="#000000" stroke-width="2"       fill-opacity="0" cx="193.6" cy="339.2" id="svg_1540"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="261.85714" y1="320.7619" x2="275.52381" y2="334.7619" id="MT_1"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="268.7619" y1="314.2381" x2="281.80952" y2="328.33333" id="MT_2" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="255.09524" y1="330.33333" x2="270.7619" y2="340.7619" id="svg_1545" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="279.33334" y1="307.28571" x2="288.66666" y2="322.66667" id="MT_3" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="311.33333" y1="296.33333" x2="312.66667" y2="315" id="MT_6"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="322.33333" y1="296.33333" x2="321.66667" y2="314.33333" id="MT_7"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="333.33333" y1="297" x2="331" y2="315" id="MT_8"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="345" y1="300" x2="340.33333" y2="316.66667" id="MT_9" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="356" y1="305" x2="348.66667" y2="320" id="MT_10"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="366.85714" y1="310.28572" x2="355.42857" y2="324.28572" id="MT_11" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="375.42857" y1="317.71429" x2="361.42857" y2="329.42857" id="MT_12"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="382.57143" y1="325.71429" x2="367.71429" y2="336" id="MT_13" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="371.71429" y1="342.85714" x2="388.85714" y2="334" id="MT_14" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="299.42857" y1="298.85714" x2="304.28571" y2="316.28571" id="MT_5" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="392.85714" y1="342.85714" x2="376" y2="350" id="MT_15" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="288.28571" y1="302.28571" x2="296.85714" y2="319.14286" id="MT_4"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="377.71429" y1="356.85714" x2="396" y2="354.28571" id="MT_16"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="378.85715" y1="364" x2="396.85715" y2="363.71428" id="svg_1561"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="378.57143" y1="370.57143" x2="396.57143" y2="374.57143" id="MT_17"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="377.14286" y1="378.85714" x2="394.57143" y2="383.71429" id="MT_18"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="374.57143" y1="385.71429" x2="390.57143" y2="394.57143" id="MT_19"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="370.28572" y1="393.14286" x2="384.57143" y2="404.28572" id="MT_20"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="364.57143" y1="399.71429" x2="376.85714" y2="413.14286" id="MT_21"/>'+
  '<line class="chLoc"  transform="rotate(6.740019798278809 364.1428833007807,412.28570556640625) " stroke="#ffffaa" fill="none" stroke-width="8"       fill-opacity="0" x1="356.57143" y1="405.71429" x2="371.71429" y2="418.85714" id="MT_22"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="250.28571" y1="339.42857" x2="267.42857" y2="347.71429" id="MT_37"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="351.14286" y1="409.71429" x2="360.57143" y2="426" id="MT_23"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="247.14286" y1="348.57143" x2="264.57143" y2="355.14286" id="svg_1570"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="344" y1="412.85714" x2="350.85714" y2="430.28571" id="MT_24"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="245.14286" y1="358.57143" x2="264" y2="360.57143" id="svg_1572"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="335.14286" y1="416" x2="341.71429" y2="432.57143" id="MT_25" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="245.42857" y1="368.28571" x2="263.14286" y2="367.42857" id="MT_36"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="328.57143" y1="416.85714" x2="330.57143" y2="435.14286" id="MT_26"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="246.57143" y1="378.57143" x2="264.28571" y2="375.42857" id="MT_35"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="319.42857" y1="417.14286" x2="319.42857" y2="435.71429" id="MT_27" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="248.85714" y1="387.42857" x2="266.57143" y2="382.57143" id="MT_34"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="309.71428" y1="416.85715" x2="306.28571" y2="434" id="svg_1579"/>'+
  '<line class="chLoc"  fill="none" stroke="#ffffaa" stroke-width="8"       fill-opacity="0" x1="254" y1="398.57142" x2="269.71429" y2="390" id="MT_33"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="301.42857" y1="414.28571" x2="294.57143" y2="431.14286" id="MT_28" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="260.57143" y1="408.57143" x2="274" y2="396.28572" id="MT_32" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="283.71429" y1="426.85714" x2="294" y2="410.85714" id="MT_29" stroke="#ffffaa"/>'+
  '<line class="chLoc"  fill="none" stroke-width="8"       fill-opacity="0" x1="266.85714" y1="415.71429" x2="279.42857" y2="402" id="MT_31" stroke="#ffffaa"/>'+
  '<line class="chLoc"  stroke="#ffffaa" fill="none" stroke-width="8"       fill-opacity="0" x1="274.28571" y1="420.85715" x2="285.71429" y2="407.14286" id="MT_30"/>'+
'</g>'+

 '<g class="chrLegend" style="visibility:hidden;"> <rect stroke="#000000" id="chLeg" height="11" width="198.00001" y="42" x="170.99999" stroke-width="0" fill="#FF0000"/>'+
  '<text  class="chText" id="lgtMin" stroke="#000000" stroke-width="0" transform="matrix(0.5384615227962151,0,0,0.4670329698712834,81.92307968208425,19.758241622002572) " xml:space="preserve" text-anchor="middle"  font-size="20"  y="31" x="171" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#000000">1</text>'+
  '<text  class="chText" id="lgtMax" stroke="#000000" stroke-width="0" transform="matrix(1,0,0,0.6153846383094788,0,13.846153020858765) " xml:space="preserve" text-anchor="middle"  font-size="15"  y="37.5" x="362"  stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#000000">2</text>'+
  '<text  class="chText" id="lgtMid" stroke="#000000" stroke-width="0" transform="matrix(0.8887923359870911,0,0,0.6539258248545146,30.913992975838482,14.013242573159932) " xml:space="preserve" text-anchor="middle"  font-size="15"  y="34" x="269"  stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="#000000">3</text></g>'+
'</svg>'
	
}


