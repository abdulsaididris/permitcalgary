document.addEventListener('DOMContentLoaded', function () {

    // ─── Header scroll effect ────────────────────────────
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ─── Smooth scroll ────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ─── Web3Forms Submission ─────────────────────────
    // Works on HTTPS (Netlify). On local file:// browsers block fetch — 
    // deploy to Netlify to fully verify.
    const W3F_KEY = '469313db-e21e-45e9-bea5-107ae2c0be44';

    document.querySelectorAll('form').forEach(function (form) {
        var resultDiv = form.querySelector('#form-result');
        if (!resultDiv) return; // skip forms without a result container

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var btn = form.querySelector('button[type="submit"]');
            var btnText = btn ? btn.innerText : '';
            if (btn) { btn.disabled = true; btn.innerText = 'Sending...'; }

            // Build JSON payload
            var data = {};
            new FormData(form).forEach(function (val, key) { data[key] = val; });
            data['access_key'] = W3F_KEY;

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function (res) { return res.json(); })
            .then(function (json) {
                if (json.success) {
                    resultDiv.textContent = 'Request Received';
                    resultDiv.style.cssText = 'display:block;color:#28a745;font-weight:700;font-size:1rem;margin-bottom:1rem;';
                    form.reset();
                } else {
                    resultDiv.textContent = json.message || 'Something went wrong.';
                    resultDiv.style.cssText = 'display:block;color:#dc3545;font-weight:600;margin-bottom:1rem;';
                }
            })
            .catch(function () {
                resultDiv.textContent = 'Could not send. Please email a.said@lagroupofcompanies.ca directly.';
                resultDiv.style.cssText = 'display:block;color:#dc3545;font-weight:600;margin-bottom:1rem;';
            })
            .finally(function () {
                if (btn) { btn.disabled = false; btn.innerText = btnText; }
            });
        });
    });

    // ─── Mobile menu ──────────────────────────────────
    var mobileToggle = document.querySelector('.mobile-toggle');
    var nav = document.querySelector('.nav');
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        document.querySelectorAll('.nav a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ─── Scroll reveal animations ─────────────────────
    var revealEls = document.querySelectorAll('.service-card, .step, .trust-stat');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

});
