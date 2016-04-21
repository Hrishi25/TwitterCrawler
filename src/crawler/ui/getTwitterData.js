/**
 * Display a cool message.
 */
function coolMessage() {
	alert("Cool message");
};

/** 
 * Scan the table when the page loads.
 */
window.onload=function() {
	scanTwitterTable();
	scanBrandsTable();
};

/**
 * AWS Configuration
 */
var dynamodb = new AWS.DynamoDB({
	params: {TableName: 'twitter_data'},
	endpoint: 'http://dynamodb.us-west-2.amazonaws.com',
	accessKeyId: 'AKIAJ5BSIE7EMETRCAKQ', 
	secretAccessKey: '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',
	region: 'us-west-2'
});

/**
 * Scan DynamoDB Table for twitter items
 */
var twitterParams = {
		TableName: 'twitter_data', /* required */
		Select: 'ALL_ATTRIBUTES'
};

function scanTwitterTable() {
	var twitterItems;
	dynamodb.scan(twitterParams, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else {     
//			console.log(data);  
//			console.log(data.Items);
			var numItems = data.Count;
			twitterItems = data.Items;
			
			updateTableDisplay(twitterItems, numItems);


		}// successful response
	});
};

/**
 * Scan DynamoDB table for current seller items
 */
var catalogParams = {
		TableName: 'product_catalog', /* required */
		Select: 'ALL_ATTRIBUTES'
};

function scanBrandsTable() {
	alert("scanning catalog table");
	var catalogEntries;
	dynamodb.scan(catalogParams, function(err, data) {
		if (err) {
			console.log(err, err.stack); 
		}// an error occurred
		else {     
			console.log("Catalog! ");
			console.log(data);
			catalogEntries = data.Items;
		}// successful response
	});
};

/**
 * Update the table to display twitter items.
 */
function updateTableDisplay(twitterItems, numItems) {
	var rowName = 'row';
	var columnName = 'column0';
	for (var i = 0; i < 5; i++) {
		var cellName = rowName + i + columnName;
		var brand = twitterItems[i].popularBrands;
		console.log(brand.S);
		document.getElementById(cellName).innerHTML = brand.S;
	};
};

