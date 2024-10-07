const cl=console.log;

const todoForm=document.getElementById("todoForm");
const todoitemControl=document.getElementById("todoitem");
const todoContainer=document.getElementById("todoContainer");
const info=document.getElementById("info");
const AddBtn=document.getElementById("AddBtn");
const updateBtn=document.getElementById("updateBtn");


const snackbar=((title,icon)=>{
    swal.fire({
        title:title,
        icon:icon,
        timer:3000,
    })
})


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const onEdit=(ele)=>{
    let editId=ele.closest("li").id;
    localStorage.setItem("editId", editId);
    let getObj=todoArr.find(obj=>obj.todoId===editId);
    
    todoitemControl.value=getObj.todoitem;
    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
   
}


const onRemove=(ele)=>{
    
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    let removeId=ele.closest("li").id;
    let getIndex=todoArr.findIndex(obj=>obj.todoId===removeId);
    
    todoArr.splice(getIndex,1);

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    ele.closest("li").remove();

    snackbar(`the todoitem remove is successFully!!`, `success`);

    onMsgTodo();
  }
});
    
    // cl(getIndex);
}

let todoArr=JSON.parse(localStorage.getItem("todoArr")) || [];


const onMsgTodo=()=>{
    if(todoArr.length === 0){
        info.classList.remove("d-none");
        todoContainer.classList.add("d-none");
    }else{
        info.classList.add("d-none");
        todoContainer.classList.remove("d-none");
    }
}

onMsgTodo();


const tempArr=(arr)=>{
    let result=`<ul class="list-group">`;
    arr.forEach((todo)=>{
        result+=`
                <li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
                    <span>${todo.todoitem}</span>
                    <span>
                        <i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i>
                        <i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i>
                    </span>
                </li>
        `

        result+=`</ul>`;
    })
    todoContainer.innerHTML=result;
}

if(todoArr.length > 0){
    tempArr(todoArr);
}

const onTodoForm=(ele)=>{
    ele.preventDefault();

    let todoObj={
        todoitem:todoitemControl.value,
        todoId:uuid(),
    }

    
    todoArr.push(todoObj);
    
   if(todoContainer.querySelector("ul")){
        let list=document.createElement("li");
        list.id=todoObj.todoId;
        list.className=`list-group-item d-flex justify-content-between`;
        list.innerHTML=`
                         <span>${todoObj.todoitem}</span>
                         <span>
                             <i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i>
                             <i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i>
                         </span>
        
        `
    
        todoContainer.querySelector("ul").append(list);
   }else{
       tempArr(todoArr);
   }
    
   localStorage.setItem("todoArr",JSON.stringify(todoArr));
   snackbar(`the ${todoObj.todoitem} Added is successFully!!`, `success`);
   
    ele.target.reset();
    onMsgTodo();

   

}

const onUpdateBtn=()=>{
    let updateId=localStorage.getItem("editId");
    let updateObj={
        todoitem:todoitemControl.value,
        todoId:updateId,
    }

    let getIndex=todoArr.findIndex(obj=> obj.todoId===updateId);

    todoArr[getIndex]=updateObj;

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    let list=document.getElementById(updateId).firstElementChild;

    list.innerHTML=`${updateObj.todoitem}`

    todoForm.reset();

    updateBtn.classList.add("d-none");
    AddBtn.classList.remove("d-none");

    snackbar(`the ${updateObj.todoitem} updated is successFully!!`, `success`);

}




todoForm.addEventListener("submit", onTodoForm);
updateBtn.addEventListener("click", onUpdateBtn);