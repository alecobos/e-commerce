const socket = io();

document.querySelector("#create").addEventListener("click", ()=> {
    const title = document.querySelector("#title").value
    let price = Number(document.querySelector("#price").value);
    let category = document.querySelector("#category").value
    let photo = document.querySelector("#photo").value
    let stock = Number(document.querySelector("#stock").value);
    
    if (!stock) {
        stock = 1;
    }
    if (!price) {
        price = 1;
    }
    if (!category) {
        category = "Others";
    }
    if (!photo) {
        photo = "https://www.blogdelfotografo.com/wp-content/uploads/2020/12/producto_fondo_negro.webp";
    }


    if (title) {
        const productData = { title, price, category, photo, stock }
        socket.emit("new product", productData)
    } else {
        alert("Title is obligatory");
    }


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
    `).join("");  
    
    document.getElementById("productList").innerHTML = productList;  
});


const deleteButtons = document.querySelectorAll('.delete-btn');


deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    const productId = button.getAttribute('data-id'); // Obtener el ID del producto

    console.log("Producto a eliminar con ID:", productId);
    socket.emit("delete product", productId)
  });
});