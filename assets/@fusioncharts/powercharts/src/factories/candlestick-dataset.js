"use strict";exports.__esModule=true;exports.default=_default;var _lib=require("@fusioncharts/core/src/lib");var _candlestick=require("../dataset/candlestick");var arraySpliceByValue=function arraySpliceByValue(array,value){var indexOf=array.indexOf(value);if(indexOf!==-1){array.splice(indexOf,1)}},removeComponents=function removeComponents(component,set){var i;component&&component.iterateComponents((function(child){for(i=0;i<set.length;i++){if(child.getName()===set[i]){child.remove()}}}))};function _default(chart){var jsonData=chart.getFromEnv("dataSource"),datasetsJSON=jsonData.dataset,trendSet=jsonData.trendset,showVolumeChart=chart.getFromEnv("chartConfig").showVolumeChart,dsType=(0,_lib.pluck)((0,_lib.parseUnsafeString)(chart.getFromEnv("chart-attrib").plotpriceas).toLowerCase(),"candlestick"),canvas=chart.getChildren("canvas")[0],datasetParent=canvas.getChildren("vCanvas")[0],volumeCanvas,volumeDatasetParent,sortedDatasetsJSON,set=["candlestick","candlestickbar","candlestickline","trendset"];if(!datasetsJSON){chart.setChartMessage();return}sortedDatasetsJSON=datasetsJSON.slice(0);sortedDatasetsJSON[0]&&sortedDatasetsJSON[0].data&&sortedDatasetsJSON[0].data.sort((function(a,b){return a.x-b.x}));(0,_lib.datasetFactory)(datasetParent,chart.getDSdef(dsType),"dataset_"+dsType,datasetsJSON.length,sortedDatasetsJSON);if(dsType==="bar"){arraySpliceByValue(set,"candlestickbar")}else if(dsType==="line"){arraySpliceByValue(set,"candlestickline")}else{arraySpliceByValue(set,"candlestick")}if(showVolumeChart){volumeCanvas=chart.getChildren("canvas")[1];volumeDatasetParent=volumeCanvas.getChildren("vCanvas")[0];(0,_lib.datasetFactory)(volumeDatasetParent,_candlestick.VolumeDataset,"dataset_volume",datasetsJSON.length,datasetsJSON)}if(trendSet){(0,_lib.datasetFactory)(datasetParent,_candlestick.TrendSet,"dataset_trendset",trendSet.length,trendSet);arraySpliceByValue(set,"trendset")}removeComponents(datasetParent,set)}