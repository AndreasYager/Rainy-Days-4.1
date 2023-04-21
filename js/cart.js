// Create a remove button click handler function
function createRemoveHandler(productId) {
  return function () {
    // Retrieve cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Find the index of the cart item to remove
    var cartIndex = cartItems.findIndex((item) => item.productId === productId);

    // Remove the cart item from the array
    if (cartIndex >= 0) {
      cartItems.splice(cartIndex, 1);
    }

    // Save the updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Reload the page to update the cart display
    location.reload();
  };
}

// Retrieve cart items from localStorage
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Get the cart items table body
var cartTable = document.getElementById("cart-items");

// Get the total price span element
var totalPriceSpan = document.getElementById("total-price");

// Initialize the total price to 0
var totalPrice = 0;

async function populateCart() {
  if (cartItems.length === 0) {
    var emptyCartRow = document.createElement("tr");
    var emptyCartCell = document.createElement("td");
    emptyCartCell.colSpan = "5";
    emptyCartCell.innerHTML = "Your cart is empty";
    emptyCartRow.appendChild(emptyCartCell);
    cartTable.appendChild(emptyCartRow);
  } else {
    for (const cartItem of cartItems) {
      const product = await fetchProductById(cartItem.productId);
      var productRow = document.createElement("tr");

      // Add product image cell
      var imageCell = document.createElement("td");
      var image = document.createElement("img");
      image.src = product.images[0].src;
      image.alt = product.name;
      imageCell.appendChild(image);
      productRow.appendChild(imageCell);

      // Add product name cell
      var nameCell = document.createElement("td");
      nameCell.innerHTML = product.name;
      productRow.appendChild(nameCell);

      // Add product price cell
      var priceCell = document.createElement("td");
      priceCell.innerHTML = "NOK " + product.price;
      productRow.appendChild(priceCell);

      // Add product quantity cell
      var quantityCell = document.createElement("td");
      quantityCell.innerHTML = cartItem.quantity;
      productRow.appendChild(quantityCell);

      // Add remove button cell
      var removeCell = document.createElement("td");
      var removeButton = document.createElement("button");
      removeButton.innerHTML = "Remove";
      removeButton.addEventListener("click", createRemoveHandler(cartItem.productId));
      removeCell.appendChild(removeButton);
      productRow.appendChild(removeCell);

      cartTable.appendChild(productRow);

      // Add the product price to the total price
      totalPrice += parseFloat(product.price) * cartItem.quantity;
    }

    // Update the total price display
    totalPriceSpan.innerHTML = "NOK " + totalPrice.toFixed(2);
  }
}

// Fetch a product by ID from the WooCommerce REST API
async function fetchProductById(id) {
  const response = await fetch("https://rainydays.andreasyager.no/wp-json/wc/v3/products/" + id, {
    headers: {
      "Authorization": "Basic " + btoa("ck_6695c11bf886b7acff4ccc501c34f7c68b3bbe8b:cs_f58825ecf3de36b211ee76382838457843775d2d"), // Replace 'consumer_key' and 'consumer_secret' with your actual keys
    },
  });
  const product = await response.json();
  return product;
}

// Call the populateCart function to populate the cart
populateCart();
