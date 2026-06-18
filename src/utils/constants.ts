import type { Config } from '../types/index.js';

export const SCHEMA_VERSION = '1.0.0';
export const STORE_DIR = '.deepseek-opt';

export const DEFAULT_CONFIG: Config = {
  schemaVersion: SCHEMA_VERSION,
  projectName: '',
  projectType: 'code',
  tokenBudget: 44000,
  windowDurationMs: 18000000,
  budgetWarnings: {
    inline: 0.75,
    blocking: 0.9,
  },
  doctorMode: 'supervised',
  doctorThreshold: 0.6,
  taskHistoryCap: 500,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_IGNORED_PATTERNS = [
  'node_modules/',
  '.git/',
  '.deepseek-opt/',
  '.env',
  '.env.*',
  '*.secret',
  '*.key',
  'dist/',
  '.next/',
  '__pycache__/',
  '*.pyc',
  '.DS_Store',
];

export const DEFAULT_SIGNAL_WEIGHTS = {
  historySimilarity: 0.15,
  graphTraversal: 0.25,
  keywordLookup: 0.30,
  cooccurrenceBoost: 0.05,
  typeAffinity: 0.05,
  gitContext: 0.10,
  fileRecency: 0.10,
};

export const MAX_FILES_TO_PREDICT = 7;
export const CONFIDENCE_THRESHOLD = 0.3;
export const HISTORY_SIMILARITY_DAYS = 30;
export const FILE_RECENCY_HALF_LIFE_DAYS = 14;
export const GIT_DECAY_FACTOR = 0.8;
export const GRAPH_TRAVERSAL_HOPS = 2;
export const GRAPH_HOP_DECAY = 0.5;
