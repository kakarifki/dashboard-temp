import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfig } from '../context/ConfigContext'
import { useIotData } from '../hooks/useIotData'
import Header from '../components/Header'
import StatCard from '../components/StatCard'
import LiveChart from '../components/LiveChart'
import DebugLogTable from '../components/DebugLogTable'

function formatUptime(startTime) {
    if (!startTime) return '00:00:00'

    const diff = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000)
    const hours = Math.floor(diff / 3600).toString().padStart(2, '0')
    const minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, '0')
    const seconds = (diff % 60).toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}

export default function DashboardPage() {
    const navigate = useNavigate()
    const { config } = useConfig()
    const {
        dataPoints,
        currentValue,
        delta,
        stats,
    } = useIotData()

    const [uptime, setUptime] = useState('00:00:00')

    // Redirect to setup if not connected
    useEffect(() => {
        if (!config.apiUrl || !config.isConnected) {
            navigate('/setup')
        }
    }, [config.apiUrl, config.isConnected, navigate])

    // Update uptime every second
    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(formatUptime(stats.startTime))
        }, 1000)

        return () => clearInterval(interval)
    }, [stats.startTime])

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 sm:px-6 py-8">
                <div className="mx-auto max-w-7xl flex flex-col gap-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            title="Temperature"
                            value={currentValue !== null ? `${currentValue.toFixed(1)}°C` : 'N/A'}
                            subtitle="Optimal range: 30-35°C"
                            badge={delta !== null ? `${delta}%` : null}
                            badgeType={delta > 0 ? 'success' : delta < 0 ? 'warning' : 'default'}
                            icon="thermostat"
                            iconColor="text-primary"
                            accentColor="from-primary/50"
                        />

                        <StatCard
                            title="System Status"
                            value={config.isMonitoring ? 'Active' : 'Paused'}
                            subtitle="Latency check passed"
                            badge={`${(config.interval / 1000).toFixed(1)}s`}
                            badgeType="default"
                            icon="check_circle"
                            iconColor="text-emerald-500"
                            accentColor="from-emerald-500/50"
                        />

                        <StatCard
                            title="Uptime Session"
                            value={uptime}
                            subtitle={
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">sync_alt</span>
                                    {stats.totalReads} reads completed
                                </span>
                            }
                            icon="schedule"
                            iconColor="text-amber-500"
                            accentColor="from-amber-500/50"
                        />
                    </div>

                    {/* Live Chart */}
                    <LiveChart
                        dataPoints={dataPoints}
                        currentValue={currentValue}
                        pollingRate={config.interval}
                    />

                    {/* Debug Log */}
                    <DebugLogTable />
                </div>
            </main>
        </div>
    )
}
