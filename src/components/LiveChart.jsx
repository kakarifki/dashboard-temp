import { useRef, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
)

export default function LiveChart({ dataPoints = [], currentValue, pollingRate }) {
    const chartRef = useRef(null)

    // Generate labels (time ago in seconds)
    const labels = dataPoints.map((_, index) => {
        const secondsAgo = (dataPoints.length - 1 - index) * (pollingRate / 1000)
        return secondsAgo === 0 ? 'Now' : `-${secondsAgo}s`
    })

    const data = {
        labels,
        datasets: [
            {
                data: dataPoints.map(d => d.value),
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
                    gradient.addColorStop(0, 'rgba(100, 103, 242, 0.4)')
                    gradient.addColorStop(1, 'rgba(100, 103, 242, 0)')
                    return gradient
                },
                borderColor: '#6467f2',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6467f2',
                pointHoverBorderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 300,
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: (context) => `Value: ${context.raw?.toFixed(1) || 'N/A'}`,
                },
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                beginAtZero: false,
            },
        },
    }

    return (
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">ssid_chart</span>
                        Live Telemetry
                    </h3>
                    <p className="text-slate-400 text-sm">
                        Real-time sensor data stream (Polling rate: {pollingRate / 1000}s)
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">zoom_out_map</span>
                    </button>
                    <button className="p-2 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">download</span>
                    </button>
                </div>
            </div>

            {/* Chart Container */}
            <div className="relative h-[300px] w-full bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden">
                {dataPoints.length > 0 ? (
                    <>
                        <Line ref={chartRef} data={data} options={options} />

                        {/* Current value overlay */}
                        <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg shadow-xl">
                            <span className="text-xs text-slate-400 block">Current</span>
                            <span className="text-lg font-bold text-white">
                                {currentValue !== null ? `${currentValue.toFixed(1)}°C` : 'N/A'}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-500">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl mb-2 block">show_chart</span>
                            <p>Waiting for data...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* X Axis Labels */}
            {dataPoints.length > 0 && (
                <div className="flex justify-between px-2 text-xs text-slate-500 font-mono">
                    <span>-60s</span>
                    <span>-50s</span>
                    <span>-40s</span>
                    <span>-30s</span>
                    <span>-20s</span>
                    <span>-10s</span>
                    <span>Now</span>
                </div>
            )}
        </div>
    )
}
