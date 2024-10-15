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
    })

    socket.emit('welcome', 'Bienvenido cliente nuevo!')
})


//el next() es propio de express, ya se encarga de inyectarlo.
const midd1 = (req, res, next) => {
    console.log("se recibio una solicitud");
    //y despues segui con la cadena, con lo que venga despues.
    next();
}

//ejecuta estos middlewares primero.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//activacion del motor handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/views', viewsRouter);