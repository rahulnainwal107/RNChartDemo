"use strict";exports.__esModule=true;exports.default=void 0;var _eventApi=require("@fusioncharts/core/src/event-api");var _urlTranscoderUtils=require("../utils/url-transcoder-utils");var BASE_FORMAT="json";var UNDEF;function fetchJSON(url,config,callback,silent,chartInstance){(0,_eventApi.triggerEvent)("dataLoadRequested",chartInstance,{source:_urlTranscoderUtils.sourceName,url:url,dataFormat:BASE_FORMAT,silent:!!silent,config:config,successcallback:callback},UNDEF,_urlTranscoderUtils.onDataLoadRequest,_urlTranscoderUtils.onDataLoadRequestCancel)}function setJSONUrl(url){this.setChartDataUrl(url,"jsonurl")}function wrapper(FusionCharts){FusionCharts&&(FusionCharts.prototype.setJSONUrl=setJSONUrl);return{format:"jsonurl",toJSON:fetchJSON}}var _default={extension:wrapper,name:"JSONUrl",type:"transcoder",requiresFusionCharts:true};exports.default=_default;