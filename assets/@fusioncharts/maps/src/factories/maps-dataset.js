"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=_default;var _lib=require("@fusioncharts/core/src/lib");var _entities=_interopRequireDefault(require("../dataset/entities"));var _markers=_interopRequireDefault(require("../dataset/markers"));var _mapGroup=_interopRequireDefault(require("../dataset/groups/map-group"));function _default(chart){var mapGroupManager,dataObj=chart.getFromEnv("dataSource"),entityJSONData=dataObj.data||{},markerJSONData=dataObj.markers;(0,_lib.componentFactory)(chart,_mapGroup.default,"mapGroup");mapGroupManager=chart.getChildren("mapGroup")[0];(0,_lib.datasetFactory)(mapGroupManager,_entities.default,"entities",1,[entityJSONData]);if(markerJSONData){(0,_lib.datasetFactory)(mapGroupManager,_markers.default,"markers",1,[markerJSONData])}else{chart.getDatasets()[1]&&chart.getDatasets()[1].remove()}}