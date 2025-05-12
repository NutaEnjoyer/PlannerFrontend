import { Heading } from '@/components/ui/Heading'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'

import { Pomodoro } from './Pomodoro'



export const metadata: Metadata = {
    title: 'Pomodoro Timer',
    ...NO_INDEX_PAGE
}

export default function PomooroPage() {
    return (
        <div>
            <Heading title='Pomodoro Timer' />
            <Pomodoro />
        </div>
    )
}