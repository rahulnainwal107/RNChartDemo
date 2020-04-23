"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _column=_interopRequireDefault(require("../column"));var _lib=require("@fusioncharts/core/src/lib");var _index=_interopRequireDefault(require("./index.animation"));var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var dropHash=_lib.regex.dropHypeash,math=Math,COLUMN_STR="column",mathRound=math.round,mathAbs=math.abs;(0,_dependencyManager.addDep)({name:"marimekkoAnimation",type:"animationRule",extension:_index.default});var MarimekkoDataset=function(_ColumnDataset){(0,_inheritsLoose2.default)(MarimekkoDataset,_ColumnDataset);function MarimekkoDataset(){var _this;_this=_ColumnDataset.call(this)||this;_this.config.groupName=COLUMN_STR;return _this}var _proto=MarimekkoDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"marimekko"};_proto.configure=function configure(datasetJSON){(0,_lib.fcEach)(datasetJSON.data,(function(obj){if(obj){obj.value=mathAbs(obj.value)}}));_ColumnDataset.prototype.configure.call(this,datasetJSON)};_proto._addLegend=function _addLegend(){var dataset=this,strokeColor,fillColor,config,legendItem,conf=dataset.config,legend=dataset.getFromEnv("legend"),use3DLighting=(0,_lib.pluckNumber)(dataset.getFromEnv("chart-attrib").useplotgradientcolor,1),color=conf.legendSymbolColor,lightColor;strokeColor=(0,_lib.getLightColor)(color,60).replace(dropHash,_lib.HASHSTRING);if(use3DLighting){lightColor=(0,_lib.getLightColor)(color,40);fillColor={FCcolor:{color:color+","+color+","+lightColor+","+color+","+color,ratio:"0,70,30",angle:270,alpha:"100,100,100,100,100"}}}else{fillColor={FCcolor:{color:color,angle:0,ratio:"0",alpha:"100"}}}config={enabled:conf.includeInLegend,type:dataset.type,label:(0,_lib.getFirstValue)(dataset.config.JSONData.seriesname)};if(conf.includeinlegend){legendItem=legend.getItem(dataset.config.legendItemId);if(!legendItem){dataset.config.legendItemId=legend.createItem(dataset);legendItem=legend.getItem(dataset.config.legendItemId);dataset.addExtEventListener("fc-click",(function(){legendItem.itemClickFn()}),legendItem)}legendItem.configure(config);legendItem.setStateCosmetics("default",{symbol:{fill:(0,_lib.toRaphaelColor)(fillColor),rawFillColor:fillColor.FCcolor.color,stroke:(0,_lib.toRaphaelColor)(strokeColor)}});if(!dataset.getState("visible")){legendItem.setLegendState("hidden")}else{legendItem.removeLegendState("hidden")}}else if(dataset.config.legendItemId){legend.disposeItem(dataset.config.legendItemId)}};_proto.searchIndex=function searchIndex(searchElementIndex,arr){var dataset=this,xAxis=dataset.getFromEnv("xAxis"),minIndex=0,len=arr.length-1,maxIndex=len,currentIndex,currentElementIndex;while(minIndex<=maxIndex){currentIndex=Math.round((minIndex+maxIndex)/2)||0;currentElementIndex=xAxis.getPixel(arr[currentIndex].x)+arr[currentIndex].columnWidth/2;if(currentElementIndex<searchElementIndex){minIndex=currentIndex+1}else if(currentElementIndex>searchElementIndex){maxIndex=currentIndex-1}else{return currentIndex}}return minIndex};_proto.allocatePosition=function allocatePosition(){this.getLinkedParent()._setStackDimensions();_ColumnDataset.prototype.allocatePosition.call(this)};_proto._getHoveredPlot=function _getHoveredPlot(chartX,chartY){var dataset=this,groupManager=dataset.getLinkedParent(),stackConf=groupManager.getstackConf(),chartConfig=dataset.getFromEnv("chartConfig"),configManager=groupManager.config,plotBorderThickness=chartConfig.plotborderthickness,showPlotBorder=chartConfig.showplotborder,len=stackConf.length-1,halfPlotBorderThickness,xPos,returnValue,datasetIndex;plotBorderThickness=showPlotBorder?plotBorderThickness:0;halfPlotBorderThickness=plotBorderThickness/2;halfPlotBorderThickness=halfPlotBorderThickness%2===0?halfPlotBorderThickness+1:Math.round(halfPlotBorderThickness);xPos=chartX+halfPlotBorderThickness;datasetIndex=returnValue&&configManager.datasetIndex||dataset.searchIndex(xPos,stackConf);configManager.datasetIndex||(configManager.datasetIndex=datasetIndex);returnValue=dataset._checkPointerOverColumn(datasetIndex,chartX,chartY);returnValue?delete configManager.datasetIndex:dataset.index===len&&delete configManager.datasetIndex;return returnValue};_proto.setColumnPosition=function setColumnPosition(){return this};_proto.fineTunePlotDimension=function fineTunePlotDimension(xPosition,yPosition,ht,wdth,index){var dataSet=this,height=ht,width=wdth,xPos=xPosition,yPos=yPosition,parent=dataSet.getLinkedParent(),stackConf=parent.getstackConf(),chart=dataSet.getFromEnv("chart"),chartConfig=chart.config,plotBorderThickness=chartConfig.plotborderthickness,canvasConfig=chart.getChildren("canvas")[0].config,canvasBorderWidth=canvasConfig.canvasBorderWidth,hasValidCanvasBorder=canvasBorderWidth>0,canvasRight=canvasConfig.canvasRight,canvasTop=canvasConfig.canvasTop,canvasLeft=canvasConfig.canvasLeft;if(!stackConf.length){return{xPos:xPos,yPos:yPos,width:width,height:height}}width=stackConf[index].columnWidth;xPos-=width/2;if(parseInt(yPos,10)<=canvasTop){height-=canvasTop-yPos-+hasValidCanvasBorder;yPos=canvasTop-+hasValidCanvasBorder}if(plotBorderThickness<=1){if(mathRound(xPos)<=canvasLeft){width+=xPos;xPos=canvasLeft-plotBorderThickness/2+ +!!plotBorderThickness-+hasValidCanvasBorder;width-=xPos}if(mathRound(xPos+width)>=canvasRight){width=canvasRight-xPos+plotBorderThickness/2-+!!plotBorderThickness+ +hasValidCanvasBorder}}return{xPos:xPos,yPos:yPos,width:width,height:height}};return MarimekkoDataset}(_column.default);var _default=MarimekkoDataset;exports.default=_default;