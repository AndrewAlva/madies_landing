function toTop() {
	var _scroll = { y: window.scrollY };
	new TWEEN.Tween( _scroll ).to( {
		y: 0

	}, _scroll.y*0.4).easing(
		TWEEN.Easing.Quintic.Out

	).onUpdate(function(){
		window.scroll(0, _scroll.y);

	}).start();
}