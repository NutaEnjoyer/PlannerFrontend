import { pomodoroService } from "@/services/pomodoro.service";
import { IPomodoroRoundResponse } from "@/types/pomodoro.types";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useLoadSettings } from "./useLoadSettings";

interface IUseTodaySession {
    setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
    setSecondsLeft: Dispatch<SetStateAction<number>>
}

export function useTodaySSession({setActiveRound, setSecondsLeft}: IUseTodaySession) {
    const {
        data: sessionsResponse,
        isLoading,
        refetch,
        isSuccess
    } = useQuery({
        queryKey: ['get today session'],
        queryFn: () => pomodoroService.getTodaySession()
    })

    const {workInterval} = useLoadSettings()

    const rounds = sessionsResponse?.data.rounds 

    useEffect(() => {
        if (isSuccess && rounds) {
            const activeRound = rounds.find(round => !round.isCompleted)
            setActiveRound(activeRound)

            if (activeRound && activeRound.totalSeconds !== 0) {
                setSecondsLeft(activeRound.totalSeconds)
            }
        }
    }, [isSuccess, rounds])

    return {
        sessionsResponse,
        isLoading,
        refetch,
        isSuccess,
        workInterval
    }
}