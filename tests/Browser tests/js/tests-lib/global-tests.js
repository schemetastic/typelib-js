
/**
 * @file Contains the global tests for browser or Node JS environments
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
const globalTests = [
    // Primitives
    {
        name: "Number",
        label: "123",
        category: "primitive",
        test: () => 123,
        expected: {
            is: 'number',
            kinds: ['truthy', 'primitive', 'number', 'numeric']
        }
    },
    {
        name: "String",
        label: "'Hello friend!'",
        category: "primitive",
        test: () => 'Hello friend!',
        expected: {
            is: 'string',
            kinds: ['truthy', 'primitive']
        }
    },
    {
        name: "Boolean",
        label: "true",
        category: "primitive",
        test: () => true,
        expected: {
            is: 'boolean',
            kinds: ['truthy', 'primitive']
        }
    },
    {
        name: "Undefined",
        label: "void 0",
        category: "primitive",
        test: function() { return void 0},
        expected: {
            is: 'undefined',
            kinds: ['falsy', 'nullish', 'primitive']
        }
    },
    {
        name: "Null",
        label: "null",
        category: "primitive",
        test: () => null,
        expected: {
            is: 'null',
            kinds: ['falsy', 'nullish', 'primitive']
        }
    },
    {
        name: "Big Integer",
        label: "1234567n",
        category: "primitive",
        test: () => 1234567n,
        expected: {
            is: 'bigint',
            kinds: ['truthy', 'numeric', 'primitive']
        }
    },
    {
        name: "Symbol",
        label: "Symbol()",
        category: "primitive",
        test: () => Symbol(),
        expected: {
            is: 'symbol',
            kinds: ['truthy', 'primitive']
        }
    },
    // Common Objects
    {
        name: "Regular Expression",
        label: "new RegExp()",
        category: "common-object",
        test: () => new RegExp(),
        expected: {
            is: 'regexp',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Array",
        label: "[ ]",
        category: "common-object",
        test: () => [ ],
        expected: {
            is: 'array',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Native Function",
        label: "Array.isArray",
        category: "common-object",
        test: () => Array.isArray,
        expected: {
            is: 'function',
            kinds: ['truthy', 'function', 'object']
        }
    },
    {
        name: "Plain Object",
        label: "{ }",
        category: "common-object",
        test: function(){ return { }},
        expected: {
            is: 'object',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Function Arguments",
        label: "function(){return arguments}",
        category: "common-object",
        test: function(){return arguments},
        expected: {
            is: 'arguments',
            kinds: ['truthy', 'object']
        }
    },
    // Numeric
    {
        name: "Not a Number",
        label: "0/0",
        category: "numeric",
        test: () => 0/0,
        expected: {
            is: 'nan',
            kinds: ['falsy', 'number', 'numeric', 'primitive']
        }
    },
    {
        name: "Positive Infinity",
        label: "1000/0",
        category: "numeric",
        test: () => 1000/0,
        expected: {
            is: 'infinity',
            kinds: ['truthy', 'number', 'numeric', 'primitive']
        }
    },
    {
        name: "Negative Infinity",
        label: "-Infinity",
        category: "numeric",
        test: () => -Infinity,
        expected: {
            is: '-infinity',
            kinds: ['truthy', 'number', 'numeric', 'primitive']
        }
    },
    {
        name: "Big Integer",
        label: "1234567n",
        category: "numeric",
        test: () => 1234567n,
        expected: {
            is: 'bigint',
            kinds: ['truthy', 'numeric', 'primitive']
        }
    },
    {
        name: "Hex Number",
        label: "0xa0f",
        category: "numeric",
        test: () => 0xa0f,
        expected: {
            is: 'number',
            kinds: ['truthy', 'number', 'numeric', 'primitive']
        }
    },
    // Functions
    {
        name: "Function",
        label: "function(){}",
        category: "function",
        test: () => function(){},
        expected: {
            is: 'function',
            kinds: ['truthy', 'function', 'object']
        }
    },
    {
        name: "Class",
        label: "class Hello{ }",
        category: "function",
        test: () => class Hello{ },
        expected: {
            is: 'class',
            kinds: ['truthy', 'function', 'object']
        }
    },
    {
        name: "Arrow Function",
        label: "()=>'Hello!'",
        category: "function",
        test: function(){return ()=>'Hello!'},
        expected: {
            is: 'function',
            kinds: ['truthy', 'function', 'object']
        }
    },
    {
        name: "Generator Function",
        label: "function* (){ }",
        category: "function",
        test: () => function* (){ },
        expected: {
            is: 'generatorfunction',
            kinds: ['truthy', 'function', 'object']
        }
    },
    // Constructor Objects
    {
        name: "String Object",
        label: "new String('Am I an object or a string? 🙈')",
        category: "constructor-object",
        test: () => new String('Am I an object or a string? 🙈'),
        expected: {
            is: 'stringobject',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Number Object",
        label: "new Number(123)",
        category: "constructor-object",
        test: () => new Number(123),
        expected: {
            is: 'numberobject',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Boolean Object",
        label: "new Boolean(true)",
        category: "constructor-object",
        test: () => new Boolean(true),
        expected: {
            is: 'booleanobject',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Set",
        label: "new Set()",
        category: "constructor-object",
        test: () => new Set(),
        expected: {
            is: 'set',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Weak Map",
        label: "new WeakMap()",
        category: "constructor-object",
        test: () => new WeakMap(),
        expected: {
            is: 'weakmap',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Weak Set",
        label: "new WeakSet()",
        category: "constructor-object",
        test: () => new WeakSet(),
        expected: {
            is: 'weakset',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Date",
        label: "new Date()",
        category: "constructor-object",
        test: () => new Date(),
        expected: {
            is: 'date',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Map",
        label: "new Map()",
        category: "constructor-object",
        test: () => new Map(),
        expected: {
            is: 'map',
            kinds: ['truthy', 'object']
        }
    },
    {
        name: "Array Buffer",
        label: "new ArrayBuffer()",
        category: "constructor-object",
        test: () => new ArrayBuffer(),
        expected: {
            is: 'arraybuffer',
            kinds: ['truthy', 'object']
        }
    },
    // Errors
    {
        name: "Error",
        label: "new Error('Error object')",
        category: "error",
        test: () => new Error('Error object'),
        expected: {
            is: 'error',
            kinds: ['truthy', 'error', 'object']
        }
    },
    {
        name: "TypeError",
        label: "new TypeError('Rype error object')",
        category: "error",
        test: () => new TypeError('Rype error object'),
        expected: {
            is: 'typeerror',
            kinds: ['truthy', 'error', 'object']
        }
    },
    {
        name: "ReferenceError",
        label: "new ReferenceError('Reference error object')",
        category: "error",
        test: () => new ReferenceError('Reference error object'),
        expected: {
            is: 'referenceerror',
            kinds: ['truthy', 'error', 'object']
        }
    },
    {
        name: "SyntaxError",
        label: "new SyntaxError('Syntax error object')",
        category: "error",
        test: () => new SyntaxError('Syntax error object'),
        expected: {
            is: 'syntaxerror',
            kinds: ['truthy', 'error', 'object']
        }
    },
    {
        name: "RangeError",
        label: "new RangeError('Range error object')",
        category: "error",
        test: () => new RangeError('Range error object'),
        expected: {
            is: 'rangeerror',
            kinds: ['truthy', 'error', 'object']
        }
    },
    {
        name: "EvalError",
        label: "new EvalError('Eval error object')",
        category: "error",
        test: () => new EvalError('Eval error object'),
        expected: {
            is: 'evalerror',
            kinds: ['truthy', 'error', 'object']
        }
    },
    // Miscellaneous
    {
        name: "Falsy String",
        label: '""',
        category: "miscellaneous",
        test: () => "",
        expected: {
            is: 'string',
            kinds: ['falsy', 'primitive']
        }
    },
    {
        name: "Falsy Number",
        label: '0',
        category: "miscellaneous",
        test: () => 0,
        expected: {
            is: 'number',
            kinds: ['falsy', 'number', 'numeric', 'primitive']
        }
    },
    {
        name: "Falsy BigInt",
        label: '-0n',
        category: "miscellaneous",
        test: () => -0n,
        expected: {
            is: 'bigint',
            kinds: ['falsy', 'numeric', 'primitive']
        }
    }
];

// If the script is executed in Node JS
if (typeof module !== 'undefined' && typeof global !== 'undefined') module.exports = globalTests;
