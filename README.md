**Note: Due to Facebook's API update it is no longer possible to get public information without an access token (Login).**

**Another update from Facebook:**
>This account has enhanced targeting data set to off. We are removing the opt out setting, effective October 15. Note that data received through the use of our pixel and mobile app events has not been used for targeting to date, and we do not have plans to do so beyond small-scale tests. If we start using this data to improve ad targeting, we will ensure that this data makes up only a small percentage of the inputs into each targeting segment. You can also remove the Facebook pixel, app events and Social Plugins from your websites and apps before the effective date.

<hr>

# DMS-Travel

The intention of this repository is to demonstrate the use of Facebook's API and jQuery.

DMS Travel is a mock travel/holiday company. We provide travel-related services such as tour arrangement, airline arrangement, transfer, hotel accommodation, visa processing assistance etc. As travel partners, we aim to address all the travel needs and requirements of our clients from the start until the end of their journey. This will be our guiding principle - a dedicated service in giving travelers a worthy travel experience.

# 3 Principles Of Web Design

## Simplicity & Flat design
The website only includes necessary elements to allow ease of use. Is straight to the point and clear in its functions. There is no clutter and elements have room to breathe (whitespace). To keep the site so simple I choose a flat design style. I used minimal shadows to add some depth to the navigation and enhance readability of text. A sans-serif font was used for buttons and headings to follow the theme of simplicity.

## Emphasis
The website uses emphasis to give an object more importance. For example the header is the biggest part of the page and is full of color (from the image). It is also near the top after the navigation bar. It tells the viewer what the page is about. The viewers first look usually goes to the header.

## Alignment
The Website uses alignment to associate similar or related items next to each other. For example the like button and image description relates to an image and are thus positioned in close proximity to it. The images are positioned in an invisible grid to make them separate entities.

# Attributions
The photos where taken from [pixabay.com](http://pixabay.com/) and are licenced under [CC0 Public Domain](http://creativecommons.org/publicdomain/zero/1.0/deed.en)

# Problems
For liking a photo that is hosted on Facebook one needs the publish_actions. The Facebook [developer docs](https://developers.facebook.com/docs/graph-api/reference/v2.1/object/likes) states: `A user access token with publish_actions permission can be used to publish new likes.`

So I submitted a review for the permission. The response I got from the review team was that I should use the [Like plugin](https://developers.facebook.com/docs/plugins/like-button/). However the like plugin doesn't allow the like to be viewable on the Facebook page's photo. On my next submission I explained this. The response was that they could not reproduce the steps I submitted. The reviewer could not see the like on the timeline. To make it more clear I made a [screencast](http://quick.as/omwai4ew) to help the review team. The response on my 3rd submission: `Since your website is not publishing a post onto a user's timeline, you do not need to submit with the publish_actions permission. Thank you!`
