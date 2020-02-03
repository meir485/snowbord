var express = require("express"),
app = express.Router(),
prodact     = require("../models/prodact");   


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

app.get("/show/:id/" ,function(req,res){
  prodact.findById(req.params.id).populate("reveiws").exec(function(err,found){
  if(err){console.log(err)}
    else{res.render("show" , {pro: found})}
    })
  
})


///////////////////prodact routes///////////////////
//new get route     
app.get("/home/new" , isLoggedIn ,function(req,res){
    res.render("home/new")
})
//new post route
app.post("/home/new" , isLoggedIn ,function(req,res){
    prodact.create(req.body.pro , function(err, pro){
      if(err){console.log(err)}
        else
        {
          pro.author.id = req.user._id;
          pro.author.username = req.user.username;
          pro.save()
          res.redirect("/home")
        }
    })
}) 
//edit get route
app.get("/show/:id/edit" ,function(req,res){
 prodact.findById(req.params.id, function(err,found){
  if(err){console.log(err)}
    else{res.render("home/edit" , {pro: found })}
    })
})
//edit post route
app.put("/show/:id"  ,function(req,res){
   prodact.findByIdAndUpdate(req.params.id, req.body.prod, function(err, update){ 
    if(err){res.redirect("back")}
    else{res.redirect("/show/"+req.params.id)}
   })
})
//delete route    
app.delete("/show/:id"  ,function(req,res){
      prodact.findByIdAndRemove(req.params.id, function(err, found){ 
        if(err){console.log(err);res.redirect("/home")}
    else{
      found.populate("reveiws").remove({}, function(err, found){})     
      res.redirect("/home")
    }
  })
})
////////////////////////////////////////////////////
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
module.exports = app