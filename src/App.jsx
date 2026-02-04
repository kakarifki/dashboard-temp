import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, useConfig } from './context/ConfigContext'
import SetupPage from './pages/SetupPage'
import DashboardPage from './pages/DashboardPage'

function AppRoutes() {
    const { config } = useConfig()

    return (
        <Routes>
            <Route
                path="/"
                element={
                    config.apiUrl && config.isConnected
                        ? <Navigate to="/dashboard" replace />
                        : <Navigate to="/setup" replace />
                }
            />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    )
}

function App() {
    return (
        <ConfigProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-background-dark text-white font-display">
                    <AppRoutes />
                </div>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App
