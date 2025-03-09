const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

conn
  .sync({ force: true })
  .then(async () => {
    console.log("All models were synchronized successfully.");
    server.listen(port, () => {
      console.log(`Server listening at port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
