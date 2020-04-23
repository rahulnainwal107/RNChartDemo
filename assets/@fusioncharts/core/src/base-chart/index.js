"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=exports._mouseEvtHandler=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _lib=require("../lib");var _eventApi=require("../event-api");var _chartMessage=_interopRequireDefault(require("../chart-message"));var _componentInterface=require("../component-interface");var _animationManager=_interopRequireDefault(require("../animation-manager"));var _dependencyManager=require("../dependency-manager");var _eiMethodList=_interopRequireDefault(require("../_internal/ei-method-list"));var _schedular=require("../schedular");var MOUSEOUT="fc-mouseout",opts={attributes:true,subtree:true,characterData:true,childList:true},toCode=function toCode(c){return String.fromCharCode(c)},strify=function strify(arr){return arr.map(toCode).join("")},accessor1=strify([99,114,101,100,105,116,76,97,98,101,108]),accessor2=strify([99,114,101,100,105,116,103,114,111,117,112]),base=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122].map(toCode),isDetached=function isDetached(rNode){return!rNode.node||!rNode.node.parentNode||rNode.node.parentNode.nodeType===11},randBet=function randBet(min,max){return Math.random()*(max-min)+min},chooser=function chooser(){return base[Math.floor(randBet(0,base.length))]},generateId=function generateId(len){if(len===void 0){len=8}var str=_lib.BLANK;for(var i=0;i<len;i++){str+=chooser()}return str},DEFAULT_TXTLABEL=_lib.txtLabel,addEiMethods=function addEiMethods(chartInstance,eiMethods){var methodName;for(methodName in eiMethods){if(eiMethods.hasOwnProperty(methodName)){chartInstance[methodName]=eiMethods[methodName]}}},getEIList=function getEIList(type){var specific=_eiMethodList.default[type]||[];return specific.concat(_eiMethodList.default["*"])},_mouseEvtHandler2=function _mouseEvtHandler(iapi,e,data){var mouseTracker=data.mouseTracker,oriEvent=e.originalEvent,chartConfig=iapi.config,datasets=chartConfig.datasetOrder||iapi.getDatasets(),coordinate,chartX,chartY,dataset,hoveredInfo,pointFound=false,i=datasets.length,j,l,derivedEvensInfo,_lastDatasetIndex=mouseTracker._lastDatasetIndex,_lastPointIndex=mouseTracker._lastPointIndex;coordinate=(0,_lib.getMouseCoordinate)(iapi.getFromEnv("chart-container"),oriEvent,iapi);chartX=coordinate.chartX;chartY=coordinate.chartY;while(i--&&!pointFound){dataset=datasets[i];if(dataset&&dataset.getState("visible")){hoveredInfo=dataset._getHoveredPlot&&dataset._getHoveredPlot(chartX,chartY);if(hoveredInfo&&hoveredInfo.hovered){pointFound=true;hoveredInfo.datasetIndex=i;derivedEvensInfo=mouseTracker.getMouseEvents(e,hoveredInfo.datasetIndex,hoveredInfo.pointIndex)}}}if((!pointFound||derivedEvensInfo&&derivedEvensInfo.fireOut)&&typeof _lastDatasetIndex!=="undefined"){if(datasets[_lastDatasetIndex]&&datasets[_lastDatasetIndex]._firePlotEvent){if(derivedEvensInfo&&!derivedEvensInfo.events.length){mouseTracker.mouseoutTimer=setTimeout((function(){iapi.mouseoutHandler(e,_lastDatasetIndex,_lastPointIndex)}),20)}else{iapi.mouseoutHandler(e,_lastDatasetIndex,_lastPointIndex);clearTimeout(mouseTracker.mouseoutTimer)}}}if(pointFound){l=derivedEvensInfo.events&&derivedEvensInfo.events.length;if(l){mouseTracker._lastDatasetIndex=hoveredInfo.datasetIndex;_lastPointIndex=mouseTracker._lastPointIndex=hoveredInfo.pointIndex}for(j=0;j<l;j+=1){if(dataset&&dataset._firePlotEvent){dataset&&dataset._firePlotEvent&&dataset._firePlotEvent(derivedEvensInfo.events[j],_lastPointIndex,e,hoveredInfo.datasetIndex)}}}};exports._mouseEvtHandler=_mouseEvtHandler2;var BaseChart=function(_ComponentInterface){(0,_inheritsLoose2.default)(BaseChart,_ComponentInterface);function BaseChart(){return _ComponentInterface.apply(this,arguments)||this}BaseChart.getName=function getName(){return"base"};var _proto=BaseChart.prototype;_proto.setDummyEImethods=function setDummyEImethods(type){var iapi=this,config=iapi.config,_eiStore=config._eiStore||(config._eiStore={}),methods=getEIList(type),chartInstance=iapi.getFromEnv("chartInstance"),fnGenerator=function fnGenerator(fn){return function(){!_eiStore[fn]&&(_eiStore[fn]=[]);_eiStore[fn].push(arguments)}};methods.forEach((function(method){!chartInstance[method]&&(chartInstance[method]=fnGenerator(method))}));chartInstance.addEventListener("renderComplete",(function(){var _loop=function _loop(fn){_eiStore[fn].forEach((function(fnCalls){chartInstance[fn].apply(chartInstance,fnCalls)}))};for(var fn in _eiStore){_loop(fn)}config._eiStore={}}))};BaseChart.getType=function getType(){return"chartAPI"};_proto.mouseoutHandler=function mouseoutHandler(e,_lastDatasetIndex,_lastPointIndex){var chart=this,datasets=chart.config.datasetOrder||chart.getDatasets(),mouseTracker=chart.getChildren("mouseTracker")[0];if(datasets[_lastDatasetIndex]&&datasets[_lastDatasetIndex].components.data[_lastPointIndex]){datasets[_lastDatasetIndex]._firePlotEvent(MOUSEOUT,_lastPointIndex,e)}else{chart.getFromEnv("toolTipController").hideAll()}delete mouseTracker._lastDatasetIndex;delete mouseTracker._lastPointIndex};_proto.getName=function getName(){return"base"};_proto.getType=function getType(){return"chartAPI"};_proto._mouseEvtHandler=function _mouseEvtHandler(e,data){_mouseEvtHandler2(this,e,data)};_proto.getComponents=function getComponents(parentComp,type){var comp=parentComp||this,datasets=[];comp.iterateComponents((function(component){if(component.getType()===type){datasets.push(component)}}));return datasets};_proto.getDatasets=function getDatasets(parentComp){var comp=parentComp||this,datasets=[];comp.iterateComponents((function(component){if(component.getType()==="dataset"){datasets.push(component)}}));return datasets};_proto.preConfigure=function preConfigure(dataObj){_ComponentInterface.prototype.preConfigure.call(this,dataObj);addEiMethods(this.getFromEnv("chartInstance"),this.eiMethods)};_proto.configureAttributes=function configureAttributes(dataObj){_ComponentInterface.prototype.configureAttributes.call(this,dataObj);this.createBaseComponent()};_proto.createBaseComponent=function createBaseComponent(){var iapi=this,animationManager;if(animationManager=iapi.getFromEnv("animationManager")){animationManager.configure()}else{animationManager=new _animationManager.default;iapi.addToEnv("animationManager",animationManager);animationManager.addToEnv("chart",iapi);animationManager.addToEnv("animationManager",animationManager);animationManager.configure();iapi.addExtEventListener("animationstart",(function(e){var duration=e.data.duration;duration&&iapi.fireChartInstanceEvent("animationinvoked",{duration:duration})}),animationManager)}};_proto.setChartMessage=function setChartMessage(message,chartObj,_container){var iapi=this,paper,Raphael,chartMessage,container=_container;(0,_lib.componentFactory)(this,_chartMessage.default,"chartMessage");chartMessage=iapi.getChildren("chartMessage")[0];if(container){iapi.addToEnv("chart-container",container)}else{container=iapi.getFromEnv("chart-container")}paper=iapi.getFromEnv("paper");if(!paper){Raphael=(0,_dependencyManager.getDep)("redraphael","plugin");paper=new Raphael(container,iapi.getFromEnv("chartWidth"),iapi.getFromEnv("chartHeight"));paper.setHTMLClassName("fusioncharts-div");iapi.addToEnv("paper",paper)}paper.setConfig("stroke-linecap",_lib.ROUND);!iapi.getChildContainer("messageGroup")&&iapi.addChildContainer("messageGroup",paper.group("messageGroup"));iapi.config.hasChartMessage=true;chartMessage.setData({message:message,chartObj:chartObj,visible:true},true)};_proto.drawChartMessage=function drawChartMessage(){var iapi=this;iapi.config.hasChartMessage=true;iapi._drawTexts()};_proto._dispose=function _dispose(){this._clearTimers&&this._clearTimers();var paper=this.getFromEnv("paper");paper&&paper.remove&&paper.remove();_ComponentInterface.prototype._dispose.call(this)};_proto.fireChartInstanceEvent=function fireChartInstanceEvent(name,data,originalEvent,defaultFn,cancelledFn){var chartInstance=this.getFromEnv("chartInstance");(0,_eventApi.triggerEvent)(name,chartInstance,data,originalEvent,defaultFn,cancelledFn)};_proto._hideChartMessage=function _hideChartMessage(){var iapi=this,chartMessage=iapi.getChildren("chartMessage");iapi.config.hasChartMessage=false;chartMessage&&chartMessage[0].setData({visible:false},true);iapi.getGraphicalElement("messageText")&&iapi.getGraphicalElement("messageText").hide();iapi.getGraphicalElement("messageVeil")&&iapi.getGraphicalElement("messageVeil").hide()};_proto._removeWaitingJobs=function _removeWaitingJobs(){this.iterateComponents((function(comp){return comp.removeAllJobs()}))};_proto._drawTexts=function _drawTexts(){var component=this,globalLabel=component.getFromEnv("core-options")[accessor1],chartLabel=component.getFromEnv("chartInstance").args[accessor1],hasLabel=(0,_lib.pluck)(chartLabel,globalLabel,DEFAULT_TXTLABEL);component._crCreate(hasLabel);if(hasLabel){component._scheduleLabelCheck(hasLabel)}};_proto._scheduleLabelCheck=function _scheduleLabelCheck(hasLabel){var component=this;component.addJob("checker",(function(){var labelContRNode=component.getContainer(accessor2);if(labelContRNode&&isDetached(labelContRNode)){component._crCreate(hasLabel)}component._scheduleLabelCheck(hasLabel)}),_schedular.priorityList.verification,{oneInAFrame:true,addToTop:false,executionDelay:300})};_proto._crCreate=function _crCreate(hasLabel){var iapi=this,paper=iapi.getFromEnv("paper"),chartHeight=+iapi.getFromEnv("chartHeight"),labelElemCheck=iapi.getGraphicalElement(accessor1),labelElem,labelGroup,parentGroup=iapi.getContainer("parentgroup"),attr,css,txts={href:_lib.TXT_HREF,text:_lib.TXT_STRING};if(hasLabel){if(iapi.getContainer(accessor2)){iapi.removeContainer(accessor2)}if(labelElemCheck){iapi.removeGraphicalElement(labelElemCheck)}labelGroup=iapi.addContainer(accessor2,paper.group(generateId(),true));parentGroup&&labelGroup.insertAfter(parentGroup);attr={text:txts.text,x:6,y:chartHeight-4,"vertical-align":_lib.POSITION_BOTTOM,"text-anchor":_lib.POSITION_START,fill:"rgba(0,0,0,0.5)",title:txts.title||_lib.BLANK};css={fontSize:9,fontFamily:"Verdana,sans",cursor:_lib.POINTER,_cursor:_lib.HAND};labelElem=paper.text(attr,css,labelGroup);iapi.addGraphicalElement(accessor1,labelElem);if(!iapi.config.observer){iapi.config.observer=new MutationObserver((function(){return iapi._crCreate(hasLabel)}))}else{iapi.config.observer.disconnect()}iapi.config.observer.observe(iapi.getContainer(accessor2).node,opts);labelElem.on("fc-click",(function(){try{open(txts.href)}catch(err){(top||window).location.href=txts.href}}))}else if(labelElem&&labelElem.remove){if(iapi.config.observer)iapi.config.observer.disconnect();iapi.removeGraphicalElement(accessor1)}};_proto._hideModal=function _hideModal(){this.getChildContainer("messageGroup").hide()};_proto.remove=function remove(config){var animationManager=this.getFromEnv("animationManager");if(this.config.observer)this.config.observer.disconnect();_ComponentInterface.prototype.remove.call(this,config);animationManager&&animationManager.remove(config)};return BaseChart}(_componentInterface.ComponentInterface);BaseChart.stringConstants={BACKGROUNDLOADED:"BackgroundLoaded",BACKGROUNDLOADERROR:"BackgroundLoadError",clipRectStr:"clip-rect"};var _default=BaseChart;exports.default=_default;