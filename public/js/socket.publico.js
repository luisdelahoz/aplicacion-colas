var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];

var lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];

socket.on('connect', function() {
    console.log('usuario conectado');
});

socket.on('disconnect', function() {
    console.log('usuario desconectado');
});

socket.on('estadoActual', function(data) {
    actualizaHtml(data.ultimos4);
});

var audio = new Audio('audio/new-ticket.mp3');
socket.on('ultimos4', function(data) {
    if(audio) audio.play();
    if('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance(data.ultimos4[0].numero);
        window.speechSynthesis.speak(msg);
    }
    actualizaHtml(data.ultimos4);
});

function actualizaHtml(ultimos4) {
    for(i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}
