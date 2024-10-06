import { getCartProducts, removeFromCart } from '../scritps/helpfunctions.js';
export const renderCart = () => {
    const cart = document.getElementById('carrito');
    const cartProducts = getCartProducts(); // Obtener los productos del carrito
    cart.innerHTML = '';

    // Cuando está el carrito vacío
    if (cartProducts.length === 0) {
        const cartlist = document.createElement('div');
        cartlist.className = 'cart-empty';
        cartlist.innerHTML = `
            <div class="cart-empty-info">
                <p>Your Cart (0)</p>
                <div class="cart-empty-img">
                    <img src="../assets/images/illustration-empty-cart.svg" alt="No hay Productos" />
                    <p>Your added items will appear here</p>
                </div>
            </div>
        `;
        cart.appendChild(cartlist);
    } else {
        const productItems = document.createElement('div');
        productItems.className = 'cart-list';
        productItems.innerHTML = `
            <div class="cart-list-info">
                <strong>Your Cart (${cartProducts.length})</strong>
            </div>`;
        cartProducts.forEach((product, index) => {
            productItems.innerHTML += `
                <div>
                    <strong>${product.name}</strong>
                    <div class="cart-product-info">
                        <div class="cart-product-details">
                            <p>${product.quantity}x</p>
                            <p>@$${product.price.toFixed(2)}</p>
                            <p>$${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                        <button class="circle-remove" data-index="${index}">
                            <img src="../assets/images/icon-remove-item.svg" alt="Borrar" />
                        </button>
                    </div>
                     <hr  style="margin: 10px 0"/>
                </div>
            `;
        });

        // Añadir total
        productItems.innerHTML += `
            <div>
                <div class="cart-list-total">
                    <p>Order Total</p>
                    <p>$${cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}</p>
                </div>
                <div class="cart-list-delivery">
                    <img src="../assets/images/icon-carbon-neutral.svg" alt="Carrito" />
                    <p>This is a <strong>carbon-neutral delivery</strong></p>
                </div>
                <div class="cart-list-button">
                    <button class="cart-button" id="order">Confirm Order</button>
                </div>
            </div>`;
        
        cart.appendChild(productItems);

        // Añadir evento al botón de checkout
        const checkoutButton = document.querySelector('.cart-button');
        checkoutButton.addEventListener('click', () => {
            import('../scritps/modal.js').then(module => module.openCheckoutModal(cartProducts));
        });

        // Asignar el evento para eliminar el producto del carrito
        const removeButtons = document.querySelectorAll('.circle-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.closest('button').dataset.index; // Obtener el índice del producto
                const productToRemove = cartProducts[index]; // Obtener el producto a eliminar
                removeFromCart(productToRemove); // Llamar a la función removeFromCart
                renderCart(); // Volver a renderizar el carrito
            });
        });
    }
};
