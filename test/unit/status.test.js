import { describe, it, expect } from 'vitest'
import { formatStatus } from '../../src/utils/status.js'

describe('formatStatus', () => {
  it('rejects negative uptime', () => {
    expect(() => formatStatus(-1)).toThrow('invalid uptime')
  })

  it('rejects invalid values', () => {
    for (const value of [NaN, Infinity, -Infinity, '60', null, undefined]) {
      expect(() => formatStatus(value)).toThrow('invalid uptime')
    }
  })

  it('returns warming-up before 60 seconds', () => {
    expect(formatStatus(0)).toBe('warming-up')
    expect(formatStatus(59)).toBe('warming-up')
  })

  it('returns healthy from 60 to 3599 seconds', () => {
    expect(formatStatus(60)).toBe('healthy')
    expect(formatStatus(3599)).toBe('healthy')
  })

  it('returns steady from 3600 seconds', () => {
    expect(formatStatus(3600)).toBe('steady')
    expect(formatStatus(7200)).toBe('steady')
  })
})
