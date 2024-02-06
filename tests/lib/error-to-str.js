/**
 * execute a function and returns an error as a string or a null value if doesn't catch any error.
 * @param {Function} func 
 * @returns {(string|null)}
 */

function errorToStr(func){
    try{
        func();
        return null;
    } catch(err){
        return err.toString();
    }
}

export {errorToStr};