document.addEventListener('DOMContentLoaded', function () {

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

    // ─── FAQ Accordion ─────────────────────────────────────────────────────────
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var expanded = this.getAttribute('aria-expanded') === 'true';
            var answerId = this.id.replace('faq-q', 'faq-a');
            var answer   = document.getElementById(answerId);

            // Collapse all open items
            document.querySelectorAll('.faq-question').forEach(function (q) {
                q.setAttribute('aria-expanded', 'false');
            });
            document.querySelectorAll('.faq-answer').forEach(function (a) {
                a.classList.remove('open');
            });

            // Open clicked item if it was closed
            if (!expanded && answer) {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });

});
