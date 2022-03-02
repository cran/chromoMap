#' @title render interactive chromosome plots of any living organism and annotate elements
#'
#' @name chromoMap
#' @description render an interactive graphics visualization of entire chromosomes
#'  or chromosomal regions of any living organism. Chromosomal elements such as genes 
#'  can be annotated easily using this tool.
#' @param ch.files filename(s) as character vector OR list of data.frames containing co-ordinates of the chromosomes to render 
#' 
#' @param data.files filename(s) as character vector OR list of data.frames containing data to annotate on the chromosomes.
#' 
#' @param title a character string to be used as a title in plot
#' 
#' @param ch_gap provide spacing between chromosomes.
#' @param ploidy specify the number of sets of chromsomes being passed.
#' @param top_margin specify the margin from top of the plot
#' @param left_margin specify the margin from the left of the plot
#' @param chr_width specify the width of each chromsome
#' @param chr_length specify the length of each chromsome.
#' @param chr_color a vector specifying the color of each chromsome in a set. A color
#' can be assigned to each set by passing a different color values as vector
#' @param data_based_color_map a boolean to tell the plot to use the data provided in file for
#' visualizing annotation
#' @param  data_type specifying the data type of the data used. takes value either 'categorical' or
#' 'numeric'
#' @param data_colors specify annotation colors for the data
#' @param segment_annotation a boolean to use segment-annotation algorithm
#' @param labels a boolean to include labels in plot
#' @param chr_text a boolean vector to enable or disable chromsome texts for each ploidy.set
#' @param legend a boolean vector to enable or disable legend for each set/ploidy
#' @param lg_x specify the x or horizontal distance of the legend from origin(bottom right corner)
#' @param lg_y specify the y or vertical distnce of the legend from the origin
#' @param hlinks a boolean to use hyperlinks supplied in data
#' @param aggregate_func takes either 'sum' or 'avg' to specift aggregate function for each loci
#' @param anno_col a vector to specify annotation color for each set.
#' @param canvas_width width of the plot
#' @param canvas_height height of the plot
#' @param plots specify the type of plot to visualize. takes either 'scatter' , 'bar' or 'tags'.(default: 'none')
#' @param tag_filter a list to specify the filter operation and operands for each ploidy.
#' @param plot_height specify plot height for each ploidy. default: c(30)
#' @param plot_ticks specify number of ticks for plot axis. default: c(4)
#' @param plot_color specify the plot color for each ploidy. default: c("blue")
#' @param plot_y_domain specify plot y-axis domain. default: list(c(0,0))
#' @param ch2D.colors specify the group colors for visualizing categories on 2D chromosome plots
#' @param ch2D.lg_x specify the x or horizontal distance of 2D plot legend from the origin(bottom right corner) 
#' @param ch2D.lg_y specify the y or vertical distance of 2D plot legend
#' @param ch2D.cat.order manually setting the order of categories for 2D-Chromsome plot
#' @param ref_line a boolean to use horizontal reference line in plot. default: c(FALSE)
#' @param refl_pos specify the position of reference line. default: c(0)
#' @param refl_color specify the color of the reference line. default: c("grey")
#' @param refl_stroke_w specify the stroke width of the reference line. default: c(2)
#' @param tagColor specify the color of tags. default: c("red")
#' @param heat_map a boolean to use if chromosome heatmaps are shown. default: c(TRUE),
#' @param text_font_size specify chromosome text font-size. default: c(10)
#' @param chr_curve specify the chromosome curves at the telomeres or centromere loci. default:5
#' @param title_font_size specify the font-size of the title. default:12
#' @param label_font specify the font-size of the labels. default:9
#' @param label_angle specify the angle of rotation of labels. default: -90
#' @param vertical_grid a boolean to use vertical grid lines. default: FALSE
#' @param grid_array specify the position(s) of grid line(s) in bp to highlight locations across genome. default: c(0,5000,10000)
#' @param grid_color specify the color of the grid lines. default: "grey"
#' @param grid_text specify the text to be attached at the top end of gridlines 
#' @param grid_text_size specify the font-size of the text 
#' @param grid_text_y specify the y-distance (from top) for the text
#' @param plot_filter a list specify the plot filter operation, operands, and filter-color for each ploidy. 
#' @param id specify a unique id doe chromoMap plot. default: c("chromap")
#' @param region specify the region of interest for chromosome(s) for zoom-in. Format: "chrName:Ploidy:Start:Stop"
#' @param show.links a boolean to specify whether links are visualized. default: FALSE
#' @param loci_links a character vector specifying file name or a data.frame for links input data
#' @param directed.edges a boolean to visualize directed edges
#' @param y_chr_scale adjust the chromosome scale along y-axis
#' @param links.colors specify the links colors
#' @param links.lg_x specify x or horizontal distance of links legend from the origin
#' @param links.lg_y specify y or vertical distance of links
#' @param discrete.domain manually specify the order of categories.
#' @param n_win.factor specify the factor by which the chr will be scaled;increases number of windows (default:1)
#' @param chr.scale.ticks specify the number of ticks for chr scale (default:5)
#' @param export.options boolean to include export buttons in the plot
#' @param fixed.window Boolean to specify wether to use fixed window visualization
#' @param window.size specify the window size, if fixed.window is TRUE
#' @param win.summary.display boolean to display window summary to console
#' @param remove.last.window For fixed window analysis, boolean to specify whether to include last window of chromosomes
#' @param guides boolean to display guides
#' @param guides_color set guides color.
#' @param ann.h set annotation bar height in 2D-Chromosome plot
#' @param chr.2D.plot boolean to specify visualize 2d Chromosome plot
#' @param display.chr boolean to show.hide chromosome
#' @param plot.shift shifting the plots in y direction in case hiding chromosomes
#' @param plot.legend.labels specify plot legend labels
#' @param cat.legend.label specify categorical-data legends label
#' @param plot.y.labels specify plots y-axis labels
#' @param plot.y.lab.x adjust plot y labels in x-direction
#' @param plot.y.lab.y adjust plot y labels in y-direction
#' @param plot.y.lab.size set size of plot y labels
#' @param scale.suffix set the suffix for chromosome scale(default:'bp')
#' @param numeric.domain manually set data domain(min,max) for heat colors for numeric data
#' @param interactivity boolean to enable/disable interactivity on chromosomes
#' 
#' 
#' @examples 
#' \dontrun{
#' 
#' library(chromoMap)
#' 
#' #simple annotations
#' chromoMap("chromosome_file.txt","annotation_file.txt")
#' 
#' #polyploidy example
#' chromoMap(c("chromosome_set1.txt","chromosome_set2.txt"),
#'           c("annotation_set1.txt","annotation_set2.txt"), ploidy=2)
#' 
#' #plotting group annotation
#' chromoMap("chromosome_file.txt","annotation_file.txt",
#'            data_base_color_map=T, data_type="categorical")
#' 
#' #plotting chromsome heatmaps
#' chromoMap("chromosome_file.txt","annotation_file.txt",
#'            data_based_color_map=T, data_type="numeric")
#' 
#' #enabling hyperlinks
#' chromoMap("chromosome_file.txt","annotation_file.txt", hlinks=T)
#' 
#' #enabling labels
#' chromoMap("chromosome_file.txt","annotation_file.txt", labels=T)
#' 
#' #change chromosome color
#' chromoMap("chromosome_file.txt","annotation_file.txt", chr_color="red")
#' 
#' }
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
#' @importFrom utils read.table
#' @importFrom grDevices col2rgb
#' @importFrom stats na.omit
#' @importFrom utils flush.console
#' @export

chromoMap <- function(ch.files,
                      data.files,
                      title=c(),
                      ch_gap=5,
                      ploidy=1,
                      top_margin=25,
                      left_margin=50,
                      chr_width=15,
                      chr_length=4,
                      chr_color=c("black"),
                      data_based_color_map=FALSE,
                      segment_annotation=FALSE,
                      lg_x=0,
                      lg_y=0,
                      data_type=c("numeric","categorical"),
                      labels=FALSE,
                      canvas_width=NULL,
                      canvas_height=NULL
                      ,data_colors=list(),anno_col=c("#10B85F"),chr_text=c(TRUE),
                      discrete.domain = NULL,
                      legend=c(FALSE),
                      hlinks=FALSE,
                      aggregate_func=c("avg"),
                      plots=c("none"),
                      tag_filter = list(c("none",0)),
                      plot_height=c(30),
                      plot_ticks=c(4),
                      plot_color=c("blue"),
                      plot_y_domain = list(c(0,0)),
                      ch2D.colors = NULL,
                      ch2D.cat.order = NULL,
                      ch2D.lg_x = 0,
                      ch2D.lg_y = 0,
                      ref_line=c(FALSE),
                      refl_pos=c(0),
                      refl_color=c("grey"),
                      refl_stroke_w=c(2),
                      tagColor = c("red"),
                      heat_map = c(TRUE),
                      text_font_size=c(10),
                      chr_curve = 5,
                      title_font_size = 12,
                      label_font = 9,
                      label_angle = -90,
                      vertical_grid = FALSE,
                      grid_array = c(0,5000,10000),
                      grid_color = "grey",
                      grid_text = NULL,
                      grid_text_size = 12,
                      grid_text_y = 20,
                      plot_filter = list(c("none",0)),
                      id=c("chromap"),
                      region = NULL,
                      show.links = FALSE,
                      loci_links = "none",
                      directed.edges = F,
                      y_chr_scale = 0,
                      links.colors = NULL,
                      links.lg_x = 0,
                      links.lg_y = 0,
                      n_win.factor = 1,
                      chr.scale.ticks = 5,
                      export.options = F,
                      fixed.window = F,
                      window.size = NULL,
                      win.summary.display = F,
                      remove.last.window = T,
                      guides = F,
                      guides_color = "lightgrey",
                      ann.h = 1,
                      chr.2D.plot = F,
                      display.chr = T,
                      plot.shift = c(1),
                      plot.legend.labels = c(""),
                      cat.legend.label = "",
                      plot.y.labels = c(""),
                      plot.y.lab.x = 10,
                      plot.y.lab.y = 0,
                      plot.y.lab.size = 15,
                      scale.suffix = "bp",
                      numeric.domain = NULL,
                      interactivity = T
                      ) {
  
  
   if(missing(ch.files)){
     stop("No file(s) choosen for rendering chromoMap! ")
   }
  if(missing(data.files)){
    stop("Error: No file(s) choosen for input data! ")
  }
  
  if(length(ch.files)!=length(data.files)){
    stop(message("Error: The number of data files(s) must same as the number of chromsome file(s)"))
  }
  
  if(ploidy>length(ch.files)){
    stop(message("Error:Please supply sufficient files equivalent to the ploidy value."))
  }
  #default settings 
  if(length(ch.files)>ploidy){
    stop(message("Error: Please set the 'ploidy' argument."))
  }
  
  if(length(ch.files)==1){
    chr_text=c(chr_text[1],TRUE)
  } else {
    if(length(chr_text)<length(ch.files)){
      
      
      chr_text=rep(chr_text[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    legend=c(legend[1],FALSE)
  } else {
    if(length(legend)<length(ch.files)){
      
      
      legend=rep(legend[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    display.chr=c(display.chr[1],FALSE)
  } else {
    if(length(display.chr)<length(ch.files)){
      
      
      display.chr=rep(display.chr[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    aggregate_func=c(aggregate_func[1],"")
  } else {
    if(length(aggregate_func)<length(ch.files)){
      
      
      aggregate_func=rep(aggregate_func[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    plot.legend.labels=c(plot.legend.labels[1],"")
  } else {
    if(length(plot.legend.labels)<length(ch.files)){
      
      
      plot.legend.labels=rep(plot.legend.labels[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    plot.y.labels=c(plot.y.labels[1],"")
  } else {
    if(length(plot.y.labels)<length(ch.files)){
      
      
      plot.y.labels=rep(plot.y.labels[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    tag_filter=tag_filter
  } else {
    if(length(tag_filter)<length(ch.files)){
      
      for(h in 1:length(ch.files)){
      tag_filter[h]=tag_filter[1]}
    }
  }
  
  if(length(ch.files)==1){
    plots=c(plots[1],"")
  } else {
    if(length(plots)<length(ch.files)){
      
      
      plots=rep(plots[1],length(ch.files))
    }
  }
  
  
  if(length(ch.files)==1){
    chr_color=c(chr_color[1],"")
  } else {
    if(length(chr_color)<length(ch.files)){
      
      chr_color=rep(chr_color[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    plot_height=c(plot_height[1],0)
  } else {
    if(length(plot_height)<length(ch.files)){
      
      
      plot_height=rep(plot_height[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    plot.shift=c(plot.shift[1],0)
  } else {
    if(length(plot.shift)<length(ch.files)){
      
      
      plot.shift=rep(plot.shift[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    plot_ticks=c(plot_ticks[1],0)
  } else {
    if(length(plot_ticks)<length(ch.files)){
      
      
      plot_ticks=rep(plot_ticks[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    plot_color=c(plot_color[1],"")
  } else {
    if(length(plot_color)<length(ch.files)){
      
      
      plot_color=rep(plot_color[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    plot_y_domain=plot_y_domain
  } else {
    if(length(plot_y_domain)<length(ch.files)){
      
      for(k in 1:length(ch.files)){
        plot_y_domain[k] = plot_y_domain[1]
      }
    }
  }
  
  if(length(ch.files)==1){
    ref_line=c(ref_line[1],TRUE)
  } else {
    if(length(ref_line)<length(ch.files)){
      ref_line=rep(ref_line[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    refl_pos=c(refl_pos[1],0)
  } else {
    if(length(refl_pos)<length(ch.files)){
      refl_pos=rep(refl_pos[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    refl_color=c(refl_color[1],"")
  } else {
    if(length(refl_color)<length(ch.files)){
      refl_color=rep(refl_color[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    refl_stroke_w=c(refl_stroke_w[1],0)
  } else {
    if(length(refl_stroke_w)<length(ch.files)){
      refl_stroke_w=rep(refl_stroke_w[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    tagColor=c(tagColor[1],"")
  } else {
    if(length(tagColor)<length(ch.files)){
      
      
      tagColor=rep(tagColor[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    heat_map=c(heat_map[1],TRUE)
  } else {
    if(length(heat_map)<length(ch.files)){
      
      
      heat_map=rep(heat_map[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    chr.2D.plot=c(chr.2D.plot[1],FALSE)
  } else {
    if(length(chr.2D.plot)<length(ch.files)){
      
      
      chr.2D.plot=rep(chr.2D.plot[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    text_font_size=c(text_font_size[1],0)
  } else {
    if(length(text_font_size)<length(ch.files)){
      text_font_size=rep(text_font_size[1],length(ch.files))
    }
  }
  
  
  if(length(ch.files)==1){
    plot_filter=plot_filter
  } else {
    if(length(plot_filter)<length(ch.files)){
      
      for(h in 1:length(ch.files)){
        plot_filter[h]=plot_filter[1]}
    }
  }
  
  chr_width=as.integer(chr_width)
  chr_length=as.integer(chr_length)
  color_map=data_based_color_map
  color_scale=data_type
  color_scale=color_scale[1]
  n_win.factor = as.integer(n_win.factor)
  
  if(fixed.window){
    if(is.null(window.size)){
      stop("Window size is not provided.")
    }
  }
  
  if(T %in% chr.2D.plot){
    if(segment_annotation){
      stop("2D plot not supported for Segmentation annotation feature.")
    }
  }
  
  
  if(color_scale=="numeric"){
    color_scale="linear"
  } else {
    
    if(color_scale=="categorical"){
      
      color_scale="ordinal"
    } else {
      stop(message("Error: data_type can be either 'numeric' or 'categorical' "))
    }
  }
  
  
  if(!is.list(data_colors)){
    
    stop(message("ERROR: The attribute 'data_colors' should be passed as a list.")) 
  }
  
  if(length(ch.files)==1){
    anno_col=c(anno_col[1],"")
  } else {
    if(length(anno_col)<length(ch.files)){
      
      anno_col=rep(anno_col[1],length(ch.files))
    }
    
  }
  
  cat("********************************** __ __ ************\n")    
  cat("** __**|__ * __* __ * __ __ * __ *|  |  |* __ * __ **\n")
  cat("**|__**|  |*|  *|__|*|  |  |*|__|*|  |  |*|_ |*|__|**\n")
  cat("***********************************************|   **\n")
  cat("*****************************************************\n")
  cat("OUTPUT: \n")
  cat("Number of Chromosome sets:",length(ch.files),"\n")
  
  
  #feching the data to render chromoMap
  chr.data=list()
  max.ch.domain=data.frame()
  
  width=NULL
  height=NULL
  
  ch_longest_len=c()
  ch.data=list()
  for(g in 1:ploidy){
    if(is.character(ch.files)){
    ch.data[[g]]= read.table(ch.files[g],sep = "\t",stringsAsFactors = F,header = F)
    } else if(is.list(ch.files)){ch.data[[g]] = ch.files[[g]]}
    if(length(region)>=1){
      for(r in 1:length(region)){
        if(as.numeric(strsplit(region[r],":")[[1]][2])==g){
          ch.data[[g]][ch.data[[g]][,1]==strsplit(region[r],":")[[1]][1],2] <- as.numeric(strsplit(region[r],":")[[1]][3])
          ch.data[[g]][ch.data[[g]][,1]==strsplit(region[r],":")[[1]][1],3] <- as.numeric(strsplit(region[r],":")[[1]][4])
        }
      }
    }
    data_col=ncol(ch.data[[g]])
    if(data_col==3){
    ch_longest_len[g]=max(as.numeric(ch.data[[g]][,3]-ch.data[[g]][,2]))
      } else {
      if(data_col==4){ch_longest_len[g]=max(as.numeric(ch.data[[g]][,3]-ch.data[[g]][,2]));cnt=TRUE} else{
        stop(message("The Input data contains insufficient columns. Please check the vignette for more detail."))
      }
    }
  }
  
  
  ch_longest_len=max(ch_longest_len)
  
  
  cnt= c()
  for(g in 1:ploidy){
    if(is.character(ch.files)){
    chr.data[[g]]= read.table(ch.files[g],sep = "\t",stringsAsFactors = F,header = F)
    } else if(is.list(ch.files)){ chr.data[[g]] = ch.files[[g]]}
    if(length(region)>=1){
      for(r in 1:length(region)){
        if(as.numeric(strsplit(region[r],":")[[1]][2])==g){
          chr.data[[g]][ch.data[[g]][,1]==strsplit(region[r],":")[[1]][1],2] <- as.numeric(strsplit(region[r],":")[[1]][3])
          chr.data[[g]][ch.data[[g]][,1]==strsplit(region[r],":")[[1]][1],3] <- as.numeric(strsplit(region[r],":")[[1]][4])
        }
      }
    }
    
    
    data_col=ncol(chr.data[[g]])
    if(data_col==3){colnames(chr.data[[g]])=c("ch_name","ch_start","ch_end");cnt=FALSE} else {
      if(data_col==4){colnames(chr.data[[g]])=c("ch_name","ch_start","ch_end","cnt_start");cnt=TRUE} else{
        stop(message("The Input data contains insufficient columns. Please check the vignette for more details."))
      }
    }
    
    cat("Number of Chromosomes in set ",g,":",nrow(chr.data[[g]]),"\n")
    
    if(!fixed.window){
    switch(as.character(data_col),
           
           '4'={chr.data[[g]]=data.frame(
             name=chr.data[[g]]$ch_name,
             start=chr.data[[g]]$ch_start,
             end=chr.data[[g]]$ch_end,
             ch_average= (chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,
             n= round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*(100*n_win.factor),
             cnt_start=chr.data[[g]]$cnt_start,
             cnt_proprtion= round(chr.data[[g]]$cnt_start/(chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1),2),
             
             p=(round(round(chr.data[[g]]$cnt_start/(chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1),2)*(round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*(100*n_win.factor)))),
             q=(round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*(100*n_win.factor))-(round(round(chr.data[[g]]$cnt_start/(chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1),2)*(round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*(100*n_win.factor))))
             ,seq_len=chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1,stringsAsFactors = F)},
           '3'={chr.data[[g]]=data.frame(
             name=chr.data[[g]]$ch_name,
             start=chr.data[[g]]$ch_start,
             end=chr.data[[g]]$ch_end,
             ch_average= (chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,
             n= round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*(100*n_win.factor),
             seq_len=chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1,stringsAsFactors = F);}
           
    )} else {
      
      switch(as.character(data_col),
             
             '4'={chr.data[[g]]=data.frame(
               name=chr.data[[g]]$ch_name,
               start=chr.data[[g]]$ch_start,
               end=chr.data[[g]]$ch_end,
               ch_average= (chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,
               n= ceiling((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/window.size),
               cnt_start=chr.data[[g]]$cnt_start,
               cnt_proprtion= round(chr.data[[g]]$cnt_start/(chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1),2),
               
               p=ceiling(chr.data[[g]]$cnt_start/window.size),
               q=ceiling(((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1) - chr.data[[g]]$cnt_start)/window.size)
               ,seq_len=chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1,stringsAsFactors = F)},
             '3'={chr.data[[g]]=data.frame(
               name=chr.data[[g]]$ch_name,
               start=chr.data[[g]]$ch_start,
               end=chr.data[[g]]$ch_end,
               ch_average= (chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,
               n= ceiling((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/window.size),
               seq_len=chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1,stringsAsFactors = F);}
             
      )
    }
    
    if(data_col==4){
      max.ch.domain=rbind.data.frame(max.ch.domain,cbind.data.frame(chr.data[[g]][chr.data[[g]]$seq_len==max(chr.data[[g]]$seq_len),c(1,2,3,10)],pld=g))
      
    } else {
    if(data_col==3){
    max.ch.domain=rbind.data.frame(max.ch.domain,cbind.data.frame(chr.data[[g]][chr.data[[g]]$seq_len==max(chr.data[[g]]$seq_len),c(1,2,3,6)],pld=g))
 }}   
  }
  
  #finding the longest ch in all sets or dimain for ordinal
  #print(max.ch.domain)
  
  #ch.domain=as.character(unique(max.ch.domain[max.ch.domain$seq_len==max(max.ch.domain$seq_len),c(1,5)]))
  long.chr=max.ch.domain[max.ch.domain$seq_len==max(max.ch.domain$seq_len),c(1,5)]
  long.chr = long.chr[1,]
  #print(long.chr[1,])
  
  ##################################################
  ###########################################
  #creating the ranges for the chromosomes
  mega.list.of.ranges=list()
  ch.name.list=list()
  tempInput = list()
  clusters_info = list()
  
  # check if cnt
  if(fixed.window){
    if(cnt){
      stop("Fixed window visualization is not supported with centromeres.")
    }
  }
  
  for(g in 1:ploidy){
    
    list.of.ranges=list()
    namee=c()
    
    for(j in 1:nrow(chr.data[[g]])){
      
      ch.start = chr.data[[g]]$start[j]
      ch.end = chr.data[[g]]$end[j]
      ch.loci= chr.data[[g]]$n[j]
      
      
      if(!fixed.window){
        
        step.size=(ch.end-ch.start+1)/ch.loci
      } else {
        step.size = window.size
      }
      
      shift.distance = chr.data[[g]]$start[j] - 1
      
      #print(paste0("step size ",g," :",step.size))
      
      brkpoints = ceiling(step.size*seq_len(ch.loci))
      if(fixed.window){
        if(remove.last.window){
        if(((ch.end-ch.start+1) - brkpoints[(length(brkpoints)-1)]) != step.size){
          
          brkpoints = brkpoints[1:(length(brkpoints)-1)]
          chr.data[[g]]$n[j] = chr.data[[g]]$n[j] - 1
          chr.data[[g]]$end[j] = brkpoints[length(brkpoints)]
          
        }}
      }
      range.start=c()
      range.end=c()
      ch_name=c()
      
      for(i in 1:length(brkpoints)){
          
          
          ch.loci.start=ch.start
          if(i != length(brkpoints)){
          ch.loci.end= brkpoints[i] + shift.distance 
          } else {
            if(!remove.last.window){
            ch.loci.end = ch.end
            } else {
              ch.loci.end = brkpoints[i] + shift.distance
            }
          }
          ch.start= ch.loci.end + 1
          
          
          range.start[i]=ch.loci.start
          range.end[i]=ch.loci.end
          ch_name[i]=chr.data[[g]]$name[j]
        
      }
      
      list.of.ranges[[j]]=data.frame(
        range_start=range.start,
        range_end=range.end,ch_name,stringsAsFactors = F)
      
      namee[j]=unique(ch_name)
      
    }
    
    ch.name.list[[g]]=namee
    names(list.of.ranges)=chr.data[[g]]$ch_name
    mega.list.of.ranges[[g]]=list.of.ranges
    
  }
  #print(mega.list.of.ranges[[1]][[1]])
  if(win.summary.display){
  cat("########### Window Summary ##########\n")
  for(q in 1:ploidy){
    cat("Summary for Ploidy ",q,"\n")
    cat("Chr\tnwins\tmin\tmax ","\n")
    for (e in 1:nrow(chr.data[[q]])) {
      st.sz = mega.list.of.ranges[[q]][[e]]$range_end - mega.list.of.ranges[[q]][[e]]$range_start + 1
      cat(mega.list.of.ranges[[q]][[e]]$ch_name[1],"\t",
          nrow(mega.list.of.ranges[[q]][[e]]),"\t",
          min(st.sz),"\t",max(st.sz),"\n")
    }
  }
    cat("####################################\n")
  }
  ch.domain = c()
  #print(mega.list.of.ranges[[as.numeric(long.chr[1,2])]])
  tmp.list.obj <- mega.list.of.ranges[[as.numeric(long.chr[1,2])]]
  longest.chr.df <- data.frame()
  for(f in 1:length(tmp.list.obj)){
    if(tmp.list.obj[[f]]$ch_name[1] == as.character(long.chr[1,1])){
      longest.chr.df <- tmp.list.obj[[f]]
    }
  }
  #print(longest.chr.df)
  dom.idx = 1
  for(ff in 1:nrow(longest.chr.df)){
    if(ff != nrow(longest.chr.df)){
      ch.domain[dom.idx] = longest.chr.df[ff,1]
      dom.idx = dom.idx + 1
    } else {
      
        ch.domain[dom.idx] = longest.chr.df[ff,1]
        dom.idx = dom.idx + 1
        ch.domain[dom.idx] = longest.chr.df[ff,2]
      }
    }
  
  ch.domain <- as.character(ch.domain)
  #print(ch.domain)
  
  # adjusting for width
  
  if(is.null(canvas_width)){
    if(!fixed.window){
      canvas_width = 100*n_win.factor*chr_length + left_margin + 100
    } else {
      canvas_width = chr_length*nrow(longest.chr.df) + left_margin + 100
    }
  }
  
  # defining the x-scale
  win.scale = c()
  if(!fixed.window){
    win.scale = 100*n_win.factor
  } else {
    win.scale = nrow(longest.chr.df)
  }
  #print(chr.data)
  ########################################################################
  #assigning loc for each gene or elemnt
  cat("Processing data.. \n")
  
  inputData=list()
  labels.ids=list()
  
  if(!segment_annotation){
  
  for(h in 1:ploidy){
    if(is.character(data.files)){
    inputData[[h]]=read.table(data.files[h],sep = "\t",stringsAsFactors = F,header = F)
    } else if(is.list(ch.files)){inputData[[h]] = data.files[[h]]}
    temp_outer=data.frame()
    bf_rw=nrow(inputData[[h]])
    for(cc in 1:nrow(chr.data[[h]])){
      temp_dff <- inputData[[h]][inputData[[h]][,2]==chr.data[[h]][cc,1],]
      temp_dff <- temp_dff[(temp_dff[,3]>=chr.data[[h]][cc,2] & temp_dff[,4]<=chr.data[[h]][cc,3]),]
      temp_outer=rbind.data.frame(temp_outer,temp_dff)
    }
    rownames(temp_outer) <- c(1:nrow(temp_outer))
    inputData[[h]] <- temp_outer
    af_rw=nrow(inputData[[h]])
    data_col2=ncol(inputData[[h]])
    if(bf_rw != af_rw){
      cat("WARNING: ",(bf_rw-af_rw)," out-of-bound annotations are removed in chromosome set ",h,".\n")
    }
    
    #file select start
    switch (as.character(data_col2),
            '4' = {
              if(!chr.2D.plot[h]){
              inputData[[h]]=cbind.data.frame(inputData[[h]],
                                              rep(NA,nrow(inputData[[h]])),
                                              rep("http://",nrow(inputData[[h]])),
                                              rep(NA,nrow(inputData[[h]])));
              colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
              } else {
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                inputData[[h]][,3],
                                                rep("http://",nrow(inputData[[h]])),
                                                rep(NA,nrow(inputData[[h]])));
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                color_map = T
                plots[h] = "2d"
                data_based_color_map = T
                color_scale = "linear"
                heat_map[h] = F
                legend[h] = F
              }
            },
            '5' = {
              if(!hlinks){
                if(!chr.2D.plot[h]){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep("http://",nrow(inputData[[h]])),
                                                rep(NA,nrow(inputData[[h]])));
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                } else {
                  inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                  rep("http://",nrow(inputData[[h]])),
                                                  inputData[[h]][,5]);
                  inputData[[h]][,5] = inputData[[h]][,3]
                  colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                  color_map = T
                  plots[h] = "2d"
                  data_based_color_map = T
                  color_scale = "linear"
                  heat_map[h] = F
                  legend[h] = F
                }
              } else {
                if(!chr.2D.plot[h]){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep(NA,nrow(inputData[[h]])),
                                                rep(NA,nrow(inputData[[h]])));
                inputData[[h]]=inputData[[h]][,c(1,2,3,4,6,5,7)]
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                } else {
                  inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                  rep(NA,nrow(inputData[[h]])),
                                                  rep(NA,nrow(inputData[[h]])));
                  inputData[[h]]=inputData[[h]][,c(1,2,3,4,6,5,7)]
                  inputData[[h]][,5] = inputData[[h]][,3]
                  colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                  color_map = T
                  plots[h] = "2d"
                  data_based_color_map = T
                  color_scale = "linear"
                  heat_map[h] = F
                  legend[h] = F
                }
                
              }
            },
            '6' = {
              if(!hlinks){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep("http://",nrow(inputData[[h]])));
                inputData[[h]]=inputData[[h]][,c(1,2,3,4,5,7,6)]
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
              } else {
                if(!chr.2D.plot[h]){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep(NA,nrow(inputData[[h]])));
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                } else {
                  inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                  inputData[[h]][,5]);
                  inputData[[h]] = inputData[[h]][,3]
                  colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                  color_map = T
                  plots[h] = "2d"
                  data_based_color_map = T
                  color_scale = "linear"
                  heat_map[h] = F
                  legend[h] = F
                }
                
              }
            },
            '7' = {
              if(hlinks){
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
              }else {stop(message("set the 'hlinks' property to TRUE."))}
            },
            {stop(message("The Input data contains insufficient columns. Please check the vignette for more detail."))}
    )
    #file select ends
    cat("Number of annotations in data set ",h,":",nrow(inputData[[h]]),"\n")
    assigned.loci=c()
    loci.start=c()
    loci.end=c()
    label=c()
    
    for(i in 1:nrow(inputData[[h]])){
      
      temp.list=mega.list.of.ranges[[h]]
      names(temp.list)=ch.name.list[[h]]
      
      temp.df=temp.list[[inputData[[h]]$ch_name[i]]]
      
      if(nrow(inputData[[h]]) >= 1000){
      message(paste0('mapping progress: ',round(i/nrow(inputData[[h]])*100,2),"%"),"\r",appendLF=FALSE)
      flush.console()
      }
      #for(j in 1:nrow(temp.df)){
        
        temp.df = temp.df[(temp.df[,1] <= abs(as.integer(inputData[[h]]$ch_start[i])) & temp.df[,2] >= abs(as.integer(inputData[[h]]$ch_start[i]))),]
        #if(abs(as.integer(inputData[[h]]$ch_start[i]))>=temp.df[j,1] & abs(as.integer(inputData[[h]]$ch_start[i]))<=temp.df[j,2]){
          
          assigned.loci[i]=paste(id,"-",inputData[[h]]$ch_name[i],"-",rownames(temp.df)[1],"-",h,sep = "")
          loci.start[i]=temp.df[1,1]
          loci.end[i]=temp.df[1,2]
          label[i]=paste(id,"-L",inputData[[h]]$ch_name[i],"-",rownames(temp.df)[1],"-",h,sep = "")
          
        #}
        
      #}
      
      
      
      
    }
    
    new.input=data.frame(assigned.loci,loci.start,loci.end)
    colnames(new.input)=c("loci","loci_start","loci_end")
    inputData[[h]]=cbind.data.frame(inputData[[h]][,c(1,5,6,7)],new.input)
    labels.ids[[h]]=label
  }
  
  } else {
  ###################################################################
  #segmental annotation algo
  
  
  
  for(h in 1:ploidy){
    
    if(is.character(data.files)){
    inputData[[h]]=read.table(data.files[h],sep = "\t",stringsAsFactors = F,header = F)
    } else if(is.list(ch.files)){ inputData[[h]]= data.files[[h]]}
    temp_outer=data.frame()
    for(cc in 1:nrow(chr.data[[h]])){
      temp_dff <- inputData[[h]][inputData[[h]][,2]==chr.data[[h]][cc,1],]
      temp_dff <- temp_dff[(temp_dff[,3]>=chr.data[[h]][cc,2] & temp_dff[,4]<=chr.data[[h]][cc,3]),]
      temp_outer=rbind.data.frame(temp_outer,temp_dff)
    }
    rownames(temp_outer) <- c(1:nrow(temp_outer))
    inputData[[h]] <- temp_outer
    data_col2=ncol(inputData[[h]])
    
    #file select start
    switch (as.character(data_col2),
            '4' = {
              if(!chr.2D.plot[h]){
              inputData[[h]]=cbind.data.frame(inputData[[h]],
                                              rep(NA,nrow(inputData[[h]])),
                                              rep("http://",nrow(inputData[[h]])),
                                              rep(NA,nrow(inputData[[h]])));
              colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
              } else {
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                inputData[[h]][,3],
                                                rep("http://",nrow(inputData[[h]])),
                                                rep(NA,nrow(inputData[[h]])));
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                color_map = T
                plots[h] = "2d"
                data_based_color_map = T
                color_scale = "linear"
                heat_map[h] = F
                legend[h] = F
              }
            },
            '5' = {
              if(!hlinks){
                if(!chr.2D.plot[h]){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep("http://",nrow(inputData[[h]])),
                                                rep(NA,nrow(inputData[[h]])));
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                } else {
                  inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                  rep("http://",nrow(inputData[[h]])),
                                                  inputData[[h]][,5]);
                  inputData[[h]][,5] = inputData[[h]][,3]
                  colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                  color_map = T
                  plots[h] = "2d"
                  data_based_color_map = T
                  color_scale = "linear"
                  heat_map[h] = F
                  legend[h] = F
               } 
              } else {
                if(!chr.2D.plot[h]){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep(NA,nrow(inputData[[h]])),
                                                rep(NA,nrow(inputData[[h]])));
                inputData[[h]]=inputData[[h]][,c(1,2,3,4,6,5,7)]
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                } else {
                  inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                  rep(NA,nrow(inputData[[h]])),
                                                  rep(NA,nrow(inputData[[h]])));
                  inputData[[h]]=inputData[[h]][,c(1,2,3,4,6,5,7)]
                  inputData[[h]][,5] = inputData[[h]][,3]
                  colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                  color_map = T
                  plots[h] = "2d"
                  data_based_color_map = T
                  color_scale = "linear"
                  heat_map[h] = F
                  legend[h] = F
                }
              }
            },
            '6' = {
              if(!hlinks){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep("http://",nrow(inputData[[h]])));
                inputData[[h]]=inputData[[h]][,c(1,2,3,4,5,7,6)]
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
              } else {
                if(chr.2D.plot[h]){
                inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                rep(NA,nrow(inputData[[h]])));
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                } else {
                  inputData[[h]]=cbind.data.frame(inputData[[h]],
                                                  inputData[[h]][,5]);
                  inputData[[h]][,5] = inputData[[h]][,3]
                  colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
                  color_map = T
                  plots[h] = "2d"
                  data_based_color_map = T
                  color_scale = "linear"
                  heat_map[h] = F
                  legend[h] = F
                }
              }
            },
            '7' = {
              if(hlinks){
                colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink","cate")
              }else {stop(message("set the 'hlinks' property to TRUE."))}
            },
            {stop(message("The Input data contains insufficient columns. Please check the vignette for more detail."))}
    )
    #file select ends
    cat("Number of annotations in data set ",h,":",nrow(inputData[[h]]),"\n")
    temp.input.df=c()
    
    
    for(i in 1:nrow(inputData[[h]])){
      
      temp.list=mega.list.of.ranges[[h]]
      names(temp.list)=ch.name.list[[h]]
      
      temp.df=temp.list[[inputData[[h]]$ch_name[i]]]
      
      
      
      for(j in 1:nrow(temp.df)){
        
        
        if(abs(as.integer(inputData[[h]]$ch_start[i]))>=temp.df[j,1] & abs(as.integer(inputData[[h]]$ch_start[i]))<=temp.df[j,2]){
          
          
          temp.input.df= rbind(temp.input.df,c(as.character(inputData[[h]]$name[i]),inputData[[h]]$data[i],inputData[[h]]$cate[i],paste(id,"-",inputData[[h]]$ch_name[i],"-",j,"-",h,sep = ""),as.numeric(temp.df[j,1]),as.numeric(temp.df[j,2]),inputData[[h]]$hlink[i]))
          
            
            if(abs(as.integer(inputData[[h]]$ch_end[i]))>=temp.df[j,1] & abs(as.integer(inputData[[h]]$ch_end[i]))<=temp.df[j,2]){
              
              #assigned.loci.end[i]=paste(inputData[[h]]$ch_name[i],"-",j,"-",h,sep = "")
              
              
            } else {
              
              for(t in j:nrow(temp.df)){
              
              
              if(abs(as.integer(inputData[[h]]$ch_end[i]))>=temp.df[t,1] & abs(as.integer(inputData[[h]]$ch_end[i]))<=temp.df[t,2]){ 
                temp.input.df= rbind(temp.input.df,c(as.character(inputData[[h]]$name[i]),inputData[[h]]$data[i],inputData[[h]]$cate[i],paste(id,"-",inputData[[h]]$ch_name[i],"-",t,"-",h,sep = ""),as.numeric(temp.df[t,1]),as.numeric(temp.df[t,2]),inputData[[h]]$hlink[i]))
                break
              } else {
                temp.input.df= rbind(temp.input.df,c(as.character(inputData[[h]]$name[i]),inputData[[h]]$data[i],inputData[[h]]$cate[i],paste(id,"-",inputData[[h]]$ch_name[i],"-",t,"-",h,sep = ""),as.numeric(temp.df[t,1]),as.numeric(temp.df[t,2]),inputData[[h]]$hlink[i])) 
              }
              }
            }
            
          
          
          
        }
        
        
      }
      
      
      
      
    }
    
    dfff=as.data.frame(temp.input.df,stringsAsFactors = F)
    colnames(dfff)=c("name","data","cate","loci","loci_start","loci_end","hlink")
    if(color_map){
      if(color_scale=="linear"){
    dfff[,2]=as.numeric(dfff[,2])
    } else {if(color_scale=="ordinal"){dfff[,2]=as.character(dfff[,2])}}
    } else {dfff[,2]=rep(NA,nrow(dfff))}
    dfff[,4]=as.character(dfff[,4])
    dfff[,5]=as.integer(dfff[,5])
    dfff[,6]=as.integer(dfff[,6])
    inputData[[h]]=unique(dfff)
  }
    
  }  #end of seg algo 
  
  #assigning label id to data
  
  if(segment_annotation){
  
  for(i in 1:length(inputData)){
    unique.names=unique(inputData[[i]]$name)
    k=1
    labels.id=c()
    for(j in 1:length(unique.names)){
      
      if(nrow(inputData[[i]][inputData[[i]]$name == unique.names[j],])==1){
        
        t=inputData[[i]][inputData[[i]]$name == unique.names[j],]
        
        labels.id[k]=gsub(paste0(id,"-"),paste0(id,"-L"),as.character(t[1,4]))
        k=k+1
        
      } else {
        
        t=inputData[[i]][inputData[[i]]$name == unique.names[j],]
        
        for(p in 1:nrow(t)){
          labels.id[k]=gsub(paste0(id,"-"),paste0(id,"-L"),as.character(t[round((nrow(t)/2)),4])) 
          k=k+1
        } 
      }
      
    }
    
    labels.ids[[i]]=labels.id
  }
  
  
  
  }
  
  
  
  
  for(d in 1:length(inputData)){
    
    inputData[[d]]=cbind.data.frame(inputData[[d]],label=labels.ids[[d]])
    
  
  }
  
  for(o in 1:length(inputData)){
     
    if(plots[o] == "2d"){
      
     inputData[[o]]$data = inputData[[o]]$data - inputData[[o]]$loci_start + 1
  }
  }
  
  #print( head(inputData))
  
  #######################################################3
  ########finding min and max for data heatmap
  data.domain=list()
  if(color_map){
  if(color_scale=="linear" & data_based_color_map){
  d.max=c()
  d.min=c()
  
  
  for(k in 1:length(inputData)){
    if(ncol(inputData[[k]])==8){
      
      if(!chr.2D.plot[k]){
      d.min=min(inputData[[k]]$data,na.rm = T)
      d.max=max(inputData[[k]]$data,na.rm = T)
      } else {
        if(plot_filter[[k]][2]=="byNumber"){
        d.min=min(inputData[[k]]$cate,na.rm = T)
        d.max=max(inputData[[k]]$cate,na.rm = T)
        legend[k] = T
        } else {
          d.min=min(inputData[[k]]$data,na.rm = T)
          d.max=max(inputData[[k]]$data,na.rm = T)
          legend[k] = F
        }
      }
    }
    if(is.null(numeric.domain)){
    data.domain[[k]]=c(d.min,d.max)
    } else {
      data.domain[[k]]=numeric.domain
    }
  }
  
  } else {
    if(color_scale=="ordinal" & data_based_color_map){
      
      if(is.null(discrete.domain)){
      for(k in 1:length(inputData)){
        d.unik=c()
        if(ncol(inputData[[k]])==8){
          
          
          d.unik=as.character(unique(inputData[[k]]$data))
          
        }
        
        data.domain[[k]]=d.unik
      }} else {
        data.domain = discrete.domain
      }
      
      d.uniks=unique(unlist(data.domain))
      for(y in 1:length(inputData)){
        
        data.domain[[y]]=d.uniks
      } 
      
    }
    
  }
  } else {data.domain=rep(0,ploidy)}
  
  uniq_cates = c()
  is.plotting.scatter.map = FALSE
  for(o in 1:length(inputData)){
    if(length(grep(TRUE,is.na(inputData[[o]]$cate)))>=1){
      uniq_cates=c(0,0,0)
    } else { uniq_cates=c(uniq_cates,inputData[[o]]$cate)
             if(!chr.2D.plot[o]){
             is.plotting.scatter.map = TRUE
             } else {
               if(plot_filter[[o]][2]=="byCategory"){
                 is.plotting.scatter.map = TRUE
               }
             }
      }
  }
  
  if(is.null(ch2D.cat.order)){
  uniq_cates <- sort(unique(uniq_cates))
  } else {
    uniq_cates <- ch2D.cat.order
  }
  #print(uniq_cates)
  inline_col=c("red","orange","blue","yellow","purple","black")
  colors_inline = grDevices::colors()[grep('gr(a|e)y', grDevices::colors(), invert = T)]
  col_hexa <- function(colr){
    rgb<-col2rgb(colr)[,1]
    return(rgb(rgb[1],rgb[2],rgb[3],maxColorValue = 255))
  }
  if(length(ch2D.colors)==0){
    ch2D.colors = sample(colors_inline,length(uniq_cates))
    ch2D.colors = as.character(vapply(ch2D.colors,col_hexa,c("")))
  } else {
    ch2D.colors = as.character(vapply(ch2D.colors,col_hexa,c("")))
  } 
  
  links.color.maps = FALSE
  if(show.links){
  if(ncol(loci_links)==5){
    links.color.maps = TRUE
  }}
  
  if(show.links){
    if(links.color.maps){
  if(length(links.colors)==0){
    if(is.character(loci_links[,5])){
    links.colors = sample(colors_inline,length(unique(loci_links[,5])))
    } else if( is.numeric(loci_links[,5]) | is.integer(loci_links[,5])){
      links.colors = sample(colors_inline,2)
    }
    links.colors = as.character(vapply(links.colors,col_hexa,c("")))
  } else {
    links.colors = as.character(vapply(links.colors,col_hexa,c("")))
  }} else{ 
    if(length(links.colors)==0){
    links.colors = sample(colors_inline,1)
    links.colors = as.character(vapply(links.colors,col_hexa,c("")))
    } else {links.colors = as.character(vapply(links.colors,col_hexa,c("")))}
    } }
  #print(links.colors)
  dc_empty=FALSE
  dc_one=FALSE
  if(length(data_colors)==0){
    dc_empty=TRUE
  }
  if(length(data_colors)==1){
    dc_one=TRUE
  }
  
  #print(data.domain)
  for(p in 1:length(inputData)){
  
  if(color_scale=="ordinal" & data_based_color_map){
    
      if(dc_empty){
        d.cols = sample(colors_inline,length(data.domain[[p]]))
        d.cols = as.character(vapply(d.cols,col_hexa,c("")))
        data_colors[[p]]=d.cols
        
      } else {
        
        if(dc_one){
          data_colors[[p]]=data_colors[[1]]
        }
        
    
    if(length(data_colors[[p]])!=length(data.domain[[p]])){
      
      stop(message("Error: the number of colors passed and levels in data are different."))
      
      }}
    
    
  } else {
    if(color_scale=="linear" & data_based_color_map){
      
      a=data.domain[[p]]
      if(dc_empty){
      
    
      if(a[1]<0 & a[2]>0){
        
        
          
          data_colors[[p]]=c("red","white","blue")
          data.domain[[p]]=c(data.domain[[p]][1],0,data.domain[[p]][2])
      } else {
        if(a[1]>=0 & a[2]>=0){
          
        data_colors[[p]]=c("white","blue")
       } }
      
      }else {
        
        if(dc_one){
          data_colors[[p]]=data_colors[[1]]
          
          
        }
        if(a[1]<0 & a[2]>0){
          
          
          
          
          data.domain[[p]]=c(data.domain[[p]][1],0,data.domain[[p]][2])
        }
        
        } 
        
        
      }
     
      
       }
  }
  
  if(length(data_colors)>0){
  for( p in 1:length(inputData)){
    data_colors[[p]] = as.character(vapply(data_colors[[p]], col_hexa, c("")))
  }}
  #print("processing done!")
  #print(data_colors)
  #print(inputData)
  
  if(!show.links){
    links_loci = data.frame(src_loci="none",targ_loci="none")
  } else{
    if(is.character(loci_links)){
    #nothing
    } else if(is.data.frame(loci_links)){
      lnks = loci_links
    }
    src_loci = c()
    targ_loci = c()
    src_loci2 = c()
    targ_loci2 = c()
    lnks[,2] = as.numeric(lnks[,2])
    lnks[,4] = as.numeric(lnks[,4])
    
    if(!segment_annotation){
    for(i in 1:nrow(lnks)){
      src_loci[i]=inputData[[lnks[i,2]]][inputData[[lnks[i,2]]]$name == lnks[i,1],][1,5]
      targ_loci[i]=inputData[[lnks[i,4]]][inputData[[lnks[i,4]]]$name == lnks[i,3],][1,5]
    }
    if(ncol(lnks)==5){
    links_loci = data.frame(src_loci,targ_loci,lnk_nm = paste0(lnks[,1],"-",lnks[,3]),
                            link_data=lnks[,5],stringsAsFactors = F)
    links_loci = na.omit(links_loci)
    } else {if(ncol(lnks)==4){
      links_loci = data.frame(src_loci,targ_loci,lnk_nm = paste0(lnks[,1],"-",lnks[,3]),
                              link_data=rep("NA",nrow(lnks)),stringsAsFactors = F)
    }}
    } else {
      links_loci = data.frame()
      for(i in 1:nrow(lnks)){
        s_tdf = inputData[[lnks[i,2]]][inputData[[lnks[i,2]]]$name == lnks[i,1],]
        s_rw = nrow(s_tdf)
        src_loci[i] = s_tdf[1,4]
        src_loci2[i] = s_tdf[s_rw,4]
        t_tdf=inputData[[lnks[i,4]]][inputData[[lnks[i,4]]]$name == lnks[i,3],]
        t_rw = nrow(t_tdf)
        targ_loci[i] = t_tdf[1,4]
        targ_loci2[i] = t_tdf[t_rw,4]
      }
      
      if(ncol(lnks)==5){
        links_loci = data.frame(src_loci,src_loci2,targ_loci,targ_loci2,lnk_nm = paste0(lnks[,1],"-",lnks[,3]),
                                link_data=lnks[,5],stringsAsFactors = F)
        links_loci = na.omit(links_loci)
      } else {if(ncol(lnks)==4){
        links_loci = data.frame(src_loci,src_loci2,targ_loci,targ_loci2,lnk_nm = paste0(lnks[,1],"-",lnks[,3]),
                                link_data=rep("NA",nrow(lnks)),stringsAsFactors = F)
      }}
      
    }
    
  }
  
  #print(links_loci)
  cat("Visualizing..                   ")
  
  # forward options using x
  x = list(
    chData=inputData,
    nLoci=chr.data,
    ploidy_n=ploidy,
    title=title,
    cnt=cnt,
    ch_gap=ch_gap,
    top_margin=top_margin,
    left_margin=left_margin,
    chr_width=chr_width,
    chr_length=chr_length,
    chr_col=chr_color,
    heatmap=color_map,
    ch_domain=ch.domain,
    lg_x=lg_x,
    lg_y=lg_y,
    heat_scale=color_scale,
    labels=labels,
    div_id=id,
    w=canvas_width,
    h=canvas_height,
    rng=data.domain,
    heat_col=data_colors,
    an_col=anno_col,
    ch_text=chr_text,
    legend=legend,
    aggregate_func=aggregate_func,
    plots=plots,
    tag_filter = tag_filter,
    plot_height = plot_height,
    plot_ticks = plot_ticks,
    plot_color = plot_color,
    plot_y_domain = plot_y_domain,
    ref_line = ref_line,
    refl_pos = refl_pos,
    refl_color = refl_color,
    refl_stroke_w = refl_stroke_w,
    tagColor = tagColor,
    renderHeat = heat_map,
    text_font_size = text_font_size,
    chr_curve = chr_curve,
    title_font_size = title_font_size,
    label_font = label_font,
    label_angle = label_angle,
    vertical_grid = vertical_grid,
    grid_array = grid_array,
    grid_color = grid_color,
    plot_filter = plot_filter,
    loci_links = links_loci,
    uniq_cates = uniq_cates,
    scatter_col = ch2D.colors,
    grid_text = grid_text,
    grid_text_size = grid_text_size,
    grid_text_y = grid_text_y,
    scatter_mapping = is.plotting.scatter.map,
    scatter_lg_x = ch2D.lg_x,
    scatter_lg_y = ch2D.lg_y,
    show_links = show.links,
    seg_anno = segment_annotation,
    directed_edges = directed.edges,
    y_chr_scale = y_chr_scale,
    links_colors = links.colors,
    links_lg_x = links.lg_x,
    links_lg_y = links.lg_y,
    links_color_maps=links.color.maps,
    win_scale = win.scale,
    scale_ticks = chr.scale.ticks,
    export_options = export.options,
    guides = guides,
    guides_color = guides_color,
    ann_h = ann.h,
    display_chr = display.chr,
    plot_shift = plot.shift,
    plot_legend_label = plot.legend.labels,
    cat_legend_lab = cat.legend.label,
    plot_y_labs = plot.y.labels,
    plot_y_lab_x = plot.y.lab.x,
    plot_y_lab_y = plot.y.lab.y,
    plot_y_lab_size = plot.y.lab.size,
    scale_suffix = scale.suffix,
    interactivity = interactivity
    
  )
  
  
  # create widget
  htmlwidgets::createWidget(
    name = 'chromoMap',
    x,
    width = width,
    height = height,
    package = 'chromoMap',
    htmlwidgets::sizingPolicy(padding = 10, browser.fill = TRUE)
    
    
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
