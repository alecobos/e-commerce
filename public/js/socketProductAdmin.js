const socket = io();

document.querySelector("#create").addEventListener("click", ()=> {
    const title = document.querySelector("#title").value
    const price = document.querySelector("#price").value
    const category = document.querySelector("#category").value
    const photo = document.querySelector("#photo").value
    const stock = document.querySelector("#stock").value
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
