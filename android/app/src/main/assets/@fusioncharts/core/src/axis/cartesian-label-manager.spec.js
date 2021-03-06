"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _core=_interopRequireDefault(require("../../../fusioncharts/core"));var _msline=_interopRequireDefault(require("../../../fusioncharts/viz/msline"));var _utility=require("../../../../smoke-test/test-sanity/utility");_core.default.addDep(_msline.default);var chartName=_msline.default.getName(),chartID=chartName.toLowerCase();describe("labels will get drawn with size",(function(){var chartData={type:chartID,renderAt:_utility.CONTAINER_ID,width:600,height:200,dataFormat:"json",dataSource:{chart:{yaxisname:null,drawcrossline:true,theme:"candy",showanchors:true,rotatelabels:false,plothighlighteffect:"fadeout",showvalues:true,legendposition:"right",legendallowdrag:false,legendcaption:null,showlegend:true,connectnulldata:true},categories:[{category:[{label:"1"},{label:"2"},{label:"3"},{label:"4"},{label:"5"},{label:"6"},{label:"7"},{label:"8"},{label:"9"},{label:"10"},{label:"11"},{label:"12"},{label:"13"},{label:"14"},{label:"15"},{label:"16"},{label:"17"},{label:"18"},{label:"19"},{label:"20"},{label:"21"},{label:"22"},{label:"23"},{label:"24"},{label:"25"},{label:"26"},{label:"27"},{label:"28"},{label:"29"},{label:"30"},{label:"31"}]}],dataset:[{seriesname:"Total",initiallyhidden:false,showvalues:false,plottooltext:"$value",data:[{value:529.6610169491526},{value:856.8980291345331},{value:0,dashed:true,color:"#808080"},{},{value:380.37276531000384},{value:504.79555779909134},{value:0},{value:0},{value:1512.8593040847202,dashed:true,color:"#808080"},{dashed:true,color:"#808080"},{},{value:756.4296520423601},{value:0},{value:0},{value:509.94390617032127},{value:0,dashed:true,color:"#808080"},{dashed:true,color:"#808080"},{},{value:757.862826828344},{value:0},{value:503.77833753148616},{value:524.6589716684156},{value:1511.7157974300833,dashed:true,color:"#808080"},{dashed:true,color:"#808080"},{},{value:100,dashed:true,color:"#808080"},{},{},{}]}]}},chart;afterEach((function(){return chart&&chart.dispose()}));it("580 and labels some labels will be wrapped",(function(done){chartData.width=580;chart=(0,_utility.setup)(_core.default,chartData);chart.addEventListener("renderComplete",(function(e){e.detachHandler();var xAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[1],textChilds=xAxisLabelsGroup.getElementsByTagName("text"),textChildLength=textChilds.length;expect(textChildLength).toBe(31);expect(textChilds[textChildLength-1].childElementCount).toBe(2);done()}));chart.render()}));it("560 and alternate label will be skipped",(function(done){chartData.width=560;chart=(0,_utility.setup)(_core.default,chartData);chart.addEventListener("renderComplete",(function(e){e.detachHandler();var xAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[1],textChilds=xAxisLabelsGroup.getElementsByTagName("text"),textChildLength=textChilds.length;expect(textChildLength).toBe(16);expect(textChilds[textChildLength-1].childElementCount).toBe(0);done()}));chart.render()}));it("550 and alternate label will be skipped",(function(done){chartData.width=550;chart=(0,_utility.setup)(_core.default,chartData);chart.addEventListener("renderComplete",(function(e){e.detachHandler();var xAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[1],textChilds=xAxisLabelsGroup.getElementsByTagName("text"),textChildLength=textChilds.length;expect(textChildLength).toBe(16);expect(textChilds[textChildLength-1].childElementCount).toBe(0);done()}));chart.render()}));it("546 and alternate label will be skipped",(function(done){chartData.width=546;chart=(0,_utility.setup)(_core.default,chartData);chart.addEventListener("renderComplete",(function(e){e.detachHandler();var xAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[1],textChilds=xAxisLabelsGroup.getElementsByTagName("text"),textChildLength=textChilds.length;expect(textChildLength).toBe(16);expect(textChilds[textChildLength-1].childElementCount).toBe(0);done()}));chart.render()}))}));describe("labels will be displayed correctly with baseFontSize and chart width",(function(){var chartData={type:chartID,renderAt:_utility.CONTAINER_ID,height:"750",dataFormat:"json",dataSource:{chart:{legendPosition:"right",labelDisplay:"ROTATE"},categories:[{category:[{label:"Dummy Label 1"},{label:"Charts / Dummy Records / Assessments / Consultations"},{label:"Checklists - including Dummy surgical checklist"},{label:"Forms / Certificates"},{label:"Instructions / Information / Policies / Procedures / Guidelines"},{label:"Labels / Stickers / Identification Bands / Cards"},{label:"Letters / E-Mails / Records of Communication"},{label:"Reports / Results / Images"}]}],dataset:[{seriesname:"Dummy Series 1",data:[{value:"0"},{value:"11"},{value:"0"},{value:"12"},{value:"3"},{value:"2"},{value:"3"},{value:"2"}]},{seriesname:"Dummy Series 2",data:[{value:"11"},{value:"2"},{value:"1"},{value:"2"},{value:"0"},{value:"0"},{value:"6"},{value:"7"}]},{seriesname:"Dummy Series 3",data:[{value:"1"},{value:"13"},{value:"0"},{value:"1"},{value:"1"},{value:"0"},{value:"4"},{value:"2"}]},{seriesname:"Dummy Series 4",data:[{value:"1"},{value:"0"},{value:"0"},{value:"0"},{value:"0"},{value:"1"},{value:"0"},{value:"3"}]},{seriesname:"Dummy Series 5",data:[{value:"2"},{value:"1"},{value:"2"},{value:"0"},{value:"0"},{value:"0"},{value:"0"},{value:"0"}]},{seriesname:"Dummy Series 6",data:[{value:"0"},{value:"3"},{value:"0"},{value:"0"},{value:"0"},{value:"10"},{value:"1"},{value:"0"}]},{seriesname:"Dummy Series 7",data:[{value:"6"},{value:"3"},{value:"0"},{value:"0"},{value:"0"},{value:"1"},{value:"4"},{value:"7"}]},{seriesname:"Dummy Series 8",data:[{value:"1"},{value:"5"},{value:"1"},{value:"4"},{value:"7"},{value:"1"},{value:"1"},{value:"0"}]},{seriesname:"Dummy Series 9",data:[{value:"0"},{value:"0"},{value:"0"},{value:"13"},{value:"11"},{value:"8"},{value:"0"},{value:"0"}]},{seriesname:"Dummy Series 10",data:[{value:"0"},{value:"1"},{value:"0"},{value:"0"},{value:"0"},{value:"0"},{value:"0"},{value:"0"}]}]}},chart;afterEach((function(){return chart&&chart.dispose()}));it("basefontsize 18px and chart width 800px, labels will be displayed fully",(function(done){var isLessThan=function isLessThan(arg1,arg2){if(arg1<arg2)return true;return false};chartData.width=800;chartData.dataSource.chart.baseFontSize="18";chart=(0,_utility.setup)(_core.default,chartData);chart.addEventListener("renderComplete",(function(e){e.detachHandler();var xAxisLabelsGroup=document.querySelectorAll('[class*="dataset-Label-group"] > [class*="-dataset-axis"]')[1],textChilds=xAxisLabelsGroup.getElementsByTagName("text"),background=document.querySelectorAll('[class*="background"]')[0].children[1],backgroundBottomY=background.getBBox().height,textChildLength=textChilds.length;for(var ele=0;ele<textChildLength;ele++){var textElementY=+textChilds[ele].getAttribute("y")+textChilds[ele].getBBox().width;expect(isLessThan(textElementY,backgroundBottomY)).toBe(true)}done()}));chart.render()}))}));