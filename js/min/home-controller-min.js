controller.displayPhotos=function(t){for(var e="",l=0;l<t.length;l++){e+='<figure class="cell"><a href="'+t[l].url+'" data-lightbox="gallary" data-title="'+t[l].title+'"><img src="'+t[l].source+'" alt="'+t[l].title+'"></a><figcaption><span class="left">'+t[l].title+'</span><span class="right"><img id="'+l+'" src="img/fbl.png" title="Like"><span>'+t[l].likes+"</span></span></figcaption></figure>"}$("#gallery").html(e)},controller.likeBtn=function(t){for(var e=0;e<t.length;e++){var l=t[e].id;$("#"+e).click(model.askPermissionToLike(l,e))}},controller.toggleDropdown=function(){$("#fblogin").toggle(),$(window).width()<760?$("#fblogin").removeClass("dropdown"):$("#fblogin").addClass("dropdown")},$("input").keypress(function(t){13===t.which&&controller.search()});var searchImg=[];controller.search=function(){searchImg=[];for(var t=$("#searchTxt").val().toLowerCase().replace(/\s/g,""),e=0;e<img.length;e++){img[e].title.toLowerCase().replace(/\s/g,"").indexOf(t)!==-1&&searchImg.push(img[e])}controller.displayPhotos(searchImg),controller.orderBy(document.getElementById("sort"))},controller.orderBy=function(t){var e=[];switch(e=searchImg.length>0?searchImg:img,t.selectedIndex){case 1:var l=e.sort(function(t,e){return t.likes-e.likes!==0?t.likes-e.likes:t.title<e.title?-1:t.title>e.title?1:void 0});controller.displayPhotos(l),controller.likeBtn(l);break;case 2:var l=e.sort(function(t,e){return e.likes-t.likes!==0?e.likes-t.likes:t.title<e.title?-1:t.title>e.title?1:void 0});controller.displayPhotos(l),controller.likeBtn(l);break;case 3:var l=e.sort(function(t,e){return t.title<e.title?-1:t.title>e.title?1:t.title===e.title?e.likes-t.likes:void 0});controller.displayPhotos(l),controller.likeBtn(l);break;case 4:var l=e.sort(function(t,e){return e.title<t.title?-1:e.title>t.title?1:e.title===t.title?t.likes-e.likes:void 0});controller.displayPhotos(l),controller.likeBtn(l)}};