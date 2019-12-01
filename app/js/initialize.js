// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
var TestSmoothScroll;

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

    // General inview animation, linked with "Cascading" system
    var inviewObjects = document.getElementsByClassName('mbrt-cascade');
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            if ((this.el.getBoundingClientRect().top - window.innerHeight) > 0) {
                this.el.classList.remove('animate');
            } else {
                this.el.classList.add('animate');
            }
        })
    }

    // Animiation frame loop at 60fps to enable "toTop()" function
    RAF.init();

    // Smooth scrolling
    TestSmoothScroll = new SmoothScroll();
    RAF.add(TestSmoothScroll);

    // Enable slider functionality
    var FruitsSlider = new Carousel('fruits-slider');
    FruitsSlider.init();

    // Section 2 Blinds animation init
    var ValuesBlinds = new Blinds({
        containerID: 'blind-text-container'
    });
    ValuesBlinds.init();

    // Humans Credits
    // console.log("Site designed and developed at Mandelbrot Studio®");
    // console.log("https://mandelbrot.mx/");
    // console.log("");
    // console.log("UI Design: Zero Morales");
    // console.log("https://www.instagram.com/zero_alex/");
    // console.log("");
    // console.log("Front-End Development:");
    // console.log("Kenny Celis");
    // console.log("https://www.instagram.com/hey_mr_kenny/");
    // console.log("");
    // console.log("Andrew Alvarado");
    // console.log("https://www.instagram.com/andrew__alva/");
}