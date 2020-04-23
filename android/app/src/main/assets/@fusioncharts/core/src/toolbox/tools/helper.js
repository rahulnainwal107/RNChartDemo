"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.getEventHandlersFor=getEventHandlersFor;exports.mergeConf=mergeConf;exports.bottomPath=bottomPath;exports.RSymbolFns=exports.defaultTextStyle=exports.SymbolStore=exports.preConfig=exports.DEFAULT_TIMEOUT=exports.CLICK=exports.HOVER=void 0;var _domEvent=_interopRequireDefault(require("../../dom-event"));var _dependencyManager=require("../../dependency-manager");var _lib=require("../../lib");var DEFAULT_TIMEOUT=300,HOVER="hover",CLICK="click",COLOR_WHITE="#ffffff",COLOR_E3E3E3="#e3e3e3",STR_DEF="default",COLOR_EFEFEF="#efefef",COLOR_C2C2C2="#c2c2c2",preConfig={activated:{config:{hover:{fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:"#aaaaaa","symbol-stroke":"#aaaaaa",cursor:"pointer"},normal:{fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"fill-symbol":COLOR_WHITE,stroke:COLOR_C2C2C2,"symbol-stroke":COLOR_C2C2C2,"stroke-width":1,cursor:"pointer"},disable:{fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:COLOR_E3E3E3,"symbol-stroke":COLOR_E3E3E3,"stroke-opacity":1,cursor:"pointer"},pressed:{fill:COLOR_EFEFEF,labelFill:COLOR_EFEFEF,symbolFill:COLOR_EFEFEF,hoverFill:COLOR_EFEFEF,"fill-symbol":COLOR_EFEFEF,"stroke-width":1,stroke:COLOR_C2C2C2,"symbol-stroke":COLOR_C2C2C2,cursor:"pointer"}},"button-disabled":false,fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,stroke:COLOR_C2C2C2,"symbol-stroke":COLOR_C2C2C2,"stroke-opacity":1,cursor:"pointer"},disabled:{config:{hover:{fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:COLOR_E3E3E3,"symbol-stroke":COLOR_E3E3E3,cursor:STR_DEF},normal:{fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"fill-symbol":COLOR_WHITE,stroke:COLOR_E3E3E3,"symbol-stroke":COLOR_E3E3E3,"stroke-width":1,cursor:STR_DEF},disable:{fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:COLOR_E3E3E3,"symbol-stroke":COLOR_E3E3E3,"stroke-opacity":1,cursor:STR_DEF},pressed:{fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:COLOR_E3E3E3,"symbol-stroke":COLOR_E3E3E3,cursor:STR_DEF}},fill:COLOR_WHITE,labelFill:COLOR_WHITE,symbolFill:COLOR_WHITE,hoverFill:COLOR_WHITE,"button-disabled":false,stroke:COLOR_E3E3E3,"symbol-stroke":COLOR_E3E3E3,"stroke-opacity":1,cursor:"default"},pressed:{config:{hover:{fill:"#dcdcdc",labelFill:"#dcdcdc",symbolFill:COLOR_WHITE,hoverFill:"#dcdcdc","fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:"#b7b7b7","symbol-stroke":"#b7b7b7",cursor:"pointer"},normal:{fill:"#dcdcdc",labelFill:"#dcdcdc",symbolFill:COLOR_WHITE,hoverFill:"#dcdcdc","fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:"#b7b7b7","symbol-stroke":"#b7b7b7",cursor:"pointer"},pressed:{fill:"#dcdcdc",labelFill:"#dcdcdc",symbolFill:COLOR_WHITE,hoverFill:"#dcdcdc","fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:"#b7b7b7","symbol-stroke":"#b7b7b7",cursor:"pointer"}},fill:"#dcdcdc",labelFill:"#dcdcdc",symbolFill:COLOR_WHITE,hoverFill:"#dcdcdc","fill-symbol":COLOR_WHITE,"stroke-width":1,stroke:"#b7b7b7","symbol-stroke":"#b7b7b7",cursor:"pointer"}};exports.preConfig=preConfig;exports.CLICK=CLICK;exports.HOVER=HOVER;exports.DEFAULT_TIMEOUT=DEFAULT_TIMEOUT;var Raphael=(0,_dependencyManager.getDep)("redraphael","plugin"),TEXTBOX_SYMBOL="Internal_CB",RSymbolFns=function(){return{CB_NOT_CHECKED:function notCheckedCallback(posx,posy,rad){return["M",posx-rad,posy-rad]},CB_CHECKED:function checkedCallback(posx,posy,rad){var x=posx,y=posy,r=rad,rq=r/4,rtq=3*rq,x0=x-rtq,y0=y,x1=x-rq,y1=y+r,x2=x+r,y2=y-r;return["M",x0,y0,"L",x1,y1,x2,y2]}}}(),SymbolStore=function(){Raphael.addSymbol(TEXTBOX_SYMBOL,RSymbolFns.CB_NOT_CHECKED);return{register:function onRegister(){var symbolName,symbolDrawingFn,symbolRegObj,itrObj;if(arguments.length===1){symbolRegObj=arguments[0];if(!((symbolRegObj!==null||symbolRegObj!==_lib.UNDEF)&&typeof symbolRegObj==="object")){return}itrObj=symbolRegObj}else if(arguments.length>1){symbolName=arguments[0];symbolDrawingFn=arguments[1];if(typeof symbolName!=="string"||typeof symbolDrawingFn!=="function"){return}itrObj={};itrObj[symbolName]=symbolDrawingFn}else{return}for(symbolName in itrObj){symbolDrawingFn=itrObj[symbolName];if(!{}.hasOwnProperty.call(itrObj,symbolName)){continue}Raphael.addSymbol(symbolName,symbolDrawingFn)}}}}(),defaultTextStyle={fill:"#555555",labelFill:"#555555",symbolFill:"#555555",hoverFill:"#555555",fontFamily:"Verdana,sans",fontSize:"12px",fontStyle:"normal",fontWeight:"normal",lineHeight:"14.399999999999999px"};exports.defaultTextStyle=defaultTextStyle;exports.SymbolStore=SymbolStore;exports.RSymbolFns=RSymbolFns;function getEventHandlersFor(eventName,node){var stopPropagation=function stopPropagation(){_domEvent.default.listen(node,"mousemove",(function onMouseMove(e){e.originalEvent.stopPropagation()}))};switch(eventName){case"click":return function(mouseClickFn){_domEvent.default.listen(node,"click",(function(e){e.target&&e.target.parentNode&&mouseClickFn.call(e.target)}));stopPropagation()};case"hover":return function(mouseOverFn,mouseOutFn){_domEvent.default.listen(node,"pointerhover",(function(e){e.target&&e.target.parentNode&&(e.state==="start"?mouseOverFn:mouseOutFn).call(e.target)}));stopPropagation()}}}function mergeConf(source,sink,theirsMergeEnabled){var key,sourceVal;for(key in source){sourceVal=source[key];if(sourceVal===_lib.UNDEF||sourceVal===null){continue}if(theirsMergeEnabled){if(sink[key]){continue}sink[key]=sourceVal}else{sink[key]=sourceVal}}}function bottomPath(posx,posy,rad,width,height){var x=posx,y=posy,halfWidth=width/2,offset=3,space=Math.round(height/4+1),startX=x-halfWidth,endX=x+halfWidth,startY=y+space+offset;return["M",startX,startY,"L",endX,startY]}