const items = [
  { CT_Number: "CT0001", WT: 2, Price: 100, Discount: 20, Sale_Price: 80 },
  { CT_Number: "CT0002", WT: 3, Price: 150, Discount: 25, Sale_Price: 125 },
  { CT_Number: "CT0003", WT: 1, Price: 50, Discount: 5, Sale_Price: 45 },
  { CT_Number: "CT0004", WT: 5, Price: 200, Discount: 50, Sale_Price: 150 },
  { CT_Number: "CT0005", WT: 4, Price: 180, Discount: 30, Sale_Price: 150 },
  { CT_Number: "CT0006", WT: 6, Price: 300, Discount: 60, Sale_Price: 240 },
  { CT_Number: "CT0007", WT: 7, Price: 400, Discount: 80, Sale_Price: 320 },
  { CT_Number: "CT0008", WT: 3, Price: 120, Discount: 20, Sale_Price: 100 },
  { CT_Number: "CT0009", WT: 2, Price: 90, Discount: 10, Sale_Price: 80 },
  { CT_Number: "CT0010", WT: 8, Price: 500, Discount: 100, Sale_Price: 400 },
  { CT_Number: "CT0011", WT: 4, Price: 200, Discount: 40, Sale_Price: 160 },
  { CT_Number: "CT0012", WT: 2, Price: 70, Discount: 15, Sale_Price: 55 },
  { CT_Number: "CT0013", WT: 5, Price: 250, Discount: 50, Sale_Price: 200 },
  { CT_Number: "CT0014", WT: 3, Price: 110, Discount: 20, Sale_Price: 90 },
  { CT_Number: "CT0015", WT: 1, Price: 60, Discount: 5, Sale_Price: 55 },
  { CT_Number: "CT0016", WT: 7, Price: 350, Discount: 70, Sale_Price: 280 },
  { CT_Number: "CT0017", WT: 6, Price: 300, Discount: 60, Sale_Price: 240 },
  { CT_Number: "CT0018", WT: 2, Price: 85, Discount: 10, Sale_Price: 75 },
  { CT_Number: "CT0019", WT: 5, Price: 225, Discount: 40, Sale_Price: 185 },
  { CT_Number: "CT0020", WT: 4, Price: 190, Discount: 35, Sale_Price: 155 },
  { CT_Number: "CT0021", WT: 3, Price: 140, Discount: 20, Sale_Price: 120 },
  { CT_Number: "CT0022", WT: 2, Price: 95, Discount: 15, Sale_Price: 80 },
  { CT_Number: "CT0023", WT: 6, Price: 275, Discount: 50, Sale_Price: 225 },
  { CT_Number: "CT0024", WT: 5, Price: 240, Discount: 45, Sale_Price: 195 },
  { CT_Number: "CT0025", WT: 8, Price: 520, Discount: 120, Sale_Price: 400 },
];

// Reference to inputs
const ctInput = document.getElementById("ctNumber");
const wtInput = document.getElementById("wt");
const priceInput = document.getElementById("price");
const discountInput = document.getElementById("discount");
const salePriceInput = document.getElementById("salePrice");

// Create a container for suggestions
const suggestionBox = document.createElement("div");
suggestionBox.classList.add("suggestion-box");
document.body.appendChild(suggestionBox);

// Show suggestions
ctInput.addEventListener("input", () => {
  const query = ctInput.value.toUpperCase();
  suggestionBox.innerHTML = ""; // Clear previous suggestions

  if (query) {
    // Filter data based on query
    const matches = items
      .filter((item) => item.CT_Number.startsWith(query))
      .slice(0, 10); // Limit to 10 results

    // Create suggestion elements
    matches.forEach((match) => {
      const suggestion = document.createElement("div");
      suggestion.classList.add("suggestion");
      suggestion.textContent = match.CT_Number;

      // On click, fill fields
      suggestion.addEventListener("click", () => {
        ctInput.value = match.CT_Number;
        wtInput.value = match.WT;
        priceInput.value = match.Price;
        discountInput.value = match.Discount;
        salePriceInput.value = match.Sale_Price;

        suggestionBox.innerHTML = ""; // Clear suggestions
      });

      suggestionBox.appendChild(suggestion);
    });

    // Position suggestion box near input
    const rect = ctInput.getBoundingClientRect();
    suggestionBox.style.left = `${rect.left}px`;
    suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionBox.style.width = `${rect.width}px`;
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionBox.contains(e.target) && e.target !== ctInput) {
    suggestionBox.innerHTML = "";
  }
});
const table = document.getElementById("dataTable");
const dateField = document.getElementById("date");
const today = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
dateField.value = today;
document.getElementById("addRow").addEventListener("click", function () {
  const ctNumber = document.getElementById("ctNumber").value;
  const wt = document.getElementById("wt").value;
  const price = document.getElementById("price").value;
  const discount = document.getElementById("discount").value;
  const salePrice = document.getElementById("salePrice").value;

  // Check if fields are not empty
  if (ctNumber && wt && price && salePrice) {
    // Add row to table
    const table = document.getElementById("dataTable");
    const newRow = `
          <tr>
            <td>${ctNumber}</td>
            <td>${wt}</td>
            <td>${price}</td>
            <td>${discount}</td>
            <td class="sale-price">${salePrice}</td>
            <td><button class="btn btn-danger btn-sm delete-row">Delete</button></td>
          </tr>
        `;
    table.insertAdjacentHTML("beforeend", newRow);
    updateTotal();

    document.getElementById("ctNumber").value = "";
    document.getElementById("wt").value = "";
    document.getElementById("price").value = "";
    document.getElementById("discount").value = "";
    document.getElementById("salePrice").value = "";
  } else {
    alert("Please fill out all required fields!");
  }
});
table.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-row")) {
    const row = e.target.closest("tr");
    row.remove(); // Remove the row

    // Update total after deleting a row
    updateTotal();
  }
});

const totalInput = document.getElementById("total");
function updateTotal() {
  let total = 0;
  const rows = table.querySelectorAll("tr");
  rows.forEach((row) => {
    const salePrice =
      parseFloat(row.querySelector(".sale-price").textContent) || 0;
    total += salePrice;
  });
  totalInput.value = total.toFixed(2);
}

const totalField = document.getElementById("total");
const cashField = document.getElementById("cash");
const creditCardField = document.getElementById("creditCard");
const debitCardField = document.getElementById("debitCard");
const bankTransferField = document.getElementById("bankTransfer");
const dueField = document.getElementById("due");

function updateDue() {
  const total = parseFloat(totalField.value) || 0;
  const cash = parseFloat(cashField.value) || 0;
  const creditCard = parseFloat(creditCardField.value) || 0;
  const debitCard = parseFloat(debitCardField.value) || 0;
  const bankTransfer = parseFloat(bankTransferField.value) || 0;

  // Calculate the due amount
  const paid = cash + creditCard + debitCard + bankTransfer;
  const due = total - paid;
  dueField.value = due.toFixed(2);
}

[cashField, creditCardField, debitCardField, bankTransferField].forEach(
  (field) => {
    field.addEventListener("input", updateDue);
  }
);
