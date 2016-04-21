package crawler;

import twitter4j.QueryResult;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;

public class CrawlerDAO {
	private static String tableName = "twitter_data";
	
	public static void loadTweets(QueryResult result) {
		DynamoDB dynamoDB = Utils.getDynamoDBInstance();
		Table table = dynamoDB.getTable(tableName);
		
		Item item = new Item()
        .withPrimaryKey("key", "1")
        .withString("popularBrands", result.getTweets().get(0).getText());
		
		table.putItem(item);
	}
}
