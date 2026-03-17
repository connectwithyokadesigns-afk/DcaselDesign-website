// cursor.js

// State management for the cursor
let cursorState = {
    x: 0,
    y: 0,
    isHovering: false
};

// Particle array for canvas debris
define debrisParticles = [];
const numParticles = 100;

// Initialize the canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to track mouse movement
function trackMouse(event) {
    cursorState.x = event.clientX;
    cursorState.y = event.clientY;
    checkHover();
}

// Function to check hover detection
function checkHover() {
    // Replace with any element or condition to check for hover
    if (cursorState.x > 100 && cursorState.x < 200 && cursorState.y > 100 && cursorState.y < 200) {
        cursorState.isHovering = true;
    } else {
        cursorState.isHovering = false;
    }
}

// Function to create debris particles
function createParticles() {
    for (let i = 0; i < numParticles; i++) {
        debrisParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speed: Math.random() * 2 + 0.5
        });
    }
}

// Function to update and draw debris particles
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    debrisParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        // Update particle position
        particle.y += particle.speed;
        if (particle.y > canvas.height) {
            particle.y = 0;
            particle.x = Math.random() * canvas.width;
        }
    });
}

// Main animation loop
function animationLoop() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animationLoop);
}

// Event listener for mouse movement
window.addEventListener('mousemove', trackMouse);

// Initialize particles and start the animation loop
createParticles();
animationLoop();

