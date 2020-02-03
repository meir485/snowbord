var express = require("express"), 
ejs         = require("ejs"),
bodyP       = require("body-parser"),  
mongoose    = require("mongoose"), 
passport       = require("passport"),
LocalStrategy  = require("passport-local"),
session        = require("express-session"),
User           = require("./models/user"),
reveiw         = require("./models/reveiw"),
methodOverride = require("method-Override"),
seed        = require("./models/seeds"),
prodact     = require("./models/prodact");    
app         = express();
mongoose.connect("mongodb://localhost/snowbord" , {useNewUrlParser: true});
app.use(bodyP.urlencoded({extended: true}));

app.set("view engine" ,"ejs");
app.use(express.static(__dirname + "/public"))

app.use(session({ 
  secret: "process.env.SESSIONSECRET", 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
  
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
app.use(methodOverride("_method"))

app.use(function(req,res,next){ 
res.locals.currentUser = req.user 
next() 
}) 

seed();

app.get("/signup",function(req,res){
  res.render("signup")
})

app.post("/signup" , function(req , res){ 
  
var newUser = new User({username: req.body.username}) 
User.register(newUser , req.body.password , function(err, user){ 
if(err){ 
return res.render("signup") 
}  
passport.authenticate("local")(req, res, function(){ 
res.redirect("/home") 
}) 
}) 
}) 

app.get("/login",function(req,res){
  res.render("login")
})

app.post("/login" , passport.authenticate("local", 
    { 
      successRedirect: "/home", 
      failureRedirect: "/login" 
    }), function(req,res){}
) 

app.get("/logout" , function(req , res){
  req.logout()
  res.redirect("/home")
})


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
      prodact.findByIdAndRemove(req.params.id, function(err, update){ 
        if(err){console.log(err);res.redirect("/home")}
    else{     
      res.redirect("/home")
    }
  })
})
////////////////////////////////////////////////////
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
////////////////////review routes/////////////////////////
//new get route      
app.get("/show/:id/reveiw/new" ,function(req,res){
  prodact.findById(req.params.id, function(err,found){
  if(err){console.log(err)}
    else{res.render("reveiws/new" , {pro: found})}
    })
})
//new post route
app.post("/show/:id/reveiw" , isLoggedIn ,function(req,res){
  
  var rv = new reveiw(req.body.reveiw)
  rv.author.id = req.user._id;
  rv.author.username = req.user.username;
  console.log(rv)
  rv.save()
   prodact.findById(req.params.id,function(err,found){
    found.reveiws.push(rv)
    found.save()
  if(err){console.log(err)}
    else{res.redirect("/show/"+found._id)}
    })
})
//edit get route
app.get("/show/:id/reveiw/:rid/edit" ,function(req,res){
 reveiw.findById(req.params.rid, function(err,found){
  if(err){console.log(err)}
    else{res.render("reveiws/edit" , {rv: found , snowid: req.params.id})}
    })
})
//edit put route
app.put("/show/:id/reveiw/:rid"  ,function(req,res){
   reveiw.findByIdAndUpdate(req.params.rid, req.body.reveiw, function(err, update){ 
    if(err){res.redirect("back")}
    else{res.redirect("/show/"+req.params.id)}
   })
})
//delete route
app.delete("/show/:id/reveiw/:rid"  ,function(req,res){
      reveiw.findByIdAndRemove(req.params.rid, function(err, update){ 
        if(err){console.log(err);res.redirect("/home")}
    else{
            
      res.redirect("back")}
  })
})
////////////////////////////////////////////////////



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
// function checkOwner(req, res ,next){
//   if(req.isAuthenticated()){
//     Campground.findById(req.params.id, function(err, found){
//             if(err){
//               res.redirect("/campgrounds")
//             } else {
//               if(found.author.id.equals(req.user._id)){
//                 next()
//               } else {
//                 res.send("no autherizetion")
//                 }
//               }         
//     })
//   } else {res.redirect("back")}
// }
var port = process.env.PORT || 3000;   //is made to make it start on port 3000 
app.listen(port, function () { 
  console.log("Server Has Started!"); 
}); 