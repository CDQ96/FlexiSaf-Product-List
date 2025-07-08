// Product data
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

// Cart functionality
let cart = [];

// DOM elements
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const orderSummary = document.getElementById("order-summary");
const confirmationModal = document.getElementById("confirmation-modal");
const confirmationItems = document.getElementById("confirmation-items");
const confirmationTotal = document.getElementById("confirmation-total");

// Update cart display
function updateCartDisplay() {
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartItems.style.display = "none";
    orderSummary.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartItems.style.display = "block";
    orderSummary.style.display = "block";
    
    // Clear current items
    cartItems.innerHTML = "";
    
    let total = 0;
    const itemCounts = {};
    
    // Count items
    cart.forEach(item => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    });
    
    // Display items with quantities
    for (const [name, count] of Object.entries(itemCounts)) {
      const price = products[name];
      const subtotal = price * count;
      total += subtotal;
      
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div>
          <strong>${name}</strong>
          <span class="quantity">${count}x @ $${price.toFixed(2)}</span>
        </div>
        <span>$${subtotal.toFixed(2)}</span>
      `;
      cartItems.appendChild(div);
    }
    
    cartTotal.textContent = total.toFixed(2);
  }
  
  cartCount.textContent = cart.length;
}

// Add to cart functionality
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.parentElement.querySelector("h4").textContent;
    const price = products[name];
    
    if (price) {
      cart.push({ name, price });
      updateCartDisplay();
    }
  });
});

// Confirm order functionality
document.querySelector(".confirm-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  // Prepare confirmation content
  let confirmationHTML = "";
  let total = 0;
  const itemCounts = {};
  
  // Count items
  cart.forEach(item => {
    itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
  });
  
  // Create confirmation items
  for (const [name, count] of Object.entries(itemCounts)) {
    const price = products[name];
    const subtotal = price * count;
    total += subtotal;
    
    confirmationHTML += `
      <div>
        <strong>${name}</strong>
        <div>${count}x @ $${price.toFixed(2)}</div>
      </div>
    `;
  }
  
  confirmationItems.innerHTML = confirmationHTML;
  confirmationTotal.textContent = total.toFixed(2);
  
  // Show modal
  confirmationModal.style.display = "flex";
  
  // Clear cart
  cart = [];
  updateCartDisplay();
});

// Close modal functionality
document.getElementById("close-modal").addEventListener("click", () => {
  confirmationModal.style.display = "none";
});

// Initialize
updateCartDisplay();
