export interface Config {
  schemaVersion: string;
  projectName: string;
  projectType: 'code' | 'research' | 'other';
  tokenBudget: number;
  windowDurationMs: number;
  budgetWarnings: {
    inline: number;
    blocking: number;
  };
  doctorMode: 'supervised' | 'autonomous';
  doctorThreshold: number;
  taskHistoryCap: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMap {
  schemaVersion: string;
  scannedAt: string;
  scanType: 'full' | 'incremental';
  projectType: 'code' | 'research' | 'other';
  totalFiles: number;
  files: Record<string, FileEntry>;
  domains: Record<string, string[]>;
  ignoredPatterns: string[];
}

export interface FileEntry {
  path: string;
  size: number;
  contentHash: string;
  lastModified: string;
  language: string | null;
  domain: string;
  imports: string[];
  exports: string[];
  keywords: string[];
}

export interface DependencyGraph {
  schemaVersion: string;
  updatedAt: string;
  edges: [string, string][];
  adjacency: Record<string, string[]>;
}

export interface KeywordIndex {
  schemaVersion: string;
  updatedAt: string;
  keywordToFiles: Record<string, string[]>;
  fileToKeywords: Record<string, string[]>;
}

export interface TaskHistory {
  schemaVersion: string;
  cap: number;
  count: number;
  oldestArchive: string | null;
  tasks: TaskRecord[];
}

export interface TaskRecord {
  id: string;
  timestamp: string;
  description: string;
  taskType: TaskType;
  domain: string;
  complexity: number;
  predictedFiles: string[];
  actualFiles: string[];
  modelUsed: string;
  tokensConsumed: number;
  tokensSaved: number;
  outcome: 'success' | 'partial' | 'failure';
  feedback: string | null;
}

export type TaskType =
  | 'feature'
  | 'bugfix'
  | 'refactor'
  | 'debug'
  | 'test'
  | 'docs'
  | 'config'
  | 'other';

export interface Metrics {
  schemaVersion: string;
  overall: OverallMetrics;
  perDomain: Record<string, DomainMetrics>;
  windows: TokenWindow[];
  predictionTrend: TrendPoint[];
}

export interface OverallMetrics {
  totalTasks: number;
  totalSessions: number;
  avgPrecision: number;
  avgRecall: number;
  totalTokensConsumed: number;
  totalTokensSaved: number;
  savingsRate: number;
}

export interface DomainMetrics {
  tasks: number;
  avgPrecision: number;
  avgRecall: number;
  tokensConsumed: number;
  tokensSaved: number;
}

export interface TokenWindow {
  start: string;
  end: string;
  tokensUsed: number;
  budget: number;
}

export interface TrendPoint {
  taskIndex: number;
  precision: number;
  recall: number;
}

export interface Patterns {
  schemaVersion: string;
  coOccurrences: CoOccurrence[];
  typeAffinities: Record<string, string[]>;
  conventions: Convention[];
}

export interface CoOccurrence {
  files: string[];
  confidence: number;
  count: number;
}

export interface Convention {
  type: string;
  pattern: string;
  confidence: number;
}

export interface DoctorLog {
  schemaVersion: string;
  entries: DoctorEntry[];
}

export interface DoctorEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  domain: string;
  message: string;
  suggestedFix: string | null;
  applied: boolean;
}

export interface SignalScores {
  historySimilarity: Record<string, number>;
  graphTraversal: Record<string, number>;
  keywordLookup: Record<string, number>;
  cooccurrenceBoost: Record<string, number>;
  typeAffinity: Record<string, number>;
  gitContext: Record<string, number>;
  fileRecency: Record<string, number>;
}

export interface SignalWeights {
  historySimilarity: number;
  graphTraversal: number;
  keywordLookup: number;
  cooccurrenceBoost: number;
  typeAffinity: number;
  gitContext: number;
  fileRecency: number;
}

export interface PredictionResult {
  rankedFiles: string[];
  scores: Record<string, number>;
  confidence: number;
  signalBreakdown: SignalScores;
}

export interface TaskClassification {
  taskType: TaskType;
  domain: string;
  complexity: number;
  keywords: string[];
}

export interface CompressionResult {
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  compressedPrompt: string;
  includedFiles: string[];
  excludedFiles: string[];
}

export interface BudgetStatus {
  tokensUsed: number;
  tokenBudget: number;
  percentUsed: number;
  windowRemaining: number;
  status: 'ok' | 'warning' | 'critical';
}

export interface DoctorReport {
  healthy: boolean;
  issues: DoctorIssue[];
  recommendations: string[];
}

export interface DoctorIssue {
  severity: 'low' | 'medium' | 'high';
  domain: string;
  message: string;
  suggestedFix: string;
  confidence: number;
}

export interface PipelineResult {
  classification: TaskClassification;
  prediction: PredictionResult;
  compression: CompressionResult;
  budget: BudgetStatus;
  tokensSaved: number;
}

export interface SkillConfig {
  name: 'deepseek-opt';
  description: string;
  autoInject: boolean;
  injectPattern: string;
}
