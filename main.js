const slider = document.querySelector('.testimonial-slider');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// Detect exact width of one testimonial
function getSlideWidth() {
  const card = slider.querySelector('.testimonial-card');
  return card ? card.getBoundingClientRect().width : 300;
}

nextBtn.addEventListener('click', () => {
  slider.scrollBy({
    left: getSlideWidth(),
    behavior: "smooth"
  });
});

prevBtn.addEventListener('click', () => {
  slider.scrollBy({
    left: -getSlideWidth(),
    behavior: "smooth"
  });
});

// Scroll animation
const animatedItems = document.querySelectorAll('.animate-on-scroll');
const observer = new  IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.15}
);

animatedItems.forEach(item => observer.observe(item));