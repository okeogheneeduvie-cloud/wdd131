// Hamburger Menu Toggle Functionality
const hamburgerButton = document.querySelector('#menu');
const navigationMenu = document.querySelector('nav');

hamburgerButton.addEventListener('click', () => {
    navigationMenu.classList.toggle('open');
    hamburgerButton.classList.toggle('open');
});

// Dynamic Footer Information
const currentYearSpan = document.querySelector('#currentyear');
const lastModifiedSpan = document.querySelector('#last-modified');

// Set current year
const today = new Date();
currentYearSpan.textContent = today.getFullYear();

// Set last modified date
lastModifiedSpan.textContent = document.lastModified;