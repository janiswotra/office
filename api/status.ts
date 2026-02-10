import type { VercelRequest, VercelResponse } from '@vercel/node';

const STATUS_URL = 'http://3.74.149.204:3002/status';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(STATUS_URL, { 
      signal: AbortSignal.timeout(8000) 
    });
    
    if (!response.ok) throw new Error(`Status server returned ${response.status}`);
    
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    res.status(200).json(data);
  } catch (error) {
    console.error('Status fetch error:', error);
    
    // Return fallback with schedule-based estimates
    const hour = new Date().getUTCHours();
    res.status(200).json({
      agents: [
        { id: 'daniel', name: 'Daniel Dragon', emoji: '🐉', role: 'Chief Orchestrator', model: 'Opus 4.6', status: 'active', currentTask: 'Coordinating team', lastCompleted: '', lastCompletedAt: '', tasksToday: 0, color: '#00d4aa' },
        { id: 'scribe', name: 'Scribe', emoji: '✍️', role: 'Blog Writer', model: 'Sonnet 4.5', status: 'idle', currentTask: '', lastCompleted: '', lastCompletedAt: '', tasksToday: 0, color: '#4A90D9' },
        { id: 'hunter', name: 'Hunter', emoji: '🔍', role: 'Recruiter Agent', model: 'Sonnet 4.5', status: 'idle', currentTask: '', lastCompleted: '', lastCompletedAt: '', tasksToday: 0, color: '#FF6B35' },
        { id: 'scout', name: 'Scout', emoji: '📊', role: 'Research & Keywords', model: 'Sonnet 4.5', status: 'idle', currentTask: '', lastCompleted: '', lastCompletedAt: '', tasksToday: 0, color: '#9B59B6' },
        { id: 'herald', name: 'Herald', emoji: '📣', role: 'Social Media & Content', model: 'Sonnet 4.5', status: 'idle', currentTask: '', lastCompleted: '', lastCompletedAt: '', tasksToday: 0, color: '#E74C8C' },
        { id: 'builder', name: 'Builder', emoji: '🏗️', role: 'Dev & Deployments', model: 'Sonnet 4.5', status: 'idle', currentTask: '', lastCompleted: '', lastCompletedAt: '', tasksToday: 0, color: '#2ECC71' }
      ],
      stats: { totalTasksToday: 0, blogPostsToday: 0, candidatesSourced: 0, emailsSent: 0 },
      recentActivity: [],
      error: 'Status server unreachable — showing fallback data'
    });
  }
}
