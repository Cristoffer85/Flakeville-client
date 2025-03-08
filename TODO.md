---------------------------
* Find ways to not having to use cookies/localstorage so much - but without losing current sessiondata by refresh/accidental browserclosure...? Impossible?

        - Include/exclude more information within the jwt? From the model from server it already have 'username' included. And another separate of role. Do we really need to set these as extra persistent values in cookie or local to use it for state? Somehow use these clumped together encrypted and then decrypt in frontend when using?
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