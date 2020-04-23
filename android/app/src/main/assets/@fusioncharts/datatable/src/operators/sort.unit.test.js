"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _cars=require("../../sample/data/cars");var _datatableSortUtils=_interopRequireDefault(require("../utils/datatable-sort-utils"));var _sort=_interopRequireDefault(require("./sort"));var _datastore=_interopRequireDefault(require("../datastore"));var dataStore=new _datastore.default(_cars.carsData,_cars.schema,{enableIndex:false}),dataTable=dataStore.getDataTable(),data=dataTable.getData().data;describe("sort operator test",(function(){it("sorts in ascending order on a single column",(function(){var sortOps=(0,_sort.default)({column:"Miles_per_Gallon"}),sortFn=sortOps.fn(data,_cars.schema),sortDt=sortFn.generatorFn();expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return a[1]-b[1]}))).toBe(true)}));it("sorts in descending order on a single column",(function(){var sortOps=(0,_sort.default)({column:"Miles_per_Gallon",order:"desc"}),sortFn=sortOps.fn(data,_cars.schema),sortDt=sortFn.generatorFn();expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return b[1]-a[1]}))).toBe(true)}));it("sorts using custom function on a single column",(function(){var sortOps=(0,_sort.default)((function(a,b){return b[1]-a[1]})),sortFn=sortOps.fn(data,_cars.schema),sortDt=sortFn.generatorFn();expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return b[1]-a[1]}))).toBe(true)}));it("sort on string column - ascending order",(function(){var dataCopy=[["Japan",1e4],["India",2e4],["Argentina",15e3],["India",15e3]],dataCopySchema=[{name:"Country"},{name:"Value"}],sortOps=(0,_sort.default)({column:"Country"}),sortFn=sortOps.fn(dataCopy,dataCopySchema),sortDt=sortFn.generatorFn();expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return a[0]===b[0]?0:a[0]<b[0]?-1:1}),0)).toBe(true)}));it("sort on string column - descending order",(function(){var dataCopy=[["Japan",1e4],["India",2e4],["Argentina",15e3],["India",15e3]],dataCopySchema=[{name:"Country"},{name:"Value"}],sortOps=(0,_sort.default)({column:"Country",order:"desc"}),sortFn=sortOps.fn(dataCopy,dataCopySchema),sortDt=sortFn.generatorFn();expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return a[0]===b[0]?0:a[0]<b[0]?-1:1}),1)).toBe(true)}));it("sort on string column - when both lower and upper case is present",(function(){var dataCopy=[["Japan",1e4],["India",2e4],["Argentina",15e3],["India",15e3],["india",15e3],["InDia",15e3],["INDIA",15e3],["INdia",15e3]],dataCopySchema=[{name:"Country"},{name:"Value"}],sortOps=(0,_sort.default)({column:"Country"}),sortFn=sortOps.fn(dataCopy,dataCopySchema),sortDt=sortFn.generatorFn();expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return a[0]===b[0]?0:a[0]<b[0]?-1:1}),0)).toBe(true)}));it("sort on string column - when both lower, upper, null, undefined, numbers are present",(function(){var dataCopy=[["Japan",1e4],["India",2e4],[200,2e4],[120,2e4],["Argentina",15e3],[100,15e3],["india",15e3],["InDia",15e3],["INDIA",15e3],[null,15e3],["INdia",15e3],[undefined,15e3],["India",15e3]],dataCopySchema=[{name:"Country"},{name:"Value"}],sortOps=(0,_sort.default)({column:"Country"}),sortFn=sortOps.fn(dataCopy,dataCopySchema),sortDt=sortFn.generatorFn(),sortDtCountries=sortDt.map((function(x){return x[0]}));expect(sortDtCountries).toEqual(["Argentina","INDIA","INdia","InDia","India","India","Japan","india",100,120,200,null,undefined])}));it("sort on interval column - ascending order",(function(){var dataCopy=[[{start:+new Date(2018,5,1),end:+new Date(2018,5,30)},"A",200],[{start:+new Date(2018,6,1),end:+new Date(2018,6,30)},"B",300],[{start:+new Date(2018,1,1),end:+new Date(2018,1,30)},"C",500],[{start:+new Date(2018,4,1),end:+new Date(2018,4,30)},"D",200],[{start:+new Date(2018,3,1),end:+new Date(2018,3,30)},"E",900]],dataCopySchema=[{name:"OrderDate",type:"interval"},{name:"Name"},{name:"Value",type:"number"}],sortOps=(0,_sort.default)({column:"OrderDate"}),sortFn=sortOps.fn(dataCopy,dataCopySchema),sortDt=sortFn.generatorFn();expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return a[0].start-b[0].start}))).toBe(true)}));it("sorts multiple levels",(function(){var sortOps=(0,_sort.default)([{column:"Miles_per_Gallon"},{column:"Displacement",comparator:function comparator(a,b){return a[3]-b[3]}},{column:"Horsepower",order:"desc"}]),sortFn=sortOps.fn(data,_cars.schema),sortDt=sortFn.generatorFn(),expectedData=[],row,expectedJSON=[{Name:"datsun pl510",Miles_per_Gallon:27,Cylinders:4,Displacement:97,Horsepower:88,Weight_in_lbs:2130,Acceleration:14.5,Year:0,Origin:"Japan"},{Name:"datsun pl510",Miles_per_Gallon:27,Cylinders:4,Displacement:97,Horsepower:88,Weight_in_lbs:2130,Acceleration:14.5,Year:31536e6,Origin:"Japan"},{Name:"toyota corolla 1600 (sw)",Miles_per_Gallon:27,Cylinders:4,Displacement:97,Horsepower:88,Weight_in_lbs:2100,Acceleration:16.5,Year:63072e6,Origin:"Japan"},{Name:"volkswagen model 111",Miles_per_Gallon:27,Cylinders:4,Displacement:97,Horsepower:60,Weight_in_lbs:1834,Acceleration:19,Year:31536e6,Origin:"Europe"},{Name:"renault 12tl",Miles_per_Gallon:27,Cylinders:4,Displacement:101,Horsepower:83,Weight_in_lbs:2202,Acceleration:15.3,Year:1893024e5,Origin:"Europe"},{Name:"chevrolet cavalier wagon",Miles_per_Gallon:27,Cylinders:4,Displacement:112,Horsepower:88,Weight_in_lbs:2640,Acceleration:18.6,Year:3786912e5,Origin:"USA"},{Name:"ford mustang gl",Miles_per_Gallon:27,Cylinders:4,Displacement:140,Horsepower:86,Weight_in_lbs:2790,Acceleration:15.6,Year:3786912e5,Origin:"USA"},{Name:"pontiac phoenix",Miles_per_Gallon:27,Cylinders:4,Displacement:151,Horsepower:90,Weight_in_lbs:2735,Acceleration:18,Year:3786912e5,Origin:"USA"},{Name:"chevrolet camaro",Miles_per_Gallon:27,Cylinders:4,Displacement:151,Horsepower:90,Weight_in_lbs:2950,Acceleration:17.3,Year:3786912e5,Origin:"USA"}];for(var i=0;i<expectedJSON.length;i++){row=[];for(var attr in expectedJSON[i]){row.push(expectedJSON[i][attr])}expectedData.push(row)}expect((0,_datatableSortUtils.default)(sortDt,(function(a,b){return a[1]-b[1]}))).toBe(true);expect(sortDt.filter((function(x){return x[1]===27}))).toEqual(expectedData)}))}));