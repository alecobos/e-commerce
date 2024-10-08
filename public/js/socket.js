const socket = io();

document.querySelector("#register").addEventListener("click", ()=> {
    const userName = document.querySelector("#userName").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    let photo = document.querySelector("#photo").value
    let role = document.querySelector("#role").value
    
    if (!role) {
        role = 0;
    }

    if (!photo) {
        photo = "https://i.pinimg.com/474x/5a/1b/1e/5a1b1e32639c6210416804dc7a93ef8e.jpg";
    }

    if (email && password) {
        const userData = { userName, email, password, photo, role };
        socket.emit("new user", userData);
        Swal.fire({
            title: "User Created",
            icon: "success"
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Email and password are required.",
            text: "Something went wrong!",
          });
    }

})

socket.on("update users", data => {
    data = data.map(each => `<div>${each.userName} - ${each.email}</div>`).join("")
    document.querySelector("#update").innerHTML = data
})
