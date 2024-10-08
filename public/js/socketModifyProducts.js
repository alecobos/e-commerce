const socket = io();

document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.querySelector("#title");
    const priceElement = document.querySelector("#price");
    const categoryElement = document.querySelector("#category");
    const photoElement = document.querySelector("#photo");
    const stockElement = document.querySelector("#stock");
    const pidElement = document.querySelector("#pid");

    console.log("Title element:", titleElement);
    console.log("Price element:", priceElement);
    console.log("Category element:", categoryElement);
    console.log("Photo element:", photoElement);
    console.log("Stock element:", stockElement);
    console.log("PID element:", pidElement);

    if (titleElement && priceElement && categoryElement && stockElement && pidElement) {
        document.querySelector("#modify").addEventListener("click", () => {
            const title = titleElement.value;
            const price = Number(priceElement.value);
            const category = categoryElement.value;
            const photo = document.querySelector("#photo") ? document.querySelector("#photo").value : "";  // Manejar caso de imagen opcional
            const stock = Number(stockElement.value);
            const pid = pidElement.value;

            const productData = { title, price, category, photo, stock, id: pid };

            console.log("Product data to be modified:", productData);
            socket.emit("modify product", productData);
        });
    } else {
        console.error("One or more elements not found");
    }
});