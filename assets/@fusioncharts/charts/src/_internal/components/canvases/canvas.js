"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _componentInterface=require("@fusioncharts/core/src/component-interface");var _lib=require("@fusioncharts/core/src/lib");var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _canvas=_interopRequireDefault(require("./canvas.animation"));var mathMax=Math.max,MAX_MITER_LINEJOIN=2,miterStr=_lib.preDefStr.miterStr,NONE=_lib.preDefStr.noneStr,ROUND=_lib.preDefStr.ROUND,clipSumValue="clip-sum-value",clipCanvasInitStr="clip-canvas-init",clipCanvasStr="clip-canvas",_createGroup=function createGroup(groupName,parentContainer,canvas){var animationManager=canvas.getFromEnv("animationManager");return animationManager.setAnimation({el:"group",attr:{name:groupName},container:parentContainer,component:canvas,label:"group"})};(0,_dependencyManager.addDep)({name:"canvasAnimation",type:"animationRule",extension:_canvas.default});var Canvas=function(_ComponentInterface){(0,_inheritsLoose2.default)(Canvas,_ComponentInterface);function Canvas(){var _this;_this=_ComponentInterface.call(this)||this;var canvas=(0,_assertThisInitialized2.default)(_this);canvas.config={};canvas.config.axes=canvas.config.axes||[];canvas.setLinkedItem("axes",[]);canvas.setLinkedItem("primaryAxis",{});canvas.addToEnv("canvasConfig",_this.config);return _this}var _proto=Canvas.prototype;_proto.getName=function getName(){return"canvas"};_proto.getType=function getType(){return"canvas"};_proto.createGroup=function createGroup(){var canvas=this,canvasConfig=canvas.config,chart=canvas.getFromEnv("chart"),chartChildContainer=chart.getChildContainer(),parentGroup=chart.getContainer("parentgroup"),canvasDimensions=canvas.getEffectiveDimensions(),chartAttr=canvas.getFromEnv("chart-attrib"),isAreaOverColumns=(0,_lib.pluckNumber)(chartAttr.areaovercolumns,1),floorContainer=canvas.getChildContainer("axisReferenceVisualsFloor"),bottomContainer=canvas.getChildContainer("axisReferenceVisualsBottom"),middleContainer=canvas.getChildContainer("axisReferenceVisualsMiddle"),topContainer=canvas.getChildContainer("axisReferenceVisualsTop"),ceilContainer=canvas.getChildContainer("axisReferenceVisualsCeil"),areaContainer=canvas.getChildContainer("areaGroup"),areaShadowContainer=canvas.getChildContainer("areaShadowGroup"),columnContainer=canvas.getChildContainer("columnGroup"),columnShadowContainer=canvas.getChildContainer("columnShadowGroup"),plotGroup=chartChildContainer.plotGroup,clipPath=[canvasDimensions.left,canvasDimensions.top,canvasDimensions.width,canvasDimensions.height].toString();!canvas.getContainer("canvasGroup")&&canvas.addContainer("canvasGroup",_createGroup("canvas",parentGroup,canvas)).insertAfter(chartChildContainer.backgroundGroup);if(!bottomContainer){bottomContainer=canvas.addChildContainer("axisReferenceVisualsBottom",_createGroup("axisReferenceVisualsBottom",parentGroup,canvas)).insertAfter(chartChildContainer.axisBottomGroup)}bottomContainer.attr({"clip-rect":canvasConfig.canvasBorderWidth>0?clipPath:null});if(!floorContainer){floorContainer=canvas.addChildContainer("axisReferenceVisualsFloor",_createGroup("axisReferenceVisualsFloor",parentGroup,canvas)).insertAfter(chartChildContainer.axisBottomGroup)}floorContainer.attr({"clip-rect":clipPath});!canvas.getChildContainer("crossline")&&canvas.addChildContainer("crossline",_createGroup("crossline",parentGroup,canvas)).insertBefore(chartChildContainer.plotGroup);!canvas.getChildContainer("crosslineBottom")&&canvas.addChildContainer("crosslineBottom",_createGroup("crosslineBottom",parentGroup,canvas)).insertBefore(chartChildContainer.plotGroup);!canvas.getChildContainer("crosslineTop")&&canvas.addChildContainer("crosslineTop",_createGroup("crosslineTop",parentGroup,canvas)).insertBefore(chartChildContainer.abovePlotGroup);!canvas.getChildContainer("datalabelsGroup")&&canvas.addChildContainer("datalabelsGroup",_createGroup("canvasdatalabel",chart.getChildContainer("datalabelsGroup"),canvas));if(!middleContainer){middleContainer=canvas.addChildContainer("axisReferenceVisualsMiddle",_createGroup("axisReferenceVisualsMiddle",parentGroup,canvas)).insertBefore(chartChildContainer.plotGroup)}middleContainer.attr({"clip-rect":clipPath});if(!topContainer){topContainer=canvas.addChildContainer("axisReferenceVisualsTop",_createGroup("axisReferenceVisualsTop",parentGroup,canvas)).insertBefore(chartChildContainer.datalabelsGroup)}!canvas.getChildContainer("quadrantGroup")&&canvas.addChildContainer("quadrantGroup",_createGroup("quadrant",parentGroup,canvas)).insertAfter(middleContainer);if(!ceilContainer){canvas.addChildContainer("axisReferenceVisualsCeil",_createGroup("axisReferenceVisualsCeil",parentGroup,canvas)).insertBefore(chartChildContainer.datalabelsGroup)}!canvas.getChildContainer("sumLabelsLayer")&&canvas.addChildContainer("sumLabelsLayer",chartChildContainer.sumLabelsLayer);if(!columnShadowContainer){columnShadowContainer=canvas.addChildContainer("columnShadowGroup",_createGroup("column-shadow-group",plotGroup,canvas))}if(!columnContainer){columnContainer=canvas.addChildContainer("columnGroup",_createGroup("column",plotGroup,canvas))}if(!areaShadowContainer){areaShadowContainer=canvas.addChildContainer("areaShadowGroup",_createGroup("area-shadow-group",plotGroup,canvas))}if(!areaContainer){areaContainer=canvas.addChildContainer("areaGroup",_createGroup("area",plotGroup,canvas))}if(!isAreaOverColumns){areaShadowContainer.insertBefore(columnShadowContainer);areaContainer.insertBefore(columnShadowContainer)}else{columnShadowContainer.insertBefore(areaShadowContainer);columnContainer.insertBefore(areaShadowContainer)}!canvas.getChildContainer("lineShadowGroup")&&canvas.addChildContainer("lineShadowGroup",_createGroup("line-shadow-group",plotGroup,canvas));!canvas.getChildContainer("lineGroup")&&canvas.addChildContainer("lineGroup",_createGroup("line",plotGroup,canvas));!canvas.getChildContainer("defaultShadowGroup")&&canvas.addChildContainer("defaultShadowGroup",_createGroup("default-shadow-group",plotGroup,canvas));!canvas.getChildContainer("defaultGroup")&&canvas.addChildContainer("defaultGroup",_createGroup("default",plotGroup,canvas))};_proto.isWithinCanvas=function isWithinCanvas(x,y){var canvas=this,conf=canvas.config,left=conf.canvasLeft,right=left+conf.canvasWidth,top=conf.canvasTop,bottom=top+conf.canvasHeight;return x>=left&&x<=right&&y>=top&&y<=bottom};_proto.setCanvasPadding=function setCanvasPadding(){var iapi=this,canvasConfig=iapi.config,dimensions;dimensions=iapi.getCanvasPadding();canvasConfig.canvasPaddingLeft=mathMax(canvasConfig.canvasPaddingLeft,dimensions.paddingLeft||0);canvasConfig.canvasPaddingRight=mathMax(canvasConfig.canvasPaddingRight,dimensions.paddingRight||0);canvasConfig.canvasPaddingTop=mathMax(canvasConfig.canvasPaddingTop,dimensions.paddingTop||0);canvasConfig.canvasPaddingBottom=mathMax(canvasConfig.canvasPaddingBottom,dimensions.paddingBottom||0)};_proto.getEffectiveDimensions=function getEffectiveDimensions(){var canvas=this,config=canvas.config,left=config.canvasLeft,top=config.canvasTop,width=config.canvasWidth,height=config.canvasHeight,paddingLeft=config.canvasPaddingLeft,paddingTop=config.canvasPaddingTop,paddingRight=config.canvasPaddingRight,paddingBottom=config.canvasPaddingBottom;return{left:left,top:top,width:width,height:height,paddingLeft:paddingLeft,paddingTop:paddingTop,paddingRight:paddingRight,paddingBottom:paddingBottom}};_proto.setDimension=function setDimension(dim){var canvas=this,config=canvas.config;config.canvasTop=dim.top;config.canvasLeft=dim.left;config.canvasWidth=dim.width;config.canvasHeight=dim.height};_proto.getCanvasPadding=function getCanvasPadding(){var iapi=this,dim,key,chartConfig=iapi.getFromEnv("chartConfig"),canvasWidth=chartConfig.canvasWidth,canvasConfig=iapi.config,paddingLeft,paddingRight,spaceLimit=canvasConfig.maxPaddingPercent*canvasWidth/100,returnDimension={paddingLeft:0,paddingRight:0,paddingTop:0,paddingBottom:0};iapi._mapChildren((function(child){dim=child.getCanvasPadding&&child.getCanvasPadding()||{};for(key in dim){if(dim.hasOwnProperty(key)){returnDimension[key]=mathMax(dim[key],returnDimension[key])}}}));paddingLeft=returnDimension.paddingLeft||0;paddingRight=returnDimension.paddingRight||0;if(spaceLimit<paddingLeft){returnDimension.paddingLeft=spaceLimit}if(spaceLimit<paddingRight){returnDimension.paddingRight=spaceLimit}return returnDimension};_proto.configureAttributes=function configureAttributes(overrideConfig){if(overrideConfig===void 0){overrideConfig={}}var canvas=this,chart=canvas.getLinkedParent(),chartConfig=canvas.getFromEnv("chartConfig"),canvasBorderThickness,canBGAlpha,showCanvasBorder,shadow,canvasConfig=canvas.config,chartAttrs=canvas.getFromEnv("chart-attrib"),colorM=canvas.getFromEnv("color-manager"),is3D=chartConfig.is3D,oriCanvasBorderThickness,palleteString=is3D?_lib.chartPaletteStr.chart3D:_lib.chartPaletteStr.chart2D,isRoundEdges=canvasConfig.isRoundEdges=(0,_lib.pluckNumber)(chartAttrs.useroundedges,0),showAxisLine=(0,_lib.pluckNumber)(chartAttrs.showxaxisline,chartAttrs.showyaxisline,chartAttrs.showaxislines,0),hideAxisLine=showAxisLine?0:1;canvasConfig.canvasBorderRadius=(0,_lib.pluckNumber)(chartAttrs.plotborderradius,isRoundEdges?2:0);showCanvasBorder=canvasConfig.showCanvasBorder=Boolean((0,_lib.pluckNumber)(chartAttrs.showcanvasborder,hideAxisLine,canvasBorderThickness,isRoundEdges?0:1));oriCanvasBorderThickness=canvasConfig.oriCanvasBorderThickness=mathMax((0,_lib.pluckNumber)(chartAttrs.canvasborderthickness,isRoundEdges?0:(0,_lib.pluckNumber)(chart.config.canvasborderthickness,2),0));canvasBorderThickness=canvasConfig.canvasBorderWidth=is3D?0:showCanvasBorder?oriCanvasBorderThickness:0;canvasConfig.canvasBorderColor=(0,_lib.convertColor)((0,_lib.pluck)(chartAttrs.canvasbordercolor,colorM.getColor(_lib.canvasBorderColorStr)),(0,_lib.pluck)(chartAttrs.canvasborderalpha,colorM.getColor("canvasBorderAlpha")));canBGAlpha=canvasConfig.canBGAlpha=(0,_lib.pluck)(chartAttrs.canvasbgalpha,colorM.getColor(_lib.canvasBGAlphaStr));canvasConfig.canBGColor={FCcolor:{color:(0,_lib.pluck)(chartAttrs.canvasbgcolor,colorM.getColor(palleteString.canvasBgColor)),alpha:(0,_lib.pluck)(chartAttrs.canvasbgalpha,100),angle:(0,_lib.pluck)(chartAttrs.canvasbgangle,0),ratio:(0,_lib.pluck)(chartAttrs.canvasbgratio)}};shadow=canvasConfig.shadow=(0,_lib.pluckNumber)(chartAttrs.showshadow,isRoundEdges,0)&&isRoundEdges?{enabled:true,opacity:canBGAlpha/100}:0;canvasConfig.shadowOnCanvasFill=shadow&&shadow.enabled;canvasConfig.canvasPadding=(0,_lib.pluckNumber)(chartAttrs.canvaspadding,0);canvasConfig.origCanvasTopPad=(0,_lib.pluckNumber)(chartAttrs.canvastoppadding,0);canvasConfig.origCanvasBottomPad=(0,_lib.pluckNumber)(chartAttrs.canvasbottompadding,0);canvasConfig.origCanvasLeftPad=(0,_lib.pluckNumber)(chartAttrs.canvasleftpadding,0);canvasConfig.origCanvasRightPad=(0,_lib.pluckNumber)(chartAttrs.canvasrightpadding,0);Object.assign(canvasConfig,overrideConfig);canvas.config.inputComponents=[];canvas.config.maxPaddingPercent=12.5;canvas._mapChildren((function(child){if(child.getState("removed")||child.getType&&child.getType()==="dataset"||child.getType()==="axisRefVisuals"){return}child.configure&&child.configure()}))};_proto.disposeAllInputs=function disposeAllInputs(){this.config.inputComponents.forEach((function(input){input.dispose()}));this.config.inputComponents.length=0};_proto.axisExists=function axisExists(axis){var axisArr=this.getLinkedItem("axes"),i,ii,status=false;for(i=0,ii=axisArr.length;i<ii;i++){if(axisArr[i].axis===axis){status=true;break}}return status};_proto.attachAxis=function attachAxis(axis,isY,config){var axisArr=this.getLinkedItem("axes"),axisType=isY?"yAxis":"xAxis",axes=this.getFromEnv(axisType)||[];if(!this.axisExists(axis)){axisArr.push({axis:axis,isY:isY,config:config||{}});axes.push(axis);this.addToEnv(axisType,axes)}return this};_proto.setPrimaryAxis=function setPrimaryAxis(type,axis){var primaryAxis=this.getLinkedItem("primaryAxis");primaryAxis[type]=this.getLinkedItem("axes").find((function(obj){return obj.axis===axis}))};_proto.getAxes=function getAxes(){var primaryAxis;if(Object.keys(primaryAxis=this.getLinkedItem("primaryAxis")).length){return[primaryAxis.xAxis,primaryAxis.yAxis]}return this.getLinkedItem("axes").slice(0)};_proto.detachAxis=function detachAxis(axis,_index){var axisArr=this.getLinkedItem("axes"),index=Infinity;if(_index){return axisArr.splice(_index,1)}axisArr.forEach((function(axisOb,i){if(axisOb.axis===axis){index=i}}));return axisArr.splice(index,1)};_proto.preDraw=function preDraw(){this._mapChildren((function(child){if(!child.getState("removed")){child.preDraw&&child.preDraw()}}))};_proto.draw=function draw(){this.createGroup();!this.getFromEnv("chart").config.skipCanvasDrawing&&this.drawCanvas()};_proto.drawCanvas=function drawCanvas(){var canvas=this,chart=canvas.getFromEnv("chart"),isBar=chart.isBar,chartAttrs=canvas.getFromEnv("chart-attrib"),animationManager=canvas.getFromEnv("animationManager"),chartConfig=chart.config,config=canvas.config,clip=config.clip={},clipCanvas,dsGroup=chart.getChildContainer("plotGroup"),dataLabelsLayer=chart.getChildContainer("datalabelsGroup"),canvasBorderElementCheck=canvas.getGraphicalElement("canvasBorderElement"),canvasBorderElement,canvasElementCheck=canvas.getGraphicalElement("canvasElement"),canvasElement,canvasLeft=config.canvasLeft||(config.canvasLeft=chartConfig.canvasLeft),canvasTop=config.canvasTop||(config.canvasTop=chartConfig.canvasTop),canvasWidth=config.canvasWidth||(config.canvasWidth=chartConfig.canvasWidth),canvasHeight=config.canvasHeight||(config.canvasHeight=chartConfig.canvasHeight),xDepth=config.xDepth=chartConfig.xDepth||0,yDepth=config.yDepth=chartConfig.yDepth||0,canvasGroup=canvas.getContainer("canvasGroup"),quadrantGroup=canvas.getChildContainer("quadrantGroup"),canvasBorderRadius=config.canvasBorderRadius,canvasBorderWidth=config.canvasBorderWidth,borderWHlf=canvasBorderWidth*.5,canvasBorderColor=config.canvasBorderColor,canBGColor=config.canBGColor,canBGAlpha=config.canBGAlpha,shadow=config.shadow,canvasBgColor,attr,showCanvasBg=config.showCanvasBG=Boolean((0,_lib.pluckNumber)(chartAttrs.showcanvasbg,1)),shadowOnCanvasFill=config.shadowOnCanvasFill,showCanvasBorder=config.showCanvasBorder,gutter,clipAniamtionFn;canvasBgColor=canBGColor;attr={x:canvasLeft-borderWHlf,y:canvasTop-borderWHlf,width:canvasWidth+canvasBorderWidth,height:canvasHeight+canvasBorderWidth,r:canvasBorderRadius,"stroke-width":canvasBorderWidth,stroke:canvasBorderColor,"stroke-linejoin":canvasBorderWidth>MAX_MITER_LINEJOIN?ROUND:miterStr};if(showCanvasBorder){canvasBorderElementCheck&&canvasBorderElementCheck.show();canvasBorderElement=animationManager.setAnimation({el:canvasBorderElementCheck||"rect",component:canvas,attr:{x:canvasLeft-borderWHlf,y:canvasTop-borderWHlf,width:canvasWidth+canvasBorderWidth,height:canvasHeight+canvasBorderWidth,r:canvasBorderRadius,"stroke-width":canvasBorderWidth,stroke:canvasBorderColor,"stroke-linejoin":canvasBorderWidth>MAX_MITER_LINEJOIN?ROUND:miterStr},label:"rect",container:canvasGroup}).shadow(shadow);if(!canvasBorderElementCheck){canvas.addGraphicalElement("canvasBorderElement",canvasBorderElement)}}else if(canvasBorderElementCheck){canvas.removeGraphicalElement(canvasBorderElementCheck);animationManager.setAnimation({el:canvasBorderElementCheck,component:canvas,callback:function callback(){canvasBorderElementCheck.hide()}})}gutter=showCanvasBorder?0:config.oriCanvasBorderThickness;clip[clipCanvasStr]=[mathMax(0,canvasLeft-xDepth-gutter),mathMax(0,canvasTop-yDepth-gutter),mathMax(1,canvasWidth+xDepth*2+2*gutter),mathMax(1,canvasHeight+yDepth+2*gutter)];clip[clipSumValue]=[mathMax(0,canvasLeft-xDepth),isBar?canvasTop:0,mathMax(1,isBar?chartConfig.width-canvasLeft:canvasWidth+xDepth*2),mathMax(1,isBar?canvasHeight+yDepth:canvasTop+canvasHeight)];clip[clipCanvasInitStr]=[mathMax(0,canvasLeft-xDepth),mathMax(0,canvasTop-yDepth),1,mathMax(1,canvasHeight+yDepth*2)];clipCanvas=clip[clipCanvasStr].slice(0);clipAniamtionFn=function clipAniamtionFn(el,clipping){animationManager.setAnimation({el:el,attr:{"clip-rect":clipping},label:"container",component:canvas,state:el.attrs["clip-rect"]?"updating":"appearing"})};if(!chartConfig.skipClipping){clipAniamtionFn(dsGroup,clipCanvas);clipAniamtionFn(dataLabelsLayer,clipCanvas);clipAniamtionFn(quadrantGroup,clipCanvas);clipAniamtionFn(canvas.getChildContainer("sumLabelsLayer"),clip[clipSumValue])}if(showCanvasBg){attr={x:canvasLeft,y:canvasTop,width:canvasWidth,height:canvasHeight,r:canvasBorderRadius,"stroke-width":0,stroke:NONE,fill:(0,_lib.toRaphaelColor)(canvasBgColor)};canvasElementCheck&&canvasElementCheck.show();canvasElement=animationManager.setAnimation({el:canvasElementCheck||"rect",attr:attr,label:"rect",container:canvasGroup,component:canvas});if(!canvasElementCheck){canvas.addGraphicalElement("canvasElement",canvasElement)}if(shadowOnCanvasFill){canvasElement.shadow({opacity:canBGAlpha/100})}else{canvasElement.shadow(false)}}else{canvasElementCheck&&animationManager.setAnimation({el:canvasElementCheck,component:canvas,callback:function callback(){canvasElementCheck.hide()}})}};return Canvas}(_componentInterface.ComponentInterface);var _default=Canvas;exports.default=_default;