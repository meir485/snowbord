var mongoose = require("mongoose");
var Prodact  = require("./prodact");
var Reveiw   = require("./reveiw");
var User     = require("./user");
var passport = require("passport");

User.remove({}, function(err){
    if(err){
            console.log(err);
        }else{
            console.log("all users removed")
        }
})

var jony = new User({username: "jony"})
                            User.register(jony , "jony" , function(err, user){
                                        if(err){  console.log(err); } 
                                        passport.authenticate("local")(function(){
                                        console.log("user created")
                                        })
                                        })
var meir = new User({username: "meir"})
                            User.register(meir , "meir" , function(err, user){
                                        if(err){  console.log(err); } 
                                        passport.authenticate("local")(function(){
                                        console.log("user created")
                                        })
                                        })

var users=[jony , meir]
var data = [
{image:"/images/mens/1.webp", name:"t0", description:"",  type:"men"},
{image:"/images/mens/2.webp", name:"t1", description:"",  type:"men"},
{image:"/images/mens/3.webp", name:"t2", description:"",  type:"men"},
{image:"/images/mens/4.webp", name:"t3", description:"",  type:"men"},
{image:"/images/mens/4.webp", name:"t4", description:"",  type:"men"},
{image:"/images/mens/5.webp", name:"t5", description:"",  type:"men"},
{image:"/images/women/1.webp", name:"t0", description:"",  type:"women"},
{image:"/images/women/2.webp", name:"t1", description:"",  type:"women"},
{image:"/images/women/3.webp", name:"t2", description:"",  type:"women"},
{image:"/images/women/4.webp", name:"t3", description:"",  type:"women"},
{image:"/images/women/4.webp", name:"t4", description:"",  type:"women"},
{image:"/images/women/5.webp", name:"t5", description:"",  type:"women"}
]
var col1 = ["red","blue","black"]
var col2 = ["pink","yellow","green"]

function seedDB(){
Prodact.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all");
        Reveiw.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few prodacts
            var i=1; 
            var m=0;
            data.forEach(function(seed){
                //create prodact
                Prodact.create(seed, function(err, pro){
                    //asign users for prodact
                    us = users[m];
                    console.log(m+" . "+us)
                    m=m+i;
                    i=i*(-1);
                    pro.author.id = us._id;
                    pro.author.username = us.username;
                    pro.company = "burton"
                    pro.colors.push(col1[Math.floor(Math.random() * 2)])
                    pro.colors.push(col2[Math.floor(Math.random() * 2)])
                    pro.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et dolor bibendum, volutpat enim a, fermentum magna. Morbi vel tristique nisi. Fusce ullamcorper, orci at dignissim fermentum, libero tortor ultricies ex, id consequat felis massa vel nunc. Curabitur ut felis sed magna tempor auctor non viverra ipsum. Duis viverra ac mi sit amet sollicitudin. Mauris lacinia mollis purus, eu bibendum sapien posuere at. Vivamus a erat at nunc semper elementum. Nulla pellentesque, lorem et feugiat ullamcorper, felis ex tempus elit, quis blandit elit tellus vel tortor. Nam eros nisi, euismod ac auctor non, pretium id eros. Quisque non nulla vel enim maximus luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
                    if(err){
                        console.log(err)
                        } else {
                        //add reveiw
                        Reveiw.create({
                                text: "nice snow bord but mine is way better" , 
                                star: Math.floor(Math.random() * 5) + 1,                               
                                author: {id:users[m]._id, username: users[m].username} },
                                function(err, rv){
                                if(err){
                                    console.log(err);
                                } else {
                                      
                                      pro.reveiws.push(rv)
                                      pro.save()
                                      console.log("added a prodact");
                                }
                          
                    })
                    



                        
                        //create a comment
                    }
                });
            });
        });
    }); 
    //add a few comments
}

 
module.exports = seedDB;