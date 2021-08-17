const REF = '';
const { APP_PORT } = require('../app/config');

const DOC = {
  info: {
    version: "1.0.0",
    title: "",
    description: ""
  },
  host: `localhost:${APP_PORT}`,
  tags: [
    {
      "name": "",
      "description": ""
    }
  ],
  definitions: {
  },  
};

export {
  DOC,
  REF,
};