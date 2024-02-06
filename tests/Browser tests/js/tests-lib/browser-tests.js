/**
 * @file Contains tests for Browsers
 * @author Rodrigo Calix
 * @license MIT
*/ 

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
const browserTests = [
    {
        name: "Window",
        label: "window",
        category: "browser",
        test: () => window,
        expected: {
            is: 'window',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Document",
        label: "document",
        category: "browser",
        test: () => document,
        expected: {
            is: 'htmldocument',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Document All (deprecated)",
        label: "document.all",
        category: "browser",
        test: () => document.all,
        expected: {
            is: 'htmlallcollection',
            kinds: ['falsy', 'primitive']
        }
    },
    {
        name: "Document Body",
        label: "document.body",
        category: "browser",
        test: () => document.body,
        expected: {
            is: 'htmlbodyelement',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: ":root",
        label: "document<br>.querySelector<br>(':root')",
        category: "browser",
        test: () => document.querySelector(':root'),
        expected: {
            is: 'htmlhtmlelement',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Blob",
        label: "new Blob()",
        category: "browser",
        test: () => new Blob(),
        expected: {
            is: 'blob',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "File Reader",
        label: "new FileReader()",
        category: "browser",
        test: () => new FileReader(),
        expected: {
            is: 'filereader',
            kinds: ['truthy', 'object']
        }
    }
];