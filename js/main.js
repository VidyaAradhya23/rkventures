document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // NAVIGATION & MOBILE MENU
  // ==========================================
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // ==========================================
  // DYNAMIC ACTIVE NAV LINK BY PAGE
  // ==========================================
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || 'index.html';
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, no need to track it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================
  // TESTIMONIAL SLIDER
  // ==========================================
  const testimonialTrack = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const indicatorContainer = document.querySelector('.testimonial-indicator');
  
  if (testimonialTrack && slides.length > 0) {
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayTimer;

    // Create Dots dynamically
    indicatorContainer.innerHTML = '';
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('indicator-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      indicatorContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.indicator-dot');

    function updateSlider() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
      resetAutoPlay();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
    }

    function startAutoPlay() {
      autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    }

    // Initialize
    startAutoPlay();
  }

  // ==========================================
  // ENERGY PAGE: SPECIFICATION TABLES TOGGLE
  // ==========================================
  const specBtns = document.querySelectorAll('.product-spec-btn');
  specBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parentCard = e.target.closest('.product-card');
      const table = parentCard.querySelector('.specs-table');
      if (table) {
        table.classList.toggle('show');
        if (table.classList.contains('show')) {
          e.target.innerHTML = 'Hide Technical Specs <span>▲</span>';
        } else {
          e.target.innerHTML = 'View Technical Specs <span>▼</span>';
        }
      }
    });
  });

  // ==========================================
  // CONSTRUCTION PAGE: GALLERY FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || itemCategory === filterValue) {
            // Show Item
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            // Hide Item
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400); // match transition speed
          }
        });
      });
    });
  }

  // ==========================================
  // ENQUIRY FORM SUBMISSION & WHATSAPP REDIRECT
  // ==========================================
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccess = document.querySelector('.form-success-overlay');
  
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const divisionSelect = document.getElementById('division');
      const divisionName = divisionSelect ? divisionSelect.options[divisionSelect.selectedIndex].text : 'General Enquiry';
      const details = document.getElementById('details').value.trim();

      // Simple Validation check
      if (!name || !phone || !email) {
        alert('Please fill out all required fields.');
        return;
      }

      // Show animated success overlay
      if (formSuccess) {
        formSuccess.classList.add('active');
        
        // Auto-close success overlay after 6 seconds
        setTimeout(() => {
          formSuccess.classList.remove('active');
          enquiryForm.reset();
        }, 6000);
      }

      // Optional: Generate WhatsApp Redirect URL
      const whatsappBase = "https://wa.me/919876543210"; // Placeholder RK Ventures phone number
      const formattedMessage = `Hello RK Ventures,\n\nI have submitted an enquiry on your website.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Division:* ${divisionName}\n*Requirements:* ${details}`;
      const encodedMsg = encodeURIComponent(formattedMessage);
      
      console.log("Form submitted. Mock sending details...");
      console.log(formattedMessage);
    });
  }

  // Quick Action Buttons click logs or custom alerts
  const quickEnquiry = document.querySelector('.float-enquiry');
  if (quickEnquiry) {
    quickEnquiry.addEventListener('click', () => {
      // Smooth scroll to the contact/enquiry section
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'contact.html';
      }
    });
  }

  // Dynamic WhatsApp Float Button link based on context
  const whatsappFloat = document.querySelector('.float-whatsapp');
  if (whatsappFloat) {
    let presetText = "Hi RK Ventures, I'm visiting your website and would like to enquire about your services.";
    if (pageName === 'energy.html') {
      presetText = "Hi RK Ventures, I'm interested in PURE Power Energy Storage systems and battery technology.";
    } else if (pageName === 'construction.html') {
      presetText = "Hi RK Ventures, I'm interested in your Construction and Interior Designing services.";
    }
    whatsappFloat.setAttribute('href', `https://wa.me/919876543210?text=${encodeURIComponent(presetText)}`);
    whatsappFloat.setAttribute('target', '_blank');
  }

});
