"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _msbarcartesian=_interopRequireDefault(require("../_internal/msbarcartesian"));var _overlappedbar2d=_interopRequireDefault(require("../../dataset/overlappedbar2d"));var _multiseriesDataset=_interopRequireDefault(require("../../factories/multiseries-dataset"));var _columnOverlapped=_interopRequireDefault(require("../../dataset/groups/column-overlapped"));var CHART_STR="Multi-series Bar Chart",BAR2D_STR="bar2d";var OverlappedBar2D=function(_MSBarCartesian){(0,_inheritsLoose2.default)(OverlappedBar2D,_MSBarCartesian);function OverlappedBar2D(){var _this;_this=_MSBarCartesian.call(this)||this;_this.isBar=true;_this.registerFactory("dataset",_multiseriesDataset.default,["vCanvas"]);return _this}var _proto=OverlappedBar2D.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_MSBarCartesian.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.hasLegend=true;config.defaultDatasetType=BAR2D_STR};_proto.getName=function getName(){return"OverlappedBar2D"};OverlappedBar2D.getName=function getName(){return"OverlappedBar2D"};_proto.getDSdef=function getDSdef(){return _overlappedbar2d.default};_proto.getDSGroupdef=function getDSGroupdef(){return _columnOverlapped.default};return OverlappedBar2D}(_msbarcartesian.default);var _default=OverlappedBar2D;exports.default=_default;