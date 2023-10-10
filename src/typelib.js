/**
 * Returns a constructor with a set of properties and methods to verify the data
 * @param {*} data The data that will be verified to obtain it's type and kinds
 * @param {Object} customParams parameters to change the default behavior
 * @returns {Object} An instance of the constructor `Type`
 */
const type = function type(data, customParams) {
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
				if (Object.prototype.toString.call(params) != '[object Object]') throw TypeError('The `params` argument must be an object.');

				// Check if the `writable` parameter was defined but also a boolean.
				if (params.writable !== undefined && (params.writable !== true && params.writable !== false)) throw TypeError('The parameter `writable` must be a boolean.');

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
					writable: false
				});

				// If the custom parameters are not available return the default parameters, otherwise assign them to `defaultParams`. 
				return !areCustomParamsAvailable ? defaultParams : Object.assign(defaultParams, customParams);
			}
		)();

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
				
				// If it's an arrow function.
				// AI help: https://www.perplexity.ai/search/How-can-you-icR0PHxbRZmITiFRmKjjuQ?s=c
				if (defaultType == "function" && !data.prototype && data.toString().indexOf('function') === -1) return "arrowfunction";

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
	 * Allows you to verify expected types of data
	 * @param {String | String[]} expectedType the type or types you are expecting 
	 * @returns {Boolean}
	 */
	Type.prototype.isIt = function (expectedType) {
		// If `expectedType` is not a string or an array throw a TypeError. 
		if (typeof expectedType !== 'string' && !Array.isArray(expectedType)) throw TypeError('isIt(expectedType) method, the `expectedType` argument should be a string or an array.')

		// If `expectedType` is an array check if there is a matching item
		if (Array.isArray(expectedType)) return expectedType.indexOf(this.is) > -1

		// If `expectedType` is a string
		return expectedType === this.is;
	};


	/**
	 * Allows you to verify not expected types of data
	 * @param {String | String[]} notExpectedType the type or types you are not expecting 
	 * @returns {Boolean}
	 */
	Type.prototype.isNot = function (notExpectedType) {
		// If `notExpectedType` is not a string or an array throw a TypeError.
		if (typeof notExpectedType !== 'string' && !Array.isArray(notExpectedType)) throw TypeError('isNot(notExpectedType) method, the `notExpectedType` argument should be a string or an array.');

		// Return the opposite of the `isIt()` method
		return !this.isIt(notExpectedType);
	};

	// Create an instance to the `Type` constructor
	return new Type(data, customParams);
};

export { type as default };
