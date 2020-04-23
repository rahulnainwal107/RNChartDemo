"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _pie2d=_interopRequireDefault(require("@fusioncharts/charts/src/dataset/pie2d"));var _lib=require("@fusioncharts/core/src/lib");var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _index=_interopRequireDefault(require("./index.animation"));var _schedular=require("@fusioncharts/core/src/schedular");var _redraphaelShapes=_interopRequireDefault(require("@fusioncharts/core/src/_internal/redraphael/redraphael-shapes/redraphael-shapes.ringpath"));var Raphael=(0,_dependencyManager.getDep)("redraphael","plugin"),BLANK="",NORMALSTRING="normal",COLOR_FFFFFF="FFFFFF",COLOR_000000="000000",HUNDRED_PERCENT="100%",ZERO_STR="0",pInt=function pInt(s,mag){return parseInt(s,mag||10)},DASH_DEF="none",UNDEF,ROLLOVER="DataPlotRollOver",ROLLOUT="DataPlotRollOut",POINTER="pointer",EVENTARGS="eventArgs",PX="px",INNERRADIUS=/^[0-9]+\%?$|^([0-9]+[.][0-9]+)\%?$/,calculateInnerRadius=function calculateInnerRadius(innerRadius,pieRadius){var innerRadiusLength=innerRadius&&innerRadius.length,calculatedInnerRadius;if(!innerRadius){return 0}if(innerRadius.charAt(innerRadiusLength-1)==="%"){calculatedInnerRadius=(0,_lib.pluckNumber)(pieRadius)*((0,_lib.pluckNumber)(innerRadius.split("%")[0])/100)}else{calculatedInnerRadius=(0,_lib.pluckNumber)(innerRadius)}if(calculatedInnerRadius<pieRadius){return calculatedInnerRadius}return 0};(0,_dependencyManager.addDep)({name:"multilevelpieAnimation",type:"animationRule",extension:_index.default});(0,_redraphaelShapes.default)(Raphael);var MultiLevelPieDataset=function(_Pie2DDataset){(0,_inheritsLoose2.default)(MultiLevelPieDataset,_Pie2DDataset);function MultiLevelPieDataset(){var _this;_this=_Pie2DDataset.call(this)||this;_this.components={data:[]};_this.graphics={};return _this}var _proto=MultiLevelPieDataset.prototype;_proto.getType=function getType(){return"dataset"};_proto.getName=function getName(){return"multiLevelPie"};_proto.configureAttributes=function configureAttributes(datasetJSON){if(!datasetJSON){return false}this.config.JSONData=datasetJSON;var fontBdrColor,dataSet=this,chart=dataSet.getFromEnv("chart"),chartConfig=chart.config,dataSetConfig=dataSet.config||(dataSet.config={}),dataLabels=dataSetConfig.dataLabelOptions||(dataSetConfig.dataLabelOptions={}),piePlotOptions=dataSetConfig.piePlotOptions,style=chart.config.style,chartAttrs=chart.getFromEnv("dataSource").chart,centerAngle=(0,_lib.pluckNumber)(-chartAttrs.centerangle,180),totalAngle=(0,_lib.pluckNumber)(chartAttrs.totalangle,360),tranverseToRoot=function tranverseToRoot(dataInstance,evtType){var dataObj=dataInstance;while(dataObj.graphics.element){dataObj.graphics.element.attr({fill:evtType==="mouseover"?dataSetConfig.hoverFillColor:(dataObj.config||this.data("plotItem")).color});dataObj=dataObj.config.parent}},traverseAllChildren=function traverseAllChildren(dataObj,evtType){var k;dataObj.graphics.element.attr({fill:evtType==="mouseover"?dataSetConfig.hoverFillColor:(dataObj.config||this.data("plotItem")).color});for(k=0;k<(dataObj.components.data&&dataObj.components.data.length);k++){traverseAllChildren.call(this,dataObj.components.data[k],evtType)}},mouseEvtHandler=function mouseEvtHandler(evtType){if(!dataSetConfig.useHoverColor){return}var point=this.data("plotItem"),selfRef=point.selfRef;if(!dataSetConfig.highlightParentPieSlices&&!dataSetConfig.highlightChildPieSlices){selfRef.graphics.element.attr({fill:evtType==="mouseover"?dataSetConfig.hoverFillColor:(selfRef.config||point).color})}else if(!dataSetConfig.highlightParentPieSlices&&dataSetConfig.highlightChildPieSlices){traverseAllChildren.call(this,selfRef,evtType)}else if(dataSetConfig.highlightParentPieSlices&&!dataSetConfig.highlightChildPieSlices){tranverseToRoot.call(this,selfRef,evtType)}else if(dataSetConfig.highlightParentPieSlices&&dataSetConfig.highlightChildPieSlices){tranverseToRoot.call(this,selfRef,evtType);traverseAllChildren.call(this,selfRef,evtType)}};dataSetConfig.enableAnimation=(0,_lib.pluckNumber)(chartAttrs.animation,chartAttrs.defaultanimation,1);dataSetConfig.animation=!dataSetConfig.enableAnimation?false:{duration:(0,_lib.pluckNumber)(chartAttrs.animationduration,chartAttrs.moveduration,1)*1e3};dataSetConfig.showShadow=(0,_lib.pluckNumber)(chartAttrs.showshadow,0);dataSetConfig.useHoverColor=Boolean((0,_lib.pluckNumber)(chartAttrs.usehovercolor,1));dataSetConfig.showTextOutline=Boolean((0,_lib.pluckNumber)(chartAttrs.textoutline,0));dataSetConfig.hoverFillColor=(0,_lib.convertColor)((0,_lib.pluck)(chartAttrs.hoverfillcolor,"FF5904"),(0,_lib.pluckNumber)(chartAttrs.hoverfillalpha,100));fontBdrColor=(0,_lib.getFirstValue)(chartAttrs.valuebordercolor,BLANK);fontBdrColor=fontBdrColor?(0,_lib.convertColor)(fontBdrColor,(0,_lib.pluckNumber)(chartAttrs.valueborderalpha,chartAttrs.valuebgalpha,chartAttrs.valuealpha,100)):BLANK;!dataLabels.style&&(dataLabels.style={fontFamily:(0,_lib.pluck)(chartAttrs.valuefont,style.fontFamily),fontSize:(0,_lib.pluckNumber)(chartAttrs.valuefontsize,pInt(style.fontSize,10))+PX,color:(0,_lib.convertColor)((0,_lib.pluck)(chartAttrs.valuefontcolor,style.color),(0,_lib.pluckNumber)(chartAttrs.valuefontalpha,chartAttrs.valuealpha,100)),fontWeight:(0,_lib.pluckNumber)(chartAttrs.valuefontbold)?"bold":NORMALSTRING,fontStyle:(0,_lib.pluckNumber)(chartAttrs.valuefontitalic)?"italic":NORMALSTRING,backgroundColor:chartAttrs.valuebgcolor?(0,_lib.convertColor)(chartAttrs.valuebgcolor,(0,_lib.pluckNumber)(chartAttrs.valuebgalpha,chartAttrs.valuealpha,100)):BLANK,border:fontBdrColor||chartAttrs.valuebgcolor?(0,_lib.pluckNumber)(chartAttrs.valueborderthickness,1)+"px solid":BLANK,borderPadding:(0,_lib.pluckNumber)(chartAttrs.valueborderpadding,2),borderThickness:(0,_lib.pluckNumber)(chartAttrs.valueborderthickness,style.borderThickness,1),borderRadius:(0,_lib.pluckNumber)(chartAttrs.valueborderradius,style.borderRadius,0),borderColor:fontBdrColor,borderDash:(0,_lib.pluckNumber)(chartAttrs.valueborderdashed,0)?(0,_lib.getDashStyle)((0,_lib.pluckNumber)(chartAttrs.valueborderdashlen,4),(0,_lib.pluckNumber)(chartAttrs.valueborderdashgap,2)):DASH_DEF});!piePlotOptions&&(piePlotOptions=dataSetConfig.piePlotOptions={});piePlotOptions.allowPointSelect=false;dataSetConfig.borderAlpha=(0,_lib.pluck)(chartAttrs.plotborderalpha,chartAttrs.pieborderalpha,100);dataSetConfig.borderColor=(0,_lib.convertColor)((0,_lib.pluck)(chartAttrs.plotbordercolor,chartAttrs.piebordercolor,COLOR_FFFFFF),chartAttrs.showplotborder!==_lib.ZEROSTRING?(0,_lib.pluck)(chartAttrs.plotborderalpha,chartAttrs.pieborderalpha,100):0);dataSetConfig.rawborderColor=(0,_lib.pluck)(chartAttrs.plotbordercolor,chartAttrs.piebordercolor,COLOR_FFFFFF);dataSetConfig.showplotborder=(0,_lib.pluckNumber)(chartAttrs.showplotborder,1);dataSetConfig.showTooltip=(0,_lib.pluckNumber)(chartAttrs.showtooltip,1);dataSetConfig.borderWidth=(0,_lib.pluckNumber)(chartAttrs.pieborderthickness,chartAttrs.plotborderthickness,1);piePlotOptions.startingAngle=0;piePlotOptions.size=HUNDRED_PERCENT;dataSetConfig.highlightParentPieSlices=(0,_lib.pluckNumber)(chartAttrs.highlightparentpieslices,chartAttrs.highlightparentpienodes,1);dataSetConfig.highlightChildPieSlices=(0,_lib.pluckNumber)(chartAttrs.highlightchildpieslices,chartAttrs.highlightchildpienodes,0);dataSetConfig.showLabels=(0,_lib.pluckNumber)(chartAttrs.showlabels,1);dataSetConfig.showValues=(0,_lib.pluckNumber)(chartAttrs.showvalues,0);dataSetConfig.showValuesInTooltip=(0,_lib.pluckNumber)(chartAttrs.showvaluesintooltip,chartAttrs.showvalues,0);dataSetConfig.showPercentValues=(0,_lib.pluckNumber)(chartAttrs.showpercentvalues,chartAttrs.showpercentagevalues,0);dataSetConfig.showPercentInTooltip=(0,_lib.pluckNumber)(chartAttrs.showpercentintooltip,0);dataSetConfig.toolTipSepChar=(0,_lib.pluck)(chartAttrs.tooltipsepchar,chartAttrs.hovercapsepchar,_lib.COMMASPACE);dataSetConfig.labelSepChar=(0,_lib.parseUnsafeString)((0,_lib.pluck)(chartAttrs.labelsepchar,dataSetConfig.toolTipSepChar));dataSetConfig.tooltext=chartAttrs.plottooltext;dataSetConfig.alpha=(0,_lib.pluck)(chartAttrs.plotfillalpha,chartAttrs.piefillalpha,100);dataSetConfig.startAngle=(centerAngle-totalAngle/2)*(Math.PI/180);dataSetConfig.endtAngle=(centerAngle+totalAngle/2)*(Math.PI/180);dataSetConfig.initialAngle=dataSetConfig.endtAngle;dataSetConfig.originX=(0,_lib.pluckNumber)(chartAttrs.originx);dataSetConfig.originY=(0,_lib.pluckNumber)(chartAttrs.originy);dataSetConfig.events={mouseOver:function mouseOver(){mouseEvtHandler.call(this,"mouseover")},mouseOut:function mouseOut(){mouseEvtHandler.call(this,"mouseout")}};chartConfig.plotBorderWidth=0;chartConfig.plotBorderWidth=0;dataSetConfig.maxLevel=dataSet.addMSPieCat(dataSet.config.JSONData,1,dataSet,dataSetConfig.startAngle,dataSetConfig.endtAngle);dataSetConfig.pieRadius=parseInt(chartAttrs.pieradius,10);dataSetConfig.innerRadius=ZERO_STR;INNERRADIUS.test(chartAttrs.innerradius)&&(dataSetConfig.innerRadius=(0,_lib.pluck)(chartAttrs.innerradius));dataLabels.distance=0;dataLabels.placeLabelsInside=true};_proto.removalFn=function removalFn(ele,prop){var dataSet=this,hideFN=function hideFN(){this.remove()};dataSet.getFromEnv("animationManager").setAnimation({el:ele,label:prop==="element"?"ringpath":"label",component:dataSet,callback:hideFN})};_proto.removeGraphics=function removeGraphics(obj){var i,prop,dataSet=this,childData=obj.components&&obj.components.data,len,graphics=obj.graphics;if(childData){len=childData.length;for(i=0;i<len;i+=1){dataSet.removeGraphics(childData[i])}}if(obj.graphics){for(prop in graphics){if(graphics.hasOwnProperty(prop)){dataSet.removalFn(obj.graphics[prop],prop)}}}};_proto.removeChild=function removeChild(removalStore,doHide,type){var i,elemObj,dataSet=this;if(removalStore.length){for(i=0;i<removalStore.length;i+=1){elemObj=removalStore[i];if(type){dataSet.removalFn(elemObj,doHide,type)}else{dataSet.removeGraphics(elemObj,doHide)}}}else{for(i in removalStore){dataSet.removeChild(removalStore[i],doHide,i)}}};_proto.addMSPieCat=function addMSPieCat(catArr,level,parentObj,startAngle,endAngle){var dataObj,dataObjLen,cat=(0,_lib.extend2)([],catArr),catObjLen,catLen=cat.length,dataSet=this,data=parentObj.components.data,dataSetConfig=dataSet.config,numberFormatter=dataSet.getFromEnv("number-formatter"),sharePercent,totalValue=0,catObj,catVal,i,label,labelSepChar=dataSetConfig.labelSepChar,fillalpha,valueStr,pValueStr,toolText,displayValue,rawColor,showLabel,showPlotBorder,maxLevel=level,dataLength=data.length,removalFn=function removalFn(){dataSet.removeChild.apply(dataSet,arguments)},catLength=cat.length,totAngle=endAngle-startAngle,tempAngle,cumilative=0,preDataOldEndAngle;for(i=0;i<catLen;i+=1){catObj=cat[i];catObj._userValue=numberFormatter.getCleanValue(catObj.value,true);catObj._value=(0,_lib.pluckNumber)(catObj._userValue,1);totalValue+=catObj._value}totalValue=totalValue||1;sharePercent=totAngle/totalValue;for(i=catLen-1;i>=0;i-=1){catObj=cat[i];catVal=sharePercent*catObj._value;label=(0,_lib.parseUnsafeString)((0,_lib.pluck)(catObj.label,catObj.name));valueStr=catObj._userValue!==null?numberFormatter.dataLabels(catObj._userValue):BLANK;pValueStr=numberFormatter.percentValue(catObj._value/totalValue*100);fillalpha=(0,_lib.pluckNumber)(catObj.alpha,dataSetConfig.alpha);showLabel=(0,_lib.pluckNumber)(catObj.showlabel,dataSetConfig.showLabels);showPlotBorder=(0,_lib.pluckNumber)(dataSetConfig.showplotborder,1);displayValue=showLabel===1?label:BLANK;if((0,_lib.pluckNumber)(catObj.showvalue,dataSetConfig.showValues)===1){if(dataSetConfig.showPercentValues){displayValue+=displayValue!==BLANK?labelSepChar+pValueStr:pValueStr}else if(valueStr!==UNDEF&&valueStr!==BLANK){displayValue+=displayValue!==BLANK?labelSepChar+valueStr:valueStr}}toolText=dataSetConfig.showTooltip?(0,_lib.parseUnsafeString)((0,_lib.pluck)(catObj.tooltext,catObj.hovertext,dataSetConfig.tooltext),false):UNDEF;if(toolText===BLANK){toolText=label;if(dataSetConfig.showValuesInTooltip){if(dataSetConfig.showPercentInTooltip){toolText+=toolText!==BLANK?labelSepChar+pValueStr:pValueStr}else if(valueStr!==UNDEF&&valueStr!==BLANK){toolText+=toolText!==BLANK?labelSepChar+valueStr:valueStr}}}else{toolText=(0,_lib.parseTooltext)(toolText,[1,2,3,14],{percentValue:pValueStr,label:label,formattedValue:valueStr},catObj)}dataObj=data[i];tempAngle=startAngle+cumilative;cumilative+=catVal;if(!dataObj){dataObj=data[i]={components:{data:[]},config:{},graphics:{}}}if(dataObj.graphics.element){preDataOldEndAngle=dataObj.config.startAngle+dataObj.config.angleStrech}rawColor=catObj.color||dataSet.getFromEnv("color-manager").getPlotColor();dataObj.config={initialAngle:preDataOldEndAngle||(parentObj.config||parentObj.config).initialAngle,startAngle:tempAngle,alpha:fillalpha,angleStrech:catVal,level:level,displayValue:displayValue,showLabel:showLabel,showPlotBorder:showPlotBorder,toolText:toolText,link:(0,_lib.getValidValue)(catObj.link),rawColor:rawColor,doNotSlice:true,color:(0,_lib.convertColor)(rawColor,fillalpha),borderAlpha:(0,_lib.pluck)(catObj.plotborderalpha,dataSetConfig.borderAlpha),borderWidth:(0,_lib.pluckNumber)(catObj.borderwidth,dataSetConfig.borderWidth),borderColor:(0,_lib.pluck)(catObj.bordercolor,dataSetConfig.borderColor),rawborderColor:(0,_lib.pluck)(catObj.bordercolor,dataSetConfig.rawborderColor),dashStyle:(0,_lib.pluckNumber)(catObj.valueborderdashed,0)?(0,_lib.getDashStyle)((0,_lib.pluckNumber)(catObj.borderdashlen,4),(0,_lib.pluckNumber)(catObj.borderdashgap,2)):DASH_DEF,shadow:{opacity:Math.round(fillalpha>50?fillalpha*fillalpha*fillalpha*1e-4:fillalpha*fillalpha*.01)*.01},isSingleTon:!(catLen>1)};dataObj.config.parent=parentObj;dataObj.config.dataLabelStyle=dataSet._configureDataLabelStyle(catObj);if(catObj.category){maxLevel=Math.max(maxLevel,dataSet.addMSPieCat(catObj.category,level+1,dataObj,tempAngle,catVal+tempAngle));if((dataObjLen=dataObj.components.data.length)>(catObjLen=catObj.category.length)){removalFn(dataObj.components.data.splice(dataObjLen-1,catObjLen))}}else{dataObjLen=dataObj.components.data.length;if(dataObjLen){removalFn(dataObj.components.data.splice(0,dataObjLen))}}}if(dataLength>catLength){removalFn(data.splice(catLength))}return maxLevel};_proto.parsePlotAttributes=function parsePlotAttributes(parentInstance){var angle,parentObj=parentInstance,_textAttrs,centerDistance,level,dataSet=this,dataSetConfig=dataSet.config||{},chart=dataSet.getFromEnv("chart"),chartConfig=chart.config,len=dataSet.components.data.length,seriesDataLabelsStyle=chartConfig.dataLabelStyle,setDataLabelStyle,canvasWidth=chartConfig.canvasWidth,canvasHeight=chartConfig.canvasHeight,cx=(0,_lib.pluckNumber)(dataSetConfig.originX,chartConfig.canvasLeft+canvasWidth*.5),cy=(0,_lib.pluckNumber)(dataSetConfig.originY,chartConfig.canvasTop+canvasHeight*.5),r,r2,color,val,displayValue,setLink,angle1,angle2,i,setGraphics,setConfig,element,pieSize=(0,_lib.pluckNumber)(dataSetConfig.pieRadius*2,Math.min(canvasWidth,canvasHeight)),innerRadius=calculateInnerRadius(dataSetConfig.innerRadius,pieSize/2),pool=dataSet.config.pool||(dataSet.config.pool={}),seriesHalfWidth=(pieSize-2*innerRadius)/(2*dataSetConfig.maxLevel);dataSetConfig.innerSize=innerRadius*2;if(!parentObj){parentObj=dataSet}len=parentObj.components.data.length;for(i=0;i<len;i+=1){dataSet.parsePlotAttributes(parentObj.components.data[i])}setConfig=parentObj.config;level=setConfig.level;if(level){r=level*seriesHalfWidth+innerRadius;r2=(level-1)*seriesHalfWidth+innerRadius;setGraphics=parentObj.graphics;val=setConfig.angleStrech;displayValue=setConfig.displayValue;setLink=!!setConfig.link;color=setConfig.color;angle1=setConfig.startAngle;angle2=angle1+setConfig.angleStrech;element=setGraphics.element;if(pool.element&&pool.element.length){element=setGraphics.element=element||pool.element.shift()}setConfig.plotItem={chart:chart,link:setConfig.link,value:val,color:color,labelText:displayValue,graphics:{element:element},selfRef:parentObj};setConfig.eventArgs={alpha:setConfig.alpha,borderAlpha:setConfig.borderAlpha,link:setConfig.link,label:setConfig.displayValue,showLabel:setConfig.showLabel,toolText:setConfig.toolText,color:setConfig.rawColor,borderColor:setConfig.rawborderColor,borderThickness:setConfig.borderWidth,showPlotBorder:setConfig.showPlotBorder};setConfig.props={element:{attr:{ringpath:[cx,cy,r,r2,angle1,angle2],"stroke-width":setConfig.borderWidth,stroke:setConfig.borderColor,fill:(0,_lib.toRaphaelColor)(setConfig.color),"stroke-dasharray":setConfig.dashStyle,cursor:setLink?POINTER:_lib.BLANKSTRING}}};if(displayValue!==UNDEF&&displayValue!==_lib.BLANKSTRING){angle=(angle1+angle2)/2;centerDistance=r2===0&&setConfig.isSingleTon?0:r2+(r-r2)/2;if(!(_textAttrs=setConfig._textAttrs)){_textAttrs=setConfig._textAttrs={}}setDataLabelStyle=setConfig.dataLabelStyle;_textAttrs.text=displayValue;_textAttrs.fill=setDataLabelStyle.color||COLOR_000000;_textAttrs.direction=chartConfig.textDirection;_textAttrs.cursor=setLink?POINTER:_lib.BLANKSTRING;_textAttrs.x=cx+centerDistance*Math.cos(angle);_textAttrs.y=cy+centerDistance*Math.sin(angle);_textAttrs["line-height"]=seriesDataLabelsStyle.lineHeight;_textAttrs["text-bound"]=[setDataLabelStyle.backgroundColor,setDataLabelStyle.borderColor,seriesDataLabelsStyle.borderThickness,seriesDataLabelsStyle.borderPadding,seriesDataLabelsStyle.borderRadius,seriesDataLabelsStyle.borderDash]}}};_proto.parseLabelAttributes=function parseLabelAttributes(parentInstance){var dataSet=this,parentObj=parentInstance,len=dataSet.components.data.length,displayValue,i,setConfig;!parentObj&&(parentObj=dataSet);len=parentObj.components.data.length;for(i=0;i<len;i+=1){dataSet.parseLabelAttributes(parentObj.components.data[i])}setConfig=parentObj.config;displayValue=setConfig.displayValue;if(setConfig.level){if(displayValue!==UNDEF&&displayValue!==_lib.BLANKSTRING){setConfig.props.label={attr:setConfig._textAttrs}}}};_proto.draw=function draw(parentInstance){var dataSet=this,parentObj=parentInstance,dataSetConfig=dataSet.config||{},chart=dataSet.getFromEnv("chart"),dataSetComponents=dataSet.components,len=dataSetComponents.data.length,i,setGraphics,setConfig,element,dataLabelsLayer=chart.getChildContainer("datalabelsGroup"),events=dataSetConfig.events||{},plotHoverFN=function plotHoverFN(e){var o=this,mouseOver=events.mouseOver,plotItem=o.plotItem||o.data("plotItem"),dataset=plotItem.chart.getDatasets()[0];chart.plotEventHandler(o,e,ROLLOVER);mouseOver&&mouseOver.call(o);dataset.fireEvent("datasetrollover",{pValue:plotItem.pValue,value:plotItem.value,displayValue:setConfig.displayValue})},plotMouseOut=function plotMouseOut(e){var o=this,mouseOut=events.mouseOut,plotItem=o.plotItem||o.data("plotItem"),chartAPI=plotItem.chart,dataset=chartAPI.getDatasets()[0];chartAPI.plotEventHandler(o,e,ROLLOUT);mouseOut&&mouseOut.call(o);dataset.fireEvent("datasetrollout",{pValue:plotItem.pValue,value:plotItem.value,displayValue:setConfig.displayValue})},clickFunc=function clickFunc(setDataArr){var ele=this;chart.plotEventHandler(ele,setDataArr)},pool=dataSet.config.pool||(dataSet.config.pool={}),removeDataArr=dataSetComponents.removeDataArr;removeDataArr&&removeDataArr.length&&dataSet.removeElement();if(!parentObj){parentObj=dataSet;dataLabelsLayer.css(chart.config.dataLabelStyle)}len=parentObj.components.data.length;for(i=0;i<len;i+=1){dataSet.draw(parentObj.components.data[i])}setConfig=parentObj.config;if(setConfig.level){setGraphics=parentObj.graphics;element=setGraphics.element;if(pool.element&&pool.element.length){element=setGraphics.element=element||pool.element.shift()}element=setGraphics.element=dataSet.getFromEnv("animationManager").setAnimation({el:setGraphics.element||"ringpath",attr:setConfig.props.element.attr,container:chart.getChildContainer("plotGroup"),component:dataSet,state:"appearing",label:"ringpath"});element.shadow(dataSetConfig.showShadow&&!!setConfig.shadow).data("plotItem",setConfig.plotItem).data(EVENTARGS,setConfig.eventArgs).on("fc-mouseover",plotHoverFN).on("fc-mouseout",plotMouseOut).on("fc-click",clickFunc);dataSet.getFromEnv("toolTipController").enableToolTip(element,setConfig.toolText);if(!i&&!dataSetConfig._drawn){dataSetConfig._drawn=true;dataLabelsLayer.show();dataSet.addJob("labelJob",dataSet.drawLabel.bind(dataSet),_schedular.priorityList.label)}}else{dataSetConfig._drawn&&dataSet.drawLabel();dataSet.removeChild(dataSet.config.pool,true)}};_proto.drawLabel=function drawLabel(parentInstance){var dataSet=this,config=dataSet.config,parentObj=parentInstance,chart=dataSet.getFromEnv("chart"),animationManager=dataSet.getFromEnv("animationManager"),chartConfig=chart.config,labelAttrs,len=dataSet.components.data.length,tooltipOptions=chartConfig.tooltip||{},isTooltip=tooltipOptions&&tooltipOptions.enabled!==false,toolText,displayValue,tempLabel,i,setGraphics,setConfig,label,events=(config||{}).events||{},labelHoverFN=function labelHoverFN(e){var o=this,mouseOver=events.mouseOver;chart.plotEventHandler(o,e,ROLLOVER);mouseOver&&mouseOver.call(o)},labelOutFN=function labelOutFN(e){var o=this,mouseOut=events.mouseOut;chart.plotEventHandler(o,e,ROLLOUT);mouseOut&&mouseOut.call(o)},clickFunc=function clickFunc(setDataArr){var ele=this;chart.plotEventHandler(ele,setDataArr)},pool=config.pool||(config.pool={}),dataLabelsLayer=chart.getChildContainer("datalabelsGroup");dataLabelsLayer.show();!parentObj&&(parentObj=dataSet);len=parentObj.components.data.length;for(i=0;i<len;i+=1){dataSet.drawLabel(parentObj.components.data[i])}setConfig=parentObj.config;displayValue=setConfig.displayValue;if(setConfig.level){setGraphics=parentObj.graphics;tempLabel=setGraphics.label;if(displayValue!==UNDEF&&displayValue!==_lib.BLANKSTRING){label=setGraphics.label;if(pool.label&&pool.label.length){label=setGraphics.label=label||pool.label.shift()}labelAttrs=setConfig.props.label.attr;label=setGraphics.label=animationManager.setAnimation({el:tempLabel||"text",attr:labelAttrs,container:dataLabelsLayer,component:dataSet,state:"appearing",label:"text"});label.outlineText(config.showTextOutline,labelAttrs.fill);if(!tempLabel){label.on("fc-click",clickFunc).on("fc-mouseout",labelOutFN).on("fc-mouseover",labelHoverFN)}label.data("plotItem",setConfig.plotItem).data(EVENTARGS,setConfig.eventArgs);isTooltip&&dataSet.getFromEnv("toolTipController").enableToolTip(label,toolText)}else{tempLabel&&animationManager.setAnimation({el:tempLabel,component:dataSet,label:"text"});delete setGraphics.label}}else{dataSet.removeChild(dataSet.config.pool,true)}};return MultiLevelPieDataset}(_pie2d.default);var _default=MultiLevelPieDataset;exports.default=_default;