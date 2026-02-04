import { useRef, useState, useCallback } from 'react'
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
    const containerRef = useRef(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Generate labels from actual timestamps
    const labels = dataPoints.map((point) => {
        const date = new Date(point.timestamp)
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
    })

    // Download chart as PNG
    const handleDownload = useCallback(() => {
        if (chartRef.current) {
            const chart = chartRef.current
            const url = chart.toBase64Image('image/png', 1.0)
            const link = document.createElement('a')
            link.download = `telemetry-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`
            link.href = url
            link.click()
        }
    }, [])

    // Toggle fullscreen
    const handleFullscreen = useCallback(() => {
        if (!containerRef.current) return

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() => {
                setIsFullscreen(true)
            }).catch(err => {
                console.error('Fullscreen error:', err)
            })
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false)
            })
        }
    }, [])

    // Listen for fullscreen change
    const handleFullscreenChange = useCallback(() => {
        setIsFullscreen(!!document.fullscreenElement)
    }, [])

    // Add event listener for fullscreen change
    if (typeof document !== 'undefined') {
        document.addEventListener('fullscreenchange', handleFullscreenChange)
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature',
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
                    label: (context) => `Temperature: ${context.raw?.toFixed(1) || 'N/A'}°C`,
                },
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11,
                    },
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 8,
                },
                title: {
                    display: true,
                    text: 'Time',
                    color: '#94a3b8',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                    padding: { top: 8 },
                },
            },
            y: {
                display: true,
                beginAtZero: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11,
                    },
                    callback: (value) => `${value}°`,
                },
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: '#94a3b8',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                    padding: { bottom: 8 },
                },
            },
        },
    }

    return (
        <div
            ref={containerRef}
            className={`glass-panel rounded-2xl p-6 flex flex-col gap-4 ${isFullscreen ? 'bg-[#0f0f17] fixed inset-0 z-50 rounded-none' : ''}`}
        >
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
                    <button
                        onClick={handleFullscreen}
                        className="p-2 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    >
                        <span className="material-symbols-outlined">
                            {isFullscreen ? 'fullscreen_exit' : 'zoom_out_map'}
                        </span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-2 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                        title="Download as PNG"
                    >
                        <span className="material-symbols-outlined">download</span>
                    </button>
                </div>
            </div>

            {/* Chart Container */}
            <div className={`relative w-full bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden ${isFullscreen ? 'flex-1' : 'h-[300px]'}`}>
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
        </div>
    )
}

