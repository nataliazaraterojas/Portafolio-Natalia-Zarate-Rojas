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
        'recommended.title': 'Recommended',
        'recommended.nng.title': 'Nielsen Norman Group',
        'recommended.nng.desc': 'UX research and articles',
        'recommended.uxc.title': 'UX Collective',
        'recommended.uxc.desc': 'Design publication on Medium',
        'recommended.dops.title': 'DesignOps Latam',
        'recommended.dops.desc': 'Podcast about design and operations',
        'recommended.figma.title': 'Figma Community',
        'recommended.figma.desc': 'Design resources and templates',
        
        // Projects
        'projects.tareas.title': 'TASKS AND PLANS',
        'projects.tareas.category': 'product design',
        'projects.breb.title': 'BRE-B',
        'projects.breb.category': 'digital banking',
        'projects.bpartners.title': 'BE-PARTNERS',
        'projects.bpartners.category': 'fintech & crypto',
        'projects.habiitemos.title': 'HABIITEMOS',
        'projects.habiitemos.category': 'mobile app',
        'projects.metodologias.title': 'AI METHODOLOGIES',
        'projects.metodologias.category': 'ai + design',
        'projects.bloc.title': 'BLOC',
        'projects.bloc.category': 'service design',
        
        // Footer
        'footer.cta': 'If you want to work with me, feel free to get in touch:',
        'footer.location.label': '[ LOCATION ]',
        'footer.location.value': 'Bogotá, Colombia',
        'footer.info.label': '[ INFO ]',
        'footer.social.label': '[ SOCIAL MEDIA ]',
        'footer.cv': 'Download CV ↓',
        
        // Profile Page
        'profile.tag': 'PRODUCT & STRATEGIC DESIGNER',
        'profile.hero.title1': 'DESIGN',
        'profile.hero.title2': 'EXPERIENCES',
        'profile.hero.title3': 'DIGITAL',
        'profile.back': '← Back',
        'profile.approach.title': 'What value can I bring?',
        'profile.approach.purpose.title': 'Design with purpose',
        'profile.approach.purpose.text': 'I don\'t design screens: I design experiences that improve people\'s lives, based on research and real empathy.',
        'profile.approach.root.title': 'Straight to the root',
        'profile.approach.root.text': 'I identify deep causes and not just symptoms, to create strategic and scalable solutions that save time and resources.',
        'profile.approach.agility.title': 'Agility with results',
        'profile.approach.agility.text': 'I work with rapid experimentation, constant validation and agile methodologies to generate measurable impact in less time.',
        'profile.approach.solutions.title': '360° Solutions',
        'profile.approach.solutions.text': 'I design products where everyone wins: user, business and team, combining design, data and artificial intelligence.',
        'profile.timeline.title': 'Making design a way of thinking and building the future.',
        'profile.timeline.desc1': 'I\'m passionate about designing at the intersection of physical and digital, creating experiences that connect technology, people and real environments.',
        'profile.timeline.desc2': 'I\'ve been developing innovative digital solutions for more than 6 years —today with a focus on AI-powered experiences.',
        'profile.certifications.title': 'Certifications and education',
        'profile.accordion.ubits.date': '2025 - Project',
        'profile.accordion.ubits.title': 'Senior Product Designer',
        'profile.accordion.ubits.company': 'Ubits',
        'profile.accordion.ubits.item1': 'Design of digital experiences for large-scale administrative and operational teams, powered by AI.',
        'profile.accordion.ubits.item2': 'Rapid prototyping with Cursor and agile ideation for early validations.',
        'profile.accordion.ubits.item3': 'Creation of scalable flows and components in code alongside product and development teams.',
        'profile.accordion.ubits.link': 'View featured project →',
        'profile.accordion.bancobogota.date': '2022 - 2025',
        'profile.accordion.bancobogota.title': 'Senior UX/UI Designer',
        'profile.accordion.bancobogota.company': 'Banco de Bogotá',
        'profile.accordion.bancobogota.item1': 'Responsible for the digital experience of credit and debit cards, and optimization of transactional modules in App and Web.',
        'profile.accordion.bancobogota.item2': 'New digital sales channel QR → <strong>+65% in requests</strong> and <strong>+35% in placement</strong>.',
        'profile.accordion.bancobogota.item3': '100% digitization of the card application process ⭐ (access from any device).',
        'profile.accordion.bancobogota.item4': 'Reduction of transaction times in payment and transfer modules.',
        'profile.accordion.bancobogota.link': 'View featured project →',
        'profile.accordion.haptica.date': '2022',
        'profile.accordion.haptica.title': 'Interaction Analyst',
        'profile.accordion.haptica.company': 'Háptica Consultora',
        'profile.accordion.haptica.item1': 'Strategic design based on user behavior.',
        'profile.accordion.haptica.item2': 'Brand positioning optimization through consumption analysis.',
        'profile.accordion.colsubsidio.date': '2019 - 2022',
        'profile.accordion.colsubsidio.title': 'Innovation Analyst',
        'profile.accordion.colsubsidio.company': 'Colsubsidio',
        'profile.accordion.colsubsidio.item1': 'Co-leader of innovation and service design projects for recreation, tourism and health.',
        'profile.accordion.colsubsidio.item2': 'Experience redesign at Piscilago → <strong>-15% wait times</strong> / <strong>-10% food service</strong>.',
        'profile.accordion.colsubsidio.item3': 'Increase in digital adoption post-pandemic with online ticketing and segmented strategies.',
        'profile.accordion.colsubsidio.item4': 'BLOC (Local Wellbeing) project: awarded at SER Colsubsidio 2020.',
        
        // Highlights Section
        'profile.highlights.podcast.desc': 'Conversation about how AI has become the central axis of product development, transforming team dynamics and technical collaboration.',
        'profile.highlights.podcast.cta': 'See more →',
        'profile.highlights.podcast.text': 'Talking about AI and design on <strong>La Suma+ DesignOps Latam</strong> - Ep. 89',
        'profile.highlights.studio.desc': '4 days of intensive co-design creating EKUBA: a modular circuit that challenges hypervigilance and micro racism in public spaces in Bogotá.',
        'profile.highlights.studio.cta': 'See more →',
        'profile.highlights.studio.text': 'Winners of the <strong>Studio Shift</strong> workshop - Design Factory Javeriana',
        'profile.highlights.bloc.desc': 'Experience and service design, transforming user interaction through field research, service design and strategies based on real behaviors to generate measurable social impact.',
        'profile.highlights.bloc.cta': 'See more →',
        'profile.highlights.bloc.text': 'Experience design for <strong>Bloc Colsubsidio</strong>',
        'profile.highlights.innovation.desc': '80 hours of innovation training applying CREAR - ESTRUCTURAR - IMPLEMENTAR methodologies for specific cases of each business unit.',
        'profile.highlights.innovation.cta': 'See more →',
        'profile.highlights.innovation.text': 'Training as <strong>Innovation Mobilizer</strong> - Colsubsidio',
        
        // CTA Section
        'profile.cta.title': 'Shall we work together?',
        
        // Footer
        'profile.footer.text': 'designed with love by Natalia Zarate ♡'
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
        'recommended.title': 'Recomendados',
        'recommended.nng.title': 'Nielsen Norman Group',
        'recommended.nng.desc': 'Investigación y artículos de UX',
        'recommended.uxc.title': 'UX Collective',
        'recommended.uxc.desc': 'Publicación de diseño en Medium',
        'recommended.dops.title': 'DesignOps Latam',
        'recommended.dops.desc': 'Podcast sobre diseño y operaciones',
        'recommended.figma.title': 'Figma Community',
        'recommended.figma.desc': 'Recursos y templates de diseño',
        
        // Projects
        'projects.tareas.title': 'TAREAS Y PLANES',
        'projects.tareas.category': 'product design',
        'projects.breb.title': 'BRE-B',
        'projects.breb.category': 'banca digital',
        'projects.bpartners.title': 'BE-PARTNERS',
        'projects.bpartners.category': 'fintech & cripto',
        'projects.habiitemos.title': 'HABIITEMOS',
        'projects.habiitemos.category': 'app mobile',
        'projects.metodologias.title': 'METODOLOGÍAS IA',
        'projects.metodologias.category': 'ia + design',
        'projects.bloc.title': 'BLOC',
        'projects.bloc.category': 'service design',
        
        // Footer
        'footer.cta': 'Si quieres trabajar conmigo, no dudes en contactarme:',
        'footer.location.label': '[ UBICACIÓN ]',
        'footer.location.value': 'Bogotá, Colombia',
        'footer.info.label': '[ INFO ]',
        'footer.social.label': '[ REDES SOCIALES ]',
        'footer.cv': 'Descargar CV ↓',
        
        // Profile Page
        'profile.tag': 'PRODUCT & STRATEGIC DESIGNER',
        'profile.hero.title1': 'DISEÑO',
        'profile.hero.title2': 'EXPERIENCIAS',
        'profile.hero.title3': 'DIGITALES',
        'profile.back': '← Volver',
        'profile.approach.title': '¿Qué valor puedo aportar?',
        'profile.approach.purpose.title': 'Diseño con propósito',
        'profile.approach.purpose.text': 'No diseño pantallas: diseño experiencias que mejoran la vida de las personas, basadas en investigación y empatía real.',
        'profile.approach.root.title': 'Directo a la raíz',
        'profile.approach.root.text': 'Identifico causas profundas y no solo síntomas, para crear soluciones estratégicas y escalables que ahorran tiempo y recursos.',
        'profile.approach.agility.title': 'Agilidad con resultados',
        'profile.approach.agility.text': 'Trabajo con experimentación rápida, validación constante y metodologías ágiles para generar impacto medible en menos tiempo.',
        'profile.approach.solutions.title': 'Soluciones 360°',
        'profile.approach.solutions.text': 'Diseño productos donde todos ganan: usuario, negocio y equipo, combinando diseño, data e inteligencia artificial.',
        'profile.timeline.title': 'Haciendo del diseño una forma de pensar y construir futuro.',
        'profile.timeline.desc1': 'Me apasiona diseñar en la intersección entre lo físico y lo digital, creando experiencias que conecten tecnología, personas y entornos reales.',
        'profile.timeline.desc2': 'Llevo más de 6 años desarrollando soluciones digitales innovadoras —hoy con foco en experiencias potenciadas por IA.',
        'profile.certifications.title': 'Certificaciones y educación',
        'profile.accordion.ubits.date': '2025 - Proyecto',
        'profile.accordion.ubits.title': 'Senior Product Designer',
        'profile.accordion.ubits.company': 'Ubits',
        'profile.accordion.ubits.item1': 'Diseño de experiencias digitales para equipos administrativos y operativos de gran escala, impulsadas por IA.',
        'profile.accordion.ubits.item2': 'Prototipado rápido con Cursor e ideación ágil para validaciones tempranas.',
        'profile.accordion.ubits.item3': 'Creación de flujos escalables y componentes en código junto a equipos de producto y desarrollo.',
        'profile.accordion.ubits.link': 'Ver proyecto destacado →',
        'profile.accordion.bancobogota.date': '2022 - 2025',
        'profile.accordion.bancobogota.title': 'Senior UX/UI Designer',
        'profile.accordion.bancobogota.company': 'Banco de Bogotá',
        'profile.accordion.bancobogota.item1': 'Responsable de la experiencia digital de tarjetas de crédito y débito, y de la optimización de módulos transaccionales en App y Web.',
        'profile.accordion.bancobogota.item2': 'Nuevo canal digital de venta QR → <strong>+65% en solicitudes</strong> y <strong>+35% en colocación</strong>.',
        'profile.accordion.bancobogota.item3': '100% digitalización del proceso de solicitud de tarjetas ⭐ (acceso desde cualquier dispositivo).',
        'profile.accordion.bancobogota.item4': 'Reducción de tiempos de transacción en módulos de pagos y transferencias.',
        'profile.accordion.bancobogota.link': 'Ver proyecto destacado →',
        'profile.accordion.haptica.date': '2022',
        'profile.accordion.haptica.title': 'Analista de Interacciones',
        'profile.accordion.haptica.company': 'Háptica Consultora',
        'profile.accordion.haptica.item1': 'Diseño estratégico basado en comportamiento del usuario.',
        'profile.accordion.haptica.item2': 'Optimización del posicionamiento de marca mediante análisis de consumo.',
        'profile.accordion.colsubsidio.date': '2019 - 2022',
        'profile.accordion.colsubsidio.title': 'Analista de Innovación',
        'profile.accordion.colsubsidio.company': 'Colsubsidio',
        'profile.accordion.colsubsidio.item1': 'Co-líder de proyectos de innovación y diseño de servicios para recreación, turismo y salud.',
        'profile.accordion.colsubsidio.item2': 'Rediseño de experiencia en Piscilago → <strong>-15% tiempos de espera</strong> / <strong>-10% atención en alimentación</strong>.',
        'profile.accordion.colsubsidio.item3': 'Aumento de adopción digital post-pandemia con boletería online y estrategias segmentadas.',
        'profile.accordion.colsubsidio.item4': 'Proyecto BLOC (Bienestar Local): premiado en SER Colsubsidio 2020.',
        
        // Highlights Section
        'profile.highlights.podcast.desc': 'Conversación sobre cómo la IA se ha convertido en el eje central del desarrollo de producto, transformando la dinámica del equipo y la colaboración técnica.',
        'profile.highlights.podcast.cta': 'Ver más →',
        'profile.highlights.podcast.text': 'Hablando sobre IA y diseño en <strong>La Suma+ DesignOps Latam</strong> - Ep. 89',
        'profile.highlights.studio.desc': '4 días de co-diseño intensivo creando EKUBA: un circuito modular que desafía la hipervigilancia y micro racismo en espacios públicos de Bogotá.',
        'profile.highlights.studio.cta': 'Ver más →',
        'profile.highlights.studio.text': 'Ganadores del workshop de <strong>Studio Shift</strong> - Design Factory Javeriana',
        'profile.highlights.bloc.desc': 'Diseño de experiencias y servicios, transformando la interacción con los usuarios mediante investigación en campo, service design y estrategias basadas en comportamientos reales para generar impacto social medible.',
        'profile.highlights.bloc.cta': 'Ver más →',
        'profile.highlights.bloc.text': 'Diseño de experiencias para <strong>Bloc Colsubsidio</strong>',
        'profile.highlights.innovation.desc': '80 horas de formación en innovación aplicando metodologías de CREAR - ESTRUCTURAR - IMPLEMENTAR para casos específicos de cada unidad de negocio.',
        'profile.highlights.innovation.cta': 'Ver más →',
        'profile.highlights.innovation.text': 'Formación como <strong>Movilizadora de Innovación</strong> - Colsubsidio',
        
        // CTA Section
        'profile.cta.title': '¿Trabajamos juntos?',
        
        // Footer
        'profile.footer.text': 'diseñado con amor por Natalia Zarate ♡'
    }
};

// Estado del idioma - Por defecto inglés
// Si no hay idioma guardado, usar inglés
let currentLanguage = 'en';
if (localStorage.getItem('language')) {
    currentLanguage = localStorage.getItem('language');
} else {
    // Primera vez: establecer inglés por defecto
    localStorage.setItem('language', 'en');
}

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
function initLanguage() {
    // Obtener idioma guardado o usar inglés por defecto
    let savedLang = localStorage.getItem('language');
    if (!savedLang) {
        savedLang = 'en';
        localStorage.setItem('language', 'en');
    }
    
    // Aplicar idioma
    changeLanguage(savedLang);
    initLanguageSelector();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    // DOM ya está listo, ejecutar inmediatamente
    initLanguage();
}

// CONSOLE MESSAGE
// ========================================
console.log('%c¡Hola! ✨', 'font-size: 24px; font-weight: bold; color: #FF5C8D;');
console.log('%c¿Te gusta lo que ves? ¡Hablemos!', 'font-size: 14px; color: #FF6B4A;');
