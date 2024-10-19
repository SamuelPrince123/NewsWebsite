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

// List of full YouTube video URLs
const videoUrls = [
  "https://www.youtube.com/watch?v=Au3QBbuyc2M",
  "https://www.youtube.com/watch?v=ad79nYk2keg",
  "https://www.youtube.com/watch?v=7fS42KwfZhw",
  "https://www.youtube.com/watch?v=yOgAbKJGrTA",
  "https://www.youtube.com/watch?v=z9SW5HlTGXA",
  "https://www.youtube.com/watch?v=tZE_fQFK8EY",
  "https://www.youtube.com/watch?v=i9xe7N_OEXs",
  "https://www.youtube.com/watch?v=F9F0HuHIjTw",
  "https://www.youtube.com/watch?v=n6lRdH1EzIo",
  "https://www.youtube.com/watch?v=ZyYqyYAKGC0",
  "https://www.youtube.com/watch?v=hZW5XA8cLuE",
  "https://www.youtube.com/watch?v=-sB12gk9ESA",
  "https://www.youtube.com/watch?v=g_1oiJqE3OI",
  "https://www.youtube.com/watch?v=UzIZW2m5CfY",
];

// Shuffle the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to get the next video URL
let currentVideoIndex = 0;

function getNextVideoUrl() {
  if (currentVideoIndex >= videoUrls.length) {
    currentVideoIndex = 0; // Reset index if it exceeds the length
    shuffleArray(videoUrls); // Reshuffle when starting over
  }
  return videoUrls[currentVideoIndex++];
}

// Function to extract the video ID from the URL
function getVideoIdFromUrl(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v");
}

// Function to embed the video
function loadAds() {
  const adsContent = document.getElementById("adsContent");
  adsContent.innerHTML = ""; // Clear previous content

  const nextVideoUrl = getNextVideoUrl();
  const videoId = getVideoIdFromUrl(nextVideoUrl);

  if (videoId) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1`; // Autoplay, mute, and JS API
    iframe.width = "300"; // Adjusted width for smaller video
    iframe.height = "170"; // Adjusted height for smaller video
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");
    videoContainer.appendChild(iframe);
    adsContent.appendChild(videoContainer);

    // Listen for the video's end event
    const player = new YT.Player(iframe, {
      events: {
        onReady: function (event) {
          event.target.playVideo();
        },
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.ENDED) {
            loadAds(); // Load the next video when the current one ends
          }
        },
      },
    });
  }
}

window.onload = function () {
  shuffleArray(videoUrls); // Shuffle once on load
  loadAds();
};
