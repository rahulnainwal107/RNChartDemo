"use strict";exports.__esModule=true;exports.default=void 0;var _lib=require("@fusioncharts/core/src/lib");var docmode8=window.document.documentMode===8,TITLE_HASH_STRING="$titleVal$",MSG_HASH_STRING="$msgVal$",LINK_HASH_STRING="$msgLinkVal$",msgTemplate={},CONTAINER_SPAN_STYLE={display:"block",paddingLeft:"10px",paddingRight:"10px","font-family":"Arial","font-size":"11px"};msgTemplate.literal=msgTemplate.info={title:'<span style="color: #005900">'+TITLE_HASH_STRING+"</span>",body:'<span">'+MSG_HASH_STRING+"</span>"};msgTemplate.link={title:msgTemplate.info.title,body:'<a href="'+LINK_HASH_STRING+'">'+MSG_HASH_STRING+"</a>"};msgTemplate.error={title:'<span style="color: #CC0000">'+TITLE_HASH_STRING+"</span>",body:'<span style="color: #CC0000">'+MSG_HASH_STRING+"</span>"};var Message=function(){function Message(messageObj,msgLogger){this.config={};this.messageType=(messageObj.msgType&&messageObj.msgType.replace(/^[\r\n]+|\.|[\r\n]+$/g,"")||"").toLowerCase();this.msgTitle=messageObj.msgTitle;this.msgText=messageObj.msgText;this.msgLink=messageObj.msgLink;this.graphics={};this.linkedItems={msgLogger:msgLogger};this.msgObj=msgTemplate[this.messageType]||msgTemplate.literal;this.configureMsgTextAndMsgTitle()}var _proto=Message.prototype;_proto.configureMsgTextAndMsgTitle=function configureMsgTextAndMsgTitle(){this.config.totalHTML=_lib.BLANKSTRING;if(this.msgTitle){this.config.titleHTML=this.msgObj.title.replace(TITLE_HASH_STRING,this.msgTitle);this.config.totalHTML+=this.config.titleHTML}if(this.msgText){this.config.msgHTML=this.msgObj.body.replace(MSG_HASH_STRING,this.msgText);this.config.msgHTML=this.config.msgHTML.replace(LINK_HASH_STRING,this.msgText);this.config.totalHTML+=this.config.msgHTML}};_proto.draw=function draw(){var prop,element=this.graphics.element,msgLogger=this.linkedItems.msgLogger,loggerGraphics=msgLogger.graphics,groupDOMelem=loggerGraphics&&loggerGraphics.log&&loggerGraphics.log.element,logWrapperElem=loggerGraphics.logWrapper&&loggerGraphics.logWrapper.element,temp,loggerConfig=msgLogger.config,scrollHeight;if(!element){element=this.graphics.element=window.document.createElement("span");for(prop in CONTAINER_SPAN_STYLE){element.style[prop]=CONTAINER_SPAN_STYLE[prop]}groupDOMelem.appendChild&&groupDOMelem.appendChild(element)}this.graphics.element.innerHTML=this.config.totalHTML;if(_lib.isIE&&docmode8){temp=groupDOMelem.innerHTML;groupDOMelem.innerHTML=temp}if(loggerConfig.scrollToBottom){loggerConfig.dynamicScrolling=true;scrollHeight=logWrapperElem.scrollHeight;logWrapperElem.scrollTop=scrollHeight}};_proto.dispose=function dispose(){var msgLogger=this.linkedItems.msgLogger;msgLogger&&msgLogger.graphics&&msgLogger.graphics.log&&msgLogger.graphics.log.element&&msgLogger.graphics.log.element.removeChild&&msgLogger.graphics.log.element.removeChild(this.graphics.element);delete this.graphics.element;_lib.componentDispose.call(this)};return Message}();var _default=Message;exports.default=_default;