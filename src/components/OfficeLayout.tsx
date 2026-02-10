import { Agent } from '../types'
import AgentCard from './AgentCard'

interface OfficeLayoutProps {
  agents: Agent[]
}

export default function OfficeLayout({ agents }: OfficeLayoutProps) {
  return (
    <div className="bg-navy-light rounded-xl border border-gray-800 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal to-blue-400 bg-clip-text text-transparent mb-2">
          AI Team Workspace
        </h2>
        <p className="text-sm text-gray-400">
          Real-time view of all active agents and their current tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent, index) => (
          <div key={agent.id} style={{ animationDelay: `${index * 100}ms` }}>
            <AgentCard agent={agent} />
          </div>
        ))}
      </div>

      {/* Office Floor Decoration */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <div className="flex items-center justify-center space-x-8 text-4xl opacity-20">
          <span>🖥️</span>
          <span>📊</span>
          <span>☕</span>
          <span>📝</span>
          <span>💡</span>
          <span>🚀</span>
        </div>
      </div>
    </div>
  )
}
