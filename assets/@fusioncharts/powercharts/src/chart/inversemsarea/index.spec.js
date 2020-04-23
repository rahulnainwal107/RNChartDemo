"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _core=_interopRequireDefault(require("../../../../fusioncharts/core"));var _index=_interopRequireDefault(require("./index"));var _inversemsarea=_interopRequireDefault(require("../../../../../smoke-test/test-sanity/inversemsarea.sanity"));var _ignoreCaseExt=_interopRequireDefault(require("../../../../fc-features/src/ignore-case-ext"));var _utility=require("../../../../../smoke-test/test-sanity/utility");var _lib=require("../../../../fc-core/src/lib/");var _common=_interopRequireDefault(require("../../../../../smoke-test/test-sanity/common.sanity"));var chartData=_interopRequireWildcard(require("../../../../../smoke-test/test-data/data-by-chart"));_core.default.addDep(_index.default);_core.default.addDep(_ignoreCaseExt.default);var svgElement,chartName=_index.default.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:_utility.CONTAINER_ID,width:_utility.initDimensions.width,height:_utility.initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:_utility.CONTAINER_ID};_common.default.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=_inversemsarea.default.BASIC.newChart,updateData=_inversemsarea.default.BASIC.updateChart;chart={type:chartID,renderAt:_utility.CONTAINER_ID};(0,_lib.extend2)(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=_inversemsarea.default.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=_inversemsarea.default.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(dimensions){it("Chart resize passes for "+dimensions.width+" x "+dimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=_inversemsarea.default.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(dimensions.width,dimensions.height)}))}))};for(var index=0;index<_utility.resizeDimensions.length;index++){itResize(_utility.resizeDimensions[index])}}));describe("Chart EI testing: "+_index.default.getName(),(function(){var chart,chartObj,eiMethods,renderData=_inversemsarea.default.EI.newChart;chart={type:chartID,renderAt:_utility.CONTAINER_ID};(0,_lib.extend2)(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=(0,_utility.getSVG)(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in _inversemsarea.default.EI.methods){if(_inversemsarea.default.EI.methods.hasOwnProperty(key)){eiMethods(_inversemsarea.default.EI.methods[key])}}}));