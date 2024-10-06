const checkoutModal = document.getElementById('checkoutModal');
const confirmOrderButton = document.getElementById('confirmOrder');

// Función para abrir el modal y mostrar el resumen del carrito
export const openCheckoutModal = (cartProducts) => {
    const cartSummary = document.getElementById('cartSummary');
    cartSummary.innerHTML = ''; // Limpiar el resumen

    // Agregar los productos del carrito al resumen
    cartProducts.forEach(product => {
        const cardModal = document.createElement('div');
        cardModal.className = 'cartSumaryCard';
        cardModal.innerHTML += `
          <div class="cartSumaryCardInfo">
            <img src="${product.image.thumbnail}" alt="${product.name}"/>
            <div class="cartSumaryCardText">
              <stong>${product.name}</stong>
              <div class="cartSumaryCardPrice">
                <p>${product.quantity}x</p>
                <p>$${product.price}</p>
                <p>$${(product.price * product.quantity).toFixed(2)}</p></div>
              </div>
          </div>           
        `;

        cartSummary.appendChild(cardModal);
    });

    // Añadir total al resumen
    const total = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
    cartSummary.innerHTML += `<strong>Total: $${total}</strong>`;

    // Mostrar el modal
    checkoutModal.style.display = 'block';


    // Cerrar el modal cuando se hace clic fuera del modal
    window.onclick = (event) => {
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    };

    // Confirmar el pedido
    confirmOrderButton.addEventListener('click', () => {
        alert('Pedido confirmado');
        // Ocultar el modal
        checkoutModal.style.display = 'none';
        
        // Limpiar el carrito después de confirmar
        import('../scritps/helpfunctions.js').then(module => {
          module.clearCart(); // Limpia el carrito

          // Restablecer los botones "Add to Cart"
          cartProducts.forEach(product => {
              module.retomarButton(product); // Mostrar el botón "Add to Cart" para cada producto
          });
      });
    });
    
};
