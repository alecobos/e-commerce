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
        photo = "https://www.goodram.com/wp-content/uploads/0-998x960.png";
    }


    if (title) {
        const productData = { title, price, category, photo, stock }
        socket.emit("new product", productData)
        Swal.fire({
            title: "Product Created",
            icon: "success"
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Title is obligatory",
            text: "Something went wrong!",
          });
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
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Producto a eliminar con ID:", productId);
          socket.emit("delete product", productId)
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success"
          });
        }
      });
    
  });

});