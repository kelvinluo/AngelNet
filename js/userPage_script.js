   var isSuper = false;
	   var isAdmin = false;
	   var sessionUserEmail = "";
	   var sessionUserId = "";
	   var sessionUserAdim = false;
	   var sessionUserSup = false;
	   $(document).ready(function() {
	       requestForMyData();
	       var windowWidth = $(window).width();
	       var windowHeight = $(window).height();
	       var middle_axis = windowWidth / 2;
	       var center_axis = windowHeight / 2;
	       var userList_width = 300;
	       var top_logo_size = 40;
	       $("#topLogo").css({
	           "top": 9 + "px",
	           "left": 20 + "px"
	       });
	       $("#topLogo").css({
	           "width": top_logo_size * 2 + "px",
	           "height": top_logo_size + "px"
	       });
	       $("#topBanner").css({
	           "top": "56px"
	       });
	       $("#botBanner").css({
	           "top": windowHeight - 20 + "px"
	       });
	       $("#container").css({
	           "width": "100%",
	           "height": windowHeight - 205 + "px"
	       });
	       $("#homepageTitle").css({
	           "left": "0px",
	           "top": "0px"
	       });
	       $("#userList").css({
	           "width": userList_width + "px",
	           "height": windowHeight - 83 + "px"
	       });
	       $("#userList").css({
	           "left": "0px"
	       });
	       $("#profile").css({
	           "width": windowWidth - userList_width - 10 + "px",
	           "height": windowHeight - 83 + "px"
	       });
	       $("#defaultPage").css({
	           "width": "100%",
	           "height": "100%"
	       });
	       $("#viewPage").css({
	           "width": "100%",
	           "height": "100%",
	           "opacity": "0"
	       });
	       $("#editPage").css({
	           "width": "100%",
	           "height": "100%",
	           "opacity": "0"
	       });
	       $("#logo").css({
	           "width": windowWidth / 3 + "px",
	           "height": windowWidth / 3 + "px"
	       });
	       $("#logo").css({
	           "left": (windowWidth - userList_width - 10) / 2 -
	               windowWidth / 6 + "px",
	           "top": (windowHeight - 83) / 2 - windowWidth / 6 +
	               "px"
	       });
	       $("#account").css({
	           "right": "150px",
	           "top": "2px"
	       });
	       $("#logout").css({
	           "right": "20px",
	           "top": "2px"
	       });
	       setTimeout(function() {
	           $("#logo").css({
	               "-webkit-transition": "top 2s, left 2s, width 2s, height 2s"
	           });
	           $("#logo").css({
	               "-moz-transition": "top 2s, left 2s, width 2s, height 2s"
	           });
	           $("#logo").css({
	               "transition": "top 2s, left 2s, width 2s, height 2s"
	           });
	           $("#logo").css({
	               "width": windowWidth / 4 + "px",
	               "height": windowWidth / 4 + "px"
	           });
	           $("#logo").css({
	               "left": (windowWidth - userList_width -
	                       10) / 2 - windowWidth / 8 +
	                   "px",
	               "top": (windowHeight - 83) / 2 -
	                   windowWidth / 8 + "px"
	           });
	           $("#logo").fadeTo(1000, 0.9);
	       }, 200);
	       //Function uses AJAX to give a simple request to the server and expects return
	       function getData(target) {
	           alert(target);
	           //$("#" + itemID).toggleClass('active');
	       }

	       function requestAllForData(reqOrder) {
	               $.ajax({
	                   //The URL is stated to be the local port 3000
	                   url: "http://localhost:3000/" + reqOrder,
	                   //If server returns normal response, refresh the data in the frontend
	                   success: function(data) {
	                       var processed_data = JSON.parse(
	                           data);
	                       for (i = 0; i < processed_data.length; i++) {
	                           var displayName =
	                               processed_data[i][
	                                   "displayName"
	                               ];
	                           if (displayName == "") {
	                               displayName =
	                                   processed_data[i][
	                                       "email"
	                                   ];
	                           }
	                           var divId = processed_data[i][
	                               "_id"
	                           ] + "ListItem";
	                           $('<div class="listItem" id="' +
	                               divId +
	                               '">\
            				  	   <img class="profilePic" id="' +
	                               processed_data[i]["_id"] +
	                               'PofilePic" src="' +
	                               processed_data[i][
	                                   "profilePic"
	                               ] +
	                               '" alt="" border="0">\
            					   <div class="displayEmail" id="' +
	                               processed_data[i]["_id"] +
	                               'DisplayEmail">' +
	                               processed_data[i][
	                                   "email"
	                               ] +
	                               '</div>\
            					   <div class="displayName" id="' +
	                               processed_data[i]["_id"] +
	                               'DisplayName">' +
	                               displayName +
	                               '</div>\
            				  </div>'
	                           ).insertAfter(
	                               "#homepageTitle");
	                           document.getElementById(divId).addEventListener(
	                               "click", function() {
	                                   $(".listItem").removeClass(
	                                       'active');
	                                   $(event.target).toggleClass(
	                                       'active');
	                                   $("#viewPage").css({
	                                       "width": "100%",
	                                       "height": "100%",
	                                       "opacity": "1",
	                                       "display": "block"
	                                   });
	                                   $("#editPage").css({
	                                       "width": "100%",
	                                       "height": "100%",
	                                       "opacity": "0",
	                                       "display": "none"
	                                   });
	                                   $("#defaultPage").css({
	                                       "width": "100%",
	                                       "height": "100%",
	                                       "opacity": "0",
	                                       "display": "none"
	                                   });
	                                   $(".warning").css({
	                                       "opacity": "0",
	                                       "display": "none"
	                                   });
	                                   var userId = $(
	                                       event.target
	                                   ).attr('id');
	                                   userId = userId.replace(
	                                       "ListItem",
	                                       "");
	                                   requestForUserData(
	                                       userId);
	                               }, false);
	                       }
	                   },
	                   //If server returns error, display error message
	                   error: function(xhr, status, error) {},
	               });
	           }
	           //Function uses AJAX to give a complex request to the server and expects return

	       function requestForLogout() {
	               $.ajax({
	                   //The URL is stated to be the local port 3000
	                   url: "http://localhost:3000/logout",
	                   //If server returns normal response, refresh the data in the frontend
	                   success: function(data) {
	                       window.location = "index_1.html";
	                   },
	                   //If server returns error, display error message
	                   error: function(xhr, status, error) {
	                       $("#warn1").html(
	                           "Invalid email or password."
	                       );
	                   },
	               });
	           }
	           //Function uses AJAX to give a complex request to the server and expects return

	       function requestForChangeAdmin(email) {
	               $.ajax({
	                   //The URL is stated to be the local port 3000
	                   url: "http://localhost:3000/changeAdmin?email=" +
	                       email,
	                   //If server returns normal response, refresh the data in the frontend
	                   success: function(data) {
	                       $("#deleteProfileButton").css({
	                           "opacity": "0",
	                           "display": "none"
	                       });
	                   },
	                   //If server returns error, display error message
	                   error: function(xhr, status, error) {},
	               });
	           }
	           //Function uses AJAX to give a complex request to the server and expects return

	       function requestRemoveUser(email) {
	           $.ajax({
	               //The URL is stated to be the local port 3000
	               url: "http://localhost:3000/removeUser?email=" +
	                   email,
	               //If server returns normal response, refresh the data in the frontend
	               success: function(data) {
	                   location.reload();
	               },
	               //If server returns error, display error message
	               error: function(xhr, status, error) {},
	           });
	       }

	       function requestChangePassword(email, old_pwd, new_pwd) {
	           $.ajax({
	               //The URL is stated to be the local port 3000
	               url: "http://localhost:3000/changePassword?email=" +
	                   email + "&oldPass=" + old_pwd + "&newPass=" + new_pwd,
	               //If server returns normal response, refresh the data in the frontend
	               success: function(data) {
	                   $("#warn2").html(
	                   					"Change password successfully."
	               	   );
	               },
	               //If server returns error, display error message
	               error: function(xhr, status, error) {
	                   $("#warn2").html(
	                   					"Password Change Failed."
	               	   );
				   },
	           });
	       }
		   
	       function requestForUserData(userEmail) {
	           $.ajax({
	               //The URL is stated to be the local port 3000
	               url: "http://localhost:3000/getUserData?userId=" +
	                   userEmail,
	               //If server returns normal response, refresh the data in the frontend
	               success: function(data) {
	                   var processed_data = JSON.parse(
	                       data);
	                   if (processed_data["displayName"] ==
	                       "") {
	                       $("#userProfileName").html(
	                           processed_data["email"]
	                       );
	                   } else {
	                       $("#userProfileName").html(
	                           processed_data[
	                               "displayName"]);
	                   }
	                   $("#userProfileEmail").html(
	                       processed_data["email"]);
	                   $("#userProfileDescription").html(
	                       processed_data[
	                           "description"]);
	                   $("#userEditNameBox").val(
	                       processed_data[
	                           "displayName"]);
	                   $("#userEditEmail").html(
	                       processed_data["email"]);
	                   $("#userEditDescriptionBox").val(
	                       processed_data[
	                           "description"]);
	                   $("#userEditDescriptionBox").val(
	                       processed_data[
	                           "description"]);
	                   $("#userProfilePic").attr("src",
	                       processed_data["profilePic"]
	                   );
	                   $("#userEditPic").attr("src",
	                       processed_data["profilePic"]
	                   );
	                   $("#photoEmail").val(processed_data[
	                       "email"]);
	                   $("#editProfileButton").css({
	                       "opacity": "0",
	                       "display": "none"
	                   });
	                   $("#setAdminButton").css({
	                       "opacity": "0",
	                       "display": "none"
	                   });
	                   $("#removeAdminButton").css({
	                       "opacity": "0",
	                       "display": "none"
	                   });
	                   $("#deleteProfileButton").css({
	                       "opacity": "0",
	                       "display": "none"
	                   });
	                   $("#behavior1").html(
	                       '<span style="color:#E02D2A">Registeration Location</span> : ' +
	                       processed_data[
	                           "registerLocation"]);
	                   $("#behavior2").html(
	                       '<span style="color:#E02D2A">Registeration Time</span> : ' +
	                       processed_data[
	                           "registerTime"]);
	                   $("#behavior3").html(
	                       '<span style="color:#E02D2A">Last Visit Time</span> : ' +
	                       processed_data["lastVisit"]
	                   );
	                   $("#behavior4").html(
	                       '<span style="color:#E02D2A">Lasr Visit Location</span> : ' +
	                       processed_data[
	                           "lastLocation"]);
	                   $("#behavior5").html(
	                       '<span style="color:#E02D2A">Last Visti OS</span> : ' +
	                       processed_data[
	                           "lastViewingOS"]);
	                   $("#behavior6").html(
	                       '<span style="color:#E02D2A">Last Viewing Browser</span> : ' +
	                       processed_data[
	                           "lastViewingBrowser"]);
	                   $("#behavior7").html(
	                       '<span style="color:#E02D2A">pageViewedMost</span> : ' +
	                       processed_data[
	                           "pageViewedMost"]);
	                   if (processed_data["isSuper"]) {
	                       $("#userIdentity").html(
	                           "Super Administrator");
	                   } else if (processed_data["isAdmin"]) {
	                       $("#userIdentity").html(
	                           "Administrator");
	                   } else {
	                       $("#userIdentity").html(
	                           "Regular User");
	                   }
	                   if (sessionUserEmail ==
	                       processed_data["email"]) {
	                       $("#editProfileButton").css({
	                           "opacity": "1",
	                           "display": "block"
	                       });
	                   }
	                   if (sessionUserAdim) {
	                       if (sessionUserEmail !=
	                           processed_data["email"] &&
	                           !processed_data["isAdmin"] &&
	                           !processed_data["isSuper"]) {
	                           $("#deleteProfileButton").css({
	                               "opacity": "1",
	                               "display": "block"
	                           });
	                       }
	                       $("#editProfileButton").css({
	                           "opacity": "1",
	                           "display": "block"
	                       });
	                   }
	                   if (sessionUserSup &&
	                       sessionUserEmail !=
	                       processed_data["email"]) {
	                       if (processed_data["isAdmin"]) {
	                           $("#removeAdminButton").css({
	                               "opacity": "1",
	                               "display": "block"
	                           });
	                       } else {
	                           $("#setAdminButton").css({
	                               "opacity": "1",
	                               "display": "block"
	                           });
	                       }
	                   }
	               },
	               //If server returns error, display error message
	               error: function(xhr, status, error) {},
	           });
	       }

	       function requestForMyData() {
	               $.ajax({
	                   //The URL is stated to be the local port 3000
	                   url: "http://localhost:3000/getMyData",
	                   //If server returns normal response, refresh the data in the frontend
	                   success: function(data) {
	                       var processed_data = JSON.parse(
	                           data);
	                       sessionUserEmail = processed_data[
	                           'email'];
	                       sessionUserAdim = processed_data[
	                           'isAdmin'];
	                       sessionUserSup = processed_data[
	                           'isSuper'];
	                       sessionUserId = processed_data[
	                           '_id'];
	                       $("#homepageTitle").html(
	                           'Welcome <span style="color:#E0AAAA;">' +
	                           processed_data[
	                               'displayName'] +
	                           "</span>");
	                       if (sessionUserAdim) {
	                           $("#userBehaviourPanel").css({
	                               "opacity": "1",
	                               "display": "block"
	                           });
	                       } else {
	                           $("#userBehaviourPanel").css({
	                               "opacity": "0",
	                               "display": "none"
	                           });
	                       }
	                   },
	                   //If server returns error, display error message
	                   error: function(xhr, status, error) {
	                       alert("Please Login First");
	                       window.location = "index_1.html";
	                   },
	               });
	           }
	           //Function uses AJAX to give a complex request to the server and expects return

	       function updateProfile(email, newDisplayName, newDescription) {
	           $.ajax({
	               //The URL is stated to be the local port 3000
	               url: "http://localhost:3000/updateProfile?email=" +
	                   email + "&displayName=" +
	                   newDisplayName + "&description=" +
	                   newDescription,
	               //If server returns normal response, refresh the data in the frontend
	               success: function(data) {
	                   $("#warn1").html(
	                       "Update Successful.");
	                   $('.listItem').remove();
	                   requestAllForData('requestUserList');
	               },
	               //If server returns error, display error message
	               error: function(xhr, status, error) {
	                   $("#warn1").html("Update Failed.");
	               },
	           });
	       }
	       requestAllForData('requestUserList');
	       $('#userList').jScrollPane();
	       //$('#viewPage').jScrollPane();
	       //$('#editPage').jScrollPane();
	       $("#saveChangeButton").click(function() {
	           var validInput = true;
	           var email = $("#userEditEmail").html();
	           var displayName = $("#userEditNameBox").val();
	           var description = $("#userEditDescriptionBox").val();
	           if (displayName == '') {
	               validInput = false;
	               $("#warn1").html("Display Name cannot Be Empty");
	           }
	           if (description == '') {
	               validInput = false;
	               $("#warn1").html("Description Cannot Be Empty");
	           }
	           if (validInput) {
	               updateProfile(email, displayName, description);
	           }
	       });
	       $("#confirmPasswordChange").click(function() {
	           var validInput = true;
	           var email = $("#userEditEmail").html();
	           if ($("#userEditNewPwdBox1").val() == '') {
	               validInput = false;
	               $("#warn2").html(
	                   "Old Password Must Not Be Empty");
	           }
	           if ($("#userEditNewPwdBox2").val() == '') {
	               validInput = false;
	               $("#warn2").html(
	                   "New Password Must Not Be Empty");
	           }
	           if ($("#userEditNewPwdBox3").val() == '') {
	               validInput = false;
	               $("#warn2").html(
	                   "Please Enter Confirmed Password");
	           }
	           if ($("#userEditNewPwdBox2").val() != $(
	               "#userEditNewPwdBox3").val()) {
	               validInput = false;
	               $("#warn2").html(
	                   "The New Password Is Different From the Confirm Password"
	               );
	           }
	           if (validInput) {
			   	    $("#warn2").css({
	                           "opacity": "1",
	                           "display": "block"
	                       });
	               requestChangePassword(email, $("#userEditNewPwdBox1").val(), $("#userEditNewPwdBox2").val());
	           }
	       });
	       $("#editProfileButton").click(function() {
	           $("#viewPage").css({
	               "width": "100%",
	               "height": "100%",
	               "opacity": "0",
	               "display": "none"
	           });
	           $("#editPage").css({
	               "width": "100%",
	               "height": "100%",
	               "opacity": "1",
	               "display": "block"
	           });
	           $("#defaultPage").css({
	               "width": "100%",
	               "height": "100%",
	               "opacity": "0",
	               "display": "none"
	           });
	       });
	       $("#submitPhotoButton").click(function() {
	           $('#photoUploadForm').submit();
	       });
	       $("#logout").click(function() {
	           requestForLogout();
	       });
	       $("#account").click(function() {
	           $("#" + sessionUserId + "ListItem").click();
	       });
	       $("#setAdminButton").click(function() {
	           $("#setAdminButton").css({
	               "opacity": "0",
	               "display": "none"
	           });
	           $("#removeAdminButton").css({
	               "opacity": "1",
	               "display": "block"
	           });
	           requestForChangeAdmin($("#userProfileEmail").html());
	           $("#userIdentity").html("Administrator");
	           $("#deleteProfileButton").css({
	               "opacity": "1",
	               "display": "block"
	           });
	       });
	       $("#removeAdminButton").click(function() {
	           $("#setAdminButton").css({
	               "opacity": "1",
	               "display": "block"
	           });
	           $("#removeAdminButton").css({
	               "opacity": "0",
	               "display": "none"
	           });
	           requestForChangeAdmin($("#userProfileEmail").html());
	           $("#userIdentity").html("Regular User");
	           $("#deleteProfileButton").css({
	               "opacity": "0",
	               "display": "none"
	           });
	       });
	       $("#deleteProfileButton").click(function() {
	           requestRemoveUser($("#userProfileEmail").html());
	       });
		   
	   });
	   $(window).resize(function() {
	       var windowWidth = $(window).width();
	       var windowHeight = $(window).height();
	       var middle_axis = windowWidth / 2;
	       var center_axis = windowHeight / 2;
	       var userList_width = 300;
	       var top_logo_size = 40;
	       $("#topLogo").css({
	           "top": 9 + "px",
	           "left": 20 + "px"
	       });
	       $("#topLogo").css({
	           "width": top_logo_size * 2 + "px",
	           "height": top_logo_size + "px"
	       });
	       $("#topBanner").css({
	           "top": "56px"
	       });
	       $("#botBanner").css({
	           "top": windowHeight - 20 + "px"
	       });
	       $("#container").css({
	           "width": "100%",
	           "height": windowHeight - 205 + "px"
	       });
	       $("#userList").css({
	           "width": userList_width + "px",
	           "height": windowHeight - 83 + "px"
	       });
	       $("#profile").css({
	           "width": windowWidth - userList_width - 10 + "px",
	           "height": windowHeight - 83 + "px"
	       });
	       $("#userList").css({
	           "left": "0px"
	       });
	       $("#homepageTitle").css({
	           "left": "0px",
	           "top": "0px"
	       });
	       $(".jspContainer").css({
	           "height": "100%"
	       });
	       $("#logo").css({
	           "width": windowWidth / 4 + "px",
	           "height": windowWidth / 4 + "px"
	       });
	       $("#logo").css({
	           "left": (windowWidth - userList_width - 10) / 2 -
	               windowWidth / 8 + "px",
	           "top": (windowHeight - 83) / 2 - windowWidth / 8 +
	               "px"
	       });
	   });
