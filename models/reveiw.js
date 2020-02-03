var mongoose = require("mongoose");
 
var reveiwSchema = new mongoose.Schema({
    text: String,
    stars: Number,
    author: {
        id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
        } ,
        username: String
    }
});
 
module.exports = mongoose.model("Rv", reveiwSchema);
