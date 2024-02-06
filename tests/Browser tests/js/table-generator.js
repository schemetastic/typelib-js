
/**
 * @file Contains functions to generate HTML tables for the tests to be performed
 * @author Rodrigo Calix
 * @license MIT
*/

// Generate a table row from a test
const generateRow = {
    /**
     * Generates an HTML row based on a property test
     * @param {Object} testObj contains the test to be performed
     * @returns {String} an HTML row
    **/
    properties: function generatePropertyTestRow(testObj) {

        // Get the properties and methods from the `Type` constructor
        let data = type(testObj.test());
        // Get the value from the native typeof operator
        let nativeTypeOf = typeof (testObj.test());
        // An object that detect if the test passes the expected results
        let passes = {
            is: testObj.expected.is === data.is,
            kinds: arraysMatch(data.kinds, testObj.expected.kinds)
        };

        // The HTML row template with it's results
        return `
            <tr>
                <th scope="row" aria-label="Category: ${testObj.category}">
                    <span class="category-mark category-${testObj.category}"></span>
                    ${testObj.name}
                </th>
                <td>${testObj.label}</td>
                <td>${nativeTypeOf}</td>
                <td>
                    ${data.is}
                    <img src="img/${passes.is ? "check-mark.svg" : "x-mark.svg"}" alt="${passes.is ? "Check mark" : "X mark"}" class="testIcon">
                </td>
                <td data-result="">
                    ${data.kinds}
                    <img src="img/${passes.kinds ? "check-mark.svg" : "x-mark.svg"}" alt="${passes.kinds ? "Check mark" : "X mark"}" class="testIcon">
                </td>
            </tr>
        `;
    },
    /**
     * Generates an HTML row based on a method or parameter test
     * @param {Object} testObj contains the test to be performed
     * @returns {String} an HTML row
    **/
    methodsAndParams: function generateMethodOrParamRow (testObj) {
        // Perform the test
        function test() {
            try {
                return testObj.test();
            } catch (err) {
                // When an error occurs in the test. Note: "@Error" works like a tag system to avoid duplicates.
                return { type: "@Error", error: err };
            }
        }

        // Get the result
        let result = test();

        // Check if it passes the test
        let passes = testObj.expected === '@Error' && result?.type === '@Error' ? true : testObj.expected === result ? true : false;

        // Send the HTML row
        return `
            <tr>
                <th scope="row">${testObj.name}</th>
                <td>${testObj.label}</td>
                <td>${testObj.expected}</td>
                <td>
                    ${result?.type === '@Error' ? result.error : result}
                    <img src="img/${passes ? "check-mark.svg" : "x-mark.svg"}" alt="${passes ? "Check mark" : "X mark"}" class="testIcon">
                </td>
            </tr>
        `;
    }
}

// Generate a table from a set of tests
const generateTable = {
    /**
     * Generates an HTML table with the performed tests por the properties
     * @param {String} caption The title of the table
     * @param {Array} testsArray An array of objects with the tests
     * @returns {String} an HTML table with the results of the tests
    **/
    properties: function generatePropertiesTable(caption, testsArray) {
        // Validate arguments
        if(typeof caption != 'string') throw TypeError("generateTable.properties(caption, testsArray), `caption` must be a string.");
        
        if (!Array.isArray(testsArray)) throw TypeError("generateTable.properties(caption, testsArray), `testsArray` requires an Array of objects.");

        // Will contain the HTML rows
        let rows = ``;

        // Generate each row with it's test and add it to the `rows` variable
        testsArray.forEach(function (item) {
            rows += generateRow.properties(item);
        });

        // The HTML table template with the results
        return `
        <table class="testsTable">
            <caption>${caption}</caption>
            <thead>
                <tr>
                    <th scope="col">
                      Test Name
                    </th>
                    <th scope="col">
                        Test
                    </th>
                    <th scope="col">
                        typeof (native)
                    </th>
                    <th scope="col">
                        .is
                    </th>
                    <th scope="col">
                        .kinds
                    </th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;
    },
    /**
     * Generates an HTML table with the performed tests por the methods and parameters
     * @param {String} caption The title of the table
     * @param {Array} testsArray An array of objects with the tests
     * @returns {String} an HTML table with the results of the tests
    **/
    methodsAndParams: function generateMethodsOrParamsTable(caption, testsArray) {
        // Validate arguments
        if(typeof caption != 'string') throw TypeError("generateTable.methodsAndParams(caption, testsArray), `caption` must be a string.");
        
        if (!Array.isArray(testsArray)) throw TypeError("generateTable.methodsAndParams(caption, testsArray), `testsArray` requires an Array of objects.");
        
        // Will contain the HTML rows
        let rows = ``;

        // Generate each row with it's test and add it to the `rows` variable
        testsArray.forEach(function (item) {
            rows += generateRow.methodsAndParams(item);
        });

        // The HTML table template with the results
        return `
        <table class="testsTable">
            <caption>${caption}</caption>
            <thead>
                <tr>
                    <th scope="col">
                        Test Name
                    </th>
                    <th scope="col">
                        Test
                    </th>
                    <th scope="col">
                        Expected
                    </th>
                    <th scope="col">
                        Result
                    </th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;
    }
};

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

// If the script is executed in Node JS
if (typeof module !== 'undefined' && typeof global !== 'undefined') module.exports = generateTable;
