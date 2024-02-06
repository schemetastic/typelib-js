import {type} from "../src/typelib";
import {typeErrorIf} from "../src/typelib";
import {errorToStr} from "./lib/error-to-str";

test("typeErrorIf > IsNot(): argument validation", function(){
    // passing an invalid value as an argument to `isNot()`
    expect(errorToStr(()=>{typeErrorIf(123).isNot(123)})).toMatch(/^TypeError: isNot/);
});

test("typeErrorIf > IsNot(): constructor verification", function(){
    let subjectTest = typeErrorIf("Hello!").isNot(["number", "string"]);

    // Check if the properties of the instance to `ExceptionHandler` are properly set
    expect(subjectTest.isError).toBe(false);
    expect(subjectTest.isType).toBe("string");
    expect(subjectTest.verifyType.toString()).toBe("number,string");
    expect(type(subjectTest.defaultErrorMessage).is).toBe("function");
    expect(type(subjectTest.defaultErrorMessage(subjectTest.isType, subjectTest.verifyType)).is).toBe("string");
});

test("typeErrorIf > IsNot(): check ExceptionHandler Instance", function(){
    let subjectTest = typeErrorIf("Hello!").isNot("number");
    
    // Check the methods to the `ExceptionHandler` constructor
    expect(type(subjectTest.throwIt).is).toBe("function");
    expect(type(subjectTest.catchIt).is).toBe("function");
});