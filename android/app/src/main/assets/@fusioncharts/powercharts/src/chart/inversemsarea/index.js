"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _mscartesian=_interopRequireDefault(require("@fusioncharts/charts/src/chart/_internal/mscartesian"));var _area=_interopRequireDefault(require("@fusioncharts/charts/src/dataset/area"));var _areabase=require("@fusioncharts/charts/src/chart/_internal/areabase");var AREA="area";var InverseMSArea=function(_MSCartesian){(0,_inheritsLoose2.default)(InverseMSArea,_MSCartesian);function InverseMSArea(){return _MSCartesian.apply(this,arguments)||this}InverseMSArea.getName=function getName(){return"InverseMSArea"};var _proto=InverseMSArea.prototype;_proto.getName=function getName(){return"InverseMSArea"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSCartesian.prototype.__setDefaultConfig.call(this);var config=this.config;config.defaultDatasetType=AREA;config.isInverse=true;config.zeroplanethickness=2;config.zeroplanealpha=80;config.showzeroplaneontop=1;config.enablemousetracking=true;config.defaultcrosslinethickness=1;_areabase._setDefaultConfig.call(this)};_proto.getDSdef=function getDSdef(){return _area.default};_proto.getDSGroupdef=function getDSGroupdef(){};return InverseMSArea}(_mscartesian.default);var _default=InverseMSArea;exports.default=_default;