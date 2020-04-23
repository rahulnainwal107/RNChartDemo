"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.quarterObj=exports.default=void 0;var _timeInterval=_interopRequireDefault(require("./time-interval.js"));var _timeIntervalclip=require("./time-intervalclip");var _durations=require("./durations.js");var quarterObj={name:"quarter",floor:function floor(d,clippedDates,timeUniverse){d.setMonth(d.getMonth()-(d.getMonth()+3)%3,1);return new Date(Number((0,_timeIntervalclip.getFloor)(new Date(Number(d.setHours(0,0,0,0))),clippedDates,timeUniverse)))},offset:function offset(d,s,clippedDates,timeUniverse){var isPositiveOffset=s>0,dateObj={date:new Date(Number(d))},cloneDate=new Date(Number(dateObj.date));return new Date(Number(isPositiveOffset?(0,_timeIntervalclip.clampDownDateWithinClip)(dateObj.date,new Date(Number(cloneDate.setMonth(cloneDate.getMonth()+s*3))),clippedDates,timeUniverse):(0,_timeIntervalclip.clampUpDateWithinClip)(dateObj.date,new Date(Number(cloneDate.setMonth(cloneDate.getMonth()+s*3))),clippedDates,timeUniverse)))},count:function count(s,e,clippedDates){var clipArray=(0,_timeIntervalclip.getValidDatesWithin)(clippedDates,s,e),clipDuration=0,clipDates=(0,_timeIntervalclip.getClampRangesAround)(clippedDates,e);clipArray=(0,_timeIntervalclip.getClipArray)(clipDates,clipArray);clipArray.forEach((function(date){clipDuration+=Number(date.to)-Number(date.from)}));return(e.getMonth()-(e.getMonth()+3)%3-(s.getMonth()-(s.getMonth()+3)%3)-Math.floor(clipDuration/_durations.durationMonth))/3+(e.getFullYear()-s.getFullYear())*4},field:function field(d,clippedDates,timeUniverse){var dateObj={date:new Date(Number(d))},cloneDate=new Date(Number(dateObj.date)),clipArray=[],floorDate,clipDuration=0;cloneDate.setMonth(0);floorDate=(0,_timeIntervalclip.getFloor)(new Date(Number(cloneDate)),clippedDates,timeUniverse);clipArray=(0,_timeIntervalclip.getValidDatesWithin)(clippedDates,new Date(Number(floorDate)),dateObj.date);clipArray.forEach((function(date){clipDuration+=Number(date.to)-Number(date.from)}));return Math.floor((d.getMonth()-floorDate.getMonth()-Math.floor(clipDuration/_durations.durationMonth))/3)}},quarter=new _timeInterval.default(quarterObj);exports.quarterObj=quarterObj;var _default=quarter;exports.default=_default;