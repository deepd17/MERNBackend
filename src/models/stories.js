const mongoose = require("mongoose");

const storyschema = new mongoose.Schema({
    title:String,
    description: String,
    image:{
        data:Buffer,
        type:String
    },
    link: String,
    isActive:{
        type:Boolean,
        default:false,
    }
});

const story = mongoose.model('Story', storyschema);
module.exports = story;