/**
 * خدمات نخبة المنافذ - نافذة طلب الخدمة المنبثقة
 */

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل زر طلب الخدمة في جميع الصفحات
    initServiceRequestButtons();

    // تفعيل زر إغلاق النافذة
    initModalClose();

    // معالجة نموذج طلب الخدمة
    initServiceRequestForm();

    // معالجة الأسئلة الشائعة إذا كانت موجودة
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // إصلاح: إغلاق جميع العناصر أولاً ثم فتح المختار
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('open')) {
                            otherItem.classList.remove('open');
                        }
                    });
                    item.classList.toggle('open');
                });
            }
        });
    }

    // تفعيل النافذة المنبثقة تلقائيًا بعد 30 ثانية (اختياري - معطل حالياً)
    // setTimeout(() => {
    //     if (!document.cookie.includes('serviceModalShown=true')) {
    //         openServiceRequestModal();
    //         document.cookie = 'serviceModalShown=true; max-age=86400; path=/';
    //     }
    // }, 30000);
});

/**
 * تفعيل زر طلب الخدمة في جميع الصفحات
 */
function initServiceRequestButtons() {
    // تحديد جميع أزرار طلب الخدمة
    const serviceRequestBtns = document.querySelectorAll(
        '.btn-service-request, ' +
        '#serviceRequestBtn, ' +
        '.btn-primary[href="#contact"], ' +
        '.btn[href="#contact"], ' +
        '#sidebarServiceRequest'
    );

    serviceRequestBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openServiceRequestModal();

            // تعيين نوع الخدمة تلقائيًا إذا كان الزر في صفحة خدمة محددة
            const serviceTypeSelect = document.querySelector('#serviceRequestForm select[name="serviceType"]');
            const serviceTypeInput = document.querySelector('#serviceRequestForm input[name="serviceType"]');

            if (serviceTypeSelect) {
                const pageTitle = document.title;
                if (pageTitle.includes('التخليص الجمركي')) {
                    serviceTypeSelect.value = 'customs';
                } else if (pageTitle.includes('سابر')) {
                    serviceTypeSelect.value = 'saber';
                } else if (pageTitle.includes('النقل')) {
                    serviceTypeSelect.value = 'transport';
                } else if (pageTitle.includes('الشحن الدولي')) {
                    serviceTypeSelect.value = 'shipping';
                } else if (pageTitle.includes('الخدمات اللوجستية')) {
                    serviceTypeSelect.value = 'logistics';
                } else if (pageTitle.includes('المعارض والفعاليات')) {
                    serviceTypeSelect.value = 'exhibitions';
                } else if (pageTitle.includes('التعبئة والتغليف')) {
                    serviceTypeSelect.value = 'packaging';
                }
            }

            if (serviceTypeInput) {
                const currentPage = window.location.pathname.split('/').pop();
                if (currentPage.includes('customs-clearance')) {
                    serviceTypeInput.value = 'customs';
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
            }
        });
    });
}

/**
 * تفعيل زر إغلاق النافذة المنبثقة
 */
function initModalClose() {
    const modal = document.getElementById('serviceRequestModal');
    if (!modal) return;

    // زر إغلاق النافذة
    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // إغلاق عند النقر خارج النافذة وليس فوق الـ modal-content
    modal.addEventListener('mousedown', function(e) {
        // تأكد أن النقر كان خارج محتوى المودال وليس داخله
        const content = modal.querySelector('.modal-content');
        if (e.target === modal && (!content || !content.contains(e.target))) {
            closeModal();
        }
    });

    // إغلاق باستخدام زر ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * تفعيل نموذج طلب الخدمة
 */
function initServiceRequestForm() {
    const form = document.getElementById('serviceRequestForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors(); // إصلاح: مسح جميع الأخطاء عند محاولة الإرسال الجديدة
        handleFormSubmission();
    });

    // إضافة تأثيرات للحقول
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#5458a2';
            this.style.boxShadow = '0 0 0 2px rgba(84, 88, 162, 0.2)';
        });

        input.addEventListener('blur', function() {
            // إصلاح: لا تعيد الحقل إلى border الملون لو فيه خطأ
            if (!this.parentElement.querySelector('.error-message')) {
                this.style.borderColor = '#e2e8f0';
            }
            this.style.boxShadow = 'none';
        });

        // إزالة الخطأ عند الكتابة أو التغيير
        input.addEventListener('input', function() {
            clearError(this);
        });
        if (input.tagName === 'SELECT' || input.tagName === 'TEXTAREA') {
            input.addEventListener('change', function() {
                clearError(this);
            });
        }
    });
}

/**
 * فتح النافذة المنبثقة
 */
function openServiceRequestModal() {
    const modal = document.getElementById('serviceRequestModal');
    const modalOverlay = document.querySelector('.modal-overlay') || createModalOverlay();

    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        document.body.style.overflow = 'hidden';

        // تعيين نوع الخدمة تلقائيًا إذا كان في صفحة خدمة محددة
        const serviceTypeSelect = document.querySelector('#serviceRequestForm select[name="serviceType"]');
        const serviceTypeInput = document.querySelector('#serviceRequestForm input[name="serviceType"]');

        if (serviceTypeSelect) {
            const pageTitle = document.title;
            if (pageTitle.includes('التخليص الجمركي')) {
                serviceTypeSelect.value = 'customs';
            } else if (pageTitle.includes('النقل')) {
                serviceTypeSelect.value = 'transport';
            } else if (pageTitle.includes('الشحن الدولي')) {
                serviceTypeSelect.value = 'shipping';
            } else if (pageTitle.includes('الخدمات اللوجستية')) {
                serviceTypeSelect.value = 'logistics';
            } else if (pageTitle.includes('المعارض والفعاليات')) {
                serviceTypeSelect.value = 'exhibitions';
            } else if (pageTitle.includes('التعبئة والتغليف')) {
                serviceTypeSelect.value = 'packaging';
            }
        }

        if (serviceTypeInput) {
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
        }

        // إصلاح: إضافة ترانزشن الشكل المبدئي
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
    }

    if (modalOverlay) {
        modalOverlay.classList.add('active');
    }
}

/**
 * إغلاق النافذة المنبثقة
 */
function closeModal() {
    const modal = document.getElementById('serviceRequestModal');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';

        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = '';

            // إعادة تعيين النموذج
            const form = document.getElementById('serviceRequestForm');
            if (form) {
                form.reset();
                clearAllErrors();
            }
        }, 300);
    }

    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
}

/**
 * إنشاء طبقة خلفية إذا لم تكن موجودة
 */
function createModalOverlay() {
    let overlay = document.querySelector('.modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
    }
    return overlay;
}

/**
 * معالجة إرسال النموذج
 */
function handleFormSubmission() {
    const form = document.getElementById('serviceRequestForm');
    if (!form) return;

    // التحقق من الحقول
    const serviceTypeField = form.querySelector('[name="serviceType"]');
    const serviceType = serviceTypeField?.value;
    const fullNameField = form.querySelector('[name="fullName"]');
    const fullName = fullNameField?.value.trim();
    const phoneNumberField = form.querySelector('[name="phoneNumber"]');
    const phoneNumber = phoneNumberField?.value.trim();
    const emailField = form.querySelector('[name="email"]');
    const email = emailField?.value.trim();

    let isValid = true;

    if (serviceTypeField && !serviceType) {
        showError(serviceTypeField, 'الرجاء اختيار نوع الخدمة');
        isValid = false;
    }

    if (fullNameField && !fullName) {
        showError(fullNameField, 'الرجاء إدخال الاسم الكامل');
        isValid = false;
    }

    if (phoneNumberField && !phoneNumber) {
        showError(phoneNumberField, 'الرجاء إدخال رقم الهاتف');
        isValid = false;
    } else if (phoneNumberField && !validatePhone(phoneNumber)) {
        showError(phoneNumberField, 'الرجاء إدخال رقم هاتف صحيح');
        isValid = false;
    }

    if (emailField && !email) {
        showError(emailField, 'الرجاء إدخال البريد الإلكتروني');
        isValid = false;
    } else if (emailField && !validateEmail(email)) {
        showError(emailField, 'الرجاء إدخال بريد إلكتروني صحيح');
        isValid = false;
    }

    if (!isValid) return;

    // محاكاة إرسال النموذج
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';
    }

    setTimeout(function() {
        showSuccessMessage('تم إرسال طلبك بنجاح! سيقوم فريقنا بالاتصال بك خلال 24 ساعة.');
        closeModal();

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'إرسال الطلب';
        }
    }, 1500);
}

/**
 * دالة عرض الخطأ
 */
function showError(field, message) {
    if (!field) return;
    // إزالة أي رسائل خطأ سابقة
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // إضافة رسالة الخطأ الجديدة
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    errorElement.style.textAlign = 'right';
    errorElement.style.direction = 'rtl';

    field.style.borderColor = '#ef4444';
    field.parentElement.appendChild(errorElement);

    // إضافة حركة اهتزاز
    field.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

/**
 * دالة إزالة الخطأ
 */
function clearError(field) {
    if (!field) return;
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    // إصلاح: لا تزيل border-color إذا الخطأ موجود فقط
    if (!field.parentElement.querySelector('.error-message')) {
        field.style.borderColor = '';
    }
    field.style.animation = '';
}

/**
 * دالة إزالة جميع الأخطاء
 */
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());

    const errorFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    errorFields.forEach(field => {
        field.style.borderColor = '';
        field.style.animation = '';
    });
}

/**
 * دالة التحقق من البريد الإلكتروني
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * دالة التحقق من رقم الهاتف
 */
function validatePhone(phone) {
    // قبول الأرقام السعودية والدولية
    const re = /^(\+?\d{1,3}[- ]?)?\d{10,15}$/;
    return re.test(phone);
}

/**
 * دالة عرض رسالة نجاح
 */
function showSuccessMessage(message) {
    // إنشاء عنصر الرسالة
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
    messageElement.style.direction = 'rtl';
    messageElement.style.fontFamily = 'inherit';
    messageElement.style.fontSize = '16px';
    messageElement.style.fontWeight = '600';

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

// إضافة أنماط لرسائل الخطأ والتأثيرات
const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #ef4444;
        font-size: 14px;
        margin-top: 5px;
        text-align: right;
        direction: rtl;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .shake {
        animation: shake 0.5s ease;
    }

    .success-message {
        font-family: inherit;
        font-size: 16px;
        font-weight: 600;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .modal-overlay.active {
        opacity: 1;
        pointer-events: auto;
    }

    #serviceRequestModal.active {
        display: flex;
        opacity: 1;
        visibility: visible;
    }

    #serviceRequestModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #serviceRequestModal .modal-content {
        background: white;
        padding: 30px;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    #serviceRequestModal .close-btn {
        position: absolute;
        top: 15px;
        left: 15px;
        font-size: 24px;
        cursor: pointer;
        color: #64748b;
        transition: color 0.3s;
    }

    #serviceRequestModal .close-btn:hover {
        color: #1e293b;
    }

    #serviceRequestModal h2 {
        text-align: center;
        margin-bottom: 25px;
        color: #1e293b;
        font-size: 24px;
    }

    #serviceRequestModal .form-group {
        margin-bottom: 20px;
    }

    #serviceRequestModal label {
        display: block;
        margin-bottom: 8px;
        color: #475569;
        font-weight: 600;
    }

    #serviceRequestModal input,
    #serviceRequestModal select,
    #serviceRequestModal textarea {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
    }

    #serviceRequestModal input:focus,
    #serviceRequestModal select:focus,
    #serviceRequestModal textarea:focus {
        border-color: #5458a2;
        box-shadow: 0 0 0 2px rgba(84, 88, 162, 0.2);
    }

    #serviceRequestModal textarea {
        min-height: 120px;
        resize: vertical;
    }

    #serviceRequestModal .btn {
        width: 100%;
        padding: 14px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    @media (max-width: 768px) {
        #serviceRequestModal .modal-content {
            width: 95%;
            padding: 20px;
        }
    }
`;

document.head.appendChild(style);