// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      minLength: req.body.minLength,
      maxLength: req.body.maxLength,
      maxAscent: req.body.maxAscent
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.send("I am error");
        //res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/user_data", (req, res) => {
    db.User.update(
      {
        minLength: parseInt(req.body.minLength),
        maxLength: parseInt(req.body.maxLength),
        maxAscent: parseInt(req.body.maxAscent)
      },
      { where: { id: req.user.id } }
    ).then(() => {
      res.redirect("/members");
    });
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
  });

  // app.post("/api/user_preferences", (req, res) => {
  //   function renderPage(hikes) {
  //     console.log(hikes);
  //     //res.redirect("/");
  //     //res.render("search", { hikes: "Hello" });
  //   }
  //   if (!req.user) {
  //     res.redirect("/login");
  //   } else {
  //     db.User.findAll({
  //       where: {
  //         id: req.user.id
  //       }
  //     }).then(results => {
  //       const searchParams = results[0].dataValues;
  //       const minLength = searchParams.minLength;
  //       const maxLength = searchParams.maxLength;
  //       const maxAscent = searchParams.maxAscent;
  //       apiCall(
  //         req.body.searchArea,
  //         minLength,
  //         maxLength,
  //         maxAscent,
  //         renderPage
  //       );
  //     });
  //   }
  // });
};

// function apiCall(searchLocation, minLength, maxLength, maxAscent, callback) {
//   const key = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
//   const loc = searchLocation;
//   const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`;
//   const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
//   const hikeBaseURL =
//     "https://www.hikingproject.com/data/get-trails?" + hikeApiKey;
//   var queryTerm = "";

//   axios.get(queryUrl).then(response => {
//     const coords = response.data.results[0].locations[0].latLng;
//     const lat = coords.lat;
//     const long = coords.lng;

//     const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
//     const hikeBaseUrl = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&minLength=${minLength}&maxDistance=25&maxResults=50&key=${hikeApiKey}`;
//     //console.log(hikingUrl);

//     axios.get(hikeBaseUrl).then(response => {
//       const hikes = [];
//       //console.log(maxAscent);
//       const trailList = response.data.trails;
//       trailList.forEach(element => {
//         if (element.length <= maxLength && element.ascent <= maxAscent) {
//           hikes.push(element);
//         }
//       });
//       module.exports = hikes;
//       callback(hikes);
//     });

//     //hikeQuery(lat, long, minLength, maxLength, maxAscent, cb);
//   });
// }
