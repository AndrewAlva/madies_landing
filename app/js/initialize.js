// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Do something
    deviceDetector.init();

    // Activate scrollTop
    var backTopTriggers = document.getElementsByClassName('backTop');
    for (var i = 0; i < backTopTriggers.length; i++) {
    	backTopTriggers[i].addEventListener('click', function(){
	    	toTop();
	    });
    }
    
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    // console.log("Page fully loaded.");
    // console.log("Initialize.js");

    // Animiation frame loop at 60fps to enable "toTop()" function
    RAF.init();

    // Enable slider functionality
    var FruitsSlider = new Carousel('fruits-slider');
    FruitsSlider.init();

    // Humans Credits
    console.log("Site designed and developed at Mandelbrot Studio®");
    console.log("https://mandelbrot.mx/");
    console.log("");
    console.log("Front-End Development:");
    console.log("Kenny Celis");
    console.log("https://www.instagram.com/hey_mr_kenny/");
    console.log("");
    console.log("Andrew Alvarado");
    console.log("https://www.instagram.com/andrew__alva/");
    console.log("");
    console.log("UI Design: Zero Morales");
    console.log("https://www.instagram.com/zero_alex/");
}