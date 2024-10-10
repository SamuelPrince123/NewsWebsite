import {
  initializeApp,
  getApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDmksj9rPjyZapz0wjT7llNYe8vT6jGbgY",
  authDomain: "newsinfo-2dcb2.firebaseapp.com",
  projectId: "newsinfo-2dcb2",
  storageBucket: "newsinfo-2dcb2.appspot.com",
  messagingSenderId: "641121104333",
  appId: "1:641121104333:web:b686d0844427008b47d484",
  measurementId: "G-N814HMYX62",
};

// Initialize Firebase app and Firestore
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

// Event listener for DOM content loaded
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

// Function to fetch data
function fetchData() {
  // Your existing data fetching logic goes here
  // Fetch news data from the server or Firebase
  console.log("Data fetched");
}

// Toggle mobile navigation menu
document.getElementById("toggleMenu").onclick = function () {
  const mobileNav = document.getElementById("mobileNav");
  if (mobileNav.style.display === "block") {
    mobileNav.style.display = "none"; // Hide the menu
  } else {
    mobileNav.style.display = "block"; // Show the menu
  }
};

// Another DOM content loaded listener to handle fetching headline details
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get("id");
  const category = urlParams.get("category");

  // Check if newsId and category are present in the URL
  if (newsId && category) {
    try {
      await fetchHeadlineDetail(newsId, category);
    } catch (error) {
      document.getElementById(
        "detail-content"
      ).innerHTML = `<p>Error loading news details: ${error.message}</p>`;
    }
  } else {
    document.getElementById("detail-content").innerHTML =
      "<p>News headline not found. Please try again later.</p>";
  }
});

// Function to fetch headline details from Firestore
async function fetchHeadlineDetail(id, category) {
  try {
    const newsRef = doc(firestore, category, id);
    const newsSnapshot = await getDoc(newsRef);

    // Check if the news document exists
    if (newsSnapshot.exists()) {
      const newsData = newsSnapshot.data();
      displayHeadlineDetails(newsData);
    } else {
      document.getElementById("detail-content").innerHTML =
        "<p>News headline not found.</p>";
    }
  } catch (error) {
    document.getElementById(
      "detail-content"
    ).innerHTML = `<p>Error loading document: ${error.message}</p>`;
  }
}

// Function to display the fetched headline details
function displayHeadlineDetails(newsData) {
  const detailContentDiv = document.getElementById("detail-content");

  const formattedDate = newsData.date
    ? new Date(newsData.date).toLocaleDateString()
    : "Date not available";

  // Normalize line breaks and split into paragraphs
  const paragraphs = (newsData.text || "Content not available.")
    .replace(/\r\n/g, "\n") // Normalize Windows-style line breaks
    .replace(/\r/g, "\n") // Normalize old Mac-style line breaks
    .split(/\n{2,}/) // Split on two or more newlines
    .filter((para) => para.trim().length > 0); // Remove empty paragraphs

  // Map paragraphs to HTML <p> tags
  const paragraphHTML = paragraphs
    .map((paragraph) => `<p>${paragraph.trim()}</p>`)
    .join("");

  detailContentDiv.innerHTML = `
    <h1>${newsData.title || "Title not available"}</h1>
    <h2>${newsData.headline || "Headline not available"}</h2>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <img src="${
      newsData.imageUrl || ""
    }" alt="News Image" class="news-detail-image">
    ${paragraphHTML}
  `;
}
