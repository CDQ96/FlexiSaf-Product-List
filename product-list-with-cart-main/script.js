// Select elements
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");

// Store cart items
let cart = [];

// Dessert product data (you can match these to what's in the HTML)
const products = {
  "Waffle with Berries": 6.5,
  "Vanilla Bean Crème Brûlée": 7.0,
  "Macaron Mix of Five": 8.0,
  "Classic Tiramisu": 5.5,
  "Pistachio Baklava": 4.0,
  "Lemon Meringue Pie": 5.0,
  "Red Velvet Cake": 4.5,
  "Salted Caramel Brownie": 5.5,
  "Vanilla Panna Cotta": 6.5
};

// Function to update cart display
function updateCartDisplay() {
  // Show or hide empty cart placeholder
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartItems.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartItems.style.display = "block";

    // Clear current items
    cartItems.innerHTML = "";

    let total = 0;

    // Rebuild item list
    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;
      cartItems.appendChild(div);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
  }

  cartCount.textContent = cart.length;
}

// Handle add-to-cart buttons
const buttons = document.querySelectorAll(".add-to-cart-btn");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.parentElement.querySelector("h4").textContent;
    const price = products[name];

    if (price) {
      cart.push({ name, price });
      updateCartDisplay();
    }
  });
});


// Add confirm order functionality
//document.querySelector(".confirm-btn").addEventListener("click", () => {
    //cart = [];
    //updateCartDisplay();
//});

// Select the confirmation section
const orderConfirmation = document.getElementById("order-confirmation");
const orderItems = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");

// Handle confirm order button
document.querySelector(".confirm-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!"); // Optional: Alert if cart is empty
    return;
  }

  // Hide the cart and show confirmation
  document.querySelector(".cart").style.display = "none";
  orderConfirmation.style.display = "block";

  // Generate the order summary
  let itemsHTML = "";
  let total = 0;

  cart.forEach(item => {
    itemsHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
    total += item.price;
  });

  orderItems.innerHTML = itemsHTML;
  orderTotal.textContent = total.toFixed(2);

  // Clear the cart
  cart = [];
  updateCartDisplay();
});

// Modify add-to-cart to handle quantities
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.parentElement.querySelector("h4").textContent;
        const price = products[name];
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartDisplay();
    });
});

// Initial setup
updateCartDisplay();
