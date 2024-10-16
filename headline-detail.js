// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const loadingIndicator = document.getElementById("loadingIndicator");

  // Show the loading indicator
  loadingIndicator.style.display = "flex";

  // Simulate fetching data (you can replace this with your actual data fetching code)
  setTimeout(() => {
    fetchData();
    loadingIndicator.style.display = "none"; // Hide the loading indicator
  }, 2000); // Simulating a 2-second delay for loading
});

function fetchData() {
  console.log("Data fetched");
}

document.getElementById("toggleMenu").onclick = function () {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.style.display =
    mobileNav.style.display === "block" ? "none" : "block"; // Toggle the menu display
};

// Function to get formatted date label
function getDateLabel(dateString) {
  const newsDate = new Date(dateString);
  const bhutanOffset = 6 * 60 * 60 * 1000; // Bhutan time offset
  const now = new Date();
  const today = new Date(
    now.getTime() + now.getTimezoneOffset() * 60000 + bhutanOffset
  );
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  newsDate.setTime(
    newsDate.getTime() + newsDate.getTimezoneOffset() * 60000 + bhutanOffset
  );

  const newsDateFormatted = newsDate.toDateString();
  const todayDateFormatted = today.toDateString();
  const yesterdayDateFormatted = yesterday.toDateString();

  if (newsDateFormatted === todayDateFormatted) {
    return `Today's News<br>${today.toDateString()}`;
  } else if (newsDateFormatted === yesterdayDateFormatted) {
    return `Yesterday's News<br>${today.toDateString()}`;
  } else {
    return `${newsDate.toDateString()}`;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get("id");
  const category = urlParams.get("category");

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

async function fetchHeadlineDetail(id, category) {
  try {
    const newsRef = doc(firestore, category, id);
    const newsSnapshot = await getDoc(newsRef);

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

function displayHeadlineDetails(newsData) {
  const detailContentDiv = document.getElementById("detail-content");

  const formattedDate = newsData.date
    ? new Date(newsData.date).toLocaleDateString()
    : "Date not available";
  const paragraphs = (newsData.text || "Content not available.")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/)
    .filter((para) => para.trim().length > 0);

  const paragraphHTML = paragraphs
    .map((paragraph) => `<p>${paragraph.trim()}</p>`)
    .join("");

  detailContentDiv.innerHTML = `
    <h2>${newsData.title || "Title not available"}</h2>
    <h3>${newsData.headline || "Headline not available"}</h3>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <img src="${
      newsData.imageUrl || ""
    }" alt="News Image" class="news-detail-image">
    ${paragraphHTML}
  `;
}
