// Get a reference to the product container element on the page
var productContainer = document.getElementById("product-duo");

// Create HTML for the first two products
var html = "";
for (var i = 0; i < 2; i++) {
  var product = products[i];
  html += `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>NOK ${product.price}</p>
      <button onclick="viewProductDetail(${i})">View</button>
    </div>
  `;
}

// Add the HTML for the first two products to the product container
productContainer.innerHTML = html;

// Function to navigate to the product detail page for a specific product
function viewProductDetail(index) {
    // Navigate to the product detail page, passing the product index as a query parameter
    window.location.href = "details.html?product=" + index;
  }