---------------------------
* Find ways to not having to use cookies/localstorage so much - but without losing current sessiondata by refresh/accidental browserclosure...? Impossible?

        - Include/exclude more information within the jwt? From the model from server it already have 'username' included. And another separate of role. Do we really need to set these as extra persistent values in cookie or local to use it for state? Somehow use these clumped together encrypted and then decrypt in frontend when using?

== SOLVED! By building separate smaller more slimmed app in server and really try to read and decrypt each logic found it easily to include the claims in TokenService in server along with switching the variables to right 'token' instead of 'jwt' (in some places.. was what was bugging me some many times as well...

After this done it could be done by moving a separate AuthContext to level above App.jsx == Main.jsx which uses that in all of rest of application always. And decodes the jwt there). This Authcontext is then used and implemented throughout the rest of the application instead of cookies. Not everything is translated/ferred yet but this works. 
Effectively removing the cookielogic and ensuring all state logic is stored within the jwtToken. 
Unable to tamper with. 
Signed and handled only by the server.
---------------------------

---------------------------
* Product Management error when entering, also CRUD doesnt work in frontend. 
        - Backend works just fine in postman so 100% frontend issue.
---------------------------

---------------------------
* After start&stop lift in EmployeeAccount/Liftmanagement.jsx the light in navbar doesnt immediately shift. The LiftStatus/SetLiftStatus is unused.
---------------------------

---------------------------
* Separate User and Previous Orders tables into separate for better database structure and handling
            PK: USER
            FK: PREVIOUS ORDERS
---------------------------







*****************************
COMMANDS TO REMEMBER:
Run:
 - npm run dev

 Build:
 - npm run build
*****************************