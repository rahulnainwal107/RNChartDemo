"use strict";exports.__esModule=true;exports.convertColor=convertColor;exports.getDarkColor=getDarkColor;exports.getLightColor=getLightColor;exports.mapSymbolName=mapSymbolName;exports.getColumnColor=getColumnColor;exports.getPointColor=getPointColor;exports.getAngle=getAngle;exports.parseColor=parseColor;exports.getValidColor=getValidColor;exports.RGBtoHex=RGBtoHex;exports.rawRGBtoHEX=rawRGBtoHEX;exports.HEXtoRGB=HEXtoRGB;exports.parsePointValue=parsePointValue;exports.getFirstColor=getFirstColor;exports.getFirstAlpha=getFirstAlpha;var symbolStr={circle:"circle",triangle:"triangle",square:"square",diamond:"diamond",poly:"poly_",spoke:"spoke_"},UNDEF,COLOR_BLACK="000000",COLOR_WHITE="FFFFFF",mathAbs=Math.abs,stripWhitespace=/\s+/g,dropHash=/^#?/,validhexcolor=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,COMMA=",",BGRATIOSTRING,startsRGBA=/^rgba/i,cleanColorCode=/[#\s]/gi,BLANK="",HASHSTRING="#";function parsePointValue(_value,abs){var value=_value;value=!value&&value!==false&&value!==0?NaN:Number(value);return isNaN(value)?null:abs?mathAbs(value):value}function getFirstColor(_color,index){var color=_color;color=color.split(COMMA)[index||0];color=color.replace(stripWhitespace,BLANK);if(color===BLANK){color=COLOR_BLACK}return color.replace(dropHash,HASHSTRING)}function getFirstAlpha(_alpha){var alpha=_alpha;alpha=parseInt(alpha,10);if(isNaN(alpha)||alpha>100||alpha<0){alpha=100}return alpha}function getAlpha(_alpha,multiplier){var alpha=_alpha;alpha=Number(alpha);alpha=isNaN(alpha)?100:alpha;if(multiplier!==UNDEF){alpha=alpha*multiplier/100}return alpha%101}function parseAlpha(alpha,length,_multiplier){var alphaArr=alpha.split(COMMA),x,multiplier=_multiplier;if(multiplier!==UNDEF){multiplier=Number(multiplier.split(COMMA)[0])}multiplier=isNaN(multiplier)?UNDEF:multiplier;alphaArr[0]=getAlpha(alphaArr[0],multiplier);for(x=1;x<length;x+=1){alphaArr[x]=alphaArr[0]*getAlpha(alphaArr[x],multiplier)/100}return alphaArr.join(COMMA)}function convertColor(color,_alpha,rgba){var R=0,G=0,B=0,colorStr,tempArr,alpha=_alpha;if(rgba&&rgba.match(startsRGBA)){tempArr=rgba.split(COMMA);R=tempArr[0].slice(tempArr[0].indexOf("(")+1);G=tempArr[1];B=tempArr[2];if(!alpha&&alpha!==0){alpha=parseInt(tempArr[3].slice(0,tempArr[3].indexOf(")"))*100,10)}}if(color){if(color.match(startsRGBA)){tempArr=color.split(COMMA);R=tempArr[0].slice(tempArr[0].indexOf("(")+1);G=tempArr[1];B=tempArr[2]}else{colorStr=color.replace(cleanColorCode,BLANK).split(COMMA)[0];switch(colorStr.length){case 3:colorStr=colorStr.charAt(0)+colorStr.charAt(0)+colorStr.charAt(1)+colorStr.charAt(1)+colorStr.charAt(2)+colorStr.charAt(2);break;case 6:break;default:colorStr=(colorStr+COLOR_WHITE).slice(0,6);break}R=parseInt(colorStr.slice(0,2),16)||0;G=parseInt(colorStr.slice(2,4),16)||0;B=parseInt(colorStr.slice(4,6),16)||0}}if(!alpha&&alpha!==0){alpha=100}if(typeof alpha==="string"){alpha=alpha.split(COMMA)[0]}alpha=parseInt(alpha,10)/100;return"rgba("+R+COMMA+G+COMMA+B+COMMA+alpha+")"}function getDarkColor(_color,_offsetPercent){var color=_color,offsetPercent=_offsetPercent;offsetPercent=offsetPercent<0||offsetPercent>100?100:offsetPercent;offsetPercent=offsetPercent/100;color=color.replace(cleanColorCode,BLANK);var sourceclrRGB=parseInt(color,16),R=Math.floor(sourceclrRGB/65536),G=Math.floor((sourceclrRGB-R*65536)/256),B=sourceclrRGB-R*65536-G*256;return(COLOR_BLACK+(R*offsetPercent<<16|G*offsetPercent<<8|B*offsetPercent).toString(16)).slice(-6)}function getLightColor(_color,_offsetPercent){var color=_color,offsetPercent=_offsetPercent;offsetPercent=offsetPercent<0||offsetPercent>100?100:offsetPercent;offsetPercent=offsetPercent/100;color=color.replace(cleanColorCode,BLANK);var sourceclrRGB=parseInt(color,16),R=Math.floor(sourceclrRGB/65536),G=Math.floor((sourceclrRGB-R*65536)/256),B=sourceclrRGB-R*65536-G*256;return(COLOR_BLACK+(256-(256-R)*offsetPercent<<16|256-(256-G)*offsetPercent<<8|256-(256-B)*offsetPercent).toString(16)).slice(-6)}function mapSymbolName(_num,isSpoke){var x=symbolStr.circle,num=_num;num=parsePointValue(num);if(num>=3){x=(isSpoke?symbolStr.spoke:symbolStr.poly)+num}return x}function getColumnColor(_setColor,_setAlpha,ratio,angle,isRoundEdges,bdColor,bdAlpha,isBar,is3D){var bgColor,colorArr,alphaArr,bdColorArr,color,alpha,bdAlphaArr,setColor=_setColor,setAlpha=_setAlpha;colorArr=setColor.split(COMMA);alphaArr=setAlpha.split(COMMA);bdColorArr=bdColor.split(COMMA);bdAlphaArr=bdAlpha.split(COMMA);setColor=setColor.replace(/\s/g,BLANK).replace(/\,$/,BLANK);if(is3D){bgColor={FCcolor:{color:colorArr[0],alpha:alphaArr[0]}}}else if(isRoundEdges){color=colorArr[0];alpha=alphaArr[0];bgColor={FCcolor:{color:getDarkColor(color,75)+COMMA+getLightColor(color,10)+COMMA+getDarkColor(color,90)+COMMA+getLightColor(color,55)+COMMA+getDarkColor(color,80),alpha:alpha+COMMA+alpha+COMMA+alpha+COMMA+alpha+COMMA+alpha,ratio:"0,11,14,57,18",angle:isBar?"90":"0"}};bdColorArr=[getDarkColor(color,70)]}else{setAlpha=parseAlpha(setAlpha,colorArr.length);bgColor={FCcolor:{color:setColor,alpha:setAlpha,ratio:ratio,angle:isBar?-angle:angle}}}return[bgColor,{FCcolor:{color:bdColorArr[0],alpha:bdAlphaArr[0]}}]}function getPointColor(_color,_alpha){var color=getFirstColor(_color),alpha=getFirstAlpha(_alpha);return{FCcolor:{gradientUnits:"objectBoundingBox",cx:.4,cy:.4,r:"100%",color:getLightColor(color,70)+COMMA+getDarkColor(color,50),alpha:alpha+COMMA+alpha,ratio:BGRATIOSTRING,radialGradient:true}}}function getAngle(width,height,type){var angle=Math.atan(height/width)*180/Math.PI;if(type===2){angle=180-angle}else if(type===3){angle+=180}else if(type===4){angle=360-angle}return angle}function parseColor(color){return color.replace(cleanColorCode,BLANK).replace(dropHash,HASHSTRING)}function getValidColor(color){return validhexcolor.test(parseColor(color))&&color}function RGBtoHex(rgb){return(COLOR_BLACK+(rgb[0]<<16|rgb[1]<<8|rgb[2]).toString(16)).slice(-6)}function rawRGBtoHEX(rawRgb){var rgb;rgb=rawRgb.match(/[\d+]+/g).splice(0,3);return(COLOR_BLACK+(rgb[0]<<16|rgb[1]<<8|rgb[2]).toString(16)).slice(-6)}function HEXtoRGB(sourceColor){var sourceClrRGB=parseInt(sourceColor,16),r=Math.floor(sourceClrRGB/65536),g=Math.floor((sourceClrRGB-r*65536)/256),b=Math.floor(sourceClrRGB-r*65536-g*256);return[r,g,b]}