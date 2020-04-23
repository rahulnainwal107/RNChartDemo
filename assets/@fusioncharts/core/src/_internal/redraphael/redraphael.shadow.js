"use strict";exports.__esModule=true;exports.default=_default;var _lib=require("../../lib");function _default(R){var win=window,UNDEF,math=Math,mathSqrt=math.sqrt,toFloat=win.parseFloat,toInt=win.parseInt,EMP="",SPC=" ",NONE="none",ROUND="round",STROKE_WIDTH="stroke-width",DROP_SHADOW="drop-shadow",BLACK="rgba(0,0,0,1)",hasSVGFilters=win.SVGFilterElement||win.SVGFEColorMatrixElement&&win.SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE===2,forbiddenAttrs={"drop-shadow":"drop-shadow",stroke:"stroke",fill:"fill","stroke-width":"stroke-width","stroke-opacity":"stroke-opacity","stroke-linecap":"stroke-linecap","stroke-linejoin":"stroke-linejoin","shape-rendering":"shape-rendering",opacity:"opacity","fill-opacity":"fill-opacity"},supervisor;if(R.svg){if(hasSVGFilters){R.filterShadow=function(dependencyObj,hasGroup){var dx=dependencyObj.dx||1,dy=dependencyObj.dy||1,spread=dependencyObj.spread||3,color=dependencyObj.color||"rgb(64,64,64)",filterDefs,children,paper=dependencyObj.paper,cache=paper.cacheShadows||(paper.cacheShadows={}),hash=dependencyObj.id||DROP_SHADOW+"-"+(hasGroup?"layered":"non-layered")+"-"+[dx,dy,spread,color].join(SPC)+paper.container.id,id=dependencyObj.id||R.getElementID(hash.replace(/[\(\)\s%:,\xb0#]/g,"_")),hasShadowDef=!!(dependencyObj.id?R._g.doc.getElementById(id):cache[hash]),opacity,shadow;if(paper&&!hasShadowDef){color=R.color(color);if(color.error){color=R.color(BLACK)}opacity=(0,_lib.pluck)(color.opacity,1);opacity=dependencyObj.opacity||opacity;filterDefs=paper.addDefs({filter:{tagName:"filter",id:id,y:"-1000%",x:"-1000%",width:"2000%",height:"2000%",children:[{tagName:"feOffset",result:"offOut",in:"SourceGraphic",dx:toFloat(dx),dy:toFloat(dy)},{tagName:"feColorMatrix",result:"matrixOut",in:"offOut",type:"matrix",values:"0 0 0 0 0"+" 0 0 0 0 0"+" 0 0 0 0 0"+" 0 0 0 "+opacity+" 0"},{tagName:"feGaussianBlur",result:"blurOut",in:"matrixOut",stdDeviation:hasGroup?1:mathSqrt(toFloat(spread))},{tagName:"feComposite",in:"SourceGraphic",in2:"blurOut",operator:"over"}]}});children=filterDefs.filter.children;shadow=cache[hash]={use:1,hash:hash,id:id,filter:filterDefs.filter.element,offset:children[0].element,matrix:children[1].element,blur:children[2].element,blend:children[3].element}}else{shadow=cache[hash];shadow.use+=1}return shadow};R.el.dropshadow=function(dx,dy,spread,color,opacity,group){var o=this,elem,node,shadow=o._.shadowFilter,paper=o.paper,cache=paper.cacheShadows||(paper.cacheShadows={}),hash=DROP_SHADOW+[dx,dy,spread,color].join(SPC),prop,tempOpacity,strokeOpacity,shadowCreated,i,el;strokeOpacity=tempOpacity=opacity*.05;for(i=1;i<=3;i++){strokeOpacity+=tempOpacity*i*(opacity-strokeOpacity)}elem=group?o.shadowElem||o.clone({fill:NONE,stroke:"rgb(51, 51, 51)","stroke-width":o.attr("stroke-width")||1,opacity:strokeOpacity},group).translate(dx,dy).follow(o,supervisor,!group&&"before"):o;node=elem.shadowElem&&elem.shadowElem.node||elem.node;if(dx===NONE){if(shadow){shadow.use-=1;node.removeAttribute("filter");o.shadowElem&&o.shadowElem.attr("opacity",0);if(!shadow.use){hash=shadow.hash;for(prop in shadow){el=shadow[prop];if(el.parentNode){el.parentNode.removeChild(el)}delete shadow[prop]}el=null;delete cache[hash]}shadow=null;delete o._.shadowFilter}}else{group&&!o.shadowElem&&(shadowCreated=true);group&&(o.shadowElem=elem);if(!(shadow&&cache[hash])){shadow=o._.shadowFilter=R.filterShadow({paper:paper,dx:dx,dy:dy,spread:spread,color:color,opacity:!group&&strokeOpacity},!!group)}else{shadow=cache[hash]}!shadowCreated&&o.shadowElem&&o.shadowElem.attr("opacity",strokeOpacity);node.setAttribute("filter",'url("'+R._url+"#"+shadow.id+'")')}return this}}supervisor=function supervisor(params,leader){var o=this,del={},matrix,key;for(key in params){if(forbiddenAttrs[key]){del[key]=params[key];delete params[key]}switch(key){case"transform":matrix=leader.matrix.clone();matrix.translate(o.__shadowx,o.__shadowy);o.transform(matrix.toTransformString());break;case STROKE_WIDTH:params[key]=del[key]||1;break}}o.attr(params);for(key in del){params[key]=del[key]}};R.ca[DROP_SHADOW]=function(_offX,_offY,spread,_color,scale,group){var o=this,shadows=o._.shadows||(o._.shadows=[]),opacity,shadow,offset,matrix,tScale,strScale,i,offX=_offX,offY=_offY,color=_color;if(o.__shadowblocked){return false}else if(offX===NONE){while(shadow=shadows.pop()){shadow.remove()}}else{color=R.color(color);if(color.error){color=R.color(BLACK)}if(scale instanceof Array){tScale=scale[0];strScale=scale[1]}else{tScale=strScale=scale}tScale=1/(0,_lib.pluck)(tScale,1);strScale=1/(0,_lib.pluck)(strScale,1);offX=(0,_lib.pluck)(offX,1)*tScale;offY=(0,_lib.pluck)(offY,1)*tScale;opacity=(0,_lib.pluck)(color.opacity,1)*.05;offset=toInt(o.attr(STROKE_WIDTH)||1,10)+6;matrix=o.matrix.clone();matrix.translate(offX,offY);for(i=1;i<=3;i++){shadow=(shadows[i-1]||o.clone().follow(o,supervisor,!group&&"before")).attr({stroke:color.hex,"stroke-opacity":opacity*i,opacity:"1","stroke-width":(offset-2*i)*strScale,transform:matrix.toTransformString(),"stroke-linecap":ROUND,"stroke-linejoin":ROUND,fill:NONE});shadow.__shadowlevel=i;shadow.__shadowscale=strScale;shadow.__shadowx=offX;shadow.__shadowy=offY;group&&group.appendChild(shadow);shadows.push(shadow)}}return false};R.el.shadow=function(_apply,_opacity,_scale,_group){var useFilter,apply=_apply,opacity=_opacity,scale=_scale,group=_group;if(scale&&scale.constructor===R.el.constructor){group=scale;scale=UNDEF}if(typeof apply==="object"){opacity&&opacity.constructor===R.el.constructor&&(group=opacity);opacity=apply.opacity;scale=apply.scalefactor;useFilter=apply.useFilter!==UNDEF?!!apply.useFilter:!_lib.isIE9;apply=apply.apply===UNDEF?!!opacity:apply.apply}opacity===UNDEF&&(opacity=1);if(this.dropshadow){if(useFilter&&!this.ca.hasOwnProperty("drop-shadow")){apply&&this.dropshadow(1,1,3,"rgb(64,64,64)",opacity,group)||this.dropshadow(NONE);return this}else if(this._.shadowFilter){this.dropshadow(NONE)}}return this.attr(DROP_SHADOW,apply?[1,1,3,"rgba(64,64,64,"+opacity+")",scale,group]:NONE)}}else if(R.vml){R.ca["drop-shadow"]=function(_offX,_offY,spread,_color,scale,group){var o=this,shadow=o._.shadow,style,filter,tScale,opacity,offX=_offX,offY=_offY,color=_color;if(o.isShadow){return false}if(offX===NONE){shadow&&(shadow=o._.shadow=shadow.remove())}else{if(!shadow){shadow=o._.shadow=o.clone();group&&group.appendChild(shadow.follow(o))||shadow.follow(o,UNDEF,"before");shadow.attr({fill:"none","fill-opacity":.5,"stroke-opacity":1}).isShadow=true;if(shadow.attr(STROKE_WIDTH)<=0){shadow.attr(STROKE_WIDTH,1)}}style=shadow.node.runtimeStyle;filter=style.filter.replace(/ progid:\S+Blur\([^\)]+\)/g,EMP);color=R.color(color);if(color.error){color=R.color(BLACK)}opacity=(0,_lib.pluck)(color.opacity,1)/5;if(scale instanceof Array){tScale=scale[0]}else{tScale=scale}tScale=1/(0,_lib.pluck)(scale,1);offX=(0,_lib.pluck)(offX,1)*tScale;offY=(0,_lib.pluck)(offY,1)*tScale;shadow.translate(offX,offY);style.filter=filter+" progid:DXImageTransform.Microsoft.Blur(pixelRadius="+toFloat(spread*.4)+" makeShadow=True Color="+color.hex+' shadowOpacity="'+opacity+'");'}return false};R.el.shadow=function(_apply,_opacity,_scale,_group){var o=this,apply=_apply,opacity=_opacity,scale=_scale,group=_group;if(scale&&scale.constructor===R.el.constructor){group=scale;scale=UNDEF}if(typeof apply==="object"){opacity&&opacity.type==="group"&&(group=opacity);opacity=apply.opacity;scale=apply.scalefactor;apply=apply.apply===UNDEF?!!opacity:apply.apply}opacity===UNDEF&&(opacity=1);return o.attr(DROP_SHADOW,apply||!opacity?[1,1,5,"rgba(64,64,64,"+opacity+")",scale,group]:NONE)}}else if(R.canvas){R.el.shadow=function(){return this}}}