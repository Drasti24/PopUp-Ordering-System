let menuData = [
    { "Item Name": "Pani Puri", "Price": "7", "Available": "Y" },
    { "Item Name": "Vada Pav", "Price": "5", "Available": "Y" },
    { "Item Name": "Samosa Chaat", "Price": "6", "Available": "Y" }
  ];
  
  let total = 0;
  let quantities = [];
  
  document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
  });
  
  function loadMenu() {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";
    total = 0;
    quantities = [];
  
    menuData.forEach((item, i) => {
      if (item.Available === "Y") {
        quantities[i] = 0;
  
        const menuBox = document.createElement("div");
        menuBox.classList.add("menu-item");
  
        menuBox.innerHTML = `
          <div class="item-name">${item["Item Name"]} - $${item.Price}</div>
          <div class="qty-controls">
            <button class="minus" data-index="${i}">–</button>
            <span class="qty-count" id="qty-${i}">0</span>
            <button class="plus" data-index="${i}">+</button>
          </div>
        `;
        menuContainer.appendChild(menuBox);
      }
    });
  
    document.querySelectorAll(".plus").forEach(btn => {
      btn.addEventListener("click", () => changeQty(btn.dataset.index, 1));
    });
  
    document.querySelectorAll(".minus").forEach(btn => {
      btn.addEventListener("click", () => changeQty(btn.dataset.index, -1));
    });
  }
  
  function changeQty(index, change) {
    quantities[index] = Math.max(0, quantities[index] + change);
    document.getElementById(`qty-${index}`).textContent = quantities[index];
    updateTotal();
  }
  
  function updateTotal() {
    let subtotal = 0;
    menuData.forEach((item, i) => {
      const qty = quantities[i] || 0;
      subtotal += qty * parseFloat(item.Price);
    });
  
    const tax = subtotal * 0.09;
    total = subtotal + tax;
  
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
  }
  
  
  document.getElementById("submit-btn").addEventListener("click", () => {
    const items = [];
    menuData.forEach((item, i) => {
      if (quantities[i] > 0) {
        items.push(`${quantities[i]}x ${item["Item Name"]}`);
      }
    });
  
    const notes = document.getElementById("notes").value;
  
    const confirmation = confirm(
        "Please confirm the order:\n\n" +
        "Items: " + items.join(", ") + "\n" +
        "Subtotal: $" + (total / 1.09).toFixed(2) + "\n" +
        "Tax (9%): $" + (total - total / 1.09).toFixed(2) + "\n" +
        "Total: $" + total.toFixed(2) + "\n\n" +
        "Do you want to submit this order?"
      );
      
      if (!confirmation) {
        // cashier clicked Cancel
        return; // do nothing, let them continue editing
      }
      
      // if confirmed, proceed to submit (later we'll send to Google Sheets)
      // For now, just simulate
      alert("Order submitted!");
      
      // Reset
      document.getElementById("notes").value = "";
      loadMenu();
      updateTotal();
              
    // Reset
    document.getElementById("notes").value = "";
    loadMenu();
    updateTotal();
  });
  