# HackerNewsArticleScraper  
This project is a Node.js script that uses Playwright to scrape and sort the latest articles from the "newest" page of Hacker News. The script collects the titles and timestamps of the 100 most recent articles and then checks if they are correctly sorted from newest to oldest based on their timestamps.  
  
**Prerequisites**  
Before running the script, ensure that you have the following installed on your machine:  
  
Node.js (v12 or higher)  
npm (Node Package Manager)  
  
**Installation**    
Clone this repository or download the source code.  
Navigate to the project directory in your terminal.  
Install the required dependencies by running:  
npm install playwright  
  
**Usage**  
To run the script, execute the following command in your terminal:  
node sortHackerNewsArticles.js  
  
**How It Works**  
The script launches a Chromium browser using Playwright and navigates to the "newest" page of Hacker News.  
It iteratively scrapes article titles and timestamps until it collects 100 articles.  
After collecting the articles, the script validates whether they are sorted from newest to oldest.  
The results, including the titles and timestamps of the articles, are printed to the console.  
  
**Output**  
The script outputs the first 100 articles retrieved from Hacker News, including their titles and timestamps.  
It also provides a validation message indicating whether the articles are correctly sorted.  
  
**Example Output**  
  
First 100 Hacker News Articles:  
1. Title: Example Article 1 | Time: 2024-08-14 10:30  
2. Title: Example Article 2 | Time: 2024-08-14 10:20  
...  
100. Title: Example Article 100 | Time: 2024-08-13 09:00  
  
Articles are correctly sorted.  
  
  
**Notes**  
The script runs the browser in non-headless mode by default (headless: false) so you can see the browser actions. You can change this to headless: true if you prefer to run it in the background.  
The script waits for 20 seconds (20000ms) after clicking the "More" button to ensure the next set of articles is fully loaded. This value can be adjusted based on your internet speed.  
