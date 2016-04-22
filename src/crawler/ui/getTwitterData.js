/** 
 * Scan the table when the page loads.
 */
window.onload=function() {
    scanTwitterTable();
};

/**
 * AWS Configuration
 */
var dynamodb = new AWS.DynamoDB({
	endpoint: 'http://dynamodb.us-west-2.amazonaws.com',
	accessKeyId: 'AKIAJ5BSIE7EMETRCAKQ', 
	secretAccessKey: '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',
	region: 'us-west-2'
});

/**
 * Scan DynamoDB Table for twitter items
 */
var twitterParams = {
		TableName: 'twitter_data',
		Select: 'ALL_ATTRIBUTES'
};

function scanTwitterTable() {
	dynamodb.scan(twitterParams, function(err, data) {
		if (err) {
			console.log(err, err.stack); 
		}// an error occurred
		else {     
			scanBrandsTable(data.Items);
		}// successful response
	});
};

/**
 * Scan DynamoDB table for current seller items
 */
var catalogParams = {
		TableName: 'product_catalog',
		Select: 'ALL_ATTRIBUTES'
};

function scanBrandsTable(popularItems) {
	dynamodb.scan(catalogParams, function(err, data) {
		if (err) {
			console.log(err, err.stack); 
		}// an error occurred
		else {     ;
			compareBrandsToCatalog(popularItems, data.Items);
		}// successful response
	});
};

/**
 * Compare brands to seller's product catalog.
 * Remove any brands that they are currently selling.
 */
function compareBrandsToCatalog(popularItems, catalogItems) {
    // get string values from catalog brands
    var brandsInCatalog = [];
    for (var j = 0; j < catalogItems.length; j++) {
    	console.log(catalogItems[j].brand_name.S);
    	brandsInCatalog.push(catalogItems[j].brand_name.S.toLowerCase());
    }
    console.log(brandsInCatalog);
    // get string values from brands mentioned on twitter
    var brandsOnTwitter = [];
    for (var i = 0; i < popularItems.length; i++) {
    	console.log(popularItems[i].Brand.S);
     	brandsOnTwitter.push(popularItems[i].Brand.S.toLowerCase());
    };
    console.log(brandsOnTwitter);
    // make a list of items on twitter missing from catalog
    var recommendedBrands = [];
    for (var k = 0; k < brandsOnTwitter.length; k++) {
    	console.log(brandsOnTwitter[k]);
    	console.log(brandsInCatalog.indexOf(brandsOnTwitter[k]));
    	var index = brandsInCatalog.indexOf(brandsOnTwitter[k]);
    	if (index != -1) {
    		recommendedBrands.push(brandsOnTwitter[k]);
    	}
    }
    console.log(recommendedBrands);
    updateTableDisplay(recommendedBrands);
}

/**
 * Update the table to display brands seller should sell.
 */
function updateTableDisplay(recommendedBrands) {
	var rowName = 'row';
	var columnName = 'column0';
	// Display only the top five items
	var numItems = recommendedBrands.length;
	if (numItems > 5) {
		numItems = 5;
	}
	// Display items and capitalize first letter
	for (var i = 0; i < numItems; i++) {
		var cellName = rowName + i + columnName;
		var displayName = 
			recommendedBrands[i].charAt(0).toUpperCase() + recommendedBrands[i].slice(1);
 		document.getElementById(cellName).innerHTML = displayName;
	};
};

