#' @title render interactive chromosome plots
#'
#' @name chromoMap
#' @description render an interactive graphics of human chromosome. It creates
#' an HTML widget that calls the JavaScript library chromoMap.js that generates
#' the chromosome graphics
#' @param chData The chromosome data required for annotating chromosome and creating 
#' heatmaps. It is a data.frame with atleast three colums viz. name (specify the 
#' name for annotation), chrom (specify chromosome name), and start (specify
#' the start position of element). While for heatmaps additional columns 
#' data and/or secondData need to added.
#' 
#' @param type Specify the type of chromosome plot.Takes only one value from
#' "annotation" , "heatmap-single", or "heatmap-double". For more information 
#' about the type of plots see vignette.
#' 
#' @param align specify the alignment of plot. Takes the value "horizontal" or
#' "vertical".
#' 
#' @param bgCol specify the backround color.
#' @param bgBorder specify the border color.
#' @param chCol specify the body color of chromosomes
#' @param chBorder specify the border color of chromosomes
#' @param annoColor specify the color of annotation bars on the chromosomes.
#' @param textCol specify the text color.
#' @param HeatColRange specify the heat-colors for the heatmap. Takes a character
#' vecter with three color values each corresponding to minimum, medium, and
#' maximum data.
#' @param dim specify dimension of plot. Takes two values for width and height 
#' of the plot.
#' @param  width use to define width of widget. Usually ignore and do not change
#' @param height height of widget. ignore
#' 
#' @examples 
#' 
#' library(chromoMap)
#' data("pancandata")
#' #dataset contains two data
#' #view data set
#' head(pancandata$data1)
#' head(pancandata$data2)
#' 
#' #plotting simple annotation
#' chromoMap(pancandata$data1)
#' 
#' #plotting heatmap-single
#' chromoMap(pancandata$data1,type="heatmap-single")
#' 
#' #plotting heatmap double
#' chromoMap(pancandata$data2,type="heatmap-double")
#' 
#' #change orientation of plot
#' chromoMap(pancandata$data1,align="vertical")
#' 
#' #change chromosome color
#' chromoMap(pancandata$data1,chCol="green",chBorder="green")
#' 
#' #change chromosome plot background and text color
#' chromoMap(pancandata$data2,type="heatmap-double",textCol="white",bgCol="black")
#' 
#' 
#' 
#' 
#' 
#' @import htmlwidgets
#'
#' @export
#' @title htmlwidget will create the widget for the plot.
#' @description required for creating widgets
#' @import htmlwidgets
#'
#' @export
chromoMap <- function(chData,type=c("annotation","heatmap-single","heatmap-double"),
                      align="horizontal",
                      bgCol="white",
                      bgBorder="white",
                      chCol="#c70039",
                      chBorder="#c70039",
                      annoColor="orange",
                      textCol="black",
                      HeatColRange=c("red","white","blue"),
                      dim=c(640,480),
                      width=NULL,
                      height=NULL
                      ) {
  
  
   if(missing(chData)){
     stop("Supply the data for the chromoMap!")
   }
   
   if(type=="heatmap-double" && ncol(chData)<5){
     stop("Secondary data is missing!")
   }
  
  
  
  # forward options using x
  x = list(
    chData = chData ,type = type[1]
    , align = align , bgCol = bgCol ,
    bgBorder=bgBorder
    ,chCol = chCol, chBorder = chBorder,
    annoColor= annoColor,textCol=textCol,
    HeatColRange=HeatColRange, dim=dim
    
    
  )
  
  
  # create widget
  htmlwidgets::createWidget(
    name = 'chromoMap',
    x,
    width = width,
    height = height,
    package = 'chromoMap',
    htmlwidgets::sizingPolicy(padding = 10, browser.fill = TRUE),
    
    
  )
  
  
}
  



#' Shiny bindings for chromoMap
#'
#' Output and render functions for using chromoMap within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a chromoMap
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name chromoMap-shiny
#'
#' @export
chromoMapOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'chromoMap', width, height, package = 'chromoMap')
}

#' @rdname chromoMap-shiny
#' @export
renderChromoMap <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, chromoMapOutput, env, quoted = TRUE)
}
