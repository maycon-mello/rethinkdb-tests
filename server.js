import express from 'express';
import bodyParser from 'body-parser';
import sockio from 'socket.io';
import config, { Logger } from './config';
import { bootstrapApi } from './api';

const PORT = config.express.port;

export const app = express();
export const io = sockio.listen(runServer(), { log: false });


app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

bootstrapApi(app);

function runServer() {
  return app.listen(PORT, () => {
    Logger.info(`Express server running on port ${PORT}`)
  })
}
