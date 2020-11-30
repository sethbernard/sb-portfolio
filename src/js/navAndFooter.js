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

// Get current year for footer
let date = new Date().getFullYear();
document.getElementById('current-year').innerHTML = date;
