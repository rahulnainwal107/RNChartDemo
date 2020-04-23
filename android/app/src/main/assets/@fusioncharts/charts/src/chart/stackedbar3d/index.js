"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _msbar3d=_interopRequireDefault(require("../msbar3d"));var _cartesianStack=_interopRequireDefault(require("../../dataset/groups/cartesian-stack"));var _bar3d=_interopRequireDefault(require("../../dataset/bar3d"));var CHART_STR="3D Stacked Bar Chart";var StackedBar3D=function(_MSBar3D){(0,_inheritsLoose2.default)(StackedBar3D,_MSBar3D);function StackedBar3D(){return _MSBar3D.apply(this,arguments)||this}StackedBar3D.getName=function getName(){return"StackedBar3D"};var _proto=StackedBar3D.prototype;_proto.getName=function getName(){return"StackedBar3D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_MSBar3D.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.enablemousetracking=true;config.maxbarheight=50;config.isstacked=true;config.showSum=0};_proto.getDSdef=function getDSdef(){return _bar3d.default};_proto.getDSGroupdef=function getDSGroupdef(){return _cartesianStack.default};return StackedBar3D}(_msbar3d.default);var _default=StackedBar3D;exports.default=_default;