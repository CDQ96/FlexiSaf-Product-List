//Product Quantity +/-
const quantityDecrement = document.querySelectorAll(".quantityDecrement");
const quantityIncrement = document.querySelectorAll(".quantityIncrement");
const cartProductDiv = document.querySelector(".cartProductDiv");
const cartTotalPrice = document.querySelector(".cartTotalPrice");
const cartProductNumber = document.querySelector(".cartProductNumber");
const addBtn = document.querySelectorAll(".addBtn");
const productDivs = document.querySelectorAll(".contentDiv");
const submitBtn = document.querySelector(".submitBtn");
const orderInfoBtn = document.querySelector(".orderInfoBtn");
const orderConfirm = document.querySelector(".orderConfirm");
const quantityControls = document.querySelectorAll(".quantityControl");

function updateQuantity(product, change) {
  const { productName, productPrice, quantityNumber, quantityControl } =
    getProductInfo(product);
  const newQuantity = parseInt(quantityNumber.textContent) + change;
  quantityNumber.textContent = newQuantity;

  if (change > 0) {
    addProductToCart(productName, productPrice, newQuantity);
  } else {
    removeProductFromCart(
      productName,
      productPrice,
      newQuantity,
      quantityControl //control > "none" / "flex"
    );
    updateCartDisplay();
  }
}

// Get the product info which you clicked to
function getProductInfo(product) {
  const productName = product.querySelector(".productName").textContent;
  const productPrice = parseFloat(
    product.querySelector(".productPrice").textContent.replace("$", "")
  );
  const quantityNumber = product.querySelector(".quantityNumber");
  const quantityControl = product.querySelector(".quantityControl");
  const productImg = product.querySelector(".imgMobile");
  return {
    productName,
    productPrice,
    quantityNumber,
    quantityControl,
    productImg,
  };
}

//Display content in the "Your Cart" section
function updateCartDisplay() {
  //when Cart Product more than 1 >　show content
  const hasProducts =
    cartProductDiv.querySelectorAll(".cartProduct").length > 0;
  const emptyCart = document.querySelector(".emptyCart");
  const cartTotal = document.querySelector(".cartTotal");
  const submitDiv = document.querySelector(".submitDiv");
  if (hasProducts) {
    cartTotal.style.display = "flex";
    submitDiv.style.display = "block";
    emptyCart.style.display = "none";
  } else {
    cartTotal.style.display = "none";
    submitDiv.style.display = "none";
    emptyCart.style.display = "block";
  }
}

function removeProductFromCart(
  productName,
  productPrice,
  quantityNumber,
  quantityControl
) {
  const quantityTotalPrice = productPrice * quantityNumber;
  const sanitizedProductName = productName.replace(/\s+/g, "-");
  const existingProduct = cartProductDiv.querySelector(
    `.cartProduct.${sanitizedProductName}`
  );

  const productQuantity = existingProduct.querySelector(".productQuantity");
  const cartSingleProductPriceTotal = existingProduct.querySelector(
    ".cartSingleProductPriceTotal"
  );
  if (productQuantity.textContent > 1) {
    productQuantity.textContent = quantityNumber; // or textContent --
    cartSingleProductPriceTotal.textContent = `$${quantityTotalPrice}`;
    updateCartTotal(-productPrice); // minus
    cartProductNumber.textContent--;
  } else {
    existingProduct.remove();
    updateCartTotal(-productPrice);
    cartProductNumber.textContent--;
    if ((quantityControl.style.display = "flex")) {
      quantityControl.style.display = "none";
    }
  }
}

//click and make a <article> with class name "cartProduct" and ${productName}
// to the Cart Product Div Area
function addProductToCart(
  productName,
  productPrice,
  quantityNumber,
  productImg //add display none <img> for info passing
) {
  const quantityTotalPrice = productPrice * quantityNumber;
  const sanitizedProductName = productName.replace(/\s+/g, "-");
  //check if cart have that product already or not
  const existingProduct = cartProductDiv.querySelector(
    `.cartProduct.${sanitizedProductName}`
  );
  if (existingProduct) {
    //get the product quantity control panel info
    const productQuantity = existingProduct.querySelector(".productQuantity");
    const cartSingleProductPriceTotal = existingProduct.querySelector(
      ".cartSingleProductPriceTotal"
    );
    productQuantity.textContent = quantityNumber;
    cartSingleProductPriceTotal.textContent = `$${quantityTotalPrice}`;
    updateCartTotal(productPrice);
    cartProductNumber.textContent++;
  } else {
    const newProduct = document.createElement("article");
    newProduct.className = `cartProduct ${sanitizedProductName}`;
    newProduct.innerHTML = `<div class="singleProduct">
                    <img class="cartProductImg" style="display:none" src=${productImg.src} alt="" />
                    <p class="productName">${productName}</p>
                    <div>
                      <span class="productQuantity">${quantityNumber}</span
                      ><span class="productUnit">X</span>
                      <span class="atsign">@</span>
                      <span class="cartSingleProductPrice">$${productPrice}</span>
                      <span class="cartSingleProductPriceTotal">$${quantityTotalPrice}</span>
                    </div>
                  </div>
                  <button class="cartDeleteProductBtn">
                    <img src="assets/images/icon-remove-item.svg" alt="" />
                  </button>`;
    cartProductDiv.appendChild(newProduct);
    updateCartTotal(productPrice);
    cartProductNumber.textContent++; //Your Cart(0) -> (1)
  }
}
// update Cart Order Total (if minus > updateCartTotal(-productPrice) )
function updateCartTotal(productPrice) {
  cartTotalPrice.textContent =
    parseFloat(cartTotalPrice.textContent) + parseFloat(productPrice);
}

quantityControls.forEach((e) => {
  const decrementButton = e.querySelector(".quantityDecrement");
  const incrementButton = e.querySelector(".quantityIncrement");
  const product = e.closest(".product");
  decrementButton.addEventListener("click", function () {
    updateQuantity(product, -1);
  });
  incrementButton.addEventListener("click", function () {
    updateQuantity(product, 1);
  });
});

//Add to Cart Button , click show quantity control panel
addBtn.forEach((e) => {
  e.addEventListener("click", function () {
    const product = this.closest(".product");
    const {
      productName,
      productPrice,
      quantityNumber,
      quantityControl,
      productImg,
    } = getProductInfo(product);

    if ((quantityControl.style.display = "none")) {
      quantityControl.style.display = "flex";
    }
    //panel number +1
    quantityNumber.textContent++;
    addProductToCart(
      productName,
      productPrice,
      quantityNumber.textContent,
      productImg
    );
    updateCartDisplay();
  });
});

//click Your Cart Delete product btn (X)
cartProductDiv.addEventListener("click", function (e) {
  // click Product Part , if closest = btn > delete function
  if (e.target.closest(".cartDeleteProductBtn")) {
    const cartProduct = e.target.closest(".cartProduct");
    const productQuantity = cartProduct.querySelector(".productQuantity");
    const productName = cartProduct.querySelector(".productName");
    const cartSingleProductPriceTotal = cartProduct.querySelector(
      ".cartSingleProductPriceTotal"
    );
    cartProduct.remove();
    cartProductNumber.textContent =
      cartProductNumber.textContent - productQuantity.textContent;

    cartTotalPrice.textContent =
      parseFloat(cartTotalPrice.textContent) -
      parseFloat(cartSingleProductPriceTotal.textContent.replace("$", ""));

    updateCartDisplay();

    //contentDiv quantity number update
    productDivs.forEach((e) => {
      const nameElement = e.querySelector(".productName");
      if (nameElement.textContent === productName.textContent) {
        const quantityControl = e.querySelector(".quantityControl");
        const quantityNumber = e.querySelector(".quantityNumber");
        //close control panel and reset product quantity
        quantityControl.style.display = "none";
        quantityNumber.textContent = 0;
      }
    });
  }
});

const orderInfo = document.querySelector(".orderInfo");

submitBtn.addEventListener("click", function () {
  orderConfirm.style.display = "flex";
  orderInfo.innerHTML = "";
  const cartProducts = cartProductDiv.querySelectorAll(".cartProduct"); //article
  cartProducts.forEach((e) => {
    const productName = e.querySelector(".productName");
    const productQuantity = e.querySelector(".productQuantity");
    const productPrice = e.querySelector(".cartSingleProductPrice");
    const cartSingleProductPriceTotal = e.querySelector(
      ".cartSingleProductPriceTotal"
    );
    const cartProductImg = e.querySelector(".cartProductImg").src;

    const orderInfoProduct = document.createElement("div");
    orderInfoProduct.className = "orderInfoProduct";
    orderInfoProduct.innerHTML = `<div class="orderInfoProductDiv">
              <img
                src=${cartProductImg}
                alt=""
                class="orderProductImg"
              />
              <div class="orderInfoProductDetail">
                <h4>${productName.textContent}</h4>
                <span class="productQuantity">${productQuantity.textContent}</span
                ><span class="productUnit">x</span><span class="atsign">@ </span
                ><span class="cartSingleProductPrice">${productPrice.textContent}</span>
              </div>
            </div>
            <div class="orderInfoSingleProductTotalPrice">${cartSingleProductPriceTotal.textContent}</div>`;

    /* cartProductDiv.innerHTML = ""; */
    orderInfo.appendChild(orderInfoProduct);

    productDivs.forEach((e2) => {
      const nameElement = e2.querySelector(".productName");
      if (nameElement.textContent === productName.textContent) {
        const quantityControl = e2.querySelector(".quantityControl");
        const quantityNumber = e2.querySelector(".quantityNumber");
        //close control panel and reset product quantity
        quantityControl.style.display = "none";
        quantityNumber.textContent = 0;
      }
    });

    e.remove();
    updateCartDisplay();
    cartProductNumber.textContent = 0;
  });

  //Order Total update
  const orderInfoTotal = document.createElement("div");
  orderInfoTotal.className = "orderInfoTotal";
  orderInfoTotal.innerHTML = `<span>Order Total</span>
            <h1>$${cartTotalPrice.textContent}</h1>`; /* cartTotalPrice */
  orderInfo.appendChild(orderInfoTotal);

  cartTotalPrice.textContent = 0;
});

// order confirm "Start New Order" Btn
orderInfoBtn.addEventListener("click", function () {
  orderConfirm.style.display = "none";
});
