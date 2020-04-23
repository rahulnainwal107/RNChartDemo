"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var locales=_interopRequireWildcard(require("./index"));var _index2=require("../index");describe("Provided locale data",(function(){it("should be valid",(function(){for(var key in locales){if(locales.hasOwnProperty(key)){(function(){var locale=locales[key];expect("prefix"in locale).toBe(true);expect("suffix"in locale).toBe(true);expect("decimal"in locale).toBe(true);expect("grouping"in locale).toBe(true);expect("thousands"in locale).toBe(true);expect((function(){return new _index2.NumberConverter(locale)})).not.toThrow()})()}}}))}));