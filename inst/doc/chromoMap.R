## ----setup, include = FALSE---------------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  comment = "#>"
)
#knitr::opts_chunk$set(widgetframe_widgetsdir = 'widgets')

## ---- eval=FALSE--------------------------------------------------------------
#  install.packages("chromoMap")
#  

## -----------------------------------------------------------------------------
# chromosome files
chr_file_1 = "chr_file_without_centromere.txt"
chr_file_2 = "chr_file_with_centromere.txt"

# annotation files

anno_file_1 = "annotation_pos.txt"
anno_file_2 = "annotation_pos_and_neg.txt"


## ----echo=F-------------------------------------------------------------------

library(chromoMap)
#my_path <- "C:/Users/laksh/Documents/PROJECTS/chromoMap_v3_production/chromoMap/vignettes/data/"
my_path = "data/"

chr_file_1 <- paste0(my_path,chr_file_1)
chr_file_2 <- paste0(my_path,chr_file_2)
anno_file_1 <-paste0(my_path,anno_file_1)
anno_file_2 <-paste0(my_path,anno_file_2)
anno_file_cate <- paste0(my_path,"discrete_colormap.txt")



## -----------------------------------------------------------------------------

head(read.table(chr_file_1,sep = "\t"))

## -----------------------------------------------------------------------------

head(read.table(chr_file_2,sep = "\t"))

## -----------------------------------------------------------------------------

head(read.table(anno_file_1,sep = "\t"))

## -----------------------------------------------------------------------------

head(read.table(anno_file_2,sep = "\t"))

## ----eval=F-------------------------------------------------------------------
#  # passing data.frames directly instead of files
#  chromoMap(list(chr.data),list(anno.data))
#  # for polyploidy
#  chromoMap(list(chr.data1,chr.data2),
#            list(anno.data1,anno.data2),ploidy = 2)
#  

## ---- eval=F------------------------------------------------------------------
#  library(chromoMap)
#  chromoMap(chr_file_1,anno_file_1)
#  

## ---- echo=F, fig.height=2----------------------------------------------------
chromoMap(chr_file_1,anno_file_1,canvas_height = 200,id="cmap1")


## ---- eval=F------------------------------------------------------------------
#  library(chromoMap)
#  chromoMap(chr_file_2,anno_file_1)
#  

## ---- echo=F, fig.height=2----------------------------------------------------
chromoMap(chr_file_2,anno_file_1,canvas_height = 200,id="cmap189564")


## ---- eval=F------------------------------------------------------------------
#  library(chromoMap)
#  chromoMap(c(chr_file_1,chr_file_1),c(anno_file_1,anno_file_2),
#            ploidy = 2)
#  

## ---- echo=F, fig.height=2----------------------------------------------------
chromoMap(c(chr_file_1,chr_file_1),c(anno_file_1,anno_file_2),
          ploidy = 2,canvas_height = 300,id="cmap2")


## ----eval=F-------------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",segment_annotation = T)
#  

## ---- eval=F------------------------------------------------------------------
#  # default value
#  library(chromoMap)
#  chromoMap(chr_file_1,anno_file_1,
#            n_win.factor = 1,
#            win.summary.display=T)
#  

## ---- echo=F, fig.height=2----------------------------------------------------
chromoMap(chr_file_1,anno_file_1,canvas_height = 200,
          id="cmapRR1",n_win.factor = 1,
          win.summary.display=T)


## ---- eval=F------------------------------------------------------------------
#  library(chromoMap)
#  chromoMap(chr_file_1,anno_file_1,
#            n_win.factor = 3,
#            win.summary.display = T)
#  

## ---- echo=F, fig.height=2,fig.width=1----------------------------------------
chromoMap(chr_file_1,anno_file_1,canvas_height = 200,id="cmapRR2",
          n_win.factor = 3,win.summary.display = T)


## ---- eval=F------------------------------------------------------------------
#  library(chromoMap)
#  chromoMap(chr_file_1,anno_file_1,
#            fixed.window = T,
#            window.size = 5,
#            win.summary.display = T)
#  

## ---- echo=F, fig.height=2,fig.width=1----------------------------------------
chromoMap(chr_file_1,anno_file_1,canvas_height = 200,id="cmapRRu2",
          fixed.window = T,window.size = 5,win.summary.display = T)


## ----eval=F-------------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "categorical",
#            data_colors = list(c("orange","yellow")))
#  

## ---- echo=F, fig.height=3----------------------------------------------------
chromoMap(chr_file_1,"data/discrete_colormap.txt",data_based_color_map = T,data_type = "categorical",legend = T,canvas_height = 250,id="cmap310",data_colors = list(c("orange","yellow")),
          lg_x = 15)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric")

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",legend = T,canvas_height = 300,id="cmap4",lg_y = 50)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "numeric",
#            aggregate_func = "sum")

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2, data_based_color_map = T,data_type = "numeric"
#            ,aggregate_func = c("avg","sum"))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_1,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "bar")

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_1,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap5",lg_y = 50,
          plots = "bar",plot_ticks = 3)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_1,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "bar",
#            heat_map = F)

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_1,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap51",lg_y = 50,
          plots = "bar",heat_map = F,plot_ticks = 3)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter")

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap6",lg_y = 50,
          plots = "scatter",left_margin = 60,plot_height = 40)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "tags")

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap7",
          plots = "tags")


## ----echo=F-------------------------------------------------------------------
library(knitr)
OPERATION_TYPE_LABEL = c("eq","lt","gt","lte","gte","gtalt","gtolt","gtealte","gteolte")
DESCRIPTION = c("equal","less than","greater than","less than equal","greater than equal","greater than AND less than","greater than OR less than","greater than equal AND less than equal","greater than equal OR less than equal")
USAGE_EXAMPLE = c('list(c("eq",5))','list(c("lt",-5))','list(c("gt",6))','list(c("lte",6))','list(c("gte",6))','list(c("gtalt",5,-5))','list(c("gtolt",5,-5))','list(c("gtealte",5,-5))','list(c("gteolte",5,-5))')
gggg = data.frame(OPERATION_TYPE_LABEL,DESCRIPTION,USAGE_EXAMPLE)
colnames(gggg)=c("operation type label","description","usage example")
kable(gggg)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "tags",
#            tag_filter = list(c("lt",0)))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap8",
          plots = "tags",tag_filter = list(c("lt",0)))


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_1,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "bar",
#            plot_filter = list(c("gte",50,"green")))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_1,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap9",
          plots = "bar",plot_filter = list(c("gte",50,"green")),plot_ticks = 3)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            plot_filter = list(c("lt",0,"red")))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap10",lg_y = 50,
          plots = "scatter",left_margin = 60,plot_filter = list(c("lt",0,"red")),plot_height = 40)


## ----echo=F-------------------------------------------------------------------
  anno_file_3 <- read.table("data/ANNO_DATA_FOR_CATSCATTER.txt")

## -----------------------------------------------------------------------------
head(anno_file_3)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_3,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            plot_filter = list(c("col","byCategory")),
#            ch2D.colors = c("pink3","orange3","purple","blue2"))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,"data/ANNO_DATA_FOR_CATSCATTER.txt",data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmapnew10",lg_y = 50,
          plots = "scatter",left_margin = 60,plot_filter = list(c("col","byCategory")),plot_height = 40,
          ch2D.colors = c("pink3","orange3","purple","blue2"),canvas_width = 600,
          ch2D.lg_y = 100)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            chr.2D.plot = T)

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,chr.2D.plot = T,canvas_height = 300,id="cmaphyd10")


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            chr.2D.plot = T,
#            plot_filter = list(c("col","byNumber")))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,chr.2D.plot = T,canvas_height = 300,id="cmaphiygd10",plot_filter = list(c("col","byNumber")),
          lg_x = 10)


## -----------------------------------------------------------------------------
head(read.table(anno_file_cate))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_cate,
#            chr.2D.plot = T,
#            plot_filter = list(c("col","byCategory")),
#            ch2D.colors = c("red","blue"))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_cate,chr.2D.plot = T,canvas_height = 300,id="cmtrphiygd10",plot_filter = list(c("col","byCategory")),
                                                                                  ch2D.colors = c("red","blue"),ch2D.lg_x = 15
          )


## ----echo=F-------------------------------------------------------------------
chr_file <- "data/SLINK_chr.txt"
anno_file <- "data/SLINK_anno.txt"
link_data <- read.csv("data/SLINK22.csv",header = T)

## -----------------------------------------------------------------------------
head(link_data)

## ----eval=F-------------------------------------------------------------------
#  chromoMap(chr_file, anno_file,
#            # main arguments
#            show.links = T,
#            loci_links = link_data[,c(1:4)],
#            links.colors = "red2",
#            #plot adjustments
#            ch_gap = 50,
#            y_chr_scale = 100,
#            top_margin = 100,
#            )

## ----echo=F,fig.height=4.0----------------------------------------------------
chromoMap(chr_file, anno_file,
          show.links = T,
          loci_links = link_data[,c(1:4)],
          #plot adjustments
          links.colors = "red2",
          ch_gap = 50,
          y_chr_scale = 100,
          top_margin = 100,
          id="cnew1"
          )

## ----eval=F-------------------------------------------------------------------
#  chromoMap(chr_file, anno_file,
#            # main arguments
#            show.links = T,
#            loci_links = link_data,
#            links.colors = c("red2","blue2"),
#            #plot adjustments
#            ch_gap = 50,
#            y_chr_scale = 100,
#            top_margin = 100,
#            links.lg_y = 300
#            )

## ----echo=F,fig.height=4.0----------------------------------------------------
chromoMap(chr_file, anno_file,
          show.links = T,
          loci_links = link_data,
          #plot adjustments
          links.colors =  c("red2","blue2"),
          ch_gap = 50,
          y_chr_scale = 100,
          top_margin = 100,
          id="cnew2",
          canvas_width = 600,
          links.lg_y = 30
          )

## ----echo=F-------------------------------------------------------------------
link_data <- read.csv("data/SLINK_link2.csv",header = F)

## ----eval=F-------------------------------------------------------------------
#  chromoMap(chr_file, anno_file,
#            # main arguments
#            show.links = T,
#            loci_links = link_data,
#            links.colors = c("red2","blue2","orange3","purple"),
#            #plot adjustments
#            ch_gap = 50,
#            y_chr_scale = 100,
#            top_margin = 100,
#            )

## ----echo=F,fig.height=4.0----------------------------------------------------
chromoMap(chr_file, anno_file,
          show.links = T,
          loci_links = link_data,
          #plot adjustments
          links.colors =  c("red2","blue2","orange3","purple"),
          ch_gap = 50,
          y_chr_scale = 100,
          top_margin = 100,
          id="cnew3",
          canvas_width = 600,
          links.lg_y = 30
          )

## ----eval=F-------------------------------------------------------------------
#  chromoMap(chr_file, anno_file,
#            # main arguments
#            show.links = T,
#            loci_links = link_data,
#            links.colors = c("red2","blue2","orange3","purple"),
#            directed.edges = T,
#            #plot adjustments
#            ch_gap = 50,
#            y_chr_scale = 100,
#            top_margin = 100,
#            )

## ----echo=F,fig.height=4.0----------------------------------------------------
chromoMap(chr_file, anno_file,
          show.links = T,
          loci_links = link_data,
          #plot adjustments
          links.colors =  c("red2","blue2","orange3","purple"),
          ch_gap = 50,
          y_chr_scale = 100,
          top_margin = 100,
          id="cnew33",
          canvas_width = 600,
          links.lg_y = 30,
          directed.edges = T
          )

## ----echo=F-------------------------------------------------------------------
chr_file <- "data/TEST_chr.txt"
anno_file <- "data/TEST_anno.txt"
link_data <- read.csv("data/TEST_LINKSSS.csv",header = T)

## ----eval=F-------------------------------------------------------------------
#  chromoMap(chr_file, anno_file,
#            # main arguments
#            segment_annotation = T,
#            show.links = T,
#            loci_links = link_data,
#            links.colors = c("orange3","purple","green2"),
#            #plot adjustments
#            ch_gap = 50,
#            y_chr_scale = 100,
#            top_margin = 100,
#            )

## ----echo=F,fig.height=4.0----------------------------------------------------
chromoMap(chr_file, anno_file,
          show.links = T,
          loci_links = link_data,
          segment_annotation = T,
          #plot adjustments
          links.colors =  c("orange3","purple","green2"),
          ch_gap = 50,
          y_chr_scale = 100,
          top_margin = 100,
          id="cnew4",
          canvas_width = 600,
          links.lg_y = 30
          )

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            canvas_width = 600,
#            canvas_height = 700)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            title = "my first chromoMap plot")

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            title = "my first chromoMap plot",
#            title_font_size = 12)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            top_margin = 25,
#            left_margin = 15)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            chr_color = c("orange"))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            chr_color = c("pink","blue"))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            anno_col = c("orange"))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            anno_col = c("pink","blue"))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            chr_width = 4,
#            chr_length = 5)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            ch_gap = 6)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            chr_curve = 5)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            chr_text = F)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            chr_text = c(T,F))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            interactivity = F)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            scale.suffix = "cM")

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            display.chr = c(F))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            guides = T,
#            guides_color = "black")

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            id="my_plot_1")

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_1,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "bar",
#            ref_line = T,
#            refl_pos = 15)

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_1,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap21",
          plots = "bar",plot_ticks = 3,ref_line = T,
          refl_pos = 15)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            ref_line = T,
#            refl_pos = 20)

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="cmap22",lg_y = 50,
          plots = "scatter",left_margin = 60,plot_height = 40,ref_line = T,refl_pos = 20)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            plot_height = 50)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            plot_color = "orange")

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "tags",
#            tagColor = "orange")

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            plot_ticks = 3,
#            plot_y_domain = list(c(-5,5)))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(c(chr_file_1,chr_file_1),c(anno_file_1,anno_file_2),
#            ploidy = 2
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = c("bar","scatter"),
#            plot_height = 40,
#            plot_color = c("green","red"),
#            ref_line = T,
#            refl_pos = 20,
#            #gridline arguments
#            vertical_grid = T,
#            grid_array = c(1,54,100,420,621))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(c(chr_file_1,chr_file_1),c(anno_file_1,anno_file_2),data_based_color_map = T,data_type = "numeric",canvas_height = 400,id="cmap23",ploidy = 2,
          plots = c("bar","scatter"),
          plot_height = 40,
          plot_color = c("green","red"),
          ref_line = T,
          refl_pos = 20,
          vertical_grid = T,
          grid_array = c(1,54,100,420,621),left_margin = 60)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(c(chr_file_1,chr_file_1),c(anno_file_1,anno_file_2),
#            ploidy = 2
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = c("bar","scatter"),
#            plot_height = 40,
#            plot_color = c("green","red"),
#            ref_line = T,
#            refl_pos = 20,
#            #gridline arguments
#            vertical_grid = T,
#            grid_array = c(1,54,100,420,621),
#            grid_text = c("","","mark 1","region 1",""))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(c(chr_file_1,chr_file_1),c(anno_file_1,anno_file_2),data_based_color_map = T,data_type = "numeric",canvas_height = 400,id="cnew4125",ploidy = 2,
          plots = c("bar","scatter"),
          plot_height = 40,
          plot_color = c("green","red"),
          ref_line = T,
          refl_pos = 20,
          vertical_grid = T,
          grid_array = c(1,54,100,420,621),left_margin = 60
          ,grid_text = c("","","mark 1","region 1",""))


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            #highlighting a region on chr1
#            vertical_grid = T,
#            grid_array = c(550,754))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="new7777",lg_y = 50,
          plots = "scatter",left_margin = 60,plot_height = 40,
          vertical_grid = T,
          grid_array = c(550,754))


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            #zoom in
#            region = c("chr1:1:550:754"))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="new77894",lg_y = 50,
          plots = "scatter",left_margin = 60,plot_height = 40,
           region = c("chr1:1:550:754"))


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(chr_file_1,anno_file_2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            plots = "scatter",
#            #zoom in
#            region = c("chr1:1:550:754","chr2:1:221:450"))

## ---- echo=F, fig.height=3.5--------------------------------------------------
chromoMap(chr_file_1,anno_file_2,data_based_color_map = T,data_type = "numeric",canvas_height = 300,id="newh745994",lg_y = 50,
          plots = "scatter",left_margin = 60,plot_height = 40,
           region = c("chr1:1:550:754","chr2:1:221:450"))


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "categorical",
#            legend = T)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap(c("chromosome_file_set_1.txt","chromosome_file_set_2.txt")
#            ,c("annotation_file_set_1.txt","annotation_file_set_2.txt"),
#            ploidy = 2,
#            data_based_color_map = T,
#            data_type = "numeric",
#            legend = c(F,T))

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            data_based_color_map = T,
#            data_type = "categorical",
#            legend = T, lg_x = 100,
#            lg_y = 250)

## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            labels=T)

## ---- echo=F, fig.height=3----------------------------------------------------
chromoMap(chr_file_1,"data/discrete_colormap.txt",
          canvas_height = 250,id="cmap1254",labels = T)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            labels=T,
#            label_font = 12,
#            label_angle = -65)

## ---- echo=F, fig.height=3----------------------------------------------------
chromoMap(chr_file_1,"data/discrete_colormap.txt",
          canvas_height = 250,id="cmap1925",labels = T,
          label_font = 10,
          label_angle = -65)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            labels=T,
#            label_angle = -65,
#            chr_length = 6,
#            chr_width = 25,
#            canvas_width = 800)

## ---- echo=F, fig.height=3----------------------------------------------------
chromoMap(chr_file_1,"data/discrete_colormap.txt",
          canvas_height = 250,id="cmap17445",labels = T,
          chr_length = 7,
          chr_width = 25,
          canvas_width = 900,label_font = 10,label_angle = -65)


## ----eval=FALSE---------------------------------------------------------------
#  chromoMap("chromosome_file.txt","annotation_file.txt",
#            hlinks=T)

## ----eval=FALSE---------------------------------------------------------------
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

## -----------------------------------------------------------------------------
 sessionInfo()

