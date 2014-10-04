// Display the contents of img[] array and adding HTML tags
function displayPhotos(img) {
    var htmlStr = '';
    console.log(img);
    for (var i = 0; i < img.length; i++) {
        htmlStr += '<figure class="cell"><a href="' + img[i].url + '" data-lightbox="gallary" data-title="' + img[i].title + '"><img src="' + img[i].source + '" alt="' + img[i].title + '"></a><figcaption>' + img[i].title + '<br><img id="' + i + '" src="img/fbl.png" title="Like"><span>' + img[i].likes + '</span></figcaption></figure>';
    }
    $('#gallery').html(htmlStr);
}

// Add a Event Handler (askPermissionToLike()) to every like button
function likeBtn(img) {
    for (var i = 0; i < img.length; i++) {
        var id = img[i].id;
        $('#'+i).click(askPermissionToLike(id, i));
    }
}

// When user presses the RETURN key perform search()
$('input').keypress(function(e) {
    if (e.which === 13) {
        search();
    }
});

var searchImg = [];
// Grab user input from #searchTxt and perform search in img[] array and push the output into searchImg[].
// Than call displayPhotos() and orderBy() to show results and order them.
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
}

// Check if searchImg[] array is not empty (bigger than 0)
// If yes than copy searchImg[] to orderByImg[]
// Else copy img[] to orderByImg[]
// Than grab the selected index of #sort. Depending of the index order array.
function orderBy(sort){
     var orderByImg = [];
    if (searchImg.length > 0){
        orderByImg = searchImg;
    } else {
        orderByImg = img;
    }
    switch (sort.selectedIndex) {
        // Sort orderByImg[] array by likes ascending and call displayPhotos()
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
        // Sort orderByImg[] array by likes descending and call displayPhotos()
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
        // Sort orderByImg[] array by title ascending and call displayPhotos()
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
        // Sort orderByImg[] array by title descending and call displayPhotos()
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
