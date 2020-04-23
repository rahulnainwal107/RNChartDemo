"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");exports.__esModule=true;exports.default=void 0;var _linkInformation=_interopRequireWildcard(require("./link-information"));var _eventApi=require("@fusioncharts/core/src/event-api");var _lib=require("@fusioncharts/core/src/lib");var _domEvent=_interopRequireDefault(require("@fusioncharts/core/src/dom-event"));var DROP_HASH_RE=_lib.regex.dropHash,MSG_CLOSE="Close";var UNDEF;function checkObjectRenderLocationOverride(obj,parent){return(obj.options.containerElement===parent.options.containerElement||obj.options.containerElementId===parent.options.containerElementId)&&obj.options.insertMode===_lib.domInsertModes.REPLACE}function linkInitialize(event){var arr;if(!(event.sender.link instanceof _linkInformation.default)||event.sender.link.root.disposed){event.sender.link=new _linkInformation.default(event.sender)}else{if(event.sender.link.parent instanceof this){arr=event.sender.link.parent.link.items;!arr[event.sender.id]&&(arr[event.sender.id]=event.sender)}}}function configureLinkFn(param,levelLink){var i,level=levelLink;if(param instanceof Array){for(i=0;i<param.length;i+=1){if(typeof _linkInformation.store[this.link.root.id][i]!=="object"){_linkInformation.store[this.link.root.id][i]={}}(0,_lib.extend2)(_linkInformation.store[this.link.root.id][i],param[i],false,true)}_linkInformation.store[this.link.root.id].splice(param.length)}else if(typeof param==="object"){if(typeof level!=="number"){level=this.link.level}if(typeof _linkInformation.store[this.link.root.id][level]==="undefined"){_linkInformation.store[this.link.root.id][level]={}}(0,_lib.extend2)(_linkInformation.store[this.link.root.id][level],param,false,true)}else{(0,_eventApi.raiseError)(this,"25081731","param","~configureLink()","Unable to update link configuration from set parameters")}}function drawOverlayButtonFn(args){var vars=this.jsVars,backBtn=vars.overlayButton,cssObj,item,text;if(args&&args.show){if(!backBtn){backBtn=vars.overlayButton=document.createElement("span");_domEvent.default.listen(backBtn,"click",(function(){(0,_eventApi.triggerEvent)("OverlayButtonClick",vars.fcObj,args)}))}text=args.message?args.message:"Back";while(backBtn.firstChild){backBtn.removeChild(backBtn.firstChild)}backBtn.appendChild(document.createTextNode(text));vars.overlayButtonMessage=text;cssObj={border:"1px solid "+(args.borderColor?args.borderColor.replace(DROP_HASH_RE,_lib.HASHSTRING):"#7f8975"),backgroundColor:args.bgColor?args.bgColor.replace(DROP_HASH_RE,_lib.HASHSTRING):"#edefec",fontFamily:args.font?args.font:"Verdana,sans",color:"#"+args.fontColor?args.fontColor:"49563a",fontSize:(args.fontSize?args.fontSize:"10")+_lib.PXSTRING,padding:(args.padding?args.padding:"3")+_lib.PXSTRING,fontWeight:parseInt(args.bold,10)===0?_lib.NORMAL:_lib.BOLD,position:"absolute",top:"0",right:"0",cursor:_lib.POINTER};for(item in cssObj){backBtn.style[item]=cssObj[item]}vars.hcObj.container.appendChild(backBtn);vars.overlayButtonActive=true}else if(backBtn){vars.overlayButton=backBtn.parentNode.removeChild(backBtn);vars.overlayButtonActive=false;delete vars.overlayButtonMessage}}function addlinkedCharts(FusionCharts){FusionCharts.prototype.configureLink=configureLinkFn;FusionCharts.prototype.drawOverlayButton=drawOverlayButtonFn;FusionCharts.addEventListener("beforeRender",linkInitialize);FusionCharts.addEventListener("beforeInitialize",linkInitialize);FusionCharts.addEventListener("linkedChartInvoked",(function linkedChartInvokedHanlder(event,args){var obj=event.sender,param=obj.clone({dataSource:args.data,dataFormat:args.linkType,link:new _linkInformation.default(obj.link.root,obj,obj instanceof FusionCharts),clickedEntity:args.clickedEntity,clickedEntityBox:args.clickedEntityBox},true),alias=args.alias,childObj;if(alias){if(!param.typeSource&&param.swfUrl){param.typeSource=param.swfUrl.replace(/(.*?)?[^\/]*\.swf.*?/gi,"$1")}param.type=alias}if(obj.args&&parseInt(obj.args.animate,10)!==0){delete param.animate}(0,_lib.extend2)(param,obj.link.configuration(),false,true);(0,_eventApi.triggerEvent)("beforeLinkedItemOpen",obj.link.root,{level:obj.link.level},UNDEF,(function(){if(FusionCharts.items[param.id]instanceof FusionCharts){FusionCharts.items[param.id].dispose()}childObj=new FusionCharts(param);if(!checkObjectRenderLocationOverride(childObj,obj)&&!(obj.options.overlayButton&&obj.options.overlayButton.message)){if(typeof obj.options.overlayButton!=="object"){obj.options.overlayButton={}}obj.options.overlayButton.message=MSG_CLOSE}childObj.render();(0,_eventApi.triggerEvent)("linkedItemOpened",obj.link.root,{level:obj.link.level,item:childObj})}))}));FusionCharts.addEventListener("overlayButtonClick",(function overlayButtonClickHandler(event,args){var sender,level,parent,root;if(args.id!=="LinkManager"){return}sender=event.sender;level=sender.link.level-1;parent=sender.link.parent;root=sender.link.root;(0,_eventApi.triggerEvent)("beforeLinkedItemClose",root,{level:level,item:sender},UNDEF,(function(){setTimeout((function(){if(FusionCharts.items[sender.id]){sender.dispose()}(0,_eventApi.triggerEvent)("linkedItemClosed",root,{level:level})}),0);if(!parent.disposed&&!parent.isActive()&&checkObjectRenderLocationOverride(sender,parent)){parent.render()}else{parent._addChartDependency("returnFromLinkedChart",{resolve:function resolve(){return{state:3}}});parent._setState()}}))}));FusionCharts.addEventListener("DrawComplete",(function drawCompleteHandler(event){var obj=event.sender,config;if(!obj||typeof obj.link==="undefined"){return}if(obj.link.root===obj||!(obj.link.parent instanceof FusionCharts)){return}if(!(obj.ref&&typeof obj.drawOverlayButton==="function")){(0,_eventApi.raiseWarning)(obj,"04091602","run","::LinkManager^Loaded","Unable to draw overlay button on object. -"+obj.id);return}config=(0,_lib.extend2)({show:true,id:"LinkManager"},obj.link.parent.options.overlayButton,false,true);(0,_lib.extend2)(config,obj.link.parent.link.configuration().overlayButton||{},false,true);obj.drawOverlayButton(config)}));FusionCharts.addEventListener("beforeDispose",(function beforeDisposeHandler(e){var obj=e.sender;if(!(obj&&obj.link instanceof _linkInformation.default)){return}if(obj&&obj.link&&obj.link.parent instanceof FusionCharts){if(obj.link.parent.link&&obj.link.parent.link.items){delete obj.link.parent.link.items[e.sender.id]}}delete _linkInformation.store[obj.id]}))}var _default={type:"extension",name:"LinkedChart",extension:addlinkedCharts,requiresFusionCharts:true};exports.default=_default;