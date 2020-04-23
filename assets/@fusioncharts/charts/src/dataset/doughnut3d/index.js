"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _pie3d=_interopRequireDefault(require("../pie3d"));var _index=_interopRequireDefault(require("./index.animation"));var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _lib=require("@fusioncharts/core/src/lib");var FIFTY_PERCENT="50%";(0,_dependencyManager.addDep)({name:"doughnut3dAnimation",type:"animationRule",extension:_index.default});var Doughnut3DDataset=function(_Pie3DDataset){(0,_inheritsLoose2.default)(Doughnut3DDataset,_Pie3DDataset);function Doughnut3DDataset(){return _Pie3DDataset.apply(this,arguments)||this}var _proto=Doughnut3DDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"doughnut3D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_Pie3DDataset.prototype.__setDefaultConfig.call(this);this.config.doughnutradius=FIFTY_PERCENT};_proto._configurePie3DManager=function _configurePie3DManager(){var dataSet=this,dataSetConfig=dataSet.config,dataSetComponents=dataSet.components,pie3DManager=dataSet.getFromEnv("pie3DManager"),data=dataSetComponents.data;if(pie3DManager){pie3DManager.configure(dataSetConfig.pieSliceDepth,data.length===1,dataSetConfig.use3DLighting,true)}};_proto.configureAttributes=function configureAttributes(dataObj){_Pie3DDataset.prototype.configureAttributes.call(this,dataObj);var dataset=this,conf=dataset.config,chartConfig=dataset.getFromEnv("chartConfig");conf.doughnutradius=(0,_lib.pluck)(chartConfig.doughnutradius,conf.doughnutradius,FIFTY_PERCENT)};return Doughnut3DDataset}(_pie3d.default);var _default=Doughnut3DDataset;exports.default=_default;