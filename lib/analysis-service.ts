import { v4 as uuidv4 } from 'uuid';
import { performTigerAnalysis } from './tiger-analysis';

export interface AnalysisSession {
  sessionId: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  currentStage: number;
  startedAt: Date;
  completedAt?: Date;
  results?: AnalysisResults;
}

export interface AnalysisResults {
  security: SecurityResults;
  soc2: SOC2Results;
  iso27001?: any; // ISO 27001 compliance results
  rag: RAGResults;
  certifications: CertificationResults[];
  mcpInsights?: any; // Tiger MCP insights (schema, indexes, performance)
}

export interface SecurityResults {
  total: number;
  critical: number;
  high: number;
  medium: number;
  findings: SecurityFinding[];
}

export interface SecurityFinding {
  id: number;
  type: string;
  severity: string;
  file: string;
  line: number;
  owasp: string;
  cwe: string;
  cvss: number;
  description: string;
  code: string;
  fix: string;
  certTopics: string[];
}

export interface SOC2Results {
  readiness: number;
  passed: number;
  atRisk: number;
  failed: number;
  violations: SOC2Violation[];
}

export interface SOC2Violation {
  id: number;
  controlId: string;
  category: string;
  title: string;
  severity: string;
  description: string;
  impact: string;
  businessRisk: string;
  remediation: string;
  timeToFix: string;
}

export interface RAGResults {
  strategies: RAGStrategy[];
  winner: string;
  reason: string;
  phase?: string;
}

export interface RAGStrategy {
  name: string;
  accuracy: number;
  latency: number;
  precision: number;
  recall: number;
  winner?: boolean;
}

export interface CertificationResults {
  id: number;
  name: string;
  phase: number;
  duration: string;
  cost: number;
  coverage: number;
  topics: string[];
  priority: string;
}

// In-memory session storage (use global to persist across hot reloads)
const globalForSessions = global as typeof globalThis & {
  analysisSessions?: Map<string, AnalysisSession>;
};

if (!globalForSessions.analysisSessions) {
  globalForSessions.analysisSessions = new Map<string, AnalysisSession>();
}

const sessions = globalForSessions.analysisSessions;

// Create a new analysis session
export function createAnalysisSession(): AnalysisSession {
  const sessionId = uuidv4();
  const session: AnalysisSession = {
    sessionId,
    status: 'pending',
    progress: 0,
    currentStage: 1,
    startedAt: new Date(),
  };
  
  sessions.set(sessionId, session);
  console.log('✅ Session stored in Map. Total sessions:', sessions.size);
  return session;
}

// Get analysis session
export function getAnalysisSession(sessionId: string): AnalysisSession | undefined {
  const session = sessions.get(sessionId);
  if (!session) {
    console.log('❌ Session not found:', sessionId);
    console.log('📋 Available sessions:', Array.from(sessions.keys()));
  }
  return session;
}

// Start analysis with Tiger features
export async function startAnalysis(sessionId: string, code?: string): Promise<void> {
  const session = sessions.get(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  session.status = 'running';
  session.progress = 0;

  // Check for any AI provider
  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasPerplexity = Boolean(process.env.PERPLEXITY_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasTiger = Boolean(process.env.TIGER_DATABASE_URL);
  
  console.log('🔍 Environment check:', {
    hasGroq,
    hasPerplexity,
    hasOpenAI,
    hasTiger,
    hasCode: Boolean(code)
  });
  
  const useTiger = hasTiger || hasOpenAI || hasGroq || hasPerplexity;
  
  if (useTiger && code) {
    console.log('🐅 Using AI-powered analysis');
    
    // Update progress every second
    const interval = setInterval(() => {
      const currentSession = sessions.get(sessionId);
      if (currentSession && currentSession.status === 'running') {
        currentSession.progress = Math.min(100, currentSession.progress + 0.56);
        currentSession.currentStage = Math.min(4, Math.floor(currentSession.progress / 25) + 1);
        
        if (currentSession.progress >= 100) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    
    // Run Tiger analysis
    try {
      const results = await performTigerAnalysis(code, (stage, message) => {
        const currentSession = sessions.get(sessionId);
        if (currentSession) {
          currentSession.currentStage = stage;
          console.log(`Stage ${stage}: ${message}`);
        }
      });
      
      clearInterval(interval);
      session.status = 'completed';
      session.progress = 100;
      session.completedAt = new Date();
      session.results = results;
      
      console.log('✓ Tiger analysis complete');
    } catch (error) {
      console.error('❌ Analysis error:', error);
      console.error('Error details:', {
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      clearInterval(interval);
      session.status = 'error';
      throw error;
    }
  } else {
    // No AI provider configured
    console.error('❌ No AI provider configured');
    console.error('Available providers:', {
      GROQ_API_KEY: hasGroq ? 'set' : 'missing',
      PERPLEXITY_API_KEY: hasPerplexity ? 'set' : 'missing',
      OPENAI_API_KEY: hasOpenAI ? 'set' : 'missing',
      TIGER_DATABASE_URL: hasTiger ? 'set' : 'missing'
    });
    session.status = 'error';
    throw new Error('No AI provider configured. Please configure GROQ_API_KEY, PERPLEXITY_API_KEY, or OPENAI_API_KEY in environment variables.');
  }
}
