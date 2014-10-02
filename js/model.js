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
                    console.log('permission granted');
                    like(id, j);
                    allowed = true;
                }
            }
            if (!allowed) {
                console.log('Asking for additional permissions...');
                FB.login(function (response) {
                    if (response.authResponse) {
                        like(id, j);
                        console.log('Permissions set successfully');

                    } else {
                        console.log('User canceled login or did not fully authorize the app.');
                    }
                }, {scope: 'publish_actions' });
            }
        });
    };
}

function like(id, j) {
    FB.api('/me?fields=id', function (response) {
        var myId = response.id;
        console.log('grabbing user ID: ' +myId);
        FB.api(id+'/likes?fields=id', function (response) {
            var liked = false;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id === myId) {
                    console.log('alert user');
                    alert('I know you like this photo, but unfortunately Facebook only allows you to like it once.');
                    liked = true;
                }
            }
            if (!liked) {
                console.log('liking...');
                FB.api('/'+id+'/likes', 'POST', function (response) {
                    if (response.success === true) {
                        console.log('Like was successful');
                        var newLike = img[j].likes;
                        newLike++;
                        $('#'+j).next().text(newLike);
                    } else {
                        console.log('An error occurred:' + response.error.message);
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

// Controller.js
var searchImg = [];
function search() {
    searchImg = [];
    var query = $('#searchTxt').val().toLowerCase().replace(/\s/g, "");
    for (var i = 0; i < img.length; i++) {
        if (img[i].title.toLowerCase().replace(/\s/g, "").indexOf(query) !== -1) {
            searchImg.push(img[i]);
        }
    }
    displayPhotos(searchImg);
    orderBy(document.getElementById('sort'));
    console.log(document.getElementById('sort'));
}

function orderBy(n){
     var orderByImg = [];
    if (searchImg.length > 0){
        orderByImg = searchImg;
    } else {
        orderByImg = img;
    }
    switch (n.selectedIndex) {
        case 1:
            displayPhotos(orderByImg.sort(function(a, b) {
                if (a.likes - b.likes === 0) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                } else {
                    return a.likes - b.likes;
                }
            }));
            break;
        case 2:
            displayPhotos(orderByImg.sort(function(a, b) {
                if (b.likes - a.likes === 0) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                } else {
                    return b.likes - a.likes;
                }
            }));
            break;
        case 3:
            displayPhotos(orderByImg.sort(function(a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title === b.title) {
                    return b.likes - a.likes;
                }
            }));
            break;
        case 4:
            displayPhotos(orderByImg.sort(function(a, b) {
                if (b.title < a.title) {
                    return -1;
                }
                if (b.title > a.title) {
                    return 1;
                }
                if (b.title === a.title) {
                    return a.likes - b.likes;
                }
            }));
    }
}
