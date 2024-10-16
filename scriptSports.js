// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmksj9rPjyZapz0wjT7llNYe8vT6jGbgY",
  authDomain: "newsinfo-2dcb2.firebaseapp.com",
  projectId: "newsinfo-2dcb2",
  storageBucket: "newsinfo-2dcb2.appspot.com",
  messagingSenderId: "641121104333",
  appId: "1:641121104333:web:b686d0844427008b47d484",
  measurementId: "G-N814HMYX62",
};

document.addEventListener("DOMContentLoaded", () => {
  const loadingIndicator = document.getElementById("loadingIndicator");

  // Show the loading indicator
  loadingIndicator.style.display = "flex";

  // Simulate fetching data (you can replace this with your actual data fetching code)
  setTimeout(() => {
    // Fetch data (for example purposes)
    fetchData();

    // Hide the loading indicator when data is loaded
    loadingIndicator.style.display = "none";
  }, 2000); // Simulating a 2-second delay for loading
});

function fetchData() {
  // Your existing data fetching logic goes here
  // Fetch news data from the server or Firebase
  console.log("Data fetched");
}

document.getElementById("toggleMenu").onclick = function () {
  const mobileNav = document.getElementById("mobileNav");
  if (mobileNav.style.display === "block") {
    mobileNav.style.display = "none"; // Hide the menu
  } else {
    mobileNav.style.display = "block"; // Show the menu
  }
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to get formatted date label
function getDateLabel(dateString) {
  const newsDate = new Date(dateString);

  // Bhutan's time zone offset
  const bhutanOffset = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const now = new Date();
  const today = new Date(
    now.getTime() + now.getTimezoneOffset() * 60000 + bhutanOffset
  );
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Adjust dates to Bhutan time zone for accurate comparison
  newsDate.setTime(
    newsDate.getTime() + newsDate.getTimezoneOffset() * 60000 + bhutanOffset
  );

  // Format dates
  const newsDateFormatted = newsDate.toDateString();
  const todayDateFormatted = today.toDateString();
  const yesterdayDateFormatted = yesterday.toDateString();

  if (newsDateFormatted === todayDateFormatted) {
    return `Today's News<br>${today.toDateString()}`;
  } else if (newsDateFormatted === yesterdayDateFormatted) {
    return `Yesterday's News<br>${newsDate.toDateString()}`;
  } else {
    return `${newsDate.toDateString()}`;
  }
}

// Function to load data from Firebase and sort it by date
async function loadData() {
  const container = document.getElementById("sportsContent");
  const sportsRef = collection(db, "sports"); // Reference to 'sports' collection
  const querySnapshot = await getDocs(sportsRef);

  // Array to hold articles for sorting
  const articles = [];

  // Collect all articles
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    articles.push({
      title: data.title || "No Title",
      headline: data.headline || "No Headline",
      imageUrl: data.imageUrl || "default-image.png",
      date: data.date || "No Date Available",
      text: data.text || "No content available.",
    });
  });

  // Sort articles by date (most recent first)
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Clear the container before adding sorted articles
  container.innerHTML = "";

  // Append sorted articles to the container
  articles.forEach((articleData) => {
    const article = document.createElement("div");
    article.className = "article";
    article.innerHTML = `
      <h2>${articleData.title}</h2>
      <h3>${articleData.headline}</h3>
      <img src="${articleData.imageUrl}" alt="${
      articleData.title
    }" class="article-image">
      <p>${getDateLabel(articleData.date)}</p>
      <p>${articleData.text}</p>
    `;
    container.appendChild(article);
  });
}

// Call the function to load data
window.onload = loadData;
