import dayjs, { type Dayjs } from "dayjs";
import 'dayjs/locale/ru' // localization

import isoWeek from 'dayjs/plugin/isoWeek' // ISO week
import weekOfYear from 'dayjs/plugin/weekOfYear' // week of year

dayjs.extend(isoWeek)
dayjs.extend(weekOfYear)

export type FilterKeys = 
    'today' |
    'tomorrow' |
    'on-this-week' |
    'on-next-week' |
    'later';

export const FILTERS: Record<string, Dayjs> = {
    today: dayjs().startOf('day'),
    tomorrow: dayjs().add(1, 'day').startOf('day'),
    'on-this-week': dayjs().endOf('isoWeek'),
    'on-next-week': dayjs().add(1, 'week').startOf('day'),
    later: dayjs().add(2, 'week').startOf('day'),
}


export const COLUMNS = [
    {
        label: 'Today',
        value: 'today'
    },
    {
        label: 'Tomorrow',
        value: 'tomorrow'
    },
    {
        label: 'On this week',
        value: 'on-this-week'
    },
    {
        label: 'On next week',
        value: 'on-next-week'
    },
    {
        label: 'Later',
        value: 'later'
    },
    {
        label: 'Completed',
        value: 'completed'
    }
]