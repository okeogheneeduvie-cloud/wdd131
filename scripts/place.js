// Footer copyright year and last modified timestamp
const currentYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("last-modified");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}

// Weather & Wind Chill calculation (Metric: °C and km/h)
const tempElement = document.getElementById("temp");
const windElement = document.getElementById("wind");
const windChillElement = document.getElementById("windchill");

// One-line wind chill formula in Celsius (T in °C, V in km/h)
const calculateWindChill = (temperature, windSpeed) => (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1);

if (tempElement && windElement && windChillElement) {
    const temperature = parseFloat(tempElement.textContent);
    const windSpeed = parseFloat(windElement.textContent);

    // Metric wind chill applies only when temperature <= 10°C and wind speed > 4.8 km/h
    if (!Number.isNaN(temperature) && !Number.isNaN(windSpeed) && temperature <= 10 && windSpeed > 4.8) {
        windChillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        windChillElement.textContent = "N/A";
    }
}