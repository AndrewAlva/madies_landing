// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
	// Activate scrollTop
    document.getElementById('backTop').addEventListener('click', function(){
    	toTop();
    });
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");

    // Animiation frame loop at 60fps to enable "toTop()" function
    RAF.init();

    var FruitsSlider = new Carousel('fruits-slider');
    FruitsSlider.init();
}