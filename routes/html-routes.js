// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/search");
    }
    res.render("signup");
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
    res.render("search");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    console.log(req.user);
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
};
