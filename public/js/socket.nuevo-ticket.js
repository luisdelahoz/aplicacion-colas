var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('usuario conectado');
});

socket.on('disconnect', function() {
    console.log('usuario desconectado');
});

socket.on('estadoActual', function(data) {
    label.text(data.actual);
});

$('button').on('click', function() {
    
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

});