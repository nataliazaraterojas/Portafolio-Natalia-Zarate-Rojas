// ========================================
// CURSOR PERSONALIZADO
// ========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Cursor principal - sigue inmediatamente
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Cursor follower - sigue con delay
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Efecto hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .stat');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ========================================
// NAVEGACIÓN MÓVIL
// ========================================
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========================================
// NAVEGACIÓN ACTIVA AL SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav__links a');

function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ========================================
// ANIMACIONES DE SCROLL (REVEAL)
// ========================================
function createRevealObserver() {
    const revealElements = document.querySelectorAll(
        '.about__header, .about__text, .about__stats, .skill-category, .project-card, .timeline__item, .contact__content'
    );
    
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

createRevealObserver();

// ========================================
// ANIMACIÓN DE BARRAS DE HABILIDADES
// ========================================
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const level = skillItem.getAttribute('data-level');
                skillItem.style.setProperty('--skill-level', `${level}%`);
                skillItem.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillItems.forEach(item => observer.observe(item));
}

animateSkillBars();

// ========================================
// CONTADOR ANIMADO DE ESTADÍSTICAS
// ========================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat__number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = entry.target;
                const finalNumber = parseInt(target.getAttribute('data-target'));
                
                let current = 0;
                const increment = finalNumber / 60;
                const duration = 2000;
                const stepTime = duration / 60;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= finalNumber) {
                        target.textContent = finalNumber;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, stepTime);
            }
        });
    }, {
        threshold: 0.3
    });
    
    stats.forEach(stat => observer.observe(stat));
}

animateCounters();

// ========================================
// EFECTO PARALLAX EN HERO
// ========================================
const heroShapes = document.querySelectorAll('.hero__shape');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    heroShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Efecto de movimiento con el mouse en hero
const heroVisual = document.querySelector('.hero__visual');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        heroShapes.forEach((shape, index) => {
            const speed = 20 + (index * 10);
            const x = mouseX * speed;
            const y = mouseY * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});

// ========================================
// FORMULARIO DE CONTACTO
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ejemplo, usando fetch para enviar a un endpoint
    
    // Simulación de envío exitoso
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>Enviando...</span>';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<span>¡Mensaje enviado!</span>';
        btn.style.background = 'linear-gradient(135deg, #00d4aa 0%, #00a884 100%)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ========================================
// SMOOTH SCROLL MEJORADO
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CAMBIO DE ESTILO DE NAV AL SCROLL
// ========================================
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.padding = '0.75rem 2rem';
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        nav.style.padding = '';
        nav.style.background = '';
    }
});

// ========================================
// TEXTO TYPING EFFECT (OPCIONAL)
// ========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// LAZY LOADING DE IMÁGENES (PREPARADO)
// ========================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// ========================================
// DRAG TO SCROLL CAROUSEL
// ========================================
function initDragCarousel() {
    const carousel = document.querySelector('.highlights-carousel');
    if (!carousel) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Touch support
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

initDragCarousel();

// ========================================
// ACCORDION (shadcn style)
// ========================================
function initAccordion() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    
    if (triggers.length === 0) return;
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const content = trigger.nextElementSibling;
            
            // Cerrar todos los demás (comportamiento "single")
            triggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherContent = otherTrigger.nextElementSibling;
                    if (otherContent) otherContent.classList.remove('open');
                }
            });
            
            // Toggle el actual
            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                content.classList.remove('open');
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                content.classList.add('open');
            }
        });
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
} else {
    initAccordion();
}

// ========================================
// COMPARISON SLIDER
// ========================================
function initComparisonSlider() {
    const slider = document.getElementById('comparisonSlider');
    if (!slider) return;
    
    const container = slider.querySelector('.comparison-slider__container');
    const before = slider.querySelector('.comparison-slider__before');
    const handle = slider.querySelector('.comparison-slider__handle');
    
    let isDragging = false;
    
    function updateSlider(x) {
        const rect = container.getBoundingClientRect();
        let percentage = ((x - rect.left) / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        
        before.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    }
    
    function startDrag(e) {
        isDragging = true;
        container.style.cursor = 'ew-resize';
        e.preventDefault();
    }
    
    function stopDrag() {
        isDragging = false;
        container.style.cursor = 'ew-resize';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        let x;
        if (e.type === 'touchmove') {
            x = e.touches[0].clientX;
        } else {
            x = e.clientX;
        }
        
        updateSlider(x);
    }
    
    // Mouse events
    container.addEventListener('mousedown', (e) => {
        startDrag(e);
        updateSlider(e.clientX);
    });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    
    // Touch events
    container.addEventListener('touchstart', (e) => {
        startDrag(e);
        updateSlider(e.touches[0].clientX);
    });
    
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDrag);
    
    // Click to jump
    container.addEventListener('click', (e) => {
        updateSlider(e.clientX);
    });
}

initComparisonSlider();

// ========================================
// DESKTOP COMPARISON SLIDER
// ========================================
function initDesktopComparison() {
    const screen = document.getElementById('comparisonScreen');
    if (!screen) return;
    
    const afterImg = screen.querySelector('.desktop-comparison__img--after');
    const slider = document.getElementById('comparisonSlider');
    
    if (!afterImg || !slider) return;
    
    let isDragging = false;
    
    function setPosition(percentage) {
        percentage = Math.max(0, Math.min(100, percentage));
        afterImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        slider.style.left = percentage + '%';
    }
    
    function handleMove(clientX) {
        const rect = screen.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setPosition(percentage);
    }
    
    // Mouse events
    screen.addEventListener('mousedown', function(e) {
        isDragging = true;
        handleMove(e.clientX);
        e.preventDefault();
    });
    
    window.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        handleMove(e.clientX);
        e.preventDefault();
    });
    
    window.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Touch events
    screen.addEventListener('touchstart', function(e) {
        isDragging = true;
        handleMove(e.touches[0].clientX);
    }, { passive: true });
    
    window.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    }, { passive: true });
    
    window.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Initialize at 50%
    setPosition(50);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDesktopComparison);
} else {
    initDesktopComparison();
}

// ========================================
// PROJECTS TABS
// ========================================
function initProjectsTabs() {
    const tabs = document.querySelectorAll('.projects-tab');
    const categories = document.querySelectorAll('.projects-category');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');
            
            // Hide all categories
            categories.forEach(c => c.classList.remove('active'));
            // Show selected category
            document.querySelector(`.projects-category[data-category="${category}"]`).classList.add('active');
        });
    });
}

initProjectsTabs();

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c¡Hola! ✨', 'font-size: 24px; font-weight: bold; color: #FF5C8D;');
console.log('%c¿Te gusta lo que ves? ¡Hablemos!', 'font-size: 14px; color: #FF6B4A;');

