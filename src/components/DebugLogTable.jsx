import { useEffect, useRef } from 'react'
import { useConfig } from '../context/ConfigContext'

export default function DebugLogTable() {
    const { logs, clearLogs } = useConfig()
    const scrollRef = useRef(null)

    // Auto-scroll to bottom on new logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs])

    const getStatusBadge = (log) => {
        if (log.type === 'success') {
            return (
                <span className="inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
                    {log.status} OK
                </span>
            )
        }
        if (log.type === 'error') {
            return (
                <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
                    ERROR
                </span>
            )
        }
        if (log.type === 'warning' || log.status === 'TIMEOUT') {
            return (
                <span className="inline-flex items-center rounded-md bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-400/20">
                    TIMEOUT
                </span>
            )
        }
        return (
            <span className="inline-flex items-center rounded-md bg-slate-400/10 px-2 py-1 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-400/20">
                {log.status}
            </span>
        )
    }

    return (
        <div className="glass-panel rounded-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-800/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">terminal</span>
                    Debug Log
                </h3>
                <button
                    onClick={clearLogs}
                    className="text-xs font-medium text-primary hover:text-primary/80 uppercase tracking-wider"
                >
                    Clear Log
                </button>
            </div>

            {/* Table */}
            <div ref={scrollRef} className="overflow-x-auto max-h-[300px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900/50 text-xs uppercase text-slate-400 font-medium sticky top-0">
                        <tr>
                            <th className="px-6 py-3 font-mono">Timestamp</th>
                            <th className="px-6 py-3 font-mono">Status Code</th>
                            <th className="px-6 py-3 font-mono">Message</th>
                            <th className="px-6 py-3 font-mono text-right">Latency</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-sm">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    No logs yet. Start monitoring to see data.
                                </td>
                            </tr>
                        ) : (
                            logs.slice().reverse().map((log, index) => (
                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-slate-300">{log.timestamp}</td>
                                    <td className="px-6 py-4">{getStatusBadge(log)}</td>
                                    <td className={`px-6 py-4 ${log.type === 'error' ? 'text-red-300' :
                                            log.type === 'warning' ? 'text-amber-200' :
                                                'text-slate-300'
                                        }`}>
                                        {log.message}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-right">
                                        {log.latency > 0 ? `${log.latency}ms` : '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
