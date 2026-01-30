// ===== QR Code Generation & Modal Management =====

// Configuration - URL permanente du CV Web
const CV_URL = 'https://ghita-k.github.io/CV-WEB_-Ghita-EL-KADIRI/';
let qrCodeGenerated = false;

// Initialize QR Code
function initQRCode() {
    if (qrCodeGenerated) return;
    
    const qrcodeContainer = document.getElementById('qrcode');
    const qrUrlElement = document.querySelector('.qr-url');
    
    if (qrcodeContainer) {
        // Clear any existing content
        qrcodeContainer.innerHTML = '';
        
        // Generate QR Code
        new QRCode(qrcodeContainer, {
            text: CV_URL,
            width: 200,
            height: 200,
            colorDark: "#1e3a5f",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        qrCodeGenerated = true;
        
        // Display URL
        if (qrUrlElement) {
            qrUrlElement.textContent = CV_URL;
        }
    }
}

// Open QR Modal
function openQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Generate QR code on first open
        setTimeout(initQRCode, 100);
    }
}

// Close QR Modal
function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modal button
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQRModal);
    }
    
    // Close modal on outside click
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeQRModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQRModal();
        }
    });
    
    // Animate elements on scroll
    initScrollAnimations();
    
    // Animate skill bars
    animateLanguageBars();
});

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section, .education-card, .cert-card, .timeline-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add animate-in styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ===== Language Bars Animation =====
function animateLanguageBars() {
    const languageBars = document.querySelectorAll('.language-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    languageBars.forEach(bar => observer.observe(bar));
}

// ===== Smooth Scroll for Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Skills Hover Effect =====
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Print Functionality =====
function printCV() {
    window.print();
}

// ===== Download as PDF (requires html2pdf library) =====
function downloadPDF() {
    if (typeof html2pdf !== 'undefined') {
        const element = document.querySelector('.cv-container');
        const opt = {
            margin: 10,
            filename: 'CV_Ghita_EL_KADIRI.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    } else {
        console.warn('html2pdf library not loaded. Using browser print instead.');
        window.print();
    }
}

// ===== Typing Effect for Title (Optional Enhancement) =====
function initTypingEffect() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            titleElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeChar, 500);
}

// Uncomment to enable typing effect:
// document.addEventListener('DOMContentLoaded', initTypingEffect);

// ===== Dark Mode Toggle (Optional) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

console.log('CV Web - Ghita EL KADIRI - Loaded successfully!');
console.log('QR Code will be generated when modal opens.');
