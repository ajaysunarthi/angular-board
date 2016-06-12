angular.module('app', [])
.controller('mainCtrl',mainCtrl);

function mainCtrl (socketFactory) {
	 var vm = this;
	 vm.fuck = 10;
	 vm.notes = [];

	 // this is incoming
	 socketFactory.on('onNoteCreated', function(data) {
		vm.notes.push(data);
	});

	socketFactory.on('onNoteDeleted', function(data) {
		vm.handleDeletedNote(data.id);
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

	 vm.deleteNote = function (id) {
	 	vm.handleDeletedNote(id);
	 	socketFactory.emit('deleteNote',{id:id});	 
	 }

	 vm.handleDeletedNote = function (id) {
	 	 var allNotes = vm.notes,
	 	 newNotes = [];

	 	 angular.forEach(allNotes,function (note) {
	 	 	 if (note.id !== id) {
	 	 	 	newNotes.push(note); 
	 	 	 }
	 	 });
	 	 vm.notes = newNotes;
	 }

mainCtrl.$inject = ['socketFactory'];

}

