
 // Find every Add to Cart button on the current page.
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

// Go through each button.
addToCartButtons.forEach(function(button) {

    // Run this function when the button is clicked.
    button.addEventListener("click", function() {

        // Find the product card containing the clicked button.
        const card = button.closest(".product-card");

        // Get the product name.
        const name = card.querySelector("h3").textContent.trim();

        // Get the product description.
        const description = card.querySelector(".product-desc").textContent.trim();

        // Get the price and convert it into a number.
        const price = Number(
            card.querySelector(".price").textContent.replace(/[^0-9.]/g, "")
        );

        // Get the product image path.
        const image = card.querySelector("img").getAttribute("src");

        // Read the saved cart, or start with an empty array.
        const cart = JSON.parse(localStorage.getItem("brownieCart") || "[]");

        // Check whether this brownie is already in the cart.
        const existingProduct = cart.find(function(product) {
            return product.name === name;
        });

        if (existingProduct) {

            // Increase the quantity if the brownie already exists.
            existingProduct.quantity += 1;

        } else {

            // Otherwise add a new brownie to the cart.
            cart.push({
                name: name,
                description: description,
                price: price,
                image: image,
                quantity: 1
            });

        }

        // Save the updated cart in the browser.
        localStorage.setItem("brownieCart", JSON.stringify(cart));

        // Temporarily change the button text.
        button.textContent = "Added! ✓";

        // Restore the original button text after one second.
        setTimeout(function() {
            button.textContent = "Add to Cart";
        }, 1000);

    });

});
