import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatTimeWithTimezone(
  timestamp: string,
  format: string,
): string {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return dayjs.utc(timestamp).tz(tz).format(format);
}
