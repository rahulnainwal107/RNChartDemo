import{getMouseCoordinate}from"@fusioncharts/core/src/lib";var pinchStart=function pinchStart(e){startX=e.originalEvent.data.distanceX},pinchMove=function pinchMove(canvas){return function(e){var chart=canvas.getLinkedParent(),scale=canvas.config.xConfigs[0].scale,_scale$getRange=scale.getRange(),currStartRange=_scale$getRange[0],currEndRange=_scale$getRange[1],data=e.originalEvent.data,distanceX=data.distanceX,startDomainValue,diff=distanceX-startX,endDomainValue,coordinate=getMouseCoordinate(canvas.getFromEnv("chart-container"),e.originalEvent,chart),translationObj=canvas.getTranslation(),translationX=translationObj?translationObj.x:0,chartX=coordinate.chartX-translationX,r1=chartX-currStartRange,r2=currEndRange-chartX,sum=r1+r2;startX=distanceX;currStartRange+=2*diff*r1/sum;currEndRange-=2*diff*r2/sum;startDomainValue=scale.getDomainValue(currStartRange);endDomainValue=scale.getDomainValue(currEndRange);chart.setFocusLimit([startDomainValue,endDomainValue])}},startX;export default function(canvas){var config=canvas.config;if(config.enableInteraction&&!config.pinchEventAdded){canvas.addEventListener("fc-pinchstart",pinchStart);canvas.addEventListener("fc-pinchmove",pinchMove(canvas));config.pinchEventAdded=true}}