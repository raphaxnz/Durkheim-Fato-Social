const navbar    = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.menu('scrolled', window.scrollY > 40);
    updateActiveLink();
});

navMenu.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navAs    = navLinks.querySelectorAll('a');
    let current    = '';

    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top <= 90) current = sec.id;
    });

    navAs.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
}


const textEls = document.querySelectorAll('.text');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.influence-fill').forEach(bar => {
        bar.style.width = (bar.dataset.width || 0) + '%';
        });
        observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

textEls.forEach(el => observer.observe(el));


window.addEventListener('load', () => {
    document.querySelectorAll('.influence-fill').forEach(bar => {
    const parenttext = bar.closest('.text');
    if (!parenttext || parenttext.classList.contains('visible')) {
        bar.style.width = (bar.dataset.width || 0) + '%';
    }
    });
});

document.querySelectorAll('.banner-name, .banner-name-bold, .banner-dates, .banner-photo').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .7s ease ${i * 0.15}s, transform .7s ease ${i * 0.15}s`;
    requestAnimationFrame(() => {
        setTimeout(() => {
        el.style.opacity = '';
        el.style.transform = '';
        }, 50);
    });
});