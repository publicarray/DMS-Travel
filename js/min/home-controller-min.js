function search(){searchImg=[];for(var e=$("#searchTxt").val().toLowerCase().replace(/\s/g,""),t=0;t<img.length;t++)-1!==img[t].title.toLowerCase().replace(/\s/g,"").indexOf(e)&&searchImg.push(img[t]);displayPhotos(searchImg),orderBy(document.getElementById("sort")),console.log(document.getElementById("sort"))}function orderBy(e){var t=[];switch(t=searchImg.length>0?searchImg:img,e.selectedIndex){case 1:displayPhotos(t.sort(function(e,t){return e.likes-t.likes!==0?e.likes-t.likes:e.title<t.title?-1:e.title>t.title?1:void 0}));break;case 2:displayPhotos(t.sort(function(e,t){return t.likes-e.likes!==0?t.likes-e.likes:e.title<t.title?-1:e.title>t.title?1:void 0}));break;case 3:displayPhotos(t.sort(function(e,t){return e.title<t.title?-1:e.title>t.title?1:e.title===t.title?t.likes-e.likes:void 0}));break;case 4:displayPhotos(t.sort(function(e,t){return t.title<e.title?-1:t.title>e.title?1:t.title===e.title?e.likes-t.likes:void 0}))}}var searchImg=[];