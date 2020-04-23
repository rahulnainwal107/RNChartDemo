"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _lib=require("@fusioncharts/core/src/lib");var _bullet=_interopRequireDefault(require("../bullet"));var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _index=_interopRequireDefault(require("./index.animation"));var BLANKSTRING=_lib.BLANK,colorStrings=_lib.preDefStr.colors,COLOR_000000=colorStrings.c000000,showHoverEffectStr=_lib.preDefStr.showHoverEffectStr,BUTT="butt",POSITION_MIDDLE=_lib.preDefStr.POSITION_MIDDLE,ledColorRangeFillMixStr="{light-10},{dark-10},{light-10},{dark-10}",ledColorRangeFillRatioStr="0,10,80,10",win=window,userAgent=win.navigator.userAgent,isIE=/msie/i.test(userAgent)&&!win.opera,TRACKER_FILL="rgba(192,192,192,"+(isIE?.002:1e-6)+")",math=Math,mathRound=math.round,mathMax=math.max,dropHash=_lib.regex.dropHash,SETROLLOVERATTR="setRolloverAttr",SETROLLOUTATTR="setRolloutAttr",EVENTARGS="eventArgs",UNDEF,M="M",L="L",Z="Z";(0,_dependencyManager.addDep)({name:"ledAnimation",type:"animationRule",extension:_index.default});var LedDataset=function(_BulletDataset){(0,_inheritsLoose2.default)(LedDataset,_BulletDataset);function LedDataset(){return _BulletDataset.apply(this,arguments)||this}var _proto=LedDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"led"};_proto.draw=function draw(){var dataSet=this,chart=dataSet.getFromEnv("chart"),conf=dataSet.config,chartAttr=chart.getFromEnv("dataSource").chart,chartConfig=chart.config,canvas=chart.getChildren("canvas")[0],graphics=canvas.getGraphicalElement(),config=canvas.config,canvasBorderElement=graphics.canvasBorderElement,colorRangeElems=graphics.colorRangeElems,canvasElementPath=graphics.canvasElementPath,canvasHotElement=graphics.canvasHotElement,canvasLeft=chartConfig.canvasLeft,canvasRight=chartConfig.canvasRight,canvasTop=chartConfig.canvasTop,canvasBottom=chartConfig.canvasBottom,canvasWidth=chartConfig.canvasWidth,canvasHeight=chartConfig.canvasHeight,parentContainer=chart.getChildContainer().plotGroup,scale=dataSet.getFromEnv("scale"),min=scale.getLimit().min,max=scale.getLimit().max,isAxisReverse=(0,_lib.pluckNumber)(chart.getFromEnv("dataSource").chart.reverseaxis,chart.isAxisReverse),isHorizontal=chart.isHorizontal,getRectXY=function getRectXY(minValue,maxValue){if(isAxisReverse&&!isHorizontal){return{x:canvasLeft,y:canvasTop+minValue*canvasHeight/(max-min),width:canvasWidth,height:(maxValue-minValue)*canvasHeight/(max-min)}}else if(!isAxisReverse&&!isHorizontal){return{x:canvasLeft,y:canvasTop+(canvasHeight-maxValue*canvasHeight/(max-min)),width:canvasWidth,height:(maxValue-minValue)*canvasHeight/(max-min)}}else if(isAxisReverse&&isHorizontal){return{x:canvasLeft+(canvasWidth-maxValue*canvasWidth/(max-min)),y:canvasTop,width:(maxValue-minValue)*canvasWidth/(max-min),height:canvasHeight}}else if(!isAxisReverse&&isHorizontal){return{x:canvasLeft+minValue*canvasWidth/(max-min),y:canvasTop,width:(maxValue-minValue)*canvasWidth/(max-min),height:canvasHeight}}},angle=180,gaugeFillMix,gaugeFillRatio,colorArray,colorM=dataSet.getFromEnv("color-manager"),gaugeBorderColor,gaugeBorderAlpha,showShadow,showGaugeBorder,gaugeBorderThickness,colorObj,i,len,xyObj,color,borderColor,crColor,crAlpha,borderAlpha,shadowAlpha,useSameFillColor,useSameFillBgColor,ledGap,ledSize,gaugeFillColor,LEDlength,sizeGapSum,remaningLength,valueDistance,halfBorderWidth,x1,y1,x2,y2,noOfLED,extraSpace,LEDGapStartX,LEDGapStartY,pathCommand,colorRangeGetter,numberFormatter=dataSet.getFromEnv("number-formatter"),animationManager=chart.getFromEnv("animationManager"),useSameFillColorCode,lastColor,value,colorIndex,showHoverEffect=conf.showHoverEffect,dummyElement,clickFunc=function clickFunc(data){var ele=this;chart.plotEventHandler(ele,data)},rolloverResponseSetter=function rolloverResponseSetter(colorRangeElements){var ii=0,length,elem,ele;return function(){ele=this;if(ele.data(showHoverEffectStr)!==0){for(ii=0,length=colorRangeElements.length;ii<length;ii+=1){elem=colorRangeElements[ii];elem.attr(ele.data(SETROLLOVERATTR)[ii])}}}},rolloutResponseSetter=function rolloutResponseSetter(colorRangeElements){var ii=0,length,elem,ele;return function(){ele=this;if(ele.data(showHoverEffectStr)!==0){for(ii=0,length=colorRangeElements.length;ii<length;ii+=1){elem=colorRangeElements[ii];elem.attr(ele.data(SETROLLOUTATTR)[ii])}}}},setRolloverAttr=[],setRolloutAttr=[],trackerContainer=dataSet.getContainer("trackerContainer"),trackerLayer=chart.getChildContainer("trackerGroup"),setLink,eventArgs,LEDDrawn=0,perLEDValueLength,lastX,lastY,colorLED,colorLedLengthPX,colorLEDLength,isNewElement=false,attr;if(!trackerContainer){trackerContainer=dataSet.addContainer("trackerContainer",animationManager.setAnimation({el:"group",attr:{name:"led-hot"},container:trackerLayer,component:dataSet}))}showGaugeBorder=(0,_lib.pluckNumber)(chartAttr.showgaugeborder,1);gaugeBorderColor=(0,_lib.pluck)(chartAttr.gaugebordercolor,chart.gaugeBorderColor,"333333");gaugeBorderThickness=showGaugeBorder?(0,_lib.pluckNumber)(chartAttr.gaugeborderthickness,chart.gaugeBorderThickness,2):0;gaugeBorderAlpha=(0,_lib.pluck)(chartAttr.gaugeborderalpha,_lib.HUNDREDSTRING);config.gaugeFillColor=gaugeFillColor=(0,_lib.pluck)(chartAttr.gaugefillcolor,chartAttr.ledbgcolor,COLOR_000000);useSameFillColor=(0,_lib.pluckNumber)(chartAttr.usesamefillcolor,0);useSameFillBgColor=(0,_lib.pluckNumber)(chartAttr.usesamefillbgcolor,useSameFillColor);conf.ledGap=ledGap=(0,_lib.pluckNumber)(chartAttr.ledgap,2);conf.ledSize=ledSize=(0,_lib.pluckNumber)(chartAttr.ledsize,2);config.colorRangeFillMix=gaugeFillMix=(0,_lib.getFirstDefinedValue)(chartAttr.colorrangefillmix,chartAttr.gaugefillmix,chart.colorRangeFillMix,ledColorRangeFillMixStr);config.colorRangeFillRatio=gaugeFillRatio=(0,_lib.getFirstDefinedValue)(chartAttr.colorrangefillratio,chartAttr.gaugefillratio,chart.colorRangeFillRatio,chartAttr.gaugefillratio,ledColorRangeFillRatioStr);config.colorRangeGetter=colorRangeGetter=dataSet.getFromEnv("colorRange");config.colorArray=colorArray=colorRangeGetter&&colorRangeGetter.getColorRangeArr(min,max);gaugeBorderColor=(0,_lib.pluck)(gaugeBorderColor,COLOR_000000).replace(dropHash,_lib.HASHSTRING);gaugeBorderAlpha=(0,_lib.pluckNumber)(chartAttr.colorrangeborderalpha,chartAttr.gaugeborderalpha,100);showShadow=(0,_lib.pluckNumber)(chartAttr.showshadow,1);showGaugeBorder=(0,_lib.pluckNumber)(chartAttr.showgaugeborder,1);config.colorRangeBorderThickness=gaugeBorderThickness=showGaugeBorder?(0,_lib.pluckNumber)(chartAttr.colorrangeborderthickness,chartAttr.gaugeborderthickness,2):0;LEDlength=!isHorizontal?canvasHeight:canvasWidth;sizeGapSum=ledGap+ledSize||1;remaningLength=LEDlength-ledSize;valueDistance=max-min;halfBorderWidth=gaugeBorderThickness/2;x1=canvasLeft-halfBorderWidth;y1=canvasTop-halfBorderWidth;x2=canvasLeft+canvasWidth+halfBorderWidth;y2=canvasTop+canvasHeight+halfBorderWidth;noOfLED=parseInt(remaningLength/sizeGapSum,10)+1;extraSpace=remaningLength%sizeGapSum;ledSize+=extraSpace/noOfLED;conf.sizeGapSum=sizeGapSum=ledSize+ledGap;conf.perLEDValueLength=perLEDValueLength=valueDistance/noOfLED;LEDGapStartX=canvasLeft;LEDGapStartY=canvasTop;setLink=(0,_lib.pluck)(chartAttr.clickurl);value=numberFormatter.getCleanValue(chart.getFromEnv("dataSource").value);if(useSameFillColor||useSameFillBgColor){for(i=0,len=colorArray.length;i<len;i+=1){if(value>=colorArray[i].minvalue&&value<=colorArray[i].maxvalue){useSameFillColorCode=colorArray[i].code||colorM.getPlotColor(i);colorIndex=i;break}}}colorArray&&colorArray.length>0&&(lastColor=colorArray[0].code||colorM.getPlotColor(0));lastX=isAxisReverse?canvasRight:canvasLeft;lastY=isAxisReverse?canvasTop:canvasBottom;for(i=0,len=colorArray&&colorArray.length;i<len;i+=1){colorObj=colorArray[i];xyObj=getRectXY(colorObj.minvalue-min,colorObj.maxvalue-min);colorLED=mathRound((colorObj.maxvalue-min)/perLEDValueLength);colorLEDLength=colorLED-LEDDrawn;LEDDrawn=colorLED;colorLedLengthPX=colorLEDLength*sizeGapSum;if(!isHorizontal&&!isAxisReverse){xyObj.height=colorLedLengthPX-ledGap;xyObj.y=lastY-xyObj.height;lastY-=colorLedLengthPX}else if(!isHorizontal&&isAxisReverse){xyObj.height=colorLedLengthPX-ledGap;xyObj.y=lastY;lastY+=colorLedLengthPX}else if(isHorizontal&&!isAxisReverse){xyObj.width=colorLedLengthPX-ledGap;xyObj.x=lastX;lastX+=colorLedLengthPX}else if(isHorizontal&&isAxisReverse){xyObj.width=colorLedLengthPX-ledGap;xyObj.x=lastX-xyObj.width;lastX-=colorLedLengthPX}colorObj.x=xyObj.x;colorObj.y=xyObj.y;colorObj.width=xyObj.width;colorObj.height=xyObj.height;if(useSameFillColor){color=useSameFillColorCode}else if(useSameFillBgColor&&i>colorIndex){color=lastColor}else{color=lastColor=colorObj.code||colorM.getPlotColor(i)}borderColor=(0,_lib.convertColor)((0,_lib.getColorCodeString)((0,_lib.pluck)(colorObj.bordercolor,color),gaugeBorderColor),(0,_lib.pluckNumber)(colorObj.borderalpha,gaugeBorderAlpha));crColor=colorM.parseColorMix(colorObj.code,gaugeFillMix);crAlpha=colorM.parseAlphaList(colorObj.alpha,crColor.length);borderAlpha=(0,_lib.pluckNumber)(colorObj.borderAlpha,gaugeBorderAlpha);shadowAlpha=crAlpha.split(_lib.COMMASTRING);shadowAlpha=mathMax.apply(Math,shadowAlpha);shadowAlpha=mathMax(gaugeBorderThickness&&borderAlpha||0,shadowAlpha);attr={x:xyObj.x,y:xyObj.y,width:xyObj.width<0?0:xyObj.width,height:xyObj.height<0?0:xyObj.height,r:0,"stroke-width":0,stroke:borderColor,fill:(0,_lib.toRaphaelColor)({FCcolor:{color:color,ratio:gaugeFillRatio,alpha:crAlpha,angle:angle}})};dummyElement=animationManager.setAnimation({el:colorRangeElems&&colorRangeElems[i]||"rect",attr:attr,container:parentContainer,component:dataSet,label:"plotBackground"}).toBack();if(!(colorRangeElems&&colorRangeElems[i])){canvas.addGraphicalElement("colorRangeElems",dummyElement,true);dummyElement.shadow({apply:showShadow,opacity:shadowAlpha/100})}setRolloverAttr.push({"stroke-width":0,fill:(0,_lib.toRaphaelColor)({FCcolor:{color:(0,_lib.getDarkColor)((0,_lib.pluck)(color,COLOR_000000),80)+_lib.COMMASTRING+(0,_lib.getLightColor)((0,_lib.pluck)(color,COLOR_000000),80),alpha:(0,_lib.pluckNumber)(colorObj.alpha,100),angle:isHorizontal?90:0}})});setRolloutAttr.push({"stroke-width":0,fill:(0,_lib.toRaphaelColor)({FCcolor:{color:(0,_lib.pluck)(color,COLOR_000000),alpha:(0,_lib.pluckNumber)(colorObj.alpha,100)}})})}colorRangeElems=canvas.getGraphicalElement("colorRangeElems")||[];len=colorRangeElems.length-1;while(len>=i){canvas.removeGraphicalElement(colorRangeElems[len]);len--}eventArgs={link:setLink,value:value};attr={x:canvasLeft,y:canvasTop,width:canvasWidth,height:canvasHeight,"stroke-width":0,fill:TRACKER_FILL};if(!canvasHotElement){canvasHotElement=graphics.canvasHotElement=animationManager.setAnimation({el:"rect",attr:attr,container:trackerContainer,component:dataSet});isNewElement=true}else{animationManager.setAnimation({el:canvasHotElement,attr:attr,container:trackerContainer,component:dataSet})}canvasHotElement.data(EVENTARGS,eventArgs).data(showHoverEffectStr,showHoverEffect).data(SETROLLOVERATTR,setRolloverAttr).data(SETROLLOUTATTR,setRolloutAttr);if(isNewElement){if(setLink){canvasHotElement.on("fc-click",clickFunc)}canvasHotElement.hover(rolloverResponseSetter(colorRangeElems),rolloutResponseSetter(colorRangeElems))}if(isHorizontal){LEDGapStartX+=sizeGapSum-ledGap/2}else{LEDGapStartY+=sizeGapSum-ledGap/2}pathCommand=[];attr={path:[M,x1,y1,L,x2,y1,x2,y2,x1,y2,Z],stroke:(0,_lib.convertColor)(gaugeBorderColor,gaugeBorderAlpha),"stroke-width":gaugeBorderThickness,"stroke-linecap":BUTT};if(!canvasBorderElement){graphics.canvasBorderElement=animationManager.setAnimation({el:"path",attr:attr,container:parentContainer,component:dataSet,label:"plotBackground"}).shadow({apply:showShadow}).toBack()}else{animationManager.setAnimation({el:canvasBorderElement,attr:attr,component:dataSet})}for(i=1;i<noOfLED;i+=1){if(isHorizontal){pathCommand.push(M,LEDGapStartX,LEDGapStartY,L,LEDGapStartX,LEDGapStartY+canvasHeight);LEDGapStartX+=sizeGapSum}else{pathCommand.push(M,LEDGapStartX,LEDGapStartY,L,LEDGapStartX+canvasWidth,LEDGapStartY);LEDGapStartY+=sizeGapSum}}attr={path:pathCommand,stroke:(0,_lib.convertColor)(gaugeFillColor,100),"stroke-width":ledGap,"stroke-linecap":BUTT};if(!canvasElementPath){canvasElementPath=animationManager.setAnimation({el:"path",attr:attr,container:parentContainer,component:dataSet,label:"plotBackground"});canvas.addGraphicalElement("canvasElementPath",canvasElementPath)}else{animationManager.setAnimation({el:canvasElementPath,attr:attr,component:dataSet})}dataSet.drawShade()};_proto.drawShade=function drawShade(){var dataSet=this,conf=dataSet.config,dataStore=dataSet.components.data,chart=dataSet.getFromEnv("chart"),caption=chart.getChildren("caption")[0],subCaption=chart.getChildren("subCaption")[0],captionHeight=caption&&caption.config.text&&caption.config.height||0,captionPadding=caption&&caption.config.text&&caption.config.captionPadding||0,subCaptionHeight=subCaption&&subCaption.config.text&&subCaption.config.height||0,chartAttr=chart.getFromEnv("dataSource").chart,animationManager=chart.getFromEnv("animationManager"),toolTipController=dataSet.getFromEnv("toolTipController"),dataLabelObj,dataLabelTooltip,displayValue,smartLabel=dataSet.getFromEnv("smartLabel"),chartConfig=chart.config,canvasLeft=chartConfig.canvasLeft,canvasTop=chartConfig.canvasTop,canvasHeight=chartConfig.canvasHeight,canvasWidth=chartConfig.canvasWidth,parentContainer=chart.getChildContainer().plotGroup,container=dataSet.getContainer("container"),gaugeFillColor,numberFormatter=dataSet.getFromEnv("number-formatter"),setValue,yPos,isAxisReverse=conf.isAxisReverse=(0,_lib.pluckNumber)(chartAttr.reverseaxis,chart.isaxisreverse),isHorizontal=conf.isHorizontal=chart.isHorizontal,attr,dataObj=dataStore[0],graphic=dataObj.graphics,config=dataObj&&dataObj.config,dataLabelContainer=dataSet.getContainer("dataLabelContainer"),dataLabelsLayer=chart.getChildContainer("datalabelsGroup"),canvas=chart.getChildren("canvas")[0],style=chart.config.dataLabelStyle,heightUsed=conf.heightUsed,lineHeight,labelBBox,labelWidth,setTooltext,lightedLed,lightedLedLength,height,width,scale=dataSet.getFromEnv("scale"),min=scale.getLimit().min;smartLabel.setStyle(style);gaugeFillColor=chart.getChildren("canvas")[0].config.gaugeFillColor;if(!container){container=dataSet.addContainer("container",animationManager.setAnimation({el:"group",attr:{name:"shade"},container:parentContainer,component:dataSet}))}if(!dataLabelContainer){dataLabelContainer=dataSet.addContainer("dataLabelContainer",animationManager.setAnimation({el:"group",attr:{name:"datalabel"},container:dataLabelsLayer,component:dataSet,label:"labelGroup"}))}setValue=numberFormatter.getCleanValue(config.setValue);if(!dataObj.graphics){dataObj.graphics={}}lightedLed=(setValue-min)/conf.perLEDValueLength;lightedLedLength=mathRound(lightedLed)*conf.sizeGapSum-conf.ledGap;height=Math.ceil(canvasHeight-lightedLedLength);width=Math.ceil(canvasWidth-lightedLedLength);if(isAxisReverse&&!isHorizontal){attr={x:canvasLeft,y:canvasTop+lightedLedLength,width:canvasWidth,height:height,r:0,"stroke-width":0,fill:(0,_lib.convertColor)(gaugeFillColor,50)}}else if(!isAxisReverse&&!isHorizontal){attr={x:canvasLeft,y:canvasTop,width:canvasWidth,height:height,r:0,"stroke-width":0,fill:(0,_lib.convertColor)(gaugeFillColor,50)}}else if(!isAxisReverse&&isHorizontal){attr={x:canvasLeft+lightedLedLength,y:canvasTop,width:width,height:canvasHeight,r:0,"stroke-width":0,fill:(0,_lib.convertColor)(gaugeFillColor,50)}}else if(isAxisReverse&&isHorizontal){attr={x:canvasLeft,y:canvasTop,width:width,height:canvasHeight,r:0,"stroke-width":0,fill:(0,_lib.convertColor)(gaugeFillColor,50)}}dataObj.graphics.element=animationManager.setAnimation({el:dataObj.graphics.element||"rect",attr:attr,container:container,component:dataSet,label:"plotRect"});setTooltext=config.setTooltext===_lib.BLANK||config.setTooltext===UNDEF?config.toolTipValue:config.setTooltext;if(conf.showTooltip){toolTipController.enableToolTip(canvas._graphics.canvasHotElement,setTooltext)}else{toolTipController.disableToolTip(canvas._graphics.canvasHotElement)}lineHeight=parseInt(style.lineHeight,10);yPos=lineHeight>heightUsed?chartConfig.height-chartConfig.marginBottom-heightUsed+lineHeight/2:chartConfig.height-chartConfig.marginBottom-lineHeight/2;yPos-=chartConfig.borderWidth;yPos-=(chart._manageActionBarSpace&&chart._manageActionBarSpace(config.availableHeight*.225)||{}).bottom;if(caption.config.isOnTop===0){yPos-=captionHeight+subCaptionHeight+captionPadding}graphic=dataObj.graphics;if(config.displayValue!==BLANKSTRING&&config.displayValue!==UNDEF&&conf.showValue){dataLabelObj=smartLabel.getSmartText(config.displayValue,chartConfig.width,conf.heightUsed);displayValue=dataLabelObj.text;dataLabelTooltip=dataLabelObj.tooltext||BLANKSTRING;attr={text:displayValue,"text-anchor":POSITION_MIDDLE,x:canvasWidth/2+canvasLeft,y:yPos,"vertical-align":POSITION_MIDDLE,fill:style.color,direction:config.textDirection,"text-bound":[style.backgroundColor,style.borderColor,style.borderThickness,style.borderPadding,style.borderRadius,style.borderDash]};graphic.label=animationManager.setAnimation({el:graphic.label||"text",attr:attr,container:dataLabelContainer,component:dataSet,label:"text"});if(conf.showTooltip){toolTipController.enableToolTip(graphic.label,dataLabelTooltip)}else{toolTipController.disableToolTip(graphic.label)}labelBBox=graphic.label.getBBox();if(labelBBox.x+chartConfig.marginLeft<0){labelWidth=labelBBox.width-chartConfig.marginLeft;if(chartConfig.width<labelWidth){labelWidth=chartConfig.width-chartConfig.marginLeft}attr={x:labelWidth/2};animationManager.setAnimation({el:graphic.label,attr:attr,component:dataSet,label:"text"})}}else{graphic.label&&toolTipController.disableToolTip(graphic.label);graphic.label=graphic.label&&animationManager.setAnimation({el:graphic.label,component:dataSet})}};return LedDataset}(_bullet.default);var _default=LedDataset;exports.default=_default;