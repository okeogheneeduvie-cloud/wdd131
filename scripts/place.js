// Dynamic Footer Information
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Static Weather Inputs matching HTML content
const temperature = 30; // °C
const windSpeed = 12;   // km/h

// Function to calculate wind chill using metric formula (°C and km/h)
// Formula: 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
const calculateWindChill = (temp, wind) => 
    (13.12 + (0.6215 * temp) - (11.37 * Math.pow(wind, 0.16)) + (0.3965 * temp * Math.pow(wind, 0.16))).toFixed(1);

// Viable Metric conditions check: Temperature <= 10 °C and Wind speed > 4.8 km/h
function displayWindChill() {
    const windChillElement = document.getElementById("windchill");

    if (temperature <= 10 && windSpeed > 4.8) {
        windChillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        windChillElement.textContent = "N/A";
    }
}

// Execute on page load
displayWindChill();