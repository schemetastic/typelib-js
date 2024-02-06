import {type} from "../src/typelib";
import {errorToStr} from "./lib/error-to-str";

test("type > isNot(): unexpected type as an argument", function(){
    // passing an invalid value as an argument to `isNot()`
    expect(errorToStr(()=>{type([]).isNot({invalidArgument: true})})).toMatch(/^TypeError: isNot/);
});

test("type > isNot(): single string as an argument", function(){
    // Passing a string to `isNot()`
    expect(type(123n).isNot('number')).toBe(true);
    expect(type(0/0).isNot('nan')).toBe(false);
});

test("type > isNot(): strings array as an argument", function(){
    // Passing an array to `isIt()`
    expect(type(false).isNot(['undefined', 'nan', 'null'])).toBe(true);
    expect(type(-1000/0).isNot(['infinite', '-infinity', 'nan'])).toBe(false);
});