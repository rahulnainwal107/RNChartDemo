"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _lib=require("@fusioncharts/core/src/lib");var _crossline=_interopRequireDefault(require("./crossline"));var _crosslineManagerBandCategoryAxis=_interopRequireDefault(require("./crossline-manager-band-category-axis"));var CANVAS="canvas",CHARTAPI="chartAPI",CROSSLINEMANAGER="crossline-manager",chartExclusionList={dragnode:true,hlineargauge:true,column3d:true,mscolumn3d:true,bar3d:true,pareto3d:true,msbar3d:true,stackedcolumn3d:true,stackedbar3d:true,mscombi3d:true,mscolumnline3d:true,stackedcolumn3dline:true,mscolumn3dlinedy:true,stackedcolumn3dlinedy:true,realtimearea:true,realtimecolumn:true,realtimeline:true,realtimestackedarea:true,realtimestackedcolumn:true,angulargauge:true,realtimelinedy:true,kagi:true,treemap:true,heatmap:true,boxandwhisker2d:true,scatter:true,timeseries:true,bubble:true,errorscatter:true,sparkwinloss:true,zoomscatter:true,zoomline:true,zoomlinedy:true,chord:true},onFcPreconfigure=function onFcPreconfigure(event){if(event.sender.getType()===CHARTAPI){var chart=event.sender,chartObj=chart.getFromEnv("chartInstance");chartObj.drawCrossline=function(value){chartObj.drawConsolidatedToolTip(value);chart.iterateComponents((function(component){if(component.getType()===CROSSLINEMANAGER){if(value!==_lib.UNDEF){component.show({value:value})}else{component.hide()}}}))}}},onFcScrollStart=function onFcScrollStart(event){var canvases=event.sender.apiInstance.getChildren("canvas"),crosslineManagerBand,handlerAPI,i;for(i=0;i<canvases.length;i++){crosslineManagerBand=canvases[i].getChildren("crosslineManagerBand");if(crosslineManagerBand=crosslineManagerBand&&crosslineManagerBand[0]){handlerAPI=crosslineManagerBand._handlerAPI;crosslineManagerBand.config.axisScrolling=true;handlerAPI.onhoverout(event)}}},onFcScrollEnd=function onFcScrollEnd(event){var canvases=event.sender.apiInstance.getChildren("canvas"),crosslineManagerBand,i;for(i=0;i<canvases.length;i++){crosslineManagerBand=canvases[i].getChildren("crosslineManagerBand");crosslineManagerBand&&crosslineManagerBand[0]&&(crosslineManagerBand[0].config.axisScrolling=false)}},onFcInstantiated=function onFcInstantiated(event){if(event.sender.getName()===CANVAS){var canvas=event.sender,crosslineManagerBand,handlerAPI;canvas.registerFactory("crossLineManager",(function(){var chart=event.sender.getFromEnv("chart"),chartName=chart&&chart.getName();if(chartName&&!chartExclusionList[chartName.toLowerCase()]){(0,_lib.componentFactory)(canvas,_crosslineManagerBandCategoryAxis.default,"crosslineManagerBand");crosslineManagerBand=canvas.getChildren("crosslineManagerBand")[0];handlerAPI=crosslineManagerBand._handlerAPI;crosslineManagerBand.configure();(0,_lib.componentFactory)(crosslineManagerBand,_crossline.default,"crossline");crosslineManagerBand.addExtEventListener("fc-mouseover",handlerAPI.onhover,canvas);crosslineManagerBand.addExtEventListener("fc-mousemove",handlerAPI.onhover,canvas);crosslineManagerBand.addExtEventListener("fc-mouseout",handlerAPI.onhoverout,canvas)}}))}};var _default={extension:function extension(Fusioncharts){Fusioncharts.addEventListener("preconfigure",onFcPreconfigure);Fusioncharts.addEventListener("scrollstart",onFcScrollStart);Fusioncharts.addEventListener("scrollend",onFcScrollEnd);Fusioncharts.addEventListener("instantiated",onFcInstantiated)},name:"crossline-manager",type:"extension",requiresFusionCharts:true};exports.default=_default;