import server from './server';
import database from './database';
import domains from './domains';
(async function () {
  if(await database.connect()) {
    if(await server.start()) {
      domains.startRoutes(server);
    }
  }
})();