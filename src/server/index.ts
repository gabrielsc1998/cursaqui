import express from 'express';
import { Router } from 'express';
import cors from 'cors';

import { HTTPMethods } from './types';

const app = express();

class Server {

  constructor() {
    this._config();
  }

  _config() {
    try {
      this.use(cors());
      this.use(express.json());
      this.use(express.urlencoded({ extended: false }));
    } catch(error) {
      console.log(` ## Error to _config [${error}]`);
    }
  }

  async start(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const port=3000;
        app.listen(port, () => {
          console.log(` ## Server started - listening on http://localhost:${port}`);
          resolve(true);
        });
      } catch(error) {
        console.log(` ## Error to start server [${error}]`);
        reject(false);
      }
    });
  }

  use(method: any) {
    try {
      app.use(method);
    } catch(error) {
      console.log(` ## Error to user [${error}]`);
    }
  }

  useRouter(path: string, router: Router) {
    try {
      return app.use(path, router);
    } catch(error) {
      console.log(` ## Error to useRouter [${error}]`);
    }
  }

  getRouter(): Router | undefined {
    try {
      return Router();
    } catch (error) {
      console.log(` ## Error to getRouter [${error}]`);
    }
    return undefined;
  }

  getMethod(method: string): string | undefined {
    try {
      const httpMethods: HTTPMethods = {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        DELETE: 'DELETE',
      };
      return httpMethods[method];
    } catch (error) {
      console.log(` ## Error to getMethod [${error}]`);
    }
    return undefined;
  }

}

export default new Server();