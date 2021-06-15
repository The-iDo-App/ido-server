const app = require('./startup/app');

const { WS_PORT, PORT } = process.env;

require('./startup/db')();
require('./routes')(app);

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
