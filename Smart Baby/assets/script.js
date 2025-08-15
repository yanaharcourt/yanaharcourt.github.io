function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (mobileMenu && mobileToggle) {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    }
}

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    // Закрытие выпадающих меню десктопа
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.mega-menu, .dropdown').forEach(menu => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(20px)';
            setTimeout(() => {
                menu.style.transform = '';
            }, 300);
        });
    }
    
    // Закрытие мобильного меню при клике вне его
    if (mobileMenu && mobileToggle && mobileMenu.classList.contains('active')) {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-toggle')) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
});

// Закрытие мобильного меню при изменении размера экрана
window.addEventListener('resize', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (window.innerWidth > 768 && mobileMenu && mobileToggle) {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// =============== Галлерея секция =============== 
let currentSlide = 0;
const totalSlides = 4;

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateGallery();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateGallery();
}

function goToSlide(index) {
    currentSlide = index;
    updateGallery();
}

function updateGallery() {
    // Обновляем активное фото
    document.querySelectorAll('.photo-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
    });
    
    // Обновляем активную точку
    document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

/* ============================================
Teachers Section
============================================ */
let currentTeacher = 0;
const totalTeachers = 4;

function nextTeacher() {
    currentTeacher = (currentTeacher + 1) % totalTeachers;
    updateTeachers();
}

function prevTeacher() {
    currentTeacher = (currentTeacher - 1 + totalTeachers) % totalTeachers;
    updateTeachers();
}

function goToTeacher(index) {
    currentTeacher = index;
    updateTeachers();
}

function updateTeachers() {
    document.querySelectorAll('.teacher-card').forEach((card, index) => {
        card.classList.toggle('active', index === currentTeacher);
    });
    
    document.querySelectorAll('.teacher-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTeacher);
    });
}

/* ============================================
Review Section
============================================ */
let currentTestimonial = 0;
const totalTestimonials = 3;

function toggleTestimonial(index) {
    const card = document.querySelector(`[data-testimonial="${index}"]`);
    const shortText = card.querySelector('.testimonial-text');
    const fullText = card.querySelector('.testimonial-text-full');
    const button = card.querySelector('.testimonial-expand');
    
    if (card.classList.contains('expanded')) {
        card.classList.remove('expanded');
        shortText.style.display = 'block';
        if (fullText) fullText.style.display = 'none';
        button.textContent = 'Больше';
    } else {
        card.classList.add('expanded');
        shortText.style.display = 'none';
        if (fullText) fullText.style.display = 'block';
        button.textContent = 'Свернуть';
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonials();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonials();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
}

function updateTestimonials() {
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.toggle('active', index === currentTestimonial);
    });
    
    document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}