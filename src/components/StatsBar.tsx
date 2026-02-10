import { Stats } from '../types'

interface StatsBarProps {
  stats: Stats
}

export default function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    { label: 'Total Tasks', value: stats.totalTasksToday, icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { label: 'Blog Posts', value: stats.blogPostsToday, icon: '✍️', color: 'from-blue-500 to-blue-600' },
    { label: 'Candidates', value: stats.candidatesSourced, icon: '🔍', color: 'from-orange-500 to-red-500' },
    { label: 'Emails Sent', value: stats.emailsSent, icon: '📧', color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div className="bg-navy-light border-b border-gray-800">
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div
              key={item.label}
              className="bg-navy rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
              </div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
