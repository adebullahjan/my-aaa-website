// عناصر بازی
const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreBox = document.getElementById("score");
const levelBox = document.getElementById("level");
const powerBox = document.getElementById("powerup");
const upgradeBox = document.getElementById("upgrade");

let score = 0;
let difficulty = 1;
let environment = 0; 
let powerActive = "هیچ";
let upgradeLevel = 0;

const environments = ["Digital Space","Quantum Lab","Cyber Hell","Void Realm","Overclock Zone","Infinity Nightmare"];
const bosses = [
    {name:"Paralyzer", hp:10},
    {name:"Logic Phantom", hp:15},
    {name:"Memory Titan", hp:20},
    {name:"Neural Destroyer", hp:25},
    {name:"M1-RX", hp:50}
];

// Power-ups
const powerUps = ["Time Freeze","Memory Boost","Logic Skip","Chaos Shield"];
const upgrades = ["سرعت ذهن","حافظه","تمرکز","منطق","سپر ذهنی"];

// اسپاون کردن اشیاء حافظه
function spawnMemoryCircle() {
    const circle = document.createElement("div");
    circle.classList.add("memory-circle");
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 200);
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    game.appendChild(circle);
    setTimeout(() => { circle.remove(); }, Math.max(500 - difficulty*50, 100));
}

// حرکت آشوبناک اشیاء
function chaosMovement() {
    const objs = document.querySelectorAll(".memory-circle");
    objs.forEach(c => {
        const dx = (Math.random()-0.5)*12*difficulty;
        const dy = (Math.random()-0.5)*12*difficulty;
        const rect = c.getBoundingClientRect();
        c.style.left = Math.min(Math.max(rect.left + dx, 0), window.innerWidth-50) + "px";
        c.style.top = Math.min(Math.max(rect.top + dy, 0), window.innerHeight-200) + "px";
    });
}

// سوال منطق
function logicQuestion() {
    const a = Math.floor(Math.random()*10*difficulty);
    const b = Math.floor(Math.random()*10*difficulty);
    const correct = a + b;
    const answer = prompt(`جمع ${a} + ${b} چیست؟`);
    if(parseInt(answer) === correct){
        score += 3;
    } else {
        alert(`اشتباه! بازی تمام شد. امتیاز شما: ${score}`);
        location.reload();
    }
}

// تغییر محیط
function checkEnvironment() {
    if(score > 0 && score % 30 === 0) {
        environment = (environment + 1) % environments.length;
        levelBox.textContent = "محیط: " + environments[environment];
        alert("ورود به محیط جدید: " + environments[environment]);
    }
}

// اسپاون باس‌ها
function spawnBoss() {
    const boss = bosses[Math.floor(Math.random()*bosses.length)];
    const bossEl = document.createElement("div");
    bossEl.classList.add("boss-circle");
    bossEl.textContent = boss.name;
    bossEl.style.left = Math.random()*(window.innerWidth-80)+"px";
    bossEl.style.top = "50px";
    game.appendChild(bossEl);

    setTimeout(() => { bossEl.remove(); }, 5000 + Math.random()*3000);
}

// فعال کردن Power-up
function activatePower() {
    powerActive = powerUps[Math.floor(Math.random()*powerUps.length)];
    powerBox.textContent = "قدرت فعال: " + powerActive;
    setTimeout(()=>{powerActive="هیچ"; powerBox.textContent="قدرت فعال: هیچ";}, 5000);
}

// سیستم ارتقا
function applyUpgrade() {
    upgradeLevel = (upgradeLevel + 1) % upgrades.length;
    upgradeBox.textContent = "ارتقا: " + upgrades[upgradeLevel];
    if(upgradeLevel === 0) difficulty *= 1.2; // ارتقا سختی
}

// حلقه اصلی
setInterval(()=>{
    spawnMemoryCircle();
    chaosMovement();
    score++;
    scoreBox.textContent = `امتیاز: ${score}`;
    checkEnvironment();

    if(score % 10 === 0){
        difficulty += 0.3;
        logicQuestion();
        spawnBoss();
        activatePower();
        applyUpgrade();
    }
},1000);