var mongoose = require("mongoose")
var reveiw   = require("./reveiw")
var user     = require("./user") 
 
prodactSchema = new mongoose.Schema({
	name: String,
  company:String,
	image: String,
	description: String,
  stars:Number,
  price: Number,
	type: String,
  //type
  colors:[],
  author:  {
        id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
        } ,
        username: String
    },
	reveiws: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Rv"
      }
      ]
})

module.exports = mongoose.model("Prodact", prodactSchema);