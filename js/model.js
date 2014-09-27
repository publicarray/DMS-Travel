var pageId = '815157038515764';
var appId = '1480115835608916';
var htmlStr = '';
var albums = [];
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
            for (var i = 0; i < response.data.length; i++) {
                FB.api('/' + response.data[i].id + '/photos', function (response){
                    var data = response.data;
                    var img = {};
                    var count = 0;
                    var totalImg = data.length;
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].images.length; j++) {
                            if (data[i].images[j].height === 320){
                                var title = data[i].name;
                                    if (title === undefined) {
                                        title = '.';
                                    }
                                img[count] = {source: data[i].images[j].source, url: data[i].source, title: title};
                                count++;
                                if (totalImg === count) {
                                    albums.push(img);
                                    console.log(albums);
                                    displayPhotos(img, count);
                                }
                            }
                        }
                    }
                });
            }
        }
    });
}

function displayPhotos(img, count) {
    for (var i = 0; i < count; i++) {
        htmlStr += '<figure class="cell"><a href="' + img[i].url + '" data-lightbox="gallary" data-title="' + img[i].title + '"><img src="' + img[i].source + '" alt="' + img[i].title + '"></a><figcaption>' + img[i].title + '</figcaption></figure>';
    }
    $('.gallery').html(htmlStr);
}
