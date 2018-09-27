import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as cors from 'cors';


import PostRouter from './router/PostRouter';

class Server {
  public app: express.Application;

  constructor() {
    this.app =  express();
    this.config();
    this.routes();
  }
  
  public config() {
    const MONGO_URI = 'mongodb://localhost/wes';
    mongoose.connect(MONGO_URI || process.env.MONGO_URI);

    // config
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors()); 
  }

  
  public routes(): void {
    let router: express.Router;
    router = express.Router();

    this.app.use('/', router);
    this.app.use('/api/v1/posts', PostRouter);
  }
}

export default new Server().app;