const SHEET_JSON_URL = 'https://script.google.com/macros/s/AKfycbyOryaWq-44kkW-aM6yd_8y9hPZG_PQabPsSJ6hoTv6BHXrFba2LdICZpX9R-Nc5Txt/exec';

document.addEventListener('DOMContentLoaded', () => {
  fetchOrders();
  setInterval(fetchOrders, 30000); // Refresh every 30 seconds
});

function fetchOrders() {
  fetch(SHEET_JSON_URL)
    .then(res => res.json())
    .then(data => displayOrders(data))
    .catch(err => {
      console.error("Failed to fetch orders:", err);
      document.getElementById('order-list').textContent = "Error loading orders.";
    });
}

function displayOrders(orders) {
  const container = document.getElementById('order-list');
  container.innerHTML = "";

  if (orders.length === 0) {
    container.textContent = "No orders yet.";
    return;
  }

  orders.forEach(order => {
    const orderCard = document.createElement('div');
    orderCard.className = "order-card";

    const formattedDate = new Date(order.Timestamp).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const itemsList = order.Items?.split(',').map(item => `• ${item.trim()}`).join('<br>') || '';

    orderCard.innerHTML = `
      <p><strong>🕒 ${formattedDate}</strong></p>
      <p style="font-size: 1.25rem;">👤 ${order.Name}</p>
      <p style="font-size: 1.2rem;"><strong> ${itemsList}</strong></p> 
      <p><strong>NOTE:</strong> ${order.Notes || "—"}</p>
      <hr>
    `;
    container.appendChild(orderCard);
  });
}
