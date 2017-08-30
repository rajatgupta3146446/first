var express=require('express');




var mytodo=require('./saved');
console.log(mytodo);

var app=express();

app.use("/",express.static(__dirname+"/public"));


var bodyparser=require('body-parser');
app.use("/",bodyparser.urlencoded({extended:false}));


app.get("/api/todos",function(req,res)
    {
    res.send(mytodo.todo);
});

app.delete("/api/todos/:id",function(req,res)
{
    var id=req.params.id;
    var obj=mytodo.todo[id];
    if(!obj)
    {
        res.status(400).json({error : "todo does not exist"});
    }
    else
    {obj.status=mytodo.statusEnums.DELETED;
    res.send(mytodo);
    }

});

app.post("/api/todos",function(req,res)
{

     var todo=req.body.todo_title;

     if(!todo || todo==""||todo.trim()=="")
     {
         res.status(400).json({error:"todo title can not be empty"});
     }
     else
    {
        var newtodo={
            title:req.body.todo_title,
            status:mytodo.statusENUMS.ACTIVE
                      };
        mytodo.todo[mytodo.next_todo_id++]=newtodo;
        res.json(mytodo.todo);


    }

})

app.put("/api/todo",function(req,res)
{

    var todo=req.query;
  // todo.id;
  // todo.title;
    if(!  todo.id ||   todo.id =="" ||   todo.id.trim()=="")
    {
        res.status(400).json({error:"todo id can not be empty"});
    }
    else
    {
    mytodo.todo[ todo.id].title=todo.title;

        res.json(mytodo.todo);

    }
})

// noinspection JSAnnotator
app.get("/api/todos/active",function(req,res)
{
    var obj=new Object();

    var active=mytodo.statusENUMS.ACTIVE;
   for(var i=1;i<mytodo.next_todo_id;i++)
   {
  var stat=mytodo.todo[i].status;

       if(stat==active)
       {
           obj[i]=mytodo.todo[i];
       }
   }

   if(obj)
   {
       console.log("sent");
       res.json(obj);
   }
   else
   {
       console.log("error");
       res.status(400).json({error:"no active todos "});
   }
});

app.get("/api/todos/complete",function(req,res)
{var obj=new Object();

    var active=mytodo.statusENUMS.COMPLETE;
    for(var i=1;i<mytodo.next_todo_id;i++)
    {
        var stat=mytodo.todo[i].status;

        if(stat==active)
        {
            obj[i]=mytodo.todo[i];
        }
    }

    if(obj)
    {
        console.log("sent");
        res.json(obj);
    }
    else
    {
        console.log("error");
        res.status(400).json({error:"no active todos "});
    }
});

app.get("/api/todos/deleted",function(req,res)
{
    var obj=new Object();

    var active=mytodo.statusENUMS.DELETED;
    for(var i=1;i<mytodo.next_todo_id;i++)
    {
        var stat=mytodo.todo[i].status;

        if(stat==active)
        {
            obj[i]=mytodo.todo[i];
        }
    }

    if(obj)
    {
        console.log("sent");
        res.json(obj);
    }
    else
    {
        console.log("error");
        res.status(400).json({error:"no active todos "});
    }
    });



app.put("/api/todos/complete/:id",function(req,res)
{
    var todo=req.params;

    if(!  todo.id ||   todo.id =="" ||   todo.id.trim()=="")
    {
        res.status(400).json({error:"todo id can not be empty"});
    }
    else
    {
        mytodo.todo[todo.id].status=mytodo.statusENUMS.COMPLETE;

        res.json(mytodo.todo);

    }
})

app.put("/api/todos/active/:id",function(req,res)
{

    var todo=req.params;
    // todo.id;
    // todo.title;
    if(!  todo.id ||   todo.id =="" ||   todo.id.trim()=="")
    {
        res.status(400).json({error:"todo id can not be empty"});
    }
    else
    {



        mytodo.todo[ todo.id].status=mytodo.statusENUMS.ACTIVE;

        res.json(mytodo.todo);

    }
})


app.listen(3000);