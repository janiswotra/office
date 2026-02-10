import { Agent } from '../types'

interface AgentCardProps {
  agent: Agent
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusConfig = {
    active: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      dot: 'bg-green-500',
      animation: 'animate-pulse-slow',
      text: 'text-green-400'
    },
    idle: {
      bg: 'bg-gray-500/20',
      border: 'border-gray-500/50',
      dot: 'bg-gray-500',
      animation: '',
      text: 'text-gray-400'
    },
    completed: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50',
      dot: 'bg-blue-500',
      animation: '',
      text: 'text-blue-400'
    }
  }

  const config = statusConfig[agent.status]

  return (
    <div className={`bg-navy-light rounded-xl border-2 ${config.border} p-6 hover:scale-105 transition-all duration-300 animate-fadeIn`}>
      {/* Agent Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-5xl">{agent.emoji}</div>
          <div>
            <h3 className="text-xl font-bold" style={{ color: agent.color }}>
              {agent.name}
            </h3>
            <p className="text-sm text-gray-400">{agent.role}</p>
            <p className="text-xs text-gray-500">{agent.model}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${config.bg}`}>
          <div className={`w-2 h-2 rounded-full ${config.dot} ${config.animation}`}></div>
          <span className={`text-xs font-medium ${config.text} uppercase`}>
            {agent.status}
          </span>
        </div>
      </div>

      {/* Current Task */}
      {agent.status === 'active' && agent.currentTask && (
        <div className="mb-4 p-3 bg-navy rounded-lg border border-gray-800">
          <div className="text-xs text-gray-500 mb-1">Currently Working On:</div>
          <div className="text-sm text-white flex items-center">
            <span className="animate-typing mr-2">💬</span>
            {agent.currentTask}
          </div>
        </div>
      )}

      {/* Last Completed */}
      {agent.lastCompleted && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Last Completed:</div>
          <div className="text-sm text-gray-300 flex items-center">
            <span className="mr-2">✅</span>
            {agent.lastCompleted}
          </div>
          {agent.lastCompletedAt && (
            <div className="text-xs text-gray-600 mt-1">
              {new Date(agent.lastCompletedAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </div>
      )}

      {/* Tasks Today Counter */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <span className="text-sm text-gray-400">Tasks Today</span>
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold" style={{ color: agent.color }}>
            {agent.tasksToday}
          </div>
          <span className="text-xs text-gray-500">completed</span>
        </div>
      </div>
    </div>
  )
}
