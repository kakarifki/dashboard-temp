# 🌡️ IoT Temperature Dashboard

A real-time monitoring frontend designed for Internet of Things (IoT) projects. This dashboard connects to IoT devices through REST APIs and visualizes sensor data in beautiful, interactive charts.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chartdotjs&logoColor=white)

## ✨ Features

- **🔧 Flexible API Configuration** - Connect to any REST API with GET or POST methods
- **📈 Real-time Chart** - Live rolling line chart with smooth animations (max 50 data points)
- **⏱️ Configurable Polling** - Set refresh intervals from 500ms to 60 seconds
- **🖥️ Debug Console** - View API responses and errors in real-time
- **💾 Persistent Settings** - Configuration automatically saved to localStorage
- **📊 Temperature Stats** - Current value, min, max, and trend indicators
- **🧠 Smart Fetcher** - Automatically detects temperature values from various JSON formats

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) (v18+)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dashboard-temp

# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

## 📖 How to Use

1. **Configure Your API** - Go to the Setup page and enter your API endpoint URL (e.g., `http://localhost:1880/temperature`)
2. **Select Method** - Choose GET or POST depending on your API configuration
3. **Set Refresh Rate** - Configure how often the dashboard should fetch new data (default: 2000ms)
4. **Test Connection** - Click "Connect & Test" to verify the connection
5. **Monitor Data** - Once connected, you'll be redirected to the Dashboard with real-time charts

## 📦 Expected Data Format

Your API endpoint should return a JSON response. The Smart Fetcher automatically detects temperature values from various structures.

### Recommended Format

```json
{
  "temperature": 25.5,
  "humidity": 60,
  "timestamp": "2026-02-05T00:00:00Z"
}
```

### Supported Field Names

The dashboard searches for values in this priority:
- `temperature`, `temp`, `suhu`, `value`, `data`, `reading`, `humidity`, `kelembaban`

### Examples That Work

```json
{ "temp": 28.3 }
{ "suhu": 30.0, "waktu": "..." }
{ "data": { "temperature": 26.5 } }
{ "value": 27.1 }
```

## 🏗️ Project Structure

```
dashboard-temp/
├── src/
│   ├── components/
│   │   ├── ConfigCard.jsx      # API configuration form
│   │   ├── ConsoleLog.jsx      # Console log display
│   │   ├── DebugLogTable.jsx   # Debug log table
│   │   ├── Header.jsx          # Navigation header
│   │   ├── LiveChart.jsx       # Real-time chart component
│   │   └── StatCard.jsx        # Statistics card component
│   ├── context/
│   │   └── ConfigContext.jsx   # Global configuration state
│   ├── hooks/
│   │   └── useIotData.js       # Data fetching & smart parsing hook
│   ├── pages/
│   │   ├── SetupPage.jsx       # API configuration page
│   │   ├── DashboardPage.jsx   # Main monitoring dashboard
│   │   ├── DocsPage.jsx        # Documentation (English)
│   │   └── DocsPageID.jsx      # Documentation (Indonesian)
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.js
└── index.html
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **Chart.js / react-chartjs-2** | Real-time charts |
| **Axios** | HTTP requests |
| **React Router** | Client-side routing |

## 🔧 Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| API URL | Endpoint to fetch data from | - |
| Method | HTTP method (GET/POST) | GET |
| Interval | Polling interval in ms | 2000 |
| Auth Token | Optional authorization header | - |

## 🐛 Troubleshooting

### CORS Error / Network Error
Make sure your API has CORS enabled. For Node-RED, add an `http response` node with:
```
Access-Control-Allow-Origin: *
```

### "Unable to find temperature value"
Your API response doesn't have a recognizable temperature field. Include one of: `temperature`, `temp`, `suhu`, `value`, `data`, `reading`

### Chart Not Updating
- Check if monitoring is enabled (toggle in the header)
- Verify the API returns different values

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |

## 🤝 Use Case

This dashboard was originally built for displaying temperature readings from thermometers connected via **Node-RED**:

```
[Thermometer Sensor] → [Microcontroller] → [Node-RED] → [REST API] → [This Dashboard]
```

## 📄 License

MIT License - feel free to use this project for your IoT monitoring needs!

---

Built with ❤️ for Shandi IoT enthusiasts
