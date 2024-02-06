
/**
 * @file Contains the tests for Node JS only
 * @author Rodrigo Calix
 * @license MIT
*/

const {Blob, Buffer} =  require('buffer');
const buffer = require('buffer');

/*
Test structure:
{
    name: "The test name",
    label: "A string containing the code that will be tested (for reading)",
    category: "the category of the test",
    test: A function that returns the value to be tested,
    expected : { //The expected results of the test
        is: {String} expected `.is` property,
        kinds: {Array} expected `.kinds` property
    }
}
*/

// The tests to be performed and transformed into an HTML table
const nodeTests = [
    {
        name: "Global",
        label: "global",
        category: "node-js",
        test: () => global,
        expected: {
            is: 'global',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Blob",
        label: "new Blob()",
        category: "node-js",
        test: () => new Blob(),
        expected: {
            is: 'blob',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Blob Stream",
        label: "new Blob().stream()",
        category: "node-js",
        test: () => new Blob().stream(),
        expected: {
            is: 'readablestream',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Buffer From Array",
        label: "Buffer.from([])",
        category: "node-js",
        test: () => Buffer.from([]),
        expected: {
            is: 'uint8array',
            kinds: ['truthy', 'object']
        }
    }
];

module.exports = nodeTests;
