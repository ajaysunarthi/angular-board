angular.module('app').
directive('stickyNote',  function(socketFactory){
	// Runs during compile
	return {
		scope: {}, 
	    //controller: controller,
		restrict: 'A', 
		link: link	
	};

	function link(scope,element,attrs) {
		  element.draggable();
	}

	function controller() {
		  
	}


});