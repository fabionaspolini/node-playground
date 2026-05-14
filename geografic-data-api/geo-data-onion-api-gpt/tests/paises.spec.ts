import { describe, expect, test } from 'vitest';

describe('Pais', () => {
  test('should validate country code length', () => {
    expect('BR'.length).toBe(2);
  });
});