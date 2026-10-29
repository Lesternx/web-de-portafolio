// --- CONFIGURACIÓN Y SELECTORES ---
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('.contact-form');
const typingElement = document.querySelector('.typing');

// --- MODO OSCURO / CLARO ---
// Cargar preferencia guardada
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
}

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// --- MENÚ MÓVIL ---
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (mejor UX en móviles)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- SCROLL SUAVE ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- EFECTO TYPING DINÁMICO ---
const phrases = ["Desarrollador Web", "Diseñador UI/UX", "Apasionado por el Código"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.innerHTML = `Hola, soy <span class="highlight">${currentPhrase.substring(0, charIndex - 1)}</span>`;
        charIndex--;
        typeSpeed = 75;
    } else {
        typingElement.innerHTML = `Hola, soy <span class="highlight">${currentPhrase.substring(0, charIndex + 1)}</span>`;
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa al terminar la frase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Iniciar efecto typing (esto requiere quitar la animación CSS del .typing en estilo.css si quieres que sea 100% JS)
// typeEffect();

// --- ANIMACIONES AL HACER SCROLL (Intersection Observer) ---
const revealElements = document.querySelectorAll('.section, .skill-card, .project-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    revealObserver.observe(el);
});

// --- VALIDACIÓN FORMULARIO DE CONTACTO ---
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;

        // Simulación de envío
        btn.innerText = "Enviando...";
        btn.disabled = true;

        setTimeout(() => {
            alert("¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.");
            btn.innerText = originalText;
            btn.disabled = false;
            contactForm.reset();
        }, 1500);
    });
}
