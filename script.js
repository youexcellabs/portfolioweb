// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('[data-feather]');
    if (icon) {
      icon.setAttribute('data-feather', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
      feather.replace();
    }
  });
}

// Theme toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
function setTheme(mode) {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('theme', mode);
}
function initTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) {
    setTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
}
initTheme();
if (themeToggle) themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});
if (themeToggleMobile) themeToggleMobile.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// Scroll progress bar
const progressBar = document.getElementById('progress');
const onScroll = () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if (progressBar) progressBar.style.width = `${scrolled}%`;
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Case study modals
document.querySelectorAll('.case-study-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-case');
    const panel = document.getElementById(id);
    if (panel) panel.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});
document.querySelectorAll('.case-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const panel = e.currentTarget.closest('.fixed');
    if (panel) {
      panel.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
});
// Close on backdrop click or ESC
document.querySelectorAll('[id^="case"]').forEach(panel => {
  panel.addEventListener('click', (e) => {
    if (e.target === panel) {
      panel.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('[id^="case"]').forEach(panel => {
      if (!panel.classList.contains('hidden')) {
        panel.classList.add('hidden');
      }
    });
    document.body.style.overflow = '';
  }
});

// Testimonials slider
const track = document.getElementById('testimonialTrack');
const slides = track ? Array.from(track.children) : [];
const prev = document.getElementById('prevSlide');
const prev2 = document.getElementById('prevSlide2');
const next = document.getElementById('nextSlide');
const next2 = document.getElementById('nextSlide2');
const dots = Array.from(document.querySelectorAll('.dot'));
let index = 0;
let autoTimer = null;

function updateSlider() {
  if (!track || slides.length === 0) return;
  const offset = -index * track.clientWidth;
  track.style.transform = `translateX(${offset}px)`;
  dots.forEach((d, i) => {
    d.classList.toggle('bg-slate-700', i === index);
    d.classList.toggle('dark:bg-slate-300', i === index);
  });
}

function goTo(i) {
  index = (i + slides.length) % slides.length;
  updateSlider();
}

function nextSlide() {
  goTo(index + 1);
}
function prevSlide() {
  goTo(index - 1);
}

if (next && next2) next.addEventListener('click', nextSlide);
if (next2) next2.addEventListener('click', nextSlide);
if (prev && prev2) prev.addEventListener('click', prevSlide);
if (prev2) prev2.addEventListener('click', prevSlide);

dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.getAttribute('data-index'), 10))));

function startAuto() {
  stopAuto();
  autoTimer = setInterval(() => nextSlide(), 6000);
}
function stopAuto() {
  if (autoTimer) clearInterval(autoTimer);
}
if (track) {
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  startAuto();
  window.addEventListener('resize', updateSlider);
}

// Form handling
const form = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    // simple validation
    if (!payload.name || !payload.email || !payload.message) {
      showStatus('Please fill in the required fields.', 'error');
      return;
    }

    // Simulate async submit
    showStatus('Sending...', 'info');
    setTimeout(() => {
      showStatus('Thanks! Your request has been received. We will get back to you shortly.', 'success');
      form.reset();
    }, 1200);
  });
}

function showStatus(message, type) {
  if (!formStatus) return;
  formStatus.classList.remove('hidden', 'text-emerald-600', 'text-rose-600', 'text-slate-700');
  formStatus.textContent = message;
  if (type === 'success') formStatus.classList.add('text-emerald-600');
  if (type === 'error') formStatus.classList.add('text-rose-600');
  if (type === 'info') formStatus.classList.add('text-slate-700');
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();