import { Agent } from '../types'

interface AgentDeskProps {
  agent: Agent
  isBoss?: boolean
  deskStyle?: 'writer' | 'researcher' | 'social' | 'analyst' | 'technical'
}

const deskDecorations = {
  writer: '📝✍️📚',
  researcher: '🔍🔎📋',
  social: '📣📱💬',
  analyst: '📊📈📉',
  technical: '🛠️⚙️🔧'
}

export default function AgentDesk({ agent, isBoss = false, deskStyle = 'writer' }: AgentDeskProps) {
  const getStatusIndicator = () => {
    switch (agent.status) {
      case 'active':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-semibold">ACTIVE</span>
          </div>
        )
      case 'completed':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal rounded-full"></div>
            <span className="text-xs text-teal font-semibold">COMPLETED</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-gray-500 font-semibold">IDLE</span>
          </div>
        )
    }
  }

  const getStatusGlow = () => {
    if (agent.status === 'active') {
      return 'shadow-lg shadow-green-500/30 ring-2 ring-green-500/50 animate-pulse-glow'
    }
    if (agent.status === 'completed') {
      return 'shadow-md shadow-teal/20 ring-1 ring-teal/30'
    }
    return 'opacity-60 grayscale'
  }

  const getActivityIcon = () => {
    switch (agent.status) {
      case 'active':
        return (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-green-500/50 animate-bounce-slow">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-green-400">Working...</span>
              </div>
            </div>
          </div>
        )
      case 'completed':
        return (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="bg-teal/20 backdrop-blur-sm px-3 py-1 rounded-full border border-teal/50">
              <span className="text-xl">✅</span>
            </div>
          </div>
        )
      default:
        return (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="bg-gray-800/50 px-3 py-1 rounded-full">
              <span className="text-xl opacity-40">💤</span>
            </div>
          </div>
        )
    }
  }

  const size = isBoss ? 'text-7xl' : 'text-5xl'

  return (
    <div className="relative">
      {/* Activity Bubble */}
      {getActivityIcon()}

      {/* Speech Bubble with Current Task */}
      {agent.status === 'active' && agent.currentTask && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 z-20">
          <div className="bg-gray-800/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-xl border border-green-500/30 relative">
            <p className="text-xs text-gray-300 leading-relaxed">
              {agent.currentTask}
            </p>
            {/* Speech bubble pointer */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800/95 rotate-45 border-r border-b border-green-500/30"></div>
          </div>
        </div>
      )}

      {/* Desk Container */}
      <div 
        className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border-2 transition-all duration-300 ${getStatusGlow()}`}
        style={{ 
          borderColor: agent.status === 'idle' ? '#4b5563' : agent.color,
          padding: isBoss ? '2rem' : '1.5rem'
        }}
      >
        {/* Desk Top */}
        <div className="relative">
          {/* Agent Avatar */}
          <div className="flex items-center justify-center mb-4">
            <div className={`${size} ${agent.status === 'active' ? 'animate-bounce-subtle' : ''}`}>
              {agent.emoji}
            </div>
          </div>

          {/* Monitor/Screen showing current work */}
          <div className="bg-gray-900/90 rounded-lg p-3 mb-3 border border-gray-700/50 min-h-[60px] flex items-center justify-center">
            <div className="text-center">
              {agent.status === 'active' && (
                <div className="text-sm text-green-400 font-mono">
                  ▶ {agent.currentTask.substring(0, 50)}...
                </div>
              )}
              {agent.status === 'completed' && agent.lastCompleted && (
                <div className="text-sm text-teal/80 font-mono">
                  ✓ {agent.lastCompleted.substring(0, 50)}...
                </div>
              )}
              {agent.status === 'idle' && (
                <div className="text-sm text-gray-600 font-mono italic">
                  Waiting for assignment...
                </div>
              )}
            </div>
          </div>

          {/* Agent Info */}
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold" style={{ color: agent.color }}>
              {agent.name}
            </h3>
            <p className="text-xs text-gray-400">{agent.role}</p>
            <p className="text-xs text-gray-500 mt-1">{agent.model}</p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-center mb-3">
            {getStatusIndicator()}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 text-gray-400">
              <span>📋</span>
              <span>{agent.tasksToday} tasks today</span>
            </div>
            {!isBoss && (
              <div className="text-gray-500">
                {deskDecorations[deskStyle]}
              </div>
            )}
          </div>
        </div>

        {/* Desk Shadow/Base */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-black/20 blur-md rounded-full"></div>
      </div>
    </div>
  )
}
