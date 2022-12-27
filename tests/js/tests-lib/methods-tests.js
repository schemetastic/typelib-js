/**
 * @file The set of tests to be performed for the methods
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
const methodsTests = {
    // For the isIt() method
    "is-it": [
        {
            name: "String as an argument expecting to be true",
            label: "type(123).isIt('number')",
            test: () => type(123).isIt('number'),
            expected: true
        },
        {
            name: "String as an argument expecting to be false",
            label: "type('Hello').isIt('number')",
            test: () => type('Hello!').isIt('number'),
            expected: false
        },
        {
            name: "Array as an argument expecting to be true",
            label: "type([]).isIt(['string', 'array'])",
            test: () => type([]).isIt(['string', 'array']),
            expected: true
        },
        {
            name: "Array as an argument expecting to be false",
            label: "type({}).isIt(['number', 'array'])",
            test: () => type({}).isIt(['number', 'array']),
            expected: false
        },
        {
            name: "Passing an invalid argument",
            label: "type({}).isIt(true)",
            test: () => type({}).isIt(true),
            expected: "@Error"
        }
    ],
    // For the isNot() method
    "is-not": [
        {
            name: "String as an argument expecting to be true",
            label: "type(123n).isNot('number')",
            test: () => type(123n).isNot('number'),
            expected: true
        },
        {
            name: "String as an argument expecting to be false",
            label: "type(0/0).isNot('nan')",
            test: () => type(0/0).isNot('nan'),
            expected: false
        },
        {
            name: "Array as an argument expecting to be true",
            label: "type(false).isNot(['undefined', 'nan', 'null'])",
            test: () => type(false).isNot(['undefined', 'nan', 'null']),
            expected: true
        },
        {
            name: "Array as an argument expecting to be false",
            label: "type(-1000/0).isNot(['infinite', '-infinity', 'nan'])",
            test: () => type(-1000/0).isNot(['infinite', '-infinity', 'nan']),
            expected: false
        },
        {
            name: "Passing an invalid argument",
            label: "type({}).isNot(false)",
            test: () => type({}).isNot(false),
            expected: "@Error"
        }
    ]
}

// If the script is executed in Node JS
if (typeof module !== 'undefined' && typeof global !== 'undefined') module.exports = methodsTests;