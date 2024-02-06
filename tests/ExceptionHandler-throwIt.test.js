import {ExceptionHandler} from "../src/lib/utils/exception-handler";
import {errorToStr} from "./lib/error-to-str";
import {catchError} from "./lib/catch-error";

test("ExceptionHandler > throwIt(): `params` verification", function(){
    // Test the errors that the wrong use of the parameters would throw
    let testSubject = new ExceptionHandler({isError: true, isType: "number", verifyType: ["number"], defaultErrorMessage:()=>"Wuups!"});
    expect(errorToStr(()=>{testSubject.throwIt(123)})).toMatch(/^TypeError: The `params`/);
    expect(errorToStr(()=>{testSubject.throwIt({message: 123})})).toMatch(/^TypeError: In `params.message`/);
    expect(errorToStr(()=>{testSubject.throwIt({message: ()=>123})})).toMatch(/^TypeError: In `params.message\(\)`/);
});

test("ExceptionHandler > throwIt(): method verification", function(){
    // When it shouldn't throw an error it should return `null`
    let testSubjectOne = new ExceptionHandler({isError: false, isType: "number", verifyType: ["number", "string"], defaultErrorMessage:()=>"Wuups!"});
    expect(testSubjectOne.throwIt()).toBe(null);
    
    // Check if it throws the error with the custom message as function
    let testSubjectTwo = new ExceptionHandler({isError: true, isType: "number", verifyType: ["number", "string"], defaultErrorMessage:(errorCause, verifyTypes)=>`Error type cause: ${errorCause}, verified types: ${verifyTypes}`});
    expect(errorToStr(()=>{testSubjectTwo.throwIt()})).toMatch(/^TypeError: Error type cause: number, verified types: number,string/)

    // Check if it throws the error with the custom message as string
    let testSubjectThree = new ExceptionHandler({isError: true, isType: "number", verifyType: ["number", "string"], defaultErrorMessage:`Wuups!`});
    expect(errorToStr(()=>{testSubjectThree.throwIt()})).toMatch(/^TypeError: Wuups!/)

    // Check if it sets the custom error message
    expect(errorToStr(()=>{testSubjectThree.throwIt({message: "🫣"})})).toMatch(/^TypeError: 🫣/)

    // Check if it sets the error cause
    let errSubject = catchError(()=>{testSubjectThree.throwIt({cause: "wink 😉"})});
    expect(errSubject.cause).toBe("wink 😉");
});