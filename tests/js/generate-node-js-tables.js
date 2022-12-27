/**
 * @file Generates an HTML file containing the tests related with Node JS
 * @author Rodrigo Calix
 * @license MIT
*/

const globalTests = require('./tests-lib/global-tests.js');
const nodeTests = require('./tests-lib/node-js-tests.js');
const methodsTests = require('./tests-lib/methods-tests.js');
const paramsTests = require('./tests-lib/params-tests.js');
const generateTable = require('./table-generator.js');
const fs = require('fs');

// The output file name
const outputFileName = 'node-js.html';

// The content of the file
const htmlMainContent = 
`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>TypeLib JS| Node JS tests</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
	
<body>
	<div class="container">
		<h1>TypeLib JS (type()) | Node JS (${process.version}) tests</h1>
		<p><strong>(This is a file generated with Node JS).</strong></p>
		
		<!--Index-->
		<h2>Index</h2>
		<ol class="index">
			<li><a href="#test-result-graphic-marks">Tests result graphic marks</a></li>
			<li><a href="#properties-tests">Properties tests</a></li>
			<ol>
				<li><a href="#categories">Categories</a></li>
				<li><a href="#global-tests">Global tests</a></li>
				<li><a href="#node-js-tests">Node JS tests</a></li>
			</ol>
			<li><a href="#methods-tests">Methods tests</a></li>
			<ol>
				<li><a href="#is-it-method">.isIt()</a></li>
				<li><a href="#is-not-method">.isNot()</a></li>
			</ol>
			<li><a href="#parameters-tests">Parameters tests</a></li>
			<ol>
				<li><a href="#parameters-validation">Parameters Validation</a></li>
				<li><a href="#writable-parameter">Writable Parameter</a></li>
			</ol>
		</ol>

		<!--Tests result graphic marks-->
		<h2 id="test-result-graphic-marks">Test result graphic marks</h2>
		<p>
			<img src="img/check-mark.svg" class="testIcon testIcon-preview" alt="Check mark">
			= The result is the expected <br>

			<img src="img/x-mark.svg" class="testIcon testIcon-preview" alt="X mark">
			= The result is unexpected <br>
		</p>

		<!--Properties-->
		<h2 id="properties-tests">Properties tests</h2>

		<!--Properties: Categories list-->
		<h3 id="categories">Categories</h3>
		<ul class="categoriesList">
			<li>
				<span class="category-mark category-primitive"></span>
				Primitives
			</li>
			<li><span class="category-mark category-common-object"></span>
				Common Objects
			</li>
			<li>
				<span class="category-mark category-numeric"></span>
				Numeric
			</li>
			<li>
				<span class="category-mark category-function"></span>
				Function Types
			</li>
			<li>
				<span class="category-mark category-constructor-object"></span>
				Constructor Objects
			</li>
			<li>
				<span class="category-mark category-error"></span>
				Errors
			</li>
			<li>
				<span class="category-mark category-miscellaneous"></span>
				Miscellaneous
			</li>
			<li>
				<span class="category-mark category-node-js"></span>
				Node JS
			</li>
		</ul>

		<!--Properties: Global tests-->
		<div id="global-tests">
	        ${generateTable.properties('Global tests', globalTests)}
		</div>

		<!--Properties: Node JS tests-->
		<h2>Node JS Related Tests</h2>
		<div id="node-js-tests">
			${generateTable.properties('Node JS tests', nodeTests)}
		</div>

		<!--Methods-->
		<h2 id="methods-tests">Methods tests</h2>

		<!--Methods: isIt()-->
		<div id="is-it-method">
			${generateTable.methodsAndParams('isIt()', methodsTests["is-it"])}
		</div>

		<!--Methods: isNot()-->
		<div id="is-not-method">
			${generateTable.methodsAndParams('isNot()', methodsTests["is-not"])}
		</div>

		<!--Parameters-->
		<h2 id="parameters-tests">Parameters tests</h2>
		
		<!--Parameters: Validation-->
		<div id="parameters-validation">
			${generateTable.methodsAndParams('Parameters Validation', paramsTests["params-validation"])}
		</div>

		<!--Parameters: Writable-->
		<div id="writable-parameter">
			${generateTable.methodsAndParams('Writable Parameter', paramsTests["writable"])}
		</div>
	</div>
</body>

</html>
`;

// Write the file
fs.writeFile('tests/' + outputFileName, htmlMainContent, function (error) {
	if (error) throw error;
	console.log(`The file "${outputFileName}" was written.`);
});