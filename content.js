// content.js

const radius = 5; // Radius of the circular path around the div's center
const animationSpeed = 10; // Speed of the animation (lower is faster)

// Function to check if a div contains interactive elements
function containsInteractiveElements(div) {
    return div.querySelector('input, button, select, textarea, a, [contenteditable]') !== null;
}

// Get all <div> elements that contain interactive elements and are deeply nested
function getInteractiveDivs() {
    const allDivs = document.querySelectorAll('div');
    const interactiveDivs = [];
    allDivs.forEach(div => {
        if (containsInteractiveElements(div) && div.querySelector('div')) {
            interactiveDivs.push(div);
        }
    });
    return interactiveDivs;
}

// Apply styles for the animation
function applyAnimationStyles(div) {
    div.style.position = 'relative'; // Ensure the div's position is relative
    div.style.transformOrigin = 'center'; // Set the transform origin to the center
    div.style.pointerEvents = 'auto'; // Ensure the div allows pointer events
}

// Generate a random angle for each div
function generateRandomAngle() {
    return Math.random() * 360; // Random angle between 0 and 360 degrees
}

// Store initial random angles
const initialAngles = new Map();

// Animate floating divs
function animateDivs() {
    const divs = getInteractiveDivs(); // Get only interactive divs

    divs.forEach((div) => {
        // Apply styles if not already applied
        if (!div.style.transformOrigin) {
            applyAnimationStyles(div);
        }

        // Initialize random angle if not already set
        if (!initialAngles.has(div)) {
            initialAngles.set(div, generateRandomAngle());
        }

        // Retrieve the initial angle
        const initialAngle = initialAngles.get(div);
        const now = Date.now();
        const angle = (initialAngle + (now / animationSpeed)) % 360; // Angle for animation
        const radian = angle * (Math.PI / 180); // Convert angle to radians

        // Calculate new position for floating effect
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        // Smooth transition using CSS transition
        div.style.transition = 'transform 0.1s ease-out'; // Adjusted transition duration for smoothness
        div.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Request next animation frame
    requestAnimationFrame(animateDivs);
}

// Start animation
animateDivs();
