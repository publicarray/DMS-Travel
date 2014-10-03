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
