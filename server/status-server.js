import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Enable CORS for all origins
app.use(cors());

// Agent mapping - extract first 8 chars of cron UUID
const AGENT_MAP = {
  // Scribe (Blog Writer)
  'fb78f97d': 'scribe',
  '39ba03ce': 'scribe',
  'e456ede7': 'scribe',
  'ec9f1cea': 'scribe',
  '5d0b5928': 'scribe',
  '8fab4d0c': 'scribe',
  'ba090a67': 'scribe',
  // Hunter (Recruiter)
  'c52aab3a': 'hunter',
  '9ba06984': 'hunter',
  // Herald (Social)
  '916cbc7e': 'herald',
  'fdc3758d': 'herald',
  // Scout (Research)
  '235c17c8': 'scout',
  // Builder (Dev/SEO)
  '8267aa87': 'builder',
  '823e7d2b': 'builder'
};

const AGENT_CONFIG = {
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
    model: 'Opus 4.6',
    color: '#3b82f6'
  },
  hunter: {
    id: 'hunter',
    name: 'Hunter',
    emoji: '🔍',
    role: 'Recruiter',
    model: 'Opus 4.6',
    color: '#8b5cf6'
  },
  herald: {
    id: 'herald',
    name: 'Herald',
    emoji: '📣',
    role: 'Social Media',
    model: 'Opus 4.6',
    color: '#ec4899'
  },
  scout: {
    id: 'scout',
    name: 'Scout',
    emoji: '📊',
    role: 'Research',
    model: 'Opus 4.6',
    color: '#f59e0b'
  },
  builder: {
    id: 'builder',
    name: 'Builder',
    emoji: '🏗️',
    role: 'Dev & SEO',
    model: 'Opus 4.6',
    color: '#10b981'
  }
};

// Cache for status data
let cachedStatus = null;
let lastUpdate = 0;

function parseSessionFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.trim().split('\n');
    const events = lines.map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    }).filter(Boolean);
    
    return events;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return [];
  }
}

function extractCronIdFromEvents(events) {
  // Look for cron ID in message content like: [cron:64ba08c5-9508-4e89-b158-724986ea77e9 label]
  for (const event of events) {
    if (event.type === 'message' && event.message?.content) {
      const content = Array.isArray(event.message.content) 
        ? event.message.content[0]?.text 
        : event.message.content;
      
      if (typeof content === 'string') {
        const cronMatch = content.match(/\[cron:([a-f0-9-]+)\s+/);
        if (cronMatch) {
          // Return first 8 chars of UUID
          return cronMatch[1].split('-')[0];
        }
      }
    }
  }
  return null;
}

function extractTaskFromEvents(events) {
  // Look for user messages or assistant responses to infer current task
  for (let i = events.length - 1; i >= 0; i--) {
    const event = events[i];
    
    // Try to extract from cron message first
    if (event.type === 'message' && event.message?.content) {
      const content = Array.isArray(event.message.content) 
        ? event.message.content[0]?.text 
        : event.message.content;
      
      if (typeof content === 'string') {
        // Extract cron label
        const cronMatch = content.match(/\[cron:[a-f0-9-]+\s+([^\]]+)\]/);
        if (cronMatch) {
          return cronMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        
        // Look for task description
        const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('['));
        if (lines.length > 0 && lines[0].length < 100) {
          return lines[0].trim();
        }
      }
    }
    
    if (event.type === 'message' && event.role === 'user') {
      const text = event.content?.[0]?.text || event.content;
      if (typeof text === 'string' && text.length > 0 && text.length < 150) {
        return text;
      }
    }
    
    if (event.type === 'message' && event.role === 'assistant') {
      const text = event.content?.[0]?.text || event.content;
      if (typeof text === 'string' && text.length > 0 && text.length < 150) {
        return text.substring(0, 100) + (text.length > 100 ? '...' : '');
      }
    }
  }
  
  return 'Idle';
}

function getSessionStatus(mtime) {
  const now = Date.now();
  const age = now - mtime;
  
  if (age < 5 * 60 * 1000) return 'active';  // 5 minutes
  if (age < 30 * 60 * 1000) return 'completed';  // 30 minutes
  return 'idle';
}

function readSessionData() {
  const sessionsDir = '/home/ubuntu/.openclaw/agents/main/sessions';
  const today = new Date().toISOString().split('T')[0];
  
  const agentData = {};
  const recentActivity = [];
  
  try {
    // Initialize all agents with default data
    Object.keys(AGENT_CONFIG).forEach(agentId => {
      agentData[agentId] = {
        ...AGENT_CONFIG[agentId],
        status: 'idle',
        currentTask: 'Waiting for work...',
        lastCompleted: 'N/A',
        lastCompletedAt: null,
        tasksToday: 0,
        lastUpdate: null
      };
    });
    
    const sessionFiles = fs.readdirSync(sessionsDir).filter(f => f.endsWith('.jsonl'));
    
    for (const file of sessionFiles) {
      const filePath = path.join(sessionsDir, file);
      const stats = fs.statSync(filePath);
      const mtime = stats.mtimeMs;
      
      // Parse session events
      const events = parseSessionFile(filePath);
      if (events.length === 0) continue;
      
      // Determine agent ID
      let agentId = null;
      
      // Check for main session (Daniel)
      const sessionEvent = events.find(e => e.type === 'session');
      if (sessionEvent) {
        // Try to extract cron ID from message content
        const cronId = extractCronIdFromEvents(events);
        if (cronId) {
          agentId = AGENT_MAP[cronId];
        } else {
          // Assume it's Daniel's main session if no cron ID
          agentId = 'daniel';
        }
      }
      
      if (!agentId || !agentData[agentId]) continue;
      
      const status = getSessionStatus(mtime);
      const task = extractTaskFromEvents(events);
      
      // Count as a task if it's from today
      const fileDate = new Date(mtime).toISOString().split('T')[0];
      if (fileDate === today) {
        agentData[agentId].tasksToday++;
      }
      
      // Update agent status if this is more recent
      if (!agentData[agentId].lastUpdate || mtime > agentData[agentId].lastUpdate) {
        agentData[agentId].lastUpdate = mtime;
        agentData[agentId].status = status;
        
        if (status === 'active') {
          agentData[agentId].currentTask = task;
        } else if (status === 'completed') {
          agentData[agentId].lastCompleted = task;
          agentData[agentId].lastCompletedAt = new Date(mtime).toISOString();
          agentData[agentId].currentTask = 'Idle';
        } else {
          agentData[agentId].currentTask = 'Waiting for work...';
        }
      }
      
      // Add to recent activity
      if (status !== 'idle') {
        const timestamp = new Date(mtime);
        const timeStr = timestamp.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        
        recentActivity.push({
          agent: AGENT_CONFIG[agentId].name,
          action: task,
          time: timeStr,
          status,
          timestamp: mtime
        });
      }
    }
    
    // Sort activity by timestamp (newest first) and limit to 20
    recentActivity.sort((a, b) => b.timestamp - a.timestamp);
    const limitedActivity = recentActivity.slice(0, 20).map(({ timestamp, ...rest }) => rest);
    
    // Calculate stats
    const stats = {
      totalTasksToday: Object.values(agentData).reduce((sum, agent) => sum + agent.tasksToday, 0),
      blogPostsToday: agentData.scribe?.tasksToday || 0,
      candidatesSourced: agentData.hunter?.tasksToday || 0,
      emailsSent: agentData.herald?.tasksToday || 0
    };
    
    return {
      agents: Object.values(agentData),
      stats,
      recentActivity: limitedActivity
    };
    
  } catch (error) {
    console.error('Error reading session data:', error);
    return {
      agents: Object.values(agentData),
      stats: {
        totalTasksToday: 0,
        blogPostsToday: 0,
        candidatesSourced: 0,
        emailsSent: 0
      },
      recentActivity: []
    };
  }
}

function updateCache() {
  console.log('[STATUS] Refreshing cache...');
  cachedStatus = readSessionData();
  lastUpdate = Date.now();
  
  const activeCount = cachedStatus.agents.filter(a => a.status === 'active').length;
  const completedCount = cachedStatus.agents.filter(a => a.status === 'completed').length;
  console.log(`[STATUS] Cache updated. Active: ${activeCount}, Completed: ${completedCount}, Total tasks today: ${cachedStatus.stats.totalTasksToday}`);
}

// Initial cache update
updateCache();

// Refresh every 60 seconds
setInterval(updateCache, 60000);

app.get('/status', (req, res) => {
  res.json(cachedStatus);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    uptime: process.uptime(),
    lastUpdate: new Date(lastUpdate).toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[STATUS] Dragon HQ Status Server running on port ${PORT}`);
  console.log(`[STATUS] Serving live agent data from OpenClaw sessions`);
});
