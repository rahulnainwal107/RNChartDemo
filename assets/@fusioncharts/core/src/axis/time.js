"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _gantt=_interopRequireDefault(require("./gantt"));var _lib=require("../lib");var GanttTimeAxis=function(_GanttAxis){(0,_inheritsLoose2.default)(GanttTimeAxis,_GanttAxis);function GanttTimeAxis(){var _this;_this=_GanttAxis.call(this)||this;var axis=(0,_assertThisInitialized2.default)(_this);axis.timeUnits=["year","month","day","hour","minute","second","millisecond"];axis.defaultRef=new Date(1970,0).getTime();axis.aggregationRules={second:{duration:1e3,setter:"setSeconds",getter:"getSeconds",maxFactor:60,factors:[{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:10},{value:12},{value:15},{value:20},{value:30}]},minute:{duration:6e4,setter:"setMinutes",getter:"getMinutes",maxFactor:60,factors:[{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:10},{value:12},{value:15},{value:20},{value:30}]},hour:{duration:36e5,setter:"setHours",getter:"getHours",maxFactor:24,factors:[{value:1},{value:2},{value:3},{value:4},{value:6},{value:12}]},day:{duration:864e5,setter:"setDate",getter:"getDate",maxFactor:30,factors:[{value:1},{value:2},{value:3},{value:5},{value:6},{value:10},{value:15}]},month:{duration:2592e6,setter:"setMonth",getter:"getMonth",maxFactor:12,factors:[{value:1},{value:3},{value:6}]},year:{duration:31536e6,setter:"setFullYear",getter:"getFullYear",maxFactor:Infinity,factors:[{value:1}]},millisecond:{duration:1,setter:"setMilliseconds",getter:"getMilliseconds",maxFactor:1e3,factors:[{value:1}]}};return _this}var _proto=GanttTimeAxis.prototype;_proto.getName=function getName(){return"ganttAxis"};_proto.getNthDate=function getNthDate(reference,unitObj,_nFactor){var date=new Date(reference),aggregationRules=this.aggregationRules,nFactor=_nFactor;nFactor===_lib.UNDEF&&(nFactor=unitObj.factor.value);date[aggregationRules[unitObj.name].setter](date[aggregationRules[unitObj.name].getter]()+nFactor);return date.getTime()};_proto.getUnitPassed=function getUnitPassed(start,end,name){var startDate=new Date(start),endDate=new Date(end),unit,aggregationRules=this.aggregationRules;switch(name){case"year":unit=endDate[aggregationRules[name].getter]()-startDate[aggregationRules[name].getter]();break;case"month":{var yearUnit=endDate[aggregationRules.year.getter]()-startDate[aggregationRules.year.getter]()-1;unit=yearUnit*12+endDate[aggregationRules[name].getter]()+(12-startDate[aggregationRules[name].getter]());break}default:unit=Math.floor((end-start)/aggregationRules[name].duration)}return unit};_proto.getStartPointWRTReference=function getStartPointWRTReference(start,unitObj,factorProvided){var axis=this,nFactor,defaultRef=axis.defaultRef,reference=unitObj.factor.reference||defaultRef,factor=factorProvided||unitObj.factor.value;var unitPassed=axis.getUnitPassed(reference,start,unitObj.name);nFactor=Math.floor(unitPassed/factor)*factor;return axis.getNthDate(reference,unitObj,nFactor)};_proto.getSuitableBin=function getSuitableBin(target){var axis=this,timeUnits=axis.timeUnits,aggregationRules=axis.aggregationRules;for(var i=0,ii=timeUnits.length;i<ii;i+=1){if(target>=aggregationRules[timeUnits[i]].duration){if(i===0||i===ii-1){return{name:timeUnits[i],factor:{value:i===0?Math.ceil(target/aggregationRules[timeUnits[i]].duration):target}}}for(var j=0,jj=aggregationRules[timeUnits[i]].factors.length;j<jj;j+=1){if(target<=aggregationRules[timeUnits[i]].factors[j].value*aggregationRules[timeUnits[i]].duration){return{name:timeUnits[i],factor:aggregationRules[timeUnits[i]].factors[j]}}}return{name:timeUnits[i-1],factor:aggregationRules[timeUnits[i-1]].factors[0]}}}};_proto.getBinnedTime=function getBinnedTime(max,min,interval,nFactor){var axis=this,timeArr=[],suitableBin=axis.getSuitableBin(interval),start=axis.getStartPointWRTReference(min,suitableBin,nFactor);for(var i=start,ii=max;i<=ii;i=axis.getNthDate(i,suitableBin,nFactor)){timeArr.push(i)}return timeArr};_proto.createTickArr=function createTickArr(min,max,rules,arr,nfactor){var axis=this,aggregationRule=axis.aggregationRules[rules.name],tmpArr=axis.getBinnedTime(max,min,aggregationRule.duration*rules.factor.value,nfactor);tmpArr.forEach((function(val){if(val>=min&&val<=max){arr.push(val)}}));return arr};_proto.getTicks=function getTicks(start,end,target){var axis=this,retArr=[],rulesApplicable=axis.getSuitableBin(target);axis.createTickArr(start,end,rulesApplicable,retArr);return retArr};_proto.setDataLimit=function setDataLimit(){var min=1328034666e3,max=13517082e5,axis=this;axis.setAxisRange({max:Number((0,_lib.toPrecision)(max,10)),min:Number((0,_lib.toPrecision)(min,10))})};_proto._getIntervalArr=function _getIntervalArr(){var axis=this,visibleRange=axis.getVisibleConfig();return this.getTicks(visibleRange.minValue,visibleRange.maxValue,(visibleRange.maxValue-visibleRange.minvalue)/10)};return GanttTimeAxis}(_gantt.default);var _default=GanttTimeAxis;exports.default=_default;