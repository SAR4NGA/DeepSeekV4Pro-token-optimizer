import path from 'node:path';
import { z } from 'zod';
import { readJson, writeJson } from './base.js';
import { getStorePath, ensureStoreDir } from '../utils/paths.js';
import { DEFAULT_CONFIG } from '../utils/constants.js';
import type { Config } from '../types/index.js';

const budgetWarningsSchema = z.object({
  inline: z.number().min(0).max(1),
  blocking: z.number().min(0).max(1),
});

const configSchema = z.object({
  schemaVersion: z.string(),
  projectName: z.string(),
  projectType: z.enum(['code', 'research', 'other']),
  tokenBudget: z.number().positive(),
  windowDurationMs: z.number().positive(),
  budgetWarnings: budgetWarningsSchema,
  doctorMode: z.enum(['supervised', 'autonomous']),
  doctorThreshold: z.number().min(0).max(1),
  taskHistoryCap: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
}) satisfies z.ZodType<Config>;

export async function readConfig(projectRoot: string): Promise<Config> {
  const filePath = getStorePath(projectRoot, 'config.json');
  return readJson(filePath, 'config', configSchema);
}

export async function writeConfig(projectRoot: string, config: Config): Promise<void> {
  await ensureStoreDir(projectRoot);
  const filePath = getStorePath(projectRoot, 'config.json');
  await writeJson(filePath, config, 'config');
}

export async function initConfig(projectRoot: string, projectName?: string): Promise<Config> {
  const dirName = projectName ?? path.basename(projectRoot);
  const config: Config = {
    ...DEFAULT_CONFIG,
    projectName: dirName,
    projectType: 'code',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await writeConfig(projectRoot, config);
  return config;
}
