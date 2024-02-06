import {type} from "../src/typelib";
import {arraysMatch} from "./lib/arrays-match.js";

/**
 * These tests are made to evaluate the `.kinds` property, but also:
 * `.isTruthy`, `.isFalsy`, `.isNullish`, `.isNumeric`, `.isNumber`, `.isFunction`,
 * `.isError`, `.isObject`, `.isPrimitive`
 */

/**
 * Shortcut for `type(data).kinds`
 * @param {*} data 
 * @returns {Array}
 */
const getKinds = function(data){
    return type(data).kinds;
}

test("kinds: truthy and falsy kinds detection", function(){
    // Truthy and falsy
    expect(arraysMatch(getKinds(true), ["truthy", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(false), ["falsy", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(123), ["truthy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(0), ["falsy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds("Hello World"), ["truthy", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(""), ["falsy", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(123n), ["truthy", "numeric", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(0n), ["falsy", "numeric", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(NaN), ["falsy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(undefined), ["falsy", "nullish", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(null), ["falsy", "nullish", "primitive"])).toBe(true);
});

test("kinds: number and numeric kinds detection", function(){
    // Numeric and numbers
    expect(arraysMatch(getKinds(123), ["truthy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(123n), ["truthy", "numeric", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(NaN), ["falsy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(Infinity), ["truthy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(-Infinity), ["truthy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(1_234_567), ["truthy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(0xfa561), ["truthy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(0b0101110), ["truthy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(0o054062), ["truthy", "numeric", "number", "primitive"])).toBe(true);
});

test("kinds: nullish kinds detection", function(){
    // Nullish
    expect(arraysMatch(getKinds(undefined), ["falsy", "nullish", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(null), ["falsy", "nullish", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(void 0), ["falsy", "nullish", "primitive"])).toBe(true);
});

test("kinds: function kinds detection", function(){
    // Functions
    expect(arraysMatch(getKinds(function(){}), ["truthy", "function", "object"])).toBe(true);
    expect(arraysMatch(getKinds(class HelloWorld{}), ["truthy", "function", "object"])).toBe(true);
    expect(arraysMatch(getKinds(function* (){}), ["truthy", "function", "object"])).toBe(true);
    expect(arraysMatch(getKinds(()=>{}), ["truthy", "function", "object"])).toBe(true);
});

test("kinds: primitive and object kinds detection", function(){
    // Objects and primitives
    expect(arraysMatch(getKinds(0), ["falsy", "numeric", "number", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(new Number(0)), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds(""), ["falsy", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(new String("")), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds(false), ["falsy", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(new Boolean(false)), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds(null), ["falsy", "nullish", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(undefined), ["falsy", "nullish", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds(Symbol()), ["truthy", "primitive"])).toBe(true);
    expect(arraysMatch(getKinds({}), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds([]), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds(/^TypeLib/g), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds(()=>{}), ["truthy", "function", "object"])).toBe(true);
    expect(arraysMatch(getKinds(new Date()), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds(new Set()), ["truthy", "object"])).toBe(true);
    expect(arraysMatch(getKinds(new Map()), ["truthy", "object"])).toBe(true);
});

test("kinds: error kinds detection", function(){
    // Errors
    expect(arraysMatch(getKinds(Error("Normal error.")), ["truthy", "error", "object"])).toBe(true);
    expect(arraysMatch(getKinds(TypeError("TypeError.")), ["truthy", "error", "object"])).toBe(true);
    expect(arraysMatch(getKinds(SyntaxError("SyntaxError.")), ["truthy", "error", "object"])).toBe(true);
    expect(arraysMatch(getKinds(ReferenceError("ReferenceError.")), ["truthy", "error", "object"])).toBe(true);
    expect(arraysMatch(getKinds(RangeError("RangeError.")), ["truthy", "error", "object"])).toBe(true);
    expect(arraysMatch(getKinds(EvalError("EvalError.")), ["truthy", "error", "object"])).toBe(true);
});