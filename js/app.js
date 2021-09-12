const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="col">
            <div class="card border-success border-2 h-100">

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
              </div>

              <div class='text-white' style="background-color: gray;">
                <P>Approximately <b>${product.rating.count}</b> person rate this product.</p>
                <p>It's average product rate is: <b>${product.rating.rate}</b></p>
              </div>
              <!--End Card FOOTER Styling -->
            </div>
          </div>
      `;
    document.getElementById("all-products").appendChild(div);
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
  const converted = parseInt(element);
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
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);

};

const buyNow = () => {
  const div = document.getElementById('checkOut');
  div.innerHTML = `
    <p class='cart text-center'> If you want to buy your selected product then <button class='btn btn-primary'>Click Here</button></p>
    `
}
