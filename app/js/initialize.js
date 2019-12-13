// Set scroll position to show loader properly
toTop(0.1);


// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
var PageSmoothScroll;
var MaxWidth = window.innerWidth;
var MaxHeight = window.innerHeight;
var HalfWidth = MaxWidth / 2;
var HalfHeight = MaxHeight / 2;

var _resize = debounce(onWindowResize, 200);
window.addEventListener('resize', _resize, false);

function onWindowResize(){
    MaxWidth = window.innerWidth;
    MaxHeight = window.innerHeight;
    HalfWidth = MaxWidth / 2;
    HalfHeight = MaxHeight / 2;
}

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

    // Remove loader
    document.getElementById('loader-screen').classList.add('loaded');
    document.getElementById('header-nav').classList.add('loaded');

    // Activate animation of first elements inview
    var firstLoadEls = document.getElementsByClassName('firstload');
    for (var i = 0; i < firstLoadEls.length; i++) {
        firstLoadEls[i].classList.add('animate');
    }


    var parallax = new Parallax();
    RAF.add(parallax);

    // Section 2 Blinds animation init
    var ValuesBlinds = new Blinds({
        containerID: 'blind-text-container'
    });
    var areBlindsActive = false;
    var blindsInitDelay = 1400;


    // General inview animation, linked with "Cascading" system
    var inviewObjects = document.getElementsByClassName('mbrt-cascade');
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            if ((this.el.getBoundingClientRect().top - window.innerHeight) > 0) {
                this.el.classList.remove('animate');

                // Stop "Blinds" animation when is not inview and user scrolled down
                // (this is to match with inview animations too)
                if(areBlindsActive && this.el.getAttribute('id') == "blind-text-container"){
                    areBlindsActive = false;
                    ValuesBlinds.stop();
                }

            } else {
                this.el.classList.add('animate');

                // Initialize "Blinds" animation after is inview to coordinate with inview animations
                if(!areBlindsActive && this.el.getAttribute('id') == "blind-text-container"){
                    setTimeout(function(){
                        if (!areBlindsActive) {
                            ValuesBlinds.init();
                            areBlindsActive = true;
                        }
                    }, blindsInitDelay);
                }
            }
        })
    }

    // Animiation frame loop at 60fps to enable "toTop()" function
    RAF.init();

    // Smooth scrolling
    PageSmoothScroll = new SmoothScroll();
    RAF.add(PageSmoothScroll);

    // Enable slider functionality
    var FruitsSlider = new Carousel('fruits-slider');
    FruitsSlider.init();


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