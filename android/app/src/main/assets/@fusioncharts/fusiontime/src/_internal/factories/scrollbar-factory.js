import ScrollBar from"@fusioncharts/core/src/toolbox/tools/scrollbar";var DRAGSTART="timeNavBrushStart",DRAGEND="timeNavBrushEnd",DRAG="timeNavBrush",LABELFORMAT="%b %d, %Y",TRANSLATE="translate";export default function(timeNav){var scrollbar=timeNav.attachChild(ScrollBar,"scrollbar"),chart=timeNav.getFromEnv("chart"),scale,currFocusLimit,timeNavConfig=timeNav.config,dataSource=scrollbar.getFromEnv("dataSource"),getStyleDef=scrollbar.getFromEnv("getStyleDef"),inputStyle=dataSource.navigator&&dataSource.navigator.scrollbar&&dataSource.navigator.scrollbar.style||{},style,startDomain,endDomain,options={timeFormatter:timeNavConfig.formatter},forceFireOptions=Object.assign({forceFire:true},options),eventArgs={formatter:LABELFORMAT,action:TRANSLATE};style={button:Object.assign({stroke:timeNav.getScrollbarConfig("buttonStroke"),fill:timeNav.getScrollbarConfig("buttonFill")},getStyleDef(inputStyle.button)),arrow:Object.assign({fill:timeNav.getScrollbarConfig("buttonPointerFill")},getStyleDef(inputStyle.arrow)),scroller:Object.assign({stroke:timeNav.getScrollbarConfig("anchorStroke"),fill:timeNav.getScrollbarConfig("anchorFill")},getStyleDef(inputStyle.scroller)),grip:Object.assign({stroke:timeNav.getScrollbarConfig("stripesStroke")},getStyleDef(inputStyle.grip)),track:Object.assign({stroke:timeNav.getScrollbarConfig("trackStroke"),fill:timeNav.getScrollbarConfig("trackFill")},getStyleDef(inputStyle.track))};scrollbar.configure({isHorizontal:true,displayFlat:true,width:timeNav.getScrollbarConfig("width"),height:timeNav.getScrollbarConfig("height"),style:style,drawStripes:timeNav.getScrollbarConfig("drawStripes"),restrictScrollAnchor:timeNav.getScrollbarConfig("restrictScrollAnchor"),scrollRatio:timeNav.getScrollbarConfig("scrollRatio")});scrollbar.attachEventHandlers({scroll:function scroll(scrollPosition){var scrollbarConf=timeNav.getChildren("scrollbar")[0].config,width=scrollbarConf.width,height=scrollbarConf.height,scrollRatio=timeNav.getScrollbarConfig("scrollRatio"),scrollButtonWidth=Math.min(height,width*.5),anchorWidth=(width-2*scrollButtonWidth)*scrollRatio-1,trackOffset=scrollbarConf.x+scrollButtonWidth+.5,trackLength=width-2*scrollButtonWidth-anchorWidth,anchorXPos=trackOffset+trackLength*scrollPosition;scale=timeNavConfig.contextScale;startDomain=+scale.getDomainValue(anchorXPos);endDomain=+scale.getDomainValue(anchorXPos+anchorWidth);chart.getFromEnv("fireChartEvents")(DRAG,[startDomain,endDomain],eventArgs,options);timeNav.validateDomain([anchorXPos,anchorXPos+anchorWidth])},scrollStart:function scrollStart(){currFocusLimit=chart.getFocusLimit();chart.getFromEnv("fireChartEvents")(DRAGSTART,[+currFocusLimit[0],+currFocusLimit[1]],eventArgs,forceFireOptions)},scrollEnd:function scrollEnd(){currFocusLimit=chart.getFocusLimit();chart.getFromEnv("fireChartEvents")(DRAGEND,[+currFocusLimit[0],+currFocusLimit[1]],eventArgs,forceFireOptions)}})}