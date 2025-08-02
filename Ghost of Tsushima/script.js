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
    updateHeroImage(currentTheme); 
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
        updateHeroImage(newTheme); 
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
HERO IMAGE THEME SWITCHING
=============================== */

function updateHeroImage(theme) {
    const heroImage = document.querySelector('.character-img');
    if (!heroImage) return;
    
    if (theme === 'light') {
        heroImage.src = 'img/Jin-white.png';
        heroImage.alt = 'Jin Sakai - Light Theme';
    } else {
        heroImage.src = 'img/Jin.png';
        heroImage.alt = 'Jin Sakai - Dark Theme';
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
    
    // Определяем пары секций: [разделительная, контентная]
    const sectionPairs = {
        'fall': 'fall',           // fall активирует nav-dot fall
        'photo-story': 'fall',    // photo-story тоже активирует nav-dot fall
        'survivor': 'survivor',   // и так далее...
        'survivor-content': 'survivor',
        'oath': 'oath',
        'oath-content': 'oath',
        'betrayal': 'betrayal',
        'betrayal-content': 'betrayal',
        'ghost': 'ghost',
        'ghost-content': 'ghost',
        'allies': 'allies',
        'allies-content': 'allies',
        'whispers': 'whispers',
        'whispers-content': 'whispers',
        'price': 'price',
        'price-content': 'price',
        'duel': 'duel',
        'duel-content': 'duel',
        'legend': 'legend',
        'legend-content': 'legend'
    };
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            // Используем маппинг для определения какой nav-dot активировать
            current = sectionPairs[sectionId] || sectionId;
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
CURSOR
=============================== */

/* function initInteractiveKatana() {
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
document.head.appendChild(trailStyle); */

function initCustomCursor() {
    let mouseX = 0;
    let mouseY = 0;
    
    // Отслеживаем движение мыши
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Оба курсора двигаются вместе - БЕЗ ЗАДЕРЖКИ
        document.documentElement.style.setProperty('--cursor-x', mouseX + 'px');
        document.documentElement.style.setProperty('--cursor-y', mouseY + 'px');
        document.documentElement.style.setProperty('--cursor-small-x', mouseX + 'px');
        document.documentElement.style.setProperty('--cursor-small-y', mouseY + 'px');
    });
    
    // Эффекты при клике
    document.addEventListener('mousedown', () => {
        document.body.classList.add('cursor-clicking');
    });
    
    document.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-clicking');
    });
    
    // Скрываем курсор при покидании окна
    document.addEventListener('mouseleave', () => {
        document.body.classList.add('cursor-hidden');
    });
    
    document.addEventListener('mouseenter', () => {
        document.body.classList.remove('cursor-hidden');
    });
}

// Добавляем CSS переменные для позиции курсора
const cursorStyles = `
    body::after {
        left: var(--cursor-x, 0px);
        top: var(--cursor-y, 0px);
        transition: none !important; /* убираем плавность */
    }
    
    body::before {
        left: var(--cursor-small-x, 0px);
        top: var(--cursor-small-y, 0px);
        transition: none !important; /* убираем плавность */
    }
    
    .cursor-clicking body::after {
        transform: translate(-50%, -50%) scale(0.8);
    }
    
    .cursor-hidden body::after,
    .cursor-hidden body::before {
        opacity: 0;
    }
    
    /* Увеличение курсора на кнопках */
    button:hover ~ body::after,
    .nav-dot:hover ~ body::after,
    .theme-toggle:hover ~ body::after {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: var(--accent-red);
    }
`;

// Добавляем стили
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

// Инициализируем после загрузки страницы
document.addEventListener('DOMContentLoaded', initCustomCursor);

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
PARALLAX EFFECT
=============================== */

/* function initParallaxEffect() {
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
} */

function initParallaxEffect() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const scrollProgress = scrolled / window.innerHeight;
        
        // ПАРАЛЛАКС ДЛЯ ОБЛАКОВ
        const mist = document.querySelector('.layer-mist');
        if (mist) {
            const baseTransform = `translateX(-50%) translateY(${scrolled * 0.4}px)`;
            mist.style.transform = baseTransform;
            // НЕ МЕНЯЕМ OPACITY - пусть остается как есть
        }
        
        // ДЕРЕВЬЯ 
        const treesBack = document.querySelectorAll('[class*="layer-trees-back"]');
        const treesMid = document.querySelectorAll('[class*="layer-trees-mid"]');
        const treesFront = document.querySelectorAll('[class*="layer-trees-front"]');
        
        // Trees back layer
        treesBack.forEach((tree, index) => {
            if (tree) {
                tree.style.transform = `translateY(${scrolled * (0.15 + index * 0.02)}px)`;
            }
        });
        
        // Trees mid layer
        treesMid.forEach((tree, index) => {
            if (tree) {
                tree.style.transform = `translateY(${scrolled * (0.25 + index * 0.02)}px)`;
            }
        });
        
        // Trees front layer
        treesFront.forEach((tree, index) => {
            if (tree) {
                tree.style.transform = `translateY(${scrolled * (0.35 + index * 0.02)}px)`;
            }
        });
        
        // Japanese characters parallax with rotation
        const japaneseChars = document.querySelectorAll('.japanese-text');
        japaneseChars.forEach((char, index) => {
            const speed = 0.08 + (index * 0.03);
            const rotation = scrolled * 0.01 * (index + 1);
            char.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
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
    const sections = ['hero', 'fall', 'survivor', 'oath', 'betrayal', 'ghost', 'allies', 'whispers', 'price', 'duel', 'legend'];
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


/* ===============================
SECTION 2: THE FALL - transition screen
=============================== */

function initFallAnimation() {
    const fallSection = document.getElementById('fall');
    const titleContainer = document.querySelector('.fall-title-container');
    const englishTitle = document.querySelector('.fall-english-title');
    
    if (!fallSection || !titleContainer) return;
    
    let hasScattered = false;
    let scatterTimeout;
    let resetTimeout;
    let isAnimating = false; // Предотвращаем множественные анимации
    
    function createPetalsFromElement(element) {
        const rect = element.getBoundingClientRect();
        const petalCount = 10 + Math.random() * 8;
        
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal-particle';
            
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;
            
            petal.style.left = startX + 'px';
            petal.style.top = startY + 'px';
            
            const windAnimations = ['petalFlyWind1', 'petalFlyWind2', 'petalFlyWind3'];
            const smoothAnimations = ['petalFlySmooth1', 'petalFlySmooth2', 'petalFlySmooth3'];
            
            const useWind = Math.random() > 0.3;
            const animationSet = useWind ? windAnimations : smoothAnimations;
            const randomAnimation = animationSet[Math.floor(Math.random() * animationSet.length)];
            
            const duration = 2.2 + Math.random() * 0.6;
            const delay = Math.random() * 0.3;
            
            petal.style.animation = `${randomAnimation} ${duration}s ease-out ${delay}s forwards`;
            
            const petalColors = [
                'linear-gradient(45deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)',
                'linear-gradient(45deg, #f9f9f9 0%, #e8e8e8 50%, #ddd 100%)',
                'linear-gradient(45deg, #fff 0%, #f5f5f5 50%, #eee 100%)',
                'linear-gradient(45deg, #fafafa 0%, #f0f0f0 50%, #e5e5e5 100%)'
            ];
            petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
            
            const scale = 0.7 + Math.random() * 0.6;
            petal.style.transform = `scale(${scale})`;
            
            document.body.appendChild(petal);
            
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, 3500);
        }
    }
    
    function createPetalsFromLines() {
        const rect = englishTitle.getBoundingClientRect();
        
        for (let line = 0; line < 2; line++) {
            const yPos = line === 0 ? rect.top - 15 : rect.bottom + 15;
            
            for (let i = 0; i < 15; i++) {
                const petal = document.createElement('div');
                petal.className = 'petal-particle';
                
                const startX = rect.left + (rect.width / 15) * i + Math.random() * 12;
                const startY = yPos + Math.random() * 4 - 2;
                
                petal.style.left = startX + 'px';
                petal.style.top = startY + 'px';
                
                const windAnimations = ['petalFlyWind1', 'petalFlyWind2', 'petalFlyWind3'];
                const randomAnimation = windAnimations[Math.floor(Math.random() * windAnimations.length)];
                
                const duration = 2.4 + Math.random() * 0.4;
                const delay = Math.random() * 0.4;
                
                petal.style.animation = `${randomAnimation} ${duration}s ease-out ${delay}s forwards`;
                
                const scale = 0.6 + Math.random() * 0.4;
                petal.style.transform = `scale(${scale})`;
                
                document.body.appendChild(petal);
                
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.parentNode.removeChild(petal);
                    }
                }, 3500);
            }
        }
    }
    
    function scatterTitle() {
        if (hasScattered || isAnimating) return;
        
        isAnimating = true;
        hasScattered = true;
        
        // Отменяем любой pending reset
        if (resetTimeout) {
            clearTimeout(resetTimeout);
            resetTimeout = null;
        }
        
        console.log('🌸 Title scattering...');
        
        scatterTimeout = setTimeout(() => {
            const japaneseChars = document.querySelectorAll('.japanese-char');
            japaneseChars.forEach((char, index) => {
                setTimeout(() => {
                    createPetalsFromElement(char);
                    char.classList.add('scatter');
                }, index * 250);
            });
            
            setTimeout(() => {
                createPetalsFromLines();
                englishTitle.classList.add('scatter');
            }, 500);
            
            const letters = document.querySelectorAll('.fall-letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    createPetalsFromElement(letter);
                    letter.classList.add('scatter');
                }, 800 + index * 60);
            });
            
            setTimeout(() => {
                titleContainer.style.opacity = '0';
                titleContainer.style.transition = 'opacity 0.6s ease';
                
                // Разрешаем новые анимации через некоторое время
                setTimeout(() => {
                    isAnimating = false;
                }, 1000);
            }, 2800);
        }, 1500);
    }
    
    function resetTitle() {
        if (!hasScattered || isAnimating) return;
        
        isAnimating = true;
        
        console.log('🔄 Resetting title...');
        
        // Останавливаем текущую анимацию рассыпания
        if (scatterTimeout) {
            clearTimeout(scatterTimeout);
            scatterTimeout = null;
        }
        
        // Плавно показываем контейнер сначала
        titleContainer.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        titleContainer.style.opacity = '1';
        
        // Затем восстанавливаем элементы с задержкой
        setTimeout(() => {
            // Убираем классы рассыпания с плавной анимацией
            const japaneseChars = document.querySelectorAll('.japanese-char');
            const letters = document.querySelectorAll('.fall-letter');
            
            // Восстанавливаем японские символы
            japaneseChars.forEach((char, index) => {
                setTimeout(() => {
                    char.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    char.classList.remove('scatter');
                }, index * 100);
            });
            
            // Восстанавливаем английский заголовок
            setTimeout(() => {
                englishTitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                englishTitle.classList.remove('scatter');
                
                // Восстанавливаем буквы
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        letter.classList.remove('scatter');
                    }, index * 50);
                });
            }, 300);
            
            // Убираем лепестки с плавным исчезновением
            const petals = document.querySelectorAll('.petal-particle');
            petals.forEach((petal, index) => {
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        petal.style.opacity = '0';
                        petal.style.transform += ' scale(0)';
                        
                        setTimeout(() => {
                            if (petal.parentNode) {
                                petal.parentNode.removeChild(petal);
                            }
                        }, 500);
                    }
                }, index * 20);
            });
            
            // Сбрасываем флаги
            setTimeout(() => {
                hasScattered = false;
                isAnimating = false;
            }, 1200);
            
        }, 200);
    }
    
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const fallSectionTop = fallSection.offsetTop;
        const fallSectionBottom = fallSectionTop + fallSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Зоны с гистерезисом (разные пороги для входа и выхода)
        const scatterThreshold = fallSectionTop - windowHeight * 0.3; // Когда начинаем рассыпание
        const resetThresholdUp = fallSectionTop - windowHeight * 0.7; // Когда сбрасываем при подъеме
        const resetThresholdDown = fallSectionBottom - windowHeight * 0.3; // Когда сбрасываем при спуске
        
        // Логика рассыпания
        if (scrolled >= scatterThreshold && scrolled <= resetThresholdDown && !hasScattered) {
            // Отменяем любой pending reset
            if (resetTimeout) {
                clearTimeout(resetTimeout);
                resetTimeout = null;
            }
            scatterTitle();
        }
        // Логика сброса - с задержкой для предотвращения мигания
        else if ((scrolled < resetThresholdUp || scrolled > resetThresholdDown) && hasScattered) {
            // Добавляем небольшую задержку перед сбросом
            if (resetTimeout) {
                clearTimeout(resetTimeout);
            }
            
            resetTimeout = setTimeout(() => {
                resetTitle();
                resetTimeout = null;
            }, 300); // 300ms задержка предотвращает мигание при небольших движениях
        }
    }
    
    // Добавляем обработчик клика для отладки
    titleContainer.addEventListener('click', () => {
        console.log('🖱️ Title clicked');
        if (!hasScattered && !isAnimating) {
            scatterTitle();
        } else if (hasScattered && !isAnimating) {
            resetTitle();
        }
    });
    
    // Оптимизированный обработчик скролла
    let scrollTicking = false;
    
    function optimizedScrollHandler() {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                handleScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Проверяем состояние при загрузке
    setTimeout(handleScroll, 500);
    
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', () => {
        setTimeout(handleScroll, 100);
    });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', initFallAnimation);

// Дополнительная проверка для случаев, когда DOM уже загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFallAnimation);
} else {
    initFallAnimation();
}

// Добавляем стили для плавных переходов
const fallAnimationStyles = document.createElement('style');
fallAnimationStyles.textContent = `
    .japanese-char,
    .fall-letter {
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .fall-english-title {
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .fall-title-container {
        transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;
document.head.appendChild(fallAnimationStyles);

/* ===============================
SECTION 2-2: THE FALL
=============================== */
function initPhotoStory() {
    const photoSection = document.getElementById('photo-story');
    const images = document.querySelectorAll('.story-image');
    const titles = document.querySelectorAll('.story-title');
    const textGroups = document.querySelectorAll('.text-group');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!photoSection) return;
    
    /* ===============================
    Z-INDEX
    =============================== */
    const fixStyles = document.createElement('style');
    fixStyles.textContent = `
        .photo-story-section {
            position: relative !important;
            z-index: 8 !important;
        }
        .story-images { z-index: 1 !important; }
        .story-titles { z-index: 2 !important; }
        .story-texts { z-index: 3 !important; }
        .scroll-progress { z-index: 4 !important; }
        .visible-petal { z-index: 15 !important; }
    `;
    document.head.appendChild(fixStyles);
    
    /* ===============================
    КОНФИГУРАЦИЯ СЦЕН
    =============================== */
    const scenes = [
        {
            id: 'mongol',
            image: document.getElementById('story-mongol'),
            title: document.getElementById('title-mongol'),
            textGroup: document.querySelector('[data-scene="mongol"]'),
            texts: document.querySelectorAll('[data-scene="mongol"] .story-text')
        }
    ];

    let currentScene = -1;
    let currentText = -1;
    let isActive = false;

    /* ===============================
    МАЛЕНЬКИЕ ЛЕПЕСТКИ СОЗДАЮТ КОНТЕНТ 
    =============================== */
    function createVisiblePetalsFormingContent() {
        const scene = scenes[currentScene];
        if (!scene) return;
        
        const imageRect = scene.image.getBoundingClientRect();
        const titleRect = scene.title.getBoundingClientRect();
        const textRect = scene.textGroup.getBoundingClientRect();
        
        scene.image.style.opacity = '0';
        scene.title.style.opacity = '0';
        scene.textGroup.style.opacity = '0';
        scene.image.style.visibility = 'hidden';
        scene.title.style.visibility = 'hidden';
        scene.textGroup.style.visibility = 'hidden';
        
        scene.image.classList.add('visible');
        scene.title.classList.add('visible');
        scene.textGroup.classList.add('visible');
        
        const totalPetals = 150; 
        let formedPetals = 0;
        
        // Создаем маленькие лепестки
        for (let i = 0; i < totalPetals; i++) {
            setTimeout(() => {
                let targetRect, elementType;
                if (i < 75) { // 50% для фото
                    targetRect = imageRect;
                    elementType = 'image';
                } else if (i < 112) { 
                    targetRect = titleRect;
                    elementType = 'title';
                } else { 
                    targetRect = textRect;
                    elementType = 'text';
                }
                
                createSmallPetal(targetRect, elementType, () => {
                    formedPetals++;
                    const progress = formedPetals / totalPetals;
                    
                    // Элементы становятся видимыми только после 20% прогресса
                    if (progress > 0.2) {
                        scene.image.style.visibility = 'visible';
                        scene.title.style.visibility = 'visible';
                        scene.textGroup.style.visibility = 'visible';
                        
                        const opacity = (progress - 0.2) * 1.25; // Плавное появление
                        scene.image.style.opacity = Math.min(1, opacity);
                        scene.title.style.opacity = Math.min(1, opacity);
                        scene.textGroup.style.opacity = Math.min(1, opacity);
                    }
                });
            }, i * 15); // Быстрее интервал
        }
    }

    /* ===============================
    СОЗДАНИЕ МАЛЕНЬКОГО ЛЕПЕСТКА БЕЗ МИГАНИЯ
    =============================== */
    function createSmallPetal(targetRect, elementType, onFormCallback) {
        const petal = document.createElement('div');
        petal.className = 'small-petal';
        
        // Лепестки прилетают слева
        const startX = -120 - Math.random() * 80;
        const startY = Math.random() * window.innerHeight;
        
        // Целевая точка
        const targetX = targetRect.left + Math.random() * targetRect.width;
        const targetY = targetRect.top + Math.random() * targetRect.height;
        
        // МАЛЕНЬКИЕ лепестки без мигания
        petal.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: 4px;
            height: 6px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 0 60% 0 60%;
            pointer-events: none;
            z-index: 15;
            opacity: 0.9;
            transform: rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4});
            box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
        `;
        
        document.body.appendChild(petal);
        
        // Простая быстрая анимация без мигания
        setTimeout(() => {
            const duration = 800 + Math.random() * 400;
            
            petal.style.transition = `all ${duration}ms ease-out`;
            petal.style.left = targetX + 'px';
            petal.style.top = targetY + 'px';
            petal.style.transform = `rotate(${Math.random() * 360}deg) scale(0.2)`;
            petal.style.opacity = '0.3';
            
            // Когда лепесток достигает цели
            setTimeout(() => {
                if (onFormCallback) onFormCallback();
                
                // Лепесток плавно исчезает
                petal.style.transition = 'opacity 400ms ease';
                petal.style.opacity = '0';
                
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.parentNode.removeChild(petal);
                    }
                }, 400);
            }, duration * 0.8);
            
        }, 30);
    }

    /* ===============================
    АКТИВАЦИЯ СЦЕНЫ
    =============================== */
    function activateScene(sceneIndex, textIndex, withPetals = false) {
        if (sceneIndex < 0 || sceneIndex >= scenes.length) return;
        
        const scene = scenes[sceneIndex];
        
        if (withPetals && sceneIndex !== currentScene) {
            // Скрываем предыдущее
            images.forEach(img => {
                img.classList.remove('visible');
                img.style.opacity = '0';
            });
            titles.forEach(title => {
                title.classList.remove('visible');
                title.style.opacity = '0';
            });
            textGroups.forEach(group => {
                group.classList.remove('visible');
                group.style.opacity = '0';
            });
            
            currentScene = sceneIndex;
            activateText(sceneIndex, textIndex);
            
            // СРАЗУ запускаем видимые лепестки
            createVisiblePetalsFormingContent();
            
        } else {
            // Мгновенное переключение
            images.forEach((img, index) => {
                if (index === sceneIndex) {
                    img.classList.add('visible');
                    img.style.opacity = '1';
                } else {
                    img.classList.remove('visible');
                }
            });
            
            titles.forEach((title, index) => {
                if (index === sceneIndex) {
                    title.classList.add('visible');
                    title.style.opacity = '1';
                } else {
                    title.classList.remove('visible');
                }
            });
            
            textGroups.forEach((group, index) => {
                if (index === sceneIndex) {
                    group.classList.add('visible');
                    group.style.opacity = '1';
                } else {
                    group.classList.remove('visible');
                }
            });
            
            activateText(sceneIndex, textIndex);
        }
        
        currentScene = sceneIndex;
        currentText = textIndex;
    }
    
    /* ===============================
    АКТИВАЦИЯ ТЕКСТА
    =============================== */
    function activateText(sceneIndex, textIndex) {
        scenes.forEach((scene, sIndex) => {
            scene.texts.forEach((text, tIndex) => {
                if (sIndex === sceneIndex && tIndex === textIndex) {
                    text.classList.add('active');
                } else {
                    text.classList.remove('active');
                }
            });
        });
    }

    /* ===============================
    ОБНОВЛЕНИЕ ПРОГРЕССА
    =============================== */
    function updateProgress(progress) {
        if (progressBar) {
            progressBar.style.width = (progress * 100) + '%';
        }
    }

    /* ===============================
    ОБРАБОТЧИК СКРОЛЛА
    =============================== */
    function handleScroll() {
    const scrolled = window.pageYOffset;
    const sectionTop = photoSection.offsetTop;
    const sectionHeight = photoSection.offsetHeight;
    const windowHeight = window.innerHeight;
    
    const sectionStart = sectionTop - windowHeight * 0.3;
    const sectionEnd = sectionTop + sectionHeight - windowHeight;
    
    if (scrolled >= sectionStart && scrolled <= sectionEnd) {
        if (!isActive) {
            isActive = true;
            activateScene(0, 0, true);
        }
        
        const sectionProgress = (scrolled - sectionStart) / (sectionEnd - sectionStart);
        const clampedProgress = Math.max(0, Math.min(1, sectionProgress));
        
        updateProgress(clampedProgress);
        
        // Простая логика для отображения всех 3 текстов
        let targetTextIndex = Math.floor(clampedProgress * 3);
        if (targetTextIndex >= 3) targetTextIndex = 2; // максимум index 2
        
        // Активируем только если текст изменился
        if (targetTextIndex !== currentText) {
            console.log(`🔄 Text switch: ${targetTextIndex}, progress: ${(clampedProgress * 100).toFixed(1)}%`);
            activateText(0, targetTextIndex);
            currentText = targetTextIndex;
        }
        
    } else if (isActive && scrolled < sectionStart) {
        isActive = false;
        images.forEach(img => {
            img.classList.remove('visible');
            img.style.opacity = '0';
        });
        titles.forEach(title => {
            title.classList.remove('visible');
            title.style.opacity = '0';
        });
        textGroups.forEach(group => {
            group.classList.remove('visible');
            group.style.opacity = '0';
        });
        updateProgress(0);
        currentScene = -1;
        currentText = -1;
    } else if (isActive && scrolled > sectionEnd) {
        updateProgress(1);
    }
}

    /* ===============================
    ИНИЦИАЛИЗАЦИЯ
    =============================== */
    window.addEventListener('scroll', throttle(handleScroll, 10));
    updateProgress(0);
    
    console.log('✅ Visible Fast Petals initialized');
}

/* ===============================
ДОБАВЛЕНИЕ В ОСНОВНУЮ ИНИЦИАЛИЗАЦИЮ
=============================== */
document.addEventListener('DOMContentLoaded', function() {
    try {
        initPhotoStory();
        console.log('✅ Photo Story initialized');
    } catch (e) {
        console.error('❌ Photo Story error:', e);
    }
});

