import { Activity } from '../types'

interface ActivityFeedProps {
  activities: Activity[]
}

const agentColors: Record<string, string> = {
  'Daniel Dragon': '#00d4aa',
  'Scribe': '#3b82f6',
  'Hunter': '#8b5cf6',
  'Herald': '#ec4899',
  'Scout': '#f59e0b',
  'Builder': '#10b981'
}

const agentEmojis: Record<string, string> = {
  'Daniel Dragon': '🐉',
  'Scribe': '✍️',
  'Hunter': '🔍',
  'Herald': '📣',
  'Scout': '📊',
  'Builder': '🏗️'
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-navy-light rounded-xl border border-gray-800 p-6 h-fit sticky top-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal to-blue-400 bg-clip-text text-transparent mb-2">
          📋 Activity Feed
        </h2>
        <p className="text-sm text-gray-400">
          Real-time log of agent actions
        </p>
      </div>

      <div className="space-y-3 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🌙</div>
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          activities.map((activity, index) => {
            const color = agentColors[activity.agent] || '#6b7280'
            const emoji = agentEmojis[activity.agent] || '🤖'
            
            return (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 hover:border-gray-600 transition-all duration-200 animate-slide-in"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  borderLeftWidth: '3px',
                  borderLeftColor: color
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl flex-shrink-0">
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span 
                        className="text-sm font-semibold"
                        style={{ color }}
                      >
                        {activity.agent}
                      </span>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-snug break-words">
                      {activity.action}
                    </p>
                    {activity.status && (
                      <div className="mt-2">
                        {activity.status === 'completed' && (
                          <span className="inline-flex items-center space-x-1 text-xs text-teal">
                            <span>✓</span>
                            <span>Completed</span>
                          </span>
                        )}
                        {activity.status === 'active' && (
                          <span className="inline-flex items-center space-x-1 text-xs text-green-400">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            <span>In Progress</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
