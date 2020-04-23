"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=_default;var _colorrange=_interopRequireDefault(require("@fusioncharts/core/src/color-utils/colorrange"));function _createColorRangeManager(chart){var manager=chart.getChildren("colorManager");if(!chart.getFromEnv("dataSource").colorrange){manager&&(manager[0].config.legendItemIds=[]);chart.deleteFromEnv("colorManager");return}if(manager){chart.addToEnv("colorManager",manager[0]);manager[0].configure();return}manager=new _colorrange.default;chart.attachChild(manager,"colorManager");chart.addToEnv("colorManager",manager);manager.configure()}function _default(chart){_createColorRangeManager(chart)}