var express = require("express"),
router = express.Router(),
reveiw         = require("../models/reveiw"),
prodact     = require("../models/prodact");    



////////////////////review routes/////////////////////////
//new get route      
router.get("/show/:id/reveiw/new" ,function(req,res){
  prodact.findById(req.params.id, function(err,found){
  if(err){console.log(err)}
    else{res.render("reveiws/new" , {pro: found})}
    })
})
//new post route
router.post("/show/:id/reveiw" , isLoggedIn ,function(req,res){
  
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
router.get("/show/:id/reveiw/:rid/edit" ,function(req,res){
 reveiw.findById(req.params.rid, function(err,found){
  if(err){console.log(err)}
    else{res.render("reveiws/edit" , {rv: found , snowid: req.params.id})}
    })
})
//edit put route
router.put("/show/:id/reveiw/:rid"  ,function(req,res){
   reveiw.findByIdAndUpdate(req.params.rid, req.body.reveiw, function(err, update){ 
    if(err){res.redirect("back")}
    else{res.redirect("/show/"+req.params.id)}
   })
})
//delete route
router.delete("/show/:id/reveiw/:rid"  ,function(req,res){
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
module.exports = router