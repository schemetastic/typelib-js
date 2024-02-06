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
        
        // Constructors
        const blob = new Blob();
        const fileReader = new FileReader();

        // After all the tests are passed
        return true;
    } catch (err){
        // If a feature is not detected return false
        return false;
    }
}