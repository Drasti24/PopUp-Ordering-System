# Garam Tava Club – Popup Ordering System 🍽️

This is a lightweight, dynamic ordering system designed for popup food events. It allows customers to place orders through a sleek frontend and automatically logs the orders into Google Sheets for kitchen staff to view in real-time.

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Google Apps Script (Web App using `doPost` and `doGet`)
- **Data Storage**: Google Sheets
- **Deployment**: GitHub Pages (frontend), Google Apps Script (backend)

---

## ✨ Features

- 🍛 **Menu-based ordering** system with quantity selectors and live total calculation (with tax).
- 📝 **Optional notes** field for custom instructions or spice levels.
- 🔐 **Validation** to ensure name and at least one item or note is present.
- 📄 **Auto-logs all orders** into Google Sheets for tracking.
- 📋 **Kitchen dashboard** to display new orders in a clean, readable format.
- 🔄 **Auto-refresh** of the kitchen dashboard every 30 seconds.

---

## 🔜 Planned Features
- 🧮 Item-level inventory tracking (e.g., only 50 Pav Bhajis allowed per popup)
- ✅ Order completion tracking with a "Mark as Done" button
- 🎨 More polished mobile UI for kitchen display
- 🔐 Authentication for kitchen dashboard access

---

## 🚀 How It Works

1. **Frontend** is hosted on GitHub Pages and acts as the customer interface.
2. When a customer fills out their name, selects items, and clicks "Submit Order", the form sends the data to a **Google Apps Script Web App**.
3. The **Google Apps Script** writes the order to a connected **Google Sheet**.
4. The **Kitchen Dashboard** (another HTML page) fetches the orders from the sheet every 30 seconds using a public `doGet()` endpoint and displays them in a clean layout.

---

## ✍️ Author

Drasti Patel

🍲 Built for Garam Tava Club popup events
📍 Based in Ontario, Canada

---

⚖️ License

This project is licensed under the MIT License. Feel free to fork, use, and build upon it.
