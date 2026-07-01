const registerForm = document.querySelector("#register-form")

const link = document.querySelector("a");


 
 



var UserLogin = [];
localStorage.setItem("User", JSON.stringify(UserLogin));
const registerUser = localStorage.getItem("User")

User = JSON.parse(registerUser)

let checkUserName = (uname) => {
 for (const ele of User) {
        if (uname === ele.username) {
            alert("Username already exists!");
            return false;
        }
    }

    return true;

}

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let uname = registerForm[0].value
    let pass = registerForm[1].value

    if (checkUserName(uname)) {

        let userObj = {
            username: uname,
            password: pass,
            UserData:[]
        };


        User.push(userObj)

        localStorage.setItem("User", JSON.stringify(User));
     

    }


    registerForm.reset()
     link.click()

})