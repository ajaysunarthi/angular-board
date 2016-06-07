angular.module('app', [])
.controller('mainCtrl',mainCtrl);

function mainCtrl ($scope,socketFactory) {
	 var vm = this;

	 vm.notes = [];

	 socketFactory.on('onNoteCreated', function(data) {
		$scope.notes.push(data);
	});

	 vm.createNote = function () {
	 	 var note = {
	 	 	id: new Date().getTime(), // just a quickfix donot work in long run
	 	 	title : 'New Note',
	 	 	body: 'pending'
	 	 }

	 	 vm.notes.push(note);
	 	 socketFactory.emit('createNote',note);
	 }

mainCtrl.$inject = ['$scope', 'socketFactory'];

}

