const addBtn = document.querySelector(".add-task")
const form = document.querySelector("form")
const creatBtn = document.querySelector(".create")
const taskForm = document.querySelector(".Task-Form")
const cancleTask = document.querySelector(".cancle-task")
const processIn = document.querySelector(".process-in-div")
const complete = document.querySelector(".complete-div")
const processInAns = document.querySelector(".ans")
const heading=document.querySelector(".heading")
const clearAll=document.querySelector(".clear-all")
const search=document.querySelector("#search")

const filter=document.querySelector(".filter")

const searchDiv=document.querySelector(".search-div")




 const h1=heading.childNodes[1]

if (!localStorage.getItem("TaskList")) {
    localStorage.setItem("TaskList", "[]");
}

if (!localStorage.getItem("TaskListComplete")) {
    localStorage.setItem("TaskListComplete", "[]");
}


const tasklist_Json=localStorage.getItem("TaskList")
const tasklistcomplete_Json=localStorage.getItem("TaskListComplete")


const taskList =JSON.parse(tasklist_Json);
const taskListComplete =JSON.parse(tasklistcomplete_Json);
var taskIndex=null;

//====== uiForProcessIn==========
const uiForProcessIn = () => {
     processIn.innerHTML = "";
    taskList.forEach((ele,index) => {
       if(!ele.taskStatus)
       {
          processIn.innerHTML += `
         
         
                <div class="ans">
                  
                    <div class="top">
                        <h1>${ele.taskName}</h1>
                        <p>${ele.taskPriority}</p>
                    </div>
                    <p> ${ele.taskDescription}</p>
                    <div class="bottom">
                        <button  onclick="taskDone('${ele.taskName}','${index}')" class="Done"> <i class="ri-check-double-line"></i>Done</button>
                        <div class="left">
                            <button onclick="taskEdit('${ele.taskName}','${index}')" class="Edit"><i class="ri-edit-box-line"></i> Edit</button>
                            <button onclick="taskDelectedformProcess('${index}')" class="Delete"><i class="ri-delete-bin-6-line"></i> Delete</button>
                        </div>
                    </div>
                    </div>
                
        `
       }
    })



}




//====== uiForComplete==========
const uiForComplete = () => {
 
    complete.innerHTML= "";
    taskListComplete.forEach((ele,index) => {
        complete.innerHTML+= `
         

                <div class="ans">

                 <div class="top">
                        <h1>${ele.taskName}</h1>
                        <p>${ele.taskPriority}</p>
                    </div>
                    <p> ${ele.taskDescription}</p>
                    <div class="bottom">
                          <h1> <i class="ri-check-double-line"></i> Completed</h1>
                        <div class="left">
                            
                            <button onclick="taskDelectedformComplete('${index}')" class="Delete"><i class="ri-delete-bin-6-line"></i> Delete</button>
                        </div>
                    </div>
                </div>
                
        `
    })


}


uiForComplete();
uiForProcessIn();


//======== event to create task ==========
addBtn.addEventListener("click", () => {
    h1.textContent=" Create Task"
    taskForm.style.display = "flex"

})

//===========event at form ===============
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = form[0].value;
    const taskDescription = form[1].value;
    const taskPriority = form[2].value;
    
    if (taskName === "" || taskDescription === "" || taskPriority === "none") {
        alert("all field requierd to fill and task category not be none ")
        return;

    }

    const taskObject = {
        taskName,
        taskDescription,
        taskPriority,
        taskStatus: false
    }

if (taskIndex!=null) {
    taskList[taskIndex]=taskObject;
    taskIndex=null
    localStorage.setItem("TaskList",JSON.stringify(taskList))
}else{
    
    taskList.push(taskObject);
    localStorage.setItem("TaskList",JSON.stringify(taskList))

}

    uiForProcessIn();

    form.reset();
    taskForm.style.display = "none"
     




})

//======== event to  close task ==========


cancleTask.addEventListener("click", () => {
    taskForm.style.display = "none"

})


//======== Function of Done btn task ==========


function taskDone(eleName,index){
    const ele=taskList.find((e)=>e.taskName===eleName);
   
    ele.taskStatus=true;
    taskList.splice(index,1)
taskListComplete.push(ele);
    localStorage.setItem("TaskListComplete",JSON.stringify(taskListComplete))
    localStorage.setItem("TaskList",JSON.stringify(taskList))



uiForComplete();
uiForProcessIn();
}


//======== function of edit btn task ==========

function  taskEdit(eleName,index){
    const ele=taskList.find((e)=>e.taskName===eleName);
    taskIndex=index;
 
     


    taskForm.style.display = "flex"
    
    h1.textContent="Edit Task"
    

    form[0].value=ele.taskName;
    form[1].value=ele.taskDescription
    form[2].value=ele.taskPriority
     localStorage.setItem("TaskList",JSON.stringify(taskList))
    
}

function taskDelectedformProcess(index){
    var conf1 = confirm("you want to delete task")
    if(conf1){

        taskList.splice(index,1)
        uiForProcessIn();
        localStorage.setItem("TaskList",JSON.stringify(taskList))
    }
    
}
function taskDelectedformComplete(index){
    var conf2 = confirm("you want to delete task")
    if(conf2)
    {

        taskListComplete.splice(index,1)
        uiForComplete();
        localStorage.setItem("TaskListComplete",JSON.stringify(taskListComplete))
    }

}



clearAll.setAttribute("onclick","taskAllClear()")
function taskAllClear(){
   var comfirmation=confirm("you want to clear all task ")
   if (comfirmation) {
    taskList.length = 0;
taskListComplete.length = 0;
    uiForComplete();
uiForProcessIn();
   localStorage.setItem("TaskListComplete",JSON.stringify(taskListComplete))
    localStorage.setItem("TaskList",JSON.stringify(taskList))

   }


}

search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        let duplicateIndex = -1;


        taskList.forEach((ele, index) => {
            if (ele.taskName === search.value) {
                duplicateIndex = index;
           
            }
        });

        if (duplicateIndex !== -1) {
            [taskList[0], taskList[duplicateIndex]] =
                [taskList[duplicateIndex], taskList[0]];

            uiForProcessIn();
        }


        let duplicateIndex2 = -1;


               taskListComplete.forEach((ele, index) => {
            if (ele.taskName === search.value) {
                duplicateIndex2 = index;
           
            }
        });

        if (duplicateIndex2 !== -1) {
            [taskListComplete[0], taskListComplete[duplicateIndex2]] =
                [taskListComplete[duplicateIndex2], taskListComplete[0]];

             uiForComplete();
        }
    }
});


function createelment(){
    const div=document.createElement("div")
    div.style.display="flex";
    div.style.width="20%";
     div.style.color="white"
 div.style.background="#191919"
 

//  div.style.position=" absolute"
 div.style.borderRadius="0.8rem"
 div.style.padding="0rem"


var value = ["Immediately", "Important", "Delay"];
 value.forEach((ele)=>{
    const divInner=document.createElement("div")

    const p=document.createElement("input")
    const pl=document.createElement("label")

    p.setAttribute("type","radio")
    p.setAttribute("value",ele)
    p.setAttribute("name","option")
    p.classList.add("radio-btn")
   

    pl.textContent=ele;

    divInner.append(p,pl)
    div.append(divInner)

   
    p.style.width="18%"

    p.style.padding="0"
   
    divInner.style.height="3rem"
    divInner.style.display="flex"
    divInner.style.gap="0rem"
    divInner.style.flexDirection="column"
    // divInner.style.justifyContent="center"
    divInner.style.alignItems="center"
    divInner.style.width="33%"
    pl.style.fontSize="0.8rem"
    divInner.style.padding="0.5rem"


 })

 
    
 
  
 

 

 

return div;

}
function rearrangeTask(radioValue) {
    taskList.sort((a, b) => {
        if (a.priority === radioValue && b.priority !== radioValue) {
            return 1;
        }

        if (a.priority !== radioValue && b.priority === radioValue) {
            return -1;
        }

        return 0;
    });
                console.log(taskList)


    
}

let ele;
let flag = true;

filter.addEventListener("click", () => {
    if (flag) {
        ele = createelment();
        searchDiv.append(ele);

        const radioBtns = document.querySelectorAll(".radio-btn");

        radioBtns.forEach((radio) => {
            radio.addEventListener("click", () => {
                rearrangeTask(radio.value);
            
            });
        });

        flag = false;
    } else {
        ele.style.display = "none";
        filter.style.display = "block";

        flag = true;
    }
});

 