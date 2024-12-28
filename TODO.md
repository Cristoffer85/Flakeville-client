* Change login storage from cookies to context instead == safer [URGENT important fix = right now you are able to manually alter the role in cookies to other role and access the relative roles content.. ehe, haha.. (nervous laugh) :) ]

* After start&stop lift in EmployeeAccount/Liftmanagement.jsx the light in navbar doesnt immediately shift. The LiftStatus/SetLiftStatus is unused.

* Separate User and Previous Orders tables into separate for better database structure and handling
            PK: USER
            FK: PREVIOUS ORDERS
