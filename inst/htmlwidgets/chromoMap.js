HTMLWidgets.widget({

  name: 'chromoMap',

  type: 'output',

  factory: function(el,width,height) {



    return {

      renderValue: function(x) {

        // adding the division with id  required to render plot
        d3.select(el).append("div")
          .attr("id", x.div_id);

        // TODO: code to render the widget, e.g.
        //  var data = HTMLWidgets.dataframeToD3(x.chData);
        var a=[];
        var b=[];
        for(i=0;i<x.chData.length;i++){

          a[i]=HTMLWidgets.dataframeToD3(x.chData[i]);
        }
        for(i=0;i<x.nLoci.length;i++){

          b[i]=HTMLWidgets.dataframeToD3(x.nLoci[i]);
        }

        chromoMap(a,
          b,
          x.ploidy_n,
          x.title,
          x.cnt,
          x.ch_gap,
          x.top_margin,
          x.left_margin,
          x.chr_width,
          x.chr_length,
          x.chr_col,
          x.heatmap,
          x.v_align,
          x.ch_domain,
          x.lg_x,
          x.lg_y,
          x.heat_scale,
          x.labels,
          x.div_id,
          x.w,
          x.h,x.rng,x.heat_col,x.an_col,x.ch_text,x.legend,x.aggregate_func

);



      },

      resize: function(width,heigh) {

        // already handled by main function that render plot

      }

    };
  }
});
