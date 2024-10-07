const checkoutModal = document.getElementById('checkoutModal');
const confirmOrderButton = document.getElementById('confirmOrder');

// Función para abrir el modal y mostrar el resumen del carrito
export const openCheckoutModal = (cartProducts) => {
    const cartSummary = document.getElementById('cartSummary');
    cartSummary.innerHTML = ''; // Limpiar el resumen

    // Agregar los productos del carrito al resumen
    cartProducts.forEach(product => {
        cartSummary.innerHTML += `
          <div class="cartSumaryCardInfo">
            <img src="${product.image.thumbnail}" alt="${product.name}"/>
            <div class="cartSumaryCardText">
              <strong>${product.name}</strong>
              <div class="cartSumaryCardPrice">
                <p>${product.quantity}x</p>
                <p>@ $${product.price.toFixed(2)}</p>
              </div>
            </div>
             <strong>$${(product.price * product.quantity).toFixed(2)}</strong>
          </div>  
          <hr>         
        `;
    });

    // Añadir total al resumen
    const total = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
    cartSummary.innerHTML += `
      <div class="cartSumaryCardTotal">
        <p>Order total</p>
        <strong>$${total}</strong>
      </div>`;
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

