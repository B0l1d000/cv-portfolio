// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Trigger typing effect only when terminal is in view
                if(entry.target.id === 'letter' && !window.typingStarted) {
                    window.typingStarted = true;
                    typeTerminalText();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach((el) => observer.observe(el));
});

// Terminal Typing Effect for Cover Letter
const coverLetterText = `Iniciando protocolo de presentación...
[CARGANDO] Perfil del candidato: Sergio Rico González... OK.
[CARGANDO] Historial de infraestructuras críticas... OK.

Estimado equipo,

Como Técnico de Soporte N2 con más de 8 años en la trinchera del IT, mi objetivo es asegurar que los sistemas nunca fallen cuando más se necesitan. 

He asegurado la continuidad operativa en banca y sector retail gestionando incidencias críticas de Nivel 2, administrando Windows Server y manteniendo la orquestación en VMware.

No solo resuelvo problemas, los documento y prevengo. Mi vocación es el aprendizaje continuo de nuevas tecnologías; prueba de ello es mi certificación actual en docencia y mi inmersión total actual en la experimentación con herramientas emergentes de Inteligencia Artificial (IA) para optimizar flujos de trabajo IT.

Estoy preparado para integrar estas innovaciones en su red de sistemas y aportar valor desde el primer ping.

> Esperando respuesta del host..._`;

function typeTerminalText() {
    const terminalBody = document.getElementById('terminal-content');
    if (!terminalBody) return;
    
    terminalBody.innerHTML = '';
    
    // Convert newlines to <br> to format correctly but type out characters one by one
    let i = 0;
    
    // Add the cursor element
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    
    const textNode = document.createElement('span');
    terminalBody.appendChild(textNode);
    terminalBody.appendChild(cursor);

    function typeChar() {
        if (i < coverLetterText.length) {
            if (coverLetterText.charAt(i) === '\n') {
                textNode.appendChild(document.createElement('br'));
            } else {
                textNode.appendChild(document.createTextNode(coverLetterText.charAt(i)));
            }
            i++;
            // Randomize typing speed for realism (10ms to 40ms)
            const speed = Math.random() * 30 + 10;
            setTimeout(typeChar, speed);
        }
    }
    
    setTimeout(typeChar, 800); // Initial delay
}

// Add simple parallax effect to hover states on glass panels
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Mobile navigation toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItemsMobile = document.querySelectorAll('.nav-item');
const menuIcon = mobileMenu ? mobileMenu.querySelector('i') : null;

if (mobileMenu && menuIcon) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking an item
    navItemsMobile.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });
}
