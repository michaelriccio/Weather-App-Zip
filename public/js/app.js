// Global Variables
let lat;
let long;
let weatherUrl;
let hourlyUrl;
let dailyUrl;
let dailyForcast;
let hourlyForcast;
let pastLogs;
var data1 = 'here';
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
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            // hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&appid=${key}`;
            // dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=16&appid=${key}`;
            
            /* Function to GET Web API Data*/
            async function getWeather() {
                const responseWeather = await fetch(weatherUrl);
                console.log(data1);
                data1 = await responseWeather.json();
                // const responseHourly = await fetch(hourlyUrl);
                // data2 = await responseHourly.json();
                // const responseDaily = await fetch(dailyUrl);
                // data3 = await responseDaily.json();
                console.log(data1);
                // console.log(data2);
                // console.log(data3);
            };
            console.log(data1);
            // Calling function, catching errors.
            getWeather().catch(error => {
                console.log('error!');
                console.error(error);
            });
            
            /* Function to POST Project Data */
            async function postJournal(url='', data={}) {
                const optionPost = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data) // stating the body will be made of the 'data' object, and that it will be a string
                };
                const response = await fetch(url, optionPost); // fetching the reqeust.body? or the response? maybe? then assigning it a veriable.
                
                const journalPost = await response.json(); // parsing journalpost as json
                console.log(journalPost);
            };
            
            postJournal('/post', data1);
            
            /* Function to GET Project Data */
            async function getJournal(url='', data={}){
                // You options for GET and POST requests
                const optionGet = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                };
                const response = await fetch(url, optionGet); //fetch request body
                console.log(response);
                const journal = await response.json(); //parse body as json
                console.log(journal);
                currentJournal.push(journal); //pushing the GET body to the currentJournal Array
            };

            getJournal('/all')
                .catch(console.log('promise error'))
                .catch(console.error);

        })
    } else {
        console.log('geolocation is not avaliable');
    }
};

// Event listener to add function to existing HTML DOM element

// Making the picture match the weather object
// if (data1.weather[0].main == 'Clouds'){
//     if (data1.weather[0].description = ('few clouds' || 'scattered clouds')
//     ){

//     }else{

//     }
// }else if (data1.weather[0].main == 'Clear'){

// }else if (data1.weather[0].main == 'Snow'){
    
// }else if (data1.weather[0].main == 'Thurnderstorms'){

// }else if (data1.weather[0].main == ('Drizzle' || 'Rain')) {

// } else {

// }