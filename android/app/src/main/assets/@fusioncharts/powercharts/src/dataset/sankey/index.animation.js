"use strict";exports.__esModule=true;exports.default=void 0;var _default={"*.dataset.sankey":function datasetSankey(){var dataset=this,clipCanvas=dataset.getClip("canvas"),clipCanvasInit=dataset.getClip("init");return{"linkGroup.appearing":function linkGroupAppearing(){return[{initialAttr:{"clip-rect":clipCanvasInit},finalAttr:{"clip-rect":clipCanvas},slot:"plot"}]},"nodeGroup.appearing":function nodeGroupAppearing(){return[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"axis"}]},"nodeLabelGroup.appearing":function nodeLabelGroupAppearing(){return[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"final"}]}}}};exports.default=_default;