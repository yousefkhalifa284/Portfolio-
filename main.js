// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 500);
});

// NAVBAR SCROLL EFFECT
const navbar = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ACTIVE NAV LINKS ON SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 150) current = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// SMOOTH CLOSE NAV ON MOBILE
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector(".navbar-collapse");
        if (window.innerWidth < 992) menu.classList.remove("show");
    });
});

// FADE-IN ANIMATION
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll(".feature-box, .service-box, .work-card, .contact-box, .testimonial-card")
.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
});

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
    
    // Update loader theme
    document.querySelector('.loader-wrapper').classList.toggle('dark-mode');
});

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// HERO BUTTONS HOVER EFFECT
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
heroButtons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const x = e.pageX - btn.offsetLeft;
        const y = e.pageY - btn.offsetTop;
        
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
    });
});

// WORK CARDS ANIMATION DELAY
document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add CSS for button ripple effect
const style = document.createElement('style');
style.textContent = `
    .hero-buttons .btn-primary::before {
        content: '';
        position: absolute;
        top: var(--y);
        left: var(--x);
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transition: width 0.6s, height 0.6s;
    }
    
    .hero-buttons .btn-primary:hover::before {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(style);