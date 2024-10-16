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

document.addEventListener("DOMContentLoaded", () => {
  fetchAllHeadlines([
    "bhutanese_news",
    "bhutanese_jobs",
    "world_news",
    "technology",
    "crime_law",
    "crises",
    "education_and_learning",
    "finance_and_business",
    "entertainment",
    "environment_and_climate",
    "social_issues_and_movement",
    "sports",
    "wellness_and_health",
    "worlds_future_scope",
    "bhutanese_future_scope",
    "archaeology_and_history",
  ]);
});

async function fetchAllHeadlines(categories) {
  const contentDiv = document.getElementById("headlineContent");

  if (!contentDiv) {
    console.error("Container with ID 'headlineContent' not found.");
    return;
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const yesterdayString = yesterday.toISOString().split("T")[0]; // YYYY-MM-DD

  try {
    for (let category of categories) {
      const querySnapshot = await getDocs(
        query(collection(firestore, category), orderBy("timestamp", "desc"))
      );

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.headline &&
          (data.date === todayString || data.date === yesterdayString)
        ) {
          addHeadline(data.headline, contentDiv, category, doc.id);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching headlines:", error);
  }
}

function addHeadline(headline, container, category, id) {
  const headlineDiv = document.createElement("div");
  headlineDiv.classList.add("headline-item");

  // Clean up the category
  const cleanedCategory = category.replace(/\[.*?\]/g, "").trim();

  // Use distinct styles for category and headline
  headlineDiv.innerHTML = `
    <div class="category">${cleanedCategory.toUpperCase()}</div>
    <h3 class="headline">${headline}</h3>
  `;

  headlineDiv.addEventListener("click", () => {
    window.location.href = `headline-detail.html?id=${id}&category=${category}`;
  });

  container.appendChild(headlineDiv);
}
// CSS styles to make the headlines look better
const style = document.createElement("style");
style.innerHTML = `
  .headline-item {
    margin: 15px 0;
    padding: 10px;
    border-radius: 5px; /* Optional: rounded corners */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
  }

  // .headline-item:hover {
  //   background-color: #f0f0f0; /* Light background on hover */
  // }

  .category {
    font-weight: bold;
    font-size: 16px;
    color:#1b1c1c; /* Customize the color */
  }

  .headline {
    font-size: 14px; /* Increased size for the title */
    font-weight: 400; /* Semi-bold for emphasis */
    margin: 5px 0;
    color: #333; /* Customize the color */
    text-transform: capitalize; /* Capitalize the first letter of each word */
  }
`;
document.head.appendChild(style);
