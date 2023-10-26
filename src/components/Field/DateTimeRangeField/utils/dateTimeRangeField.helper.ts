import { format, isBefore, parse, parseISO } from "date-fns"

export const formatDateTimeByType = (
  inputString: string,
  type: "date-range" | "time-range" | "datetime-range",
  formatString?: string
): string => {
  if (!!!inputString) return "..."

  if (type === "date-range") {
    const inputDate = new Date(inputString)
    return format(inputDate, formatString || "MMMM dd, yyy")
  }

  if (type === "time-range") {
    const parsedTime = parse(inputString, "HH:mm", new Date())
    return format(parsedTime, formatString || "HH:mm")
  }

  if (type === "datetime-range") {
    const inputDateTime = new Date(inputString)
    return format(inputDateTime, formatString || "MMMM dd, yyy HH:mm")
  }

  return "..."
}

export const isValidDateTimeValue = (
  start: string,
  end: string,
  type: "date-range" | "time-range" | "datetime-range"
): boolean => {
  if (!!!start || !!!end) return true

  const parsedStart = type === "time-range" ? parse(start, "HH:mm", new Date()) : parseISO(start)
  const parsedEnd = type === "time-range" ? parse(end, "HH:mm", new Date()) : parseISO(end)

  return isBefore(parsedStart, parsedEnd)
}
