/**
 * Maps uptime in seconds to a status label.
 */
export function formatStatus (uptimeSec) {
  if (typeof uptimeSec !== 'number' || !Number.isFinite(uptimeSec) || uptimeSec < 0) {
    throw new Error('invalid uptime')
  }

  if (uptimeSec < 60) return 'warming-up'
  if (uptimeSec < 3600) return 'healthy'
  return 'steady'
}
