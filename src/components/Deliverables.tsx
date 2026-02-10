import { useState, useEffect } from 'react'

interface BlogPost {
  slug: string
  locale: string
  title: string
  url: string
  humanizeScore: number | null
}

interface MediumArticle {
  filename: string
  title: string
  status: string
}

interface HunterLead {
  file: string
  rowCount: number
  date: string
}

interface SocialContent {
  filename: string
  platform: string
  status: string
}

interface Research {
  filename: string
  topic: string
}

interface Outreach {
  leadsCount: number
  campaign: string
  status: string
}

interface DeliverablesData {
  date: string
  blogPosts: BlogPost[]
  mediumArticles: MediumArticle[]
  hunterLeads: HunterLead[]
  socialContent: SocialContent[]
  research: Research[]
  outreach: Outreach | null
}

const DELIVERABLES_API_URL = '/api/deliverables'

type Tab = 'blog' | 'social' | 'hunter' | 'medium' | 'research'

export default function Deliverables() {
  const [data, setData] = useState<DeliverablesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('blog')

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await fetch(DELIVERABLES_API_URL)
        if (!response.ok) throw new Error('Failed to fetch deliverables')
        const json = await response.json()
        setData(json)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch deliverables:', error)
        setLoading(false)
      }
    }

    fetchDeliverables()
    const interval = setInterval(fetchDeliverables, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-navy-light rounded-xl p-8 border border-gray-800">
        <div className="text-center text-gray-400">Loading deliverables...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-navy-light rounded-xl p-8 border border-gray-800">
        <div className="text-center text-gray-500">No deliverables data available</div>
      </div>
    )
  }

  const getLocaleFlag = (locale: string) => {
    const flags: { [key: string]: string } = {
      en: '🇬🇧',
      de: '🇩🇪',
      pl: '🇵🇱'
    }
    return flags[locale] || '🌐'
  }

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-500'
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-orange-400'
  }

  const tabs = [
    { id: 'blog' as Tab, label: 'Blog Posts', icon: '📝', count: data.blogPosts.length },
    { id: 'social' as Tab, label: 'Social', icon: '📣', count: data.socialContent.length },
    { id: 'hunter' as Tab, label: 'Hunter Pipeline', icon: '🎯', count: data.hunterLeads.length },
    { id: 'medium' as Tab, label: 'Medium', icon: '📰', count: data.mediumArticles.length },
    { id: 'research' as Tab, label: 'Research', icon: '🔍', count: data.research.length }
  ]

  return (
    <div className="bg-navy-light rounded-xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📦 Today's Deliverables
          <span className="text-sm text-gray-400 font-normal ml-2">{data.date}</span>
        </h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 bg-navy/50">
        <div className="flex gap-1 px-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-teal border-b-2 border-teal'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-teal/20 text-teal'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Blog Posts Tab */}
        {activeTab === 'blog' && (
          <div>
            {data.blogPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No blog posts published today
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                      <th className="pb-3 font-medium">Lang</th>
                      <th className="pb-3 font-medium">Title</th>
                      <th className="pb-3 font-medium">Score</th>
                      <th className="pb-3 font-medium">URL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {data.blogPosts.map((post, i) => (
                      <tr key={i} className="text-sm">
                        <td className="py-3 text-2xl">{getLocaleFlag(post.locale)}</td>
                        <td className="py-3 text-white">{post.title}</td>
                        <td className={`py-3 font-mono ${getScoreColor(post.humanizeScore)}`}>
                          {post.humanizeScore ? `${post.humanizeScore}/100` : 'N/A'}
                        </td>
                        <td className="py-3">
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal hover:text-teal-400 underline"
                          >
                            View →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Social Content Tab */}
        {activeTab === 'social' && (
          <div>
            {data.socialContent.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No social content created today
              </div>
            ) : (
              <div className="grid gap-4">
                {data.socialContent.map((content, i) => (
                  <div
                    key={i}
                    className="bg-navy/50 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {content.platform === 'LinkedIn' ? '💼' : 
                           content.platform === 'Twitter' ? '🐦' : 
                           content.platform === 'Reddit' ? '🤖' : '📱'}
                        </div>
                        <div>
                          <div className="text-white font-medium">{content.filename}</div>
                          <div className="text-sm text-gray-400">{content.platform}</div>
                        </div>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          content.status === 'posted'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {content.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hunter Pipeline Tab */}
        {activeTab === 'hunter' && (
          <div>
            {data.hunterLeads.length === 0 && !data.outreach ? (
              <div className="text-center py-12 text-gray-500">
                No leads processed today
              </div>
            ) : (
              <div className="space-y-6">
                {/* Outreach Summary */}
                {data.outreach && (
                  <div className="bg-teal/10 border border-teal/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📧</span>
                      <h3 className="text-lg font-semibold text-white">Outreach Campaign</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <div className="text-sm text-gray-400">Leads</div>
                        <div className="text-2xl font-bold text-teal">{data.outreach.leadsCount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Campaign</div>
                        <div className="text-sm text-white">{data.outreach.campaign}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Status</div>
                        <div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            data.outreach.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {data.outreach.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lead Files */}
                {data.hunterLeads.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Lead Files</h3>
                    <div className="grid gap-3">
                      {data.hunterLeads.map((lead, i) => (
                        <div
                          key={i}
                          className="bg-navy/50 rounded-lg p-4 border border-gray-800"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white font-medium">{lead.file}</div>
                              <div className="text-sm text-gray-400">{lead.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-teal">{lead.rowCount}</div>
                              <div className="text-xs text-gray-400">leads</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Medium Tab */}
        {activeTab === 'medium' && (
          <div>
            {data.mediumArticles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No Medium articles created today
              </div>
            ) : (
              <div className="grid gap-4">
                {data.mediumArticles.map((article, i) => (
                  <div
                    key={i}
                    className="bg-navy/50 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium mb-1">{article.title}</div>
                        <div className="text-sm text-gray-400">{article.filename}</div>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {article.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Research Tab */}
        {activeTab === 'research' && (
          <div>
            {data.research.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No research files created today
              </div>
            ) : (
              <div className="grid gap-3">
                {data.research.map((item, i) => (
                  <div
                    key={i}
                    className="bg-navy/50 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📄</div>
                      <div>
                        <div className="text-white font-medium">{item.topic}</div>
                        <div className="text-sm text-gray-400">{item.filename}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
