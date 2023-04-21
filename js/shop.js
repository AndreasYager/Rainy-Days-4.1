// Fetch products from the WooCommerce REST API
fetch('https://rainydays.andreasyager.no/wp-json/wc/v3/products', {
  headers: {
    'Authorization': 'Basic ' + btoa('ck_6695c11bf886b7acff4ccc501c34f7c68b3bbe8b:cs_f58825ecf3de36b211ee76382838457843775d2d'),
  },
})
.then((response) => response.json())
.then((products) => {

  products.sort((a, b) => a.id - b.id);

  // Display the products
  var productContainer = document.getElementById("product-container");

  // Loop through the products array and generate HTML for each product
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var html = `
      <div class="product">
        <img src="${product.images[0].src}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>NOK ${product.price}</p>
        <button onclick="viewProductDetail(${product.id})">View</button>
      </div>
    `;

    // Add the HTML for this product to the product container
    productContainer.innerHTML += html;
  }
})
.catch((error) => console.error('Error fetching products:', error));

// Function to navigate to the product detail page for a specific product
function viewProductDetail(Id) {
  // Navigate to the product detail page, passing the product ID as a query parameter
  window.location.href = "details.html?product=" + productId;
}
