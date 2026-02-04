import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useConfig } from '../context/ConfigContext'
import ConsoleLog from './ConsoleLog'

export default function ConfigCard() {
    const navigate = useNavigate()
    const { config, setConfig, addLog, clearLogs, logs } = useConfig()

    const [formData, setFormData] = useState({
        apiUrl: config.apiUrl || '',
        method: config.method || 'GET',
        interval: (config.interval || 2000) / 1000, // Convert ms to seconds for display
        authToken: config.authToken || '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [testResult, setTestResult] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'interval' ? Math.max(0.5, parseFloat(value) || 2) : value
        }))
    }

    const handleTest = async (e) => {
        e.preventDefault()

        if (!formData.apiUrl) {
            setTestResult({ success: false, message: 'Please enter an API URL' })
            return
        }

        setIsLoading(true)
        setTestResult(null)
        clearLogs()

        addLog({
            type: 'info',
            status: '...',
            message: `Testing connection to ${formData.apiUrl}`,
            latency: 0,
        })

        const startTime = Date.now()

        try {
            const response = await axios({
                method: formData.method,
                url: formData.apiUrl,
                timeout: 5000,
                headers: formData.authToken ? {
                    'Authorization': formData.authToken
                } : {},
            })

            const latency = Date.now() - startTime

            addLog({
                type: 'success',
                status: response.status,
                message: 'Connection successful!',
                latency,
                raw: JSON.stringify(response.data, null, 2),
            })

            setTestResult({
                success: true,
                message: 'Connection successful!'
            })

            // Save config - convert interval from seconds to milliseconds
            setConfig({
                ...formData,
                interval: Math.round(formData.interval * 1000), // Convert seconds to ms
                isConnected: true,
            })

            // Navigate to dashboard after a short delay
            setTimeout(() => {
                setConfig({ isMonitoring: true })
                navigate('/dashboard')
            }, 1000)

        } catch (err) {
            const latency = Date.now() - startTime
            const errorMsg = err.response?.status
                ? `HTTP ${err.response.status}: ${err.response.statusText}`
                : err.code === 'ERR_NETWORK'
                    ? 'Network Error - Check if server is running and CORS is enabled'
                    : err.message

            addLog({
                type: 'error',
                status: err.response?.status || 'ERROR',
                message: errorMsg,
                latency,
                raw: err.message,
            })

            setTestResult({
                success: false,
                message: errorMsg
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-2xl relative z-10">
            {/* Headline Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
                    Connect Device
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Configure your API endpoint to start monitoring real-time sensor data streams.
                </p>
            </div>

            {/* Glassmorphic Card */}
            <div className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
                <form onSubmit={handleTest} className="space-y-6">
                    {/* API Endpoint Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            API Endpoint URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined text-lg">link</span>
                            </div>
                            <input
                                type="url"
                                name="apiUrl"
                                value={formData.apiUrl}
                                onChange={handleChange}
                                placeholder="http://localhost:1880/data"
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#15151e] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* HTTP Method Dropdown */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                HTTP Method
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-lg">http</span>
                                </div>
                                <select
                                    name="method"
                                    value={formData.method}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-10 py-3 appearance-none bg-white dark:bg-[#15151e] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all shadow-sm"
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Refresh Interval Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Refresh Interval (seconds)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-lg">timer</span>
                                </div>
                                <input
                                    type="number"
                                    name="interval"
                                    value={formData.interval}
                                    onChange={handleChange}
                                    min="0.5"
                                    max="60"
                                    step="0.5"
                                    placeholder="2"
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#15151e] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Authorization (Optional) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Auth Token <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined text-lg">key</span>
                            </div>
                            <input
                                type="password"
                                name="authToken"
                                value={formData.authToken}
                                onChange={handleChange}
                                placeholder="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI..."
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#15151e] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Test Result Message */}
                    {testResult && (
                        <div className={`p-3 rounded-lg text-sm ${testResult.success
                            ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                            : 'bg-red-400/10 text-red-400 border border-red-400/20'
                            }`}>
                            {testResult.message}
                        </div>
                    )}

                    {/* Connect Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 mt-4 group"
                    >
                        {isLoading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                Testing...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined group-hover:animate-pulse">settings_ethernet</span>
                                Connect & Test
                            </>
                        )}
                    </button>
                </form>

                {/* Terminal / Log Preview */}
                <ConsoleLog logs={logs} />
            </div>

            <p className="text-center text-slate-500 dark:text-slate-600 text-sm mt-6">
                Need help? <Link className="text-primary hover:underline" to="/docs">Read the documentation</Link>
            </p>
        </div>
    )
}
