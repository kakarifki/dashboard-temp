import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ConfigContext = createContext(null)

const STORAGE_KEY = 'iot-dashboard-config'

const defaultConfig = {
    apiUrl: '',
    method: 'GET',
    interval: 2000,
    authToken: '',
    isConnected: false,
    isMonitoring: false,
}

export function ConfigProvider({ children }) {
    const [config, setConfigState] = useState(() => {
        // Load from localStorage on initial render
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                const parsed = JSON.parse(saved)
                return { ...defaultConfig, ...parsed, isMonitoring: false }
            }
        } catch (e) {
            console.error('Failed to load config from localStorage:', e)
        }
        return defaultConfig
    })

    const [logs, setLogs] = useState([])

    // Persist to localStorage when config changes
    useEffect(() => {
        try {
            const toSave = { ...config, isMonitoring: false }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
        } catch (e) {
            console.error('Failed to save config to localStorage:', e)
        }
    }, [config])

    const setConfig = useCallback((updates) => {
        setConfigState(prev => ({ ...prev, ...updates }))
    }, [])

    const addLog = useCallback((entry) => {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        setLogs(prev => [...prev.slice(-99), { ...entry, timestamp }])
    }, [])

    const clearLogs = useCallback(() => setLogs([]), [])

    const startMonitoring = useCallback(() => setConfigState(prev => ({ ...prev, isMonitoring: true })), [])
    const pauseMonitoring = useCallback(() => setConfigState(prev => ({ ...prev, isMonitoring: false })), [])

    return (
        <ConfigContext.Provider value={{
            config,
            setConfig,
            logs,
            addLog,
            clearLogs,
            startMonitoring,
            pauseMonitoring,
        }}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    const context = useContext(ConfigContext)
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider')
    }
    return context
}
