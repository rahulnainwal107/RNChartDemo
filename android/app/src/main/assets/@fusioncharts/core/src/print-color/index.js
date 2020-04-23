"use strict";exports.__esModule=true;exports.default=void 0;var _lib=require("../lib");var pointColor=function pointColor(_color,_alpha,radius3D,defaultRadius){var colorObj,shadowIntensity,shadowColor,highLightIntensity,loLight,hiLight,highLight,color=(0,_lib.getFirstColor)(_color),alpha=(0,_lib.getFirstAlpha)(_alpha);if(radius3D<100&&_lib.hasSVG){if(defaultRadius){loLight=(0,_lib.getDarkColor)(color,Math.floor((85-.2*(100-radius3D))*100)/100);hiLight=(0,_lib.getLightColor)(color,Math.floor((100-.5*radius3D)*100)/100);colorObj={color:loLight+_lib.COMMASTRING+hiLight+_lib.COMMASTRING+hiLight+_lib.COMMASTRING+loLight,alpha:alpha+_lib.COMMASTRING+alpha+_lib.COMMASTRING+alpha+_lib.COMMASTRING+alpha,radialGradient:true,gradientUnits:"userSpaceOnUse",r:radius3D}}else{shadowIntensity=Math.floor(.85*(100-.35*radius3D)*100)/100;shadowColor=(0,_lib.getDarkColor)(color,shadowIntensity);highLightIntensity=Math.floor(.5*(100+radius3D)*100)/100;highLight=(0,_lib.getLightColor)(color,highLightIntensity);colorObj={color:highLight+_lib.COMMASTRING+shadowColor,alpha:alpha+_lib.COMMASTRING+alpha,ratio:radius3D+","+(100-radius3D),radialGradient:true,gradientUnits:"userSpaceOnUse"}}}else{colorObj={color:color+_lib.COMMASTRING+color,alpha:alpha+_lib.COMMASTRING+alpha,ratio:"0,100"}}return colorObj};var _default=pointColor;exports.default=_default;