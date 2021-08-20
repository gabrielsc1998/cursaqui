import server from './server';
import database from './database';
import domains from './domains';

import { Express } from 'express';

const app = async (): Promise<Express | undefined> => {
  if(await database.connect()) {
    if(await server.start()) {
      await domains.startRoutes(server);
      return server.getInstance()
    }
  } else {
    return undefined;
  }
}

export default app;