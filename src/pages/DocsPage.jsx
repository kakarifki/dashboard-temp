import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function DocsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow p-4 sm:p-8 relative overflow-hidden">
                {/* Abstract Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
                            Documentation
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Learn how to setup and use the IoT Temperature Dashboard
                        </p>
                        <Link
                            to="/docs-id"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-full text-amber-400 font-medium transition-all hover:scale-105"
                        >
                            <span className="material-symbols-outlined text-lg">waving_hand</span>
                            Khusus Shandi, klik disini
                        </Link>
                    </div>

                    {/* Content Cards */}
                    <div className="space-y-8">
                        {/* What is this app? */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-primary">info</span>
                                <h2 className="text-2xl font-bold text-white">What is This App?</h2>
                            </div>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    <strong className="text-white">IoT Temperature Dashboard</strong> is a real-time monitoring frontend
                                    designed for Internet of Things (IoT) projects. This application connects to your IoT devices
                                    through REST APIs and visualizes sensor data in beautiful, interactive charts.
                                </p>
                                <p>
                                    Originally built to display temperature readings from thermometers connected via
                                    <strong className="text-primary"> Node-RED</strong>, this dashboard is flexible enough to work with any
                                    REST API that delivers sensor data in a compatible JSON format.
                                </p>
                                <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary">lightbulb</span>
                                        <p className="text-sm">
                                            <strong className="text-primary">Use Case:</strong> Your friend has a thermometer sensor
                                            connected to a microcontroller, which sends temperature data to Node-RED. Node-RED exposes
                                            the data via a REST API endpoint. This dashboard fetches that data periodically and displays
                                            it on a live rolling chart!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Features */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-emerald-400">star</span>
                                <h2 className="text-2xl font-bold text-white">Features</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: 'settings', title: 'Flexible API Configuration', desc: 'Enter any REST API URL, choose GET or POST method' },
                                    { icon: 'show_chart', title: 'Real-time Chart', desc: 'Live rolling line chart with smooth animations' },
                                    { icon: 'timer', title: 'Configurable Polling', desc: 'Set your preferred refresh interval (500ms - 60s)' },
                                    { icon: 'terminal', title: 'Debug Console', desc: 'View API responses and errors in real-time' },
                                    { icon: 'save', title: 'Persistent Settings', desc: 'Configuration saved to localStorage' },
                                    { icon: 'thermostat', title: 'Temperature Stats', desc: 'Current, Min, Max, and Average readings' },
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                                        <span className="material-symbols-outlined text-primary">{feature.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-white">{feature.title}</h3>
                                            <p className="text-sm text-slate-400">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Data Format */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-amber-400">data_object</span>
                                <h2 className="text-2xl font-bold text-white">Expected Data Format</h2>
                            </div>
                            <div className="space-y-6 text-slate-300">
                                <p>
                                    Your API endpoint should return a JSON response. The dashboard uses a
                                    <strong className="text-white"> Smart Fetcher</strong> that can automatically detect temperature values
                                    from various JSON structures.
                                </p>

                                {/* Recommended Format */}
                                <div>
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                                        Recommended Format
                                    </h3>
                                    <div className="bg-[#15151e] border border-slate-700 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                                        <pre className="text-emerald-400">{`{
  "temperature": 25.5,
  "humidity": 60,
  "timestamp": "2026-02-05T00:00:00Z"
}`}</pre>
                                    </div>
                                </div>

                                {/* Alternative Formats */}
                                <div>
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-amber-400 text-lg">info</span>
                                        Other Supported Formats
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-3">
                                        The Smart Fetcher will try to find a numeric value from these fields (in order):
                                    </p>
                                    <div className="bg-[#15151e] border border-slate-700 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                                        <pre className="text-slate-300">{`// Field priority:
"temperature", "temp", "suhu", "value", "data", "reading"

// Examples that work:
{ "temp": 28.3 }
{ "suhu": 30.0, "waktu": "..." }
{ "data": { "temperature": 26.5 } }
{ "value": 27.1 }
{ "reading": 25.8 }`}</pre>
                                    </div>
                                </div>

                                {/* Node-RED Example */}
                                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-amber-400">warning</span>
                                        <div>
                                            <p className="text-sm font-semibold text-amber-400 mb-2">Node-RED Users:</p>
                                            <p className="text-sm text-slate-300">
                                                If your current Node-RED response looks like this:
                                            </p>
                                            <pre className="mt-2 bg-[#15151e] p-3 rounded-lg text-xs">
                                                {`{ "message": "rest api sudah jalan", "waktu": "..." }`}
                                            </pre>
                                            <p className="text-sm text-slate-300 mt-2">
                                                You need to modify your Node-RED flow to include the actual temperature reading.
                                                Add a <code className="bg-slate-700 px-2 py-0.5 rounded">temperature</code> field
                                                with the sensor value.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Example */}
                                <div>
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">code</span>
                                        Complete Example Response
                                    </h3>
                                    <div className="bg-[#15151e] border border-slate-700 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                                        <pre className="text-slate-300">{`// Your Node-RED function node should output:
{
  "message": "success",
  "temperature": 28.5,
  "unit": "celsius",
  "timestamp": "2026-02-05T00:54:00+07:00",
  "sensor_id": "thermometer_01"
}`}</pre>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* How to Use */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-cyan-400">menu_book</span>
                                <h2 className="text-2xl font-bold text-white">How to Use</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { step: 1, title: 'Configure Your API', desc: 'Go to the Setup page and enter your Node-RED API endpoint URL (e.g., http://localhost:1880/temperature)' },
                                    { step: 2, title: 'Select Method', desc: 'Choose GET or POST depending on your API configuration. Most simple APIs use GET.' },
                                    { step: 3, title: 'Set Refresh Rate', desc: 'Configure how often the dashboard should fetch new data (default: 2000ms = 2 seconds)' },
                                    { step: 4, title: 'Test Connection', desc: 'Click "Connect & Test" to verify the connection. Check the debug console for response details.' },
                                    { step: 5, title: 'Monitor Data', desc: 'Once connected, you\'ll be redirected to the Dashboard where you can see real-time temperature charts!' },
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-sm">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{item.title}</h3>
                                            <p className="text-sm text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Troubleshooting */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-red-400">build</span>
                                <h2 className="text-2xl font-bold text-white">Troubleshooting</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-800/30 rounded-xl">
                                    <h3 className="font-semibold text-white mb-2">🔴 "Network Error" or CORS Error</h3>
                                    <p className="text-sm text-slate-400">
                                        Make sure your Node-RED has CORS enabled. Add a <code className="bg-slate-700 px-2 py-0.5 rounded">http response</code> node
                                        with the header <code className="bg-slate-700 px-2 py-0.5 rounded">Access-Control-Allow-Origin: *</code>
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-800/30 rounded-xl">
                                    <h3 className="font-semibold text-white mb-2">🔴 "Unable to find temperature value"</h3>
                                    <p className="text-sm text-slate-400">
                                        Your API response doesn't have a recognizable temperature field.
                                        Make sure your JSON includes one of: <code className="bg-slate-700 px-2 py-0.5 rounded">temperature, temp, suhu, value, data, reading</code>
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-800/30 rounded-xl">
                                    <h3 className="font-semibold text-white mb-2">🔴 Chart not updating</h3>
                                    <p className="text-sm text-slate-400">
                                        Check if monitoring is enabled (toggle in the header). Also verify that the API
                                        is returning different values — if the temperature is static, the chart line will remain flat.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Back to Setup CTA */}
                    <div className="text-center mt-12">
                        <Link
                            to="/setup"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02]"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            Back to Setup
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
