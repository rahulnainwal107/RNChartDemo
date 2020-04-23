"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _mapper=_interopRequireDefault(require("./mapper.js"));var _isAllDefined=_interopRequireDefault(require("./is-all-defined.js"));var UNDEF,lastHoveredInfo={elementInfo:[]},safePointerEventMapping={mouseover:"pointerover",mousedown:"pointerdown",mousemove:"pointermove",mouseup:"pointerup",mouseout:"pointerout"},safeMouseEventMapping={mouseover:"touchstart",mousedown:"touchstart",mouseup:"touchend",mousemove:"touchmove",mouseout:"touchend"},touchDeviceEvents={blur:true},navigator=window.navigator,supportsTouch="ontouchstart"in document||navigator.maxTouchPoints||navigator.msMaxTouchPoints,supportsPointer="onpointerover"in document,fcClick=function fcClick(dom,handler,context){var _ref;if(context===void 0){context=dom}var eventType,fn,x1,y1,content;if(!dom._clickHandlerHelper){var downFn=function downFn(e){dom._lastEventTriggered="mousedown";x1=e.clientX!==UNDEF?e.clientX:e.changedTouches&&e.changedTouches[0].clientX;y1=e.clientY!==UNDEF?e.clientY:e.changedTouches&&e.changedTouches[0].clientY},moveFn=function moveFn(e){var x2=e.clientX!==UNDEF?e.clientX:e.changedTouches&&e.changedTouches[0].clientX,y2=e.clientY!==UNDEF?e.clientY:e.changedTouches&&e.changedTouches[0].clientY;if(Math.abs(x1-x2)>=2.5||Math.abs(y1-y2)>=2.5){dom._lastEventTriggered=UNDEF}};if(!supportsPointer&&supportsTouch){content={touchstart:function touchstart(){dom._lastEventTriggered="touchstart";dom._lastEventTriggeredAt=(new Date).getTime()},touchmove:moveFn}}else if(supportsPointer&&supportsTouch){content={pointerdown:downFn,pointermove:moveFn}}else{content={mousedown:downFn,mousemove:moveFn}}for(eventType in content){if(dom.addEventListener){dom.addEventListener(eventType,content[eventType])}else{dom.attachEvent("on"+eventType,content[eventType])}}dom._clickHandlerHelper=content;dom._clickEventCount=0}++dom._clickEventCount;if(!supportsPointer&&supportsTouch){eventType="touchend";fn=function fn(e){if(dom._lastEventTriggered==="touchstart"&&(new Date).getTime()-dom._lastEventTriggeredAt<=500){setTimeout((function(){handler.call(context,e)}),0)}}}else{eventType="click";fn=function fn(e){dom._lastEventTriggered==="mousedown"&&handler.call(context,e)}}return _ref={},_ref[eventType]=fn,_ref},fcunclick=function fcunclick(dom){var eventType,clickHandlerHelper=dom._clickHandlerHelper;if(!--dom._clickEventCount){for(eventType in clickHandlerHelper){if(dom.removeEventListener){dom.removeEventListener(eventType,clickHandlerHelper[eventType])}else{dom.detachEvent("on"+eventType,clickHandlerHelper[eventType])}}dom._clickHandlerHelper=UNDEF}},getDerivedInfo=function getDerivedInfo(dom,_type,callback,context){var _ref2;if(context===void 0){context=dom}switch(_type){case"fc-click":return fcClick(dom,callback)}var actualtype,type=_type,isSafe=type.match(/fc-/),fn=callback;isSafe&&(type=type.replace(/fc-/,""));if(isSafe){if(supportsTouch){actualtype=type;type=(supportsPointer?safePointerEventMapping[type]:safeMouseEventMapping[type])||type;if(actualtype==="mouseout"){fn=function fn(e){if(!(supportsPointer&&supportsTouch&&!e.isPrimary)){lastHoveredInfo.elementInfo.push({el:context,callback:callback});lastHoveredInfo.srcElement=e.srcElement||e.target}};type=supportsPointer?"pointerover":"touchstart"}}}if(fn===callback){fn=function fn(e){!(supportsPointer&&supportsTouch&&!e.isPrimary&&!touchDeviceEvents[e.type])&&callback.call(context,e)}}return _ref2={},_ref2[type]=fn,_ref2},removeHelperHandlers=function removeHelperHandlers(dom,type){switch(type){case"fc-click":return fcunclick(dom)}};if(supportsTouch){document.addEventListener(supportsPointer?"pointerover":"touchstart",(function(e){if(lastHoveredInfo.srcElement&&lastHoveredInfo.srcElement!==(e.srcElement||e.target)){var elementInfo=lastHoveredInfo.elementInfo,ii=elementInfo.length,elems,i;for(i=0;i<ii;i++){elems=elementInfo[i];elems.callback.call(elems.el,e)}}lastHoveredInfo={elementInfo:[]}}),true)}var FusionEvenetHandler=function(){function FusionEvenetHandler(){this.mapper=new _mapper.default}var _proto=FusionEvenetHandler.prototype;_proto.on=function on(dom,type,callback,options){if(options===void 0){options={}}var mapper=this.mapper,derivedInfo,key,keyset=[dom,type,callback];if((0,_isAllDefined.default)(keyset)){if(!(derivedInfo=mapper.getValue(keyset))){derivedInfo=getDerivedInfo(dom,type,callback);mapper.setValue(keyset,derivedInfo);for(key in derivedInfo){if(dom.addEventListener){dom.addEventListener(key,derivedInfo[key])}else{dom.attachEvent("on"+key,derivedInfo[key])}}return true}}return false};_proto.off=function off(dom,type,callback){var mapper=this.mapper,derivedInfo,key,keyset=[dom,type,callback];if((0,_isAllDefined.default)(keyset)){if(derivedInfo=mapper.getValue(keyset)){removeHelperHandlers(dom,type);for(key in derivedInfo){if(dom.removeEventListener){dom.removeEventListener(key,derivedInfo[key])}else{dom.detachEvent("on"+key,derivedInfo[key])}}mapper.clear(keyset);return true}}return false};return FusionEvenetHandler}();var _default=FusionEvenetHandler;exports.default=_default;