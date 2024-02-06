import {ExceptionHandler} from "../src/lib/utils/exception-handler";
import {type} from "../src/typelib";
import {errorToStr} from "./lib/error-to-str";

test("ExceptionHandler: `params` verification", function(){
    // Test the errors that the wrong use of the parameters would throw
    expect(errorToStr(()=>{new ExceptionHandler()})).toMatch(/^TypeError: The `params` argument/);
    expect(errorToStr(()=>{new ExceptionHandler({isError: "false"})})).toMatch(/^TypeError: In `params.isError`/);
    expect(errorToStr(()=>{new ExceptionHandler({isError: true, isType: 123})})).toMatch(/^TypeError: In `params.isType`/);
    expect(errorToStr(()=>{new ExceptionHandler({isError: true, isType: "number", verifyType: 123})})).toMatch(/^TypeError: In `params.verifyType`/);
    expect(errorToStr(()=>{new ExceptionHandler({isError: true, isType: "number", verifyType: ["number"], defaultErrorMessage: 123})})).toMatch(/^TypeError: in `params.defaultErrorMessage`/);
});

test("ExceptionHandler: constructor verification", function(){
    let testSubject = new ExceptionHandler({isError: true, isType: "number", verifyType: ["number"], defaultErrorMessage:()=>"Wuups!"});
    // Test if the constructor properly stores the parameters
    expect(testSubject.isError).toBe(true);
    expect(testSubject.isType).toBe("number");
    expect(type(testSubject.verifyType).is).toBe("array");
    expect(type(testSubject.defaultErrorMessage).is).toBe("function");
    expect(type(testSubject.throwIt).is).toBe("function");
    expect(type(testSubject.catchIt).is).toBe("function");
});