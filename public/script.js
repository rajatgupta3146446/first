const RESPONSE_DONE=4
const satus_ok=200




function gettodoajax()
{
    console.log("below are all todos");

    var r=new XMLHttpRequest();
    r.open("GET","/api/todos",true);
    r.onreadystatechange=function () {
        if(this.readyState==RESPONSE_DONE && this.status==satus_ok)
        {
            console.log(r.responseText);
            var v=JSON.parse(r.responseText);
            var str="";
          for(var i=1;i<4;i++)
            {
               str+=(v[i].title+" "+v[i].status +"<br>");
            }
            document.getElementById("todos").innerHTML=str;
        }
    }
r.send(data=null);


}
