	var inActiveTime = 5;
	var optionSelected = false;
	$(document).ready(function() {
	    var windowWidth = $(window).width();
	    var windowHeight = $(window).height();
	    var middle_axis = windowWidth / 2;
	    var center_axis = windowHeight / 2 - windowHeight / 10;
	    var logo_size = 400 * (windowWidth / 1920);
	    var top_logo_size = 40;
	    var loginSelect_size = 40 * (windowWidth / 1920);
	    $("#loginPanel").css({
	        "display": "none"
	    });
	    $("#signupPanel").css({
	        "display": "none"
	    });
	    $("#logo").css({
	        "width": logo_size + "px",
	        "height": logo_size + "px"
	    });
	    $("#topLogo").css({
	        "width": top_logo_size * 2 + "px",
	        "height": top_logo_size + "px"
	    });
	    $("#loginSelect").css({
	        "width": loginSelect_size * 5 + "px",
	        "height": loginSelect_size + "px"
	    });
	    $("#signupSelect").css({
	        "width": loginSelect_size * 5 + "px",
	        "height": loginSelect_size + "px"
	    });
	    $("header").css({
	        "height": windowHeight - 120 + "px"
	    });
	    $("#topBanner").css({
	        "top": 17 + "px"
	    });
	    $("#botBanner").css({
	        "top": windowHeight - 20 + "px"
	    });
	    $("#logo").css({
	        "top": center_axis - windowHeight / 20 - logo_size / 2 +
	            "px",
	        "left": middle_axis - logo_size / 2 + "px"
	    });
	    $("#topLogo").css({
	        "top": 0 - top_logo_size + "px",
	        "left": 20 + "px"
	    });
	    $("#loginSelect").css({
	        "top": center_axis - windowHeight / 20 +
	            loginSelect_size * 6 + "px",
	        "left": middle_axis - loginSelect_size * 6 + "px"
	    });
	    $("#signupSelect").css({
	        "top": center_axis - windowHeight / 20 +
	            loginSelect_size * 7 + "px",
	        "left": middle_axis + loginSelect_size + "px"
	    });
	    $("#loginPanel").css({
	        "top": center_axis - 60 + windowHeight / 20 + "px"
	    });
	    $("#signupPanel").css({
	        "top": center_axis - 60 + windowHeight / 20 + "px"
	    });
	    $("#userNameInput").css({
	        "top": 30 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#pwdInput").css({
	        "top": 90 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#loginButton").css({
	        "top": 140 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel1").css({
	        "top": 30 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel2").css({
	        "top": 90 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#warn1").css({
	        "top": "0px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#newUserNameInput").css({
	        "top": 30 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#newPwdInput").css({
	        "top": 90 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#newPwdConfirmInput").css({
	        "top": 150 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#signUpButton").css({
	        "top": 200 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel3").css({
	        "top": 30 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel4").css({
	        "top": 90 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel5").css({
	        "top": 150 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#warn2").css({
	        "top": "0px",
	        "left": middle_axis + logo_size / 8 + "px"
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
	        $("#loginSelect").css({
	            "-webkit-transition": "top 2s, left 2s, width 2s, height 2s"
	        });
	        $("#loginSelect").css({
	            "-moz-transition": "top 2s, left 2s, width 2s, height 2s"
	        });
	        $("#loginSelect").css({
	            "transition": "top 2s, left 2s, width 2s, height 2s"
	        });
	        $("#signupSelect").css({
	            "-webkit-transition": "top 2s, left 2s, width 2s, height 2s"
	        });
	        $("#signupSelect").css({
	            "-moz-transition": "top 2s, left 2s, width 2s, height 2s"
	        });
	        $("#signupSelect").css({
	            "transition": "top 2s, left 2s, width 2s, height 2s"
	        });
	        $("#loginPanel").css({
	            "-webkit-transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#loginPanel").css({
	            "-moz-transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#loginPanel").css({
	            "transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#topBanner").css({
	            "transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#topBanner").css({
	            "-moz-transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#topBanner").css({
	            "transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#topLogo").css({
	            "transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#topLogo").css({
	            "-moz-transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#topLogo").css({
	            "transition": "top 1s, left 1s, width 1s, height 1s"
	        });
	        $("#logo").css({
	            "top": center_axis - logo_size / 2 + "px"
	        });
	        $("#logo").fadeTo(3000, 1);
	        //$("#title").css({"top": center_axis - logo_size/2 + "px"});
	        //$("#title").fadeTo(3000, 1);
	        $("#loginSelect").css({
	            "top": center_axis + loginSelect_size * 7 +
	                "px"
	        });
	        $("#loginSelect").fadeTo(3000, 1);
	        $("#signupSelect").css({
	            "top": center_axis + loginSelect_size * 7 +
	                "px"
	        });
	        $("#signupSelect").fadeTo(3000, 1);
	    }, 200);
	    $("#loginSelect").click(function() {
	        optionSelected = true;
	        var windowWidth = $(window).width();
	        var windowHeight = $(window).height();
	        var logo_size = 150 * (windowWidth / 1920);
	        var middle_axis = windowWidth / 2;
	        var center_axis = windowHeight / 2 - windowHeight / 10;
	        var top_logo_size = 40;
	        $("#logo").css({
	            "top": center_axis - logo_size * 2 + "px"
	        });
	        $("#logo").stop();
	        $("#logo").fadeTo(500, 0);
	        $("#loginSelect").stop();
	        $("#loginSelect").fadeTo(500, 0);
	        $("#loginSelect").css({
	            "top": 0 - logo_size + "px"
	        });
	        $("#loginSelect").css({
	            "display": "none"
	        });
	        $("#signupSelect").stop();
	        $("#signupSelect").fadeTo(500, 0);
	        $("#signupSelect").css({
	            "top": 0 - logo_size + "px"
	        });
	        $("#signupSelect").css({
	            "display": "none"
	        });
	        $("#loginPanel").fadeTo(500, 1);
	        $("#loginPanel").css({
	            "display": "inline"
	        });
	        $("#loginPanel").css({
	            "top": center_axis + windowHeight / 10 -
	                60 + "px"
	        });
	        $("#topLogo").css({
	            "top": 5 + "px",
	            "left": 20 + "px"
	        });
	        $("#topBanner").css({
	            "top": "50px"
	        });
	    });
	    $("#signupSelect").click(function() {
	        optionSelected = true;
	        var windowWidth = $(window).width();
	        var windowHeight = $(window).height();
	        var logo_size = 150 * (windowWidth / 1920);
	        var middle_axis = windowWidth / 2;
	        var center_axis = windowHeight / 2 - windowHeight / 10;
	        var top_logo_size = 40;
	        $("#logo").css({
	            "top": center_axis - logo_size * 2 + "px"
	        });
	        $("#logo").stop();
	        $("#logo").fadeTo(500, 0);
	        $("#loginSelect").stop();
	        $("#loginSelect").fadeTo(500, 0);
	        $("#loginSelect").css({
	            "top": 0 - logo_size + "px"
	        });
	        $("#loginSelect").css({
	            "display": "none"
	        });
	        $("#signupSelect").stop();
	        $("#signupSelect").fadeTo(500, 0);
	        $("#signupSelect").css({
	            "top": 0 - logo_size + "px"
	        });
	        $("#signupSelect").css({
	            "display": "none"
	        });
	        $("#signupPanel").fadeTo(500, 1);
	        $("#signupPanel").css({
	            "display": "inline"
	        });
	        $("#signupPanel").css({
	            "top": center_axis + windowHeight / 10 -
	                100 + "px"
	        });
	        $("#topLogo").css({
	            "top": 5 + "px",
	            "left": 20 + "px"
	        });
	        $("#topBanner").css({
	            "top": "50px"
	        });
	    });
	});
	$(window).resize(function() {
	    var windowWidth = $(window).width();
	    var windowHeight = $(window).height();
	    var middle_axis = windowWidth / 2;
	    var center_axis = windowHeight / 2 - windowHeight / 10;
	    var logo_size = 400 * (windowWidth / 1920);
	    var loginSelect_size = 40 * (windowWidth / 1920);
	    var top_logo_size = 40;
	    $("#logo").css({
	        "width": logo_size + "px",
	        "height": logo_size + "px"
	    });
	    $("#loginSelect").css({
	        "width": loginSelect_size * 5 + "px",
	        "height": loginSelect_size + "px"
	    });
	    $("#signupSelect").css({
	        "width": loginSelect_size * 5 + "px",
	        "height": loginSelect_size + "px"
	    });
	    $("#logo").css({
	        "top": center_axis - logo_size / 2 + "px",
	        "left": middle_axis - logo_size / 2 + "px"
	    });
	    $("#loginSelect").css({
	        "top": center_axis + loginSelect_size * 7 + "px",
	        "left": middle_axis - loginSelect_size * 6 + "px"
	    });
	    $("#signupSelect").css({
	        "top": center_axis + loginSelect_size * 7 + "px",
	        "left": middle_axis + loginSelect_size + "px"
	    });
	    $("#loginPanel").css({
	        "top": center_axis + windowHeight / 10 - 60 + "px"
	    });
	    $("#signupPanel").css({
	        "top": center_axis + windowHeight / 10 - 100 + "px"
	    });
	    $("#userNameInput").css({
	        "top": 30 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#pwdInput").css({
	        "top": 90 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#loginButton").css({
	        "top": 140 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel1").css({
	        "top": 30 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel2").css({
	        "top": 90 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#warn1").css({
	        "top": "0px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#newUserNameInput").css({
	        "top": 30 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#newPwdInput").css({
	        "top": 90 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#newPwdConfirmInput").css({
	        "top": 150 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#signUpButton").css({
	        "top": 200 + "px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel3").css({
	        "top": 30 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel4").css({
	        "top": 90 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#inputLabel5").css({
	        "top": 150 + "px",
	        "right": middle_axis + logo_size / 8 + "px"
	    });
	    $("#warn2").css({
	        "top": "0px",
	        "left": middle_axis + logo_size / 8 + "px"
	    });
	    $("#topLogo").css({
	        "left": 20 + "px"
	    });
	    $("#topLogo").css({
	        "width": top_logo_size * 2 + "px",
	        "height": top_logo_size + "px"
	    });
	    $("header").css({
	        "height": windowHeight - 120 + "px"
	    });
	    if (optionSelected) {
	        $("#topBanner").css({
	            "top": 50 + "px"
	        });
	    } else {
	        $("#topBanner").css({
	            "top": 17 + "px"
	        });
	    }
	    $("#botBanner").css({
	        "top": windowHeight - 20 + "px"
	    });
	})