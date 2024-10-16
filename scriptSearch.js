import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

const app = getApp();
const firestore = getFirestore(app);

async function searchHeadline() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const searchResultsDiv = document.getElementById("search-results");
  searchResultsDiv.innerHTML = "";

  // Normalize the search input date format
  const normalizedSearchInput = searchInput.replace(/[\s/-]/g, "");

  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "headlines"), orderBy("timestamp", "desc"))
    );

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const headline = data.headline.toLowerCase();
      const title = data.title.toLowerCase(); // Assuming you have a title field
      const date = data.date
        .toString()
        .toLowerCase()
        .replace(/[\s/-]/g, ""); // Normalize date format

      // Check if searchInput is included in headline, title, or normalized date
      if (
        headline.includes(searchInput) ||
        title.includes(searchInput) ||
        date.includes(normalizedSearchInput)
      ) {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result-item");
        resultDiv.innerHTML = `
            <h2>${data.title}</h2>
            <h3>${data.headline}</h3>
            <p>${data.text}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <img src="${data.imageUrl}" alt="Related Image" style="max-width:100%; height:auto;">
          `;
        searchResultsDiv.appendChild(resultDiv);
      }
    });
  } catch (error) {
    console.error("Error searching headlines:", error);
    searchResultsDiv.innerHTML = "Error fetching search results.";
  }
}

document
  .getElementById("search-button")
  .addEventListener("click", searchHeadline);
