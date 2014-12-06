var pageId = '815157038515764';
var appId = '1480115835608916';
var controller = {};
var model = {};
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
        model.loginCallback();
        model.displayHeader();
    });
});

// Function get called every time login/logout button is pressed
// If user is logout than it displayed alert to login
// Else call function to display the user
model.loginCallback = function (){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            model.displayMe();
            model.displayDeveloper();
            $('#fblogin').addClass('dropdown').hide();
            $('#user').show();
        } else {
            $('#user').hide();
            $('#fblogin').removeClass('dropdown').show();
        }
    });
};

// Show the header with information from the facebook page; including name, description and cover image
model.displayHeader = function () {
    FB.api('/'+pageId, 'get', function(response) {
        if (response && !response.error) {
            $('#title').text(response.name);
            $('#description').text(response.description);
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

// Show the facebook name, profile picture and link of the developer
model.displayDeveloper = function () {
    var id = '780653805331955';
    FB.api('/'+id+'?fields=link,name', 'get', function(response) {
        if (response && !response.error) {
            var developer = response;
            FB.api('/'+id+'/picture?redirect=false&type=large', 'get', function(response) {
                if (response && !response.error) {
                    var htmlString = '<a href="'+developer.link+'"><h2>'+developer.name+'</h2></a><a href="'+developer.link+'"><img src="'+response.data.url+'" alt="'+developer.name+'"></a><h3>App Developer</h3>';
                    $('#developer').html(htmlString);
                }
            });
        }
    });
};
