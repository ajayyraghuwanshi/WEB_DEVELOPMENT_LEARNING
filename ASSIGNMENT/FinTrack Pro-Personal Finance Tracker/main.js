const deshboard = document.querySelector("#Deshboard")
const setting = document.querySelector("#Settings")
const section = document.querySelector("section")
const sesttingPage = document.querySelector(".setting")
const addTransactionBtn = document.querySelector("#AddTrans")
const addTransactionMenu = document.querySelector(".addTransaction-menu")
const closeX = document.querySelector("#closeX")
const LogOut = document.querySelector("#logOut")



const addTransactionForm = document.querySelector("#addTransactionForm")
const saveTrans = document.querySelector("#save-btn")
const usernameDispaly = document.querySelector(".username-display")
const usernameDispaly2 = document.querySelector(".username-display2")

 

const CB = document.querySelector(".CB")
const TI = document.querySelector(".TI")
const TE = document.querySelector(".TE")
const TT = document.querySelector(".TT")



const curveofincome = document.querySelector(".income-graph");
const curveofexpense = document.querySelector(".expense-graph");
const graphNumDiv = document.querySelector(".graph-num-div")



const settingForm=document.querySelector(".setting-form")
 

var country="$"


var totalCB = 0.00;
var totalTI = 0.00;
var totalTE = 0.00;
var totalTT = 0.00;




const registerUser = localStorage.getItem("User")
const Users = JSON.parse(registerUser)
const currentUser = localStorage.getItem("CurrentUser");



var UserObject;
var UserObjectIndex;




var UserData;
Users.forEach((element, index) => {
    if (element.username == currentUser) {
        UserObject = element
        UserObjectIndex = index
        UserData = element.UserData
    }
});





usernameDispaly.innerHTML = `${currentUser}`
usernameDispaly2.innerHTML = `${currentUser}`
graph() 
 




//============== buttons ===================================



deshboard.style.backgroundColor = "#dbeafe";
deshboard.style.color = "#0056b3";



deshboard.addEventListener("click", () => {
    deshboard.style.backgroundColor = "#dbeafe";
    deshboard.style.color = "#0056b3";
    setting.style.backgroundColor = "";
    setting.style.color = "";

    section.style.display = "block"
    sesttingPage.style.display = "none"

})


setting.addEventListener("click", () => {
    deshboard.style.backgroundColor = "";
    deshboard.style.color = "";
    setting.style.backgroundColor = "#dbeafe";
    setting.style.color = "#0056b3";

    sesttingPage.style.display = "block"
    section.style.display = "none"

})


addTransactionBtn.addEventListener("click", () => {
    addTransactionMenu.style.display = "flex";

})


closeX.addEventListener("click", () => {
    addTransactionMenu.style.display = "none";
})


LogOut.addEventListener("click", () => {
    if (confirm("you want to log out !")) {
        window.location.href = "./index.html"
    }
})



//==================== Form =======================



const answer = document.querySelector(".detail-container")
const headOfTrans = document.querySelector(".head-of-trans")



var userIndex = null;



var ui = () => {
    var id = 1
    answer.innerHTML = ""

    UserData.forEach((ele, index) => {
        if (ele.type == "Income") {
            answer.innerHTML += `
         <div class="answer tag">             
         <p>${ele.date}</p>
         <p style="color:black">${ele.description} </p>
         <p>${ele.category} </p>
         <p style="color:green">+${country} ${ele.amount}</p>
         <p  ><i class="ri-edit-2-fill  " onclick="edit('${id}','${index}')"></i> <i class="ri-delete-bin-7-fill " onclick="del('${id}','${index}')"></i> </p>
         </div>
        `}
        else {
            answer.innerHTML += `
         <div class="answer tag">             
         <p>${ele.date}</p>
         <p style="color:black">${ele.description} </p>
         <p>${ele.category} </p>
         <p style="color:red">-${country} ${ele.amount}</p>
         <p  ><i class="ri-edit-2-fill  " onclick="edit('${id}','${index}')"></i> <i class="ri-delete-bin-7-fill " onclick="del('${id}','${index}')"></i> </p>
         </div>
         ` }
        id++
    })
}


ui();
 
var id_number = 1
addTransactionForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const type = event.target[0].value
    const description = event.target[1].value
    const amount = Number(event.target[2].value);
    const date = event.target[3].value
    const category = event.target[4].value

    let userObj = {
        id_number,
        type,
        description,
        amount,
        date,
        category
    }

    if (userIndex != null) {
        UserData[userIndex] = userObj;
        UserObject.UserData = UserData
        Users[ UserObjectIndex] = UserObject
        localStorage.setItem("User", JSON.stringify(Users))
        userIndex = null
    }
    else {
        UserData.push(userObj);
        UserObject.UserData = UserData
        Users[UserObjectIndex] = UserObject
        localStorage.setItem("User", JSON.stringify(Users))
        ui();
    }

    cal()
  graph() 


    addTransactionForm.reset()
   
 
addTransactionMenu.style.display = "none";
 

    id_number++
})



function edit(userId, index) {
    const ele = UserData.find((e) => e.id_number == userId)
    userIndex = index;

    addTransactionMenu.style.display = "flex";
    headOfTrans.innerHTML = ` Edit Transaction`

    addTransactionForm[0].value = ele.type
    addTransactionForm[1].value = ele.description
    addTransactionForm[2].value = ele.amount
    addTransactionForm[3].value = ele.date
    addTransactionForm[4].value = ele.category
}



function del(userId, index) {
    if (confirm("you want to delete  transaction")) {
        UserData.splice(index, 1)
        UserObject.UserData = UserData
        Users[UserObjectIndex] = UserObject
        localStorage.setItem("User", JSON.stringify(Users))
        ui();
        cal();
        graph();
    }
}



const delallBtn = document.querySelector("#delall")
delallBtn.setAttribute("onclick", "delall()")



function delall() {
    if (confirm("you want to clear all  transaction ")) {
        UserData.length = 0;
        UserObject.UserData = UserData
        Users[UserObjectIndex] = UserObject
        localStorage.setItem("User", JSON.stringify(Users))
        ui()
        cal()
        graph();

    }
}



saveTrans.setAttribute("onclick", "cal()")
function cal() {
    totalCB = 0.00;
    totalTI = 0.00;
    totalTE = 0.00;
    totalTT = 0.00;

    UserData.forEach((ele) => {

        if (ele.type == "Income") {
            totalTI += ele.amount
        }
        else {
            totalTE += ele.amount
        }
    })

    CB.innerHTML = ``
    TI.innerHTML = ``
    TE.innerHTML = ``
    TT.innerHTML = ``

    CB.innerHTML = `${country}${totalTI - totalTE}`
    TI.innerHTML = `${country}${totalTI}`
    TE.innerHTML = `${country}${totalTE}`
    TT.innerHTML = `${country}${totalTI + totalTE}`
}



function creategraphnumber() {
    let maximumBalance = (totalTI >= totalTE) ? totalTI : totalTE;
    let p=Math.ceil(maximumBalance / 5)

    var div = document.createElement("div")
    div.classList.add("graph-num")

    var num = [p*1,p*2,p*3,p*4,p*5]
    if (totalTI === 0 && totalTE === 0)
    {
        num=[2,4,6,8,10]
    }
    num.reverse()
    num.forEach(ele => {
        var para = document.createElement("p")
        para.innerHTML = `${ele}`
        div.append(para)
    })
     var p1 = document.createElement("p")
        p1.innerHTML = `0`
        div.append(p1)
        return div;
}



function graph() {
    graphNumDiv.innerHTML=``
   graphNumDiv.append( creategraphnumber())

       if (totalTI === 0 && totalTE === 0) {
        curveofincome.style.height = "0%";
        curveofexpense.style.height = "0%";
        return;
    }
   if (totalTI >= totalTE) {
        curveofincome.style.height = "100%";
        curveofexpense.style.height = `${(totalTE / totalTI) * 100}%`;
    } else {
        curveofexpense.style.height = "100%";
        curveofincome.style.height = `${(totalTI / totalTE) * 100}%`;
    }
}




settingForm.addEventListener("submit",(event)=>{
    event.preventDefault();

 if ( event.target[0].value!==""&&confirm("you want to change name")) {
     
     usernameDispaly.textContent ="";
    usernameDispaly.textContent = event.target[0].value
    usernameDispaly2.textContent="";
    usernameDispaly2.textContent= event.target[0].value
    
 }
   country=event.target[1].value
   cal();    
    ui();   
    alert("change is saved")  

     
})