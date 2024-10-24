import {
  initializeApp,
  getApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmksj9rPjyZapz0wjT7llNYe8vT6jGbgY",
  authDomain: "newsinfo-2dcb2.firebaseapp.com",
  projectId: "newsinfo-2dcb2",
  storageBucket: "newsinfo-2dcb2.appspot.com",
  messagingSenderId: "641121104333",
  appId: "1:641121104333:web:b686d0844427008b47d484",
  measurementId: "G-N814HMYX62",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  showLoadingSpinner(); // Show the spinner when content is loading
  fetchNewsFromCategories([
    "crises",
    "archaeology_and_history",
    "crime_law",
    "education_and_learning",
    "entertainment",
    "environment_and_climate",
    "finance_and_business",
    "social_issues_and_movement",
    "sports",
    "technology",
    "wellness_and_health",
    "political_events",
  ]);
});

async function fetchNewsFromCategories(categories) {
  const allNews = [];

  for (const category of categories) {
    try {
      const latestNewsSnapshot = await getDocs(
        query(
          collection(firestore, category),
          orderBy("timestamp", "desc"),
          limit(2) // Fetch the latest 2 news items from each category
        )
      );

      latestNewsSnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        allNews.push(data); // Store news items in an array
      });
    } catch (error) {
      console.error(`Error fetching news for category ${category}:`, error);
    }
  }

  removeLoadingSpinner(); // Remove the spinner when content is loaded

  // Check if we have enough latest news
  if (allNews.length >= 2) {
    // Display the latest news
    const latestNews = getLatestNews(allNews, 2);
    const newsContentDiv = document.getElementById("newsContent");
    latestNews.forEach((news) => {
      addNews(news, newsContentDiv);
    });
  } else {
    // Randomly select news if not enough latest news
    const randomNews = getRandomItems(allNews, 2);
    const newsContentDiv = document.getElementById("newsContent");
    randomNews.forEach((news) => {
      addNews(news, newsContentDiv);
    });
  }
}

function getLatestNews(allNews, count) {
  return allNews.sort((a, b) => b.timestamp - a.timestamp).slice(0, count); // Sort by timestamp and take the latest
}

function getRandomItems(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, count); // Return the first 'count' items
}

function addNews(data, contentDiv) {
  const newsItem = document.createElement("div");
  newsItem.classList.add("news-item");

  const title = document.createElement("h2");
  title.innerText = data.title;
  title.style.display = "none";
  newsItem.appendChild(title);

  const headline = document.createElement("h3");
  headline.innerText = data.headline;
  newsItem.appendChild(headline);

  const date = document.createElement("p");
  date.innerText = `Date: ${data.date}`;
  newsItem.appendChild(date);

  if (data.imageUrl) {
    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.title;
    img.classList.add("news-image");
    img.style.display = "block"; // Make the image block-level to center it
    img.style.margin = "0 auto"; // Center the image horizontally
    newsItem.appendChild(img);
  }

  const textContent = document.createElement("p");
  const snippet =
    data.text.length > 100 ? data.text.substring(0, 100) + "..." : data.text;
  textContent.innerText = snippet;
  newsItem.appendChild(textContent);

  const readMoreLink = document.createElement("span");
  readMoreLink.innerText = "Read More";
  readMoreLink.classList.add("read-more");
  readMoreLink.style.color = "#047fcc"; // Blue color
  readMoreLink.style.cursor = "pointer"; // Clickable
  readMoreLink.style.display = "inline-block"; // Block-level
  readMoreLink.style.textAlign = "center"; // Center align text
  readMoreLink.addEventListener("click", () => {
    window.location.href = `headline-detail1.html?id=${data.id}`;
  });
  newsItem.appendChild(readMoreLink);

  contentDiv.appendChild(newsItem);
}

function showLoadingSpinner() {
  const spinner = document.createElement("div");
  spinner.id = "loadingSpinner";
  spinner.innerHTML = `<div class="Spinner"></div>`;

  // Assuming you're adding it to a specific topic container:
  const newsContentDiv = document.getElementById("newsContent");
  newsContentDiv.appendChild(spinner);
  spinner.style.display = "flex"; // Show the spinner
}

function removeLoadingSpinner() {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) {
    spinner.remove();
  }
}

// Add CSS styles
const style = document.createElement("style");
style.innerHTML = `
  .read-more {
    text-decoration: none;
  }
  .read-more:hover {
    text-decoration: none;
  }
  .news-image {
    max-width: 80%;
    height: auto;
  }
  .news-item {
    text-align: center;
  }

/* Spinner Styles */ 
.Spinner {
  border: 6px solid #f3f3f3;  /* Light gray */
  border-top: 6px solid #3498db;  /* Blue */
  border-radius: 50%;  /* Circular shape */
  width: 40px;  /* Width of spinner */
  height: 40px;  /* Height of spinner */
  animation: spin 2s linear infinite;  /* Spin animation */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#loadingSpinner {
  position: absolute;  /* Position relative to parent container */
  top: 300px;  /* Adjust this value to position the spinner */
  right: 290px;  /* Adjust this value to position the spinner */
  display: flex;  /* Flexbox layout */
  justify-content: center;  /* Center content */
  align-items: center;  /* Center items */
  z-index: 9999;  /* Ensure it’s on top of other elements */
  pointer-events: none;  /* Prevent interaction with the spinner */
}
  /* Mobile Styles */
@media (max-width: 768px) {  /* Adjust for screens 768px and smaller */
  #loadingSpinner {
    top: 1800px;  /* Closer to the top */
    right: 200px;  /* Closer to the right edge */
    }
    .Spinner {
  border: 4px solid #f3f3f3;  /* Light gray */
  border-top: 4px solid #3498db;  /* Blue */
  border-radius: 50%;  /* Circular shape */
  width: 20px;  /* Width of spinner */
  height: 20px;  /* Height of spinner */
  animation: spin 2s linear infinite;  /* Spin animation */
}
}
`;
document.head.appendChild(style);
