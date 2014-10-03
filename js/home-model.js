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
            displayPage();
            displayMe();
            getAlbums();
        } else {
            $('.alert').fadeIn(2000);
            $('.splash').fadeIn(2000);
            $('#alertText').text('Please Login');
            $('#alertBody').show();
        }
    });
}

function displayPage() {
    FB.api('/'+pageId, 'get', function(response) {
        if (response && !response.error) {
            $('.bg').css('background-image', 'url("'+response.cover.source+'")');
            $('#title').text(response.name);
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

function getAlbums() {
    FB.api('/'+pageId+'/albums', function (response) {
        if (response && !response.error) {
            var noAlbums = response.data.length;
            var currAlbum = 0;
            for (var i = 0; i < response.data.length; i++) {
                FB.api('/' + response.data[i].id + '/photos', function (response){
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
                                img.push({id: data[i].id, source: data[i].images[j].source, url: data[i].source, title: title, likes: likes,});
                            }
                        }
                    }
                    currAlbum++;
                    if (currAlbum === noAlbums) {
                        displayPhotos(img);
                        likeBtn(img);
                    }
                });
            }
        }
    });
}

function displayPhotos(img) {
    var htmlStr = '';
    console.log(img);
    for (var i = 0; i < img.length; i++) {
        htmlStr += '<figure class="cell"><a href="' + img[i].url + '" data-lightbox="gallary" data-title="' + img[i].title + '"><img src="' + img[i].source + '" alt="' + img[i].title + '"></a><figcaption>' + img[i].title + '<br><img id="' + i + '" src="img/fbl.png" title="Like"><span>' + img[i].likes + '</span></figcaption></figure>';
    }
    $('.gallery').html(htmlStr);
}

function likeBtn(img) {
    for (var i = 0; i < img.length; i++) {
        var id = img[i].id;
        $('#'+i).click(askPermissionToLike(id, i));
    }
}

function askPermissionToLike(id, j) {
    return function(event) {
        console.log('likeBtn pressed');
        FB.api('/me/permissions', function (response) {
            var allowed = false;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].permission === 'publish_actions' && response.data[i].status === 'granted') {
                    console.log('User has required permissions');
                    like(id, j);
                    allowed = true;
                }
            }
            if (!allowed) {
                console.log('User does not have required permissions');
                console.log('Asking for additional permissions...');
                FB.login(function (response) {
                    if (response.authResponse) {
                        like(id, j);
                        console.log('Got access token');

                    } else {
                        // unlikely, means user is not logged in/ not authorized app.
                        console.log('User canceled login or did not authorize the app.');
                    }
                }, {scope: 'publish_actions' });
            }
        });
    };
}

function like(id, j) {
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
}

$('input').keypress(function(e) {
    if (e.which === 13) {
        search();
    }
});

