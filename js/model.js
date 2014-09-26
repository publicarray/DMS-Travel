var objectId = '815157038515764';
var appId = '1480115835608916';
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
        // console.log(response.status);
        $('#alertText').text(response.status);
        $('.alert').fadeIn(2000);
        $('#splash').fadeIn(2000);
        $('#content').fadeOut(2000);
        if (response.status === 'connected') {
            $('#alertText').text('Connected');
            displayPage();
            $('.alert').delay(200).fadeOut(2000);
            $('#splash').delay(200).fadeOut(2000);
            $('#content').delay(1000).fadeIn(2000);
        } else {
            $('#alertText').text('Please Login');
            $('#alertBody').fadeIn(500);
        }
    });
}

function testAPI() {
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }

function displayPage() {
    FB.api('/'+objectId, 'get', function(response) {
        $('.bg').css('background-image', 'url("'+response.cover.source+'")');
        $('#description').text(response.description);
        console.log(response);
    });
    testAPI();
}

// function getAvatarURL(id) {
//     return 'https://graph.facebook.com/' + id + '/picture?type=square';
// };

// function APIcall(id) {
//      /* make the API call */
//     FB.api('/' + id, function(response) {
//         if (response && !response.error) {
//             /* handle the result */
//         }
//     });
// }
