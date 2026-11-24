/* Santhosh G - Portfolio Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPEWRITER EFFECT FOR HERO ROLE BOX
  const roleBox = document.getElementById('typewriter-text');
  const roles = [
    "I'M AN AI & FULL STACK DEVELOPER",
    "GENAI & RAG SPECIALIST",
    "B.TECH AD&DS UNDERGRADUATE",
    "JAVA & PYTHON DEVELOPER"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      typeSpeed = 40;
    } else {
      charIndex++;
      typeSpeed = 100;
    }

    if (roleBox) {
      roleBox.textContent = currentRole.substring(0, charIndex) + '|';
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (roleBox) {
    typeEffect();
  }

  // 2. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section, header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. PROJECT FILTER TABS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. RESUME MODAL HANDLER
  const modal = document.getElementById('resumeModal');
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const closeModal = document.querySelector('.close-modal');

  function openResumeModal(e) {
    if (e) e.preventDefault();
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (viewResumeBtn) viewResumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (closeModal) closeModal.addEventListener('click', closeResumeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeResumeModal();
    });
  }

  // 5. CONTACT FORM HANDLER
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const status = document.getElementById('contactStatus');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending Message...`;
      status.textContent = '';
      status.classList.remove('is-error', 'is-success');

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData.entries()))
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Unable to send your message. Please try again.');
        }

        contactForm.reset();
        status.textContent = 'Thank you! Your message has been sent successfully.';
        status.classList.add('is-success');
      } catch (error) {
        status.textContent = error.message || 'Unable to send your message. Please try again.';
        status.classList.add('is-error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
