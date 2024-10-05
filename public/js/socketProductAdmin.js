const socket = io();

document.querySelector("#create").addEventListener("click", ()=> {
    const title = document.querySelector("#title").value
    const price = Number(document.querySelector("#price").value);
    const category = document.querySelector("#category").value
    const photo = document.querySelector("#photo").value
    const stock = Number(document.querySelector("#stock").value);
    const productData = { title, price, category, photo, stock }
    socket.emit("new product", productData)
})

socket.on("refresh products", products => {
    const productList = products.map(product => `
        <tr class="text-light">
            <td class="ms-2" style="width: 10rem;">${product.category}</td>
            <td class="mx-1 ms-2" style="width: 55rem;">${product.title}</td>
            <td class="ms-2">Price: $${product.price}</td>
            <td class="ms-2">Stock: ${product.stock}</td>
            <td>
                <a href="" class="btn btn-outline-light mx-5 mb-2 ms-2">Modify</a>  
            </td>
            <td>
                <a href="/products/${product.id}" class="btn btn-outline-light mx-5 mb-2 ms-2">Delete</a>
            </td>
        </tr>
    `).join("");  // Unir todas las filas en una sola cadena
    
    document.getElementById("productList").innerHTML = productList;  // Insertar las filas en la tabla
});

// document.querySelector("#delete").addEventListener("click", ()=> {
//     const pid = document.querySelector("#id").value
//     console.log(pid)
//     socket.emit("delete product", pid)
// })


// Obtener todos los botones de eliminar
const deleteButtons = document.querySelectorAll('.delete-btn');

// Añadir un event listener a cada botón
deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    const productId = button.getAttribute('data-id'); // Obtener el ID del producto

    console.log("Producto a eliminar con ID:", productId);
    socket.emit("delete product", productId)
    // Aquí puedes hacer una llamada al servidor para eliminar el producto
    // por ejemplo, usando fetch o axios:
    // fetch(`/deleteProduct/${productId}`, { method: 'DELETE' })
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  });
});
