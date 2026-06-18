import { encode } from 'gpt-tokenizer';

export function countTokens(text: string): number {
  return encode(text).length;
}

export function countTokensBatch(texts: string[]): number[] {
  return texts.map((t) => countTokens(t));
}

export function estimateFileTokens(content: string, _path: string): number {
  return countTokens(content);
}

export function tokensToWords(tokens: number): number {
  return Math.round(tokens * 0.75);
}

export function wordsToTokens(words: number): number {
  return Math.round(words / 0.75);
}
