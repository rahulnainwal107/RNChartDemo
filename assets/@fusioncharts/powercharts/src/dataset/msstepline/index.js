"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _lib=require("@fusioncharts/core/src/lib");var _line=_interopRequireDefault(require("@fusioncharts/charts/src/dataset/line"));var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _index=_interopRequireDefault(require("./index.animation"));var LINE="line",H="H",V="V",M="M",UNDEF;(0,_dependencyManager.addDep)({name:"stepLineAnimation",type:"animationRule",extension:_index.default});var MSStepLineDataset=function(_LineDataset){(0,_inheritsLoose2.default)(MSStepLineDataset,_LineDataset);function MSStepLineDataset(){var _this;_this=_LineDataset.call(this)||this;_this.getPathArr=function(){var pathObj=this,pathArr=pathObj.pathArr,path2Arr=pathObj.path2Arr;if(pathArr.length||path2Arr.length){return pathArr.concat(path2Arr)}return[]};return _this}var _proto=MSStepLineDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"stepLine"};_proto.__setDefaultConfig=function __setDefaultConfig(){_LineDataset.prototype.__setDefaultConfig.call(this);var config=this.config;config.drawverticaljoins=UNDEF;config.useforwardsteps=UNDEF};_proto._addLegend=function _addLegend(){var dataset=this,conf=dataset.config,legend=dataset.getFromEnv("legend"),drawAnchors=(0,_lib.pluckNumber)(conf.drawanchors,1),legendItem,config={enabled:conf.includeinlegend,type:LINE,drawLine:(0,_lib.pluck)(conf.drawLine,true),anchorSide:drawAnchors?conf.anchorsides:0,label:(0,_lib.getFirstValue)(dataset.config.JSONData.seriesname)};if(conf.includeinlegend){legendItem=legend.getItem(dataset.config.legendItemId);if(!legendItem){dataset.config.legendItemId=legend.createItem(dataset);legendItem=legend.getItem(dataset.config.legendItemId);dataset.addExtEventListener("fc-click",(function(){legendItem.itemClickFn()}),legendItem)}legendItem.configure(config);legendItem.setStateCosmetics("default",{symbol:{fill:(0,_lib.toRaphaelColor)({color:conf.anchorbgcolor,alpha:conf.anchorbgalpha}),rawFillColor:conf.anchorbgcolor,rawStrokeColor:conf.anchorbordercolor,stroke:(0,_lib.toRaphaelColor)({color:conf.anchorbordercolor,alpha:"100"}),"stroke-width":conf.anchorborderthickness}});if(!dataset.getState("visible")){legendItem.setLegendState("hidden")}else{legendItem.removeLegendState("hidden")}}else if(dataset.config.legendItemId){legend.disposeItem(dataset.config.legendItemId)}};_proto.getLinePath=function getLinePath(data,positions){var dataset=this,conf=dataset.config,chartConfig=dataset.getFromEnv("chartConfig"),connectNullData=(0,_lib.pluckNumber)(chartConfig.connectnulldata),obj={},drawVerticalJoins=(0,_lib.pluckNumber)(conf.drawverticaljoins),halfStep=(0,_lib.pluckNumber)(chartConfig.stepatmiddle)?dataset.getFromEnv("xAxis").getPVR()*.5:0,lastValidValue=obj.lastValidValue||false,temp=obj.temp||[],temp2=obj.temp2||[],pathArr=obj.pathArr||[],path2Arr=obj.path2Arr||[],lastXPos,i,config,xPos,yPos,pointsJoined=obj.pointsJoined||0,dataObj,setValue,startPos=positions&&positions.begin||0,endPos=positions&&positions.end||data.length,step=chartConfig.viewPortConfig.step||1,dataWithRemovedPaths=[];dataWithRemovedPaths=dataWithRemovedPaths.concat(data);for(i=startPos;i<endPos;i+=step){dataObj=dataWithRemovedPaths[i];if(!dataObj){continue}config=dataObj.config;setValue=config.setValue;if(setValue===UNDEF||config&&config.isSkipped===true){config&&delete config.isSkipped;continue}xPos=config._Px;yPos=config._Py;if(setValue===null||setValue.isNull){if(!connectNullData){temp=[];temp2=[];lastValidValue=false}}else{if(lastValidValue){if(temp.length){pathArr=pathArr.concat(temp);temp=[];pointsJoined++}if((0,_lib.pluckNumber)(conf.useforwardsteps)){pathArr.push([H,xPos-halfStep]);if(drawVerticalJoins){pathArr.push([V,yPos])}else{pathArr.push([M,xPos-halfStep,yPos])}if(halfStep){pathArr.push([H,xPos])}}else{if(drawVerticalJoins){pathArr.push([V,yPos])}else{pathArr.push([M,lastXPos,yPos])}pathArr.push([H,xPos]);lastXPos=xPos}}else{temp.push([M,xPos,yPos]);lastXPos=xPos;pointsJoined=0;lastValidValue=true}}}return{pathArr:pathArr,path2Arr:path2Arr,lastValidValue:lastValidValue,pointsJoined:pointsJoined,temp:temp,temp2:temp2,getPathArr:dataset.getPathArr}};return MSStepLineDataset}(_line.default);var _default=MSStepLineDataset;exports.default=_default;