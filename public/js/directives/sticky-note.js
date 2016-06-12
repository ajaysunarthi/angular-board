angular.module('app').
directive('stickyNote', stickyNote);

function stickyNote(socketFactory) {
    // Runs during compile
    return {
        scope: {
            note: '=',
            ondelete: '&'
        },
         templateUrl: 'views/sticky-note.html',
        controller: Controller,
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs, ctrl) {
        element.draggable();
//        console.log(scope.note); // undefined
//        console.log(scope.fuck); // undefined
        // console.log(scope.vm.note);
        // console.log(scope.vm.fuck);

    }

    Controller.$inject = ['$scope'];

    function Controller($scope) {

        var vm = this;

        socketFactory.on('onNoteUpdated', function(data) {
                // Update if the same note
                if(data.id == vm.note.id) {
                    vm.note.title = data.title;
                    vm.note.body = data.body;
                }               
            });

        vm.deleteNote = function(id) {
                vm.ondelete({
                    id: id
                });
            };
        vm.updateNote = function () {
             socketFactory.emit('updateNote', vm.note);
        }

    }

}
