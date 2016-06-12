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
        element.draggable({
            stop:function (event,ui) {
                 socketFactory.emit('moveNote',{
                    id:scope.vm.note.id,
                    x:ui.position.left,
                    y:ui.position.top
                 }); 
            }
        });

        socketFactory.on('onNoteMoved',function (data) {
           if(data.id == scope.vm.note.id) {
                    element.animate({
                        left: data.x,
                        top: data.y
                    });
                }  
        });

        element.css('left', '10px');
            element.css('top', '50px');
            element.hide().fadeIn(1000);


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
