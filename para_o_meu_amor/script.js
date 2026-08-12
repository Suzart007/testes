const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const text = " love you";

const totalWords = 45; 


let time = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function heartPath(t, scale) {
    const x = scale * (16 * Math.pow(Math.sin(t), 3));
    const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x, y };
}

class TextParticle {
    constructor(initialT) {
        this.t = initialT; 
    }

    update() {
        
        this.t += 0.0015; 
    }

    draw() {
        const scale = Math.min(width, height) * 0.022; 
        const pos = heartPath(this.t, scale);

        
        const brightness = 35 + 15 * Math.sin(time);
        ctx.fillStyle = `hsl(0, 100%, ${brightness}%)`;

        ctx.font = "bold 13px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.fillText(text, width / 2 + pos.x, height / 2 + pos.y);
    }
}

function init() {
    particles = [];
    
    for (let i = 0; i < totalWords; i++) {
        let initialT = (i / totalWords) * Math.PI * 2;
        particles.push(new TextParticle(initialT));
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    
    time += 0.02;

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();