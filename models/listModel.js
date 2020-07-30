var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo",{useNewUrlParser:true});

var db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",function(){
  console.log("Connected!");
});

var listSchema=new mongoose.Schema({
    id:Number,
    title:String,
    content:String,
    status:Boolean
});
listSchema.set("collection","list");
var model=mongoose.model("list",listSchema);
//一定要記得export!!!
module.exports = model;