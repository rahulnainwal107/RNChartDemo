"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _precisionRound=_interopRequireDefault(require("./precision-round"));describe("precisionRound",(function(){it("should return correct values",(function(){expect((0,_precisionRound.default)(.1,1.1)).toBe(2);expect((0,_precisionRound.default)(.01,.99)).toBe(2);expect((0,_precisionRound.default)(.01,1)).toBe(2);expect((0,_precisionRound.default)(.01,1.01)).toBe(3)}))}));