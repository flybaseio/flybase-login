Flybase Login
---------------

Basic user registration / login system for use with the Flybase Javascript or node library.

dmLogin will handle user management for your Flybase apps.

dmLogin creates a new collection called `_users` to contain the user records.

This is meant to make creating your apps faster and easier by providing you a system that can be easily expanded
on.

This is also a pure Flybase driven app, we use the Flybase library to handle users rather than custom end
points, this is meant to demo and show just how you can use Flybase in your apps :)

Usage
-----

```javascript

	var Ref = new Flybase("74c8264f-cd6f-4c07-8baf-b1d241596dec", "my-app", "chat");

	var userRef = new dmLogin( Ref );

	userRef.createUser("roger@datamcfly.com","mypassword", function(error) {
		if (error === null) {
			console.log("User created successfully");
		} else {
			console.log("Error creating user:", error);
		}
	});

	userRef.login("roger@datamcfly.com","mypassword", function(error, userData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", userData);
		}
	});

	userRef.changeEmail("roger@datamcfly.com","datamcfly@datamcfly.com","mypassword", function(error) {
		if (error === null) {
			console.log("Email changed successfully");
		} else {
			console.log("Error changing email:", error);
		}
	});

	userRef.changePassword("roger@datamcfly.com", "mypassword", "mynewpassword", function(error) {
		if (error === null) {
			console.log("Password changed successfully");
		} else {
			console.log("Error changing password:", error);
		}
	});

	userRef.getUser(user_id, function(user) {
		console.log( user );
	});

	userRef.removeUser("roger@datamcfly.com", "mypassword", function(error) {
		if (error === null) {
			console.log("User removed successfully");
		} else {
			console.log("Error removing user:", error);
		}
	});

	userRef.isLoggedIn();
		-	returns true if logged in or false if not.
```


See the file `login.html` for a functioning demo of how to use the dmLogin class.
