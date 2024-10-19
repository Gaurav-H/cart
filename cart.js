let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, quantity) {
    quantity = parseInt(quantity);

    // Get the price from the data-price attribute in the product div
    const price = parseFloat(document.querySelector(`button[onclick*="addToCart(${id},"]`).parentElement.querySelector('[data-price]').getAttribute('data-price'));

    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        cart.push({ id, name, quantity, price });
    } else {
        cart[itemIndex].quantity += quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} (Quantity: ${quantity}) added to cart!`);
    renderCart();  // Update cart display when adding an item
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();  // Update cart display when removing an item
}

function renderCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    const totalAmountDiv = document.querySelector('.total-amount');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>No items in the cart.</p>';
        totalAmountDiv.innerHTML = '';
    } else {
        let total = 0;
        let cartTable = `
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price (₹)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartTable += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${itemTotal.toFixed(2)}</td>
                    <td><button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button></td>
                </tr>
            `;
        });

        cartTable += `
                </tbody>
            </table>
        `;

        cartItemsDiv.innerHTML = cartTable;
        totalAmountDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
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
        renderCart();  // Clear and update cart after checkout
    }
}

window.onload = function () {
    if (document.querySelector('.cart-items')) {
        renderCart();  // Render the cart items when the page loads
    }
}
