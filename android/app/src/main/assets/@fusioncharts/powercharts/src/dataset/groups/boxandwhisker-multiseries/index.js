"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _columnMultiseries=_interopRequireDefault(require("@fusioncharts/charts/src/dataset/groups/column-multiseries"));var key="manager-defaultVcanvasGroup-lines",vcanvasGroup="defaultVcanvasGroup";var BoxAndWhiskerMultiSeriesGroup=function(_ColumnMultiseriesGro){(0,_inheritsLoose2.default)(BoxAndWhiskerMultiSeriesGroup,_ColumnMultiseriesGro);function BoxAndWhiskerMultiSeriesGroup(){return _ColumnMultiseriesGro.apply(this,arguments)||this}var _proto=BoxAndWhiskerMultiSeriesGroup.prototype;_proto.createContainer=function createContainer(){_ColumnMultiseriesGro.prototype.createContainer.call(this);var manager=this,pContainer=manager.getLinkedParent().getChildContainer(vcanvasGroup);!manager.getChildContainer(key)&&manager.addChildContainer(key,manager.getFromEnv("animationManager").setAnimation({el:"group",component:manager,attr:{name:key},container:pContainer}))};return BoxAndWhiskerMultiSeriesGroup}(_columnMultiseries.default);var _default=BoxAndWhiskerMultiSeriesGroup;exports.default=_default;