import express from 'express';
import viewsRouter from './routes/views.router.js';
import config from './config.js';
import handlebars from 'express-handlebars';
import initSocket from './socket.js';

const app = express()
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

//Este es mi servidor http, pero lo voy a cargar a una 
//constante para poder trabajarlo con websockets
const httpServer = app.listen(port, () => {
    console.log(`Server running using port: ${port}`)

    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/views', viewsRouter);
});

