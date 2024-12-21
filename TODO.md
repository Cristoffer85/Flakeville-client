* change login storage from cookies to context instead == safer

* After start&stop lift in EmployeeAccount/Liftmanagement.jsx the light in navbar doesnt immediately shift. The LiftStatus/SetLiftStatus is unused.

* Separate User and Previous Orders tables into separate for better database structure and handling
            PK: USER
            FK: PREVIOUS ORDERS
