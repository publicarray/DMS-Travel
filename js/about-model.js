var pageId = '815157038515764';
var appId = '1480115835608916';
var img = [];
// Load the SDK asynchronously
$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
        FB.init({
          appId: appId,
          xfbml: true,
          version: 'v2.1',
        });
        // process login status
        loginCallback();
    });
});

function loginCallback(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            $('#alertText').text('Connected');
            $('#alertBody').hide();
            $('.alert').delay(1500).fadeOut(2000);
            $('.splash').fadeOut(2000);
            displayHeader();
            displayMe();
            displayDeveloper();
        } else {
            $('.alert').fadeIn(2000);
            $('.splash').fadeIn(2000);
            $('#alertText').text('Please Login');
            $('#alertBody').show();
        }
    });
}

function displayHeader() {
    FB.api('/'+pageId, 'get', function(response) {
        if (response && !response.error) {
            $('.bg').css('background-image', 'url("'+response.cover.source+'")');
            // $('#title').text(response.name);
            $('#description').text(response.description);
        }
    });
}

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

function displayDeveloper() {
    var id = '780653805331955'
    FB.api('/'+id+'?fields=link,name', 'get', function(response) {
        if (response && !response.error) {
            var developer = response;
            FB.api('/'+id+'/picture?redirect=false&type=large', 'get', function(response) {
                if (response && !response.error) {
                    var htmlString = '<a href="'+developer.link+'"><h2>'+developer.name+'</h2></a><h3>App Developer<h3><a href="'+developer.link+'"><img src="'+response.data.url+'" alt="'+developer.name+'"></a>';
                    $('#developer').html(htmlString);
                }
            });
        }
    });
}
