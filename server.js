require("dotenv").config();
const { WS_PORT, PORT } = process.env;
const app = require("./startup/app");
const http = require("http");
require("./routes")(app);

const server = http.Server(app);
server.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT: ${PORT}`);
});
const client = require("socket.io")(server);

require("./startup/db")();
require("./sockets")(client);

//Setup Error Handlers
const errorHandlers = require("./handlers/error.handler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}
