import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const TOKENS_PATH = fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url));

const REQUIRED_VARS = [
  '--bg',
  '--bg-elevated',
  '--bg-sunken',
  '--fg',
  '--fg-muted',
  '--fg-faint',
  '--border',
  '--border-strong',
  '--accent',
  '--accent-soft',
  '--accent-contrast',
  '--success',
  '--danger',
  '--warn',
  '--radius',
  '--radius-sm',
  '--shadow-sm',
  '--shadow-md',
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-5',
  '--space-6',
  '--space-7',
] as const;

const FORBIDDEN_VARS = [
  '--accent-2',
  '--accent-3',
  '--moss',
  '--link',
  '--link-soft',
  '--hashtag-bg',
  '--hashtag-fg',
  '--frozen-fg',
];

describe('tokens.css mirror', () => {
  const css = readFileSync(TOKENS_PATH, 'utf-8');

  it.each(REQUIRED_VARS)('defines %s', (name) => {
    const pattern = new RegExp(`${name}\\s*:`);
    expect(css).toMatch(pattern);
  });

  it.each(FORBIDDEN_VARS)('does not define %s (excluded from mirror)', (name) => {
    const pattern = new RegExp(`${name}\\s*:`);
    expect(css).not.toMatch(pattern);
  });

  it('documents the mirror source SHA', () => {
    expect(css).toMatch(/Mirrored at SHA: [0-9a-f]{7,40}/);
  });

  it('declares a dark-mode override block', () => {
    expect(css).toMatch(/@media \(prefers-color-scheme: dark\)/);
  });
});
