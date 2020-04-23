"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _utc=require("../time-intervals/utc");var _calendar=_interopRequireDefault(require("./calendar"));var _continuous=require("./continuous");var _ticks=require("../time-intervals/ticks");var ScaleUtc=function(_ScaleCalendar){(0,_inheritsLoose2.default)(ScaleUtc,_ScaleCalendar);function ScaleUtc(){var _this;_this=_ScaleCalendar.call(this,_utc.utcYear,_utc.utcMonth,_utc.utcWeek,_utc.utcDay,_utc.utcHour,_utc.utcMinute,_utc.utcSecond,_utc.utcMillisecond)||this;_this.formatters={millisecond:_this._localeConverter.utcFormatter(".%L"),second:_this._localeConverter.utcFormatter(":%S"),minute:_this._localeConverter.utcFormatter("%I:%M"),hour:_this._localeConverter.utcFormatter("%I %p"),day:_this._localeConverter.utcFormatter("%a %d"),week:_this._localeConverter.utcFormatter("%b %d"),month:_this._localeConverter.utcFormatter("%B"),year:_this._localeConverter.utcFormatter("%Y")};_this.setDomain([[Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]]);return _this}var _proto=ScaleUtc.prototype;_proto.tickFormat=function tickFormat(specifier){var _this2=this;return specifier?function(d){return _this2._localeConverter.utcFormatter(specifier).format(d)}:function(d){return(0,_ticks.tickFormat)(_this2.timeIntervals,_this2.formatters,d)}};_proto.copy=function copy(){return(0,_continuous.copyScale)(this,new ScaleUtc)};return ScaleUtc}(_calendar.default);var _default=ScaleUtc;exports.default=_default;