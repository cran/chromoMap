## ----setup, include = FALSE----------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  comment = "#>"
)

## ---- eval=FALSE---------------------------------------------------------
#  install.packages("chromoMap")
#  

## ----eval=FALSE----------------------------------------------------------
#  library(chromoMap)
#  chromoMap("chromosome_file.txt","annotation_file.txt")

## ----eval=FALSE----------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"), ploidy = 2)

## ----eval=F--------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",segment_annotation = T)
#  

## ----eval=F--------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "categorical",
#            data_colors = list(c("orange","yellow")))
#  

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "numeric")

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "numeric",
#            aggregate_func = "sum")

## ----eval=FALSE----------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2, data_based_color_map = T,data_type = "numeric"
#            ,aggregate_func = c("avg","sum"))

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            canvas_width = 600,
#            canvas_height = 700)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",title = "my first chromoMap plot")

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            top_margin = 25,
#            left_margin = 15)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            chr_color = c("orange"))

## ----eval=FALSE----------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            chr_color = c("pink","blue"))

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            anno_col = c("orange"))

## ----eval=FALSE----------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            anno_col = c("pink","blue"))

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            chr_width = 4,
#            chr_length = 5)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            ch_gap = 6)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            chr_text = F)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            chr_text = c(T,F))

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            v_align = T)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "categorical",
#            legend = T)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            legend = c(F,T))

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "categorical",
#            legend = T, lg_x = 100,
#            lg_y = 250)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            labels=T)

## ----eval=FALSE----------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            hlinks=T)

## ----eval=FALSE----------------------------------------------------------
#  library(shiny)
#  library(chromoMap)
#  
#  # Define UI for application that draws chromoMap
#  ui <- fluidPage(
#  
#     # Application title
#     titlePanel("An example of chromoMap in Shiny"),
#  
#     # you can use GUI controls for your chromoMap
#     sidebarLayout(
#        sidebarPanel(
#           #some code
#        ),
#  
#        # Show a plot of the generated distribution
#        mainPanel(
#           chromoMapOutput("myChromoMap")
#        )
#     )
#  )
#  
#  # Define server logic required to draw chromoMap
#  server <- function(input, output) {
#  
#     output$myChromoMap <- renderChromoMap({
#       chromoMap("chromosome_file.txt","annotation_file.txt")
#     })
#  }
#  
#  # Run the application
#  shinyApp(ui = ui, server = server)
#  

## ------------------------------------------------------------------------
 sessionInfo()

