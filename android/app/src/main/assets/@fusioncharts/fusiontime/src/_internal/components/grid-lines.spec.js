import GridLines from"./grid-lines";describe("FTGL_TS_1: To verify correct drawing of grid lines",(function(){var UNIT=[0,1];var gridLine,graphicalElements={},getStyleDef=function getStyleDef(styleDef){return styleDef},xScale={getRange:function getRange(v){return v*1.5},copy:function copy(){return this},setRange:function setRange(inputArr){if(inputArr===void 0){inputArr=UNIT}this.range=inputArr.slice()},getRangeValue:function getRangeValue(v){return Number(v)},getDomain:function getDomain(){return[new Date("Sat Feb 01 2014 05:30:00 GMT0530"),new Date("Sun Feb 02 2014 20:30:00 GMT0530")]}},yScale=xScale={getRange:function getRange(v){return v*1.5},copy:function copy(){return this},setRange:function setRange(inputArr){if(inputArr===void 0){inputArr=UNIT}this.range=inputArr.slice()},getRangeValue:function getRangeValue(v){return Number(v)},getDomain:function getDomain(){return[new Date("Sat Feb 01 2014 05:30:00 GMT0530"),new Date("Sun Feb 02 2014 20:30:00 GMT0530")]},ticks:function ticks(){var ticks=[0,2e5,4e5,6e5,8e5,1e6,12e5];return ticks}};beforeEach((function(){gridLine=new GridLines;gridLine.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};gridLine.getGraphicalElement=function(id){return graphicalElements[id]};gridLine.getLinkedParent=function(){return{config:{canvasHeight:250,canvasLeft:0,canvasTop:0,canvasWidth:500}}};gridLine.addToEnv("getStyleDef",getStyleDef);gridLine.addToEnv("xScale",xScale);gridLine.addToEnv("yScale",yScale)}));afterEach((function(){gridLine=undefined;graphicalElements={}}));it("FTGL_TC_1: To verify the number of grid lines acoording to data.",(function(){var count=0;gridLine.__setDefaultConfig();gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){count++}}expect(count).toBe(7)}));it("FTGL_TC_2: Grid Lines should not be drawn if its hidden through configuration",(function(){var count=0;gridLine.__setDefaultConfig();gridLine.configureAttributes({showgridlines:0});gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){count++}}expect(count).toBe(0)}));it("FTGL_TC_3: To verify the direction of horizontal grid lines.",(function(){gridLine.__setDefaultConfig();gridLine.configureAttributes({direction:"horizontal"});gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){expect(graphicalElements[id].attr.path[3]).toBe("H")}}}));it("FTGL_TC_4: To verify the direction of vertical grid lines.",(function(){gridLine.__setDefaultConfig();gridLine.configureAttributes({direction:"vertical"});gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){expect(graphicalElements[id].attr.path[3]).toBe("V")}}}));it("FTGL_TC_5: To verify that horizontal gridlines are drawn if direction is not given or wrong.",(function(){gridLine.__setDefaultConfig();gridLine.configureAttributes({direction:"xyz"});gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){expect(graphicalElements[id].attr.path[3]).toBe("H")}}}));it("FTGL_TC_6: To verify the dimension of grid lines, its length should be equal to canvas width for horizontal grid lines",(function(){gridLine.__setDefaultConfig();gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){expect(graphicalElements[id].attr.path[4]).toBe(500)}}}));it("FTGL_TC_7: To verify the dimension of grid lines, its length should be equal to canvas height for vertical grid lines",(function(){gridLine.__setDefaultConfig();gridLine.configureAttributes({direction:"vertical"});gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){expect(graphicalElements[id].attr.path[2]).toBe(250)}}}));it("FTGL_TC_8: Extreme lines should not be drawn when it is set to zero.",(function(){var count=0;gridLine.__setDefaultConfig();gridLine.configureAttributes({showboundarygridlines:0});gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){count++}}expect(count).toBe(5)}))}));describe("FTGL_TS_2: To verify the cosmetics of grid lines",(function(){var UNIT=[0,1];var gridLine,graphicalElements={},getStyleDef=function getStyleDef(styleDef){return styleDef},xScale={getRange:function getRange(v){return v*1.5},copy:function copy(){return this},setRange:function setRange(inputArr){if(inputArr===void 0){inputArr=UNIT}this.range=inputArr.slice()},getRangeValue:function getRangeValue(v){return Number(v)},getDomain:function getDomain(){return[new Date("Sat Feb 01 2014 05:30:00 GMT0530"),new Date("Sun Feb 02 2014 20:30:00 GMT0530")]}},yScale=xScale={getRange:function getRange(v){return v*1.5},copy:function copy(){return this},setRange:function setRange(inputArr){if(inputArr===void 0){inputArr=UNIT}this.range=inputArr.slice()},getRangeValue:function getRangeValue(v){return Number(v)},getDomain:function getDomain(){return[new Date("Sat Feb 01 2014 05:30:00 GMT0530"),new Date("Sun Feb 02 2014 20:30:00 GMT0530")]},ticks:function ticks(){var ticks=[0,2e5,4e5,6e5,8e5,1e6,12e5];return ticks}};beforeEach((function(){gridLine=new GridLines;gridLine.addGraphicalElement=function(obj){graphicalElements[obj.id]=obj};gridLine.getGraphicalElement=function(id){return graphicalElements[id]};gridLine.getLinkedParent=function(){return{config:{canvasHeight:250,canvasLeft:0,canvasTop:0,canvasWidth:500}}};gridLine.addToEnv("getStyleDef",getStyleDef);gridLine.addToEnv("xScale",xScale);gridLine.addToEnv("yScale",yScale)}));afterEach((function(){gridLine=undefined;graphicalElements={}}));it("FTGL_TC_9: To verify that cosmetics are applied as per given style.",(function(){gridLine.__setDefaultConfig();gridLine.configureAttributes({style:{stroke:"#0000ff","stroke-width":"2","stroke-opacity":"1"}});gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){expect(graphicalElements[id].attr.stroke).toBe("#0000ff");expect(graphicalElements[id].attr["stroke-width"]).toBe("2");expect(graphicalElements[id].attr["stroke-opacity"]).toBe("1")}}}));it("FTGL_TC_10: Default value should be applied if value is not provided or invalid value is given.",(function(){gridLine.__setDefaultConfig();gridLine.draw();for(var id in graphicalElements){if(graphicalElements[id].label==="line"){expect(graphicalElements[id].attr.stroke).toBe("#dfdfdf");expect(graphicalElements[id].attr["stroke-width"]).toBe("1");expect(graphicalElements[id].attr["stroke-opacity"]).toBe("0.6")}}}))}));