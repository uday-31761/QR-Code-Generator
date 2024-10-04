const wrapper = document.querySelector(".wrapper");
const qrInput = wrapper.querySelector(".form input");
const generateBtn = wrapper.querySelector(".form button");
const qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
    let qrvalue = qrInput.value.trim(); // Trim to remove leading/trailing spaces
    if (!qrvalue) {
        showNotification("Please enter a URL", "red");
        return;
    }
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrvalue}`;
    qrImg.addEventListener("load", () => {
        showNotification("QR code generated", "green");
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value) {
        wrapper.classList.remove("active");
    }
});

// Event listener for input focus
qrInput.addEventListener("focus", () => {
    wrapper.classList.remove("active");
});

// Event listener for input blur
qrInput.addEventListener("blur", () => {
    if (qrInput.value) {
        wrapper.classList.add("active");
    }
});

function showNotification(message, color) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.backgroundColor = color;
    notification.classList.add("notification");
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
