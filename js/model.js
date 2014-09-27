var pageId = '815157038515764';
var appId = '1480115835608916';
var htmlStr = '';
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

function testAPI() {
    FB.api('/me', function(response) {
        if (response && !response.error) {
            console.log('Successful login for: ' + response.name);
        }
        console.log(response);
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
    // testAPI();
}
function getAlbums() {
    FB.api('/'+pageId+'/albums', function (response) {
        if (response && !response.error) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].id);
                FB.api('/' + response.data[i].id + '/photos', function (response){
                    var data = response.data;
                    console.log(data);
                    var img = [];
                    var count = 0;
                    var totalImg = data.length;
                    var thumSize = 5;
                    for (var i = 0; i < data.length; i++) {
                        var maxSize = data[i].images.length-1;
                        console.log(data[i].images[maxSize].source);
                        img[count] = {source: data[i].images[maxSize].source,};
                        count++;
                        if (totalImg === count) {
                            displayPhotos(img, count);
                        };
                    }
                });
            }
        }
    });
}

function displayPhotos(img, count) {
    console.log(img);
    console.log(count);
    // var htmlStr = '';
    console.log(htmlStr);
    for (var i = 0; i < count; i++) {
        htmlStr +='<figure class="cell"><a href="' + img[i].source + '" data-lightbox="gallary" data-title="' + '' + '"><img src="' + img[i].source + '" alt="' + '' + '" ></a><figcaption' + '' + '</figcaption></figure>';
    //     htmlStr += '<figure class="cell"><a href="' + img[i].url + '" data-lightbox="gallary" data-title="' + img[i].title + '"><img src="' + img[i].source + '" width="' + img[i].width + '" height="' + img[i].height + '" alt="' + img[i].title + '"></a><figcaption>' + img[i].title + '</figcaption></figure>';
    }
    // console.log(htmlStr);
    $('.gallery').html(htmlStr);
}

// function getPhotos(response) {
//     if (response && !response.error) {
//         console.log(response);
//         var img = [];
//         var count = 0;
//         var thumSize = 5;
//         var data = response.data;
//         for (var i = 0; i < data.length; i++) {
//             if (data.[i].images) {
//                 var maxSize = data.[i].images.length-1;
//                 // if (maxSize < thumSize){
//                 //     img[count].source = response.data[i].images[maxSize].source;
//                 //     count++;
//                 //     if (count === response.data.length){
//                 //         displayPhotos(img, count);
//                 //     }
//                 // } else {
//                 //     img[count].source = response.data[i].images[thumSize].source;
//                 //     count++;
//                 //     if (count === response.data.length){
//                 //         displayPhotos(img, count);
//                 //     }
//                 // }
//                 console.log(response.data[i].images[maxSize].source);

//                 // img[count].source = response.data[j].images[thumSize].source;
//                 console.log(maxSize);
//                 // console.log(img[count].source);
//                 // console.log(response.data.length);
//                 count++;
//                 if (count === response.data.length){
//                     // displayPhotos(img, count);
//                 }
//             }
//         }
//     }
// }

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
