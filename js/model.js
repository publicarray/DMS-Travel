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
        $('.header').show();
        if (response.status === 'connected') {
            $('#alertText').text('Connected');
            $('#alertBody').hide();
            $('.alert').delay(1500).fadeOut(2000);
            $('.splash').fadeOut(2000);
            displayPage();
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

function getAlbums() {
    FB.api('/'+pageId+'/albums', function (response) {
        if (response && !response.error) {
            var noAlbums = response.data.length;
            var currAlbum = 0;
            for (var i = 0; i < response.data.length; i++) {
                FB.api('/' + response.data[i].id + '/photos', function (response){
                    var data = response.data;
                    var totalImg = data.length;
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
        FB.api('/me/permissions', function (response) {
            var allowed = false;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].permission === 'publish_actions' && response.data[i].status === 'granted') {
                    allowed = true;
                }
            }
            if (allowed) {
                like(id, j);
            } else {
                FB.login(function(response) {
                    if (response.authResponse) {
                        like(id);
                    } else {
                        console.log('User canceled login or did not fully authorize the app.');
                    }
                }, { scope: 'publish_actions' });
            }
        });
    };
}

function like(id, j) {
    FB.api('/me?fields=id', function (response) {
        myId = response.id;
        FB.api(id+'/likes?fields=id', function (response) {
            var like = false;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id === myId) {
                    like = true;
                }
            }
            if (like) {
                alert('I know you like this photo, but unfortunatly Facebook only allows you to like it once.');
            } else {
                FB.api('/'+id+'/likes', 'POST', function (response) {
                    if (response.success === true) {
                        console.log('Like was successful');
                        var newLike = img[j].likes;
                        newLike++;
                        $('#'+j).next().text(newLike);
                    } else {
                        console.log(response.error.message);
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

function search() {
    var searchImg = [];
    var query = $('#searchTxt').val().toLowerCase().replace(/\s/g, "");
    for (var i = 0; i < img.length; i++) {
        if (img[i].title.toLowerCase().replace(/\s/g, "").indexOf(query) != -1) {
            searchImg.push(img[i]);
        }
    }
    displayPhotos(searchImg);
}
