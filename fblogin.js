/*
	fbLogin will handle user management for your Flybase apps.

	fbLogin creates a new collection called "_users" to contain the user records.

	This is meant to make creating your apps faster and easier by providing you a system that can be easily expanded
	on.

	This is also a pure Flybase driven app, we use the Flybase library to handle users rather than custom end
	points, this is meant to demo and show just how you can use Flybase in your apps :)
*/

/*
ref.createUser("roger@flybase.com","mypassword", function(error) {
	if (error === null) {
		console.log("User created successfully");
	} else {
		console.log("Error creating user:", error);
	}
});

ref.login("roger@flybase.com","mypassword", function(error, userData) {
	if (error) {
		console.log("Login Failed!", error);
	} else {
		console.log("Authenticated successfully with payload:", userData);
	}
});

ref.changeEmail("roger@flybase.com","flybase@flybase.com","mypassword", function(error) {
	if (error === null) {
		console.log("Email changed successfully");
	} else {
		console.log("Error changing email:", error);
	}
});

ref.changePassword("roger@flybase.com", "mypassword", "mynewpassword", function(error) {
	if (error === null) {
		console.log("Password changed successfully");
	} else {
		console.log("Error changing password:", error);
	}
});

ref.getUser(user_id, function(user) {
	console.log( user );
});


ref.resetPassword("roger@flybase.com", function(error) {
	if (error === null) {
		console.log("Password reset email sent successfully");
	} else {
		console.log("Error sending password reset email:", error);
	}
});

ref.removeUser("roger@flybase.com", "mypassword", function(error) {
	if (error === null) {
		console.log("User removed successfully");
	} else {
		console.log("Error removing user:", error);
	}
});

ref.isLoggedIn();
	-	returns true if logged in or false if not.

*/

var fbLogin = function( flybaseRef ){

//	clone the passed flybase Reference into a new object
	this.flybaseRef = this._clone( flybaseRef );

	this.apiUrl = this.flybaseRef.apiUrl;

//	set the collection to _users
	this.flybaseRef.collection = "_users";

	this._user = {};

	if( this.isLoggedIn() ){
		var self = this;
//		user is logged in, so let's grab the user's info...
		this.getUser( this._getToken(), function( user ){
			self._user = user;
		});
	}

	return true;
};

/*
	Output a list of registered users, mostly for debugging purposes...
*/
fbLogin.prototype.listUsers = function(){
	this.flybaseRef.once('value', function (data) {
		console.log( "we found " + data.count() + " users");
		data.forEach( function( user ){
			console.log( user );
		});
	});
};

fbLogin.prototype.createUser = function( email, password, callback, options ){
//	check if user already exists...
	var self = this;
	this.flybaseRef.where({'email':email}).limit(1).once('value', function( data ){
		var error = null;
		if( data.count() > 0 ){
			error = "user exists";
			callback( error );
		}else{
			//	create user since he doesn't exist...
			var user = { 'email': email, 'password': password };
			self.flybaseRef.push( user, function(data){
				console.log('Insert Documents : ', data);
				callback( error );
			});
		}
	});
	return true;
};

fbLogin.prototype.login = function( email, password, callback, options ){
	var self = this;
	this.flybaseRef.where({'email':email,'password':password}).limit(1).once('value', function( data ){
		var error = null;
		if( data.count() > 0 ){
			var user = data.first().value();
			self._setToken( user._id );
			callback("",user );
		}else{
			callback("No user found");
		}
	});
	return true;
};

fbLogin.prototype.getUser = function( uid, callback ){
	var self = this;
	this.flybaseRef.where({'_id':uid}).limit(1).once('value', function( data ){
		var error = null;
		if( data.count() > 0 ){
			var user = data.first().value();
			callback( user );
		}
	});
};

//	log the user out...
fbLogin.prototype.logout = function(){
	this._user = {};
	this._setToken("");
};

fbLogin.prototype.isLoggedIn = function() {
	if ( this._getToken() ){
		return true;
	}else{
		return false;
	}
};

fbLogin.prototype.changeEmail = function( oldEmail, newEmail, password, callback ){
	console.log( "Starting connection" );
	return true;
};

fbLogin.prototype.changePassword = function( email, oldPassword, newPassword, callback ){
	console.log( "Starting connection" );
	return true;
};

fbLogin.prototype.resetPassword = function( email, callback ){
	console.log( "Starting connection" );
	return true;
};

fbLogin.prototype.removeUser = function( email, password, callback ){
	console.log( "Starting connection" );
	return true;
};

/*
	clone is a handy function that takes a passed object and creates a copy of it, any changes made to the new copy
	do not reflect in the original object.
*/
fbLogin.prototype._clone = function( obj ){
	return Object.create( obj );
};

fbLogin.prototype._getToken = function(){
	return localStorage.getItem("dmLtoken");
};

fbLogin.prototype._setToken = function( token ){
	if( token == "" ){
		localStorage.removeItem("dmLtoken");
	}else{
		localStorage.setItem("dmLtoken", token);
	}
};
