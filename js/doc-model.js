var pageId = '815157038515764';
var appId = '1480115835608916';
var img = [];
// Load the facebook js SDK v2.1 asynchronously
$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
        FB.init({
          appId: appId,
          xfbml: true,
          version: 'v2.1',
        });
        // Display Content
        loginCallback();
    });
});

// Function get called every time login/logout button is pressed
// If user is logout than it displayed alert to login
// Else call function to display the user
function loginCallback(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            $('#alertText').text('Connected');
            $('#alertBody').hide();
            $('#alert').delay(1500).fadeOut(2000);
            $('#splash').fadeOut(2000);
            displayMe();
        } else {
            $('#alert').fadeIn(2000);
            $('#splash').fadeIn(2000);
            $('#alertText').text('Please Login');
            $('#alertBody').show();
        }
    });
}

// Show profile picture and name of the login user
function displayMe() {
    FB.api('/me?fields=name', 'get', function(response) {
        if (response && !response.error) {
            var name = response.name;
            FB.api('/me/picture?redirect=false&type=square', 'get', function(response) {
                if (response && !response.error) {
                    $('#user').html('<figure><img src="'+response.data.url+'"><figcaption>'+name+'</figcaption></figure>');
                }
            });
        }
    });
}

// controller.js

// Hides & Shows facebook logout button when #user is clicked
function toggleDropdown() {
    $('#dropdown').toggle();
}

// for responsive webdesign
// http://gomakethings.com/javascript-resize-performance/
var resizeTimer;
function resizeFunction() {
    console.log('Checked if window size is smaller than < 760');
    if ($(window).width() < 760) {
        $('#dropdown').hide();
    }
}
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeFunction, 200);
});
resizeFunction();
