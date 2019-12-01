var Blinds = function(args) {
	if (!args) args = {};

	var _self = this;

	this.switch = null;
	this.counter = 0;
	this.copys = 3;
	this.transitionTime = 200;
	this.container = document.getElementById(args.containerID) || document.getElementById('blind-text-container');
	this.firstShifters = document.getElementsByClassName('first-blind');
	this.secondShifters = document.getElementsByClassName('second-blind');
	this.thirdShifters = document.getElementsByClassName('third-blind');

	this.imgs = document.getElementsByClassName('blind-img');

	this.showFirstShifters = function(){
		for (var i = 0; i < _self.firstShifters.length; i++) {
			_self.firstShifters[i].classList.remove('hide');
		}
	};
	this.showSecondShifters = function(){
		for (var i = 0; i < _self.secondShifters.length; i++) {
			_self.secondShifters[i].classList.remove('hide');
		}
	};
	this.showThirdShifters = function(){
		for (var i = 0; i < _self.thirdShifters.length; i++) {
			_self.thirdShifters[i].classList.remove('hide');
		}
	};

	this.hideShifters = function(){
		for (var i = 0; i < _self.firstShifters.length; i++) {
			_self.firstShifters[i].classList.add('hide');
			_self.secondShifters[i].classList.add('hide');
			_self.thirdShifters[i].classList.add('hide');
		}

		for (var i = 0; i < _self.imgs.length; i++) {
			_self.imgs[i].classList.remove('show');
		}
	};

	this.showImg = function(index){
		this.imgs[index].classList.add('show');
	};

	this.shift = function(){
		this.counter += 1;
		if (this.counter >= this.copys) this.counter = 0;

		this.hideShifters();
		this.showImg(this.counter);

		setTimeout(function(){
			switch(_self.counter){
				case 0:
					_self.showFirstShifters();
					break;
				case 1:
					_self.showSecondShifters();
					break;
				case 2:
					_self.showThirdShifters();
					break;
			}
		}, this.transitionTime);
	};

	this.interval = 3000;

	this.init = function(){
		this.switch = setInterval(function(){
			_self.shift();
		}, this.interval);
	}

	this.stop = function(){
		clearInterval(_self.switch);
	}
}