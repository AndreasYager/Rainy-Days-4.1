async function fetchProducts() {
  const response = await fetch("https://rainydays.andreasyager.no/wp-json/wc/v3/products", {
    headers: {
      "Authorization": "Basic " + btoa("ck_6695c11bf886b7acff4ccc501c34f7c68b3bbe8b:cs_f58825ecf3de36b211ee76382838457843775d2d"),
    },
  });
  return response.json();
}

async function displayHomePageProducts() {
  const products = await fetchProducts();

  const targetProductIds = [12, 14];

  const filteredProducts = products.filter(product => targetProductIds.includes(product.id));

  filteredProducts.sort((a, b) => a.id - b.id);

  const productContainer = document.getElementById("product-duo");

  let html = "";
  for (const product of filteredProducts) {
    html += `
      <div class="product">
        <img src="${product.images[0].src}" alt="${product.name}" loading="lazy">
        <h2>${product.name}</h2>
        <p>NOK ${product.price}</p>
        <button onclick="viewProductDetail(${product.id})">View</button>
      </div>
    `;
  }

  productContainer.innerHTML = html;
}

function viewProductDetail(id) {
  window.location.href = "details.html?product=" + id;
}

displayHomePageProducts();
