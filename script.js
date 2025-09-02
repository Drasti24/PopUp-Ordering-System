const ORDER_SUBMIT_URL = "https://script.google.com/macros/s/AKfycbyOryaWq-44kkW-aM6yd_8y9hPZG_PQabPsSJ6hoTv6BHXrFba2LdICZpX9R-Nc5Txt/exec";

let menuData = [
  { "Item Name": "Pani Puri", "Price": "7", "Available": "Y" },
  { "Item Name": "Vada Pav", "Price": "5", "Available": "Y" },
  { "Item Name": "Samosa Chaat", "Price": "6", "Available": "Y" }
];

let total = 0;
let quantities = [];

document.addEventListener("DOMContentLoaded", () => {
  loadMenu();
  updateTotal();
});

function loadMenu() {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = "";
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

  document.querySelectorAll(".plus").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn.dataset.index, 1))
  );
  document.querySelectorAll(".minus").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn.dataset.index, -1))
  );
}

function changeQty(index, change) {
  quantities[index] = Math.max(0, quantities[index] + change);
  document.getElementById(`qty-${index}`).textContent = quantities[index];
  updateTotal();
}

function updateTotal() {
  let subtotal = 0;
  menuData.forEach((item, i) => {
    subtotal += (quantities[i] || 0) * parseFloat(item.Price);
  });

  const tax = subtotal * 0.09;
  total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

document.getElementById("submit-btn").addEventListener("click", () => {
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const customerName = document.getElementById("customer-name").value.trim();
  const notes = document.getElementById("notes").value;
  const items = [];

  menuData.forEach((item, i) => {
    if (quantities[i] > 0) {
      items.push(`${quantities[i]}x ${item["Item Name"]}`);
    }
  });

  if (!customerName) {
    alert("Please enter your name.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Order";
    return;
  }

  if (items.length === 0 && notes.trim() === "") {
    alert("Please select at least one item or leave a note.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Order";
    return;
  }

  const subtotal = (total / 1.09).toFixed(2);
  const tax = (total - subtotal).toFixed(2);
  const grandTotal = total.toFixed(2);

  const formData = new URLSearchParams();
  formData.append("name", customerName);
  formData.append("items", items.join(", "));
  formData.append("notes", notes);
  formData.append("subtotal", subtotal);
  formData.append("tax", tax);
  formData.append("total", grandTotal);

  fetch(ORDER_SUBMIT_URL, {
    method: "POST",
    body: formData,
  })
    .then(res => res.text())
    .then(response => {
      if (response.includes("ERROR:")) {
        alert("Error from server:\n" + response);
      } else {
        alert("Order submitted!\n\n" + response);
        document.getElementById("customer-name").value = "";
        document.getElementById("notes").value = "";
        loadMenu();
        updateTotal();
      }
    })
    .catch(err => {
      alert("There was an error submitting the order. Please try again.");
      console.error("Fetch error:", err);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Order";
    });
});
