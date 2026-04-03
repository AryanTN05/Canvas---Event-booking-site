import { START_SLOTS } from '../constants'
import { toMins, overlaps } from '../utils'
import './SlotGrid.css'

/**
 * Visual grid showing hourly time slots for a selected building + date.
 *
 * Props:
 *   bookedRanges  {Array}  [{s, e}] of already-booked minute ranges
 *   selectedStart {string} Currently selected start-time slot (or '')
 *   selectedEnd   {string} Currently selected end-time slot (or '')
 *   onSelect      {fn}     Called with slot string when a free slot is clicked
 *   loading       {bool}   Show loading overlay
 */
export default function SlotGrid({
  bookedRanges = [],
  selectedStart = '',
  selectedEnd = '',
  onSelect,
  loading = false,
}) {
  const selStartMins = selectedStart ? toMins(selectedStart) : -1
  const selEndMins   = selectedEnd   ? toMins(selectedEnd)   : -1

  function getSlotState(slot) {
    const s = toMins(slot)
    const e = s + 60  // each cell = 1-hour block

    const booked = bookedRanges.some(r => overlaps(s, e, r.s, r.e))
    if (booked) return 'booked'

    // Highlight the selected range
    if (selStartMins !== -1 && selEndMins !== -1) {
      if (s >= selStartMins && e <= selEndMins) return 'in-range'
    }
    if (slot === selectedStart) return 'start'

    return 'free'
  }

  return (
    <div className="slot-grid-wrap">
      <div className="slot-grid-label">
        <span>Time Availability</span>
        <span className="sg-legend">
          <span className="sg-dot free" />Free
          <span className="sg-dot booked" />Booked
          <span className="sg-dot selected" />Selected
        </span>
      </div>

      <div className={`slot-grid ${loading ? 'sg-loading' : ''}`}>
        {START_SLOTS.map(slot => {
          const state = getSlotState(slot)
          return (
            <button
              key={slot}
              className={`sg-slot sg-${state}`}
              disabled={state === 'booked' || !onSelect}
              onClick={() => onSelect && state !== 'booked' && onSelect(slot)}
              title={slot + (state === 'booked' ? ' — already booked' : '')}
            >
              {slot.replace(':00 ', '\n')}
            </button>
          )
        })}
      </div>

      {loading && (
        <div className="sg-loader">
          <span className="spinner spinner-md" />
        </div>
      )}
    </div>
  )
}
