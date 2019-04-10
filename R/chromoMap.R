#' @title render interactive chromosome plots of any living organism and annotate elements
#'
#' @name chromoMap
#' @description render an interactive graphics visualization of entire chromosomes
#'  or chromosomal regions of any living organism. Chromosomal elements such as genes 
#'  can be annotated easily using this tool.
#' @param ch.files filename(s) containing co-ordinates of the chromosomes to render 
#' 
#' @param data.files filename(s) containing data to annotate on the chromosomes.
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
#' @param v_align a boolean for vertical alignment of plot
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
#'
#' @export
chromoMap <- function(ch.files,
                      data.files,
                      title=c(),
                      ch_gap=5,
                      ploidy=1,
                      top_margin=25,
                      left_margin=40,
                      chr_width=6,
                      chr_length=4,
                      chr_color=c("black"),
                      data_based_color_map=FALSE,
                      v_align=FALSE, 
                      segment_annotation=FALSE,
                      lg_x=0,
                      lg_y=0,
                      data_type=c("numeric","categorical"),
                      labels=FALSE,
                      canvas_width=500,
                      canvas_height=520
                      ,data_colors=list(),anno_col=c("yellow"),chr_text=c(TRUE),
                      legend=c(FALSE),
                      hlinks=FALSE,
                      aggregate_func=c("avg")
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
  
  if(length(ch.files)==1){
    chr_text=c(chr_text[1],TRUE)
  } else {
    if(length(chr_text)<length(ch.files)){
      
      
      chr_text=rep(chr_text[1],length(ch.files))
    }
  }
  
  if(length(ch.files)==1){
    legend=c(legend[1],TRUE)
  } else {
    if(length(legend)<length(ch.files)){
      
      
      legend=rep(legend[1],length(ch.files))
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
    chr_color=c(chr_color[1],"")
  } else {
    if(length(chr_color)<length(ch.files)){
      
      chr_color=rep(chr_color[1],length(ch.files))
    }
  }
  
  
  chr_width=as.integer(chr_width)
  chr_length=as.integer(chr_length)
  color_map=data_based_color_map
  color_scale=data_type
  color_scale=color_scale[1]
  
  
  if(color_scale=="numeric"){
    color_scale="linear"
  } else {
    
    if(color_scale=="categorical"){
      
      color_scale="ordinal"
    } else {
      stop(message("Error: data_type can be either 'numeric' or 'categorical' "))
    }
  }
  id=c("chromap")
  
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
  cat("*************** by Lakshay Anand ********************\n")
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
    ch.data[[g]]= read.table(ch.files[g],sep = "\t",stringsAsFactors = F,header = F)
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
    
    chr.data[[g]]= read.table(ch.files[g],sep = "\t",stringsAsFactors = F,header = F)
    data_col=ncol(chr.data[[g]])
    if(data_col==3){colnames(chr.data[[g]])=c("ch_name","ch_start","ch_end");cnt=FALSE} else {
      if(data_col==4){colnames(chr.data[[g]])=c("ch_name","ch_start","ch_end","cnt_start");cnt=TRUE} else{
        stop(message("The Input data contains insufficient columns. Please check the vignette for more detail."))
      }
    }
    
    cat("Number of Chromosomes in set ",g,":",nrow(chr.data[[g]]),"\n")
    
    
    switch(as.character(data_col),
           
           '4'={chr.data[[g]]=data.frame(
             name=chr.data[[g]]$ch_name,
             start=chr.data[[g]]$ch_start,
             end=chr.data[[g]]$ch_end,
             ch_average= (chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,
             n= round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*100,
             cnt_start=chr.data[[g]]$cnt_start,
             cnt_proprtion= round(chr.data[[g]]$cnt_start/(chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1),2),
             
             p=(round(round(chr.data[[g]]$cnt_start/(chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1),2)*(round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*100))),
             q=(round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*100)-(round(round(chr.data[[g]]$cnt_start/(chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1),2)*(round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*100)))
             ,seq_len=chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1,stringsAsFactors = F)},
           '3'={chr.data[[g]]=data.frame(
             name=chr.data[[g]]$ch_name,
             start=chr.data[[g]]$ch_start,
             end=chr.data[[g]]$ch_end,
             ch_average= (chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,
             n= round((chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1)/ch_longest_len,2)*100,
             seq_len=chr.data[[g]]$ch_end-chr.data[[g]]$ch_start+1,stringsAsFactors = F)}
           
    )
    
    if(data_col==4){
      max.ch.domain=rbind.data.frame(max.ch.domain,chr.data[[g]][chr.data[[g]]$seq_len==max(chr.data[[g]]$seq_len),c(2,3,10)])
      
    } else {
    if(data_col==3){
    max.ch.domain=rbind.data.frame(max.ch.domain,chr.data[[g]][chr.data[[g]]$seq_len==max(chr.data[[g]]$seq_len),c(2,3,6)])
 }}   
  }
  
  #finding the longest ch in all sets or dimain for ordinal
  
  ch.domain=as.character(unique(max.ch.domain[max.ch.domain$seq_len==max(max.ch.domain$seq_len),c(1,2)]))
  
  
  ##################################################
  ###########################################
  #creating the ranges for the chromosomes
  mega.list.of.ranges=list()
  ch.name.list=list()
  
  for(g in 1:ploidy){
    
    list.of.ranges=list()
    namee=c()
    
    for(j in 1:nrow(chr.data[[g]])){
      
      ch.start=chr.data[[g]]$start[j]
      ch.end = chr.data[[g]]$end[j]
      ch.loci= chr.data[[g]]$n[j]
      step.size=round((ch.end-ch.start+1)/ch.loci)
      range.start=c()
      range.end=c()
      ch_name=c()
      
      for(i in 1:ch.loci){
        
        if(i != ch.loci){
          ch.loci.start=ch.start
          ch.loci.end= ch.loci.start + step.size -1
          ch.start= ch.loci.end+1
          range.start[i]=ch.loci.start
          range.end[i]=ch.loci.end
          ch_name[i]=chr.data[[g]]$name[j]
        } else {
          range.start[i]= ch.loci.end+1 
          range.end[i] =ch.end 
          ch_name[i]=chr.data[[g]]$name[j]
        }
        
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
  ########################################################################
  #assigning loc for each gene or elemnt
  cat("Processing data.. \n")
  
  inputData=list()
  labels.ids=list()
  
  if(!segment_annotation){
  
  for(h in 1:ploidy){
    
    inputData[[h]]=read.table(data.files[h],sep = "\t",stringsAsFactors = F,header = F)
    data_col2=ncol(inputData[[h]])
    
    if(data_col2==4){ inputData[[h]]=cbind.data.frame(inputData[[h]],rep(NA,nrow(inputData[[h]])),rep("http://",nrow(inputData[[h]])));
      colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")} else {
      if(data_col2==5){
        if(!hlinks){
        inputData[[h]]=cbind.data.frame(inputData[[h]],rep("http://",nrow(inputData[[h]])));
        colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")
        } else {
          inputData[[h]]=cbind.data.frame(inputData[[h]],rep(NA,nrow(inputData[[h]])));
          inputData[[h]]=inputData[[h]][,c(1,2,3,4,6,5)]
          colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")
          
        }
        } else{
          
          if(data_col2==6){
            if(hlinks){
            colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")
            }else {stop(message("set the 'hlinks' property to TRUE."))}
          } else {
        stop(message("The Input data contains insufficient columns. Please check the vignette for more detail."))
    }  }
      }
    
    cat("Number of annotations in data set ",h,":",nrow(inputData[[h]]),"\n")
    assigned.loci=c()
    loci.start=c()
    loci.end=c()
    label=c()
    
    for(i in 1:nrow(inputData[[h]])){
      
      temp.list=mega.list.of.ranges[[h]]
      names(temp.list)=ch.name.list[[h]]
      
      temp.df=temp.list[[inputData[[h]]$ch_name[i]]]
      
      
      
      for(j in 1:nrow(temp.df)){
        
        
        if(abs(as.integer(inputData[[h]]$ch_start[i]))>=temp.df[j,1] & abs(as.integer(inputData[[h]]$ch_start[i]))<=temp.df[j,2]){
          
          assigned.loci[i]=paste(inputData[[h]]$ch_name[i],"-",j,"-",h,sep = "")
          loci.start[i]=temp.df[j,1]
          loci.end[i]=temp.df[j,2]
          label[i]=paste("L",inputData[[h]]$ch_name[i],"-",j,"-",h,sep = "")
          
        }
        
      }
      
      
      
      
    }
    
    new.input=data.frame(assigned.loci,loci.start,loci.end)
    colnames(new.input)=c("loci","loci_start","loci_end")
    inputData[[h]]=cbind.data.frame(inputData[[h]][,c(1,5,6)],new.input)
    labels.ids[[h]]=label
  }
  
  } else {
  ###################################################################
  #segmental annotation algo
  
  
  
  for(h in 1:ploidy){
    
    inputData[[h]]=read.table(data.files[h],sep = "\t",stringsAsFactors = F,header = F)
    data_col2=ncol(inputData[[h]])
    
    if(data_col2==4){ inputData[[h]]=cbind.data.frame(inputData[[h]],rep(NA,nrow(inputData[[h]])),rep("http://",nrow(inputData[[h]])));
    colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")} else {
      if(data_col2==5){
        if(!hlinks){
          inputData[[h]]=cbind.data.frame(inputData[[h]],rep("http://",nrow(inputData[[h]])));
          colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")
        } else {
          inputData[[h]]=cbind.data.frame(inputData[[h]],rep(NA,nrow(inputData[[h]])));
          inputData[[h]]=inputData[[h]][,c(1,2,3,4,6,5)]
          colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")
          
        }
      } else{
        
        if(data_col2==6){
          if(hlinks){
          colnames(inputData[[h]])=c("name","ch_name","ch_start","ch_end","data","hlink")
          }else{stop(message("set the 'hlinks' property to TRUE."))}
          
        } else {
          stop(message("The Input data contains insufficient columns. Please check the vignette for more detail."))
        }  }
    }
    cat("Number of annotations in data set ",h,":",nrow(inputData[[h]]),"\n")
    temp.input.df=c()
    
    
    for(i in 1:nrow(inputData[[h]])){
      
      temp.list=mega.list.of.ranges[[h]]
      names(temp.list)=ch.name.list[[h]]
      
      temp.df=temp.list[[inputData[[h]]$ch_name[i]]]
      
      
      
      for(j in 1:nrow(temp.df)){
        
        
        if(abs(as.integer(inputData[[h]]$ch_start[i]))>=temp.df[j,1] & abs(as.integer(inputData[[h]]$ch_start[i]))<=temp.df[j,2]){
          
          
          temp.input.df= rbind(temp.input.df,c(as.character(inputData[[h]]$name[i]),inputData[[h]]$data[i],paste(inputData[[h]]$ch_name[i],"-",j,"-",h,sep = ""),as.numeric(temp.df[j,1]),as.numeric(temp.df[j,2]),inputData[[h]]$hlink[i]))
          
            
            if(abs(as.integer(inputData[[h]]$ch_end[i]))>=temp.df[j,1] & abs(as.integer(inputData[[h]]$ch_end[i]))<=temp.df[j,2]){
              
              #assigned.loci.end[i]=paste(inputData[[h]]$ch_name[i],"-",j,"-",h,sep = "")
              
              
            } else {
              
              for(t in j:nrow(temp.df)){
              
              
              if(abs(as.integer(inputData[[h]]$ch_end[i]))>=temp.df[t,1] & abs(as.integer(inputData[[h]]$ch_end[i]))<=temp.df[t,2]){ 
                temp.input.df= rbind(temp.input.df,c(as.character(inputData[[h]]$name[i]),inputData[[h]]$data[i],paste(inputData[[h]]$ch_name[i],"-",t,"-",h,sep = ""),as.numeric(temp.df[t,1]),as.numeric(temp.df[t,2]),inputData[[h]]$hlink[i]))
                break
              } else {
                temp.input.df= rbind(temp.input.df,c(as.character(inputData[[h]]$name[i]),inputData[[h]]$data[i],paste(inputData[[h]]$ch_name[i],"-",t,"-",h,sep = ""),as.numeric(temp.df[t,1]),as.numeric(temp.df[t,2]),inputData[[h]]$hlink[i])) 
              }
              }
            }
            
          
          
          
        }
        
        
      }
      
      
      
      
    }
    
    dfff=as.data.frame(temp.input.df,stringsAsFactors = F)
    colnames(dfff)=c("name","data","loci","loci_start","loci_end","hlink")
    if(color_map){
      if(color_scale=="linear"){
    dfff[,2]=as.numeric(dfff[,2])
    } else {if(color_scale=="ordinal"){dfff[,2]=as.character(dfff[,2])}}
    } else {dfff[,2]=rep(NA,nrow(dfff))}
    dfff[,4]=as.integer(dfff[,4])
    dfff[,5]=as.integer(dfff[,5])
    dfff[,6]=as.character(dfff[,6])
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
        
        labels.id[k]=paste("L",as.character(t[1,3]),sep = "")
        k=k+1
        
      } else {
        
        t=inputData[[i]][inputData[[i]]$name == unique.names[j],]
        
        for(p in 1:nrow(t)){
          labels.id[k]=paste("L",as.character(t[round((nrow(t)/2)),3]),sep = "") 
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
  

 
  
  #######################################################3
  ########finding min and max for data heatmap
  data.domain=list()
  if(color_map){
  if(color_scale=="linear" & data_based_color_map){
  d.max=c()
  d.min=c()
  
  for(k in 1:length(inputData)){
    if(ncol(inputData[[k]])==7){
      
      
      d.min=min(inputData[[k]]$data,na.rm = T)
      d.max=max(inputData[[k]]$data,na.rm = T)
    }
    data.domain[[k]]=c(d.min,d.max)
  }
  
  
  } else {
    if(color_scale=="ordinal" & data_based_color_map){
      
      
      for(k in 1:length(inputData)){
        d.unik=c()
        if(ncol(inputData[[k]])==7){
          
          
          d.unik=as.character(unique(inputData[[k]]$data))
          
        }
        
        data.domain[[k]]=d.unik
      }
      
      d.uniks=unique(unlist(data.domain))
      for(y in 1:length(inputData)){
        
        data.domain[[y]]=d.uniks
      } 
      
    }
    
  }
  } else {data.domain=rep(0,ploidy)}
  
  
  inline_col=c("red","orange","blue","yellow","purple","black")
  
  dc_empty=FALSE
  dc_one=FALSE
  if(length(data_colors)==0){
    dc_empty=TRUE
  }
  if(length(data_colors)==1){
    dc_one=TRUE
  }
  
  
  for(p in 1:length(inputData)){
  
  if(color_scale=="ordinal" & data_based_color_map){
    
      if(dc_empty){
        
        data_colors[[p]]=inline_col[1:length(data.domain[[p]])]
        
      } else {
        
        if(dc_one){
          data_colors[[p]]=data_colors[[1]]
        }
        
    
    if(length(data_colors[[p]])!=length(data.domain[[p]])){
      
      stop(message("Error: the number of colors passed and levels in data are different."))
      
      }}
    
    
  } else {
    if(color_scale=="linear" & data_based_color_map){
      
      
      if(dc_empty){
      a=data.domain[[p]]
    
      if(a[1]<0 & a[2]>0){
        
        
          
          data_colors[[p]]=c("red","white","blue")
          data.domain[[p]]=c(data.domain[[p]][1],0,data.domain[[p]][2])
      } else {
        if(a[1]>0 & a[2]>0){
          
        data_colors[[p]]=c("white","black")
       } }
      
      } 
        
        
      }
     
      
       }
  }
  
  
  
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
    v_align=v_align,
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
    aggregate_func=aggregate_func
    
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
