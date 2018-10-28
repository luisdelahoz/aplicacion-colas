const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getActual(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        callback(siguiente);
        
    });

    client.on("atenderTicket", (data, callback) => {

        if(!data.escritorio) {
            callback({
                error: true,
                message: 'El escritorio es necesario'
            });
        } else {
            let atenderTicket = ticketControl.atenderTicket(data.escritorio);
            callback(atenderTicket);
            client.broadcast.emit('ultimos4', {
                ultimos4: ticketControl.getUltimos4()
            });
        }
    });

});