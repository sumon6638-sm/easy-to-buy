const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

const searchProducts = () => {
  const searchInput = document.getElementById('search-Input');
  const searchText = searchInput.value;
  const url = `https://fakestoreapi.com/products/category/${searchText}`;

  fetch(url)
    .then(res => res.json())
    .then(data => showProducts(data));
};


// show all product in UI 

const showProducts = (products) => {

  const allProducts = products.map((pd) => pd);
  const allProductsList = document.getElementById('all-products');
  allProductsList.textContent = '';

  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div style="height: calc(100vh/1.6)" class="col">
            <div class="card border-success border-2 h-100" >

              <!-- Start Card Thumbnail -->
              <div>
                <img class="product-image image-fluid" src=${product.image}></img>
              </div>

              <!-- Start Card Details or Card BODY -->
              <div class="card-body">
                <h4>${product.title}</h4>
                <p><b>Category:</b> ${product.category}</p>
                <h2>Price: $ ${product.price}</h2>
              </div>

              <!-- Start Card Footer Styling -->
              <div class="card-footer" style="background-color: gray;">
                <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn"
                  class="buy-now btn btn-success">Add
                  to cart</button>

                <!-- popup button starting -->
                <!-- Button trigger modal -->
                <button type="button" id="details-btn" class="btn btn-danger my-button" data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop">
                  Details
                </button>

                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-dark" id="staticBackdropLabel">${product.title}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p class="text-dark my-text"><strong>About this product:</strong> ${product.description}</p>
                        <p class="text-dark my-text"><strong>Category:</strong> ${product.category}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- popup button end -->
                <div class='text-white' style="background-color: gray;">
                  <P>Approximately <span class= 'text-warning fw-bold'>${product.rating.count}</span> person rate this product.</p>
                  <p>It's average product rate is: <span class= 'text-warning fw-bold'>${product.rating.rate}</span></p>
                </div>
              </div>
              <!--End Card FOOTER Styling -->
            </div>
          </div>
      `;
    allProductsList.appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};



const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = (grandTotal).toFixed(2);
};


const buyNow = () => {
  const productNumber = document.getElementById("total-Products").innerText
  if (productNumber > 0) {
    const div = document.getElementById('checkOut');
    div.innerHTML = `
    <p class='cart text-center'> If you want to buy your selected product then <button class='btn btn-primary'>Click Here</button></p>
    `
  }
  else {
    const div = document.getElementById('checkOut');
    div.innerHTML = `
    <p class='cart text-center text-danger fw-bold'>Please at first add to cart your product then click on buy now button.</button></p>
    `
  }
}
