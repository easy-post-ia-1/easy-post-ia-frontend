import { describe, it, expect } from 'vitest';
import { capitalizeFirst } from '@utils/helpers/string.helper.ts';

describe('Performance: capitalize', () => {
  it('should capitalize 10000 strings quickly', () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      capitalizeFirst('test');
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // 100ms threshold
  });
}); 