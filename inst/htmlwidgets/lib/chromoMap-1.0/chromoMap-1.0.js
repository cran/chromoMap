/*  Copyright 2019 Lakshay Anand.
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

var colors=[],chDataReduced,chr_spacing,y_val,ch_width,loci_width,top_margin,left_margin,x_scale_pos,chLinGradV=[],times;

//LOGIC FOR THE CHROMOMAP

function chromoMap(chData,nLoci,ploidy_n,title,cnt,ch_gap,top_margin,left_margin,chr_width,chr_length,chr_col,heatmap,v_align,ch_domain,lg_x,lg_y,heat_scale,labels,div_id,width,height,rng,heat_col,an_col,ch_text,legend,aggregate_func){




    //swapping margins
  if(v_align){
    var t=top_margin;
    top_margin=left_margin;
    left_margin=t;

  }




    if(!labels){
      y_val = top_margin;
    } else {

      y_val = top_margin+10;
    }




    ch_width = chr_width; /*height of chromosome bar */
    arc_radius=chr_width/2;

    loci_width=chr_length; /*widht of each loci determined for ch length */





    if(!labels){
      chr_spacing= ploidy_n*chr_width + ploidy_n + ch_gap;
} else {
  chr_spacing= ploidy_n*chr_width + ploidy_n + ch_gap*2;
}


    ttl=title;
    var arc = d3.arc()
 .innerRadius(0)
 .outerRadius(arc_radius)
 .startAngle(0)
 .endAngle(Math.PI);

 var arcLeft = d3.arc()
 .innerRadius(0)
 .outerRadius(arc_radius)
 .startAngle(Math.PI)
 .endAngle(2*Math.PI);

 var arcTop = d3.arc()
 .innerRadius(0)
 .outerRadius(arc_radius)
 .startAngle(-Math.PI/2)
 .endAngle(Math.PI/2);

 var arcBot = d3.arc()
 .innerRadius(0)
 .outerRadius(arc_radius)
 .startAngle(Math.PI/2)
 .endAngle((3*Math.PI)/2);




var chmap_div = d3.select("#"+div_id);

var svg = chmap_div.append("svg")
                   .attr("width",width)
                   .attr("height",height);





    if(!v_align){
    /* Adding title */
    svg.append("text")
    .attr("x",width/2)
    .attr("y",(top_margin/2))
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text(ttl);
} else {
  svg.append("text")
  .attr("x",width/2)
  .attr("y",(left_margin/3))
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text(ttl);

}


   if(!v_align){
    /*adding axes  */
    x_scale_pos=( top_margin+(chr_spacing)*nLoci[0].length+10);


    nnmax= 100;

    if(cnt){
    x_scale_width= (nnmax)*loci_width + 3*arc_radius;
    } else {
      x_scale_width= (nnmax)*loci_width + arc_radius;
    }
    // Create scale
    var scale = d3.scaleLinear()
                  .domain(ch_domain).nice()
                  .range([0, x_scale_width]);

    // Add scales to axis
    var x_axis = d3.axisBottom()
                 .scale(scale)
                 .ticks(5)
                 .tickFormat(function(d){
                   if(d>=1000000000){ return (d/1000000000)+"Gb"
                   } else if(d>=1000000){

                   return (d/1000000)+"Mb";
                 } else if (d>=1000) {
                   return (d/1000)+"kb";
                 } else { return d+"bp";}});

    //Append group and insert axis
    svg.append("g")
    .attr("transform", "translate("+(left_margin - arc_radius)+"," + x_scale_pos + ")")
    .call(x_axis);


    /* axis title */
    svg.append("text")
    .attr("x",x_scale_width/2)
    .attr("y",x_scale_pos + 35)
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Length (bp)");

} else {

/*adding axes  */
x_scale_pos=( top_margin+(chr_spacing)*nLoci[0].length+10);



nnmax= 100;

if(cnt){
x_scale_width= (nnmax)*loci_width + 3*arc_radius;
} else {
  x_scale_width= (nnmax)*loci_width + arc_radius;
}
// Create scale
var scale = d3.scaleLinear()
              .domain(ch_domain).nice()
              .range([0, x_scale_width]);

// Add scales to axis
var x_axis = d3.axisRight()
             .scale(scale)
             .ticks(5)
             .tickFormat(function(d){
               if(d>=1000000000){ return (d/1000000000)+"Gb"
               } else if(d>=1000000){

               return (d/1000000)+"Mb";
             } else if (d>=1000) {
               return (d/1000)+"kb";
             } else { return d+"bp";}});

//Append group and insert axis
svg.append("g")
.attr("transform", "translate("+x_scale_pos+"," + (left_margin - arc_radius) + ")")
.call(x_axis).selectAll("text").attr("transform", "rotate(90)").attr("y", -12).style("text-anchor", "middle");


/* axis title */
svg.append("text")
.attr("transform", "translate("+(x_scale_pos + 35)+"," + (x_scale_width/2) + ") rotate(90)")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
.attr("fill", "black")
.style("text-anchor", "middle")
.text(" Length (bp)");




}







/*  Rendering chromoMap  */
   u=1;
    while(u<=parseInt(ploidy_n)){

      if(!v_align){
        renderChromoMap(chData[u-1],chr_spacing,ploidy=u,ch_width,arc,arcLeft,svg,nLoci[u-1],cnt,chr_col[u-1],heatmap,left_margin,lg_x,lg_y,heat_scale,labels,width,height,rng[u-1],heat_col[u-1],an_col[u-1],ch_text[u-1],legend[u-1],u-1,aggregate_func[u-1]);

      } else {

    renderChromoMapV(chData[u-1],chr_spacing,ploidy=u,ch_width,arcTop,arcBot,svg,nLoci[u-1],cnt,chr_col[u-1],heatmap,left_margin,lg_x,lg_y,heat_scale,labels,width,height,rng[u-1],heat_col[u-1],an_col[u-1],ch_text[u-1],legend[u-1],u-1,aggregate_func[u-1]);
    }
    u++;
    }

 /* end of rendering chromomap  */




























}

function renderChromoMap(chData,chr_spacing,ploidy,ch_width,arc,arcLeft,svg,nLoci,cnt,chr_color,heatmap,left_margin,lg_x,lg_y,heat_scale,labels,width,height,rng,heat_col,an_col,ch_text,legend,times,aggregate_func){



  if(cnt){

    var allDatap =[];
    var allDataq=[];

    for(i=0;i < nLoci.length;i++){

         allDatap[i]=d3.range(nLoci[i].p);
         allDataq[i]=d3.range(nLoci[i].q);

    }

    for(i=0;i< nLoci.length;i++){

        /*  first cap */
        posx=left_margin;
        posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
        svg.append("g")
            .attr("transform", "translate("+posx+","+posy+")")
             .append("path")
             .style("fill", chr_color)
             .attr("d", arcLeft);

        /*  p arm */
        svg.selectAll(".rects")
          .data(allDatap[i])
          .enter()
          .append("rect")
          .attr("y", y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))
          .attr("height", ch_width)
          .attr("x", function(d,i){return left_margin + i*loci_width;})
          .attr("width", loci_width)
          .attr("fill", chr_color)
          .attr("class","chLoc")
          .attr("id",function(d,j){ return nLoci[i].name+"-"+(j+1)+"-"+ploidy;});

          //labellings
      svg.selectAll(".texts")
      .data(allDatap[i])
      .enter()
      .append("text")
      .attr("class","labels")
      .attr("y", (y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))-2)
      .attr("x", function(d,i){return left_margin + i*loci_width;})
      .attr("id",function(d,j){ return "L"+nLoci[i].name+"-"+(j+1)+"-"+ploidy;}).text("")
      .attr("font-family", "sans-serif")
      .attr("font-size", "9px")
      .style("text-anchor", "middle")
        .attr("fill", "black");


          /*  centromere */
          posx=left_margin+(nLoci[i].p)*loci_width
          posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
          svg.append("g")
         .attr("transform", "translate("+posx+","+posy+")")
        .append("path")
        .style("fill", chr_color)
        .attr("d", arc);

        posx=left_margin+(nLoci[i].p)*loci_width + 2*arc_radius
          posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
         svg.append("g")
         .attr("transform", "translate("+posx+","+posy+")")
        .append("path")
        .style("fill", chr_color)
        .attr("d", arcLeft);

        /* short arm  */

        svg.selectAll(".rects")
          .data(allDataq[i])
          .enter()
          .append("rect")
          .attr("y", y_val + i*chr_spacing+ (ploidy - 1)*(ch_width +1 ))
          .attr("height", ch_width)
          .attr("x", function(d,j){return left_margin + j*loci_width + (nLoci[i].p)*loci_width +2*arc_radius;})
          .attr("width", loci_width)
          .attr("fill", chr_color)
          .attr("class","chLoc")
          .attr("id",function(d,j){ return nLoci[i].name+"-"+(j+1+nLoci[i].p)+"-"+ploidy;});

        //labellings
      svg.selectAll(".texts")
      .data(allDataq[i])
      .enter()
      .append("text")
      .attr("class","labels")
      .attr("y", (y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))-2)
      .attr("x", function(d,j){return left_margin + j*loci_width + (nLoci[i].p)*loci_width +2*arc_radius;})
      .attr("id",function(d,j){ return "L"+nLoci[i].name+"-"+(j+1+nLoci[i].p)+"-"+ploidy;}).text("")
      .attr("font-family", "sans-serif")
      .attr("font-size", "9px")
      .style("text-anchor", "middle")
        .attr("fill", "black");





         /*   final cap */


          posx=left_margin+(nLoci[i].p)*loci_width + 2*arc_radius + (nLoci[i].q)*loci_width
          posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
         svg.append("g")
         .attr("transform", "translate("+posx+","+posy+")")
        .append("path")
        .style("fill", chr_color)
        .attr("d", arc);

if(ch_text){
        svg.append("text")
        .attr("x",left_margin*0.5)
        .attr("y",2 + y_val + i*chr_spacing + (ploidy - 1)*(ch_width +3 ))
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text(nLoci[i].name);
}


        } //end of for

} else {

  var allData =[];


    for(i=0;i < nLoci.length;i++){

         allData[i]=d3.range(nLoci[i].n);


    }

  for(i=0;i< nLoci.length;i++){

    /*  first cap */
    posx=left_margin;
    posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
    svg.append("g")
        .attr("transform", "translate("+posx+","+posy+")")
         .append("path")
         .style("fill", chr_color)
         .attr("d", arcLeft);

    /*  p arm */
    svg.selectAll(".rects")
      .data(allData[i])
      .enter()
      .append("rect")
      .attr("y", y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))
      .attr("height", ch_width)
      .attr("x", function(d,i){return (left_margin + i*loci_width);})
      .attr("width", loci_width)
      .attr("fill", chr_color)
      .attr("class","chLoc")
      .attr("id",function(d,j){ return nLoci[i].name+"-"+(j+1)+"-"+ploidy;});



      //labellings
      svg.selectAll(".texts")
      .data(allData[i])
      .enter()
      .append("text")
      .attr("class","labels")
      .attr("y", (y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))-2)
      .attr("x", function(d,i){return left_margin + i*loci_width;})
      .attr("id",function(d,j){return "L"+nLoci[i].name+"-"+(j+1)+"-"+ploidy;}).text("")
      .attr("font-family", "sans-serif")
      .attr("font-size", "9px")
      .style("text-anchor", "middle")
        .attr("fill", "black");









     /*   final cap */


      posx=left_margin+(nLoci[i].n)*loci_width
      posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
     svg.append("g")
     .attr("transform", "translate("+posx+","+posy+")")
    .append("path")
    .style("fill", chr_color)
    .attr("d", arc);

if(ch_text){
    svg.append("text")
        .attr("x",left_margin*0.5)
        .attr("y",2+y_val + i*chr_spacing +arc_radius+ (ploidy - 1)*(ch_width +3 ))
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text(nLoci[i].name);

}


    } //end of for


}



if(!heatmap){
        //data reduction for anntation
var chDataReduced = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) { var label =''; var tot = '<font color="grey"> Count: </font> '+v.length+"  </p></div><hr><div  style='float:top;height:80%;overflow-wrap: break-word;' > <font size='1'>";for(var i=0; i< v.length;i++){ label = label +"<a href="+v[i].hlink+" style='text-decoration:none;cursor:pointer;color:grey;pointer-events: all'>"+ v[i].name+"</a>" +" ,";    }; return tot+label.slice(0,-1);})
.entries(chData);

var chDataReducedCount = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  return v.length;})
.entries(chData);

var chDataRange = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a,b;for(var i=0; i< v.length;i++){ a = v[i].loci_start; b=v[i].loci_end;    };return ""+a+"-"+b+"bp ";})
.entries(chData);

 /* adding the chromosome tootltips    */
for(var i = 0;i < chDataReduced.length;i++) {


  chDataReduced[i].range = chDataRange[i].value;
  chDataReduced[i].len = chDataReducedCount[i].value;
}


//data ready for rendering
     var tip =[];
        tip[ploidy-1] = d3.select("body").append("div")
 .attr("class", "chtooltip")
 .style("opacity", 0)
 .attr("style", "position: absolute;text-align: center;	box-sizing: border-box; padding: 3px;	font: 12px sans-serif;		border: 0px;border-radius: 8px;pointer-events: none;") ;

 var tip2 = [];
  tip2[ploidy-1] = d3.select("body").append("div")
     .attr("class", "chtooltip2")
     .style("opacity", 0)
     .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;
 var clickFlag=false;
 d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5");	tip[ploidy-1].style("height",100+d.len*1.5).style("width",190+d.len);
 tip[ploidy-1].html("<div  style='float:top;height:10%;color:black;font-size:12px;'><p>"+d.range+"</p></div><hr><div  style='float:top;height:10%;'><p ><b>"+d.value+"</font></div>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip[ploidy-1].transition() .delay(1000).duration(500)	.style("opacity", 0);}).attr("fill", an_col)
 .on("click", function(d) {


   if(clickFlag){
        tip2[ploidy-1].style("opacity", 0);
     }else{
       tip2[ploidy-1].transition().duration(200)	.style("opacity", 1).style("background-color","#F5F5F5");	tip2[ploidy-1].style("height",100+d.len*1.5).style("width",190+d.len);
       tip2[ploidy-1].html("<div  style='float:top;height:10%;color:black;font-size:12px;'><p>"+d.range+"</p></div><hr><div  style='float:top;height:10%;'><p ><b>"+d.value+"</font></div>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");
        } return clickFlag = !clickFlag; });

 if(ploidy==1 && labels){

  var chDataLabels = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].name);   };return a[0];})
.entries(chData);
var chDataLabel = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].label);   };return a[0];})
.entries(chData);
 for(var i = 0;i < chDataReduced.length;i++) {



  chDataReduced[i].labels =chDataLabels[i].value;
  chDataReduced[i].label_id =chDataLabel[i].value;

}


 d3.selectAll(".labels").data(chDataReduced, function(d) {return (d && d.label_id)||d3.select(this).attr("id");}).text(function(d){ return d.labels;});
}




 } else {

   //heatmap code
   if(heat_scale=="linear"){




    colors[times] = d3.scaleLinear()
        .domain(rng).nice()
        .range(heat_col);



    // Create scale

/*    var scale2 = d3.scaleLinear()
    .domain(rng).nice()
    .range([2, 100]);

    // Add scales to axis
    legend2 = d3.axisRight()
    .scale(scale2)
    .ticks(3);
if(legend){
    //Append group and insert axis
    svg.append("g")
    .attr("transform", "translate("+((width-35-(times*50))-lg_x)+"," + ((height-100)-lg_y )+ ")")
    .call(legend2);

}  */
    chLinGradV[times] = svg.append("defs").append("linearGradient")
                         .attr("id", function(d){ return "linear-gradient-chromH-"+times;})
                         .attr("x1", "0%")
                         .attr("y1", "0%")
                         .attr("x2", "0%")
                         .attr("y2", "100%")
                         .selectAll("stop")
        .data( colors[times].range() )
        .enter().append("stop")
        .attr("offset", function(d,i) { return i/(colors[times].range().length-1); })
        .attr("stop-color", function(d) { return d; });


if(legend){
      svg.append('rect')
      .attr("height",100).attr("width",10).attr("y",((height-99)-lg_y)).attr("x",((width-45-(times*50))-lg_x)).attr("class",function(d){return "lg"+times;})
      .style("fill", "url(#linear-gradient-chromH-"+times+")");

      var rng2;
      if(rng.length==3){
        rng2=rng;
      }else if (rng.length==2) {
        rng2=[rng[0],d3.mean(rng),rng[1]]
      }

     svg.selectAll(".texts")
     .data(d3.range(3))
     .enter()
     .append("text")
     .attr("class","labels")
     .text(function(i){ return rng2[i].toFixed(1);})
     .attr("font-family", "sans-serif")
     .attr("font-size", "9px")
       .attr("fill", "black").attr("transform",function(d,j){
         return "translate(" +((width-32-(times*50))-lg_x)+"," + ((height-94+(j*48))-lg_y  )+ ")"});
}

    } else{ if(heat_scale=="ordinal"){




      colors[times] = d3.scaleOrdinal()
              .domain(rng)
              .range(heat_col);


        w=rng.length*20;
        // Create scale

        var scale2 = d3.scaleBand()
        .domain(rng)
        .range([2,w]);

        // Add scales to axis
        var legend2 = d3.axisRight()
        .scale(scale2).tickSizeOuter(0);

if(legend){
        //Append group and insert axis
        svg.append("g")
        .attr("transform", "translate("+((width-35)-lg_x)+"," + ((height-100)-lg_y )+ ")")
        .call(legend2);





        rec_h=w/rng.length;

            svg.selectAll(".rects")
            .data(heat_col)
            .enter()
            .append("rect")
            .attr("y", function(d,i){return (((height-99)-lg_y)+i*rec_h);})
            .attr("height", rec_h)
            .attr("x", function(d,i){return ((width-45)-lg_x);})
            .attr("width", 10)
            .attr("fill", function(d){return d;});
}




    }
    }




	/* creating final data    */



if(heat_scale=="linear"){
 var tag;
 if(aggregate_func=="avg"){
  chDataReduced = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.data; });})
  .entries(chData);

  tag="avg";
} else if(aggregate_func=="sum"){

  chDataReduced = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.data; });})
  .entries(chData);
 tag="sum";

}
	var chDataReducedMin = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return d3.min(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedMax = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return d3.max(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedBarData = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].data);};return bar;})
  .entries(chData);
  var chDataReducedBarLabel = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].name);};return bar;})
  .entries(chData);

  var chDataReducedBarLink = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].hlink);};return bar;})
  .entries(chData);
  var chDataReducedCount = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return v.length;})
  .entries(chData);
	var chDataRange = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a,b;for(var i=0; i< v.length;i++){ a = v[i].loci_start; b=v[i].loci_end;    };return ""+a+"-"+b+"bp ";})
.entries(chData);
  for(var i = 0;i < chDataReduced.length;i++) {


	chDataReduced[i].range = chDataRange[i].value;
	chDataReduced[i].min = chDataReducedMin[i].value;
	chDataReduced[i].max = chDataReducedMax[i].value;
	chDataReduced[i].bar = chDataReducedBarData[i].value;
	chDataReduced[i].label = chDataReducedBarLabel[i].value;
	chDataReduced[i].count = chDataReducedCount[i].value;
  chDataReduced[i].hlink = chDataReducedBarLink[i].value;
}

var tip = [];
 tip[ploidy-1] = d3.select("body").append("div")
    .attr("class", "chtooltip")
    .style("opacity", 0)
    .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;

    var tip2 = [];
     tip2[ploidy-1] = d3.select("body").append("div")
        .attr("class", "chtooltip2")
        .style("opacity", 0)
        .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;
    var clickFlag=false;

    d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
      tip[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
      ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' > "+tag+": </font> <font size='1'  ><b> "+(d.value).toFixed(2)+
      " <br><font size='1' color='grey' > Min.: </font>"+(d.min).toFixed(2)+" <br><font size='1' color='grey' > Max.: </font> "+(d.max).toFixed(2)+
      "</font><br><font size='1' color='grey' > Count: </font><font size='1'>"+d.count+"</p></font></div></div><div id ='microBar"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
      ";'><font size='2' >"+d.range+"</font></p></div>")
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg = d3.select('#microBar'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
      t_data=[];
      for(j=0;j<d.label.length;j++){
        t_data.push({lb:d.label[j],hl:d.hlink[j]}); }
      var ttext=mysvg.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;})
      .append("svg:text").attr("y",svgHeight*0.4).attr("transform","rotate(90)")
      .attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';})
      .style("pointer-events", "all").style("cursor","pointer").attr("font-size", "9px")
      .text(function(d,i){return d.lb;}); })
      .on("mouseout", function(d) {	tip[ploidy-1].transition() .delay(1000).duration(500)	.style("opacity", 0);}).style("visibility","visible").style("fill",function(d){ return colors[times](d.value);})
      .on("click", function(d) {


        if(clickFlag){
             tip2[ploidy-1].style("opacity", 0);
          }else{
        tip2[ploidy-1].style("z-index",99999999)	.style("opacity", 1).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
        tip2[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
        ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' > "+tag+": </font> <font size='1'  ><b> "+(d.value).toFixed(2)+
        " <br><font size='1' color='grey' > Min.: </font>"+(d.min).toFixed(2)+" <br><font size='1' color='grey' > Max.: </font> "+(d.max).toFixed(2)+
        "</font><br><font size='1' color='grey' > Count: </font><font size='1'>"+d.count+"</p></font></div></div><div id ='microBar2"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
        ";'><font size='2' >"+d.range+"</font></p></div>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg2 = d3.select('#microBar2'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg2.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
        t_data=[];
        for(j=0;j<d.label.length;j++){
          t_data.push({lb:d.label[j],hl:d.hlink[j]}); }
        var ttext=mysvg2.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;}).append("svg:text").attr("y",svgHeight*0.4).attr("transform","rotate(90)").attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("pointer-events", "all").style("cursor","pointer").attr("font-size", "9px").text(function(d,i){return d.lb;});
      } return clickFlag = !clickFlag; });

      if(ploidy==1 && labels){

        var chDataLabels = d3.nest()
    .key(function(d) { return d.loci; })
    .rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].name);   };return a[0];})
    .entries(chData);

    var chDataLabel = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].label);   };return a[0];})
.entries(chData);
       for(var i = 0;i < chDataReduced.length;i++) {


        chDataReduced[i].label_id=chDataLabel[i].value;
        chDataReduced[i].labels =chDataLabels[i].value;

      }


       d3.selectAll(".labels").data(chDataReduced, function(d) {return (d && d.label_id)||d3.select(this).attr("id");}).text(function(d){ return d.labels;});
     }






} else {
  if(heat_scale=="ordinal"){
  var chDataReduced = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].data);   };return a[0];})
  .entries(chData);


  var chDataReducedBarData = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].data);};return bar;})
  .entries(chData);
  var chDataReducedBarLabel = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].name);};return bar;})
  .entries(chData);

  var chDataReducedBarLink = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].hlink);};return bar;})
  .entries(chData);
  var chDataReducedCount = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return v.length;})
  .entries(chData);
	var chDataRange = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a,b;for(var i=0; i< v.length;i++){ a = v[i].loci_start; b=v[i].loci_end;    };return ""+a+"-"+b+"bp ";})
.entries(chData);

  for(var i = 0;i < chDataReduced.length;i++) {


    chDataReduced[i].range = chDataRange[i].value;

    chDataReduced[i].bar = chDataReducedBarData[i].value;
    chDataReduced[i].label = chDataReducedBarLabel[i].value;
    chDataReduced[i].count = chDataReducedCount[i].value;
    chDataReduced[i].hlink = chDataReducedBarLink[i].value;
  }

  var tip = [];
  tip[ploidy-1] = d3.select("body").append("div")
     .attr("class", "chtooltip")
     .style("opacity", 0)
     .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;

     var tip2 = [];
      tip2[ploidy-1] = d3.select("body").append("div")
         .attr("class", "chtooltip2")
         .style("opacity", 0)
         .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;
     var clickFlag=false;

     d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
     tip[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
     ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' >  </font> <font size='1'  ><b> "+""+
     " <br><font size='1' color='grey' > Count:</font>"+d.count+" <br><font size='1' color='grey' >  </font> "+""+
     "</font><br><font size='1' color='grey' >  </font><font size='1'>"+""+"</p></font></div></div><div id ='microBar"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
     ";'><font size='2' >"+d.range+"</font></p></div>")
     .style("left", (d3.event.pageX) + "px")
     .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg = d3.select('#microBar'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
      t_data=[];
      for(j=0;j<d.label.length;j++){
        t_data.push({lb:d.label[j],hl:d.hlink[j]});
      }

     var ttext=mysvg.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;})
     .append("svg:text").attr("y",svgHeight*0.4)
     .attr("transform","rotate(90)")
     .attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';})
     .attr("font-size", "9px").style("pointer-events", "all")
     .attr("class","ttt").style("cursor","pointer")
     .text(function(d,i){return d.lb;});  })
     .on("mouseout", function(d) {	tip[ploidy-1].transition() .delay(1000).duration(500)	.style("opacity", 0);}).style("visibility","visible").style("fill",function(d){ return colors[times](d.value);})
     .on("click", function(d) {


       if(clickFlag){
            tip2[ploidy-1].style("opacity", 0);
         }else{
           tip2[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
           tip2[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
           ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' >  </font> <font size='1'  ><b> "+""+
           " <br><font size='1' color='grey' > Count:</font>"+d.count+" <br><font size='1' color='grey' >  </font> "+""+
           "</font><br><font size='1' color='grey' >  </font><font size='1'>"+""+"</p></font></div></div><div id ='microBar2"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
           ";'><font size='2' >"+d.range+"</font></p></div>")
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg2 = d3.select('#microBar2'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg2.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
            t_data=[];
            for(j=0;j<d.label.length;j++){
              t_data.push({lb:d.label[j],hl:d.hlink[j]});
            }

           var ttext=mysvg2.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;})
           .append("svg:text").attr("y",svgHeight*0.4)
           .attr("transform","rotate(90)")
           .attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';})
           .attr("font-size", "9px").style("pointer-events", "all")
           .attr("class","ttt").style("cursor","pointer")
           .text(function(d,i){return d.lb;}); } return clickFlag = !clickFlag; });

     if(ploidy==1 && labels){

      var chDataLabels = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].name);   };return a[0];})
  .entries(chData);
  var chDataLabel = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].label);   };return a[0];})
.entries(chData);
     for(var i = 0;i < chDataReduced.length;i++) {


      chDataReduced[i].label_id = chDataLabel[i].value;
      chDataReduced[i].labels =chDataLabels[i].value;

    }


     d3.selectAll(".labels").data(chDataReduced, function(d) {return (d && d.label_id)||d3.select(this).attr("id");}).text(function(d){ return d.labels;});
   }
}

}













  //heatmap code end
 }


}



//logic for vertical
function renderChromoMapV(chData,chr_spacing,ploidy,ch_width,arcTop,arcBot,svg,nLoci,cnt,chr_color,heatmap,left_margin,lg_x,lg_y,heat_scale,labels,width,height,rng,heat_col,an_col,ch_text,legend,times,aggregate_func){
  if(cnt){

    var allDatap =[];
    var allDataq=[];

    for(i=0;i < nLoci.length;i++){

         allDatap[i]=d3.range(nLoci[i].p);
         allDataq[i]=d3.range(nLoci[i].q);

    }

    for(i=0;i< nLoci.length;i++){

        /*  first cap */
        posx=left_margin;
        posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
        svg.append("g")
            .attr("transform", "translate("+posy+","+posx+")")
             .append("path")
             .style("fill", chr_color)
             .attr("d", arcTop);

        /*  p arm */
        svg.selectAll(".rects")
          .data(allDatap[i])
          .enter()
          .append("rect")
          .attr("x", y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))
          .attr("height",loci_width )
          .attr("y", function(d,i){return left_margin + i*loci_width;})
          .attr("width",ch_width )
          .attr("fill", chr_color)
          .attr("class","chLoc")
          .attr("id",function(d,j){return nLoci[i].name+"-"+(j+1)+"-"+ploidy;});



        svg.selectAll(".texts")
      .data(allDatap[i])
      .enter()
      .append("text")
      .attr("class","labels")
      .attr("id",function(d,j) {return "L"+nLoci[i].name+"-"+(j+1)+"-"+ploidy;}).text("")
      .attr("font-family", "sans-serif")
      .attr("font-size", "9px")
      .style("text-anchor", "middle")
        .attr("fill", "black").attr("transform",function(d,j){
          return "translate(" + ((y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))-2) + ", "+(left_margin + j*loci_width)+") " + "rotate(-90)"});




          /*  centromere */
          posx=left_margin+(nLoci[i].p)*loci_width
          posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
          svg.append("g")
         .attr("transform", "translate("+posy+","+posx+")")
        .append("path")
        .style("fill", chr_color)
        .attr("d", arcBot);

        posx=left_margin+(nLoci[i].p)*loci_width + 2*arc_radius
          posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
         svg.append("g")
         .attr("transform", "translate("+posy+","+posx+")")
        .append("path")
        .style("fill", chr_color)
        .attr("d", arcTop);

        /* short arm  */

        svg.selectAll(".rects")
          .data(allDataq[i])
          .enter()
          .append("rect")
          .attr("x", y_val + i*chr_spacing+ (ploidy - 1)*(ch_width +1 ))
          .attr("height",loci_width )
          .attr("y", function(d,j){return left_margin + j*loci_width + (nLoci[i].p)*loci_width +2*arc_radius;})
          .attr("width", ch_width)
          .attr("fill", chr_color)
          .attr("class","chLoc")
          .attr("id",function(d,j){ return nLoci[i].name+"-"+(j+1+nLoci[i].p)+"-"+ploidy;});

        //labellings

        svg.selectAll(".texts")
      .data(allDataq[i])
      .enter()
      .append("text")
      .attr("class","labels")
      .attr("id",function(d,j){return "L"+nLoci[i].name+"-"+(j+1+nLoci[i].p)+"-"+ploidy;}).text("")
      .attr("font-family", "sans-serif")
      .attr("font-size", "9px")
      .style("text-anchor", "middle")
        .attr("fill", "black").attr("transform",function(d,j){
          return "translate(" + ((y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))-2) + ", "+(left_margin + j*loci_width+ (nLoci[i].p)*loci_width +2*arc_radius)+") " + "rotate(-90)"});







         /*   final cap */


          posx=left_margin+(nLoci[i].p)*loci_width + 2*arc_radius + (nLoci[i].q)*loci_width
          posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
         svg.append("g")
         .attr("transform", "translate("+posy+","+posx+")")
        .append("path")
        .style("fill", chr_color)
        .attr("d", arcBot);

if(ch_text){
        svg.append("text")
        .attr("y",left_margin*0.75)
        .attr("x",y_val + i*chr_spacing + (ploidy - 1)*(ch_width +2 ))
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text(nLoci[i].name);
}


        } //end of for

} else {

  var allData =[];


    for(i=0;i < nLoci.length;i++){

         allData[i]=d3.range(nLoci[i].n);


    }

  for(i=0;i< nLoci.length;i++){

    /*  first cap */
    posx=left_margin;
    posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
    svg.append("g")
        .attr("transform", "translate("+posy+","+posx+")")
         .append("path")
         .style("fill", chr_color)
         .attr("d", arcTop);

    /*  p arm */
    svg.selectAll(".rects")
      .data(allData[i])
      .enter()
      .append("rect")
      .attr("x", y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))
      .attr("height",loci_width )
      .attr("y", function(d,i){return left_margin + i*loci_width;})
      .attr("width", ch_width)
      .attr("fill", chr_color)
      .attr("class","chLoc")
      .attr("id",function(d,j){return nLoci[i].name+"-"+(j+1)+"-"+ploidy;});



      //labellings
      svg.selectAll(".texts")
      .data(allData[i])
      .enter()
      .append("text")
      .attr("class","labels")
      .attr("id",function(d,j){return "L"+nLoci[i].name+"-"+(j+1)+"-"+ploidy;}).text("")
      .attr("font-family", "sans-serif")
      .attr("font-size", "9px")
      .style("text-anchor", "middle")
        .attr("fill", "black").attr("transform",function(d,j){
          return "translate(" + ((y_val + i*chr_spacing + (ploidy - 1)*(ch_width +1 ))-2) + ", "+(left_margin + j*loci_width)+") " + "rotate(-90)"});









     /*   final cap */


      posx=left_margin+(nLoci[i].n)*loci_width
      posy=y_val + i*chr_spacing+ + arc_radius + (ploidy - 1)*(ch_width +1 )
     svg.append("g")
     .attr("transform", "translate("+posy+","+posx+")")
    .append("path")
    .style("fill", chr_color)
    .attr("d", arcBot);

if(ch_text){
    svg.append("text")
        .attr("y",left_margin*0.75)
        .attr("x",y_val + i*chr_spacing +arc_radius+ (ploidy - 1)*(ch_width +2 ))
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text(nLoci[i].name);

}


    } //end of for


}



if(!heatmap){
        //data reduction for anntation
var chDataReduced = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) { var label =''; var tot = '<font color="grey"> Count: </font> '+v.length+"  </p></div><hr><div  style='float:top;height:80%;overflow-wrap: break-word;' > <font size='1'>";for(var i=0; i< v.length;i++){ label = label +"<a href="+v[i].hlink+" style='text-decoration:none;cursor:pointer;color:grey;pointer-events: all;'>"+ v[i].name+"</a>" +" ,";    }; return tot+label.slice(0,-1);})
.entries(chData);

var chDataReducedCount = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  return v.length;})
.entries(chData);



var chDataRange = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a,b;for(var i=0; i< v.length;i++){ a = v[i].loci_start; b=v[i].loci_end;    };return ""+a+"-"+b+"bp ";})
.entries(chData);

 /* adding the chromosome tootltips    */
for(var i = 0;i < chDataReduced.length;i++) {


  chDataReduced[i].range = chDataRange[i].value;
  chDataReduced[i].len = chDataReducedCount[i].value;
}


//data ready for rendering
     var tip =[];
        tip[ploidy-1] = d3.select("body").append("div")
 .attr("class", "chtooltip")
 .style("opacity", 0)
 .attr("style", "position: absolute;text-align: center;	box-sizing: border-box; padding: 3px;	font: 12px sans-serif;		border: 0px;border-radius: 8px;pointer-events: none;") ;

 var tip2 = [];
  tip2[ploidy-1] = d3.select("body").append("div")
     .attr("class", "chtooltip2")
     .style("opacity", 0)
     .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;
 var clickFlag=false;
 d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5");	tip[ploidy-1].style("height",100+d.len*1.5).style("width",190+d.len);
 tip[ploidy-1].html("<div  style='float:top;height:10%;color:black;font-size:12px;'><p>"+d.range+"</p></div><hr><div  style='float:top;height:10%;'><p ><b>"+d.value+"</font></div>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");}).on("mouseout", function(d) {	tip[ploidy-1].transition() .delay(1000).duration(500)	.style("opacity", 0);}).attr("fill", an_col)
 .on("click", function(d) {


   if(clickFlag){
        tip2[ploidy-1].style("opacity", 0);
     }else{
       tip2[ploidy-1].transition().duration(200)	.style("opacity", 1).style("background-color","#F5F5F5");	tip2[ploidy-1].style("height",100+d.len*1.5).style("width",190+d.len);
       tip2[ploidy-1].html("<div  style='float:top;height:10%;color:black;font-size:12px;'><p>"+d.range+"</p></div><hr><div  style='float:top;height:10%;'><p ><b>"+d.value+"</font></div>").style("left", (d3.event.pageX) + "px")	.style("top", (d3.event.pageY - 18) + "px");
        } return clickFlag = !clickFlag; });

 if(ploidy==1 && labels){

  var chDataLabels = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].name);   };return a[0];})
.entries(chData);
var chDataLabel = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].label);   };return a[0];})
.entries(chData);
 for(var i = 0;i < chDataReduced.length;i++) {



  chDataReduced[i].labels =chDataLabels[i].value;
  chDataReduced[i].label_id =chDataLabel[i].value;

}


 d3.selectAll(".labels").data(chDataReduced, function(d) {return (d && d.label_id)||d3.select(this).attr("id");}).text(function(d){ return d.labels;});
}




 } else {

   //heatmap code
   if(heat_scale=="linear"){




    colors[times] = d3.scaleLinear()
        .domain(rng)
        .range(heat_col);



    // Create scale
/*
  var  scale2 = d3.scaleLinear()
    .domain(rng).nice()
    .range([2, 100]);

    // Add scales to axis
  var  legend2 = d3.axisRight()
    .scale(scale2)
    .ticks(3);
if(legend){
    //Append group and insert axis
    svg.append("g").attr("id",function(d){return "lgnd"+times;})
    .attr("transform", "translate("+((width-35-(times*50))-lg_x)+"," + ((height-100)-lg_y )+ ")")
    .call(legend2);
}  */

    chLinGradV[times] = svg.append("defs").append("linearGradient")
                         .attr("id", function(d){ return "linear-gradient-chromH-"+times;})
                         .attr("x1", "0%")
                         .attr("y1", "0%")
                         .attr("x2", "0%")
                         .attr("y2", "100%")
                         .selectAll("stop")
        .data( colors[times].range() )
        .enter().append("stop")
        .attr("offset", function(d,i) { return i/(colors[times].range().length-1); })
        .attr("stop-color", function(d) { return d; });

if(legend){
      svg.append('rect')
      .attr("height",100).attr("width",10).attr("y",((height-99)-lg_y)).attr("x",((width-45-(times*50))-lg_x))
      .style("fill", "url(#linear-gradient-chromH-"+times+")");

       var rng2;
       if(rng.length==3){
         rng2=rng;
       }else if (rng.length==2) {
         rng2=[rng[0],d3.mean(rng),rng[1]]
       }

      svg.selectAll(".texts")
      .data(d3.range(3))
      .enter()
      .append("text")
      .attr("class","labels")
      .text(function(i){ return rng2[i].toFixed(1);})
      .attr("font-family", "sans-serif")
      .attr("font-size", "9px")
        .attr("fill", "black").attr("transform",function(d,j){
          return "translate(" +((width-32-(times*50))-lg_x)+"," + ((height-94+(j*48))-lg_y  )+ ")"});
}

    } else{ if(heat_scale=="ordinal"){



      colors[times] = d3.scaleOrdinal()
              .domain(rng)
              .range(heat_col);


        w=rng.length*20;
        // Create scale

        var scale2 = d3.scaleBand()
        .domain(rng)
        .range([2,w]);

        // Add scales to axis
        var legend2 = d3.axisRight()
        .scale(scale2).tickSizeOuter(0);


if(legend){
        //Append group and insert axis
        svg.append("g")
        .attr("transform", "translate("+((width-35)-lg_x)+"," + ((height-100)-lg_y )+ ")")
        .call(legend2);



        rec_h=w/rng.length;

            svg.selectAll(".rects")
            .data(heat_col)
            .enter()
            .append("rect")
            .attr("y", function(d,i){return (((height-99)-lg_y)+i*rec_h);})
            .attr("height", rec_h)
            .attr("x", function(d,i){return ((width-45)-lg_x);})
            .attr("width", 10)
            .attr("fill", function(d){return d;});

}



    }
    }




	/* creating final data    */



if(heat_scale=="linear"){
 var tag;
  if(aggregate_func=="avg"){
   chDataReduced = d3.nest()
   .key(function(d) { return d.loci; })
   .rollup(function(v) { return d3.mean(v, function(d) { return d.data; });})
   .entries(chData);
   tag="avg";
 } else if(aggregate_func=="sum"){

   chDataReduced = d3.nest()
   .key(function(d) { return d.loci; })
   .rollup(function(v) { return d3.sum(v, function(d) { return d.data; });})
   .entries(chData);
 tag="sum";

 }

	var chDataReducedMin = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return d3.min(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedMax = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return d3.max(v, function(d) { return d.data; });})
  .entries(chData);
  var chDataReducedBarData = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].data);};return bar;})
  .entries(chData);
  var chDataReducedBarLabel = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].name);};return bar;})
  .entries(chData);
  var chDataReducedCount = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return v.length;})
  .entries(chData);

  var chDataReducedBarLink = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].hlink);};return bar;})
  .entries(chData);
	var chDataRange = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a,b;for(var i=0; i< v.length;i++){ a = v[i].loci_start; b=v[i].loci_end;    };return ""+a+"-"+b+"bp ";})
.entries(chData);
  for(var i = 0;i < chDataReduced.length;i++) {


	chDataReduced[i].range = chDataRange[i].value;
	chDataReduced[i].min = chDataReducedMin[i].value;
	chDataReduced[i].max = chDataReducedMax[i].value;
	chDataReduced[i].bar = chDataReducedBarData[i].value;
	chDataReduced[i].label = chDataReducedBarLabel[i].value;
	chDataReduced[i].count = chDataReducedCount[i].value;
  chDataReduced[i].hlink = chDataReducedBarLink[i].value;
}

var tip = [];
 tip[ploidy-1] = d3.select("body").append("div")
    .attr("class", "chtooltip")
    .style("opacity", 0)
    .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;

    var tip2 = [];
     tip2[ploidy-1] = d3.select("body").append("div")
        .attr("class", "chtooltip2")
        .style("opacity", 0)
        .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;


var clickFlag = false;


    d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
      tip[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
      ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' > "+tag+": </font> <font size='1'  ><b> "+(d.value).toFixed(2)+
      " <br><font size='1' color='grey' > Min.: </font>"+(d.min).toFixed(2)+" <br><font size='1' color='grey' > Max.: </font> "+(d.max).toFixed(2)+
      "</font><br><font size='1' color='grey' > Count: </font><font size='1'>"+d.count+"</p></font></div></div><div id ='microBar"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
      ";'><font size='2' >"+d.range+"</font></p></div>")
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg = d3.select('#microBar'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
      t_data=[];
      for(j=0;j<d.label.length;j++){
        t_data.push({lb:d.label[j],hl:d.hlink[j]}); }
      var ttext=mysvg.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;}).append("svg:text").attr("y",svgHeight*0.4).attr("transform","rotate(90)").attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("pointer-events", "all").style("cursor","pointer").attr("font-size", "9px").text(function(d,i){return d.lb;}); })
      .on("mouseout", function(d) {	tip[ploidy-1].transition() .delay(1000).duration(500)	.style("opacity", 0);}).style("visibility","visible").style("fill",function(d){ return colors[times](d.value);})
      .on("click", function(d) {


        if(clickFlag){
             tip2[ploidy-1].style("opacity", 0);
          }else{
        tip2[ploidy-1].style("z-index",99999999)	.style("opacity", 1).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
        tip2[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
        ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' > "+tag+": </font> <font size='1'  ><b> "+(d.value).toFixed(2)+
        " <br><font size='1' color='grey' > Min.: </font>"+(d.min).toFixed(2)+" <br><font size='1' color='grey' > Max.: </font> "+(d.max).toFixed(2)+
        "</font><br><font size='1' color='grey' > Count: </font><font size='1'>"+d.count+"</p></font></div></div><div id ='microBar2"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
        ";'><font size='2' >"+d.range+"</font></p></div>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg2 = d3.select('#microBar2'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg2.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
        t_data=[];
        for(j=0;j<d.label.length;j++){
          t_data.push({lb:d.label[j],hl:d.hlink[j]}); }
        var ttext=mysvg2.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;}).append("svg:text").attr("y",svgHeight*0.4).attr("transform","rotate(90)").attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("pointer-events", "all").style("cursor","pointer").attr("font-size", "9px").text(function(d,i){return d.lb;});
      } return clickFlag = !clickFlag; });

        if(ploidy==1 && labels){

        var chDataLabels = d3.nest()
    .key(function(d) { return d.loci; })
    .rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].name);   };return a[0];})
    .entries(chData);

    var chDataLabel = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].label);   };return a[0];})
.entries(chData);
       for(var i = 0;i < chDataReduced.length;i++) {


        chDataReduced[i].label_id=chDataLabel[i].value;
        chDataReduced[i].labels =chDataLabels[i].value;

      }


       d3.selectAll(".labels").data(chDataReduced, function(d) {return (d && d.label_id)||d3.select(this).attr("id");}).text(function(d){ return d.labels;});
     }






} else {
  if(heat_scale=="ordinal"){
  var chDataReduced = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].data);   };return a[0];})
  .entries(chData);


  var chDataReducedBarData = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].data);};return bar;})
  .entries(chData);
  var chDataReducedBarLabel = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].name);};return bar;})
  .entries(chData);
  var chDataReducedCount = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { return v.length;})
  .entries(chData);
  var chDataReducedBarLink = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) { v=v.sort(function(a,b){return Math.abs(a['ch_start']) - Math.abs(b['ch_start'])});bar=[]; for(var g=0;g<v.length;g++){bar.push(v[g].hlink);};return bar;})
  .entries(chData);
	var chDataRange = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a,b;for(var i=0; i< v.length;i++){ a = v[i].loci_start; b=v[i].loci_end;    };return ""+a+"-"+b+"bp ";})
.entries(chData);

  for(var i = 0;i < chDataReduced.length;i++) {


    chDataReduced[i].range = chDataRange[i].value;

    chDataReduced[i].bar = chDataReducedBarData[i].value;
    chDataReduced[i].label = chDataReducedBarLabel[i].value;
    chDataReduced[i].count = chDataReducedCount[i].value;
    chDataReduced[i].hlink = chDataReducedBarLink[i].value;
  }

  var tip = [];
  tip[ploidy-1] = d3.select("body").append("div")
     .attr("class", "chtooltip")
     .style("opacity", 0)
     .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;

     var tip2 = [];
      tip2[ploidy-1] = d3.select("body").append("div")
         .attr("class", "chtooltip2")
         .style("opacity", 0)
         .attr("style", "position: absolute;text-align: center;width: 180px;height: 140px;	 padding: 2px;	font: 12px sans-serif;	box-sizing: border-box;	border: 0px;border-radius: 8px;pointer-events: none;") ;
     var clickFlag=false;
     d3.selectAll(".chLoc").data(chDataReduced, function(d) {return (d && d.key)||d3.select(this).attr("id");}).on("mouseover", function(d) {tip[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
     tip[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
     ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' >  </font> <font size='1'  ><b> "+""+
     " <br><font size='1' color='grey' > Count:</font>"+d.count+" <br><font size='1' color='grey' >  </font> "+""+
     "</font><br><font size='1' color='grey' >  </font><font size='1'>"+""+"</p></font></div></div><div id ='microBar"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
     ";'><font size='2' >"+d.range+"</font></p></div>")
     .style("left", (d3.event.pageX) + "px")
     .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg = d3.select('#microBar'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
      t_data=[];
      for(j=0;j<d.label.length;j++){
        t_data.push({lb:d.label[j],hl:d.hlink[j]});
      }
       var ttext=mysvg.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;})
     .append("svg:text").attr("y",svgHeight*0.4)
     .attr("transform","rotate(90)")
     .attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';})
     .attr("font-size", "9px").style("pointer-events", "all")
     .attr("class","ttt").style("cursor","pointer")
     .text(function(d,i){return d.lb;});  })
     .on("mouseout", function(d) {	tip[ploidy-1].transition() .delay(1000).duration(500)	.style("opacity", 0);}).style("visibility","visible").style("fill",function(d){ return colors[times](d.value);})
     .on("click", function(d) {


       if(clickFlag){
            tip2[ploidy-1].style("opacity", 0);
         }else{
           tip2[ploidy-1].transition().duration(200)	.style("opacity", .9).style("background-color","#F5F5F5").style("width",180+d.count*(d3.max(d.label).length*3)+'px');
           tip2[ploidy-1].html("<div  style='float:top;position:relative;height:35%;' ><div style='border-radius: 5px;float:left;position:relative;height:55px;width:30%;background-color:"+colors[times](d.value)+
           ";' ></div><div  style='float:left;position:relative;width:70%;' ><p ><font size='1' color='grey' >  </font> <font size='1'  ><b> "+""+
           " <br><font size='1' color='grey' > Count:</font>"+d.count+" <br><font size='1' color='grey' >  </font> "+""+
           "</font><br><font size='1' color='grey' >  </font><font size='1'>"+""+"</p></font></div></div><div id ='microBar2"+ploidy+"' style='float:top;position:relative;height:35%'></div><br><div  style='float:top;height:20%;position:relative;color:'black"+
           ";'><font size='2' >"+d.range+"</font></p></div>")
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY - 18) + "px"); var svgWidth = 175+d.count*(d3.max(d.label).length)*3;var svgHeight = 50;var barPadding = 5;var barWidth = (svgWidth / d.bar.length);var mysvg2 = d3.select('#microBar2'+ploidy).append("svg").attr("width",svgWidth).attr("heigth",svgHeight);var barChart = mysvg2.selectAll('rect').data(d.bar).enter().append('rect').attr('height',svgHeight-40).attr('width', barWidth).attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';}).style("fill",function(d){return colors[times](d);});
            t_data=[];
            for(j=0;j<d.label.length;j++){
              t_data.push({lb:d.label[j],hl:d.hlink[j]});
            }

           var ttext=mysvg2.selectAll(".node").data(t_data).enter().append("svg:a").attr("xlink:href", function(d,i){ return d.hl;})
           .append("svg:text").attr("y",svgHeight*0.4)
           .attr("transform","rotate(90)")
           .attr('transform', function (d, i) { var translate = [barWidth * i, 0];  return 'translate('+ translate +')';})
           .attr("font-size", "9px").style("pointer-events", "all")
           .attr("class","ttt").style("cursor","pointer")
           .text(function(d,i){return d.lb;}); } return clickFlag = !clickFlag; });

 if(ploidy==1 && labels){

      var chDataLabels = d3.nest()
  .key(function(d) { return d.loci; })
  .rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].name);   };return a[0];})
  .entries(chData);
  var chDataLabel = d3.nest()
.key(function(d) { return d.loci; })
.rollup(function(v) {  var a=[];for(var i=0; i< v.length;i++){ a.push(v[i].label);   };return a[0];})
.entries(chData);
     for(var i = 0;i < chDataReduced.length;i++) {


      chDataReduced[i].label_id = chDataLabel[i].value;
      chDataReduced[i].labels =chDataLabels[i].value;

    }


     d3.selectAll(".labels").data(chDataReduced, function(d) {return (d && d.label_id)||d3.select(this).attr("id");}).text(function(d){ return d.labels;});
   }
}

}













  //heatmap code end
 }


}


//end of vertical
