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

// script.js

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

document.getElementById("toggleMenu").addEventListener("click", function () {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.toggle("active");
});

document.getElementById("toggleMenu").onclick = function () {
  const mobileNav = document.getElementById("mobileNav");
  if (mobileNav.style.display === "block") {
    mobileNav.style.display = "none"; // Hide the menu
  } else {
    mobileNav.style.display = "block"; // Show the menu
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop().replace(".html", "");

  if (page) {
    fetchContent(page);
  }

  const searchButton = document.getElementById("search-button");
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      console.log("Search button clicked");
      searchHeadline();
    });
  }
});

async function fetchContent(category) {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, category), orderBy("timestamp", "desc"))
    );
    const contentDiv = document.getElementById(`${category}Content`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      addContent(data.text, data.imageUrl, contentDiv);
    });
  } catch (error) {
    console.error("Error fetching content:", error);
  }
}

function addContent(text, imageUrl, container) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content-item");
  contentDiv.innerHTML = `
    <p>${text}</p>
    ${imageUrl ? `<img src="${imageUrl}" alt="Uploaded Image">` : ""}
  `;
  container.appendChild(contentDiv);
}

async function searchHeadline() {
  const searchInput = document.getElementById("search-input").value;
  const queryString = encodeURIComponent(searchInput);
  window.location.href = `search-results.html?query=${queryString}`;
}
