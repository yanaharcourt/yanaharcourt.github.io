/* ==================================================
   GHOST OF TSUSHIMA: JIN SAKAI WEBSITE JAVASCRIPT
   ФИНАЛЬНАЯ ИДЕАЛЬНАЯ ВЕРСИЯ С ВОССТАНОВЛЕННЫМ ПАРАЛЛАКСОМ
   ================================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Jin Sakai website...');
    
    try {
        initThemeToggle();
        console.log('✅ Theme toggle initialized');
    } catch (e) {
        console.error('❌ Theme toggle error:', e);
    }
    
    try {
        initNavigation();
        console.log('✅ Navigation initialized');
    } catch (e) {
        console.error('❌ Navigation error:', e);
    }
    
    try {
        initAnimations();
        console.log('✅ Animations initialized');
    } catch (e) {
        console.error('❌ Animations error:', e);
    }
    
    try {
        initEffects();
        console.log('✅ Effects initialized');
    } catch (e) {
        console.error('❌ Effects error:', e);
    }
    
    try {
        initPageLoad();
        debugImageLoading();
        console.log('✅ Page load initialized');
    } catch (e) {
        console.error('❌ Page load error:', e);
    }
    
    console.log('🎉 All systems initialized!');
});

/* ===============================
   THEME TOGGLE FUNCTIONALITY
   =============================== */

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    updateThemeButton(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Простое переключение без дополнительных эффектов
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });
    
    function updateThemeButton(theme) {
        if (theme === 'light') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
    }
}

/* ===============================
   NAVIGATION FUNCTIONALITY
   =============================== */

function initNavigation() {
    // Navigation between sections
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const section = dot.dataset.section;
            const targetElement = document.getElementById(section);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation dot on scroll
    window.addEventListener('scroll', throttle(updateActiveNavDot, 100));
}

function updateActiveNavDot() {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.nav-dot');
    
    let current = '';
    const scrollPosition = window.scrollY + 300; // Offset for better UX
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === current) {
            dot.classList.add('active');
        }
    });
}

/* ===============================
   ANIMATION SYSTEM
   =============================== */

function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger any specific animations for this element
                triggerElementAnimation(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function triggerElementAnimation(element) {
    // Animate progress bars when they come into view
    if (element.classList.contains('ui-progress')) {
        animateProgressBar(element);
    }
    
    // Add floating animation to UI elements
    if (element.classList.contains('floating-ui')) {
        element.style.animation = 'float 6s ease-in-out infinite';
    }
}

function animateProgressBar(progressBar) {
    const targetWidth = progressBar.style.width;
    progressBar.style.width = '0%';
    
    setTimeout(() => {
        progressBar.style.transition = 'width 2s ease-out';
        progressBar.style.width = targetWidth;
    }, 200);
}

/* ===============================
   VISUAL EFFECTS
   =============================== */

function initEffects() {
    initParallaxEffect();
    initSakuraPetals();
    initInteractiveKatana();
    initAncientScroll();
    initParticleSystem();
    initMouseFollowEffect();
}

/* ===============================
   INTERACTIVE KATANA SYSTEM
   =============================== */

/* function initInteractiveKatana() {
    const katana = document.getElementById('interactiveKatana');
    const heroSection = document.getElementById('hero');
    
    if (!katana || !heroSection) return;
    
    let isVisible = false;
    
    // Show katana when mouse enters hero section
    heroSection.addEventListener('mouseenter', () => {
        katana.classList.add('visible');
        isVisible = true;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        katana.classList.remove('visible');
        isVisible = false;
    });
    
    // Katana follows mouse with smooth animation
    heroSection.addEventListener('mousemove', (e) => {
        if (!isVisible) return;
        
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate angle based on mouse movement
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        
        // Position katana exactly at cursor
        katana.style.left = x + 'px';
        katana.style.top = y + 'px';
        katana.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        
        // Change katana color based on scroll position
        const scrollProgress = window.scrollY / window.innerHeight;
        if (scrollProgress > 0.3) {
            katana.classList.add('blood-mode');
        } else {
            katana.classList.remove('blood-mode');
        }
    });
} */

    function initInteractiveKatana() {
    const enso = document.getElementById('interactiveKatana');
    const heroSection = document.getElementById('hero');
    
    if (!enso || !heroSection) return;
    
    let isVisible = false;
    let lastMoveTime = 0;
    let moveTimeout;
    
    // Show enso when mouse enters hero section
    heroSection.addEventListener('mouseenter', () => {
        enso.classList.add('visible');
        isVisible = true;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        enso.classList.remove('visible');
        enso.classList.remove('moving');
        isVisible = false;
    });
    
    // Enso follows mouse with smooth animation
    heroSection.addEventListener('mousemove', (e) => {
        if (!isVisible) return;
        
        // Используем глобальные координаты вместо относительных
        const x = e.clientX; 
        const y = e.clientY;
        
        // Position enso exactly at cursor
        enso.style.left = (x - 20) + 'px'; 
        enso.style.top = (y - 20) + 'px';
        
        // Add moving class for rotation
        enso.classList.add('moving');
        clearTimeout(moveTimeout);
        
        // Remove moving class after stop
        moveTimeout = setTimeout(() => {
            enso.classList.remove('moving');
        }, 200);
        
        // Change color based on scroll position (Ghost mode)
        const scrollProgress = window.scrollY / window.innerHeight;
        if (scrollProgress > 0.3) {
            enso.classList.add('blood-mode');
        } else {
            enso.classList.remove('blood-mode');
        }
        
        // Create smoke trail effect
        createSmokeTrail(x, y);
    });
    
    // Create trailing smoke particles
    function createSmokeTrail(x, y) {
        const now = Date.now();
        if (now - lastMoveTime < 50) return; // Throttle trail creation
        lastMoveTime = now;
        
        const trail = document.createElement('div');
        trail.className = 'enso-trail-particle';
        trail.style.cssText = `
            position: fixed; 
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 140;
            animation: fadeTrail 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        // Remove particle after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }
}

// Add CSS animation for trail particles
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes fadeTrail {
        0% { 
            opacity: 0.4; 
            transform: scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: scale(2); 
        }
    }
`;
document.head.appendChild(trailStyle);

/* ===============================
   ANCIENT SCROLL SYSTEM
   =============================== */

function initAncientScroll() {
    const scroll = document.getElementById('ancientScroll');
    const scrollText = document.getElementById('scrollText');
    
    if (!scroll || !scrollText) return;
    
    const scrollMessages = [
        "侍の道\n(Way of the Samurai)",
        "名誉ある戦士\n(Honorable Warrior)", 
        "影の技\n(Shadow Techniques)",
        "復讐の炎\n(Flames of Revenge)",
        "幽霊の誕生\n(Birth of Ghost)"
    ];
    
    let currentMessage = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const messageIndex = Math.floor(scrollProgress * scrollMessages.length);
        
        // Show scroll when user starts scrolling
        if (window.scrollY > 100) {
            scroll.classList.add('visible');
        } else {
            scroll.classList.remove('visible');
        }
        
        // Update message based on scroll position
        if (messageIndex !== currentMessage && messageIndex < scrollMessages.length) {
            currentMessage = messageIndex;
            updateScrollMessage(scrollMessages[messageIndex]);
        }
    }, 100));
    
    function updateScrollMessage(message) {
        if (!message) return; // Защита от undefined
        
        scrollText.classList.remove('visible');
        setTimeout(() => {
            const formattedMessage = message.toString().replace('\n', '<br>');
            scrollText.innerHTML = formattedMessage;
            scrollText.classList.add('visible');
        }, 300);
    }
}

/* ===============================
   PARTICLE SYSTEM
   =============================== */

function initParticleSystem() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(), i * 200);
    }
    
    // Create particles periodically
    setInterval(createParticle, 800);
}

function createParticle() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particle = document.createElement('div');
    const isEmber = Math.random() > 0.7;
    
    particle.className = isEmber ? 'particle ember' : 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '0px';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 5000);
}

/* ===============================
   ВОССТАНОВЛЕННЫЙ PARALLAX EFFECT
   =============================== */

function initParallaxEffect() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const scrollProgress = scrolled / window.innerHeight;
        
        // Get all parallax images
        const mountains = document.querySelector('.layer-mountains');
        const mist = document.querySelector('.layer-mist');
        const treesBack = document.querySelectorAll('[class*="layer-trees-back"]');
        const treesMid = document.querySelectorAll('[class*="layer-trees-mid"]');
        const treesFront = document.querySelectorAll('[class*="layer-trees-front"]');
        
        // Mountains parallax - БЕЗ ИЗМЕНЕНИЯ OPACITY
        if (mountains) {
            mountains.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
            // Убираем изменение opacity
        }
        
        // Mist parallax - БЕЗ ИЗМЕНЕНИЯ OPACITY
        if (mist) {
            const baseTransform = `translateX(-50%) translateY(${scrolled * 0.4}px)`;
            mist.style.transform = baseTransform;
            // Убираем изменение opacity
        }
        
        // Trees back layer - БЕЗ ИЗМЕНЕНИЯ OPACITY
        treesBack.forEach((tree, index) => {
            tree.style.transform = `translateY(${scrolled * (0.15 + index * 0.02)}px)`;
            // Убираем изменение opacity
        });
        
        // Trees mid layer - БЕЗ ИЗМЕНЕНИЯ OPACITY
        treesMid.forEach((tree, index) => {
            tree.style.transform = `translateY(${scrolled * (0.25 + index * 0.02)}px)`;
            // Убираем изменение opacity
        });
        
        // Trees front layer - БЕЗ ИЗМЕНЕНИЯ OPACITY
        treesFront.forEach((tree, index) => {
            tree.style.transform = `translateY(${scrolled * (0.35 + index * 0.02)}px)`;
            // Убираем изменение opacity
        });
        
        // Japanese characters parallax with rotation - БЕЗ ИЗМЕНЕНИЯ OPACITY
        const japaneseChars = document.querySelectorAll('.japanese-text');
        japaneseChars.forEach((char, index) => {
            const speed = 0.08 + (index * 0.03);
            const rotation = scrolled * 0.01 * (index + 1);
            char.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
            // Убираем изменение opacity
        });
        
        // Character image subtle movement
        const characterImg = document.querySelector('.character-img');
        if (characterImg) {
            characterImg.style.transform = `translateY(${scrolled * -0.05}px)`;
        }
        
        // Floating UI elements parallax
        const floatingUIs = document.querySelectorAll('.floating-ui');
        floatingUIs.forEach((ui, index) => {
            const speed = 0.03 + (index * 0.01);
            const baseTransform = ui.style.transform.replace(/translateY\([^)]*\)/g, '');
            ui.style.transform = baseTransform + ` translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

/* ===============================
   SAKURA PETALS
   =============================== */

function initSakuraPetals() {
    // Create additional dynamic ginkgo leaves
    const sakuraContainer = document.querySelector('.sakura-container');
    
    if (sakuraContainer) {
        // Create new ginkgo leaves periodically
        setInterval(createGinkgoLeaf, 4000);
        
        // Create initial burst of leaves
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createGinkgoLeaf(), i * 1500);
        }
    }
}

function createGinkgoLeaf() {
    const sakuraContainer = document.querySelector('.sakura-container');
    if (!sakuraContainer) return;
    
    const leaf = document.createElement('div');
    leaf.className = 'sakura-petal';
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDuration = (Math.random() * 6 + 8) + 's'; // 8-14 seconds
    leaf.style.animationDelay = Math.random() * 2 + 's';
    leaf.style.opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0 opacity
    
    sakuraContainer.appendChild(leaf);
    
    // Remove leaf after animation completes
    setTimeout(() => {
        if (leaf.parentNode) {
            leaf.parentNode.removeChild(leaf);
        }
    }, 16000);
}

/* ===============================
   MOUSE FOLLOW EFFECT
   =============================== */

function initMouseFollowEffect() {
    // Subtle mouse follow effect for floating UI elements
    document.addEventListener('mousemove', throttle((e) => {
        const floatingElements = document.querySelectorAll('.floating-ui');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.02 + (index * 0.01);
            const x = (e.clientX * speed) - (window.innerWidth * speed / 2);
            const y = (e.clientY * speed) - (window.innerHeight * speed / 2);
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, 16));
}

/* ===============================
   PAGE LOADING & PERFORMANCE
   =============================== */

function initPageLoad() {
    // Smooth page loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger hero section animations
        setTimeout(() => {
            triggerHeroAnimations();
        }, 500);
    });
}

function triggerHeroAnimations() {
    // Animate character stats with stagger effect
    const statItems = document.querySelectorAll('.hero-stats .stat-item');
    statItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 200);
    });
    
    // Animate floating UI elements
    const uiElements = document.querySelectorAll('.floating-ui');
    uiElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 1000 + (index * 300));
    });
}

function debugImageLoading() {
    const mountainImg = document.querySelector('.layer-mountains');
    const mistImg = document.querySelector('.layer-mist');
    
    if (mountainImg) {
        mountainImg.onload = () => console.log('✅ Mountain image loaded successfully');
        mountainImg.onerror = () => console.log('❌ Mountain image failed to load');
        console.log('Mountain img element found:', mountainImg.src);
    }
    
    if (mistImg) {
        mistImg.onload = () => console.log('✅ Mist image loaded successfully');
        mistImg.onerror = () => console.log('❌ Mist image failed to load');
        console.log('Mist img element found:', mistImg.src);
    }
}

/* ===============================
   UTILITY FUNCTIONS
   =============================== */

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for input events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Smooth scroll to element with offset
function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

/* ===============================
   KEYBOARD NAVIGATION
   =============================== */

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    const sections = ['hero', 'fall', 'ghost', 'techniques', 'legend'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    switch(e.key) {
        case 'ArrowDown':
        case 'j':
            e.preventDefault();
            if (currentIndex < sections.length - 1) {
                scrollToElement(sections[currentIndex + 1]);
            }
            break;
            
        case 'ArrowUp':
        case 'k':
            e.preventDefault();
            if (currentIndex > 0) {
                scrollToElement(sections[currentIndex - 1]);
            }
            break;
            
        case 'Home':
            e.preventDefault();
            scrollToElement('hero');
            break;
            
        case 'End':
            e.preventDefault();
            scrollToElement('legend');
            break;
            
        case 't':
            e.preventDefault();
            document.getElementById('themeToggle').click();
            break;
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 300;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            return section.getAttribute('id');
        }
    }
    return 'hero';
}

/* ===============================
   ACCESSIBILITY ENHANCEMENTS
   =============================== */

// Add focus indicators for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Reduce animations for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable complex animations
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        .sakura-petal {
            display: none;
        }
    `;
    document.head.appendChild(style);
}

/* ===============================
   ERROR HANDLING
   =============================== */

// Global error handler
window.addEventListener('error', (e) => {
    if (e.error) {
        console.error('Site error:', e.error.message, e.error.stack);
    } else {
        console.error('Site error: Unknown error');
    }
    // Prevent error from breaking the rest of the script
    return true;
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Handle missing images gracefully
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder or hide
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

/* ===============================
   PERFORMANCE MONITORING
   =============================== */

// Simple performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 0);
    });
}