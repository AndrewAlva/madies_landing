var Parallax = function(){
	// Select elements that will be affected
	var objs = document.getElementsByClassName('parallax');
	this.floatingObjs = [];

	this.init = function(){
		for (var i = 0; i < objs.length; i++) {
		// for (var i = 4; i < 5; i++) {
			var _floating = new Floater(objs[i]);
			this.floatingObjs.push(_floating);
		}

		// console.log(this.floatingObjs)
	}
	this.render = function(){
		for (var i = 0; i < this.floatingObjs.length; i++) {
			this.floatingObjs[i].render();
		}
	}

	this.init();
	return this;
}

var Floater = function(el){
	var _self = this;
	this.el = el;

	// Get their position according to viewport scroll position
	this.top = this.el.getBoundingClientRect().top;

	// Get its height
	this.height = this.el.getBoundingClientRect().height;
	this.halfHeight = this.height / 2;

	this.bottomThreshold = MaxHeight - HalfHeight;

	// Get its center Y position according to viewport scroll position
	this.center = this.top + (this.height / 2);

	this.yDist = 0;
	// this.maxDist = 300; // pixels
	this.maxDist = 10; // vw
	this.cof = 0.1;
	this.intensity = this.el.getAttribute("data-parallax-intensity") || 1;

	
	this.displacing = function(){
		// Detect if they are inside the viewport
		// If so, calculate scroll displacement
		if (this.top + this.height > 0 && this.top < MaxHeight - this.bottomThreshold) {
			// Scroll displacement proportion
			var dist = this.top - this.bottomThreshold;
			var distRatio = dist / (this.bottomThreshold + this.height);

			// this.yDist += (dist - this.yDist) * this.cof;
			// this.yDist += ((distRatio * this.maxDist) - this.yDist) * this.cof;
			this.yDist = (distRatio * this.maxDist) * this.intensity;

			this.el.style = "transform: translate3d(0px, " + this.yDist + "vw, 0px);";

			
			// console.log("distance: " + dist);
			// console.log("distance ratio: " + distRatio);
		}
	}

	this.update = function() {
		// Constantly check object position according to top of the screen
		this.top = this.el.getBoundingClientRect().top;
		this.center = this.top + this.halfHeight;
		this.displacing();
	}



	this.render = function() {
		this.update();
	}

	return this;
}