const weekdays = '日一二三四五六'

export function occursOn(event, date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const key = `${date.getFullYear()}-${month}-${day}`
  if (key < event.startDate) return false
  if (event.weekends) return date.getDay() === 0 || date.getDay() === 6
  return key <= (event.endDate ?? event.startDate)
}

export function eventDateLabel(event) {
  if (event.weekends) return '每周六、周日'

  const [year, month, day] = event.startDate.split('-').map(Number)
  if (event.endDate) {
    const [, endMonth, endDay] = event.endDate.split('-').map(Number)
    return `${month}月${day}日–${endMonth}月${endDay}日`
  }
  const weekday = weekdays[new Date(year, month - 1, day).getDay()]
  return `${month}月${day}日（周${weekday}）`
}
