import { Agent } from '../types'
import AgentDesk from './AgentDesk'

interface OfficeLayoutProps {
  agents: Agent[]
}

export default function OfficeLayout({ agents }: OfficeLayoutProps) {
  // Find specific agents
  const daniel = agents.find(a => a.id === 'daniel')
  const scribe = agents.find(a => a.id === 'scribe')
  const hunter = agents.find(a => a.id === 'hunter')
  const herald = agents.find(a => a.id === 'herald')
  const scout = agents.find(a => a.id === 'scout')
  const builder = agents.find(a => a.id === 'builder')

  return (
    <div className="bg-navy-light rounded-xl border border-gray-800 p-8 relative overflow-hidden">
      {/* Office Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🪴</div>
        <div className="absolute top-10 right-10 text-6xl">🖼️</div>
        <div className="absolute bottom-10 left-20 text-6xl">☕</div>
        <div className="absolute bottom-10 right-20 text-6xl">📚</div>
      </div>

      <div className="relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal to-blue-400 bg-clip-text text-transparent mb-2">
            🏢 Dragon HQ Office Floor
          </h2>
          <p className="text-sm text-gray-400">
            Live workspace view — watch your AI team in action
          </p>
        </div>

        {/* Boss Desk - Daniel (center top, larger) */}
        {daniel && (
          <div className="mb-10 flex justify-center">
            <div className="w-full max-w-2xl">
              <AgentDesk agent={daniel} isBoss={true} />
            </div>
          </div>
        )}

        {/* Team Desks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scribe && <AgentDesk agent={scribe} deskStyle="writer" />}
          {hunter && <AgentDesk agent={hunter} deskStyle="researcher" />}
          {herald && <AgentDesk agent={herald} deskStyle="social" />}
          {scout && <AgentDesk agent={scout} deskStyle="analyst" />}
          {builder && <AgentDesk agent={builder} deskStyle="technical" />}
        </div>

        {/* Office Floor Details */}
        <div className="mt-10 pt-6 border-t border-gray-700/50">
          <div className="flex items-center justify-center space-x-6 text-3xl opacity-30">
            <span className="hover:opacity-100 transition-opacity cursor-default">🖥️</span>
            <span className="hover:opacity-100 transition-opacity cursor-default">📊</span>
            <span className="hover:opacity-100 transition-opacity cursor-default">☕</span>
            <span className="hover:opacity-100 transition-opacity cursor-default">📝</span>
            <span className="hover:opacity-100 transition-opacity cursor-default">💡</span>
            <span className="hover:opacity-100 transition-opacity cursor-default">🚀</span>
          </div>
        </div>
      </div>
    </div>
  )
}
