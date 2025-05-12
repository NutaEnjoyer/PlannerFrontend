import { useEffect, useState } from "react"
import { useLoadSettings } from "./useLoadSettings"
import { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import { ITimerState } from "../timer.types"



export function useTimer(): ITimerState {
    const {workInterval, breakInterval} = useLoadSettings()

    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [isBreakTime, setIsBreakTime] = useState<boolean>(false)

    const [secondsLeft, setSecondsLeft] = useState<number>(Number(workInterval) * 60)
    const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isRunning) {
            interval = setInterval(() => {
                setSecondsLeft(prev => prev - 1)
            }, 1000)
        }else if (!isRunning && secondsLeft !== 0 && interval) {
            clearInterval(interval)
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [isRunning, secondsLeft, workInterval, activeRound])


    useEffect(() => {
        if (secondsLeft > 0) return

        setIsBreakTime(prev => !prev)
        setSecondsLeft(isBreakTime ? Number(workInterval) * 60 : Number(breakInterval) * 60)

    }, [secondsLeft, isBreakTime, workInterval, breakInterval])



    return {
        secondsLeft,
        activeRound,
        setIsRunning,
        setSecondsLeft,
        setActiveRound,
        isRunning
    }
}