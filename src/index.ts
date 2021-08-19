import server from './server';
import database from './database';
import domains from './domains';
import * as swagger from "swagger-express-ts";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

import * as express from "express";
(async function () {
  if(await database.connect()) {
    if(await server.start()) {
      domains.startRoutes(server);
      server.getInstance().use( '/api-docs/swagger' , express.static( 'swagger' ) );
      server.getInstance().use( '/api-docs/swagger/assets', express.static( 'node_modules/swagger-ui-dist' ) );
      server.getInstance().use( swagger.express(
        {
            definition : {
                info : {
                    title : "My api" ,
                    version : "1.0"
                } ,
                externalDocs : {
                    url : "My url"
                }
                // Models can be defined here
            }
        }
    ) );
    }
  }
})();