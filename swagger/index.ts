import { SWAGGER_OUTPUT_FILE } from './config';

const registerApp = (app) => {
  const swaggerUi = require('swagger-ui-express');
  const swaggerOutputFile = require(SWAGGER_OUTPUT_FILE.GET_DOC);
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerOutputFile));
}

export {
  registerApp
}