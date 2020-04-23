import FusionCharts from"../../../../fusioncharts/core";import{TimeSeries}from"../../../src";import DataStore from"../../../../fc-datatable";import chartType from"../../viz/timeseries";import ignoreCaseExt from"../../../../fc-features/src/ignore-case-ext";import{setup,CONTAINER_ID}from"../../../../../smoke-test/test-sanity/utility";FusionCharts.addDep(TimeSeries);FusionCharts.addDep(ignoreCaseExt);var svgElement,chartName=chartType.getName(),chartID=chartName.toLowerCase(),doc=window.document;describe("Reference zone testing"+chartName,(function(){var chart,chartObj,itResize,renderData=[["1/1/2018 0:00:00",1044,6600168],["1/1/2018 0:02:52",975,4388475],["1/1/2018 0:05:45",1020,6865620],["1/1/2018 0:08:38",1048,4482296],["1/1/2018 0:11:31",1689,16315740],["1/1/2018 0:14:24",1291,12709895]],renderSchema=[{name:"Time",type:"date",format:"%-m/%-d/%Y %H:%M:%S"},{name:"Units Sold",type:"number"},{name:"Sale Amount",type:"number"}],dataStore=new DataStore,dataSource={chart:{animation:0},data:dataStore.createDataTable(renderData,renderSchema),caption:{text:"Sales Performance"},yaxis:[{format:{suffix:" kilowatt-hours"},align:"left",plot:{value:"Sale Amount",type:"column"},title:"Sale Amount",referenceZone:[{valueMin:"5000000",valueMax:"10000000",style:{marker:{fill:"#0000ff",stroke:"#0000ff"},"marker-notch-connector":{stroke:"#00ff00"}}}]}]};chart={type:chartID,renderAt:CONTAINER_ID,dataSource:dataSource};beforeEach((function(){chartObj=setup(FusionCharts,chart)}));afterEach((function(){if(chartObj&&!chartObj.disposed)chartObj.dispose()}));it("Reference zone should be created",(function(done){var renderComplete=function renderComplete(){var refZonePathElemns=Array.from(document.querySelector('[class$="reference-zone-group"]').getElementsByTagName("path"));expect(refZonePathElemns.length).toBeGreaterThan(0);done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Reference zone style should be applied",(function(done){var renderComplete=function renderComplete(){var refZonePathElemns=Array.from(document.querySelector('[class$="reference-zone-group"]').getElementsByTagName("path"));expect(refZonePathElemns[0].getAttribute("fill")).toBe("#0000ff");done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Sub marker elements should inherit styles",(function(done){var renderComplete=function renderComplete(){var refZoneNotch=document.querySelector('[class$="reference-zone-hover-elem-group"]').getElementsByTagName("circle")[0];expect(refZoneNotch.getAttribute("fill")).toBe("#0000ff");done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Sub marker elements should apply own styles when provided",(function(done){var renderComplete=function renderComplete(){var refZonePathElemns=Array.from(document.querySelector('[class$="reference-zone-group"]').getElementsByTagName("path"));expect(refZonePathElemns[1].getAttribute("stroke")).toBe("#00ff00");done()};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}));it("Tag marker paths should be created correctly for formatted tag values",(function(done){var onRefZoneHover=function onRefZoneHover(evt){evt.detachHandler();var refZoneHoverGroup=document.querySelector('[class$="reference-zone-hover-elem-group"]'),_refZoneHoverGroup$qu=refZoneHoverGroup.querySelector("path").getBBox(),tagTop=_refZoneHoverGroup$qu.y,tagLeft=_refZoneHoverGroup$qu.x,tagWidth=_refZoneHoverGroup$qu.width,tagHeight=_refZoneHoverGroup$qu.height,_refZoneHoverGroup$qu2=refZoneHoverGroup.querySelector("text").getBBox(),tagTextTop=_refZoneHoverGroup$qu2.y,tagTextLeft=_refZoneHoverGroup$qu2.x,tagTextWidth=_refZoneHoverGroup$qu2.width,tagTextHeight=_refZoneHoverGroup$qu2.height;expect(tagTop).toBeLessThanOrEqual(tagTextTop);expect(tagLeft).toBeLessThanOrEqual(tagTextLeft);expect(tagWidth).toBeGreaterThanOrEqual(tagTextWidth);expect(tagHeight).toBeGreaterThanOrEqual(tagTextHeight);done()},renderComplete=function renderComplete(e){e.detachHandler();FusionCharts.addEventListener("animationcomplete",onRefZoneHover);document.querySelector('[class$="reference-zone-hover-elem-group"] > circle').dispatchEvent(new MouseEvent("mouseover"))};chartObj.addEventListener("renderComplete",renderComplete);chartObj.render()}))}));