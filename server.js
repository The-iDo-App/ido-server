require('dotenv').config();
const { WS_PORT, PORT } = process.env;
const app = require('./startup/app');
const http = require('http');
require('./routes')(app);

const server = http.Server(app);
server.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT: ${PORT}`);
});

const client = require('socket.io')(server);

require('./startup/db')();
require('./sockets')(client);
