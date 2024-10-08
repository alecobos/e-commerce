const socket = io();

document.querySelector("#register").addEventListener("click", ()=> {
    const userName = document.querySelector("#userName").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const photo = document.querySelector("#photo").value
    const userData = { userName, email, password, photo }
    socket.emit("new user", userData)

})

socket.on("update users", data => {
    data = data.map(each => `<div>${each.userName} - ${each.email}</div>`).join("")
    document.querySelector("#update").innerHTML = data
})
// Capturar y enviar el parámetro de categoría de búsqueda
// document.querySelector("#search").addEventListener("click", () => {
//     const selectedCategory = document.querySelector("#formSearch").value; // Capturar la categoría seleccionada
//     console.log("Categoría seleccionada:", selectedCategory); // Agrega este log para verificar la categoría seleccionada
//     socket.emit("search products", selectedCategory); // Enviar la categoría al servidor
// });

// Recibir los productos filtrados desde el servidor y mostrarlos
// socket.on("filtered products", (products) => {
//     const productList = products.map(product => `
//         <div class="card my-3 text-center text-light border-secondary bg-black" style="width: 18rem;">
//             <h5 class="card-title">${product.category}</h5>
//             <h5 class="card-title mx-1">${product.title}</h5>
//             <img src="${product.photo}" class="card-img-top text-center mx-auto d-block" alt="${product.title}" style="height: 10rem; width: 15rem;">
//             <div class="card-body bg-dark border-top border-secondary border-1" style="height: 10rem;">
//                 <p class="card-text">Price: $${product.price}</p>
//                 <p class="card-text">Stock: ${product.stock}</p>
//                 <a href="/products/${product.id}" class="btn btn-outline-light mx-5 mb-2">Comprar</a>
//             </div>
//         </div>
//     `).join("");
//     document.querySelector("article").innerHTML = productList; // Actualizar el contenido de la sección de productos
// });