var SmoothScroll = function(args){
	if (!args) args = {};

	var _self = this;
	
	this.ui = {
		el: document.querySelector('.js-scroll'),
		heightEl: null      
	}
	
	this.state = {
		scroll: {
			target: 0,
			current: 0,
			ease: 0.095
		},
		bounds: {
			scrollHeight: 0
		},
		isResizing: false
	}
   

	this.init = function(){
		this.bindAll();
		this.setInitial();
		this.setFakeHeight();
		this.addListeners();
	}

	this.bindAll = function(){
		['onScroll', 'onResize', 'render'].forEach(function (fn) {
			return _self[fn] = _self[fn].bind(_self);
		});
	}

	this.render = function(){
		var scroll = this.state.scroll;


		scroll.current += (scroll.target - scroll.current) * scroll.ease;
		if (scroll.current < .1) scroll.current = 0;

		this.translateContainer();
	}

	this.translateContainer = function() {
		var _state = this.state;
		var isResizing = _state.isResizing;
		var scroll = _state.scroll;

		var translate = "translate3d(0, " + -scroll.current + "px, 0)";

		_self.ui.el.style.transform = translate;
	}

	this.setInitial = function(){
		var el = this.ui.el;

		Object.assign(el.style, {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%'
		});

		document.body.classList.add('is-smooth-scroll');
	}

	this.setFakeHeight = function(){
		var _state = this.state;
		var bounds = _state.bounds;


		if (!this.ui.heightEl) {
			this.ui.heightEl = document.createElement('div');
			this.ui.heightEl.classList.add('js-fake-scroll');
			document.body.appendChild(this.ui.heightEl);
		}

		var bottom = _self.ui.el.getBoundingClientRect().height;

		bounds.scrollHeight = bottom;

		this.ui.heightEl.style.height = bottom + 'px';
	}

	this.onScroll = function(){
		var scroll = this.state.scroll;
		scroll.target = window.scrollY;
	}

	this.onResize = function(){
		this.state.isResizing = true;

		this.setFakeHeight();
		this.translateContainer();

		this.state.isResizing = false;
	}

	this.addListeners = function(){
		window.addEventListener('scroll', this.onScroll);
		window.addEventListener('resize', debounce(this.onResize, 800));
	}

}















