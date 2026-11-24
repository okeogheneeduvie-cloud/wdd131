// Evaluate a temperature value (in Celsius) and return a status profile object
function evaluateTemperature(tempCelsius) {
    if (tempCelsius <= -18) {
        return {
            statusClass: "safe",
            heading: `Deep Freeze Safe (${tempCelsius}&deg;C)`,
            guidance: "At or below -18&deg;C, microbial growth is halted for extended frozen storage."
        };
    } else if (tempCelsius <= 4) {
        return {
            statusClass: "safe",
            heading: `Safe Refrigerator Zone (${tempCelsius}&deg;C)`,
            guidance: "Within 4&deg;C or lower—suitable for refrigerated perishables when kept covered."
        };
    } else if (tempCelsius > 4 && tempCelsius <= 60) {
        return {
            statusClass: "danger",
            heading: `Danger Zone Alert (${tempCelsius}&deg;C)`,
            guidance: "Between 5&deg;C and 60&deg;C, bacteria can multiply quickly. Chill below 4&deg;C or heat above 60&deg;C immediately."
        };
    } else {
        return {
            statusClass: "hot",
            heading: `Safe Hot-Holding Zone (${tempCelsius}&deg;C)`,
            guidance: "Above 60&deg;C helps prevent bacterial growth during hot service; cool rapidly into shallow pans before refrigerating."
        };
    }
}

// Render the evaluated temperature result into the DOM using template literals
function renderTemperatureResult(resultContainer, value) {
    const numericTemp = Number(value);

    if (value.trim() === "" || Number.isNaN(numericTemp)) {
        resultContainer.className = "temp-result danger";
        resultContainer.innerHTML = `<p><strong>Invalid Reading:</strong> Please enter a valid number in degrees Celsius (&deg;C).</p>`;
        return;
    }

    const evaluation = evaluateTemperature(numericTemp);
    resultContainer.className = `temp-result ${evaluation.statusClass}`;
    resultContainer.innerHTML = `
    <p><strong>${evaluation.heading}</strong></p>
    <p>${evaluation.guidance}</p>
  `;
}

// Toggle mobile navigation drawer state and ARIA attributes
function toggleMobileNav(navToggle, primaryNav) {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    const nextState = !isExpanded;
    navToggle.setAttribute("aria-expanded", String(nextState));
    primaryNav.classList.toggle("open", nextState);
}

// Initialize DOM event listeners
function initApp() {
    const navToggle = document.querySelector("#nav-toggle");
    const primaryNav = document.querySelector("#primary-nav");
    const checkerForm = document.querySelector("#temp-checker-form");
    const tempInput = document.querySelector("#temp-input");
    const tempResult = document.querySelector("#temp-result");

    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            toggleMobileNav(navToggle, primaryNav);
        });
    }

    if (checkerForm && tempInput && tempResult) {
        checkerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            renderTemperatureResult(tempResult, tempInput.value);
        });
    }
}

document.addEventListener("DOMContentLoaded", initApp);