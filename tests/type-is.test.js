import {type} from "../src/typelib";

/**
 * These tests are made to detect if the `.is` property returns the expected
 * type of data. You can test browser specific types at: ./Browser tests/browser.html
 */

test("is: primitive types detection", function(){
    // Primitives
    expect(type(123).is).toBe("number");
    expect(type("Hello world!").is).toBe("string");
    expect(type(true).is).toBe("boolean");
    expect(type(false).is).toBe("boolean");
    expect(type(Symbol()).is).toBe("symbol");
    expect(type(123456n).is).toBe("bigint");
    expect(type(void 0).is).toBe("undefined");
    expect(type(null).is).toBe("null");
});

test("is: numeric types detection", function(){
    // Numeric
    expect(type(123).is).toBe("number");
    expect(type(0xf5643).is).toBe("number");
    expect(type(0b0111010).is).toBe("number");
    expect(type(0o0321564).is).toBe("number");
    expect(type(0/0).is).toBe("nan");
    expect(type(1000/0).is).toBe("infinity");
    expect(type(-1000/0).is).toBe("-infinity");
    expect(type(123n).is).toBe("bigint");
    expect(type(-123n).is).toBe("bigint");
});

test("is: common objects detection", function(){
    // Different object types
    expect(type([]).is).toBe("array");
    expect(type(new RegExp()).is).toBe("regexp");
    expect(type(Array.isArray).is).toBe("function");
    expect(type({}).is).toBe("object");
    expect(type(function(){}).is).toBe("function");
});

test("is: function types detection", function(){
    // Different function types
    expect(type(function(){}).is).toBe("function");
    expect(type(class HelloWorld{}).is).toBe("class");
    expect(type(function* (){ }).is).toBe("generatorfunction");
    expect(type(()=>{}).is).toBe("function");
});

test("is: constructors detection", function(){
    // Constructors
    expect(type(new String('Am I an object or a string? 🙈')).is).toBe("stringobject");
    expect(type(new Number(123)).is).toBe("numberobject");
    expect(type(new Boolean(false)).is).toBe("booleanobject");
    expect(type(new Set()).is).toBe("set");
    expect(type(new WeakMap()).is).toBe("weakmap");
    expect(type(new WeakSet()).is).toBe("weakset");
    expect(type(new Date()).is).toBe("date");
    expect(type(new Map()).is).toBe("map");
    expect(type(new ArrayBuffer()).is).toBe("arraybuffer");
    expect(type(new Blob()).is).toBe("blob");
});

test("is: error types detection", function(){
    // Different error types
    expect(type(Error("Normal error.")).is).toBe("error");
    expect(type(TypeError("TypeError.")).is).toBe("typeerror");
    expect(type(SyntaxError("SyntaxError.")).is).toBe("syntaxerror");
    expect(type(ReferenceError("ReferenceError.")).is).toBe("referenceerror");
    expect(type(RangeError("RangeError.")).is).toBe("rangeerror");
    expect(type(EvalError("EvalError.")).is).toBe("evalerror");
});