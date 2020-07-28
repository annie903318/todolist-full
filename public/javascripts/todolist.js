// var todolist=[];
// var id=1;

function addList(){
    var title=$('#title').val();
    var message=$("#message").val();
    if(title=="" || message==""){
        alert("請輸入標題和內容");
    }else{
        $.post("http://localhost:3000/api/addList",{
            "title":title,
            "content":message
        },function(res){
            newList(res.data);
            $("#title").val("");
            $("#message").val("");
        });


        // var newtodo={
        //     "id":id,
        //     "title":title,
        //     "content":message,
        //     "status":false
        // };
        // todolist.push(newtodo);
        // newList(newtodo);
        // id++;
        // //欄位清空
        // $("#title").val("");
        // $("#message").val("");
    }
}
function getList(){
    $.get("http://localhost:3000/api/getList",function(data,status){
        for(var i=0;i<data.length;i++){
            newList(data[i]);
        }
    });
}
getList();
function newList(data){
    //todo狀態，todo是否完成
    var status=(data.status)?"checked":"";
    var titleClass=(data.status)?"title2":"title";
    var messageClass=(data.status)?"message2":"message";
    var editClass=(data.status)?"none":"inline";

    var content=
    `<div class="content" id="${data.id}">
        <div class="${titleClass}">
            <input type="checkbox" onclick="changeStatus(${data.id},this)" />
            <text id="title${data.id}">${data.title}</text>
            <button class="i_btn" onclick="removeList(${data.id})">刪除</button>
            <button class="i_btn" id="edit${data.id}" onclick="editList(${data.id})" style="display: ${editClass};">修改</button>
            <button class="i_btn" id="update${data.id}" onclick="updateList(${data.id})" style="display: none;">確認</button>
        </div>
        <div class="${messageClass}">
            <text id="message${data.id}">${data.content}</text>
        </div>
    </div>`;
    $("body").append(content);
}
function editList(id){
    //修改按鈕隱藏，顯示確認按鈕
    $("#edit"+id).css("display","none");
    $("#update"+id).css("display","inline");
    //新增節點，修改標題的input
    var input=document.createElement("input");
    input.type="text";
    input.id="edit_title"+id;
    input.value=$("#title"+id).text();
    input.size=Math.max(20/4*3,4);
    //隱藏原title的text
    $("#title"+id).css("display","none");
    //在父層插入input
    $("#title"+id).parent().append(input);
    //新增節點，修改內容的input
    var message_input=document.createElement("input");
    message_input.type="text";
    message_input.id="edit_message"+id;
    message_input.value=$("#message"+id).text();
    message_input.size=Math.max(50/4*3,4);
    //隱藏原content的text
    $("#message"+id).css("display","none");
    //在父層插入input
    $("#message"+id).parent().append(message_input);
}
function updateList(id){
    //原text的值改為修改input的值
    var title=$("#edit_title"+id).val();
    var message=$("#edit_message"+id).val();
    $.post("http://localhost:3000/api/updateList",{
        "id":id,
        "title":title,
        "content":message
    },function(res){
        if(res.status==0){
            $("#title"+id).text(title);
            $("#message"+id).text(message);
            //確認按鈕隱藏，顯示修改按鈕
            $("#edit"+id).css("display","inline");
            $("#update"+id).css("display","none");
            //顯示原text
            $("#title"+id).css("display","inline");
            $("#message"+id).css("display","inline");
            //移除修改時的input節點
            $('#edit_title' + id).remove();
            $('#edit_message' + id).remove();
        }
    });
}
function removeList(id){
    $.post("http://localhost:3000/api/removeList",{
        "id":id
    },function(res){
        if(res.status==0){
            $("#"+id).remove();
        }
    });
    // var index=todolist.findIndex(element=>element.id==id);
    // todolist.splice(index,1);
    // $("#"+id).remove();
}
function changeStatus(id,btnstatus){
    //btnstatus為checkbox checked與否
    var title=btnstatus.parentNode;
    //跟title同一階層的下一個節點
    var message=title.nextElementSibling;
    $.post("http://localhost:3000/api/changeStatus",{
        "id":id,
        "status":btnstatus.checked
    },function(res){
        if(res.status==0){
           //當checkbox被點選，隱藏修改&確認按鈕
            if(btnstatus.checked){
                title.className="title2";
                message.className="message2";
                $("#edit"+id).css("display","none");
                $("#update"+id).css("display","none");
                //項目若是在修改中的狀態，則是要重新轉為文字模式並把輸入框移除
                if(document.getElementById("edit_title"+id)){
                    $("#title"+id).css("display","inline");
                    $('#message'+id).css("display","inline");
                    $('#edit_title'+id).remove();
                    $('#edit_message'+id).remove();
                }
            }else{
                title.className="title";
                message.className="message";
                $("#edit"+id).css("display","inline");
            }
        }
    });
    
}