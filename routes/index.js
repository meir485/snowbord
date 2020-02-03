var express = require("express"),
router = express.Router(),
passport       = require("passport"),
User           = require("../models/user")



router.get("/signup",function(req,res){
  res.render("signup")
})

router.post("/signup" , function(req , res){ 
  
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

router.get("/login",function(req,res){
  res.render("login")
})

router.post("/login" , passport.authenticate("local", 
    { 
      successRedirect: "/home", 
      failureRedirect: "/login" 
    }), function(req,res){}
) 

router.get("/logout" , function(req , res){
  req.logout()
  res.redirect("/home")
})


module.exports = router