const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn
  .sync({ force: false })
  .then(async () => {
    console.log("All models were synchronized successfully.");
    server.listen(port, () => {
      console.log(`Server listening at port ${port}`); // eslint-disable-line no-console
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
