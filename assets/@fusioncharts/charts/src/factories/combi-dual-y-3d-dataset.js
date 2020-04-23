"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=_default;var _column3d=_interopRequireDefault(require("../dataset/groups/column3d"));var _lib=require("@fusioncharts/core/src/lib");var _dataset=require("./dataset.helper");var MULTISERIESCOLUMNMANAGER="multiseriesColumnManager",MULTISERIESCOLUMNMANAGER3D="multiseriesColumnManager3D";function _default(chart){var jsonData=chart.getFromEnv("dataSource"),datasetsJSON=jsonData.dataset,children=chart.getChildren(),canvas=children.canvas[0],vCanvasArr=canvas.getChildren("vCanvas"),vCanvas=vCanvasArr[0],svCanvas=vCanvasArr[1],datasetJSON,isdual=chart.getFromEnv("chartConfig").isdual,i,canvasDatasetsDef={vCanvasDatasetsDef0:{},vCanvasDatasetsDef1:{}},manager3D,datasetsDef,datasetDef,DsGroupClass,dsType,parentyaxis,relatedVCanvas,relatedPrevDatasetMap,prevDatasetMap={vCanvas0:{},vCanvas1:{}};if(!datasetsJSON){chart.setChartMessage()}for(i=0;i<datasetsJSON.length;i++){datasetJSON=datasetsJSON[i];parentyaxis=datasetJSON.parentyaxis||"";if(parentyaxis.toLowerCase()==="s"&&isdual){dsType=(0,_lib.pluck)(datasetJSON.renderas,chart.config.sDefaultDatasetType);relatedVCanvas=svCanvas;relatedPrevDatasetMap=prevDatasetMap.vCanvas1;datasetsDef=canvasDatasetsDef.vCanvasDatasetsDef1}else{dsType=(0,_lib.pluck)(datasetJSON.renderas,chart.config.defaultDatasetType);relatedVCanvas=vCanvas;relatedPrevDatasetMap=prevDatasetMap.vCanvas0;datasetsDef=canvasDatasetsDef.vCanvasDatasetsDef0}dsType=chart.getDSType(dsType,parentyaxis.toLowerCase()==="s");DsGroupClass=chart.getDSGroupdef(dsType,parentyaxis);if(DsGroupClass){(0,_lib.componentFactory)(relatedVCanvas,_column3d.default,MULTISERIESCOLUMNMANAGER3D);manager3D=relatedVCanvas.getChildren(MULTISERIESCOLUMNMANAGER3D)[0];relatedPrevDatasetMap[manager3D.getName()]=true;(0,_lib.componentFactory)(manager3D,DsGroupClass,MULTISERIESCOLUMNMANAGER);relatedPrevDatasetMap[DsGroupClass.getName().toLowerCase()]=true}relatedPrevDatasetMap[dsType.toLowerCase()]=true;if(datasetsDef[dsType]){datasetsDef[dsType].conf.push(datasetJSON);datasetsDef[dsType].indices.push(i)}else{datasetsDef[dsType]={};datasetsDef[dsType].indices=[i];datasetsDef[dsType].classDef=chart.getDSdef(dsType);datasetsDef[dsType].conf=[datasetJSON];datasetsDef[dsType].pYAxis=parentyaxis.toLowerCase();datasetsDef[dsType].parent=DsGroupClass?manager3D.getChildren(MULTISERIESCOLUMNMANAGER)[0]:relatedVCanvas}}for(var key in canvasDatasetsDef){if(canvasDatasetsDef.hasOwnProperty(key)){datasetsDef=canvasDatasetsDef[key];for(dsType in datasetsDef){if(datasetsDef.hasOwnProperty(dsType)){datasetDef=datasetsDef[dsType];if(datasetDef.parent.getType()==="group"){datasetDef.parent.configure(datasetDef.conf)}(0,_lib.datasetFactory)(datasetDef.parent,datasetDef.classDef,"dataset_"+dsType,datasetDef.conf.length,datasetDef.conf,datasetDef.indices)}}}}(0,_dataset.removeComponents)(vCanvasArr[0],Object.keys(prevDatasetMap.vCanvas0));(0,_dataset.removeComponents)(vCanvasArr[1],Object.keys(prevDatasetMap.vCanvas1))}