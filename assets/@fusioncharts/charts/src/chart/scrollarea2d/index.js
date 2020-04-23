"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _inheritsLoose2=_interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));var _scrollcolumn2d=_interopRequireDefault(require("../scrollcolumn2d"));var _area=_interopRequireDefault(require("../../dataset/area"));var _lib=require("@fusioncharts/core/src/lib");var UNDEF,SEVENTYSTRING=_lib.preDefStr.SEVENTYSTRING,CHART_STR="Scrollable Multi-series Area Chart",SCROLL_AREA_STR="scrollarea2d";var ScrollArea2D=function(_ScrollColumn2D){(0,_inheritsLoose2.default)(ScrollArea2D,_ScrollColumn2D);ScrollArea2D.getName=function getName(){return"ScrollArea2D"};function ScrollArea2D(){var _this;_this=_ScrollColumn2D.call(this)||this;_this.hasScroll=true;_this.defaultPlotShadow=0;_this.binSize=0;return _this}var _proto=ScrollArea2D.prototype;_proto.getName=function getName(){return"ScrollArea2D"};_proto.__setDefaultConfig=function __setDefaultConfig(){_ScrollColumn2D.prototype.__setDefaultConfig.call(this);var config=this.config;config.friendlyName=CHART_STR;config.defaultDatasetType=SCROLL_AREA_STR;config.enablemousetracking=true;config.anchorborderthickness=1;config.anchorimageurl=UNDEF;config.anchorimagepadding=1;config.anchorsides=1;config.anchoralpha=UNDEF;config.anchorbgalpha=_lib.HUNDREDSTRING;config.anchorimagealpha=_lib.HUNDREDSTRING;config.anchorimagescale=100;config.anchorstartangle=90;config.anchorshadow=0;config.anchorbgcolor=UNDEF;config.anchorbordercolor=UNDEF;config.anchorradius=3;config.showvalues=1;config.plotfillalpha=SEVENTYSTRING;config.canvasborderthickness=1;config.linedashlen=5;config.linedashgap=4;config.linedashed=UNDEF;config.linealpha=_lib.HUNDREDSTRING;config.linethickness=2;config.drawfullareaborder=1;config.connectnulldata=0;config.defaultcrosslinethickness=1;config.avgScrollPointWidth=75};_proto.getDSdef=function getDSdef(){return _area.default};_proto.getDSGroupdef=function getDSGroupdef(){return UNDEF};return ScrollArea2D}(_scrollcolumn2d.default);var _default=ScrollArea2D;exports.default=_default;