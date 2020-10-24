// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const axios = require("axios");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
//const hikes = require("./api-routes");

let hikes = [];

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/search");
    }
    res.render("signup");
    hikes = [];
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/search");
    }
    res.render("login");
  });

  app.get("/search", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    res.render("search", { hikes: hikes });
  });

  app.post("/search", isAuthenticated, (req, res) => {
    if (!req.user) {
      res.redirect("/login");
    } else {
      db.User.findAll({
        where: {
          id: req.user.id
        }
      }).then(results => {
        const searchParams = results[0].dataValues;
        const minLength = searchParams.minLength;
        const maxLength = searchParams.maxLength;
        const maxAscent = searchParams.maxAscent;
        apiCall(
          req.body.searchArea,
          minLength,
          maxLength,
          maxAscent,
          search => {
            res.redirect(search);
          }
        );
      });
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.User.findAll({
      where: {
        id: req.user.id
      }
    }).then(results => {
      const userData = results[0].dataValues;
      const currentUser = {
        email: userData.email,
        minLength: userData.minLength,
        maxLength: userData.maxLength,
        maxAscent: userData.maxAscent
      };
      res.render("members", currentUser);
    });
  });

  app.get("/edit", isAuthenticated, (req, res) => {
    res.render("edit");
  });

  function apiCall(searchLocation, minLength, maxLength, maxAscent, callback) {
    const key = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
    const loc = searchLocation;
    const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`;
    const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
    const hikeBaseURL =
      "https://www.hikingproject.com/data/get-trails?" + hikeApiKey;
    var queryTerm = "";

    axios.get(queryUrl).then(response => {
      const coords = response.data.results[0].locations[0].latLng;
      const lat = coords.lat;
      const long = coords.lng;

      const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
      const hikeBaseUrl = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&minLength=${minLength}&maxDistance=25&maxResults=50&key=${hikeApiKey}`;

      axios.get(hikeBaseUrl).then(response => {
        hikes = [];
        const trailList = response.data.trails;
        trailList.forEach(element => {
          if (element.length <= maxLength && element.ascent <= maxAscent) {
            hikes.push(element);
          }
        });
        callback("/search");
      });
    });
  }
};
