// Global Variables
const key = "5f6df12f283bc1a30cd52357ca119ed4";
let data1;
let button = document.querySelector("#generate");

button.addEventListener('click', weatherGetter()); // button is clicked, run weatherGetter.

/* Function called by event listener */
function weatherGetter(){
    // Personal API Key for OpenWeatherMap API
    let zip = document.querySelector('#zip').value;// get zipcode from form
    console.log(zip);
    let weatherUrl = `api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`;
    let [day, month, date, year, time] = (Date()).split(" ");
    let date1 = `${month} ${date} ${year}`;
    
    // Calling function, catching errors.
    getWeather(date1, weatherUrl).catch(error => {
        console.log('error!');
        console.error(error);
    });

    getJournal('/all')
    .catch(error => {
        console.log('promise error');
        console.error(error);
    });
};

// Event listener to add function to existing HTML DOM element

/* Function to GET Web API Data*/
async function getWeather(date, weatherUrl) {
    const responseWeather = await fetch(weatherUrl);
    data1 = await responseWeather.json();
    let temperature = `${Math.round(data1.current.temp)}°F`;
    let postInfo = [date, temperature];
    postJournal('/post', postInfo);
    weatherIcon();
    tempIcon(temperature);
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
    if (data1.current.weather[0].main == 'Clouds'){
        if (data1.current.weather[0].description == 'few clouds' || data1.current.weather[0].description == 'scattered clouds'){
            icon.src = "/pics/cloudy.svg";
        }else{
            icon.src = "/pics/overcast.svg";
        }
    }else if (data1.current.weather[0].main == 'Clear'){
        icon.src = "/pics/sunny.svg";
    }else if (data1.current.weather[0].main == 'Snow'){
        icon.src = "/pics/snowing.svg";
    }else if (data1.current.weather[0].main == 'Thunderstorm'){
        icon.src = "/pics/storming.svg";
    }else if (data1.current.weather[0].main == 'Drizzle' || data1.current.weather[0].main == 'Rain') {
        icon.src = "/pics/raining.svg";
    } else {
        icon.src = "/pics/foggy.svg";
    }
}

// Creating temperature on top of icon
tempIcon = (temp) => {
    tempPlacement = document.getElementById("temp");
    tempPlacement.textContent = temp;
}

// Making things disappear on click
let mainChild = document.querySelectorAll(".main-child");
let main = document.querySelector("#main");
document.addEventListener('click', function(ev){
    if (ev.target.classList.contains("tab")){
        mainChild.forEach((item,index)=>{
            item.classList.toggle('hidden');
        });
        for(let i=0; i < main.children.length; i++) {
            main.children[i].style.cssText="z-index:1;";
        }
        if(ev.target.textContent == 'hourly') {
            document.querySelector('.hourly').classList.toggle('hidden');
            document.querySelector('.hourly').style.cssText = "z-index: 99";
        }else if(ev.target.textContent == 'daily') {
            document.querySelector('.daily').classList.toggle('hidden');
            document.querySelector('.daily').style.cssText = "z-index: 99";
        }else if(ev.target.textContent == 'journal') {
            document.querySelector('.journal').classList.toggle('hidden');
            document.querySelector('.journal').style.cssText = "z-index: 99";
        }else {
            console.log('tab error')
        };
    }
});

// Making table and appending
function makeTable(dataList) {
    let pastLog = document.querySelector('.pastLog');
    let size = Object.keys(dataList).length;
    if(size == 0) {
        let noContent = document.createElement('h1');
        noContent.textContent = 'There are no previous entries, try refreshing your page.';
        let journalClass = document.querySelector('.journal');
        console.log(journalClass);
        journalClass.appendChild(noContent);
    }else {
        for (let i=0; i < size; i++) {
            let makeRow = document.createElement('tr');
            pastLog.appendChild(makeRow);
            for (let h=0; h < 3; h++) {
                let makeColumn = document.createElement('td');
                makeColumn.textContent = dataList[`key${i}`][h];
                makeColumn.setAttribute('class', 'row-here');
                pastLog.children[i].appendChild(makeColumn);
            }
        }
    }
}