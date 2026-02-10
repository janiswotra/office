export type AgentStatus = 'active' | 'idle' | 'completed';

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  model: string;
  status: AgentStatus;
  currentTask: string;
  lastCompleted: string;
  lastCompletedAt: string;
  tasksToday: number;
  color: string;
}

export interface Stats {
  blogPostsToday: number;
  candidatesSourced: number;
  emailsSent: number;
  totalTasksToday: number;
}

export interface Activity {
  agent: string;
  action: string;
  time: string;
}

export interface StatusResponse {
  agents: Agent[];
  stats: Stats;
  recentActivity: Activity[];
}
