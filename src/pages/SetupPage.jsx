import Header from '../components/Header'
import ConfigCard from '../components/ConfigCard'

export default function SetupPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center p-4 sm:p-8 relative">
                {/* Abstract Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none"></div>

                <ConfigCard />
            </main>
        </div>
    )
}
