"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _canvas=_interopRequireDefault(require("@fusioncharts/charts/src/_internal/components/canvases/canvas"));var _polarUtil=require("@fusioncharts/utils/src/scale-utils/polar-util");var _lib=require("@fusioncharts/core/src/lib");var PolarCanvas=function(_Canvas){(0,_inheritsLoose2.default)(PolarCanvas,_Canvas);function PolarCanvas(){return _Canvas.apply(this,arguments)||this}var _proto=PolarCanvas.prototype;_proto.getName=function getName(){return"polarCanvas"};_proto.getType=function getType(){return"canvas"};_proto.configureAttributes=function configureAttributes(){_Canvas.prototype.configureAttributes.call(this);var canvas=this,canvasConfig=canvas.config,chart=canvas.getFromEnv("chart"),JSONData=chart.getFromEnv("dataSource"),FCChartObj=JSONData.chart,colorM=chart.getFromEnv("color-manager");canvasConfig.radarBorderColor=(0,_lib.convertColor)((0,_lib.pluck)(FCChartObj.radarbordercolor,colorM.getColor("divLineColor")),(0,_lib.pluckNumber)(FCChartObj.radarborderalpha,100));canvasConfig.radarFillColor=(0,_lib.convertColor)((0,_lib.pluck)(FCChartObj.radarfillcolor,colorM.getColor("altHGridColor")),(0,_lib.pluckNumber)(FCChartObj.radarfillalpha,colorM.getColor("altHGridAlpha")));canvasConfig.radarBorderThickness=(0,_lib.pluckNumber)(FCChartObj.radarborderthickness,2);canvasConfig.showRadarBorder=(0,_lib.pluckNumber)(FCChartObj.showradarborder,1)};_proto.draw=function draw(){this.createGroup();this.drawCanvas()};_proto.drawCanvas=function drawCanvas(){var canvas=this,canvasConfig=this.config,chart=canvas.getFromEnv("chart"),chartConfig=chart.config,axis=chart.getChildren("xAxis")[0],animationManager=chart.getFromEnv("animationManager"),radarBorderContainerDummy=canvas.getContainer("radarBorderContainer"),radarBorderContainer,canvasGroup=canvas.getContainer("canvasGroup"),axisConfig=axis.config,radarBorderAttrObj={stroke:canvasConfig.radarBorderColor,fill:canvasConfig.radarFillColor,"stroke-width":canvasConfig.radarBorderThickness,path:[]},i,category=axisConfig.tickValues.tickValue,min,max,theta,axisScale=axis.getScale(),radiusXY,radius,radBorderDummy=canvas.getGraphicalElement("radarBorder"),radarBorder,centerX=axisConfig.axisDimention.centerX,centerY=axisConfig.axisDimention.centerY;radius=(0,_lib.pluckNumber)(axisConfig.radius,0);min=0;max=category?category.length-1:0;canvasConfig.canvasLeft=canvasConfig.canvasLeft||chartConfig.canvasLeft;canvasConfig.canvasTop=canvasConfig.canvasTop||chartConfig.canvasTop;canvasConfig.canvasWidth=canvasConfig.canvasWidth||chartConfig.canvasWidth;canvasConfig.canvasHeight=canvasConfig.canvasHeight||chartConfig.canvasHeight;if(canvasConfig.showRadarBorder!==0){radarBorderAttrObj.path.push("M");for(i=min;i<=max;i++){theta=axisScale.getRangeValue(i);radiusXY=(0,_polarUtil.polarToCartesian)(radius,theta);radiusXY.x+=centerX;radiusXY.y+=centerY;radarBorderAttrObj.path.push(radiusXY.x,radiusXY.y,"L")}radarBorderAttrObj.path.pop();radarBorderAttrObj.path.push("Z")}radarBorderContainer=animationManager.setAnimation({el:radarBorderContainerDummy||"group",attr:{name:"radarBorderContainer"},container:canvasGroup,component:canvas,label:"group"});if(!radarBorderContainerDummy){canvas.addContainer("radarBorderContainer",radarBorderContainer)}radarBorder=animationManager.setAnimation({el:radBorderDummy||"path",attr:radarBorderAttrObj,container:radarBorderContainer,component:axis,label:"path"});if(!radBorderDummy){canvas.addGraphicalElement("radarBorder",radarBorder)}};return PolarCanvas}(_canvas.default);var _default=PolarCanvas;exports.default=_default;