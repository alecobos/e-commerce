const socket = io();

document.querySelector("#register").addEventListener("click", ()=> {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    let avatar = document.querySelector("#avatar").value
    let role = document.querySelector("#role").value
    
    if (!role) {
        role = 0;
    }

    if (!avatar) {
        avatar = "https://i.pinimg.com/474x/5a/1b/1e/5a1b1e32639c6210416804dc7a93ef8e.jpg";
    }

    if (email && password) {
        const userData = { email, password, avatar, role };
        socket.emit("new user", userData);
        Swal.fire({
            title: "User Created",
            icon: "success"
          });
          document.querySelector("#email").value = ""
          document.querySelector("#password").value = ""
          document.querySelector("#avatar").value = ""
          document.querySelector("#role").value = ""
    } else {
        Swal.fire({
            icon: "error",
            title: "Email and password are required.",
            text: "Something went wrong!",
          });
    }

})

socket.on("update users", data => {
    data = data.map(each => `<div>E-mail: ${each.email} - Role: ${each.role}</div>`).join("")
    document.querySelector("#update").innerHTML = data
})
