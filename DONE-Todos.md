* Router error when in Accountpages (HOC). 
                = Something about component is trying to navigate during render phase. Not allowed and had to insert UseEffect into HOC-component
* When clicking "Signout" redirected to notauthorized page, not home. 
                 = Reason cookies are removed when clicked, thats why. Add small delay for that so cookies still present then redirect to homepage
* When registering new user thats already current in database - no error handling
                = Fixed with help of rewriting some misses with sufficient error message in authAPi. Handled better later in SignUpPage