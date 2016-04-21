package crawler;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;

import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

public class Utils {
    public static Twitter getTwitterInstance() {
    	ConfigurationBuilder cb = new ConfigurationBuilder();
    	cb.setDebugEnabled(true)
    	  .setOAuthConsumerKey("eOTITe4N42i2dVaSB2zIWswKM")
    	  .setOAuthConsumerSecret("vLHKd2OJrLwtFGXq6z2Ks1Um9HF36TpFWvcpVMF6YXjPUYMBLt")
    	  .setOAuthAccessToken("61506919-NRjPTjyi0x5qNFYY811HVIG7xyjND4XX59hx6zd00")
    	  .setOAuthAccessTokenSecret("68lyIbiatOylQuUcMu3pOy4gwIHGziWKc9T3jwWVm56TM");
    	TwitterFactory tf = new TwitterFactory(cb.build());
    	Twitter twitter = tf.getInstance();
    	return twitter;
    }
    public static DynamoDB getDynamoDBInstance() {
    	AmazonDynamoDBClient client = new AmazonDynamoDBClient(new BasicAWSCredentials("keyid", "bogus"));
    	
		// Make sure you use the same port as you configured DynamoDB Local to bind to.
		client.setEndpoint("http://localhost:8000");
		 
		// Sign requests for the "local" region to read data written by the toolkit.
		client.setSignerRegionOverride("local");
		
	    return new DynamoDB(client);
    }
}

