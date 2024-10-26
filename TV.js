const videoData = {
  comedy: [
    {
      title: "Channel 1",
      url: "https://www.youtube.com/watch?v=ctyzvJLoid0",
    },
    {
      title: "Channel 2",
      url: "https://www.youtube.com/watch?v=37-X4eYGOFY",
    },
    {
      title: "Channel 3",
      url: "https://www.youtube.com/watch?v=uTMc48XmjrA",
      image: "https://img.youtube.com/vi/uTMc48XmjrA/0.jpg",
    },
    {
      title: "Channel 4",
      url: "https://www.youtube.com/@shemaroobollywoodcomedy",
      image:
        "https://yt3.googleusercontent.com/kFIm8K_VJqJKFBt8ePn-wVIvG0ZYeIQxw7Ok9eEkYjOSsyebG7wStrOQOcv4GDtbd6Y4zZa9oo0=s160-c-k-c0x00ffffff-no-rj", // Thumbnail image
    },
    {
      title: "Channel 5",
      url: "https://www.youtube.com/watch?v=XRyFg1JKZGM",
    },
    {
      title: "Channel 6",
      url: "https://www.ustvnow.com/channel/live/the_red_green_channel",
      image: "./NewsImage/redgreen.png",
    },
    {
      title: "comedy Time(UAS)",
      url: "http://www.freeintertv.com/view/id-1756/1-Entertainment-2-1?chname=comedy&findch=1",
      image: "./NewsImage/comedyusa.jpg",
    },
    {
      title: "TBS(USA)",
      url: "http://www.freeintertv.com/view/id-2685/1-1-2-1?chname=tbs&findch=1",
      image: "./NewsImage/tbs.jpg",
    },
  ],
  cartoon: [
    {
      title: "Tom and Jerry",
      url: "https://www.youtube.com/watch?v=IJbbpAhjboI",
    },
    {
      title: "Scooby Doo",
      url: "https://www.youtube.com/watch?v=nhOelNSvWN4",
    },
    {
      title: "BME Cartoon (UK).",
      url: "http://www.freeintertv.com/view/id-1854/1-1-2-1?chname=cartoon&findch=1",
      image: "./NewsImage/british cartoon.jpg",
    },
    {
      title: "Cartoon Network(USA)",
      url: "http://www.freeintertv.com/view/id-2958/1-1-2-1?chname=cartoon&findch=1",
      image: "./NewsImage/cartoon Network.png",
    },

    {
      title: "Marvel's Avengers",
      url: "https://www.youtube.com/watch?v=9Szop3nS4wg",
    },
    {
      title: "Jungle Beat",
      url: "https://www.youtube.com/watch?v=6el-GMyskPI",
    },
    {
      title: "Baby Looney",
      url: "https://www.youtube.com/watch?v=p5l3ZS1jVUE",
    },

    {
      title: "Disney(USA)",
      url: "http://www.freeintertv.com/view/id-2292/1-1-2-1?chname=disney&findch=1",
      image: "./NewsImage/disney.jpg",
    },
    {
      title: "Disney Channel +1(UK)",
      url: "http://www.freeintertv.com/view/id-224/1-1-2-1?chname=disney&findch=1",
      image: "./NewsImage/disneyC.png",
    },
    {
      title: "Disney Channel Mobile(USA)",
      url: "http://www.freeintertv.com/view/id-2674/1-1-2-1?chname=disney&findch=1",
      image: "./NewsImage/disneyCh.jpg",
    },
    {
      title: "Sesame Street",
      url: "https://www.youtube.com/watch?v=2UNZ82_Amy0",
    },
  ],
  information: [
    {
      title: "National Geographic",
      url: "https://www.youtube.com/watch?v=CvdS4biecPk",
    },
    {
      title: "History Channel(USA)",
      url: "http://www.freeintertv.com/view/id-3301/1-1-0-1",
      image: "./NewsImage/history.jpg",
    },

    {
      title: "Nat Geo Wild",
      url: "https://www.youtube.com/watch?v=BJ3Yv572V1A",
    },
    {
      title: "Channel 3",
      url: "https://www.youtube.com/@DiscoverychannelInd",
      image:
        "https://yt3.googleusercontent.com/drkHGsfyzC-I3sqZTES2MaL52jwYvHPJHD2W1DidmpcLSS-cpEMPLjlSVwCKpXT_P01tt3jVNw=s160-c-k-c0x00ffffff-no-rj",
    },
    {
      title: "Discovery HD(USA)",
      url: "http://www.freeintertv.com/view/id-3076",
      image: "./NewsImage/discovery.jpg",
    },
    {
      title: "Global Fashion Channel",
      url: "https://www.ustvnow.com/channel/live/global_fashion_channel",
      image: "./NewsImage/globalFashion.jpg",
    },
  ],
  sports: [
    {
      title: "Fox Scocer(USA)",
      url: "http://www.freeintertv.com/view/id-3315/1-1-0-1",
      image: "./NewsImage/foxsoccer.jpg",
    },
    {
      title: "Bein Sports(USA)",
      url: "http://www.freeintertv.com/view/id-2074/1-1-2-1?chname=sports&findch=1",
      image: "./NewsImage/beinsports.jpg",
    },
    {
      title: "Star Sports (India)",
      url: "http://www.freeintertv.com/view/id-1800/1-1-2-1?chname=sports&findch=1",
      image: "./NewsImage/starSports.jpg",
    },
    {
      title: "Amysports(Mexico)",
      url: "http://www.freeintertv.com/view/id-2163/1-1-2-1?chname=sports&findch=1",
      image: "./NewsImage/amysports.jpg",
    },
    {
      title: "CBS Sports (Canada)",
      url: "http://www.freeintertv.com/view/id-310/1-1-2-1?chname=sports&findch=1",
      image: "./NewsImage/cbs sports.jpg",
    },
    {
      title: "Universal Sports",
      url: "http://www.freeintertv.com/view/id-3116/1-1-2-1?chname=sports&findch=1",
      image: "./NewsImage/universalSports.jpg",
    },
  ],
  movies: [
    {
      title: "HBO(USA)",
      url: "http://www.freeintertv.com/view/id-1849",
      image: "./NewsImage/hbo.png",
    },
    {
      title: "TNT HD (Brazil)",
      url: "http://www.freeintertv.com/view/id-3041/1-1-2-1?chname=tnt&findch=1",
      image: "./NewsImage/tnt.jpg",
    },
    {
      title: "9xM",
      url: "http://www.freeintertv.com/view/id-3357/1-1-0-1",
      image: "./NewsImage/9xm.png",
    },
    {
      title: "Bollywood for you",
      url: "http://www.freeintertv.com/view/id-2318/1-1-2-1?chname=bollywood&findch=1",
      image: "./NewsImage/bollywood.jpg",
    },
    {
      title: "The Vintage Movie Channel",
      url: "http://www.freeintertv.com/view/id-3353/1-1-0-1",
      image: "./NewsImage/vintage.jpg",
    },
    {
      title: "Movies for you(USA)",
      url: "http://www.freeintertv.com/view/id-3344/1-1-0-1",
      image: "./NewsImage/movies.jpg",
    },
    {
      title: "New Movies(USA)",
      url: "http://www.freeintertv.com/view/id-3343/1-1-0-1",
      image: "./NewsImage/new_movies.jpg",
    },
    {
      title: "Show Time(USA)",
      url: "http://www.freeintertv.com/view/id-3302/1-1-0-1",
      image: "./NewsImage/shottime.png",
    },

    {
      title: "Disney Movies Channel(USA)",
      url: "http://www.freeintertv.com/view/id-3028/1-1-2-1?chname=disney&findch=1",
      image: "./NewsImage/disneyM.jpg",
    },
    {
      title: "ABC Classic Flims(USA)",
      url: "http://www.freeintertv.com/view/id-2211/1-1-2-1?chname=abc&findch=1",
      image: "./NewsImage/abcF.jpg",
    },
  ],
  music: [
    {
      title: "TCN(USA)",
      url: "http://www.freeintertv.com/view/id-3334/1-1-0-1",
      image: "./NewsImage/tcn.jpg",
    },
    {
      title: "MTV (Brazil)",
      url: "http://www.freeintertv.com/view/id-2783/1-1-2-1?chname=mtv&findch=1",
      image: "./NewsImage/mtv.jpg",
    },
    {
      title: "Spirit TV",
      url: "https://myspirit.tv/",
      image: "./NewsImage/spirit TV.jpg",
    },
    {
      title: "The Country Network",
      url: "https://watch.tcncountry.net/m/3v1Qptug/tcn-live?r=0XOn5zn0&play=1",
      image: "./NewsImage/tcnet.jpg",
    },
    {
      title: "California Music Channel",
      url: "https://cmctv.com/cmc/",
      image: "./NewsImage/cmc.jpg",
    },
    {
      title: "B4U Music (India)",
      url: "http://www.freeintertv.com/view/id-1839/1-1-2-1?chname=music&findch=1",
      image: "./NewsImage/b4u.gif",
    },
    {
      title: "Ditty TV",
      url: "https://dittytv.com/watch/",
      image: "./NewsImage/dittytv.jpg",
    },
    {
      title: "Indi Music TV",
      url: "https://indimusic.tv/",
      image: "./NewsImage/indi music.png",
    },
    {
      title: "Best Music TV (USA)",
      url: "http://www.freeintertv.com/view/id-1761/1-1-2-1?chname=music&findch=1",
      image: "./NewsImage/best.gif",
    },
  ],
};

// Function to convert regular YouTube URL to embed URL
function convertToEmbedUrl(url) {
  const urlObj = new URL(url);
  if (urlObj.hostname.includes("youtube.com")) {
    const videoId = urlObj.searchParams.get("v");
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
      : null; // Autoplay and mute for embedded videos
  }
  return url; // Return original URL if it's not a YouTube link
}

// Function to load videos based on category
function loadVideos(category) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ""; // Clear previous videos

  if (videoData[category]) {
    videoData[category].forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");

      // Check if image exists
      if (video.image) {
        // Create image element
        const videoImage = document.createElement("img");
        videoImage.src = video.image;
        videoImage.alt = video.title;
        videoImage.classList.add("video-thumbnail");

        // Add click event to redirect to the YouTube video
        videoImage.onclick = () => {
          window.location.href = video.url; // Redirect to YouTube video
        };
        videoCard.appendChild(videoImage);
      } else {
        // If no image is provided, embed the video
        const embedUrl = convertToEmbedUrl(video.url); // Convert to embed URL
        const videoFrame = `<iframe width="100%" height="200" src="${embedUrl}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        videoCard.innerHTML = videoFrame;
      }

      // Create title element
      const videoTitle = document.createElement("h3");
      videoTitle.innerText = video.title;

      // Add click event to redirect to the YouTube video
      videoTitle.onclick = () => {
        window.location.href = video.url; // Redirect to YouTube video
      };

      // Append title to video card
      videoCard.appendChild(videoTitle);
      videoContainer.appendChild(videoCard);
    });
  } else {
    videoContainer.innerHTML = `<p>No videos available for this category.</p>`;
  }
}

// Load comedy videos by default
loadVideos("comedy");

// Add event listeners to the category links to load videos dynamically
document.querySelectorAll(".category").forEach((categoryLink) => {
  categoryLink.addEventListener("click", (e) => {
    e.preventDefault();
    const category = e.target.innerText.toLowerCase(); // Get the category name
    loadVideos(category);
  });
});
