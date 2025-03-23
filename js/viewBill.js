const billData = [
    { customerId: 1, billId: 101, period: "Jan 2024", billDate: "01-01-2024", dueDate: "15-01-2024", amount: "100", lateFee: "5", status: "Paid", paymentDate: "10-01-2024" },
    { customerId: 2, billId: 102, period: "Feb 2024", billDate: "01-02-2024", dueDate: "15-02-2024", amount: "120", lateFee: "0", status: "Unpaid", paymentDate: "-" },
    { customerId: 3, billId: 103, period: "Mar 2024", billDate: "01-03-2024", dueDate: "15-03-2024", amount: "90", lateFee: "3", status: "Paid", paymentDate: "12-03-2024" },
    { customerId: 4, billId: 104, period: "Apr 2024", billDate: "01-04-2024", dueDate: "15-04-2024", amount: "130", lateFee: "0", status: "Unpaid", paymentDate: "-" },
    { customerId: 5, billId: 105, period: "May 2024", billDate: "01-05-2024", dueDate: "15-05-2024", amount: "110", lateFee: "5", status: "Paid", paymentDate: "10-05-2024" },
    { customerId: 1, billId: 101, period: "Jan 2024", billDate: "01-01-2024", dueDate: "15-01-2024", amount: "100", lateFee: "5", status: "Paid", paymentDate: "10-01-2024" },
    { customerId: 2, billId: 102, period: "Feb 2024", billDate: "01-02-2024", dueDate: "15-02-2024", amount: "120", lateFee: "0", status: "Unpaid", paymentDate: "-" },
    { customerId: 3, billId: 103, period: "Mar 2024", billDate: "01-03-2024", dueDate: "15-03-2024", amount: "90", lateFee: "3", status: "Paid", paymentDate: "12-03-2024" },
    { customerId: 4, billId: 104, period: "Apr 2024", billDate: "01-04-2024", dueDate: "15-04-2024", amount: "130", lateFee: "0", status: "Unpaid", paymentDate: "-" },
    { customerId: 5, billId: 105, period: "May 2024", billDate: "01-05-2024", dueDate: "15-05-2024", amount: "110", lateFee: "5", status: "Paid", paymentDate: "10-05-2024" },
    { customerId: 1, billId: 101, period: "Jan 2024", billDate: "01-01-2024", dueDate: "15-01-2024", amount: "100", lateFee: "5", status: "Paid", paymentDate: "10-01-2024" },
    { customerId: 2, billId: 102, period: "Feb 2024", billDate: "01-02-2024", dueDate: "15-02-2024", amount: "120", lateFee: "0", status: "Unpaid", paymentDate: "-" },
    { customerId: 3, billId: 103, period: "Mar 2024", billDate: "01-03-2024", dueDate: "15-03-2024", amount: "90", lateFee: "3", status: "Paid", paymentDate: "12-03-2024" },
    { customerId: 4, billId: 104, period: "Apr 2024", billDate: "01-04-2024", dueDate: "15-04-2024", amount: "130", lateFee: "0", status: "Unpaid", paymentDate: "-" },
    { customerId: 5, billId: 105, period: "May 2024", billDate: "01-05-2024", dueDate: "15-05-2024", amount: "110", lateFee: "5", status: "Paid", paymentDate: "10-05-2024" }
];


function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Customer Bill History", 10, 10);
    let y = 20;
    document.querySelectorAll("#billTable tbody tr").forEach(row => {
        const rowData = Array.from(row.children).map(td => td.textContent).join(" | ");
        doc.text(rowData, 10, y);
        y += 10;
    });
    doc.save("bill_history.pdf");
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    const rows = document.querySelectorAll("#billTable tr");
    rows.forEach(row => {
        let rowData = Array.from(row.children).map(td => td.textContent).join(",");
        csvContent += rowData + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bill_history.csv");
    document.body.appendChild(link);
    link.click();
}

function searchCustomer() {
    const customerId = document.getElementById("customerId").value;
    const tableBody = document.getElementById("billData");
    const table = document.getElementById("billTable");
    const error = document.getElementById("error");
    
    tableBody.innerHTML = "";
    error.textContent = "";

    if (!customerId || isNaN(customerId)) {
        error.textContent = "Please enter a valid Customer ID.";
        table.style.display = "none";
        return;
    }

    const filteredData = billData.filter(bill => bill.customerId == customerId);
    if (filteredData.length === 0) {
        error.textContent = "No records found for this Customer ID.";
        table.style.display = "none";
        return;
    }

    table.style.display = "table";
    filteredData.forEach(bill => {
        const row = `<tr>
            <td>${bill.customerId}</td>
            <td>${bill.billId}</td>
            <td>${bill.period}</td>
            <td>${bill.billDate}</td>
            <td>${bill.dueDate}</td>
            <td>${bill.amount}</td>
            <td>${bill.lateFee}</td>
            <td>${bill.status}</td>
            <td>${bill.paymentDate}</td>
            // <td><button onclick='showDetails(${JSON.stringify(bill)})'>View</button></td>
            <td><button>View</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


function applyFilters() {
const billingPeriod = document.getElementById("billingPeriodFilter").value;
const paymentStatus = document.getElementById("paymentStatusFilter").value;
const customerId = document.getElementById("customerId").value;
const tableBody = document.getElementById("billData");

if (!customerId || isNaN(customerId)) {
    return;
}

let filteredData = billData.filter(bill => bill.customerId == customerId);

// Filter by Billing Period
if (billingPeriod === "6months") {
    const last6Months = ["Dec 2023", "Nov 2023", "Oct 2023", "Sep 2023", "Aug 2023", "Jul 2023"];
    filteredData = filteredData.filter(bill => last6Months.includes(bill.period));
} else if (billingPeriod === "year") {
    filteredData = filteredData.filter(bill => bill.period.includes("2024"));
}

// Filter by Payment Status
if (paymentStatus !== "all") {
    filteredData = filteredData.filter(bill => bill.status.toLowerCase() === paymentStatus);
}

// Render filtered data
tableBody.innerHTML = "";
filteredData.forEach(bill => {
    const row = `<tr>
        <td>${bill.customerId}</td>
        <td>${bill.billId}</td>
        <td>${bill.period}</td>
        <td>${bill.billDate}</td>
        <td>${bill.dueDate}</td>
        <td>${bill.amount}</td>
        <td>${bill.lateFee}</td>
        <td>${bill.status}</td>
        <td>${bill.paymentDate}</td>
        <td><button>View</button></td>
    </tr>`;
    tableBody.innerHTML += row;
});
}

// Attach event listeners for filters
document.getElementById("billingPeriodFilter").addEventListener("change", applyFilters);
document.getElementById("paymentStatusFilter").addEventListener("change", applyFilters);

