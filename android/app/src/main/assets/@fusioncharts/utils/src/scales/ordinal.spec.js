"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _ordinal=_interopRequireDefault(require("./ordinal"));describe("An ordinal scale",(function(){it("should have the correct defaults",(function(){var scaleOrdinal=new _ordinal.default;expect(scaleOrdinal.getDomain()).toEqual([]);expect(scaleOrdinal.getRange()).toEqual([]);expect(scaleOrdinal.getRangeValue(0)).toBe(undefined);expect(scaleOrdinal.getDomain()).toEqual([0])}));it("map a unique element from domain to the corresponding range element",(function(){var scaleOrdinal=new _ordinal.default;scaleOrdinal.setDomain([0,1]);scaleOrdinal.setRange(["hello","hi"]);expect(scaleOrdinal.getRangeValue(0)).toBe("hello");expect(scaleOrdinal.getRangeValue(1)).toBe("hi");scaleOrdinal.setRange(["a","b","c"]);expect(scaleOrdinal.getRangeValue(0)).toBe("a");expect(scaleOrdinal.getRangeValue("0")).toBe("a");expect(scaleOrdinal.getRangeValue(["0"])).toBe("a");expect(scaleOrdinal.getRangeValue(1)).toBe("b");expect(scaleOrdinal.getRangeValue(2)).toBe("c")}));it("should implicitly extend its domain when required",(function(){var scaleOrdinal=new _ordinal.default;scaleOrdinal.setRange(["hello","hi"]);expect(scaleOrdinal.getDomain()).toEqual([]);expect(scaleOrdinal.getRangeValue(0)).toBe("hello");expect(scaleOrdinal.getDomain()).toEqual([0]);expect(scaleOrdinal.getRangeValue(1)).toBe("hi");expect(scaleOrdinal.getDomain()).toEqual([0,1]);expect(scaleOrdinal.getRangeValue(0)).toBe("hello");expect(scaleOrdinal.getRangeValue(1)).toBe("hi")}));it("should create a sliced copy of the input domain",(function(){var arr=[1,2],scaleOrdinal=(new _ordinal.default).setDomain(arr),domain=scaleOrdinal.getDomain();expect(domain).toEqual([1,2]);domain.push(3);expect(scaleOrdinal.getDomain()).toEqual([1,2])}));it("should return a sliced copy of its domain",(function(){var arr=[],scaleOrdinal=(new _ordinal.default).setDomain(["hi","hello"]);arr=scaleOrdinal.getDomain();scaleOrdinal.getRangeValue("yo");expect(arr).toEqual(["hi","hello"])}));it("should replace the new domain",(function(){var scaleOrdinal=(new _ordinal.default).setRange(["hi","hello"]);expect(scaleOrdinal.getRangeValue(1)).toEqual("hi");expect(scaleOrdinal.getRangeValue(0)).toEqual("hello");expect(scaleOrdinal.getDomain()).toEqual([1,0]);scaleOrdinal.setDomain(["0","1"]);expect(scaleOrdinal.getRangeValue(0)).toEqual("hi");expect(scaleOrdinal.getRangeValue(1)).toEqual("hello");expect(scaleOrdinal.getDomain()).toEqual(["0","1"])}));it("should identify the domain elements with string coercion",(function(){var scaleOrdinal=(new _ordinal.default).setDomain(["hi"]).setRange([1,2,3]);expect(scaleOrdinal.getRangeValue({toString:function toString(){return"hi"}})).toBe(1);expect(scaleOrdinal.getRangeValue({toString:function toString(){return"hello"}})).toBe(2)}));it("domian values should not be coerced to string",(function(){var scaleOrdinal=(new _ordinal.default).setDomain([0,1]);expect(scaleOrdinal.getDomain()).toEqual([0,1])}));it("should be able to deal with object built-ins",(function(){var scaleOrdinal=(new _ordinal.default).setRange([0,1]).setDomain(["__proto__","hasOwnProperty"]);expect(scaleOrdinal.getRangeValue("__proto__")).toBe(0);expect(scaleOrdinal.getRangeValue("hasOwnProperty")).toBe(1);expect(scaleOrdinal.getDomain()).toEqual(["__proto__","hasOwnProperty"])}));it("should order its domain by appearence",(function(){var scaleOrdinal=new _ordinal.default;scaleOrdinal.getRangeValue("one");scaleOrdinal.getRangeValue("two");scaleOrdinal.getRangeValue("three");expect(scaleOrdinal.getDomain()).toEqual(["one","two","three"]);scaleOrdinal.setDomain(["two","three"]);scaleOrdinal.getRangeValue("one");expect(scaleOrdinal.getDomain()).toEqual(["two","three","one"]);scaleOrdinal.setDomain(["three","one"]);expect(scaleOrdinal.getDomain()).toEqual(["three","one"]);scaleOrdinal.setDomain([]);scaleOrdinal.getRangeValue("four");scaleOrdinal.getRangeValue("two");expect(scaleOrdinal.getDomain()).toEqual(["four","two"])}));it("should create a sliced copy of the input Range",(function(){var arr=[1,2],scaleOrdinal=(new _ordinal.default).setRange(arr),range=scaleOrdinal.getRange();expect(range).toEqual([1,2]);range.push(3);expect(scaleOrdinal.getRange()).toEqual([1,2])}));it("should return a sliced copy of its Range",(function(){var arr=[],scaleOrdinal=(new _ordinal.default).setRange(["hi","hello"]);arr=scaleOrdinal.getRange();scaleOrdinal.setRange([1,2]);expect(arr).toEqual(["hi","hello"])}));it("should correctly update the implicit domain-range association",(function(){var scaleOrdinal=new _ordinal.default;expect(scaleOrdinal.getRangeValue(0)).toBeUndefined();expect(scaleOrdinal.getRangeValue(1)).toBeUndefined();scaleOrdinal.setRange(["foo","bar"]);expect(scaleOrdinal.getRangeValue(1)).toBe("bar");expect(scaleOrdinal.getRangeValue(0)).toBe("foo")}));it("should allow setting the value for unknown inputs",(function(){var ordinalScale=new _ordinal.default;ordinalScale.setDomain(["lorem","dolor"]);ordinalScale.setUnknown(".");ordinalScale.setRange(["ipsum","si"]);expect(ordinalScale.getRangeValue("lorem")).toBe("ipsum");expect(ordinalScale.getRangeValue("dolor")).toBe("si");expect(ordinalScale.getRangeValue("amet")).toBe(".");expect(ordinalScale.getRangeValue("is")).toBe(".")}));it("should not implicitly extend the domain if the unknown is not implicit",(function(){var ordinalScale=new _ordinal.default;ordinalScale.setDomain(["hi","hello"]);ordinalScale.setUnknown(undefined);ordinalScale.setRange(["no","yes"]);expect(ordinalScale.getRangeValue("khila")).toBeUndefined();expect(ordinalScale.getDomain()).toEqual(["hi","hello"])}));it("should recycle range values when exhausted",(function(){var ordinalScale=(new _ordinal.default).setRange(["x","y","z"]);expect(ordinalScale.getRangeValue(0)).toBe("x");expect(ordinalScale.getRangeValue(1)).toBe("y");expect(ordinalScale.getRangeValue(2)).toBe("z");expect(ordinalScale.getRangeValue(3)).toBe("x")}))}));