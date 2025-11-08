// ========================================
// نخبة المنافذ - Ports Elite
// ملف JavaScript الرئيسي - نسخة محسنة
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initIntersectionObserver();
    initHeaderScroll();
    initCounterAnimation();
    initParallaxEffect();
    initServiceCardsAnimation();
    initFormAnimations();
    initAdvancedLighting();
    initHeaderActions();
    initFloatingActions();
    initCounters();
    initDarkMode();
     // --- الكود المُعدَّل الخاص بالمودال ---
    const modal = document.getElementById('contactModal');
    // 1. استهداف جميع الأزرار التي تفتح النموذج باستخدام الفئة المشتركة
    const openBtns = document.querySelectorAll('.open-form'); 
    const closeBtn = document.querySelector('.close-button');

    // 2. المرور على كل زر وربط حدث النقر به
    openBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    });

    // عند الضغط على علامة X (يبقى كما هو)
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    

    // عند الضغط خارج المودال (يبقى كما هو)
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ========== تفعيل الوضع الليلي ==========
function initDarkMode() {
    const themeBtn = document.querySelector('.theme-toggle-btn');
    if (!themeBtn) return;

    // التحقق من التفضيل المحفوظ
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // إضافة مستمع للنقر على الزر
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');

        if (isDark) {
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ========== قائمة الجوال ==========
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            // تأثير حركي عند فتح القائمة
            if (navMenu.classList.contains('active')) {
                navLinks.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        link.style.transition = 'all 0.3s ease';
                        link.style.opacity = '1';
                        link.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });

        // تأثير حركي عند التمرير على الروابط
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ========== التمرير السلس ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const header = document.querySelector('.header');
                const headerOffset = header ? header.offsetHeight : 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== تأثير التمرير على الهيدر ==========
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // إخفاء/إظهار الهيدر حسب اتجاه التمرير
        if (currentScroll <= 0) {
            // At the top - always show header
            header.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 200) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll) {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    if (!modal) return;

    const form = modal.querySelector('.contact-form.service-form');
    const successMessage = modal.querySelector('.success-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    const allInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    const openBtns = document.querySelectorAll('.open-form');
    const closeBtn = modal.querySelector('.close-button');

    const customSelectWrapper = modal.querySelector('.custom-select-wrapper');
    
    if (customSelectWrapper) {
        const trigger = customSelectWrapper.querySelector('.custom-select-trigger');
        const originalSelect = customSelectWrapper.querySelector('.custom-select-original');
        const customOptions = customSelectWrapper.querySelectorAll('.custom-option');

        trigger.addEventListener('click', () => customSelectWrapper.classList.toggle('open'));

        customOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedOption = customSelectWrapper.querySelector('.custom-option.selected');
                if (selectedOption) selectedOption.classList.remove('selected');
                
                this.classList.add('selected');
                
                const triggerContent = trigger.querySelector('span');
                const iconHTML = this.querySelector('i') ? this.querySelector('i').outerHTML : '';
               
                const textContent = this.innerText || this.textContent;
                triggerContent.innerHTML = `${iconHTML} ${textContent.trim()}`;

                originalSelect.value = this.getAttribute('data-value');
                originalSelect.dispatchEvent(new Event('input'));
                customSelectWrapper.classList.remove('open');
            });
        });
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        formGroup.classList.add('error');
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ef4444';
            errorElement.style.marginTop = '5px';
            errorElement.style.display = 'block';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        const elementToStyle = input.classList.contains('custom-select-original') ? input.parentElement.querySelector('.custom-select-trigger') : input;
        if (elementToStyle) elementToStyle.style.borderColor = '#ef4444';
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) errorElement.textContent = '';
        const elementToStyle = input.classList.contains('custom-select-original') ? input.parentElement.querySelector('.custom-select-trigger') : input;
        if (elementToStyle) elementToStyle.style.borderColor = '';
    }

    function validateInput(input) {
        clearError(input);
        let isValid = true;
        const value = input.value.trim();
        if (input.required && value === '') {
            const fieldName = input.closest('.form-group').querySelector('label').textContent.replace(' *', '');
            showError(input, `حقل ${fieldName} مطلوب.`);
            isValid = false;
        }
        return isValid;
    }

    allInputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') validateInput(input);
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        let isFormValid = true;
        allInputs.forEach(input => {
            if (!validateInput(input)) isFormValid = false;
        });
        if (!isFormValid) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ الإرسال...';

        await new Promise(resolve => setTimeout(resolve, 500));

        form.style.display = 'none';
        successMessage.style.display = 'block';

        // ✅ تشغيل أنيميشن الدائرة والصح
        const circle = successMessage.querySelector('.success-circle-progress');
        const checkmark = successMessage.querySelector('.success-checkmark');
        setTimeout(() => {
            circle.style.strokeDashoffset = "0";
        }, 200);
        setTimeout(() => {
            checkmark.style.strokeDashoffset = "0";
        }, 500);

        // ✅ إغلاق الرسالة تلقائيًا بعد 3 ثوانٍ
        setTimeout(() => {
            modal.style.display = 'none';
            resetFormState();
        }, 2000);
    });


    function resetFormState() {
        form.reset();
        allInputs.forEach(input => clearError(input));
        
        if (customSelectWrapper) {
            const triggerSpan = customSelectWrapper.querySelector('.custom-select-trigger span');
            const selectedOption = customSelectWrapper.querySelector('.custom-option.selected');
            if (triggerSpan) triggerSpan.innerHTML = 'اختر نوع الخدمة';
            if (selectedOption) selectedOption.classList.remove('selected');
        }

        form.style.display = 'flex';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        successMessage.style.display = 'none';
    }

    function openModal() {
        resetFormState();
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
        if (customSelectWrapper && !customSelectWrapper.contains(event.target)) {
            customSelectWrapper.classList.remove('open');
        }
    });
});

// ========== دالة التحقق من البريد الإلكتروني ==========
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== عرض رسالة الخطأ ==========
function showError(element, message) {
    element.style.borderColor = '#ef4444';
    element.style.animation = 'shake 0.5s ease';
    let errorDiv = element.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '13px';
        errorDiv.style.marginTop = '8px';
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-10px)';
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }
    errorDiv.textContent = message;
    setTimeout(() => {
        errorDiv.style.transition = 'all 0.3s ease';
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 10);
}

// ========== إزالة رسالة الخطأ ==========
function clearError(element) {
    element.style.borderColor = '';
    element.style.animation = '';
    let errorDiv = element.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorDiv.remove();
        }, 300);
    }
}

// ========== إضافة تأثير الاهتزاز ==========
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}`;

const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);

// ========== مراقب التقاطع (Intersection Observer) ==========
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة جميع العناصر القابلة للحركة
    document.querySelectorAll('.service-card, .stat-item, .about-text, .about-image, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// ========== حركة الأرقام (Counter Animation) ==========
function initCounterAnimation() {
    const statItems = document.querySelectorAll('.stat-item h4');

    // Helper to convert to Arabic numerals
    function toArabicNumerals(num) {
        return num.toString().replace(/\d/g, d => String.fromCharCode(d.charCodeAt(0) + 1584));
    }

    // Helper to check if current language is Arabic
    function isArabicMode() {
        const savedLang = localStorage.getItem('site-lang') || 'ar';
        return savedLang === 'ar';
    }

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = entry.target;
                const text = target.textContent;

                // Extract numbers (both Arabic ٠-٩ and English 0-9)
                const numbers = text.match(/[\d٠-٩,]+/);

                if (numbers) {
                    // Convert Arabic numerals to English for calculation
                    const numStr = numbers[0].replace(/[٠-٩]/g, d =>
                        String.fromCharCode(d.charCodeAt(0) - 1584)
                    );
                    const finalValue = parseInt(numStr.replace(/,/g, ''));
                    const suffix = text.replace(/[\d٠-٩,]+/, '').trim();
                    const duration = 2000;
                    const step = finalValue / (duration / 16);
                    let current = 0;

                    target.dataset.animated = 'true';

                    const counter = setInterval(() => {
                        current += step;
                        if (current >= finalValue) {
                            current = finalValue;
                            clearInterval(counter);
                        }

                        // Format numbers in English format always
                        let displayValue = Math.floor(current).toLocaleString('en-US');

                        // Handle special cases - always use English format
                        if (text.includes('%') || text.includes('٪')) {
                            displayValue += '%';
                        } else if (text.includes('/') || text.includes('٧')) {
                            // For 24/7, keep it as is
                            displayValue = '24/7';
                        } else {
                            displayValue += suffix;
                        }

                        target.textContent = displayValue;
                    }, 16);
                }

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// دالة لعدادات الإحصائيات
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const countTo = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // مدة التحريك بالمللي ثانية
                const start = 0;
                const increment = countTo / (duration / 16); // زيادة في كل إطار

                let current = start;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= countTo) {
                        current = countTo;
                        clearInterval(timer);
                    }

                    // Always use English numerals
                    counter.textContent = Math.floor(current).toLocaleString('en-US');
                }, 16);

                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// دالة تحويل الأرقام إلى العربية
function toArabicNumerals(numStr) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return numStr.replace(/\d/g, d => arabicNumerals[parseInt(d)]);
}

// ========== تأثير Parallax ==========
function initParallaxEffect() {
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ========== حركة بطاقات الخدمات ==========
function initServiceCardsAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // تأثير مموج للبطاقات الأخرى
            serviceCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    const distance = Math.abs(index - otherIndex);
                    setTimeout(() => {
                        otherCard.style.transform = `translateY(-${5 - distance}px) scale(0.98)`;
                        otherCard.style.transition = 'transform 0.3s ease';
                        setTimeout(() => {
                            otherCard.style.transform = '';
                        }, 300);
                    }, distance * 50);
                }
            });
        });
    });
}

// ========== حركات النموذج ==========
function initFormAnimations() {
    const form = document.querySelector('.contact-form');

    if (form) {
        // حركة عند ظهور النموذج
        const formObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    form.style.animation = 'slideInLeft 0.8s ease-out';
                    formObserver.unobserve(form);
                }
            });
        }, { threshold: 0.2 });

        formObserver.observe(form);
    }
}

// ========== تأثير الإضاءة على الأزرار ==========
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// ========== تأثير الإضاءة المتقدم ==========
function initAdvancedLighting() {
    const cards = document.querySelectorAll('.service-card, .stat-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            this.style.setProperty('--light-x', xPercent + '%');
            this.style.setProperty('--light-y', yPercent + '%');
        });

        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--light-x', '50%');
            this.style.setProperty('--light-y', '50%');
        });
    });
}

// ========== أزرار الهيدر: تبديل الوضع واللغة ==========
function initHeaderActions() {
    // Get header buttons
    const themeBtn = document.querySelector('.theme-toggle-btn');
    const langBtn = document.querySelector('.lang-toggle-btn');

    if (!themeBtn || !langBtn) return;

    // persisted preferences
    const savedTheme = localStorage.getItem('site-theme');
    const savedLang = localStorage.getItem('site-lang');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // initialize language button label based on savedLang
    const langText = langBtn.querySelector('.lang-text');
    if (savedLang === 'en') {
        if (langText) langText.textContent = 'EN';
    } else if (savedLang === 'ar') {
        if (langText) langText.textContent = 'ع';
    } else {
        if (langText) langText.textContent = 'ع';
    }

    // translations: capture original Arabic text to restore later
    const origTexts = {};

    // keys and selectors to translate (limited set, can be expanded)
    const i18nMap = {
        nav: {
            selector: '.nav-menu',
            type: 'links',
            // match number of nav links in HTML
            en: ['Home', 'Services', 'About', 'Contact', 'Book Your Service']
        },
        heroTitle: { selector: '.hero h1', en: 'Your Ideal Partner in Integrated Logistics Services' },
        heroPara: { selector: '.hero p', en: 'We provide comprehensive and reliable logistics solutions covering customs clearance, transportation, shipping, storage, and supply chain management, ensuring the highest standards of quality and speed.' },
        heroBtn1: { selector: '.hero-buttons .btn-primary', en: 'Explore Our Services' },
        heroBtn2: { selector: '.hero-buttons .btn-outline', en: 'Contact Us' },
        servicesH2: { selector: '#services h2', en: 'Our Outstanding Services' },
        statsH2: { selector: '#stats h2', en: 'Our Achievements & Numbers' },
        aboutH2: { selector: '#about h2', en: 'About Us' },
        contactH2: { selector: '#contact h2', en: 'Contact Us' },
        footerTitle: { selector: '.footer-section h4', en: 'Ports Elite' }
    };

    // store originals
    Object.keys(i18nMap).forEach(key => {
        const item = i18nMap[key];
        if (item.type === 'links') {
            const nav = document.querySelector(item.selector);
            if (nav) {
                origTexts[key] = Array.from(nav.querySelectorAll('a')).map(a => a.textContent.trim());
            }
        } else {
            const el = document.querySelector(item.selector);
            origTexts[key] = el ? el.textContent.trim() : '';
        }
    });

    // store original hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    origTexts.heroBtn1 = heroButtons[0] ? heroButtons[0].textContent.trim() : '';
    origTexts.heroBtn2 = heroButtons[1] ? heroButtons[1].textContent.trim() : '';

    // store original header CTA button
    const headerCTA = document.querySelector('.btn-cta');
    origTexts.headerCTA = headerCTA ? headerCTA.textContent.trim() : '';

    // store original service titles and paragraphs
    origTexts.servicesTitles = Array.from(document.querySelectorAll('.service-card h3')).map(h => h.textContent.trim());
    origTexts.servicesParas = Array.from(document.querySelectorAll('.service-card p')).map(p => p.textContent.trim());
    origTexts.serviceButtons = Array.from(document.querySelectorAll('.service-card .btn')).map(btn => btn.textContent.trim());

    // store original form labels
    origTexts.name = (document.querySelector('label[for="name"]') || {}).textContent || '';
    origTexts.email = (document.querySelector('label[for="email"]') || {}).textContent || '';
    origTexts.phone = (document.querySelector('label[for="phone"]') || {}).textContent || '';
    origTexts.serviceLabel = (document.querySelector('label[for="service"]') || {}).textContent || '';
    origTexts.message = (document.querySelector('label[for="message"]') || {}).textContent || '';

    // store original form placeholders
    origTexts.namePlaceholder = (document.querySelector('input[name="name"]') || {}).placeholder || '';
    origTexts.emailPlaceholder = (document.querySelector('input[name="email"]') || {}).placeholder || '';
    origTexts.phonePlaceholder = (document.querySelector('input[name="phone"]') || {}).placeholder || '';
    origTexts.messagePlaceholder = (document.querySelector('textarea[name="message"]') || {}).placeholder || '';

    // store original form select options
    origTexts.serviceOptions = Array.from(document.querySelectorAll('select[name="service"] option')).map(opt => opt.textContent.trim());

    // store contact info headers
    origTexts.contactHeaders = Array.from(document.querySelectorAll('.contact-item h4')).map(h => h.textContent.trim());

    // store stats labels and numbers
    origTexts.statsLabels = Array.from(document.querySelectorAll('.stat-item p')).map(p => p.textContent.trim());
    origTexts.statsNumbers = Array.from(document.querySelectorAll('.stat-item h4')).map(h => h.textContent.trim());

    // store about section
    const aboutH3 = document.querySelector('.about-text h3');
    origTexts.aboutH3 = aboutH3 ? aboutH3.textContent.trim() : '';
    origTexts.aboutParas = Array.from(document.querySelectorAll('.about-text p')).map(p => p.textContent.trim());
    const aboutBtn = document.querySelector('.about-text .btn');
    origTexts.aboutBtn = aboutBtn ? aboutBtn.textContent.trim() : '';

    // store footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    origTexts.footerTitle = (footerSections[0] && footerSections[0].querySelector('h4')) ? footerSections[0].querySelector('h4').textContent.trim() : '';
    origTexts.footerDesc = (footerSections[0] && footerSections[0].querySelector('p')) ? footerSections[0].querySelector('p').textContent.trim() : '';
    origTexts.footerSections = Array.from(document.querySelectorAll('.footer-section h4')).slice(1).map(h => h.textContent.trim());
    origTexts.footerLinks = Array.from(document.querySelectorAll('.footer-section ul')).map(ul =>
        Array.from(ul.querySelectorAll('a')).map(a => a.textContent.trim())
    );
    origTexts.footerBottom = (document.querySelector('.footer-bottom p') || {}).textContent || '';

    // Helper function to convert Arabic numerals to English
    function toEnglishNumbers(str) {
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        return str.replace(/[٠-٩]/g, function(match) {
            return englishNumerals[arabicNumerals.indexOf(match)];
        });
    }

    // Helper function to convert English numerals to Arabic
    function toArabicNumbers(str) {
        return str.replace(/\d/g, function(match) {
            return String.fromCharCode(match.charCodeAt(0) + 1584);
        });
    }

    // proofread English translations (minor adjustments done in the strings above)
    // Handler to switch language
    function setLanguage(lang) {
        if (lang === 'en') {
            // nav links
            if (i18nMap.nav) {
                const nav = document.querySelector(i18nMap.nav.selector);
                if (nav) {
                    const links = nav.querySelectorAll('a');
                    links.forEach((a, idx) => {
                        if (i18nMap.nav.en[idx]) a.textContent = i18nMap.nav.en[idx];
                    });
                }
            }

            Object.keys(i18nMap).forEach(key => {
                if (key === 'nav') return;
                const item = i18nMap[key];
                // Handle multiple elements for hero buttons
                if (key === 'heroBtn1' || key === 'heroBtn2') {
                    const elements = document.querySelectorAll(item.selector);
                    elements.forEach(el => {
                        if (el && item.en) el.textContent = item.en;
                    });
                } else {
                    const el = document.querySelector(item.selector);
                    if (el && item.en) el.textContent = item.en;
                }
            });

            // translate service cards (titles and descriptions) - 9 services total
            const serviceTitlesEn = [
                'Personal Customs Clearance',
                'Corporate Customs Clearance',
                'Transportation & Distribution',
                'Secure Transport',
                'International Shipping',
                'Express Shipping',
                'Storage Services',
                'Supply Chain Management',
                'Exhibitions & Events Logistics'
            ];

            const serviceParasEn = [
                'We handle full customs clearance procedures for individuals in coordination with authorities to ensure fast, hassle-free entry. We provide account opening on Fasah platform.',
                'We manage complete customs clearance operations for companies, coordinating with government entities to ensure smooth cargo entry without delays. We handle account linking and setup.',
                'We manage door-to-door transport efficiently and reliably within the Kingdom and beyond, covering Riyadh, Eastern Province and intercity/regional routes.',
                'We provide secure transport for sensitive shipments inside the Kingdom, whether to ports or to clients, in cooperation with certified security and protection partners.',
                'We offer international sea, air and land shipping solutions from and to various countries worldwide, with complete management from receipt to delivery, including document preparation, booking, and insurance upon request.',
                'We provide fast domestic and international shipping via a network of trusted transport and postal companies to ensure the shortest delivery time. We manage the complete process from receipt, packaging, and documentation to delivery.',
                'We provide accredited storage (ambient, chilled, frozen) for short or long terms for various goods, with digital management and supporting services such as repackaging and preparation for shipping, through professional partners.',
                'We offer integrated supply chain management solutions including planning, procurement, receiving, transport, storage, and distribution, to ensure supply continuity and reduce operational costs.',
                'We provide integrated logistics solutions for exhibitions from receipt, preparation, secure transport, and field support, with clearance (ATA Carnet), then storage or re-shipping after the event ends.'
            ];

            document.querySelectorAll('.service-card h3').forEach((h, i) => {
                if (serviceTitlesEn[i]) h.textContent = serviceTitlesEn[i];
            });

            document.querySelectorAll('.service-card p').forEach((p, i) => {
                if (serviceParasEn[i]) p.textContent = serviceParasEn[i];
            });

            // translate header CTA button
            const headerCTA = document.querySelector('.btn-cta');
            if (headerCTA) headerCTA.textContent = 'Book Now';

            // translate service card buttons
            document.querySelectorAll('.service-card .btn').forEach((btn, i) => {
                btn.textContent = 'Book Now';
            });

            // translate contact info headers
            const contactHeadersEn = ['Address', 'Phone', 'WhatsApp', 'Email', 'Working Hours'];
            document.querySelectorAll('.contact-item h4').forEach((h, i) => {
                if (contactHeadersEn[i]) h.textContent = contactHeadersEn[i];
            });

            // translate contact info content
            const contactContentEn = [
                'Riyadh | Dammam | Jeddah | Batha Port<br>Kingdom of Saudi Arabia',
                'Saturday - Thursday: 8:00 AM - 6:00 PM<br>Friday: Closed'
            ];
            const contactItems = document.querySelectorAll('.contact-item');
            if (contactItems.length >= 5) {
                const addressP = contactItems[0].querySelector('p');
                if (addressP) addressP.innerHTML = contactContentEn[0];
                const hoursP = contactItems[4].querySelector('p');
                if (hoursP) hoursP.innerHTML = contactContentEn[1];
            }

            // translate form labels
            const name = document.querySelector('label[for="name"]'); if (name) name.textContent = 'Full Name';
            const email = document.querySelector('label[for="email"]'); if (email) email.textContent = 'Email';
            const phone = document.querySelector('label[for="phone"]'); if (phone) phone.textContent = 'Phone Number';
            const service = document.querySelector('label[for="service"]'); if (service) service.textContent = 'Service Type (Optional)';
            const message = document.querySelector('label[for="message"]'); if (message) message.textContent = 'Message';

            // translate form placeholders
            const nameInput = document.querySelector('input[name="name"]'); if (nameInput) nameInput.placeholder = 'Enter your full name';
            const emailInput = document.querySelector('input[name="email"]'); if (emailInput) emailInput.placeholder = 'Enter your email';
            const phoneInput = document.querySelector('input[name="phone"]'); if (phoneInput) phoneInput.placeholder = 'Enter your phone number';
            const messageTextarea = document.querySelector('textarea[name="message"]'); if (messageTextarea) messageTextarea.placeholder = 'Enter your message here...';

            // translate form select options
            const serviceSelect = document.querySelector('select[name="service"]');
            if (serviceSelect) {
                const optionsEn = ['Select Service Type', 'Customs Clearance', 'Transportation & Distribution', 'International Shipping', 'Storage', 'Supply Chain Management', 'Other'];
                serviceSelect.querySelectorAll('option').forEach((opt, i) => {
                    if (optionsEn[i]) opt.textContent = optionsEn[i];
                });
            }

            const submitBtn = document.querySelector('.contact-form button[type="submit"]'); if (submitBtn) submitBtn.textContent = 'Send Message';

            // translate stats section numbers to English numerals
            document.querySelectorAll('.stat-item h4').forEach((h) => {
                h.textContent = toEnglishNumbers(h.textContent);
                // Reset animation flag so it can re-animate
                delete h.dataset.animated;
            });

            // translate stats section labels
            const statsLabelsEn = [
                'Annual customs clearance operations',
                'Institutional and individual clients',
                'Customer satisfaction rate',
                'Round-the-clock technical support',
                'Countries in our network',
                'Years of experience'
            ];
            document.querySelectorAll('.stat-item p').forEach((p, i) => {
                if (statsLabelsEn[i]) p.textContent = statsLabelsEn[i];
            });

            // translate about section
            const aboutH3 = document.querySelector('.about-text h3');
            if (aboutH3) aboutH3.textContent = 'Your Trusted Partner for Success';
            const aboutParasEn = [
                'Ports Elite is the strongest customs clearance and logistics platform in Saudi Arabia and the Middle East. We excel with a professional team and deep expertise in logistics and customs clearance.',
                'With us, the decision is the difference between experience and result. At Ports Elite, we don\'t experiment... we deliver. We ensure your shipment arrives as planned—fast, accurate, and professional.',
                'If your shipment is ready to move—we\'re ready to execute. We provide integrated solutions covering all aspects of your logistics needs, ensuring the highest standards of quality and reliability.'
            ];
            document.querySelectorAll('.about-text p').forEach((p, i) => {
                if (aboutParasEn[i]) p.textContent = aboutParasEn[i];
            });
            const aboutBtn = document.querySelector('.about-text .btn');
            if (aboutBtn) aboutBtn.textContent = 'Contact Us Now';

            // translate footer sections
            const footerSections = document.querySelectorAll('.footer-section');
            if (footerSections.length >= 4) {
                // First section - company name and description
                const footerH4First = footerSections[0].querySelector('h4');
                if (footerH4First) footerH4First.textContent = 'Ports Elite';
                const footerDesc = footerSections[0].querySelector('p');
                if (footerDesc) footerDesc.textContent = 'The strongest customs clearance and integrated logistics platform in Saudi Arabia and the Middle East.';

                // Second section - Services
                if (footerSections[1].querySelector('h4')) {
                    footerSections[1].querySelector('h4').textContent = 'Services';
                    const servicesLinksEn = ['Customs Clearance', 'Transportation & Distribution', 'International Shipping', 'Storage', 'Supply Chain Management'];
                    footerSections[1].querySelectorAll('a').forEach((a, i) => {
                        if (servicesLinksEn[i]) a.textContent = servicesLinksEn[i];
                    });
                }

                // Third section - Quick Links
                if (footerSections[2].querySelector('h4')) {
                    footerSections[2].querySelector('h4').textContent = 'Quick Links';
                    const quickLinksEn = ['Home', 'About Us', 'Our Services', 'Contact Us'];
                    footerSections[2].querySelectorAll('a').forEach((a, i) => {
                        if (quickLinksEn[i]) a.textContent = quickLinksEn[i];
                    });
                }

                // Fourth section - Contact Info
                if (footerSections[3].querySelector('h4')) {
                    footerSections[3].querySelector('h4').textContent = 'Contact Information';
                }
            }

            const footerBottom = document.querySelector('.footer-bottom p');
            if (footerBottom) footerBottom.textContent = '© 2024 Ports Elite. All rights reserved.';

            localStorage.setItem('site-lang', 'en');
            if (langText) langText.textContent = 'EN';
            document.documentElement.lang = 'en';
            document.body.setAttribute('dir', 'ltr');
        } else {
            // restore original Arabic
            if (i18nMap.nav) {
                const nav = document.querySelector(i18nMap.nav.selector);
                if (nav && origTexts.nav) {
                    const links = nav.querySelectorAll('a');
                    links.forEach((a, idx) => {
                        if (origTexts.nav[idx]) a.textContent = origTexts.nav[idx];
                    });
                }
            }

            Object.keys(i18nMap).forEach(key => {
                if (key === 'nav') return;
                const item = i18nMap[key];
                // Handle multiple elements for hero buttons
                if (key === 'heroBtn1' || key === 'heroBtn2') {
                    const elements = document.querySelectorAll(item.selector);
                    elements.forEach((el, idx) => {
                        const origKey = key === 'heroBtn1' ? 'heroBtn1' : 'heroBtn2';
                        if (el && origTexts[origKey]) el.textContent = origTexts[origKey];
                    });
                } else {
                    const el = document.querySelector(item.selector);
                    if (el && origTexts[key]) el.textContent = origTexts[key];
                }
            });

            // restore services
            document.querySelectorAll('.service-card h3').forEach((h, i) => {
                if (origTexts.servicesTitles && origTexts.servicesTitles[i]) h.textContent = origTexts.servicesTitles[i];
            });

            document.querySelectorAll('.service-card p').forEach((p, i) => {
                if (origTexts.servicesParas && origTexts.servicesParas[i]) p.textContent = origTexts.servicesParas[i];
            });

            // restore header CTA button
            const headerCTA = document.querySelector('.btn-cta');
            if (headerCTA && origTexts.headerCTA) headerCTA.textContent = origTexts.headerCTA;

            // restore service buttons
            document.querySelectorAll('.service-card .btn').forEach((btn, i) => {
                if (origTexts.serviceButtons && origTexts.serviceButtons[i]) btn.textContent = origTexts.serviceButtons[i];
            });

            // restore contact info headers
            document.querySelectorAll('.contact-item h4').forEach((h, i) => {
                if (origTexts.contactHeaders && origTexts.contactHeaders[i]) h.textContent = origTexts.contactHeaders[i];
            });

            // restore contact info content
            const contactItems = document.querySelectorAll('.contact-item');
            if (contactItems.length >= 5 && origTexts.contactHeaders) {
                const addressP = contactItems[0].querySelector('p');
                if (addressP) addressP.innerHTML = 'الرياض | الدمام | جدة | منفذ البطحاء<br>المملكة العربية السعودية';
                const hoursP = contactItems[4].querySelector('p');
                if (hoursP) hoursP.innerHTML = 'نعمل على مدار الساعة لخدمتك <br> 24 ساعة في اليوم <br> 7 ايام في الاسبوع';
            }

            // restore form labels
            const nameLabel = document.querySelector('label[for="name"]'); if (nameLabel && origTexts.name) nameLabel.textContent = origTexts.name;
            const emailLabel = document.querySelector('label[for="email"]'); if (emailLabel && origTexts.email) emailLabel.textContent = origTexts.email;
            const phoneLabel = document.querySelector('label[for="phone"]'); if (phoneLabel && origTexts.phone) phoneLabel.textContent = origTexts.phone;
            const serviceLabel = document.querySelector('label[for="service"]'); if (serviceLabel && origTexts.serviceLabel) serviceLabel.textContent = origTexts.serviceLabel;
            const messageLabel = document.querySelector('label[for="message"]'); if (messageLabel && origTexts.message) messageLabel.textContent = origTexts.message;

            // restore form placeholders
            const nameInput = document.querySelector('input[name="name"]');
            if (nameInput && origTexts.namePlaceholder) nameInput.placeholder = origTexts.namePlaceholder;
            const emailInput = document.querySelector('input[name="email"]');
            if (emailInput && origTexts.emailPlaceholder) emailInput.placeholder = origTexts.emailPlaceholder;
            const phoneInput = document.querySelector('input[name="phone"]');
            if (phoneInput && origTexts.phonePlaceholder) phoneInput.placeholder = origTexts.phonePlaceholder;
            const messageTextarea = document.querySelector('textarea[name="message"]');
            if (messageTextarea && origTexts.messagePlaceholder) messageTextarea.placeholder = origTexts.messagePlaceholder;

            // restore form select options
            const serviceSelect = document.querySelector('select[name="service"]');
            if (serviceSelect && origTexts.serviceOptions) {
                serviceSelect.querySelectorAll('option').forEach((opt, i) => {
                    if (origTexts.serviceOptions[i]) opt.textContent = origTexts.serviceOptions[i];
                });
            }

            // restore stats numbers to original (with Arabic numerals if any)
            document.querySelectorAll('.stat-item h4').forEach((h, i) => {
                if (origTexts.statsNumbers && origTexts.statsNumbers[i]) {
                    h.textContent = toArabicNumbers(origTexts.statsNumbers[i]);
                    // Reset animation flag so it can re-animate
                    delete h.dataset.animated;
                }
            });

            // restore stats labels
            document.querySelectorAll('.stat-item p').forEach((p, i) => {
                if (origTexts.statsLabels && origTexts.statsLabels[i]) p.textContent = origTexts.statsLabels[i];
            });

            // restore about section
            const aboutH3 = document.querySelector('.about-text h3');
            if (aboutH3 && origTexts.aboutH3) aboutH3.textContent = origTexts.aboutH3;
            document.querySelectorAll('.about-text p').forEach((p, i) => {
                if (origTexts.aboutParas && origTexts.aboutParas[i]) p.textContent = origTexts.aboutParas[i];
            });
            const aboutBtn = document.querySelector('.about-text .btn');
            if (aboutBtn && origTexts.aboutBtn) aboutBtn.textContent = origTexts.aboutBtn;

            // restore footer sections
            const footerSections = document.querySelectorAll('.footer-section');
            if (footerSections.length >= 4) {
                // Restore first section
                const footerH4First = footerSections[0].querySelector('h4');
                if (footerH4First && origTexts.footerTitle) footerH4First.textContent = origTexts.footerTitle;
                const footerDesc = footerSections[0].querySelector('p');
                if (footerDesc && origTexts.footerDesc) footerDesc.textContent = origTexts.footerDesc;

                if (origTexts.footerSections && origTexts.footerSections.length >= 3) {
                    footerSections[1].querySelector('h4').textContent = origTexts.footerSections[0];
                    footerSections[2].querySelector('h4').textContent = origTexts.footerSections[1];
                    footerSections[3].querySelector('h4').textContent = origTexts.footerSections[2];
                }

                if (origTexts.footerLinks && origTexts.footerLinks.length >= 2) {
                    footerSections[1].querySelectorAll('a').forEach((a, i) => {
                        if (origTexts.footerLinks[1] && origTexts.footerLinks[1][i]) a.textContent = origTexts.footerLinks[1][i];
                    });
                    footerSections[2].querySelectorAll('a').forEach((a, i) => {
                        if (origTexts.footerLinks[2] && origTexts.footerLinks[2][i]) a.textContent = origTexts.footerLinks[2][i];
                    });
                }
            }

            const footerBottom = document.querySelector('.footer-bottom p');
            if (footerBottom && origTexts.footerBottom) footerBottom.textContent = origTexts.footerBottom;

            // submit
            const submitBtn = document.querySelector('.contact-form button[type="submit"]'); if (submitBtn) submitBtn.textContent = 'إرسال الرسالة';

            localStorage.setItem('site-lang', 'ar');
            if (langText) langText.textContent = 'ع';
            document.documentElement.lang = 'ar';
            document.body.setAttribute('dir', 'rtl');
        }
    }

    // set initial language
    if (savedLang === 'en') {
        setLanguage('en');
    } else if (savedLang === 'ar') {
        setLanguage('ar');
    } else {
        // default: Arabic - keep numbers as they are in HTML (English format)
        if (langText) langText.textContent = 'EN';
        localStorage.setItem('site-lang', 'ar');
        document.documentElement.lang = 'ar';
        document.body.setAttribute('dir', 'rtl');
    }

    // theme toggle click (defensive)
    try {
        themeBtn.addEventListener('click', function() {
            try {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
            } catch (innerErr) {
                console.error('Error toggling theme:', innerErr);
            }
        });
    } catch (err) {
        console.error('Failed to attach theme toggle listener:', err);
    }

    // language toggle click (defensive)
    try {
        langBtn.addEventListener('click', function() {
            try {
                const current = localStorage.getItem('site-lang') || 'ar';
                const next = current === 'en' ? 'ar' : 'en';
                setLanguage(next);
            } catch (innerErr) {
                console.error('Error toggling language:', innerErr);
            }
        });
    } catch (err) {
        console.error('Failed to attach language toggle listener:', err);
    }
}

// ========== أزرار عائمة: واتساب والاتصال ==========
function initFloatingActions() {
    // create container for floating action buttons
    const actionContainer = document.createElement('div');
    actionContainer.className = 'floating-actions';
    actionContainer.style.zIndex = '9999';

    // WhatsApp button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/966556684992';
    whatsappBtn.className = 'floating-btn action-whatsapp';
    whatsappBtn.title = 'تواصل عبر واتساب | WhatsApp';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';

    // Phone button
    const phoneBtn = document.createElement('a');
    phoneBtn.href = 'tel:+966558868787';
    phoneBtn.className = 'floating-btn action-phone';
    phoneBtn.title = 'اتصل بنا | Call Us';
    phoneBtn.innerHTML = '<i class="fas fa-phone"></i>';

    // Append buttons to container
    actionContainer.appendChild(whatsappBtn);
    actionContainer.appendChild(phoneBtn);

    // Add to body
    document.body.appendChild(actionContainer);

    // Show buttons with animation
    setTimeout(() => {
        actionContainer.classList.add('visible');
    }, 500);
}

// ========== تأثير التموج عند النقر ==========
function createRippleEffect(element, event) {
    if (!element || !event) return;
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
        z-index: 0;
    `;

    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// إضافة تأثير التموج للأزرار
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-outline, .btn-service-request');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
});

// إضافة CSS للتأثير
if (!document.getElementById('ripple-style')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.id = 'ripple-style';
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// ========== دالة مساعدة للتمرير للأعلى ==========
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== زر العودة للأعلى ==========
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 55px;
    height: 55px;
    background: linear-gradient(135deg, #5458a2 0%, #6d72b5 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 22px;
    cursor: pointer;
    display: none;
    z-index: 9998;
    box-shadow: 0 8px 24px rgba(84, 88, 162, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    align-items: center;
    justify-content: center;
`;

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    this.style.boxShadow = '0 12px 35px rgba(84, 88, 162, 0.6), 0 6px 16px rgba(0, 0, 0, 0.3)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 8px 24px rgba(84, 88, 162, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)';
});

scrollTopBtn.addEventListener('click', scrollToTop);
scrollTopBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    scrollToTop();
});
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// ========== تحسين الأداء والتحميل ==========
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    // تحسين الأداء بتأخير التأثيرات الثقيلة
    setTimeout(() => {
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 2000);
});