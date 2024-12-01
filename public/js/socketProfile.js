const socket = io();


const deleteButtons = document.querySelectorAll('.delete-cart-btn');

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // Prevenir la acción por defecto del enlace
      const cartId = button.getAttribute('data-id'); // Obtener el ID del producto
      console.log("cart ID:", cartId);
      
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
            console.log("Cart to eliminate with ID:", cartId);
            socket.emit("delete cart", cartId)
            Swal.fire({
              title: "Deleted!",
              text: "Cart has been deleted.",
              icon: "success"
            });
          }
        });
      
    });
  
  });