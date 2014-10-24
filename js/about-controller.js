// Hides & Shows facebook logout button when #user is clicked
controller.toggleDropdown = function () {
    $('#dropdown').toggle();
};

// for responsive webdesign
// http://gomakethings.com/javascript-resize-performance/
var resizeTimer;
controller.resizeFunction = function () {
    console.log('Checked if window size is smaller than < 760');
    if ($(window).width() < 760) {
        $('#dropdown').hide();
    }
};
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeFunction, 200);
});
controller.resizeFunction();
