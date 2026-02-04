const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

// Temperature simulation settings
let currentTemp = 25.5;
const minTemp = 20;
const maxTemp = 35;

function generateNewData() {
    // Random walk - temperature changes by -1.5 to +1.5
    const change = (Math.random() - 0.5) * 3;
    currentTemp = Math.max(minTemp, Math.min(maxTemp, currentTemp + change));

    // Random humidity between 40-80%
    const humidity = Math.floor(40 + Math.random() * 40);

    const data = {
        sensor: {
            temperature: Math.round(currentTemp * 10) / 10,
            humidity: humidity,
            timestamp: new Date().toISOString()
        }
    };

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log(`[${new Date().toLocaleTimeString()}] Temperature: ${data.sensor.temperature}°C, Humidity: ${data.sensor.humidity}%`);
}

// Update every 3 seconds
console.log('🌡️  Mock IoT Sensor Started!');
console.log('   Temperature will fluctuate between 20-35°C');
console.log('   Press Ctrl+C to stop\n');

generateNewData(); // Initial data
setInterval(generateNewData, 3000); // Update every 3 seconds
