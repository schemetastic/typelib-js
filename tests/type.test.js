import {type} from "../src/typelib";
import {errorToStr} from "./lib/error-to-str";

test("type: parameters validation", function () {
    // Passing a non object as the `customParams` argument
    expect(errorToStr(() => { type(123, 'writable: true') })).toMatch(/^TypeError: The `params`/);

    // Passing an invalid parameter
    expect(errorToStr(() => { type(123, { writable: true, imNot: 'defined' }) })).toMatch(/^TypeError:/);

    // Passing a non boolean in the writable parameter.
    expect(errorToStr(() => { type(123, { writable: 'true' }) })).toMatch(/^TypeError: The parameter `writable`/);

    // Passing a non boolean in the throwError parameter.
    expect(errorToStr(() => { type(123, { throwError: 'true' }) })).toMatch(/^TypeError: The parameter `throwError`/);
});

test("type: writable parameter", function () {
    // Trying to overwrite a property with `writable: false` (default)
    expect(errorToStr(() => {
        var aType = type(123);
        aType.is = 'nan';
        return aType.is
    })).toMatch(/^TypeError:/);

    // Trying to overwrite a property with `writable: true`
    expect((() => {
        var bType = type(123, { writable: true });
        bType.is = 'nan';
        return bType.is
    })()).toBe("nan");

    // Reusing the constructor with `writable: false` (default)
    expect(errorToStr(() => {
        var aType = type(123);
        aType.constructor(0 / 0);
    })).toMatch(/^TypeError:/);

    // Reusing the constructor with `writable: true`
    expect((() => {
        var bType = type(123, { writable: true });
        bType.constructor('Hello dev!');
        return bType.is
    })()).toBe("string");
});