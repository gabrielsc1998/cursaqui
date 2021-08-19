
import * as swagger from "swagger-express-ts";
// import { SwaggerDefinitionConstant } from "swagger-express-ts";

import * as express from "express";

import server from '../src/server';

const config = {
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

const app = server.getInstance();
app.use('/api-docs/swagger' , express.static( 'swagger' ));
app.use('/api-docs/swagger/assets', express.static( 'node_modules/swagger-ui-dist' ));
app.use(swagger.express(config));