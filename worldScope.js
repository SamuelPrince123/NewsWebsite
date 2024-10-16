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

// Firebase configuration for your project
const firebaseConfig = {
  apiKey: "AIzaSyDmksj9rPjyZapz0wjT7llNYe8vT6jGbgY",
  authDomain: "newsinfo-2dcb2.firebaseapp.com",
  projectId: "newsinfo-2dcb2",
  storageBucket: "newsinfo-2dcb2.appspot.com",
  messagingSenderId: "641121104333",
  appId: "1:641121104333:web:b686d0844427008b47d484",
  measurementId: "G-N814HMYX62",
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

// Wait for the document to load
document.addEventListener("DOMContentLoaded", () => {
  fetchLatestWorldsFutureScope();
});

// Fetch only the latest world's future scope data from Firestore
async function fetchLatestWorldsFutureScope() {
  const contentDiv = document.getElementById("worldScopeContent");

  if (!contentDiv) {
    console.error("Container with ID 'worldScopeContent' not found.");
    return;
  }

  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "worlds_future_scope"), // Collection name
        orderBy("timestamp", "desc"), // Order by timestamp in descending order (latest first)
        limit(1) // Limit to only 1 latest scope item
      )
    );

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      addWorldsFutureScope(data, contentDiv, doc.id);
    });
  } catch (error) {
    console.error("Error fetching latest world's future scope:", error);
  }
}

// Function to add the latest future scope to the page
function addWorldsFutureScope(data, container, id) {
  const scopeDiv = document.createElement("div");
  scopeDiv.classList.add("scope-item");

  // Calculate 5% of the text for preview
  const previewTextLength = Math.floor(data.text.length * 0.05);
  const previewText = data.text.substring(0, previewTextLength);

  scopeDiv.innerHTML = `
    <h3>${data.title}</h3>
    <img src="${data.imageUrl}" alt="Future Scope Image" class="scope-image">
    <p>${previewText}...</p>
    <a href="headline-detail.html?id=${id}&category=worlds_future_scope" class="read-more">Read More</a>
  `;

  // Append to the container
  container.appendChild(scopeDiv);
}
