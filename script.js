// Carrito de compras
let cart = [];

// Función para desplazarse a la sección de productos
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Función para agregar productos al carrito
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    
    // Mostrar notificación
    const notification = document.getElementById('cart-notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = `✓ ${productName} agregado al carrito ($${price.toLocaleString('es-CO')})`;
    notification.classList.add('show');
    
    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Animación del botón
    const button = event.target;
    button.textContent = '✓ Agregado';
    button.style.background = '#4caf50';
    
    setTimeout(() => {
        button.textContent = 'Agregar al Carrito';
        button.style.background = '';
    }, 2000);
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    console.log(`Carrito actualizado: ${cart.length} productos`);
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log('Total: $' + total.toLocaleString('es-CO'));
}

// Función para manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Mostrar notificación de éxito
    const notification = document.getElementById('cart-notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = `✓ Gracias ${name}! Tu mensaje ha sido enviado.`;
    notification.style.background = '#667eea';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.style.background = '#4caf50';
    }, 4000);
    
    // Limpiar formulario
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    console.log('Formulario enviado:', { name, email, message });
}

// Animación de las tarjetas de productos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observar todas las tarjetas de productos
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    productCards.forEach(card => observer.observe(card));
    benefitCards.forEach(card => observer.observe(card));
});

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled * 0.002);
    }
});

// Navegación suave para todos los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
