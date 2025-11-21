// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });

// AOS Init
AOS.init({ duration:1000, once:true });

// Swiper Portfolio
const swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  effect: "coverflow",
  coverflowEffect: { rotate:30, slideShadows:true }
});

// Hero Video Play
const heroVideo = document.getElementById('heroVideo');
heroVideo.play();

// Contact Form Submission handled by Formspree (no JS needed)

// Three.js 3D Particles
const canvas = document.getElementById('threeCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Particles
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

// Lights
const light = new THREE.PointLight(0xfff39c,1,100);
light.position.set(0,5,5);
scene.add(light);

// Animate
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