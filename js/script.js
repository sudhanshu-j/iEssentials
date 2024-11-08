// Common JS: Prevent default actions for certain buttons when clicked
document
  .querySelectorAll(".watch-control, .controls .controls-a, .iphone-btn") // Select all elements with specific classes
  .forEach((control) => {
    // Iterate over each selected element
    control.addEventListener("click", (e) => {
      // Add event listener for 'click' event
      e.preventDefault(); // Prevent the default behavior (e.g., form submission or navigation)
    });
  });
// End of Common JS

// Cube: Rotate a 3D cube based on button clicks

// Initialize rotation values for the cube
let x = 0; // Rotation around the X-axis
let y = 20; // Rotation around the Y-axis
let z = 0; // Rotation around the Z-axis
let bool = true; // Flag to control whether rotation is paused or not
let interval; // Stores the interval ID for automatic rotation

const cube = document.querySelector(".cube"); // Select the cube element

// Event listener for rotating the cube around the X-axis (top)
document.querySelector(".top-x-control").addEventListener("click", () => {
  cube.style.transform = `rotateX(${(x += 20)}deg) rotateY(${y}deg) rotateZ(${z}deg)`; // Increase the X rotation and apply transform
});

// Event listener for rotating the cube around the X-axis (bottom)
document.querySelector(".bottom-x-control").addEventListener("click", () => {
  cube.style.transform = `rotateX(${(x -= 20)}deg) rotateY(${y}deg) rotateZ(${z}deg)`; // Decrease the X rotation and apply transform
});

// Event listener for rotating the cube around the Y-axis (left)
document.querySelector(".left-y-control").addEventListener("click", () => {
  cube.style.transform = `rotateX(${x}deg) rotateY(${(y -= 20)}deg) rotateZ(${z}deg)`; // Decrease the Y rotation and apply transform
});

// Event listener for rotating the cube around the Y-axis (right)
document.querySelector(".right-y-control").addEventListener("click", () => {
  cube.style.transform = `rotateX(${x}deg) rotateY(${(y += 20)}deg) rotateZ(${z}deg)`; // Increase the Y rotation and apply transform
});

// Event listener for rotating the cube around the Z-axis (top)
document.querySelector(".top-z-control").addEventListener("click", () => {
  cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${(z -= 20)}deg)`; // Decrease the Z rotation and apply transform
});

// Event listener for rotating the cube around the Z-axis (bottom)
document.querySelector(".bottom-z-control").addEventListener("click", () => {
  cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${(z += 20)}deg)`; // Increase the Z rotation and apply transform
});

// Function to start/stop the automatic rotation of the cube
const playPause = () => {
  if (bool) {
    // If bool is true, the cube is rotating
    interval = setInterval(() => {
      cube.style.transform = `rotateX(${x}deg) rotateY(${y++}deg) rotateZ(${z}deg)`; // Increment Y-axis rotation every 100ms
    }, 100);
  } else {
    // If bool is false, stop the rotation
    clearInterval(interval); // Stop the interval that rotates the cube
  }
};

// Start automatic rotation when the page loads
playPause();

// Event listener for mouseover on the controls: pause rotation
document.querySelector(".controls").addEventListener("mouseover", () => {
  bool = false; // Set the flag to false to stop rotation
  playPause(); // Update the rotation behavior
});

// Event listener for mouseout on the controls: resume rotation
document.querySelector(".controls").addEventListener("mouseout", () => {
  bool = true; // Set the flag to true to resume rotation
  playPause(); // Update the rotation behavior
});
// End of Cube

// Slideshow: Automatically cycle through images every 20 seconds

// Function to create the slideshow divs with background images
const slideshowDivs = () => {
  for (let i = 1; i <= 6; i++) {
    // Loop to create 6 divs for each image
    const div = document.createElement("div"); // Create a div element

    div.style.backgroundImage = `url(/images/slideshow/bg-${i}.jpg)`; // Set the background image for each div

    i === 1 && div.classList.add("change"); // For the first div, add the 'change' class to make it visible

    document.querySelector(".slideshow").appendChild(div); // Append the div to the slideshow container
  }
};

slideshowDivs(); // Call the function to create the slideshow divs

const divs = document.querySelectorAll(".slideshow div"); // Select all divs inside the slideshow container

let a = 1; // Initialize the counter for tracking the current slide

// Function to automatically cycle through the slides every 20 seconds
const slideshow = () => {
  setInterval(() => {
    // Set an interval to change the slide every 20 seconds
    a++; // Increment the counter

    const div = document.querySelector(".slideshow .change"); // Select the current active slide

    div.classList.remove("change"); // Remove the 'change' class from the current slide

    if (a < divs.length) {
      // If there are more slides to show
      div.nextElementSibling.classList.add("change"); // Add 'change' class to the next slide
    } else {
      // If we reach the last slide, loop back to the first slide
      divs[0].classList.add("change"); // Add 'change' class to the first slide
      a = 1; // Reset the counter to 1
    }
  }, 20000); // Change slide every 20 seconds
};

slideshow(); // Start the slideshow
// End of Slideshow

// Section 3: Add a class to an element when it's scrolled into view

const section3Content = document.querySelector(".section-3-content"); // Select the content of section 3

// Event listener for scroll events on the window
window.addEventListener("scroll", () => {
  if (
    window.pageYOffset + window.innerHeight >= // Check if the bottom of the viewport has passed the halfway point of section 3
    section3Content.offsetTop + section3Content.offsetHeight / 2 // Check if the section is halfway visible
  ) {
    section3Content.classList.add("change"); // If so, add the 'change' class to trigger an animation or effect
  }
});
// End of Section 3

// Section 4: Control the movement of watch bands and cases using arrow buttons

// Select elements related to watch bands, cases, and controls
const watchBands = document.querySelector(".watch-bands");
const watchCases = document.querySelector(".watch-cases");

const watchTopControl = document.querySelector(".watch-top-control");
const watchRightControl = document.querySelector(".watch-right-control");
const watchBottomControl = document.querySelector(".watch-bottom-control");
const watchLeftControl = document.querySelector(".watch-left-control");

let axisY = 0; // Initialize Y-axis position for watch cases
let axisX = 0; // Initialize X-axis position for watch bands

// Function to hide control buttons when movement reaches a certain limit
const hideControl = () => {
  if (axisY === -280) {
    // If the Y position reaches the top limit
    watchTopControl.classList.add("hideControl"); // Hide the top control button
  } else {
    watchTopControl.classList.remove("hideControl"); // Otherwise, show the top control button
  }

  if (axisY === 280) {
    // If the Y position reaches the bottom limit
    watchBottomControl.classList.add("hideControl"); // Hide the bottom control button
  } else {
    watchBottomControl.classList.remove("hideControl"); // Otherwise, show the bottom control button
  }

  if (axisX === 280) {
    // If the X position reaches the right limit
    watchRightControl.classList.add("hideControl"); // Hide the right control button
  } else {
    watchRightControl.classList.remove("hideControl"); // Otherwise, show the right control button
  }

  if (axisX === -280) {
    // If the X position reaches the left limit
    watchLeftControl.classList.add("hideControl"); // Hide the left control button
  } else {
    watchLeftControl.classList.remove("hideControl"); // Otherwise, show the left control button
  }
};

// Event listeners to move the watch cases and bands when the control buttons are clicked

watchTopControl.addEventListener("click", () => {
  watchCases.style.marginTop = `${(axisY -= 70)}rem`; // Move the watch cases up by 70rem
  hideControl(); // Update visibility of control buttons
});

watchBottomControl.addEventListener("click", () => {
  watchCases.style.marginTop = `${(axisY += 70)}rem`; // Move the watch cases down by 70rem
  hideControl(); // Update visibility of control buttons
});

watchRightControl.addEventListener("click", () => {
  watchBands.style.marginRight = `${(axisX += 70)}rem`; // Move the watch bands to the right by 70rem
  hideControl(); // Update visibility of control buttons
});

watchLeftControl.addEventListener("click", () => {
  watchBands.style.marginRight = `${(axisX -= 70)}rem`; // Move the watch bands to the left by 70rem
  hideControl(); // Update visibility of control buttons
});

// End of Section 4

// Function to show or hide the scroll-to-top button based on scroll position
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up"); // Select the scroll-up button
  // Add 'show-scroll' class to scroll-up button if scrolled down more than 350px
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll") // Show the button
    : scrollUp.classList.remove("show-scroll"); // Hide the button
};

// Add scroll event listener for the scroll-up function
window.addEventListener("scroll", scrollUp);

// Adding Scroll Reveal Animation To Each Section Classes

// Initialize ScrollReveal with specified configuration options
const sr = ScrollReveal({
  origin: "top", // Elements will appear from the top
  distance: "60px", // Elements will move 60px from their original position
  duration: 3000, // Animation duration is 3000 milliseconds (3 seconds)
  delay: 400, // Each element will have a 400ms delay before starting the animation
  reset: true, // Elements will reappear when scrolled into view again
});

// Reveal specified elements with the default settings
sr.reveal(
  `.section-1-banner p, .section-1-banner span, .section-2-heading, .section-3-heading, .watches, .section-5-heading`
);

// Reveal these elements from the right side
sr.reveal(
  `.section-1-banner h1, .section-1-banner button, .iphone-btns .btn-2, .section-4 button, .airpods .airpods-img-2, .airpods .button-2, .icon-4, .icon-5`,
  {
    origin: "right", // Elements will appear from the right
  }
);

// Reveal these elements from the left side
sr.reveal(
  `.controls, .iphone-btns .btn-1, .airpods .airpods-img-1, .airpods .btn-1, .icon-1, .icon-2`,
  {
    origin: "left", // Elements will appear from the left
  }
);

sr.reveal(`.iphones, .icon-3, .copyright`, {
  origin: "bottom",
  delay: 600, // Elements will appear from the bottom
});
