function loginCallback(){FB.getLoginStatus(function(e){$(".header").show(),"connected"===e.status?($("#alertText").text("Connected"),$("#alertBody").hide(),$(".alert").delay(1500).fadeOut(2e3),$(".splash").fadeOut(2e3),displayPage(),getAlbums()):($(".alert").fadeIn(2e3),$(".splash").fadeIn(2e3),$("#alertText").text("Please Login"),$("#alertBody").show())})}function displayPage(){FB.api("/"+pageId,"get",function(e){e&&!e.error&&($(".bg").css("background-image",'url("'+e.cover.source+'")'),$("#title").text(e.name),$("#description").text(e.description))})}function getAlbums(){FB.api("/"+pageId+"/albums",function(e){if(e&&!e.error)for(var t=0;t<e.data.length;t++)FB.api("/"+e.data[t].id+"/photos",function(e){for(var t=e.data,a={},i=0,o=t.length,l=0;l<t.length;l++)for(var n=0;n<t[l].images.length;n++)if(320===t[l].images[n].height){var r=t[l].name;void 0===r&&(r=".");var s=t[l].likes;s=void 0===s?0:t[l].likes.data.length,a[i]={id:t[l].id,source:t[l].images[n].source,url:t[l].source,title:r,likes:s},photos.push(a[i]),i++,o===i&&(console.log(photos),displayPhotos(a,i))}})})}function displayPhotos(e,t){for(var a=0;t>a;a++)htmlStr+='<figure class="cell"><a href="'+e[a].url+'" data-lightbox="gallary" data-title="'+e[a].title+'"><img src="'+e[a].source+'" alt="'+e[a].title+'"></a><figcaption>'+e[a].title+" - Likes: "+e[a].likes+"</figcaption></figure>";$(".gallery").html(htmlStr)}var pageId="815157038515764",appId="1480115835608916",htmlStr="",photos=[];$(document).ready(function(){$.ajaxSetup({cache:!0}),$.getScript("//connect.facebook.net/en_UK/all.js",function(){FB.init({appId:appId,xfbml:!0,version:"v2.1"}),loginCallback()})});
//# sourceMappingURL=./model-min.js.map