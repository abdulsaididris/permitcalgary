document.addEventListener('DOMContentLoaded', function () {

    // ─── Create the shared hidden iframe that catches all Web3Forms POSTs ───
    var iframe = document.createElement('iframe');
    iframe.name = 'w3f_frame';
    iframe.id   = 'w3f_frame';
    iframe.style.cssText = 'display:none;width:0;height:0;border:none;position:absolute;';
    document.body.appendChild(iframe);

    // ─── Attach submit handler to every form targeting w3f_frame ────────────
    document.querySelectorAll('form[target="w3f_frame"]').forEach(function (form) {
        var resultDiv = document.getElementById('form-result');
        var btn       = form.querySelector('button[type="submit"]');
        var btnLabel  = btn ? btn.innerText : 'Submit';
        var fired     = false;

        // When iframe loads after a POST → show success
        iframe.addEventListener('load', function () {
            if (!fired) return;
            fired = false;
            if (resultDiv) {
                resultDiv.textContent   = 'Request Received';
                resultDiv.style.cssText = 'display:block;color:#28a745;font-weight:700;font-size:1rem;margin:0 0 1rem;';
            }
            form.reset();
            if (btn) { btn.disabled = false; btn.innerText = btnLabel; }
        });

        form.addEventListener('submit', function () {
            fired = true;
            if (btn) { btn.disabled = true; btn.innerText = 'Sending...'; }
        });
    });

    // ─── Header scroll effect ────────────────────────────────────────────────
    var header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ─── Smooth scroll ───────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ─── Mobile menu ─────────────────────────────────────────────────────────
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

    // ─── Scroll reveal animations ─────────────────────────────────────────────
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .step, .trust-stat').forEach(function (el) {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

});
