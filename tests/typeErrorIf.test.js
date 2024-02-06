import {typeErrorIf} from "../src/typelib";

test("typeErrorIf", function(){
    // Check that the instance to `Type` works properly
    expect(typeErrorIf(123).type.is).toBe("number");
    expect(typeErrorIf(123).type.isNumeric).toBe(true);
    expect(typeErrorIf(123).type.isIt("number")).toBe(true);
    expect(typeErrorIf(123).type.isNot("number")).toBe(false);
});