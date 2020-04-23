"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.ParetoLineDataset=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _line=_interopRequireDefault(require("../line"));var _lib=require("@fusioncharts/core/src/lib");var PLOTBORDERCOLOR="plotBorderColor",SHOWSHADOW="showShadow",UNDEF,math=Math,mathMin=math.min,mathMax=math.max,mathAbs=math.abs,HUNDREDSTRING="100";var ParetoLineDataset=function(_LineDataset){(0,_inheritsLoose2.default)(ParetoLineDataset,_LineDataset);function ParetoLineDataset(){return _LineDataset.apply(this,arguments)||this}var _proto=ParetoLineDataset.prototype;_proto.configureAttributes=function configureAttributes(datasetJSON){if(!datasetJSON){return false}this.trimData(datasetJSON);this.config.JSONData=datasetJSON;var dataSet=this,chart=dataSet.getFromEnv("chart"),conf=dataSet.config,xAxis=dataSet.getFromEnv("xAxis"),JSONData=conf.JSONData,setDataArr=JSONData.data,setDataLen=setDataArr&&setDataArr.length,len=setDataLen,chartAttr=dataSet.getFromEnv("chart-attrib"),colorM=dataSet.getFromEnv("color-manager"),showTooltip=(0,_lib.pluckNumber)(chartAttr.showtooltip,1),yAxisName=(0,_lib.parseUnsafeString)(chartAttr.yaxisname),xAxisName=(0,_lib.parseUnsafeString)(chartAttr.xaxisname),formatedVal,parserConfig,setTooltext,macroIndices,toolText,isRoundEdges,setData,setValue,dataObj,config,dataStore=dataSet.components.data,numberFormatter=dataSet.getFromEnv("number-formatter"),is3D=chart.config.is3D,enableAnimation,lineDashStyle,i,maxValue=-Infinity,minValue=+Infinity,displayValuePercent,sumValue=0,value,catObj,cleanArr=[],cumulativeSumValue=0,tooltipSepChar=conf.tootipSepChar=(0,_lib.pluck)(chartAttr.tooltipsepchar,", "),anchorProps;conf.defaultPadding={left:.5,right:.5};conf.enableAnimation=enableAnimation=(0,_lib.pluckNumber)(chartAttr.animation,chartAttr.defaultanimation,1);conf.animation=!enableAnimation?false:{duration:(0,_lib.pluckNumber)(chartAttr.animationduration,1)*1e3};conf.showTooltip=(0,_lib.pluckNumber)(chartAttr.showtooltip,1);conf.valuePadding=(0,_lib.pluckNumber)(chartAttr.valuepadding,2);conf.showTextOutline=(0,_lib.pluckNumber)(chartAttr.textoutline,0);conf.rotateValues=(0,_lib.pluckNumber)(chartAttr.rotatevalues)?270:0;conf.showHoverEffect=(0,_lib.pluckNumber)(chartAttr.plothovereffect,chartAttr.showhovereffect,UNDEF);conf.showShadow=isRoundEdges||is3D?(0,_lib.pluckNumber)(chartAttr.showshadow,1):(0,_lib.pluckNumber)(chartAttr.showshadow,colorM.getColor(SHOWSHADOW));conf.useDataPlotColorForLabels=(0,_lib.pluckNumber)(chartAttr.usedataplotcolorforlabels,0);conf.use3dlineshift=(0,_lib.pluckNumber)(chartAttr.use3dlineshift,chart.use3dlineshift);conf.drawLine=1;conf.linecolor=(0,_lib.getFirstColor)((0,_lib.pluck)(chartAttr.linecolor,colorM.getColor(PLOTBORDERCOLOR)));conf.linethickness=(0,_lib.pluckNumber)(chartAttr.linethickness,2);conf.linealpha=(0,_lib.pluck)(chartAttr.linealpha,HUNDREDSTRING);conf.linedashed=(0,_lib.pluckNumber)(chartAttr.linedashed,0);conf.linedashlen=(0,_lib.pluckNumber)(JSONData.linedashlen,chartAttr.linedashlen,5);conf.linedashgap=(0,_lib.pluckNumber)(JSONData.linedashgap,chartAttr.linedashgap,4);lineDashStyle=(0,_lib.getDashStyle)(conf.linedashlen,conf.linedashgap);conf.lineDashStyle=conf.linedashed?lineDashStyle:"none";conf.drawanchors=(0,_lib.pluckNumber)(chartAttr.drawanchors,chartAttr.showanchors);conf.anchorbgcolor=(0,_lib.pluck)(chartAttr.anchorbgcolor,colorM.getColor("anchorBgColor"));conf.anchorbordercolor=(0,_lib.pluck)(chartAttr.anchorbordercolor,conf.linecolor);conf.anchorradius=(0,_lib.pluckNumber)(chartAttr.anchorradius,3);conf.anchoralpha=(0,_lib.pluck)(chartAttr.anchoralpha);conf.anchorbgalpha=(0,_lib.pluck)(chartAttr.anchorbgalpha,100);conf.anchorborderthickness=(0,_lib.pluck)(chartAttr.anchorborderthickness,1);conf.anchorsides=(0,_lib.pluck)(chartAttr.anchorsides,0);conf.anchorimageurl=(0,_lib.pluck)(chartAttr.anchorimageurl);conf.anchorimagealpha=(0,_lib.pluckNumber)(chartAttr.anchorimagealpha,100);conf.anchorimagescale=(0,_lib.pluckNumber)(chartAttr.anchorimagescale,100);conf.anchorimagepadding=(0,_lib.pluckNumber)(chartAttr.anchorimagepadding,1);conf.anchorstartangle=(0,_lib.pluckNumber)(chartAttr.anchorstartangle,90);conf.parentYAxis=1;conf.valuePosition=(0,_lib.pluck)(chartAttr.valueposition,"auto");conf.showvalues=conf.showValues=(0,_lib.pluckNumber)(chartAttr.showlinevalues,chartAttr.showvalues,1);dataSet.setState("visible",(0,_lib.pluckNumber)(JSONData.visible,1)===1);dataSet.setState("dirty",true);conf.shadow={opacity:conf.showShadow?conf.linealpha/100:0};conf.showCumulativeLine=(0,_lib.pluckNumber)(chartAttr.showcumulativeline,1);conf.maxRadius=-Infinity;if(!dataStore){dataStore=dataSet.components.data=[]}for(i=0;i<len;i++){value=mathAbs(numberFormatter.getCleanValue(setDataArr[i].value));sumValue+=value;cleanArr[i]=(0,_lib.extend2)({},setDataArr[i]);cleanArr[i].value=value}cleanArr.sort((function(a,b){return b.value-a.value}));conf.imageCount=0;for(i=0;i<len;i++){setData=cleanArr[i];dataObj=dataStore[i];if(!dataObj){dataObj=dataStore[i]={graphics:{}}}if(!dataObj.config){config=dataStore[i].config={}}setValue=mathAbs(numberFormatter.getCleanValue(setData.value));if(setValue===null){continue}config=dataObj&&dataObj.config;catObj=xAxis.getLabel(i);config.label=(0,_lib.getValidValue)((0,_lib.parseUnsafeString)((0,_lib.pluck)(catObj.label)));config.showValue=(0,_lib.pluckNumber)(setData.showvalue,conf.showValues);config.setValue=setValue;config.setLink=(0,_lib.pluck)(setData.link);config.setDisplayValue=(0,_lib.parseUnsafeString)(setData.displayvalue);cumulativeSumValue+=config.setValue;config.dataLabelStyle=dataSet._configureDataLabelStyle(setData);setValue=config.setValue=cumulativeSumValue/sumValue*100;displayValuePercent=numberFormatter.percentValue(setValue);config.toolTipValue=displayValuePercent;config.displayValue=displayValuePercent;config.valuePosition=(0,_lib.pluck)(setData.valueposition,conf.valuePosition);config.anchorProps=this._parseAnchorProperties(i,cleanArr);config.hoverEffects=this._parseHoverEffectOptions(dataObj);anchorProps=config.anchorProps;conf.maxRadius=Math.max(conf.maxRadius,anchorProps.radius+anchorProps.borderThickness/2);config._x=i;config._y=setValue;formatedVal=config.toolTipValue;maxValue=mathMax(maxValue,setValue);minValue=mathMin(minValue,setValue);if(!showTooltip){toolText=false}else{if(!conf.showTooltip){toolText=false}else if(setTooltext!==UNDEF){parserConfig={formattedValue:formatedVal,label:config.label,yaxisName:yAxisName,xaxisName:xAxisName,cumulativeValue:cumulativeSumValue,cumulativeDataValue:numberFormatter.dataLabels(cumulativeSumValue),cumulativePercentValue:displayValuePercent,sum:numberFormatter.dataLabels(sumValue),unformattedSum:sumValue};macroIndices=[1,2,3,5,6,7,20,21,22,23,24,25];toolText=(0,_lib.parseTooltext)(setTooltext,macroIndices,parserConfig,setData,chartAttr)}else{toolText=config.label?config.label+tooltipSepChar+config.toolTipValue:""}config.toolText=toolText}config.toolText=toolText;config.tooltext=setTooltext;config.setTooltext=toolText}conf.maxValue=maxValue;conf.minValue=minValue};return ParetoLineDataset}(_line.default);exports.ParetoLineDataset=ParetoLineDataset;