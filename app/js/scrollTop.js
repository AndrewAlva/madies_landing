function toTop(speed) {
	var _intervalSpeed = speed || 10;

	function getToTop(){
		var _currentScrollPos = window.scrollY;
		var _target = _currentScrollPos - 100;

		if (_target <= 0) clearInterval(scrollTopInterval);

		window.scroll(0, _target);
	}

	var scrollTopInterval = setInterval(function(){
		getToTop();
	}, _intervalSpeed);
}