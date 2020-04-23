"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _componentInterface=require("@fusioncharts/core/src/component-interface");var _polarUtil=require("@fusioncharts/utils/src/scale-utils/polar-util.js");var _lib=require("@fusioncharts/core/src/lib");var _utils=require("../../chart/chord/utils");var normalizeAngles=function normalizeAngles(radians){return radians-_utils.HALF_PI},ribbonGenerator=function ribbonGenerator(points,radius,startAngle){var corners=points.map((function(p,i){var angle=(0,_polarUtil.deg2Rad)(p),_polarToCartesian=(0,_polarUtil.polarToCartesian)(radius,normalizeAngles((0,_polarUtil.deg2Rad)(startAngle))+angle),x=_polarToCartesian.x,y=_polarToCartesian.y,curveFactor=.6,distance=Math.abs((0,_polarUtil.deg2Rad)(points[3-i])-angle),nextPointDist=Math.abs((0,_polarUtil.deg2Rad)(points[(i+1)%4])-angle);if(distance>_utils.PI){distance=_utils.PI2-distance}if(distance*radius<radius){curveFactor*=distance}x=(0,_lib.toPrecision)(x,4);y=(0,_lib.toPrecision)(y,4);return{x:x,y:y,cpX:(1-curveFactor)*x,cpY:(1-curveFactor)*y,arc:nextPointDist}}));return[_utils.M,corners[0].x,corners[0].y,_utils.A,radius,radius,0,corners[0].arc>_utils.PI?1:0,1,corners[1].x,corners[1].y,_utils.C,corners[1].cpX,corners[1].cpY,corners[2].cpX,corners[2].cpY,corners[2].x,corners[2].y,_utils.A,radius,radius,0,corners[2].arc>_utils.PI?1:0,1,corners[3].x,corners[3].y,_utils.C,corners[3].cpX,corners[3].cpY,corners[0].cpX,corners[0].cpY,corners[0].x,corners[0].y].join(" ")},mouseOverFn=function mouseOverFn(){this.getLinkedParent().linkHoverIn(this.config.key)},mouseOutFn=function mouseOutFn(){this.getLinkedParent().linkHoverOut(this.config.key)},getTooltext=function getTooltext(config,basefontsize){var uniChar=_lib.isIpad?_utils.SMALLSQUARE:_utils.MEDIUMSQUARE,key,body=_lib.BLANKSTRING;for(key in config.tooltip){if(config.tooltip.hasOwnProperty(key)){body+="\n          <span style='color: "+config.tooltip[key].color+";'>\n            "+uniChar+"\n          </span>\n          "+(key+config.toolTipSepChar)+"\n          "+(config.showLinkValueOnHover?" &nbsp;":"")+"\n          "+(config.showLinkValueOnHover?config.tooltip[key].value:"")+"\n        <br>"}}return"<div style='padding: 2px; vertical-align: middle; font-size: "+basefontsize+"px;'>\n        "+body+"\n      </div>"};var Ribbon=function(_SmartRenderer){(0,_inheritsLoose2.default)(Ribbon,_SmartRenderer);function Ribbon(id){var _this;_this=_SmartRenderer.call(this,id)||this;_this.addEventListener("fc-mouseover",mouseOverFn);_this.addEventListener("fc-mouseout",mouseOutFn);return _this}var _proto=Ribbon.prototype;_proto.configureAttributes=function configureAttributes(dataObj){_SmartRenderer.prototype.configureAttributes.call(this,dataObj);Object.assign(this.config,dataObj)};_proto.setDimension=function setDimension(dim){this.config.radius=dim.radius};_proto.allocatePosition=function allocatePosition(){var config=this.config;config.path=ribbonGenerator(config.points,config.radius,0);config.ribbonAttrs=config.hovered?config.focussedState:config.unfocussed?config.unfocussedState:config.normalState;config.ribbonAttrs.path=config.path;config.ribbonAttrs["stroke-width"]=(config.showBorder?config.borderThickness:0)||0};_proto.draw=function draw(){var ribbon=this,chartConfig=ribbon.getFromEnv("chart").config,height=chartConfig.canvasHeight,width=chartConfig.canvasWidth,cx=chartConfig.canvasLeft+width/2,cy=chartConfig.canvasTop+height/2,chartWidth=chartConfig.width,chartHeight=chartConfig.height,ribbonRadius=chartConfig.ribbonRadius,config=ribbon.config,angles=config.angles,tooltext=config.showToolTip?getTooltext(config,chartConfig.style.baseFontSize):_lib.BLANKSTRING,_polarToCartesian2=(0,_polarUtil.polarToCartesian)(ribbonRadius,normalizeAngles((0,_polarUtil.deg2Rad)(angles[0]))),x1=_polarToCartesian2.x,y1=_polarToCartesian2.y,_polarToCartesian3=(0,_polarUtil.polarToCartesian)(ribbonRadius,normalizeAngles((0,_polarUtil.deg2Rad)(angles[3]))),x2=_polarToCartesian3.x,y2=_polarToCartesian3.y;if(config.dominantNode.length>1&&config.rawColor){config.ribbonAttrs.fill=(0,_lib.toRaphaelColor)({color:config.rawColor[0]+","+config.rawColor[1],alpha:config.hovered?config.hoverAlpha:config.unfocussed?config.unfocussedAlpha:config.alpha,x1:(x1+cx)/chartWidth,y1:(y1+cy)/chartHeight,x2:(x2+cx)/chartWidth,y2:(y2+cy)/chartHeight});config.ribbonAttrs.stroke=(0,_lib.toRaphaelColor)({color:config.rawColor[0]+","+config.rawColor[1],alpha:config.hovered?config.hoveredAlpha:config.unfocussed?config.unfocussedAlpha:config.borderAlpha,x1:(x1+cx)/chartWidth,y1:(y1+cy)/chartHeight,x2:(x2+cx)/chartWidth,y2:(y2+cy)/chartHeight})}ribbon.addGraphicalElement({el:"path",label:"ribbon",tooltext:tooltext,attr:config.ribbonAttrs,container:{id:"link-container",isParent:true},component:ribbon})};_proto.getName=function getName(){return"ribbon"};_proto.getType=function getType(){return"dataset"};return Ribbon}(_componentInterface.SmartRenderer);var _default=Ribbon;exports.default=_default;