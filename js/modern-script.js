/* ============================================
   MODERN PORTFOLIO - JAVASCRIPT
   ============================================ */

// DOM Elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile Menu Toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Scroll Spy for Active Links
const observerOptions = {
  threshold: 0.3,
  rootMargin: "-70px 0px -50% 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section[id]").forEach((section) => {
  observer.observe(section);
});

// Fade In Animation on Scroll
const fadeInElements = document.querySelectorAll(
  "section, .project-card, .education-item, .skill-category",
);

const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

fadeInElements.forEach((element) => {
  element.classList.add("fade-in");
  fadeInObserver.observe(element);
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");
const aboutSection = document.getElementById("about");

if (backToTopButton && aboutSection) {
  // Use Intersection Observer to show button when About section is visible
  const buttonObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Show button when About section or any section below it comes into view
        if (entry.target.id === "about") {
          if (
            entry.isIntersecting ||
            window.scrollY > aboutSection.offsetTop - 100
          ) {
            backToTopButton.classList.add("visible");
          } else {
            backToTopButton.classList.remove("visible");
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-50px",
    },
  );

  buttonObserver.observe(aboutSection);

  // Also listen to scroll to ensure button stays visible when scrolling past About section
  window.addEventListener("scroll", () => {
    if (window.scrollY > aboutSection.offsetTop - 200) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });
}

// Smooth scroll is already handled by the smooth scroll anchor event listener above

// Animate numbers on scroll (if needed in future)
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerText = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Prevent navbar menu from closing on form inputs
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-menu") && !e.target.closest(".nav-toggle")) {
    if (window.innerWidth <= 768) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
});

// Add loading animation to images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", () => {
    img.style.opacity = "1";
  });
});

// Keyboard Accessibility
navLinks.forEach((link) => {
  link.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      link.click();
    }
  });
});

// Close mobile menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Performance: Debounce scroll events
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Scroll animations handled by intersection observer
        ticking = false;
      });
      ticking = true;
    }
  },
  false,
);

console.log("Modern Portfolio Script Loaded");
