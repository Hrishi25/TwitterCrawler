package crawler;

import java.io.IOException;
import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;

public class Crawler {
	public static void main(String[] args) throws IOException, TwitterException {
		final Twitter twitter = Utils.getTwitterInstance();
	    
	    Query query = new Query("#Fashion");
	    QueryResult result = twitter.search(query);
	    for (Status status : result.getTweets()) {
	        System.out.println("@" + status.getUser().getScreenName() + ":" + status.getText());
	    }
	    CrawlerDAO.loadTweets(result);
	}
}
