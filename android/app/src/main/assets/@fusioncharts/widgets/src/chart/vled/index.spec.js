"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _core=_interopRequireDefault(require("../../../../fusioncharts/core"));var _index=_interopRequireDefault(require("./index"));var _vled=_interopRequireDefault(require("../../../../../smoke-test/test-sanity/vled.sanity"));var _ignoreCaseExt=_interopRequireDefault(require("../../../../fc-features/src/ignore-case-ext"));var _utility=require("../../../../../smoke-test/test-sanity/utility");var _lib=require("../../../../fc-core/src/lib/");var _common=_interopRequireDefault(require("../../../../../smoke-test/test-sanity/common.sanity"));var chartData=_interopRequireWildcard(require("../../../../../smoke-test/test-data/data-by-chart"));_core.default.addDep(_index.default);_core.default.addDep(_ignoreCaseExt.default);var svgElement,chartName=_index.default.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:_utility.CONTAINER_ID,width:_utility.initDimensions.width,height:_utility.initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:_utility.CONTAINER_ID};_common.default.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=_vled.default.BASIC.newChart,updateData=_vled.default.BASIC.updateChart;chart={type:chartID,renderAt:_utility.CONTAINER_ID};(0,_lib.extend2)(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=_vled.default.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=_vled.default.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(resizeDimensions){it("Chart resize passes for "+resizeDimensions.width+" x "+resizeDimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=_vled.default.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(resizeDimensions.width,resizeDimensions.height)}))}))};for(var index=0;index<_utility.resizeDimensions.length;index++){itResize(_utility.resizeDimensions[index])}}));describe("Chart EI testing: "+_index.default.getName(),(function(){var chart,chartObj,eiMethods,renderData=_vled.default.EI.newChart;chart={type:chartID,renderAt:_utility.CONTAINER_ID};(0,_lib.extend2)(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=(0,_utility.getSVG)(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in _vled.default.EI.methods){if(_vled.default.EI.methods.hasOwnProperty(key)){eiMethods(_vled.default.EI.methods[key])}}}));describe("Scale position testing",(function(){var chartObj,data={chart:{lowerlimit:"0",upperlimit:"120",lowerlimitdisplay:"Low",upperlimitdisplay:"High",palette:"1",numbersuffix:"dB",chartrightmargin:"20",animation:"0",scaleposition:"left"},colorrange:{color:[{minvalue:"0",maxvalue:"60",code:"FF0000"},{minvalue:"60",maxvalue:"90",code:"FFFF00"},{minvalue:"90",maxvalue:"120",code:"00FF00"}]},value:"102"},chart={type:chartID,renderAt:_utility.CONTAINER_ID,width:600,height:400,dataFormat:"json",dataSource:data};beforeAll((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterAll((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Scale will be rendered on left",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("scale")[0].config.axisDimention,scaleLabelsGroup=document.querySelectorAll('[class*="axistop"] > [class*="dataset-Label-group"]')[0],label=scaleLabelsGroup.getElementsByTagName("text")[0];expect(dim.x).toBe(53);expect(label.getAttribute("x")).toBe("42");done()}));chartObj.render()}));it("Scale will be updated to render on right",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("scale")[0].config.axisDimention,scaleLabelsGroup=document.querySelectorAll('[class*="axistop"] > [class*="dataset-Label-group"]')[0],label=scaleLabelsGroup.getElementsByTagName("text")[0];expect(dim.x).toBe(542);expect(label.getAttribute("x")).toBe("553");done()}));data.chart.scaleposition=undefined;chartObj.setJSONData(data)}));it("Scale will be updated to render on left with depricated attribute ticksOnRight",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("scale")[0].config.axisDimention,scaleLabelsGroup=document.querySelectorAll('[class*="axistop"] > [class*="dataset-Label-group"]')[0],label=scaleLabelsGroup.getElementsByTagName("text")[0];expect(dim.x).toBe(53);expect(label.getAttribute("x")).toBe("42");done()}));data.chart.ticksOnRight=0;chartObj.setJSONData(data)}));it("Scale will be updated to render on right since scalePosition has higher priority",(function(done){chartObj.addEventListener("renderComplete",(function(e){e.detachHandler();var dim=chartObj.apiInstance.getChildren("scale")[0].config.axisDimention,scaleLabelsGroup=document.querySelectorAll('[class*="axistop"] > [class*="dataset-Label-group"]')[0],label=scaleLabelsGroup.getElementsByTagName("text")[0];expect(dim.x).toBe(542);expect(label.getAttribute("x")).toBe("553");done()}));data.chart.scaleposition="right";chartObj.setJSONData(data)}))}));