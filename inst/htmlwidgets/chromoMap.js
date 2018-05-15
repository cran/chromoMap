HTMLWidgets.widget({

  name: 'chromoMap',

  type: 'output',

  factory: function(el,width,height) {

    // adding the division with id "chromap" required to render plot
    d3.select(el).append("div")
      .attr("id", "chromap");

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
          var data = HTMLWidgets.dataframeToD3(x.chData);
        
        chromoMap(data,
                  x.type, 
                  x.align, 
                  x.bgCol,
                  x.bgBorder,
                  x.chCol,
                  x.chBorder,
                  x.annoColor,
                  x.textCol,
                  x.HeatColRange,
                  x.dim);
        	


      },

      resize: function(width,heigh) {

        // already handled by main function that render plot

      }

    };
  }
});