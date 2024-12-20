* change login storage from cookies to context instead == safer
* checkUsername im AuthApi isnt present in server-side. Oops.. (Makes fault i dev tools and doesnt check against server if username present)
* After start&stop lift in EmployeeAccount/Liftmanagement.jsx the light in navbar doesnt immediately shift. The LiftStatus/SetLiftStatus is unused.
* When clicking "Signout" redirected to notauthorized page, should automatically redirect to home "/" dont know why stopped working
* Router error when in Accountpages (HOC) since the /Chat component is placed directly in the accounts sidebars. Should prb be handled through router component instead.