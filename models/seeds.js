var mongoose = require("mongoose");
var prodact = require("./prodact");
var Comment   = require("./comment");



var data = [
{image:"/images/mens/1.webp", name:"t0", description:"", id:"0", type:"men"},
{image:"/images/mens/2.webp", name:"t1", description:"", id:"1", type:"men"},
{image:"/images/mens/3.webp", name:"t2", description:"", id:"2", type:"men"},
{image:"/images/mens/4.webp", name:"t3", description:"", id:"3", type:"men"},
{image:"/images/mens/4.webp", name:"t4", description:"", id:"4", type:"men"},
{image:"/images/mens/5.webp", name:"t5", description:"", id:"5", type:"men"},
{image:"/images/women/1.webp", name:"t0", description:"", id:"0", type:"women"},
{image:"/images/women/2.webp", name:"t1", description:"", id:"1", type:"women"},
{image:"/images/women/3.webp", name:"t2", description:"", id:"2", type:"women"},
{image:"/images/women/4.webp", name:"t3", description:"", id:"3", type:"women"},
{image:"/images/women/4.webp", name:"t4", description:"", id:"4", type:"women"},
{image:"/images/women/5.webp", name:"t5", description:"", id:"5", type:"women"}
]
function seedDB(){
prodact.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                prodact.create(seed, function(err, pro){
                    if(err){
                        console.log(err)
                    } else {
                        pro.save()
                        console.log("added a prodact");
                        //create a comment
                    }
                });
            });
        });
    }); 
    //add a few comments
}

 
module.exports = seedDB;