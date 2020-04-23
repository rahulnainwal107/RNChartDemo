"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _vled=_interopRequireDefault(require("../vled"));var SERIES_TYPE="led",FRIENDLY_NAME="Vertical LED Gauge",BOTTOM="bottom",TOP="top";var Hled=function(_Vled){(0,_inheritsLoose2.default)(Hled,_Vled);Hled.getName=function getName(){return"Hled"};function Hled(){var _this;_this=_Vled.call(this)||this;_this.defaultSeriesType=SERIES_TYPE;_this.defaultPlotShadow=1;_this.realtimeEnabled=true;_this.chartleftmargin=15;_this.chartrightmargin=15;_this.charttopmargin=10;_this.chartbottommargin=10;_this.showTooltip=0;_this.connectTickMarks=0;_this.isHorizontal=true;_this.config.isAxisOpposite=false;_this.config.scalePosition=BOTTOM;_this.config.canBeScalePosition=TOP;return _this}var _proto=Hled.prototype;_proto._feedAxesRawData=function _feedAxesRawData(){var scaleConf=_Vled.prototype._feedAxesRawData.call(this);scaleConf[0].isReverse=false;return scaleConf};_proto.__setDefaultConfig=function __setDefaultConfig(){_Vled.prototype.__setDefaultConfig.call(this);this.config.friendlyName=FRIENDLY_NAME};_proto.getName=function getName(){return"Hled"};return Hled}(_vled.default);var _default=Hled;exports.default=_default;