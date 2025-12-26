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
const body = document.body;

if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Cerrar menú al hacer click en un link
    const navLinksItems = document.querySelectorAll('.nav__links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

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
        
        // Habiitemos
        'project.habiitemos.description': '<strong>App designed to simplify the search for shared housing</strong>, connecting users with compatible roommates through clear profiles, intelligent filters and an intuitive experience. The project transforms an informal and disorganized process into a <strong>safe, guided and fast solution</strong> for young people, students and professionals who need to find a space and a suitable life partner.',
        'project.habiitemos.client': 'Freelance concept test',
        'project.habiitemos.team': 'Individual',
        'project.habiitemos.purpose.title': 'Purpose to solve',
        'project.habiitemos.purpose.text': 'Users need a reliable, fast and clear way to find shared housing and compatible roommates, avoiding informal searches and disorganized processes.',
        'project.habiitemos.purpose.insight1': 'Young people, students or professionals in housing transition.',
        'project.habiitemos.purpose.insight2': 'They value security, clarity in profiles and compatibility.',
        'project.habiitemos.purpose.insight3': 'They use mobile apps as the main search tool.',
        'project.habiitemos.purpose.insight4': 'They feel frustrated by incomplete or unreliable information.',
        'project.habiitemos.behavior.desc': 'The user seeks a space where they can filter options, understand if a roommate is compatible and contact easily, all from a clear and frictionless experience.',
        'project.habiitemos.behavior.card1': 'Wants to see real compatibility in lifestyle, schedules and habits.',
        'project.habiitemos.behavior.card2': 'Needs to compare options quickly.',
        'project.habiitemos.behavior.card3': 'Prefers short processes and functions that do not require a learning curve.',
        'project.habiitemos.behavior.card4': 'Seeks to make safe decisions without depending on informal groups or social networks.',
        'project.habiitemos.process.title': 'Design Process',
        'project.habiitemos.process.step1.title': 'Context',
        'project.habiitemos.process.step1.desc': 'I explored how people search for shared housing, identifying common frustrations, real needs and relevant compatibility criteria. This allowed defining a clear user: young people and professionals seeking a safer and more reliable process.',
        'project.habiitemos.process.step2.title': 'Problem Definition',
        'project.habiitemos.process.step2.desc': 'From the findings, the main challenge was framed: roommate search is disorganized, manual and unreliable. Pain points, user objectives and key opportunities for a digital solution were structured.',
        'project.habiitemos.process.step3.title': 'Product Architecture & Flow',
        'project.habiitemos.process.step3.desc': 'User flows and functional structure were created: guided onboarding, profile exploration, intelligent filters, compatibility matching and direct contact. The logic focused on reducing friction and showing the essential first.',
        'project.habiitemos.process.step4.title': 'UI/UX Design',
        'project.habiitemos.process.step4.desc': 'A clean, accessible and clear interface was developed, focused on transparency and ease of use. Screens highlighted key information about profiles, habits and housing to support quick and safe decisions.',
        'project.habiitemos.process.step5.title': 'Validation & Adjustments',
        'project.habiitemos.process.step5.desc': 'Flows and screens were tested with users to verify clarity, ease and confidence. Findings allowed adjusting content, simplifying steps and reinforcing the feeling of security during the search.',
        
        // Bre-B
        'project.breb.description': '<strong>Bre-B</strong> is Colombia\'s immediate payment system, an initiative of the <strong>Banco de la República</strong> that allows instant 24/7 transfers between different financial entities. I designed the experience for <strong>Banco de Bogotá</strong>, ensuring intuitive flows for payment key registration and use.',
        'project.breb.client': 'Banco de Bogotá',
        'project.breb.team': 'Transfers Squad',
        'project.breb.services': 'UX/UI Design, Research',
        'project.breb.context.title': 'Project Context',
        'project.breb.context.year1': '2023',
        'project.breb.context.year1.title': 'Regulation start',
        'project.breb.context.year1.text': 'The Banco de la República regulates the interoperability of immediate payments (Law 2294, art. 104) and sits with financial entities to develop the model.',
        'project.breb.context.year2': '2024',
        'project.breb.context.year2.title': 'Experience construction',
        'project.breb.context.year2.text': 'Guidelines are published for the construction of sending flows and key self-management. In August, the immediate payment system brand is born: <strong>Bre-B</strong>.',
        'project.breb.context.year3': '2025',
        'project.breb.context.year3.title': 'Operation start',
        'project.breb.context.year3.text': 'The system will operate in September 2025 for person-to-person transactions. Use cases for companies are still being defined.',
        'project.breb.role.title': 'My Role & Responsibilities',
        'project.breb.role.text': 'I participated as a designer on the Channels team, in charge of the Payments and Transfers section, contributing to the design and validation of the experience for Bre-B implementation.',
        'project.breb.role.collab': '👥 This work was done in collaboration with the entire bank\'s channels team: PMs, Developers and UX Designers.',
        'project.breb.role.item1.title': 'Interaction Design',
        'project.breb.role.item1.text': 'I designed end-to-end flows for the system\'s key processes, such as registration, editing and deletion of payment keys. This included mapping scenarios, system states, exceptions and critical decision points to ensure a smooth and secure experience.',
        'project.breb.role.item2.title': 'UI Design',
        'project.breb.role.item2.text': 'I built interfaces based on the bank\'s design system, ensuring consistency, accessibility and scalability. I worked with reusable components and visual patterns that will allow product expansion in future versions.',
        'project.breb.role.item3.title': 'User validation',
        'project.breb.role.item3.text': 'I planned and coordinated usability tests with real users, analyzing behaviors, friction points and improvement opportunities. From these findings, I iterated solutions to optimize the experience and increase system understanding.',
        'project.breb.role.item4.title': 'Documentation',
        'project.breb.role.item4.text': 'I developed exhaustive documentation for development teams and stakeholders, including style guides, functional specifications, interaction mappings and recommendations for national adoption of the immediate payment model.',
        'project.breb.objectives.title': 'Project Objectives',
        'project.breb.objective1.title': 'Mass adoption',
        'project.breb.objective1.text': 'Achieve 60% of active users registering at least one payment key in the first 6 months.',
        'project.breb.objective2.title': 'Smooth experience',
        'project.breb.objective2.text': 'Reduce key registration time to less than 2 minutes without assistance.',
        'project.breb.objective3.title': 'Perceived security',
        'project.breb.objective3.text': 'Maintain user trust with clear authentication and confirmation flows.',
        'project.breb.process.title': 'Design Process',
        'project.breb.process.text1': 'I actively participated in the initial phase of the project, focusing on understanding the problem, defining requirements and generating the first design proposals.',
        'project.breb.process.text2': 'Subsequently, the final design was developed in co-creation with the design teams of the four banks of Grupo Aval, ensuring visual coherence, functional consistency and a unified experience across the entire ecosystem.',
        'project.breb.process.text3': 'For this reason, the resulting designs are the product of collaborative and shared work among all entities in the group.',
        'project.breb.process.learnings': 'Learnings',
        'project.breb.process.learning1': '<strong>About the process:</strong> Working on a national-scale project requires exhaustive documentation and constant alignment with multiple stakeholders. Clear communication is as important as the design itself.',
        'project.breb.process.learning2': '<strong>About users:</strong> In digital banking, trust is built step by step. Every micro-interaction counts to convey security and professionalism.',
        'project.breb.process.learning3': '<strong>What I would improve:</strong> Involve development teams earlier to identify technical constraints that affect the final experience.',
        'project.breb.team.title': 'Design Team',
        'project.breb.team.subtitle': 'Banco de Bogotá',
        'project.breb.notes.title': 'Process notes',
        'project.breb.results.adoption': 'Adoption in 6 months',
        'project.breb.results.time': 'Average registration time',
        'project.breb.results.satisfaction': 'User satisfaction',
        'project.breb.results.keys': 'Keys registered',
        
        // Habiitemos - Extended
        'project.habiitemos.value.text': 'A clear, safe and compatibility-focused experience to find shared housing. The app transforms an informal and chaotic process into an intuitive solution with verified profiles, intelligent filters and a guided flow that facilitates quick and reliable decisions.',
        'project.habiitemos.value.point1': 'Verified profiles with relevant and transparent information.',
        'project.habiitemos.value.point2': 'Intelligent filters based on lifestyle and habits.',
        'project.habiitemos.value.point3': 'Matching system that prioritizes real compatibility.',
        'project.habiitemos.value.point4': 'Intuitive flow that reduces friction and speeds up the search.',
        'project.habiitemos.value.point5': 'Experience centered on security and informed decisions.',
        'project.habiitemos.data.title': 'Did you know...?',
        'project.habiitemos.data.subtitle': 'Data on shared housing in Colombia · Reference 2022',
        'project.habiitemos.data.card1': 'Are willing to share housing with <strong>maximum 2 roommates</strong>.',
        'project.habiitemos.data.card2': 'Prefer them to be from their <strong>friends</strong> circle.',
        'project.habiitemos.data.card3': 'Would like to meet their roommates <strong>in person</strong> before moving in.',
        'project.habiitemos.data.card4': 'Would like to be <strong>advised during</strong> their search process.',
        
        // Metodologías IA
        'project.metodologias.tag': 'CASE STUDY · UBITS',
        'project.metodologias.title': 'New Work<br>Methodologies',
        'project.metodologias.subtitle': 'How AI transformed the way we worked on the Tasks and Plans project',
        'project.metodologias.client': 'UBITS',
        'project.metodologias.role': 'Product Designer',
        'project.metodologias.team': 'PM, Design, UX, Dev',
        'project.metodologias.duration': '8 months',
        'project.metodologias.intro.title': 'This was not just a UI design project',
        'project.metodologias.intro.text': 'It was a <strong>complete redesign of how we work as a team</strong>. We integrated AI into the daily work of PM, design and research, transforming linear processes into collaborative and agile cycles.',
        'project.metodologias.problema.tag': 'THE PROBLEM',
        'project.metodologias.problema.title': 'How did we work before?',
        'project.metodologias.problema.card1.title': 'Silos between areas',
        'project.metodologias.problema.card1.text': 'Each one in their stage. PM defined, design executed, UX validated at the end.',
        'project.metodologias.problema.card2.title': 'Linear processes',
        'project.metodologias.problema.card2.text': 'Many handoffs, little iteration. From idea to prototype: weeks.',
        'project.metodologias.problema.card3.title': 'Manual documentation',
        'project.metodologias.problema.card3.text': 'Hours of work on specs and flows. Time that was not used to think.',
        'project.metodologias.quote': '"We needed a methodology that would allow us to think, decide and execute faster as a team, using AI as the central muscle of the process."',
        'project.metodologias.solucion.tag': 'THE SOLUTION',
        'project.metodologias.solucion.title': 'AI as the team\'s "third brain"',
        'project.metodologias.solucion.intro': 'The deepest change was not using AI as a tool, but integrating it as another member of the team.',
        'project.metodologias.solucion.pillar1.title': 'Expanded thinking',
        'project.metodologias.solucion.pillar1.text': 'We explore more alternatives in less time. From "A or B" to "A, B, C, D, E and combinations".',
        'project.metodologias.solucion.pillar2.title': 'Accelerated execution',
        'project.metodologias.solucion.pillar2.text': 'From idea to functional prototype in hours. Real code, not just mockups.',
        'project.metodologias.solucion.pillar3.title': 'Amplified collaboration',
        'project.metodologias.solucion.pillar3.text': 'PM, design and dev on the same material. One version, built together.',
        'project.metodologias.metodologia.tag': 'THE METHODOLOGY',
        'project.metodologias.metodologia.title': '4 stages of the new flow',
        'project.metodologias.paso1.title': 'Discovery with AI',
        'project.metodologias.paso1.antes': 'BEFORE',
        'project.metodologias.paso1.antes.text': 'Long meetings to align. Extensive documents that no one read.',
        'project.metodologias.paso1.ahora': 'NOW',
        'project.metodologias.paso1.ahora.text': 'AI synthesizes context, generates key questions and creates alignment documents in minutes.',
        'project.metodologias.paso1.highlight': '<strong>💡 AI use:</strong> We convert loose discussions into clear and prioritized user stories.',
        'project.metodologias.paso2.title': 'Real-time co-creation',
        'project.metodologias.paso2.antes': 'BEFORE',
        'project.metodologias.paso2.antes.text': 'Each area in its stage. Silos and strong dependencies.',
        'project.metodologias.paso2.ahora': 'NOW',
        'project.metodologias.paso2.ahora.text': 'Joint sessions where we build in real time. Decisions in the moment.',
        'project.metodologias.paso2.highlight': '<strong>💡 AI use:</strong> AI works as "third brain" in sessions. We prototype ideas live.',
        'project.metodologias.paso3.title': 'Accelerated prototyping',
        'project.metodologias.paso3.antes': 'BEFORE',
        'project.metodologias.paso3.antes.text': 'From idea to prototype: weeks. Many internal iterations.',
        'project.metodologias.paso3.ahora': 'NOW',
        'project.metodologias.paso3.ahora.text': 'From idea to functional prototype: hours. Cursor for real code.',
        'project.metodologias.paso3.highlight': '<strong>💡 AI use:</strong> Interactive prototypes with real code. We reduce distance between "idea" and "validation".',
        'project.metodologias.paso4.title': 'Intelligent documentation',
        'project.metodologias.paso4.antes': 'BEFORE',
        'project.metodologias.paso4.antes.text': 'Documenting took as long as designing. Manual and tedious work.',
        'project.metodologias.paso4.ahora': 'NOW',
        'project.metodologias.paso4.ahora.text': 'We automate documentation. We free up time to think about the problem.',
        'project.metodologias.paso4.highlight': '<strong>💡 AI use:</strong> AI generates technical specs, edge cases and documentation while we iterate the design.',
        'project.metodologias.impacto.tag': 'IMPACT',
        'project.metodologias.impacto.title': 'The numbers speak',
        'project.metodologias.impacto.metric1.label': 'Planning time',
        'project.metodologias.impacto.metric2.label': 'Documentation time',
        'project.metodologias.impacto.metric3.label': 'More iterations per sprint',
        'project.metodologias.impacto.metric4.label': 'Instead of 1 week to align',
        'project.metodologias.resultados.tag': 'RESULTS',
        'project.metodologias.resultados.title': 'What did we achieve?',
        'project.metodologias.resultado1.title': 'Real collaboration',
        'project.metodologias.resultado1.text': 'The team went from working in silos to co-creating in real time.',
        'project.metodologias.resultado2.title': 'Shorter cycles',
        'project.metodologias.resultado2.text': 'More iterations, better final quality, less wasted time.',
        'project.metodologias.resultado3.title': 'Better product',
        'project.metodologias.resultado3.text': 'Tasks and Plans launched with speed and validated quality.',
        'project.metodologias.resultado4.title': 'Replicable methodology',
        'project.metodologias.resultado4.text': 'It is now the standard for new projects at UBITS.',
        'project.metodologias.referencias.title': 'Learn more about this process',
        'project.metodologias.referencias.youtube.title': 'DesignOps Latam Podcast',
        'project.metodologias.referencias.youtube.desc': 'Ep. 89 - AI and product design',
        'project.metodologias.referencias.article.title': 'UX Collective Article',
        'project.metodologias.referencias.article.desc': 'The AI concept that changed our way of working',
        'project.metodologias.cta.text': 'Want to see the product we built with this methodology?',
        'project.metodologias.cta.button': 'See Tasks and Plans project →',
        'project.metodologias.nav.back': '← Back to projects',
        'project.metodologias.nav.next': 'See Tasks and Plans →',
        
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
        
        // Habiitemos
        'project.habiitemos.description': '<strong>App diseñada para simplificar la búsqueda de vivienda compartida</strong>, conectando a usuarios con roommates compatibles a través de perfiles claros, filtros inteligentes y una experiencia intuitiva. El proyecto transforma un proceso informal y desordenado en una <strong>solución segura, guiada y rápida</strong> para jóvenes, estudiantes y profesionales que necesitan encontrar un espacio y un compañero de vida adecuado.',
        'project.habiitemos.client': 'Freelance prueba de concepto',
        'project.habiitemos.team': 'Individual',
        'project.habiitemos.purpose.title': 'Propósito a resolver',
        'project.habiitemos.purpose.text': 'Los usuarios necesitan una manera confiable, rápida y clara de encontrar vivienda compartida y roommates compatibles, evitando búsquedas informales y procesos desordenados.',
        'project.habiitemos.purpose.insight1': 'Jóvenes, estudiantes o profesionales en transición de vivienda.',
        'project.habiitemos.purpose.insight2': 'Valoran seguridad, claridad en perfiles y compatibilidad.',
        'project.habiitemos.purpose.insight3': 'Usan apps móviles como principal herramienta de búsqueda.',
        'project.habiitemos.purpose.insight4': 'Se sienten frustrados por información incompleta o poco confiable.',
        'project.habiitemos.behavior.desc': 'El usuario busca un espacio donde pueda filtrar opciones, entender si un roomie es compatible y contactar fácilmente, todo desde una experiencia clara y sin fricción.',
        'project.habiitemos.behavior.card1': 'Quiere ver compatibilidad real en estilo de vida, horarios y hábitos.',
        'project.habiitemos.behavior.card2': 'Necesita comparar opciones rápidamente.',
        'project.habiitemos.behavior.card3': 'Prefiere procesos cortos y funciones que no requieran curva de aprendizaje.',
        'project.habiitemos.behavior.card4': 'Busca tomar decisiones seguras sin depender de grupos informales o redes sociales.',
        'project.habiitemos.process.title': 'Proceso de Diseño',
        'project.habiitemos.process.step1.title': 'Contexto',
        'project.habiitemos.process.step1.desc': 'Exploré cómo las personas buscan vivienda compartida, identificando frustraciones comunes, necesidades reales y criterios de compatibilidad relevantes. Esto permitió definir un usuario claro: jóvenes y profesionales que buscan un proceso más seguro y confiable.',
        'project.habiitemos.process.step2.title': 'Definición del Problema',
        'project.habiitemos.process.step2.desc': 'A partir de los hallazgos, se enmarcó el reto principal: la búsqueda de roomies es desordenada, manual y poco confiable. Se estructuraron pain points, objetivos del usuario y oportunidades clave para una solución digital.',
        'project.habiitemos.process.step3.title': 'Arquitectura & Flujo del Producto',
        'project.habiitemos.process.step3.desc': 'Se crearon los user flows y la estructura funcional: onboarding guiado, exploración de perfiles, filtros inteligentes, match por compatibilidad y contacto directo. La lógica se centró en reducir fricción y mostrar lo esencial primero.',
        'project.habiitemos.process.step4.title': 'Diseño UI/UX',
        'project.habiitemos.process.step4.desc': 'Se desarrolló una interfaz limpia, accesible y clara, enfocada en transparencia y facilidad de uso. Las pantallas destacaron información clave de perfiles, hábitos y vivienda para apoyar decisiones rápidas y seguras.',
        'project.habiitemos.process.step5.title': 'Validación & Ajustes',
        'project.habiitemos.process.step5.desc': 'Se probaron los flujos y pantallas con usuarios para verificar claridad, facilidad y confianza. Los hallazgos permitieron ajustar el contenido, simplificar pasos y reforzar la sensación de seguridad durante la búsqueda.',
        
        // Bre-B
        'project.breb.description': '<strong>Bre-B</strong> es el sistema de pagos inmediatos de Colombia, una iniciativa del <strong>Banco de la República</strong> que permite transferencias instantáneas 24/7 entre diferentes entidades financieras. Diseñé la experiencia para el <strong>Banco de Bogotá</strong>, asegurando flujos intuitivos para el registro y uso de llaves de pago.',
        'project.breb.client': 'Banco de Bogotá',
        'project.breb.team': 'Squad Transferencias',
        'project.breb.services': 'UX/UI Design, Research',
        'project.breb.context.title': 'Contexto del Proyecto',
        'project.breb.context.year1': '2023',
        'project.breb.context.year1.title': 'Inicio de la regulación',
        'project.breb.context.year1.text': 'El Banco de la República regula la interoperabilidad de los pagos inmediatos (Ley 2294, art. 104) y se sienta con las entidades financieras para desarrollar el modelo.',
        'project.breb.context.year2': '2024',
        'project.breb.context.year2.title': 'Construcción de la experiencia',
        'project.breb.context.year2.text': 'Se publican los lineamientos para la construcción de los flujos de envío y autogestión de llave. En agosto nace la marca del sistema de pagos inmediatos: <strong>Bre-B</strong>.',
        'project.breb.context.year3': '2025',
        'project.breb.context.year3.title': 'Inicio de la operación',
        'project.breb.context.year3.text': 'El sistema operará en septiembre del 2025 para transacciones entre personas. Los casos de uso para empresas aún están en definición.',
        'project.breb.role.title': 'Mi Rol & Responsabilidades',
        'project.breb.role.text': 'Participé como diseñadora del equipo de Canales, encargado de la sección de Pagos y Transferencias, contribuyendo al diseño y validación de la experiencia para la implementación de Bre-B.',
        'project.breb.role.collab': '👥 Este trabajo se realizó en colaboración con todo el equipo de canales del banco: PMs, Desarrolladores y UX Designers.',
        'project.breb.role.item1.title': 'Diseño de Interacción',
        'project.breb.role.item1.text': 'Diseñé flujos end-to-end para los procesos clave del sistema, como registro, edición y eliminación de llaves de pago. Esto incluyó mapear escenarios, estados del sistema, excepciones y puntos críticos de decisión para asegurar una experiencia fluida y segura.',
        'project.breb.role.item2.title': 'UI Design',
        'project.breb.role.item2.text': 'Construí las interfaces basadas en el design system del banco, asegurando consistencia, accesibilidad y escalabilidad. Trabajé con componentes reutilizables y patrones visuales que permitirán la expansión del producto en futuras versiones.',
        'project.breb.role.item3.title': 'Validación con usuarios',
        'project.breb.role.item3.text': 'Planifiqué y coordiné pruebas de usabilidad con usuarios reales, analizando comportamientos, puntos de fricción y oportunidades de mejora. A partir de estos hallazgos, iteré las soluciones para optimizar la experiencia y aumentar la comprensión del sistema.',
        'project.breb.role.item4.title': 'Documentación',
        'project.breb.role.item4.text': 'Elaboré documentación exhaustiva para equipos de desarrollo y stakeholders, incluyendo guías de estilo, especificaciones funcionales, mapeos de interacción y recomendaciones para la adopción nacional del modelo de pagos inmediatos.',
        'project.breb.objectives.title': 'Objetivos del Proyecto',
        'project.breb.objective1.title': 'Adopción masiva',
        'project.breb.objective1.text': 'Lograr que el 60% de usuarios activos registren al menos una llave de pago en los primeros 6 meses.',
        'project.breb.objective2.title': 'Experiencia fluida',
        'project.breb.objective2.text': 'Reducir el tiempo de registro de llave a menos de 2 minutos sin asistencia.',
        'project.breb.objective3.title': 'Seguridad percibida',
        'project.breb.objective3.text': 'Mantener la confianza del usuario con flujos claros de autenticación y confirmación.',
        'project.breb.process.title': 'Proceso de Diseño',
        'project.breb.process.text1': 'Participé activamente en la fase inicial del proyecto, enfocándome en el entendimiento del problema, la definición de requerimientos y la generación de las primeras propuestas de diseño.',
        'project.breb.process.text2': 'Posteriormente, el diseño final fue desarrollado en cocreación con los equipos de diseño de los cuatro bancos del Grupo Aval, asegurando coherencia visual, consistencia funcional y una experiencia unificada en todo el ecosistema.',
        'project.breb.process.text3': 'Por esta razón, los diseños resultantes son el producto de un trabajo colaborativo y compartido entre todas las entidades del grupo.',
        'project.breb.process.learnings': 'Aprendizajes',
        'project.breb.process.learning1': '<strong>Sobre el proceso:</strong> Trabajar en un proyecto de escala nacional requiere documentación exhaustiva y alineación constante con múltiples stakeholders. La comunicación clara es tan importante como el diseño mismo.',
        'project.breb.process.learning2': '<strong>Sobre los usuarios:</strong> En banca digital, la confianza se construye paso a paso. Cada microinteracción cuenta para transmitir seguridad y profesionalismo.',
        'project.breb.process.learning3': '<strong>Qué mejoraría:</strong> Involucrar más temprano a los equipos de desarrollo para identificar restricciones técnicas que afectan la experiencia final.',
        'project.breb.team.title': 'Equipo de Diseño',
        'project.breb.team.subtitle': 'Banco de Bogotá',
        'project.breb.notes.title': 'Notas del proceso',
        'project.breb.results.adoption': 'Adopción en 6 meses',
        'project.breb.results.time': 'Tiempo promedio de registro',
        'project.breb.results.satisfaction': 'Satisfacción de usuario',
        'project.breb.results.keys': 'Llaves registradas',
        
        // Habiitemos - Extended (Spanish)
        'project.habiitemos.value.text': 'Una experiencia clara, segura y centrada en la compatibilidad para encontrar vivienda compartida. La app transforma un proceso informal y caótico en una solución intuitiva con perfiles verificados, filtros inteligentes y un flujo guiado que facilita decisiones rápidas y confiables.',
        'project.habiitemos.value.point1': 'Perfiles verificados con información relevante y transparente.',
        'project.habiitemos.value.point2': 'Filtros inteligentes según estilo de vida y hábitos.',
        'project.habiitemos.value.point3': 'Matching system que prioriza la compatibilidad real.',
        'project.habiitemos.value.point4': 'Flujo intuitivo que reduce fricción y agiliza la búsqueda.',
        'project.habiitemos.value.point5': 'Experiencia centrada en seguridad y decisiones informadas.',
        'project.habiitemos.data.title': '¿Sabías que...?',
        'project.habiitemos.data.subtitle': 'Datos sobre vivienda compartida en Colombia · Referencia 2022',
        'project.habiitemos.data.card1': 'Están dispuestos a compartir vivienda con <strong>máximo 2 roomies</strong>.',
        'project.habiitemos.data.card2': 'Prefieren que sean de su círculo de <strong>amigos</strong>.',
        'project.habiitemos.data.card3': 'Desearía conocer de forma <strong>presencial</strong> a sus roomies antes de mudarse.',
        'project.habiitemos.data.card4': 'Le gustaría ser <strong>asesorado durante</strong> su proceso de búsqueda.',
        
        // Metodologías IA (Spanish)
        'project.metodologias.tag': 'CASO DE ESTUDIO · UBITS',
        'project.metodologias.title': 'Nuevas Metodologías<br>de Trabajo',
        'project.metodologias.subtitle': 'Cómo la IA transformó la forma de trabajar en el proyecto de Tareas y Planes',
        'project.metodologias.client': 'UBITS',
        'project.metodologias.role': 'Product Designer',
        'project.metodologias.team': 'PM, Diseño, UX, Dev',
        'project.metodologias.duration': '8 meses',
        'project.metodologias.intro.title': 'Este no fue solo un proyecto de diseño de UI',
        'project.metodologias.intro.text': 'Fue un <strong>rediseño completo de cómo trabajamos como equipo</strong>. Integramos IA en el día a día de PM, diseño y research, transformando procesos lineales en ciclos colaborativos y ágiles.',
        'project.metodologias.problema.tag': 'EL PROBLEMA',
        'project.metodologias.problema.title': '¿Cómo era trabajar antes?',
        'project.metodologias.problema.card1.title': 'Silos entre áreas',
        'project.metodologias.problema.card1.text': 'Cada quien en su etapa. PM definía, diseño ejecutaba, UX validaba al final.',
        'project.metodologias.problema.card2.title': 'Procesos lineales',
        'project.metodologias.problema.card2.text': 'Muchos handoffs, poca iteración. De la idea al prototipo: semanas.',
        'project.metodologias.problema.card3.title': 'Documentación manual',
        'project.metodologias.problema.card3.text': 'Horas de trabajo en specs y flujos. Tiempo que no se usaba para pensar.',
        'project.metodologias.quote': '"Necesitábamos una metodología que nos permitiera pensar, decidir y ejecutar más rápido como equipo, usando la IA como músculo central del proceso."',
        'project.metodologias.solucion.tag': 'LA SOLUCIÓN',
        'project.metodologias.solucion.title': 'La IA como "tercer cerebro" del equipo',
        'project.metodologias.solucion.intro': 'El cambio más profundo no fue usar IA como herramienta, sino integrarla como un miembro más del equipo.',
        'project.metodologias.solucion.pillar1.title': 'Pensamiento expandido',
        'project.metodologias.solucion.pillar1.text': 'Exploramos más alternativas en menos tiempo. De "A o B" a "A, B, C, D, E y combinaciones".',
        'project.metodologias.solucion.pillar2.title': 'Ejecución acelerada',
        'project.metodologias.solucion.pillar2.text': 'De la idea al prototipo funcional en horas. Código real, no solo mockups.',
        'project.metodologias.solucion.pillar3.title': 'Colaboración amplificada',
        'project.metodologias.solucion.pillar3.text': 'PM, diseño y dev sobre el mismo material. Una sola versión, construida juntos.',
        'project.metodologias.metodologia.tag': 'LA METODOLOGÍA',
        'project.metodologias.metodologia.title': '4 etapas del nuevo flujo',
        'project.metodologias.paso1.title': 'Descubrimiento con IA',
        'project.metodologias.paso1.antes': 'ANTES',
        'project.metodologias.paso1.antes.text': 'Reuniones largas para alinear. Documentos extensos que nadie leía.',
        'project.metodologias.paso1.ahora': 'AHORA',
        'project.metodologias.paso1.ahora.text': 'IA sintetiza contexto, genera preguntas clave y crea documentos de alineación en minutos.',
        'project.metodologias.paso1.highlight': '<strong>💡 Uso de IA:</strong> Convertimos discusiones sueltas en user stories claras y priorizadas.',
        'project.metodologias.paso2.title': 'Co-creación en tiempo real',
        'project.metodologias.paso2.antes': 'ANTES',
        'project.metodologias.paso2.antes.text': 'Cada área en su etapa. Silos y dependencias fuertes.',
        'project.metodologias.paso2.ahora': 'AHORA',
        'project.metodologias.paso2.ahora.text': 'Sesiones conjuntas donde construimos en tiempo real. Decisiones en el momento.',
        'project.metodologias.paso2.highlight': '<strong>💡 Uso de IA:</strong> La IA funciona como "tercer cerebro" en las sesiones. Prototipamos ideas en vivo.',
        'project.metodologias.paso3.title': 'Prototipado acelerado',
        'project.metodologias.paso3.antes': 'ANTES',
        'project.metodologias.paso3.antes.text': 'De la idea al prototipo: semanas. Muchas iteraciones internas.',
        'project.metodologias.paso3.ahora': 'AHORA',
        'project.metodologias.paso3.ahora.text': 'De la idea al prototipo funcional: horas. Cursor para código real.',
        'project.metodologias.paso3.highlight': '<strong>💡 Uso de IA:</strong> Prototipos interactivos con código real. Reducimos distancia entre "idea" y "validación".',
        'project.metodologias.paso4.title': 'Documentación inteligente',
        'project.metodologias.paso4.antes': 'ANTES',
        'project.metodologias.paso4.antes.text': 'Documentar tomaba tanto tiempo como diseñar. Trabajo manual y tedioso.',
        'project.metodologias.paso4.ahora': 'AHORA',
        'project.metodologias.paso4.ahora.text': 'Automatizamos documentación. Liberamos tiempo para pensar en el problema.',
        'project.metodologias.paso4.highlight': '<strong>💡 Uso de IA:</strong> IA genera specs técnicas, edge cases y documentación mientras iteramos el diseño.',
        'project.metodologias.impacto.tag': 'IMPACTO',
        'project.metodologias.impacto.title': 'Los números hablan',
        'project.metodologias.impacto.metric1.label': 'Tiempo de planeación',
        'project.metodologias.impacto.metric2.label': 'Tiempo en documentación',
        'project.metodologias.impacto.metric3.label': 'Más iteraciones por sprint',
        'project.metodologias.impacto.metric4.label': 'En vez de 1 semana para alinear',
        'project.metodologias.resultados.tag': 'RESULTADOS',
        'project.metodologias.resultados.title': '¿Qué logramos?',
        'project.metodologias.resultado1.title': 'Colaboración real',
        'project.metodologias.resultado1.text': 'El equipo pasó de trabajar en silos a co-crear en tiempo real.',
        'project.metodologias.resultado2.title': 'Ciclos más cortos',
        'project.metodologias.resultado2.text': 'Más iteraciones, mejor calidad final, menos tiempo perdido.',
        'project.metodologias.resultado3.title': 'Mejor producto',
        'project.metodologias.resultado3.text': 'Tareas y Planes se lanzó con velocidad y calidad validada.',
        'project.metodologias.resultado4.title': 'Metodología replicable',
        'project.metodologias.resultado4.text': 'Ahora es el estándar para nuevos proyectos en UBITS.',
        'project.metodologias.referencias.title': 'Conoce más sobre este proceso',
        'project.metodologias.referencias.youtube.title': 'Podcast DesignOps Latam',
        'project.metodologias.referencias.youtube.desc': 'Ep. 89 - IA y diseño de producto',
        'project.metodologias.referencias.article.title': 'Artículo UX Collective',
        'project.metodologias.referencias.article.desc': 'The AI concept that changed our way of working',
        'project.metodologias.cta.text': '¿Quieres ver el producto que construimos con esta metodología?',
        'project.metodologias.cta.button': 'Ver proyecto Tareas y Planes →',
        'project.metodologias.nav.back': '← Volver a proyectos',
        'project.metodologias.nav.next': 'Ver Tareas y Planes →',
        
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
