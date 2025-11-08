/**
 * خدمات نخبة المنافذ - JavaScript لصفحات الخدمات
 * يحتوي هذا الملف على جميع الوظائف اللازمة لصفحات الخدمات
 */

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل الأسئلة الشائعة
    initFAQ();

    // تفعيل عرض تفاصيل الخدمة
    initServiceDetailsAnimation();

    // تفعيل عرض عملية الخدمة
    initServiceProcess();

    // تفعيل عرض الخدمات ذات الصلة
    initRelatedServicesSlider();

    // تفعيل زر طلب الخدمة في صفحات الخدمات
    initServiceRequestButtons();

    // تفعيل عرض بطاقات الخدمات
    initServiceCards();
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

/**
 * تفعيل الأسئلة الشائعة
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // إغلاق جميع العناصر الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });

            // فتح أو إغلاق العنصر الحالي
            if (isOpen) {
                item.classList.remove('open');
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('open');
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/**
 * تفعيل تأثيرات الحركة لتفاصيل الخدمة
 */
function initServiceDetailsAnimation() {
    const sections = document.querySelectorAll('.service-detail-section, .service-main > div:not(.service-sidebar)');

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/**
 * تفعيل عرض عملية الخدمة المتحركة
 */
function initServiceProcess() {
    const processSteps = document.querySelectorAll('.process-step');

    if (!processSteps.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    processSteps.forEach(step => {
        observer.observe(step);
    });
}

/**
 * تفعيل شريط التمرير للخدمات ذات الصلة
 */
function initRelatedServicesSlider() {
    const relatedServices = document.querySelector('.related-services');

    if (!relatedServices) return;

    const servicesGrid = relatedServices.querySelector('.services-grid');
    const services = servicesGrid.querySelectorAll('.service-card');

    if (services.length <= 3) return;

    // إضافة أزرار التنقل
    const navHTML = `
        <button class="service-nav prev" aria-label="السابق"><i class="fas fa-chevron-right"></i></button>
        <button class="service-nav next" aria-label="التالي"><i class="fas fa-chevron-left"></i></button>
    `;

    relatedServices.insertAdjacentHTML('beforeend', navHTML);

    const prevBtn = relatedServices.querySelector('.prev');
    const nextBtn = relatedServices.querySelector('.next');

    let currentIndex = 0;
    const visibleCount = window.innerWidth < 768 ? 1 : 3;
    const totalServices = services.length;

    // تعيين العرض المناسب للحاوية
    servicesGrid.style.transition = 'transform 0.5s ease';
    servicesGrid.style.width = `${totalServices * 100}%`;
    services.forEach(service => {
        service.style.width = `${100 / totalServices}%`;
    });

    // إضافة خطوط وصل بين الخطوات
    const connectors = document.querySelectorAll('.process-connector');
    connectors.forEach(connector => {
        connector.style.height = '2px';
        connector.style.background = '#e2e8f0';
        connector.style.position = 'absolute';
        connector.style.right = '-15px';
        connector.style.top = '25px';
        connector.style.width = '30px';
        connector.style.zIndex = '1';
    });

    // دالة للتحديث
    function updatePosition() {
        const maxIndex = totalServices - visibleCount;
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        servicesGrid.style.transform = `translateX(-${(currentIndex * 100) / totalServices}%)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    // إضافة أحداث للنقر
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updatePosition();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updatePosition();
    });

    // تحديث عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        const newVisibleCount = window.innerWidth < 768 ? 1 : 3;
        if (newVisibleCount !== visibleCount) {
            visibleCount = newVisibleCount;
            updatePosition();
        }
    });

    // التهيئة الأولى
    updatePosition();
}

/**
 * تفعيل زر طلب الخدمة في صفحات الخدمات
 */
function initServiceRequestButtons() {
    // تحديد نوع الخدمة تلقائيًا بناءً على الصفحة الحالية
    const serviceTypeInput = document.querySelector('#serviceRequestForm [name="serviceType"]');
    if (!serviceTypeInput) return;

    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage.includes('customs-clearance')) {
        serviceTypeInput.value = 'customs';
    } else if (currentPage.includes('saber')) {
        serviceTypeInput.value = 'saber';
    } else if (currentPage.includes('transportation')) {
        serviceTypeInput.value = 'transport';
    } else if (currentPage.includes('international-shipping')) {
        serviceTypeInput.value = 'shipping';
    } else if (currentPage.includes('logistics')) {
        serviceTypeInput.value = 'logistics';
    } else if (currentPage.includes('exhibitions')) {
        serviceTypeInput.value = 'exhibitions';
    } else if (currentPage.includes('packaging')) {
        serviceTypeInput.value = 'packaging';
    }

    // إضافة تأثيرات لبطاقات الخدمات
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.16)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
        });
    });
}

/**
 * تفعيل تأثيرات لبطاقات الخدمات
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    if (!serviceCards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * دالة للتحقق من البريد الإلكتروني
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * دالة للتحقق من رقم الهاتف
 */
function validatePhone(phone) {
    // قبول الأرقام السعودية والدولية
    const re = /^(\+?\d{1,3}[- ]?)?\d{10,15}$/;
    return re.test(phone);
}

/**
 * دالة لعرض رسائل الخطأ
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // إزالة أي رسائل خطأ سابقة
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // إضافة رسالة الخطأ الجديدة
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    errorElement.style.textAlign = 'right';
    errorElement.textContent = message;

    field.parentElement.appendChild(errorElement);
    field.style.borderColor = '#ef4444';
}

/**
 * دالة لإزالة جميع الأخطاء
 */
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());

    const errorFields = document.querySelectorAll('.form-group input[style*="border-color"], .form-group select[style*="border-color"], .form-group textarea[style*="border-color"]');
    errorFields.forEach(field => {
        field.style.borderColor = '';
    });
}

/**
 * دالة لعرض رسالة نجاح
 */
function showSuccessMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'success-message';
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '20px';
    messageElement.style.right = '20px';
    messageElement.style.padding = '15px 25px';
    messageElement.style.backgroundColor = '#10b981';
    messageElement.style.color = 'white';
    messageElement.style.borderRadius = '8px';
    messageElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    messageElement.style.zIndex = '10000';
    messageElement.style.transform = 'translateX(20px)';
    messageElement.style.opacity = '0';
    messageElement.style.transition = 'all 0.3s ease';

    document.body.appendChild(messageElement);

    // عرض الرسالة
    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
        messageElement.style.opacity = '1';
    }, 10);

    // إخفاء الرسالة بعد 5 ثوان
    setTimeout(() => {
        messageElement.style.transform = 'translateX(20px)';
        messageElement.style.opacity = '0';

        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 5000);
}
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, 4000);
}

function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const phone = form.querySelector('input[name="phone"]');
        
        let isValid = true;
        
        if (!name.value.trim()) {
            showError(name, 'الرجاء إدخال اسمك');
            isValid = false;
        } else {
            clearError(name);
        }
        
        if (!isValidEmail(email.value)) {
            showError(email, 'الرجاء إدخال بريد إلكتروني صحيح');
            isValid = false;
        } else {
            clearError(email);
        }
        
        if (!phone.value.trim()) {
            showError(phone, 'الرجاء إدخال رقم الهاتف');
            isValid = false;
        } else {
            clearError(phone);
        }
        
        if (!isValid) {
            return;
        }

        try {
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
            submitBtn.textContent = '✓ تم الإرسال بنجاح!';
            
            showToast('شكراً لتواصلك معنا! سنرد عليك قريباً.');

            await new Promise(resolve => setTimeout(resolve, 3000));

        } finally {
            form.reset();
            submitBtn.style.background = '';
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            inputs.forEach(input => clearError(input));
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const openBtns = document.querySelectorAll('.open-form');
    const closeBtn = document.querySelector('.close-button');

    if (modal && closeBtn) {
        if (openBtns.length > 0) {
            openBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    modal.style.display = 'block';
                });
            });
        }

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    initFormValidation();
});
