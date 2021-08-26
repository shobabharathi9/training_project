var dept_len;
//Fetching the Data from db.json using json server
function getDept(){
    fetch("http://localhost:3000/employees").then((res)=>{
       return res.json();
   }).then((dept)=>{
       console.log(dept);
       //console.log(dept.length);
       dept_len = dept.length
       var table = document.getElementById('table_dta')
       for(var i=0; i<dept.length; i++){
        var row = `<tr>
         <td>`+ dept[i].id+`</td>
         <td>`+ dept[i].first_name+`</td>
         <td>`+ dept[i].last_name+`</td>
         <td>`+ dept[i].email+`</td>
         <td>`+ dept[i].Select_Any_Book+`</td>
         <td>`+ dept[i].Message+`</td>
         <td><a onclick="myedit(`+dept[i].id+`)"><i class="fas fa-edit" style="color: lightgreen;"></i>&nbsp; Edit</a> | 
         <a onclick="myDelete(`+dept[i].id+`)"> <i class="fa fa-trash" aria-hidden="true" style="color: tomato;"></i>  Delete</a></td> 
        </tr>`
        table.innerHTML += row
       }
   })
}
getDept()

function modal(){
    $("#myModal").modal();
    var form = document.getElementById('form');
    console.log(form)
    form.onsubmit =  function (){
      addDept()
    }
}

function addDept(){
    let dept ={
       "id" : dept_len + 1,
       "first_name" : document.getElementById('form_name').value,
       "last_name" : document.getElementById('form_lastname').value,
       "email" : document.getElementById('form_email').value,
       "Select_Any_Book" : document.getElementById('form_need').value,
       "Message" : document.getElementById('form_message').value 
    }
    fetch('http://localhost:3000/employees/',{
         method: 'POST',
         headers:{
            'Content-Type':'application/json' 
         },
         body:JSON.stringify(dept)
     }).then((res)=>{
       console.log(res);
       
       $("#myModal").modal('hide');
       getDept()
     })
}

function myedit(id){
    // debugger
    $("#myModal").modal('show');
    var form = document.getElementById('form');
    // console.log(form)
    
    form.onsubmit =  function (){
        editDept(id)
      }
 }


  //Updating the Data in db.json using json server
  function editDept(ID){
    let edit ={
        "id" : ID,
        "first_name" : document.getElementById('form_name').value,
        "last_name" : document.getElementById('form_lastname').value,
        "email" : document.getElementById('form_email').value,
        "Select_Any_Book" : document.getElementById('form_need').value,
        "Message" : document.getElementById('form_message').value 
     }

     console.log(edit)
    fetch("http://localhost:3000/employees/"+ID,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(edit)
    }).then((res)=>{
        console.log(res);
        getDept()
    })
}
 
  function myDelete(id){
    deleteDept(id)
  }

  
//Deleting Data in db.json using json server
function deleteDept(Id){
    fetch("http://localhost:3000/employees/"+Id,{
       method:"DELETE",
       headers:{
           "Content-Type":"application/json"
       }
      }).then((res)=>{
        console.log(res);
        if(confirm('Are you sure you want to delete this record?')){
        getDept()
        window.location.reload()
        }
   })
}