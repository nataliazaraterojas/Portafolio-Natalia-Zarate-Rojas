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
        
        // Project Pages - Common Labels
        'project.close': 'Close',
        'project.client': 'CLIENT',
        'project.team': 'TEAM',
        'project.services': 'SERVICES',
        'project.duration': 'DURATION',
        'project.months': '8 months',
        
        // Project Pages - Common Sections
        'project.introduction': 'Project Introduction',
        'project.context': 'Context',
        'project.problem': 'Problem',
        'project.objectives': 'Project Objectives',
        'project.role': 'My Role / Responsibilities',
        'project.process': 'Process / Method',
        'project.results': 'Results / Impact',
        'project.learnings': 'Learnings',
        
        // Tareas y Planes
        'project.tareas.context': 'UBITS, a leader in corporate training, needed a product that would connect learning with daily work execution. This is how Tasks and Plans was born, a module designed to become the operational center of the ecosystem: bringing together courses, assignments, objectives and analytics in a single experience.',
        'project.tareas.problem': 'Without an integrated execution tool, user companies had to supplement UBITS with external platforms to manage tasks, priorities and work plans, fragmenting the experience and reducing adoption.',
        
        // B-Partners
        'project.bpartners.client': 'Technical test',
        'project.bpartners.team': 'Individual',
        'project.bpartners.description': '<strong>Financial platform that unifies banking and crypto</strong> in a single experience. I designed from scratch the <strong>visual identity</strong> and the <strong>digital product</strong>, creating an ecosystem that conveys <strong>trust, modernity and security</strong> for users seeking to manage their money simply and transparently.',
        'project.bpartners.user.title': 'User & Behavior',
        'project.bpartners.user.text': 'The user seeks a digital financial experience that combines banking and crypto in a simple, secure and frictionless way.',
        'project.bpartners.user.subtitle': 'Insights',
        'project.bpartners.user.insight1': 'Digital user, young-adult, used to solving their financial life from mobile.',
        'project.bpartners.user.insight2': 'Wants simplicity, speed and transparency at every step.',
        'project.bpartners.user.insight3': 'Gets frustrated with long and confusing processes; values clear onboarding.',
        'project.bpartners.user.insight4': 'Interested in crypto, but needs a visual and reliable guide.',
        'project.bpartners.user.insight5': 'Seeks to centralize everything financial in a single intuitive ecosystem.',
        'project.bpartners.product.label': 'Digital Product',
        'project.bpartners.product.title': 'Intuitive user interface',
        'project.bpartners.product.text': 'I developed a digital platform focused on usability and security, creating clear flows for complex financial operations.',
        'project.bpartners.product.feature1.title': 'Intuitive dashboard',
        'project.bpartners.product.feature1.desc': 'Clear and accessible information',
        'project.bpartners.product.feature2.title': 'Visual security',
        'project.bpartners.product.feature2.desc': 'Design that generates trust',
        'project.bpartners.product.feature3.title': 'Modular components',
        'project.bpartners.product.feature3.desc': 'Scalable and consistent system',
        'project.bpartners.product.feature4.title': 'Optimized flows',
        'project.bpartners.product.feature4.desc': 'Smooth user experience',
        'project.bpartners.proposal.title': 'Proposal & Value',
        'project.bpartners.proposal.text': 'I designed a financial experience that integrates banking and crypto in a single platform, making money management simpler, safer and more accessible.',
        'project.bpartners.proposal.subtitle': 'Key points',
        'project.bpartners.proposal.point1': 'We unify traditional banking + crypto in a single intuitive space.',
        'project.bpartners.proposal.point2': 'Clear design that reduces friction and increases user trust.',
        'project.bpartners.proposal.point3': 'Quick onboarding to start using the product in minutes.',
        'project.bpartners.proposal.point4': 'Visuals and flows that explain the complex in a simple and actionable way.',
        'project.bpartners.proposal.point5': 'We enable financial decisions with greater control and transparency.',
        'project.bpartners.solutions.title': 'What does Be-Partners solve?',
        'project.bpartners.solution1.title': 'Unify Banking and Crypto',
        'project.bpartners.solution1.text': 'The project solves financial fragmentation by integrating in a single platform everything the user needs: traditional banking, digital money management and crypto operations in a simple and accessible way.',
        'project.bpartners.solution2.title': 'Clear and Frictionless Digital Experience',
        'project.bpartners.solution2.text': 'Simplifies complex financial processes with a clean interface, intuitive navigation and quick onboarding that guides the user without overwhelming them, reducing errors and increasing their confidence.',
        'project.bpartners.solution3.title': 'Safer Financial Decisions',
        'project.bpartners.solution3.text': 'Offers visual transparency, timely alerts and clear presentation of risks and movements so the user can make informed decisions, without technicalities or information overload.',
        'project.bpartners.solution4.title': 'Total Control from Mobile',
        'project.bpartners.solution4.text': 'Centralizes essential actions—send, receive, convert, invest or buy—in a quick flow of few steps, ensuring the user manages their daily financial life from anywhere.',
        'project.bpartners.prototype': 'View prototype in Figma',
        
        // BLOC
        'project.bloc.tag': 'Service Design · Colsubsidio',
        'project.bloc.subtitle': 'Local Wellbeing Colsubsidio: A decentralized care model that brings compensation fund services closer to communities, transforming the way people access wellbeing, health and recreation.',
        'project.bloc.context.title': 'Project Context',
        'project.bloc.context.problem.title': 'The problem',
        'project.bloc.context.problem.text': 'Colsubsidio had large service centers concentrated in specific areas of Bogotá, which created access barriers for remote communities. Many members did not take advantage of their benefits due to lack of knowledge or difficulty traveling.',
        'project.bloc.context.opportunity.title': 'The opportunity',
        'project.bloc.context.opportunity.text': 'Design a decentralized care model that would bring Colsubsidio\'s essential services directly to neighborhoods and communities, creating close, accessible contact points with a humanized service experience.',
        'project.bloc.services.title': 'Designed services',
        
        // Tareas y Planes - Extended
        'project.tareas.description': 'A new module conceived to become the operational center of the UBITS ecosystem. Its goal is to articulate the other platform products (courses, academies, routes, assignments, analytics), through a tracking and execution system that would allow collaborators to organize their work, prioritize responsibilities, improve internal coordination and keep track of the real progress of their activities.',
        'project.tareas.challenge.title': 'Initial challenge',
        'project.tareas.challenge.text': 'Create a product capable of becoming the daily operational center of UBITS, integrating in one place the execution, tracking and organization of work for both administrative (white-collar) and operational (blue-collar) teams. The challenge was not only to design a new interface, but to rethink the complete product strategy, transforming it from a traditional B2B model to a more everyday, transversal use also oriented to B2C.',
        'project.tareas.evolution.title': 'Product evolution',
        'project.tareas.evolution.intro': 'Redesign and versioning throughout product development.',
        'project.tareas.comparison.hint': '← Drag to compare →',
        'project.tareas.comparison.before': 'BEFORE',
        'project.tareas.comparison.after': 'AFTER',
        'project.tareas.timeline.title': 'Product timeline',
        'project.tareas.timeline.card1.title': '8 months of development',
        'project.tareas.timeline.card1.text': '<strong>4 versions</strong> of the product were developed, driven by an accelerated design process thanks to the use of <strong>AI and direct prototyping in Cursor</strong>.',
        'project.tareas.timeline.card2.title': 'Real-time validation',
        'project.tareas.timeline.card2.text': 'Three versions were tested with users in real time, allowing rapid iteration, validating decisions and adjusting the proposal on the fly.',
        'project.tareas.timeline.card3.title': 'Ready for 2026',
        'project.tareas.timeline.card3.text': 'The fourth version was completely designed and ready to be implemented in the <strong>first quarter of 2026</strong>, demonstrating an efficient and agile design cycle.',
        'project.tareas.versions.title': 'Versions',
        'project.tareas.version.v1.title': 'Key features',
        'project.tareas.version.v1.feature1': 'Create, edit, prioritize and complete tasks',
        'project.tareas.version.v1.feature2': 'Smart grouping in plans',
        'project.tareas.version.v1.feature3': '1-to-1 assignment and real-time tracking',
        'project.tareas.version.v1.feature4': 'Assignment and update notifications',
        'project.tareas.version.v1.feature5': 'Operational and flexible plans powered by AI',
        'project.tareas.version.v1.usecases.title': 'Enabled use cases',
        'project.tareas.version.v1.usecase1': 'Individual task management: personal organization, daily tracking and prioritization',
        'project.tareas.version.v1.usecase2': 'Collaborative task management: coordination between teams, responsibility tracking and visibility of progress',
        'project.tareas.version.v1.2.title': 'Key features',
        'project.tareas.version.v1.2.feature1': 'Creation of individual development plans based on 360 results',
        'project.tareas.version.v1.2.feature2': 'Evidence and comment registration on each task',
        'project.tareas.version.v1.2.feature3': 'Advanced filters for tracking by leaders and HR',
        'project.tareas.version.v1.2.usecases.title': 'Enabled use cases',
        'project.tareas.version.v1.2.usecase1': 'Task management from HR: development support, structured tracking and traceability of growth metrics',
        'project.tareas.version.v2.title': 'Comments and evidence',
        'project.tareas.version.v2.desc': 'Complete traceability system with comments and detailed tracking.',
        'project.tareas.version.v2.feature1': 'Real-time comments',
        'project.tareas.version.v2.feature2': 'Evidence upload',
        'project.tareas.version.v2.feature3': 'Change history',
        'project.tareas.version.v3.title': 'V1.3 — Operational activation',
        'project.tareas.version.v3.features.title': 'Features',
        'project.tareas.version.v3.feature1': 'Advanced search by plan name and task',
        'project.tareas.version.v3.feature2': 'Embedded tasks and plans within the platform',
        'project.tareas.version.v3.feature3': 'Complete CRUD of templates, allowing creation, editing and management of reusable models',
        'project.tareas.version.v3.feature4': 'Bulk plan upload and assignment, optimizing management of large teams',
        'project.tareas.version.v3.feature5': 'Individual Plan or Plan for all mode, which flexibilizes execution according to the objective',
        'project.tareas.version.v3.usecases.title': 'Enabled use cases',
        'project.tareas.version.v3.usecase1': 'HR task management and base for large-scale operational task management',
        'project.tareas.ai.title': 'What role does AI play in this module?',
        'project.tareas.ai.card1.title': '1. Accelerates plan creation',
        'project.tareas.ai.card1.text': 'From an objective + context (text or document), AI proposes task groups, priorities and sequence. Reduces plan design time from hours to minutes.',
        'project.tareas.ai.card2.title': '2. Generates ready-to-execute plans',
        'project.tareas.ai.card2.text': 'AI delivers an initial structure that the user only needs to review and adjust. Useful for: Onboarding, PDIs, operational plans and campaigns.',
        'project.tareas.ai.card3.stat': 'Hours → Minutes',
        'project.tareas.ai.card3.label': 'Reduction in plan design time.',
        'project.tareas.ai.card4.title': '3. Connects diagnosis with action',
        'project.tareas.ai.card4.text': 'From 360 Evaluations, allows generating automatic PDIs (5 recommended courses + 8–10 suggested tasks). Translates gaps into executable actions.',
        'project.tareas.ai.card5.title': 'Integration with 360 Evaluations',
        'project.tareas.ai.card5.text': 'AI generates automatic PDIs based on evaluation results, recommending specific courses and tasks to close identified gaps.',
        'project.tareas.process.title': 'New work process',
        'project.tareas.process.intro': 'How design and collaboration culture changed.',
        'project.tareas.process.card1.title': 'Rapid prototyping',
        'project.tareas.process.card1.text': 'Use of Cursor and AI for early validations and shorter iteration cycles.',
        'project.tareas.process.card2.title': 'Technical collaboration',
        'project.tareas.process.card2.text': 'Direct work with development teams, creating components in code.',
        'project.tareas.process.card3.title': 'Real agility',
        'project.tareas.process.card3.text': 'From weeks to days: drastic reduction in design delivery times.',
        'project.tareas.process.before.label': 'Before',
        'project.tareas.process.before.item1': 'Manual processes of 2-3 weeks',
        'project.tareas.process.before.item2': 'Design and development working in silos',
        'project.tareas.process.before.item3': 'Slow and expensive iterations',
        'project.tareas.process.after.label': 'After',
        'project.tareas.process.after.item1': 'Automation with AI in seconds',
        'project.tareas.process.after.item2': 'Real-time collaboration',
        'project.tareas.process.after.item3': 'Continuous validation with users',
        'project.tareas.process.link1': 'Learn more about this process',
        'project.tareas.process.link2': 'See final product',
        'project.tareas.cta.title': 'Interested in learning more?',
        'project.tareas.cta.text': 'Contact me to learn more details about this project.',
        'project.tareas.cta.button1': 'Write me →',
        'project.tareas.cta.button2': 'See more projects',
        
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
        
        // Project Pages - Common Labels
        'project.close': 'Cerrar',
        'project.client': 'CLIENTE',
        'project.team': 'EQUIPO',
        'project.services': 'SERVICIOS',
        'project.duration': 'DURACIÓN',
        'project.months': '8 meses',
        
        // Project Pages - Common Sections
        'project.introduction': 'Introducción del Proyecto',
        'project.context': 'Contexto',
        'project.problem': 'Problema',
        'project.objectives': 'Objetivos del Proyecto',
        'project.role': 'Mi Rol / Responsabilidades',
        'project.process': 'Proceso / Método',
        'project.results': 'Resultados / Impacto',
        'project.learnings': 'Aprendizajes',
        
        // Tareas y Planes
        'project.tareas.context': 'UBITS, líder en formación corporativa, necesitaba un producto que conectara el aprendizaje con la ejecución diaria del trabajo. Así nace Tareas y Planes, un módulo diseñado para convertirse en el centro operativo del ecosistema: uniendo cursos, asignaciones, objetivos y analítica en una sola experiencia.',
        'project.tareas.problem': 'Al no existir una herramienta de ejecución integrada, las empresas usuarias debían complementar UBITS con plataformas externas para gestionar tareas, prioridades y planes de trabajo, fragmentando la experiencia y reduciendo la adopción.',
        
        // B-Partners
        'project.bpartners.client': 'Prueba técnica',
        'project.bpartners.team': 'Individual',
        'project.bpartners.description': '<strong>Plataforma financiera que unifica banca y cripto</strong> en una sola experiencia. Diseñé desde cero la <strong>identidad visual</strong> y el <strong>producto digital</strong>, creando un ecosistema que transmite <strong>confianza, modernidad y seguridad</strong> para usuarios que buscan gestionar su dinero de forma simple y transparente.',
        'project.bpartners.user.title': 'Usuario & Comportamiento',
        'project.bpartners.user.text': 'El usuario busca una experiencia financiera digital que combine banca y cripto de forma simple, segura y sin fricción.',
        'project.bpartners.user.subtitle': 'Insights',
        'project.bpartners.user.insight1': 'Usuario digital, joven–adulto, acostumbrado a resolver su vida financiera desde el móvil.',
        'project.bpartners.user.insight2': 'Quiere simplicidad, velocidad y transparencia en cada paso.',
        'project.bpartners.user.insight3': 'Se frustra con procesos largos y confusos; valora el onboarding claro.',
        'project.bpartners.user.insight4': 'Interesado en cripto, pero necesita una guía visual y confiable.',
        'project.bpartners.user.insight5': 'Busca centralizar todo lo financiero en un solo ecosistema intuitivo.',
        'project.bpartners.product.label': 'Digital Product',
        'project.bpartners.product.title': 'Interfaz de usuario intuitiva',
        'project.bpartners.product.text': 'Desarrollé una plataforma digital con foco en usabilidad y seguridad, creando flujos claros para operaciones financieras complejas.',
        'project.bpartners.product.feature1.title': 'Dashboard intuitivo',
        'project.bpartners.product.feature1.desc': 'Información clara y accesible',
        'project.bpartners.product.feature2.title': 'Seguridad visual',
        'project.bpartners.product.feature2.desc': 'Diseño que genera confianza',
        'project.bpartners.product.feature3.title': 'Componentes modulares',
        'project.bpartners.product.feature3.desc': 'Sistema escalable y consistente',
        'project.bpartners.product.feature4.title': 'Flujos optimizados',
        'project.bpartners.product.feature4.desc': 'Experiencia de usuario fluida',
        'project.bpartners.proposal.title': 'Propuesta & Valor',
        'project.bpartners.proposal.text': 'Diseñé una experiencia financiera que integra banca y cripto en una sola plataforma, haciendo que gestionar dinero sea más simple, seguro y accesible.',
        'project.bpartners.proposal.subtitle': 'Puntos clave',
        'project.bpartners.proposal.point1': 'Unificamos banca tradicional + cripto en un solo espacio intuitivo.',
        'project.bpartners.proposal.point2': 'Diseño claro que reduce fricción y aumenta la confianza del usuario.',
        'project.bpartners.proposal.point3': 'Onboarding rápido para comenzar a usar el producto en minutos.',
        'project.bpartners.proposal.point4': 'Visuales y flujos que explican lo complejo de forma simple y accionable.',
        'project.bpartners.proposal.point5': 'Permitimos tomar decisiones financieras con mayor control y transparencia.',
        'project.bpartners.solutions.title': '¿Qué resuelve Be-Partners?',
        'project.bpartners.solution1.title': 'Unificar Banca y Cripto',
        'project.bpartners.solution1.text': 'El proyecto resuelve la fragmentación financiera al integrar en una sola plataforma todo lo que el usuario necesita: banca tradicional, manejo de dinero digital y operaciones cripto de forma simple y accesible.',
        'project.bpartners.solution2.title': 'Experiencia Digital Clara y Sin Fricción',
        'project.bpartners.solution2.text': 'Simplifica procesos financieros complejos con una interfaz limpia, navegación intuitiva y un onboarding rápido que guía al usuario sin abrumarlo, reduciendo errores y aumentando su confianza.',
        'project.bpartners.solution3.title': 'Decisiones Financieras Más Seguras',
        'project.bpartners.solution3.text': 'Ofrece transparencia visual, alertas oportunas y una presentación clara de riesgos y movimientos para que el usuario pueda tomar decisiones informadas, sin tecnicismos ni sobrecarga de información.',
        'project.bpartners.solution4.title': 'Control Total Desde el Móvil',
        'project.bpartners.solution4.text': 'Centraliza las acciones esenciales—enviar, recibir, convertir, invertir o comprar—en un flujo rápido de pocos pasos, garantizando que el usuario gestione su vida financiera diaria desde cualquier lugar.',
        'project.bpartners.prototype': 'Ver prototipo en Figma',
        
        // BLOC
        'project.bloc.tag': 'Diseño de Servicios · Colsubsidio',
        'project.bloc.subtitle': 'Bienestar Local Colsubsidio: Un modelo de atención descentralizado que acerca los servicios de la caja de compensación a las comunidades, transformando la manera en que las personas acceden a bienestar, salud y recreación.',
        'project.bloc.context.title': 'Contexto del Proyecto',
        'project.bloc.context.problem.title': 'El problema',
        'project.bloc.context.problem.text': 'Colsubsidio contaba con grandes centros de servicios concentrados en zonas específicas de Bogotá, lo que generaba barreras de acceso para comunidades alejadas. Muchos afiliados no aprovechaban sus beneficios por desconocimiento o dificultad para desplazarse.',
        'project.bloc.context.opportunity.title': 'La oportunidad',
        'project.bloc.context.opportunity.text': 'Diseñar un modelo de atención descentralizado que llevara los servicios esenciales de Colsubsidio directamente a los barrios y comunidades, creando puntos de contacto cercanos, accesibles y con una experiencia de servicio humanizada.',
        'project.bloc.services.title': 'Servicios diseñados',
        
        // Tareas y Planes - Extended (Spanish)
        'project.tareas.description': 'Un nuevo módulo concebido para convertirse en el centro operativo del ecosistema UBITS. Su objetivo es articular los demás productos de la plataforma (cursos, academias, rutas, asignaciones, analítica), mediante un sistema de seguimiento y ejecución que permitiera a los colaboradores organizar su trabajo, priorizar responsabilidades, mejorar coordinación interna y llevar registro del avance real de sus actividades.',
        'project.tareas.challenge.title': 'Reto inicial',
        'project.tareas.challenge.text': 'Crear un producto capaz de convertirse en el centro operativo diario de UBITS, integrando en un solo lugar la ejecución, seguimiento y organización del trabajo tanto de equipos administrativos (white-collar) como operativos (blue-collar). El desafío no era solo diseñar una nueva interfaz, sino replantear la estrategia completa del producto, transformándolo de un modelo tradicional B2B hacia un uso más cotidiano, transversal y orientado también al B2C.',
        'project.tareas.evolution.title': 'Evolución del producto',
        'project.tareas.evolution.intro': 'Rediseño y versionamientos a lo largo del desarrollo del producto.',
        'project.tareas.comparison.hint': '← Arrastra para comparar →',
        'project.tareas.comparison.before': 'ANTES',
        'project.tareas.comparison.after': 'DESPUÉS',
        'project.tareas.timeline.title': 'Línea de tiempo del producto',
        'project.tareas.timeline.card1.title': '8 meses de desarrollo',
        'project.tareas.timeline.card1.text': 'Se desarrollaron <strong>4 versiones</strong> del producto, impulsadas por un proceso de diseño acelerado gracias al uso de <strong>IA y prototipado directo en Cursor</strong>.',
        'project.tareas.timeline.card2.title': 'Validación en tiempo real',
        'project.tareas.timeline.card2.text': 'Tres versiones fueron testeadas con usuarios en tiempo real, permitiendo iterar con rapidez, validar decisiones y ajustar la propuesta sobre la marcha.',
        'project.tareas.timeline.card3.title': 'Lista para 2026',
        'project.tareas.timeline.card3.text': 'La cuarta versión quedó completamente diseñada y lista para implementarse en el <strong>primer trimestre de 2026</strong>, demostrando un ciclo de diseño eficiente y ágil.',
        'project.tareas.versions.title': 'Versiones',
        'project.tareas.version.v1.title': 'Funcionalidades clave',
        'project.tareas.version.v1.feature1': 'Crear, editar, priorizar y completar tareas',
        'project.tareas.version.v1.feature2': 'Agrupación inteligente en planes',
        'project.tareas.version.v1.feature3': 'Asignación 1 a 1 y seguimiento en tiempo real',
        'project.tareas.version.v1.feature4': 'Notificaciones de asignación y actualización',
        'project.tareas.version.v1.feature5': 'Planes operativos y flexibles potenciados con IA',
        'project.tareas.version.v1.usecases.title': 'Casos de uso habilitados',
        'project.tareas.version.v1.usecase1': 'Gestión de tareas individuales: organización personal, seguimiento diario y priorización',
        'project.tareas.version.v1.usecase2': 'Gestión de tareas colaborativas: coordinación entre equipos, seguimiento de responsabilidades y visibilidad del avance',
        'project.tareas.version.v1.2.title': 'Funcionalidades clave',
        'project.tareas.version.v1.2.feature1': 'Creación de planes de desarrollo individual basados en resultados de 360',
        'project.tareas.version.v1.2.feature2': 'Registro de evidencias y comentarios en cada tarea',
        'project.tareas.version.v1.2.feature3': 'Filtros avanzados para seguimiento por líderes y HR',
        'project.tareas.version.v1.2.usecases.title': 'Casos de uso habilitados',
        'project.tareas.version.v1.2.usecase1': 'Gestión de tareas desde RRHH: acompañamiento al desarrollo, seguimiento estructurado y trazabilidad de métricas de crecimiento',
        'project.tareas.version.v2.title': 'Comentarios y evidencias',
        'project.tareas.version.v2.desc': 'Sistema de trazabilidad completa con comentarios y seguimiento detallado.',
        'project.tareas.version.v2.feature1': 'Comentarios en tiempo real',
        'project.tareas.version.v2.feature2': 'Carga de evidencias',
        'project.tareas.version.v2.feature3': 'Historial de cambios',
        'project.tareas.version.v3.title': 'V1.3 — Activación operativa',
        'project.tareas.version.v3.features.title': 'Funcionalidades',
        'project.tareas.version.v3.feature1': 'Buscadores avanzados por nombre del plan y de la tarea',
        'project.tareas.version.v3.feature2': 'Embebido de tareas y planes dentro de la plataforma',
        'project.tareas.version.v3.feature3': 'CRUD completo de plantillas, permitiendo crear, editar y administrar modelos reutilizables',
        'project.tareas.version.v3.feature4': 'Carga y asignación masiva de planes, optimizando la gestión de grandes equipos',
        'project.tareas.version.v3.feature5': 'Modalidad de Plan individual o Plan para todos, que flexibiliza la ejecución según el objetivo',
        'project.tareas.version.v3.usecases.title': 'Casos de uso habilitados',
        'project.tareas.version.v3.usecase1': 'Gestión de tareas de RRHH y base para la gestión de tareas operativas a gran escala',
        'project.tareas.ai.title': '¿Qué rol juega la IA en este módulo?',
        'project.tareas.ai.card1.title': '1. Acelera la creación de planes',
        'project.tareas.ai.card1.text': 'A partir de un objetivo + contexto (texto o documento), la IA propone grupos de tareas, prioridades y secuencia. Reduce el tiempo de diseño de un plan de horas a minutos.',
        'project.tareas.ai.card2.title': '2. Genera planes listos para ejecutar',
        'project.tareas.ai.card2.text': 'La IA entrega una estructura inicial que el usuario solo debe revisar y ajustar. Útil para: Onboarding, PDIs, planes operativos y campañas.',
        'project.tareas.ai.card3.stat': 'Horas → Minutos',
        'project.tareas.ai.card3.label': 'Reducción del tiempo de diseño de un plan.',
        'project.tareas.ai.card4.title': '3. Conecta diagnóstico con acción',
        'project.tareas.ai.card4.text': 'Desde Evaluaciones 360, permite generar PDIs automáticos (5 cursos recomendados + 8–10 tareas sugeridas). Traduce brechas en acciones ejecutables.',
        'project.tareas.ai.card5.title': 'Integración con Evaluaciones 360',
        'project.tareas.ai.card5.text': 'La IA genera PDIs automáticos basados en resultados de evaluación, recomendando cursos y tareas específicas para cerrar brechas identificadas.',
        'project.tareas.process.title': 'Nuevo proceso de trabajo',
        'project.tareas.process.intro': 'Cómo cambió la cultura de diseño y colaboración.',
        'project.tareas.process.card1.title': 'Prototipado rápido',
        'project.tareas.process.card1.text': 'Uso de Cursor e IA para validaciones tempranas y ciclos de iteración más cortos.',
        'project.tareas.process.card2.title': 'Colaboración técnica',
        'project.tareas.process.card2.text': 'Trabajo directo con equipos de desarrollo, creando componentes en código.',
        'project.tareas.process.card3.title': 'Agilidad real',
        'project.tareas.process.card3.text': 'De semanas a días: reducción drástica en tiempos de entrega de diseño.',
        'project.tareas.process.before.label': 'Antes',
        'project.tareas.process.before.item1': 'Procesos manuales de 2-3 semanas',
        'project.tareas.process.before.item2': 'Diseño y desarrollo trabajando en silos',
        'project.tareas.process.before.item3': 'Iteraciones lentas y costosas',
        'project.tareas.process.after.label': 'Después',
        'project.tareas.process.after.item1': 'Automatización con IA en segundos',
        'project.tareas.process.after.item2': 'Colaboración en tiempo real',
        'project.tareas.process.after.item3': 'Validación continua con usuarios',
        'project.tareas.process.link1': 'Conoce un poco más de este proceso',
        'project.tareas.process.link2': 'Ver producto final',
        'project.tareas.cta.title': '¿Te interesa saber más?',
        'project.tareas.cta.text': 'Contáctame para conocer más detalles sobre este proyecto.',
        'project.tareas.cta.button1': 'Escríbeme →',
        'project.tareas.cta.button2': 'Ver más proyectos',
        
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

// Estado del idioma - SIEMPRE inglés por defecto
// Si no hay idioma guardado, usar inglés. Si hay uno guardado, respetarlo.
let savedLang = localStorage.getItem('language');
if (!savedLang) {
    localStorage.setItem('language', 'en');
    savedLang = 'en';
}
let currentLanguage = savedLang;

// Función para cambiar el idioma
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language "${lang}" not found, defaulting to "en"`);
        lang = 'en';
    }
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Actualizar todos los elementos con data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Applying language "${lang}" to ${elements.length} elements`);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            const translation = translations[lang][key];
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.tagName === 'IMG') {
                element.alt = translation;
            } else {
                element.innerHTML = translation;
            }
        } else if (key) {
            console.warn(`Translation key "${key}" not found for language "${lang}"`);
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
    // Obtener idioma guardado, si no hay ninguno usar inglés
    let savedLang = localStorage.getItem('language');
    if (!savedLang) {
        savedLang = 'en';
        localStorage.setItem('language', 'en');
    }
    
    console.log('Initializing language:', savedLang);
    
    // Aplicar idioma inmediatamente
    changeLanguage(savedLang);
    
    // Inicializar selector
    initLanguageSelector();
}

// Ejecutar inmediatamente cuando el script se carga
// Si el DOM ya está listo, ejecutar ahora
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
