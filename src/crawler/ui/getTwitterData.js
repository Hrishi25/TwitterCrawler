/**
 * Display a cool message.
 */
function coolMessage() {
    alert("Cool message");
}

window.onload=function() {
	coolMessage();
}

   /**
   * AWS Configuration
   */
    var AWS.config = new AWS.Config({
	  accessKeyId: 'AKIAJ5BSIE7EMETRCAKQ', 
	  secretAccessKey: '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', 
	  region: 'us-west-2'
	});
