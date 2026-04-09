/* Christian Connell — small enhancements only */
(() => {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky nav background
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal-on-scroll — mark key blocks
  const revealTargets = document.querySelectorAll(
    ".section__head, .about__copy, .about__card, .venture, .athletics__title, .athletics__lede, .athletics__rows, .pull, .skills__col, .contact__title, .contact__lede, .contact__links"
  );
  revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // Smooth-scroll for in-page anchors (respects reduced motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    });
  });
})();
