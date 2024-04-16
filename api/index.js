const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  server.listen(port, () => {
    console.log(`Server listening at port ${port}`); // eslint-disable-line no-console
  });
});