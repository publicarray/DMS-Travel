var pageId="815157038515764",appId="1480115835608916",controller={},model={},img=[];$(document).ready(function(){$.ajaxSetup({cache:!0}),$.getScript("//connect.facebook.net/en_US/sdk.js",function(){FB.init({appId:appId,xfbml:!0,version:"v2.8"}),model.loginCallback(),$("#splash").delay(1500).fadeOut(2e3)})}),model.loginCallback=function(){FB.getLoginStatus(function(e){"connected"===e.status?(model.displayMe(),$("#fblogin").addClass("dropdown").hide(),$("#user").show(),model.displayHeader(),model.getAlbums()):($("#user").hide(),$("#fblogin").removeClass("dropdown").show())})},model.displayHeader=function(){FB.api("/"+pageId+"?fields=name,cover","get",function(e){e&&!e.error?(console.log(e),$("#bg").css("background-image",'url("'+e.cover.source+'")'),$("#title").text(e.name)):console.error(e.error.message)})},model.displayMe=function(){FB.api("/me?fields=name","get",function(e){if(e&&!e.error){console.log(e);var o=e.name;FB.api("/me/picture?redirect=false&type=square","get",function(e){e&&!e.error?$("#user").html('<figure><img src="'+e.data.url+'"><figcaption>'+o+"</figcaption></figure>"):console.error(e.error.message)})}else{console.error(e.error.message)}})},model.getAlbums=function(){FB.api("/"+pageId+"/albums",function(e){if(e&&!e.error){console.log(e);for(var o=e.data.length,s=0,i=0;i<e.data.length;i++){FB.api("/"+e.data[i].id+"/photos?fields=images,name,likes",function(e){if(e&&!e.error){console.log(e);for(var i=e.data,l=0;l<i.length;l++){for(var r=0;r<i[l].images.length;r++){if(320===i[l].images[r].height){var n=i[l].name;void 0===n&&(n="");var a=i[l].likes;a=void 0===a?0:i[l].likes.data.length,img.push({id:i[l].id,source:i[l].images[r].source,url:i[l].images[0].source,title:n,likes:a})}}}s++,s===o&&(controller.displayPhotos(img),controller.likeBtn(img))}else{console.error(e.error.message)}})}}else{console.error(e.error.message)}})},model.askPermissionToLike=function(e,o){return function(){console.log("likeBtn pressed"),FB.api("/me/permissions",function(s){for(var i=!1,l=0;l<s.data.length;l++){"publish_actions"===s.data[l].permission&&"granted"===s.data[l].status&&(console.log("User has required permissions"),model.like(e,o),i=!0)}i||(console.log("User does not have required permissions"),console.log("Asking for additional permissions..."),FB.login(function(s){s.authResponse?(model.like(e,o),console.log("Got access token")):console.log("User canceled login or did not authorize the app.")},{scope:"publish_actions"}))})}},model.like=function(e,o){FB.api("/me?fields=id",function(s){var i=s.id;console.log("Grabbing user ID: "+i),FB.api(e+"/likes?fields=id",function(s){var l=!1;console.log("Checking if previously liked...");for(var r=0;r<s.data.length;r++){s.data[r].id===i&&(console.log("alert user"),alert("I know you like this photo, but unfortunately Facebook only allows you to like it once."),l=!0)}l||(console.log("Liking..."),FB.api("/"+e+"/likes","POST",function(e){if(e.success===!0){console.log("Like was successful");var s=img[o].likes;s++,$("#"+o).next().text(s)}else{console.log("An error occurred: "+e.error.message),console.log(e)}}))})})};