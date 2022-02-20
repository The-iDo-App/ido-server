const app = require('./startup/app');
const client = require('socket.io')(3000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const { WS_PORT, PORT } = process.env;

require('./startup/db')();
require('./routes')(app);
require('./sockets')(client);

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
