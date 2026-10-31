// ###############################
// Témoignages
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// auto
setInterval(nextSlide, 5000);

// init
showSlide(index);


// ###############################
// FAQ
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("active");
        faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        faqItem.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});



// ###############################
// Transformations clients

(() => {
  function initTransformations() {
    const section = document.querySelector(".transformations");
    if (!section) return;

    const cards = section.querySelectorAll(".transformation-card");
    const previous = section.querySelector(".transformations-prev");
    const next = section.querySelector(".transformations-next");

    if (!cards.length || !previous || !next) return;

    let currentIndex = 0;
    let timer;

    function showCard(newIndex) {
      currentIndex = (newIndex + cards.length) % cards.length;

      cards.forEach((card, index) => {
        const isActive = index === currentIndex;

        card.classList.toggle("active", isActive);
        card.hidden = !isActive;
      });
    }

    function startTimer() {
      clearInterval(timer);

      if (cards.length > 1) {
        timer = setInterval(() => {
          showCard(currentIndex + 1);
        }, 5000);
      }
    }

    previous.addEventListener("click", () => {
      showCard(currentIndex - 1);
      startTimer();
    });

    next.addEventListener("click", () => {
      showCard(currentIndex + 1);
      startTimer();
    });

    previous.hidden = cards.length < 2;
    next.hidden = cards.length < 2;

    showCard(0);
    startTimer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTransformations);
  } else {
    initTransformations();
  }
})();