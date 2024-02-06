import {type} from "../src/typelib";
import {errorToStr} from "./lib/error-to-str";

test("type > isIt(): unexpected type as an argument", function(){
    // passing an invalid value as an argument to `isIt()`
    expect(errorToStr(()=>{type([]).isIt({invalidArgument: true})})).toMatch(/^TypeError: isIt/);
});

test("type > isIt(): single string as an argument", function(){
    // Passing a string to `isIt()`
    expect(type(123).isIt('number')).toBe(true);
    expect(type('Hello').isIt('number')).toBe(false);
});

test("type > isIt(): strings array as an argument", function(){
    // Passing an array to `isIt()`
    expect(type([]).isIt(['string', 'array'])).toBe(true);
    expect(type({}).isIt(['number', 'array'])).toBe(false);
});