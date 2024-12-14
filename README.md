# Project: Flakeville Ski Resort Application (Client) - with PowderTracker®

## Description

The client application for Flakeville Ski Resort. This application serves as a client for corresponding server 
https://github.com/Flakeville-server which is built in Java on primarily framework Spring Boot.

The application is mainly built in Javascript with HTML and CSS, and frameworks React and Vite (.jsx) as help.

The applications main purpose is meant to be the ultimate Ski Resort application for both managers, employees and guests at Snöfjällby Ski Resort.

* Managers can handle typical and overall employee and guest requests,
* Employees can handle the daily running of the resort as well the common store, and some of its own data.
* Guests (Users) can book a stay, rent equipment, book ski lessons, and see the current weather and snow conditions.



## Installation

1. Make sure you have the server version downloaded and running on your local machine.  
```https://github.com/Cristoffer85/SnofjallbyWithPT-Backend``` Also follow the instructions there to correctly set it up, and start that server.
2. Clone this repository to your local machine.
3. Make sure every component containing API endpoints in this application is correctly set up to match the servers URL (I know, later it will be set in a common API.jsx or similar for correct and better structure).  
Right now they are:


    - components/Navbar.jsx
    - components/Products.jsx
    - components/SignUp.jsx
    - components/SignIn.jsx
   

    - pages/AdminAccount.jsx
    - pages/EmployeeAccount.jsx
    - pages/UserAccount.jsx
    - pages/Weather.jsx
    - pages/Cart.jsx
    - pages/Store.jsx

4. Navigate to sf-frontend folder and type ```npm run dev``` to start the application. View in your browser at ```http://localhost:5173```

## Usage

The application is built to be used by three different types of users, ADMIN, EMPLOYEE and GUEST (User). Navigate around the application by clicking on the different links in the Navbar and pages overall to test various functions. More detailed info can be found further down on features.

## Credits
Classmates from school, Myself, my Family, mighty duck rubber duck and some coPilot and chatGPT for debugging.

## License
🏆 MIT License

## Badges
![badmath](https://img.shields.io/badge/Java-100%25-blue)

## Features

ADMIN, can:

Login, handle every CRUD functionality for every Employee and Guest

EMPLOYEE, can:

Login, handle every CRUD functionality for every product in Store, Ski Lift operations and some personal data.

GUEST (User), can:

Sign up, Login, Book a stay, Rent equipment, Book ski lessons, View previous orders and total cost, See current weather and snow conditions, manage some of its personal data.


## Tests
No tests for client are yet implemented in this application, although knowledge of test framework ```Cypress``` is present. It will maybe be implemented in future addition.
