const socket = io();

document.querySelector("#buy-now-btn").addEventListener("click", (event) => {
    event.preventDefault();
    try {
        const user_id = document.querySelector("#user-id").value; 
        console.log("userId: ", user_id);
        const card = document.querySelector('.card');
        const product_id = card.getAttribute('data-product-id');
        console.log("productId: ", product_id);
        const quantity = document.querySelector("#quantity").value;
        let price = document.querySelector("#price").textContent.replace('Price: $', ''); 
        price = Number(quantity) * price

        const data = { product_id, user_id, quantity, price }

        
        socket.emit("new cart", data);
        Swal.fire({
            title: "Cart Created",
            icon: "success"
          });
        
    } catch (error) {
        return (error)
    }
  });
