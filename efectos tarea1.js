// Inicializar ScrollReveal
ScrollReveal().reveal('.scroll-effect', {
    delay: 300,
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0
});

// Aplicar efectos a secciones específicas
ScrollReveal().reveal('#galeria, #tienda, #blog, #contacto', { 
    delay: 200, 
    duration: 1200, 
    origin: 'left', 
    distance: '50px' 
});