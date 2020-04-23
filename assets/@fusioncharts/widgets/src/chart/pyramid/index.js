"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _funnelpyramidbase=_interopRequireDefault(require("../_internal/funnelpyramidbase"));var _pyramid=_interopRequireDefault(require("../../dataset/pyramid"));var DS_TYPE="pyramid",FRIENDLY_NAME="Funnel Chart";var Pyramid=function(_FunnelPyramidBase){(0,_inheritsLoose2.default)(Pyramid,_FunnelPyramidBase);Pyramid.getName=function getName(){return"Pyramid"};function Pyramid(){var _this;_this=_FunnelPyramidBase.call(this)||this;_this.useSortedData=false;return _this}var _proto=Pyramid.prototype;_proto.getName=function getName(){return"Pyramid"};_proto.__setDefaultConfig=function __setDefaultConfig(){_FunnelPyramidBase.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=FRIENDLY_NAME;config.defaultDatasetType=DS_TYPE};_proto.configureAttributes=function configureAttributes(){_FunnelPyramidBase.prototype.configureAttributes.call(this);this.config.PLOT_COLOR_INDEX_START=0;this.alignLegendWithCanvas=0};_proto.getDSdef=function getDSdef(){return _pyramid.default};return Pyramid}(_funnelpyramidbase.default);var _default=Pyramid;exports.default=_default;