document.addEventListener('DOMContentLoaded', function() {
    // EmailJS initialization
    (function() {
        // TODO: Replace with your actual EmailJS credentials from https://www.emailjs.com/
        emailjs.init("h0tnxkL2ZIBDGlIQy"); // Replace with your Public Key
    })();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
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

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .product-card, .service-card').forEach(el => {
        observer.observe(el);
    });

    // Toast notification functions
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        const toastIcon = toast.querySelector('.toast-icon i');
        const toastTitle = toast.querySelector('.toast-title');
        
        toastMessage.textContent = message;
        
        if (isError) {
            toast.classList.add('error');
            toastTitle.textContent = 'Error!';
            toastIcon.className = 'fas fa-exclamation-circle';
        } else {
            toast.classList.remove('error');
            toastTitle.textContent = 'Success!';
            toastIcon.className = 'fas fa-check-circle';
        }
        
        toast.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            hideToast();
        }, 5000);
    }

    function hideToast() {
        const toast = document.getElementById('toast');
        toast.classList.remove('show');
    }

    // Contact Form Submission using EmailJS
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                product: document.getElementById('product').value,
                message: document.getElementById('message').value
            };

            // Change button to loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            // TODO: Replace 'service_s43ydeg' and 'template_yz6g90k' with your actual EmailJS values
            emailjs.send('service_s43ydeg', 'template_yz6g90k', formData)
                .then(function(response) {
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;

                    // Show success toast notification
                    showToast('Thank you! Your message has been sent successfully. We will get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;

                    // Show error toast notification
                    showToast('Sorry, there was an error sending your message. Please try again or contact us directly.', true);
                    console.error('Error:', error);
                });
        });
    }
});
