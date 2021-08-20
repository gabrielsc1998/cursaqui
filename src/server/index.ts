import express, { Router, Express } from 'express';
import cors from 'cors';

import config from '../config';

class Server {
  
  private _app: Express;

  constructor() {
    this._app = express();
    this._config();
  }

  private _config = () => {
    try {
      this._app.use(cors());
      this._app.use(express.json());
      this._app.use(express.urlencoded({ extended: false }));
    } catch(error) {
      console.log(` ## Error to _config [${error}]`);
    }
  }

  start = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const port = config.app.port;
        this._app.listen(port, () => {
          console.log(` ## Server started - listening on http://localhost:${port}`);
          resolve(true);
        });
      } catch(error) {
        console.log(` ## Error to start server [${error}]`);
        reject(false);
      }
    });
  }

  useRouter = (path: string, router: Router) => {
    try {
      return this._app.use(path, router);
    } catch(error) {
      console.log(` ## Error to useRouter [${error}]`);
    }
  }

  getRouter = (): Router | undefined => {
    try {
      return Router();
    } catch (error) {
      console.log(` ## Error to getRouter [${error}]`);
    }
    return undefined;
  }

  getInstance = (): Express => {
    return this._app;
  }

}

export default new Server();