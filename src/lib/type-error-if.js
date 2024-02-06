import {type} from "./type.js";
import {ExceptionHandler} from "./utils/exception-handler.js";

// Highlight error message in red for runtime in terminal
const isRuntime = (()=>{try{if(global) return true;}catch{return false}})();
const redHighlight = {
	beginCode: isRuntime ? "\x1b[31m" : "",
	resetCode: isRuntime ? "\x1b[0m" : ""
}

/**
 * 
 * @param {*} data The data to be verifies
 * @returns {Object} An instance of the constructor `TypeErrorIf`
 */
const typeErrorIf = function(data){

    // The constructor
    function TypeErrorIf(data){
        // Creates an instance of the `Type` constructor
		this.type = type(data)
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
		}
		
        // This will create an instance to the methods .throwIt() and .catchIt() with all necessary data
		return new ExceptionHandler({
			isError: this.type.isIt(verifyType), // This will define if an exception occurs
			isType: this.type.is, // The type of data that was verified that could cause the exception
			verifyType: verifyType, // The types that were verified through the .isIt() method
			defaultErrorMessage: defaultErrorMessage // The default Error message in case the user doesn't provide one
		});
	}

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
		}
		
        // This will create an instance to the methods .throwIt() and .catchIt() with all necessary data
		return new ExceptionHandler({
			isError: this.type.isNot(verifyType), // This will define if an exception occurs
			isType: this.type.is, // The type of data that was verified that could cause the exception
			verifyType: verifyType, // The types that were verified through the .isNot() method
			defaultErrorMessage: defaultErrorMessage // The default Error message in case the user doesn't provide one
		});
	}
		
	// Create an instance
	return new TypeErrorIf(data);
}



export {typeErrorIf};