* change login storage from cookies to context instead == safer



* When registering new user thats already current in database - a 400 bad request is received from the server/AuthenticationService.java. Fix error handling even here in client

    - (Also when successfully created a new user == no error message == and thats good but make a created user success page also)



* After start&stop lift in EmployeeAccount/Liftmanagement.jsx the light in navbar doesnt immediately shift. The LiftStatus/SetLiftStatus is unused.



* When clicking "Signout" redirected to notauthorized page, should automatically redirect to home "/" dont know why stopped working



* Router error when in Accountpages (HOC) since the /Chat component is placed directly in the accounts sidebars. Should prb be handled through router component instead.