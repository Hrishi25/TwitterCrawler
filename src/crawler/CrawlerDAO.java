package crawler;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import twitter4j.QueryResult;
import twitter4j.Status;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.amazonaws.services.dynamodbv2.model.ScanResult;

public class CrawlerDAO {
	private static String tableName = "twitter_data";

	public static void loadTweets(QueryResult result) {
		DynamoDB dynamoDB = Utils.getDynamoDBInstance();
		Table table = dynamoDB.getTable(tableName);

		for (Status status : result.getTweets()) {
			Item item = new Item().withPrimaryKey("key", UUID.randomUUID())
					.withString("tweet", status.getText());

			table.putItem(item);
		}
	}

	public void analyzeTweets(String category, String tweet) {
		
		AmazonDynamoDBClient amazonDynamoDBClient = Utils.getAmazonDynamoDBClient();
		
		HashMap<String, String> expressionAttributeNames = new HashMap<>();
		expressionAttributeNames.put("#key1", "key");
		
		AttributeValue attributeValue = new AttributeValue();
		attributeValue.setS(category);
		HashMap<String, AttributeValue> expressionAttributeValues =  new HashMap<>();
		expressionAttributeValues.put(":category", new AttributeValue().withS(category));
		
		ScanRequest request = new ScanRequest();
		request.withTableName("brands")
				.withFilterExpression("begins_with(#key1, :category)")
				.withProjectionExpression("#key1, category, brand")
				.withExpressionAttributeNames(expressionAttributeNames)
				 .withExpressionAttributeValues(expressionAttributeValues);
		        
		try{
			System.out.println("inside try catch");
			ScanResult result = amazonDynamoDBClient.scan(request);
			
			for (Map<String, AttributeValue> itemValue : result.getItems()){
			    System.out.println("key:"+ itemValue.get("key").getS());
			    System.out.println("category:"+ itemValue.get("category").getS());
			    System.out.println("brand:"+ itemValue.get("brand").getS());
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main (String args []) {
		CrawlerDAO crawlerDAO = new CrawlerDAO();
		crawlerDAO.analyzeTweets("shoes", "random stuff");
	}

}
