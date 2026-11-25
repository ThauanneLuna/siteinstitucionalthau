// Revelar ao rolar
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// Galeria (troca de imagem, se usada)
function switchImg(imgId, thumb, src) {
  const img = document.getElementById(imgId);
  if (!img) return;
  img.src = src;
  const container = thumb.closest('.galeria-thumbs');
  if (!container) return;
  container.querySelectorAll('.galeria-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// Voltar ao topo
const backToTop = document.getElementById('backToTop');
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Menu: destaca a seção atual e mostra o botão de topo
const navLinks = [...document.querySelectorAll('.nav-links a')];
function onScroll() {
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  let current = navLinks[0];
  navLinks.forEach(a => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target && target.getBoundingClientRect().top <= 140) current = a;
  });
  navLinks.forEach(a => a.classList.toggle('active', a === current));
  // no celular, mantém o link ativo visível dentro do menu rolável
  const box = current && current.parentElement;
  if (box && box.scrollWidth > box.clientWidth) {
    box.scrollLeft = current.offsetLeft - (box.clientWidth - current.offsetWidth) / 2;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
