 const  LoginForm = document.querySelector("#Login-Form")
  
 
 
const registerUser = localStorage.getItem("User")

const User = JSON.parse(registerUser)
 

let checkUser = (uname,pass) => {
   for (const ele of User) {
        if (uname === ele.username && pass === ele.password) {
            return true;
        }
    }

    alert("Username and Password is wrong!");
    return false;

}

 LoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let uname = LoginForm[0].value
    let pass = LoginForm[1].value

    if (checkUser(uname,pass)) {
    
        localStorage.setItem("CurrentUser",uname);
        window.location.href="./Main.html"

    }


     LoginForm.reset()

})