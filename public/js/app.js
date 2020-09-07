// Chart.js
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});

// Global Variables
let lat;
let long;
let weatherUrl;
let hourlyUrl;
let dailyUrl;
var dailyForcast;
var hourlyForcast;
let pastLogs;
var data1;
var data2;
var data3;
const key = "5f6df12f283bc1a30cd52357ca119ed4";
let currentJournal = [];


document.addEventListener('load', weatherGetter()); // when the page loads, run weatherGetter.

/* Function called by event listener */
function weatherGetter(){
    // Getting the user geolocation.
    if('geolocation' in navigator) { 
        console.log('geolocation is available');
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            // Personal API Key for OpenWeatherMap API
            weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely}&appid=${key}`;

            let [day, month, date, year, time] = (Date()).split(" ");
            let [hour, minute, second] = (time).split(":");
            let dateTime = `${month} ${date} ${year} - ${hour}:${minute}`;
            console.log(dateTime);
            
            // Calling function, catching errors.
            getWeather(dateTime).catch(error => {
                console.log('error!');
                console.error(error);
            });

            getJournal('/all')
            .catch(error => {
                console.log('promise error');
                console.error(error);
            })
        })
    } else {
        console.log('geolocation is not avaliable');
    }
};

// Event listener to add function to existing HTML DOM element

/* Function to GET Web API Data*/
async function getWeather(dateTime) {
    const responseWeather = await fetch(weatherUrl);
    data1 = await responseWeather.json();
    console.log(data1);
    dailyForcast = data1.current.weather[0].description;
    percipitation = `${data1.hourly[0].pop*100}%`;
    let temperature = `${Math.round(((data1.current.temp-273.15)*1.8)+32)}°F`;
    let postInfo = [dateTime, dailyForcast, percipitation, temperature];
    postJournal('/post', postInfo);
    weatherIcon(data1);
    tempIcon(temperature)
};

/* Function to POST Project Data */
async function postJournal(url='', data={}) {
    console.log(data,'post journal');
    const optionPost = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch(url, optionPost); 
    const journalPost = await response.json(); 
    console.log(journalPost);
};

/* Function to GET Project Data */
async function getJournal(url){
    const response = await fetch(url);
    const journal = await response.json();
    console.log(journal);
    currentJournal.push(journal);
};

    // Making the picture match the weather object
let weatherIcon = () => {
    let icon = document.getElementById("weather");
    let advice = document.getElementById("advice");
if (data1.current.weather[0].main == 'Clouds'){
    if (data1.current.weather[0].description == 'few clouds' || data1.current.weather[0].description == 'scattered clouds'){
        icon.src = "/pics/cloudy.svg";
        advice.textContent = "No need for Shades";
    }else{
        icon.src = "/pics/overcast.svg";
        advice.textContent = "It's a bit Dreary";
    }
}else if (data1.current.weather[0].main == 'Clear'){
    icon.src = "/pics/sunny.svg";
    advice.textContent = "Bring some Shades";
}else if (data1.current.weather[0].main == 'Snow'){
    icon.src = "/pics/snowing.svg";
    advice.textContent = "Wear a Coat";
}else if (data1.current.weather[0].main == 'Thunderstorm'){
    icon.src = "/pics/storming.svg";
    advice.textContent = "Stay Inside Today";
}else if (data1.current.weather[0].main == 'Drizzle' || data1.current.weather[0].main == 'Rain') {
    icon.src = "/pics/raining.svg";
    advice.textContent = "Bring an Umbrella";
} else {
    icon.src = "/pics/foggy.svg";
    advice.textContent = "Visibility Low Be Careful";
}}

tempIcon = (temp) => {
    tempPlacement = document.getElementById("temp");
    tempPlacement.textContent = temp;
}

let tabClick = document.querySelectorAll(".tab");
let main = document.querySelector("#main");
document.addEventListener('click', function(ev){
    if (ev.target.classList.contains("tab")){
        tabClick.forEach((item,index)=>{
            tabClick[index].classList.remove('active');
        });
        ev.target.classList.add('active');
        console.log(ev.target.children[0]);
        console.log(main.children.length);
        for (i=0; i < main.children.length; i++){
            main.children[i].classList.add('hidden');
        }
        if(ev.target.children[0].textContent == 'hourly') {
            document.querySelector('.hourly').classList.remove('hidden');
        }else if(ev.target.children[0].textContent == 'daily') {
            document.querySelector('.daily').classList.remove('hidden');
        }else if(ev.target.children[0].textContent == 'journal') {
            document.querySelector('.journal').classList.remove('hidden');
        }else {
            console.log('tab error')
        };
    }
});