"use strict";exports.__esModule=true;exports.before=before;exports.after=after;var _datetimeOps=require("../time-intervals/datetime-ops");var _datetimeEnums=require("../datetime-enums");function before(duration,timestamp,enableUTC,weekStartFrom){if(!duration)throw new Error("duration is missing");if(timestamp&&(isNaN(timestamp)||isNaN(+new Date(timestamp))))throw new Error("timestamp is incorrect");return(0,_datetimeOps.getDateOffset)(!isNaN(timestamp)&&timestamp!==null?timestamp:+new Date,duration.Unit,-duration.number,enableUTC,weekStartFrom||_datetimeEnums.Weekdays.Sunday)}function after(duration,timestamp,enableUTC,weekStartFrom){if(!duration)throw new Error("duration is missing");if(timestamp&&(isNaN(timestamp)||isNaN(+new Date(timestamp))))throw new Error("timestamp is incorrect");return(0,_datetimeOps.getDateOffset)(!isNaN(timestamp)&&timestamp!==null?timestamp:+new Date,duration.Unit,duration.number,enableUTC,weekStartFrom||_datetimeEnums.Weekdays.Sunday)}