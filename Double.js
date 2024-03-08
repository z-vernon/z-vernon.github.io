//Input Variables
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

//Constants
var gravity = 0.25; // Gravity is set to 1 because code breaks when 9.8 m/s^2 is used. 
var radius = 25;
var previous_point_x_2 = -1;
var previous_point_y_2 = -1
var origin_x, origin_y;

// defines tracer object name
var tracer;

function setup() {
  // This creates the space for the graphics to be displayed
  var canvas = createCanvas(windowWidth, windowHeight); // 700 370
  canvas.parent('doublecode');
  //canvas.background('#141414');
  arm_length_1 = height/6;
  arm_length_2 = height/6;
  radius_circle = height/6;
  // Set angles with PI which is global and therefore must be defined in setup.
  angle_1 = 0//PI*Math.random() ;
  angle_2 = 0//PI*Math.random() ;


  
  // Set the origin to fit the canvas
  origin_x = width / 2;
  origin_y = height /2;
  
  //creates tracer object that is the size of the cancas
  tracer = createGraphics(width, height);
  
  // Set background to write
  tracer.background('#141414');
  //trace.color(255)
  // Set origin of tracer object to the origin
  tracer.translate(origin_x, origin_y);
}
// This runs the graphics and code inside the canvas area

function draw() {
  if ( Run === true){ 
  // This places tracer object across the canvas each cycle.
  image(tracer, 0, 0, width, height);
    imageMode(CORNER);
    // This changes the default origin to up and down.
  translate(origin_x,origin_y);
 

  //Equation of angular acceleration for theta 1
  var part_1_1 = -gravity * (2 * mass_1 + mass_2) * sin(angle_1);
  var part_1_2 = -mass_2 * gravity * sin(angle_1 - 2 * angle_2);
  var part_1_3 = -2 * sin(angle_1 - angle_2) * mass_2;
  var part_1_4 = sq(angular_velocity_2) * arm_length_1 +  sq(angular_velocity_1) * arm_length_1 * cos(angle_1 - angle_2);
  var part_5 = (2 * mass_1 + mass_2 - mass_2 * cos(2 * angle_1 - 2 * angle_2));
  
  // Equation of angular acceleration for theta 2
  var part_2_1 = 2 * sin(angle_1 - angle_2);
  var part_2_2 = (sq(angular_velocity_1) * arm_length_1 * (mass_1 + mass_2));
  var part_2_3 = gravity * (mass_1 + mass_2) * cos(angle_1);
  var part_2_4 = sq(angular_velocity_2) * arm_length_2 * mass_2 * cos(angle_1 - angle_2);
  
  // Combined parts of angular acceleration
  var angular_acceleration_1 = (part_1_1 + part_1_2 + part_1_3 *                                       part_1_4) / (arm_length_1*part_5);
  var angular_acceleration_2 = ( part_2_1* (part_2_2 + part_2_3 +                                       part_2_4)) /(arm_length_2 * part_5);

   // Converting to cartesian coordinates from polar for pendulum 1
  var position_x_1 = arm_length_1 * sin(angle_1);
  var position_y_1 =  arm_length_1* cos(angle_1);
  
 // Converting to cartesian coordinates from polar for pendulum 2
  var position_x_2 = position_x_1 + arm_length_2 * sin(angle_2);
  var position_y_2 = position_y_1 + arm_length_2 * cos(angle_2);
 
  // Visualization of origin
  strokeWeight(5);
  noFill();
  stroke(255);
  circle(0, 0, radius_circle*4.125);

  fill(255);
  ellipse(0,0, 1, 1);

  // Visualization of Pendulum 1
  stroke(255);
  strokeWeight(10)
  line(0, 0, position_x_1, position_y_1);
  //fill(255);
  //ellipse(position_x_1, position_y_1, 1, 1);
  
  // Visualization of Pendulum 2
  stroke(255);
  strokeWeight(10)
  line(position_x_1, position_y_1, position_x_2, position_y_2);
  fill(255);
  ellipse(position_x_2, position_y_2-12.1, radius, radius);
  
  // Computing angular velocity
  angular_velocity_1 += angular_acceleration_1;
  angular_velocity_2 += angular_acceleration_2;
   
  // Computing angle
  angle_1 += angular_velocity_1;
  angle_2 += angular_velocity_2;
  
  
  // traces the path of the bottom oendulum
  if (frameCount > 1) {
    
    tracer.stroke(255);
    tracer.line(previous_point_x_2, previous_point_y_2, position_x_2, position_y_2);
  }
  
  // records the previous position information for next cycle.
  previous_point_x_2 = position_x_2;
  previous_point_y_2 = position_y_2;
}}