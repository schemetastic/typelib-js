import {type} from "../src/typelib";
import {typeErrorIf} from "../src/typelib";
import {errorToStr} from "./lib/error-to-str";

test("typeErrorIf > IsIt(): argument validation", function(){
    // passing an invalid value as an argument to `isIt()`
    expect(errorToStr(()=>{typeErrorIf(123).isIt(123)})).toMatch(/^TypeError: isIt/);
});

test("typeErrorIf > IsIt(): constructor verification", function(){
    let subjectTest = typeErrorIf(123).isIt(["number", "string"]);

    // Check if the properties of the instance to `ExceptionHandler` are properly set
    expect(subjectTest.isError).toBe(true);
    expect(subjectTest.isType).toBe("number");
    expect(subjectTest.verifyType.toString()).toBe("number,string");
    expect(type(subjectTest.defaultErrorMessage).is).toBe("function");
    expect(type(subjectTest.defaultErrorMessage(subjectTest.isType, subjectTest.verifyType)).is).toBe("string");
});

test("typeErrorIf > IsIt(): check ExceptionHandler Instance", function(){
    let subjectTest = typeErrorIf(123).isIt("number");
    
    // Check the methods to the `ExceptionHandler` constructor
    expect(type(subjectTest.throwIt).is).toBe("function");
    expect(type(subjectTest.catchIt).is).toBe("function");
});