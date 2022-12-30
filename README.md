# TypeLib JS

This is a JavaScript library that can help you to verify types of data. Usually, to do this it is used the `typeof` operator, but doesn't specifically recognize every type of data, and might return unexpected results, so this leads to use methods such as `Array.isArray()`, `isNaN()`, or others, this library tries to address this problem by just using one function that returns a set of properties and methods to make data type verification easy.

## Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [The type function](#the-typedata-params-function)
  - [data](#data-argument)
  - [parameters](#customparams-argument)
    - [writable parameter](#writable-parameter)
- [Properties](#properties)
  - [is](#is)
  - [kinds](#kinds)
  - [isTruthy](#istruthy)
  - [isFalsy](#isfalsy)
  - [isNullish](#isnullish)
  - [isNumeric](#isnumeric)
  - [isNumber](#isnumber)
  - [isFunction](#isfunction)
  - [isError](#iserror)
  - [isPrimitive](#isprimitive)
  - [isObject](#isobject)
- [Methods](#methods)
  - [isIt()](#isitexpectedtype)
  - [isNot()](#isnotnotexpectedtype) 
- [Table of types tests](#table-of-types-tests)
- [Credits](#references-credits-and-important-links)
- [License](#license)

## Installation
You can install it with NPM like this:
```shell
npm i typelib-js
```

You can request it with `import`, `require`, or `<script>` from the _node_modules_ folder or the _dist_ folder if necessary.

## Quick Start
With TypeLib JS you can verify specific **types** of data, but also **kinds** of data. For example:

A value such as `['mango', 'pineapple']` ***is an array type***, but in JS an array type can also be considered a ***kind of object***, and a ***kind of truthy*** value.

An empty string `""` ***is a string type*** but also a ***kind of falsy*** value, and even though everything or almost everything is an object in JS, strings are considered a ***kind of primitive*** value.

Following that line of thought, let's see a few examples in code:

```javascript
// Properties
// .is
type(['mango', 'pineapple']).is; // "array"
type("").is; // "string"
type(0/0).is; // "nan"

// .kinds
type(['mango', 'pineapple']).kinds; // ["truthy", "object"]
type("").kinds; // ["falsy", "primitive"]
type(0/0).kinds; // ["falsy", "numeric", "number", "primitive"]

// Specific Kinds
type(0).isTruthy; // false
type(0).isFalsy; // true
type(undefined).isNullish; // true
type(NaN).isNumber; // true
type(123n).isNumeric; // true
type(class HelloDev{}).isFunction; // true
type(new TypeError("Hey!")).isError; // true
type(null).isPrimitive; // true
type(null).isObject; // false
```

Notice that kinds are basically groups where a type of data can be categorized, on the other hand the `.is` property is very specific, so for example, a `.is` equal to `"number"` only refers to numbers but not `NaN`, `Infinity` or `-Infinity`, the `.isNumber` property refers to all of them.

This library also comes with the methods `.isIt()` and  `.isNot()` to verify **types** of data, you can pass a _string_ or an _array of strings_ as an argument to verify if the data type is or isn't as expected, for example:

```javascript
// Methods to verify types

// .isIt()
type(1000/0).isIt('infinity'); //returns true
type({}).isIt(['array', 'object']); //returns true

// .isNot()
type(['John', 'Jane']).isNot('array'); //returns false
type(0).isNot(['nan', 'infinity', '-infinity']); //returns true
```

You can also use them to validate customized group types:
```javascript
function myUtil(func, params){
  // Accept arrow functions and normal functions but not classes as the `.isFunction` property would.
  let isValidFunction = type(func).isIt(['function','arrowfunction']);
  // Accept an array or a plain object as the `params` argument.
  let isValidParams = type(params).isIt(['array','object']);

  // [...]
}
```

To get a deeper understanding of how does the properties and methods work read the next sections cause there are a few things to consider, but at the least is advisable to check the [Table of types tests](#table-of-types-tests) section.

## The type(_data_, _params_) function
Returns|Description
:-:|:-:
Object|Helps you to verify types of data that can be passed as a function argument.

This is the base function of TypeLib JS, the data you pass in this function is verified and an instance to a constructor is made, this returns an object with properties and methods that helps you to check types and kinds of data.

### `data` argument
Mandatory|Allowed Types| Description
:-:|:-:|:-:
no|Any| The data to be verified

The data passed in this argument will be used to generate an object with the properties and methods.

### `customParams` argument
Mandatory|Allowed Types| Description
:-:|:-:|:-:
no|Plain object| It can help you to change the default behavior of the constructor.

Available parameters:
- `writable`

Notice you can't store more parameters in the `customParams` object argument than the ones available or it will throw an error.

#### `writable` parameter 
Allowed Types|default|Description
:-:|:-:|:-:
boolean|_false_|By default, the properties and methods returned with the constructor are readonly, changing this parameter to `true` makes them writable.

For security reasons and how sensible data validation can be, properties and methods are not writable by default. It is possible to store the constructor object in a variable, after that, the data can't be changed, if you want to reuse the constructor you can set this parameter to `true`.

An example with writable disabled:
```javascript
var myType = type(NaN);
console.log(myType.is); // logs: "nan"
myType.is = "number";
console.log(myType.is); // logs: "nan"
myType.constructor(123); // Uncaught TypeError: "is" is read-only
```
An example with writable enabled:
```javascript
var myType = type(NaN, {writable: true});
console.log(myType.is); // logs: "nan"
myType.is = "number";
console.log(myType.is); // logs: "number"
myType.constructor("Hello!");
console.log(myType.is, myType.kinds); // logs: "string", Array [ "truthy", "primitive" ]
```

## Properties
### `.is`
Type|Writable|Description
:-:|:-:|:-:
String|no|contains the type of data passed in the `type()` function.

The **`.is`** property stores a more specific type than the `typeof` operator which returns [8 different types of data](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description), it can also help you to verify `class`, `()=>""`, `NaN`, `Infinity`, `-Infinity` primitive objects, different error types, and a numerous set of built-in objects.

In the section [Table of types tests](#table-of-types-tests) you can see some examples.

### `.kinds`
Type|Writable|Description
:-:|:-:|:-:
Array|no|Contains a list of the different kinds of the data passed in the `type()` function.

Kinds refers to data that can be categorized in a group type, for example, any kind of data is truthy or falsy, a class is a class but is also considered a kind of function (special function), a NaN value is not a number (That's what "NaN" means) but it can be categorized in the number or numeric group.

The next properties below are a list of the possible kinds that a type of data can have, the `.kinds` property basically stores all kinds of those properties that are `true`.

### `.isTruthy`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|Values that in a boolean context are considered true.

Some truthy values are:
- Positive and negative numbers (not zero)
- Non-empty strings
- Objects and arrays
- Functions

And many more, check: [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)


### `.isFalsy`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|Values that in a boolean context are considered false.

Some falsy values are:
- The zero number (0)
- Empty strings ("")
- NaN value
- null and undefined

And others. Check: [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

### `.isNullish`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|null or undefined values

`null` and `undefined` values are a primitive type of data and they are different from other primitives, for example:

```javascript 
var dataA = "Hello!";
var dataB = null;

console.log(dataA.length); // logs: 6
console.log(dataB.length); // Uncaught TypeError: dataB is null
```
Check: [Nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish)

### `.isNumeric`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|Values that are of numeric type.

This includes decimal numbers, NaN, Infinity, -Infinity, binary, hex, octal, exponential and also big integer values.

For more information:
- [Number type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
- [BigInt type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type)
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) | BigInt values are not exactly numbers.

### `.isNumber`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|Values that are any type of number.

It includes the same values as the numeric kinds, but the difference is that big integers are not included in this group.

for more information: [Number type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

### `.isFunction`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|Any data that is a type of function.

These could be declarations or expressions of functions, generator functions, arrow functions and  classes.

For more information: 
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) | Classes are "special functions".

### `.isError`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|If it's an error object.

It refers to any type of error object, like: Error, TypeError, SyntaxError, ReferenceError.

More Information: [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

### `.isPrimitive`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|A value that is not considered an object.

This refers to data that falls in the category of any of these groups: numbers, strings, booleans, big integers, symbols, null and undefined.

Check: [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)

### `.isObject`
Type|Writable|Description
:-:|:-:|:-:
Boolean|no|A value that is not considered primitive.

Everything else that is not a primitive value is considered an object, it includes, but is not limited to: objects, arrays, functions, the `arguments` object, regular expressions, and kind of primitive values that are created with a constructor such as `new String('This is a type of object')`.

Check: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Methods
### `.isIt(expectedType)`

Writable|returns|Description
:-:|:-:|:-:
no|boolean|Helps to check expected types of data

#### `expectedType` argument
mandatory|Allowed Types|Description
:-:|:-:|:-:
yes|String, Array |the type or types you are expecting



### `.isNot(notExpectedType)`
Writable|returns|Description
:-:|:-:|:-:
no|boolean|Helps to check not expected types of data

#### `notExpectedType` argument
mandatory|Allowed Types|Description
:-:|:-:|:-:
yes|String, Array |the type or types you are not expecting


## Table of types tests

This table shows some data types and the results you can expect by using the `.is` property and is compared with the native `typeof` operator.

Test| native `typeof` | `.is`
:-:|:-:|:-:
"Hello Dev!"|string|string
new String("Hello")|object|stringobject
true|boolean|boolean
new Boolean(true)|object|booleanobject
123|number|number
new Number(123)|object|numberobject
0/0|number|nan
100/0|number|infinity
-100/0|number|-infinity
()=>"Hello"|function|arrowfunction
function(){}|function|function
new TypeError()|object|typeerror
new Error()|object|error

If you want to see a more extensive list of types of data you can check the _📁tests_ folder and open the file _📄browser.html_ or _📄node-js.html_.

![Screenshot of a table with different types tests](doc-assets/tests-table.png)


## References, Credits and important links
Some references and important mentions can be found along this document in relevant areas, but the rest are found here.
- Vanilla JS Toolkit | [trueTypeOf.js](https://vanillajstoolkit.com/helpers/truetypeof/) | Helped to get a more specific type than the `typeof` operator.
- MDN Web Docs | [Custom method that gets a more specific type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#custom_method_that_gets_a_more_specific_type) | Helped to get the "class" type.
- MDN Web Docs | [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- MDN Web Docs | [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- MDN Web Docs | [typeof null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)

## License

The source code and documentation files are licensed under the [MIT license](LICENSE) by Rodrigo Calix.