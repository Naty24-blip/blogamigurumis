document.addEventListener('DOMContentLoaded', function() {
  // Cargar Font Awesome dinámicamente
  loadFontAwesome();
  
  // Actualizar año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Inicializar animaciones
  initAnimations();
  
  // Configurar interactividad
  setupInteractivity();
  
  // Configurar galería modal
  setupGallery();
  
  // Configurar efectos hover
  setupHoverEffects();
  
  // Configurar formulario
  setupFormValidation();
});

function loadFontAwesome() {
  const existingFA = document.querySelector('link[href*="font-awesome"]');
  if (!existingFA) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
  }
}

function initAnimations() {
  // ScrollReveal con config mejorada
  ScrollReveal().reveal('.scroll-effect', {
    delay: 150,
    distance: '30px',
    duration: 800,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200,
    reset: false,
    viewFactor: 0.2
  });
  
  // Efecto parallax para el header
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
  }
}

function setupInteractivity() {
  // Smooth scrolling mejorado
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
        
        // Agregar clase activa
        if (this.dataset.toggle) {
          const target = document.querySelector(this.dataset.toggle);
          target.classList.toggle('active');
        }
      }
    });
  });
  
  // Efecto de carga suave para imágenes
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });
  
  images.forEach(img => imageObserver.observe(img));
}

function setupGallery() {
  // Galería modal mejorada
  const galleryImages = document.querySelectorAll('.galeria img');
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <img class="modal-img" src="" alt="">
      <div class="modal-caption"></div>
      <button class="modal-nav modal-prev"><i class="fas fa-chevron-left"></i></button>
      <button class="modal-nav modal-next"><i class="fas fa-chevron-right"></i></button>
    </div>
  `;
  document.body.appendChild(modal);
  
  let currentImageIndex = 0;
  const imagesArray = Array.from(galleryImages);
  
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });
  
  function openModal(index) {
    currentImageIndex = index;
    const imgSrc = imagesArray[index].src;
    const imgAlt = imagesArray[index].alt;
    
    modal.querySelector('.modal-img').src = imgSrc;
    modal.querySelector('.modal-caption').textContent = imgAlt;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Agregar animación
    modal.querySelector('.modal-content').classList.add('animate-in');
  }
  
  // Cerrar modal
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Navegación
  modal.querySelector('.modal-prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    openModal(currentImageIndex);
  });
  
  modal.querySelector('.modal-next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    openModal(currentImageIndex);
  });
  
  // Teclado
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') modal.querySelector('.modal-prev').click();
      if (e.key === 'ArrowRight') modal.querySelector('.modal-next').click();
    }
  });
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.querySelector('.modal-content').classList.remove('animate-in');
  }
}

function setupHoverEffects() {
  // Efectos hover para productos
  document.querySelectorAll('.producto').forEach(product => {
    const img = product.querySelector('img');
    const info = product.querySelector('.producto-info');
    const button = product.querySelector('button');
    
    product.addEventListener('mouseenter', () => {
      if (img) img.style.transform = 'scale(1.05)';
      if (info) info.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      if (button) button.style.transform = 'translateY(-5px)';
    });
    
    product.addEventListener('mouseleave', () => {
      if (img) img.style.transform = 'scale(1)';
      if (info) info.style.backgroundColor = '';
      if (button) button.style.transform = '';
    });
  });
  
  // Tooltips interactivos
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
  });
  
  function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = this.dataset.tooltip;
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    
    this.tooltipElement = tooltip;
  }
  
  function hideTooltip() {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }
}

function setupFormValidation() {
  const form = document.getElementById('form-contacto');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validación mejorada
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      if (input.required && !input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
        
        // Validación específica para email
        if (input.type === 'email' && !validateEmail(input.value)) {
          input.classList.add('error');
          isValid = false;
        }
      }
    });
    
    if (isValid) {
      // Simular envío con feedback visual
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      submitBtn.classList.add('sending');
      
      // Simular retraso de red
      setTimeout(() => {
        submitBtn.textContent = '¡Mensaje Enviado!';
        submitBtn.classList.remove('sending');
        submitBtn.classList.add('success');
        
        // Resetear después de 3 segundos
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('success');
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }, 1500);
    } else {
      // Mostrar mensaje de error
      const errorElement = form.querySelector('.form-error') || document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.textContent = 'Por favor completa todos los campos requeridos correctamente.';
      
      if (!form.querySelector('.form-error')) {
        form.insertBefore(errorElement, form.firstChild);
      }
    }
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}