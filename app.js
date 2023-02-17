const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    // req.body.countryName is the input from the user. countryName is the name of the input.
    const query = req.body.countryName;
    const apiKey = "32c71205ef5b7ca94f5cc95ca59f80e2&units=metric";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    // get request to the openweathermap api
    https.get(url, (response) => {
        console.log(response.statusCode);
        // response.on to receive the data
        response.on("data", (data) => {
            // the data we get back is JSON format, so we need to parse it into an actual JSON object
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temperature = weatherData.main.temp;
            console.log(temperature);
            console.log(weatherData.weather[0].description);
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write("<h1>The weather condition is currently " + weatherData.weather[0].description + ".</h1>");
            res.write("<h1>The temperature in " + query +  " is " + temperature + " degrees celcius.</h1>");
            res.write("<img src=" + imageURL + " alt='weather-icon'>");
            res.send();
            // res.send(`The temperature in Singapore is ${temperature} degrees celcius.`);

            const object = {
                name: "Yik Leong",
                degree: "Computer Science"
            };
            console.log(JSON.stringify(object));
        });
    });
});



app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});