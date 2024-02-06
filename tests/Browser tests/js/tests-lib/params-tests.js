/**
 * @file The set of tests to be performed for the parameters
 * @author Rodrigo Calix
 * @license MIT
*/

// If the script is executed in Node JS
if (typeof module !== 'undefined' && typeof global !== 'undefined') var type = require('../../../dist/typelib.cjs.min.js');

/*
Test structure:
{
    name: "The test name",
    label: "A string containing the code that will be tested (for reading)",
    test: A function that performs tested,
    expected : the expected value.
}
*/

// The tests to be performed and transformed into an HTML table
const paramsTests = {
    // For the validation of the parameters
    "params-validation": [
        {
            name: "Passing a non object as the `customParams` argument",
            label: "type(123, 'writable: true')",
            test: () => type(123, 'writable: true'),
            expected: "@Error"
        },
        {
            name: "Passing an invalid parameter",
            label: "type(123, {writable: true, imNot: 'defined'})",
            test: () => type(123, {writable: true, imNot: 'defined'}),
            expected: "@Error"
        },
        {
            name: "Passing a non boolean in the writable parameter.",
            label: "type(123, {writable: 'true'})",
            test: () => type(123, {writable: 'true'}),
            expected: "@Error"
        }
    ],
    // For the `writable` parameter
    "writable": [
        {
            name: "Trying to overwrite a property <br> with `writable: false` (default)",
            label: "<div class=\"align-left\">\
            function(){<br>\
                &nbsp; var aType = type(123);<br>\
                &nbsp; aType.is = 'nan';<br>\
                &nbsp; return aType.is <br>\
            }\
            </div>",
            test: function () {
                var aType = type(123);
                aType.is = 'nan';
                return aType.is
            },
            expected: "number"
        },
        {
            name: "Trying to overwrite a property <br> with `writable: true`",
            label: "<div class=\"align-left\">\
            function(){<br>\
                &nbsp; var bType = type(123, {writable: true});<br>\
                &nbsp; bType.is = 'nan';<br>\
                &nbsp; return bType.is <br>\
            }\
            </div>",
            test: function () {
                var bType = type(123, {writable: true});
                bType.is = 'nan';
                return bType.is
            },
            expected: "nan"
        },
        {
            name: "Reusing the constructor <br> with `writable: false` (default)",
            label: "<div class=\"align-left\">\
            function(){<br>\
                &nbsp; var aType = type(123);<br>\
                &nbsp; aType.constructor(0/0); <br>\
            }\
            </div>",
            test: function () {
                var aType = type(123);
                aType.constructor(0/0);
            },
            expected: "@Error"
        },
        {
            name: "Reusing the constructor <br> with `writable: true`",
            label: "<div class=\"align-left\">\
            function(){<br>\
                &nbsp; var bType = type(123, {writable: true});<br>\
                &nbsp; bType.constructor('Hello dev!'); <br>\
                &nbsp; return bType.is <br>\
            }\
            </div>",
            test: function () {
                var bType = type(123, {writable: true});
                bType.constructor('Hello dev!');
                return bType.is
            },
            expected: "string"
        }
    ]
};


// If the script is executed in Node JS
if (typeof module !== 'undefined' && typeof global !== 'undefined') module.exports = paramsTests;