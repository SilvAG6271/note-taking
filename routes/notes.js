const express = require("express");
 let data = require("../db/db.json");
const uniqid = require("uniqid");
const fs = require("fs");
const router = express.Router();
const path = require("path");



router.get("/notes", (req, res) => {
    console.log({data});
    res.json(data);
})


router.post("/notes", (req, res) => {
     const newNote = req.body;
        newNote.id = uniqid();
        console.log(newNote);
        console.log(req.body);
        data.push(newNote);
         fs.writeFile(path.join(__dirname, "../db/db.json"), 
        JSON.stringify(data), function (err){
            if (err) {
                res.status(404).json({error:err});
            }
            res.json(data);
        });

    });

     

router.delete("/notes/:id", (req,res) => {
        const idToDelete = req.params.id;
        for (let i = 0; i < data.length; i++){
            if (idToDelete == data[i].id) {
                data.splice(i, 1);
            }
        }

        fs.writeFile(path.join(__dirname, "../db/db.json"),
        JSON.stringify(data), function (err){
            if (err) {
                res.status(404).json({error:err});
            }
            res.json(data);
        });
    });
    
    module.exports = router;

