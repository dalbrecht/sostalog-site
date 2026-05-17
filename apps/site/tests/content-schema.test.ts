import { describe, expect, it } from 'vitest';
import sagegrouseConfig from '../sagegrouse.config';

describe('sagegrouse.config — changelog content type', () => {
  it('declares a changelog content type', () => {
    expect(sagegrouseConfig.contentTypes).toHaveProperty('changelog');
  });

  it('is a zero-stage content type with location at src/content/changelog', () => {
    const ct = sagegrouseConfig.contentTypes.changelog;
    expect(ct.location).toBe('src/content/changelog');
    expect(ct.stages).toEqual([]);
  });

  it('schema requires title, date, summary; version is optional', () => {
    const schema = sagegrouseConfig.contentTypes.changelog.schema;
    expect(schema.safeParse({ title: 't', date: new Date(), summary: 's' }).success).toBe(true);
    expect(schema.safeParse({ title: 't', date: new Date() }).success).toBe(false);
    expect(schema.safeParse({ title: 't', date: new Date(), summary: 's', version: 'v1.0.0' }).success).toBe(true);
  });
});
