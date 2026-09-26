let selectedProduct = "";
let selectedPrice = "";

function openOrderModal(productName, productPrice) {
    selectedProduct = productName;
    selectedPrice = productPrice;
    document.getElementById("modalProductName").innerText = `${productName} — ${productPrice}`;
    document.getElementById("orderModal").classList.remove("hidden");
}

function closeOrderModal() {
    document.getElementById("orderModal").classList.add("hidden");
    document.getElementById("orderForm").reset();
    document.getElementById("responseMessage").classList.add("hidden");
}

async function submitOrder(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById("submitBtn");
    const responseMsg = document.getElementById("responseMessage");
    
    const customerData = {
        product: selectedProduct,
        price: selectedPrice,
        name: document.getElementById("customerName").value,
        phone: document.getElementById("customerPhone").value,
        address: document.getElementById("customerAddress").value,
        timestamp: new Date().toISOString()
    };

    // Apnar n8n workflow er Webhook URL ekhane boshaben
    // Jehetu n8n alada run korchen, local port ba public URL (e.g., via ngrok) use korte paren.
    const n8nWebhookUrl = "https://sumaiyashop.app.n8n.cloud/webhook/efcc6a9f-9a79-40e6-9b7a-cdf8dfe2c543"; // Update this if running via ngrok or remote

    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";
    responseMsg.classList.add("hidden");

    try {
        const response = await fetch(n8nWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerData)
        });

        if (response.ok) {
            responseMsg.innerText = "Order placed successfully! Data sent to n8n.";
            responseMsg.className = "mt-4 text-center text-sm font-medium text-green-600";
            responseMsg.classList.remove("hidden");
            setTimeout(() => {
                closeOrderModal();
                submitBtn.disabled = false;
                submitBtn.innerText = "Confirm Order (Send to n8n)";
            }, 2500);
        } else {
            throw new Error("Failed to reach n8n server.");
        }
    } catch (error) {
        console.error("Error:", error);
        responseMsg.innerText = "Failed to connect to n8n. Make sure your local n8n is running!";
        responseMsg.className = "mt-4 text-center text-sm font-medium text-red-600";
        responseMsg.classList.remove("hidden");
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirm Order (Send to n8n)";
    }
}