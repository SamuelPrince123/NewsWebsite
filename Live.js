// Function to create clickable link for channel URLs
function createChannelLink(url, title, imageUrl) {
  const container = document.createElement("div");
  container.classList.add("video-container"); // Use the same class for styling
  container.style.cursor = "pointer"; // Change cursor to pointer
  container.onclick = () => window.open(url, "_blank"); // Open link in new tab

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank"; // Open in a new tab
  link.innerText = title;
  link.classList.add("title"); // Use title class for styling

  container.appendChild(img);
  container.appendChild(link);
  return container;
}

const videoData = [
  {
    url: "https://www.youtube.com/@CNN", // CNN Channel URL
    title: "CNN",
    imageUrl: "./NewsImage/Cnn.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@bbsbhutan", // CNN Channel URL
    title: "Bhutan Broadcasting Service",
    imageUrl: "./NewsImage/bbs.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@CCTVVideoNewsAgency", // CNN Channel URL
    title: "CCTV",
    imageUrl: "./NewsImage/cctv.png", // Local image path
  },
  {
    url: "https://www.youtube.com/@ABCNews", // CNN Channel URL
    title: "ABC News",
    imageUrl: "./NewsImage/abc.png", // Local image path
  },
  {
    url: "https://www.youtube.com/@BBCNews", // CNN Channel URL
    title: "BBC News",
    imageUrl: "./NewsImage/bbc.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@ArirangCoKrArirangNEWS", // CNN Channel URL
    title: "Arirang News",
    imageUrl: "./NewsImage/arirang.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@channelnewsasia", // CNN Channel URL
    title: "CNA",
    imageUrl: "./NewsImage/cna.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@aljazeeraenglish", // CNN Channel URL
    title: "Al Jazeera English",
    imageUrl: "./NewsImage/aljazeera.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@FoxNews", // CNN Channel URL
    title: "Fox News",
    imageUrl: "./NewsImage/foxnews.png", // Local image path
  },
  {
    url: "https://www.youtube.com/@msnbc", // CNN Channel URL
    title: "MSNBC",
    imageUrl: "./NewsImage/msnbc.png", // Local image path
  },
  {
    url: "https://www.youtube.com/@SkyNews", // CNN Channel URL
    title: "Sky News",
    imageUrl: "./NewsImage/skynews.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@Reuters", // CNN Channel URL
    title: "Reuters",
    imageUrl: "./NewsImage/reuters.png", // Local image path
  },
  {
    url: "https://www.youtube.com/@markets", // CNN Channel URL
    title: "Bloomberg Television",
    imageUrl: "./NewsImage/bloombergnews.jpg", // Local image path
  },
  {
    url: "https://www.youtube.com/@NDTV", // CNN Channel URL
    title: "NDTV",
    imageUrl: "./NewsImage/ndtv.png", // Local image path
  },

  {
    url: "https://www.youtube.com/@NBCNews", // CNN Channel URL
    title: "NBC News",
    imageUrl: "./NewsImage/nbc.png", // Local image path
  },
];

const videoContainer = document.getElementById("videos");

videoData.forEach((video) => {
  const content = createChannelLink(video.url, video.title, video.imageUrl);
  videoContainer.appendChild(content);
});
