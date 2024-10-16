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

document.getElementById("toggleMenu").onclick = function () {
  const mobileNav = document.getElementById("mobileNav");
  if (mobileNav.style.display === "block") {
    mobileNav.style.display = "none"; // Hide the menu
  } else {
    mobileNav.style.display = "block"; // Show the menu
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const loadingIndicator = document.getElementById("loadingIndicator");

  // Show the loading indicator when the page loads
  loadingIndicator.style.display = "flex";

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");

  if (searchQuery) {
    // Fetch the search results
    displaySearchResults(searchQuery)
      .then(() => {
        // Hide the loading indicator after data is fetched and displayed
        loadingIndicator.style.display = "none";
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        loadingIndicator.style.display = "none"; // Hide in case of an error
      });
  } else {
    // If no search query, just hide the loading indicator
    loadingIndicator.style.display = "none";
  }
});

async function displaySearchResults(searchQuery) {
  const searchResultsContainer = document.getElementById(
    "search-results-container"
  );
  searchResultsContainer.innerHTML = ""; // Clear previous results

  try {
    const topics = [
      "bhutanese_jobs",
      "bhutanese_news",
      "crime_law",
      "crises",
      "education_and_learning",
      "entertainment",
      "environment_and_climate",
      "finance_and_business",
      "future_scope",
      "social_issues_and_movement",
      "sports",
      "technology",
      "wellness_and_health",
      "worlds_future_scope",
      "archaeology_and_history",
    ];

    let resultsFound = false;

    for (const topic of topics) {
      const querySnapshot = await getDocs(
        query(collection(firestore, topic), orderBy("timestamp", "desc"))
      );

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const headline = data.headline ? data.headline.toLowerCase() : "";

        if (headline.includes(searchQuery.toLowerCase())) {
          resultsFound = true;
          const resultDiv = document.createElement("div");
          resultDiv.classList.add("result-item");

          // Split text into paragraphs
          const paragraphs = data.text
            .split("\n")
            .filter((p) => p.trim() !== "")
            .map((p) => `<p>${p}</p>`)
            .join("");

          resultDiv.innerHTML = `
            <div class="result-content">
              <h2>${data.title}</h2> <!-- Title first -->
              <h3>${data.headline}</h3> <!-- Headline second -->
              ${
                data.imageUrl
                  ? `<img src="${data.imageUrl}" alt="Related Image" class="result-image">`
                  : ""
              } <!-- Image third -->
              <p><strong>Date:</strong> ${data.date}</p> <!-- Date fourth -->
              ${paragraphs} <!-- Text broken into paragraphs -->
            </div>
          `;

          searchResultsContainer.appendChild(resultDiv);
        }
      });
    }

    if (!resultsFound) {
      searchResultsContainer.innerHTML = "No results found.";
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    searchResultsContainer.innerHTML = "Error fetching search results.";
  }
}
