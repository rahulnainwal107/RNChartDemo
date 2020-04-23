"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=exports.IsoTimeConverter=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _index=require("./index.js");var _timeFormatter=_interopRequireDefault(require("./time-formatter.js"));var _enUS=_interopRequireDefault(require("./locales/en-US.js"));var _timeParser=_interopRequireDefault(require("./time-parser.js"));var ISO_SPECIFIER="%Y-%m-%dT%H:%M:%S.%LZ";var IsoTimeConverter=function(_TimeConverter){(0,_inheritsLoose2.default)(IsoTimeConverter,_TimeConverter);function IsoTimeConverter(){return _TimeConverter.apply(this,arguments)||this}var _proto=IsoTimeConverter.prototype;_proto.formatter=function formatter(){if(Date.prototype.toISOString){return{format:function format(d){return d.toISOString()},toString:function toString(){return ISO_SPECIFIER}}}return new _timeFormatter.default(ISO_SPECIFIER,this._utcFormats)};_proto.utcFormatter=function utcFormatter(){return this.formatter()};_proto.parser=function parser(){if(+new Date("2000-01-01T00:00:00.000Z")){return{parse:function parse(string){var date=new Date(string);return isNaN(date)?null:date},toString:function toString(){return ISO_SPECIFIER}}}return new _timeParser.default(ISO_SPECIFIER,this._parses,(function(d){if(d.y>=0&&d.y<100){var date=new Date(Date.UTC(-1,d.m,d.d,d.H,d.M,d.S,d.L));date.setUTCFullYear(d.y);return date}return new Date(Date.UTC(d.y,d.m,d.d,d.H,d.M,d.S,d.L))}))};_proto.utcParser=function utcParser(){return this.parser()};return IsoTimeConverter}(_index.TimeConverter);exports.IsoTimeConverter=IsoTimeConverter;var _default=new IsoTimeConverter(_enUS.default);exports.default=_default;