var deviceDetector = {
	device: undefined,

	init: function(){
		this.catchDevice();
		this.setupHTML();
	},

	catchDevice: function(){
		var detection = new MobileDetect(window.navigator.userAgent);

		if (detection.mobile() !== null) {
			this.device = "mobile"
		} else {
			this.device = "desktop"
		}
	},

	setupHTML: function(){
		if (this.device == "mobile" ) {
			document.getElementsByTagName('body')[0].classList.add('is-mobile')
		} else {
			document.getElementsByTagName('body')[0].classList.add('is-desktop')
		}
	}
}