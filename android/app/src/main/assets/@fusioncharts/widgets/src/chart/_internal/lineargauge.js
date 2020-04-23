"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _gauge=_interopRequireDefault(require("./gauge"));var _gaugeAxis=_interopRequireDefault(require("../../factories/gauge-axis"));var _lib=require("@fusioncharts/core/src/lib");var LinearGauge=function(_Gauge){(0,_inheritsLoose2.default)(LinearGauge,_Gauge);function LinearGauge(){var _this;_this=_Gauge.call(this)||this;_this.registerFactory("axis",_gaugeAxis.default);return _this}LinearGauge.getName=function getName(){return"AxisGaugeBase"};var _proto=LinearGauge.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_Gauge.prototype.__setDefaultConfig.call(this)};_proto.allocatePosition=function allocatePosition(){var iapi=this,chartConfig=iapi.config,width=chartConfig.canvasWidth,height=chartConfig.canvasHeight;chartConfig.gaugeStartX=chartConfig.canvasLeft;chartConfig.gaugeEndX=chartConfig.canvasLeft+width;chartConfig.gaugeStartY=chartConfig.canvasTop;chartConfig.gaugeEndY=chartConfig.canvasTop+height;chartConfig.gaugeCenterX=chartConfig.canvasLeft+width/2;chartConfig.gaugeCenterY=chartConfig.canvasTop+height/2};_proto._spaceManager=function _spaceManager(){var spaceForActionBar,actionBarSpace,iapi=this,config=iapi.config,dataset=iapi.getChildren("dataset")[0],scale=iapi.getChildren("scale")[0],is3D=iapi.config.is3D,canvas=iapi.getChildren("canvas")[0],chartAttrs=iapi.getFromEnv("dataSource").chart,showBorder=(0,_lib.pluckNumber)(chartAttrs.showborder,is3D?0:1),isHorizontal=iapi.isHorizontal,minChartWidth=config.minChartWidth,minChartHeight=config.minChartHeight,chartBorderWidth=config.borderWidth=showBorder?(0,_lib.pluckNumber)(chartAttrs.borderthickness,1):0,chartBorderVertical,chartBorderHorizontal;if(config.canvasWidth-2*chartBorderWidth<minChartWidth){chartBorderVertical=(config.canvasWidth-minChartWidth)/2}if(config.canvasHeight-2*chartBorderWidth<minChartHeight){chartBorderHorizontal=(config.canvasHeight-minChartHeight)/2}iapi._allocateSpace({top:chartBorderHorizontal||chartBorderWidth,bottom:chartBorderHorizontal||chartBorderWidth,left:chartBorderVertical||chartBorderWidth,right:chartBorderVertical||chartBorderWidth});spaceForActionBar=config.availableHeight*.225;actionBarSpace=iapi._manageActionBarSpace&&iapi._manageActionBarSpace(spaceForActionBar)||{};iapi._allocateSpace(actionBarSpace);if(isHorizontal){iapi._allocateSpace(scale.placeAxis(config.availableHeight))}else{iapi._allocateSpace(scale.placeAxis(config.availableWidth))}iapi._manageChartMenuBar(config.availableHeight*.4);dataset._manageSpace&&iapi._allocateSpace(dataset._manageSpace(config.availableHeight));scale.setAxisConfig({drawPlotlines:iapi.drawPlotlines,drawPlotBands:iapi.drawPlotBands});canvas.setDimension({top:config.canvasTop,left:config.canvasLeft,width:config.canvasWidth,height:config.canvasHeight})};return LinearGauge}(_gauge.default);var _default=LinearGauge;exports.default=_default;