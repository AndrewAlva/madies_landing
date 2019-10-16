// Carousel object constructor
function Carousel(sliderID, projPrefix){
	// Flag to prevent overlapping transitions between sections
	this.canScroll = true;

	// Section ID where the carousel is
	this.sectionID = sliderID;

	// HTML Element containing the slider
	this.container = null;

	// Projects prefix to select them
	this.slidesPrefix = projPrefix || 'slide-';

	// Set the array with all the screens to manipulate
	this.slides = [];

	// Declare current active section variable
	this.activeProject = 0;

	// Duration of transition animations
	this.duration = 1300;

	// Go to 'Prev' slide trigger
	this.prevTrigger = null;

	// Go to 'Next' slide trigger
	this.nextTrigger = null;

	// Set slide titles
	this.slideTitles = [];

	// Set images for desktop slider
	this.desktopImages = [];

	// Initiate function
	this.init = function(){
		// Get HTML Objects to interact
		this.getContainer();
		this.getTriggers();
		this.getShiftingTitles();
		this.getBigImages();

		// Init the array of projects images to slide
		this.slides = this.container.getElementsByClassName('slide');

		// Enable 'Next / Prev' slide listeners
		this.enableNavListeners();

	};

	// Go prev project, only if there is a prev project to go
	this.prev = function(){
		var index = this.activeProject - 1;
		if (index >= 0) {
			this.goTo(index, 'prev');
		} else {
			// console.log("You've reached the end of the slider, show last slide");
			this.goTo(this.slides.length - 1, 'prev');
		};
	};

	// Go next project, only if there is a next project to go
	this.next = function(){
		var index = this.activeProject + 1;
		if (index < this.slides.length) {
			this.goTo(index, 'next');
		} else {
			if (this.canScroll == true) {
				// console.log("You've reached the end of the slider, show first slide");
				this.goTo(0, 'next');
			};
		};
	};

	// Navigation function, "index" is the desired project to go
	this.goTo = function(index, direction){
		// Change of project only after any transition ends
		if (this.canScroll == true && this.activeProject != index) {
			// Turn off the flag to prevent overlapping section transitions
			this.canScroll = false;

			// Declare variables to define the direction of transition animations
			var currentProjectMove;
			var newProjectMove;

			// Detect if user is going to the Next or Prev project, first if check forward move
			// This is based on index comparison (increasing goes left, decreasing goes right)
			// if (this.activeProject < index) {
			// 	currentProjectMove = 'prev';
			// 	newProjectMove = 'next';
			// } else if (this.activeProject > index) {
			// 	currentProjectMove = 'next';
			// 	newProjectMove = 'prev';
			// };

			// This is based on the trigger clicked
			if (direction == 'next') {
				currentProjectMove = 'prev';
				newProjectMove = 'next';
			} else if (direction == 'prev') {
				currentProjectMove = 'next';
				newProjectMove = 'prev';
			};


			// Move the current project outside the wrapper
			var _currentProjectID = this.slidesPrefix + this.activeProject;
			var _currentProject = document.getElementById(_currentProjectID);
			_currentProject.classList.add(currentProjectMove);

			// Set the new project in position to enter
			var _upcomingProject = document.getElementById(this.slidesPrefix + index);
			_upcomingProject.classList.add(newProjectMove);
			_upcomingProject.classList.add('active');

			// Animate the slider titles
			this.shiftTitles(index);

			// Animate the desktop big images
			this.shiftBigImages(index);

			// Make a tiny pause (100ms) until the new project is in position
			setTimeout((function(){
				// Move the new project into the wrapper
				_upcomingProject.classList.remove(newProjectMove);

				// Wait until the new project is in position, then disappear the old active project, update the activeProject var and turn on the 'canScroll' flag again
				setTimeout((function(){
					_currentProject.classList.remove('active');
					_currentProject.classList.remove(currentProjectMove);

					this.setStates(index);
					this.canScroll = true;

				}).bind(this), this.duration);
			}).bind(this), 100);
		};
	};

	// Update 'active project var' according to goTo(this_slide) function result
	this.setStates = function(index){
		this.activeProject = index;
	};

	// Get container
	this.getContainer = function(){
		this.container = document.getElementById(this.sectionID);
	}

	// Get slider triggers
	this.getTriggers = function(){
		this.prevTrigger = this.container.getElementsByClassName('btn-prev')[0];
		this.nextTrigger = this.container.getElementsByClassName('btn-next')[0];
	}

	// Enable Next/Prev click listeners
	this.enableNavListeners = function(){
		var _self = this;

		this.prevTrigger.addEventListener('click', function(){
			_self.prev();
		});

		this.nextTrigger.addEventListener('click', function(){
			_self.next();
		});

	}

	// Get slide titles
	this.getShiftingTitles = function(){
		this.slideTitles = document.getElementsByClassName('shifting-slide-title');
	}

	// Shift between slide titles
	this.shiftTitles = function(index){
		// Remove active class to all titles
		for (var i = 0; i < this.slideTitles.length; i++) {
			this.slideTitles[i].classList.remove('active');
		}

		// Set active state to the desired title
		this.slideTitles[index].classList.add('active');
	}

	// Get big images on desktop slider
	this.getBigImages = function(){
		this.desktopImages = document.getElementsByClassName('img-mask-desktop');
	}

	// Shift between big images on desktop slider
	this.shiftBigImages = function(index){
		// Remove active class to all big images
		for (var i = 0; i < this.desktopImages.length; i++) {
			this.desktopImages[i].classList.remove('active');
		}

		// Set active state to the desired big images
		this.desktopImages[index].classList.add('active');
	}
}
