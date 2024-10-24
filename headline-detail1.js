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
  const loadingIndicator = document.getElementById("loadingIndicator");

  // Show the loading indicator
  loadingIndicator.style.display = "flex";

  // Fetch data (for example purposes)
  fetchData().then(() => {
    // Hide the loading indicator when data is loaded
    loadingIndicator.style.display = "none";
  });
});

async function fetchData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // Get the document ID from the URL

  if (id) {
    await fetchNewsDetail(id); // Fetch the specific news detail
  }
}

async function fetchNewsDetail(id) {
  try {
    const collections = [
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
    ];

    for (const collection of collections) {
      const docRef = doc(firestore, collection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        displayNewsDetail(data);
        return; // Exit after displaying the news detail
      }
    }
    console.error("No such document in any collection!");
  } catch (error) {
    console.error("Error fetching news detail:", error);
  }
}

function displayNewsDetail(data) {
  const body = document.body;

  // Create elements to display the news details
  const title = document.createElement("h2");
  title.innerText = data.title;
  body.appendChild(title);

  const headline = document.createElement("h3");
  headline.innerText = data.headline;
  body.appendChild(headline);

  const date = document.createElement("p");
  date.innerText = `Date: ${data.date}`;
  body.appendChild(date);

  if (data.imageUrl) {
    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.title;
    body.appendChild(img);
  }

  function createParagraphs(text) {
    const sentences = text.split(".");
    const paragraphs = [];
    let currentParagraph = "";

    sentences.forEach((sentence) => {
      if (sentence.trim().length > 0) {
        const sentenceWithDot = sentence.trim() + ". ";
        if (currentParagraph.length + sentenceWithDot.length <= 400) {
          currentParagraph += sentenceWithDot;
        } else {
          if (currentParagraph) {
            paragraphs.push(currentParagraph.trim());
          }
          currentParagraph = sentenceWithDot;
        }
      }
    });

    if (currentParagraph) {
      paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
  }

  const fullText = createParagraphs(data.text);

  fullText.forEach((paragraph) => {
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = paragraph;
    paragraphElement.classList.add("news-paragraph");
    body.appendChild(paragraphElement);
  });

  const separator = document.createElement("hr");
  separator.classList.add("news-separator");
  body.appendChild(separator);
}

const style = document.createElement("style");
style.textContent = `
  .news-paragraph {
    font-size: 16px; 
    line-height: 1.6; 
    padding: 10px; 
    border-radius: 5px; 
    color: #222; 
    max-width: 800px; 
    margin: 0 auto; 
  }

  h2, h3 {
    color: #222; 
    margin: 10px 0;
    text-align: center; 
  }
    img {
    max-width:750px;
    height:auto;
    }

  p {
    color: #555; 
    font-size: 14px; 
    margin: 5px 0;
    text-align: center; 
  }

  .news-separator {
    margin: 20px 0; 
    border: 0; 
    height: 1px; 
    background: #ccc; 
  }

  @media (max-width: 600px) {
    .news-paragraph {
      font-size: 14px; 
      padding: 8px; 
    }

    img {
    max-width:250px;
    height:auto;
    }
    
    h2, h3 {
      font-size: 18px; 
    }

    p {
      font-size: 12px; 
    }

    .news-separator {
      margin: 15px 0; 
    }
  }
`;
document.head.appendChild(style);
