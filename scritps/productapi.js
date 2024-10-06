const DATA = './src/data.json';
export const fetchProducts = async () => {
    try {
        const response = await fetch(DATA);
        if (!response.ok) throw new Error('Error en la red');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        return [];
    }
};

export const renderProducts = (products, addToCart, decrementQuantity, removeFromCart) => {
    const productList = document.getElementById('grip');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
					<div class="card-top">
							<img class="card-img" src="${product.image.desktop}" alt="${product.name}" />
							<div  class="quantity-controls" id="quantity-controls-${product.name}">
								<button class="decrement" data-name="${product.name}">-</button>
								<span class="quantity" id="quantity-${product.name}">1</span>
								<button class="increment" data-name="${product.name}">+</button>
							</div>
							<button id="add-to-cart-${product.name}" class="add-to-cart"> 
									<img src="./assets/images/icon-add-to-cart.svg" alt="Añadir al carrito" />
									<p>Add to cart</p>
							</button>
					</div>
					<div class="card-bottom">
							<span>${product.category}</span>
							<p>${product.name}</p>
							<p>$${product.price.toFixed(2)}</p>
					</div>
			`;

        productList.appendChild(productCard);

        const addButton = productCard.querySelector(`.add-to-cart`);
        addButton.addEventListener('click', () => {
            addToCart(product);
						addButton.style.display = 'none'; // Ocultar el botón de añadir al carrito
   					const controls = productCard.querySelector('.quantity-controls');
    				controls.style.display = 'flex'; // Mostrar controles de cantidad
            /* flex row*/
            console.log('Producto añadido al carrito');
        });
				// Control de cantidad
				const incrementButton = productCard.querySelector('.increment');
				const decrementButton = productCard.querySelector('.decrement');
				const quantityDisplay = productCard.querySelector(`.quantity`);

				incrementButton.addEventListener('click', () => {
						addToCart(product);
						const quantity = parseInt(quantityDisplay.textContent);
						quantityDisplay.textContent = quantity + 1;
				});

				decrementButton.addEventListener('click', () => {
					decrementQuantity(product);
					const quantity = parseInt(quantityDisplay.textContent);
					if (quantity > 1) {
							quantityDisplay.textContent = quantity - 1; // Actualiza la cantidad mostrada
					} else {
							removeFromCart(product); // Eliminar si la cantidad es 0
							addButton.style.display = 'flex'; // Volver a mostrar el botón "Add to Cart"
							productCard.querySelector('.quantity-controls').style.display = 'none'; // Ocultar los controles de cantidad
					}
			});
    });
};
