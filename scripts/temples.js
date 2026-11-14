// Hamburger Menu Toggle Logic
const hamburgerButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

hamburgerButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerButton.classList.toggle('open');

    // Update ARIA attribute for accessibility
    const isExpanded = navigation.classList.contains('open');
    hamburgerButton.setAttribute('aria-expanded', isExpanded);
});

// Dynamic Footer Year
const currentYearSpan = document.querySelector('#currentyear');
currentYearSpan.textContent = new Date().getFullYear();

// Dynamic Last Modified Date
const lastModifiedSpan = document.querySelector('#last-modified');
lastModifiedSpan.textContent = document.lastModified;