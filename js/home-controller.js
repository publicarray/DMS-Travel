// Display the contents of img[] array and adding HTML tags
controller.displayPhotos = function (img) {
    var htmlStr = '';
    // console.log(img);
    for (var i = 0; i < img.length; i++) {
        htmlStr += '<figure class="cell"><a href="' + img[i].url + '" data-lightbox="gallary" data-title="' + img[i].title + '">
        <img src="' + img[i].source + '" alt="' + img[i].title + '"></a><figcaption><span class="left">' + img[i].title + '</span>
        <span class="right"><img id="' + i + '" src="img/fbl.png" title="Like"><span>' + img[i].likes + '</span></span></figcaption></figure>';
    }
    $('#gallery').html(htmlStr);
};

// Add a Event Handler (askPermissionToLike()) to every like button
controller.likeBtn = function(img) {
    for (var i = 0; i < img.length; i++) {
        var id = img[i].id;
        $('#'+i).click(model.askPermissionToLike(id, i));
    }
};

// Hides & Shows facebook logout button when #user is clicked
controller.toggleDropdown = function() {
    $('#dropdown').toggle();
};

// When user presses the RETURN key perform search()
$('input').keypress(function(e) {
    if (e.which === 13) {
        controller.search();
    }
});

// for responsive webdesign
// http://gomakethings.com/javascript-resize-performance/
var resizeTimer;
controller.resizeFunction = function() {
    console.log('Checked if window size is smaller than < 760');
    if ($(window).width() < 760) {
        $('#dropdown').hide();
    }
};
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(controller.resizeFunction, 200);
});
controller.resizeFunction();

var searchImg = [];
// Grab user input from #searchTxt and perform search in img[] array and push the output into searchImg[].
// Than call displayPhotos() and orderBy() to show results and order them.
controller.search = function () {
    searchImg = [];
    var query = $('#searchTxt').val().toLowerCase().replace(/\s/g, "");
    for (var i = 0; i < img.length; i++) {
        if (img[i].title.toLowerCase().replace(/\s/g, "").indexOf(query) !== -1) {
            searchImg.push(img[i]);
        }
    }
    controller.displayPhotos(searchImg);
    controller.orderBy(document.getElementById('sort'));
};

// Check if searchImg[] array is not empty (bigger than 0)
// If yes than copy searchImg[] to orderByImg[]
// Else copy img[] to orderByImg[]
// Than grab the selected index of #sort. Depending of the index order array.
controller.orderBy = function (sort){
     var orderByImg = [];
    if (searchImg.length > 0){
        orderByImg = searchImg;
    } else {
        orderByImg = img;
    }
    switch (sort.selectedIndex) {
        // Sort orderByImg[] array by likes ascending and call displayPhotos()
        case 1:
            var sortImg = orderByImg.sort(function(a, b) {
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
            });
            controller.displayPhotos(sortImg)
            controller.likeBtn(sortImg);
            break;
        // Sort orderByImg[] array by likes descending and call displayPhotos()
        case 2:
            var sortImg = orderByImg.sort(function(a, b) {
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
            });
            controller.displayPhotos(sortImg)
            controller.likeBtn(sortImg);
            break;
        // Sort orderByImg[] array by title ascending and call displayPhotos()
        case 3:
            var sortImg = orderByImg.sort(function(a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title === b.title) {
                    return b.likes - a.likes;
                }
            });
            controller.displayPhotos(sortImg)
            controller.likeBtn(sortImg);
            break;
        // Sort orderByImg[] array by title descending and call displayPhotos()
        case 4:
            var sortImg = orderByImg.sort(function(a, b) {
                if (b.title < a.title) {
                    return -1;
                }
                if (b.title > a.title) {
                    return 1;
                }
                if (b.title === a.title) {
                    return a.likes - b.likes;
                }
            });
            controller.displayPhotos(sortImg)
            controller.likeBtn(sortImg);
            break;
    }
};
