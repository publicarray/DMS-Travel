var pageId = '815157038515764';
var appId = '1480115835608916';
var controller = {};
var model = {};
var img = [];
// Load the facebook js SDK v2.1 asynchronously
$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: appId,
          xfbml: true,
          version: 'v2.4',
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
        $('#splash').delay(1500).fadeOut(2000);
        model.displayHeader();
        model.getAlbums();
    });
};

// Show the header with information from the facebook page; including name, description and cover image
model.displayHeader = function() {
    FB.api('/'+pageId+'?fields=name,cover', 'get', function(response) {
        if (response && !response.error) {
            console.log(response);
            $('#bg').css('background-image', 'url("'+response.cover.source+'")');
            $('#title').text(response.name);
        } else {
            console.error(response.error.message);
        }
    });
};

// Show profile picture and name of the login user
model.displayMe = function () {
    FB.api('/me?fields=name', 'get', function(response) {
        if (response && !response.error) {
            console.log(response);
            var name = response.name;
            FB.api('/me/picture?redirect=false&type=square', 'get', function(response) {
                if (response && !response.error) {
                    $('#user').html('<figure><img src="'+response.data.url+'"><figcaption>'+name+'</figcaption></figure>');
                } else {
                    console.error(response.error.message);
                }
            });
        } else {
            console.error(response.error.message);
        }
    });
};

// Grab all albums from page. Than get the photos for all albums and push the information to a global img[] array
// When all albums are processed than call displayPhotos() and likeBtn() functions in home-controller.js
model.getAlbums = function () {
    FB.api('/'+pageId+'/albums', function (response) {
        if (response && !response.error) {
            console.log(response);
            var noAlbums = response.data.length;
            var currAlbum = 0;
            for (var i = 0; i < response.data.length; i++) {
                FB.api('/' + response.data[i].id + '/photos?fields=images', function (response){
                    if (response && !response.error) {
                        console.log(response);
                        var data = response.data;
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i].images.length; j++) {
                                if (data[i].images[j].height === 320){
                                    var title = data[i].name;
                                    if (title === undefined) {
                                        title = '';
                                    }
                                    var likes = data[i].likes;
                                    if (likes === undefined) {
                                        likes = 0;
                                    } else {
                                        likes = data[i].likes.data.length;
                                    }
                                    img.push({id: data[i].id, source: data[i].images[j].source, url: data[i].images[0].source, title: title, likes: likes,});
                                }
                            }
                        }
                        currAlbum++;
                        if (currAlbum === noAlbums) {
                            controller.displayPhotos(img);
                            controller.likeBtn(img);
                        }
                    } else {
                        console.error(response.error.message);
                    }
                });
            }
        } else {
            console.error(response.error.message);
        }
    });
};

// Returns a function. Grab user's permissions and if needed ask for publish_actions. Than call like() function
model.askPermissionToLike = function (id, j) {
    return function(event) {
        console.log('likeBtn pressed');
        FB.api('/me/permissions', function (response) {
            var allowed = false;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].permission === 'publish_actions' && response.data[i].status === 'granted') {
                    console.log('User has required permissions');
                    model.like(id, j);
                    allowed = true;
                }
            }
            if (!allowed) {
                console.log('User does not have required permissions');
                console.log('Asking for additional permissions...');
                FB.login(function (response) {
                    if (response.authResponse) {
                        model.like(id, j);
                        console.log('Got access token');

                    } else {
                        // very unlikely, means user is not logged in/ not authorized app.
                        console.log('User canceled login or did not authorize the app.');
                    }
                }, {scope: 'publish_actions' });
            }
        });
    };
};

// Grab user id and compare to the id's of the likes on the photo
// If match than alert user that the photo was already liked
// Else like the photo and increase like counter on that image
model.like = function (id, j) {
    FB.api('/me?fields=id', function (response) {
        var myId = response.id;
        console.log('Grabbing user ID: ' +myId);
        FB.api(id+'/likes?fields=id', function (response) {
            var liked = false;
            console.log('Checking if previously liked...');
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id === myId) {
                    console.log('alert user');
                    alert('I know you like this photo, but unfortunately Facebook only allows you to like it once.');
                    liked = true;
                }
            }
            if (!liked) {
                console.log('Liking...');
                FB.api('/'+id+'/likes', 'POST', function (response) {
                    if (response.success === true) {
                        console.log('Like was successful');
                        var newLike = img[j].likes;
                        newLike++;
                        $('#'+j).next().text(newLike);
                    } else {
                        console.log('An error occurred: ' + response.error.message);
                        console.log(response);
                    }
                });
            }
        });
    });
};
