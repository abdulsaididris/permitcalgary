document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const heroQuoteForm = document.getElementById('hero-quote-form');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Web3Forms Multi-Form Handler
    const web3Forms = document.querySelectorAll('form[action*="web3forms.com"]');
    
    web3Forms.forEach(form => {
        const result = form.querySelector('#form-result');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = "Processing...";

            const isLocal = window.location.protocol === 'file:';

            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        result.innerHTML = "Your request has been received, we will get back to shortly. Thanks";
                        result.style.color = "#28a745"; 
                        result.style.display = "block";
                        result.style.marginBottom = "1rem";
                        result.style.fontWeight = "600";
                        form.reset();
                    } else {
                        result.innerHTML = json.message || "Submission failed.";
                        result.style.color = "#dc3545";
                        result.style.display = "block";
                    }
                })
                .catch(error => {
                    console.warn('AJAX Blocked (likely local file). Falling back to standard submission.');
                    // FAIL-SAFE: If AJAX is blocked, submit the form natively.
                    form.submit(); 
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                });
        });
    });

    // Mobile menu toggle (simple version)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Add intersection observer for reveal animations
    const revealElements = document.querySelectorAll('.service-card, .step, .trust-stat');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });
});
