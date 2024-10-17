import express from 'express';
import viewsRouter from './routes/views.router.js';
import config from './config.js';
import handlebars from 'express-handlebars';
import initSocket from './socket.js';

const app = express()

//Este es mi servidor http, pero lo voy a cargar a una 
//constante para poder trabajarlo con websockets
const httpServer = app.listen(config.PORT, () => {
    console.log(`Server running using port: ${config.PORT}`)

    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/views', viewsRouter);
});

