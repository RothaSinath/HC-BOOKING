document.addEventListener("DOMContentLoaded", function () {
  const cartBtn = document.getElementById("cart");
  const cartModal = document.getElementById("cart-modal");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const closeCartBtn = document.getElementById("close-cart");
  const cartCount = document.getElementById("cart-count");
  const buyNowBtn = document.getElementById("buy-now");
  let cart = [];

  // Load cart from localStorage
  function loadCart() {
    const saved = localStorage.getItem("cart");
    cart = saved ? JSON.parse(saved) : [];
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Add to cart functionality
  document.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const name =
        btn.getAttribute("data-name") ||
        btn.closest(".product-card")?.querySelector("h3")?.textContent ||
        "Product";
      const price =
        parseFloat(btn.getAttribute("data-price")) ||
        parseFloat(
          btn
            .closest(".product-card")
            ?.querySelector(".product-footer span")
            ?.textContent.replace("$", "")
        ) ||
        0;
      const img =
        btn.getAttribute("data-img") ||
        btn.closest(".product-card")?.querySelector("img")?.src ||
        "";
      // Check if already in cart
      const existing = cart.find((item) => item.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, qty: 1, img });
      }
      renderCart();
      updateCartCount();
      saveCart(); // Save after adding
    });
  });

  // Show cart modal
  if (cartBtn) {
    cartBtn.addEventListener("click", function () {
      renderCart();
      cartModal.style.display = "block";
    });
  }

  // Close cart modal
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", function () {
      cartModal.style.display = "none";
    });
  }

  // Buy Now button
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      alert("Buy successful!");
      cart = [];
      renderCart();
      updateCartCount();
      saveCart(); // Save after buying
      cartModal.style.display = "none";
    });
  }

  // Render cart items and total
  function renderCart() {
    cartItemsList.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    } else {
      cart.forEach((item, idx) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";
        li.innerHTML = `
          <img src="${item.img}" alt="${
          item.name
        }" style="width:40px;height:40px;object-fit:cover;border-radius:8px;margin-right:10px;">
          <span style="flex:1;">${item.name}</span>
          <button class="qty-btn" data-idx="${idx}" data-action="decrease" style="margin:0 5px;">-</button>
          <span style="min-width:24px;text-align:center;">${item.qty}</span>
          <button class="qty-btn" data-idx="${idx}" data-action="increase" style="margin:0 5px;">+</button>
          <span style="margin-left:10px;">$${(item.price * item.qty).toFixed(
            2
          )}</span>
        `;
        cartItemsList.appendChild(li);
        total += item.price * item.qty;
      });
    }
    cartTotal.textContent = total.toFixed(2);

    // Add event listeners for + and - buttons
    cartItemsList.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = parseInt(btn.getAttribute("data-idx"));
        const action = btn.getAttribute("data-action");
        if (action === "increase") {
          cart[idx].qty += 1;
        } else if (action === "decrease") {
          cart[idx].qty -= 1;
          if (cart[idx].qty <= 0) {
            cart.splice(idx, 1);
          }
        }
        renderCart();
        updateCartCount();
        saveCart(); // Save after changing qty
      });
    });
  }

  // Update cart count badge
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) {
      cartCount.textContent = count;
    }
  }

  // Initialize cart from localStorage on page load
  loadCart();
  renderCart();
  updateCartCount();
});
