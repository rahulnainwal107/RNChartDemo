"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _lib=require("@fusioncharts/core/src/lib");var _utils=require("../utils");var _annotationShape=_interopRequireDefault(require("./annotation-shape"));var ELEMENT_TYPE_PATH="path",PATH_ANNOTATION_DEFAULT_X=0,PATH_ANNOTATION_DEFAULT_Y=0;function getCharacterType(_char){if(_char<="9"&&_char>="0"||_char==="-"||_char==="."){return 0}else if(_char<="z"&&_char>="a"||_char<="Z"&&_char>="A"){return 1}return 2}var PathAnnotation=function(_AnnotationShape){(0,_inheritsLoose2.default)(PathAnnotation,_AnnotationShape);function PathAnnotation(){return _AnnotationShape.apply(this,arguments)||this}var _proto=PathAnnotation.prototype;_proto.getName=function getName(){return"path"};_proto.configureAttributes=function configureAttributes(rawConfig){if(rawConfig===void 0){rawConfig={}}_AnnotationShape.prototype.configureAttributes.call(this,rawConfig);var path=this,shapeConfig=path.rawConfig;path.config.pathStr=(0,_lib.pluck)(shapeConfig.path);path.config.x=(0,_lib.pluckNumber)(shapeConfig.x,PATH_ANNOTATION_DEFAULT_X);path.config.y=(0,_lib.pluckNumber)(shapeConfig.y,PATH_ANNOTATION_DEFAULT_Y);path.config.tox=(0,_lib.pluckNumber)(shapeConfig.toX,path.config.x);path.config.toy=(0,_lib.pluckNumber)(shapeConfig.toY,path.config.y);path.config.elementType=ELEMENT_TYPE_PATH};_proto.getScaledPath=function getScaledPath(){var path=this,pathStr=path.config.pathStr,pathAr=[],charType,text,resultStr=_lib.BLANKSTRING,i,j,len;len=pathStr&&pathStr.length;for(i=0;i<len;i++){j=i;text=_lib.BLANKSTRING;charType=getCharacterType(pathStr[i]);while(j<len&&getCharacterType(pathStr[j])===charType){text+=pathStr[j];j++}text=(0,_utils.trim)(text);text!==""&&charType<2&&pathAr.push(text);i=j===i?j:j-1}len=pathAr.length;for(i=0;i<len;){resultStr+=pathAr[i];switch(pathAr[i].toLowerCase()){case"m":case"l":case"t":resultStr+=path.getScaledVal(Number(pathAr[i+1]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+2]),false).toString();i+=3;break;case"s":case"q":resultStr+=path.getScaledVal(Number(pathAr[i+1]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+2]),false).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+3]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+4]),false).toString();i+=5;break;case"h":resultStr+=path.getScaledVal(Number(pathAr[i+1]),true).toString();i+=2;break;case"v":resultStr+=path.getScaledVal(Number(pathAr[i+1]),false).toString();i+=2;break;case"c":resultStr+=path.getScaledVal(Number(pathAr[i+1]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+2]),false).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+3]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+4]),false).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+5]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+6]),false).toString();i+=7;break;case"a":resultStr+=path.getScaledVal(Number(pathAr[i+1]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+2]),false).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+3]),true).toString()+",";resultStr+=pathAr[i+4]+",";resultStr+=pathAr[i+5]+",";resultStr+=path.getScaledVal(Number(pathAr[i+6]),true).toString()+",";resultStr+=path.getScaledVal(Number(pathAr[i+7]),false).toString();i+=8;break;case"z":default:i++}}return resultStr.toString()};_proto.updateAttr=function updateAttr(){var path=this,config=path.config,x,y,attr=config.calculatedAttrs,attrs={};x=(0,_lib.pluckNumber)(attr.x,path.getScaledVal(config.x,true));y=(0,_lib.pluckNumber)(attr.y,path.getScaledVal(config.y,false));if(config.pathStr){attrs.path=path.getScaledPath();attrs.transform="T"+x+","+y}else{attrs.path="M"+x+","+y+"L"+(0,_lib.pluckNumber)(attr.toX,x,path.getScaledVal(config.tox,true))+","+(0,_lib.pluckNumber)(attr.toY,y,path.getScaledVal(config.toy,false))}path._setConfig("attr",attrs)};_proto._getAnnotationAttrs=function _getAnnotationAttrs(){var path=this,config=path.config,attr=path._getConfig("attr")||{},x,y,toX,toY,pathStr,color=config.color;attr.stroke=color;if(path.rawConfig.color){attr.fill=color}attr["stroke-width"]=path.getScaledVal(config.borderThickness);attr["stroke-dasharray"]=config.dashArrayStr;x=attr.x||path.getScaledVal(config.x,true);y=attr.y||path.getScaledVal(config.y,false);toX=attr.toX||path.getScaledVal(config.tox,true);toY=attr.toY||path.getScaledVal(config.toy,false);if(attr.path){return attr}pathStr=path.getScaledPath();if(pathStr){attr.path=pathStr;attr.transform=attr.transform||"T"+x+","+y}else{attr.path=attr.path||"M"+x+","+y+"L"+toX+","+toY}return attr};return PathAnnotation}(_annotationShape.default);var _default=PathAnnotation;exports.default=_default;