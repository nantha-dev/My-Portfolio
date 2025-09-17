
// ===========================
// STICKY NAVBAR
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  if(window.scrollY>20) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', ()=>{
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click', ()=>{
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// ===========================
// DARK/LIGHT MODE
// ===========================
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  if(document.body.classList.contains('light')){
    document.body.style.background='var(--bg-light)';
    document.body.style.color='var(--text-light)';
    themeToggle.textContent='🌞';
  } else{
    document.body.style.background='var(--bg)';
    document.body.style.color='var(--text)';
    themeToggle.textContent='🌙';
  }
});

// ===========================
// SCROLL SPY / ACTIVE LINK
// ===========================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', ()=>{
  let current = '';
  sections.forEach(sec=>{
    const top = sec.offsetTop - 80;
    const height = sec.offsetHeight;
    if(pageYOffset>=top && pageYOffset<top+height){
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link=>{
    link.classList.remove('active-link');
    if(link.getAttribute('href').includes(current)){
      link.classList.add('active-link');
    }
  });
});

// ===========================
// SEARCH TOGGLE
// ===========================
const searchIcon = document.getElementById('searchIcon');
const navSearch = document.getElementById('navSearch');
searchIcon.addEventListener('click', ()=>{
  navSearch.classList.toggle('active');
  if(navSearch.classList.contains('active')){
    navSearch.querySelector('input').focus();
  }
});

//=====================================
//            HEADER
//======================================

//Typing Animation Script 

    const roles = [
      "Full Stack Developer",
      "App Developer",
      "Data Scientist",
      "Generative AI Engineer"
    ];
    let typingElement = document.getElementById("typing");
    let roleIndex = 0;
    let charIndex = 0;
    let currentRole = "";
    let isDeleting = false;

    function typeEffect() {
      currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex--);
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentRole.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 1500); // pause before deleting
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    document.addEventListener("DOMContentLoaded", typeEffect);

   //-------------------ABOUT----------------------
// ============================
// ABOUT SECTION
// ============================
/* ===========================
   Scroll reveal & progress bar animation
   - Uses IntersectionObserver for performance
   - Elements with data-reveal will fade/slide in
   - .fill elements will animate to width given in data-fill
   =========================== */

const revealElements = document.querySelectorAll('[data-reveal]');
const fills = document.querySelectorAll('.bar .fill');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      // animate fills inside this revealed block (if any)
      const localFills = entry.target.querySelectorAll ? entry.target.querySelectorAll('.bar .fill') : [];
      localFills.forEach(f => {
        const pct = f.getAttribute('data-fill') || '0';
        // small timeout to stagger nicely
        setTimeout(()=> f.style.width = pct + '%', 120);
      });
      // If entry is global document sections like the profile, also animate page-level fills (handles when skills area loaded separately)
      if(entry.target.closest('.content') || entry.target.classList.contains('skills')){
        fills.forEach(f => {
          const pct = f.getAttribute('data-fill') || '0';
          setTimeout(()=> f.style.width = pct + '%', 200);
        });
      }
      // don't unobserve to keep animation visible
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

/* Observe all reveal items */
revealElements.forEach(el => revealObserver.observe(el));

/* Ensure fills that are already in view on load still get animated */
window.addEventListener('load', () => {
  // small delay to let rendering finish
  setTimeout(()=> {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0){
        el.classList.add('visible');
      }
    });
    fills.forEach(f => {
      const pct = f.getAttribute('data-fill') || '0';
      f.style.width = pct + '%';
    });
  }, 150);
});

/* ===========================
   Button interactions (demo)
   - Wire these to your app's logic
   =========================== */
document.getElementById('downloadBtn').addEventListener('click', function(){
  // Demo: Replace with your actual resume file URL
  const resumeURL = '#'; // example: '/assets/YourName_CV.pdf'
  // If you have a real file, uncomment next lines
  // const a = document.createElement('a');
  // a.href = resumeURL;
  // a.download = 'YourName_Resume.pdf';
  // document.body.appendChild(a); a.click(); a.remove();
  alert('Download resume — wire this to your resume file (resumeURL).');
});

document.getElementById('hireBtn').addEventListener('click', function(){
  // Example action: scroll to contact, open modal, or navigate
  alert('Hire Me clicked — connect this to your contact section or contact form.');
});

/* Accessibility: reduce-motion respect */
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if(mediaQuery.matches){
  document.querySelectorAll('.frame, .reveal, .bar .fill').forEach(el => {
    el.style.transition = 'none';
    el.style.animation = 'none';
  });
}

//-------------------SKILL----------------------
// ============================
// SKILLS SECTION
// ============================
const SKILLS = {
  "Frontend":[
    {name:"HTML", level:90},
    {name:"CSS", level:85},
    {name:"JavaScript", level:80},
    {name:"React", level:75}
  ],
  "Backend":[
    {name:"Node.js", level:75},
    {name:"Express", level:70},
    {name:"Python", level:80}
  ],
  "Database":[
    {name:"MongoDB", level:70},
    {name:"MySQL", level:65},
    {name:"PostgreSQL", level:60}
  ],
  "Tools":[
    {name:"Git", level:80},
    {name:"Docker", level:65},
    {name:"VSCode", level:90}
  ],
  "AI/ML":[
    {name:"TensorFlow", level:60},
    {name:"PyTorch", level:55},
    {name:"Scikit-learn", level:65},
    {name:"Generative AI", level:50}
  ]
};

const BADGES = {
  "Frontend":[
    {name:"HTML", icon:"🟧"}, {name:"CSS", icon:"🟦"}, {name:"JavaScript", icon:"🟨"}, {name:"React", icon:"⚛️"}
  ],
  "Backend":[
    {name:"Node.js", icon:"🟩"}, {name:"Express", icon:"🚂"}, {name:"Python", icon:"🐍"}
  ],
  "Database":[
    {name:"MongoDB", icon:"🍃"}, {name:"MySQL", icon:"🐬"}, {name:"PostgreSQL", icon:"🐘"}
  ],
  "Tools":[
    {name:"Git", icon:"🔧"}, {name:"Docker", icon:"🐳"}, {name:"VSCode", icon:"💻"}
  ],
  "AI/ML":[
    {name:"TensorFlow", icon:"⚡"}, {name:"PyTorch", icon:"🔥"}, {name:"Scikit-learn", icon:"📚"}, {name:"AI", icon:"🤖"}
  ]
};

// ============================
// STATE
// ============================
let state = {
  category:"Frontend",
  view:"bars" // can add toggle for badges/cards
};

// ============================
// REFS
// ============================
const tabsEl = document.getElementById('skillsTabs');
const contentEl = document.getElementById('skillsContent');

// ============================
// RENDER TABS
// ============================
function renderTabs(){
  const categories = Object.keys(SKILLS);
  tabsEl.innerHTML = '';
  categories.forEach(cat=>{
    const btn = document.createElement('button');
    btn.className = 'tab' + (state.category===cat ? ' active':'');
    btn.textContent = cat;
    btn.addEventListener('click', ()=>{
      state.category = cat;
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      renderSkills();
    });
    tabsEl.appendChild(btn);
  });
}

// ============================
// RENDER SKILLS
// ============================
function renderSkills(){
  contentEl.innerHTML = '';

  // Progress Bars
  const barsContainer = document.createElement('div');
  barsContainer.className = 'progress-container';
  SKILLS[state.category].forEach(skill=>{
    const bar = document.createElement('div'); bar.className='progress-bar fade-up';
    const title = document.createElement('h4'); title.textContent=skill.name;
    const barBg = document.createElement('div'); barBg.className='bar-bg';
    const barFill = document.createElement('div'); barFill.className='bar-fill';
    barBg.appendChild(barFill);
    bar.appendChild(title); bar.appendChild(barBg);
    barsContainer.appendChild(bar);
    // animate when visible
    setTimeout(()=>{barFill.style.width = skill.level+'%';},200);
  });
  contentEl.appendChild(barsContainer);

  // Skill Cards/Badges
  const badgesContainer = document.createElement('div'); badgesContainer.className='skill-cards fade-up';
  BADGES[state.category].forEach(s=>{
    const card = document.createElement('div'); card.className='skill-card fade-up';
    const icon = document.createElement('span'); icon.className='icon'; icon.textContent = s.icon;
    const name = document.createElement('span'); name.className='name'; name.textContent = s.name;
    card.appendChild(icon); card.appendChild(name);
    badgesContainer.appendChild(card);
  });
  contentEl.appendChild(badgesContainer);

  // trigger fade-up animation
  observeFadeUp();
}

// ============================
// FADE-UP ON SCROLL
// ============================
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.15});

function observeFadeUp(){
  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
}

// ============================
// INIT
// ============================
function init(){ renderTabs(); renderSkills(); }
init();
//-------------------PROJECT----------------------
// ============================
// PROJECT SECTION
// ============================
//-------------PROJECTS SECTION------------------------

/* ===========================
   SAMPLE PROJECT DATA
   =========================== */
   const PROJECTS = [
    {
      id: 1,
      title: "TaskMaster — Productivity App",
      desc: "A full-stack task manager with realtime sync, reminders and analytics.",
      img: "https://picsum.photos/id/1015/1200/800",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "Web Apps",
      demo: "#",
      repo: "#",
      highlights: ["Realtime collaboration", "Push notifications", "Charts & analytics"]
    },
    {
      id: 2,
      title: "Shoply — E-commerce UI",
      desc: "Modern e-commerce frontend with product filters, cart & checkout flow.",
      img: "https://picsum.photos/id/1011/1200/800",
      tech: ["React", "Tailwind", "Stripe"],
      category: "UI/UX",
      demo: "#",
      repo: "#",
      highlights: ["Pixel-perfect UI", "Accessible components", "Checkout integration"]
    },
    {
      id: 3,
      title: "FitTrack Mobile",
      desc: "Cross-platform mobile app to track workouts and nutrition.",
      img: "https://picsum.photos/id/1027/1200/800",
      tech: ["React Native", "Expo", "Firebase"],
      category: "Mobile Apps",
      demo: "#",
      repo: "#",
      highlights: ["Offline support", "Sync across devices", "Custom metrics"]
    },
    {
      id: 4,
      title: "AIVision — Image Classifier",
      desc: "An AI model and UI for classifying images with confidence scores.",
      img: "https://picsum.photos/id/1062/1200/800",
      tech: ["Python", "TensorFlow", "Flask", "React"],
      category: "AI/ML",
      demo: "#",
      repo: "#",
      highlights: ["Model explainability", "Batch inference", "API deployment"]
    },
    {
      id: 5,
      title: "Portfolio Template",
      desc: "A minimal portfolio template built for developers and designers.",
      img: "https://picsum.photos/id/1005/1200/800",
      tech: ["HTML", "CSS", "JavaScript"],
      category: "UI/UX",
      demo: "#",
      repo: "#",
      highlights: ["Light & dark themes", "Responsive layout", "Reusable components"]
    },
    {
      id: 6,
      title: "Chatly — Messaging Platform",
      desc: "Scalable messaging platform with rooms, media sharing & presence.",
      img: "https://picsum.photos/id/1039/1200/800",
      tech: ["Node.js", "Socket.io", "Redis"],
      category: "Web Apps",
      demo: "#",
      repo: "#",
      highlights: ["Horizontal scaling", "Message persistence", "Typing indicators"]
    }
  ];
  
  /* ===========================
     STATE (renamed, like skills)
     =========================== */
  let projectState = {
    projects: [...PROJECTS],
    filtered: [...PROJECTS],
    category: "All",
    search: ""
  };
  
  /* ===========================
     UI REFS
     =========================== */
  const projectGrid = document.getElementById('grid');
  const projectTabs = document.getElementById('tabs');
  const projectSearch = document.getElementById('search');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalDemo = document.getElementById('modalDemo');
  const modalRepo = document.getElementById('modalRepo');
  const modalClose = document.getElementById('modalClose');
  
  /* ===========================
     RENDERING: Tabs
     =========================== */
  function renderProjectTabs(){
    const categories = ["All", ...Array.from(new Set(PROJECTS.map(p=>p.category)))];
    projectTabs.innerHTML = '';
    categories.forEach(cat=>{
      const el = document.createElement('button');
      el.className = 'tab' + (projectState.category===cat ? ' active' : '');
      el.setAttribute('role','tab');
      el.textContent = cat;
      el.addEventListener('click', ()=>{
        projectState.category = cat;
        document.querySelectorAll('#tabs .tab').forEach(t=>t.classList.remove('active'));
        el.classList.add('active');
        applyProjectFilters();
      });
      projectTabs.appendChild(el);
    });
  }
  
  /* ===========================
     RENDER: Projects Grid
     =========================== */
  function renderProjectGrid(items){
    projectGrid.innerHTML = '';
    items.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'card fade-up';
      setTimeout(()=>card.classList.add('visible'), i * 80);
  
      // thumbnail
      const thumb = document.createElement('div'); thumb.className='thumb';
      const img = document.createElement('img'); img.src = p.img; img.alt = p.title;
      thumb.appendChild(img);
  
      // overlay
      const overlay = document.createElement('div'); overlay.className='overlay';
      const more = document.createElement('div'); more.className='more';
      const moreInfo = document.createElement('div'); moreInfo.className='badge'; moreInfo.textContent = p.category;
      more.appendChild(moreInfo);
      overlay.appendChild(more);
      thumb.appendChild(overlay);
  
      // body
      const body = document.createElement('div'); body.className='card-body';
      const title = document.createElement('div'); title.className='title'; title.textContent = p.title;
      const desc = document.createElement('div'); desc.className='desc'; desc.textContent = p.desc;
      const techWrap = document.createElement('div'); techWrap.className='tech';
      p.tech.forEach(tk=>{
        const t = document.createElement('span'); t.className='t'; t.textContent = tk;
        techWrap.appendChild(t);
      });
  
      // actions
      const actions = document.createElement('div'); actions.className='actions';
      const demoBtn = document.createElement('a'); demoBtn.className='btn demo'; demoBtn.textContent='Live Demo'; demoBtn.href = p.demo || '#'; demoBtn.target = '_blank'; demoBtn.rel='noopener';
      const repoBtn = document.createElement('a'); repoBtn.className='btn repo'; repoBtn.textContent='GitHub'; repoBtn.href = p.repo || '#'; repoBtn.target = '_blank'; repoBtn.rel='noopener';
      actions.appendChild(demoBtn); actions.appendChild(repoBtn);
  
      // overlay click opens modal
      thumb.addEventListener('click', ()=> openProjectModal(p));
  
      body.appendChild(title); body.appendChild(desc); body.appendChild(techWrap); body.appendChild(actions);
  
      card.appendChild(thumb); card.appendChild(body);
      projectGrid.appendChild(card);
    });
  }
  
  /* ===========================
     FILTER / SEARCH
     =========================== */
  function applyProjectFilters(){
    let items = projectState.projects.filter(p => 
      projectState.category === 'All' ? true : p.category === projectState.category
    );
  
    const q = projectState.search.trim().toLowerCase();
    if(q){
      items = items.filter(p => {
        const inName = p.title.toLowerCase().includes(q);
        const inDesc = p.desc.toLowerCase().includes(q);
        const inTech = p.tech.join(' ').toLowerCase().includes(q);
        return inName || inDesc || inTech;
      });
    }
  
    projectState.filtered = items;
    renderProjectGrid(items);
  }
  
  /* ===========================
     MODAL: Open / Close
     =========================== */
  function openProjectModal(p){
    modalImg.src = p.img;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalTech.textContent = p.tech.join(', ');
    modalHighlights.innerHTML = '';
    (p.highlights || []).forEach(h=>{
      const li = document.createElement('li'); li.textContent = h; modalHighlights.appendChild(li);
    });
    modalDemo.href = p.demo || '#';
    modalRepo.href = p.repo || '#';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  }
  function closeProjectModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
  modalClose.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (e)=> { if(e.target === modal) closeProjectModal(); });
  document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeProjectModal(); });
  
  /* ===========================
     FADE-UP ON SCROLL (Observer)
     =========================== */
  const projectObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        projectObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.15});
  
  function observeProjectFadeUp(){
    document.querySelectorAll('.fade-up').forEach(el=>projectObserver.observe(el));
  }
  
  /* ===========================
     HOOKS
     =========================== */
  projectSearch.addEventListener('input', (e) => {
    projectState.search = e.target.value;
    applyProjectFilters();
  });
  
  /* ===========================
     INIT
     =========================== */
  function initProjects(){
    renderProjectTabs();
    applyProjectFilters();
    setTimeout(observeProjectFadeUp, 300);
  }
  initProjects();
  


//-------------------CONTACT----------------------
// ============================
// CONTACT SECTION
// ============================
    // Copy email to clipboard
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      alert("Email copied to clipboard!");
    }

    // Form validation
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      let valid = true;

      // Name
      const name = document.getElementById("name").value.trim();
      if (name === "") {
        document.getElementById("nameError").textContent = "Name is required";
        valid = false;
      } else {
        document.getElementById("nameError").textContent = "";
      }

      // Email
      const email = document.getElementById("email").value.trim();
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        document.getElementById("emailError").textContent = "Valid email required";
        valid = false;
      } else {
        document.getElementById("emailError").textContent = "";
      }

      // Subject
      const subject = document.getElementById("subject").value.trim();
      if (subject === "") {
        document.getElementById("subjectError").textContent = "Subject is required";
        valid = false;
      } else {
        document.getElementById("subjectError").textContent = "";
      }

      // Message
      const message = document.getElementById("message").value.trim();
      if (message === "") {
        document.getElementById("messageError").textContent = "Message is required";
        valid = false;
      } else {
        document.getElementById("messageError").textContent = "";
      }

      if (valid) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Please fix errors before submitting.");
      }
    });

//-------------------FOOTER----------------------
// ============================
// FOOTER SECTION
// ============================
// Smooth scroll back to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Newsletter subscribe mock
function subscribeNewsletter() {
  const email = document.getElementById("newsletterEmail").value.trim();
  if(email === "") {
    alert("❌ Please enter your email!");
  } else {
    alert("✅ Subscribed successfully with " + email);
    document.getElementById("newsletterEmail").value = "";
  }
}