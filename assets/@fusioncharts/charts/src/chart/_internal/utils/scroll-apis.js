"use strict";exports.__esModule=true;exports.scrollTo=scrollTo;exports.setAxisScale=setAxisScale;exports.resetViewPortConfig=resetViewPortConfig;exports.configurer=_configurer;var _schedular=require("@fusioncharts/core/src/schedular");var _lib=require("@fusioncharts/core/src/lib");var UNDEF;var mathFloor=Math.floor,BAR2D="bar2D",COLUMN2D="column";function scrollTo(value){var chart=this.apiInstance;chart.addJob("scrollToAPoint",(function(){if(value>=0&&value<=1){var children=chart.getChildren&&chart.getChildren(),xAxis=children.xAxis[0],scrollbar=children.scrollBar&&children.scrollBar[0],scrollAnchor=scrollbar&&scrollbar.getChildren("scrollAnchor")[0],limit=xAxis.getLimit&&xAxis.getLimit(),visibleConfig=xAxis.getVisibleConfig&&xAxis.getVisibleConfig(),visibleLength=visibleConfig.maxValue-visibleConfig.minValue,totalLength=limit.max-limit.min,start=value*(totalLength-visibleLength)+limit.min,end=start+visibleLength,previousValue=(visibleConfig.minValue-limit.min)/(totalLength-visibleLength);scrollAnchor.config.scrollPosition=value;chart.fireChartInstanceEvent("scrollStart",{scrollPosition:previousValue});xAxis.setVisibleConfig(start,end);chart.fireChartInstanceEvent("scrollEnd",{previousScrollPosition:previousValue,scrollPosition:value})}}),_schedular.priorityList.postRender)}function setAxisScale(type){if(type===void 0){type=COLUMN2D}var iapi=this,config=iapi.config,xAxis=iapi.getChildren("xAxis")[0],catCount=xAxis.getTicksLen(),isBar=type==="bar2d",chartType=isBar?BAR2D:type,jsonData=iapi.getFromEnv("dataSource"),chartAttr=jsonData.chart,chartWidth=isBar?config.height:config.width,xAxisMin,xAxisMax,minVisiblePlots=2,numOfColumnSeries=0,totalNumPoint,visibleRange,xAxisLimit,scrollToEnd=config.scrollToEnd,numVisiblePlot=(0,_lib.pluckNumber)(chartAttr.numvisibleplot,mathFloor(chartWidth/config.avgScrollPointWidth));if(config.isstacked){iapi.iterateComponents((function(child){if(child.getName()==="cartesianStackGroup"){!child.getState("removed")&&numOfColumnSeries++}}))}else{iapi.iterateComponents((function(child){if(child.getType&&child.getType()==="dataset"){if(child.getName&&child.getName().toLowerCase()===chartType){!child.getState("removed")&&numOfColumnSeries++}}}))}numOfColumnSeries=numOfColumnSeries||1;totalNumPoint=catCount*numOfColumnSeries;var _xAxis$getVisibleConf=xAxis.getVisibleConfig();xAxisMax=_xAxis$getVisibleConf.maxValue;xAxisMin=_xAxis$getVisibleConf.minValue;if(numVisiblePlot>=minVisiblePlots&&numVisiblePlot<totalNumPoint){visibleRange=numVisiblePlot/numOfColumnSeries;iapi.setScrollType("always");if(scrollToEnd){xAxisMin=xAxisMax-visibleRange}else{xAxisMax=xAxisMin+visibleRange}if(xAxisMin===0){xAxisMax=xAxisMax-1}xAxis.setVisibleConfig(xAxisMin,xAxisMax)}else{xAxisLimit=xAxis.getLimit();xAxis.setVisibleConfig(xAxisLimit.min,xAxisLimit.max);iapi.setScrollType("none")}}function resetViewPortConfig(){var iapi=this;iapi.config.viewPortConfig={scaleX:1,scaleY:1,x:0,y:0}}function _configurer(){var chart=this,jsonData=chart.getFromEnv("dataSource"),chartAttr=jsonData.chart,chartConfig;chartConfig=chart.config;chartConfig.scrollToEnd=(0,_lib.pluckNumber)(chartAttr.scrolltoend,0);chartConfig.lastScrollPosition=UNDEF}