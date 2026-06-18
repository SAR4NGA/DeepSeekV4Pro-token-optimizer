import path from 'node:path';
import fs from 'node:fs';
import { STORE_DIR } from './constants.js';

export async function findProjectRoot(startDir?: string): Promise<string | null> {
  let current = startDir ?? process.cwd();
  const root = path.parse(current).root;

  while (current !== root) {
    const storePath = path.join(current, STORE_DIR);
    try {
      await fs.promises.access(storePath);
      return current;
    } catch {
      current = path.dirname(current);
    }
  }
  return null;
}

export function getStorePath(projectRoot: string, filename: string): string {
  return path.join(projectRoot, STORE_DIR, filename);
}

export function getStoreDir(projectRoot: string): string {
  return path.join(projectRoot, STORE_DIR);
}

export async function ensureStoreDir(projectRoot: string): Promise<string> {
  const storeDir = path.join(projectRoot, STORE_DIR);
  await fs.promises.mkdir(storeDir, { recursive: true });
  return storeDir;
}
