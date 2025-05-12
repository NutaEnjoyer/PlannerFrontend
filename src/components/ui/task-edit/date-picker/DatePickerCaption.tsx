import dayjs from 'dayjs'
import { DateLibOptions, DateLib } from 'react-day-picker';

const seasonEmoji: Record<string, string> = {
    spring: '🌷',
    summer: '🌞',
    autumn: '🍂',
    winter: '⛄️',
}

type DateFormatter = (
    month: Date,
    options?: DateLibOptions,
    dateLib?: DateLib
  ) => string;

const getSeason = (month: Date): keyof typeof seasonEmoji => {
    const monthNumber = month.getMonth() + 1
    if (monthNumber > 2 && monthNumber < 6) return 'spring'
    if (monthNumber > 5 && monthNumber < 9) return 'summer'
    if (monthNumber > 8 && monthNumber < 12) return 'autumn'
    return 'winter'
}

export const formatCaption: DateFormatter = (month: Date) => {
    const season = getSeason(month);
    return `${seasonEmoji[season]} ${dayjs(month).format('MMMM')}`;
  };