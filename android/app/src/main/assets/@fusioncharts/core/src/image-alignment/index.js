"use strict";exports.__esModule=true;exports.getAlignImage=getAlignImage;function getImageAlignment(chartBorderWidth,bgImageVAlign,bgImageHAlign,imageWidth,imageHeight,chartWidth,chartHeight){var alignObj={};switch(bgImageVAlign){case"top":alignObj.y=chartBorderWidth;break;case"bottom":alignObj.y=chartHeight-imageHeight-chartBorderWidth;break;case"middle":alignObj.y=(chartHeight-imageHeight)/2;break}switch(bgImageHAlign){case"left":alignObj.x=chartBorderWidth;break;case"right":alignObj.x=chartWidth-imageWidth-chartBorderWidth;break;case"middle":alignObj.x=(chartWidth-imageWidth)/2;break}return alignObj}function getAlignImage(bgImageVAlign,bgImageHAlign,bgImageDisplayMode,imageWidth,imageHeight,chartWidth,chartHeight,chartBorderWidth,cWidth,cHeight){var alignImage={},imgAspectRatio,cAspectRatio,scaleFactor,xCount,yCount,alignObj;switch(bgImageDisplayMode){case"center":alignImage.width=imageWidth;alignImage.height=imageHeight;alignImage.y=chartHeight/2-imageHeight/2;alignImage.x=chartWidth/2-imageWidth/2;break;case"stretch":alignImage.width=chartWidth-chartBorderWidth*2;alignImage.height=chartHeight-chartBorderWidth*2;alignImage.y=chartBorderWidth;alignImage.x=chartBorderWidth;break;case"tile":alignImage.width=imageWidth;alignImage.height=imageHeight;alignImage.tileInfo={};alignImage.tileInfo.xCount=xCount=Math.ceil(cWidth/imageWidth);alignImage.tileInfo.yCount=yCount=Math.ceil(cHeight/imageHeight);alignObj=getImageAlignment(chartBorderWidth,bgImageVAlign,bgImageHAlign,imageWidth*xCount,imageHeight*yCount,chartWidth,chartHeight);alignImage.y=alignObj.y;alignImage.x=alignObj.x;break;case"fit":imgAspectRatio=imageWidth/imageHeight;cAspectRatio=cWidth/cHeight;scaleFactor=imgAspectRatio>cAspectRatio?cWidth/imageWidth:cHeight/imageHeight;alignImage.width=imageWidth*scaleFactor;alignImage.height=imageHeight*scaleFactor;alignObj=getImageAlignment(chartBorderWidth,bgImageVAlign,bgImageHAlign,alignImage.width,alignImage.height,chartWidth,chartHeight);alignImage.y=alignObj.y;alignImage.x=alignObj.x;break;case"fill":imgAspectRatio=imageWidth/imageHeight;cAspectRatio=cWidth/cHeight;scaleFactor=imgAspectRatio>cAspectRatio?cHeight/imageHeight:cWidth/imageWidth;alignImage.width=imageWidth*scaleFactor;alignImage.height=imageHeight*scaleFactor;alignObj=getImageAlignment(chartBorderWidth,bgImageVAlign,bgImageHAlign,alignImage.width,alignImage.height,chartWidth,chartHeight);alignImage.y=alignObj.y;alignImage.x=alignObj.x;break;default:alignObj=getImageAlignment(chartBorderWidth,bgImageVAlign,bgImageHAlign,imageWidth,imageHeight,chartWidth,chartHeight);alignImage.width=imageWidth;alignImage.height=imageHeight;alignImage.y=alignObj.y;alignImage.x=alignObj.x}return alignImage}