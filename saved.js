var statusENUMS=
{
    ACTIVE: "ACTIVE",
        COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}


var todo={
    1:{title:"learn a" ,status:statusENUMS.ACTIVE},
    2:{title:"learn b" ,status:statusENUMS.COMPLETE},
    3:{title:"learn c" ,status:statusENUMS.ACTIVE},


}

var next_todo_id=4;

module.exports={
    statusENUMS:statusENUMS,
    todo:todo,
    next_todo_id:next_todo_id
}