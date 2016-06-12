var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	
	socket.on('createNote',function (data) {
		 socket.broadcast.emit('onNoteCreated',data); 
	});

	socket.on('updateNote', function(data) {
		socket.broadcast.emit('onNoteUpdated', data);
	});

	socket.on('deleteNote',function (data) {
		 socket.broadcast.emit('onNoteDeleted',data);
	});

	socket.on('moveNote', function(data){
		socket.broadcast.emit('onNoteMoved', data);
	});
	

});

http.listen(4000, function() {
    console.log('listening on port :4000');
});
