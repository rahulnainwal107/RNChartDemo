"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _lib=require("@fusioncharts/core/src/lib");var _lineargauge=_interopRequireDefault(require("../_internal/lineargauge"));var _bulletLedCommon=require("../_internal/bullet-led-common");var _bullet=_interopRequireDefault(require("../../dataset/bullet"));var _vledDataset=_interopRequireDefault(require("../../factories/vled-dataset"));var _equal=_interopRequireDefault(require("@fusioncharts/utils/src/string/equal"));var UNDEF,GUTTER_PADDING=2,BLANKSTRING=_lib.BLANK,POSITION_START=_lib.preDefStr.POSITION_START,POSITION_END=_lib.preDefStr.POSITION_END,POSITION_BOTTOM=_lib.preDefStr.POSITION_BOTTOM,POSITION_MIDDLE=_lib.preDefStr.POSITION_MIDDLE,math=Math,mathCeil=math.ceil,mathMax=math.max,zeroCommaHundredStr="0,100",HBULLET="hbullet",FRIENDLY_NAME="Horizontal Bullet Gauge",BULLET="bullet",TOP="top";var Hbullet=function(_LinearGauge){(0,_inheritsLoose2.default)(Hbullet,_LinearGauge);Hbullet.getName=function getName(){return"Hbullet"};function Hbullet(){var _this;_this=_LinearGauge.call(this)||this;_this.defaultSeriesType=HBULLET;_this.gaugeType=1;_this.defaultCaptionPadding=5;_this.rendererId=HBULLET;_this.isHorizontal=true;_this.config.isAxisOpposite=false;_this.config.scalePosition=POSITION_BOTTOM;_this.config.canBeScalePosition=TOP;_this.rtManageSpace=true;_this.ticksOnRight=0;_this.hasCanvas=true;_this.isAxisReverse=false;_this.defaultPaletteOptions={paletteColors:[["A6A6A6","CCCCCC","E1E1E1","F0F0F0"],["A7AA95","C4C6B7","DEDFD7","F2F2EE"],["04C2E3","66E7FD","9CEFFE","CEF8FF"],["FA9101","FEB654","FED7A0","FFEDD5"],["FF2B60","FF6C92","FFB9CB","FFE8EE"]],bgColor:["FFFFFF","CFD4BE,F3F5DD","C5DADD,EDFBFE","A86402,FDC16D","FF7CA0,FFD1DD"],bgAngle:[270,270,270,270,270],bgRatio:[zeroCommaHundredStr,zeroCommaHundredStr,zeroCommaHundredStr,zeroCommaHundredStr,zeroCommaHundredStr],bgAlpha:["100","60,50","40,20","20,10","30,30"],toolTipBgColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],toolTipBorderColor:["545454","545454","415D6F","845001","68001B"],baseFontColor:["333333","60634E","025B6A","A15E01","68001B"],tickColor:["333333","60634E","025B6A","A15E01","68001B"],trendColor:["545454","60634E","415D6F","845001","68001B"],plotFillColor:["545454","60634E","415D6F","845001","68001B"],borderColor:["767575","545454","415D6F","845001","68001B"],borderAlpha:[50,50,50,50,50]};_this.showRTvalue=false;_this.canvasPadding=false;_this.defaultPlotShadow=1;_this.realtimeEnabled=true;_this.chartleftmargin=15;_this.chartrightmargin=15;_this.charttopmargin=10;_this.chartbottommargin=10;_this.showTooltip=0;_this.connectTickMarks=0;_this.drawPlotlines=false;_this.drawPlotBands=false;_this.isRealTime=true;_this.colorRange=true;_this.registerFactory("dataset",_vledDataset.default,["vCanvas"]);return _this}var _proto=Hbullet.prototype;_proto.getName=function getName(){return"Hbullet"};_proto.__setDefaultConfig=function __setDefaultConfig(){_LinearGauge.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=FRIENDLY_NAME;config.defaultDatasetType=BULLET;config.singleseries=true;config.skipCanvasDrawing=true};_proto._RTmanageSpace=function _RTmanageSpace(){var iapi=this,config=iapi.config,scale=iapi.getChildren("scale")[0],dataset=iapi.getChildren("dataset")[0],diff,currentLabelSpace;currentLabelSpace=dataset._manageSpaceHorizontal(config.oriCanvasWidth*.7);diff=currentLabelSpace.right-config.labelSpace.right;iapi._allocateSpace({right:diff});scale.setAxisDimention({axisLength:config.canvasWidth});config.labelSpace=currentLabelSpace};_proto.configureAttributes=function configureAttributes(dataObj){_LinearGauge.prototype.configureAttributes.call(this,dataObj);_bulletLedCommon.configureAttributes.call(this)};_proto._getData=function _getData(){return _bulletLedCommon._getData.call(this)};_proto._spaceManager=function _spaceManager(){var availableWidth,availableHeight,iapi=this,config=iapi.config,canvas=iapi.getChildren("canvas")[0],dataset=iapi.getChildren("dataset")[0],scale=iapi.getChildren("scale")[0],is3D=iapi.config.is3D,chartAttrs=iapi.getFromEnv("dataSource").chart,showBorder=(0,_lib.pluckNumber)(chartAttrs.showborder,is3D?0:1),captionSpace,chartBorderHorizontal,chartBorderVertical,minChartWidth=config.minChartWidth,minChartHeight=config.minChartHeight,chartBorderWidth=config.borderWidth=showBorder?(0,_lib.pluckNumber)(chartAttrs.borderthickness,1):0;if(config.canvasWidth-2*chartBorderWidth<minChartWidth){chartBorderVertical=(config.canvasWidth-minChartWidth)/2}if(config.canvasHeight-2*chartBorderWidth<minChartHeight){chartBorderHorizontal=(config.canvasHeight-minChartHeight)/2}iapi._allocateSpace({top:chartBorderHorizontal||chartBorderWidth,bottom:chartBorderHorizontal||chartBorderWidth,left:chartBorderVertical||chartBorderWidth,right:chartBorderVertical||chartBorderWidth});availableWidth=config.canvasWidth*.7;iapi._allocateSpace(scale.placeAxis(config.availableHeight));iapi._allocateSpace(iapi._manageActionBarSpace&&iapi._manageActionBarSpace(config.availableHeight*.225)||{});config.oriCanvasWidth=config.canvasWidth;availableHeight=config.canvasHeight*.225;iapi._manageChartMenuBar(availableHeight);captionSpace=mathMax(iapi.getChildren("subCaption")[0].config.width||0,iapi.getChildren("caption")[0].config.width||0);config.labelSpace=dataset._manageSpaceHorizontal(availableWidth-captionSpace*.7);dataset._manageSpace&&iapi._allocateSpace(config.labelSpace);config.oriCanvasWidth-=captionSpace;availableHeight=config.canvasHeight*.325;canvas.setDimension({top:config.canvasTop,left:config.canvasLeft,width:config.canvasWidth,height:config.canvasHeight})};_proto._manageCaptionSpacing=function _manageCaptionSpacing(){var iapi=this,chartConfig=iapi.config,caption=iapi.getChildren("caption")[0],subCaption=iapi.getChildren("subCaption")[0],captionConfig=caption.config,subCaptionConfig=subCaption.config,chartAttrs=iapi.getFromEnv("dataSource").chart,SmartLabel=iapi.getFromEnv("smartLabel"),titleText=(0,_lib.parseUnsafeString)(chartAttrs.caption),subTitleText=(0,_lib.parseUnsafeString)(chartAttrs.subcaption),captionPadding=(0,_lib.pluckNumber)(chartAttrs.captionpadding,2),height=chartConfig.height,width=chartConfig.width,captionLineHeight=0,subCaptionLineHeight=0,captionHeight=0,allowedHeight=height*.3,allowedWidth=width*.3,dimensions={},maxCaptionWidth,captionObj,subCaptionObj,capStyle,subCapStyle;if(allowedHeight>3){captionConfig.captionPadding=subCaptionConfig.captionPadding=captionPadding;if(titleText!==BLANKSTRING){capStyle=captionConfig.style;captionLineHeight=captionConfig.captionLineHeight=mathCeil(parseFloat((0,_lib.pluck)(capStyle.fontHeight,capStyle.lineHeight),10),12)}if(subTitleText!==BLANKSTRING){subCapStyle=subCaptionConfig.style;subCaptionLineHeight=mathCeil(parseInt((0,_lib.pluck)(subCapStyle.lineHeight,subCapStyle.fontHeight),10),12)}if(captionLineHeight>0||subCaptionLineHeight>0){SmartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow);SmartLabel.setStyle(capStyle);captionObj=SmartLabel.getSmartText(titleText,allowedWidth,height);if(captionObj.width>0){captionObj.width+=GUTTER_PADDING;captionHeight=captionObj.height}SmartLabel.setStyle(subCapStyle);subCaptionObj=SmartLabel.getSmartText(subTitleText,allowedWidth,height-captionHeight);if(subCaptionObj.width>0){subCaptionObj.width+=GUTTER_PADDING}captionConfig.captionSubCaptionGap=captionObj.height+0+subCaptionLineHeight*.2;maxCaptionWidth=Math.max(captionObj.width,subCaptionObj.width);captionConfig.text=captionObj.text;captionConfig.height=captionHeight=captionObj.height;captionConfig.width=captionObj.width;captionConfig.tooltext&&(captionConfig.originalText=captionObj.tooltext);subCaptionConfig.text=subCaptionObj.text;subCaptionConfig.height=captionHeight=subCaptionObj.height;subCaptionConfig.width=subCaptionObj.width;subCaptionConfig.tooltext&&(captionConfig.originalText=subCaptionObj.tooltext);maxCaptionWidth=Math.max(captionObj.width,subCaptionObj.width);if(maxCaptionWidth>0){maxCaptionWidth=maxCaptionWidth+captionPadding}captionConfig.maxCaptionWidth=subCaptionConfig.maxCaptionWidth=maxCaptionWidth;if(captionConfig.isOnLeft){dimensions.left=maxCaptionWidth}else{dimensions.right=maxCaptionWidth}}}if(captionConfig.isOnLeft){captionConfig.align=subCaptionConfig.align=POSITION_END}else{captionConfig.align=subCaptionConfig.align=POSITION_START}return dimensions};_proto._manageCaptionPosition=function _manageCaptionPosition(){var iapi=this,chartConfig=iapi.config,caption=iapi.getChildren("caption")[0],subCaption=iapi.getChildren("subCaption")[0],captionConfig=caption.config,subCaptionConfig=subCaption.config,captionPosition=captionConfig.captionPosition,maxWidth=mathMax(captionConfig.width,subCaptionConfig.width),borderWidth=chartConfig.borderWidth||0,captionSubCaptionGap=captionConfig.captionSubCaptionGap;switch(captionPosition){case POSITION_MIDDLE:captionConfig.y=(chartConfig.canvasTop+chartConfig.canvasHeight)*.5;break;case POSITION_BOTTOM:captionConfig.y=chartConfig.canvasBottom-(captionConfig.height+subCaptionConfig.height);break;default:captionConfig.y=chartConfig.canvasTop;break}subCaptionConfig.y=captionConfig.y+captionSubCaptionGap;if(captionConfig.isOnLeft){captionConfig.x=subCaptionConfig.x=chartConfig.marginLeft+maxWidth+borderWidth}else{captionConfig.x=subCaptionConfig.x=chartConfig.width-chartConfig.marginRight-maxWidth-borderWidth}};_proto._feedAxesRawData=function _feedAxesRawData(){var iapi=this,config=iapi.config,colorM=iapi.getFromEnv("color-manager"),numberFormatter=iapi.getFromEnv("number-formatter"),dataObj=iapi.getFromEnv("dataSource"),chartAttrs=dataObj.chart,scaleConf,palleteString=_lib.chartPaletteStr.chart2D,ticksBelowGraph=(0,_lib.pluckNumber)(chartAttrs.ticksbelowgraph,!config.isAxisOpposite),isAxisOpposite=(0,_lib.pluckNumber)((0,_equal.default)(chartAttrs.scaleposition,config.scalePosition)?config.isAxisOpposite:(0,_equal.default)(chartAttrs.scaleposition,config.canBeScalePosition)?!config.isAxisOpposite:UNDEF,!ticksBelowGraph);scaleConf={isVertical:!iapi.isHorizontal,isReverse:false,isOpposit:isAxisOpposite,outCanfontFamily:(0,_lib.pluck)(chartAttrs.outcnvbasefont,chartAttrs.basefont,"Verdana,sans"),outCanfontSize:(0,_lib.pluckFontSize)(chartAttrs.outcnvbasefontsize,chartAttrs.basefontsize,10),outCancolor:(0,_lib.pluck)(chartAttrs.outcnvbasefontcolor,chartAttrs.basefontcolor,colorM.getColor(palleteString.baseFontColor)).replace(/^#?([a-f0-9]+)/gi,"#$1"),useEllipsesWhenOverflow:chartAttrs.useellipseswhenoverflow,divLineColor:(0,_lib.pluck)(chartAttrs.vdivlinecolor,colorM.getColor(palleteString.divLineColor)),divLineAlpha:(0,_lib.pluck)(chartAttrs.vdivlinealpha,colorM.getColor("divLineAlpha")),divLineThickness:(0,_lib.pluckNumber)(chartAttrs.vdivlinethickness,1),divLineIsDashed:Boolean((0,_lib.pluckNumber)(chartAttrs.vdivlinedashed,chartAttrs.vdivlineisdashed,0)),divLineDashLen:(0,_lib.pluckNumber)(chartAttrs.vdivlinedashlen,4),divLineDashGap:(0,_lib.pluckNumber)(chartAttrs.vdivlinedashgap,2),showAlternateGridColor:(0,_lib.pluckNumber)(chartAttrs.showalternatevgridcolor,0),alternateGridColor:(0,_lib.pluck)(chartAttrs.alternatevgridcolor,colorM.getColor("altVGridColor")),alternateGridAlpha:(0,_lib.pluck)(chartAttrs.alternatevgridalpha,colorM.getColor("altVGridAlpha")),numDivLines:chartAttrs.numvdivlines,labelFont:chartAttrs.labelfont,labelFontSize:chartAttrs.labelfontsize,labelFontColor:chartAttrs.labelfontcolor,labelAlpha:chartAttrs.labelalpha,labelFontBold:chartAttrs.labelfontbold,labelFontItalic:chartAttrs.labelfontitalic,axisName:chartAttrs.xaxisname,axisMinValue:numberFormatter.getCleanValue(chartAttrs.lowerlimit),axisMaxValue:numberFormatter.getCleanValue(chartAttrs.upperlimit),setAdaptiveMin:chartAttrs.setadaptivexmin,adjustDiv:chartAttrs.adjusttm,labelDisplay:chartAttrs.labeldisplay,showLabels:chartAttrs.showlabels,rotateLabels:chartAttrs.rotatelabels,slantLabel:(0,_lib.pluckNumber)(chartAttrs.slantlabels,chartAttrs.slantlabel),labelStep:(0,_lib.pluckNumber)(chartAttrs.labelstep,chartAttrs.xaxisvaluesstep),showAxisValues:(0,_lib.pluckNumber)(chartAttrs.showxaxisvalues,chartAttrs.showxaxisvalue),showDivLineValues:(0,_lib.pluckNumber)(chartAttrs.showvdivlinevalues,chartAttrs.showvdivlinevalues),showZeroPlane:chartAttrs.showvzeroplane,zeroPlaneColor:chartAttrs.vzeroplanecolor,zeroPlaneThickness:chartAttrs.vzeroplanethickness,zeroPlaneAlpha:chartAttrs.vzeroplanealpha,showZeroPlaneValue:chartAttrs.showvzeroplanevalue,trendlineColor:chartAttrs.trendlinecolor,trendlineToolText:chartAttrs.trendlinetooltext,trendlineThickness:chartAttrs.trendlinethickness,trendlineAlpha:chartAttrs.trendlinealpha,showTrendlinesOnTop:chartAttrs.showtrendlinesontop,showAxisLine:(0,_lib.pluckNumber)(chartAttrs.showxaxisline,chartAttrs.showaxislines,chartAttrs.drawAxisLines,0),axisLineThickness:(0,_lib.pluckNumber)(chartAttrs.xaxislinethickness,chartAttrs.axislinethickness,1),axisLineAlpha:(0,_lib.pluckNumber)(chartAttrs.xaxislinealpha,chartAttrs.axislinealpha,100),axisLineColor:(0,_lib.pluck)(chartAttrs.xaxislinecolor,chartAttrs.axislinecolor,"#000000"),majorTMNumber:chartAttrs.majortmnumber,majorTMColor:chartAttrs.majortmcolor,majorTMAlpha:chartAttrs.majortmalpha,majorTMHeight:chartAttrs.majortmheight,tickValueStep:chartAttrs.tickvaluestep,showTickMarks:chartAttrs.showtickmarks,connectTickMarks:chartAttrs.connecttickmarks,showTickValues:chartAttrs.showtickvalues,majorTMThickness:chartAttrs.majortmthickness,reverseScale:chartAttrs.reversescale,showLimits:(0,_lib.pluckNumber)(chartAttrs.showlimits,chartAttrs.showtickmarks),minorTMNumber:(0,_lib.pluckNumber)(chartAttrs.minortmnumber,0),minorTMColor:chartAttrs.minortmcolor,minorTMAlpha:chartAttrs.minortmalpha,minorTMHeight:(0,_lib.pluckNumber)(chartAttrs.minortmheight,chartAttrs.minortmwidth),minorTMThickness:chartAttrs.minortmthickness,tickMarkDistance:(0,_lib.pluckNumber)(chartAttrs.tickmarkdistance,chartAttrs.tickmarkgap),tickValueDistance:(0,_lib.pluckNumber)(chartAttrs.tickvaluedistance,chartAttrs.displayvaluedistance),placeTicksInside:chartAttrs.placeticksinside,placeValuesInside:chartAttrs.placevaluesinside,upperLimitDisplay:chartAttrs.upperlimitdisplay,lowerLimitDisplay:chartAttrs.lowerlimitdisplay};return[scaleConf]};_proto.getDSdef=function getDSdef(){return _bullet.default};_proto._fetchCaptionPos=function _fetchCaptionPos(){var extraSpace,iapi=this,caption=iapi.getChildren("caption")[0],captionConfig=caption.config;if(captionConfig.align===POSITION_END){extraSpace=0}else{extraSpace=-1}return extraSpace};return Hbullet}(_lineargauge.default);var _default=Hbullet;exports.default=_default;