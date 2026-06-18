import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { SCHEMA_VERSION } from '../utils/constants.js';
import { logger } from '../utils/logger.js';

const SchemaVersion = z.string();

export function validateSchema(data: unknown, label: string): void {
  const parsed = z.object({ schemaVersion: SchemaVersion }).safeParse(data);
  if (!parsed.success) {
    logger.warn(`${label}: schema validation warning — ${parsed.error.message}`);
  } else if (parsed.data.schemaVersion !== SCHEMA_VERSION) {
    logger.warn(
      `${label}: schema version mismatch — expected ${SCHEMA_VERSION}, got ${parsed.data.schemaVersion}`
    );
  }
}

export async function readJson<T>(filePath: string, label: string, schema?: z.ZodType<T>): Promise<T> {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(content) as T;
    validateSchema(data, label);
    if (schema) {
      return schema.parse(data) as T;
    }
    return data;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw new Error(`Failed to read ${label}: ${err.message}`);
  }
}

export async function writeJson<T>(filePath: string, data: T, label: string): Promise<void> {
  try {
    const dir = path.dirname(filePath);
    await fs.promises.mkdir(dir, { recursive: true });
    const content = JSON.stringify(data, null, 2) + '\n';
    await fs.promises.writeFile(filePath, content, 'utf-8');
  } catch (err: any) {
    throw new Error(`Failed to write ${label}: ${err.message}`);
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function sortByValue<T>(record: Record<string, T>, getValue: (v: T) => number, descending = true): [string, number][] {
  const entries = Object.entries(record).map(([k, v]) => [k, getValue(v)] as [string, number]);
  entries.sort((a, b) => (descending ? b[1] - a[1] : a[1] - b[1]));
  return entries;
}
