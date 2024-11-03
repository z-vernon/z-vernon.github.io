const { reload } = require("browser-sync");

// Input Variables
var angle_1 = 0;
var angle_2 = 0;
var angular_velocity_1 = 0;
var angular_velocity_2 = 0;
var mass_1 = 10;
var mass_2 = 10;
var arm_length_1;
var arm_length_2;
var radius_circle;
var Run = true;

// Constants
var gravity = 0.25;
var radius = 25;
var previous_point_x_2 = -1;
var previous_point_y_2 = -1;
var origin_x, origin_y;
var tracer;

function setup() {
    createResponsiveCanvas();
    initializeValues();
}

function draw() {
    if (Run === true) {
        // Display tracer with proper scaling
        image(tracer, 0, 0, width, height);
        imageMode(CORNER);
        translate(origin_x, origin_y);

        // Angular acceleration calculations (you'll need to add these back)
        // ... your angular acceleration calculations ...

        // Convert to cartesian coordinates with proper scaling
        var position_x_1 = arm_length_1 * sin(angle_1);
        var position_y_1 = arm_length_1 * cos(angle_1);
        var position_x_2 = position_x_1 + arm_length_2 * sin(angle_2);
        var position_y_2 = position_y_1 + arm_length_2 * cos(angle_2);

        // Visualization with scaled stroke weights
        let strokeScale = min(width, height) / 1000; // Scale strokes based on canvas size
        
        // Draw origin circle
        strokeWeight(3 * strokeScale);
        noFill();
        stroke(255);
        circle(0, 0, radius_circle * 4);

        // Draw pendulum arms
        stroke(255);
        strokeWeight(5 * strokeScale);
        line(0, 0, position_x_1, position_y_1);
        line(position_x_1, position_y_1, position_x_2, position_y_2);
        
        // Draw end circle
        fill(255);
        ellipse(position_x_2, position_y_2 - (12 * strokeScale), radius * strokeScale, radius * strokeScale);

        // Update physics
        angular_velocity_1 += angular_acceleration_1;
        angular_velocity_2 += angular_acceleration_2;
        angle_1 += angular_velocity_1;
        angle_2 += angular_velocity_2;

        // Trace path with scaled stroke
        if (frameCount > 1) {
            tracer.stroke(255);
            tracer.strokeWeight(1 * strokeScale);
            tracer.line(previous_point_x_2, previous_point_y_2, position_x_2, position_y_2);
        }

        previous_point_x_2 = position_x_2;
        previous_point_y_2 = position_y_2;
    }
}

function createResponsiveCanvas() {
    // Use vmin for consistent sizing across devices
    let size = min(windowWidth, windowHeight) * 0.9;
    let canvas = createCanvas(size, size);
    canvas.parent('canvas-container');
}

function initializeValues() {
    // Scale elements relative to canvas size
    let minDim = min(width, height);
    arm_length_1 = minDim / 4;
    arm_length_2 = minDim / 4;
    radius_circle = minDim / 4;

    // Random initial angles
    angle_1 = PI * random(0.5);
    angle_2 = PI * random(0.75);

    // Center origin
    origin_x = width / 2;
    origin_y = height / 2;

    // Initialize tracer with proper size
    tracer = createGraphics(width, height);
    tracer.background('#141414');
    tracer.translate(origin_x, origin_y);
}

function windowResized() {
    // Maintain state when resizing
    let prevAngle1 = angle_1;
    let prevAngle2 = angle_2;
    let prevVel1 = angular_velocity_1;
    let prevVel2 = angular_velocity_2;
    

    // Resize canvas
    let size = min(windowWidth, windowHeight) * 0.9;
    resizeCanvas(size, size);
    
    // Reinitialize with preserved state
    initializeValues();
    
    // Restore state
    angle_1 = prevAngle1;
    angle_2 = prevAngle2;
    angular_velocity_1 = prevVel1;
    angular_velocity_2 = prevVel2;
}