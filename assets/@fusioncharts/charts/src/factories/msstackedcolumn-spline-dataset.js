"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=_default;var _msstackedcolumnDataset=_interopRequireDefault(require("./msstackedcolumn-dataset"));var _lib=require("@fusioncharts/core/src/lib");var removeLineSet=function removeLineSet(component){var lineSet=component.getChildren("dataset_line"),i;for(i=lineSet&&lineSet.length-1;i>-1;i--){lineSet[i].remove()}};function _default(chart){var jsonData=chart.getFromEnv("dataSource"),dataset=jsonData.dataset,splineSets=jsonData.lineset||[],splinesetStartIndex,indices,canvas=chart.getChildren("canvas")[0],vCanvas=canvas.getChildren("vCanvas")[1];if(!dataset&&splineSets.length===0){chart.setChartMessage();return}(0,_msstackedcolumnDataset.default)(chart);splinesetStartIndex=chart.config._lastDatasetIndex+1;if(splineSets&&splineSets.length){indices=Array(splineSets.length).fill(splinesetStartIndex).map((function(n,j){return n+j}));(0,_lib.datasetFactory)(vCanvas,chart.getDSdef("spline"),"dataset_spline",splineSets.length,splineSets,indices)}else{removeLineSet(vCanvas)}}