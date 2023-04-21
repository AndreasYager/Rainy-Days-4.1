
function createRemoveHandler(productId) {
  return function () {
 
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


    var cartIndex = cartItems.findIndex((item) => item.productId === productId);

 
    if (cartIndex >= 0) {
      cartItems.splice(cartIndex, 1);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));


    location.reload();
  };
}

var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

var cartTable = document.getElementById("cart-items");

var totalPriceSpan = document.getElementById("total-price");

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

      var imageCell = document.createElement("td");
      var image = document.createElement("img");
      image.src = product.images[0].src;
      image.alt = product.name;
      imageCell.appendChild(image);
      productRow.appendChild(imageCell);

      var nameCell = document.createElement("td");
      nameCell.innerHTML = product.name;
      productRow.appendChild(nameCell);

      var priceCell = document.createElement("td");
      priceCell.innerHTML = "NOK " + product.price;
      productRow.appendChild(priceCell);

      var quantityCell = document.createElement("td");
      quantityCell.innerHTML = cartItem.quantity;
      productRow.appendChild(quantityCell);

      var removeCell = document.createElement("td");
      var removeButton = document.createElement("button");
      removeButton.innerHTML = "Remove";
      removeButton.addEventListener("click", createRemoveHandler(cartItem.productId));
      removeCell.appendChild(removeButton);
      productRow.appendChild(removeCell);

      cartTable.appendChild(productRow);

      totalPrice += parseFloat(product.price) * cartItem.quantity;
    }

    totalPriceSpan.innerHTML = "NOK " + totalPrice.toFixed(2);
  }
}

async function fetchProductById(id) {
  const response = await fetch("https://rainydays.andreasyager.no/wp-json/wc/v3/products/" + id, {
    headers: {
      "Authorization": "Basic " + btoa("ck_6695c11bf886b7acff4ccc501c34f7c68b3bbe8b:cs_f58825ecf3de36b211ee76382838457843775d2d"), // Replace 'consumer_key' and 'consumer_secret' with your actual keys
    },
  });
  const product = await response.json();
  return product;
}

populateCart();
