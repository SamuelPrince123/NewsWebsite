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
  mobileNav.style.display =
    mobileNav.style.display === "block" ? "none" : "block"; // Toggle the menu
};

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "653fba1bb14f47b787f102610241709"; // Your Free Weather API key
  const BASE_URL = "https://api.weatherapi.com/v1";

  // HTML Elements
  const bhutanSelect = document.getElementById("bhutanSelect");
  const worldSelect = document.getElementById("worldSelect");
  const bhutanWeatherContent = document.getElementById("bhutanWeatherContent");
  const worldWeatherContent = document.getElementById("worldWeatherContent");

  // List of Bhutanese dzongkhags and world countries
  const bhutanDzongkhags = [
    "Thimphu",
    "Paro",
    "Punakha",
    "Wangdue Phodrang",
    "Bumthang",
    "Samdrup Jongkhar",
    "Mongar",
    "Gasa",
  ];

  const worldCountries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  // Populate Bhutan dzongkhag dropdown
  bhutanDzongkhags.forEach((dzongkhag) => {
    const option = document.createElement("option");
    option.value = dzongkhag;
    option.textContent = dzongkhag;
    bhutanSelect.appendChild(option);
  });

  // Populate world countries dropdown
  worldCountries.sort().forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    worldSelect.appendChild(option);
  });

  // Function to fetch weather data from Free Weather API
  const fetchWeatherData = async (location) => {
    try {
      // Append "Bhutan" for Bhutanese dzongkhags
      const queryLocation = bhutanDzongkhags.includes(location)
        ? `${location}, Bhutan`
        : location;
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${queryLocation}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  // Function to display weather data
  const displayWeather = (data, container) => {
    if (!data) {
      container.innerHTML = "<p>Weather data not available.</p>";
      return;
    }

    const { location, current } = data;
    container.innerHTML = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${current.condition.text}</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${current.wind_kph} kph</p>
        <img src="${current.condition.icon}" alt="${current.condition.text}">
      `;
  };

  // Event listener for Bhutan dzongkhag selection
  bhutanSelect.addEventListener("change", async () => {
    const selectedDzongkhag = bhutanSelect.value;
    const weatherData = await fetchWeatherData(selectedDzongkhag);
    displayWeather(weatherData, bhutanWeatherContent);
  });

  // Event listener for world country selection
  worldSelect.addEventListener("change", async () => {
    const selectedCountry = worldSelect.value;
    const weatherData = await fetchWeatherData(selectedCountry);
    displayWeather(weatherData, worldWeatherContent);
  });

  // Load initial weather for Bhutan (Thimphu)
  const initialBhutanLocation = "Thimphu";
  bhutanSelect.value = initialBhutanLocation;
  fetchWeatherData(initialBhutanLocation).then((data) =>
    displayWeather(data, bhutanWeatherContent)
  );

  // Load initial weather for the first world country (Afghanistan)
  const initialWorldLocation = worldCountries[0];
  worldSelect.value = initialWorldLocation;
  fetchWeatherData(initialWorldLocation).then((data) =>
    displayWeather(data, worldWeatherContent)
  );
});
