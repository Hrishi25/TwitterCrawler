package crawler;

import twitter4j.QueryResult;
import twitter4j.Status;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;

public class CrawlerDAO {
	private static String tableName = "twitter_data";
	
	public static void loadTweets(QueryResult result) {
		DynamoDB dynamoDB = Utils.getDynamoDBInstance();
		Table table = dynamoDB.getTable(tableName);
		
		for (Status status : result.getTweets()) {
			Item item = new Item()
	        .withPrimaryKey("key", status.getText());
	        //.withString("popularBrands", result.getTweets().get(0).getText());
			
			table.putItem(item);
		}
	}
}
