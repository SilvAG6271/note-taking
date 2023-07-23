const notes = require("./routes/notes");
const path = require("path")
const PORT = 3001;
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/notes", notes);
app.use(express.static("public"));

 app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "../public/notes.html"));
 });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

});