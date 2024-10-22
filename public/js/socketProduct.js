const socket = io();

// Capturar y enviar el parámetro de categoría de búsqueda
document.querySelector("#search").addEventListener("click", () => {
    const selectedCategory = document.querySelector("#formSearch").value;
    console.log("Categoría seleccionada:", selectedCategory); // Verificar valor capturado
    socket.emit("search products", selectedCategory); // Enviar la categoría al servidor
});


// Recibir los productos filtrados desde el servidor y mostrarlos
socket.on("filtered products", (products) => {
    const productList = products.map(product => `
        <div class="card my-3 text-center text-light border-secondary bg-black" style="width: 18rem;">
            <h5 class="card-title">${product.category}</h5>
            <h5 class="card-title mx-1">${product.title}</h5>
            <img src="${product.photo}" class="card-img-top text-center mx-auto d-block" alt="${product.title}" style="height: 10rem; width: 15rem;">
            <div class="card-body bg-dark border-top border-secondary border-1" style="height: 10rem;">
                <p class="card-text">Price: $${product.price}</p>
                <p class="card-text">Stock: ${product.stock}</p>
                <a href="/products/${product.id}" class="btn btn-outline-light mx-5 mb-2">Comprar</a>
            </div>
        </div>
    `).join("");
    document.querySelector("article").innerHTML = productList; // Actualizar el contenido de la sección de productos
});

