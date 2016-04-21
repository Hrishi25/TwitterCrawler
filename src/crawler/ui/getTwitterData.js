/**
 * Display a cool message.
 */
function coolMessage() {
	alert("Cool message");
};

window.onload=function() {
	scanTable();
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
 * Scan DynamoDB Table for items
 */
var params = {
		TableName: 'twitter_data', /* required */
		Select: 'ALL_ATTRIBUTES'
};

function scanTable() {
	alert("scanning table");
	var twitterItems = dynamodb.scan(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
	});
	console.log(twitterItems);
};

