let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, quantity) {
    quantity = parseInt(quantity);
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        cart.push({ id, name, quantity });
    } else {
        cart[itemIndex].quantity += quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} (Quantity: ${quantity}) added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cart.forEach(item => {
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} (x${item.quantity})</span>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        });
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty! Add some items before checking out.");
    } else {
        let cartDetails = cart.map(item => `${item.name} x${item.quantity}`).join(', ');

        // Simulating WhatsApp message
        let message = `Order details: ${cartDetails}. We will update the prices manually after checkout.`;
        let whatsappUrl = `https://api.whatsapp.com/send?phone=918088490085&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

window.onload = function () {
    if (document.querySelector('.cart-items')) {
        renderCart();
    }
}
