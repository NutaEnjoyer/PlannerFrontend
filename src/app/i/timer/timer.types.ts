import { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import type { Dispatch, SetStateAction } from "react"

export interface ITimerState {
    secondsLeft: number
    activeRound: IPomodoroRoundResponse | undefined
    isRunning: boolean

    setIsRunning: Dispatch<SetStateAction<boolean>>
    setSecondsLeft: Dispatch<SetStateAction<number>>
    setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
}