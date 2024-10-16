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
  fetchBhutaneseNews();
});

async function fetchBhutaneseNews() {
  const contentDiv = document.getElementById("bhutaneseNewsContent");

  if (!contentDiv) {
    console.error("Container with ID 'bhutaneseNewsContent' not found.");
    return;
  }

  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "bhutanese_news"),
        orderBy("timestamp", "desc"),
        limit(2) // Limit to the 2 latest news items
      )
    );

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      addBhutaneseNews(data, contentDiv, doc.id);
    });
  } catch (error) {
    console.error("Error fetching Bhutanese news:", error);
  }
}

function addBhutaneseNews(data, container, id) {
  const newsDiv = document.createElement("div");
  newsDiv.classList.add("headline-item");

  const summary =
    data.text.length > 100 ? data.text.substring(0, 100) + "..." : data.text;

  newsDiv.innerHTML = `
        <h3>${data.headline}</h3>
        <p><strong>Date:</strong> ${data.date}</p>
        <img src="${data.imageUrl}" alt="News Image" class="news-image">
        <p>${summary}</p>
        <a href="headline-detail.html?id=${id}&category=bhutanese_news" class="read-more">Read More</a>
      `;

  container.appendChild(newsDiv);
}
