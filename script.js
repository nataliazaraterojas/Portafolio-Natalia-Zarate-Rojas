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

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Cerrar menú al hacer click en un link
const navLinksItems = document.querySelectorAll('.nav__links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========================================
// ESTADÍSTICAS ANIMADAS
// ========================================
const stats = document.querySelectorAll('.stat__number');
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateNumber(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

stats.forEach(stat => {
    statsObserver.observe(stat);
});

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ========================================
// PROYECTOS TABS
// ========================================
function initProjectsTabs() {
    const tabs = document.querySelectorAll('.projects-tab');
    const projectCards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            // Show/hide project cards
            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

initProjectsTabs();

// ========================================
// SISTEMA DE TRADUCCIÓN / LANGUAGE SYSTEM
// ========================================

const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About me',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        
        // Hero
        'hero.greeting': 'Hello! I\'m Natalia',
        'hero.headline': 'I design digital experiences',
        'hero.memorable': 'memorable',
        'hero.for': 'for your',
        'hero.rotating.brand': 'brand',
        'hero.rotating.business': 'business',
        'hero.rotating.startup': 'startup',
        'hero.rotating.project': 'project',
        
        // About Section
        'about.title': 'Senior Product <br>& Strategic <br>Designer',
        'about.text1': '<strong>I have more than 6 years of experience</strong> in digital product design, UX/UI, innovation and service design. With experience and knowledge in <strong>creating experiences from AI</strong>, flow optimization and improvement of KPIs such as conversion, digital adoption and customer satisfaction.',
        'about.text2': 'I have co-led and participated in high-impact projects in <strong>banking, education, entertainment and services</strong>, working with multidisciplinary teams under <strong>Lean UX, Agile Scrum and Design Thinking</strong> approaches. My approach combines usability, efficiency and strategic product vision.',
        'about.link': 'Work experience →',
        'about.stats.projects': 'Completed<br>projects',
        'about.stats.years': 'Years of<br>experience',
        'about.stats.clients': 'Satisfied<br>clients',
        'about.companies': 'Companies I\'ve worked with',
        
        // Projects
        'projects.title': 'Projects',
        'projects.highlighted': 'featured',
        
        // Recommended
        'recommended.title': 'Recommended'
    },
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Sobre mí',
        'nav.projects': 'Proyectos',
        'nav.contact': 'Contacto',
        
        // Hero
        'hero.greeting': '¡Hola! Soy Natalia',
        'hero.headline': 'Diseño experiencias digitales',
        'hero.memorable': 'memorables',
        'hero.for': 'para tu',
        'hero.rotating.brand': 'marca',
        'hero.rotating.business': 'negocio',
        'hero.rotating.startup': 'startup',
        'hero.rotating.project': 'proyecto',
        
        // About Section
        'about.title': 'Senior Product <br>& Strategic <br>Designer',
        'about.text1': '<strong>Tengo más de 6 años de experiencia</strong> en diseño de producto digital, UX/UI, innovación y diseño de servicios. Con experiencia y conocimiento en <strong>creación de experiencias a partir de IA</strong>, optimización de flujos y mejora de KPIs como conversión, adopción digital y satisfacción del cliente.',
        'about.text2': 'He co-liderado y participado en proyectos de alto impacto en <strong>banca, educación, entretenimiento y servicios</strong>, trabajando con equipos multidisciplinarios bajo enfoques <strong>Lean UX, Agile Scrum y Design Thinking</strong>. Mi enfoque combina usabilidad, eficiencia y visión estratégica de producto.',
        'about.link': 'Trayectoria laboral →',
        'about.stats.projects': 'Proyectos<br>completados',
        'about.stats.years': 'Años de<br>experiencia',
        'about.stats.clients': 'Clientes<br>satisfechos',
        'about.companies': 'Empresas donde he trabajado',
        
        // Projects
        'projects.title': 'Proyectos',
        'projects.highlighted': 'destacados',
        
        // Recommended
        'recommended.title': 'Recomendados'
    }
};

// Estado del idioma - Por defecto inglés
let currentLanguage = localStorage.getItem('language') || 'en';

// Función para cambiar el idioma
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            const translation = translations[lang][key];
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.tagName === 'IMG') {
                element.alt = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
    
    // Actualizar selector de idioma
    updateLanguageSelector(lang);
}

// Función para actualizar el selector de idioma
function updateLanguageSelector(lang) {
    const button = document.getElementById('languageSelectorBtn');
    const dropdown = document.getElementById('languageDropdown');
    
    if (!button || !dropdown) return;
    
    const flagElement = button.querySelector('.language-selector__flag');
    const textElement = button.querySelector('.language-selector__text');
    const options = dropdown.querySelectorAll('.language-selector__option');
    
    // Actualizar botón
    if (lang === 'en') {
        flagElement.textContent = '🇺🇸';
        textElement.textContent = 'English';
    } else {
        flagElement.textContent = '🇪🇸';
        textElement.textContent = 'Spanish';
    }
    
    // Actualizar opciones activas
    options.forEach(option => {
        option.classList.remove('language-selector__option--active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('language-selector__option--active');
        }
    });
}

// Inicializar selector de idioma
function initLanguageSelector() {
    const button = document.getElementById('languageSelectorBtn');
    const dropdown = document.getElementById('languageDropdown');
    const options = dropdown?.querySelectorAll('.language-selector__option');
    
    if (!button || !dropdown) return;
    
    // Toggle dropdown
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('active');
        
        if (isOpen) {
            dropdown.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
        } else {
            dropdown.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Seleccionar idioma
    options?.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            changeLanguage(lang);
            dropdown.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!button.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
        }
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('language') || 'en';
        changeLanguage(savedLang);
        initLanguageSelector();
    });
} else {
    const savedLang = localStorage.getItem('language') || 'en';
    changeLanguage(savedLang);
    initLanguageSelector();
}

// CONSOLE MESSAGE
// ========================================
console.log('%c¡Hola! ✨', 'font-size: 24px; font-weight: bold; color: #FF5C8D;');
console.log('%c¿Te gusta lo que ves? ¡Hablemos!', 'font-size: 14px; color: #FF6B4A;');
