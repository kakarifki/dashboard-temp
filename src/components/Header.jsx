import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useConfig } from '../context/ConfigContext'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { config, pauseMonitoring, startMonitoring } = useConfig()

    const isDashboard = location.pathname === '/dashboard'

    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('iot-dashboard-theme')
        if (saved) return saved === 'dark'
        return true // default to dark mode
    })

    // Apply theme on mount and when it changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('iot-dashboard-theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('iot-dashboard-theme', 'light')
        }
    }, [isDarkMode])

    const toggleTheme = () => setIsDarkMode(prev => !prev)

    return (
        <header className="sticky top-0 z-50 glass-panel border-b border-surface-dark-lighter/50 px-6 py-4">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                {/* Logo & Title */}
                <div
                    className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/dashboard')}
                >
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                        <span className="material-symbols-outlined text-[24px]">hub</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">IoT Dashboard</h2>
                        {isDashboard && config.isConnected && (
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 pulsing-dot"></span>
                                </span>
                                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Connected</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {isDashboard && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/setup')}
                            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-surface-dark-lighter hover:bg-slate-600 transition-colors px-4 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-white/10"
                        >
                            <span className="material-symbols-outlined text-[18px]">settings</span>
                            <span>Config</span>
                        </button>
                        <button
                            onClick={() => config.isMonitoring ? pauseMonitoring() : startMonitoring()}
                            className={`flex h-10 items-center justify-center gap-2 rounded-lg transition-colors px-6 text-sm font-bold text-white shadow-lg ${config.isMonitoring
                                ? 'bg-primary hover:bg-primary/90 shadow-primary/20'
                                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {config.isMonitoring ? 'pause' : 'play_arrow'}
                            </span>
                            <span>{config.isMonitoring ? 'Pause' : 'Resume'}</span>
                        </button>
                    </div>
                )}

                {/* Theme toggle for setup page */}
                {!isDashboard && (
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center size-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        <span className="material-symbols-outlined">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                )}
            </div>
        </header>
    )
}
