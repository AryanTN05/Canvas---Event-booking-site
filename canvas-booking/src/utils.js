/**
 * Convert a time-slot string to minutes since midnight.
 *   '12:00 AM'            →    0
 *   '1:00 AM'             →   60
 *   '12:00 PM'            →  720
 *   '11:00 PM'            → 1380
 *   '12:00 AM (midnight)' → 1440
 */
export function toMins(t) {
  if (!t) return 0
  if (t === '12:00 AM (midnight)') return 1440
  const [tp, period] = t.split(' ')
  let h = parseInt(tp.split(':')[0], 10)
  if (period === 'PM' && h !== 12) h += 12
  if (period === 'AM' && h === 12) h = 0
  return h * 60
}

/**
 * Format an ISO date string (yyyy-MM-dd) to "02 Apr 2026".
 */
export function fmtDate(d) {
  if (!d) return '—'
  const [y, m, day] = d.split('-').map(Number)
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec']
  return `${String(day).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`
}

/**
 * Return today's date as an ISO string (yyyy-MM-dd).
 */
export function todayISO() {
  return new Date().toISOString().split('T')[0]
}

/**
 * Check whether two time ranges overlap.
 * Overlap condition: aStart < bEnd AND aEnd > bStart
 */
export function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart
}
