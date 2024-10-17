import { Server } from 'socket.io';
import moment from 'moment';

const initSocket = (httpServer) => {
    const messages = [];

    const socketServer = new Server(httpServer);
    console.log('* Servicio socket.io activo *\n');

    socketServer.on('connection', socket => {
        const CURRENT_DATE = moment().toString();
        console.log(`Nuevo cliente conectado | ${CURRENT_DATE} | socket id: ${socket.id} desde: ${socket.handshake.address}`)
        /*
        socket.on('init_message', data => {
            console.log(data);
            console.log("Rugio la bestia en medio de la avenida!\n\n");
        });*/

        //socket.emit('welcome', 'Bienvenido cliente nuevo!')

        // Suscripción al tópico new_user_data (que envía un cliente cuando se conecta)
        socket.on('new_user_data', data => {
            // Envía a ESE cliente la lista actual de mensajes
            socket.emit('current_messages', messages);
            // y a TODOS LOS DEMÁS los datos del nuevo usuario que acaba de conectarse
            socket.broadcast.emit('new_user', data);
        });

        socket.on('new_own_msg', data => {
            messages.push(data);
            //console.log(data)
            // esto hace que el server mande el mensaje recibido a TODOS los clientes conectados, a todos
            socketServer.emit('new_general_msg', data) //es tipo broadcast

        })

        socket.on('clearHistory', () => {
            messages.forEach(element => {
                messages.pop(element)
            });
            socketServer.emit('clearList', {});
        });

        socket.on('disconnect', reason => {
            console.log(reason);
        });
    })

    return socketServer;
}

export default initSocket;