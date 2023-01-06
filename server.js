/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const routes = require('./src/booksroutes');

const init = async () => {
  // define the server
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['Access-Control-Request-Private-Network'],
      },
    },
  });
  server.route(routes);

  // start the server
  await server.start().then(() => {
    console.log(`Server is starting on port ${server.info.port}`);
  });
};
init();
