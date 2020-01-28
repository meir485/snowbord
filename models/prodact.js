var mongoose = require("mongoose")
var comment   = require("./comment");
 
prodactSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
  id:String,
	type: String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ]
})

module.exports = mongoose.model("Prodact", prodactSchema);