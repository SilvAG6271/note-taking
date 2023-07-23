const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002

const noteRoute = require("./routes/notes.js");
const htmlRoute = require("./routes/html.js")


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", noteRoute);
app.use("/", htmlRoute);



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

});