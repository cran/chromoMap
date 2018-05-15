#' Gene Expression RNAseq data for Pancreatic Adenocarcinoma from TCGA
#'
#' Data extracted from The Cancer Genome Atlas database and further processed,
#' consist of Two datasets-
#' data1- 630 selected differentially expressed genes in pancreatic cancer condition
#' as predicted from R limma package, also includes the logFC(log tranformed
#' Fold Change) for each gene 
#' data2 - normalized expression values of 25,465 genes for one control
#' sample and one tumor sample (Pancreatic cancer), the data is converted
#' into the format for analysis, consist of five columns as name(gene-names),
#' chrom,start,data(control),secondData(tumor)
#'
#' @docType data
#'
#' @usage data(pancandata)
#'
#' @format A List of 2 elements
#'
#' @keywords datasets
#'
#' @references The Cancer Genome Atlas
#'
#' 
#'
#' @examples
#' data(pancandata)
#' 
#' \donttest{chromoMap(pancandata$data1,type="annotation")}
#' \donttest{chromoMap(pancandata$data1,type="heatmap-single")}
#' \donttest{chromoMap(pancandata$data2,type="heatmap-double")}
"pancandata"