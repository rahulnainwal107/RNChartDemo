import _assertThisInitialized from"@babel/runtime/helpers/assertThisInitialized";import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import CustomRangeManager from"./manager";import{Tool}from"@fusioncharts/core/src/toolbox";import{TRACKER_FILL,getMouseCoordinate}from"@fusioncharts/core/src/lib";import Cover from"./cover";import FusionEventWrapper from"@fusioncharts/core/src/fusion-events-wrapper/fusion-event-wrapper";var TIME_INTERVALS=["hour","minute","second","millisecond"],VISIBLE="visible",NORMAL="normal",CRS="CRS",SPACE_BETWEEN_ICON_AND_TEXT=5,SCALING_STEP_VALUE=.0278,BLANK="",CALENDAR_ICON_PATH="M15.604605,2.6231875 C15.3617479,2.39715625 15.0736134,2.284125 14.7409412,2.284125 L13.5126723,2.284125 L13.5126723,1.4275625 C13.5126723,1.0350625 13.3621849,0.69896875 13.0615126,0.41940625 C12.7606723,0.13984375 12.3993613,0 11.9769748,0 L11.3629244,0 C10.9405714,0 10.5791261,0.13984375 10.2784202,0.4194375 C9.97761345,0.69896875 9.8272605,1.03509375 9.8272605,1.42759375 L9.8272605,2.28415625 L6.14221849,2.28415625 L6.14221849,1.42759375 C6.14221849,1.03509375 5.99179832,0.699 5.69105882,0.4194375 C5.39038655,0.13984375 5.02890756,0 4.60655462,0 L3.99240336,0 C3.57015126,0 3.20863866,0.13984375 2.90789916,0.4194375 C2.60722689,0.69896875 2.45677311,1.03509375 2.45677311,1.42759375 L2.45677311,2.28415625 L1.22847059,2.28415625 C0.895697479,2.28415625 0.607831933,2.3971875 0.364705882,2.62321875 C0.121579832,2.84921875 0,3.11696875 0,3.42625 L0,14.8466563 C0,15.1557188 0.121579832,15.4234063 0.364705882,15.6495625 C0.607798319,15.8755312 0.895663866,15.9885937 1.22847059,15.9885937 L14.7407059,15.9885937 C15.0733782,15.9885937 15.3615462,15.8755625 15.6043697,15.6495625 C15.8475294,15.4235 15.9691429,15.1556875 15.9691429,14.8466563 L15.9691429,3.42621875 C15.9691092,3.11684375 15.8476303,2.84921875 15.604605,2.6231875 Z M11.0558319,1.4276875 C11.0558319,1.34434375 11.0843697,1.275875 11.1418824,1.22246875 C11.199395,1.169 11.2730084,1.14221875 11.3627227,1.14221875 L11.9767731,1.14221875 C12.066521,1.14221875 12.1398992,1.16890625 12.1976134,1.22246875 C12.2551597,1.27596875 12.2838992,1.3444375 12.2838992,1.4276875 L12.2838992,3.9971875 C12.2838992,4.0805 12.2551597,4.14884375 12.1976134,4.20240625 C12.1398655,4.2558125 12.066521,4.28265625 11.9767731,4.28265625 L11.3627227,4.28265625 C11.2730084,4.28265625 11.199395,4.2559375 11.1418824,4.20240625 C11.0843697,4.1488125 11.0558319,4.0805 11.0558319,3.9971875 L11.0558319,1.4276875 Z M3.68534454,1.4276875 C3.68534454,1.34434375 3.71408403,1.275875 3.77166387,1.22246875 C3.82927731,1.169 3.90278992,1.14221875 3.99240336,1.14221875 L4.60655462,1.14221875 C4.69620168,1.14221875 4.76984874,1.16890625 4.82729412,1.22246875 C4.88480672,1.27596875 4.91368067,1.3444375 4.91368067,1.4276875 L4.91368067,3.9971875 C4.91368067,4.0805 4.88494118,4.1489375 4.82729412,4.20240625 C4.76971429,4.2558125 4.69620168,4.28265625 4.60655462,4.28265625 L3.99240336,4.28265625 C3.90278992,4.28265625 3.82917647,4.2559375 3.77166387,4.20240625 C3.71421849,4.1488125 3.68534454,4.0805 3.68534454,3.9971875 L3.68534454,1.4276875 Z M14.7407059,14.8465 L1.22847059,14.8465 L1.22847059,5.71025 L14.7407059,5.71025 L14.7407059,14.8465 Z",getScalingParam=function getScalingParam(fSizeArg){var fSize=parseFloat(fSizeArg);return(fSize-12)*SCALING_STEP_VALUE+1};function mouseOver(){var style=this.config.extStyle;this.setData({interactionStyle:{text:style["title-text:hover"],icon:style["title-icon:hover"]},hoverConfig:true},true)}function mouseOut(){var selectorTool=this;!selectorTool.config.blockUpdate&&selectorTool.setData({interactionStyle:this.config.extStyle["title:hoverout"],hoverConfig:true},true)}function beforeMove(event){var selectorTool=this;selectorTool.removeDocumentListener();event.detachHandler()}var CustomRangeSelectorTool=function(_Tool){_inheritsLoose(CustomRangeSelectorTool,_Tool);function CustomRangeSelectorTool(id){var _this;_this=_Tool.call(this,id)||this;var selectorTool=_assertThisInitialized(_this),config=selectorTool.config;config.wrapper=new FusionEventWrapper;config.documentClicked=function(e){var _getMouseCoordinate=getMouseCoordinate(selectorTool.getFromEnv("chart-container"),e,selectorTool.getFromEnv("chart")),chartX=_getMouseCoordinate.chartX,chartY=_getMouseCoordinate.chartY,target=e.target;if(!selectorTool.getChildren("manager")[0].isWithinWidget(chartX,chartY)){var svgRectClassName=target instanceof SVGElement&&target.className.baseVal;if(svgRectClassName!=="fc__crs__str"&&!(target.className==="fc__select__time"||target.parentElement&&target.parentElement.className==="fc__select__time")){config.wrapper.off(document,"fc-click",config.documentClicked);selectorTool.setData({},true)}}};selectorTool.keyDownHandler=function(evt){var isEscape=false;if("key"in evt){isEscape=evt.key==="Escape"||evt.key==="Esc"}else{isEscape=evt.keyCode===27}if(isEscape){_this.setData({},true)}};selectorTool.clickHandler=function(e){var component=selectorTool,totalDomain=config.domain,chart=component.getFromEnv("chart"),isUTC=chart.getFromEnv("UTC"),dateAPI=chart.getFromEnv("dateAPI"),contextScaleLimit=chart.getContextLimit(),contextStart=new Date(contextScaleLimit[0]),contextEnd=new Date(contextScaleLimit[1]),start=new Date(totalDomain[0]),end=new Date(totalDomain[1]);component.setData({blockUpdate:true,interactionStyle:{text:config.extStyle["title-text:active"],icon:config.extStyle["title-icon:active"]}},true);component.getChildren("cover")[0].setData({visibility:"visible"},true);component.getChildren("manager")[0].setData({visibility:"visible",position:component.config.containerPos,drawCalendars:true,startDate:{year:dateAPI(start,"FullYear",isUTC),month:dateAPI(start,"Month",isUTC)+1,day:dateAPI(start,"Date",isUTC),hours:dateAPI(start,"Hours",isUTC),minutes:dateAPI(start,"Minutes",isUTC),seconds:dateAPI(start,"Seconds",isUTC)},endDate:{year:dateAPI(end,"FullYear",isUTC),month:dateAPI(end,"Month",isUTC)+1,day:dateAPI(end,"Date",isUTC),hours:dateAPI(end,"Hours",isUTC),minutes:dateAPI(end,"Minutes",isUTC),seconds:dateAPI(end,"Seconds",isUTC)},contextStart:{year:dateAPI(contextStart,"FullYear",isUTC),month:dateAPI(contextStart,"Month",isUTC)+1,day:dateAPI(contextStart,"Date",isUTC)},contextEnd:{year:dateAPI(contextEnd,"FullYear",isUTC),month:dateAPI(contextEnd,"Month",isUTC)+1,day:dateAPI(contextEnd,"Date",isUTC)}},true);config.wrapper.on(document,"fc-click",selectorTool.config.documentClicked);config.wrapper.on(document,"keydown",selectorTool.keyDownHandler)};selectorTool.addEventListener("fc-click",selectorTool.clickHandler);selectorTool.addEventListener("fc-mouseover",mouseOver.bind(_assertThisInitialized(_this)));selectorTool.addEventListener("fc-mouseout",mouseOut.bind(_assertThisInitialized(_this)));selectorTool.addEventListener("beforeremove",beforeMove.bind(_assertThisInitialized(_this)));return _this}var _proto=CustomRangeSelectorTool.prototype;_proto.__setDefaultConfig=function __setDefaultConfig(){_Tool.prototype.__setDefaultConfig.call(this);var rangeSelectorConfig=this.config;rangeSelectorConfig.containerState=0;rangeSelectorConfig.showDate=true;rangeSelectorConfig.calendarIconPath=CALENDAR_ICON_PATH;rangeSelectorConfig.calendarIconDim={width:16,height:16};rangeSelectorConfig.containerPos={x:100,y:100};rangeSelectorConfig.containerInfo={id:"group",label:"group",isParent:true};rangeSelectorConfig.spaceNotHardCoded=true;rangeSelectorConfig.hoveredState=NORMAL;rangeSelectorConfig._iconStyle={fill:"#5648D4",transform:"",opacity:1};rangeSelectorConfig._textStyle={"font-size":"12px","font-style":"normal","font-weight":"600","text-anchor":"start",fill:"#5648D4",opacity:1};rangeSelectorConfig.prevDim={height:0,width:0}};_proto.configureAttributes=function configureAttributes(inputConfig){if(inputConfig===void 0){inputConfig={}}var rangeSelector=this,config=rangeSelector.config,focusScales=rangeSelector.getFromEnv("focusScalesX"),showTime=false,extStyle={},interactionStyle={},styleDef=rangeSelector.getFromEnv("getStyleDef"),baseTextStyle=rangeSelector.getFromEnv("baseTextStyle");Object.assign(config,inputConfig);!inputConfig.blockUpdate&&delete config.blockUpdate;!inputConfig.interactionStyle&&delete config.interactionStyle;extStyle=config.extStyle||{};interactionStyle=config.interactionStyle||{};rangeSelector.setState(VISIBLE,config.isHidden!==true);config.symbolName=config.name;focusScales.forEach((function(scale){if(TIME_INTERVALS.includes(scale.getBinMin()[0].name())){showTime=true}}));rangeSelector.attachChild(Cover,"cover","cover").configure({visibility:"hidden"});rangeSelector.attachChild(CustomRangeManager,"manager","manager").configure({visibility:"hidden",position:config.containerPos,showTime:showTime,extStyle:extStyle,drawCalendars:false});config.showTime=showTime;config._finalIconStyle=Object.assign({},config._iconStyle,styleDef(extStyle["title-icon"]),styleDef(interactionStyle.icon));config._finalTextStyle=Object.assign({},config._textStyle,baseTextStyle,styleDef(extStyle["title-text"]),styleDef(interactionStyle.text))};_proto.getLabel=function getLabel(){var rangeSelector=this,rangeSelectorConfig=rangeSelector.config,text=BLANK,showTimeInLabel=rangeSelectorConfig.showTimeInLabel,chartWidth=+rangeSelector.getFromEnv("chartWidth"),toolbar=rangeSelector.getLinkedParent(),chart=rangeSelector.getFromEnv("chart"),scale=chart.getFromEnv("contextScalesX")[0],totalDomain=rangeSelectorConfig.domain||scale.getDomain(),smartLabel=rangeSelector.getFromEnv("smartLabel"),startDate=new Date(totalDomain[0]),endDate=new Date(totalDomain[1]),curDim,prevDim=Object.assign(rangeSelectorConfig.prevDim),dim=prevDim;smartLabel.setStyle(rangeSelectorConfig._finalTextStyle);text=scale.getFormattedTime({dateRange:{startDate:startDate,endDate:endDate},type:CRS,showTimeInLabel:showTimeInLabel});curDim=smartLabel.getOriSize(text);if(Math.abs(curDim.width-prevDim.width)>10){dim=rangeSelectorConfig.prevDim=Object.assign(curDim)}if(chartWidth<600){if((dim.width+rangeSelectorConfig.calendarIconDim.width)/toolbar.props.width>.4){text=BLANK;dim.width=0}}rangeSelectorConfig.label=text;return{text:text,dim:dim}};_proto.decideTimeInLabel=function decideTimeInLabel(){var rangeSelector=this,rangeSelectorConfig=rangeSelector.config,showTimeInLabel,focusScales=rangeSelector.getFromEnv("focusScalesX");focusScales.forEach((function(scale){if(TIME_INTERVALS.includes(scale.getBinMin()[0].name())){rangeSelectorConfig.showTime=true}if(scale._timeFormat){showTimeInLabel=TIME_INTERVALS.includes(scale._timeFormat.major)||TIME_INTERVALS.includes(scale._timeFormat.minor)||showTimeInLabel}}));return showTimeInLabel};_proto.getLogicalSpace=function getLogicalSpace(){var rangeSelector=this,rangeSelectorConfig=rangeSelector.config,manager=rangeSelector.getChildren("manager")[0],width=rangeSelectorConfig.width,height=rangeSelectorConfig.height,marginTop=rangeSelectorConfig.marginTop,marginLeft=rangeSelectorConfig.marginLeft,marginRight=rangeSelectorConfig.marginRight,marginBottom=rangeSelectorConfig.marginBottom,dim;rangeSelectorConfig.showTimeInLabel=rangeSelector.decideTimeInLabel();manager.configure({showTime:rangeSelectorConfig.showTime},true);dim=rangeSelector.getLabel().dim;width=dim.width;height=dim.height;if(rangeSelectorConfig.skipGraphics||rangeSelectorConfig.isHidden||rangeSelector.getState("removed")){width=height=marginBottom=marginLeft=marginRight=marginTop=0}rangeSelectorConfig.width=dim.width;rangeSelectorConfig.height=dim.height;return{width:width,height:height,marginLeft:marginLeft,marginBottom:marginBottom,marginRight:marginRight,marginTop:marginTop}};_proto.draw=function draw(){var rangeSelector=this,rangeSelectorConfig=rangeSelector.config,toolbar=rangeSelector.getLinkedParent(),iconTranslateX,iconTranslateY,scalingParam,calendarIconWidth,calendarIconHeight;rangeSelector.addGraphicalElement({el:"group",attr:{name:"range-selector-text",transform:"t"+rangeSelectorConfig.x+", "+(rangeSelectorConfig.y+toolbar.props.height/2)},container:rangeSelectorConfig.containerInfo,component:rangeSelector,id:"group",label:"group"},true);scalingParam=getScalingParam(rangeSelectorConfig._finalTextStyle["font-size"]);calendarIconWidth=scalingParam*rangeSelectorConfig.calendarIconDim.width;calendarIconHeight=scalingParam*rangeSelectorConfig.calendarIconDim.height;iconTranslateX=-1*calendarIconWidth-SPACE_BETWEEN_ICON_AND_TEXT;iconTranslateY=-1*(3*calendarIconHeight/4);rangeSelector.addGraphicalElement({el:"group",attr:{name:"range-selector-icon-group",transform:"t"+iconTranslateX+", "+iconTranslateY},container:{id:"group",label:"group"},component:rangeSelector,label:"group",id:"icon-group"},true);rangeSelectorConfig._finalIconStyle.transform+=" s"+scalingParam;rangeSelector.addGraphicalElement({el:"path",attr:{path:rangeSelectorConfig.calendarIconPath},css:rangeSelectorConfig._finalIconStyle,container:{id:"icon-group",label:"group"},component:rangeSelector,label:"path",id:"icon"},true);rangeSelector.addGraphicalElement({el:"text",attr:{text:rangeSelectorConfig.label,opacity:rangeSelectorConfig._finalTextStyle.opacity},css:rangeSelectorConfig._finalTextStyle,container:{id:"group",label:"group"},component:rangeSelector,label:"text",id:"display"},true);rangeSelector.addGraphicalElement({el:"rect",attr:{class:"fc__crs__str",fill:TRACKER_FILL,x:iconTranslateX-SPACE_BETWEEN_ICON_AND_TEXT,y:-1*toolbar.props.height/2,width:calendarIconWidth+2*SPACE_BETWEEN_ICON_AND_TEXT+rangeSelectorConfig.width,height:toolbar.props.height},component:rangeSelector,container:{label:"group",id:"group"},css:{cursor:"pointer"},label:"rect",id:"rect"});rangeSelectorConfig.containerPos={x:rangeSelectorConfig.x-calendarIconWidth/2-SPACE_BETWEEN_ICON_AND_TEXT*scalingParam,y:rangeSelectorConfig.y+toolbar.props.height/2+calendarIconHeight}};_proto.removeDocumentListener=function removeDocumentListener(){var selectorTool=this,config=selectorTool.config;config.wrapper.off(document,"fc-click",config.documentClicked);config.wrapper.off(document,"keydown",selectorTool.keyDownHandler)};return CustomRangeSelectorTool}(Tool);export default CustomRangeSelectorTool;