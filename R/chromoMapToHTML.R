#' @title convert chromoMap plots into customizable HTML documents
#'
#' @description Helpful in sharing the graphics. Also give options to add text
#' 
#' @param chromoMap an object of the chromoMap plot 
#' 
#' @param file name of the file to save with, default is chromoMap.html
#' 
#' @param title A string for the Title that can be included in the document
#' 
#' @param description A string for adding description of the plot
#' 
#' @param openAfterSave A boolean to specify whether to open the document after save
#' 
#' @param dir specify the directory of the file.default is current directory.
#' @export
#' @examples 
#' 
#' library(chromoMap)
#' data("pancandata")
#' chmap = chromoMap(pancandata$data2,type="heatmap-double")
#' 
#' #saving plot to HTML document
#' #for desription
#' my_desc = "you can write a paragraph to describe your plot"
#' chromoMapToHTML(chmap,title = "Expression profile Comparison in normal vs tumor",
#' description = my_desc,openAfterSave = TRUE,dir=tempdir())
#' 
#' 
#' 
#' 
#' @importFrom utils browseURL
#' 
#' @import htmltools
#'
#' @export
#' 
#'
#' 
#'
#' @import htmltools
#'
#' @export
chromoMapToHTML <- function(chromoMap,
                            file="chromoMap.html",
                            title="Choose attractive Title for your chromoMap",
                            dir="",
                            description="",
                            openAfterSave=FALSE) {
  
     currentDir = getwd()
     #check if the user has entered the directory
     if(dir== ""){ stop("Please specify the directory to save the file.")}
     # creating a folder to save HTML file along with dependencies.
     dirname = ((strsplit(file,".",fixed = TRUE))[[1]])[1]
     new.dir=file.path(dir,dirname)
     
     if(!(dir.exists(new.dir))){
       dir.create(new.dir)
     } else {
       stop("filename already exists.Please choose a different filename or directory")
     }
     
     setwd(new.dir)
    
    
  htmltools::save_html(
    htmltools::div(
                   htmltools::h1(title),
                   htmltools::hr(),
                   htmltools::div(chromoMap),
                   htmltools::br(),
                   htmltools::span(paste("created using chromoMap
                                         R package on  ",Sys.Date())),
                   
                   htmltools::br(), htmltools::br(),
                   htmltools::h2("Description:"),htmltools::br(),
                   htmltools::p(description)
                   
                   
                   )
    
    ,file = file )
  
  cat("File saved at: \n",paste(getwd(),"/",sep = ""))
  if(openAfterSave){
    browseURL(file)
  }
  
  setwd(currentDir)
  
}