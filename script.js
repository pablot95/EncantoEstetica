document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const aboutSection = document.getElementById('about');

    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (aboutSection) {
            const aboutTop = aboutSection.offsetTop;
            navbar.classList.toggle('visible', scrollY > 0);
            navbar.classList.toggle('scrolled', scrollY > aboutTop + 60);
        }
        
        backToTop.classList.toggle('visible', scrollY > 500);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number[data-target]');
                counters.forEach(counter => animateCounter(counter));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) counterObserver.observe(statsSection);

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const courseDate = new Date('2026-03-05T09:00:00-03:00');

    function updateCountdown() {
        const now = new Date();
        const diff = courseDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(198, 167, 94, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 8 + 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, -40px) scale(1.2);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(${Math.random() > 0.5 ? '' : '-'}20px, -80px) scale(0.8);
                    opacity: 0.2;
                }
                75% {
                    transform: translate(${Math.random() > 0.5 ? '' : '-'}40px, -40px) scale(1.1);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroScrollIndicator = document.querySelector('.hero-scroll');
        const heroParticles = document.querySelector('.hero-particles');
        
        if (hero && heroContent) {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.65}px`;
                
                const moveDown = scrolled * 1;
                
                const fadeStart = heroHeight * 0.3;
                const fadeEnd = heroHeight * 0.8;
                let opacity = 1;
                
                if (scrolled > fadeStart) {
                    opacity = 1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart));
                    opacity = Math.max(0, Math.min(1, opacity));
                }
                
                heroContent.style.transform = `translateY(${moveDown}px)`;
                heroContent.style.opacity = opacity;
                
                if (heroScrollIndicator) {
                    heroScrollIndicator.style.transform = `translateX(-50%) translateY(${moveDown}px)`;
                    heroScrollIndicator.style.opacity = opacity;
                }
                
                if (heroParticles) {
                    heroParticles.style.opacity = opacity * 0.8;
                }
            }
        }
    }, { passive: true });

});
