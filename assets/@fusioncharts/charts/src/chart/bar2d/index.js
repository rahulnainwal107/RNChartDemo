"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _ssbarcartesian=_interopRequireDefault(require("../_internal/ssbarcartesian"));var _bar2d=_interopRequireDefault(require("../../dataset/bar2d"));var BAR_CHART="Bar Chart",BAR2D_STR="bar2d";var Bar2D=function(_SSBarCartesian){(0,_inheritsLoose2.default)(Bar2D,_SSBarCartesian);function Bar2D(){var _this;_this=_SSBarCartesian.call(this)||this;_this.isBar=true;return _this}Bar2D.getName=function getName(){return"Bar2D"};var _proto=Bar2D.prototype;_proto.getType=function getType(){return"chartAPI"};_proto.getName=function getName(){return"Bar2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_SSBarCartesian.prototype.__setDefaultConfig.call(this);this.config.friendlyName=BAR_CHART;this.config.singleseries=true;this.config.defaultDatasetType=BAR2D_STR;this.config.enablemousetracking=true};_proto.getDSdef=function getDSdef(){return _bar2d.default};_proto.getDSGroupdef=function getDSGroupdef(){};return Bar2D}(_ssbarcartesian.default);var _default=Bar2D;exports.default=_default;