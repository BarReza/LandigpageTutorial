// Shape morphing animations
const shapes = [
    "M50,20 L80,40 L80,80 L20,80 L20,40 Z", // Pentagon
    "M50,20 C70,20 80,35 80,50 C80,65 70,80 50,80 C30,80 20,65 20,50 C20,35 30,20 50,20", // Circle
    "M20,20 L80,20 L80,80 L20,80 Z", // Square
    "M50,20 L90,90 L10,90 Z", // Triangle
    "M50,20 Q80,40 80,60 Q80,80 50,80 Q20,80 20,60 Q20,40 50,20" // Organic shape
];

// Initialize floating dots
function initFloatingDots() {
    const floatingElements = document.getElementById('floatingElements');
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        floatingElements.appendChild(dot);
    }
}

// Animate shapes
function initShapeMorphing() {
    const shapePaths = document.querySelectorAll('.shape');
    let currentShape = 0;

    function morphShape() {
        shapePaths.forEach(path => {
            anime({
                targets: path,
                d: [
                    { value: shapes[currentShape] }
                ],
                duration: 2000,
                easing: 'easeInOutQuad',
                complete: () => {
                    currentShape = (currentShape + 1) % shapes.length;
                    morphShape();
                }
            });
        });
    }

    morphShape();
}

// Animate floating dots
function animateFloatingDots() {
    anime({
        targets: '.floating-dot',
        translateX: function() {
            return anime.random(-15, 15);
        },
        translateY: function() {
            return anime.random(-15, 15);
        },
        scale: function() {
            return anime.random(1, 1.5);
        },
        opacity: function() {
            return anime.random(0.1, 0.5);
        },
        duration: function() {
            return anime.random(3000, 5000);
        },
        delay: function() {
            return anime.random(0, 1000);
        },
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad'
    });
}

// Animate features
function initFeatureAnimations() {
    document.querySelectorAll('.feature').forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            anime({
                targets: feature,
                scale: 1.1,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        });

        feature.addEventListener('mouseleave', () => {
            anime({
                targets: feature,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    });
}

// Animate input box
function initInputAnimation() {
    const inputContainer = document.querySelector('.input-container');
    const input = inputContainer.querySelector('input');
    const placeholderText = "Ask Agentimate to create a design...";
    
    // First, add the morphing background
    inputContainer.innerHTML = `
        <svg class="morph-svg input-morph" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-input" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff6b6b" />
                    <stop offset="50%" style="stop-color:#ffd93d" />
                    <stop offset="100%" style="stop-color:#6c5ce7" />
                </linearGradient>
            </defs>
            <path class="shape" d="M0,0 L100,0 L100,100 L0,100 Z" />
        </svg>
        <input type="text" placeholder="">
    `;

    // Get the new input element
    const newInput = inputContainer.querySelector('input');
    let currentText = '';
    
    // Create typing animation
    const typing = anime.timeline({
        loop: true,
        delay: 500
    });

    // Add typing animation
    typing
        .add({
            targets: { value: 0 },
            value: placeholderText.length,
            duration: 2000,
            easing: 'steps(' + placeholderText.length + ')',
            round: 1,
            update: function(anim) {
                currentText = placeholderText.slice(0, Math.floor(anim.animations[0].currentValue));
                newInput.placeholder = currentText + '|';
            }
        })
        .add({
            duration: 1000,
            update: function() {
                newInput.placeholder = currentText + '|';
            }
        })
        .add({
            duration: 200,
            update: function() {
                newInput.placeholder = currentText;
            }
        })
        .add({
            duration: 200,
            update: function() {
                newInput.placeholder = currentText + '|';
            }
        });
}

// Initialize all animations
function initAnimations() {
    initFloatingDots();
    initShapeMorphing();
    animateFloatingDots();
    initFeatureAnimations();
    initInputAnimation();
}

// Export for use in index.html
window.initAnimations = initAnimations; 