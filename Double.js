
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
    var gravity = 0.25; // Gravity is set to 1 because code breaks when 9.8 m/s^2 is used.
    var radius = 25;
    var previous_point_x_2 = -1;
    var previous_point_y_2 = -1;
    var origin_x, origin_y;

    // defines tracer object name
    var tracer;

    function setup() {
      createResponsiveCanvas();
      initializeValues();
    }

    function draw() {
      if (Run === true) {
        // Display tracer object across the canvas each cycle.
        image(tracer, 0, 0, width, height);
        imageMode(CORNER);
        translate(origin_x, origin_y);

        //
        //fill(255);
        //stroke(255);
        //strokeWeight(1);
        //textFont('Titillium Web');
        //textAlign(LEFT);
        //textSize(24);
        //text(' "What we know is not much.\n What we dont know is enormous."\n -Pierre Simon De Laplace ', 250, 200);

        // Angular acceleration equations and calculations remain the same

        // Convert to cartesian coordinates for pendulum 1
        var position_x_1 = arm_length_1 * sin(angle_1);
        var position_y_1 = arm_length_1 * cos(angle_1);

        // Convert to cartesian coordinates for pendulum 2
        var position_x_2 = position_x_1 + arm_length_2 * sin(angle_2);
        var position_y_2 = position_y_1 + arm_length_2 * cos(angle_2);

        // Visualization of origin
        strokeWeight(5);
        noFill();
        stroke(255);
        circle(0, 0, radius_circle * 4.1355);

        // Pendulum visualizations remain the same
        stroke(255);
        strokeWeight(10);
        line(0, 0, position_x_1, position_y_1);

        line(position_x_1, position_y_1, position_x_2, position_y_2);
        fill(255);
        ellipse(position_x_2, position_y_2 - 12.1, radius, radius);

        // Update angular velocity and angle
        angular_velocity_1 += angular_acceleration_1;
        angular_velocity_2 += angular_acceleration_2;

        angle_1 += angular_velocity_1;
        angle_2 += angular_velocity_2;

        // Trace the path of the bottom pendulum
        if (frameCount > 1) {
          tracer.stroke(255);
          tracer.line(previous_point_x_2, previous_point_y_2, position_x_2, position_y_2);
        }

        // Update previous position for next cycle
        previous_point_x_2 = position_x_2;
        previous_point_y_2 = position_y_2;
      }
    }

    // Function to create a responsive canvas
    function createResponsiveCanvas() {
      let canvas;
      if (windowWidth > windowHeight) {
        canvas = createCanvas(windowWidth, windowHeight);
      } else {
        canvas = createCanvas((windowHeight / 1.3) * 0.5625, windowHeight / 1.38);
      }
      canvas.parent('canvas-container'); // Attach the canvas to the centered container
    }

    // Initialize values based on canvas size
    function initializeValues() {
      arm_length_1 = height / 6;
      arm_length_2 = height / 6;
      radius_circle = height / 6;

      angle_1 = PI * Math.random() * 0.5;
      angle_2 = PI * Math.random() * 0.75;

      origin_x = width / 2;
      origin_y = height / 2;

      tracer = createGraphics(width, height);
      tracer.background('#141414');
      tracer.translate(origin_x, origin_y);
    }

    // Update canvas and values when window is resized
    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
      initializeValues();
    }