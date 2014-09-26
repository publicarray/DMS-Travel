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
        console.log(response.status);
        $('#alertText').text(response.status);
        $('#splash').fadeIn(2000);
        $('#content').fadeOut(2000);
        if (response.status === 'connected') {
            FB.api('/'+objectId, 'get', function(response) {
                console.log(response);
                console.log(response.cover.source);
                console.log(response.description);
            });
            testAPI()
            $('#splash').fadeOut(2000);
            $('#content').fadeIn(2000);
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
