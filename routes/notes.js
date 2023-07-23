const express = require("express");
const uniqid = require("uniqid");
const fs = require("fs");
const notes = express.Router();


notes.use(express.json());
notes.use(express.urlencoded({extended: true}));

notes.get("/api/notes", (req, res) => {
    fs.readFile(".\db\db.json", "utf8", (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json({error: "An error occurred while reading the notes"});
        }else{
            const notes = JSON.parse(data);
            res.json(notes);
        }
        });
    });

    notes.post("/api/notes", (req, res) => {
    
        console.log(`${req.method} request received to add note`);
    
        const newNote = req.body;
        newNote.id = uniqid();
        
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if(err){
                res.status(500).json({error: "An error occurred while saving the note."});
            } else {
                const notes = JSON.parse(data);
                notes.push(newNote);
         
    
        fs.writeFile("db/db.json", JSON.stringify(notes), (err) =>{
        if(err){
            console.log(err);
            res.status(500).json({ error: "An error occurred while saving note."});
        } else {
            res.json(newNote);
               }
            });
    
          }
      });
    });

    notes.delete("/api/notes/:id", (req,res) => {
        const idToDelete = req.params.id;
        for (let i = 0; i < notes.length; i++){
            if (idToDelete == notes[i].id) {
                notes.splice(i, 1);
            }
        }
    });
    
    module.exports = notes

