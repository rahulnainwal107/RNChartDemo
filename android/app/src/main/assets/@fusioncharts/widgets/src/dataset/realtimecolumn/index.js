"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=exports.resetCatPos=exports._realTimeConfigure=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _column=_interopRequireDefault(require("@fusioncharts/charts/src/dataset/column"));var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _index=_interopRequireDefault(require("./index.animation"));(0,_dependencyManager.addDep)({name:"realtimeColumnAnimation",type:"animationRule",extension:_index.default});var RealtimeColumnDataset=function(_ColumnDataset){(0,_inheritsLoose2.default)(RealtimeColumnDataset,_ColumnDataset);function RealtimeColumnDataset(){return _ColumnDataset.apply(this,arguments)||this}var _proto=RealtimeColumnDataset.prototype;_proto._realTimeConfigure=function _realTimeConfigure(force){var dataSet=this,chart=dataSet.getFromEnv("chart"),datasetStore=dataSet.components.data,tempArr=[],numDisplaySets=chart.config.realTimeConfig.numDisplaySets,catLen;catLen=force?0:Math.min(dataSet.getFromEnv("xAxis").getTicksLen(),datasetStore&&datasetStore.length);if(catLen<numDisplaySets){tempArr.length=numDisplaySets-catLen;dataSet.components.data=tempArr.concat(datasetStore)}else if(catLen>numDisplaySets){dataSet.components.data.splice(numDisplaySets,catLen-numDisplaySets)}dataSet.resetCatPos&&dataSet.resetCatPos()};_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"realtimeColumn"};_proto.resetCatPos=function resetCatPos(){var dataSet=this,dataStore=dataSet.components.data,len=dataStore.length,i;if(dataStore&&len){for(i=0;i<len;i++){if(dataStore[i]&&dataStore[i].config){dataStore[i].config._x=i}}}};return RealtimeColumnDataset}(_column.default);var _realTimeConfigure=RealtimeColumnDataset.prototype._realTimeConfigure,resetCatPos=RealtimeColumnDataset.prototype.resetCatPos;exports.resetCatPos=resetCatPos;exports._realTimeConfigure=_realTimeConfigure;var _default=RealtimeColumnDataset;exports.default=_default;