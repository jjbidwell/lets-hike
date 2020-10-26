# Let's Hike
Link to application:  
https://cryptic-shelf-56462.herokuapp.com/  

Link to GitHub repository:  
https://github.com/jjbidwell/lets-hike  


## Description 
Let's Hike is a full-stack application will allow a user to plan a hike based on their preferences. Unlike other hiking applications, Let's Hike also saves a user's preferences when they sign up, and only shows them hikes that fall within those preferences.   

## Table of Contents 
  * [Installation](#installation)
  * [Development](#development)
  * [License](#license)
  * [Contributing](#contributing)
  * [Test](#tests)
  * [Questions](#questions)
  * [Env](#env)

## Installation

If you are interested in installing and using the project, you can do so by forking the GitHub repository and cloning it to your machine.  

To use the app, simply follow the provided Heroku link and sign up.  

## Development 

The application was made by Al Pineda, Marylee Pabst, and Joshua Bidwell, and uses Bootstrap as a CSS framework. The program used to write the application is VS Code. The developers also used MySQL Workbench to create and test the database. The app uses the following programming languages:    

* Back End:
   * Node.js
   * MySQL
* Front End: 
   * HTML
   * CSS
   * JavaScript/JQuery  

The app also uses various npm packages to run: 
* axios
* bcryptJs
* date-and-time
* dotenv
* express
* express-handlebars
* express-session
* mysql2
* passport
* passport-local
* sequelize  

The app is deployed on Heroku and uses JawsDB as a database on Heroku.  

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) MIT License  

## Contributing
Please fork the repository in Github with permission.  

## Env
This app uses dotenv.  Requires a ".env" file created in root with the contents like the following (change xxxxxx to what you wish for dev purposes). It will also require keys to use apis for the openweather api, mapquest api and the hiking project api.  
--
**SERVER_SECRET** = xxxxx  
**WEATHER_KEY** = xxxxxxx  
**MAP_KEY** = xxxxxxxxxxx  
**HIKING_KEY** = xxxxxxxx  
--
---