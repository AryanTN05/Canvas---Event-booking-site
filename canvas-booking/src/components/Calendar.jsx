import { useState } from 'react'
import './Calendar.css'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS   = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

/**
 * Inline calendar component.
 *
 * Props:
 *   value    {string}   Selected date as "yyyy-MM-dd", or ''
 *   onChange {function} Called with "yyyy-MM-dd" string when a date is clicked
 */
export default function Calendar({ value, onChange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Track which month is currently displayed
  const [cursor, setCursor] = useState(() => {
    const base = value ? new Date(value + 'T00:00:00') : new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })

  const year  = cursor.getFullYear()
  const month = cursor.getMonth()

  /* Build the grid of day cells for the current month view */
  function buildDays() {
    const firstDow   = new Date(year, month, 1).getDay()   // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = []

    // Leading blanks (days from previous month shown as empty)
    for (let i = 0; i < firstDow; i++) cells.push(null)

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
      cells.push({
        day:        d,
        iso:        toISO(date),
        isPast:     date < today,
        isToday:    date.getTime() === today.getTime(),
        isSelected: toISO(date) === value,
      })
    }
    return cells
  }

  function toISO(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-')
  }

  function prevMonth() {
    setCursor(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setCursor(new Date(year, month + 1, 1))
  }

  // Disable prev arrow if we're already in the current month
  const canGoPrev = cursor > new Date(today.getFullYear(), today.getMonth(), 1)

  const days = buildDays()

  return (
    <div className="calendar">
      {/* Month navigation */}
      <div className="cal-header">
        <button
          className="cal-nav"
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label="Previous month"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <span className="cal-month-label">
          {MONTHS[month]} {year}
        </span>

        <button
          className="cal-nav"
          onClick={nextMonth}
          aria-label="Next month"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Weekday labels */}
      <div className="cal-weekdays">
        {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
      </div>

      {/* Day cells */}
      <div className="cal-grid">
        {days.map((cell, i) =>
          cell === null ? (
            <span key={`blank-${i}`} />
          ) : (
            <button
              key={cell.iso}
              className={[
                'cal-day',
                cell.isSelected ? 'selected' : '',
                cell.isToday    ? 'today'    : '',
                cell.isPast     ? 'past'     : '',
              ].filter(Boolean).join(' ')}
              disabled={cell.isPast}
              onClick={() => onChange(cell.iso)}
              aria-label={cell.iso}
              aria-pressed={cell.isSelected}
            >
              {cell.day}
            </button>
          )
        )}
      </div>
    </div>
  )
}
