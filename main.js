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

    // Web3Forms - iframe technique (works locally AND on server)
    const web3Forms = document.querySelectorAll('form[action*="web3forms.com"]');

    web3Forms.forEach(form => {
        const result = form.querySelector('#form-result');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerText : 'Submit';

        // Create a hidden iframe to capture the form POST response
        const iframeName = 'web3forms_iframe_' + Math.random().toString(36).substr(2, 9);
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Point form to the hidden iframe (native POST - works on file://)
        form.setAttribute('target', iframeName);

        // When iframe loads (i.e. form was submitted), show success
        let submitted = false;
        iframe.addEventListener('load', function() {
            if (!submitted) return; // ignore initial empty load
            // Show green success message
            result.innerHTML = 'Request Received';
            result.style.color = '#28a745';
            result.style.fontWeight = '700';
            result.style.fontSize = '1rem';
            result.style.display = 'block';
            result.style.marginBottom = '1rem';
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }
        });

        form.addEventListener('submit', function(e) {
            submitted = true;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
            }
            // Allow the native form POST to proceed into the iframe
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
