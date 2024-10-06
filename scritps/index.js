import { fetchProducts, renderProducts } from '../scritps/productapi.js';
import { renderCart } from '../scritps/cart.js';
import { addToCart, decrementQuantity, removeFromCart } from './helpfunctions.js';
// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    renderProducts(products, addToCart, decrementQuantity, removeFromCart);
    renderCart(); // Muestra el carrito vacío al inicio
});

