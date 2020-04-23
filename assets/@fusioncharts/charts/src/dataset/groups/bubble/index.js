"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _componentInterface=require("@fusioncharts/core/src/component-interface");var _lib=require("@fusioncharts/core/src/lib");var BubbleDatasetGroup=function(_ComponentInterface){(0,_inheritsLoose2.default)(BubbleDatasetGroup,_ComponentInterface);function BubbleDatasetGroup(){var _this;_this=_ComponentInterface.call(this)||this;_this.setState("visible",true);return _this}var _proto=BubbleDatasetGroup.prototype;_proto.createContainer=function createContainer(){var manager=this,key,animationManager=manager.getFromEnv("animationManager"),parent=manager.getLinkedParent(),pContainer,parentChildContainers=parent.getChildContainer();for(key in parentChildContainers){pContainer=parentChildContainers[key];!manager.getChildContainer(key)&&manager.addChildContainer(key,animationManager.setAnimation({el:"group",attr:{name:"manager-"+key},component:manager,container:pContainer}))}};_proto.draw=function draw(){this.createContainer()};_proto.getDataLimitRange=function getDataLimitRange(){var vcanvas=this,children=vcanvas.getChildren(),i,key,child,len,limits,zMax=-Infinity,zMin=+Infinity,xMax=-Infinity,xMin=+Infinity;for(key in children){if(children.hasOwnProperty(key)){child=children[key];if(child instanceof Array){len=child.length;for(i=0;i<len;i++){if(child[i].getState("removed")){continue}limits=child[i].getDataLimits();xMax=Math.max(xMax,limits.xMax||-Infinity);xMin=Math.min(xMin,limits.xMin||+Infinity);zMax=Math.max(zMax,limits.zMax||-Infinity);zMin=Math.min(zMin,limits.zMin||+Infinity)}}}}zMax=zMax===-Infinity?0:zMax;zMin=zMin===+Infinity?0:zMin;return{xMax:xMax,xMin:xMin,zMax:zMax,zMin:zMin}};_proto.childChanged=function childChanged(updateInfo){if(updateInfo===void 0){updateInfo={}}var manager=this,config=manager.config,parent=manager.getLinkedParent(),range,padding,changeInfo={},ifInformParent;if(updateInfo.hide!==false||updateInfo.show!==false){manager._mapChildren((function(child){child.setState("dirty",true)}));ifInformParent=true}if(updateInfo.dataLimitChanged!==false){range=manager.getDataLimits();if(range.min!==config.range.min||range.max!==config.range.max){config.range.min=range.min;config.range.max=range.max;changeInfo.dataLimitChanged=true;ifInformParent=true}}if(updateInfo.paddingChanged!==false){padding=manager.getAxisValuePadding();if(padding.left!==config.padding.left||padding.right!==config.padding.right){config.padding.left=padding.left;config.padding.right=padding.right;changeInfo.paddingChanged=true;ifInformParent=true}}if(ifInformParent){parent.childChanged&&parent.childChanged(changeInfo)}else{manager.asyncDraw()}};_proto.getAxisValuePadding=function getAxisValuePadding(){var paddingObj={},axisPaddingLeft=-Infinity,axisPaddingRight=-Infinity;this._mapChildren((function(child){if(child.getState("removed")||child.getState("visible")===false){return}paddingObj=child.getAxisValuePadding&&child.getAxisValuePadding()||{};axisPaddingLeft=Math.max(axisPaddingLeft,paddingObj.left||-Infinity);axisPaddingRight=Math.max(axisPaddingRight,paddingObj.right||-Infinity)}));if(axisPaddingLeft===-Infinity){axisPaddingLeft=0}if(axisPaddingRight===-Infinity){axisPaddingRight=0}if(!this.config.padding){this.config.padding={};this.config.padding.left=axisPaddingLeft;this.config.padding.right=axisPaddingRight}return{left:axisPaddingLeft,right:axisPaddingRight}};_proto.getCanvasPadding=function getCanvasPadding(){var manager=this,dim,key,returnDimension={paddingLeft:0,paddingRight:0,paddingTop:0,paddingBottom:0};manager._mapChildren((function(child){if(child.getState("removed")){return}dim=child.getCanvasPadding&&child.getCanvasPadding()||{};for(key in dim){if(dim.hasOwnProperty(key)){returnDimension[key]=Math.max(dim[key],returnDimension[key])}}}));return returnDimension};_proto.getDataLimits=function getDataLimits(){var manager=this,chart=manager.getFromEnv("chart"),infMin=-Infinity,infMax=+Infinity,max=infMin,min=infMax,xMin=infMax,xMax=infMin,maxminObj,xMaxValue,xMinValue,getMaxMin=function getMaxMin(_maxminObj){xMaxValue=(0,_lib.pluck)(_maxminObj.xMax,infMin);xMinValue=(0,_lib.pluck)(_maxminObj.xMin,infMax);max=Math.max(max,_maxminObj.max);min=Math.min(min,_maxminObj.min);xMax=Math.max(xMax,xMaxValue);xMin=Math.min(xMin,xMinValue)};manager._mapChildren((function(child){if(!child.getDataLimits||child.getState("removed")){return}maxminObj=child.getDataLimits();getMaxMin(maxminObj)}));max===-Infinity&&(max=0);min===+Infinity&&(min=0);if(!this.config.range){this.config.range={};this.config.range.min=min;this.config.range.max=max;this.config.range.xMin=xMin;this.config.range.xMax=xMax}chart.config.yMax=max;chart.config.yMin=min;return{min:min,max:max,xMin:xMin,xMax:xMax}};_proto.isVisible=function isVisible(){return!this.isNotVisible};_proto.getType=function getType(){return"manager"};_proto.getName=function getName(){return"BubbleGroupManager"};_proto.remove=function remove(){var manager=this;manager._mapChildren((function(child){if(!child.getState("removed")){child.remove()}}));_ComponentInterface.prototype.remove.call(this)};return BubbleDatasetGroup}(_componentInterface.ComponentInterface);var _default=BubbleDatasetGroup;exports.default=_default;