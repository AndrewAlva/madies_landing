var RAF = {
    els: [],
    add: function(object) {
    	this.els.push(object);
    },
    remove: function(object) {
    	var idx = this.els.indexOf(object);
    	this.els.splice(idx, 1);
    },
    init: function() {
        this.animate();
    },
    animate: function() {
        requestAnimationFrame(RAF.animate);
        TWEEN.update();
        RAF.render();
    },
    render: function() {
        for (var i = 0; i < RAF.els.length; i++) {
            RAF.els[i].render();
        }
    }
}