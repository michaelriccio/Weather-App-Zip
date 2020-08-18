// Global Variables
let lat;
let long;
let weatherUrl;
let hourlyUrl;
let dailyUrl;
let dailyForcast;
let hourlyForcast;
let pastLogs;
let data1;
let data2;
let data3;
const key = "5f6df12f283bc1a30cd52357ca119ed4";

let optionPost = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data1)
};

let optionGet = {
        method: 'POST',
        headers: {'Content-Type': 'applicaiton/json'},
        body: JSON.stringify(dataHolder)
};

/* Function to GET Web API Data*/
async function getWeather() {
    const responseWeather = await fetch(weatherUrl);
    data1 = await responseWeather.json();
    const responseHourly = await fetch(hourlyUrl);
    data2 = await responseHourly.json();
    const responseDaily = await fetch(dailyUrl);
    data3 = await responseDaily.json();
    console.log(data1);
    console.log(data2);
    console.log(data3);
};

/* Function to GET Project Data */
/* Function to POST Project Data */
async function postJournal(jorn) {
    let sent = fetch('/post', optionsPost);
    
};

async function getJournal(){
    let receive = fetch('/all', optionGet)

}

document.addEventListener('load', weatherGetter());

/* Function called by event listener */
function weatherGetter(){
    // Getting the user geolocation.
    if('geolocation' in navigator) {
        console.log('geolocation is available');
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            // Personal API Key for OpenWeatherMap API
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&appid=${key}`;
            dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=16&appid=${key}`;


            // Calling function, catching errors.
            getWeather().catch(error => {
                console.log('error!');
                console.error(error);
            });
        })
    } else {
        console.log('geolocation is not avaliable');
    }
};


// Event listener to add function to existing HTML DOM element


