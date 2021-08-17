const swagger = require('swagger-autogen')({ language: 'pt-BR' });
const { SWAGGER_OUTPUT_FILE, SWAGGER_ENDPOINTS_FILES } = require('./config');
const { DOC } = require('./doc');
swagger(SWAGGER_OUTPUT_FILE.CREATE, SWAGGER_ENDPOINTS_FILES, DOC);