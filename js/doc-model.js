/*globals FB:false */
var appId = '1480115835608916';
var controller = {};
var model = {};
// Load the facebook js SDK v2.1 asynchronously
$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/sdk.js', function(){
        FB.init({
          appId: appId,
          xfbml: true,
          version: 'v2.8',
        });
        // Display Content
        model.loginCallback();
    });
});

// Function get called every time login/logout button is pressed
// If user is logout than it displayed alert to login
// Else call function to display the user
model.loginCallback = function (){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            model.displayMe();
            $('#fblogin').addClass('dropdown').hide();
            $('#user').show();
        } else {
            $('#user').hide();
            $('#fblogin').removeClass('dropdown').show();
        }
    });
};

// Show profile picture and name of the login user
model.displayMe = function () {
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
};
