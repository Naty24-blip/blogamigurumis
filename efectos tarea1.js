// ScrollReveal Configuration
ScrollReveal().reveal('.scroll-effect', {
  delay: 200,
  distance: '20px',
  duration: 800,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 200,
  reset: true
});

// Observador para animaciones al hacer scroll
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-effect').forEach(element => {
  observer.observe(element);
});

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Actualizar URL sin recargar la página
      history.pushState(null, null, targetId);
    }
  });
});

// Validación de formulario
const contactForm = document.getElementById('form-contacto');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validación básica
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    if (!nombre || !email || !mensaje) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    // Validación de email simple
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    // Simular envío (en producción, usar AJAX o Fetch)
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
    this.reset();
  });
}

// Efecto hover para productos
document.querySelectorAll('.producto').forEach(product => {
  product.addEventListener('mouseenter', function() {
    const img = this.querySelector('img');
    img.style.transform = 'scale(1.05)';
  });
  
  product.addEventListener('mouseleave', function() {
    const img = this.querySelector('img');
    img.style.transform = 'scale(1)';
  });
});

// Galería modal (opcional)
const galleryImages = document.querySelectorAll('.galeria img');
galleryImages.forEach(img => {
  img.addEventListener('click', function() {
    // Crear modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
    modal.style.zIndex = '1000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    // Crear imagen en modal
    const modalImg = document.createElement('img');
    modalImg.src = this.src;
    modalImg.alt = this.alt;
    modalImg.style.maxHeight = '90vh';
    modalImg.style.maxWidth = '90vw';
    modalImg.style.objectFit = 'contain';
    
    // Botón cerrar
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '40px';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.cursor = 'pointer';
    
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  });
});

// Cargar Font Awesome dinámicamente
function loadFontAwesome() {
  const fa = document.createElement('link');
  fa.rel = 'stylesheet';
  fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  fa.integrity = 'sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==';
  fa.crossOrigin = 'anonymous';
  fa.referrerPolicy = 'no-referrer';
  document.head.appendChild(fa);
}

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  loadFontAwesome();
  
  // Actualizar año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();
});