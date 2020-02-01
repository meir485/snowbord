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
  prodact.find({type:"men"}).exec( function ( err, men ){
     if( err ) return next( err );
     else{
      prodact.find({type:"women"}).exec(  function ( err, women ){
        if( err ) return next( err );
        else{
          res.render("home" , {a:men , b:women })
        }
      })
     }
    })          
})

app.get("/catPage/:id" , function(req , res){
     var t = String(req.params.id);console.log("t "+t)
     switch (t){
      case "mens":  
          var pro = prodact.find({type:"men"});console.log("pro "+pro.object)
          break
      case "womens":  
          var pro = prodact.find({type:"women"});console.log("pro "+pro.object)
          break
      case "gear":  
          var pro = prodact.find({type:"gear"});console.log("pro "+pro.object)
          break          
     }
    
    pro.exec(function(err,found){
	if(err){console.log(err)}
		else{ 
            console.log("found "+found)
			res.render("catPage" , {prodact:found , type:t})  }
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