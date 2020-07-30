var express=require("express");
var router=express.Router();
var listModel=require("../models/listModel.js");
var id=0;

router.post("/addList",function(req,res){
    id++;
    var newlist=new listModel({
        id:id,
        title:req.body.title,
        content:req.body.content,
        status:false
    });
    newlist.save(function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
            console.log("add error");
        }else{
            res.json({"status":0,"msg":"success","data":data});
            console.log("add success");
        };
    });
});
router.get("/getList",function(req,res){
    listModel.find(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    });
});
router.post("/updateList",function(req,res){
    var listId=req.body.id;
    listModel.update({id:listId},{
        title:req.body.title,
        content:req.body.content
    },function(err){
        if(err){
            console.log(err);
            res.json({"status":1,"msg":"error1"});
        }else{
            res.json({"status":0,"msg":"success"});
        }
    });
});
router.post("/removeList",function(req,res){
    var listId=req.body.id;
    listModel.remove({id:listId},function(err,data){
        if(err){
            console.log(err);
            res.json({"status":1,"msg":"error"});
        }else{
            res.json({"status":0,"msg":"success"});
        }
    });
});
router.post("/changeStatus",function(req,res){
    var listId=req.body.id;
    listModel.find({id:listId},function(err){
        if(err){
            console.log(err);
            res.json({"status":1,"msg":"error"});
        }else{
            if(listModel.status){
                listModel.status=false;
            }else{
                listModel.status=true;
            }
            res.json({"status":0,"msg":"success"});
        }
    });
});


module.exports=router;