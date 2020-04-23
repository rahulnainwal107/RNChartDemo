"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _inputBase=_interopRequireDefault(require("./input-base"));var _lib=require("@fusioncharts/core/src/lib");var _schedular=require("@fusioncharts/core/src/schedular");var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var STATE_PRESSED="pressed",STATE_ACTIVATED="activated";var math=Math,mathMin=math.min,mathMax=math.max,mathAbs=math.abs,UNDEF,TRACKER_FILL="rgba(255,0,0,"+(_lib.isIE?.002:1e-6)+")";var InputDragPin=function(_Base){(0,_inheritsLoose2.default)(InputDragPin,_Base);function InputDragPin(){var _this;_this=_Base.call(this)||this;var input=(0,_assertThisInitialized2.default)(_this);input.controlArr=[{nativeInteraction:["fc-dragstart"],callback:input.dragstart.bind(input),component:input},{nativeInteraction:["fc-dragmove"],callback:input.dragmove.bind(input),component:input},{nativeInteraction:["fc-dragend"],callback:input.dragend.bind(input),component:input}];input.toggle=input.toggle.bind(input);return _this}var _proto=InputDragPin.prototype;_proto.getName=function getName(){return"dragPin"};_proto.configure=function configure(){_Base.prototype.configure.call(this);var input=this,chartConfig=input.getFromEnv("chartConfig"),chartAttrs=input.getFromEnv("dataSource").chart,config=input.config;config.attr=config.attr||{stroke:"#3399ff",fill:"#b9d5f1","stroke-width":0};config.pinAttr=config.pinAttr||{"stroke-width":0,stroke:"none",fill:"#b9d5f1","shape-rendering":"crisp"};config.borderWidth=chartConfig.borderWidth||(chartConfig.borderWidth=(0,_lib.pluckNumber)(chartAttrs.showborder,1)?(0,_lib.pluckNumber)(chartAttrs.borderthickness,1):0);!input.config.skipGraphics&&input.setLinkedItem("button",input.createButton({icon:"pinModeIcon",tooltext:(0,_lib.pluckNumber)(chartAttrs.showtoolbarbuttontooltext,1)?(0,_lib.pluck)(input.config.tooltext,"Pin mode"):"",handlers:{click:input.toggle},state:STATE_ACTIVATED}));input.getLinkedParent().registerDependancy([{derivedInteraction:["zoomin","zoomout"],callback:input.dependancyFn,component:input}]);input.disable(UNDEF,false)};_proto.enable=function enable(event,dontFireExtEvt){var input=this,config=input.config;if(config.enabled!==true){config.enabled=true;config.state=STATE_PRESSED;input.fireEvent("pinenabled");input.setControl();!dontFireExtEvt&&input.getFromEnv("chart").fireChartInstanceEvent("zoommodechanged",{pinModeActive:true},event&&event.originalEvent)}};_proto.dependancyFn=function dependancyFn(eventOb){if(eventOb.type==="zoomin"||eventOb.type==="zoomout"){this.disable(eventOb)}};_proto.draw=function draw(){var input=this,config=input.config,xAxis;input.createPin();if(input.config.pinElemVisible){input.addJob("resizePinElem",(function(){xAxis=input.getFromEnv("xAxis")[0];input.pinRangePixels(xAxis.getPixel(config.boxStartValue),xAxis.getPixel(config.boxEndValue))}),_schedular.priorityList.postRender)}};_proto._setConfig=function _setConfig(){var input=this,chart=input.getFromEnv("chart"),chartConfig=input.getFromEnv("chartConfig"),config=input.config,attr=Object.assign({},config.attr||{}),strokeWidth=attr["stroke-width"]=(0,_lib.pluckNumber)(attr.strokeWidth,attr["stroke-width"],1),chartPosition=(0,_lib.getPosition)(chart.getFromEnv("chart-container"),chart);config.zoomX=config.orientation==="horizontal"||config.orientation==="both";config.zoomY=config.orientation==="vertical"||config.orientation==="both";config.canvasY=chartConfig.canvasTop;config.canvasX=chartConfig.canvasLeft;config.canvasW=chartConfig.canvasWidth;config.canvasH=chartConfig.canvasHeight;config.canvasX2=chartConfig.canvasLeft+chartConfig.canvasWidth;config.canvasY2=chartConfig.canvasTop+chartConfig.canvasHeight;config.strokeWidth=strokeWidth;config.chartPosLeft=chartPosition.left;config.chartPosTop=chartPosition.top};_proto.disable=function disable(event,dontFireExtEvt){var input=this,config=input.config,pingroup=input.getContainer("pingroup"),pintracker=input.getGraphicalElement("pintracker");if(config.enabled!==false){config.enabled=false;config.state=STATE_ACTIVATED;pingroup&&pingroup.hide();pintracker&&pintracker.hide();input.fireEvent("pindisabled");!dontFireExtEvt&&input.getFromEnv("chart").fireChartInstanceEvent("zoommodechanged",{pinModeActive:false},event&&event.originalEvent);input.setControl();config.pinElemVisible=false}};_proto.setControl=function setControl(){var input=this,manager=input.getLinkedParent(),controlArr=input.controlArr,button=input.getLinkedItem("button");manager.releaseControl(controlArr);if(input.isEnabled()){manager.getControl(controlArr)}button&&button.setCurrentState(input.config.state)};_proto.createPin=function createPin(){var input=this,chart=input.getFromEnv("chart"),chartConfig=input.getFromEnv("chartConfig"),animationManager=input.getFromEnv("animationManager"),canvasTop=chartConfig.canvasTop,canvasBottom=chartConfig.canvasBottom,canvasHeight=chartConfig.canvasHeight,canvasLeft=chartConfig.canvasLeft,borderWidth=input.config.borderWidth,pinclip=chartConfig["clip-pinrect"],pingroup=input.getContainer("pingroup"),pinElemGroup=input.getContainer("pinElemGroup"),pinrect=input.getGraphicalElement("pinrect"),pintracker=input.getGraphicalElement("pintracker"),tAtt,localPinrect,localPintracker,visw,visx;visw=chartConfig._visw=chartConfig.canvasWidth;visx=chartConfig._visx=chartConfig.canvasLeft;tAtt=(0,_dependencyManager.getDep)("redraphael","plugin").crispBound(0,canvasTop-canvasBottom,0,canvasHeight,borderWidth);pinclip=chartConfig["clip-pinrect"]=[tAtt.x,canvasTop,tAtt.width,tAtt.height];if(!pingroup){input.addContainer("pingroup",pingroup=animationManager.setAnimation({el:"group",finalAttr:{name:"zoompin"},component:input,label:"group"}).insertBefore(chart.getChildContainer("plotGroup")).hide())}pingroup.transform(chartConfig._pingrouptransform=["T",visx,canvasBottom]);if(!pinElemGroup){input.addContainer("pinElemGroup",pinElemGroup=animationManager.setAnimation({el:"group",attr:{name:"zoompinelements"},component:input,container:pingroup,label:"group"}))}input.config.pinAttr.x=0;input.config.pinAttr.y=canvasTop-canvasBottom;input.config.pinAttr.width=visw;input.config.pinAttr.height=canvasHeight;localPinrect=animationManager.setAnimation({el:pinrect||"rect",attr:input.config.pinAttr,container:pingroup,component:input});if(!pinrect){input.addGraphicalElement("pinrect",localPinrect)}localPintracker=animationManager.setAnimation({el:pintracker||"rect",attr:{transform:pingroup.transform(),x:0,y:canvasTop-canvasBottom,width:0,height:canvasHeight,stroke:"none",fill:TRACKER_FILL,cursor:_lib.hasSVG&&"ew-resize"||"e-resize"},container:chart.getChildContainer("trackerGroup"),component:input}).hide();if(!pintracker){input.addGraphicalElement("pintracker",localPintracker)}localPintracker.undrag();localPintracker.drag((function(event){var _dx=event.data[0],offset=visx+_dx+this.__pindragdelta,pbl=this.__pinboundleft,pbr=this.__pinboundright,clip=this.data("cliprect").slice(0);if(offset<pbl){offset=pbl}else if(offset>pbr){offset=pbr}pingroup.transform(["T",offset,canvasBottom]);localPintracker.transform(pingroup.transform());if(!_lib.hasSVG){clip[0]=clip[0]+offset-visx-this.__pindragdelta;animationManager.setAnimation({el:pingroup,attr:{"clip-rect":clip},component:input})}this.__pindragoffset=_dx}),(function(){this.__pinboundleft=0-pinclip[0]+visx+canvasLeft;this.__pinboundright=this.__pinboundleft+visw-pinclip[2];this.data("cliprect",pingroup.attr("clip-rect"));pingroup._.clipispath=true}),(function(){pingroup._.clipispath=false;this.__pindragdelta+=this.__pindragoffset;delete this.__pindragoffset;delete this.__pinboundleft;delete this.__pinboundright}))};_proto.pinRangePixels=function pinRangePixels(pxs,pxe,event){var input=this,chart=input.getFromEnv("chart"),chartConfig=chart.config,canvasLeft=chartConfig.canvasLeft,xAxis=input.getFromEnv("xAxis")[0],axisLimits=xAxis.getLimit(),maxIndex=axisLimits.max,minIndex=axisLimits.min,pingroup=input.getContainer("pingroup"),pinclip=chartConfig["clip-pinrect"],animationManager=input.getFromEnv("animationManager"),pingrouptransform=chartConfig._pingrouptransform,plots=[],pxw=pxe-pxs,plot,startIndex,endIndex,startLabel,endLabel,i,pintracker=input.getGraphicalElement("pintracker");chart.iterateComponents((function(child){if(child.getType&&child.getType()==="dataset"){plots.push(child)}}));if(!pingroup||!input.getGraphicalElement("pinrect")){return}if(pxs===pxe){pingroup.hide();pintracker.hide()}i=plots.length;while(i--){plot=plots[i];plot.fireEvent("createpinelements",{group:input.getContainer("pinElemGroup")})}pinclip[0]=pxs+canvasLeft;pinclip[2]=pxw;animationManager.setAnimation({el:pingroup,attr:{"clip-rect":pinclip,transform:pingrouptransform},component:input}).show();pintracker.__pindragdelta=0;pintracker.show();animationManager.setAnimation({el:pintracker,attr:{transform:pingrouptransform,x:pxs,width:pxw},component:input});input.config.pinElemVisible=true;startIndex=Math.round(xAxis.getValue(pxs+canvasLeft,{wrtVisible:true}));endIndex=Math.round(xAxis.getValue(pxe+canvasLeft,{wrtVisible:true}));startIndex=startIndex<minIndex?minIndex:startIndex;endIndex=endIndex>maxIndex?maxIndex:endIndex;startLabel=xAxis.getLabel(startIndex).label;endLabel=xAxis.getLabel(endIndex).label;event&&chart.fireChartInstanceEvent("pinned",{startIndex:startIndex||Math.abs(startIndex),endIndex:endIndex||Math.abs(endIndex),startLabel:startLabel,endLabel:endLabel},event.originalEvent)};_proto.dragstart=function dragstart(event){this._setConfig();var input=this,animationManager=input.getFromEnv("animationManager"),container=input.getFromEnv("chart-container"),config=input.config,chartPosition,attr=config.attr,resizeBox,resizeBoxCheck=input.getGraphicalElement("resizeBox"),originalEvent=event.originalEvent,layerX=config.layerX=(originalEvent.pageX||originalEvent.data[0])-config.chartPosLeft,layerY=config.layerY=(originalEvent.pageY||originalEvent.data[1])-config.chartPosTop,canvasY=config.canvasY,canvasX=config.canvasX,canvasX2=config.canvasX2,canvasY2=config.canvasY2;chartPosition=(0,_lib.getPosition)(container);config.chartPosLeft=chartPosition.left;config.chartPosTop=chartPosition.top;config.oy=layerY;config.ox=layerX;config.allowMove=false;attr.x=0;attr.y=0;attr.width=0;attr.height=0;resizeBox=animationManager.setAnimation({el:resizeBoxCheck||"rect",attr:attr,container:input.getFromEnv("chart").getChildContainer("trackerGroup"),component:input,callback:function callback(){this.show()}});if(!resizeBoxCheck){input.addGraphicalElement("resizeBox",resizeBox)}if(layerX>canvasX&&layerX<canvasX2&&layerY>canvasY&&layerY<canvasY2){config.allowMove=true}config.dragstartFn&&typeof config.dragstartFn==="function"&&config.dragstartFn(event)};_proto.dragmove=function dragmove(event){this._setConfig();var input=this,config=input.config,animationManager=input.getFromEnv("animationManager"),originalEvent=event.originalEvent,pageX=originalEvent.pageX||originalEvent.data[2],pageY=originalEvent.page||originalEvent.data[3],layerX=config.layerX=pageX-config.chartPosLeft,layerY=config.layerY=pageY-config.chartPosTop,dx=layerX-config.ox,dy=layerY-config.oy,x=config.ox,y=config.oy,zoomX=config.zoomX,zoomY=config.zoomY,strokeWidth=config.strokeWidth,canvasW=config.canvasW,canvasH=config.canvasH,canvasY=config.canvasY,canvasX=config.canvasX,canvasX2=config.canvasX2,canvasY2=config.canvasY2;animationManager.setAnimationState("dragMove");if(!config.allowMove){return}if(!config.isDragged){config.isDragged=1}dx=-(x-mathMin(x-(x-mathMax(x+dx,canvasX)),canvasX2));dy=-(y-mathMin(y-(y-mathMax(y+dy,canvasY)),canvasY2));animationManager.setAnimation({el:input.getGraphicalElement("resizeBox"),attr:{x:(zoomX?mathMin(x,x+dx):canvasX)+strokeWidth*.5,y:(zoomY?mathMin(y,y+dy):canvasY)+strokeWidth*.5,width:zoomX?mathAbs(dx):canvasW,height:zoomY?mathAbs(dy):canvasH},component:input});config.dragmoveFn&&typeof config.dragmoveFn==="function"&&config.dragmoveFn(event)};_proto.dragend=function dragend(event){this._setConfig();var input=this,chart=input.getFromEnv("chart"),config=input.config,xAxis=input.getFromEnv("xAxis")[0],resizeBox=input.getGraphicalElement("resizeBox"),bBox=config.bBox,pxs,pxe;chart.getFromEnv("animationManager").setAnimationState("dragEnd");bBox=resizeBox.getBBox();if(config.isDragged){config.dragendFn&&typeof config.dragendFn==="function"&&config.dragendFn(event,{chart:chart,selectionLeft:bBox.x,selectionTop:bBox.y,selectionHeight:bBox.height,selectionWidth:bBox.width,originalEvent:event.originalEvent});config.isDragged=0}resizeBox.hide();delete config.oy;delete config.ox;pxs=bBox.x-chart.config.canvasLeft;pxe=pxs+bBox.width;if(pxs===pxe){return}config.boxStartValue=xAxis.getValue(pxs);config.boxEndValue=xAxis.getValue(pxe);input.pinRangePixels(pxs,pxe,event)};return InputDragPin}(_inputBase.default);var _default=InputDragPin;exports.default=_default;