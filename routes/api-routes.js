const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

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
      });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
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
    )
      .then(() => {
        res.redirect("/members");
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  });
};
