"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.utcMinuteObj=exports.default=void 0;var _timeInterval=_interopRequireDefault(require("../time-interval.js"));var _durations=require("../durations.js");var _timeIntervalclip=require("../time-intervalclip");var utcMinuteObj={name:"minute",floor:function floor(d,clippedDates,timeUniverse){return new Date(Number((0,_timeIntervalclip.getFloor)(new Date(Number(d.setUTCSeconds(0,0))),clippedDates,timeUniverse)))},offset:function offset(d,s,clippedDates,timeUniverse){var isPositiveOffset=s>0,dateObj={date:new Date(d)},cloneDate=new Date(JSON.parse(JSON.stringify(dateObj)).date);return new Date(Number(isPositiveOffset?(0,_timeIntervalclip.clampDownDateWithinClip)(dateObj.date,new Date(Number(cloneDate.setTime(Number(cloneDate)+s*_durations.durationMinute))),clippedDates,timeUniverse):(0,_timeIntervalclip.clampUpDateWithinClip)(dateObj.date,new Date(Number(cloneDate.setTime(Number(cloneDate)+s*_durations.durationMinute))),clippedDates,timeUniverse)))},count:function count(s,e,clippedDates){var clipArray=(0,_timeIntervalclip.getValidDatesWithin)(clippedDates,s,e),clipDuration=0,clipDates=(0,_timeIntervalclip.getClampRangesAround)(clippedDates,e);clipArray=(0,_timeIntervalclip.getClipArray)(clipDates,clipArray);clipArray.forEach((function(date){clipDuration+=Number(date.to)-Number(date.from)}));return(e-s)/_durations.durationMinute-Math.floor(clipDuration/_durations.durationMinute)},field:function field(d,clippedDates,timeUniverse){var dateObj={date:new Date(Number(d))},cloneDate=new Date(Number(dateObj.date)),clipArray=[],floorDate,clipDuration=0;cloneDate.setUTCMinutes(0);floorDate=(0,_timeIntervalclip.getFloor)(new Date(Number(cloneDate)),clippedDates,timeUniverse);clipArray=(0,_timeIntervalclip.getValidDatesWithin)(clippedDates,new Date(Number(floorDate)),dateObj.date);clipArray.forEach((function(date){clipDuration+=Number(date.to)-Number(date.from)}));return d.getUTCMinutes()-floorDate.getUTCMinutes()-Math.floor(clipDuration/_durations.durationMinute)}},utcMinute=new _timeInterval.default(utcMinuteObj);exports.utcMinuteObj=utcMinuteObj;var _default=utcMinute;exports.default=_default;