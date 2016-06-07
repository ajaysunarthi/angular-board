angular.module('app', [])
.controller('mainCtrl',mainCtrl);

function mainCtrl () {
	 var vm = this;

	 vm.notes = [];

	 vm.createNote = function () {
	 	 var note = {
	 	 	id: new Date().getTime(), // just a quickfix donot work in long run
	 	 	title : 'New Note',
	 	 	body: 'pending'
	 	 }

	 	 vm.notes.push(note);
	 }

	 
}