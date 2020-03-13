// Mobile menu
const mainMenu = document.querySelector('.main-menu');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const menuItems = document.querySelectorAll('nav ul li a');

mobileMenuButton.addEventListener('click', () => {
  mainMenu.classList.toggle('mobile-menu');
});

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    mainMenu.classList.toggle('mobile-menu');
  });
});

// Make navbar appear on scroll up and hide on scroll down
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.querySelector('nav').style.top = '0';
  } else {
    document.querySelector('nav').style.top = '-69px';
  }
  prevScrollPos = currentScrollPos;
});

// Get current year for footer
let date = new Date().getFullYear();
document.getElementById('current-year').innerHTML = date;
