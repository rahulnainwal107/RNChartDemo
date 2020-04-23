"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _lib=require("@fusioncharts/core/src/lib");var _scatterbase=_interopRequireDefault(require("@fusioncharts/charts/src/chart/_internal/scatterbase"));var _selectscatter=_interopRequireDefault(require("../../dataset/selectscatter"));var _dependencyManager=require("@fusioncharts/core/src/dependency-manager");var _editableCharts=require("../_internal/editable-charts");var _redraphaelShapes=_interopRequireDefault(require("@fusioncharts/core/src/_internal/redraphael/redraphael-shapes/redraphael-shapes.button"));var Raphael=(0,_dependencyManager.getDep)("redraphael","plugin"),UNDEF,COMMA=",",configStr="config",TRACKER_FILL="rgba(192,192,192,"+(_lib.isIE?.002:1e-6)+")",VISIBLE="visible",HIDDEN="hidden",ROUND="round",POINTER="pointer",SELECTSCATTER="selectScatter",resizeInnerSymbolColor="#999999",resizeOuterSymbolColor="#777777",NULLSTR="null",closeButtonRadius=6,trackerRadius=12,deg2rad=Math.PI/180,checkObjectLength=function checkObjectLength(item){return Object.keys(item).length},getArcPath=function getArcPath(endX,endY,rX,rY,isClockWise,isLargeArc){return["A",rX,rY,0,isLargeArc,isClockWise,endX,endY]},M="M",L="L",Z="Z",t="t";(0,_redraphaelShapes.default)(Raphael);function _createSelectionBox(event){var chart=event.chart,paper=chart.getFromEnv("paper"),chartConfig=chart.config,yAxis=chart.getChildren("yAxis")[0],xAxis=chart.getChildren("xAxis")[0],x=event.selectionLeft,y=event.selectionTop,width=event.selectionWidth,height=event.selectionHeight,x2=x+width,y2=y+height,TRACKER_WIDTH=12,TRACKER_HALF_WIDTH=TRACKER_WIDTH*.5,cornerSymbolRadius=15,isSmall=width>cornerSymbolRadius&&height>cornerSymbolRadius,selectEleObj={resizeEleRadius:cornerSymbolRadius,canvasTop:chartConfig.canvasTop,canvasRight:chartConfig.canvasLeft+chartConfig.canvasWidth,canvasLeft:chartConfig.canvasLeft,canvasBottom:chartConfig.canvasTop+chartConfig.canvasHeight},selectEleArr=chartConfig._selectEleArr||(chartConfig._selectEleArr=[]),selectBoxG;selectEleObj.index=selectEleArr.length;selectEleObj.id="SELECT_"+selectEleObj.index;selectEleObj.selectBoxG=selectBoxG=paper.group("selection-box",chart.getChildContainer("trackerGroup")).toFront();selectEleObj.selectBoxTracker=paper.rect(x,y,width,height,selectBoxG).attr({"stroke-width":1,stroke:(0,_lib.toRaphaelColor)(chartConfig.selectBorderColor),fill:chartConfig.selectFillColor}).css({cursor:"move"});selectEleObj.selectBoxTracker.node._isTrackerElem=true;selectEleObj.selectBoxTracker.data(configStr,{position:6,selectEleObj:selectEleObj,chart:chart,xChange:true,yChange:true});selectEleObj.topTracker=paper.rect(x,y-TRACKER_HALF_WIDTH,width,TRACKER_WIDTH,selectBoxG).attr({"stroke-width":0,fill:TRACKER_FILL}).css("cursor",_lib.hasSVG&&"ns-resize"||"n-resize");selectEleObj.topTracker.node._isTrackerElem=true;selectEleObj.topTracker.data(configStr,{position:1,selectEleObj:selectEleObj,yChange:true,chart:chart});selectEleObj.rightTracker=paper.rect(x+width-TRACKER_HALF_WIDTH,y,TRACKER_WIDTH,height,selectBoxG).attr({"stroke-width":0,fill:TRACKER_FILL}).css("cursor",_lib.hasSVG&&"ew-resize"||"w-resize");selectEleObj.rightTracker.node._isTrackerElem=true;selectEleObj.rightTracker.data(configStr,{position:2,chart:chart,selectEleObj:selectEleObj,xChange:true});selectEleObj.bottomTracker=paper.rect(x,y+height-TRACKER_HALF_WIDTH,width,TRACKER_WIDTH,selectBoxG).attr({"stroke-width":0,fill:TRACKER_FILL}).css("cursor",_lib.hasSVG&&"ns-resize"||"n-resize");selectEleObj.bottomTracker.node._isTrackerElem=true;selectEleObj.bottomTracker.data(configStr,{position:3,chart:chart,selectEleObj:selectEleObj,yChange:true});selectEleObj.leftTracker=paper.rect(x-TRACKER_HALF_WIDTH,y,TRACKER_WIDTH,height,selectBoxG).attr({"stroke-width":0,fill:TRACKER_FILL}).css("cursor",_lib.hasSVG&&"ew-resize"||"e-resize");selectEleObj.leftTracker.node._isTrackerElem=true;selectEleObj.leftTracker.data(configStr,{position:4,chart:chart,selectEleObj:selectEleObj,xChange:true});selectEleObj.cornerInnerSymbol=paper.symbol("resizeIcon",0,0,cornerSymbolRadius,selectBoxG).attr({transform:t+x2+COMMA+y2,"stroke-width":1,visibility:isSmall?VISIBLE:HIDDEN,stroke:resizeInnerSymbolColor});selectEleObj.cornerInnerSymbol.node._isTrackerElem=true;selectEleObj.cornerOuterSymbol=paper.symbol("resizeIcon",0,0,-cornerSymbolRadius*.8,selectBoxG).attr({transform:t+x2+COMMA+y2,strokeWidth:1,visibility:!isSmall?VISIBLE:HIDDEN,stroke:resizeOuterSymbolColor});selectEleObj.cornerOuterSymbol.node._isTrackerElem=true;selectEleObj.resizeTracker=paper.circle(x2,y2,trackerRadius,selectBoxG).attr({"stroke-width":1,stroke:TRACKER_FILL,fill:TRACKER_FILL}).css("cursor",_lib.hasSVG&&"nwse-resize"||"nw-resize");selectEleObj.resizeTracker.node._isTrackerElem=true;selectEleObj.resizeTracker.data(configStr,{position:5,chart:chart,selectEleObj:selectEleObj,yChange:true,xChange:true});selectEleObj.closeButton=paper.symbol("closeIcon",0,0,closeButtonRadius,selectBoxG).attr({transform:"t"+x2+COMMA+y,"stroke-width":2,stroke:chartConfig.selectionCancelButtonBorderColor,fill:chartConfig.selectionCancelButtonFillColor,"stroke-linecap":ROUND,"stroke-linejoin":ROUND}).css({cursor:POINTER,_cursor:"hand"}).on("fc-click",(function(){chart.deleteSelection(this,chart)}));selectEleObj.closeButton.node._isTrackerElem=true;selectEleObj.closeButton.data(configStr,{chart:chart,index:selectEleObj.index});selectEleObj.startX=xAxis.getValue(x);selectEleObj.startY=yAxis.getValue(y);selectEleObj.endX=xAxis.getValue(x2);selectEleObj.endY=yAxis.getValue(y2);selectEleObj.isVisible=true;selectEleArr.push(selectEleObj);chart.bindDragEvent(selectEleObj)}function _deleteSelection(ele,chart){var index=ele.data(configStr).index,selectEleArr=chart.config._selectEleArr,selectEleObj,selectEleItem,xAxis=chart.getChildren("xAxis")[0],yAxis=chart.getChildren("yAxis")[0],items,bBox,eventArgs;selectEleObj=selectEleArr.find((function(item){return item.index===index}));bBox=selectEleObj.selectBoxTracker.getBBox();eventArgs={selectionLeft:bBox.x,selectionTop:bBox.y,selectionWidth:bBox.width,selectionHeight:bBox.height,startXValue:xAxis.getValue(bBox.x,1),startYValue:yAxis.getValue(bBox.y,1),endXValue:xAxis.getValue(bBox.x+bBox.width,1),endYValue:yAxis.getValue(bBox.y+bBox.height,1),data:chart.getCollatedData(),id:selectEleObj.id};for(items in selectEleObj){if(selectEleObj.hasOwnProperty(items)){selectEleItem=selectEleObj[items];selectEleItem.remove&&selectEleItem.remove();delete selectEleObj[items]}}selectEleArr=selectEleArr.filter(checkObjectLength);chart.fireChartInstanceEvent("selectionRemoved",eventArgs)}Raphael.addSymbol({resizeIcon:function resizeIcon(xVal,yVal,rad){var radius=rad,x=xVal,y=yVal,LINE_GAP=(0,_lib.pluckNumber)(radius,15)/3,LINE_DIS=3,paths=[],i;if(LINE_GAP<0){LINE_GAP=-LINE_GAP;radius=-radius;x+=radius-LINE_GAP/2;y+=radius-LINE_GAP/2}for(i=3;i>0;i-=1){paths.push(M,x-LINE_GAP*i,y-LINE_DIS,L,x-LINE_DIS,y-LINE_GAP*i)}return paths},closeIcon:function closeIcon(x,y,r){var icoX=x,icoY=y,rad=r*1.3,startAngle=43*deg2rad,endAngle=48*deg2rad,startX=icoX+rad*Math.cos(startAngle),startY=icoY+rad*Math.sin(startAngle),endX=icoX+rad*Math.cos(endAngle),endY=icoY+rad*Math.sin(endAngle),paths,r1=.71*(r-2),r2=.71*(r-2),arcPath=getArcPath(endX,endY,rad,rad,0,1);paths=[M,startX,startY];paths=paths.concat(arcPath);paths=paths.concat([M,x+r1,y-r2,L,x-r1,y+r2,M,x-r1,y-r2,L,x+r1,y+r2]);return paths},configureIcon:function configureIcon(x,y,rVal){var k=.5,r=rVal-1,l=.25,r1=r*.71,r2=(r+2)*.71,x1=x-r,y1=y-r,x2=x+r,y2=y+r,x3=x+k,y3=y+k,x4=x-k,y4=y-k,x5=x1-2,y5=y1-2,x6=x2+2,y6=y2+2,x7=x+r1,y7=y+r1,x8=x-r1,y8=y-r1,x9=x+r2,y9=y+r2,x10=x-r2,y10=y-r2,paths;paths=[M,x1,y3,L,x5,y3,x5,y4,x1,y4,x8-l,y8+l,x10-l,y10+l,x10+l,y10-l,x8+l,y8-l,x4,y1,x4,y5,x3,y5,x3,y1,x7-l,y8-l,x9-l,y10-l,x9+l,y10+l,x7+l,y8+l,x2,y4,x6,y4,x6,y3,x2,y3,x7+l,y7-l,x9+l,y9-l,x9-l,y9+l,x7-l,y7+l,x3,y2,x3,y6,x4,y6,x4,y2,x8+l,y7+l,x10+l,y9+l,x10-l,y9-l,x8-l,y7-l,Z];return paths},axisIcon:function axisIcon(x,y,rVal){var r=rVal-1,r1=r*.33,r2=r/2,x1=x-r,y1=y-r,x2=x+r2,y2=y+r,x3=x-r2,y3=y+r1,y4=y-r1,paths;paths=[M,x1,y1,L,x2,y1,x2,y2,x1,y2,M,x3,y3,L,x2,y3,M,x3,y4,L,x2,y4];return paths},loggerIcon:function loggerIcon(xVal,yVal,rVal){var r=rVal-1,y=yVal-r,x=xVal-r,r2=r*2,x1=x+r2,x2=x+2,x3=x1-2,y1=y+2,y2=y1+r,y3=y2+2,paths;paths=[M,x,y,L,x1,y,x1,y1,x3,y1,x3,y2,x1,y2,x1,y3,x,y3,x,y2,x2,y2,x2,y1,x,y1,x,y];return paths}});var SelectScatter=function(_ScatterBase){(0,_inheritsLoose2.default)(SelectScatter,_ScatterBase);SelectScatter.getName=function getName(){return"SelectScatter"};var _proto=SelectScatter.prototype;_proto.parseChartAttr=function parseChartAttr(dataObj){_ScatterBase.prototype.parseChartAttr.call(this,dataObj);this.config.formBtnTitle=(0,_lib.pluck)(dataObj.chart.submittext,dataObj.chart.formbtntitle,"Submit");this.config.restoreBtnTitle=(0,_lib.pluck)(dataObj.chart.restoretext,dataObj.chart.restorebtntitle,"Restore")};function SelectScatter(){var _this;_this=_ScatterBase.call(this)||this;_this.isXY=true;_this.defaultZeroPlaneHighlighted=false;_this.eiMethods={getData:function getData(format){var apiInstance=this.apiInstance;return apiInstance&&apiInstance.getData(format)},restoreData:function restoreData(){var apiInstance=this.apiInstance;return apiInstance&&apiInstance.restoreData()},submitData:function submitData(){var apiInstance=this.apiInstance;return apiInstance&&apiInstance.submitData()}};return _this}_proto.getName=function getName(){return"SelectScatter"};_proto.configureAttributes=function configureAttributes(dataObj){var iapi=this,chartConfig=iapi.getFromEnv("chart").config,chartAttr=iapi.getFromEnv("dataSource").chart||{};chartConfig.formAction=(0,_lib.getValidValue)(chartAttr.formaction);chartConfig.enableSubmit=(0,_lib.pluckNumber)(chartAttr.enablesubmit,chartAttr.showformbtn,1)&&chartConfig.formAction;chartConfig.enableRestore=(0,_lib.pluckNumber)(chartAttr.enablerestore,chartAttr.showrestorebtn,1);_ScatterBase.prototype.configureAttributes.call(this,dataObj)};_proto.__setDefaultConfig=function __setDefaultConfig(){_ScatterBase.prototype.__setDefaultConfig.call(this);var config=this.config;config.hasLegend=true;config.defaultDatasetType=SELECTSCATTER;config.allowreversexaxis=true;config.enablemousetracking=true};_proto.attachMenuButtons=function attachMenuButtons(){_ScatterBase.prototype.attachMenuButtons.call(this);var iapi=this,chartConfig=iapi.getFromEnv("chartConfig"),toolbar=iapi.getFromEnv("toolbar"),hamburgerMenu=toolbar.getChild("hamburgerMenu-"+toolbar.getId()+"-"+iapi.getId()+"-0"),list=[],tempObj;chartConfig.enableRestore&&list.push({name:chartConfig.restoreBtnTitle,handler:function handler(){iapi.restoreData()},action:"click"});if(chartConfig.enableSubmit){tempObj={name:chartConfig.formBtnTitle,handler:function handler(){_editableCharts.submitData.call(iapi)},action:"click"};list.push(tempObj)}list.length>0&&hamburgerMenu.appendInMenu(list)};_proto.getData=function getData(format){var iapi=this,dataObj=iapi.getCollatedData(),returnObj=[],datasets=dataObj.dataset,length=datasets&&datasets.length||0,index=0,dsInd=0,setLen,set,j;if(format){if(/^json$/gi.test(format)){returnObj=dataObj}else if(/^csv$/gi.test(format)){returnObj=iapi.getCSVString()}else{returnObj=global.core.transcodeData(dataObj,"json",format)}}else{for(;index<length;index+=1){set=datasets[index];if(set){set=datasets[index]&&datasets[index].data;j=setLen=set&&set.length||0;j&&(returnObj[dsInd]||(returnObj[dsInd]=[(0,_lib.getValidValue)(datasets[index].id,NULLSTR)]));while(j--){returnObj[dsInd][j+1]=(0,_lib.getValidValue)(set[j].id,NULLSTR)}setLen&&(dsInd+=1)}}}return returnObj};_proto.getCSVString=function getCSVString(){var dataObj=this.getData(),i=dataObj.length;while(i--){dataObj[i]=dataObj[i].join(COMMA)}return dataObj.join("|")};_proto.getCollatedData=function getCollatedData(incomingJSON){var api=this,dataset=this.getDatasets(),selectedArr=api.config._selectEleArr,len=selectedArr&&selectedArr.length||0,jsonData=incomingJSON||api.getFromEnv("dataSource"),origChartData=(0,_lib.extend2)({},jsonData),origDataSets=origChartData.dataset,xPos,yPos,oriDataArr,selectionBoxObj,lenDS=origDataSets&&origDataSets.length,isSelected=false,dataIndex,setObj,dataLen,startX,endX,startY,endY,selectedData=[];if(!len||!lenDS){return jsonData}while(len--){selectionBoxObj=selectedArr[len];if(!selectionBoxObj){continue}startX=selectionBoxObj.startX;endX=selectionBoxObj.endX;startY=selectionBoxObj.startY;endY=selectionBoxObj.endY;dataIndex=lenDS;while(dataIndex--){if(!dataset[dataIndex].getState("visible")){continue}selectedData[dataIndex]||(selectedData[dataIndex]={data:[]});oriDataArr=origDataSets[dataIndex].data;dataLen=oriDataArr&&oriDataArr.length;while(dataLen--){setObj=oriDataArr[dataLen];xPos=setObj.x;yPos=setObj.y;if(xPos>startX&&xPos<endX&&yPos<startY&&yPos>endY){selectedData[dataIndex].data[dataLen]=isSelected=true}}}}while(lenDS--){oriDataArr=origDataSets[lenDS].data;dataLen=oriDataArr&&oriDataArr.length;while(dataLen--){if(!(selectedData[lenDS]&&selectedData[lenDS].data[dataLen])){oriDataArr.splice(dataLen,1)}}}return isSelected?origChartData:jsonData};_proto.createSelectionBox=function createSelectionBox(event){_createSelectionBox.call(this,event)};_proto._deleteAllSelection=function _deleteAllSelection(){var chart=this,selectEleArr=chart.config._selectEleArr,selectEleObj,i,ii,selectEleItem,items1;if(selectEleArr){for(i=0,ii=selectEleArr.length;i<ii;i++){selectEleObj=selectEleArr[i];for(items1 in selectEleObj){if(selectEleObj.hasOwnProperty(items1)){selectEleItem=selectEleObj[items1];selectEleItem.remove&&selectEleItem.remove();delete selectEleObj[items1]}}}delete chart.config._selectEleArr}};_proto.deleteSelection=function deleteSelection(ele,chart){_deleteSelection.call(this,ele,chart)};_proto.bindDragEvent=function bindDragEvent(selectEleObj){var chart=this,item;for(item in selectEleObj){/Tracker/.test(item)&&selectEleObj[item].drag(chart.move,chart.start,chart.up)}};_proto.start=function start(){var ele=this,data=ele.data(configStr),selectEleObj=data.selectEleObj,topT=selectEleObj.topTracker,rightT=selectEleObj.rightTracker,bottomT=selectEleObj.bottomTracker,leftT=selectEleObj.leftTracker,resizeT=selectEleObj.resizeTracker,topTData=topT.data(configStr),rightTData=rightT.data(configStr),bottomTData=bottomT.data(configStr),leftTData=leftT.data(configStr),resizeTData=resizeT.data(configStr),selectTData=selectEleObj.selectBoxTracker.data(configStr),bBox=selectEleObj.selectBoxTracker.getBBox();topTData.ox=bBox.x;topTData.oy=bBox.y;rightTData.ox=bBox.x2;rightTData.oy=bBox.y;bottomTData.ox=bBox.x;bottomTData.oy=bBox.y2;leftTData.ox=bBox.x;leftTData.oy=bBox.y;topTData.ox=bBox.x;topTData.oy=bBox.y;resizeTData.ox=bBox.x2;resizeTData.oy=bBox.y2;selectTData.ox=bBox.x;selectTData.oy=bBox.y;selectTData.ow=bBox.width;selectTData.oh=bBox.height;selectTData.ox2=bBox.x2;selectTData.oy2=bBox.y2;selectEleObj.selectBoxG.toFront();topT.hide();rightT.hide();bottomT.hide();leftT.hide();resizeT.hide();ele.show()};_proto.move=function move(evt){var ele=this,data=ele.data(configStr),selectEleObj=data.selectEleObj,chart=data.chart,topT=selectEleObj.topTracker,rightT=selectEleObj.rightTracker,bottomT=selectEleObj.bottomTracker,leftT=selectEleObj.leftTracker,resizeT=selectEleObj.resizeTracker,selectT=selectEleObj.selectBoxTracker,canvasLeft=selectEleObj.canvasLeft,canvasRight=selectEleObj.canvasRight,canvasTop=selectEleObj.canvasTop,canvasBottom=selectEleObj.canvasBottom,HALF_T_WID=-6,xAxis=chart.getChildren("xAxis")[0],yAxis=chart.getChildren("yAxis")[0],selectTData=selectT.data(configStr),attrib={},bBox,dx=evt.data[0],dy=evt.data[1],eventArgs,x,y;dx=data.xChange?dx:0;dy=data.yChange?dy:0;x=dx+data.ox;y=dy+data.oy;x=Math.min(canvasRight-(data.ow||0),Math.max(x,canvasLeft));y=Math.min(canvasBottom-(data.oh||0),Math.max(y,canvasTop));switch(data.position){case 1:attrib.y=Math.min(selectTData.oy2,y);attrib.height=Math.abs(selectTData.oy2-y)||1;topT.attr({y:y+HALF_T_WID});break;case 2:attrib.x=Math.min(selectTData.ox,x);attrib.width=Math.abs(selectTData.ox-x)||1;rightT.attr({x:x+HALF_T_WID});break;case 3:attrib.y=Math.min(selectTData.oy,y);attrib.height=Math.abs(selectTData.oy-y)||1;bottomT.attr({y:y+HALF_T_WID});break;case 4:attrib.x=Math.min(selectTData.ox2,x);attrib.width=Math.abs(selectTData.ox2-x)||1;leftT.attr({x:x+HALF_T_WID});break;case 5:attrib.x=Math.min(selectTData.ox,x);attrib.width=Math.abs(selectTData.ox-x)||1;attrib.y=Math.min(selectTData.oy,y);attrib.height=Math.abs(selectTData.oy-y)||1;resizeT.attr({cx:x,cy:y});break;default:attrib.x=x;attrib.y=y;break}if(!ele.data("dragStarted")){bBox=selectT.getBBox();eventArgs={selectionLeft:bBox.x,selectionTop:bBox.y,selectionWidth:bBox.width,selectionHeight:bBox.height,startXValue:xAxis.getValue(bBox.x),startYValue:yAxis.getValue(bBox.y),endXValue:xAxis.getValue(bBox.x+bBox.width),endYValue:yAxis.getValue(bBox.y+bBox.height),id:selectEleObj.id};chart.fireChartInstanceEvent("BeforeSelectionUpdate",eventArgs);ele.data("dragStarted",1)}selectT.animate(attrib);if(selectEleObj.isVisible){selectEleObj.closeButton.hide();selectEleObj.cornerInnerSymbol.hide();selectEleObj.cornerOuterSymbol.hide();selectEleObj.isVisible=false}};_proto.up=function up(){var ele=this,data=ele.data(configStr),selectEleObj=data.selectEleObj,chart=data.chart,xAxis=chart.getChildren("xAxis")[0],yAxis=chart.getChildren("yAxis")[0],topT=selectEleObj.topTracker,rightT=selectEleObj.rightTracker,bottomT=selectEleObj.bottomTracker,leftT=selectEleObj.leftTracker,resizeT=selectEleObj.resizeTracker,selectT=selectEleObj.selectBoxTracker,RESIZE_T_RADIUS=15,HALF_T_WID=-6,bBox,eventArgs;setTimeout((function(){bBox=selectT.getBBox();selectEleObj.startX=xAxis.getValue(bBox.x);selectEleObj.startY=yAxis.getValue(bBox.y);selectEleObj.endX=xAxis.getValue(bBox.x2);selectEleObj.endY=yAxis.getValue(bBox.y2);topT.attr({x:bBox.x,y:bBox.y+HALF_T_WID,width:bBox.width});rightT.attr({x:bBox.x2+HALF_T_WID,y:bBox.y,height:bBox.height});bottomT.attr({x:bBox.x,y:bBox.y2+HALF_T_WID,width:bBox.width});leftT.attr({x:bBox.x+HALF_T_WID,y:bBox.y,height:bBox.height});resizeT.attr({cx:bBox.x2,cy:bBox.y2});selectEleObj.closeButton.transform(t+bBox.x2+COMMA+bBox.y);selectEleObj.cornerInnerSymbol.transform(t+bBox.x2+COMMA+bBox.y2);selectEleObj.cornerOuterSymbol.transform(t+bBox.x2+COMMA+bBox.y2);selectEleObj.closeButton.show();if(bBox.width<RESIZE_T_RADIUS||bBox.height<RESIZE_T_RADIUS){selectEleObj.cornerInnerSymbol.hide();selectEleObj.cornerOuterSymbol.show()}else{selectEleObj.cornerInnerSymbol.show();selectEleObj.cornerOuterSymbol.hide()}selectEleObj.isVisible=true;topT.show();rightT.show();bottomT.show();leftT.show();resizeT.show();if(ele.data("dragStarted")){eventArgs={selectionLeft:bBox.x,selectionTop:bBox.y,selectionWidth:bBox.width,selectionHeight:bBox.height,startXValue:xAxis.getValue(bBox.x),startYValue:yAxis.getValue(bBox.y),endXValue:xAxis.getValue(bBox.x+bBox.width),endYValue:yAxis.getValue(bBox.y+bBox.height),data:chart.getCollatedData(),id:selectEleObj.id};chart.fireChartInstanceEvent("SelectionUpdated",eventArgs);ele.data("dragStarted",0)}}),100)};_proto.restoreData=function restoreData(){var chart=this,datasets=[],i;chart.iterateComponents((function(child){if(child.getType&&child.getType()==="dataset"){datasets.push(child)}}));chart._deleteAllSelection();for(i=0;i<datasets.length;i++){datasets[i].asyncDraw()}chart.fireChartInstanceEvent("dataRestored",{});return true};_proto._postSpaceManagement=function _postSpaceManagement(){_ScatterBase.prototype._postSpaceManagement.call(this);this._deleteAllSelection()};_proto.getDSdef=function getDSdef(){return _selectscatter.default};_proto.getDSGroupdef=function getDSGroupdef(){return UNDEF};return SelectScatter}(_scatterbase.default);var _default=SelectScatter;exports.default=_default;