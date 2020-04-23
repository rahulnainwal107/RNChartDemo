"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=_default;var _lib=require("@fusioncharts/core/src/lib");var _columnMultiseries=_interopRequireDefault(require("../dataset/groups/column-multiseries"));function _default(chart){var jsonData=chart.getFromEnv("dataSource"),pDatasetsJSON=jsonData.dataset,pLength=pDatasetsJSON&&pDatasetsJSON.length,i,length,prevLength=0,datasetsJSON,canvas=chart.getChildren("canvas")[0],vCanvas=canvas.getChildren("vCanvas")[0],indices,stackGroups,stackConf=[],stackGroupParent;if(!pDatasetsJSON){chart.setChartMessage();return}(0,_lib.componentFactory)(vCanvas,_columnMultiseries.default,"multiSeriesGroup_column");stackGroupParent=vCanvas.getChildren("multiSeriesGroup_column")[0];for(i=0;i<pLength;i++){stackConf.push(pDatasetsJSON[i].dataset)}(0,_lib.componentFactory)(stackGroupParent,chart.getDSGroupdef(),"stackedGroup_column",pLength,stackConf);stackGroups=stackGroupParent.getChildren("stackedGroup_column");for(i=0;i<stackGroups.length;i++){if(stackGroups[i].getState("removed")!==true){datasetsJSON=pDatasetsJSON[i].dataset;if(!datasetsJSON){chart.setChartMessage();return}length=datasetsJSON&&datasetsJSON.length;indices=Array(length).fill(prevLength).map((function(n,j){return n+j}));(0,_lib.datasetFactory)(stackGroups[i],chart.getDSdef(),"dataset_column",length,datasetsJSON,indices);prevLength+=length}}chart.config._lastDatasetIndex=indices[indices.length-1]}