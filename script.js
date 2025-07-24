
// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixContainer = document.getElementById('matrix');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    
    matrixContainer.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const text = 'Junior IT Administrator';
    typingText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Animated counters for stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.skill-category, .contact-item, .stat-card, .code-block');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Terminal typing effect
function initTerminalTyping() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'fadeInUp 0.5s ease forwards';
        }, index * 500);
    });
}

// Cursor blink effect
function initCursorBlink() {
    const cursors = document.querySelectorAll('.cursor-blink');
    
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
}

// Glitch effect trigger
function initGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement) {
        setInterval(() => {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = 'glitch 3s infinite';
            }, 100);
        }, 10000);
    }
}

// Mobile menu toggle (for future use)
function initMobileMenu() {
    // This can be expanded later if you want to add a hamburger menu
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if screen is mobile
    if (window.innerWidth <= 768) {
        // Add mobile-specific functionality here
        console.log('Mobile view detected');
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
    initSmoothScrolling();
    initTypingAnimation();
    initCounters();
    initScrollAnimations();
    initNavbarScroll();
    initTerminalTyping();
    initCursorBlink();
    initGlitchEffect();
    initMobileMenu();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize mobile menu if needed
    initMobileMenu();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Add keyboard shortcuts if needed
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // Focus on search or navigation
        const firstNavLink = document.querySelector('.nav-link');
        if (firstNavLink) firstNavLink.focus();
    }
});

// Performance optimization: Lazy loading for images (for future use)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Console easter egg
console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Witaj w konsoli Norberta Trytka!                   ║
║                                                           ║
║   💼 Junior IT Administrator                              ║
║   📧 notr@mail.com                                       ║
║                                                           ║
║   🛠️  Ta strona została stworzona z:                     ║
║   • HTML5 & CSS3                                         ║
║   • Vanilla JavaScript                                   ║
║   • Miłością do kodu ❤️                                  ║
║                                                           ║
║   Szukasz developera? Skontaktuj się ze mną!            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);
