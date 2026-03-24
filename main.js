// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 500);
});

// Mini Vanilla JavaScript - Clean Version
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.main-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollBar = document.querySelector('.scroll-bar');
    const themeToggle = document.getElementById('themeToggle');

    // Scroll handler
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 60);

        // Update active links
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });

        // Update scroll progress
        if (scrollBar) {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            scrollBar.style.width = (winScroll / height) * 100 + '%';
        }
    });

    // Mobile menu close
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.navbar-collapse');
            if (window.innerWidth < 992 && menu?.classList.contains('show')) {
                menu.classList.remove('show');
                document.querySelector('.navbar-toggler')?.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Theme toggle
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
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
// const heroButtons = document.querySelectorAll('.hero-buttons .btn');
// heroButtons.forEach(btn => {
//     btn.addEventListener('mouseenter', (e) => {
//         const x = e.pageX - btn.offsetLeft;
//         const y = e.pageY - btn.offsetTop;

//         btn.style.setProperty('--x', x + 'px');
//         btn.style.setProperty('--y', y + 'px');
//     });
// });

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         // إذا كان الكود هنا معطلاً، لن يعمل الزر
//     });
// });

// WORK CARDS ANIMATION DELAY
document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add CSS for button ripple effect
// const style = document.createElement('style');
// style.textContent = `
//     .hero-buttons .btn-primary::before {
//         content: '';
//         position: absolute;
//         top: var(--y);
//         left: var(--x);
//         transform: translate(-50%, -50%);
//         width: 0;
//         height: 0;
//         border-radius: 50%;
//         background: rgba(255, 255, 255, 0.2);
//         transition: width 0.6s, height 0.6s;
//     }

//     .hero-buttons .btn-primary:hover::before {
//         width: 300px;
//         height: 300px;
//     }
// `;
// document.head.appendChild(style);

// إضافة تأثيرات تفاعلية إضافية
document.addEventListener('DOMContentLoaded', function() {
    // تأثير البارالاكس للبطاقات
    const cards = document.querySelectorAll('.feature-box');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-box, .section-title, .section-desc').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.advanced-skills');
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    const percentTexts = document.querySelectorAll('.skill-percent');

    const animateSkills = () => {
        progressFills.forEach((fill, index) => {
            // 1. تحريك شريط التقدم
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth + '%';

            // 2. أنيميشن العداد الرقمي
            const percentText = percentTexts[index];
            let currentPercent = 0;
            const targetPercent = parseInt(targetWidth);
            const duration = 1000; // زمن الأنيميشن بالملي ثانية (2 ثانية)
            const increment = targetPercent / (duration / 16); // 16ms لكل فريم تقريباً

            const updateCount = () => {
                if (currentPercent < targetPercent) {
                    currentPercent += increment;
                    percentText.innerText = Math.ceil(currentPercent) + '%';
                    requestAnimationFrame(updateCount);
                } else {
                    percentText.innerText = targetPercent + '%';
                }
            };
            updateCount();
        });
    };

    // مراقبة الدخول إلى القسم (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target); // تشغيل الأنيميشن مرة واحدة فقط
            }
        });
    }, { threshold: 0.3 }); // يبدأ عندما يظهر 30% من القسم

    observer.observe(skillsSection);
});

