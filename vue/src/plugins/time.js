import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

export default {
  minutesToHours: (m) => {
    let time = dayjs.duration(m, 'minutes')
    let mins = time.format(`m`)
    let minutes = mins > 0 ? mins + " mins" : ""
    let hrs = time.format(`H`)
    let hour = hrs > 0 ? hrs + " hour" : ""
    let s = hrs >= 1 ? "s" : ""
    return hour + s + " " + minutes
  }
}