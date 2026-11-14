// Finds all HTML elements with the class "Button" and stores them in the filterButtons variable.
const filterButtons = document.querySelectorAll(".Button");

// Finds all brownie product cards with the class "product-card" and stores them in the productCards variable.
const productCards = document.querySelectorAll(".product-card");

// Goes through every filter button one by one using the forEach() loop.
filterButtons.forEach(function(button) {

    // Adds a click event listener to each button. The function runs when the button is clicked.
    button.addEventListener("click", function() {

        // Goes through all filter buttons to remove their active styling.
        filterButtons.forEach(function(btn) {

            // Removes the "active" CSS class from the current button, removing its orange background.
            btn.classList.remove("active");

        }); // Ends the loop that removes the active class from all buttons.

        // Adds the "active" CSS class to the clicked button, making its background orange.
        button.classList.add("active");

        // Gets the clicked button's data-filter value (e.g., "classic", "fruity", or "all").
        const selectedCategory = button.dataset.filter;

        // Goes through every brownie product card one by one.
        productCards.forEach(function(card) {

            // Checks if the selected category is "all" OR if the product's category matches the selected category.
            // The || symbol means OR, so only one of these conditions needs to be true.
            if (selectedCategory === "all" ||
                card.dataset.category === selectedCategory) {

                // Shows the product card by setting its CSS display property to "flex".
                card.style.display = "flex";

            } else { // Runs if neither condition above is true.

                // Hides the product card by setting its CSS display property to "none".
                card.style.display = "none";

            } // Ends the if/else condition.

        }); // Ends the loop that checks and filters all product cards.

    }); // Ends the click event listener function.

}); // Ends the loop that adds click event listeners to all filter buttons.
