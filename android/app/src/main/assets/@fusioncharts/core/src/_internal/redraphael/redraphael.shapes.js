"use strict";exports.__esModule=true;exports.default=_default;var _lib=require("../../lib");function _default(R){var zeroAlphaCheck=/rgba\([\d]+\,[\d]+\,[\d]+\,0\)$/;var win=window,UNDEF,math=Math,mathCos=math.cos,mathSin=math.sin,mathPI=math.PI,toInt=win.parseInt,toFloat=win.parseFloat,toStr=String,arraySlice=Array.prototype.slice,HAS="hasOwnProperty",OBJECT="object",BLANK="",COMMA=",",NONE="none",CRISP="crisp",M="M",L="L",A="A",Z="Z",RStr="r",POLYPATH="polypath",TEXTBOUND="text-bound",commaseparator=/\s*\,\s*/g;if(R&&R._availableAnimAttrs&&R._availableAnimAttrs.cx){R._availableAnimAttrs["scroll-position"]=R._availableAnimAttrs.cx}R.define&&R.define([{name:"polypath",polypath:function polypath(){return this.path(UNDEF,R._lastArgIfGroup(arguments))},ca:{polypath:function polypath(_sides,_cx,_cy,_r,_startAngle,_dip){var path,inangle,i,angle,h,sides=_sides,cx=_cx,cy=_cy,r=_r,startAngle=_startAngle,dip=_dip;path=[];sides=toInt(sides,10)||0;cx=toFloat(cx)||0;cy=toFloat(cy)||0;r=toFloat(r)||0;startAngle=startAngle===null||isNaN(startAngle)?mathPI*.5:R.rad(startAngle);dip=dip===null||isNaN(dip)?0:toFloat(dip);angle=startAngle;if(sides>2){inangle=2*mathPI/sides;switch(dip){case 0:for(i=0;i<sides;i++){path.push(L,cx+r*mathCos(-angle),cy+r*mathSin(-angle));angle+=inangle}path[0]=M;path.push(Z);break;case 1:for(i=0;i<sides;i++){path.push(M,cx,cy,L,cx+r*mathCos(-angle),cy+r*mathSin(-angle));angle+=inangle}break;default:inangle*=.5;h=r*mathCos(inangle)*(1-dip);for(i=0;i<sides;i++){path.push(L,cx+r*mathCos(-angle),cy+r*mathSin(-angle));angle+=inangle;path.push(L,cx+h*mathCos(-angle),cy+h*mathSin(-angle));angle+=inangle}path[0]=M;path.push(Z);break}}else{if(r===0){path.push(M,cx,cy,L,cx,cy,Z)}else{path.push(M,cx-r,cy,A,r,r,0,0,0,cx+r,cy,A,r,r,0,0,0,cx-r,cy,Z)}}return{path:path}},r:function r(value){var o=this,attr=o.attrs.polypath;attr[3]=value;o.attr(POLYPATH,attr);return false}}}]);R.ca[TEXTBOUND]=function(fill,stroke,_strokeWidth,padding,_cornerRadius,dasharray,opacity){var o=this,paper=o.paper,bound=o._.textbound,strokeWidth=_strokeWidth,cornerRadius=_cornerRadius;this._origOpacity=opacity!==UNDEF?opacity:1;if(this.type!=="text"){return}if((!stroke||stroke===NONE||zeroAlphaCheck.test(stroke))&&(!fill||fill===NONE||zeroAlphaCheck.test(fill))){o._.textbound=bound&&bound.unfollow(o).remove();return false}o.attrs[TEXTBOUND]=arguments;(!strokeWidth||!R.is(strokeWidth,"finite"))&&(strokeWidth=0);(!cornerRadius||!R.is(cornerRadius,"finite"))&&(cornerRadius=0);!bound&&(bound=o._.textbound=paper.rect(0,0,0,0,o.group).follow(o,R.ca[TEXTBOUND].reposition,"before"));bound.attr({stroke:stroke||NONE,"stroke-width":strokeWidth,fill:fill||NONE,"shape-rendering":strokeWidth===1&&CRISP||BLANK,r:cornerRadius});opacity!==UNDEF&&bound.attr("opacity",opacity);dasharray&&bound.attr("stroke-dasharray",dasharray);R.ca[TEXTBOUND].reposition.call(bound,o.attr(),o);return false};R.ca[TEXTBOUND].reposition=function(params,leader){var o=this,updates={},attr,textBoundAttr,padding,padX,padY,bbox,opacity,w,h;if(params[HAS]("visibility")){o.attr("visibility",params.visibility)}if(!(params[HAS](TEXTBOUND)||params[HAS]("x")||params[HAS]("y")||params[HAS]("text")||params[HAS]("text-anchor")||params[HAS]("text-align")||params[HAS]("font-size")||params[HAS]("line-height")||params[HAS]("vertical-align")||params[HAS]("transform")||params[HAS]("rotation")||params[HAS]("opacity"))){return}attr=leader.attrs;textBoundAttr=attr[TEXTBOUND];padding=toStr(textBoundAttr&&textBoundAttr[3]||"0").split(commaseparator);padX=toFloat(padding[0])||0;padY=(0,_lib.pluck)(toFloat(padding[1]),padX);bbox=leader.getBBox();w=bbox.width;h=bbox.height;o._origOpacity=leader._origOpacity||1;opacity=toFloat(params.opacity||attr.opacity);updates.opacity=isNaN(opacity)?o._origOpacity:o._origOpacity*opacity;if(!isNaN(w)){updates.x=bbox.x-padX;updates.y=bbox.y-padY;updates.width=Math.max(w+padX*2,0);updates.height=Math.max(h+padY*2,0)}o.attr(updates)};R.fn.symbol=function(){var paper=this,args=arguments,lastArg=args.length-1,group=args[lastArg],o;group&&group.constructor===R.el.constructor?args[lastArg]=UNDEF:group=UNDEF;o=paper.path(UNDEF,group);o.ca.symbol=R.fn.symbol.ca.symbol;return args.length===!!group+0?o:o.attr("symbol",args)};R.fn.getSuggestiveRotation=function(){var arg,angle,x,y;arg=arguments[0];if(arguments.length===1){angle=arg.angle;x=arg.x;y=arg.y}else{angle=arg;x=arguments[1];y=arguments[2]}angle=angle||0;return RStr+angle+COMMA+x+COMMA+y};R.fn.symbol.cache={"":R._cacher((function(x,y,_r,h){var r=_r;return arguments.length>3?["M",x,y,"h",r,"v",h,"h",-r,"v",-h,"z"]:["M",x-r,y-r,"h",r*=2,"v",r,"h",-r,"v",-r,"z"]}))};R.fn.symbol.ca={symbol:function symbol(_name){var o=this,name=_name,args=R.is(name,OBJECT)&&arguments.length===1&&!R.is(name,"function")?name:arguments,symbolFn,symbolData;args===name&&(name=args[0]);symbolFn=R.is(name,"function")&&name||R.fn.symbol.cache[name]||R.fn.symbol.cache[""];symbolData=symbolFn&&symbolFn.apply(R,arraySlice.call(args,1));R.is(symbolData,"array")||R.is(symbolData,"string")?o.attr("path",symbolData):symbolData&&o.attr(symbolData)}};R.addSymbol=function(name,_fn){var items,fn=_fn,cache=R.fn.symbol.cache,alias=[],i;items=R.is(fn,"function")&&(items={},items[name]=fn,items)||name;for(i in items){fn=items[i];cache[i]=R.is(fn,"function")&&R._cacher(fn,R)||(alias.push(i),fn)}i=alias.pop();while(i){cache[i]=cache[cache[i]];i=alias.pop()}}}