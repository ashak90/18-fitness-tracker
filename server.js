const express = require("express");
const mongose = require("mongoose");
const app = express();


const PORT = process.env.PORT || 3000;

const db = require("./models")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker-admin",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

const connection = mongose.connection;

connection.on("connected", () => {
    console.log("Mongose connected")
});

connection.on("error", () => {
    console.log("Error connecting to server")
});

app.get("/api/config", (req, res) => {
    res.json({ success: "Fitness tracker connected" });
});

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

