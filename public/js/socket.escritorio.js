var socket = io();
var label = $('#lblNuevoTicket');

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {
        if(res.numero) {
            label.text('Ticket ' + res.numero);
        } else {
            label.text(res);
            alert(res);
        }
    });  
});