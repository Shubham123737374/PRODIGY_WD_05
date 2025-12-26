const apiKey = "1c0f808ac893e0e259f5e6c9061982e2"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

async function checkWeather(city) {
    if(!city) return;

    try {
        // API call karna
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // Agar city galat hai (404 Not Found)
        if(response.status == 404){
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
        } 
        else {
            var data = await response.json();

            // Screen par data dikhana
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Mausam ke hisab se icon badalna
            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163634.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
            }
            else {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            }

            weatherDiv.style.display = "block";
            errorDiv.style.display = "none";
        }
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

// Search Button par click hone par
searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

// Enter button dabane par
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(cityInput.value);
    }
});