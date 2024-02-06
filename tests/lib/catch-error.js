/**
 * execute a function and returns an error object or a null value if doesn't catch any error.
 * @param {Function} func 
 * @returns {(Object|null)}
 */

function catchError(func){
    try{
        func();
        return null;
    }
    catch (err){
        return err;
    }

}

export {catchError};