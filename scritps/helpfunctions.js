import { renderCart } from "../scritps/cart.js";
let cartProducts = [];
// Función para agregar un producto al carrito
export const addToCart = (product) => {
    const existingProduct = cartProducts.find(item => item.name === product.name && item.price === product.price);
    
    if (existingProduct) {
        existingProduct.quantity += 1; // Incrementar la cantidad
    } else {
        cartProducts.push({ ...product, quantity: 1 }); // Agregar nuevo producto con cantidad
    }

    renderCart(); // Actualizar el carrito
};

// Función para decrementar la cantidad de un producto
export const decrementQuantity = (product) => {
    const existingProduct = cartProducts.find(item => item.name === product.name && item.price === product.price);
    
    if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1; // Disminuir cantidad en el carrito
    } else if (existingProduct) {
        removeFromCart(existingProduct); // Eliminar el producto si la cantidad es 0
    }
    
    renderCart(); // Actualiza la vista del carrito
};

// Función para eliminar un producto del carrito
export const removeFromCart = (product) => {
  cartProducts = cartProducts.filter(item => item.name !== product.name || item.price !== product.price);
  retomarButton(product);
  renderCart(); // Actualizar la vista del carrito
};
//Funcion para retomar button en el carrito
export const retomarButton = (product) => {
  // Vuelve a mostrar el botón de añadir al carrito en el producto
  const productCard = document.getElementById(`add-to-cart-${product.name}`);
  const quantityControl = document.getElementById(`quantity-controls-${product.name}`);
  if (productCard) {
      productCard.style.display = 'flex'; // Mostrar el botón "Add to Cart"
      quantityControl.style.display = 'none';
  }
}
// Función para limpiar el carrito
export const clearCart = () => {
  cartProducts = []; // Vaciar el carrito
  renderCart(); // Actualizar la vista del carrito
};
//Funcion para cambiar imagen segun pantalla
export const changeImage = (product) => {  
  const image = document.getElementById(`dessert-img-${product.name}`);
  if (image) {
      if (window.innerWidth <= 500) {
          image.src = product.image.mobile; // Cambia a la imagen móvil
      } else if (window.innerWidth <= 1024) {
          image.src = product.image.tablet; // Cambia a la imagen tablet
      } else {
          image.src = product.image.desktop; // Cambia a la imagen de escritorio
      }
  }
};

export const getCartProducts = () => cartProducts;

