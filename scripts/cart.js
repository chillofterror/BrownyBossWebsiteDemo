
 // Get the cart saved by the Home and Menu pages.
let cart = JSON.parse(localStorage.getItem("brownieCart") || "[]");

// Find the HTML elements we need to update.
const cartProducts = document.querySelector("#cart-products");
const cartCount = document.querySelector("#cart-count");
const summaryCount = document.querySelector("#summary-count");
const subtotalElement = document.querySelector("#subtotal");
const deliveryElement = document.querySelector("#delivery");
const grandTotalElement = document.querySelector("#grand-total");

// Delivery price when the cart contains products.
const deliveryPrice = 4.99;

// Save the cart whenever something changes.
function saveCart() {
    localStorage.setItem("brownieCart", JSON.stringify(cart));
}

// Display all products and update the totals.
function renderCart() {

    // Remove the old product elements before rebuilding.
    cartProducts.innerHTML = "";

    // Count how many brownies are in the cart.
    let totalQuantity = 0;

    // Calculate the cost of all brownies.
    let subtotal = 0;

    // Go through every saved product.
    cart.forEach(function(product, index) {

        // Calculate this product's total price.
        const itemTotal = product.price * product.quantity;

        // Add its quantity to the overall count.
        totalQuantity += product.quantity;

        // Add its price to the subtotal.
        subtotal += itemTotal;

        // Create a container for the product.
        const item = document.createElement("div");
        item.className = "cart-item";

        // Create the product image.
        const image = document.createElement("img");
        image.className = "cart-item-image";
        image.src = product.image;
        image.alt = product.name;

        // Create the product information container.
        const info = document.createElement("div");
        info.className = "cart-item-info";

        // Create the product name.
        const name = document.createElement("h3");
        name.textContent = product.name;

        // Create the description.
        const description = document.createElement("p");
        description.textContent = product.description;

        // Create the unit price.
        const price = document.createElement("strong");
        price.textContent = "€" + product.price.toFixed(2);

        // Put the product information together.
        info.append(name, description, price);

        // Create the quantity controls.
        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        // Create the minus button.
        const minusButton = document.createElement("button");
        minusButton.type = "button";
        minusButton.className = "quantity-minus";
        minusButton.textContent = "−";

        // Decrease the quantity when clicked.
        minusButton.addEventListener("click", function() {
            product.quantity -= 1;

            // Remove the product if its quantity reaches zero.
            if (product.quantity <= 0) {
                cart.splice(index, 1);
            }

            saveCart();
            renderCart();
        });

        // Display the current quantity.
        const quantity = document.createElement("span");
        quantity.className = "quantity-number";
        quantity.textContent = product.quantity;

        // Create the plus button.
        const plusButton = document.createElement("button");
        plusButton.type = "button";
        plusButton.className = "quantity-plus";
        plusButton.textContent = "+";

        // Increase the quantity when clicked.
        plusButton.addEventListener("click", function() {
            product.quantity += 1;
            saveCart();
            renderCart();
        });

        // Put the quantity controls together.
        controls.append(minusButton, quantity, plusButton);

        // Display the total for this product.
        const total = document.createElement("span");
        total.className = "item-total";
        total.textContent = "€" + itemTotal.toFixed(2);

        // Create the remove button.
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-item";
        removeButton.setAttribute("aria-label", "Remove " + product.name);

        // Add the Font Awesome trash icon.
        const trashIcon = document.createElement("i");
        trashIcon.className = "fa-regular fa-trash-can";
        removeButton.appendChild(trashIcon);

        // Remove the product when clicked.
        removeButton.addEventListener("click", function() {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });

        // Put everything inside the product card.
        item.append(image, info, controls, total, removeButton);

        // Add the product card to the page.
        cartProducts.appendChild(item);
    });

    // Show a message when the cart is empty.
    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your cart is empty. Add some delicious brownies!";
        cartProducts.appendChild(emptyMessage);
    }

    // Calculate delivery and the final total.
    const delivery = totalQuantity > 0 ? deliveryPrice : 0;
    const grandTotal = subtotal + delivery;

    // Update the product counts.
    cartCount.textContent = totalQuantity;
    summaryCount.textContent = totalQuantity;

    // Update the prices.
    subtotalElement.textContent = "€" + subtotal.toFixed(2);
    deliveryElement.textContent = "€" + delivery.toFixed(2);
    grandTotalElement.textContent = "€" + grandTotal.toFixed(2);
}

// Display the cart when the page loads.
renderCart();
