/**
 * 
 * @param {Array} firstArray 
 * @param {Array} secondArray 
 * @returns {Boolean} if the `secondArray` contains the same items returns `true`, otherwise `false`
 */
function arraysMatch(firstArray, secondArray) {
    // Validate arguments
    if (!Array.isArray(firstArray) || !Array.isArray(secondArray)) throw TypeError('arraysMatch(firstArray, secondArray) both arguments should be an array.');

    if (firstArray.length !== secondArray.length) return false;

    // Check if the arrays contain same items
    return firstArray.every(function (item) { return secondArray.includes(item) });
}

export {arraysMatch};
