var objectId = '815157038515764'
var appId = '1480115835608916'
window.fbAsyncInit = function() {
    FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.1'
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getAvatarURL(id) {
    return 'https://graph.facebook.com/' + id + '/picture?type=square';
};

function APIcall(id) {}
    /* make the API call */
    FB.api("/{"id"}", function(response) {
        if (response && !response.error) {
            /* handle the result */
        }
    });
}
