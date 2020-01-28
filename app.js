var express = require("express"), 
ejs         = require("ejs"),
bodyP       = require("body-parser"),  
mongoose = require("mongoose"), 
seed = require("./models/seeds"),
prodact = require("./models/prodact");    
app         = express();
mongoose.connect("mongodb://localhost/snowbord" , {useNewUrlParser: true});
app.use(bodyP.urlencoded({extended: true}));

app.set("view engine" ,"ejs");
app.use(express.static(__dirname + "/public"))


seed();

app.get("/home" , function(req , res){
    res.render("home")            
})

app.get("/catPage/:id" , function(req , res){
     var t = req.params.id.toString();console.log("t "+t)
    var pro = prodact.find({type:t});console.log("pro "+pro.object)
    pro.exec(function(err,found){
	if(err){console.log(err)}
		else{ 
            console.log("found "+found)
			res.render("catPage" , {prodact , type:t})  }
    })


 // prodact.
 //   find({}).
 //   exec( function ( err, found ){
 //     if( err ) return next( err );
 //     else{
 //     	console.log("pro "+found)
 //     res.render("catPage" , {prodact:found , types:t})
 //     }
 //    })
  });
             


var port = process.env.PORT || 3000;   //is made to make it start on port 3000 
app.listen(port, function () { 
  console.log("Server Has Started!"); 
}); 