var express    = require("express"), 
ejs            = require("ejs"),
bodyP          = require("body-parser"),  
mongoose       = require("mongoose"), 
passport       = require("passport"),
LocalStrategy  = require("passport-local"),
session        = require("express-session"),
User           = require("./models/user"),
reveiw         = require("./models/reveiw"),
methodOverride = require("method-Override"),
seed           = require("./models/seeds"),
prodact        = require("./models/prodact");    
app            = express();
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


rvRoutes = require("./routes/reveiws"), 
proRoutes = require("./routes/prodacts"), 
indexRoutes = require("./routes/index"), 
 
app.use(rvRoutes) 
app.use(proRoutes) 
app.use(indexRoutes) 



seed();








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