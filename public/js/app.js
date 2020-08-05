// Global Variables
let lat;
let long;
let weatherUrl;

// Getting the user geolocation.
if('geolocation' in navigator) {
    console.log('geolocation is available');
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat);
        console.log(long);
        weatherUrl = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5f6df12f283bc1a30cd52357ca119ed4`;
        console.log(weatherUrl);
    })


    
} else {
    console.log('geolocation is not avaliable');
}

// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */

getWeather().catch(error => {
    console.log('error!');
    console.error(error);
});

/* Function to GET Web API Data*/
async function getWeather() {
    const response = await fetch(weatherUrl);
    console.log(response);
    const data = await response.json();
};
/* Function to POST data */


/* Function to GET Project Data */