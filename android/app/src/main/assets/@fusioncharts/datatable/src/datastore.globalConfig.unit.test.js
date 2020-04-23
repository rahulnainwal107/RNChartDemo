"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _datastore=_interopRequireDefault(require("./datastore"));var _operators=require("./operators");var _globalConfig=require("./globalConfig");var _datetimeEnums=require("../../fc-utils/src/datetime-enums");var DS,DT,DT1,ops,result,dataArr=[["01-Jan-2015 9:50","55","100"],["01-Jan-2015 14:50","55","100"],["02-Jan-2015 11:09","56","106"],["02-Jan-2015 14:47","56","106"],["03-Jan-2015 00:31","59","108"],["04-Jan-2015 2:44","50","102"],["04-Jan-2015 10:31","50","102"],["04-Jan-2015 15:05","50","102"],["05-Jan-2015 13:00","56","108"]],schemaArr=[{name:"Time",type:"date",format:"%e-%b-%Y %-H:%M"},{name:"Downloads",type:"number"},{name:"Web Visits",type:"number"}];describe("enableUTC testing",(function(){describe("getData in master data table",(function(){it("test default enableUTC to be false",(function(){DS=new _datastore.default(dataArr,schemaArr,{enableIndex:true,indexBy:"Time"});DT=DS.getDataTable();result=DT.getData();expect(result.data[0][0]).toBe(1420086e6)}));it("set enableUTC to be true to work",(function(){(0,_globalConfig.setConfig)("enableUTC",true);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:true,indexBy:"Time"});DT=DS.getDataTable();result=DT.getData();expect(result.data[0][0]).toBe(14201058e5)}))}));describe("groupby operation with interval data",(function(){it("single sorted - set enableUTC to be false to work",(function(){(0,_globalConfig.setConfig)("enableUTC",false);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:true,indexBy:"Time"});DT=DS.getDataTable();ops=(0,_operators.groupBy)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200506e5)}));it("single sorted - set enableUTC to be true to work",(function(){(0,_globalConfig.setConfig)("enableUTC",true);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:true,indexBy:"Time"});DT=DS.getDataTable();ops=(0,_operators.groupBy)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200704e5)}));it("unsorted/multiple - set enableUTC to be false to work",(function(){(0,_globalConfig.setConfig)("enableUTC",false);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:false});DT=DS.getDataTable();ops=(0,_operators.groupBy)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200506e5)}));it("unsorted/multiple - set enableUTC to be true to work",(function(){(0,_globalConfig.setConfig)("enableUTC",true);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:false});DT=DS.getDataTable();ops=(0,_operators.groupBy)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200704e5)}))}));describe("pivot operation with interval data",(function(){it("set enableUTC to be false to work",(function(){(0,_globalConfig.setConfig)("enableUTC",false);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:true,indexBy:"Time"});DT=DS.getDataTable();ops=(0,_operators.pivot)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],"Web Visits",[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200506e5)}));it("set enableUTC to be true to work",(function(){(0,_globalConfig.setConfig)("enableUTC",true);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:true,indexBy:"Time"});DT=DS.getDataTable();ops=(0,_operators.pivot)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],"Web Visits",[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200704e5)}));it("unsorted/multiple - set enableUTC to be false to work",(function(){(0,_globalConfig.setConfig)("enableUTC",false);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:false});DT=DS.getDataTable();ops=(0,_operators.pivot)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],"Web Visits",[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200506e5)}));it("unsorted/multiple - set enableUTC to be true to work",(function(){(0,_globalConfig.setConfig)("enableUTC",true);DS=new _datastore.default(dataArr,schemaArr,{enableIndex:false});DT=DS.getDataTable();ops=(0,_operators.pivot)([{column:"Time",timeUnit:_datetimeEnums.DatetimeUnits.Day}],"Web Visits",[{column:"Downloads",operation:"sum"}]);DT1=DT.query(ops);result=DT1.getData();expect(result.data[0][0].start).toBe(14200704e5)}))}))}));