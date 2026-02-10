import { Activity } from '../types'

interface ActivityFeedProps {
  activities: Activity[]
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const agentEmojis: { [key: string]: string } = {
    'Daniel Dragon': '🐉',
    'Scribe': '✍️',
    'Hunter': '🔍',
    'Scout': '📊',
    'Herald': '📣',
    'Builder': '🏗️'
  }

  return (
    <div className="bg-navy-light rounded-xl border border-gray-800 p-6 sticky top-28 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Recent Activity
        </h2>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💤</div>
            <div className="text-sm">No recent activity</div>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div
              key={`${activity.agent}-${activity.time}-${index}`}
              className="bg-navy rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all animate-slideIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl flex-shrink-0">
                  {agentEmojis[activity.agent] || '🤖'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      {activity.agent}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 break-words">
                    {activity.action}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Live Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse-slow"></div>
          <span>Live updates every 30s</span>
        </div>
      </div>
    </div>
  )
}
