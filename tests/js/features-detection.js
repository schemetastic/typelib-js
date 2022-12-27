/**
 * @file Helps to detect features in the browser or runtime
 * @author Rodrigo Calix
 * @license MIT
*/

/**
 * Check if the browser or runtime has some modern features that are required to perform all the tests
 * @returns {Boolean} if it passes the tests returns `true`, otherwise `false`.
 */
function isEnvironmentCompatible(){
    try{
        // Function Types
        const classCheck = class Hello{};
        const arrowFunctionCheck = ()=>"hello";
        const generatorFunctionCheck = function* (){ };
        
        // Constructors
        const setCheck = new Set();
        const weakMapCheck = new WeakMap();
        const weakSetCheck = new WeakSet();
        const mapCheck = new Map();
        const arrayBufferCheck = new ArrayBuffer();

        // After all the tests are passed
        return true;
    } catch (err){
        // If a feature is not detected return false
        return false;
    }
}