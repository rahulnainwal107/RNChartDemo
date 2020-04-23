"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _path=_interopRequireDefault(require("./path"));var _constant=_interopRequireDefault(require("../scale-utils/constant"));var _linear=_interopRequireDefault(require("./curve-factories/linear"));var _lineGenerator=_interopRequireDefault(require("./line-generator"));var AreaGenerator=function(){function AreaGenerator(){this.xTopAccessor=function(d){return d[0]};this.xBaseAccessor=null;this.yTopAccessor=(0,_constant.default)(0);this.yBaseAccessor=function(d){return d[1]};this.isDefined=(0,_constant.default)(true);this.Curve=_linear.default;this.ctx=null;this._output=null}var _proto=AreaGenerator.prototype;_proto.generate=function generate(data){if(data===void 0){data=[]}var n=data.length,defined0=false,xBases=new Array(n),yBases=new Array(n),i,j,k,d,buffer;if(this.ctx===null||typeof this.ctx==="undefined"){buffer=new _path.default;this._output=new this.Curve(buffer)}for(i=0;i<=n;++i){d=data[i];if(!(i<n&&this.isDefined(d,i,data))===defined0){defined0=!defined0;if(defined0){j=i;this._output.areaStart();this._output.lineStart()}else{this._output.lineEnd();this._output.lineStart();for(k=i-1;k>=j;--k){this._output.point(xBases[k],yBases[k])}this._output.lineEnd();this._output.areaEnd()}}if(defined0){xBases[i]=+this.xTopAccessor(d,i,data);yBases[i]=+this.yTopAccessor(d,i,data);this._output.point(this.xBaseAccessor?+this.xBaseAccessor(d,i,data):xBases[i],this.yBaseAccessor?+this.yBaseAccessor(d,i,data):yBases[i])}}if(buffer){this._output=null;return buffer.toString()}};_proto.setXAccessor=function setXAccessor(accessor){if(accessor===void 0){accessor=function accessor(d){return d[0]}}this.xTopAccessor=typeof accessor==="function"?accessor:(0,_constant.default)(+accessor);this.xBaseAccessor=null;return this};_proto.getXAccessor=function getXAccessor(){return this.xTopAccessor};_proto.setXTopAccessor=function setXTopAccessor(accessor){if(accessor===void 0){accessor=function accessor(d){return d[0]}}this.xTopAccessor=typeof accessor==="function"?accessor:(0,_constant.default)(+accessor);return this};_proto.getXTopAccessor=function getXTopAccessor(){return this.xTopAccessor};_proto.setXBaseAccessor=function setXBaseAccessor(accessor){if(accessor===null||typeof accessor==="undefined"){this.xBaseAccessor=null}else{this.xBaseAccessor=typeof accessor==="function"?accessor:(0,_constant.default)(+accessor)}return this};_proto.getXBaseAccessor=function getXBaseAccessor(){return this.xBaseAccessor};_proto.setYAccessor=function setYAccessor(accessor){if(accessor===void 0){accessor=function accessor(d){return d[1]}}this.yTopAccessor=typeof accessor==="function"?accessor:(0,_constant.default)(+accessor);this.yBaseAccessor=null;return this};_proto.getYAccessor=function getYAccessor(){return this.yTopAccessor};_proto.setYTopAccessor=function setYTopAccessor(accessor){if(accessor===void 0){accessor=function accessor(d){return d[1]}}this.yTopAccessor=typeof accessor==="function"?accessor:(0,_constant.default)(+accessor);return this};_proto.getYTopAccessor=function getYTopAccessor(){return this.yTopAccessor};_proto.setYBaseAccessor=function setYBaseAccessor(accessor){if(accessor===null||typeof accessor==="undefined"){this.yBaseAccessor=null}else{this.yBaseAccessor=typeof accessor==="function"?accessor:(0,_constant.default)(+accessor)}return this};_proto.getYBaseAccessor=function getYBaseAccessor(){return this.yBaseAccessor};_proto.setDefined=function setDefined(isDefined){if(isDefined===void 0){isDefined=(0,_constant.default)(true)}this.isDefined=typeof isDefined==="function"?isDefined:(0,_constant.default)(!!isDefined);return this};_proto.getDefined=function getDefined(){return this.isDefined};_proto.setCurve=function setCurve(Curve){if(Curve===void 0){Curve=_linear.default}this.Curve=Curve;if(this.ctx!==null&&typeof this.ctx!=="undefined"){this._output=new this.Curve(this.ctx)}return this};_proto.getCurve=function getCurve(){return this.Curve};_proto.setContext=function setContext(ctx){if(ctx===null||typeof ctx==="undefined"){this.ctx=null;this._output=this._ctx}else{this.ctx=ctx;this._output=new this.Curve(this.ctx)}return this};_proto.getContext=function getContext(){return this.ctx};_proto._areaLine=function _areaLine(){return(new _lineGenerator.default).setDefined(this.isDefined).setCurve(this.Curve).setContext(this.ctx)};_proto.getLineXBase=function getLineXBase(){return this._areaLine().setXAccessor(this.xTopAccessor).setYAccessor(this.yTopAccessor)};_proto.getLineYBase=function getLineYBase(){return this._areaLine().setXAccessor(this.xTopAccessor).setYAccessor(this.yTopAccessor)};_proto.getLineYTop=function getLineYTop(){return this._areaLine().setXAccessor(this.xTopAccessor).setYAccessor(this.yTopAccessor)};_proto.getLineXTop=function getLineXTop(){return this._areaLine().setXAccessor(this.xBaseAccessor).setYAccessor(this.yBaseAccessor)};return AreaGenerator}();var _default=AreaGenerator;exports.default=_default;