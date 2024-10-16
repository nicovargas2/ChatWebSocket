import express from 'express';
import viewsRouter from './routes/views.router.js';
import config from './config.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import moment from 'moment';

const app = express()

//Este es mi servidor http, pero lo voy a cargar a una constante para poder trabajarlo con websockets
const httpServer = app.listen(config.PORT, () => {
    console.log(`Server running using port: ${config.PORT}`)
});
const socketServer = new Server(httpServer)
app.set('socketServer', socketServer);

socketServer.on('connection', socket => {
    const CURRENT_DATE = moment().toString();
    console.log('Nuevo cliente conectado | ' + CURRENT_DATE)
    console.log("socket id: " + socket.id)

    socket.on('init_message', data => {
        console.log(data);
        console.log("Rugio la bestia en medio de la avenida!\n\n");
    });

    socket.on('new_own_msg', data => {
        //console.log(data)
        // esto hace que el server mande el mensaje recibido a TODOS los clientes conectados, a todos
        socketServer.emit('new_general_msg', data) //es tipo broadcast

    })

    socket.emit('welcome', 'Bienvenido cliente nuevo!')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/views', viewsRouter);