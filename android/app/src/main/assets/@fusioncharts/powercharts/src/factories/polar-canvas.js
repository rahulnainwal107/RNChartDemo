"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=_default;var _polarCanvas=_interopRequireDefault(require("../_internal/components/canvases/polar-canvas"));var _axisRefPolarComponent=_interopRequireDefault(require("@fusioncharts/core/src/axis-ref-visuals/axis-ref-polar-component"));var _lib=require("@fusioncharts/core/src/lib");function _default(chart){var pCanvas;(0,_lib.componentFactory)(chart,_polarCanvas.default,"canvas",chart.config.showVolumeChart?2:1);pCanvas=chart.getChildren("canvas");for(var i=0,len=pCanvas.length;i<len;i++){pCanvas[i].configure();(0,_lib.componentFactory)(pCanvas[i],_axisRefPolarComponent.default,"axisRefVisualPolar")}}