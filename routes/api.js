var express=require("express");
var router=express.Router();
var listModal=[];
var id=1;

router.post("/addList",function(req,res){
    var newlist={
        id:id,
        title:req.body.title,
        content:req.body.content,
        status:false
    };
    listModal.push(newlist);
    id++;
    res.json({"status":0,"msg":"success","data":newlist});
});
router.get("/getList",function(req,res){
    res.json(listModal);
});
router.post("/updateList",function(req,res){
    var id=req.body.id;
    var index=listModal.findIndex(item=>item.id==id);
    listModal[index].title=req.body.title;
    listModal[index].content=req.body.content;
    res.json({"status":0,"msg":"success"});
});
router.post("/removeList",function(req,res){
    var id=req.body.id;
    var index=listModal.findIndex(item=>item.id==id);
    listModal.splice(index,1);
    res.json({"status":0,"msg":"success"});
});
router.post("/changeStatus",function(req,res){
    var id=req.body.id;
    var index=listModal.findIndex(item=>item.id==id);
    if(listModal[index].status){
        listModal[index].status=false;
    }else{
        listModal[index].status=true;
    }
    res.json({"status":0,"msg":"success"});
});



module.exports=router;