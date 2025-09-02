// ================= Smooth Scroll =================
const header = document.getElementById("header");
document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    const offset = header.offsetHeight;
    window.scrollTo({ top: targetEl.offsetTop - offset, behavior: 'smooth' });
  });
});

// ================= Typewriter Effect =================
const texts = [
  "I like to develop new things.",
  "I love learning new tech.",
  "I love meeting new people."
];

let currentText = 0;
let charIndex = 0;
const typingSpeed = 100;
const eraseSpeed = 50;
const delayBetweenTexts = 2000;
const typewriterElement = document.getElementById("typewriter-text");

function type() {
  if (charIndex < texts[currentText].length) {
    typewriterElement.textContent += texts[currentText][charIndex];
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTexts);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriterElement.textContent = texts[currentText].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    // เปลี่ยนข้อความต่อไปและรีเซ็ต
    currentText = (currentText + 1) % texts.length;
    charIndex = 0;
    typewriterElement.textContent = ""; // เคลียร์ก่อนพิมพ์ใหม่
    setTimeout(type, typingSpeed);
  }
}

// เริ่มทำงานเมื่อ DOM พร้อม
document.addEventListener("DOMContentLoaded", type);


// ================= Reveal on Scroll =================
function revealOnScroll(){
  document.querySelectorAll(".reveal").forEach(el=>{
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100) el.classList.add("active");
    else el.classList.remove("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ================= Project Images Data =================
const projectImages = {
  project1: ["images Projects/BU Sports Shop Management/Add Invoice.png","images Projects/BU Sports Shop Management/Stocks.png",
            "images Projects/BU Sports Shop Management/Add Supplier.png","images Projects/BU Sports Shop Management/Add Stock.png",
            "images Projects/BU Sports Shop Management/Supplier.png","images Projects/BU Sports Shop Management/Invoice.png"],
  project2: ["images Projects/Cativerse/Account.png","images Projects/Cativerse/Add cat.png","images Projects/Cativerse/Chat.png",
            "images Projects/Cativerse/Explore.png","images Projects/Cativerse/Login.png"],
  project3: ["images Projects/Weather measurement system/IOT1.jpg","images Projects/Weather measurement system/IOT2.jpg",
            "images Projects/Weather measurement system/IOT3.jpg"]
};

// ================= Project Modal =================
const modal = document.getElementById("project-modal");
const modalImages = document.getElementById("modal-images");
const closeBtn = modal.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const project = card.getAttribute("data-project");
    modal.style.display = "block";
    modalImages.innerHTML = ""; 
    projectImages[project].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("modal-img"); 
      modalImages.appendChild(img);
    });
  });
});

closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

// ================= Lightbox Fullscreen =================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

// เปิด Lightbox เมื่อคลิกรูปใน Modal
document.addEventListener("click", function(e){
  if(e.target.classList.contains("modal-img")){
    lightboxImg.src = e.target.src;
    lightbox.classList.add("open");
  }
});

// ปิด Lightbox
lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
});
lightbox.addEventListener("click", e => {
  if(e.target === lightbox) lightbox.classList.remove("open");
});


lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if(e.target === lightbox) closeLightbox();
});
lightboxPrev.addEventListener("click", e => { e.stopPropagation(); showLightboxImage(currentIndex - 1); });
lightboxNext.addEventListener("click", e => { e.stopPropagation(); showLightboxImage(currentIndex + 1); });

// ================= Parallax Project Cards =================
function parallaxProjectCards(){
  const cards = document.querySelectorAll('.project-card');
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  cards.forEach(card => {
    const speed = parseFloat(card.getAttribute('data-speed')) || 0.2;
    const cardTop = card.offsetTop;
    const movement = Math.min((scrollTop + windowHeight - cardTop) * speed, 30);
    card.style.transform = `translateY(${movement}px)`;
  });
}
window.addEventListener('scroll', parallaxProjectCards);
window.addEventListener('load', parallaxProjectCards);
