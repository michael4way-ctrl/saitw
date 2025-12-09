// Анимация при прокрутке
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Отправка формы
const form = document.getElementById('futures-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Спасибо! Ваш фьючерс на клубнику забронирован. Мы свяжемся с вами в ближайшее время.');
    form.reset();
  });
}