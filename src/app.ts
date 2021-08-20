import { Express } from 'express';

import server from './server';
import domains from './domains';
import database from './database';

const app = async (): Promise<Express | undefined> => {
  if(await database.connect()) {
    if(await server.start()) {
      await domains.startRoutes(server);
      return server.getInstance();
    }
  } else {
    return undefined;
  }
}

export default app;