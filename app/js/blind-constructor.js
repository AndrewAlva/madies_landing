var Blinds = function(args) {
	if (!args) args = {};

	var _self = this;

	this.counter = 0;
	this.transitionTime = 700;
	this.copys = ["natural", "crunch", "madies"];
	this.container = document.getElementById('blind-text-container');
	this.shifters = document.getElementsByClassName('blind-shifter');

	this.showShifters = function(){
		for (var i = 0; i < _self.shifters.length; i++) {
			_self.shifters[i].classList.remove('hide');
		}
	};
	this.hideShifters = function(){
		for (var i = 0; i < _self.shifters.length; i++) {
			_self.shifters[i].classList.add('hide');
		}
	};

	this.updateText = function(){
		for (var i = 0; i < _self.shifters.length; i++) {
			_self.shifters[i].innerHTML = _self.copy[_self.counter];
		}
	};

	this.shift = function(){
		this.counter += 1;
		if (this.counter >= this.shifters.length) this.counter = 0;

		this.hideShifters();
		setTimeout(function(){
			// 
		}, this.transitionTime);
	};

	this.interval = 5000;

	this.firstObjs = $('#include-1').find('.ac-shift').find('span');
	this.secondObjs = $('#include-2').find('.ac-shift').find('span');
	this.thirdObjs = $('#include-3').find('.ac-shift').find('span');

	this.toggle = function(objArray, show){
		$.each(objArray, function(index, el) {
			setTimeout(function(){
				if(show){
					$(el).addClass('show');
				} else {
					$(el).removeClass('show');
				}
		    }, ( index * 50 ));
		});
	};

	this.shift = function(){
		if (this.counter == 1) {
			sponsorIncludes.toggle(sponsorIncludes.firstObjs);
			sponsorIncludes.toggle(sponsorIncludes.secondObjs, true);
			sponsorIncludes.counter = 2;
		} else if (this.counter == 2) {
			sponsorIncludes.toggle(sponsorIncludes.secondObjs);
			sponsorIncludes.toggle(sponsorIncludes.thirdObjs, true);
			sponsorIncludes.counter = 3;
		} else if (this.counter == 3) {
			sponsorIncludes.toggle(sponsorIncludes.thirdObjs);
			sponsorIncludes.toggle(sponsorIncludes.firstObjs, true);
			sponsorIncludes.counter = 1;
		}
	};

	this.init = function(){
		setInterval(function(){
			_self.shift();
		}, this.interval);
	}
}