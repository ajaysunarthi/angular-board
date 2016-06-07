angular.module('app').
directive('stickyNote', stickyNote);

function stickyNote(socketFactory) {
    // Runs during compile
    return {
        scope: {},
        //controller: controller,
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs) {
        element.draggable();
    }

    // function controller() {

    // }


}
