//initialize throttleTimer as false
let throttleTimer = false;

const throttle = (callback, time) => {
  //don't run the function while throttle timer is true
  if (throttleTimer) return;

  //first set throttle timer to true so the function doesn't run
  throttleTimer = true;

  setTimeout(() => {
    //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
    callback();
    throttleTimer = false;
  }, time);
};

const scrollElements = document.querySelectorAll(".slideIn");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("slideIn-transition");
};

const hideScrollElement = (element) => {
  element.classList.remove("slideIn-transition");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 100);
});

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
  //check if mediaQuery exists and if the value for mediaQuery does not match 'reduce', return the scrollAnimation.
  if (mediaQuery && !mediaQuery.matches) {
    handleScrollAnimation();
  }
});

//Reload Form

window.onload = function () {
  // Reset the form fields when the page loads
  document.getElementById("form").reset();
};
