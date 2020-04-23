"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _area=_interopRequireDefault(require("@fusioncharts/charts/src/dataset/area"));var _index=_interopRequireDefault(require("./index.animation"));var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _polarUtil=require("@fusioncharts/utils/src/scale-utils/polar-util");var _lib=require("@fusioncharts/core/src/lib");var COMMASTRING=",",UNDEF,M="M",L="L",Z="Z",dropHash=_lib.regex.dropHash;(0,_dependencyManager.addDep)({name:"radarAnimation",type:"animationRule",extension:_index.default});var RadarDataset=function(_AreaDataset){(0,_inheritsLoose2.default)(RadarDataset,_AreaDataset);function RadarDataset(){var _this;_this=_AreaDataset.call(this)||this;_this.getPathArr=function(){var pathObj=this,pathArr=pathObj.pathArr,path2Arr=pathObj.path2Arr;if(pathArr.length||path2Arr.length){return pathArr.concat(path2Arr)}return[]};return _this}var _proto=RadarDataset.prototype;_proto.getName=function getName(){return"radar"};_proto.createCoordinates=function createCoordinates(){var dataSet=this,chartConfig=dataSet.getFromEnv("chartConfig"),dataObj,config,previousY,i,Px,Py,len=dataSet.components.data.length,dataStore=dataSet.components.data,xPos,yPos,setValue;for(i=0;i<len;i++){dataObj=dataStore[i];config=dataObj&&dataObj.config;setValue=config.setValue;if(dataObj===UNDEF){continue}yPos=dataSet.getFromEnv("yAxis").getPixel(setValue+(previousY||0));xPos=(0,_polarUtil.getCoordinates)({radius:chartConfig.canvasTop+chartConfig.canvasHeight/2-yPos,theta:i},dataSet.getFromEnv("xAxis"));Py=xPos.y;Px=xPos.x;config._Px=Px;config._Py=Py;config._Pbx=Px;config._Pby=Py}};_proto.getLinePath=function getLinePath(data,positions,type){var dataset=this,chartConfig=dataset.getFromEnv("chartConfig"),obj={},lastValidValue=obj.lastValidValue||false,temp=obj.temp||[],temp2=obj.temp2||[],pathArr=obj.pathArr||[],i,config,xPos,yPos,pointsJoined=obj.pointsJoined||0,dataObj,setValue,startPos=positions&&positions.begin||0,endPos=positions&&positions.end||data.length,step=chartConfig.viewPortConfig.step||1,yAxis=dataset.getFromEnv("yAxis"),xAxis=dataset.getFromEnv("xAxis"),baseZero=yAxis.getPixel(0),removeDataLen=dataset.removeDataLen||0,dataWithRemovedPaths=[];dataWithRemovedPaths=dataWithRemovedPaths.concat(data);for(i=startPos;i<endPos+removeDataLen;i+=step){dataObj=dataWithRemovedPaths[i];if(!dataObj){continue}config=dataObj.config;setValue=config.setValue;if(setValue===null||config&&config.isSkipped===true){xPos=(0,_polarUtil.getCoordinates)({theta:xAxis.getLimit().min},xAxis).x;yPos=yAxis.getPixel(yAxis.config.axisRange.min)}else{xPos=config._Px;yPos=config._Py}if(type==="zero"){yPos=baseZero}else if(type==="base"){yPos=config._Pby}if(lastValidValue){if(temp.length){pathArr=pathArr.concat(temp);temp=[];pointsJoined++}pathArr.push([L,xPos,yPos])}else{temp.push([M,xPos,yPos]);pointsJoined=0;lastValidValue=true}}if(pathArr[pathArr.length-1]!==Z&&pointsJoined>0){pathArr.push(Z)}return{pathArr:pathArr,path2Arr:[],lastValidValue:lastValidValue,pointsJoined:pointsJoined,temp:temp,temp2:temp2,getPathArr:dataset.getPathArr}};_proto.configureAttributes=function configureAttributes(datasetJSON){if(!datasetJSON){return false}this.trimData(datasetJSON);this.JSONData=datasetJSON;var dataset=this,conf=dataset.config,chart=dataset.getFromEnv("chart"),chartAttr=chart.getFromEnv("dataSource").chart,JSONData=dataset.JSONData,plotColor=dataset.getFromEnv("color-manager").getPlotColor(dataset.index);_AreaDataset.prototype.configureAttributes.call(this,datasetJSON);conf.defaultPadding={left:0,right:0};conf.plotfillcolor=(0,_lib.pluck)(JSONData.color,chartAttr.plotfillcolor,plotColor);conf.plotbordercolor=(0,_lib.pluck)(JSONData.plotbordercolor,chartAttr.plotbordercolor,chartAttr.areabordercolor,plotColor).split(COMMASTRING)[0];conf.plotborderColorObject={color:conf.plotbordercolor,alpha:conf.plotborderalpha,angle:conf.plotfillangle};conf.fillColor={color:conf.plotfillcolor+(conf.plotgradientcolor?COMMASTRING+conf.plotgradientcolor:_lib.BLANKSTRING),alpha:conf.plotfillalpha,angle:conf.plotfillangle};conf.legendSymbolColor=conf.plotfillcolor};_proto._getHoveredPlot=function _getHoveredPlot(chartX,chartY){var dataset=this,xAxis=dataset.getFromEnv("xAxis"),dataStore=dataset.components.data,pointObj,xMin,xMax,len=dataStore.length,returnValue,conf=dataset.config,divAngle=360/len,i;xMin=Math.floor(Math.max((0,_polarUtil.getPlotFromPixel)({x:chartX-conf.maxRadius,y:chartY},xAxis)/divAngle-1,0));xMax=Math.floor(Math.max((0,_polarUtil.getPlotFromPixel)({x:chartX+conf.maxRadius,y:chartY},xAxis)/divAngle,len-1));for(i=xMax;i>=xMin;i--){pointObj=dataStore[i];if(pointObj){returnValue=dataset.isWithinShape(pointObj,i,chartX,chartY);if(returnValue){break}}}return returnValue};_proto._contextChanged=function _contextChanged(){if(!this.config.context){this.config.context={}}var dataset=this,status,context=dataset.config.context,oldAxisCenterX=context.axisCenterX,newAxisCenterX;newAxisCenterX=dataset.getFromEnv("xAxis").config.axisDimention.centerX;status=!(newAxisCenterX===oldAxisCenterX);context.axisCenterX=newAxisCenterX;return status||_AreaDataset.prototype._contextChanged.call(this)};_proto.getPlotInCategoryAt=function getPlotInCategoryAt(chartX,chartY){var plots=this.components.data,categoryAxis=this.getFromEnv("xAxis"),isDatasetVisible=this.getState("visible"),hoveredCategoryIndex=Math.round((0,_polarUtil.getPlotFromPixel)({x:chartX,y:chartY},categoryAxis)),foundPlot=plots.find((function(plot,idx,plotArr){var plotCategoryIndex,nextPlotCategoryIndex,prevPlotCategoryIndex,halfCategoryDiff,nextPlot,prevPlot;if(idx===0){nextPlot=plotArr[idx+1];prevPlot=plotArr[plotArr.length-1]}else if(idx===plotArr.length-1){nextPlot=plotArr[0];prevPlot=plotArr[plotArr.length-2]}else{nextPlot=plotArr[idx+1];prevPlot=plotArr[idx-1]}plotCategoryIndex=(0,_polarUtil.getPlotFromPixel)({x:plot.config._Px,y:plot.config._Py},categoryAxis);nextPlotCategoryIndex=idx===plotArr.length-1?360:(0,_polarUtil.getPlotFromPixel)({x:nextPlot.config._Px,y:nextPlot.config._Py},categoryAxis);prevPlotCategoryIndex=(0,_polarUtil.getPlotFromPixel)({x:prevPlot.config._Px,y:prevPlot.config._Py},categoryAxis);halfCategoryDiff=(nextPlotCategoryIndex-plotCategoryIndex)/2;if(hoveredCategoryIndex<=0+halfCategoryDiff){return hoveredCategoryIndex>=0&&hoveredCategoryIndex<=0+halfCategoryDiff}else if(hoveredCategoryIndex>360-halfCategoryDiff){return hoveredCategoryIndex>=360-halfCategoryDiff&&hoveredCategoryIndex<=360}return hoveredCategoryIndex>=prevPlotCategoryIndex+halfCategoryDiff&&hoveredCategoryIndex<=nextPlotCategoryIndex-halfCategoryDiff})),hoveredPlotInfo=this._getHoveredPlot(chartX,chartY);if(isDatasetVisible&&hoveredPlotInfo){return hoveredPlotInfo}else if(isDatasetVisible&&foundPlot){return{pointIndex:foundPlot._index,hovered:false,pointObj:foundPlot}}return false};_proto._addLegend=function _addLegend(){var dataset=this,strokeColor,fillColor,conf=dataset.config,chartAttr=dataset.getFromEnv("chart-attrib"),legendItem,legend=dataset.getFromEnv("legend"),color=conf.legendSymbolColor,lightColor,use3DLighting=(0,_lib.pluckNumber)(chartAttr.use3dlighting,chartAttr.useplotgradientcolor,1);strokeColor=(0,_lib.getLightColor)(color,60).replace(dropHash,_lib.HASHSTRING);if(use3DLighting){lightColor=(0,_lib.getLightColor)(color,40);fillColor={FCcolor:{color:color+","+color+","+lightColor+","+color+","+color,ratio:"0,70,30",angle:270,alpha:"100,100,100,100,100"}}}else{fillColor={FCcolor:{color:color,angle:0,ratio:"0",alpha:"100"}}}if(conf.includeinlegend){legendItem=legend.getItem(dataset.config.legendItemId);if(!legendItem){dataset.config.legendItemId=legend.createItem(dataset);legendItem=legend.getItem(dataset.config.legendItemId);dataset.addExtEventListener("fc-click",(function(){legendItem.itemClickFn()}),legendItem)}legendItem.configure({enabled:conf.includeInLegend,type:dataset.type,label:(0,_lib.getFirstValue)(dataset.JSONData.seriesname)});legendItem.setStateCosmetics("default",{symbol:{fill:(0,_lib.toRaphaelColor)(fillColor),rawFillColor:color,stroke:(0,_lib.toRaphaelColor)(strokeColor)}});if(!dataset.getState("visible")){legendItem.setLegendState("hidden")}else{legendItem.removeLegendState("hidden")}}else if(dataset.config.legendItemId){legend.disposeItem(dataset.config.legendItemId)}};_proto.getOldPath=function getOldPath(pathVal,lim){var dataSet=this,path=pathVal,xLim=lim.x,yLim=lim.y,oldLim=dataSet.config&&dataSet.config.prevLim,oldLimX=oldLim.x,oldLimY=oldLim.y,i=0,ii=path.pathArr.length,item,getOldValX=function getOldValX(value){var val=value;val=(val-oldLimX.minPixel.x)/(oldLimX.maxPixel.x-oldLimX.minPixel.x);val=val*(oldLimX.max-oldLimX.min)+oldLimX.min;val=(val-xLim.min)/(xLim.max-xLim.min);return val*(xLim.maxPixel.x-xLim.minPixel.x)+xLim.minPixel.x+1},getOldValY=function getOldValY(value){var val=value;if(val<oldLimY.base&&val>yLim.base||val>oldLimY.base&&val<yLim.base){val=yLim.base}return val-1},getOldValYBase=function getOldValYBase(val){if(val===oldLimY.base){return yLim.base}return getOldValY(val)};if(oldLimY.min===yLim.min&&oldLimX.min===xLim.min&&oldLimY.max===yLim.max&&oldLimX.max===xLim.max){return path}path=(0,_lib.extend2)({},path);if(!oldLim){return[]}path.pathArr=path.pathArr.slice(0);path.path2Arr=path.path2Arr.slice(0);for(i=ii;i--;){item=path.pathArr[i].slice(0);if(!item[1]||!item.join){continue}item[1]=getOldValX(item[1]);item[2]=getOldValYBase(item[2]);path.pathArr[i]=item}for(i=path.path2Arr.length;i--;){item=path.path2Arr[i].slice(0);if(!item[1]||!item.join){continue}item[1]=getOldValX(item[1]);item[2]=getOldValYBase(item[2]);path.path2Arr[i]=item}return path};_proto._setConfigure=function _setConfigure(){var dataSet=this,conf=dataSet.config,setDataArr=dataSet.config.JSONData.data||[],setData,dataObj,len=dataSet.getFromEnv("xAxis").getTicksLen(),dataStore,i;conf.imageCount=0;dataStore=dataSet.components.data;if(!dataStore){dataStore=dataSet.components.data=[]}conf.maxRadius=-Infinity;for(i=0;i<len;i++){dataObj=dataStore[i];setData=setDataArr&&setDataArr[i]||{};if(!dataObj){dataObj=dataStore[i]={}}if(!dataObj.config){dataStore[i].config={}}if(!dataObj.graphics){dataObj.graphics={}}dataSet._plotConfigure(i,setData)}};return RadarDataset}(_area.default);var _default=RadarDataset;exports.default=_default;