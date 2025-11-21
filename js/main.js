// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });

// AOS Init
AOS.init({ duration:1000, once:true });

// Scroll Animation
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        if(scrollY + window.innerHeight > section.offsetTop + 100){
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        } else {
            section.style.opacity = 0;
            section.style.transform = 'translateY(50px)';
        }
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => { lightbox.style.display='flex'; lightboxImg.src=img.src; });
});
closeBtn.addEventListener('click', () => { lightbox.style.display='none'; });
lightbox.addEventListener('click', e => { if(e.target===lightbox) lightbox.style.display='none'; });

// Hero Video Overlay (Optional Animation)
const heroVideo = document.getElementById('heroVideo');
heroVideo.play();

// Contact Form Demo
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => { e.preventDefault(); alert('Message sent! (Demo)'); form.reset(); });