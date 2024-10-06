const productGrid = document.querySelector('.product-grid');
const cartItems = document.querySelector('.cart-items');
const totalElement = document.getElementById('total');

const cart = [];

function addToCart(product) {
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>KES ${product.price}</p>
      <button class="remove-from-cart">Remove</button>
    `;

        total += product.price * product.quantity;

        cartItems.appendChild(cartItem);

        const removeButton = cartItem.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => {
            removeItem(product.id);
        });
    });

    totalElement.textContent = total;
}

function removeItem(productId) {
    cart.splice(cart.findIndex(p => p.id === productId), 1);
    updateCart();
}

const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productData = {
            id: product.querySelector('img').src,
            name: product.querySelector('h3').textContent,
            price: parseInt(product.querySelector('p').textContent.replace('KES ', ''))
        };
        addToCart(productData);
    });
});

updateCart();