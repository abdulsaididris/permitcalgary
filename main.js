document.addEventListener('DOMContentLoaded', function () {

    // ─── Header scroll effect ───────────────────────────
    var header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ─── Smooth scroll ─────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ─── Web3Forms via hidden iframe ────────────────────
    // This technique uses a native HTML form POST (always allowed by browsers,
    // even on file://) and catches the response in a hidden iframe so the
    // page never navigates away. On success it shows the green message.
    document.querySelectorAll('form').forEach(function (form) {
        var resultDiv = form.querySelector('#form-result');
        if (!resultDiv) return;

        var btn = form.querySelector('button[type="submit"]');
        var btnOriginal = btn ? btn.innerText : 'Submit';

        // Build unique iframe
        var iframeName = 'w3f_iframe_' + Date.now();
        var iframe = document.createElement('iframe');
        iframe.name    = iframeName;
        iframe.id      = iframeName;
        iframe.style.cssText = 'display:none;width:0;height:0;border:none;';
        document.body.appendChild(iframe);

        // Wire form to post into the hidden iframe
        form.setAttribute('action', 'https://api.web3forms.com/submit');
        form.setAttribute('method', 'POST');
        form.setAttribute('target', iframeName);

        var submitted = false;

        // When iframe loads after form POST → show success
        iframe.addEventListener('load', function () {
            if (!submitted) return; // ignore the initial empty load
            resultDiv.textContent    = 'Request Received';
            resultDiv.style.cssText  = 'display:block;color:#28a745;font-weight:700;font-size:1rem;margin-bottom:1rem;';
            form.reset();
            if (btn) { btn.disabled = false; btn.innerText = btnOriginal; }
        });

        // On submit: flag it and show "Sending..." — do NOT preventDefault
        form.addEventListener('submit', function () {
            submitted = true;
            if (btn) { btn.disabled = true; btn.innerText = 'Sending...'; }
        });
    });

    // ─── Mobile menu ───────────────────────────────────
    var toggle = document.querySelector('.mobile-toggle');
    var nav    = document.querySelector('.nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        document.querySelectorAll('.nav a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
                toggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ─── Scroll reveal ─────────────────────────────────
    var revealEls = document.querySelectorAll('.service-card, .step, .trust-stat');
    var observer  = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

});
