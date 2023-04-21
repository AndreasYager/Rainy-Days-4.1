var productDetail = document.getElementById("product-detail");

var productId = new URLSearchParams(window.location.search).get("product");

if (productId !== null) {
  fetch('https://rainydays.andreasyager.no/wp-json/wc/v3/products/' + productId, {
    headers: {
      'Authorization': 'Basic ' + btoa('ck_6695c11bf886b7acff4ccc501c34f7c68b3bbe8b:cs_f58825ecf3de36b211ee76382838457843775d2d'),
    },
  })
  .then((response) => response.json())
  .then((product) => {
    var html = `
      <div class="product-specific">
        <img src="${product.images[0].src}" alt="${product.name}">
        <div class="product-info">
          <h2>${product.name}</h2>
          <p>NOK ${product.price}</p>
          <p>${product.description}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    productDetail.innerHTML = html;
    document.title = product.name;
  })
  .catch((error) => console.error('Error fetching product:', error));
}

function addToCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const item = cartItems.find(item => item.productId === productId);
  if (item) {
    item.quantity++;
  } else {
    cartItems.push({ productId, quantity: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("Item added to cart");
}
