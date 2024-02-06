/*
** typelib-js | Version 0.10.0
** A library that helps you to verify different types and kinds of data.
** © Rodrigo Calix | License: MIT
*/
var typelib = (function (exports) {
	'use strict';

	/**
	 * Returns a constructor with a set of properties and methods to verify the data
	 * @param {*} data The data that will be verified to obtain it's type and kinds
	 * @param {Object} customParams parameters to change the default behavior
	 * @returns {Object} An instance of the constructor `Type`
	 */
	const type = function (data, customParams) {
		// The constructor
		var Type = function (data, customParams) {

			// Check the custom parameters
			var areCustomParamsAvailable = (
				/**
				 * Checks if the custom parameters are available
				 * @param {Object} params parameters to be verified
				 * @returns {Boolean} `false` if the params are undefined and `true` if they passed the verification
				 */
				function verifyCustomParams(params) {
					if (params === undefined) return false;

					// Check if the parameters are a plain object.
					if (Object.prototype.toString.call(params) != '[object Object]') throw TypeError('The `params` argument must be a plain object');

					// Check if the `writable` parameter was defined but also a boolean.
					if (params.writable !== undefined && (params.writable !== true && params.writable !== false)) throw TypeError('The parameter `writable` must be a boolean');
					
					// Check if the `throwError` parameter was defined but also a boolean.
					if (params.throwError !== undefined && (params.throwError !== true && params.throwError !== false)) throw TypeError('The parameter `throwError` must be a boolean');

					return true;
				}
			)(customParams);

			// Set the parameters
			var params = (
				/**
				 * Get the parameters based on the custom or default parameters
				 * @returns {Object} 
				 */
				function getParams() {
					// default parameters with limited options
					var defaultParams = Object.seal({
						writable: false,
						throwError: false
					});

					// If the custom parameters are not available return the default parameters, otherwise assign them to `defaultParams`. 
					return !areCustomParamsAvailable ? defaultParams : Object.assign(defaultParams, customParams);
				}
			)();

			// Store the parameters
			this.params = !params.writable ? Object.freeze(params) : params;

			// This method returns a more specific type than the native `typeof` operator.
			// src: https://vanillajstoolkit.com/helpers/truetypeof/
			var defaultType = Object.prototype.toString.call(data).toLowerCase().slice(8, -1);

			/* The method above in the `defaultType` variable provide very specific types of the
			passed `data`, however, to provide even more specificity below there are some exceptions.*/
			var exception = (
				/**
				 * Exceptions to the `defaultType` value
				 * @returns {Null | String}
				 */
				function getException() {
					var couldBeAnException = ["function", "number", "error"].indexOf(defaultType) > -1 || typeof data == 'object';

					// If the `data` doesn't meet any of the above types return `null`.
					if (!couldBeAnException) return null;

					// If it's an object primitive. These are primitive types created with constructors, such as: new String(), new Number() and new Boolean(). 
					var possiblePrimitiveObjects = ['string', 'number', 'boolean'];
					if(typeof data == 'object' && (possiblePrimitiveObjects.indexOf(defaultType) > -1)) return defaultType + "object";

					// If it's a class.
					if (defaultType == "function" && data.toString().indexOf('class') === 0) return "class";
					
					// If it's NaN, Infinity or -Infinity.
					var numberTypes = ["NaN", 'Infinity', '-Infinity'];
					if (defaultType == "number" && numberTypes.indexOf(data.toString()) > -1) return data.toString().toLowerCase();

					// Return the specific error type, e.g. "error", "typeerror", "syntaxerror".
					if (defaultType == "error") return data.toString().split(":")[0].toLowerCase();

					// If none of the above possibilities are met return `null`
					return null;
				}
			)();

			// Store the properties
			// The data type from the `exception` or the `defaultType`
			this.is = exception || defaultType;

			// Truthy values e.g. true, 123, "Hello!", {}
			this.isTruthy = Boolean(data);

			// Falsy values e.g. false, NaN, undefined, 0
			this.isFalsy = !Boolean(data);

			// null and undefined (nullish) values
			this.isNullish = ['undefined', 'null'].indexOf(this.is) > -1;

			// Number related values e.g. -3, 3, 0b0101 (binary), NaN, Infinity, 123e2
			this.isNumber = typeof data == 'number';

			// Numeric related values, includes number values but also big integers e.g. 654254n
			this.isNumeric = typeof data == 'number' || typeof data == 'bigint';

			// Function related values e.g. class{}, function(){}, function* (){}, ()=>""
			this.isFunction = typeof data == 'function';

			// Error types, e.g. TypeError, SyntaxError, ReferenceError, etc..
			this.isError = defaultType == 'error';

			/* 
			Primitive and Object values.
			https://developer.mozilla.org/en-US/docs/Glossary/Primitive
			
			To know why `null` is not in the array below: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null
			*/
			this.isPrimitive = ['string', 'number', 'bigint', 'boolean', 'undefined', 'symbol'].indexOf(typeof data) > -1 || this.is === 'null';
			this.isObject = !this.isPrimitive;

			// Get the kinds of the data type
			this.kinds = (
				/**
				 * Generates a list of the different kinds of data based on the constructor properties
				 * @param {Object} inst An instance of the `this` object to access the constructor
				 * @returns {Array} a list of the kinds
				 */
				function getKinds(inst) {
					// An array with the "is[...]" properties stored in the constructor
					var kindsProps = [
						'isTruthy', 'isFalsy', 'isNullish',
						'isNumeric', 'isNumber',
						'isFunction', 'isError',
						'isPrimitive', 'isObject'
					];

					// Empty array to store the kinds
					var kindsList = [];

					// Verify all the properties that are `true`, replace the word `is`, and push it to `kindsList`.
					kindsProps.forEach(function (prop) {
						if (inst[prop]) kindsList.push(prop.toLowerCase().replace(/^is/, ''));
					});

					// returns an array with all the kinds that were `true` from the constructor properties
					return !params.writable ? Object.freeze(kindsList) : kindsList;
				}
			)(this);

			// return an instance to the constructor with it's properties and methods
			return !params.writable ? Object.freeze(this) : this;
		};

		/**
		 * Allows you to verify types of data
		 * @param {String | String[]} verifyType the type or types to be verified
		 * @returns {Boolean}
		 */
		Type.prototype.isIt = function (verifyType) {
			// If `verifyType` is not a string or an array throw a TypeError. 
			if (typeof verifyType !== 'string' && !Array.isArray(verifyType)) throw TypeError('isIt(verifyType) method, the `verifyType` argument should be a string or an array')

			// If `verifyType` is an array check if there is a matching item
			if (Array.isArray(verifyType)) return verifyType.indexOf(this.is) > -1

			// If `verifyType` is a string
			return verifyType === this.is;
		};


		/**
		 * Allows you to verify types of data
		 * @param {String | String[]} verifyType the type or types to be verified
		 * @returns {Boolean}
		 */
		Type.prototype.isNot = function (verifyType) {
			// If `verifyType` is not a string or an array throw a TypeError.
			if (typeof verifyType !== 'string' && !Array.isArray(verifyType)) throw TypeError('isNot(verifyType) method, the `verifyType` argument should be a string or an array');

			// Return the opposite of the `isIt()` method
			return !this.isIt(verifyType);
			
		};

		// Create an instance to the `Type` constructor
		return new Type(data, customParams);
	};

	/**
	 * Allows to handle exceptions based on the data passed through the `typeErrorIf` function and its methods
	 * @param {Object} params based on the data obtained through the `typeErrorIf` function and its methods
	 */
	const ExceptionHandler = function(params){
		// Validate all the parameters
		if(type(params).isNot("object")) throw TypeError("The `params` argument must be a plain object");

		if(type(params.isError).isNot("boolean")) throw TypeError("In `params.isError` is expected to be a boolean.");
		
		if(type(params.isType).isNot("string")) throw TypeError("In `params.isType` is expected to be a string.");

		if(type(params.verifyType).isNot(["string", "array"])) throw TypeError("In `params.verifyType` is expected to be a string or an array.");

		if(type(params.defaultErrorMessage).isNot(["function", "string"])) throw TypeError("in `params.defaultErrorMessage` is expected to be a function");

		// Assign the specified parameters to `this` 
		(function assignParamsToThis(inst){
			["isError", "isType", "verifyType", "defaultErrorMessage"].forEach(function(key){
				inst[key] = params[key];
			});
		})(this);

	};
	/**
	 * Throws a TypeError object if the data type is not allowed, otherwise returns `null`
	 * @param {Object} params allows to add a custom `message` and `cause` to an error
	 * @returns {Null}
	 */
	ExceptionHandler.prototype.throwIt = function(params){
		// if the data type doesn't cause an exception return `null`
		if(!this.isError) return null;

		// Validate parameters of the `throwIt()` method
		if(params) validateThrowAndCatchParams(params, this);
		
		// (#) Read note at the bottom of file
		// Define the error message based on user input, if none, use the default message
		let errorMessage = params && type(params.message).isIt(["function", "string"]) ? params.message : this.defaultErrorMessage;
		
		// Create the TypeError object
		let typeError = new TypeError(type(errorMessage).isIt("function") ? errorMessage(this.isType, this.verifyType) : errorMessage);

		// Set a cause if defined
		if(params && params.cause) typeError.cause = params.cause;

		throw typeError;
	};

	/**
	 * Returns a TypeError object if the data type is not allowed, otherwise returns `null`
	 * @param {Object} params allows to add a custom `message` and `cause` to an error
	 * @returns {Null | Object}
	 */
	ExceptionHandler.prototype.catchIt = function(params){
		// if the data type doesn't cause an exception return `null`
		if(!this.isError) return null;

		// Validate parameters of the `catchIt()` method
		if(params) validateThrowAndCatchParams(params, this);

		// (#) Read note at the bottom of file
		// Define the error message based on user input, if none, use the default message
		let errorMessage = params && type(params.message).isIt(["function", "string"]) ? params.message : this.defaultErrorMessage;

		// Create the TypeError object
		let typeError = new TypeError(type(errorMessage).isIt("function") ? errorMessage(this.isType, this.verifyType) : errorMessage);

		// Set a cause if defined
		if(params && params.cause) typeError.cause = params.cause;

		return typeError;
	};

	/**
	 * This will validate the parameters passed through the `.throwIt()` and `.catchIt()` methods
	 * @param {Object} params  parameter passed through the `.throwIt()` and `.catchIt()` methods
	 * @param {Object} inst an instance of `this` from the constructor of `ExceptionHandler`
	 */
	function validateThrowAndCatchParams(params, inst){
		// check if the parameters is defined and if it is an object
		if(params && type(params).isNot("object")) throw TypeError("The `params` argument should be a plain object.");

		// Check if `params.message` is defined and is it a function or a string
		if(params && params.message && type(params.message).isNot(["function", "string"])) throw TypeError("In `params.message` is expected to be a function or a string.");
		
		// Check if `params.message` is it a function and returns a string
		if(params && params.message && type(params.message).isIt("function") && type(params.message(inst.isType, inst.verifyType)).isNot("string")) throw TypeError("In `params.message()` is expected to return a string");
	}

	// Highlight error message in red for runtime in terminal
	const isRuntime = (()=>{try{if(global) return true;}catch{return false}})();
	const redHighlight = {
		beginCode: isRuntime ? "\x1b[31m" : "",
		resetCode: isRuntime ? "\x1b[0m" : ""
	};

	/**
	 * 
	 * @param {*} data The data to be verifies
	 * @returns {Object} An instance of the constructor `TypeErrorIf`
	 */
	const typeErrorIf = function(data){

	    // The constructor
	    function TypeErrorIf(data){
	        // Creates an instance of the `Type` constructor
			this.type = type(data);
		}

	    /**
		 * Allows you to verify types of data to further handle exceptions
		 * @param {String | String[]} verifyType the type or types to be verified
		 * @returns {Object} an instance of the `ExceptionHandler` constructor
		 */
		TypeErrorIf.prototype.isIt = function(verifyType){
	        // Check that `verifyType` is a string or an array
			if (type(verifyType).isNot(["string", "array"])) throw TypeError('isIt(verifyType) method, the `verifyType` argument should be a string or an array')

	        // The default error message for the method `isIt()`
			let defaultErrorMessage = function(errorCauseType, verifyType){
				let isMultiVerification = Array.isArray(verifyType) && verifyType.length > 1;
				return redHighlight.beginCode + "Unexpected type: " + errorCauseType + (isMultiVerification ? ("; The following types are not allowed: " + verifyType.toString()) + redHighlight.resetCode : "; That type is not allowed" + redHighlight.resetCode);
			};
			
	        // This will create an instance to the methods .throwIt() and .catchIt() with all necessary data
			return new ExceptionHandler({
				isError: this.type.isIt(verifyType), // This will define if an exception occurs
				isType: this.type.is, // The type of data that was verified that could cause the exception
				verifyType: verifyType, // The types that were verified through the .isIt() method
				defaultErrorMessage: defaultErrorMessage // The default Error message in case the user doesn't provide one
			});
		};

	    /**
		 * Allows you to verify types of data to further handle exceptions
		 * @param {String | String[]} verifyType the type or types to be verified
		 * @returns {Object} an instance of the `ExceptionHandler` constructor
		 */
		TypeErrorIf.prototype.isNot = function(verifyType){
	        // Check that `verifyType` is a string or an array
			if (type(verifyType).isNot(["string", "array"])) throw TypeError('isNot(verifyType) method, the `verifyType` argument should be a string or an array')
			
	        // The default error message for the method `isNot()`
			let defaultErrorMessage = function(errorCauseType, verifyType){
				let isMultiVerification = Array.isArray(verifyType) && verifyType.length > 1;
				return redHighlight.beginCode + "Unexpected type: " + errorCauseType + "; The only allowed type" + (isMultiVerification ? "s are: " : " is: ") + verifyType.toString() + redHighlight.resetCode;
			};
			
	        // This will create an instance to the methods .throwIt() and .catchIt() with all necessary data
			return new ExceptionHandler({
				isError: this.type.isNot(verifyType), // This will define if an exception occurs
				isType: this.type.is, // The type of data that was verified that could cause the exception
				verifyType: verifyType, // The types that were verified through the .isNot() method
				defaultErrorMessage: defaultErrorMessage // The default Error message in case the user doesn't provide one
			});
		};
			
		// Create an instance
		return new TypeErrorIf(data);
	};

	// Add to `window` if possible 
	(function addToWindowScope(){
		try{
			window.type = type;
			window.typeErrorIf = typeErrorIf;
		} catch{}
	})();

	exports.type = type;
	exports.typeErrorIf = typeErrorIf;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
