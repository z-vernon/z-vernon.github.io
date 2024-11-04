// Input Variables
var angle_1 = 0;
var angle_2 = 0;
var angular_velocity_1 = 0;
var angular_velocity_2 = 0;
var angular_acceleration_1 = 0;
var angular_acceleration_2 = 0;
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
        // Display tracer
        image(tracer, 0, 0, width, height);
        imageMode(CORNER);
        translate(origin_x, origin_y);

        fill(255);
        stroke(255);
        strokeWeight(1);
        textFont('Titillium Web');
        textAlign(LEFT);
        textSize(24);
        text(' "What we know is not much.\n What we dont know is enormous."\n -Pierre Simon De Laplace ', 250,200);

        // Calculate all the physics
        var numerator1 = -gravity * (2 * mass_1 + mass_2) * sin(angle_1);
        var numerator2 = -mass_2 * gravity * sin(angle_1 - 2 * angle_2);
        var numerator3 = -2 * sin(angle_1 - angle_2) * mass_2;
        var numerator4 = angular_velocity_2 * angular_velocity_2 * arm_length_2 + angular_velocity_1 * angular_velocity_1 * arm_length_1 * cos(angle_1 - angle_2);
        var denominator = arm_length_1 * (2 * mass_1 + mass_2 - mass_2 * cos(2 * angle_1 - 2 * angle_2));
        angular_acceleration_1 = (numerator1 + numerator2 + numerator3 * numerator4) / denominator;

        numerator1 = 2 * sin(angle_1 - angle_2);
        numerator2 = (angular_velocity_1 * angular_velocity_1 * arm_length_1 * (mass_1 + mass_2));
        numerator3 = gravity * (mass_1 + mass_2) * cos(angle_1);
        numerator4 = angular_velocity_2 * angular_velocity_2 * arm_length_2 * mass_2 * cos(angle_1 - angle_2);
        denominator = arm_length_2 * (2 * mass_1 + mass_2 - mass_2 * cos(2 * angle_1 - 2 * angle_2));
        angular_acceleration_2 = (numerator1 * (numerator2 + numerator3 + numerator4)) / denominator;

        // Convert to cartesian coordinates for pendulum 1
        var position_x_1 = arm_length_1 * sin(angle_1);
        var position_y_1 = arm_length_1 * cos(angle_1);

        // Convert to cartesian coordinates for pendulum 2
        var position_x_2 = position_x_1 + arm_length_2 * sin(angle_2);
        var position_y_2 = position_y_1 + arm_length_2 * cos(angle_2);

        // Scale strokes based on canvas size
        let strokeScale = min(width, height) / 1000;

        // Visualization of origin
        strokeWeight(3 * strokeScale);
        noFill();
        stroke(255);
        circle(0, 0, radius_circle * 5);

        // Draw pendulum arms
        stroke(255);
        strokeWeight(5 * strokeScale);
        line(0, 0, position_x_1, position_y_1);
        line(position_x_1, position_y_1, position_x_2, position_y_2);

        // Draw end circle
        fill(255);
        ellipse(position_x_2, position_y_2 - (12 * strokeScale), radius * strokeScale, radius * strokeScale);

        // Update angular velocity and angle
        angular_velocity_1 += angular_acceleration_1;
        angular_velocity_2 += angular_acceleration_2;
        angle_1 += angular_velocity_1;
        angle_2 += angular_velocity_2;

        // Trace the path
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
    let size = min(windowWidth, windowHeight) * 0.9;
    let canvas = createCanvas(size, size);
    canvas.parent('canvas-container');
}

function initializeValues() {
    let minDim = min(width, height);
    arm_length_1 = minDim / 6;
    arm_length_2 = minDim / 6;
    radius_circle = minDim / 6;

    angle_1 = PI * random(0.5);
    angle_2 = PI * random(0.75);

    origin_x = width / 2;
    origin_y = height / 2;

    tracer = createGraphics(width, height);
    tracer.background('#141414');
    tracer.translate(origin_x, origin_y);
}

function reload() {
    // Clear the tracer
    tracer.clear();
    tracer.background('#141414');
    tracer.translate(origin_x, origin_y);
    
    // Reset variables
    angle_1 = PI * random(0.5);
    angle_2 = PI * random(0.75);
    angular_velocity_1 = 0;
    angular_velocity_2 = 0;
    previous_point_x_2 = -1;
    previous_point_y_2 = -1;
}

function windowResized() {
    let size = min(windowWidth, windowHeight) * 0.9;
    resizeCanvas(size, size);
    initializeValues();
    reload(); // Reset animation on resize
}

