document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // SIGNATURE SPLIT HERO HOVER LOGIC
  // ==========================================
  const heroSplit = document.querySelector('.hero-split');
  const panelLeft = document.querySelector('.hero-split-left');
  const panelRight = document.querySelector('.hero-split-right');

  if (heroSplit && panelLeft && panelRight) {
    panelLeft.addEventListener('mouseenter', () => {
      heroSplit.classList.add('hover-left');
      heroSplit.classList.remove('hover-right');
    });
    panelLeft.addEventListener('mouseleave', () => {
      heroSplit.classList.remove('hover-left');
    });

    panelRight.addEventListener('mouseenter', () => {
      heroSplit.classList.add('hover-right');
      heroSplit.classList.remove('hover-left');
    });
    panelRight.addEventListener('mouseleave', () => {
      heroSplit.classList.remove('hover-right');
    });
  }

  // ==========================================
  // PULSING TEAL CIRCUITS CANVAS ANIMATION
  // ==========================================
  const canvas = document.getElementById('circuitCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = panelLeft.offsetWidth);
    let height = (canvas.height = panelLeft.offsetHeight);

    // Track panel size on window resize
    window.addEventListener('resize', () => {
      if (panelLeft) {
        width = canvas.width = panelLeft.offsetWidth;
        height = canvas.height = panelLeft.offsetHeight;
      }
    });

    // Define circuit points and pathways
    const nodes = [];
    const nodeCount = 15;
    const paths = [];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 2,
        pulseVal: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: 'rgba(0, 212, 180, ' + (Math.random() * 0.4 + 0.3) + ')'
      });
    }

    // Connect nodes with orthogonal pathways (circuits style)
    for (let i = 0; i < nodes.length; i++) {
      const targetCount = Math.floor(Math.random() * 2) + 1;
      for (let t = 0; t < targetCount; t++) {
        const targetIdx = Math.floor(Math.random() * nodes.length);
        if (targetIdx !== i) {
          paths.push({
            start: nodes[i],
            end: nodes[targetIdx],
            progress: Math.random(),
            speed: Math.random() * 0.005 + 0.002
          });
        }
      }
    }

    // Draw and animate
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines (subtle teal)
      ctx.strokeStyle = 'rgba(0, 212, 180, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw orthogonal connections (circuit tracks)
      ctx.lineWidth = 1.5;
      paths.forEach(p => {
        ctx.strokeStyle = 'rgba(0, 212, 180, 0.06)';
        ctx.beginPath();
        ctx.moveTo(p.start.x, p.start.y);
        
        // Orthogonal corner point (circuit board look)
        const midX = p.start.x + (p.end.x - p.start.x) / 2;
        ctx.lineTo(midX, p.start.y);
        ctx.lineTo(midX, p.end.y);
        ctx.lineTo(p.end.x, p.end.y);
        ctx.stroke();

        // Animate light pulses along tracks
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.speed = Math.random() * 0.005 + 0.002;
        }

        // Draw glowing pulse dot
        let currentX, currentY;
        const totalLength = Math.abs(midX - p.start.x) + Math.abs(p.end.y - p.start.y) + Math.abs(p.end.x - midX);
        const segment1 = Math.abs(midX - p.start.x) / totalLength;
        const segment2 = segment1 + Math.abs(p.end.y - p.start.y) / totalLength;

        if (p.progress < segment1) {
          const t = p.progress / segment1;
          currentX = p.start.x + (midX - p.start.x) * t;
          currentY = p.start.y;
        } else if (p.progress < segment2) {
          const t = (p.progress - segment1) / (segment2 - segment1);
          currentX = midX;
          currentY = p.start.y + (p.end.y - p.start.y) * t;
        } else {
          const t = (p.progress - segment2) / (1 - segment2);
          currentX = midX + (p.end.x - midX) * t;
          currentY = p.end.y;
        }

        ctx.fillStyle = 'rgba(0, 212, 180, 0.8)';
        ctx.shadowColor = 'rgba(0, 212, 180, 0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });

      // Draw and animate nodes
      nodes.forEach(n => {
        n.pulseVal += n.pulseSpeed;
        const glow = Math.sin(n.pulseVal) * 3 + n.radius;
        
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Center solid core
        ctx.fillStyle = '#00D4B4';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

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

  // Close Mobile Menu & handle smooth scrolling highlight
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Active section high-lighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const hrefAttr = link.getAttribute('href');
      if (hrefAttr.includes(current) && current !== '') {
        link.classList.add('active');
      }
      // If we are at the top, highlight home
      if (window.scrollY < 200 && hrefAttr === '#home') {
        link.classList.add('active');
      }
    });
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
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
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

    startAutoPlay();
  }

  // ==========================================
  // ENERGY SPECIFICATION TABLES TOGGLE
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
  // CONSTRUCTION PORTFOLIO GALLERY FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400);
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

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const divisionSelect = document.getElementById('division');
      const divisionName = divisionSelect ? divisionSelect.options[divisionSelect.selectedIndex].text : 'General Enquiry';
      const details = document.getElementById('details').value.trim();

      if (!name || !phone || !email) {
        alert('Please fill out all required fields.');
        return;
      }

      if (formSuccess) {
        formSuccess.classList.add('active');
        
        setTimeout(() => {
          formSuccess.classList.remove('active');
          enquiryForm.reset();
        }, 6000);
      }

      // Format custom message for WhatsApp redirect
      const whatsappBase = "https://wa.me/919876543210";
      const formattedMessage = `Hello RK Ventures,\n\nI have submitted an enquiry on your website.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Division:* ${divisionName}\n*Requirements:* ${details}`;
      const encodedMsg = encodeURIComponent(formattedMessage);
      
      console.log("Form submitted. Details:\n", formattedMessage);
    });
  }

  // Sticky actions click-scrolling
  const quickEnquiry = document.querySelector('.float-enquiry');
  if (quickEnquiry) {
    quickEnquiry.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Float WhatsApp setup
  const whatsappFloat = document.querySelector('.float-whatsapp');
  if (whatsappFloat) {
    const presetText = "Hi RK Ventures, I'm visiting your website and would like to enquire about your BESS batteries and Construction services.";
    whatsappFloat.setAttribute('href', `https://wa.me/919876543210?text=${encodeURIComponent(presetText)}`);
    whatsappFloat.setAttribute('target', '_blank');
  }

  // FAQ Accordion toggles
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

});
