import { useEffect, useRef } from 'react'

export default function ConsoleLog({ logs = [] }) {
    const scrollRef = useRef(null)

    // Auto-scroll to bottom when new logs arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs])

    return (
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">terminal</span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        Console Log
                    </span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="bg-slate-950 rounded-lg p-4 font-mono text-xs md:text-sm border border-slate-800 shadow-inner min-h-[120px] max-h-[200px] overflow-y-auto relative"
            >
                {/* Status indicator */}
                <div className="absolute top-0 right-0 p-2">
                    <span className="flex h-2 w-2 relative">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${logs.length > 0 && logs[logs.length - 1]?.type === 'success'
                                ? 'bg-green-400'
                                : logs.length > 0 && logs[logs.length - 1]?.type === 'error'
                                    ? 'bg-red-400'
                                    : 'bg-slate-400'
                            }`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${logs.length > 0 && logs[logs.length - 1]?.type === 'success'
                                ? 'bg-green-500'
                                : logs.length > 0 && logs[logs.length - 1]?.type === 'error'
                                    ? 'bg-red-500'
                                    : 'bg-slate-500'
                            }`}></span>
                    </span>
                </div>

                {logs.length === 0 ? (
                    <>
                        <p className="text-slate-500 opacity-50"># System initialized...</p>
                        <p className="text-slate-500 opacity-50">&gt; Ready for configuration.</p>
                        <p className="mt-2 text-white">
                            <span className="text-blue-400">root@iot-dash:~$</span> Waiting for connection...
                        </p>
                        <span className="inline-block w-2 h-4 bg-green-500 align-middle animate-pulse ml-0.5"></span>
                    </>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className={`mb-1 ${log.type === 'success' ? 'text-green-400' :
                                log.type === 'error' ? 'text-red-400' :
                                    log.type === 'warning' ? 'text-amber-400' :
                                        'text-slate-300'
                            }`}>
                            <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                            <span className={`${log.type === 'success' ? 'text-emerald-400' :
                                    log.type === 'error' ? 'text-red-400' :
                                        'text-slate-400'
                                }`}>
                                {log.status}
                            </span>{' '}
                            <span className="text-white">{log.message}</span>
                            {log.latency > 0 && (
                                <span className="text-slate-500 ml-2">({log.latency}ms)</span>
                            )}
                            {log.raw && (
                                <div className="mt-1 ml-4 text-slate-400 text-xs break-all">
                                    {log.raw.length > 100 ? log.raw.substring(0, 100) + '...' : log.raw}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
