import {type} from "../type.js";

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
	})(this)

}
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
}

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
}

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

/*
 # It was decided not to “DRY” with the TypeError object because having a function that generates
   the TypeError creates a longer error trace, which could lead to confusion.
*/

export {ExceptionHandler};