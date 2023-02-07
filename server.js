const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const locationRoute = require("./routes/location");

app.use("/api", locationRoute);

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
