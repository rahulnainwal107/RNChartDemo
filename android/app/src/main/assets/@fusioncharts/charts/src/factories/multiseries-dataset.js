"use strict";exports.__esModule=true;exports.default=_default;var _lib=require("@fusioncharts/core/src/lib");function _default(chart){var jsonData=chart.getFromEnv("dataSource"),datasetsJSON=jsonData.dataset,children=chart.getChildren(),canvas=children.canvas[0],vCanvas,datasetParent=vCanvas=canvas.getChildren("vCanvas")[0],DSClass,MultiSeriesManager,dsType=chart.config.defaultDatasetType||"",groupManager;if(!datasetsJSON){chart.setChartMessage();return}MultiSeriesManager=chart.getDSGroupdef();if(MultiSeriesManager){(0,_lib.componentFactory)(vCanvas,MultiSeriesManager,"datasetGroup_"+dsType,1,[datasetsJSON]);groupManager=vCanvas.getChildren("datasetGroup_"+dsType)}groupManager&&(datasetParent=groupManager[0]);DSClass=chart.getDSdef();(0,_lib.datasetFactory)(datasetParent,DSClass,"dataset",datasetsJSON.length,datasetsJSON)}