export default function StatCard({
    title,
    value,
    subtitle,
    badge,
    badgeType = 'default',
    icon,
    iconColor = 'text-primary',
    accentColor = 'from-primary/50'
}) {
    const badgeStyles = {
        success: 'bg-emerald-400/10 text-emerald-400',
        warning: 'bg-amber-400/10 text-amber-400',
        error: 'bg-red-400/10 text-red-400',
        default: 'bg-slate-700/50 text-slate-300',
    }

    return (
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
            {/* Background icon */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className={`material-symbols-outlined text-6xl ${iconColor}`}>{icon}</span>
            </div>

            <div className="flex flex-col gap-1 relative z-10">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>

                <div className="flex items-baseline gap-3 mt-2">
                    <p className="text-4xl font-bold tracking-tight text-white">{value}</p>

                    {badge && (
                        <span className={`flex items-center px-2 py-0.5 rounded text-sm font-medium ${badgeStyles[badgeType]}`}>
                            {badgeType === 'success' && (
                                <span className="material-symbols-outlined text-[16px] mr-0.5">arrow_upward</span>
                            )}
                            {badgeType === 'warning' && (
                                <span className="material-symbols-outlined text-[16px] mr-0.5">arrow_downward</span>
                            )}
                            {badge}
                        </span>
                    )}
                </div>

                {subtitle && (
                    <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Accent gradient at bottom */}
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${accentColor} to-transparent`}></div>
        </div>
    )
}
