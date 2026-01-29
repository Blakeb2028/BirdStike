(function () {
  'use strict';

  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  var headerCtas = document.querySelector('.header-ctas');

  // Logo click: smooth scroll to top
  var logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function (e) {
      if (window.location.hash === '' || window.location.hash === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === '#') return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (headerCtas) headerCtas.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Mobile menu toggle
  if (menuToggle && nav && headerCtas) {
    menuToggle.addEventListener('click', function () {
      var open = nav.classList.contains('open');
      nav.classList.toggle('open', !open);
      headerCtas.classList.toggle('open', !open);
      menuToggle.setAttribute('aria-expanded', !open);
    });
  }

  // Form validation before submit
  var form = document.querySelector('.estimate-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var address = form.querySelector('#address');
      var type = form.querySelector('#type');
      var invalid = false;

      [name, email, address, type].forEach(function (el) {
        if (!el) return;
        el.removeAttribute('aria-invalid');
        if (el.hasAttribute('required') && !el.value.trim()) {
          el.setAttribute('aria-invalid', 'true');
          invalid = true;
        }
        if (el.type === 'email' && el.value.trim()) {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(el.value)) {
            el.setAttribute('aria-invalid', 'true');
            invalid = true;
          }
        }
      });

      if (invalid) {
        e.preventDefault();
      }
    });
  }

  // Back to top
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll-in animations
  var animated = document.querySelectorAll('[data-animate]');
  if (animated.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('animated');
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    animated.forEach(function (el) { obs.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add('animated'); });
  }

  // Sticky CTA bar: show when scrolled past hero, hide when contact or footer in view
  var stickyCta = document.getElementById('sticky-cta');
  var hero = document.getElementById('hero');
  var contact = document.getElementById('contact');
  var footer = document.querySelector('.site-footer');
  if (stickyCta && hero) {
    var ticking = false;
    function updateStickyCta() {
      var heroBottom = hero.offsetTop + hero.offsetHeight;
      var pastHero = window.scrollY > heroBottom - 80;
      var contactTop = contact ? contact.getBoundingClientRect().top : Infinity;
      var contactInView = contact && contactTop < window.innerHeight * 0.6;
      var footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      var footerInView = footer && footerTop < window.innerHeight * 0.5;
      var show = pastHero && !contactInView && !footerInView;
      stickyCta.classList.toggle('visible', show);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateStickyCta);
        ticking = true;
      }
    });
    updateStickyCta();
  }
})();
