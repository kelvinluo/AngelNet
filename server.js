	http = require('http');
	fs = require('fs');
	path = require('path');
	url = require("url");
	var geoip = require('geoip-lite');
	mongoose = require('mongoose');
	express = require('express');
	var MobileDetect = require('mobile-detect');
	var session = require('express-session');
	var busboy = require('connect-busboy');
	var geoip = require('geoip-lite');
	var sess;
	
	app = express();
	router = express.Router();
	PORT = 3000;
	STATIC_PREFIX = '/static/';
	MIME_TYPES = {
	    '.html': 'text/html',
	    '.css': 'text/css',
	    '.js': 'text/javascript',
	    '.txt': 'text/plain'
	};
	
	//Set up user profile schema
	var ProfileSchema = mongoose.Schema({
	    email: {
	        type: String
	    },
	    displayName: {
	        type: String
	    },
	    password: {
	        type: String
	    },
	    description: {
	        type: String
	    },
	    IPAddress: {
	        type: String
	    },
	    profilePic: {
	        type: String
	    },
	    isAdmin: Boolean,
	    isSuper: Boolean,
	    lastVisit: String,
	    lastLocation: String,
	    lastViewingOS: String,
	    lastViewingBrowser: String,
	    registerLocation: String,
	    registerTime: String,
	    pageViewedMost: String
	});
	
	 //To connect to MongoDB's  database
	mongoose.connect('mongodb://localhost/csc309zhichaoluo', {
	    user: '',
	    pass: ''
	});
	
	 //check the status of this connection
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback() {
	    console.log('Connected to MongoDB');
	});
	
	 // Creates the model for Books.
	var UserProfiles = mongoose.model('profiles', ProfileSchema);
	
	 //UserProfiles.remove({}, function(err,removed) {});
	 //Creates Server
	app.use('/js', express.static(__dirname + '/js'));
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/fonts', express.static(__dirname + '/fonts'));
	app.use('/images', express.static(__dirname + '/images'));
	app.use('/', express.static(__dirname));
	app.use(session({
	    secret: 'ssshhhhh'
	}));
	app.use(function(req, res, next) {
	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', "*");
	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods',
	        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers',
	        'X-Requested-With,content-type');
	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);
	    // Pass to next layer of middleware
	    next();
	});
	
	//Redirect user to the index page, if logined, then redirect to user profile page.
	app.get('/', function(req, res) {
	    sess = req.session;
	    if (sess.email) {
	        res.redirect('/UserPage.html');
	        console.log(sess.email);
	        res.end();
	    } else {
	        res.redirect('/index_1.html');
	        res.end();
	    }
	});
	
	//Create new user
	app.get('/newUser', function(req, res) {
	    sess = req.session;
		
		//Get information from client side
	    var userEmail = req.param('email');
	    var userPassword = req.param('password');
	    var ifUserExist = false;
	    var md = new MobileDetect(req.headers['user-agent']);
		
		//Find if user existed already
	    UserProfiles.find({}, function(err, users) {
	        for (i = 0; i < users.length; i++) {
	            if (users[i]["email"] == userEmail) {
	                ifUserExist = true;
	            }
	        }
	        if (ifUserExist) {
	            res.writeHeader(404, {
	                'Content-Type': 'text/plain'
	            });
	            res.write("User is already existed in the system.");
	            res.end();
	        } else {
			    //If user does not existed, create and add to the database
	            sess.email = userEmail;
	            var user = new UserProfiles({
	                email: userEmail,
	                displayName: "",
	                password: userPassword,
	                description: "The user is too lazy to write down anything.",
	                IPAddress: req.ip,
	                profilePic: "images/user_default.png",
	                isAdmin: false,
	                isSuper: false,
	                registerLocation: geoip.lookup(req.ip),
	                registerTime: getTime(),
	                lastVisit: getTime(),
	                lastLocation: geoip.lookup(req.ip),
	                lastViewingOS: md.os(),
	                lastViewingBrowser: md.userAgent(),
	                pageViewedMost: "http://localhost:3000/UserPage.html"
	            })
	            if (users.length == 0) {
	                user.isSuper = true;
	                user.isAdmin = true;
	                console.log("Set Super Admin")
	            }
				
				//Save to database
	            user.save(function(err) {
	                if (err) {
	                    console.log(err);
	                    return;
	                }
	                console.log('Saved user instance: ' +
	                    user);
	            });
	            res.writeHeader('Content-Type', 'text/plain');
	            res.write("Success");
	            res.end();
	        }
	    });
	});
	
	//Get user login infor
	app.get('/login', function(req, res) {
	    sess = req.session;
		
		//Read data from client side
	    var userEmail = req.param('email');
	    var userPassword = req.param('password');
	    var ifUserExist = false;
	    var tartgetPassword = "";
	    md = new MobileDetect(req.headers['user-agent']);
	    console.log(md);
		
		//Check if user existed
	    UserProfiles.find({}, function(err, users) {
	        for (i = 0; i < users.length; i++) {
	            if (users[i]["email"] == userEmail) {
	                ifUserExist = true;
	                tartgetPassword = users[i]["password"];
	            }
	        }
			
			//If user existed, check if password match
	        if (ifUserExist) {
	            if (userPassword != tartgetPassword) {
	                res.writeHeader(404, {
	                    'Content-Type': 'text/plain'
	                });
	                res.write(
	                    "User is already existed in the system."
	                );
	            } else {
				  	//Assign user last visit behavior
	                sess.email = userEmail;
	                UserProfiles.update({
	                    email: userEmail
	                }, {
	                    lastVisit: getTime(),
	                    lastLocation: geoip.lookup(req.ip),
	                    lastViewingOS: md.os(),
	                    lastViewingBrowser: md.userAgent()
	                }, function(err) {});
	                res.writeHeader('Content-Type', 'text/plain');
	                res.write("Success");
	            }
	        } else {
	            res.writeHeader(404, {
	                'Content-Type': 'text/plain'
	            });
	            res.write("User is already existed in the system.");
	        }
	        res.end();
	    });
	});
	
	//Get user logout
	app.get('/logout', function(req, res) {
	    console.log("request logout");
		//If user logout, destroy session
	    req.session.destroy(function(err) {
	        if (err) {
	            console.log(err);
	        } else {
	            res.redirect('/index_1.html');
	            res.end();
	        }
	    });
	});
	
	//Get if user request for reset administartor identity
	app.get('/changeAdmin', function(req, res) {
	    var userEmail = req.param('email');
	    UserProfiles.findOne({
	        email: userEmail
	    }, function(err, user) {
	        console.log(user.isAdmin);
	        if (user.isAdmin) {
	            UserProfiles.update({
	                email: userEmail
	            }, {
	                isAdmin: false
	            }, function(err) {});
	        } else {
	            UserProfiles.update({
	                email: userEmail
	            }, {
	                isAdmin: true
	            }, function(err) {});
	        }
	        res.end();
	    });
	});
	
	app.get('/changePassword', function(req, res) {
	    var userEmail = req.param('email');
		var oldPass = req.param('oldPass');
		var newPass = req.param('newPass');
	    UserProfiles.findOne({
	        email: userEmail
	    }, function(err, user) {
	        console.log(user.isAdmin);
	        if (user.password == oldPass) {
	            UserProfiles.update({
	                email: userEmail
	            }, {
	                password: newPass
	            }, function(err) {});
	        } else {
	            res.writeHeader(404, {
	                "Content-Type": "text/plain"
	            });
	            res.write("404 Not Found\n");
	        }
	        res.end();
	    });
	});
	
	//Check if user request for removing user from database
	app.get('/removeUser', function(req, res) {
	    var userEmail = req.param('email');
	    UserProfiles.findOne({
	        email: userEmail
	    }).remove(function(err) {});
	    res.end();
	});
	
	//Request for all user in the database
	app.get('/requestUserList', function(req, res) {
	    UserProfiles.find({}, function(err, users) {
	        if (err) {
	            res.writeHeader(404, {
	                "Content-Type": "text/plain"
	            });
	            res.write("404 Not Found\n");
	            res.end();
	        } else {
	            res.writeHeader('Content-Type', 'application/json');
	            res.write(JSON.stringify(users, null, 3));
	            console.log(users);
	            res.end();
	        }
	    });
	});
	
	//Request for sepecfic user data
	app.get('/getUserData', function(req, res) {
	    UserProfiles.find({}, function(err, users) {
	        if (err) {
	            res.writeHeader(404, {
	                "Content-Type": "text/plain"
	            });
	            res.write("404 Not Found\n");
	            res.end();
	        } else {
	            var userId = req.param('userId');
	            res.writeHeader('Content-Type', 'application/json');
	            for (i = 0; i < users.length; i++) {
	                if (users[i]["_id"] == userId) {
	                    res.write(JSON.stringify(users[i], null, 3));
	                }
	            }
	            res.end();
	        }
	    });
	});
	
	//Request for the current session holder data
	app.get('/getMyData', function(req, res) {
	    sess = req.session;
	    if (sess.email) {
	        UserProfiles.findOne({
	            email: sess.email
	        }, function(err, user) {
	            if (err) {
	                res.writeHeader(404, {
	                    "Content-Type": "text/plain"
	                });
	                res.write("404 Not Found\n");
	                res.end();
	            } else {
	                res.writeHeader('Content-Type',
	                    'application/json');
	                res.write(JSON.stringify(user, null, 3));
	                res.end();
	            }
	        });
	    } else {
	        res.writeHeader(404, {
	            "Content-Type": "text/plain"
	        });
	        res.write("404 Not Found\n");
	        res.end();
	    }
	});
	
	//Request for updating user profile
	app.get('/updateProfile', function(req, res) {
	    UserProfiles.find({}, function(err, users) {
	        if (err) {
	            res.writeHeader(404, {
	                "Content-Type": "text/plain"
	            });
	            res.write("404 Not Found\n");
	            res.end();
	        } else {
	            var userEmail = req.param("email");
	            var newDisplayName = req.param("displayName");
	            var newDescription = req.param("description");
	            res.writeHeader('Content-Type', 'application/json');
	            for (i = 0; i < users.length; i++) {
	                if (users[i]["email"] == userEmail) {
	                    UserProfiles.update({
	                        email: userEmail
	                    }, {
	                        displayName: newDisplayName,
	                        description: newDescription
	                    }, function(err) {});
	                }
	            }
	            res.end();
	        }
	    });
	});
	
	//
	app.use(busboy());
	
	//Upload and assign new profile picture for user
	app.route('/upload').post(function(req, res) {
	    var fstream;
	    var userEmail;
	    req.pipe(req.busboy);
	    req.busboy.on('field', function(fieldname, val, fieldnameTruncated,
	        valTruncated) {
	        userEmail = val;
	    });
	    req.busboy.on('file', function(fieldname, file, filename) {
	        console.log("Uploading: " + filename);
	        newFileStorage = __dirname + '\\temp\\temp.png'
	        fstream = fs.createWriteStream(newFileStorage);
	        file.pipe(fstream);
	        fstream.on('close', function() {
	            console.log("Upload Finished of " +
	                filename);
	            console.log("Upon Finishing " + userEmail);
	            moveFile(userEmail);
	        });
	        req.busboy.on('finish', function() {
	            res.redirect('/UserPage.html');
	        });
	    });
	});
	
	//Move temparory photo picture to the given directory
	function moveFile(userEmail) {
	    UserProfiles.findOne({
	        email: userEmail
	    }, function(err, user) {
	        oldFileStorage = __dirname + "\\temp\\temp.png"
	        newFileStorage = __dirname + '\\user_pics\\' + user["_id"] +
	            '.png'
	        fs.rename(oldFileStorage, newFileStorage, function(err) {});
	        //Path where image will be uploaded
	        UserProfiles.update({
	            email: userEmail
	        }, {
	            profilePic: "\\user_pics\\" + user["_id"] +
	                ".png"
	        }, function(err) {});
	        console.log("Name Changed to " + newFileStorage);
	    });
	}

	function getTime() {
	    var date = new Date();
	    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
	        date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +
	        ":" + date.getSeconds();
	    return str;
	}
	app.listen(PORT);
	console.log('Server running at http://127.0.0.1:' + PORT + '/');