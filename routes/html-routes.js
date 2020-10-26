// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const axios = require("axios");
const date = require("date-and-time");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { parse } = require("path");

let hikes = [];
let lat;
let long;

module.exports = function(app) {
  app.get("/", (req, res) => {
    hikes = [];
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/search");
    } else {
      res.render("signup");
    }
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/search");
    } else {
      res.render("login");
    }
  });

  app.get("/search", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    res.render("search", { hikes: hikes });
  });

  app.post("/search", isAuthenticated, (req, res) => {
    db.User.findAll({
      where: {
        id: req.user.id
      }
    })
      .then(results => {
        const searchParams = results[0].dataValues;
        const minLength = searchParams.minLength;
        const maxLength = searchParams.maxLength;
        const maxAscent = searchParams.maxAscent;
        hikingApiCall(
          req.body.searchArea,
          minLength,
          maxLength,
          maxAscent,
          search => {
            res.redirect(search);
          }
        );
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  });

  app.get("/:id/weather", isAuthenticated, (req, res) => {
    for (let i = 0; i < hikes.length; i++) {
      if (hikes[i].id === parseInt(req.params.id)) {
        const trailName = hikes[i].name;
        weatherApiCall(hikes[i].location, trailName, data => {
          res.render("weather", data);
        });
      }
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.User.findAll({
      where: {
        id: req.user.id
      }
    })
      .then(results => {
        const userData = results[0].dataValues;
        const currentUser = {
          email: userData.email,
          minLength: userData.minLength,
          maxLength: userData.maxLength,
          maxAscent: userData.maxAscent
        };
        res.render("members", currentUser);
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  });

  app.get("/edit", isAuthenticated, (req, res) => {
    res.render("edit");
  });

  function hikingApiCall(
    searchLocation,
    minLength,
    maxLength,
    maxAscent,
    callback
  ) {
    const mapKey = process.env.MAP_KEY;
    const loc = searchLocation;
    const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapKey}&location=${loc}`;
    const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
    const hikeBaseURL =
      "https://www.hikingproject.com/data/get-trails?" + hikeApiKey;
    var queryTerm = "";

    axios
      .get(queryUrl)
      .then(response => {
        const coords = response.data.results[0].locations[0].latLng;
        const lat = coords.lat;
        const long = coords.lng;

        const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
        const hikeBaseUrl = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&minLength=${minLength}&maxDistance=25&sort=distance&maxResults=35&key=${hikeApiKey}`;

        axios
          .get(hikeBaseUrl)
          .then(response => {
            hikes = [];
            const trailList = response.data.trails;
            trailList.forEach(element => {
              if (element.length <= maxLength && element.ascent <= maxAscent) {
                hikes.push(element);
              }
            });
            callback("/search");
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }

  function weatherApiCall(searchLocation, trail, callback) {
    const loc = searchLocation;
    const mapKey = process.env.MAP_KEY;
    const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapKey}&location=${loc}`;
    axios
      .get(queryUrl)
      .then(response => {
        const coords = response.data.results[0].locations[0].latLng;
        const lat = coords.lat;
        const long = coords.lng;
        const weatherKey = process.env.WEATHER_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=imperial&appid=${weatherKey}`;

        axios
          .get(weatherUrl)
          .then(response => {
            const weatherForcasts = [];
            const dates = [];
            const currentData = response.data.current;
            const sevenDayArray = response.data.daily;

            for (let i = 1; i < sevenDayArray.length; i++) {
              let variableDate = new Date();
              variableDate.setDate(variableDate.getDate() + i);
              variableDate = date.format(variableDate, "M/D");
              //dates.push({ date: variableDate });
              weatherForcasts.push({
                date: variableDate,
                high: sevenDayArray[i].temp.max,
                low: sevenDayArray[i].temp.min,
                conditions: sevenDayArray[i].weather[0].description
              });
            }
            const weatherObject = {
              name: trail,
              current: {
                temperature: currentData.temp,
                humidity: currentData.humidity,
                uvi: currentData.uvi,
                condition: currentData.weather[0].description
              },
              weather: weatherForcasts
            };
            //console.log(weatherObject);
            callback(weatherObject);
            //res.render("weather");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }
};
