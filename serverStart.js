const port = 3000;
let app = require("./app");
app.initMongoose("mongodb://localhost/demoJokes");
app.listen(port,() => console.log(`Started Server Listening on ${port}`));