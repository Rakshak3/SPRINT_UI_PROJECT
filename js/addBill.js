function showPopup(message, isSuccess) {
    const popup = document.getElementById("popupMessage");
    document.getElementById("popupText").innerText = message;
    popup.className = isSuccess ? "popup success" : "popup error-message";
    popup.style.display = "block";
}

function closePopup() {
    document.getElementById("popupMessage").style.display = "none";
}

function saveBill() {
    const consumerNo = document.getElementById("consumerNo").value;
    const billingPeriod = document.getElementById("billingPeriod").value;
    const billDate = document.getElementById("billDate").value;
    const dueDate = document.getElementById("dueDate").value;
    const disconnectionDate = document.getElementById("disconnectionDate").value;
    const billAmount = document.getElementById("billAmount").value;
    const lateFee = document.getElementById("lateFee").value;
    let isValid = true;

    document.getElementById("consumerNoError").innerText = "";
    document.getElementById("billingPeriodError").innerText = "";
    document.getElementById("billDateError").innerText = "";
    document.getElementById("dueDateError").innerText = "";
    document.getElementById("disconnectionDateError").innerText = "";
    document.getElementById("billAmountError").innerText = "";
    
    if (consumerNo.trim() === "") {
        document.getElementById("consumerNoError").innerText = "Consumer No is required.";
        isValid = false;
    }
    if (billAmount <= 0) {
        document.getElementById("billAmountError").innerText = "Bill Amount must be positive.";
        isValid = false;
    }
    if (!billingPeriod) {
        document.getElementById("billingPeriodError").innerText = "Billing Period is required.";
        isValid = false;
    }

    if (lateFee < 0) {
        showPopup("Late Fee cannot be negative.", false);
        isValid = false;
    }
    if (!billDate) {
        document.getElementById("billDateError").innerText = "Bill Date must be Fill.";
        isValid = false;
    }

    // if (billDate >= dueDate) {
    //     showPopup("Bill Date must be before Due Date.", false);
    //     isValid = false;
    // }

    if (!dueDate) {
        document.getElementById("dueDateError").innerText = "Due Date is required.";
        isValid = false;
    }
    if (!disconnectionDate) {
        document.getElementById("disconnectionDateError").innerText = "Disconnection Date is required.";
        isValid = false;
    }

    if (!isValid) return;

    const billId = "BILL" + Math.floor(1000 + Math.random() * 9000);
    showPopup(`Bill ID: ${billId}\nBill saved successfully!`, true);




}

function addAnotherBill() {
    closePopup();
    document.getElementById("billForm").reset();
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}

        function uploadBills() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) {
        showPopup("Please select a CSV file.", false);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const lines = e.target.result.split("\n");
        let successCount = 0;
        lines.forEach(line => {
            if (line.trim()) successCount++;
        });
        showPopup(`${successCount} bills uploaded successfully!`, true);
    };
    reader.readAsText(file);
}
