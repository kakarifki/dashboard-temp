import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { useConfig } from '../context/ConfigContext'

/**
 * Smart data extractor - tries to find numeric value from various JSON formats
 */
function extractValue(data) {
    if (data === null || data === undefined) return null

    // If it's already a number
    if (typeof data === 'number') return data

    // If it's an object, look for common keys
    if (typeof data === 'object') {
        const valueKeys = ['value', 'temp', 'suhu', 'temperature', 'humidity', 'kelembaban', 'data']
        for (const key of valueKeys) {
            if (key in data && typeof data[key] === 'number') {
                return data[key]
            }
        }
        // Try first numeric value found
        for (const val of Object.values(data)) {
            if (typeof val === 'number') return val
        }
    }

    return null
}

/**
 * Extract timestamp from response or use current time
 */
function extractTimestamp(data) {
    if (data && typeof data === 'object') {
        const timeKeys = ['timestamp', 'time', 'waktu', 'datetime', 'created_at']
        for (const key of timeKeys) {
            if (key in data) {
                return new Date(data[key])
            }
        }
    }
    return new Date()
}

export function useIotData() {
    const { config, addLog, startMonitoring, pauseMonitoring } = useConfig()
    const [dataPoints, setDataPoints] = useState([])
    const [currentValue, setCurrentValue] = useState(null)
    const [previousValue, setPreviousValue] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [stats, setStats] = useState({
        totalReads: 0,
        startTime: null,
    })

    const intervalRef = useRef(null)
    const abortControllerRef = useRef(null)

    const fetchData = useCallback(async () => {
        if (!config.apiUrl) return

        // Cancel any pending request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }
        abortControllerRef.current = new AbortController()

        const startTime = Date.now()
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios({
                method: config.method,
                url: config.apiUrl,
                timeout: 5000,
                headers: config.authToken ? {
                    'Authorization': config.authToken
                } : {},
                signal: abortControllerRef.current.signal,
            })

            const latency = Date.now() - startTime
            const data = response.data
            const value = extractValue(data)
            const timestamp = extractTimestamp(data)

            // Update values using functional updates to avoid stale closure
            setCurrentValue(prevCurrent => {
                setPreviousValue(prevCurrent)
                return value
            })

            // Add to data points (max 50)
            if (value !== null) {
                setDataPoints(prev => {
                    const newPoint = { value, timestamp }
                    const updated = [...prev, newPoint]
                    return updated.slice(-50)
                })
            }

            // Update stats
            setStats(prev => ({
                totalReads: prev.totalReads + 1,
                startTime: prev.startTime || new Date(),
            }))

            // Log success
            addLog({
                type: 'success',
                status: response.status,
                message: value !== null
                    ? `Data received: ${value}`
                    : 'Response received (no numeric value found)',
                latency,
                raw: JSON.stringify(data),
            })

        } catch (err) {
            if (err.name === 'CanceledError') return

            const latency = Date.now() - startTime
            const errorMsg = err.response?.status
                ? `HTTP ${err.response.status}`
                : err.code || err.message

            setError(errorMsg)

            addLog({
                type: 'error',
                status: err.response?.status || 'ERROR',
                message: errorMsg,
                latency,
                raw: err.message,
            })
        } finally {
            setIsLoading(false)
        }
    }, [config.apiUrl, config.method, config.authToken, addLog])

    // Test connection (single fetch)
    const testConnection = useCallback(async () => {
        return fetchData()
    }, [fetchData])

    // Start/stop polling based on isMonitoring
    useEffect(() => {
        if (config.isMonitoring && config.apiUrl) {
            // Initial fetch
            fetchData()

            // Set up interval
            intervalRef.current = setInterval(fetchData, config.interval)

            // Set start time if not set
            setStats(prev => ({
                ...prev,
                startTime: prev.startTime || new Date(),
            }))
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [config.isMonitoring, config.apiUrl, config.interval, fetchData])

    // Calculate delta percentage
    const delta = currentValue !== null && previousValue !== null && previousValue !== 0
        ? ((currentValue - previousValue) / previousValue * 100).toFixed(1)
        : null

    return {
        dataPoints,
        currentValue,
        previousValue,
        delta,
        isLoading,
        error,
        stats,
        testConnection,
        startMonitoring,
        pauseMonitoring,
    }
}
