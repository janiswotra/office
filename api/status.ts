import type { VercelRequest, VercelResponse } from '@vercel/node';

interface OpenClawSession {
  id: string;
  label?: string;
  model?: string;
  status?: string;
  created?: string;
  updated?: string;
  turns?: number;
}

const GATEWAY_URL = 'http://3.74.149.204:18789/api/sessions?limit=50';
const AUTH_TOKEN = 'Bearer 6bd6bfd52ef611dee38f19d1428716a297982e7ebd3d9111';

// Cron ID to Agent mapping
const cronToAgent: { [key: string]: string } = {
  // Blog crons → Scribe
  'fb78f97d': 'scribe',
  '39ba03ce': 'scribe',
  'e456ede7': 'scribe',
  'ec9f1cea': 'scribe',
  '5d0b5928': 'scribe',
  '8fab4d0c': 'scribe',
  'ba090a67': 'scribe',
  // Jobs & Recruitment → Hunter
  'c52aab3a': 'hunter',
  '9ba06984': 'hunter',
  // Dev & Deployments → Builder
  '8267aa87': 'builder',
  '823e7d2b': 'builder',
  // Social Media → Herald
  '916cbc7e': 'herald',
  'fdc3758d': 'herald',
  // Research → Scout
  '235c17c8': 'scout',
};

const agentDefinitions = {
  daniel: {
    id: 'daniel',
    name: 'Daniel Dragon',
    emoji: '🐉',
    role: 'Chief Orchestrator',
    model: 'Opus 4.6',
    color: '#00d4aa'
  },
  scribe: {
    id: 'scribe',
    name: 'Scribe',
    emoji: '✍️',
    role: 'Blog Writer',
    model: 'Sonnet 4.5',
    color: '#4A90D9'
  },
  hunter: {
    id: 'hunter',
    name: 'Hunter',
    emoji: '🔍',
    role: 'Recruiter Agent',
    model: 'Sonnet 4.5',
    color: '#FF6B35'
  },
  scout: {
    id: 'scout',
    name: 'Scout',
    emoji: '📊',
    role: 'Research & Keywords',
    model: 'Sonnet 4.5',
    color: '#9B59B6'
  },
  herald: {
    id: 'herald',
    name: 'Herald',
    emoji: '📣',
    role: 'Social Media & Content',
    model: 'Sonnet 4.5',
    color: '#E74C8C'
  },
  builder: {
    id: 'builder',
    name: 'Builder',
    emoji: '🏗️',
    role: 'Dev & Deployments',
    model: 'Sonnet 4.5',
    color: '#2ECC71'
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    // Fetch recent sessions from OpenClaw gateway
    const response = await fetch(GATEWAY_URL, {
      headers: {
        'Authorization': AUTH_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error(`Gateway returned ${response.status}`);
    }

    const sessions: OpenClawSession[] = await response.json();

    // Initialize agent states
    const agentStates: { [key: string]: any } = {};
    Object.keys(agentDefinitions).forEach(id => {
      agentStates[id] = {
        ...agentDefinitions[id as keyof typeof agentDefinitions],
        status: 'idle',
        currentTask: '',
        lastCompleted: '',
        lastCompletedAt: '',
        tasksToday: 0
      };
    });

    // Track stats
    let blogPostsToday = 0;
    let candidatesSourced = 0;
    let emailsSent = 0;
    const recentActivity: any[] = [];

    const today = new Date().toISOString().split('T')[0];

    // Process sessions
    sessions.forEach(session => {
      // Check if session is from today
      const sessionDate = session.created?.split('T')[0];
      const isToday = sessionDate === today;

      // Map cron sessions to agents
      let agentId = 'daniel'; // default to Daniel
      
      // Check cron mapping
      for (const [cronId, mappedAgent] of Object.entries(cronToAgent)) {
        if (session.id.includes(cronId)) {
          agentId = mappedAgent;
          break;
        }
      }

      // Check session type
      if (session.id.includes('agent:main:main')) {
        agentId = 'daniel';
      } else if (session.id.includes('subagent')) {
        // Could be any agent, check label
        if (session.label?.toLowerCase().includes('blog')) agentId = 'scribe';
        else if (session.label?.toLowerCase().includes('recruit')) agentId = 'hunter';
        else if (session.label?.toLowerCase().includes('build')) agentId = 'builder';
      }

      const agent = agentStates[agentId];
      if (!agent) return;

      // Count tasks for today
      if (isToday) {
        agent.tasksToday++;
      }

      // Determine status based on session state
      if (session.status === 'active' || session.status === 'running') {
        agent.status = 'active';
        agent.currentTask = session.label || 'Processing...';
      } else if (session.updated) {
        const updatedTime = new Date(session.updated);
        const now = new Date();
        const minutesAgo = (now.getTime() - updatedTime.getTime()) / 60000;

        if (minutesAgo < 5) {
          agent.status = 'completed';
          agent.lastCompleted = session.label || 'Task completed';
          agent.lastCompletedAt = session.updated;

          // Add to recent activity
          if (recentActivity.length < 20) {
            recentActivity.push({
              agent: agent.name,
              action: session.label || 'Completed task',
              time: updatedTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })
            });
          }
        }
      }

      // Update specific stats based on agent
      if (isToday) {
        if (agentId === 'scribe') blogPostsToday++;
        if (agentId === 'hunter') candidatesSourced += 5; // estimate
      }
    });

    // Sort recent activity by time (most recent first)
    recentActivity.sort((a, b) => b.time.localeCompare(a.time));

    const agents = Object.values(agentStates);
    const totalTasksToday = agents.reduce((sum, agent) => sum + agent.tasksToday, 0);

    const result = {
      agents,
      stats: {
        blogPostsToday,
        candidatesSourced,
        emailsSent,
        totalTasksToday
      },
      recentActivity: recentActivity.slice(0, 15)
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching status:', error);
    
    // Return default state on error
    res.status(200).json({
      agents: Object.values(agentDefinitions).map(def => ({
        ...def,
        status: 'idle',
        currentTask: '',
        lastCompleted: '',
        lastCompletedAt: '',
        tasksToday: 0
      })),
      stats: {
        blogPostsToday: 0,
        candidatesSourced: 0,
        emailsSent: 0,
        totalTasksToday: 0
      },
      recentActivity: []
    });
  }
}
