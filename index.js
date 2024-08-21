const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  const hnBrowser = await chromium.launch({ headless: false });
  const context = await hnBrowser.newContext();
  const page = await context.newPage();

  // Go to Hacker News "newest" page
  await page.goto("https://news.ycombinator.com/newest");

  let newsArticles = [];

  while (newsArticles.length < 100) {
    // Wait for the articles to be visible
    await page.waitForSelector('.athing');

    // Extract the titles and timestamps for the articles currently loaded
    const freshArticles = await page.$$eval('.athing', elements => {
      return elements.map(newsItem => {
        const articleLink = newsItem.querySelector('.titleline a');
        const timeElement = newsItem.nextElementSibling.querySelector('.age');
        
        if (articleLink && timeElement) {
          return {
            title: articleLink.textContent,
            time: timeElement.getAttribute('title')
          };
        }
        return null;
      }).filter(article => article !== null);
    });

    // Add the newly extracted articles to the total list
    newsArticles = newsArticles.concat(freshArticles);

    // If we have less than 100 articles, click the "More" button to load more
    if (newsArticles.length < 100) {
      await page.click('text=More');
      await page.waitForTimeout(20000); // Wait for articles to load
    }
  }

  // Slice the array to get only the first 100 articles
  newsArticles = newsArticles.slice(0, 100);

  // Print the articles
  console.log("First 100 Hacker News Articles:");
  newsArticles.forEach((article, index) => {
    console.log(`${index + 1}. Title: ${article.title} | Time: ${article.time}`);
  });

  // Validate that the articles are sorted from newest to oldest
  let isValid = true;
  for (let i = 1; i < newsArticles.length; i++) {
    if (new Date(newsArticles[i].time) > new Date(newsArticles[i - 1].time)) {
      isValid = false;
      break;
    }
  }

  console.log(isValid ? "Articles are correctly sorted." : "Articles are not sorted correctly.");

  await hnBrowser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
