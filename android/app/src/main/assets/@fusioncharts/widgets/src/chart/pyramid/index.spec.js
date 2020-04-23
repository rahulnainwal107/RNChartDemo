"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _core=_interopRequireDefault(require("../../../../fusioncharts/core"));var _index=_interopRequireDefault(require("./index"));var _pyramid=_interopRequireDefault(require("../../../../../smoke-test/test-sanity/pyramid.sanity"));var _ignoreCaseExt=_interopRequireDefault(require("../../../../fc-features/src/ignore-case-ext"));var _utility=require("../../../../../smoke-test/test-sanity/utility");var _lib=require("../../../../fc-core/src/lib/");var _common=_interopRequireDefault(require("../../../../../smoke-test/test-sanity/common.sanity"));var chartData=_interopRequireWildcard(require("../../../../../smoke-test/test-data/data-by-chart"));_core.default.addDep(_index.default);_core.default.addDep(_ignoreCaseExt.default);var svgElement,chartName=_index.default.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Running common chart tests for "+chartName,(function(){var chart={type:chartID,renderAt:_utility.CONTAINER_ID,width:_utility.initDimensions.width,height:_utility.initDimensions.height,dataFormat:"json",dataSource:{}},config={chartID:chartID,chart:chart,document:doc,chartWrapperId:_utility.CONTAINER_ID};_common.default.forEach((function(test){var itArr;if(test.name&&test.run){it(test.name,(function(done){test.run(config,(function(result){expect(result).toBe(true);done()}))}))}else if(test.iterator){itArr=test.iterator(chart);itArr.forEach((function(subTest){it(subTest.name,(function(done){subTest.run(config,(function(result){expect(result).toBe(true);done()}))}))}))}}))}));describe("Chart basic testing: "+chartName,(function(){var chart,chartObj,itResize,renderData=_pyramid.default.BASIC.newChart,updateData=_pyramid.default.BASIC.updateChart;chart={type:chartID,renderAt:_utility.CONTAINER_ID};(0,_lib.extend2)(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Rendered chart validation passes",(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=_pyramid.default.BASIC.validate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.render();chartObj.addEventListener("renderComplete",renderComplete)}));it("Chart update passes",(function(done){expect(chartObj).toBeDefined();var called=0;var renderComplete=function renderComplete(){if(called===0){called++;chartObj.setChartData(updateData||chart.dataSource,"json")}else if(called===1){var response=_pyramid.default.BASIC.updateValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));itResize=function itResize(resizeDimensions){it("Chart resize passes for "+resizeDimensions.width+" x "+resizeDimensions.height,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){var response=_pyramid.default.BASIC.resizeValidate(chartObj);expect(response.flag).toBe(true,response.messages.join(" && "));done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render((function(){chartObj.resizeTo(resizeDimensions.width,resizeDimensions.height)}))}))};for(var index=0;index<_utility.resizeDimensions.length;index++){itResize(_utility.resizeDimensions[index])}}));describe("Chart EI testing: "+_index.default.getName(),(function(){var chart,chartObj,eiMethods,renderData=_pyramid.default.EI.newChart;chart={type:chartID,renderAt:_utility.CONTAINER_ID};(0,_lib.extend2)(chart,renderData);chart.dataSource=chart.dataSource?chart.dataSource:chartData[chartID]["default"];chart.dataSource.chart.animation="0";beforeEach((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));eiMethods=function eiMethods(methodObj){it(methodObj.name,(function(done){expect(chartObj).toBeDefined();var renderComplete=function renderComplete(){svgElement=(0,_utility.getSVG)(chartObj);methodObj.fn(svgElement,chartObj,(function(result){expect(result).toBe(true);done()}))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))};for(var key in _pyramid.default.EI.methods){if(_pyramid.default.EI.methods.hasOwnProperty(key)){eiMethods(_pyramid.default.EI.methods[key])}}}));describe("Text outline testing "+chartName,(function(){var chart,chartObj,itResize,renderData={chart:{caption:"Conversion Ratio",subcaption:"May 2007",textoutline:"1",animation:"1"},data:[{label:"Website Visits",value:"385634"},{label:"Downloads",value:"175631"},{label:"Interested to buy",value:"84564"}]},updateDataWithNoOutline={chart:{caption:"Conversion Ratio",subcaption:"May 2007",animation:"1"},data:[{label:"Website Visits",value:"385634"},{label:"Downloads",value:"175631"},{label:"Interested to buy",value:"84564"}]};chart={type:chartID,renderAt:_utility.CONTAINER_ID,dataSource:renderData};beforeEach((function(){chartObj=(0,_utility.setup)(_core.default,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Text outline should get applied",(function(done){var renderComplete=function renderComplete(){var labelElement=document.querySelector('[class$="datalabel').getElementsByTagName("text")[0];expect(labelElement.getAttribute("filter")).not.toBe(null);done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Text outline should be removed",(function(done){var updateFlag=0,renderComplete=function renderComplete(){if(!updateFlag){updateFlag=1;chartObj.setJSONData(updateDataWithNoOutline)}else{var labelElement=document.querySelector('[class$="datalabel').getElementsByTagName("text")[0];expect(labelElement.getAttribute("filter")).toBe(null);done()}};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));describe("pyramid and funnel minPLotHeightForValue testing",(function(){var chartObj,renderInfo={type:"pyramid",renderAt:_utility.CONTAINER_ID,width:"600",height:"350",dataFormat:"json"},data={chart:{caption:"Monthly",xaxisname:"Month",yaxisname:"Revenue",numberprefix:"$",plottooltext:"<div>br is applied</div>",drawcrossline:"1",showValues:"1",is2D:"1",showLabelsAtCenter:"1"},data:[{label:"Jan",value:"420000",showValue:"1"},{label:"Feb",value:"910000",showValue:"0"},{label:"Mar",value:"720000",minPlotHeightForValue:"20"},{label:"Apr",value:"550000",minPlotHeightForValue:"150"},{label:"May",value:"810000"},{label:"Jun",value:"510000"},{label:"Jul",value:"680000"},{label:"Aug",value:"620000"},{label:"Sep",value:"610000"},{label:"Oct",value:"490000"},{label:"Nov",value:"530000"},{label:"Dec",value:"330000"}]};beforeEach((function(){renderInfo.dataSource=data;chartObj=(0,_utility.setup)(_core.default,renderInfo)}));afterEach((function(){chartObj&&!chartObj.disposed&&chartObj.dispose()}));it("chart dataplot will appear when plotLavel ShowValue is set one",(function(done){chartObj.addEventListener("renderComplete",(function(){var dataLabelObj=document.querySelectorAll('[class*="-datalabel"]')[1].children[23];if(dataLabelObj.innerHTML==="Jan, $420K"){done()}}));chartObj.render()}));it("chart dataplot will appear when plotLavel ShowValue is not set, parent has showValue 1 and plot height is equal or more than minPlotHeightForValue",(function(done){chartObj.addEventListener("renderComplete",(function(){var dataLabelObj=document.querySelectorAll('[class*="-datalabel"]')[1].children[19];if(dataLabelObj.innerHTML==="Mar, $720K"){done()}}));chartObj.render()}));it("chart dataplot will not appear when plotLavel ShowValue is not set, parent has showValue 1 and plot height is less than minPlotHeightForValue",(function(done){chartObj.addEventListener("renderComplete",(function(){var dataLabelObj=document.querySelectorAll('[class*="-datalabel"]')[1].children[17];if(dataLabelObj.style.display==="none"){done()}}));chartObj.render()}))}));