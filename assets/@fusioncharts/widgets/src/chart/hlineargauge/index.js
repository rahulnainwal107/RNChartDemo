"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _lib=require("@fusioncharts/core/src/lib");var _colorGradient=_interopRequireDefault(require("@fusioncharts/core/src/color-utils/color-gradient"));var _lineargauge=_interopRequireDefault(require("../_internal/lineargauge"));var _hlineargauge=_interopRequireDefault(require("../../dataset/hlineargauge"));var _angularHlinearCommon=require("../_internal/angular-hlinear-common");var BLANKSTRING=_lib.BLANK,FRIENDLY_NAME="Horizontal Linear Gauge",DS_TYPE="hlineargauge",BOTTOM="bottom",TOP="top";var Hlineargauge=function(_LinearGauge){(0,_inheritsLoose2.default)(Hlineargauge,_LinearGauge);Hlineargauge.getName=function getName(){return"Hlineargauge"};function Hlineargauge(){var _this;_this=_LinearGauge.call(this)||this;_this.showRTvalue=false;_this.canvasPadding=false;_this.isHorizontal=true;_this.config.isAxisOpposite=false;_this.config.scalePosition=BOTTOM;_this.config.canBeScalePosition=TOP;_this.drawPlotlines=false;_this.drawPlotBands=false;_this.isAxisReverse=false;_this.minorTMNumber=4;_this.isRealTime=true;_this.colorRange=true;_this.rtParserModify=true;_this.registerFactory("dataset",(function(parent){var dataObj=parent.getFromEnv("dataSource"),pointers=dataObj.pointers;(0,_lib.datasetFactory)(parent,_hlineargauge.default,"dataset",1,[pointers])}),["vCanvas"]);return _this}var _proto=Hlineargauge.prototype;_proto.getName=function getName(){return"Hlineargauge"};_proto.__setDefaultConfig=function __setDefaultConfig(){_LinearGauge.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=FRIENDLY_NAME;config.hasLegend=false;config.defaultDatasetType=DS_TYPE;config.skipCanvasDrawing=true};_proto.configure=function configure(dataObj){_LinearGauge.prototype.configure.call(this,dataObj);var iapi=this,jsonData=iapi.getFromEnv("dataSource"),colorrange=jsonData.colorrange;if(colorrange&&colorrange.color&&colorrange.color.length){(0,_lib.componentFactory)(iapi,_colorGradient.default,"colorRange",1,[{colorRange:colorrange,numberFormatter:iapi.getFromEnv("number-formatter")}]);iapi.addToEnv("colorRange",iapi.getChildren("colorRange")[0])}else{iapi.deleteFromEnv("colorRange")}};_proto._configueTrendPoints=function _configueTrendPoints(){var iapi=this,jsonData=iapi.getFromEnv("dataSource"),config=iapi.config,style=config.style,trendArray=jsonData.trendpoints&&jsonData.trendpoints.point,trendPointObj,i,scale=iapi.getFromEnv("scale"),scaleConfig=scale.config,axisRange=scaleConfig.axisRange,max=axisRange.max,min=axisRange.min,scaleFactor=scaleConfig.scaleFactor||1,colorM=iapi.getFromEnv("color-manager"),startValue,endValue,isTrendZone,trendPointConfig=config.trendPointConfig=[],chartAttrs=jsonData.chart,length=trendArray.length;style.trendStyle={fontFamily:style.outCanfontFamily,color:style.outCancolor,fontSize:style.outCanfontSize};for(i=0;i<length;i++){trendPointObj=trendArray[i];startValue=(0,_lib.pluckNumber)(trendPointObj.startvalue,trendPointObj.value);endValue=(0,_lib.pluckNumber)(trendPointObj.endvalue,startValue);isTrendZone=startValue!==endValue;if(startValue<=max&&startValue>=min&&endValue<=max&&endValue>=min){trendPointConfig.push({startValue:startValue,endValue:endValue,tooltext:(0,_lib.getValidValue)((0,_lib.parseUnsafeString)(trendPointObj.markertooltext,false)),displayValue:(0,_lib.getValidValue)((0,_lib.parseUnsafeString)(trendPointObj.displayvalue),isTrendZone?BLANKSTRING:iapi.getFromEnv("number-formatter").scale(startValue)),showOnTop:(0,_lib.pluckNumber)(trendPointObj.showontop,chartAttrs.ticksbelowgauge,1),color:(0,_lib.pluck)(trendPointObj.color,colorM.getColor("trendLightColor")),textColor:trendPointObj.color,alpha:(0,_lib.pluckNumber)(trendPointObj.alpha,99),thickness:(0,_lib.pluckNumber)(trendPointObj.thickness,1),dashStyle:Number(trendPointObj.dashed)?(0,_lib.getDashStyle)(trendPointObj.dashlen||2,trendPointObj.dashgap||2):_lib.BLANK,useMarker:(0,_lib.pluckNumber)(trendPointObj.usemarker,0),markerColor:(0,_lib.convertColor)((0,_lib.pluck)(trendPointObj.markercolor,trendPointObj.color,colorM.getColor("trendLightColor")),100),markerBorderColor:(0,_lib.convertColor)((0,_lib.pluck)(trendPointObj.markerbordercolor,trendPointObj.bordercolor,colorM.getColor("trendDarkColor")),100),markerRadius:(0,_lib.pluckNumber)((0,_lib.pluckNumber)(trendPointObj.markerradius)*scaleFactor,5),markerToolText:(0,_lib.getFirstValue)(trendPointObj.markertooltext),trendValueDistance:(0,_lib.pluckNumber)((0,_lib.pluckNumber)(trendPointObj.trendvaluedistance)*scaleFactor,axisRange.tickInterval),isTrendZone:isTrendZone})}}_lib.stableSort&&(0,_lib.stableSort)(config.trendPointConfig,(function(a,b){return a.startValue-b.startValue}))};_proto._getData=function _getData(index,callback){return _angularHlinearCommon._getData.call(this,index,callback)};_proto._setData=function _setData(dialIndex,value){_angularHlinearCommon._setData.call(this,dialIndex,value)};_proto._getDataForId=function _getDataForId(id,callback){return _angularHlinearCommon._getDataForId.call(this,id,callback)};_proto._setDataForId=function _setDataForId(id,value){_angularHlinearCommon._setDataForId.call(this,id,value)};return Hlineargauge}(_lineargauge.default);var _default=Hlineargauge;exports.default=_default;