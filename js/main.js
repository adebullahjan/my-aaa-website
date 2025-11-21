// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });

// AOS Init
AOS.init({ duration:1000, once:true });

// Scroll Animations
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

// Hero Video
const heroVideo = document.getElementById('heroVideo');
heroVideo.play();

// Contact Form
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => { e.preventDefault(); alert('Message sent! (Demo)'); form.reset(); });

// Three.js 3D Particles for Hero
const canvas = document.getElementById('threeCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;

// Create particles
const geometry = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = [];
for(let i=0;i<particleCount;i++){
    positions.push((Math.random()-0.5)*20);
    positions.push((Math.random()-0.5)*20);
    positions.push((Math.random()-0.5)*20);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));
const material = new THREE.PointsMaterial({color:0xfff39c, size:0.1});
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animate particles
function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.001;
    renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});