// Including all the files
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const { urlencoded } = require("express");
const multer = require("multer");
const cors = require("cors");

// Creating the app
const app = express();

// Databse Connectivity
require("../db/connection.js");

//Setting Port
const port = process.env.PORT || 3004;


const Story = require("./stories.js");
const { title } = require("process");
const { contentType } = require("express/lib/response");

app.use(cors());
// To display the json format on browser while usinf send() function
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Setting up ejs
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, `uploads`)
    },
    filename: (req, file, cb)=>{
        cb(null, file.filename);
    }
});

const upload = multer({
    storage: storage
}).single('image');

// Project 

app.get('/', async (req, res)=>{
    res.render("index");
})

app.post('/add', async (req, res)=>{
    try{
        
        const data = req;
        // res.send(data);
        console.log(data);
        
    }catch(err){
        console.log(err);
        res.status(401).send(err);
    }
})

app.delete('/delete/:id', async(req, res)=>{
    try{
        const story = Story.findById({
            _id: req.params.id
        });
        await story.deleteOne();
        res.status(201).send("Data deleted");

    }catch(err){
        res.status(401).send(err);
    }
})

app.put('/update/:id', async (req, res)=>{
    try {
        const story = await Story.findById({
            _id: req.params.id
        })
        upload(req, res, (err)=>{
            if(err){
                res.status(401).send(err);
            }else{
                    story.title = req.body.title,
                    story.description =  req.body.description
                    story.link = req.body.link,
                    story.category = req.body.category,
                    story.image = {
                        data: req.file.filename,
                        contentType: 'image/jpg'
                    }
                const updated = story.updateOne();
                story.save();
                res.status(201).send("Data is updated");
                }
        })
    } catch (error) {
        res.status(401).send(error);
    }
})


app.get('/view', async (req, res)=>{
    try {
        const result = await Story.find();
        res.send(result);

    } catch (error) {
        res.status(401).send(error);
    }
})

app.get('/view/:id', async (req, res)=>{
    try{
        const result = await Story.findOne({
            _id: req.params.id
        });
        res.status(201).send(result);

    }catch(error){
        res.status(404).send(error);
    }
})

app.get('/active', async(req, res)=>{
    try {
        const result = await Story.find({
            isActive: true
        });
        res.status(201).send(result);

    } catch (error) {
        res.status(404).send(error);
    }
})

app.get('/inActive', async(req, res)=>{
    try {
        const result = await Story.find({
            isActive: false
        });
        res.status(201).send(result);
        
    } catch (error) {
        res.status(401).send(error);
        
    }
})

app.listen(port, ()=>{
    console.log(`Server is starting on port no ${port}`);
});