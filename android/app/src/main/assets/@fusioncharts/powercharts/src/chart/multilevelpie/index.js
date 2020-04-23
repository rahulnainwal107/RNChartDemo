"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _commonchartapi=_interopRequireDefault(require("@fusioncharts/charts/src/chart/_internal/commonchartapi"));var _mlpieDataset=_interopRequireDefault(require("../../factories/mlpie-dataset"));var MULTILEVELPIE="multiLevelPie";var MultilevelPie=function(_CommonAPI){(0,_inheritsLoose2.default)(MultilevelPie,_CommonAPI);MultilevelPie.getName=function getName(){return"MultilevelPie"};function MultilevelPie(){var _this;_this=_CommonAPI.call(this)||this;_this.defaultPaletteOptions=null;_this.registerFactory("dataset",_mlpieDataset.default,["canvas"]);return _this}var _proto=MultilevelPie.prototype;_proto.getName=function getName(){return"MultilevelPie"};_proto.__setDefaultConfig=function __setDefaultConfig(){_CommonAPI.prototype.__setDefaultConfig.call(this);var config=this.config;config.is3D=false;config.hasLegend=false;config.defaultDatasetType=MULTILEVELPIE;config.valuefontbold=0;config.skipCanvasDrawing=true};_proto._checkInvalidSpecificData=function _checkInvalidSpecificData(){var categories=this.getFromEnv("dataSource").category;if(!(categories&&categories[0])||!Array.isArray(categories)){return true}};_proto._spaceManager=function _spaceManager(){var availableHeight,iapi=this,config=iapi.config;iapi._allocateSpace(iapi._manageActionBarSpace&&iapi._manageActionBarSpace(config.availableHeight*.225)||{});availableHeight=config.canvasHeight*.7;iapi._manageChartMenuBar(availableHeight);iapi.allocateDimensionOfChartMenuBar()};return MultilevelPie}(_commonchartapi.default);var _default=MultilevelPie;exports.default=_default;