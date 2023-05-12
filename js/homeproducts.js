async function fetchFeaturedProducts() {
  const response = await fetch("https://rainydays.andreasyager.no/wp-json/wc/v3/products?featured=true", {
    headers: {
      "Authorization": "Basic " + btoa("ck_6695c11bf886b7acff4ccc501c34f7c68b3bbe8b:cs_f58825ecf3de36b211ee76382838457843775d2d"),
    },
  });
  return response.json();
}

async function displayHomePageProducts() {
  const products = await fetchFeaturedProducts();

  const productContainer = document.getElementById("product-duo");

  let html = "";
  for (const product of products) {
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
