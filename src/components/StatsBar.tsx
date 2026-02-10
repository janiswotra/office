import { Stats } from '../types'

interface StatsBarProps {
  stats: Stats
}

export default function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    {
      icon: '⚡',
      label: 'Total Tasks',
      value: stats.totalTasksToday,
      color: '#00d4aa',
      bgColor: 'rgba(0, 212, 170, 0.1)'
    },
    {
      icon: '✍️',
      label: 'Blog Posts',
      value: stats.blogPostsToday,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      icon: '🎯',
      label: 'Candidates',
      value: stats.candidatesSourced,
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      icon: '📧',
      label: 'Emails',
      value: stats.emailsSent,
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)'
    }
  ]

  return (
    <div className="max-w-[1920px] mx-auto px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="bg-navy-light rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: stat.bgColor,
              borderColor: `${stat.color}30`,
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-center space-x-4">
              <div 
                className="text-4xl p-3 rounded-lg"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                {stat.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-1">
                  {stat.label}
                </div>
                <div 
                  className="text-3xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
