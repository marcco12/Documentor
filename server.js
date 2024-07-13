import StaticServer from "static-server";
const server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: 4100,               // required, the port to listen
  cors: '*',                // optional, defaults to undefined
});
 
server.start(function () {
  console.log('Server listening to', server.port);
});