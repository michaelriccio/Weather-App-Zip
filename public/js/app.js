// Global Variables
const key = "5f6df12f283bc1a30cd52357ca119ed4";
let data1;
let button = document.querySelector("#generate");
let form = document.querySelector('#form');
let main = document.querySelector("#main");
let form2 = document.querySelector('#form2');
let postInfo = [];
let [day, month, date, year, time] = (Date()).split(" ");
let date1 = `${month} ${date} ${year}`;
let temperature;

button.addEventListener('click', function weatherGetter(event){
    // Personal API Key for OpenWeatherMap API
    let zip = document.querySelector('#zip').value;
    console.log(zip);
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${key}`;
    
    // Calling function, catching errors.
    fetchWeather(date1, weatherUrl).catch(error => {
        console.log('error!');
        console.error(error);
        if(!alert('Must enter a valid zip code!')){window.location.reload();}
    });
    
    getJournal('/all')
    .catch(error => {
        console.log('promise error');
        console.error(error);
    });
});

// Event listener to add function to existing HTML DOM element

/* Function to GET Web API Data*/
async function fetchWeather(date, weatherUrl) {
    const responseWeather = await fetch(weatherUrl);
    data1 = await responseWeather.json();
    temperature = `${Math.round(data1.main.temp)}°F`;
    weatherIcon();
    tempIcon(temperature);
    transition(tempIcon);
};

/* Function to POST Project Data */
async function postJournal(url='', data={}) {
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
    console.log({journal});
    makeTable(journal);
};

    // Making the picture match the weather object
let weatherIcon = () => {
    let icon = document.getElementById("weather");
    if (data1.weather[0].main == 'Clouds'){
        if (data1.weather[0].description == 'few clouds' || data1.weather[0].description == 'scattered clouds'){
            icon.src = "/pics/cloudy.svg";
        }else{
            icon.src = "/pics/overcast.svg";
        }
    }else if (data1.weather[0].main == 'Clear'){
        icon.src = "/pics/sunny.svg";
    }else if (data1.weather[0].main == 'Snow'){
        icon.src = "/pics/snowing.svg";
    }else if (data1.weather[0].main == 'Thunderstorm'){
        icon.src = "/pics/storming.svg";
    }else if (data1.weather[0].main == 'Drizzle' || data1.weather[0].main == 'Rain') {
        icon.src = "/pics/raining.svg";
    } else {
        icon.src = "/pics/foggy.svg";
    }
}

// Creating temperature on top of icon
tempIcon = (temp) => {
    tempPlacement = document.getElementById("temp");
    tempPlacement.textContent = temp;
    return "good";
}

// Making things disappear on click
console.log(main.children.length);
async function transition (good) {
    for(let i=0;i < main.children.length; i++) {
        main.children[i].classList.toggle('appear');
        // main.children[i].style.cssText = 'display: absolute';
    }
}

// Making table and appending
function makeTable(dataList) {
    let entryHolder = document.querySelector('#entryholder');
    let size = Object.keys(dataList).length;
    if(size == 0) {
        let noContent = document.createElement('h1');
        noContent.textContent = 'There are no previous entries, try refreshing your page.';
        noContent.setAttribute('class', 'row-here')
        let journal = document.querySelector('.journal');
        journal.appendChild(noContent);
    }else {
        for (let i=0; i < size; i++) {
            for (let h=0; h < 3; h++) {
                let makeDiv = document.createElement('div');
                makeDiv.textContent = dataList[`key${i}`][h];
                makeDiv.setAttribute('class', 'fitting');
                entryHolder.children[h].appendChild(makeDiv);
            }
        }
    }
}

button2 = document.querySelector('.button2');
let feelingsHolder = document.querySelector('.feelings-holder');

button2.addEventListener('click', function sendingIt(event){
    let content = feelingsHolder.value;
    postInfo.push(date1, temperature, content);
    postJournal('/post', postInfo);
});
