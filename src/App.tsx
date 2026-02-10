import { useState, useEffect } from 'react'
import { StatusResponse } from './types'
import OfficeLayout from './components/OfficeLayout'
import StatsBar from './components/StatsBar'
import ActivityFeed from './components/ActivityFeed'

function App() {
  const [data, setData] = useState<StatusResponse | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status')
        const json = await response.json()
        setData(json)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch status:', error)
        setLoading(false)
      }
    }

    // Initial fetch
    fetchStatus()

    // Poll every 30 seconds
    const interval = setInterval(fetchStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Update clock every second
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🐉</div>
          <div className="text-xl text-gray-400">Initializing Dragon HQ...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Header */}
      <header className="bg-navy-light border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🐉</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal to-blue-400 bg-clip-text text-transparent">
                  Dragon HQ
                </h1>
                <p className="text-sm text-gray-400">Yena AI Operations Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-400">System Time</div>
                <div className="text-xl font-mono text-teal">{formatTime(currentTime)}</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      {data && <StatsBar stats={data.stats} />}

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Office Layout - takes 2 columns on large screens */}
          <div className="xl:col-span-2">
            {data && <OfficeLayout agents={data.agents} />}
          </div>

          {/* Activity Feed - takes 1 column */}
          <div className="xl:col-span-1">
            {data && <ActivityFeed activities={data.recentActivity} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
